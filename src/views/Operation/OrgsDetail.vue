<template>
  <div class="add_user_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/operation/index' }"
            >主页</el-breadcrumb-item
          >
          <el-breadcrumb-item>机构详细信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="person_main">
      <div class="person_box">
        <el-form
          label-position="right"
          class="person_contain"
          label-width="1.4rem"
          :model="formAddOrgs"
        >
          <div class="person_msg">
            <img src="../../assets/images/personMsg.png" alt="" />
            基础信息
          </div>

          <el-form-item required label="机构名称：">
            <el-input
              v-model="formAddOrgs.name"
              placeholder="请输入机构名称"
            ></el-input>
            <div style="width:3rem;height:0.36rem"></div>
            <div class="tip_left" v-show="nameFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请输入机构名称
              </div>
            </div>
          </el-form-item>
          <el-form-item required label="ID：">
            <el-input
              disabled
              v-model="formAddOrgs.nameAbb"
              placeholder="请输入机构ID"
            ></el-input>
            <div style="width:3rem;height:0.36rem"></div>
            <div class="tip_left" v-show="nameAbbFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请输入机构ID
              </div>
            </div>
          </el-form-item>
          <el-form-item required label="地区：">
            <section class="address-select-list">
              <el-select
                class="adress-select"
                v-model="formAddOrgs.regionId"
                placeholder="请选择省"
                @change="chooseProvince"
              >
                <el-option
                  v-for="item in provinceData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-select
                class="adress-select"
                v-model="formAddOrgs.cityId"
                placeholder="请选择市"
                @change="chooseCity"
              >
                <el-option
                  v-for="item in cityData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-select
                class="adress-select"
                v-model="formAddOrgs.districtId"
                placeholder="请选择区"
                @change="chooseDistrict"
              >
                <el-option
                  v-for="item in areaData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </section>
            <div class="tip_left" v-show="areaFlag">
              <div class="tip_msg" style="width:1.44rem">
                <img src="../../assets/images/x.png" alt="" />
                请选择省/市/区
              </div>
            </div>
          </el-form-item>
          <el-form-item label="详细地址：">
            <el-input
              v-model="formAddOrgs.address"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构网址：">
            <el-input
              v-model="formAddOrgs.website"
              placeholder="请输入机构网址"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="formAddOrgs.remark"
              maxlength="200"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item class="sub_center" style="margin-left: -0.5rem;">
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
import areaJson from "@/assets/js/area.json";
export default {
  name: "operationorgsdetail",
  data() {
    return {
      nameFlag: false,
      nameAbbFlag: false,
      areaFlag: false,
      provinceData: "",
      cityData: "",
      areaData: "",
      // 表单
      formAddOrgs: {
        name: "", // 机构姓名
        nameAbb: "", // 机构ID
        region: "", // 省
        city: "", // 市
        district: "", // 区
        regionId: "", // 省id
        cityId: "", // 市id
        districtId: "", // 区id
        address: "", // 详细地址
        website: "", // 机构网址
        remark: "" // 备注
      }
    };
  },
  created() {

  },
  destroyed() {
    localStorage.removeItem('orgsDetail')
  },
  mounted() {
    this.initAddressFrom(areaJson);
    if (!localStorage.getItem('orgsDetail')) {
      this.$router.push({
        path: "/operation/index"
      });
      return false
    }
    let orgsDetail = JSON.parse(localStorage.getItem('orgsDetail'))
    let region = orgsDetail.address.split('/')[0]
    let city = orgsDetail.address.split('/')[1]
    let district = orgsDetail.address.split('/')[2]
    this.formAddOrgs = {
      name: orgsDetail.name, // 机构姓名
      nameAbb: orgsDetail.nameAbb, // 机构ID
      region: region, // 省
      city: city, // 市
      district: district, // 区
      regionId: "", // 省id
      cityId: "", // 市id
      districtId: "", // 区id
      address: orgsDetail.location, // 详细地址
      website: orgsDetail.website, // 机构网址
      remark: orgsDetail.mark // 备注
    }
    this.initAddress(region, city, district)
    console.log(this.formAddOrgs)
  },
  methods: {
    // 初始化省市区
    initAddress(region, city, district) {
      let that = this;
      this.provinceData.map(e => {
        if (region == e.name) {
          that.formAddOrgs.region = e.name;
          that.formAddOrgs.regionId = e.code;
          that.cityData = e.children;
          that.cityData.map(e => {
            if (city == e.name) {
              that.formAddOrgs.city = e.name;
              that.formAddOrgs.cityId = e.code;
              that.areaData = e.children;
              that.areaData.map(e => {
                if (district == e.name) {
                  that.formAddOrgs.district = e.name;
                  that.formAddOrgs.districtId = e.code;
                  return false;
                }
              });
              return false;
            }
          });
          return false;
        }
      });
    },
    // 初始化表单信息
    initAddressFrom(data) {
      this.provinceData = data;
    },
    // 选择省
    chooseProvince(value) {
      this.areaFlag = false
      console.log(value)
      this.cityData = [];
      this.areaData = [];
      this.formAddOrgs.city = "";
      this.formAddOrgs.cityId = "";
      this.formAddOrgs.district = "";
      this.formAddOrgs.districtId = "";
      this.provinceData.map(e => {
        if (value == e.code) {
          this.formAddOrgs.region = e.name;
          this.formAddOrgs.regionId = e.code;
          this.cityData = e.children;
          return false;
        }
      });
    },
    // 选择市
    chooseCity(value) {
      this.areaFlag = false
      console.log(value)
      this.formAddOrgs.district = "";
      this.formAddOrgs.districtId = "";
      this.cityData.map(e => {
        if (value == e.code) {
          this.formAddOrgs.city = e.name;
          this.formAddOrgs.cityId = e.code;
          this.areaData = e.children;
          return false;
        }
      });
    },
    // 选择市
    chooseDistrict(value) {
      this.areaFlag = false
      this.areaData.map(e => {
        if (value == e.code) {
          this.formAddOrgs.district = e.name;
          this.formAddOrgs.districtId = e.code;
          return false;
        }
      });
    },
    // 新增机构提交
    addSubmit() {
      let that = this;
      this.nameFlag = this.nameAbbFlag = this.areaFlag = false;
      if (this.formAddOrgs.name == "") {
        this.nameFlag = true;
        return false;
      }
      if (this.formAddOrgs.nameAbb == "") {
        this.nameAbbFlag = true;
        return false;
      }
      if (this.formAddOrgs.region == "" || this.formAddOrgs.city == "" || this.formAddOrgs.district == "") {
        this.areaFlag = true;
        return false;
      }
      console.log(this.formAddOrgs)
      let params = {
        name: this.formAddOrgs.name, // 机构名称
        nameAbb: this.formAddOrgs.nameAbb, // 机构id
        province: this.formAddOrgs.region, // 省
        provinceId: this.formAddOrgs.regionId, // 省id
        city: this.formAddOrgs.city, // 市
        cityId: this.formAddOrgs.cityId, // 市id
        district: this.formAddOrgs.district, // 区
        districtId: this.formAddOrgs.districtId, // 区id
        location: this.formAddOrgs.address, // 详细地址
        website: this.formAddOrgs.website, // 机构网址
        mark: this.formAddOrgs.remark // 备注
      }
      console.log(params)
      // return
      that.$http
        .put(Url + "/aimw/ops/updateOrgInfo", params)
        .then(res => {
          var data = res.data;
          console.log(data)
          if (data.code == 0) {
            this.$router.push({
              path: "/operation/index"
            });
            this.$message.success('保存成功！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 返回
    goBack() {
      this.$router.push({
        path: "/operation/index"
      });
    }
  }
};
</script>

<style lang="less">
.add_user_wrap {
  text-align: left;
  margin: 0 0.22rem;
  .wd_box{
    .el-checkbox__label {
      padding-left: 0.06rem !important;
      font-size: 0.16rem !important;
      line-height: 0.36rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #7786ac !important;
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
      padding-left: 3.8rem;
      position: relative;
      // // 左边头像
      // .s_logo {
      //   position: absolute;
      //   left: 1.8rem;
      //   top: 0;
      //   width: 1.4rem;
      //   .school_logo {
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //     margin: 0 auto 0.23rem;
      //     width: 1.4rem;
      //     height: 1.4rem;
      //     background: #ffffff;
      //     box-shadow: 0px 2px 16px 0px rgba(42, 150, 236, 0.27);
      //     border-radius: 50%;
      //     .s_logo_bg {
      //       width: 1.4rem;
      //       height: 1.4rem;
      //       background: linear-gradient(0deg, #c4ecff, #97cdff);
      //       border-radius: 50%;
      //       overflow: hidden;
      //       display: flex;
      //       align-items: center;
      //       justify-content: center;
      //       img {
      //         width: 1.46rem;
      //         height: 1.46rem;
      //       }
      //     }
      //   }
      //   .el-button {
      //     display: block;
      //     margin: 0 auto;
      //     width: 1.4rem;
      //     padding: 0.09rem 0.1rem;
      //   }
      // }

      // 左三角
      .tip_left {
        position: absolute;
        left: 6.1rem;
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
        display: flex;
        align-items: center;
        img {
          width: 0.12rem;
          height: 0.12rem;
          margin-right: 0.05rem;
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
          .el-input__suffix {
            right: 0.05rem;
          }
          .el-select__caret {
            font-size: 0.14rem;
          }
          .el-input__icon {
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
          padding-left: 0.06rem;
        }
        .el-radio__inner {
          width: 0.2rem;
          height: 0.2rem;
        }
        .el-radio__inner::after {
          width: 0.08rem;
          height: 0.08rem;
        }
        .el-textarea__inner {
          font-size: 0.16rem;
        }
      }
      .adress-select{
        .el-input{
          height: 0.36rem;
          width: 1.93rem;
        }
      }
      .el-input {
        height: 0.36rem;
        width: 6rem;
      }
      .el-form-item{
        margin-left: -2.2rem;
      }
      .el-form-item__label {
        width: 2rem !important;
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
        .el-radio-group {
          height: 0.36rem;
          display: flex;
          align-items: center;
        }
        .el-textarea {
          width: 6rem;
        }
        .el-input--prefix .el-input__inner{
          padding-left: 0.3rem;
        }
        .el-input--suffix .el-input__inner{
          padding-right: 0.3rem;
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
    width: 6.6rem;
    display: flex;
    justify-content: center;
    .el-form-item__content {
      margin-left: 0 !important;
      text-align: center;
    }
  }
}
</style>
