<template>
  <div class="school_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>基础设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="person_main">
      <div class="person_box">
        <div class="s_logo" v-if="fid10105.enable == 1">
          <div class="school_logo">
            <div class="s_logo_bg">
              <img v-if="formSchool.headIcon"  :src="formSchool.headIcon" alt="" />
              <img v-else  src="../../assets/logo.png" alt="" />
            </div>
          </div>
          <el-upload
            v-if="power1"
            ref="imgSchoolUpload"
            class="upload-demo"
            action=""
            :auto-upload="false"
            :limit="1"
            :show-file-list="false"
            :on-change="imgBroadcastChange"
            accept="image/jpg,image/png,image/jpeg"
          >
            <el-button size="small" @click="clearFiles" type="primary" >{{fid10105.fieldName}}</el-button>
          </el-upload>
        </div>
        <el-form
          label-position="right"
          class="person_contain"
          label-width="1.2rem"
          :model="formSchool"
        >
          <div class="person_msg">
            <img src="../../assets/images/personMsg.png" alt="" />
            组织信息
          </div>
          <el-form-item v-if="fid10101.enable == 1" :required="fid10101.required == 1" :label="fid10101.fieldName + '：'">
            <el-input
              @input="userChange"
              v-model="formSchool.name"
              placeholder="请输入组织名称"
            ></el-input>
            <div class="tip_left" v-show="passportFlag">
              <div class="tip_msg" style="width:1.44rem">
                <img src="../../assets/images/x.png" alt="" />
                请输入{{fid10101.fieldName}}
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid10102.enable == 1" :required="fid10102.required == 1" :label="fid10102.fieldName + '：'">
            <el-input
              @input="phoneChange"
              v-model="formSchool.website"
              placeholder="请输入网址"
            ></el-input>
            <div class="tip_left" v-show="phoneFlag">
              <div class="tip_msg" style="width:1.44rem">
                <img src="../../assets/images/x.png" alt="" />
                请输入{{fid10102.fieldName}}
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid10103.enable == 1" :required="fid10103.required == 1"  :label="fid10103.fieldName + '：'">
            <section class="address-select-list">
              <el-select
                class="adress-select"
                v-model="formSchool.region"
                placeholder="请选择省"
                @change="chooseProvince"
              >
                <el-option
                  v-for="item in provinceData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                class="adress-select"
                v-model="formSchool.city"
                placeholder="请选择市"
                @change="chooseCity"
              >
                <el-option
                  v-for="item in cityData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                class="adress-select"
                v-model="formSchool.district"
                placeholder="请选择区"
              >
                <el-option
                  v-for="item in areaData"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </section>
            <div class="tip_left" v-show="areaFlag">
              <div class="tip_msg" style="width:1.44rem">
                <img src="../../assets/images/x.png" alt="" />
                请选择{{fid10103.fieldName}}
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid10104.enable == 1" :required="fid10104.required == 1" :label="fid10104.fieldName + '：'">
            <el-input
              type="textarea"
              :rows="3"
              :placeholder="'请输入' + fid10104.fieldName"
              v-model="formSchool.remark"
              maxlength="200"
              show-word-limit
            >
            </el-input>
            <div class="tip_left" v-show="addressFlag">
              <div class="tip_msg" style="width:1.44rem">
                <img src="../../assets/images/x.png" alt="" />
                请输入{{fid10104.fieldName}}
              </div>
            </div>
          </el-form-item>
          <el-form-item class="sub_center" v-if="power1">
            <el-button type="primary" @click="onSubmit">保存</el-button>
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
import areaJson from "@/assets/js/area.json";
export default {
  name: "person",
  data() {
    return {
      power1: false,
      power2: false,
      diaLogForm: {
        file: "",
        imgBase64: ""
      },
      id: "",
      passportFlag: false,
      phoneFlag: false,
      areaFlag: false,
      addressFlag: false,
      emailFlag: false,
      oldPassFlag: false,
      oldRight: false,
      newPassFlag: false,
      newRight1: false,
      newRight2: false,
      newRight3: false,
      twoPassFlag: false,
      formSchool: {
        name: "",
        website: "",
        headIcon: "",
        region: "",
        city: "",
        district: "",
        type: "",
        remark: ""
      },
      provinceData: "",
      cityData: "",
      areaData: "",
      typeData: [],
      name: "",
      remark: "",
      fid10101: {
        enable: 1,
        fieldId: 10101,
        fieldName: "组织名称",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 1
      },
      fid10102: {
        enable: 1,
        fieldId: 10102,
        fieldName: "网址",
        fieldType: "特殊字段",
        ifDelete: 1,
        ifEnable: 1,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid10103: {
        enable: 1,
        fieldId: 10103,
        fieldName: "所在地区",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 1,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid10104: {
        enable: 1,
        fieldId: 10104,
        fieldName: "详细地址",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 1,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid10105: {
        enable: 1,
        fieldId: 10105,
        fieldName: "组织LOGO",
        fieldType: "图片上传",
        ifDelete: 1,
        ifEnable: 1,
        ifModify: 1,
        ifRequired: 1,
        required: 1
      }
    };
  },
  created() {

  },
  mounted() {
    this.powerData()
    this.fieldData()
    this.getSchoolInfo();
    this.initAddressFrom(areaJson);
  },
  methods: {
    fieldData () {
      let that = this;
      var param = {
        fieldId: 10000
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
                if (datas[i].fieldId == 10101) {
                  this.fid10101 = datas[i]
                }
                if (datas[i].fieldId == 10102) {
                  this.fid10102 = datas[i]
                }
                if (datas[i].fieldId == 10103) {
                  this.fid10103 = datas[i]
                }
                if (datas[i].fieldId == 10104) {
                  this.fid10104 = datas[i]
                }
                if (datas[i].fieldId == 10105) {
                  this.fid10105 = datas[i]
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
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power1 = power.includes(40101); // 学校信息--修改资料
    },
    clearFiles () {
      this.$refs['imgSchoolUpload'].clearFiles();
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
        that.formSchool.headIcon = this.result;
      };
    },
    // 初始化表单信息
    initAddressFrom(data) {
      this.provinceData = data;
    },
    // 选择省
    chooseProvince(value) {
      if (value == "香港特别行政区") {
        this.selectCityDisabled = true;
      } else {
        this.selectCityDisabled = false;
      }
      this.cityData = [];
      this.areaData = [];
      this.formSchool.city = "";
      this.formSchool.district = "";
      this.provinceData.map(e => {
        if (value == e.name) {
          this.cityData = e.city;
          return false;
        }
      });
    },
    // 选择市
    chooseCity(value) {
      this.formSchool.district = "";
      this.cityData.map(e => {
        if (value == e.name) {
          this.areaData = e.area;
          return false;
        }
      });
    },
    // 学校信息
    getSchoolInfo() {
      let that = this;
      that.$http
        .get(Url + "/aimw/organization/listOrganizationInfo")
        .then(res => {
          var data = res.data.data;
          if (res.data.code == 0) {
            that.id = data.id;
            if (this.fid10101.enable == 1) {
              that.formSchool.name = data.name;
            }
            if (this.fid10102.enable == 1) {
              that.formSchool.website = data.website;
            }
            if (this.fid10103.enable == 1) {
              let areaArr = data.region.split("-");
              that.formSchool.region = areaArr[0];
              that.chooseProvince(areaArr[0]);
              that.formSchool.city = areaArr[1];
              that.chooseCity(areaArr[1]);
              that.formSchool.district = areaArr[2];
            }
            if (this.fid10104.enable == 1) {
              that.formSchool.remark = data.location
            }
            that.formSchool.type = data.type;
            if (this.fid10105.enable == 1) {
              if (data.headIcon == '') {
                that.formSchool.headIcon = ''
              } else {
                that.formSchool.headIcon = 'data:image;base64,' + data.headIcon;
              }
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    userChange(val) {
      if (val != "") {
        this.passportFlag = false;
      }
    },
    phoneChange(val) {
      if (val != "") {
        this.phoneFlag = false;
      }
    },
    onSubmit() {
      let that = this;
      this.passportFlag = this.phoneFlag = this.areaFlag = this.addressFlag = false
      if (this.fid10101.enable == 1 && this.fid10101.required == 1 && this.formSchool.name == '') {
        this.passportFlag = true
        return false
      }
      if (this.fid10102.enable == 1 && this.fid10102.required == 1 && this.formSchool.website == '') {
        this.phoneFlag = true
        return false
      }
      if (this.fid10103.enable == 1 && this.fid10103.required == 1 && (this.formSchool.region == '' || this.formSchool.city == '' || this.formSchool.district == '')) {
        this.areaFlag = true
        return false
      }
      if (this.fid10104.enable == 1 && this.fid10104.required == 1 && this.formSchool.remark == '') {
        this.addressFlag = true
        return false
      }
      if (this.fid10105.enable == 1 && this.fid10105.required == 1 && this.formSchool.headIcon == '') {
        this.$message.warning('请上传' + this.fid10105.fieldName)
        return false
      }
      var param = {
        name: this.formSchool.name,
        website: this.formSchool.website,
        region:
          this.formSchool.region +
          "-" +
          this.formSchool.city +
          "-" +
          this.formSchool.district,
        headIcon: this.formSchool.headIcon.split('base64,')[1],
        location: this.formSchool.remark
      };
      if (that.id == "") {
        // 新建学校信息
        that.$http
          .post(Url + "/aimw/organization/addOrganizationInfo", param)
          .then(res => {
            var data = res.data;
            if (data.code == 0) {
              this.$message.success('设置成功！');
              this.getSchoolInfo()
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        that.$http
          .put(Url + "/aimw/organization/updateOrganizationInfo", param)
          .then(res => {
            var data = res.data;
            if (data.code == 0) {
              this.$message.success('更新成功！');
              this.getSchoolInfo()
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    goBack() {
      this.$router.push({
        path: "/library/index"
      });
    }
  }
};
</script>

<style lang="less">
.school_wrap {
  text-align: left;
  margin: 0 0.22rem;
  .el-input__icon {
    line-height: 0.36rem;
  }
  .sub_center {
    .el-form-item__content {
      margin-left: 0 !important;
      text-align: center;
    }
  }
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
  .person_main {
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 4px;
    padding: 0.26rem 0.4rem 0.4rem;
    margin-bottom: 0.22rem;
    .person_box {
      width: 4.9rem;
      margin: 0 auto;
      position: relative;
      .s_logo {
        position: absolute;
        left: -2.16rem;
        top: 0;
        width: 1.2rem;
        .el-button {
          width: 100%;
          padding: 0.09rem 0.1rem;
        }
        .school_logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 0.23rem;
          width: 1.1rem;
          height: 1.1rem;
          background: #ffffff;
          box-shadow: 0px 2px 16px 0px rgba(42, 150, 236, 0.27);
          border-radius: 6px;
          .s_logo_bg {
            width: 0.98rem;
            height: 0.98rem;
            background: linear-gradient(0deg, #c4ecff, #97cdff);
            border-radius: 6px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .upload-demo{
          .el-upload{
            width: 100%;
          }
        }
      }
      // 左三角
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
        width: 1.44rem;
        display: inline-flex;
        align-items: center;
        img {
          margin-right: 0.06rem;
        }
      }
      .person_contain {
        .el-textarea{
          .el-textarea__inner{
            font-size: .16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #354b70;
          }
        }
        .person_msg {
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
            margin-right: 0.1rem;
          }
          .el-select:last-child {
            margin-right: 0;
          }
        }
        .type-select-list {
          .el-select {
            width: 100%;
          }
        }
      }
      .el-input {
        height: 0.36rem;
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
}
</style>
