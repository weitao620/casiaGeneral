<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<style lang="less">
  @import "./assets/css/base.less";
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import Url from "@/assets/js/url.js";
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      headShow: false,
      isRouterAlive: true
    };
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    auth() {
      let that = this;
      if (this.$route.name == 'login') {
        return false
      }
      if (localStorage.getItem('totalToken')) {
        console.log('不需要权限')
        return false
      }
      let param = {
        passport: JSON.parse(localStorage.getItem('userInfo')).passport
        // password: JSON.parse(localStorage.getItem('userInfo')).password
      }
      that.$http
        .get(Url + "/aimw/user/getAuthInfo", { params: param })
        .then(res => {
          var data = res.data;
          console.log(data)
          if (data.code == 0) {
            let obja = {
              menuAuthID: []
            }
            if (data.data.userAuth == '') {
              data.data.userAuth = JSON.stringify(obja)
            } else {
              if (JSON.parse(data.data.userAuth).menuAuthID) {
              } else {
                let nOb = JSON.parse(data.data.userAuth)
                nOb.menuAuthID = []
                data.data.userAuth = JSON.stringify(nOb)
              }
            }
            localStorage.setItem("userAuth", data.data.userAuth);
            localStorage.setItem("userType", 1);
            if (data.data.algTypes.mentalDim) {
              // mentalDim
              // 心理健康维度(0b111111由低位到高位分别代表：抑郁、焦虑、强迫、自我伤害、敌对、PTSD)

              // console.log(data.data.algTypes.mentalDim.toString(2).split(''))
              let mental = data.data.algTypes.mentalDim.toString(2).split('').reverse()
              data.data.algTypes.depressionFlag = mental[0]
              data.data.algTypes.anxietyFlag = mental[1]
              data.data.algTypes.forcedFlag = mental[2]
              data.data.algTypes.suicideFlag = mental[3]
              data.data.algTypes.violenceFlag = mental[4]
              data.data.algTypes.ptsdFlag = mental[5]
              // personalityDim
              // 人格分析维度(0x11111由低位到高位分别代表：外向性extroversion、尽责性conscientiousness、神经质nervousness、宜人性agreeableness、开放性openness)
              // console.log(data.data.algTypes.personalityDim.toString(2).split(''))
              let personality = data.data.algTypes.personalityDim.toString(2).split('').reverse()
              data.data.algTypes.extroversionFlag = personality[0]
              data.data.algTypes.conscientiousnessFlag = personality[1]
              data.data.algTypes.nervousnessFlag = personality[2]
              data.data.algTypes.agreeablenessFlag = personality[3]
              data.data.algTypes.opennessFlag = personality[4]

              // positiveDim
              // 积极心理维度(0b11111由低到高代表：心理韧性resilience、积极自我self、积极成就achievement、积极情绪emotion、积极关系relationship)
              
              let positive = data.data.algTypes.positiveDim.toString(2).split('').reverse()
              data.data.algTypes.resilienceFlag = positive[0]
              data.data.algTypes.selfFlag = positive[1]
              data.data.algTypes.achievementFlag = positive[2]
              data.data.algTypes.emotionFlag = positive[3]
              data.data.algTypes.relationshipFlag = positive[4]
              console.log(data.data.algTypes)
              localStorage.setItem("algTypes", JSON.stringify(data.data.algTypes));
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    ...mapMutations(["setUserName"])
  },
  mounted() {
    var user = sessionStorage.getItem("userName");
    if (user) {
      this.setUserName(user);
    }
    if (window.location.href.indexOf('details/report/') != -1) {
      console.log('不获取权限')
    } else {
      this.auth()
    }
    // if (this.$root._route.name === 'screenindex') {
    //   console.log('不获取权限')
    // } else {
    //   this.auth()
    // }
  },
  computed: {
    ...mapGetters(["getUserName"])
  }
};
</script>
