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

Vue.use(htmlToPdf)
Vue.prototype.JQ = $

Vue.use(Element);

var kkload = new Vue();
var load = null;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  res => {
    if (res.url.indexOf("/user/getUserProfile") != -1 || res.url.indexOf("/index/listLatestReportsUserIcon") != -1 || res.url.indexOf("/report/reportReviewImgs") != -1 || res.url.indexOf("/report/reportBirdView") != -1 || res.url.indexOf("/report/appendix") != -1 || res.url.indexOf("/report/reportReview") != -1 || res.url.indexOf("/report/reportInfo") != -1 || res.url.indexOf("report/consultationInfo") != -1) {
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
    return res;
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  res => {
    if (load) {
      load.close();
    }
    if (res.data.code == 2) {
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
  var isLogin = localStorage.getItem('isLogin');
  var passport = localStorage.getItem('passport');
  var open = localStorage.getItem('openReport');
  var userType = localStorage.getItem('userType');
  if (isLogin) {
    if (to.name == 'login') {
      if (userType == 2) {
        next()
      } else {
        next({ path: '/library' })
      }
    } else {
      next()
    }
  } else {
    if (to.name !== 'login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
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
