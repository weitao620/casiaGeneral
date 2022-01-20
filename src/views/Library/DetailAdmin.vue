<template>
  <div class="add_admin_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/library/admin' }">管理员管理</el-breadcrumb-item>
          <el-breadcrumb-item>编辑管理员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="person_main">
      <div class="person_box">
        <el-form
          label-position="right"
          class="person_contain"
          label-width="1.4rem"
          :model="formAddAdmin"
        >
          <div class="person_msg">
            <img src="../../assets/images/personMsg.png" alt="" />
            基础信息
          </div>
          <el-form-item v-if="fid40101.enable == 1" :required="fid40101.required == 1" :label="fid40101.fieldName + '：'">
            <el-input
              v-model="formAddAdmin.newPassport"
              :placeholder="'请输入' + fid40101.fieldName"
               :disabled="formAddAdmin.newPassport == 'administrator'"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="passportFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请输入{{fid40101.fieldName}}且只能包含数字、字母的6~20位字符
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid40102.enable == 1" :required="fid40102.required == 1" :label="fid40102.fieldName + '：'">
            <el-input
              style="width:1.6rem"
              type="password"
              @input="newChange"
              @focus="newFcous"
              @blur="newBlur"
              v-model="formAddAdmin.password"
              placeholder="手动设置密码"
            ></el-input>
            <div style="margin-left:0.1rem">
              <el-radio-group v-model="singleBtn">
                <el-radio
                  :label="1"
                  :disabled="!singleBtn"
                  @click.native.prevent="singleChange(1)"
                  >默认密码:{{fid40101.fieldName}}后6位</el-radio
                >
              </el-radio-group>
            </div>
            <div class="tip_left" style="width:3.48rem" v-show="newPassFlag">
              <div class="tip_msg">
                <img v-if="newRight1" src="../../assets/images/ok.png" alt="" />
                <img v-else src="../../assets/images/x.png" alt="" />
                6-20个字符
              </div>
              <div class="tip_msg">
                <img v-if="newRight2" src="../../assets/images/ok.png" alt="" />
                <img v-else src="../../assets/images/x.png" alt="" />
                只能包含字母、数字组合以及标点符号（除空格）
              </div>
              <div class="tip_msg">
                <img v-if="newRight3" src="../../assets/images/ok.png" alt="" />
                <img v-else src="../../assets/images/x.png" alt="" />
                字母、数字和标点符合至少包含2种
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid40103.enable == 1" :required="fid40103.required == 1" :label="fid40103.fieldName + '：'">
            <el-input
              v-model="formAddAdmin.name"
              :placeholder="'请输入' + fid40103.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="nameFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请输入{{fid40103.fieldName}}
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid40104.enable == 1" :required="fid40104.required == 1" :label="fid40104.fieldName + '：'">
            <el-input
              v-model="formAddAdmin.phone"
              :placeholder="'请输入' + fid40104.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="phoneFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid40104.fieldName}}不能为空 / 格式有误
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid40105.enable == 1" :required="fid40105.required == 1" :label="fid40105.fieldName + '：'">
            <el-input
              v-model="formAddAdmin.email"
              :placeholder="'请输入' + fid40105.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="emailFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid40105.fieldName}}不能为空 / 格式有误
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid40106.enable == 1" :label="fid40106.fieldName + '：'">
            <el-input
              class="el-phone0"
              v-model="formAddAdmin.areaCode"
              placeholder="电话区号"
            ></el-input>
            <el-input
              class="el-phone1"
              v-model="formAddAdmin.telephone"
              placeholder="电话号码"
            ></el-input>
            <el-input
              class="el-phone2"
              v-model="formAddAdmin.extensionNumber"
              placeholder="分机号码"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="telFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid40106.fieldName}}格式有误
              </div>
            </div>
          </el-form-item>
          <div class="person_msg">
            <img src="../../assets/images/personMsg.png" alt="" />
            辅助信息
          </div>
          <el-form-item v-if="fid40107.enable == 1" :required="fid40107.required == 1" :label="fid40107.fieldName + '：'">
            <el-input
              v-model="formAddAdmin.jobNumber"
              :placeholder="'请输入' + fid40107.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="jobFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid40107.fieldName}}不能为空
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid40108.enable == 1" :required="fid40108.required == 1" :label="fid40108.fieldName + '：'">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="formAddAdmin.remark"
              maxlength="200"
              show-word-limit
            >
            </el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="remarkFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid40108.fieldName}}不能为空
              </div>
            </div>
          </el-form-item>
          <el-form-item class="sub_center">
            <el-button type="primary" @click="addSubmit">保存</el-button>
            <el-button type="primary" class="resets" @click="goBack"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Url from "@/assets/js/url.js";
export default {
  name: "person",
  data() {
    return {
      singleBtn: 1,
      newPassFlag: false,
      newRight1: false,
      newRight2: false,
      newRight3: false,
      //
      treeData: [],
      treeLabel: "",
      frameFlag: false,
      frameId: "",
      frameName: "",
      defaultProps: {
        children: "list",
        label: "Name"
      },
      diaLogForm: {
        file: "",
        imgBase64: ""
      },
      nameFlag: false,
      passwordFlag: false,
      roleFlag: false,
      phoneFlag: false,
      telFlag: false,
      emailFlag: false,
      jobFlag: false,
      remarkFlag: false,
      // --------
      passportFlag: false,
      roleList: [],
      // 表单
      formAddAdmin: {
        passport: "", // 登录账号
        newPassport: "",
        password: "", // 登录密码
        name: "", // 用户姓名
        roleId: "", // 角色
        phone: "", // 手机号
        email: "", // 邮箱地址
        areaCode: "", // 区号
        telephone: "", // 座机号码
        extensionNumber: "", // 分机号码
        jobNumber: "", // 工号
        remark: "", // 备注
        headIcon: "" // 头像
      },
      headIcons: '',
      oldPassport: '',
      fid40101: {
        enable: 1,
        fieldId: 40101,
        fieldName: "登录账号",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 0,
        ifRequired: 0,
        required: 1
      },
      fid40102: {
        enable: 1,
        fieldId: 40102,
        fieldName: "登录密码",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 0,
        ifRequired: 0,
        required: 1
      },
      fid40103: {
        enable: 1,
        fieldId: 40103,
        fieldName: "姓名",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 0,
        ifRequired: 0,
        required: 1
      },
      fid40104: {
        enable: 1,
        fieldId: 40104,
        fieldName: "手机号码",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 1,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid40105: {
        enable: 1,
        fieldId: 40105,
        fieldName: "邮箱地址",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 1,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid40106: {
        enable: 1,
        fieldId: 40106,
        fieldName: "座机/分机",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 1,
        ifModify: 0,
        ifRequired: 1,
        required: 0
      },
      fid40107: {
        enable: 1,
        fieldId: 40107,
        fieldName: "工号",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid40108: {
        enable: 1,
        fieldId: 40108,
        fieldName: "备注信息",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      }
    };
  },
  created() {

  },
  mounted() {
    this.fieldData()
    this.getRoles()
    this.getInfo()
  },
  methods: {
    fieldData () {
      let that = this;
      var param = {
        fieldId: 40000
      };
      that.$http
        .get(Url + "/aimw/field/listFieldInfo", {
          params: param
        })
        .then(res => {
          let datas = res.data.data;
          if (res.data.code == 0) {
            if (datas) {
              for (let i in datas) {
                if (datas[i].fieldId == 40101) {
                  this.fid40101 = datas[i]
                }
                if (datas[i].fieldId == 40102) {
                  this.fid40102 = datas[i]
                }
                if (datas[i].fieldId == 40103) {
                  this.fid40103 = datas[i]
                }
                if (datas[i].fieldId == 40104) {
                  this.fid40104 = datas[i]
                }
                if (datas[i].fieldId == 40105) {
                  this.fid40105 = datas[i]
                }
                if (datas[i].fieldId == 40106) {
                  this.fid40106 = datas[i]
                }
                if (datas[i].fieldId == 40107) {
                  this.fid40107 = datas[i]
                }
                if (datas[i].fieldId == 40108) {
                  this.fid40108 = datas[i]
                }
              }
            } else {

            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.data.msg);
        });
    },
    getInfo() {
      let that = this;
      let detail = JSON.parse(localStorage.getItem("adminDetail"))
      this.oldPassport = detail.passport
      if (detail.password == '') {
        this.singleBtn = 1
      } else {
        this.singleBtn = false
      }
      if (this.fid40101.enable == 1) {
        this.formAddAdmin.passport = this.oldPassport
        this.formAddAdmin.newPassport = detail.passport
      }
      if (this.fid40102.enable == 1) {
        this.formAddAdmin.password = detail.password
      }
      if (this.fid40103.enable == 1) {
        this.formAddAdmin.name = detail.name
      }
      if (this.fid40104.enable == 1) {
        this.formAddAdmin.phone = detail.phone
      }
      if (this.fid40105.enable == 1) {
        this.formAddAdmin.email = detail.email
      }
      if (this.fid40106.enable == 1) {
        this.formAddAdmin.areaCode = detail.areaCode
        this.formAddAdmin.telephone = detail.telephone
        this.formAddAdmin.extensionNumber = detail.extensionNumber
      }
      if (this.fid40107.enable == 1) {
        this.formAddAdmin.jobNumber = detail.jobNumber
      }
      if (this.fid40108.enable == 1) {
        this.formAddAdmin.remark = detail.remark
      }
    },
    clearTree() {
      this.$refs.addTree0.setCurrentKey(null);
    },
    clean() {
      this.$refs.addTree0.setCurrentKey(null);
      this.treeLabel = null;
    },
    handleNodeClick(data, node) {
      this.treeLabel = node.label;
      this.frameId = data.Pid
      this.frameName = data.Name
      this.$refs.addTree1.blur();
    },
    clearFiles () {
      this.$refs['imgAdminUpload'].clearFiles();
    },
    // 图片选择后 保存在 diaLogForm.imgBroadcastList 对象中
    imgBroadcastChange(file, fileList) {
      if (file.size > 512000) {
        this.$message.error('上传的头像太大，建议500KB以下');
        this.clearFiles()
        return false
      }
      this.diaLogForm.file = file;
      this.uploadImgToBase64(file.raw);
    },
    uploadImgToBase64(file) {
      let that = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        // 图片转base64完成后返回reader对象
        that.diaLogForm.imgBase64 = this.result;
        that.formAddAdmin.headIcon = this.result;
        that.headIcons = this.result;
      };
    },
    addSubmit() {
      let that = this;
      this.passportFlag = this.passwordFlag = this.nameFlag = this.roleFlag = this.phoneFlag = this.emailFlag = this.telFlag = this.jobFlag = this.remarkFlag = this.frameFlag = false;
      var regp = /^1[3456789]\d{9}$/;
      var regzh = /^[A-Za-z0-9]{6,20}$/;
      var rege = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.fid40101.enable == 1 && this.fid40101.required == 1 && (this.formAddAdmin.newPassport == "" || !regzh.test(this.formAddAdmin.newPassport))) {
        this.passportFlag = true;
        return false;
      }
      if (this.singleBtn) {

      } else {
        if (!this.newPassFlag) {

        } else {
          if (this.fid40102.enable == 1 && this.fid40102.required == 1) {
            this.newPassFlag = true;
            return false;
          }
        }
      }
      if (this.fid40103.enable == 1 && this.fid40103.required == 1 && this.formAddAdmin.name == "") {
        this.nameFlag = true;
        return false;
      }
      if (this.fid40104.enable == 1 && this.fid40104.required == 1 && ((this.formAddAdmin.phone != "" && !regp.test(this.formAddAdmin.phone)) || this.formAddAdmin.phone == "")) {
        this.phoneFlag = true;
        return false;
      }
      if (this.fid40105.enable == 1 && this.fid40105.required == 1 && ((this.formAddAdmin.email != "" && !rege.test(this.formAddAdmin.email)) || this.formAddAdmin.email == "")) {
        this.emailFlag = true;
        return false;
      }
      if (this.fid40107.enable == 1 && this.fid40107.required == 1 && this.formAddAdmin.jobNumber == "") {
        this.jobFlag = true;
        return false;
      }
      if (this.fid40108.enable == 1 && this.fid40108.required == 1 && this.formAddAdmin.remark == "") {
        this.remarkFlag = true;
        return false;
      }

      if (this.formAddAdmin.password == '') {
        this.formAddAdmin.password = this.formAddAdmin.newPassport.substring(this.formAddAdmin.newPassport.length - 6, this.formAddAdmin.newPassport.length)
      }
      that.$http
        .put(Url + "/aimw/manager/updateUserInfo", this.formAddAdmin)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.$router.push({
              path: "/library/admin"
            });
            this.$message.success('更新成功！');
          } else {
            this.$message.error('更新失败');
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    goBack() {
      this.$router.push({
        path: "/library/admin"
      });
    },
    // 密码修改 -- 验证新密码
    newChange(value) {
      var reg = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,20}$/;
      var reg1 = value.length >= 6 && value.length <= 20;
      // eslint-disable-next-line no-useless-escape
      var reg2 = /^[A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/.test(
        value
      );
      var reg3 = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{1,30}$/.test(
        value
      );
      if (!(reg1 && reg2 && reg3)) {
        if (!reg1) {
          this.newRight1 = false;
        } else {
          this.newRight1 = true;
        }
        if (!reg2) {
          this.newRight2 = false;
        } else {
          this.newRight2 = true;
        }
        if (!reg3) {
          this.newRight3 = false;
        } else {
          this.newRight3 = true;
        }
        this.newPassFlag = true;
        return false;
      } else {
        this.newRight1 = true;
        this.newRight2 = true;
        this.newRight3 = true;
        setTimeout(() => {
          this.newPassFlag = false;
        }, 100);
      }
    },
    // 密码修改 -- 新密码获得焦点时
    newFcous(val) {
      this.singleBtn = false;
      this.newPassFlag = true;
      this.twoPassFlag = false;
    },
    // 密码修改 -- 新密码失去焦点时
    newBlur(val) {
      if (this.formAddAdmin.password == "") {
        this.singleBtn = 1;
      }
      var value = this.formAddAdmin.password;
      var reg1 = value.length >= 6 && value.length <= 20;
      // eslint-disable-next-line no-useless-escape
      var reg2 = /^[A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/.test(
        value
      );
      var reg3 = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{1,30}$/.test(
        value
      );
      if (reg1 && reg2 && reg3) {
        this.newPassFlag = false;
      }
    },
    singleChange(txt) {
      this.singleBtn ? (this.singleBtn = false) : (this.singleBtn = txt);
      this.formAddUser.password = "";
      this.newRight1 = false;
      this.newRight2 = false;
      this.newRight3 = false;
      if (this.singleBtn) {
        this.newPassFlag = false;
      } else {
        this.newPassFlag = true;
      }
    },
    // 获取角色列表
    getRoles() {
      let that = this;
      this.$http
        .get(Url + "/aimw/role/listRolesInfo")
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data) {
              this.roleList = data.data.results
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    roleChange(value) {
      let roleRow = {}
      roleRow = this.roleList.find((item) => {
        return item.roleID === value
      })
      this.importRoleName = roleRow.roleName
    }
  }
};
</script>

<style lang="less">
.add_admin_wrap {
  text-align: left;
  margin: 0 0.22rem;
  // 头部标题
  .com_title {
    height: 0.24rem;
    font-size: 0.2rem;
    color: #354b70;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin: 0.18rem 0;
    .c_titles {
      flex: 1;
      display: flex;
      font-size: 0.2rem;
      align-items: center;
    }
  }
  //主要内容区
  .person_main {
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 4px;
    padding: 0.26rem 0.4rem 0.4rem;
    margin-bottom: 0.22rem;
    .person_box {
      width: 12.6rem;
      margin: 0 auto;
      padding-left: 3.1rem;
      position: relative;
      // 左边头像
      .s_logo {
        position: absolute;
        left: 1.8rem;
        top: 0;
        width: 1.4rem;
        .school_logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 0.23rem;
          width: 1.4rem;
          height: 1.4rem;
          background: #ffffff;
          box-shadow: 0px 2px 16px 0px rgba(42, 150, 236, 0.27);
          border-radius: 50%;
          .s_logo_bg {
            width: 1.4rem;
            height: 1.4rem;
            background: linear-gradient(0deg, #c4ecff, #97cdff);
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 1.46rem;
              height: 1.46rem;
            }
          }
        }
        .el-button {
          display: block;
          margin: 0 auto;
          width: 1.4rem;
          padding: 0.09rem 0.1rem;
        }
      }
      /*左三角*/
      .tip_left {
        position: absolute;
        left: 3.9rem;
        top: 0;
        padding: 0.05rem 0.1rem;
        font-size: 0.14rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #7786ac;
        min-height: 0.34rem;
        line-height: 0.24rem;
        border: 0.01rem solid #e1e9ff;
        background-color: #fff;
        border-radius: 5px;
        -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      }

      .tip_left::before,
        .tip_left::after  {
        content: "";
        display: block;
        border-width: 0.06rem;
        position: absolute;
        left: -0.13rem;
        top: 0.12rem;
        border-style: dashed solid solid dashed;
        border-color: transparent #e1e9ff transparent transparent;
        font-size: 0;
        line-height: 0;
      }

      .tip_left::after  {
        left: -0.11rem;
        border-color: transparent #fff transparent transparent;
      }
      .tip_msg {
        font-size: 0.14rem;
        img{
          width: 0.12rem;
          height: 0.12rem;
        }
      }
      // 表单
      .person_contain {
        .person_msg {
          width: 4.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.2rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #354b70;
          margin: 0.2rem 0;
          img {
            width: 0.38rem;
            height: 0.38rem;
            margin-right: 0.07rem;
          }
        }
        .address-select-list {
          display: flex;
          .el-select {
            width: 100%;
            margin-right: 0.1rem;
          }
          .el-select:last-child {
            margin-right: 0;
          }
          .el-input__suffix{
            right: 0.05rem;
          }
          .el-select__caret{
            font-size: 0.14rem;
          }
          .el-input__icon{
            width: 0.25rem;
             line-height: 0.36rem;
          }
        }
        .type-select-list {
          .el-select {
            width: 100%;
          }
        }
        .el-radio {
          line-height: 0.24rem;
          display: flex;
          align-items: center;
        }
        .el-radio__label {
          font-size: 0.16rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #7786ac;
        }
        .el-radio__inner {
          width: 0.2rem;
          height: 0.2rem;
          margin-top: 0.02rem;
        }
        .el-radio__inner::after{
          width: 0.08rem;
          height: 0.08rem;
        }
        .el-textarea__inner {
          font-size: 0.16rem;
        }
      }
      .el-input {
        height: 0.36rem;
        width: 3.8rem;
        font-size: 0.14rem;
      }
      .el-phone0 {
        width: 1.0rem;
        margin-right: 0.1rem;
      }
      .el-phone1 {
        width: 1.6rem;
        margin-right: 0.1rem;
      }
      .el-phone2 {
        width: 1.0rem;
      }
      .el-form-item__label {
        font-size: 0.16rem;
        line-height: 0.36rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #7786ac;
        padding-right: 0;
      }
      .el-form-item__content {
        line-height: 0.36rem;
        display: flex;
        .el-radio-group{
          height: 0.36rem;
          display: flex;
          align-items: center;
        }
        .el-textarea{
          width: 3.8rem;
        }
      }
      .el-input__inner {
        height: 0.36rem;
        line-height: 0.36rem;
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #354b70;
      }
      .el-input__inner:focus {
        border-color: #39a1fe;
      }
      .el-button {
        border: 0.01rem solid #dcdfe6;
        padding: 0.09rem 0.27rem;
        font-size: 0.16rem;
        border-radius: 4px;
        background: linear-gradient(263deg, #0075ff, #00c2ff);
        box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
      }
      .el-button.resets {
        margin-left: 0.38rem;
        background: linear-gradient(261deg, #b8d5f5, #8fb1d7);
        box-shadow: 0px 2px 10px 0px rgba(171, 196, 227, 0.45);
      }
    }
  }
  .sub_center {
    width: 4.9rem;
    display: flex;
    justify-content: center;
    .el-form-item__content {
      margin-left: 0 !important;
      text-align: center;
    }
  }
}
</style>
