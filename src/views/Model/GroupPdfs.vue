<template>
    <div>
        <div class="group-class" id="overviewpage">
            <div class="download" @click="handleExport" >点击下载</div>
            <div class="group_box">
                <div class="list" v-for="(item,index) in 100">111111---{{ index }}</div>
            </div>
            
        </div>
    </div>
    
  </template>
  <script>
  import PdfLoader from "@/common/utils/groupPdf";
  export default {
      data() {
          return {};
      },
      methods: {
          handleExport() {
              let pdf = new PdfLoader(
                 document.querySelector("#overviewpage"),
                "pdf",
                "noSplitBox"
              );
              pdf.outPutPdfFn();
          },
      },
  };
  </script>
  <style lang="less" scoped>
    .group-class{
        background: #ffffff;
        height: auto;
        .download{
            background: #f24532;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            cursor: pointer;
        }
        .group_box{
            background: #7c6a6a;
            // height: auto;
            .list{
                width: 1200px;
                height: 100px;
                background: #f00;
                color: #fff;
                // margin: 20px auto;
            }
        }
        
    }
  </style>
  