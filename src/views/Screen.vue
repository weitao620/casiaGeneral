<template>
  <div class="screen_wrap">
    <div class="library_box">
      <!-- <div class="lib_b_lizi"></div> -->
      <!-- <div class="lib_b_size"></div> -->
      <div class="lib_main">
        <div class="lib_head">
          <div class="lib_head_box">
            <div class="lib_head_right">
              <div class="lib_head_time">
                {{ nowDate }}
              </div>
            </div>
            <div class="lib_head_box lib_head_box1">
              <div class="lib_head_right">
                <div class="lib_head_exit">
                  <img
                    @click="tofullscreenToggel"
                    src="../assets/images/heart/fullscreen.png"
                    alt=""
                    style="margin-right: 0.28rem;"
                  />
                  <el-popconfirm
                    popper-class="sybs_pop"
                    cancel-button-text=" "
                    confirm-button-text=" "
                    @cancel="logout"
                    icon="el-icon-info"
                    icon-color="rgba(255, 190, 68, 1)"
                    title="确定退出登录吗？"
                  >
                    <img
                      slot="reference"
                      src="../assets/images/heart/exit.png"
                      alt=""
                    />
                  </el-popconfirm>
                  <!-- @click="logout" -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lib_contains" ref="scrollTops">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import mqtt from "mqtt";
import Url from "@/assets/js/url.js";
export default {
  name: "login",
  data() {
    return {
      sysType: 1,
      endFlag: true,
      detailInfo: {},
      interVal: null,
      nowDate: "",
      websock: null,
      // mqtt
      MQTT: null,
      intTime: null
    };
  },

  mounted() {
    this.nowDate = this.handleTimeForm(new Date().getTime());
    this.interVal = setInterval(() => {
      this.nowDate = this.handleTimeForm(new Date().getTime());
    }, 1000);
    // this.sysType = this.getSysType
    // this.sysTab(this.sysType)
    // console.log(this.interVal)
    // this.$router.push({
    //   name: 'screenindex'
    // }, () => {}, () => {});
    // this.connect()
    // this.getCode();
  },
  created() {
    if (localStorage.getItem("mqttTopic") && localStorage.getItem("mqttTopic") != 'undefined') {
      this.sceneId = localStorage.getItem("mqttTopic");
      this.initMqtt(this.sceneId);
    } else {
      console.log("缺少mqttTopic")
    }
    console.log(this.sceneId);
  },
  destroyed() {
    console.log("销毁");
    clearInterval(this.interVal);
    clearInterval(this.intTime);
    if (this.MQTT) {
      if (this.MQTT.end) {
        console.log("关了吗");
        this.endFlag = false;
        this.MQTT.end();
      }
    }
    // this.websock.close()
  },
  computed: {
    ...mapGetters(["getSysType"])
  },
  methods: {
    ...mapMutations([
      "setPerDetail",
      "setCollapseFlag",
      "setSysType",
      "setMqttUpdate"
    ]),
    logout() {
      let param = {
        passport: localStorage.getItem("passport")
      };
      this.$http.post(Url + "/aimw/user/logout", param).then(res => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userAuth");
        localStorage.removeItem("passport");
        localStorage.removeItem("userType");
        localStorage.removeItem("mqttTopic");
        this.$router.replace({
          path: "/login"
        });
      });
    },
    /**
     * 浏览器判断是否全屏
     */
    fullscreenToggel() {
      if (this.fullscreenEnable()) {
        this.exitFullScreen();
      } else {
        this.reqFullScreen();
      }
    },
    /**
     * esc监听全屏
     */
    listenfullscreen(callback) {
      function listen() {
        callback();
      }
      document.addEventListener("fullscreenchange", function() {
        listen();
      });
      document.addEventListener("mozfullscreenchange", function() {
        listen();
      });
      document.addEventListener("webkitfullscreenchange", function() {
        listen();
      });
      document.addEventListener("msfullscreenchange", function() {
        listen();
      });
    },
    /**
     * 浏览器判断是否全屏
     */
    fullscreenEnable() {
      var isFullscreen =
        document.isFullScreen ||
        document.mozIsFullScreen ||
        document.webkitIsFullScreen;
      return isFullscreen;
    },
    /**
     * 浏览器全屏
     */
    reqFullScreen() {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
    },
    /**
     * 浏览器退出全屏
     */
    exitFullScreen() {
      if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
      }
    },
    tofullscreenToggel() {
      this.isFullScreen = !this.isFullScreen;
      this.fullscreenToggel();
    },
    // sysTab(type) {
    //   this.sysType = type
    //   sessionStorage.setItem("sysType", type);
    //   this.setSysType(type)
    //   if (type == 1) {
    //     this.$router.push({
    //       name: 'totalview'
    //     }, () => {}, () => {});
    //   } else if (type == 2) {
    //     this.$router.push({
    //       name: 'warnview'
    //     }, () => {}, () => {});
    //   }
    // },
    generateUUID() {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
      }
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    // 初始化mqtt
    initMqtt(seceneId) {
      // console.log(this.generateUUID())
      console.log(seceneId);
      const _this = this;
      // 建立连接，需要搭建消息中间件服务器的（我这里是后台）提供用户名或密码
      let host = "wss://ipathy.net";
      let port = "8084";
      let options = {
        username: "zrway",
        password: "casia!@#123",
        cleanSession: false,
        keepAlive: 60,
        clientId:
          "AIMW-G_" +
          Math.random()
            .toString(16)
            .substring(2, 10),
        connectTimeout: 4000
      };
      // 在data中定义MQTT,以便断开连接
      // ws://xxxxx是连接地址，后台提供，wss是https连接
      console.log(mqtt);
      console.log(options);
      _this.MQTT = mqtt.connect(host + ":" + port + "/mqtt", options);
      _this.MQTT.on("error", e => {
        console.log("链接失败了");
        console.log(e);
        _this.MQTT.end();
      });
      // 建立连接后订阅主题
      _this.MQTT.on("connect", () => {
        console.log("链接成功了");
        // 订阅一个主题
        _this.setMqttUpdate(true);
        console.log(seceneId);
        _this.MQTT.subscribe(seceneId, { qos: 2 }, err => {
          if (!err) {
            console.info(" ---- 订阅成功");
            // _this.mqtt.send("login", "1", 0);
          } else {
            console.warn("订阅失败");
          }
        });
      });
      // 后台发送的消息
      _this.MQTT.on("message", function(top, message) {
        console.log("获取到的场景返回的信息");
        console.log(top);
        console.log(message);
        // 发送过来的如果是对象你是需要解析的。
        // const res = JSON.parse(message.toString());
        console.log();
        // console.log(message.toString())
        _this.setMqttUpdate(true);
        // _this.toLogin(res)
        // const TOP = top.replace("tops/", "");
        // console.log(top + ": ", res);
        // // 根据不同主题进行赋值操作
        // switch (TOP) {
        //   case "top1":
        //     _this.data1 = [res];
        //     break;
        //   case "top2":
        //     _this.data2 = [...res];
        //     break;
        //   // 其他情况
        // }
      });
      // 其他异常事件
      _this.MQTT.on("reconnect", () => {
        console.info("正在重连");
        setTimeout(() => {
          console.log("正在重连2s了");
          _this.initMqtt(seceneId);
        }, 2000);
      });
      _this.MQTT.on("disconnect", error => {
        console.info("服务器断开:", error);
      });
      _this.MQTT.on("close", () => {
        console.info("关闭了");
        _this.MQTT.end();
        console.log(this.endFlag);
        if (this.endFlag) {
          setTimeout(() => {
            console.log("正在重连2s了");
            _this.initMqtt(seceneId);
          }, 2000);
        }
      });
    },
    // toLogin(ind) {
    //   console.log(1111);
    //   console.log(this.$router);
    //   localStorage.setItem("isBigLogin", true);
    //   let perDetail = {
    //     sceneId: this.sceneId,
    //     passport: ind.passport,
    //     gender: ind.gender ? ind.gender : 1,
    //     name: ind.name,
    //     headIcon: ind.headIcon
    //   };
    //   this.setPerDetail(perDetail);
    //   localStorage.setItem("personDetail", JSON.stringify(perDetail));
    //   setTimeout(() => {
    //     this.$router.replace({
    //       name: "success"
    //     });
    //   }, 0);
    // },
    // toAbout() {
    //   this.$router.push({
    //     name: "about"
    //   });
    // },
    // toIntroduce(name, type) {
    //   console.log(name, type);
    //   this.$router.push({
    //     name: "introduce",
    //     query: { name: name, type: type }
    //   });
    // },
    handleTimeForm(time) {
      let date = new Date(time);
      let y = 1900 + date.getYear();
      let m = "0" + (date.getMonth() + 1);
      let d = "0" + date.getDate();
      let h = "0" + date.getHours();
      let mm = "0" + date.getMinutes();
      let ss = "0" + date.getSeconds();
      let day = date.getDay();
      let days = "";
      if (day == 1) {
        days = "星期一";
      } else if (day == 2) {
        days = "星期二";
      } else if (day == 3) {
        days = "星期三";
      } else if (day == 4) {
        days = "星期四";
      } else if (day == 5) {
        days = "星期五";
      } else if (day == 6) {
        days = "星期六";
      } else if (day == 7) {
        days = "星期日";
      }
      return (
        y +
        "年" +
        m.substring(m.length - 2, m.length) +
        "月" +
        d.substring(d.length - 2, d.length) +
        "日\xa0\xa0\xa0" +
        h.substring(h.length - 2, h.length) +
        ":" +
        mm.substring(mm.length - 2, mm.length) +
        ":" +
        ss.substring(ss.length - 2, ss.length)
        //  +
        // " " +
        // days
      );
    }
  },
  watch: {
    // 此时我监听的是对象，当$store.state.userInfo.Name发生修改时，此时需要深度监听才能监听到数据变化
    "$store.state.sysType": {
      deep: true, // 深度监听设置为 true
      handler: function(newVal, oldVal) {
        console.log("发生变化啦!!!!!!!!!!!!!!!!!!"); // 修改数据时，能看到输出结果
        console.log("新：" + newVal, "老：" + oldVal);
        this.sysType = newVal;
        if (newVal == 2) {
          if (this.MQTT) {
            if (this.MQTT.end) {
              console.log("关了吗");
              this.endFlag = false;
              this.MQTT.end();
            }
          }
        } else {
          this.sceneId = "ltgsAlarmInfo";
          this.initMqtt(this.sceneId);
        }
        // if (newVal) {
        //   this.getLine('y')
        // }
      }
    }
  }
};
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
.sybs_pop {
  width: auto !important;
  background: rgba(5, 16, 62, 1) !important;
  border: 0.01rem solid rgba(138, 184, 255, 1) !important;
  color: #ffffff !important;
  margin-right: 0 !important;
  right: 0.46rem;
  display: flex;
  align-items: center;
  .popper__arrow {
    top: -0.08rem !important;
    margin-left: 0.64rem !important;
    border-width: 0.08rem;
    border-bottom-color: rgba(138, 184, 255, 1) !important;
  }
  .popper__arrow::after {
    top: 0.01rem !important;
    margin-left: -0.08rem !important;
    border-width: 0.08rem;
    border-bottom-color: rgba(5, 16, 62, 1) !important;
  }
  .el-popconfirm {
    padding: 0.04rem 0.1rem 0.06rem;
    .el-popconfirm__action {
      display: flex;
      justify-content: center;
      margin-top: 0.08rem;
      button {
        // float: right;
        width: 0.72rem;
        height: 0.3rem;
        margin: 0 0.06rem;
      }
      .el-button--text {
        width: 0.72rem;
        height: 0.3rem;
        background: url(../assets/images/heart/com1.png) no-repeat center;
        background-size: cover;
      }
      .el-button--primary {
        width: 0.72rem;
        height: 0.3rem;
        background: url(../assets/images/heart/com2.png) no-repeat center;
        background-size: cover;
      }
    }
  }
}
// 教育版
.el-menu--vertical .el-menu--popup {
  min-width: auto;
  width: 1.4rem !important;
  padding: 0;
}
.el-menu--vertical .el-menu-item {
  text-align: center;
  color: #354b70 !important;
  font-size: 0.18rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
.el-menu--vertical .el-menu-item.is-active {
  color: #737afd !important;
  background: linear-gradient(
    0deg,
    rgba(196, 236, 255, 0.14) 0%,
    rgba(151, 205, 255, 0.14) 100%
  );
}
.el-menu-item:hover {
  background: transparent;
}
.el-menu--vertical {
  .el-menu-item:focus,
  .el-menu-item:hover {
    color: #737afd !important;
    background: linear-gradient(
      0deg,
      rgba(196, 236, 255, 0.14) 0%,
      rgba(151, 205, 255, 0.14) 100%
    );
  }
}
// .lib_list{
//   .tab_nemu{
//     text-align: left;
//     position: absolute;
//     margin: auto;
//     left: 0;
//     right: 0;
//     top: 1.38rem;
//     bottom: 0.1rem;
//     overflow: hidden;
//     overflow-y: auto;
//     border: 0;
//     .el-submenu{
//       .el-submenu__title {
//         padding: 0 !important;
//         height: 0.56rem;
//         line-height: 0.56rem;
//         font-size: 0.18rem;
//         width: 2.25rem;
//         border-radius: 0.1rem;
//         position: relative;
//         display: flex;
//         justify-content: space-around;
//         align-items: center;
//         img{
//           width: 0.16rem;
//           height: auto;
//           margin: 0 0.12rem;
//         }
//         span{
//           font-size: 0.16rem !important;

//           font-family: PingFangSC-Regular, PingFang SC;
//           font-weight: 400;
//           color:#2A3487;
//           display: block;
//           width: 100%;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow:ellipsis;
//           flex: 1;
//         }
//         .el-submenu__icon-arrow{
//           right: 0;
//           margin-top: 0;
//           font-size: 0.18rem;
//           color: #2A3487;
//           position: unset;
//           margin: 0 0.08rem;
//         }
//         .el-icon-arrow-down{
//           transform: rotate(-180deg);
//         }
//       }
//       ul.el-menu--inline{
//         // padding: 0.12rem 0 0.32rem;
//         padding: 0;
//         width: 2.25rem;
//         li.el-menu-item{

//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 0 !important;
//           min-width: 2.25rem;
//           width: 2.25rem !important;
//           height: 0.42rem;
//           border-radius: 0.1rem;
//           margin: 0.1rem auto;
//           font-size: 0.16rem;
//           font-family: PingFangSC-Regular, PingFang SC;
//           font-weight: 400;
//           color: #2A3487 !important;
//           background: #ffffff !important;
//         }
//         li.el-menu-item.is-active,li.el-menu-item:hover{
//           background: #E9EFFF !important;

//         }
//       }

//     }
//     .el-submenu.is-active{
//       .el-submenu__title{
//         background: #848AFF;
//         span{
//           color: #ffffff;
//           font-family: PingFangSC-Semibold, PingFang SC;
//           font-weight: 600;
//           cursor: pointer;
//         }
//         .el-submenu__icon-arrow{
//           color: #ffffff;
//         }
//       }
//     }
//     .el-submenu.is-opened{
//       .el-submenu__icon-arrow{
//         transform: rotate(-90deg);
//       }
//     }
//   }
//   .dan_li {
//     padding: 0 !important;
//     height: 0.56rem;
//     line-height: 0.56rem;
//     font-size: 0.18rem;
//     width: 2.25rem;
//     border-radius: 0.1rem;
//     position: relative;
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -ms-flex-pack: distribute;
//     justify-content: flex-start;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     img{
//       width: 0.16rem;
//       height: auto;
//       margin: 0 0.12rem;
//     }
//   }
//   .dan_li.is-active {
//     background: #848AFF;
//     span{
//       color: #ffffff;
//       font-family: PingFangSC-Semibold, PingFang SC;
//       font-weight: 600;
//     }
//   }

// }
.lib_head_company {
  font-size: 0.32rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
  color: #00aaff;
  cursor: pointer;
}
.lib_head_wifi {
  display: flex;
  align-items: center;
  .el-icon-setting {
    font-size: 0.24rem;
    color: #ffffff;
    margin-top: 0.01rem;
  }
  // img{
  //   width: 0.24rem;
  // }
  .lhw_push {
    margin: 0 0.1rem 0 0.1rem;
    font-size: 0.2rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 300;
    color: #ffffff;
    span {
      color: #ffffff;
    }
  }
  .lhw_edit {
    padding: 0 0.2rem;
    font-size: 0.2rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 300;
    color: #00aaff;
  }
}
.lib_head_right {
  // margin-left: 0.3rem;
  // margin-top: 0.14rem;
  .lib_head_time {
    position: absolute;
    font-size: 0.2rem;
    line-height: 1;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: #ffffff;
    margin: auto;
    top: 0.65rem;
    left: 0;
    right: 0;
    margin-left: -12.2rem;
  }
  .lib_head_exit {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0.76rem;
    right: 0.23rem;
    z-index: 2;
    // margin-top: -0.02rem;
    // cursor: pointer;
    img {
      display: block;
      cursor: pointer;
      width: 0.94rem;
      height: 0.4rem;
      // margin: 0 0.04rem 0 0.5rem;
    }
    span {
      display: block;
      font-size: 0.14rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #7cf2ff;
      line-height: 0.22rem;
      margin-right: 0.12rem;
    }
  }
  // ul{
  //   display: flex;
  //   // align-items: center;
  //   li{
  //     width: 1.06rem;
  //     height: 0.32rem;
  //     font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  //     font-weight: 500;
  //     color: #CAFAFF;
  //     margin: 0 -0.02rem;
  //     line-height: 0.32rem;
  //     background: url("../assets/images/tab_bg.png") no-repeat center center;
  //     background-size: 100% 100%;
  //     cursor: pointer;
  //   }
  //   li.lhr_act{
  //     color: #FFFFFF;
  //     background: url("../assets/images/tab_bg_act.png") no-repeat center center;
  //     background-size: 100% 100%;
  //   }
  // }
  // .lib_head_exit{
  //   height: 100%;
  //   display: flex;
  //   align-items: center;
  //   padding-left: 0.2rem;
  //   // padding: 0.1rem 0.2rem;
  //   img{
  //      height: 0.28rem;
  //   }

  // }
  .el-dropdown {
    display: flex;
    align-items: center;
    .el-icon--right {
      font-size: 0.18rem;
      margin-left: 0.1rem;
    }
  }
}

// @keyframes liziAnimation {
//   0% { background-position: 0 -50%; opacity: 0.2;}
//   15% { background-position: 0 -20%; opacity: 1;}
//   50% { background-position: 0 50%; opacity: 1;}
//   85% { background-position: 0 120%; opacity: 1;}
//   100% { background-position: 0 150%; opacity: 0.2;}
// }
// .lib_b_lizi{
//   position: absolute;
//   margin: auto;
//   top: 0;
//   bottom: 0rem;
//   left: 0;
//   right: 0;
//   overflow: hidden;
//   background: url(../assets/images/heart/bg_lizi.png) no-repeat center -154%;
//   background-size: cover;
//   animation: liziAnimation 9s linear infinite;
// }
@keyframes sizeAnimation {
  0% {
    background-position: 0 120%;
    opacity: 0.2;
  }
  15% {
    background-position: 0 90%;
    opacity: 1;
  }
  50% {
    background-position: 0 20%;
    opacity: 1;
  }
  85% {
    background-position: 0 -50%;
    opacity: 1;
  }
  100% {
    background-position: 0 -80%;
    opacity: 0.2;
  }
}
.lib_b_size {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0rem;
  left: 0;
  right: 0;
  overflow: hidden;
  background: url(../assets/images/heart/bg_size.png) no-repeat center 120%;
  background-size: auto 1300px;
  animation: sizeAnimation 9s linear infinite;
}
</style>
<style scoped lang="less">
.screen_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  // , url(../assets/images/heart/bg_size.png) no-repeat top center,url("../assets/images/heart/bg.png") no-repeat center center
  background: url(../assets/images/heart/bg.png) no-repeat top center;
  background-size: cover;
  // background-color: #0D396A;
  // background: url("../assets/images/wangline.png") no-repeat center center;
  // background-size: cover;

  .library_box {
    display: flex;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0rem;
    left: 0;
    right: 0;
    overflow: hidden;

    // border-radius: 0.4rem;
    // background: #ffffff;
    // padding: 0.3rem 0.15rem 0.3rem 0.25rem;
    .lib_list {
      overflow: hidden;
      width: 2.35rem;
      height: 100%;
      background: #ffffff;
      .tab_list {
        position: relative;
        width: 100%;
        height: 100%;
        .tab_top {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.3rem 0 0.4rem;
          .tab_logo {
            width: 0.68rem;
            height: 0.68rem;
            margin: 0 auto;
          }
        }
        // .tab_nemu {
        //   .dan_li {
        //     padding: 0 0.24rem 0 0.33rem !important;
        //     height: 0.62rem;
        //     line-height: 0.62rem;
        //     border-left: 0.04rem solid;
        //     border-image: linear-gradient(-1deg, transparent, transparent) 10 10;
        //   }
        //   .dan_li.is-active {
        //     color: #ffffff !important;
        //     background: rgba(65, 150, 255, 0.66);
        //     border-left: 0.04rem solid;
        //     border-image: linear-gradient(-1deg, #29dcff, #b4efff) 10 10;
        //   }
        //   .li_icon {
        //     display: inline-block;
        //     margin-right: 0.04rem;
        //     .li_dashed {
        //       width: 0;
        //       height: 0.14rem;
        //       border-left: 0.01rem dashed #07f6ff;
        //       margin-left: 0.04rem;
        //     }
        //     .li_circle {
        //       width: 0.09rem;
        //       height: 0.09rem;
        //       border: 0.01rem solid #07f6ff;
        //       border-radius: 50%;
        //       margin: 0.04rem 0;
        //     }
        //     .li_cir_act {
        //       background: #07f6ff;
        //     }
        //     .li_tras{
        //       border-color: transparent;
        //     }
        //   }
        // }
      }
      // .tab_list1 {
      //   width: auto;
      //   .el-menu--collapse {
      //     width: auto;
      //   }
      //   .el-tooltip {
      //     padding: 0 0.24rem 0 0.33rem !important;
      //   }
      // }
    }
    .lib_main {
      flex: 1;
      text-align: center;
      // background: rgb(61, 229, 223);
      // background: #ffffff;
      // padding-top: 0.48rem;
      // height: 100vh;
      position: relative;
      // margin-left: 0.6rem;
      .lib_contains {
        position: absolute;
        top: 0.88rem;
        bottom: 0rem;
        left: 0;
        right: 0;
        // padding-right: 0.1rem;
        overflow: hidden;
        overflow-y: auto;
        z-index: 1;
      }
      .lib_head {
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        height: 0.88rem;
        background: url(../assets/images/heart/head.png) no-repeat center center;
        background-size: 100% 100%;
        // background: #ffffff;
        // box-shadow: 0px 3px 27px 0px rgba(66, 79, 128, 0.11);
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        .lib_head_box {
          display: flex;
          justify-content: space-between;
          // align-items: center;
        }
        .lib_head_box1 {
          // padding: 0 0.3rem;
          // margin-top: 0.3rem;
        }
        .lib_head_left {
          cursor: pointer;
          width: 0.9rem;
          height: 0.36rem;
          display: flex;
          justify-content: center;
          align-items: center;
          // border: 0.01rem solid #737AFD;
          border-radius: 0.1rem;
          color: #737afd;
          font-size: 0.18rem;
          background: #e9efff;

          // img {
          //   width: 0.18rem;
          //   height: 0.16rem;
          //   margin: 0 0.24rem;
          // }
        }
        .lib_head_right {
          // height: 0.48rem;
          // margin: 0 0.24rem;
          display: flex;
          // align-items: center;
          .lib_user_home {
            width: 0.48rem;
            height: 0.48rem;
            border-radius: 50%;
          }
          .lib_user_pto {
            width: 0.48rem;
            height: 0.48rem;
            background: #ccc;
            border-radius: 50%;
            margin-left: 0.28rem;
          }
          .lib_user {
            line-height: 0.68rem;
            height: 0.68rem;
            padding: 0 0.1rem;
            font-size: 0.16rem;
            font-weight: 400;
            color: #354b70;
          }
          .lib_drap {
            width: 0.12rem;
            height: 0.07rem;
          }
        }
      }
    }
  }
}
</style>
