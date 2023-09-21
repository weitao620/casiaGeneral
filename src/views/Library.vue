<template>
  <div class="library_wrap">
    <div class="lib_list">
      <div :class="isCollapse ? 'tab_list tab_list1' : 'tab_list'">
        <div class="tab_top">
          <img
            :class="!isCollapse ? 'tab_logo tab_logo_s' : 'tab_logo'"
            v-if="headIcon"  :src="headIcon"
            alt="" />
          <img
            :class="!isCollapse ? 'tab_logo tab_logo_s' : 'tab_logo'"
            v-else
            src="../assets/logo.png"
            alt=""
          />
          <img
            v-show="!isCollapse"
            class="tab_logo_text"
            src="../assets/images/logoText.png"
            alt=""
          />
        </div>
        <el-menu
          @select="handleSelect"
          :default-active="activeUrl"
          class="tab_nemu"
          background="linear-gradient(176deg, #4196FF, #005ACB);"
          text-color="#fff"
          active-text-color="rgb(64, 158, 255)"
          ref="menus"
          :default-openeds="['4']"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          hide-timeout="false"
        >
          <el-menu-item index="index" class="dan_li">
            <img
              style="width:0.2rem;height:auto"
              v-if="$route.name == 'index' || $route.name == 'person'"
              src="../assets/images/tabs/nav_on.png"
              alt=""
            />
            <img style="width:0.2rem;height:auto" v-else src="../assets/images/tabs/nav_off.png" alt="" />
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="report" class="dan_li" v-if="power2">
            <img
              style="width:0.18rem;height:auto"
              v-if="$route.name == 'report' || $route.name == 'expword'"
              src="../assets/images/tabs/report_on.png"
              alt=""
            />
            <img style="width:0.18rem;height:auto" v-else src="../assets/images/tabs/report_off.png" alt="" />
            <span slot="title">评估报告</span>
          </el-menu-item>
          <el-menu-item index="heart" class="dan_li" v-if="power3">
            <img
              style="width:0.2rem;height:auto"
              v-if="$route.name == 'heart' || $route.name == 'review'"
              src="../assets/images/tabs/heart_on.png"
              alt=""
            />
            <img style="width:0.2rem;height:auto" v-else src="../assets/images/tabs/heart_off.png" alt="" />
            <span slot="title">心理档案</span>
          </el-menu-item>
          <el-menu-item index="basic" class="dan_li" v-if="power5">
            <img
              style="width:0.18rem;height:auto"
              v-if="$route.name == 'basic'"
              src="../assets/images/tabs/set_on.png"
              alt=""
            />
            <img style="width:0.18rem;height:auto" v-else src="../assets/images/tabs/set_off.png" alt="" />
            <span slot="title">基础设置</span>
          </el-menu-item>
          <el-submenu index="4" v-if="power4">
            <template slot="title">
              <img
                style="width:0.2rem;height:auto"
                v-if="
                  $route.name == 'framework' ||
                    $route.name == 'user' ||
                    $route.name == 'adduser' ||
                    $route.name == 'detailuser' ||
                    $route.name == 'batchuser' ||
                    $route.name == 'admin' ||
                    $route.name == 'addadmin' ||
                    $route.name == 'detailadmin' ||
                    $route.name == 'batchadmin' ||
                    $route.name == 'role' ||
                    $route.name == 'power'
                "
                src="../assets/images/tabs/system_on.png"
                alt=""
              />
              <img style="width:0.2rem;height:auto" v-else src="../assets/images/tabs/system_off.png" alt="" />
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="framework" v-if="power41">
              <div class="li_icon">
                <div class="li_dashed tr_op0"></div>
                <div
                  :class="{
                    li_circle: true,
                    li_cir_act: activeUrl == 'framework'
                  }"
                ></div>
                <div :class="{
                  li_dashed: true,
                  li_tras: !power42 && !power43 && !power44
                  }"></div>
              </div>
              组织架构
            </el-menu-item>
            <el-menu-item index="user" v-if="power42">
              <div class="li_icon">
                <div :class="{
                  li_dashed: true,
                  li_tras: !power41
                  }"></div>
                <div
                  :class="{
                    li_circle: true,
                    li_cir_act: activeUrl == 'user'
                  }"
                ></div>
                <div :class="{
                  li_dashed: true,
                  li_tras: !power43 && !power44
                  }"></div>
              </div>
              用户管理
            </el-menu-item>
            <el-menu-item index="admin" v-if="power43">
              <div class="li_icon">
                <div :class="{
                  li_dashed: true,
                  li_tras: !power41 && !power42
                  }"></div>
                <div
                  :class="{
                    li_circle: true,
                    li_cir_act: activeUrl == 'admin'
                  }"
                ></div>
                <div :class="{
                  li_dashed: true,
                  li_tras: !power44
                  }"></div>
              </div>
              管理员管理
            </el-menu-item>
            <el-menu-item index="role" v-if="power44">
              <div class="li_icon">
                <div :class="{
                  li_dashed: true,
                  li_tras: !power41 && !power42 && !power43
                  }"></div>
                <div
                  :class="{ li_circle: true, li_cir_act: activeUrl == 'role' }"
                ></div>
                <div class="li_dashed tr_op0"></div>
              </div>
              角色管理
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="field" v-if="power6 == 'administrator'" class="dan_li">
            <img
              style="width:0.18rem;height:auto"
              v-if="$route.name == 'field'"
              src="../assets/images/tabs/frame_on.png"
              alt=""
            />
            <img style="width:0.18rem;height:auto" v-else src="../assets/images/tabs/frame_off.png" alt="" />
            <span slot="title">字段管理</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="lib_main">
      <div class="lib_head">
        <div class="lib_head_left" @click="collapse">
          <img src="../assets/images/left_tabs_mer.png" alt="" />
        </div>
        <div class="lib_head_right">
          <img
            class="lib_user_pto"
            src="../assets/images/head_photo.png"
            alt=""
          />
          <el-dropdown trigger="click" @command="headCommand">
            <span class="el-dropdown-link">
              <span class="lib_user">{{ getUserName }}</span
              ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="person">
                <i class="iconfont icon-wode" style="font-size:0.18rem"></i>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                <i class="el-icon-switch-button" style="font-size:0.18rem"></i>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="lib_contains">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Url from "@/assets/js/url.js";
export default {
  name: "library",
  data() {
    return {
      headIcon: "",
      // power1: false,
      // power11: false,
      power2: false,
      power3: false,
      power5: false,
      power4: false,
      power6: "",
      power41: false,
      power42: false,
      power43: false,
      power44: false,
      isCollapse: false,
      activeUrl: "index"
      // listArr: [
      //   {
      //     id: 1,
      //     txt: "主页",
      //     path: "libraryIndex",
      //     img: require("../assets/images/tabs/nav_off.png"),
      //     act: require("../assets/images/tabs/nav_on.png"),
      //     tabs: [
      //       {
      //         id: 101,
      //         txt: "主页",
      //         path: "libraryIndex",
      //         img: require("../assets/images/tabs/nav_off.png"),
      //         act: require("../assets/images/tabs/nav_on.png")
      //       },
      //       {
      //         id: 102,
      //         txt: "个人中心",
      //         path: "libraryPerson",
      //         img: require("../assets/images/tabs/nav_off.png"),
      //         act: require("../assets/images/tabs/nav_on.png")
      //       }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     txt: "评估报告",
      //     path: "market",
      //     img: require("../assets/images/tabs/nav_off.png"),
      //     act: require("../assets/images/tabs/nav_on.png")
      //   },
      //   {
      //     id: 3,
      //     txt: "学生管理",
      //     path: "staff",
      //     img: require("../assets/images/tabs/nav_off.png"),
      //     act: require("../assets/images/tabs/nav_on.png")
      //   },
      //   {
      //     id: 4,
      //     txt: "基础设置",
      //     path: "index",
      //     img: require("../assets/images/tabs/nav_off.png"),
      //     act: require("../assets/images/tabs/nav_on.png"),
      //     tabs: [
      //       {
      //         id: 401,
      //         txt: "学校信息",
      //         path: "index",
      //         img: require("../assets/images/tabs/nav_off.png"),
      //         act: require("../assets/images/tabs/nav_on.png")
      //       },
      //       {
      //         id: 402,
      //         txt: "教师管理",
      //         path: "index",
      //         img: require("../assets/images/tabs/nav_off.png"),
      //         act: require("../assets/images/tabs/nav_on.png")
      //       },
      //       {
      //         id: 403,
      //         txt: "班级管理",
      //         path: "index",
      //         img: require("../assets/images/tabs/nav_off.png"),
      //         act: require("../assets/images/tabs/nav_on.png")
      //       },
      //       {
      //         id: 404,
      //         txt: "角色管理",
      //         path: "index",
      //         img: require("../assets/images/tabs/nav_off.png"),
      //         act: require("../assets/images/tabs/nav_on.png")
      //       }
      //     ]
      //   }
      // ]
    };
  },
  created() {
    this.getPath();
    this.powerData();
    this.getSchoolInfo()
  },
  methods: {
    ...mapMutations(["setCollapseFlag"]),
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power2 = power.includes(20000); // 评估报告
      this.power3 = power.includes(30000); // 心理档案
      this.power5 = power.includes(40000); // 基础设置
      this.power4 = power.includes(50000); // 系统管理
      this.power41 = power.includes(50100); // 组织架构
      this.power42 = power.includes(50200); // 用户设置
      this.power43 = power.includes(50300); // 管理员设置
      this.power44 = power.includes(50400); // 角色设置
      this.power6 = localStorage.getItem("passport")
    },
    getPath() {
      if (this.$route.name == "person") {
        this.activeUrl = "index";
      } else if (this.$route.name == "review") {
        this.activeUrl = "heart";
      } else if (
        this.$route.name == "adduser" ||
        this.$route.name == "detailuser" ||
        this.$route.name == "batchuser"
      ) {
        this.activeUrl = "user";
      } else if (
        this.$route.name == "addadmin" ||
        this.$route.name == "detailadmin" ||
        this.$route.name == "batchadmin"
      ) {
        this.activeUrl = "admin";
      } else if (this.$route.name == "power") {
        this.activeUrl = "role";
      } else if (this.$route.name == "expword") {
        this.activeUrl = "report";
      } else {
        this.activeUrl = this.$route.name;
      }
    },
    getSchoolInfo() {
      let that = this;
      that.$http
        .get(Url + "/aimw/organization/listOrganizationInfo")
        .then(res => {
          var data = res.data.data;
          if (res.data.code == 0) {
            if (data.headIcon == '') {
              that.headIcon = ''
            } else {
              that.headIcon = 'data:image;base64,' + data.headIcon;
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    headCommand(command) {
      if (command == "person") {
        this.toPerson();
        this.activeUrl = this.$route.name;
      }
      if (command == "logout") {
        this.logout();
      }
    },
    toPerson() {
      this.$router.push({
        name: "person"
      });
    },
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
        this.$router.replace({
          path: "/login"
        });
      });
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
      this.setCollapseFlag(this.isCollapse);
    },
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    },
    handleSelect(e, key) {
      var data = {};
      this.activePath = e;
      if (e == "person") {
        e = "index";
      }
      if (e == "review") {
        e = "heart";
      }
      if (e == "adduser" || e == "batchuser") {
        e = "user";
      }
      this.activeUrl = e;
      this.$router.push({ path: "/library/" + e });
    }
  },
  computed: {
    ...mapGetters(["getUserName"])
  },
  watch: {
    $route: "getPath"
  }
};
</script>

<style lang="less">
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
  color: #006cff !important;
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
    color: #006cff !important;
    background: linear-gradient(
      0deg,
      rgba(196, 236, 255, 0.14) 0%,
      rgba(151, 205, 255, 0.14) 100%
    );
  }
}

.library_wrap {
  display: flex;
  .lib_list {
    overflow-y: auto;
    height: 100vh;
    background: linear-gradient(180deg, #005acb, #4196ff);
    box-shadow: 5px 0px 16px 0px rgba(204, 208, 223, 0.49);
    .el-menu {
      background: transparent;
      border-right: 0;
    }
    .el-submenu__title i,
    .el-menu-item i {
      color: #ffffff !important;
    }
    .el-menu-item.is-active {
      color: #07f6ff !important;
      background: transparent;
    }
    .el-submenu__title:hover {
      background: transparent;
      color: #ffffff !important;
    }

    .tab_list {
      width: 3.08rem;

      .tab_top {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.36rem 0 0.22rem;
        .tab_logo {
          width: 0.68rem;
          height: 0.68rem;
          margin: 0 0.08rem;
          border-radius: 0.08rem;
        }
        .tab_logo_text {
          margin: 0 0.08rem 0 0.06rem;
          width: 1.44rem;
          height: 0.58rem;
        }
      }
      .tab_nemu {
        text-align: left;
        margin-bottom: 0.4rem;

        img {
          width: 0.18rem;
          height: 0.18rem;
          margin-right: 0.18rem;
        }
        .el-submenu__title {
          padding: 0 0.24rem 0 0.33rem !important;
          border-left: 0.04rem solid;
          border-image: linear-gradient(-1deg, transparent, transparent) 1 1;
          height: 0.62rem;
          line-height: 0.62rem;
          font-size: 0.18rem;
        }
        .dan_li {
          padding: 0 0.24rem 0 0.33rem !important;
          height: 0.62rem;
          line-height: 0.62rem;
          border-left: 0.04rem solid;
          border-image: linear-gradient(-1deg, transparent, transparent) 1 1;
        }
        .dan_li.is-active {
          color: #ffffff !important;
          background: rgba(65, 150, 255, 0.66);
          border-left: 0.04rem solid;
          border-image: linear-gradient(-1deg, #29dcff, #b4efff) 1 1;
        }
        .el-menu-item {
          font-size: 0.18rem;
        }
        .el-menu--inline {
          .el-menu-item {
            min-width: auto;
            padding-left: 0.58rem !important;
            height: 0.46rem;
            line-height: 0.46rem;
          }
        }
        .el-submenu.is-active .el-submenu__title {
          background: rgba(65, 150, 255, 0.66);
          border-left: 0.04rem solid;
          border-image: linear-gradient(-1deg, #29dcff, #b4efff) 1 1;
        }
        .li_icon {
          display: inline-block;
          margin-right: 0.04rem;
          .li_dashed {
            width: 0;
            height: 0.14rem;
            border-left: 0.01rem dashed #07f6ff;
            margin-left: 0.04rem;
          }
          .li_circle {
            width: 0.09rem;
            height: 0.09rem;
            border: 0.01rem solid #07f6ff;
            border-radius: 50%;
            margin: 0.04rem 0;
          }
          .li_cir_act {
            background: #07f6ff;
          }
          .li_tras{
            border-color: transparent;
          }
        }
      }
    }
    .tab_list1 {
      width: auto;
      .el-menu--collapse {
        width: auto;
      }
      .el-tooltip {
        padding: 0 0.24rem 0 0.33rem !important;
      }
    }
  }
  .lib_main {
    flex: 1;
    text-align: center;
    background: #e2f0f9;
    padding-top: 0.72rem;
    height: 100vh;
    position: relative;
    .lib_contains {
      position: absolute;
      top: 0.72rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
    }
    .lib_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.72rem;
      background: #ffffff;
      box-shadow: 0px 3px 27px 0px rgba(66, 79, 128, 0.11);
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      .lib_head_left {
        img {
          width: 0.18rem;
          height: 0.16rem;
          margin: 0 0.24rem;
        }
      }
      .lib_head_right {
        height: 0.72rem;
        margin: 0 0.24rem;
        display: flex;
        align-items: center;
        .lib_user_pto {
          width: 0.36rem;
          height: 0.36rem;
          background: #ccc;
          border-radius: 50%;
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
</style>
