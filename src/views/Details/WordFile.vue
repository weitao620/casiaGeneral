<template>
  <div class="word_wrap">
    <div class="ww_title">
      <div class="wwt_top">
        <img src="../../assets/images/word/zx_logo.png" alt="">
        <span>咨询记录</span>
      </div>
      <div class="wwt_main">
        <span>来访者：{{details.name}}</span>
        <span>咨询时间：{{details.start_time}}</span>
      </div>
      <div class="wwt_btns">
        <div class="el_one" v-if="isEditFlag">
          <el-button
            class="el_btn_one"
            type="primary"
            @click="saveReport"
          >
            保存
          </el-button>
        </div>
        <div class="el_two" v-if="isEditFlag">
          <el-button
            class="el_btn_two"
            type="primary"
            @click="cancelr"
          >
            取消
          </el-button>
        </div>
        <div class="el_one" v-if="!isEditFlag">
          <el-button
            class="el_btn_one"
            type="primary"
            @click="isEditFlag = !isEditFlag"
          >
            <i class="iconfont icon-bianji"></i>
            编辑
          </el-button>
        </div>
        <div class="el_two" v-show="details.sand_picture !=''">
          <el-button
            class="el_btn_two"
            @click="exportWord()"
            type="primary"
          >
            <i class="iconfont icon-icon-"></i>
            导出
          </el-button>
        </div>
      </div>
    </div>
    <div class="word_main_box">
      <div class="wm_top">
        <img style="width:0.23rem" src="../../assets/images/word/icon_t1.png" alt="">
        <span>咨询记录</span>
      </div>
      <div class="wm_top wm_top_s">
        <img src="../../assets/images/word/dot.png" alt="">
        <span>制作过程：</span>
      </div>
      <div class="wm_text">
        <el-table ref="mytable" :key="tableLoad" border :data="details.sandList">
          <el-table-column
            align="center"
            v-for="(item, index, key) in table_columns"
            :item="item"
            :key="key"
            :index="index"
            :label="item.label"
          >
            <template slot-scope="scope">
              <el-input
                type="textarea"
                v-if="item.label == '备注' && isEditFlag"
                size="small"
                v-model="scope.row[item.prop]"
                @input="noteChange(scope.row)"
                :placeholder="'可编辑'"
                maxlength="300"
                show-word-limit
              ></el-input>
              <div v-else>
                {{scope.row[item.prop]}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="wm_top wm_top_s">
        <img src="../../assets/images/word/dot.png" alt="">
        <span>讨论过程：</span>
      </div>
      <div class="wm_text" v-if="isEditFlag">
        <el-input placeholder="请填写" :autosize="{ minRows: 3, maxRows: 7}" type="textarea" v-model="details.discuss_process" maxlength="300" show-word-limit></el-input>
      </div>
      <div class="wm_text" v-else>
        {{details.discuss_process}}
      </div>
      <div class="wm_top">
        <img src="../../assets/images/word/icon_t2.png" alt="">
        <span>治疗者感受</span>
      </div>
      <div class="wm_text wm_max100" v-if="isEditFlag">
        <el-input placeholder="请填写" :autosize="{ minRows: 3, maxRows: 7}" type="textarea" v-model="details.visitor_feeling" maxlength="300" show-word-limit></el-input>
      </div>
      <div class="wm_text" v-else>
        {{details.visitor_feeling}}
      </div>
      <div class="wm_top">
        <img src="../../assets/images/word/icon_t3.png" alt="">
        <span>作品图片</span>
      </div>
      <img class="wm_work_img" v-if="details.sand_picture && details.sand_picture != ''" :src="details.sand_picture" alt="">
      <img class="wm_work_img" v-else src="../../assets/images/word/zuoin.png" alt="">
      <div class="wm_top">
        <img src="../../assets/images/word/icon_t4.png" alt="">
        <span>作品信息统计</span>
      </div>
      <div class="wm_top wm_top_s wm_top_p">
        <img src="../../assets/images/word/dot.png" alt="">
        <div>制作时间：<span>{{details.duringStr}}</span></div>
      </div>
      <div class="wm_top wm_top_s wm_top_p">
        <img src="../../assets/images/word/dot.png" alt="">
        <div>
          各类沙具类别统计：
          <span v-html="details.typeStat"></span>
        </div>
      </div>
      <div class="wm_top wm_top_s wm_top_p">
        <img src="../../assets/images/word/dot.png" alt="">
        <div>作品名称：<span>{{details.world_name}}</span></div>
      </div>
      <div class="wm_top wm_top_s wm_top_p">
        <img src="../../assets/images/word/dot.png" alt="">
        <div>主题分析：<span>{{details.theme}}</span></div>
      </div>
      <!-- <div class="wm_top wm_top_s" style="color:#FF79CE;font-size:0.16rem;padding-bottom:0">
        * 仅供参考，详细预警内容可看测评报告
      </div> -->
      <div class="wm_top">
        <img style="width:0.23rem" src="../../assets/images/word/icon_t5.png" alt="">
        <span>评估</span>
      </div>
      <div class="wm_text" v-if="isEditFlag">
        <el-input placeholder="请填写" :autosize="{ minRows: 3, maxRows: 7}" type="textarea" v-model="details.assessment" maxlength="300" show-word-limit></el-input>
      </div>
      <div class="wm_text" v-else>
        {{details.assessment}}
      </div>
      <div class="wm_top">
        <img style="width:0.23rem" src="../../assets/images/word/icon_t6.png" alt="">
        <span>治疗计划</span>
      </div>
      <div class="wm_top wm_top_s">
        <img src="../../assets/images/word/dot.png" alt="">
        <span>下次咨询时间、地点：</span>
      </div>
      <div class="wm_text wm_text_i" v-if="isEditFlag">
        <el-input placeholder="请填写" :autosize="{ minRows: 1, maxRows: 7}" type="textarea" v-model="details.next_time" maxlength="300" show-word-limit></el-input>
      </div>
      <div class="wm_text" style="margin-bottom:0.2rem" v-else>
        {{details.next_time}}
      </div>
      <div class="wm_top wm_top_s">
        <img src="../../assets/images/word/dot.png" alt="">
        <span>咨询方向：</span>
      </div>
      <div class="wm_text wm_text_i" v-if="isEditFlag">
        <el-input placeholder="请填写" :autosize="{ minRows: 1, maxRows: 7}" type="textarea" v-model="details.next_aim" maxlength="300" show-word-limit></el-input>
      </div>
      <div class="wm_text" v-else>
        {{details.next_aim}}
      </div>
    </div>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import Url from "@/assets/js/url.js";
export default {
  props: {
    wList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableLoad: false,
      details: {
        sandList: [],
        sand_record: {
          records_num: 0,
          records: []
        },
        name: "",
        start_time: "",
        finish_time: "",
        discuss_process: "",
        visitor_feeling: "",
        sand_picture: "",
        during: '',
        duringStr: '',
        type_stat: {},
        typeStat: '',
        typeStatStr: '',
        world_name: "",
        theme: "",
        assessment: "",
        next_time: "",
        next_aim: ""
      },
      isEditFlag: false,
      discussion: '',
      assess: "1231",
      remark: "12313",
      new_date_json: {}, // 数据结构
      multipleSelection: [], // 复选框，数据
      selection: true, // 是否需要复选框
      radio: false, // 单选变色
      space_color: true, // 隔行变色
      // 表头信息
      table_columns: [
        {
          prop: "time",
          label: "时间",
          width: "150"
        },
        {
          prop: "step",
          label: "步骤",
          width: "150"
        },
        {
          prop: "action",
          label: "动作",
          width: ""
        },
        {
          prop: "note",
          label: "备注",
          width: ""
        }
      ],
      // 表格数据
      table_data: []
    };
  },
  mounted: function() {
    console.log(this.wList);
    // if (this.wList) {
    //   this.details = this.wList
    // }
    this.getBird()
    // 确保方法在页面渲染后调用
    this.$nextTick(function() {
      /// //方法
      this.tableRowClassName();
    });
  },
  watch: {
    wList: function(newValue, oldValue) {
      console.log('wList')
      console.log(newValue)
      console.log(oldValue)
      this.details = newValue;
      this.table_data = this.details.sandList
      for (let i in this.table_data) {
        this.table_data[i].mark = this.table_data[i].note
      }
      console.log(this.details)
    },
    details: function(newValue, oldValue) {
      console.log('details')
      console.log(newValue)
      console.log(oldValue)
    },
    space_color: function() {
      // 监听数据变化
      this.$nextTick(function() {
        /// //方法
        this.tableRowClassName();
      });
    },
    table_data: function(newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
      // 监听数据变化f
      this.$nextTick(function() {
        /// //方法
        this.tableRowClassName();
      });
    }
  },
  methods: {
    noteChange(data) {
      console.log(data)
      // for (let i in this.table_data) {
      //   if (this.table_data[i].time == data.time) {
      //     this.table_data[i].note = data.note
      //   }
      // }
      console.log(this.table_data)
      // this.details = {
      //   sandList: [],
      //   sand_record: {
      //     records_num: 0,
      //     records: []
      //   },
      //   name: "",
      //   start_time: "",
      //   finish_time: "",
      //   discuss_process: "",
      //   visitor_feeling: "",
      //   sand_picture: "",
      //   during: '',
      //   duringStr: '',
      //   type_stat: {},
      //   typeStat: [],
      //   world_name: "",
      //   theme: "",
      //   assessment: "",
      //   next_time: "",
      //   next_aim: ""
      // }
    },
    cancelr() {
      console.log(this.details.sand_record.records)
      // this.table_data = []
      console.log(this.table_data)
      this.$nextTick(() => {
        // this.getBird()
        this.getInfo()
        // for (let i in this.table_data) {
        //   this.table_data[i].note = this.table_data[i].mark
        // }
        this.tableLoad = !this.tableLoad
        this.isEditFlag = !this.isEditFlag
      })
    },
    saveReport() {
      console.log(this.details)
      console.log(this.table_data)
      let info = this.details
      let list = []
      for (let i in info.sandList) {
        list.push({
          action: info.sandList[i].action,
          note: info.sandList[i].note,
          step: info.sandList[i].step,
          time: info.sandList[i].time
        })
      }
      info.sand_record.records = list
      // console.log(info)
      // let detail = {
      //   sand_record: {
      //     records_num: info.sand_record.records_num,
      //     records: info.sand_record.records
      //   },
      //   name: info.name,
      //   start_time: info.start_time,
      //   finish_time: info.finish_time,
      //   discuss_process: info.discuss_process,
      //   visitor_feeling: info.visitor_feeling,
      //   sand_picture: info.sand_picture,
      //   during: info.during,
      //   type_stat: info.type_stat,
      //   world_name: info.world_name,
      //   theme: info.theme,
      //   assessment: info.assessment,
      //   next_time: info.next_time,
      //   next_aim: info.next_aim
      // }
      this.details.sand_picture = ''
      console.log(this.details)
      let param = {
        consultationInfo: JSON.stringify(this.details),
        reportId: this.$route.params.userID
      }
      console.log(param)
      this.$http
        .put(Url + "/aimw/report/updateConsultationInfo", param)
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data) {
              console.log(data)
              this.isEditFlag = false
              this.getBird()
              this.getInfo()
            }
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getBird() {
      let that = this;
      var param = {
        reportId: this.$route.params.userID
      };
      this.$http
        .get(Url + "/aimw/report/reportBirdView", {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data.data.birdView != '') {
              this.details.sand_picture = "data:image/jpg;base64," + data.data.birdView;
            } else {
              this.details.sand_picture = '';
            }
            console.log(this.details)
          } else {
            that.$message.error(data.msg);
            this.details.sand_picture = "";
          }
        })
        .catch(res => {
          console.log(res);
        });
      // this.getInfo()
    },
    getInfo() {
      let that = this;
      var param = {
        reportId: this.$route.params.userID
      };
      this.$http
        .get(Url + "/aimw/report/consultationInfo", {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data.data) {
              let consultationInfo = JSON.parse(data.data.consultationInfo)
              console.log(consultationInfo)
              let typeStart = []
              let typeStartStr = []
              for (let i in consultationInfo.type_stat) {
                typeStart.push(i + '<i>' + consultationInfo.type_stat[i] + '</i>个')
                typeStartStr.push(i + consultationInfo.type_stat[i] + '个')
              }
              consultationInfo.typeStat = typeStart.join('，')
              consultationInfo.typeStatStr = typeStartStr.join('，')
              consultationInfo.duringStr = this.getTime1(consultationInfo.during)
              consultationInfo.sandList = consultationInfo.sand_record.records
              consultationInfo.sand_picture = this.details.sand_picture
              console.log(consultationInfo)
              this.details = consultationInfo
              console.log(this.details)
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 处理秒数为时分秒 h:m:s
    getTime1(num) {
      console.log(Math.floor(num / 60));
      let m = this.zeroFill(Math.floor(num / 60));
      let s = this.zeroFill(Math.floor(num % 60));
      let h = this.zeroFill(Math.floor(Math.floor(num / 60) / 60));
      // let time = "" + h + ":" + m + ":" + s + "";
      let time = "" + m + "分" + s + "秒";
      return time;
    },
    // 补零
    zeroFill(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
      console.log(dataURL)
      console.log(base64Regex.test(dataURL))
      if (!base64Regex.test(dataURL)) {
        return false;
      }
      const stringBase64 = dataURL.replace(base64Regex, "");
      let binaryString;
      if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
      } else {
        // eslint-disable-next-line node/no-deprecated-api
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
      }
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes.buffer;
    },
    exportWord() {
      let imgSize = {
        image: [200, 160]
      }
      var ImageModule = require('docxtemplater-image-module-free');
      let that = this;
      console.log(that.details);
      // that.details.sand_picture = 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU0QTM1ODQxNDQ3MTFFQzlFNTRBOUU0QzUyQTlGODMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU0QTM1ODUxNDQ3MTFFQzlFNTRBOUU0QzUyQTlGODMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCOEYwRUI3RjE0M0QxMUVDOUU1NEE5RTRDNTJBOUY4MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCOEYwRUI4MDE0M0QxMUVDOUU1NEE5RTRDNTJBOUY4MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pql1UOAAAAJeSURBVHjanJRPaBNBFMa/iaWxFcWmSAnaoJemN0UPggfRRsGbF6nioTlKVRQvVc8eTOphEaQ9eWhQicWLR5G0QvFQqRBP1lKxton1D40lrWm37O74zUQay04W44O3f2bm/fjmvZkn5OoGjGYVe/g8T1fv2J/RefoYfRQ39uZMYcIHtIq9fPajM3wC8RbwDezcVp1bcYEFG5hZI9p+xZFhgkfrA61iGpGmASR2A/vCCLQCwblloOQMEnrTD7SKdwm5hbPtQLPAP9mGBJ4vKXiK0Ns1oFXso7IRXNgDhENoyGwPyP5QSpOEZoS880nJ8TQs2ozGjeGLFJX9rn5CSk4CMeYrGq5O1nFpTUFeGTPMoSokpnOeCEHKXnS1BosYnwNmy8FrFIOsEDyvR9PriSuvQ77g8TsY2dyh0RWDLAXs3DxnBpPZ90BHC8SZA8EKFYOsEFzXhivNi/JfgXcliGNRJn61OvZ5uT7UdUGg8wUrjrF6cnKxqjLzQbv+Tr8177nMW+Q6hSZS36CwFke7/2aIS4drP1Qm01MQQ6fM6uZ/KYWvlcLHyC81dOyMrhiu80h41yYFBzzR381K7cB/GdXJ4WnmgwdbpI5IOE5SPv0IrLuNwxijY8lQLH1xxb2jGVYxJR/yiNgNQLlWxzBWM3RzqNQqLK9PpNHROiAudgH7dwXD5sqQT2aAb5VBcf/4X+2rslWRvDrex5yOoDsCcYgNI94GtG1nwtlVfrIHzrLaeXaX6ZLKWVI8OJnZ2mAr/i3KyzlVt9P0c7p5sG+r7kdfoE/Qn9FfiqGE70b8FmAAg835bzE+nQgAAAAASUVORK5CYII='
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("/file/word.docx", function(error, content) {
        // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error;
        }
        // 图片处理
        let opts = {};

        opts = {
          // 图像是否居中
          centered: false
        };

        opts.getImage = (chartId) => {
          console.log(chartId);// base64数据
          // 将base64的数据转为ArrayBuffer
          return that.base64DataURLToArrayBuffer(chartId);
        };
        console.log(opts.getImage)
        opts.getSize = function(img, tagValue, tagName) {
          console.log(img);// ArrayBuffer数据
          console.log(tagValue);// base64数据
          console.log(tagName);// wordData对象的图像属性名
          // 自定义指定图像大小
          if (imgSize.hasOwnProperty(tagName)) {
            return imgSize[tagName];
          } else {
            return [343, 195];
          }
        };
        // 创建一个PizZip实例，内容为模板的内容
        console.log(content);
        let zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        // eslint-disable-next-line new-cap
        let doc = new docxtemplater();
        doc.attachModule(new ImageModule(opts));
        doc.loadZip(zip);
        console.log(doc);
        // 设置模板变量的值
        doc.setData(that.details);
        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          // console.log(JSON.stringify({ error: e }));
          // console.log('1111')
          // throw error;
        }
        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, that.details.name + "-第" + that.$route.params.num + "次-" + new Date().getTime() + "-咨询记录.docx");
      });
    },

    // 隔行变色
    tableRowClassName() {
      // 选取DOM节点
      var trs = this.$refs.mytable.$el
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
      for (var i in trs) {
        if (i % 1 == 0) {
          // 当隔行变色未true时改变颜色
          if (this.space_color) {
            trs[i].style.backgroundColor = "#fafafa";
          } else {
            trs[i].style.backgroundColor = "#fafafa";
          }
        }
      }
    }
  }
};
</script>
<style lang="less">
.word_wrap {
  .ww_title {
    width: 100%;
    height: 1.31rem;
    background: linear-gradient(0deg, #E3EAED, #EFF3F5, #FFFFFF, #FFFFFF);
    position: relative;
    .wwt_top{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.24rem 0;
      img{
        width: 0.24rem;
        margin-right: 0.08rem;
      }
      span{
        display: block;
        // line-height: 0.2rem;
        font-size: 0.22rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #354B70;
      }
    }
    .wwt_main{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.12rem 0.3rem 0.22rem;
      span{
        line-height: 1;
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #354B70;
      }
    }
    .wwt_btns{
      position: absolute;
      right: 0.12rem;
      top: 0.24rem;
      display: flex;
      justify-content: center;
      .el_one,
      .el_two {
        margin-right: 0.18rem;
        // width: 0.88rem;
        // height: 0.36rem;
        padding: 1px;
        background: linear-gradient(263deg, #00c2ff, #0075ff);
        border-radius: 0.04rem;
        overflow: hidden;
        box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
        .el_btn_one,
        .el_btn_two {
          padding: 0.06rem 0.1rem;
          border: 0;
          font-size: 0.16rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          background: linear-gradient(263deg, #00c2ff, #0075ff);
          border-radius: 0.04rem;
          // padding: 0;
          width: 100%;
          height: 100%;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 0.14rem;
              // height: 0.14rem;
              margin-right: 0.02rem;
            }
          }
        }
        .el_btn_two {
          background: #ffffff;
          border-image: linear-gradient(45deg, #0075ff, #00c2ff) 1 1;
          box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
          border-radius: 0.03rem;
          color: #006cff;
          img {
            width: 0.18rem;
            height: 0.16rem;
          }
        }
      }
    }
  }
  .word_main_box{
    padding-bottom: 0.4rem;
    background: #ffffff;
    position: absolute;
    top: 1.31rem;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
    .wm_text{
      text-align: left;
      padding: 0 0.44rem 0 0.6rem;
      word-break: break-all;
      .el-textarea{
        font-size: 0.16rem;
        height: 100%;
        .el-textarea__inner{
          resize: none;
          font-size: 0.16rem;
          color: #354B70;
          height: 100%;
          padding: 12px 0.15rem 12px !important;
        }
        .el-input__count{
          bottom: 2px;
          right: 8px;
        }
      }
    }
    .wm_max100{
      .el-textarea{
        .el-textarea__inner{
          padding: 0.1rem 0.15rem 0.1rem !important;
        }
      }
    }
    .wm_text_i{
      margin-bottom: 0.12rem;
    }
    .wm_top{
      display: flex;
      align-items: center;
      padding: 0.4rem 0.3rem 0.3rem;
      img{
        width: 0.25rem;
        height: auto;
        margin-right: 0.08rem;
      }
      span{
        display: block;
        font-size: 0.2rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #007AFF;
      }
    }
    .wm_top_s{
      padding: 0.06rem 0.42rem 0.2rem;
      img{
        width: 0.08rem;
      }
      span{
        color: #394B6D;
      }
    }
    .wm_top_p{
      align-items: flex-start;
      padding-bottom: 0.1rem;
      img{
        margin-top: 0.1rem;
      }
      div{
        font-size: 0.2rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #394B6D;
        display: flex;
        span{
          color: #848DA0;
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          i{
            font-style:normal;
            color: #007AFF;
          }
        }
      }

    }
    .wm_work_img{
      background: #f1f1f1;
      border-radius: 0.04rem;
      display: block;
      width: 3.24rem;
      min-height: 1.84rem;
      margin: 0 auto
    }
  }
  .el-table {
    min-height: auto;
    border-color: #CEE0F9;
    margin-bottom: 0.2rem;
    th, td{
      border-color: #CEE0F9;
    }
    .el-table__header-wrapper{
      thead{
        background: #F1F9FE;
        tr{
          font-size: 0.18rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #607490;
          height: 0.58rem;
        }
      }
    }
    tbody{
      tr{
        color: #848DA0;
        background-color: rgb(250, 250, 250);
        td{
          div{
            font-size: 0.16rem;
          }
          div.cell{
            display: flex;
            // align-items: center;
            justify-content: center;
            padding:0.06rem;
            max-height: 1.2rem;
            // overflow: auto;
            // height:100%;
            div{
              // height: 100%;
              padding:0  0.04rem ;
              overflow: auto;
            }
            // .el-textarea{
            //   textarea{
            //     border:0
            //   }
            // }
          }
        }
      }
    }
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #CEE0F9;
  }
}
</style>
