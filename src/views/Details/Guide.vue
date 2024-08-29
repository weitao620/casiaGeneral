<template>
  <div class="guide_wrap">
    <div
      class="r_futi r_futi_fix"
    >
      <div
        class="r_t_tab r_t_tab_t"
        @click="toReview"
      >
        <span>目录</span>
      </div>
      <div class="r_ff_box">
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 1 }]"
          @click="trendTab(1)"
        >
          <div>
            <img src="../../assets/images/news/zuopinjiedu.png" alt="" />
            <span>抑郁</span>
          </div>
          <div class="act1_line" v-if="topAct == 1"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 2 }]"
          @click="trendTab(2)"
        >
          <div>
            <img style="width: 0.52rem;height:0.45rem;" src="../../assets/images/news/bencigaik.png" alt="" />
            <span>焦虑</span>
          </div>
          <div class="act1_line" v-if="topAct == 2"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 3 }]"
          @click="trendTab(3)"
        >
          <div>
            <img style="width: 0.53rem;height:0.49rem;" src="../../assets/images/news/xlweidu.png" alt="" />
            <span>强迫</span>
          </div>
          <div class="act1_line" v-if="topAct == 3"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 4 }]"
          @click="trendTab(4)"
        >
          <div>
            <img style="width: 0.48rem;height:0.49rem;" src="../../assets/images/news/jiji.png" alt="" />
            <span>PTSD</span>
          </div>
          <div class="act1_line" v-if="topAct == 4"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 5 }]"
          @click="trendTab(5)"
        >
          <div>
            <img style="width: 0.43rem;height:0.52rem;" src="../../assets/images/news/rengefenxi.png" alt=""/>
            <span>敌对</span>
          </div>
          <div class="act1_line" v-if="topAct == 5"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 6 }]"
          @click="trendTab(6)"
        >
          <div>
            <img style="width: 0.54rem;height:0.44rem;" src="../../assets/images/news/beizhu.png" alt="" />
            <span>自我伤害</span>
          </div>
          <div class="act1_line" v-if="topAct == 6"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 7 }]"
          @click="trendTab(6)"
        >
          <div>
            <img style="width: 0.54rem;height:0.44rem;" src="../../assets/images/news/beizhu.png" alt="" />
            <span>自闭</span>
          </div>
          <div class="act1_line" v-if="topAct == 7"></div>
        </div>
      </div>
    </div>
    <img src="../../assets/images/guide/fengmian.png" alt="">
    <img src="../../assets/images/guide/mulu.png" alt="">
    
    <img src="../../assets/images/guide/A1@2x.png" alt="" ref="partg1">
    <img src="../../assets/images/guide/A2@2x.png" alt="">
    <img src="../../assets/images/guide/A3@2x.png" alt="">
    <img src="../../assets/images/guide/A4@2x.png" alt="">
    <img src="../../assets/images/guide/A5@2x.png" alt="">
    <img src="../../assets/images/guide/A6@2x.png" alt="">
    <img src="../../assets/images/guide/A7@2x.png" alt="" ref="partg2">
    <img src="../../assets/images/guide/A8@2x.png" alt="">
    <img src="../../assets/images/guide/A9@2x.png" alt="">
    <img src="../../assets/images/guide/A10@2x.png" alt="">

    <img src="../../assets/images/guide/A11@2x.png" alt="">
    <img src="../../assets/images/guide/A12@2x.png" alt="">
    <img src="../../assets/images/guide/A13@2x.png" alt="" ref="partg3">
    <img src="../../assets/images/guide/A14@2x.png" alt="">
    <img src="../../assets/images/guide/A15@2x.png" alt="">
    <img src="../../assets/images/guide/A16@2x.png" alt="">
    <img src="../../assets/images/guide/A17@2x.png" alt="">
    <img src="../../assets/images/guide/A18@2x.png" alt="">
    <img src="../../assets/images/guide/A19@2x.png" alt="" ref="partg4">
    <img src="../../assets/images/guide/A20@2x.png" alt="">
    
    <img src="../../assets/images/guide/A21@2x.png" alt="">
    <img src="../../assets/images/guide/A22@2x.png" alt="">
    <img src="../../assets/images/guide/A23@2x.png" alt="">
    <img src="../../assets/images/guide/A24@2x.png" alt="">
    <img src="../../assets/images/guide/A25@2x.png" alt="" ref="partg5">
    <img src="../../assets/images/guide/A26@2x.png" alt="">
    <img src="../../assets/images/guide/A27@2x.png" alt="">
    <img src="../../assets/images/guide/A28@2x.png" alt="">
    <img src="../../assets/images/guide/A29@2x.png" alt="">
    <img src="../../assets/images/guide/A30@2x.png" alt="">

    <img src="../../assets/images/guide/A31@2x.png" alt="" ref="partg6">
    <img src="../../assets/images/guide/A32@2x.png" alt="">
    <img src="../../assets/images/guide/A33@2x.png" alt="">
    <img src="../../assets/images/guide/A34@2x.png" alt="">
    <img src="../../assets/images/guide/A35@2x.png" alt="">
    <img src="../../assets/images/guide/A36@2x.png" alt="">
    <img src="../../assets/images/guide/A37@2x.png" alt="" ref="partg7">
    <img src="../../assets/images/guide/A38@2x.png" alt="">
    <img src="../../assets/images/guide/A39@2x.png" alt="">
    <img src="../../assets/images/guide/A40@2x.png" alt="">

    <img src="../../assets/images/guide/A41@2x.png" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      part0: "",
      part1: "",
      part2: "",
      part3: "",
      part4: "",
      part5: "",
      part6: "",
      part7: ""
    };
  },
  mounted() {
    this.part0 = this.$refs.partg0.offsetTop;
    this.part1 = this.$refs.partg1.offsetTop;
    this.part2 = this.$refs.partg2.offsetTop;
    this.part3 = this.$refs.partg3.offsetTop;
    this.part4 = this.$refs.partg4.offsetTop;
    this.part5 = this.$refs.partg5.offsetTop;
    this.part6 = this.$refs.partg6.offsetTop;
    this.part7 = this.$refs.partg6.offsetTop;
  },
  methods: {
    toReview() {
      console.log('回到目录')
    },
    trendTab(type) {
      this.topAct = type;
      if (type == 1) {
        window.scrollTo(0, this.part1 - 20);
      }
      if (type == 2) {
        window.scrollTo(0, this.part2 - 20);
      }
      if (type == 3) {
        window.scrollTo(0, this.part3 - 20);
      }
      if (type == 4) {
        window.scrollTo(0, this.part4 - 20);
      }
      if (type == 5) {
        window.scrollTo(0, this.part5 - 20);
      }
      if (type == 6) {
        window.scrollTo(0, this.part6 - 20);
      }
      if (type == 7) {
        window.scrollTo(0, this.part7 - 20);
      }
    },
  }
}
</script>

<style lang="less">
  .guide_wrap{
    width: 12rem;
    margin: 0 auto;
    img{
      width: 11.90rem;
      height:16.84rem;
      margin: 0.2rem auto;
      box-shadow: 0 0.2rem 0.16rem 0 rgba(228, 228, 235, 0.13);
    }
    .r_futi_fix {
      position: fixed;
      margin: auto;
      top: 1rem;
      left: 0.46rem;
      z-index: 1111;
      .r_t_tab_t{
        width: 1.76rem;
        // height: 0.52rem;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0.02rem 0.6rem 0 rgba(208, 210, 248, 0.13);
        border-radius: 0.42rem;
        border: 0.04rem solid #FFFFFF;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.22rem;
        span{
          width: auto;
          font-family: SourceHanSansCN;
          font-weight: 400;
          font-size: 0.2rem;
          color: #2A3487;
          line-height: 1;
          padding: 0.12rem 0;
        }
        img{
          width: 0.2rem;
          height: 0.18rem;
          margin: 0;
          margin-left: 0.03rem;
        }
      }
      .r_ff_box{
        width: 1.76rem;
        padding: 0.27rem 0;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0.02rem 0.6rem 0 rgba(208, 210, 248, 0.13);
        border-radius: 0.2rem;
        border: 0.04rem solid #FFFFFF;
        .r_t_tab {
          // border: 1px solid #c7e0ff;
          // border-radius: 2px 2px 0px 0px;
          // padding-top: 0.18rem;
          // background: #f6fcff;
          min-height: 1.14rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin: 0.04rem 0;
          .act1_line{
            position: absolute;
            top: 0;
            left: -0.06rem;
            width: 0.06rem;
            height: 100%;
            background: rgba(132, 138, 255, 1);
          }
          div{
            padding: 0.15rem 0;
          }
          img {
            display: block;
            width: 0.53rem;
            height: 0.55rem;
            margin: 0 auto 0.08rem;
          }
          span {
            display: block;
            width: 100%;
            text-align: center;
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.2rem;
            color: #2A3487;
            line-height: 1;
            // padding: 0.13rem 0 0.18rem;
          }
        }
        // .r_t_tab:last-child {
        //   border: 1px solid #c7e0ff;
        //   border-bottom: 1px solid #c7e0ff;
        //   border-top: 0;
        //   border-radius: 0px 0px 2px 2px;
        // }
        // .r_t_b0 {
        //   border-bottom: 0;
        // }
        .r_t_tab_act1 {
          // color: #006cff;
          // border-color: #0090ff;
          background: rgba(246, 246, 255, 1);
        }
        .r_t_tab_act2 {
          color: #006cff;
          background: rgba(255, 255, 255, 0.08);
          // border-top: 1px solid !important;
          // border-color: #0090ff !important;
        }
      }
    }
  }
</style>