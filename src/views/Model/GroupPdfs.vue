<template>
    <div>
        <div class="group-class">
            <div class="download" @click="handleExport" >点击下载</div>
            <div class="group_box" id="overviewpage">
                <div class="list" v-for="(item,index) in 100">111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}</div>
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
                "pdf"
                // "noSplitBox"
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
            background: #8a7e7d;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            cursor: pointer;
        }
        .group_box{
            width: 1200px;
            background: #7c6a6a;
            margin: 0 auto;
            // height: auto;
            .list{
                width: 1200px;
                // height: 100px;
                line-height: 2;
                background: rgb(111, 204, 198);
                color: #fff;
                margin: 0 auto;
            }
        }
        
    }
  </style>
  