<template>
  <div class="orgs_user_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/operation/index' }"
            >主页</el-breadcrumb-item
          >
          <el-breadcrumb-item>机构配置</el-breadcrumb-item>
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
          <div class="person_msg" style="margin-bottom: 0.1rem;">
            <img src="../../assets/images/personPass.png" alt="" />
            配置
          </div>
          <div style="display: flex;align-items: center;margin-bottom: 0.2rem;margin-top: 0.2rem;">
            <el-form-item label="预警显示类型：" style="margin-bottom: 0rem"></el-form-item>
            <div style="margin-left: 0;height: 0.36rem;display: flex;align-items: center;" class="wd_box wd_boxs">
              <el-radio-group v-model="warningType">
                <el-radio :label="0">花朵</el-radio>
                <el-radio :label="1">文字描述</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div style="display: flex;align-items: center;margin-bottom: 0.2rem;margin-top: 0.2rem;">
            <el-form-item label="指导建议类型：" style="margin-bottom: 0rem"></el-form-item>
            <div style="margin-left: 0;height: 0.36rem;display: flex;align-items: center;" class="wd_box wd_boxs">
              <el-radio-group v-model="suggestionType">
                <el-radio :label="0">简版</el-radio>
                <el-radio :label="1">复杂版</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div style="display: flex;align-items: center;margin-bottom: 0.1rem">
            <el-form-item label="表情记录：" style="margin-bottom: 0rem"></el-form-item>
            <div style="margin-left: 0;height: 0.36rem;display: flex;align-items: center;" class="wd_box">
              <el-switch
                  v-model="snapshot"
                  @change="statusChange"
                >
                </el-switch>
            </div>
          </div>
          <el-form-item required label="开通维度：" style="margin-bottom: 0.1rem"></el-form-item>
          <div style="margin-left: -0.24rem;" class="wd_box">
            
            <el-checkbox style="margin-bottom: 0.06rem;" disabled :indeterminate="xinliIndeter" v-model="xinliCheckAll" @change="xinliCheckAllChange">心理健康水平分析：</el-checkbox>
            <el-checkbox-group style="margin-bottom: 0.26rem; margin-left: 0.24rem;" v-model="xinliChecked" @change="xinliCheckedChange">
              <el-checkbox v-for="item in xinliList" :disabled="item.id < 4 ? true : false" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox style="margin-bottom: 0.06rem;" :indeterminate="xinliIndeter1" v-model="xinliCheckAll1" @change="xinliCheckAllChange1">积极心理品质分析：</el-checkbox>
            <el-checkbox-group style="margin-bottom: 0.26rem; margin-left: 0.24rem;" v-model="xinliChecked1" @change="xinliCheckedChange1">
              <el-checkbox v-for="item in xinliList1" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox style="margin-bottom: 1rem;" v-model="xinliRen" @change="xinliCheckedChange2">人格分析</el-checkbox>
            <el-form-item class="sub_center" style="margin-left: -0.5rem;">
              <el-button type="primary" @click="addSubmit">保存</el-button>
              <el-button type="primary" class="resets" @click="goBack"
                >取消</el-button
              >
            </el-form-item>
          </div>
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
      warningType: 0,
      suggestionType: 0,
      snapshot: false,
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
      },
      xinliCheckAll: false,
      xinliCheckedAll: [1, 2, 3, 4, 5, 6],
      xinliChecked: [1, 2, 3],
      xinliIndeter: false,
      xinliList: [
        {
          id: 1,
          name: '抑郁'
        },
        {
          id: 2,
          name: '焦虑'
        },
        {
          id: 3,
          name: '强迫'
        },
        {
          id: 4,
          name: '自我伤害'
        },
        {
          id: 5,
          name: '敌对'
        },
        {
          id: 6,
          name: 'PTSD'
        }
        // ,
        // {
        //   id: 7,
        //   name: '自闭'
        // }
      ],
      xinliCheckAll1: false,
      xinliCheckedAll1: [1, 2, 3, 4, 5],
      xinliChecked1: [],
      xinliIndeter1: false,
      xinliList1: [
        {
          id: 1,
          name: '心理韧性'
        },
        {
          id: 2,
          name: '积极自我'
        },
        {
          id: 3,
          name: '积极成就'
        },
        {
          id: 4,
          name: '积极情绪'
        },
        {
          id: 5,
          name: '积极关系'
        }
      ],
      xinliRen: false,

      mentalDim: 0,
      positiveDim: 0,
      personalityDim: 0
    };
  },
  created() {

  },
  destroyed() {
    localStorage.removeItem('orgsDetail')
  },
  mounted() {
    // this.initAddressFrom(areaJson);
    if (!localStorage.getItem('orgsDetail')) {
      this.$router.push({
        path: "/operation/index"
      });
      return false
    }
    let orgsDetail = JSON.parse(localStorage.getItem('orgsDetail'))
    this.getWd(orgsDetail.nameAbb)
  },
  methods: {
    statusChange(val) {
      var that = this;
      that.snapshot = val
      console.log(val)
    },
    getWd(id) {
      let that = this;
      let param = {
        nameAbb: id
      };
      this.$http
        .post(Url + "/aimw/ops/getDimInfo", param)
        .then(res => {
          var data = res.data;
          console.log(data)
          if (data.code == 0) {
            let info = data.data
            let xlArr = info.mentalDim.toString(2).split('').reverse()
            let xlArr1 = info.positiveDim.toString(2).split('').reverse()
            console.log(xlArr)
            console.log(xlArr1)
            let config = JSON.parse(info.config)
            this.snapshot = config.snapshot == 1 ? true : false
            this.warningType = config.warningType
            this.suggestionType = config.suggestionType
            if (info.personalityDim > 0) {
              this.xinliRen = true
            } else {
              this.xinliRen = false
            }
            let xlArrs = []
            for (let i in xlArr) {
              if (xlArr[i] > 0) {
                xlArrs.push(Number(i) + 1)
              }
            }
            let xlArrs1 = []
            for (let i in xlArr1) {
              if (xlArr1[i] > 0) {
                xlArrs1.push(Number(i) + 1)
              }
            }
            this.xinliChecked = xlArrs
            if (xlArrs.length < 6 && xlArrs.length > 0) {
              this.xinliCheckAll = false
              this.xinliIndeter = true
            } else if (xlArrs.length == 6) {
              this.xinliCheckAll = true
              this.xinliIndeter = false
            }
            if (xlArrs1.length < 5 && xlArrs1.length > 0) {
              this.xinliCheckAll1 = false
              this.xinliIndeter1 = true
            } else if (xlArrs1.length == 5) {
              this.xinliCheckAll1 = true
              this.xinliIndeter1 = false
            } else if (xlArrs1.length == 0) {
              this.xinliCheckAll1 = false
              this.xinliIndeter1 = false
            }
            this.xinliChecked1 = xlArrs1
            this.personalityDim = info.personalityDim
            console.log(this.mentalDim)
            console.log(this.positiveDim)
            console.log(this.xinliRen)
            console.log(this.personalityDim)
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    xinliCheckAllChange(val) {
      console.log(val)
      this.xinliChecked = val ? this.xinliCheckedAll : [];
      this.xinliIndeter = false;
      console.log(this.xinliIndeter)
    },
    xinliCheckedChange(value) {
      console.log(value)
      let checkedCount = value.length;
      this.xinliCheckAll = checkedCount === this.xinliList.length;
      this.xinliIndeter = checkedCount > 0 && checkedCount < this.xinliList.length;
      console.log(this.xinliIndeter)
    },
    xinliCheckAllChange1(val) {
      console.log(val)
      this.xinliChecked1 = val ? this.xinliCheckedAll1 : [];
      this.xinliIndeter1 = false;
      console.log(this.xinliIndeter1)
    },
    xinliCheckedChange1(value) {
      console.log(value)
      let checkedCount = value.length;
      this.xinliCheckAll1 = checkedCount === this.xinliList1.length;
      this.xinliIndeter1 = checkedCount > 0 && checkedCount < this.xinliList1.length;
      console.log(this.xinliIndeter1)
    },

    xinliCheckedChange2(val) {
      console.log(val)
      this.personalityDim = val ? 31 : 0
      console.log(this.personalityDim)
    },
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
      console.log(this.xinliChecked)
      console.log(this.xinliChecked1)
      console.log(this.xinliRen)
      let xlArr = [0, 0, 0, 0, 0, 0]
      for (let j in xlArr) {
        for (let i in this.xinliChecked) {
          xlArr[this.xinliChecked[i] - 1] = 1
        }
      }
      let xlArr1 = [0, 0, 0, 0, 0]
      for (let j in xlArr1) {
        for (let i in this.xinliChecked1) {
          xlArr1[this.xinliChecked1[i] - 1] = 1
        }
      }
      xlArr = xlArr.reverse()
      xlArr1 = xlArr1.reverse()
      if (this.xinliRen) {
        this.personalityDim = 31
      }

      console.log(xlArr)
      console.log(xlArr1)
      this.mentalDim = parseInt(xlArr.join(''), 2)
      this.positiveDim = parseInt(xlArr1.join(''), 2)
      console.log(this.mentalDim)
      console.log(this.positiveDim)
      console.log(this.personalityDim)
      // return
      let snapshot = this.snapshot ? 1 : 0
      let config = {
        snapshot: snapshot,
        warningType: this.warningType,
        suggestionType: this.suggestionType
      }
      let params = {
        nameAbb: JSON.parse(localStorage.getItem('orgsDetail')).nameAbb, // 机构id
        mentalDim: this.mentalDim, // 机构id
        positiveDim: this.positiveDim, // 机构id
        personalityDim: this.personalityDim,
        config: config
      }
      console.log(params)
      // return
      that.$http
        .put(Url + "/aimw/ops/updateDimInfo", params)
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
.orgs_user_wrap {
  text-align: left;
  margin: 0 0.22rem;
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
    width: 0.60rem !important;
    height: 0.3rem;
    border-radius: 0.18rem;
    border: 0;
  }
  .el-switch__label * {
    line-height: 0.21rem;
    font-size: 0.14rem;
  }
  .el-switch__core:after {
    top: 0.03rem;
    left: 0.03rem;
    width: 0.24rem;
    height: 0.24rem;
  }
  .el-switch.is-checked .el-switch__core::after {
    margin-left: -0.27rem;
  }
  .el-switch__core {
    border-color: #ffffff;
    background: linear-gradient(-90deg, #d4e7ff 0%, #8fb1d7 100%);
  }
  .el-switch.is-checked .el-switch__core {
    background: linear-gradient(-90deg, #0075FF, #00C2FF);
  }
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
  .wd_boxs{
    .el-radio-group{
      display: flex;

      .el-radio{

      cursor: pointer;
        margin-right: 0.2rem;
        .el-radio__label{
          cursor: pointer;
        }
      }
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
