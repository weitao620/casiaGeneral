import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import _ from 'lodash'
import qs from 'qs'

import $ from 'jquery'
import { is } from 'core-js/core/object';
import './assets/fonts/iconfont.css'
import htmlToPdf from "@/common/utils/htmlToPdf"
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
import Highcharts from 'highcharts'
import Highcharts3d from 'highcharts/highcharts-3d'
Highcharts3d(Highcharts)

Vue.use(htmlToPdf)
Vue.prototype.JQ = $

Vue.use(Element);

var kkload = new Vue();
var load = null;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  res => {
    if (res.url.indexOf("/user/getUserProfile") != -1 || res.url.indexOf("/index/listLatestReportsUserIcon") != -1 || res.url.indexOf("/report/reportReviewImgs") != -1 || res.url.indexOf("/report/reportBirdView") != -1 || res.url.indexOf("/report/appendix") != -1 || res.url.indexOf("/report/reportReview") != -1 || res.url.indexOf("/report/reportInfo") != -1 || res.url.indexOf("report/consultationInfo") != -1 || (res.params && res.params.type == 'y')) {
      console.log('不需要')
      console.log(res.url)
    } else {
      console.log('需要')
      load = kkload.$loading({
        lock: true,
        text: '数据加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        load.close();
      }, 10000)
    }
    console.log(res)
    return res;
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  res => {
    if (res.config.url.indexOf("/index/screenTrend") != -1 && res.config.params && res.config.params.type == 'n') {
      console.log('什么' + res.config.url)
    } else {
      if (load) {
        console.log('load')
        load.close();
        console.log('request管2222' + res.config.url)
      }
    }
    if (res.data.code == 2 || (res.config.url.indexOf("/user/login") == -1 && res.data.code == 1 && res.data.msg == "账号或密码错误")) {
      router.replace({ path: "/login" });
      localStorage.removeItem("isLogin");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userAuth");
      localStorage.removeItem("passport");
      localStorage.removeItem("userType");
      return;
    }
    if (res.data.code == 90000) {
      Element.MessageBox.alert(res.data.msg, '提示', {
        confirmButtonText: '确定',
        callback: () => {
          router.replace({ path: "/login" });
        }
      });
      return;
    }
    return res;
  },
  error => {
    load.close();
    return Promise.reject(error.response.data)
  }
)

router.beforeEach((to, from, next) => {
  console.log(to)
  var isLogin = localStorage.getItem('isLogin');
  var passport = localStorage.getItem('passport');
  var open = localStorage.getItem('openReport');
  var userType = localStorage.getItem('userType');
  // if (to.name === 'screenindex') {
  //   next()
  // } else {
  if (isLogin) {
    console.log(to)

    if (to.name == 'login') {
      console.log(1)
      // if (userType == 2) {
      //   next()
      //   console.log(2)
      // } else {
      if (localStorage.getItem('passport') === 'jiankong') {
        console.log(441)
        next({ path: '/screen' })
      } else {
        console.log(3)
        next({ path: '/library' })
      }
      // }
    } else if (to.path.indexOf('library') !== -1 && localStorage.getItem('passport') === 'jiankong') {
      console.log(442)
      next({ path: '/screen' })
    } else if (to.path.indexOf('screen') !== -1 && localStorage.getItem('passport') !== 'jiankong') {
      console.log(442)
      next({ path: '/library' })
    } else {
      console.log(41)
      // console.log(localStorage.getItem('passport'))
      // console.log(localStorage.getItem('passport') === 'jiankong')
      // console.log(4)
      // if (localStorage.getItem('passport') === 'jiankong') {
      //   console.log(442)
      //   next({ path: '/screen' })
      // } else {
      next()
      // }
    }
  } else {
    console.log(5)
    if (to.name !== 'login') {
      console.log(6)
      next({ path: '/login' })
    } else {
      console.log(7)
      next()
    }
  }
  // }
  
})
router.afterEach(() => {
  window.scrollTo(0, 0);
})

Vue.prototype.$http = axios
Vue.prototype._ = _
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
