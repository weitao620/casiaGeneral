<template>
  <div class="table-classg" ref="sprintReportGuide">
    <img src="../../assets/images/guide/fengmian.png" alt="">
    <img src="../../assets/images/guide/mulu.png" alt="">
    <img src="../../assets/images/guide/A1@2x.png" alt="">
    <img src="../../assets/images/guide/A2@2x.png" alt="">
    <img src="../../assets/images/guide/A3@2x.png" alt="">
    <img src="../../assets/images/guide/A4@2x.png" alt="">
    <img src="../../assets/images/guide/A5@2x.png" alt="">
    <img src="../../assets/images/guide/A6@2x.png" alt="">
    <img src="../../assets/images/guide/A7@2x.png" alt="">
    
    <img src="../../assets/images/guide/A8@2x.png" alt="">
    <img src="../../assets/images/guide/A9@2x.png" alt="">
    <img src="../../assets/images/guide/A10@2x.png" alt="">

    <img src="../../assets/images/guide/A11@2x.png" alt="">
    <img src="../../assets/images/guide/A12@2x.png" alt="">
    <img src="../../assets/images/guide/A13@2x.png" alt="">
    
    <img src="../../assets/images/guide/A14@2x.png" alt="">
    <img src="../../assets/images/guide/A15@2x.png" alt="">
    <img src="../../assets/images/guide/A16@2x.png" alt="">
    <img src="../../assets/images/guide/A17@2x.png" alt="">
    <img src="../../assets/images/guide/A18@2x.png" alt="">
    <img src="../../assets/images/guide/A19@2x.png" alt="">
    
    <img src="../../assets/images/guide/A20@2x.png" alt="">
    
    <img src="../../assets/images/guide/A21@2x.png" alt="">
    <img src="../../assets/images/guide/A22@2x.png" alt="">
    <img src="../../assets/images/guide/A23@2x.png" alt="">
    <img src="../../assets/images/guide/A24@2x.png" alt="">
    <img src="../../assets/images/guide/A25@2x.png" alt="">
    
    <img src="../../assets/images/guide/A26@2x.png" alt="">
    <img src="../../assets/images/guide/A27@2x.png" alt="">
    <img src="../../assets/images/guide/A28@2x.png" alt="">
    <img src="../../assets/images/guide/A29@2x.png" alt="">
    <img src="../../assets/images/guide/A30@2x.png" alt="">
    <img src="../../assets/images/guide/A31@2x.png" alt="">
    
    <img src="../../assets/images/guide/A32@2x.png" alt="">
    <img src="../../assets/images/guide/A33@2x.png" alt="">
    <img src="../../assets/images/guide/A34@2x.png" alt="">
    <img src="../../assets/images/guide/A35@2x.png" alt="">
    <img src="../../assets/images/guide/A36@2x.png" alt="">
    <img src="../../assets/images/guide/A37@2x.png" alt="">
    
    <img src="../../assets/images/guide/A38@2x.png" alt="">
    <img src="../../assets/images/guide/A39@2x.png" alt="">
    <img src="../../assets/images/guide/A40@2x.png" alt="">

    <img src="../../assets/images/guide/A41@2x.png" alt="">
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "modelguide",
  data() {
    return {

    };
  },
  props: {

  },
  mounted() {
    this.loading = this.$loading({
      lock: true,
      text: "正在下载中",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    setTimeout(() => {
      this.$nextTick(() => {
        this.downloadSprintTestReport()
      })
    }, 800)
  },
  methods: {
    ...mapMutations(["setGuideFlag"]),
    downloadSprintTestReport() {
      setTimeout(() => {
        this.getPdfFromHtmlSc(this.$refs.sprintReportGuide, "AI心世界指导手册");
        this.$nextTick(() => {
          this.setGuideFlag(false)
        })
      }, 1000)
    }
  }
};
</script>
<style lang="less">
    .table-classg{
      width: 1190px;
        img{
          display: block;
          border: 0;
          border-collapse: collapse;
          width: 1190px !important;
          height: 1684px !important;
          // margin-bottom: 1px;
          margin: -0.5px auto 0 !important;
          text-align: center;
          position: relative;
          background: #ffffff !important;
          box-shadow: unset !important;
          overflow: hidden;
        }
    }
</style>
