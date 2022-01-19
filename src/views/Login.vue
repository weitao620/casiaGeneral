<template>
  <div class="login_wrap">
    <div class="login">
      <div class="form_wrap">
        <img class="login_logo" src="./../assets/logo.png" alt="" />
        <div class="login_title"><span>AI</span>心世界后台管理系统</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="error_msg" v-if="errorMsg.length > 0">{{ errorMsg }}</div>
          <el-form-item label="" prop="usercount">
            <img class="login_uesr" src="../assets/images/yonghu.png" alt="" />
            <el-input
              @focus="clearError"
              v-model="ruleForm.usercount"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <img class="login_pass" src="../assets/images/mima.png" alt="" />
            <el-input
              @focus="clearError"
              :type="swicthFlag ? 'text' : 'password'"
              @keyup.enter.native="submitForm('ruleForm')"
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
            <div class="switchStyle">
              <el-switch
                active-text="123"
                inactive-text="***"
                v-model="swicthFlag"
              >
              </el-switch>
            </div>
          </el-form-item>
          <div class="reminds">
            <el-checkbox v-model="ruleForm.remember"
              >记住账号和密码</el-checkbox
            >
          </div>
          <el-form-item class="sub_btn">
            <el-button @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
          <div class="use_xy">
            <span>登录即代表同意</span><span class="xy_icon" @click="xyLayer">「使用协议」</span>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog
      class="fix_pass look_group yx_tip"
      :close-on-click-modal="false"
      title="使用协议"
      :visible.sync="dialogXy"
    >
      <div class="group_box">
        <h3>用户使用协议</h3>
        <div class="tt">1.特别提示</div>
        <p class="tp">1.1 为使用本应用软件及相关服务，您应当阅读并遵守《用户使用协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及同意或使用某项服务的单独协议，并选择接受或不接受。</p>
        <p class="tp">1.2 除非您已阅读并接受本协议所有条款，否则您无权下载、安装或使用本软件及相关服务。您的下载、安装、使用、获取账号、登录等行为即视为您已阅读并同意上述协议的约束。</p>

        <div class="tt">2.协议的范围</div>
        <p class="tp">本协议是用户与本公司之间关于用户下载、安装、使用、复制本软件，以及使用本公司相关服务所订立的协议。</p>

        <div class="tt">3.服务内容与授权使用范围</div>
        <p class="tp">3.1 本软件根据用户实际需求提供服务。本公司保留随时变更、中断或终止部分或全部本服务的权利。</p>
        <p class="tp">3.2 本软件应用的授权使用范围∶</p>
        <span class="ts">1）用户可以在电脑上安装、使用、显示、运行本软件。</span>
        <span class="ts">2）保留权利∶未明示授权的其他一切权利均由本公司所有。</span>

        <div class="tt">4.使用规则</div>
        <p class="tp">4.1 账号使用规则</p>
        <span class="ts">4.1.1 用户在使用本软件前需要注册一个账号。用户注册时需要提供准确的个人资料，如个人资料有任何变动，需要及时更新。如因注册信息不准确而引起的问题由用户本人承担，本公司不负任何责任并有权暂停或终止用户的账号。</span>
        <span class="ts">4.1.2 本软件账号的所有权归本公司所有，用户完成申请注册手续后，仅获得账号的使用权，且该使用权仅属于初始申请注册人。同时，初始申请注册人不得赠与、借用、租用、转让或售卖账号或者以其他方式许可非初始申请注册人使用账号。</span>
        <span class="ts">4.1.3 如若有任何第三方向本公司发出指示，在确认其提供账户、密码信息准确无误的情况下，用户同意且本公司有权视该行为获得了用户的充分授权，该行为所产生结果直接归属于用户本身。</span>
        <span class="ts">4.1.4 用户承担账号与密码的保管责任，用户对以其账号发生的或通过其账号发生的一切活动和事件（包括但不限于用户发表的任何内容以及由此产生的任何结果）负全部法律责任。用户须重视账号与密码的保护，若因为用户自身原因，而导致账号与密码遭他人非法使用时，本公司将不承担任何责任。用户自身原因包括但不限于：任意向第三者透露账号和密码及所有注册资料；多人共享同一个账号；安装非法或来路不明的程序等。</span>
        <span class="ts"></span>
        <p class="tp">4.2 用户使用规则</p>
        <span class="ts">4.2.1 用户在使用本软件时，必须遵循以下原则∶</span>
        <span class="ts1">1）遵守中国有关的法律和法规；</span>
        <span class="ts1">2）不得为任何非法目的而使用本服务系统；</span>
        <span class="ts1">3）遵守所有与本服务有关的网络协议、规定和程序；</span>
        <span class="ts1">4）不得利用本软件系统进行任何可能对互联网的正常运转造成不利影响的行为；</span>
        <span class="ts1">5）不得利用本软件服务系统进行任何不利于其他用户的行为；</span>
        <span class="ts1">6）如发现任何非法使用用户账号或账号出现安全漏洞的情况，应立即通告本公司。</span>
        <span class="ts">4.2.2 本公司致力于为用户提供文明健康、规范有序的服务，用户应遵守中华人民共和国相关法律法规（如果用户是中华人民共和国境外的使用者，还应遵守所属国家或地区的法律法规），用户将自行承担用户所发布的信息内容的责任。特别地，用户不得发布下列内容：</span>
        <span class="ts1">1）反对中华人民共和国宪法所确定的基本原则的；</span>
        <span class="ts1">2）危害国家统一、主权和领土完整的；</span>
        <span class="ts1">3）泄露国家秘密，危害国家安全或者损害国家荣誉和利益的；</span>
        <span class="ts1">4）煽动民族仇恨、民族歧视，破坏民族团结或者侵害民族风俗、习惯的；</span>
        <span class="ts1">5）破坏国家宗教政策，宣扬邪教、迷信的；</span>
        <span class="ts1">6）散布谣言，扰乱社会秩序，破坏社会稳定的；</span>
        <span class="ts1">7）散布淫秽、赌博、暴力或者教唆犯罪的；</span>
        <span class="ts1">8）侮辱或者诽语他人，侵害他人合法权益的；</span>
        <span class="ts1">9）危害社会公德或者民族优秀文化传统的；</span>
        <span class="ts1">10）含有中华人民共和国法律行政法规禁止的其他内容的。</span>

        <div class="tt">5.知识产权</div>
        <p class="tp">5.1 本公司是本软件的知识产权权利人。本软件的一切著作权、商标权、专利权、商业秘密等知识产权，以及与本软件相关的所有信息内容（包括但不限于文字、图片、音频、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应的国际条约保护，本公司享有上述知识产权，除非事先经本公司的合法授权，任何人皆不得擅自以任何形式使用，否则本公司可立即终止向该用户提供产品和服务，并依法追究其法律责任，赔偿本公司的一切损失。</p>
        <p class="tp">5.2 用户只有在获得本公司或其他相关权利人的授权之后才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。</p>
        <p class="tp">5.3 用户在本软件上发布的信息不得侵犯任何第三人的知识产权，未经相关权利人之事先书面同意，用户不得以任何方式上传、发布、修改、传播或复制任何受著作权保护的材料、商标或属于其他人的专有信息。</p>
        <p class="tp"></p>
        <span class="ts"></span>
        <span class="ts1"></span>

        <div class="tt">6.隐私保护</div>
        <p class="tp">6.1 保护用户隐私是本软件的一项基本政策，本公司保证未经用户同意不对外公开或向第三方提供用户申请资料及用户在使用本服务时存储在本软件的个人信息，但下列情况除外∶</p>
        <span class="ts">1）事先获得用户的明确授权；</span>
        <span class="ts">2）根据有关的法律法规要求；</span>
        <span class="ts">3）按照相关政府主管部门的要求。</span>
        <p class="tp">6.2 在不透露单个用户隐私资料的前提下，本公司有权对整个用户数据库进行分析并对用户数据库进行商业上的利用（包括但不限于公布、分析或以其它方式使用用户访问量、访问时段、用户偏好等用户数据信息）。</p>

        <div class="tt">7.免责声明</div>
        <p class="tp">7.1 对于本软件，本公司仅作下述有限保证，该有限保证取代任何文档、包装、或其他资料中的任何其他明示或默示的保证如果有）。本公司仅以“现有状况且包含所有错误”的形式提供相关的产品、软件或程序及任何支持服务，并仅保证∶</p>
        <span class="ts">1）本软件应用所提供的产品和服务能基本符合本软件应用正式公布的要求；</span>
        <span class="ts">2）本软件应用所提供的相关产品和服务基本与本软件应用正式公布的服务承诺相符；</span>
        <span class="ts">3）本软件应用仅在商业上允许的合理范围内尽力解决本软件应用在提供产品和服务过程中所遇到的任何问题。</span>
        <p class="tp">7.2 在适用法律允许的最大范围内，本公司明确表示不提供任何其他类型的保证，不论是明示的或默示的，包括但不限于本软件的适销性、适用性、可靠性、准确性、完整性、无病毒以及无错误的任何明示或默示保证和责任。</p>
        <p class="tp">7.3 在适用法律允许的最大范围内，本公司并不担保本软件所提供的产品和服务一定能满足用户的要求，也不担保提供的产品和服务不会被中断，并且对产品和服务的及时性、安全性以及信息是否能准确、及时、顺利地传送均不作任何担保。</p>
        <p class="tp">7.4 在适用法律允许的最大范围内，本公司不就因用户使用本软件的产品和服务引起的，或在任何方面与本软件的产品和服务有关的任何意外的、非直接的、特殊的、或间接的损害或请求（包括但不限于因人身伤害、因隐私泄漏、因未能履行包括诚信或合理谨慎在内的任何责任、因过失和因任何其他金钱上的损失或其他损失而造成的损害赔偿）承担任何责任。</p>
        <p class="tp">7.5 本公司保留采取包括但不限于合并服务器等形式以达到服务器资源优化利用的权利，并对由此而可能导致的用户利益损失不承担责任。</p>
        <p class="tp">7.6 用户在本软件应用上所表达的观点、建议等内容均为用户本人看法，不代表本公司及本软件官方的观点。对于用户违法或者违反本协议的使用而引起的一切责任，由用户负全部责任，一概与本公司无关，导致本公司损失的，本公司有权要求用户赔偿，并有权立即停止向其提供服务。</p>
        <p class="tp">7.7 用户经由本软件本服务与广告商进行通讯联系或商业往来或参与促销活动，完全属于用户与广告商之间的行为，与本公司没有任何关系，若因商业行为所产生之任何损害或损失，本公司不承担任何责任。</p>

        <div class="tt">8.服务变更、中断或终止</div>
        <p class="tp">8.1 软件更新</p>
        <span class="ts">8.1.1 为了改善用户体验、完善服务内容，本公司将不断努力开发新的服务，并为用户不时提供软件更新（这些更新可能会采取软件替换、修改、功能强化、版本升级等形式）。</span>
        <span class="ts">8.1.2 为了保证本软件及服务的安全性和功能的一致性，本公司有权不经向用户特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。本软件新版本发布后，旧版本的软件可能无法使用。本公司不保证旧版本软件继续可用及相应的客户服务，请用户随时核对并下载最新版本。</span>
        <p class="tp">8.2 为了软件的正常运行，本软件应用需要定期或不定期地对软件进行停机维护，因此类情况而造成的正常服务中断、停止，用户应该予以理解，本公司应尽力避免服务中断、停止或将中断、停止时间限制在最短时间内。</p>
        <p class="tp">8.3 服务中断或终止</p>
        <span class="ts">8.3.1 如发生下列任何一种情形，本公司有权随时中断或终止向用户提供本协议项下的本服务而无需通知用户，对因此而产生的不便或损害，本公司对用户或第三人均不承担任何责任。</span>
        <span class="ts1">1）定期检查或施工，更新软硬件等，本公司有权暂停服务，但我们会尽快完成维护、更新工作；</span>
        <span class="ts1">2）服务器遭受损坏，无法正常运作；</span>
        <span class="ts1">3）突发性的软硬件设备与电子通信设备故障；</span>
        <span class="ts1">4）网络提供商线路或其它故障；</span>
        <span class="ts1">5）在紧急情况之下为维护国家安全或其它用户及第三者之人身安全；</span>
        <span class="ts1">6）地震等不可抗力及其他第三方原因造成服务瘫痪、中断或丢失。</span>

        <div class="tt">9.违约责任</div>
        <p class="tp">9.1 如果本公司发现用户有下列任一行为的，有权根据相应本服务的公约或守则的规定，采取相应措施∶包括但不限于对该用户账号的冻结、终止、删除;用户在此承诺本公司有权作出上述行为，并承诺不就上述行为要求本公司做任何补偿或退费∶</p>
        <span class="ts">1）用户提供虚假注册信息；</span>
        <span class="ts">2）用户违反本协议中规定的使用规则；</span>
        <span class="ts">3）通过非法手段、不正当手段或其他不公平的手段使用本软件的产品和服务或参与本软件活动；</span>
        <span class="ts">4）有损害本软件正当利益的行为；</span>
        <span class="ts">5）有严重损害其他用户的行为；</span>
        <span class="ts">6）有违反中华人民共和国的法律、法规的行为或言论；</span>
        <span class="ts">7）其他妨碍本软件提供产品和服务或本公司认为的严重不当行为；</span>
        <span class="ts">8）同一用户若有任一账号存在上述任一行为的，本公司有权对该用户下的所有账号予以制裁，包括但不限于冻结账号、删除账号、终止服务等。本公司因上述原因删除用户注册的账号后即不再对用户承担任何义务和责任。</span>
        <p class="tp">9.2 用户同意保障和维护本软件及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给本软件或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。</p>

        <div class="tt">10.法律管辖</div>
        <p class="tp">10.1 本协议的订立、执行和解释及争议的解决均应适用中国法律。</p>
        <p class="tp">10.2 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，用户和本公司一致同意交由软件运营商所在地有管辖权的法院管辖。</p>

      </div>
      <div slot="footer" class="dialog-footer" style="width:1.12rem;height:0.36rem;margin:0 auto;">
        <el-button type="primary" @click="dialogXy = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Url from "@/assets/js/url.js";
export default {
  inject: ["reload"],
  name: "login",
  data() {
    var checkName = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      }
      callback();
    };
    var code = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      }
      callback();
    };

    return {
      dialogXy: false,
      errorMsg: "",
      ruleForm: {
        password: "",
        usercount: "",
        remember: false
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        usercount: [{ validator: checkName, trigger: "blur" }]
      },
      swicthFlag: false
    };
  },

  mounted() {

  },
  created() {
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData) {
      this.ruleForm = loginData;
    }
  },
  methods: {
    xyLayer() {
      this.dialogXy = true
    },
    // 清空报错信息
    clearError() {
      this.errorMsg = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.subLogin();
        } else {
          return false;
        }
      });
    },
    subLogin() {
      let that = this;
      let param = {
        passport: that.ruleForm.usercount,
        password: that.ruleForm.password
      };
      localStorage.setItem('passport', that.ruleForm.usercount)
      if (that.ruleForm.usercount == 'admins') {
        localStorage.setItem("isLogin", true);
        if (that.ruleForm.remember) {
          localStorage.setItem("loginData", JSON.stringify(that.ruleForm));
        } else {
          localStorage.removeItem("loginData");
        }
        that.setUserName("系统管理员");
        that.$router.replace({
          path: "/library"
        });
      } else {
        that.$http
          .post(Url + "/aimw/user/login", param)
          .then(res => {
            var data = res.data;
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
              localStorage.setItem("userType", data.data.type);
              localStorage.setItem("algTypes", JSON.stringify(data.data.algTypes));
              if (that.ruleForm.remember) {
                localStorage.setItem("loginData", JSON.stringify(that.ruleForm));
              } else {
                localStorage.removeItem("loginData");
              }
              that.getUserInfo();
            } else {
              that.errorMsg = data.msg;

              // that.getUserInfo();
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    getUserInfo() {
      let that = this;
      that.$http
        .get(Url + "/aimw/user/getUserProfile", {
          params: { passport: that.ruleForm.usercount }
        })
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            if (data.data.accountState == 2) {
              this.$alert(<span style='text-align:center;padding: 0.2rem 0.05rem;color: #333333 !important;font-size: 0.2rem; '>该账号处于禁用状态，请联系管理员！</span>, '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              });
              return false
            }
            localStorage.setItem("isLogin", true);
            localStorage.setItem("userInfo", JSON.stringify(data.data));
            sessionStorage.setItem("userName", data.data.name);
            that.setUserName(data.data.name);
            that.$router.replace({
              path: "/library/index"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    ...mapMutations(["setUserName"])
  }
};
</script>
<style lang="less">
  .el-message-box__content {
    color: #333333 !important;
    p{
      line-height: 0.24rem;
      font-size: 0.2rem;
    }
  }
  .el-message-box__wrapper .el-message-box .el-message-box__btns{
    justify-content: center;
  }
</style>
<style lang="less">
.login_wrap {
  position: absolute;
  // z-index: 9;
  height: 100%;
  min-width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  min-height: 5.4rem;
  background: url("../assets/images/bj.png") no-repeat center center;
  background-size: cover;
  background-color: #4196ff;
  .el-form-item__content {
    line-height: 0.4rem;
    font-size: 0.14rem;
  }
  .el-form-item__error {
    font-size: 0.12rem;
    padding-top: 0.04rem;
  }
  .el-switch {
    font-size: 0.14rem;
    line-height: 0.2rem;
    height: 0.2rem;
  }
  .el-switch__label--left {
    margin-right: 0.1rem;
  }
  .el-switch__label,
  .el-switch__core {
    height: 0.2rem;
  }
  .el-switch__core {
    border: 0.01rem solid #dcdfe6;
  }
  .el-switch__label * {
    line-height: 0.21rem;
    font-size: 0.14rem;
  }
  .el-switch__core:after {
    top: 0.01rem;
    left: 0.01rem;
  }
  .el-switch.is-checked .el-switch__core::after {
    margin-left: -0.17rem;
  }
  .login {
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 11.62rem;
    height: 5.98rem;
    border-radius: 0.06rem;
    background: url(../assets/images/login_bg.png) no-repeat center center;
    background-size: cover;
    .form_wrap {
      width: 3.6rem;
      position: absolute;
      top: 0.88rem;
      right: 1.2rem;
      .demo-ruleForm {
        position: relative;
      }
      .error_msg {
        position: absolute;
        top: -0.17rem;
        line-height: 1;
        left: 0;
        color: #fe5fb8 !important;
        font-size: 0.14rem !important;
      }
      .login_logo {
        width: 0.68rem;
        height: 0.68rem;
        margin: 0 auto 0.22rem;
        display: block;
      }
      .login_title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.28rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        line-height: 0.34rem;
        margin-bottom: 0.48rem;
        background: linear-gradient(-1deg, #2b87ed 0%, #00b0ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        span {
          display: inline-block;
          font-size: 0.32rem;
          font-family: Montserrat;
        }
      }
      .demo-ruleForm {
        .reminds {
          display: flex;
          .el-checkbox__inner {
            width: 0.16rem;
            height: 0.16rem;
          }
          .el-checkbox__inner::after {
            top: 0.02rem;
            left: 0.05rem;
          }
        }
        .el-form-item {
          margin-bottom: 0.18rem;
        }
        .el-form-item__content {
          margin-left: 0 !important;
          position: relative;
          .switchStyle {
            display: flex;
            position: absolute;
            right: 0.13rem;
            top: 0.1rem;
            .el-switch__core {
              background: linear-gradient(261deg, #b8d5f5, #8fb1d7);
            }
            .is-checked .el-switch__core {
              border-color: #ffffff;
              background: linear-gradient(90deg, #00eafe, #00b6f0);
            }
            .el-switch__label {
              position: absolute;
              display: none;
              color: #fff;
            }
            .el-switch__label--left {
              z-index: 9;
              left: 0.06rem;
              line-height: 0.26rem;
              font-size: 0.14rem;
            }
            .el-switch__label--right {
              z-index: 9;
              left: -0.18rem;
              line-height: 0.2rem;
              font-size: 0.14rem;
            }
            .el-switch__label.is-active {
              display: block;
            }
            .el-switch .el-switch__core,
            .el-switch .el-switch__label {
              width: 0.46rem !important;
            }
            .el-switch__core:after {
              width: 0.16rem;
              height: 0.16rem;
            }
          }
          .login_uesr {
            position: absolute;
            width: 0.14rem;
            height: 0.14rem;
            left: 0.14rem;
            top: 0.13rem;
            z-index: 1;
          }
          .login_pass {
            position: absolute;
            width: 0.12rem;
            height: 0.14rem;
            left: 0.15rem;
            top: 0.14rem;
            z-index: 1;
          }
          .login_phone {
            position: absolute;
            width: 0.12rem;
            height: 0.15rem;
            left: 0.14rem;
            top: 0.13rem;
            z-index: 1;
          }
          .login_key {
            position: absolute;
            width: 0.12rem;
            height: 0.16rem;
            left: 0.14rem;
            top: 0.13rem;
            z-index: 1;
          }
          .code_wrap {
            position: absolute;
            right: 0;
            width: 1rem;
            height: 0.16rem;
            top: 50%;
            z-index: 3;
            text-align: center;
            line-height: 0.16rem;

            margin-top: -0.08rem;
            border-left: 0.01rem solid #d9e3e8;

            .code_txt1 {
              font-size: 0.12rem;
              color: #1bb7ff;
              cursor: pointer;
            }
          }
          .el-input {
            input:-internal-autofill-selected {
              background: rgba(255, 255, 251, 1) !important;
            }
          }
          .el-button--default {
            width: 100%;
            height: 0.4rem;
            background: linear-gradient(263deg, #0075ff, #00c2ff);
            box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
            border-radius: 0.02rem;
            border: none;
            color: #fff;
            padding: 0;
            line-height: 0.4rem;
            font-size: 0.16rem;
            font-weight: 400;
          }
          .el-button--default:hover {
            color: #fff;
            border-color: none;
            background: linear-gradient(263deg, #0075ff, #00c2ff);
          }
          .el-input__inner {
            height: 0.4rem;
            line-height: 0.14rem;
            padding: 0 0.7rem 0 0.4rem;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 0.02rem;
            border: 0.01rem solid #e1e9ff;
            font-size: 0.14rem !important;
          }
          .code_inner .el-input__inner {
            padding-right: 1rem;
          }
          .el-input__inner:focus {
            border: 0.01rem solid #e1e9ff;
          }
          .el-input__inner:focus {
            border: 0.01rem solid #2aa1f6;
          }
        }
        .sub_btn {
          margin-top: 0.3rem;
        }
        .use_xy{
          display: flex;
          justify-content: flex-end;
          span{
            font-size: 0.14rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #354B70;
            line-height: 1;
          }
          .xy_icon{
            color: #0077FF;
            cursor: pointer;
          }
        }
      }
    }
    .register {
      color: #1bb7ff;
      font-size: 0.12rem;
      text-align: center;
      padding-top: 0.1rem;
      cursor: pointer;
    }
    .form_zuce {
      top: 0.31rem;
      .login_logo {
        width: 0.77rem;
        height: 0.54rem;
      }
      .zuce_txt {
        color: #0a497f;
        text-align: center;
        font-size: 0.14rem;
        padding: 0.12rem 0 0.19rem;
      }
      .demo-ruleForm {
        .sub_btn {
          margin-top: 0;
        }
        .el-form-item__content {
          .el-input__inner {
            height: 0.4rem;
            padding: 0 0.15rem;
          }
        }
      }

      .register {
        padding-top: 0;
      }
    }
    .zuce_success {
      height: 3.7rem;
      .success_txt {
        text-align: center;
        padding: 0.8rem 0 0.76rem;
        font-size: 0.16rem;
        color: #0a497f;
        font-weight: bold;
      }
      .login_btn {
        height: 0.4rem;
        width: 100%;
        text-align: center;
        border-radius: 0.05rem;
        background: #1bb7ff;
        line-height: 0.4rem;
        color: #ffffff;
        font-size: 0.13rem;
        font-weight: 500;
        margin-bottom: 1.16rem;
        cursor: pointer;
      }
      .success_btm {
        height: 0.16rem;
        width: 2.7rem;
        position: absolute;
        bottom: 0.2rem;
        left: 50%;
        margin-left: -1.35rem;
        text-align: center;
        font-size: 0.12rem;
        color: #0a497f;
      }
    }
  }
  .yx_tip{
    .el-dialog{
      width: 8.04rem;
      height: 6.5rem;
      .el-dialog__body{
        padding: 0.2rem 0.3rem;
        height: 5.18rem;
        overflow:auto;
        .group_box{
          text-align: left;
          h3, div, p, span{
            display: block;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 1.8;
          }
          h3{
            margin:0.1rem auto 0.12rem;
            font-size: 0.20rem;
            font-weight: 900;
            color: #354B70;
            text-align: center;
          }
          .tt{
            font-size: 0.16rem;
            color: #354B70;
          }
          .tp{
            font-size: 0.14rem;
            color: #7786AC;
            padding: 0 0 0 0.28rem;
          }
          .ts{
            font-size: 0.14rem;
            color: #7786AC;
            padding: 0 0 0 0.56rem;
          }
          .ts1{
            font-size: 0.14rem;
            color: #7786AC;
            padding: 0 0 0 0.84rem;
          }
        }
      }
      .el-dialog__footer{
        padding: 0.2rem 0.15rem 0;
        margin: 0  auto 0.3rem
      }
    }
  }
}
</style>
