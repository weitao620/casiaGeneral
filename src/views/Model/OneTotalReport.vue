<template>
  <div class="table-classs" ref="sprintSchoolPdf">
    <div class="table-style">
      <img class="shui_bg1" src="../../assets/images/report/shui_big.png" alt="" />
      <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" />
      <div class="table-border">
        <div class="g1_top">
          <span>AI心世界</span>
        </div>
        <div class="g1_top1">
          个人综合报告
        </div>
        <div class="g1_top2">
          <div>
            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span><span>{{name}}</span>
          </div>

          <div>
            <span>测评次数：</span><span>{{evaluationTime}}次</span>
          </div>
          <div>
            <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span><span>{{gender == 1 ? '男' : '女'}}</span>
          </div>
          <div>
            <span>测评时间：</span><span>{{startDate + ' - ' + endDate}}</span>
          </div>
          <div>
            <span>出生日期：</span><span>{{birth}}</span>
          </div>
          <div>
            <span>所属单位：</span><span>{{organizationName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top">
          <img
            style="width:62px;height:66px;"
            src="../../assets/images/part/Documents.png"
            alt=""
          />
          <span class="gp2_t_txt">测评分析</span>
        </div>
        <div class="gp_echart">
          <div class="gp_ect_3d">
            <div class="myChartPie" id="myChartPie" ref="myChartPie"></div>
          </div>
        </div>
        <div class="gp_title">
          <div class="gp_head">总体风险情况</div>
          <div class="gp_txt">
            {{ partsStr2 }}
          </div>
        </div>
        <div class="gp_title">
          <div class="gp_head">总体维度风险占比情况</div>
          <div class="gp_txt">
            {{ partsStr3 }}
          </div>
        </div>
        <div class="gp_title">
          <div class="gp_head">指导建议：</div>
          <div class="gp_txt" v-if="evaFrequency < 1">
            1.在该测评时间段内，受测者测评频率较低，建议增加测评次数，保持测评频率为1次/月。
          </div>
          <div class="gp_txt" v-else>
            1.在该测评时间段内，受测者测评频率适当，可继续保持，定期进行测评。
          </div>
          
          <div class="gp_txt">
            {{ partsStr4 }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="table-style group_01" v-if="riskPage < 5 && riskPage > 1">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div style="height:10px;"></div>
        <div class="gp_title" v-if="riskPage < 5 && riskPage > 3">
          <div class="gp_exl">
            <div class="gp_con"  v-for="(item, index) in cpList2" :key="index">
              <div v-if="item.name != ''">
                {{ item.name }}：共{{ item.total }}人，实测{{ item.evaNum }}人（{{item.evaPerct }}%）
              </div>
              <div v-else>
                
              </div>
            </div>
          </div>
        </div>
        <div class="gp_title" v-if="riskPage < 5 && riskPage > 2">
          <div class="gp_head">总体风险情况</div>
          <div class="gp_txt">
            {{ partsStr2 }}
          </div>
        </div>
        <div class="gp_title" v-if="riskPage < 5 && riskPage > 1">
          <div class="gp_head">总体维度风险占比情况</div>
          <div class="gp_txt">
            {{ partsStr3 }}
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01" v-if="riskPage < 10 && riskPage > 4">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div style="height:10px;"></div>
        <div class="gp_title" v-if="riskPage < 10 && riskPage > 4">
          <div class="gp_exl">
            <div class="gp_con"  v-for="(item, index) in cpList2" :key="index">
              <div v-if="item.name != ''">
                {{ item.name }}：共{{ item.total }}人，实测{{ item.evaNum }}人（{{item.evaPerct }}%）
              </div>
              <div v-else>
                
              </div>
            </div>
          </div>
        </div>
        <div class="gp_title" v-if="riskPage < 6 && riskPage > 4">
          <div class="gp_head">总体风险情况</div>
          <div class="gp_txt">
            {{ partsStr2 }}
          </div>
        </div>
        <div class="gp_title" v-if="riskPage < 5 && riskPage > 1">
          <div class="gp_head">总体维度风险占比情况</div>
          <div class="gp_txt">
            {{ partsStr3 }}
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01" v-if="riskPage < 10 && riskPage > 4">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div style="height:10px;"></div>
        <div class="gp_title" v-if="riskPage < 10 && riskPage > 6">
          <div class="gp_exl">
            <div class="gp_con"  v-for="(item, index) in cpList3" :key="index">
              <div v-if="item.name != ''">
                {{ item.name }}：共{{ item.total }}人，实测{{ item.evaNum }}人（{{item.evaPerct }}%）
              </div>
              <div v-else>
                
              </div>
            </div>
          </div>
        </div>
        <div class="gp_title" v-if="riskPage < 9 && riskPage > 5">
          <div class="gp_head">总体风险情况</div>
          <div class="gp_txt">
            {{ partsStr2 }}
          </div>
        </div>
        <div class="gp_title" v-if="riskPage < 8 && riskPage > 4">
          <div class="gp_head">总体维度风险占比情况</div>
          <div class="gp_txt">
            {{ partsStr3 }}
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01" v-if="riskPage > 7">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div style="height:10px;"></div>
        <div class="gp_title" v-if="riskPage > 8">
          <div class="gp_head">总体风险情况</div>
          <div class="gp_txt">
            {{ partsStr2 }}
          </div>
        </div>
        <div class="gp_title" v-if="riskPage > 7">
          <div class="gp_head">总体维度风险占比情况</div>
          <div class="gp_txt">
            {{ partsStr3 }}
          </div>
        </div>
      </div>
    </div> -->
    <div class="table-style group_01">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px">
          <img
            style="width:60px;height:52px;"
            src="../../assets/images/part/Graphs.png"
            alt=""
          />
          <span class="gp2_t_txt">附录</span>
        </div>
        <div class="gp_title">
          <div class="gp_head" style="height: 20px"></div>
          <div class="gp_txt">
            “AI 心世界”是一款人工智能和心理箱庭（沙盘）相结合的特色产品，以“沙”为元素，通过有趣的玩“沙”方式认识自己，创建属于每个人内心真正的“一沙一世界”。AI心世界以人工智能技术为核心，深度结合心理箱庭（沙盘）及投射测评模型实现智能心理测评。
          </div>
        </div>
        <div class="gp_title" style="padding: 30px 40px 10px;">
          <div class="gp_head" style="margin-bottom: 30px;">AI心世界作品记录</div>
          <div class="gp_bird_box">
            <div v-for="(item, index) in reportList" :key="index">
              <div class="gp_bird" v-if="index < 6">
                <img :src="'data:image;base64,' + item.birdView" alt="">
                <div>{{item.name === '' ? '' : item.name + '-'}}{{ item.datetime }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="gp_title" v-if="rPage < 2">
          <div class="gp_head" style="margin-bottom: 30px;margin-top: -10px;">作品信息统计</div>
          <div class="gp_exl">
            <div class="gp_con gp_con1">
              <div>序号</div>
              <div>测评时间</div>
              <div>作品名称</div>
              <div>自我像</div>
              <div>最重要的沙具</div>
              <div>满意程度</div>
              <div>制作用时</div>
              <div>作品场景</div>
            </div>
            <div class="gp_con"  v-for="(item, index) in reportAllList" :key="index">
              <div>{{ item.id }}</div>
              <div>{{ item.datetime }}</div>
              <div>{{ item.name }}</div>
              <div>{{ item.selfImage }}</div>
              <div>{{ item.importantBodies }}</div>
              <div>{{ item.satisfaction }}</div>
              <div>{{ item.duringTime }}</div>
              <div>{{ item.scence }}</div>
            </div>
          </div>
        </div>
        <!-- <div v-for="(item, index) in ecList" :key="index">
          <div class="gp_title">
            <div class="gp_head gp_head1" v-if="index < 5">{{ item.name }}</div>
            <div class="myChartZhu" :ref="'myChartZhu'+ index" :id="'myChartZhu' + index" v-if="index < 5"></div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="table-style group_01" v-if="rPage > 1 && rPage < 5">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp_title" style="padding: 30px 40px 10px;" v-if="rPage > 2 && rPage < 5">
          <div class="gp_bird_box">
            <div v-for="(item, index) in reportList" :key="index">
              <div class="gp_bird" v-if="index > 5">
                <img :src="'data:image;base64,' + item.birdView" alt="">
                <div>{{item.name === '' ? '' : item.name + '-'}}{{ item.datetime }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="gp_title" v-if="rPage < 5">
          <div class="gp_head" style="margin-bottom: 30px;margin-top: 10px;">作品信息统计</div>
          <div class="gp_exl">
            <div class="gp_con gp_con1">
              <div>序号</div>
              <div>测评时间</div>
              <div>作品名称</div>
              <div>自我像</div>
              <div>最重要的沙具</div>
              <div>满意程度</div>
              <div>制作用时</div>
              <div>作品场景</div>
            </div>
            <div style="width: 100%;" v-for="(item, index) in reportAllList" :key="index">
              <div class="gp_con" v-if="index < 10">
                <div>{{ item.id }}</div>
                <div>{{ item.datetime }}</div>
                <div>{{ item.name }}</div>
                <div>{{ item.selfImage }}</div>
                <div>{{ item.importantBodies }}</div>
                <div>{{ item.satisfaction }}</div>
                <div>{{ item.duringTime }}</div>
                <div>{{ item.scence }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in reportPage" :key="index">
      <div class="table-style group_01">
        <div class="table-border">
          <div class="gp_all_tips">
            <img src="../../assets/images/part/tipss.png" alt="" />
            温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
          </div>
          <div class="gp_title">
            <div style="height: 60px;"></div>
            <div class="gp_exl">
              <div class="gp_con gp_con1">
                <div>序号</div>
                <div>测评时间</div>
                <div>作品名称</div>
                <div>自我像</div>
                <div>最重要的沙具</div>
                <div>满意程度</div>
                <div>制作用时</div>
                <div>作品场景</div>
              </div>
              <div style="width: 100%;" v-for="(iteml, indexl) in item.list" :key="indexl">
                <div class="gp_con">
                  <div>{{ iteml.id }}</div>
                  <div>{{ iteml.datetime }}</div>
                  <div>{{ iteml.name }}</div>
                  <div>{{ iteml.selfImage }}</div>
                  <div>{{ iteml.importantBodies }}</div>
                  <div>{{ iteml.satisfaction }}</div>
                  <div>{{ iteml.duringTime }}</div>
                  <div>{{ iteml.scence }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 10px;padding-top:24px">
          <img
            style="width:60px;height:52px;"
            src="../../assets/images/part/Graphs.png"
            alt=""
          />
          <span class="gp2_t_txt">各维度测评情况</span>
        </div>

        <div v-for="(item, index) in ecList" :key="index">
          <div class="gp_title">
            <div class="gp_head gp_head1">{{ item.name1 }}</div>
            <div class="gp_h_box">
              <div class="myChartZhu" :ref="'myChartZhu'+ index" :id="'myChartZhu' + index"></div>
              <div class="gp_h_bt" v-if="item.riskNum > 0">
                <img
                  style="width:30px;height:26px;"
                  src="../../assets/images/part/Graphs.png"
                  alt=""
                />
                <div class="gp_h_txt">
                  在该测评时间内，受测者{{item.name}}轻度风险{{item.level1}}次，中度风险{{item.level2}}次，重度风险{{item.level3}}次。
                </div>
              </div>
              <div class="gp_h_bt" v-else>
                <img
                  style="width:30px;height:26px;"
                  src="../../assets/images/part/Graphs.png"
                  alt=""
                />
                <div class="gp_h_txt">
                  在该测评时间内，受测者{{item.name}}无风险。
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
    <!-- <div class="table-style group_01" v-show="ecList.length > 5">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px">
          <img
            style="width:60px;height:52px;"
            src="../../assets/images/part/Graphs.png"
            alt=""
          />
          <span class="gp2_t_txt">各维度风险情况分布</span>
        </div>
        <div v-for="(item, index) in ecList" :key="index">
          <div class="gp_title">
            <div class="gp_head gp_head1" v-if="index < 10 && index > 4">{{ item.name }}</div>
            <div class="myChartZhu" :ref="'myChartZhu'+ index" :id="'myChartZhu' + index" v-if="index < 10 && index > 4"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01" v-show="ecList.length > 10">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px">
          <img
            style="width:60px;height:52px;"
            src="../../assets/images/part/Graphs.png"
            alt=""
          />
          <span class="gp2_t_txt">各维度风险情况分布</span>
        </div>
        <div v-for="(item, index) in ecList" :key="index">
          <div class="gp_title">
            <div class="gp_head gp_head1" v-if="index < 15 && index > 9">{{ item.name }}</div>
            <div class="myChartZhu" :ref="'myChartZhu'+ index" :id="'myChartZhu' + index" v-if="index < 15 && index > 9"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01" v-show="ecList.length > 15">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px">
          <img
            style="width:60px;height:52px;"
            src="../../assets/images/part/Graphs.png"
            alt=""
          />
          <span class="gp2_t_txt">各维度风险情况分布</span>
        </div>
        <div v-for="(item, index) in ecList" :key="index">
          <div class="gp_title">
            <div class="gp_head gp_head1" v-if="index <20  && index > 14">{{ item.name }}</div>
            <div class="myChartZhu" :ref="'myChartZhu'+ index" :id="'myChartZhu' + index" v-if="index <20  && index > 14"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_01" v-show="ecList.length > 20 && ecList.length < 26">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px">
          <img
            style="width:60px;height:52px;"
            src="../../assets/images/part/Graphs.png"
            alt=""
          />
          <span class="gp2_t_txt">各维度风险情况分布</span>
        </div>
        <div v-for="(item, index) in ecList" :key="index">
          <div class="gp_title">
            <div class="gp_head gp_head1" v-if="index <25  && index > 19">{{ item.name }}</div>
            <div class="myChartZhu" :ref="'myChartZhu'+ index" :id="'myChartZhu' + index" v-if="index <25  && index > 19"></div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import "echarts-gl";
import { getPie3D, getParametricEquation } from "@/assets/js/chart2.js";
import JSZip from "jszip";
import Url from "@/assets/js/url.js";
import htmlToZip from "@/common/utils/htmlToZip";
import echarts from "../../assets/js/echarts";
import { mapMutations } from "vuex";
import NP from "number-precision";
var FileSaver = require("file-saver");
const pieColor = [
  "rgba(157, 113, 255, 1)",
  "rgba(103, 135, 250, 1)",
  "rgba(255, 212, 105, 1)",
  "rgba(92, 212, 247, 1)",
  "rgba(244, 142, 46, 1)"
];
const transColor = [
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#BABFFF"
      },
      {
        offset: 1,
        color: "#7279FF"
      }
    ])
  },
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#4DFBFF"
      },
      {
        offset: 1,
        color: "#00CCFF"
      }
    ])
  }
];
export default {
  name: "ExportPdf",
  data() {
    return {
      reportList: [],
      reportAllList: [],
      rPage: 0,
      schoolName: "",
      phaseList: [],
      time: "",
      DimRisk: {},
      depressionInfo: {},
      anxietyInfo: {},
      forcedInfo: {},
      standard: "",
      EvaResult: {},
      SuggestionStr: "",
      gradeList: [],
      gradeList1: [],

      rlen0: 0,
      rlen1: 0,
      // 数据
      class: [],
      zipFlag: false,
      name: '',
      evaluationTime: '',
      gender: '',
      startDate: '',
      endDate: '',
      birth: '',
      organizationName: '',
      riskPage: 7,
      // ecCount: 0,
      wdPerctList: [],
      cpList: [],
      // cpList1: [],
      cpList2: [],
      cpList3: [],
      partsStr1: '',
      partsStr11: '',
      partsStr12: '',
      partsStr13: '',
      partsStr2: '',
      partsStr3: '',
      partsStr4: '',
      evaFrequency: '',
      ecList: [],
      myChartZhu: "",
      riskPerct: '',
      riskPerct1: '',
      reportPage: [],
      optionData: [
        {
          name: '启用电梯',
          value: 12
        },
        {
          name: '停用电梯',
          value: 88
        }
      ],
      statusChart: null,
      option: {}
    };
  },
  props: {
    gList: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    schoolPdfs() {
      return this.$store.state.oneTotalFlag;
    }
  },
  watch: {
    schoolPdfs: function(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
      if (newVal) {
        console.log('3333')
        this.loading = this.$loading({
          lock: true,
          text: "正在请求数据",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          this.exportMeeting("all");
          this.zipFlag = true;
        }, 2000);
      } else {
        console.log('222211111')
        this.zipFlag = false;
      }
    }
  },
  created () {
    // this.setLabel()
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  },
  beforeDestroy() {
    console.log("销毁了");
    // this.loading.close();
    this.setOneTotalFlag(false);
  },
  mounted() {
    let that = this;
    let algTypes = JSON.parse(localStorage.getItem("algTypes"));
    // this.zipFlag = false;
    console.log("!!!!!!!!!!!!!!!!!!!!!!"+algTypes)
    if (algTypes) {
      // 是否显示抑郁
      that.depressionFlag = algTypes.depressionFlag
      // 是否显示焦虑
      that.anxietyFlag = algTypes.anxietyFlag
      // 是否显示强迫
      that.forcedFlag = algTypes.forcedFlag
      // 是否显示PTSD
      that.ptsdFlag = algTypes.ptsdFlag
      // 是否显示敌对
      that.violenceFlag = algTypes.violenceFlag
      // 是否显示自我伤害
      that.suicideFlag = algTypes.suicideFlag
      // // 是否显示自闭
      // this.zibiFlag = algTypes.zibiFlag
      // 是否显示大五人格
      that.extroversionFlag = algTypes.extroversionFlag
      that.conscientiousnessFlag = algTypes.conscientiousnessFlag
      that.nervousnessFlag = algTypes.nervousnessFlag
      that.agreeablenessFlag = algTypes.agreeablenessFlag
      that.opennessFlag = algTypes.opennessFlag

      // 是否显示心理韧性
      that.resilienceFlag = algTypes.resilienceFlag
      // 是否显示积极自我
      that.selfFlag = algTypes.selfFlag
      // 是否显示积极成就
      that.achievementFlag = algTypes.achievementFlag
      // 是否显示积极情绪
      that.emotionFlag = algTypes.emotionFlag
      // 是否显示积极关系
      that.relationshipFlag = algTypes.relationshipFlag
    }
    console.log(that.relationshipFlag)
    // console.log(this.gList)
    // this.getInfo()
    console.log(this.cutStr("测试1字符串哈哈哈哈", 6))
    console.log(this.cutStr("测试1字符串哈哈哈哈", 10).substring(this.cutStr("测试1字符串哈哈哈哈", 6).length, this.cutStr("测试1字符串哈哈哈哈", 10).length))
    window.addEventListener("resize", () => {
      setTimeout(() => {
        // this.myChartZhu.resize();
        this.changeSize()
      }, 100);
    });
  },
  methods: {
    ...mapMutations(["setOneTotalFlag"]),
    // 初始化label样式
    setLabel () {
      this.optionData.forEach((item, index) => {
        item.itemStyle = {
          color: color3D[index]
        }
        item.label = {
          normal: {
            show: true,
            color: color3D[index],
            formatter: [
              '{b|{b}}',
              '{c|{c}}{b|台}',
              '{d|{d}%}'
            ].join('\n'), // 用\n来换行
            rich: {
              b: {
                color: '#fff',
                lineHeight: 25,
                align: 'left'
              },
              c: {
                fontSize: 22,
                color: '#fff',
                textShadowColor: '#1c90a6',
                textShadowOffsetX: 0,
                textShadowOffsetY: 2,
                textShadowBlur: 5
              },
              d: {
                color: color3D[index],
                align: 'left'
              }
            }
          }
        }
        item.labelLine = {
          normal: {
            lineStyle: {
              width: 1,
              color: 'rgba(255,255,255,0.7)'
            }
          }
        }
      })
    },
    // 图表初始化
    initChart () {
      let that = this;
      console.log(456);
      // 当前视口宽度
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function(val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
      // 绘制立体饼图
      let flag = false;
      // console.log(this.warningStatistic.depressionNum)
      // console.log(this.warningStatistic.depressionNum ? this.warningStatistic.depressionNum : 0)
      this.pieList = []
      let flagNum = 0
      for ( let i in that.wdPerctList) {
        this.pieList.push({
          name: that.wdPerctList[i].name,
          value: that.wdPerctList[i].perct,
          y: that.wdPerctList[i].perct,
          // y: 50,
          num: 0
        })
        if (that.wdPerctList[i].perct > 0) {
          flagNum++
        }
      }
      // this.pieList = [
      //   {
      //     name: that.wdPerctList[0].name,
      //     value: that.wdPerctList[0].perct,
      //     y: that.wdPerctList[0].perct,
      //     // y: 50,
      //     num: 0
      //   },
      //   {
      //     name: that.wdPerctList[1].name,
      //     value: that.wdPerctList[1].perct,
      //     y: that.wdPerctList[1].perct,
      //     // y: 10,
      //     num: 0
      //   },
      //   {
      //     name: that.wdPerctList[2].name,
      //     value: that.wdPerctList[2].perct,
      //     y: that.wdPerctList[2].perct,
      //     // y: 20,
      //     num: 0
      //   },
      //   {
      //     name: that.wdPerctList[3].name,
      //     value: that.wdPerctList[3].perct,
      //     y: that.wdPerctList[3].perct,
      //     // y: 10,
      //     num: 0
      //   },
      //   {
      //     name: that.wdPerctList[4].name,
      //     value: that.wdPerctList[4].perct,
      //     y: that.wdPerctList[4].perct,
      //     // y: 10,
      //     num: 0
      //   },
      //   {
      //     name: that.wdPerctList[5].name,
      //     value: that.wdPerctList[5].perct,
      //     y: that.wdPerctList[5].perct,
      //     // y: 10,
      //     num: 0
      //   }
      // ];
      console.log(this.pieList)
      console.log(flagNum)
      if (flagNum === 0) {
        flag = true
      }
      this.pieList.forEach((item, index) => {
        item.itemStyle = {
          opacity: 1,
          color: that.wdPerctList[index].color3
        }
        item.tooltip = {
          formatter: params => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${
                params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${
                params.series[params.seriesIndex].pieData.value
              }`;
            }
          }
        }
        item.label = {
          normal: {
            // alignTo: 'edge',
            margin: 0,
            show: true,
            lineHeight: 30,
            color: that.wdPerctList[index].color3,
            formatter: [
              '{b|{b}：}{d|{d}%}\n{hr|}'
            ].join('\n'), // 用\n来换行
            rich: {
              b: {
                fontSize: 22,
                fontFamily: 'SourceHanSansCN-Regular, SourceHanSansCN',
                fontWeight: 400,
                color: '#333E75',
                lineHeight: 1,
                align: 'left',
                padding: [10, 0, -20, 20]
              },
              d: {
                fontSize: 22,
                fontFamily: 'SourceHanSansCN-Regular, SourceHanSansCN',
                fontWeight: 400,
                lineHeight: 1,
                // color: pieColor[index],
                color: '#333E75',
                align: 'left',
                padding: [10, 14, -20, 0]
              },
              hr: {
                backgroundColor: that.wdPerctList[index].color3,
                borderRadius: 8,
                width: 8,
                height: 8
                // padding: [6, 6, 0, -12]
              }
              // hr: {
              //   backgroundColor: pieColor[index],
              //   borderRadius: nowSize(3),
              //   width: nowSize(6),
              //   height: nowSize(6)
              // }
            },
            distanceToLabelLine: 0

          }
        }
        item.labelLine = {
          normal: {
            length: 50,
            length2: 45,
            showAbove: true,
            // minTurnAngle: 90,
            minSurfaceAngle: 90,
            lineStyle: {
              width: 1.5,
              color: that.wdPerctList[index].color3
            }
          }
        }
      })
      this.myChartPie = echarts.init(this.$refs.myChartPie);
      console.log(this.pieList)
      this.pieOption = getPie3D(this.pieList, 2, 300, 40, 20, 2, -1)
      this.myChartPie.setOption(this.pieOption);
      // // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      let pieList1 = JSON.parse(JSON.stringify(this.pieList))
      if (!flag) {
        for (let i in pieList1) {
          pieList1[i].itemStyle.color = "transparent"
        }
      }
      this.pieOption.series.push({
        name: '预警', // 自己根据场景修改
        backgroundColor: 'transparent',
        color: 'transparent',
        type: 'pie',
        animation: false,
        label: {
          opacity: 1,
          fontSize: 13,
          lineHeight: 20
        },
        startAngle: -60, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: flag ? ['0%', '60%'] : ['0%', '60%'],
        center: ['50%', '50%'],
        data: pieList1,
        itemStyle: {
          color: "transparent",
          opacity: 1 // 这里必须是0，不然2d的图会覆盖在表面
        }
      })
      this.myChartPie.setOption(this.pieOption)
      console.log(this.myChartPie)
      // this.bindListen(this.myChartPie, 'pieOption')
    },
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
    bindListen (myChart, optionName = 'option') {
      let selectedIndex = ''
      let hoveredIndex = ''
      // 监听点击事件，实现选中效果（单选）
      myChart.on('click', (params) => {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        const isSelected = !this[optionName].series[params.seriesIndex].pieStatus
          .selected
        const isHovered =
          this[optionName].series[params.seriesIndex].pieStatus.hovered
        const k = this[optionName].series[params.seriesIndex].pieStatus.k
        const startRatio =
          this[optionName].series[params.seriesIndex].pieData.startRatio
        const endRatio =
          this[optionName].series[params.seriesIndex].pieData.endRatio
        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
          this[optionName].series[
            selectedIndex
          ].parametricEquation = getParametricEquation(
            this[optionName].series[selectedIndex].pieData.startRatio,
            this[optionName].series[selectedIndex].pieData.endRatio,
            false,
            false,
            k,
            this[optionName].series[selectedIndex].pieData.value
          )
          this[optionName].series[selectedIndex].pieStatus.selected = false
        }
        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        this[optionName].series[
          params.seriesIndex
        ].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          this[optionName].series[params.seriesIndex].pieData.value
        )
        this[optionName].series[params.seriesIndex].pieStatus.selected = isSelected
        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        selectedIndex = isSelected ? params.seriesIndex : null
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName])
      })
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on('mouseover', (params) => {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = this[optionName].series[hoveredIndex].pieStatus.selected
            isHovered = false
            startRatio = this[optionName].series[hoveredIndex].pieData.startRatio
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio
            k = this[optionName].series[hoveredIndex].pieStatus.k
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            this[optionName].series[
              hoveredIndex
            ].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[hoveredIndex].pieData.value
            )
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = ''
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== 'mouseoutSeries' &&
            params.seriesName !== 'pie2d'
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              this[optionName].series[params.seriesIndex].pieStatus.selected
            isHovered = true
            startRatio =
              this[optionName].series[params.seriesIndex].pieData.startRatio
            endRatio = this[optionName].series[params.seriesIndex].pieData.endRatio
            k = this[optionName].series[params.seriesIndex].pieStatus.k
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            this[optionName].series[
              params.seriesIndex
            ].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[params.seriesIndex].pieData.value + 60
            )
            this[optionName].series[
              params.seriesIndex
            ].pieStatus.hovered = isHovered
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName])
        }
      })
      // 修正取消高亮失败的 bug
      myChart.on('globalout', () => {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected
          isHovered = false
          k = this[optionName].series[hoveredIndex].pieStatus.k
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          this[optionName].series[
            hoveredIndex
          ].parametricEquation = getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            this[optionName].series[hoveredIndex].pieData.value
          )
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = ''
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName])
      })
    },
    // 自适应宽高
    changeSize () {
      // this.statusChart.resize()
    },
    getInfo() {
      let that = this;
      // this.ecCount = 10
      // if (this.ecCount < 21) {
      //   this.ecType = 1
      // }
      // this.wdPerctList = [
      //   {
      //     name: '抑郁',
      //     color1: 'rgba(132, 138, 255, 0.6)',
      //     color2: 'rgba(162, 176, 255, 0.6)',
      //     perct: "18",
      //     info: [
      //       // {
      //       //   depName: '测试1部门',
      //       //   riskPerct: 0
      //       // },
      //       // {
      //       //   depName: '测试2部门',
      //       //   riskPerct: 0
      //       // },
      //       // {
      //       //   depName: '测试3部门',
      //       //   riskPerct: 40
      //       // },
      //       // {
      //       //   depName: '测试4部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试5部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试6部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试7部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试8部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试9部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试10部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试11部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试12部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试13部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试14部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试15部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试16部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试17部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试18部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试19部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试20部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试21部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试22部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试23部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试24部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试25部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试26部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试27部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试28部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试29部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试30部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试31部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试32部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试33部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试34部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试35部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试36部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试37部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试38部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试39部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试40部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试41部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试42部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试43部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试44部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试45部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试46部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试47部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试48部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试49部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试50部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试51部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试52部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试53部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试54部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试55部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试56部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试57部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试58部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试59部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试60部门',
      //       //   riskPerct: 30
      //       // },
      //       {
      //         depName: '测试61部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试62部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试63部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试64部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试65部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试66部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试67部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试68部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试69部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试70部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试71部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试72部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试73部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试74部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试75部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试76部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试77部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试78部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试79部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试80部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试81部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试82部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试83部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试84部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试85部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试86部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试87部门',
      //         riskPerct: 30
      //       },

      //       {
      //         depName: '测试88部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试89部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试90部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试91部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试92部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试93部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试94部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试95部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试96部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试97部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试98部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试99部门',
      //         riskPerct: 30
      //       }
      //     ]
      //   },
      //   {
      //     name: '焦虑',
      //     color1: 'rgba(214, 182, 246, 0.6)',
      //     color2: 'rgba(225, 203, 246, 0.6)',
      //     perct: "10",
      //     info: [
      //       {
      //         depName: '测试1部门',
      //         riskPerct: 13
      //       },
      //       {
      //         depName: '测试2部门',
      //         riskPerct: 1
      //       },
      //       {
      //         depName: '测试3部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试4部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试5部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试6部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试7部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试8部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试9部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试10部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试11部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试12部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试13部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试14部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试15部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试16部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试17部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试18部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试19部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试20部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试21部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试22部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试23部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试24部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试25部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试26部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试27部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试28部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试29部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试30部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试31部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试32部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试33部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试34部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试35部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试36部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试37部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试38部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试39部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试40部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试41部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试42部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试43部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试44部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试45部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试46部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试47部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试48部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试49部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试50部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试51部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试52部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试53部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试54部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试55部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试56部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试57部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试58部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试59部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试60部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试61部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试62部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试63部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试64部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试65部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试66部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试67部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试68部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试69部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试70部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试71部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试72部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试73部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试74部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试75部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试76部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试77部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试78部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试79部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试80部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试81部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试82部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试83部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试84部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试85部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试86部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试87部门',
      //         riskPerct: 30
      //       },

      //       {
      //         depName: '测试88部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试89部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试90部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试91部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试92部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试93部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试94部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试95部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试96部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试97部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试98部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试99部门',
      //         riskPerct: 30
      //       }
      //     ]
      //   },
      //   {
      //     name: '强迫',
      //     color1: 'rgba(255, 193, 150, 0.6)',
      //     color2: 'rgba(255, 227, 184, 0.6)',
      //     perct: "30",
      //     info: [
      //       {
      //         depName: '测试1部门',
      //         riskPerct: 3
      //       },
      //       {
      //         depName: '测试2部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试3部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试4部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试5部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试6部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试7部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试8部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试9部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试10部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试11部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试12部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试13部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试14部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试15部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试16部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试17部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试18部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试19部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试20部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试21部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试22部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试23部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试24部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试25部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试26部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试27部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试28部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试29部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试30部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试31部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试32部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试33部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试34部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试35部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试36部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试37部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试38部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试39部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试40部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试41部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试42部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试43部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试44部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试45部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试46部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试47部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试48部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试49部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试50部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试51部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试52部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试53部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试54部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试55部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试56部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试57部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试58部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试59部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试60部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试61部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试62部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试63部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试64部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试65部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试66部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试67部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试68部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试69部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试70部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试71部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试72部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试73部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试74部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试75部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试76部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试77部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试78部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试79部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试80部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试81部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试82部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试83部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试84部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试85部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试86部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试87部门',
      //         riskPerct: 30
      //       },

      //       {
      //         depName: '测试88部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试89部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试90部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试91部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试92部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试93部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试94部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试95部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试96部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试97部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试98部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试99部门',
      //         riskPerct: 30
      //       }
      //     ]
      //   },
      //   {
      //     name: '自我伤害',
      //     color1: 'rgba(255, 146, 186, 0.6)',
      //     color2: 'rgba(255, 182, 207, 0.6)',
      //     perct: "22",
      //     info: [
      //       // {
      //       //   depName: '测试1部门',
      //       //   riskPerct: 11
      //       // },
      //       // {
      //       //   depName: '测试2部门',
      //       //   riskPerct: 20
      //       // },
      //       // {
      //       //   depName: '测试3部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试4部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试5部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试6部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试7部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试8部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试9部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试10部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试11部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试12部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试13部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试14部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试15部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试16部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试17部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试18部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试19部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试20部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试21部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试22部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试23部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试24部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试25部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试26部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试27部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试28部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试29部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试30部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试31部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试32部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试33部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试34部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试35部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试36部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试37部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试38部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试39部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试40部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试41部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试42部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试43部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试44部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试45部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试46部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试47部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试48部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试49部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试50部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试51部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试52部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试53部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试54部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试55部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试56部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试57部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试58部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试59部门',
      //       //   riskPerct: 30
      //       // },
      //       // {
      //       //   depName: '测试60部门',
      //       //   riskPerct: 30
      //       // },
      //       {
      //         depName: '测试61部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试62部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试63部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试64部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试65部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试66部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试67部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试68部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试69部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试70部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试71部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试72部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试73部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试74部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试75部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试76部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试77部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试78部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试79部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试80部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试81部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试82部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试83部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试84部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试85部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试86部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试87部门',
      //         riskPerct: 30
      //       },

      //       {
      //         depName: '测试88部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试89部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试90部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试91部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试92部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试93部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试94部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试95部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试96部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试97部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试98部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试99部门',
      //         riskPerct: 30
      //       }
      //     ]
      //   },
      //   {
      //     name: '敌对',
      //     color1: 'rgba(135, 201, 255, 0.6)',
      //     color2: 'rgba(175, 236, 255, 0.6)',
      //     perct: "20",
      //     info: [
      //       {
      //         depName: '测试1部门',
      //         riskPerct: 10
      //       },
      //       {
      //         depName: '测试2部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试3部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试4部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试5部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试6部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试7部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试8部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试9部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试10部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试11部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试12部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试13部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试14部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试15部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试16部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试17部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试18部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试19部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试20部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试21部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试22部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试23部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试24部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试25部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试26部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试27部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试28部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试29部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试30部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试31部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试32部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试33部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试34部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试35部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试36部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试37部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试38部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试39部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试40部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试41部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试42部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试43部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试44部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试45部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试46部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试47部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试48部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试49部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试50部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试51部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试52部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试53部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试54部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试55部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试56部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试57部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试58部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试59部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试60部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试61部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试62部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试63部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试64部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试65部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试66部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试67部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试68部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试69部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试70部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试71部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试72部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试73部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试74部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试75部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试76部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试77部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试78部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试79部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试80部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试81部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试82部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试83部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试84部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试85部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试86部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试87部门',
      //         riskPerct: 30
      //       },

      //       {
      //         depName: '测试88部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试89部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试90部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试91部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试92部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试93部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试94部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试95部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试96部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试97部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试98部门',
      //         riskPerct: 30
      //       },
      //       {
      //         depName: '测试99部门',
      //         riskPerct: 30
      //       }
      //     ]
      //   }
      // ]
      // let ecList = []
      // this.wdPerctList.sort((a, b) => {
      //   return b.perct - a.perct
      // })
      // for (let i in this.wdPerctList) {
      //   console.log(this.wdPerctList[i].name)
      //   let name = i < 1 ? '一、' + this.wdPerctList[i].name : i == 1 ? '二、' + this.wdPerctList[i].name: i == 2 ? '三、' + this.wdPerctList[i].name: i == 3 ? '四、' + this.wdPerctList[i].name:  '五、' + this.wdPerctList[i].name
      //   let info = this.wdPerctList[i].info
      //   let infos = []
      //   for (let j = 0; j < info.length; j += 20) {
      //     // 每次循环中取出原数组的五个元素，并存入新数组
      //     infos.push({
      //       name: j < 1 ? name : '',
      //       list: info.slice(j, j + 20)
      //     });
      //     ecList.push({
      //       name: j < 1 ? this.wdPerctList[i].name : '',
      //       color1: this.wdPerctList[i].color1,
      //       color2: this.wdPerctList[i].color2,
      //       list: info.slice(j, j + 20)
      //     })

      //   }
      //   this.wdPerctList[i].infos = infos

      //   // that.echartInfo(i + 'Z' + that.ecType)
      // }
      // console.log(this.wdPerctList)
      // console.log(ecList)
      // for (let i in ecList) {
      //   this['myChartZhu' + i] = null
      // }
      // this.ecList = ecList
      // setTimeout(() => {
      //   for (let i in ecList) {
      //     // console.log(ecList[i])
      //     this.echartInfo('myChartZhu' + i, ecList[i])
      //   }
      // }, 1500);
    },
    echartInfo (dataName, datas) {
      let that = this;
      // for (let i in this.ecCount) {
      //   console.log(i)
      // }
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      console.log(dataName)
      console.log(datas)
      let listX = []
      let listY = []
      // depName: '测试92部门',
      // riskPerct: 30
      let maxList = JSON.parse(JSON.stringify(datas.info)).sort((a, b) => {
        return b.y - a.y
      })
      let max = maxList[0].y
      datas.info = datas.info.reverse()
      for (let i in datas.info) {
        listX.push(datas.info[i].x.replace(/-/g, '/'))
        listY.push(datas.info[i].y)
      }
      
      console.log(this)
      console.log(this.$refs)
      console.log(this.$refs[dataName])
      // this.myChartZhu = echarts.init(this.$refs.myChartZhu);
      this[dataName] = echarts.init(this.$refs[dataName][0]);
      console.log(this[dataName])
      this[dataName].setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },

        grid: {
          top: '16',
          left: "4%",
          right: "6%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // x轴文字配置
            axisLine: {
              // show: false
              lineStyle: {
                color: "rgba(216,216,216,0.18)"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 10,
              color: "#2A3487",
              fontSize: 14,
              showMaxLabel: true,
              interval: 'auto',
              // 文字换行
              formatter: function (value) {
                let res = ""; // 拼接加\n返回的类目项
                let maxLength = 10; // 每项显示文字个数  数字设置几，就一行显示几个文字
                let valLength = value.length; // X轴上的文字个数
                let rowN = Math.ceil(valLength / maxLength); // 需要换行的行数
                // 换行的行数大于1,
                if (rowN > 1) {
                  for (let i = 0; i < rowN; i++) {
                    let temp = ""; // 每次截取的字符串
                    let start = i * maxLength; // 开始截取的位置
                    let end = start + maxLength; // 结束截取的位置
                    temp = value.substring(start, end) + "\n";
                    res += temp; // 拼接字符串
                  }
                  return res;
                } else {
                  return value;
                }
              }
              // interval: 0
            },
            data: listX
          }
        ],
        yAxis: [
          {
            // min: 0, // 最小百分比
            max: max < 3 ? 3 : max, // 最大百分比
            type: 'value',
            minInterval: 1,
            // name: '单位（%）',
            nameGap: 35,
            nameTextStyle: { color: '#6F76B2' },
            axisTick: { show: false },
            axisLabel: {
              show: true,
              interval: 0, // 使x轴文字显示全
              color: '#6F76B2',
              fontSize: 14,
              formatter: '{value}' // y轴数值，带百分号
            },
            axisLine: { show: false, lineStyle: { color: '#dddddd' } },
            splitLine: { show: false, lineStyle: { type: 'dashed', color: '' } }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            symbol: "none",
            smooth: true,
            animation: false,
            itemStyle: {
              normal: {
                color: datas.color2,
                lineStyle: {
                  type: "solid",
                  width: 1
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: datas.color1
                  },
                  {
                    offset: 1,
                    color: datas.color2
                  }
                ])
              }
            },
            barWidth: 0,
            // color:"#00FFFF",
            data: listY,
            markLine: {
              silent: true,
              symbol: 'none',
              lineStyle: {
                type: 'dashed',
                normal: {
                  color: '#FFB0DB'
                }
              },
              data: [{
                yAxis: 3,
                symbol: 'none'
              }],
              label: {
                show: false,
                normal: {
                  formatter: ''           // 这儿设置安全基线
                }
              }
            }
            // data: [3, 2, 1, 40, 2, 5, 1]
          }
          // {
          //   name: "使用数量",
          //   type: "line",
          //   animation: false,
          //   barWidth: "14",
          //   itemStyle: {
          //     normal: {
          //       barBorderRadius: [2, 2, 0, 0],
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         {
          //           offset: 0,
          //           color: datas.color1
          //         },
          //         {
          //           offset: 1,
          //           color: datas.color2
          //         }
          //       ])
          //     }
          //   },
          //   label: {
          //     show: true,
          //     position: 'top', // 顶部显示
          //     fontSize: '10',
          //     color: '#2A3487',
          //     formatter: function(data) {
          //       return data.value + '%'
          //     }
          //   },
          //   data: listY
          // }
        ]
      });
    },
    perctInfo (data) {
      console.log(data)
      return Math.round(data.toFixed(4) * 10000) / 100
    },
    perctInfo1 (data) {
      console.log(data)
      let datas = data / 100
      return Math.round(datas.toFixed(4) * 10000) / 100
    },
    cutStr(str, L) {
      // console.log(str, L)
      var result = '';
      var strlen = str.length; // 字符串长度
      var chrlen = str.replace(/[^\x00-\xff]/g, '**').length; // 字节长度
      // console.log(strlen)
      // console.log(chrlen)
      if (chrlen <= L) { return str; }
      for (var i = 0, j = 0; i < strlen; i++) {
        var chr = str.charAt(i);
        if (/[\x00-\xff]/.test(chr)) {
          j++; // ascii码为0-255，一个字符就是一个字节的长度
        } else {
          j += 2; // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        // console.log(j)
        // console.log(chr)
        if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
          result += chr;
        } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
          return result;
        }
      }
    },
    getMeetingAll() {
      let that = this;
      return new Promise((resolve, reject) => {
        console.log(this.gList)
        let paramt = {
          passport: this.gList.passport,
          // organization: this.gList.organization,
          startDate: this.gList.startDate,
          endDate: this.gList.endDate
          // type: this.gList.type
        }
        // // 用例
        // alert(this.cutStr("测试1字符串哈哈哈哈", 1, 6));
        // alert(this.cutStr("测试1字符串哈哈哈哈", 6, 10));
        console.log(paramt)
        this.$http
          .get(Url + "/aimw/report/exportPersonalReport", { params: paramt })
          .then(res => {
            console.log(res.data.data)
            // res.data.data = {
            //   // organizationName: this.gList.organizationName,
            //   // startDate: this.gList.startDate,
            //   // endDate: this.gList.endDate,
            //   // totalNum: 100,
            //   // evaNum: 40,
            //   // riskNum: 30,
            //   // riskPerct: 75,
            //   // depressionPerct: 20,
            //   // forcedPerct: 10,
            //   // anxietyPerct: 15,
            //   // suicidePerct: 30,
            //   // violencePerct: 25,
            //   // depInfo: [
            //   //   {
            //   //     depName: '测试1部门',
            //   //     totalNum: 20,
            //   //     evaNum: 10,
            //   //     evaPerct: 50
            //   //   },
            //   //   {
            //   //     depName: '测试2部门',
            //   //     totalNum: 20,
            //   //     evaNum: 10,
            //   //     evaPerct: 50
            //   //   }
            //   // ],
            //   // depressionInfo: [
            //   //   {
            //   //     depName: '测试1部门',
            //   //     riskPerct: 30
            //   //   },
            //   //   {
            //   //     depName: '测试2部门',
            //   //     riskPerct: 30
            //   //   }
            //   // ],
            //   // forcedInfo: [
            //   //   {
            //   //     depName: '测试1部门',
            //   //     riskPerct: 30
            //   //   },
            //   //   {
            //   //     depName: '测试2部门',
            //   //     riskPerct: 30
            //   //   }
            //   // ],
            //   // anxietyInfo: [
            //   //   {
            //   //     depName: '测试1部门',
            //   //     riskPerct: 30
            //   //   },
            //   //   {
            //   //     depName: '测试2部门',
            //   //     riskPerct: 30
            //   //   }
            //   // ],
            //   // suicideInfo: [
            //   //   {
            //   //     depName: '测试1部门',
            //   //     riskPerct: 30
            //   //   },
            //   //   {
            //   //     depName: '测试2部门',
            //   //     riskPerct: 30
            //   //   }
            //   // ],
            //   // violenceInfo: [
            //   //   {
            //   //     depName: '测试1部门',
            //   //     riskPerct: 30
            //   //   },
            //   //   {
            //   //     depName: '测试2部门',
            //   //     riskPerct: 30
            //   //   }
            //   // ]
            // }
            // console.log(res.data.data)
            let data = res.data;
            // console.log(data)
            if (data.code == 0) {
              let info = res.data.data
              // info.organizationName = this.gList.organizationName;
              // info.startDate = this.gList.startDate;
              // info.endDate = this.gList.endDate;
              if (!info.reportInfo) {
                this.$message.error('当前选择的时段内未发现报告数据，请重新选择！')
                this.loading.close();
                this.setOneTotalFlag(false)
                return false
              }
              setTimeout(() => {
                resolve(data.data);
                this.loading.setText("正在请求数据");
              }, 500);
            } else {
              that.$message.error(data.msg);
              this.loading.close();
              this.setOneTotalFlag(false);
            }
          })
          .catch(res => {
            console.log(res);
            this.loading.close();
            this.setOneTotalFlag(false);
          });
      });
    },
    etBLen(str) {
      if (str == null) return 0;
      if (typeof str != "string") {
        str += "";
      }
      // eslint-disable-next-line no-control-regex
      return str.replace(/[^\x00-\xff]/g, "01").length;
    },
    async exportMeeting(type) {
      // type:'1' 选择导出 'all':导出所有
      console.log("~~~~~~2")
      let that = this;
      let algTypes = JSON.parse(localStorage.getItem("algTypes"));
      this.zipFlag = false;
      console.log("!!!!!!!!!!!!!!!!!!!!!!"+algTypes)
      if (algTypes) {
        // 是否显示抑郁
        that.depressionFlag = algTypes.depressionFlag
        // 是否显示焦虑
        that.anxietyFlag = algTypes.anxietyFlag
        // 是否显示强迫
        that.forcedFlag = algTypes.forcedFlag
        // 是否显示PTSD
        that.ptsdFlag = algTypes.ptsdFlag
        // 是否显示敌对
        that.violenceFlag = algTypes.violenceFlag
        // 是否显示自我伤害
        that.suicideFlag = algTypes.suicideFlag
        // // 是否显示自闭
        // this.zibiFlag = algTypes.zibiFlag
        // 是否显示大五人格
        that.extroversionFlag = algTypes.extroversionFlag
        that.conscientiousnessFlag = algTypes.conscientiousnessFlag
        that.nervousnessFlag = algTypes.nervousnessFlag
        that.agreeablenessFlag = algTypes.agreeablenessFlag
        that.opennessFlag = algTypes.opennessFlag

        // 是否显示心理韧性
        that.resilienceFlag = algTypes.resilienceFlag
        // 是否显示积极自我
        that.selfFlag = algTypes.selfFlag
        // 是否显示积极成就
        that.achievementFlag = algTypes.achievementFlag
        // 是否显示积极情绪
        that.emotionFlag = algTypes.emotionFlag
        // 是否显示积极关系
        that.relationshipFlag = algTypes.relationshipFlag
      }
      try {
        this.allLoading = true;
        let selectedData = [];
        selectedData.push(await this.getMeetingAll());
        console.log(selectedData)
        this.setOneTotalFlag(false);
        this.loading.setText("正在拼命导出");
        console.log('正在拼命导出')
        const zip = new JSZip();
        const promises = [];
        this.isShowPdf = true;
        
        for (let i = 0; i < selectedData.length; i++) {
          // 解析数据
          console.log(selectedData[i]);
          // EvaResult
          this.name = selectedData[i].name;
          this.evaluationTime = selectedData[i].evaluationTime;
          this.gender = selectedData[i].gender;
          selectedData[i].reportInfo = selectedData[i].reportInfo.reverse()
          let rLen = selectedData[i].reportInfo.length
          if (selectedData[i].startDate) {
            this.startDate = selectedData[i].startDate.substring(0, 4) + '/' + selectedData[i].startDate.substring(4, 6) + "/" + selectedData[i].startDate.substring(6, 8);
            console.log(this.startDate)
            this.endDate = selectedData[i].endDate.substring(0, 4) + '/' + selectedData[i].endDate.substring(4, 6) + "/" + selectedData[i].endDate.substring(6, 8);
            console.log(this.endDate)
          } else {
            this.startDate = selectedData[i].reportInfo[rLen - 1].datetime.split(' ')[0].replace(/-/g, '/')
            console.log(this.startDate)
            this.endDate = selectedData[i].reportInfo[0].datetime.split(' ')[0].replace(/-/g, '/')
            console.log(this.endDate)
          }
          
          this.time = this.startDate + ' —— ' + this.endDate;
          this.birth = selectedData[i].birth;
          this.organizationName = selectedData[i].departmentName;

          // 总体风险情况 在该测评时间段内，受测者共完成**次测评，其中有**次测评结果为有风险，**次为无风险。
          var rstr = '';
          rstr += '在该测评时间段内，受测者共完成' + selectedData[i].evaluationTime + '次测评，其中有' + selectedData[i].riskNum + '次测评结果为有风险，' + parseInt(selectedData[i].evaluationTime - selectedData[i].riskNum) + '次为无风险。'

          console.log(rstr)
          this.partsStr2 = rstr

          // 总体维度风险占比情况
          // selectedData[i].depressionInfo.sort((a, b) => {
          //   return b.riskPerct - a.riskPerct
          // })
          // selectedData[i].anxietyInfo.sort((a, b) => {
          //   return b.riskPerct - a.riskPerct
          // })
          // selectedData[i].forcedInfo.sort((a, b) => {
          //   return b.riskPerct - a.riskPerct
          // })
          // selectedData[i].suicideInfo.sort((a, b) => {
          //   return b.riskPerct - a.riskPerct
          // })
          // selectedData[i].violenceInfo.sort((a, b) => {
          //   return b.riskPerct - a.riskPerct
          // })
          // 焦虑（**%），其次分别为：强迫（**%），抑郁（**%），自我伤害（**%），敌对（**%）。
          let reportInfo = selectedData[i].reportInfo
          let depInfo = []
          let anxInfo = []
          let forInfo = []
          let suiInfo = []
          let ptsdInfo = []
          let vioInfo = []
          let list10 = []
          let listAll = []
          for (let i in reportInfo) {
            depInfo.push({
              x: reportInfo[i].datetime,
              y: reportInfo[i].depressionScore
            })
            anxInfo.push({
              x: reportInfo[i].datetime,
              y: reportInfo[i].anxietyScore
            })
            forInfo.push({
              x: reportInfo[i].datetime,
              y: reportInfo[i].forcedScore
            })
            ptsdInfo.push({
              x: reportInfo[i].datetime,
              y: reportInfo[i].ptsdScore
            })
            vioInfo.push({
              x: reportInfo[i].datetime,
              y: reportInfo[i].violenceScore
            })
            suiInfo.push({
              x: reportInfo[i].datetime,
              y: reportInfo[i].suicideScore
            })
            reportInfo[i].id = Number(i) + 1
            reportInfo[i].datetime = reportInfo[i].datetime.replace(/-/g, '/')
            reportInfo[i].duringTime = this.toHHmmss(
              Number(reportInfo[i].duringTime) * 1000
            );
            // if (i < 22) {
            listAll.push(reportInfo[i])
            // }
            if (i < 10) {
              list10.push(reportInfo[i])
            }
          }
          this.reportList = list10
          this.reportAllList = listAll
          console.log(listAll)
          let listPage = listAll.slice(10, listAll.length)
          console.log(listPage)
          let pageList = []
          for (let j = 0; j < listPage.length; j += 22) {
            // 每次循环中取出原数组的五个元素，并存入新数组
            pageList.push({
              list: listPage.slice(j, j + 22)
            });
          }
          console.log("------------------------------")
          console.log(pageList)
          this.reportPage = pageList
          console.log(listAll.length)
          let rPage = 0
          if (listAll.length > 0 && listAll.length < 5) {
            rPage = 1
          } else if (listAll.length > 4 && listAll.length < 7) {
            rPage = 2
          } else if (listAll.length > 6 && listAll.length < 11) {
            rPage = 3
          } else if (listAll.length > 10) {
            rPage = 4
          }
          this.rPage = rPage

          console.log(this.reportList)
          // ['#519AFE', '#FF89CB', '#7C82FF', '#FF8481', '#FFBB79', '#8DE684', '#f7de3b']
          let wdStr = []
          console.log(this.depressionFlag)
          if (this.depressionFlag == 1) {
            wdStr.push(
              {
                name: '抑郁',
                color1: 'rgba(138, 203, 255, 0.6)',
                color2: 'rgba(138, 203, 255, 0.6)',
                color3: '#8ACBFF',
                color4: 'rgba(201, 204, 255, 1)',
                num: selectedData[i].depressionNum,
                perct: selectedData[i].depressionPerct,
                riskNum: selectedData[i].depressionNum,
                level1: selectedData[i].depressionMildNum,
                level2: selectedData[i].depressionModerateNum,
                level3: selectedData[i].depressionSevereNum,
                info: depInfo
              }
            )
          }
          if (this.anxietyFlag == 1) {
            wdStr.push(
              {
                name: '焦虑',
                color1: 'rgba(255, 176, 219, 0.6)',
                color2: 'rgba(255, 176, 219, 0.6)',
                color3: '#FFB0DB',
                color4: 'rgba(225, 203, 246, 1)',
                num: selectedData[i].anxietyNum,
                perct: selectedData[i].anxietyPerct,
                riskNum: selectedData[i].anxietyNum,
                level1: selectedData[i].anxietyMildNum,
                level2: selectedData[i].anxietyModerateNum,
                level3: selectedData[i].anxietySevereNum,
                info: anxInfo
              }
            )
          }
          if (this.forcedFlag == 1) {
            wdStr.push(
              {
                name: '强迫',
                color1: 'rgba(181, 184, 255, 0.6)',
                color2: 'rgba(181, 184, 255, 0.6)',
                color3: '#B5B8FF',
                color4: 'rgba(255, 210, 97, 1)',
                num: selectedData[i].forcedNum,
                perct: selectedData[i].forcedPerct,
                riskNum: selectedData[i].forcedNum,
                level1: selectedData[i].forcedMildNum,
                level2: selectedData[i].forcedModerateNum,
                level3: selectedData[i].forcedSevereNum,
                info: forInfo
              }
            )
          }
          if (this.ptsdFlag == 1) {
            wdStr.push(
              {
                name: 'PTSD',
                color1: 'rgba(255, 163, 163, 0.6)',
                color2: 'rgba(255, 163, 163, 0.6)',
                color3: '#FFA3A3',
                color4: 'rgba(255, 207, 224, 1)',
                num: selectedData[i].PtsdNum,
                perct: selectedData[i].PtsdPerct,
                riskNum: selectedData[i].PtsdNum,
                level1: selectedData[i].PtsdMildNum,
                level2: selectedData[i].PtsdModerateNum,
                level3: selectedData[i].PtsdSevereNum,
                info: ptsdInfo
              }
            )
          }
          if (this.violenceFlag == 1) {
            wdStr.push(
              {
                name: '敌对',
                color1: 'rgba(255, 210, 157, 0.6)',
                color2: 'rgba(255, 210, 157, 0.6)',
                color3: '#FFD29D',
                color4: 'rgba(178, 231, 247, 1)',
                num: selectedData[i].violenceNum,
                perct: selectedData[i].violencePerct,
                riskNum: selectedData[i].violenceNum,
                level1: selectedData[i].violenceMildNum,
                level2: selectedData[i].violenceModerateNum,
                level3: selectedData[i].violenceSevereNum,
                info: vioInfo
              }
            )
          }
          if (this.suicideFlag == 1) {
            wdStr.push(
              {
                name: '自我伤害',
                color1: 'rgba(189, 245, 184, 1)',
                color2: 'rgba(189, 245, 184, 1)',
                color3: '#BDF5B8',
                color4: 'rgba(255, 207, 224, 1)',
                num: selectedData[i].suicideNum,
                perct: selectedData[i].suicidePerct,
                riskNum: selectedData[i].suicideNum,
                level1: selectedData[i].suicideMildNum,
                level2: selectedData[i].suicideModerateNum,
                level3: selectedData[i].suicideSevereNum,
                info: suiInfo
              }
            )
          }
          if (this.zibiFlag == 1) {
            wdStr.push(
              {
                name: '自闭',
                color1: 'rgba(189, 245, 184, 1)',
                color2: 'rgba(189, 245, 184, 1)',
                color3: '#BDF5B8',
                color4: 'rgba(255, 207, 224, 1)',
                num: selectedData[i].zibiNum,
                perct: selectedData[i].zibiPerct,
                riskNum: selectedData[i].zibiNum,
                level1: selectedData[i].zibiMildNum,
                level2: selectedData[i].zibiModerateNum,
                level3: selectedData[i].zibiSevereNum,
                info: zibiInfo
              }
            )
          }
          let wdArr = wdStr
          console.log(wdArr)
          let wdArrs = wdArr.sort((a, b) => {
            return b.perct - a.perct
          })
          var wstr = '';
          if (selectedData[i].riskNum == 0) {
            wstr += '如上图所示，在该测评时间段内，受测者无抑郁、焦虑、强迫、PTSD、敌对、自我伤害风险。'
          } else {
            if (selectedData[i].depressionPerct > 0 && selectedData[i].anxietyPerct > 0 && selectedData[i].forcedPerct > 0 && selectedData[i].suicidePerct > 0 && selectedData[i].violencePerct > 0) {
              wstr += '如上图所示，在该测评时间段内，受测者各维度风险占比，由高到低，依次为：'
              for (let k in wdArrs) {
                wstr += wdArrs[k].name + '（' + wdArrs[k].perct + '%）'
                if (k < wdArrs.length - 1) {
                  wstr += '，'
                } else {
                  wstr += '。'
                }
              }
            } else {
              wstr += '如上图所示，在该测评时间段内，受测者各维度风险占比，由高到低，依次为：'
              for (let k in wdArrs) {
                if (wdArrs[k].perct > 0) {
                  wstr += wdArrs[k].name + '（' + wdArrs[k].perct + '%）'
                } else {
                  wstr += '无' + wdArrs[k].name + '风险'
                }
                
                if (k < wdArrs.length - 1) {
                  wstr += '，'
                } else {
                  wstr += '。'
                }
              }
            }
          }
          console.log(wstr)
          this.partsStr3 = wstr
          this.evaFrequency = selectedData[i].evaFrequency

          let yjstr = '';
          console.log(wdArr)
          let yjArrs = wdArr.sort((a, b) => {
            return b.num - a.num
          })
          console.log(yjArrs)
          // if (yjArrs[0].num == 0) {
          //   yjstr += '2.在该测评时间段内，受测者在各个维度上皆无风险，可进行适当运动、规律饮食等等，维持身心健康。'
          // } else {
          //   let cont = 1
          //   if (yjArrs[0].num == yjArrs[1].num) {
          //     cont++
          //     if (yjArrs[1].num == yjArrs[2].num) {
          //       cont++
          //       if (yjArrs[2].num == yjArrs[3].num) {
          //         cont++
          //         if (yjArrs[3].num == yjArrs[4].num) {
          //           cont++
          //         }
          //       }
          //     }
          //   }
          //   yjstr += '2.在该测评时间段内，受测者在'
          //   yjstr += yjArrs[0].name
          //   if (yjArrs[0].num == yjArrs[1].num) {
          //     yjstr += '、' + yjArrs[1].name
          //   }
          //   if (yjArrs[0].num == yjArrs[2].num) {
          //     yjstr += '、' + yjArrs[2].name
          //   }
          //   if (yjArrs[0].num == yjArrs[3].num) {
          //     yjstr += '、' + yjArrs[3].name
          //   }
          //   if (yjArrs[0].num == yjArrs[4].num) {
          //     yjstr += '、' + yjArrs[4].name
          //   }
          //   if (cont > 0 && cont < 4) {
          //     yjstr += '维度上预警最多，建议可进一步关注受测者饮食、睡眠等情况；如有必要，还可以建议受测者及时寻求专业的心理咨询服务。'
          //   } else {
          //     yjstr += '维度上预警较多，建议从多方面关注受测者身心状况，如饮食睡眠、人际关系等等；如有必要，还可以建议受测者及时寻求专业的心理咨询服务。'
          //   }
          // }
          if (yjArrs[0].num == 0) {
            yjstr += '2.在该测评时间段内，受测者在各个维度上皆无风险，可进行适当运动、规律饮食等等，维持身心健康。'
          } else {
            let cont = 1
            if (yjArrs.length > 1 && yjArrs[0].num == yjArrs[1].num) {
              cont++
              if (yjArrs.length > 2 && yjArrs[1].num == yjArrs[2].num) {
                cont++
                if (yjArrs.length > 3 && yjArrs[2].num == yjArrs[3].num) {
                  cont++
                  if (yjArrs.length > 4 && yjArrs[3].num == yjArrs[4].num) {
                    cont++
                  }
                }
              }
            }
            yjstr += '2.在该测评时间段内，受测者在'
            yjstr += yjArrs[0].name
            if (yjArrs.length > 1 && yjArrs[0].num == yjArrs[1].num) {
              yjstr += '、' + yjArrs[1].name
            }
            if (yjArrs.length > 2 && yjArrs[0].num == yjArrs[2].num) {
              yjstr += '、' + yjArrs[2].name
            }
            if (yjArrs.length > 3 && yjArrs[0].num == yjArrs[3].num) {
              yjstr += '、' + yjArrs[3].name
            }
            if (yjArrs.length > 4 && yjArrs[0].num == yjArrs[4].num) {
              yjstr += '、' + yjArrs[4].name
            }
            if (cont > 0 && cont < 4) {
              yjstr += '维度上预警最多，建议可进一步关注受测者饮食、睡眠等情况；如有必要，还可以建议受测者及时寻求专业的心理咨询服务。'
            } else {
              yjstr += '维度上预警较多，建议从多方面关注受测者身心状况，如饮食睡眠、人际关系等等；如有必要，还可以建议受测者及时寻求专业的心理咨询服务。'
            }
          }

          this.partsStr4 = yjstr
          


          this.riskPerct = selectedData[i].riskPerct
          this.riskPerct1 = this.perctInfo1(selectedData[i].riskPerct) + "%";

          this.depressionPerct = selectedData[i].depressionPerct
          this.anxietyPerct = selectedData[i].anxietyPerct
          this.forcedPerct = selectedData[i].forcedPerct
          this.suicidePerct = selectedData[i].suicidePerct
          this.violencePerct = selectedData[i].violencePerct
          this.depressionPerct1 = this.perctInfo1(selectedData[i].depressionPerct) + "%";
          this.anxietyPerct1 = this.perctInfo1(selectedData[i].anxietyPerct) + "%";
          this.forcedPerct1 = this.perctInfo1(selectedData[i].forcedPerct) + "%";
          this.suicidePerct1 = this.perctInfo1(selectedData[i].suicidePerct) + "%";
          this.violencePerct1 = this.perctInfo1(selectedData[i].violencePerct) + "%";
          selectedData[i].evaPerct = this.perctInfo(selectedData[i].evaNum / selectedData[i].totalNum) + "%";

          let cpList = []
          // 其中：（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）。

          var sstr = '';
          sstr += '本机构共' + selectedData[i].totalNum + '人，实测' + selectedData[i].evaNum + '人（' + selectedData[i].evaPerct + '）。其中：'
          for (let j in selectedData[i].depInfo) {
            sstr += '（' + selectedData[i].depInfo[j].depName + '）共' + selectedData[i].depInfo[j].totalNum + '人，实测' + selectedData[i].depInfo[j].evaNum + '人（' + this.perctInfo1(selectedData[i].depInfo[j].evaPerct) + '%）'
            // sstr += '（' + selectedData[i].depInfo[j].depName + '）共' + selectedData[i].depInfo[j].totalNum + '人，实测' + selectedData[i].depInfo[j].evaNum + '人（' + this.perctInfo1(selectedData[i].depInfo[j].evaPerct) + '%）'
            // sstr += '（' + selectedData[i].depInfo[j].depName + '）共' + selectedData[i].depInfo[j].totalNum + '人，实测' + selectedData[i].depInfo[j].evaNum + '人（' + this.perctInfo1(selectedData[i].depInfo[j].evaPerct) + '%）'
            // sstr += '（' + selectedData[i].depInfo[j].depName + '）共' + selectedData[i].depInfo[j].totalNum + '人，实测' + selectedData[i].depInfo[j].evaNum + '人（' + this.perctInfo1(selectedData[i].depInfo[j].evaPerct) + '%）'
            // sstr += '（' + selectedData[i].depInfo[j].depName + '）共' + selectedData[i].depInfo[j].totalNum + '人，实测' + selectedData[i].depInfo[j].evaNum + '人（' + this.perctInfo1(selectedData[i].depInfo[j].evaPerct) + '%）'
            cpList.push({
              name: selectedData[i].depInfo[j].depName,
              total: selectedData[i].depInfo[j].totalNum,
              evaNum: selectedData[i].depInfo[j].evaNum,
              evaPerct: this.perctInfo1(selectedData[i].depInfo[j].evaPerct)
            })
            if (j < selectedData[i].depInfo.length - 1) {
              sstr += ';'
            } else {
              sstr += '。'
            }
          }
          this.partsStr1 = sstr
          console.log(cpList.length)
          console.log(cpList.length % 2)
          
          // cpList = [
          //   { name: '', total: '', evaNum: '', evaPerct: '' }

          // ]
          // if (cpList.length > 0 && cpList.length % 2 > 0) {
          //   cpList.push({
          //     name: '',
          //     total: '',
          //     evaNum: '',
          //     evaPerct: ''
          //   })
          // }
          // this.cpList = cpList
          // console.log('~~~~~~~~~~~~~~~~~~' + cpList.length)
          // if (cpList.length < 11) {
          //   this.riskPage = 1
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 533)
          //   this.cpList1 = this.cpList
          //   this.partsStr12 = ''
          //   this.partsStr13 = ''
          // } else if (cpList.length > 10 && cpList.length < 15) {
          //   // 总体维度，放到下一页
          //   this.riskPage = 2
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 767)
          //   this.cpList1 = this.cpList
          //   this.partsStr12 = ''
          //   this.partsStr13 = ''
          // } else if (cpList.length > 14 && cpList.length < 19) {
          //   // 总体维度，总体风险，放到下一页
          //   this.riskPage = 3
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   this.cpList1 = this.cpList
          //   this.partsStr12 = ''
          //   this.partsStr13 = ''
          // } else if (cpList.length > 18 && cpList.length < 53) {
          //   // 第二页不分页
          //   this.riskPage = 4
            
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   // this.partsStr12 = this.cutStr(this.partsStr1, 2672).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 2672).length)
          //   this.cpList1 = this.cpList.slice(0, 18)
          //   this.cpList2 = this.cpList.slice(18, cpList.length)
          //   this.partsStr13 = ''
          // } else if (cpList.length > 52 && cpList.length < 57) {
          //   // 总体维度，放到第三页
          //   this.riskPage = 5
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   // this.partsStr12 = this.cutStr(this.partsStr1, 2905).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 2905).length)
          //   this.cpList1 = this.cpList.slice(0, 18)
          //   this.cpList2 = this.cpList.slice(18, cpList.length)
          //   this.partsStr13 = ''
          // } else if (cpList.length > 56 && cpList.length < 61) {
          //   // 总体维度，总体风险，放到第三页
          //   this.riskPage = 6
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   // this.partsStr12 = this.cutStr(this.partsStr1, 3060).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 3060).length)
          //   this.cpList1 = this.cpList.slice(0, 18)
          //   this.cpList2 = this.cpList.slice(18, cpList.length)
          //   this.partsStr13 = ''
          // } else if (cpList.length > 60 && cpList.length < 95) {
          //   // 第三页不分页
          //   this.riskPage = 7
          //   this.cpList1 = this.cpList.slice(0, 18)
          //   this.cpList2 = this.cpList.slice(18, 60)
          //   this.cpList3 = this.cpList.slice(60, cpList.length)
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   // // console.log(this.partsStr11)
          //   // this.partsStr12 = this.cutStr(this.partsStr1, 3060).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 3060).length)
          //   // // console.log(this.partsStr12)
          //   // this.partsStr13 = this.partsStr1.substring(this.cutStr(this.partsStr1, 3060).length, this.partsStr1.length)
          //   // // console.log(this.partsStr13)
          // } else if (cpList.length > 94 && cpList.length < 99) {
          //   // 总体维度，放到第四页
          //   this.riskPage = 8
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   // this.partsStr12 = this.cutStr(this.partsStr1, 2905).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 2905).length)
          //   this.cpList1 = this.cpList.slice(0, 18)
          //   this.cpList2 = this.cpList.slice(18, 60)
          //   this.cpList3 = this.cpList.slice(60, cpList.length)
          // } else if (cpList.length > 98) {
          //   // 总体维度，总体风险，放到第四页
          //   this.riskPage = 9
          //   // this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   // this.partsStr12 = this.cutStr(this.partsStr1, 2905).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 2905).length)
          //   this.cpList1 = this.cpList.slice(0, 18)
          //   this.cpList2 = this.cpList.slice(18, 60)
          //   this.cpList3 = this.cpList.slice(60, 100)
          // }
          // // if (cpList.length)
          // // sstr = '本机构共50人，实测39人（**%）。其中：（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%），（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）。（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）。'
          // // sstr = '本机构共50人，实测39人（**%）。其中：（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%），（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）。（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门222）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门222）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）。'
          // // sstr = '本机构共50人，实测39人（**%）。其中：（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%），（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）。（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门222）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门222）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门333）共**人，实测**人（**%）；（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%），（二级部门1）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）。（二级部门3）共**人，实测**人（**%）；（二级部门4）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门22）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）；（二级部门2）共**人，实测**人（**%）。'
          // console.log(sstr.length)
          // console.log(this.etBLen(sstr))

          // console.log(sstr)






          // if (this.etBLen(sstr) < 534) {
          //   // 不需要分页
          //   this.riskPage = 1
          //   this.partsStr11 = this.cutStr(this.partsStr1, 533)
          //   this.partsStr12 = ''
          //   this.partsStr13 = ''
          //   // this.partsStr1.
          // } else if (this.etBLen(sstr) > 533 && this.etBLen(sstr) < 768) {
          //   // 总体维度，放到下一页
          //   this.riskPage = 2
          //   this.partsStr11 = this.cutStr(this.partsStr1, 767)
          //   this.partsStr12 = ''
          //   this.partsStr13 = ''
          // } else if (this.etBLen(sstr) > 767 && this.etBLen(sstr) < 922) {
          //   // 总体维度，总体风险，放到下一页
          //   this.riskPage = 3
          //   this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   this.partsStr12 = ''
          //   this.partsStr13 = ''
          // } else if (this.etBLen(sstr) > 921 && this.etBLen(sstr) < 2673) {
          //   // 第二页不分页
          //   this.riskPage = 4
          //   this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   this.partsStr12 = this.cutStr(this.partsStr1, 2672).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 2672).length)
          //   this.partsStr13 = ''
          // } else if (this.etBLen(sstr) > 2672 && this.etBLen(sstr) < 2906) {
          //   // 总体维度，放到第三页
          //   this.riskPage = 5
          //   this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   this.partsStr12 = this.cutStr(this.partsStr1, 2905).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 2905).length)
          //   this.partsStr13 = ''
          // } else if (this.etBLen(sstr) > 2905 && this.etBLen(sstr) < 3060) {
          //   // 总体维度，总体风险，放到第三页
          //   this.riskPage = 6
          //   this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   this.partsStr12 = this.cutStr(this.partsStr1, 3060).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 3060).length)
          //   this.partsStr13 = ''
          // } else if (this.etBLen(sstr) > 3059) {
          //   // 第三页不分页
          //   this.riskPage = 7
          //   this.partsStr11 = this.cutStr(this.partsStr1, 921)
          //   console.log(this.partsStr11)
          //   this.partsStr12 = this.cutStr(this.partsStr1, 3060).substring(this.partsStr11.length, this.cutStr(this.partsStr1, 3060).length)
          //   console.log(this.partsStr12)
          //   this.partsStr13 = this.partsStr1.substring(this.cutStr(this.partsStr1, 3060).length, this.partsStr1.length)
          //   console.log(this.partsStr13)
          // }
          console.log('~~~~~~~~~~~~~~~~~~~~~' + this.etBLen(sstr))
          console.log(this.riskPage)
          console.log(wdArr)
          this.wdPerctList = wdArr
          let ecList = []
          this.wdPerctList.sort((a, b) => {
            return b.perct - a.perct
          })
          // return
          for (let i in this.wdPerctList) {
            console.log(this.wdPerctList[i].name)
            let name = i < 1 ? '一、' + this.wdPerctList[i].name : i == 1 ? '二、' + this.wdPerctList[i].name : i == 2 ? '三、' + this.wdPerctList[i].name : i == 3 ? '四、' + this.wdPerctList[i].name : i == 4 ?  '五、' + this.wdPerctList[i].name : '六、' + this.wdPerctList[i].name
            this.wdPerctList[i].name1 = name
            // let info = this.wdPerctList[i].info
            // let infos = []
            // for (let j = 0; j < info.length; j += 20) {
            //   // 每次循环中取出原数组的五个元素，并存入新数组
            //   infos.push({
            //     name: j < 1 ? name : '',
            //     list: info.slice(j, j + 20)
            //   });
            //   ecList.push({
            //     name: j < 1 ? this.wdPerctList[i].name : '',
            //     color1: this.wdPerctList[i].color1,
            //     color2: this.wdPerctList[i].color2,
            //     list: info.slice(j, j + 20)
            //   })
            // }
            // this.wdPerctList[i].infos = infos

            // that.echartInfo(i + 'Z' + that.ecType)
          }
          
          console.log(this.wdPerctList)
          // console.log(ecList)
          for (let i in this.wdPerctList) {
            this['myChartZhu' + i] = null
          }
          this.ecList = this.wdPerctList
          setTimeout(() => {
            for (let i in this.ecList) {
              console.log(this.ecList[i])
              this.echartInfo('myChartZhu' + i, this.ecList[i])
            }
            this.initChart()
          }, 0);
          // let count = 0
          // for (let i in wdArr) {
          //   count = count + wdArr[i].info.length
          // }
          // console.log(count / 5)
          // return
          // if (selectedData[i].DimRisk.depressionPerct <= selectedData[i].depPerct && selectedData[i].DimRisk.anxietyPerct <= selectedData[i].anxietyPerct && selectedData[i].DimRisk.forcedPerct <= selectedData[i].forcedPerct) {
          //   sstr += '抑郁风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.depressionPerct1 + '</span>，'
          //   sstr += '焦虑风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.anxietyPerct1 + '</span>，'
          //   sstr += '强迫风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.forcedPerct1 + '</span>，'
          //   sstr += '预警率均低于全国中小学生水平（<span style="color: #00a5ff;">抑郁' + selectedData[i].depPerct1 + '，焦虑' + selectedData[i].anxietyPerct1 + '，强迫' + selectedData[i].forcedPerct1 + '</span>），老师正常开展心理健康教育工作即可，如定期进行心理讲座、团体辅导等。'
          // } else {
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.depressionPerct1 + '</span>，'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.anxietyPerct1 + '</span>，'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.forcedPerct1 + '</span>，'
          //   }
          //   sstr += '预警率高于全国中小学生水平（<span style="color: #00a5ff;">'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁' + selectedData[i].depPerct1 + '，'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑' + selectedData[i].anxietyPerct1 + '，'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫' + selectedData[i].forcedPerct1 + '，'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('，'));
          //   sstr += '</span>），建议老师定期组织'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁、'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑、'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫、'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('、'));
          //   sstr += '相关的主题讲座，增加学生对'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁、'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑、'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫、'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('、'));
          //   sstr += '的正确认识，掌握缓解'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁、'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑、'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫、'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('、'));
          //   sstr += '科学方法。'
          // }
          // // selectedData[i].depPerct1 = this.perctInfo(selectedData[i].depPerct) + "%";
          // // selectedData[i].anxietyPerct1 = this.perctInfo(selectedData[i].anxietyPerct) + "%";
          // // selectedData[i].forcedPerct1 = this.perctInfo(selectedData[i].forcedPerct) + "%";

          // // selectedData[i].EvaResult.evaNumPerct = String(selectedData[i].EvaResult.evaNumPerct.toFixed(4))
          // // selectedData[i].EvaResult.riskPerct = this.perctInfo(selectedData[i].EvaResult.riskPerct) + "%";

          // selectedData[i].DimRisk.depressionPerct1 = this.perctInfo(selectedData[i].DimRisk.depressionPerct) + "%";
          // selectedData[i].DimRisk.depressionInfo.normalPerct = this.perctInfo(selectedData[i].DimRisk.depressionInfo.normalPerct) + "%";
          // selectedData[i].DimRisk.depressionInfo.lightPerct = this.perctInfo(selectedData[i].DimRisk.depressionInfo.lightPerct) + "%";
          // selectedData[i].DimRisk.depressionInfo.mediumPerct = this.perctInfo(selectedData[i].DimRisk.depressionInfo.mediumPerct) + "%";
          // selectedData[i].DimRisk.depressionInfo.severePerct = this.perctInfo(selectedData[i].DimRisk.depressionInfo.severePerct) + "%";
          // selectedData[i].DimRisk.anxietyPerct1 = this.perctInfo(selectedData[i].DimRisk.anxietyPerct) + "%";
          // selectedData[i].DimRisk.anxietyInfo.normalPerct = this.perctInfo(selectedData[i].DimRisk.anxietyInfo.normalPerct) + "%";
          // selectedData[i].DimRisk.anxietyInfo.lightPerct = this.perctInfo(selectedData[i].DimRisk.anxietyInfo.lightPerct) + "%";
          // selectedData[i].DimRisk.anxietyInfo.mediumPerct = this.perctInfo(selectedData[i].DimRisk.anxietyInfo.mediumPerct) + "%";
          // selectedData[i].DimRisk.anxietyInfo.severePerct = this.perctInfo(selectedData[i].DimRisk.anxietyInfo.severePerct) + "%";
          // selectedData[i].DimRisk.forcedPerct1 = this.perctInfo(selectedData[i].DimRisk.forcedPerct) + "%";
          // selectedData[i].DimRisk.forcedInfo.normalPerct = this.perctInfo(selectedData[i].DimRisk.forcedInfo.normalPerct) + "%";
          // selectedData[i].DimRisk.forcedInfo.lightPerct = this.perctInfo(selectedData[i].DimRisk.forcedInfo.lightPerct) + "%";
          // selectedData[i].DimRisk.forcedInfo.mediumPerct = this.perctInfo(selectedData[i].DimRisk.forcedInfo.mediumPerct) + "%";
          // selectedData[i].DimRisk.forcedInfo.severePerct = this.perctInfo(selectedData[i].DimRisk.forcedInfo.severePerct) + "%";
          // var sstr = '';
          // sstr += '系统发现，本校'
          // if (selectedData[i].DimRisk.depressionPerct <= selectedData[i].depPerct && selectedData[i].DimRisk.anxietyPerct <= selectedData[i].anxietyPerct && selectedData[i].DimRisk.forcedPerct <= selectedData[i].forcedPerct) {
          //   sstr += '抑郁风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.depressionPerct1 + '</span>，'
          //   sstr += '焦虑风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.anxietyPerct1 + '</span>，'
          //   sstr += '强迫风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.forcedPerct1 + '</span>，'
          //   sstr += '预警率均低于全国中小学生水平（<span style="color: #00a5ff;">抑郁' + selectedData[i].depPerct1 + '，焦虑' + selectedData[i].anxietyPerct1 + '，强迫' + selectedData[i].forcedPerct1 + '</span>），老师正常开展心理健康教育工作即可，如定期进行心理讲座、团体辅导等。'
          // } else {
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.depressionPerct1 + '</span>，'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.anxietyPerct1 + '</span>，'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫风险占比<span style="color: #00a5ff;">' + selectedData[i].DimRisk.forcedPerct1 + '</span>，'
          //   }
          //   sstr += '预警率高于全国中小学生水平（<span style="color: #00a5ff;">'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁' + selectedData[i].depPerct1 + '，'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑' + selectedData[i].anxietyPerct1 + '，'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫' + selectedData[i].forcedPerct1 + '，'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('，'));
          //   sstr += '</span>），建议老师定期组织'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁、'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑、'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫、'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('、'));
          //   sstr += '相关的主题讲座，增加学生对'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁、'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑、'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫、'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('、'));
          //   sstr += '的正确认识，掌握缓解'
          //   if (selectedData[i].DimRisk.depressionPerct > selectedData[i].depPerct) {
          //     sstr += '抑郁、'
          //   }
          //   if (selectedData[i].DimRisk.anxietyPerct > selectedData[i].anxietyPerct) {
          //     sstr += '焦虑、'
          //   }
          //   if (selectedData[i].DimRisk.forcedPerct > selectedData[i].forcedPerct) {
          //     sstr += '强迫、'
          //   }
          //   sstr = sstr.substring(0, sstr.lastIndexOf('、'));
          //   sstr += '科学方法。'
          // }
          // this.SuggestionStr = sstr

          // this.EvaResult = selectedData[i].EvaResult
          // this.DimRisk = selectedData[i].DimRisk
          // this.standard = selectedData[i].standard
          // this.depressionInfo = selectedData[i].DimRisk.depressionInfo
          // this.anxietyInfo = selectedData[i].DimRisk.anxietyInfo
          // this.forcedInfo = selectedData[i].DimRisk.forcedInfo
          // this.phaseList = selectedData[i].EvaResult.phaseInfo
          // let pList = selectedData[i].EvaResult.phaseInfo
          // let gList = []
          // for (let i in pList) {
          //   let info = pList[i].gradeInfo
          //   for (let j in info) {
          //     console.log(info[j])
          //     info[j].depressionPerct = this.perctInfo(info[j].depressionPerct) + "%";
          //     info[j].anxietyPerct = this.perctInfo(info[j].anxietyPerct) + "%";
          //     info[j].forcedPerct = this.perctInfo(info[j].forcedPerct) + "%";
          //     info[j].riskPerct = this.perctInfo(info[j].riskPerct) + "%";
          //     gList.push(info[j])
          //   }
          // }
          // let risk11 = []
          // let risk12 = []
          // if (this.rlen0 < 7) {
          //   risk11 = gList.slice(0, 6)
          // } else {
          //   risk11 = gList.slice(0, 6)
          //   let rlen12 = Math.ceil((gList.length - 6) / 33);
          //   for (let j = 0; j < rlen12; j++) {
          //     risk12.push(gList.slice(6 + 33 * j, 6 + 33 * (Number(j) + 1)));
          //   }
          // }
          // this.gradeList = risk11
          // this.gradeList1 = risk12
          // 等待每一个转为pdf
          
          console.log(htmlToZip)
          const p = await htmlToZip.getPdfs(
            this.$refs.sprintSchoolPdf,
            selectedData[i].name
          );
          promises.push(p);
        }
        // this.loading.close();
        // 等到所有的promise执行完成依次压缩到zip中
        Promise.all(promises)
          .then(async pdfs => {
            console.log(pdfs);
            for (let i = 0; i < pdfs.length; i++) {
              const { PDF, name } = pdfs[i];
              // 如果只是导出一个pdf，则导出pdf格式
              if (pdfs.length === 1) {
                PDF.save(`${name}的个人综合报告-${new Date().getTime()}.pdf`);
                setTimeout(() => {
                  this.loading.close();
                }, 1000);
                // this.loading.setText('正在请求数据')
              } else {
                // 否则添加到压缩包里面
                await zip.file(
                  `${name}-${new Date().getTime()}.pdf`,
                  PDF.output("blob")
                );
              }
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loading.close();
            }, 2000);
            // this.loading.setText('正在请求数据')
          });
      } catch (e) {
        setTimeout(() => {
          this.loading.close();
        }, 2000);
        // this.loading.setText('正在请求数据')
        throw new Error(e);
      }
    },
    toHHmmss(data) {
      var s;
      var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.round((data % (1000 * 60)) / 1000);
      if (hours < 1) {
        s =
        (minutes < 10 ? "0" + minutes : minutes) +
        "分" +
        (seconds < 10 ? "0" + seconds : seconds) +
        "秒"
      } else {
        s =
          (hours < 10 ? "0" + hours : hours) +
          "时" +
          (minutes < 10 ? "0" + minutes : minutes) +
          "分" +
          (seconds < 10 ? "0" + seconds : seconds) +
          "秒"
      }
      return s;
    },
    formTimes(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      // + ' ' + h + ':' + minute + ':' + second
      let timeN =
        y +
        "年" +
        m +
        "月" +
        d +
        "日 " +
        h +
        "时" +
        minute +
        "分" +
        second +
        "秒";
      return timeN;
    }
  }
};
</script>

<style lang="less" scoped>
  .myChartZhu {
    // margin: 0 auto;
    width: 720px;
    height: 195px;
  }
  .table-classs {
    display: grid;
    background-color: #fff;
    width: 1191px;
    box-sizing: border-box;
    transform: scale(0.8);
    transform-origin: 0 0;
    // position: absolute;
    // top: 0;
    // left: 0;
    // z-index: -1;

    .name-style {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  .table-style {
    // border-collapse: collapse;
    // width: 1190.71px;
    // height: 1684px;
    // text-align: center;
    // position: relative;
    // td,
    // th {
    //   padding: 10px;
    //   font-size: 15px;
    //   border: 1px solid black;
    // }
    // .td-bg {
    //   background: #ccc;
    // }
    border-collapse: collapse;
    // width: 1190.71px;
    width: 1190px;
    height: 1684px;
    text-align: center;
    position: relative;
    background: #ffffff !important;
    overflow: hidden;
    // border:1px solid #ccc;

    .table-border{
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 1068px;
      height: 1560px;
      border: 4px solid #333E75;
      // z-index: -1;
      .gp_all_tips{
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 30px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24px;
        color: #2A3487;
        line-height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width:26px;
          height: 24px;
          margin-right:6px;
        }
      }
    }
    .shui_bg{
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 472px;
      height: 356px;
      // z-index: -1;
    }
    .shui_bg1{
      position: absolute;
      margin: auto;
      left: -450px;
      // right: 0;
      top: 100px;
      // bottom: 0;
      width: 2048px;
      height: 1546px;
      // z-index: -1;
    }
    td,
    th {
      padding: 10px;
      font-size: 15px;
      border: 1px solid black;
    }
    .td-bg {
      background: #ccc;
    }
    .g1_top{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 170px;
      img{
        width: 136px;
        height: auto;
        margin-right: 20px;
      }
      span{
        font-size: 72px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #333E75;
        line-height: 1;
      }
    }
    .g1_top1{
      text-align: center;
      font-size: 52px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #333E75;
      line-height: 1;
      margin: 50px auto;
    }
    .g1_top2{
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      bottom: 200px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      div{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28px;
        color: #333E75;
        line-height: 40px;
        margin: 16px auto;
        width: 520px;
        text-align: left;
        display: flex;
        span:nth-child(1){
          width: 144px;
          // width: 100% !important;
          // display: inline-block;
        }
        span:nth-child(2){
          flex: 1
          // width: 100% !important;
          // display: inline-block;
        }

      }
      div:nth-child(2n+1) {
        width: 320px;
        display: flex;
      }
    }
  }
  .group_01{
    .gp2_top{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 62px 0 30px 0;
      img {
        width: 60px;
        height: 63px;
      }
      .gp2_t_txt {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 36px;
        color: #2A3487;
        line-height: 50px;
        margin: 0 14px;
      }
      .gp2_t_eng {
        font-size: 30px;
        font-family: Montserrat;
        font-weight: bold;
        color: #7986a9;
      }
    }
    .gp_echart{
      width: 100%;
      height: 600px;
      padding: 30px 0;
      // background: #00a5ff;
      position: relative;
      // margin-bottom: -10px;
      .gp_ect_3d{
        margin: -40px auto 0;
        width: 980px;
        height: 560px;
        // background: #5e6c87;
        .myChartPie{
          width: 980px;
          height: 560px;
        }
      }
      .gp_ect_2d{
        position: absolute;
        right: 20px;
        bottom: -60px;
        width: 200px;
        height: 200px;
        // background: #2A3487;
        .myChartYes{
          width: 200px;
          height: 200px;
        }
      }
    }

    .gp_title{
      padding: 0 40px;
      .gp_head{
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        font-size: 28px;
        color: #333E75;
        line-height: 52px;
        text-align: left;
      }
      .gp_bird_box{
        display: flex;
        flex-wrap: wrap;
        .gp_bird{
          width: 420px;
          height: auto;
          margin: 0px 35px 0px;
          img{
            display: block;
            width: 420px;
            height: auto;
          }
          div{
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 400;
            font-size: 24px;
            color: #333E75;
            line-height: 32px;
            height: 64px;
            margin: 15px 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      
      .gp_txt{
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        font-size: 24px;
        color: #333E75;
        line-height: 52px;
        text-align: left;
        word-break: break-all;
      }
      .gp_exl{
        width: 100%;
        border: 1px solid #A6ACCC;
        border-bottom: 0;
        border-right: 0;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        .gp_con {
          width: 100%;
          border: 1px solid #A6ACCC;
          border-top: 0;
          border-left: 0;
          height: 60px;
          display: flex;
          div{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 16px;
            color: #333E75;
            height: 100%;
            line-height: 1.2;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #A6ACCC;
            padding: 0 5px;
          }
          div:nth-child(1) {
            width: 60px;
          }
          div:nth-child(2) {
            width: 180px;
          }
          div:nth-child(3) {
            width: 100px;
          }
          div:nth-child(4) {
            width: 100px;
          }
          div:nth-child(5) {
            width: 120px;
          }
          div:nth-child(6) {
            width: 100px;
          }
          div:nth-child(7) {
            width: 100px;
          }
          div:nth-child(8) {
            flex: 1;
            border: 0;
            overflow: hidden;
          }
        }
        .gp_con1{
          div{
            font-weight: 600;
          }
        }
      }
      .gp_head1{
        padding: 5px 0 5px;
        font-size: 19px;
        color: #333E75;
        line-height: 28px;
      }
      .gp_h_box{
        display: flex;
        .gp_h_bt{
          display: flex;
          flex: 1;
          padding:10px 0;
          img{
            width: 30px;
            height: 30px;
            margin: 5px 10px 0 0;
          }
          .gp_h_txt{
            flex: 1;
            text-align: left;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 400;
            font-size: 22px;
            color: #333E75;
            line-height: 36px;
            
          }
        }
      }
    }
  }

// .group_01 {
//   width: 1190.71px;
//   height: 1684px;
// }
.group_p_01 {
  position: absolute;
  top: 510px;
  left: 364px;
  width: 570px;
  height: 74px;
  line-height: 74px;
  text-align: center;
  font-size: 40px;
  font-family: zihun100hao-fangfangxianfengti;
  font-weight: 600;
  color: #609bff;
}
.group_tips {
  position: absolute;
  margin: auto;
  bottom: 150px;
  left: 75px;
  right: 0;
  display: flex;
  justify-content: center;
  img {
    width: 22px;
    // height: 26px;
    margin-right: 10px;
  }
  span {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ed6bb5;
    line-height: 27px;
  }
}
.group_02 {
  background: url(../../assets/images/part/g_02.png) no-repeat center;
  background-size: 100% 100%;
  .gp2_top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 88px 0 45px 0;
    img {
      width: 132px;
      height: 127px;
    }
    .gp2_t_txt {
      font-size: 32px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #394b6d;
      margin: 0 14px;
    }
    .gp2_t_eng {
      font-size: 30px;
      font-family: Montserrat;
      font-weight: bold;
      color: #7986a9;
    }
  }
  .gp2_main {
    margin: 0 auto;
    width: 1060px;
    height: 1365px;
    padding: 44px 24px;
    background: #ffffff;
    box-shadow: 0px 13px 43px 0px rgba(76, 100, 132, 0.1);
    .gp2_li {
      margin-bottom: 18px;
      .gp2l_head {
        display: flex;
        align-items: center;
        img {
          width: 34px;
          height: 37px;
        }
        span {
          margin-left: 10px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #394b6d;
        }
      }
      .gp2l_body {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 18px;
        img {
          margin-top: 10px;
          margin-left: 25px;
          width: 4px;
          height: 18px;
          // background: linear-gradient(180deg, #babfff, #7279ff);
        }
        .bt_tips {
          width: 8px;
          height: 8px;
          margin-top: 15px;
        }
        .gp2lb_txt {
          line-height: 30px;
          margin-left: 15px;
          font-size: 20px;
          line-height: 38px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #394b6d;
          text-align: left;
          .wran_col0 {
            color: #5dc4f5 !important;
          }
          .wran_col1 {
            color: #6774f6 !important;
          }
          .wran_col2 {
            color: #ca7cf8 !important;
          }
          .wran_col3 {
            color: #ed6bb5 !important;
          }
        }
      }
    }
    .gp2_li:last-child {
      margin-bottom: 0;
    }
    .gp_warn {
      margin: 24px 30px 10px;
      ul {
        border: 1px solid #cfe1f9;
        li {
          display: flex;
          height: 68px;
          line-height: 68px;
          div {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #607490;
            flex: 1;
            // width: 120px;
            border-right: 1px solid #cfe1f9;
            border-bottom: 1px solid #cfe1f9;
          }
          // div:nth-child(1),div:nth-child(4) {
          //   width: 111px;
          // }
          // div:nth-child(2),div:nth-child(3),div:nth-child(5) {
          //   width: 130px;
          // }
          div:last-child {
            border-right: 0;
          }
          .wran_col0 {
            color: #5dc4f5 !important;
          }
          .wran_col1 {
            color: #6774f6 !important;
          }
          .wran_col2 {
            color: #ca7cf8 !important;
          }
          .wran_col3 {
            color: #ed6bb5 !important;
          }
        }
        li:last-child {
          div {
            border-bottom: 0;
          }
        }
        li.gp_w_th {
          div {
            background: #f1f9fe;
          }
          div:nth-child(6), div:nth-child(7),  div:nth-child(8) {
            line-height: 28px;
            padding-top: 6px;
          }
        }
        li.gp_w_th1,
        li.gp_w_tr1 {
          div {
            padding: 0 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div:nth-child(1) {
            flex: none;
            width: 90px;
          }
          div:nth-child(2) {
            flex: none;
            width: 130px;
          }
          // div:nth-child(3){
          //  flex: none;
          //   width: 220px;
          // }
          div:nth-child(3) {
            flex: none;
            width: 140px;
          }
          div:nth-child(6) {
            flex: none;
            width: 140px;
          }
        }
        li.gp_w_tr1 {
          div {
            font-size: 16px;
            line-height: 45px;
          }
        }
        li.gp_block {
          display: flex;
        }
        li.gp_none {
          display: none;
        }
        li.gp_w_tr {
          // height: 45px;
          height: 45px;
          line-height: 45px;
        }
        li.gp_w_tr2 {
          div {
            font-size: 14px;
          }
        }
        li.gp_w_td {
          height: auto;
          line-height: 135px;
          div {
            span {
              height: 45px;
              line-height: 45px;
              display: block;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #848da0;
              border-bottom: 1px solid #cfe1f9;
              font-size: 16px;
            }
            span:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
  .gp2_main1 {
    margin: 65px auto;
    height: 1554px;
  }
  .gp2_main2 {
    margin: 50px auto;
    height: 1584px;
  }
  .mb_tips {
    width: 1078px;
    margin: 20px auto;
    text-align: left;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(119, 134, 172, 0.6);
  }
}
.group_03 {
  background: linear-gradient(
    214deg,
    rgba(232, 220, 252, 0.3),
    rgba(252, 243, 254, 0.3)
  );
  .gp3_top {
    padding: 0 20px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #394b6d;
    text-align: left;
    margin-bottom: 34px;
    .wran_col0 {
      color: #5dc4f5 !important;
    }
    .wran_col1 {
      color: #6774f6 !important;
    }
    .wran_col2 {
      color: #ca7cf8 !important;
    }
    .wran_col3 {
      color: #ed6bb5 !important;
    }
  }
  .gp3_top1 {
    // display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-height: 56px;
  }
  .gp2_main {
    padding: 30px 30px;
    .gp_tipz {
      font-size: 16px;
      padding: 0 20px;
      text-align: left;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(119, 134, 172, 0.6);
      line-height: 26px;
    }
    .gp_warn {
      margin: 24px 30px 10px;
      ul {
        border: 1px solid #cfe1f9;
        li {
          display: flex;
          height: 50px;
          line-height: 50px;
          div {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #607490;
            flex: 1;
            border-right: 1px solid #cfe1f9;
            border-bottom: 1px solid #cfe1f9;
          }
          div:nth-child(5) {
            flex: 1;
          }
          div:last-child {
            border-right: 0;
          }
          .wran_col0 {
            color: #5dc4f5 !important;
          }
          .wran_col1 {
            color: #6774f6 !important;
          }
          .wran_col2 {
            color: #ca7cf8 !important;
          }
          .wran_col3 {
            color: #ed6bb5 !important;
          }
        }
        li:last-child {
          div {
            border-bottom: 0;
          }
        }
        li.gp_w_th {
          div {
            background: #f1f9fe;
          }
        }
        li.gp_w_th1,
        li.gp_w_tr1 {
          div {
            padding: 0 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div:nth-child(1) {
            flex: none;
            width: 90px;
          }
          div:nth-child(2) {
            flex: none;
            width: 130px;
          }
          // div:nth-child(3){
          //  flex: none;
          //   width: 220px;
          // }
          div:nth-child(3) {
            flex: none;
            width: 140px;
          }
          div:nth-child(6) {
            flex: none;
            width: 140px;
          }
        }
        li.gp_w_tr1 {
          div {
            font-size: 16px;
            line-height: 45px;
          }
        }
        li.gp_block {
          display: flex;
        }
        li.gp_none {
          display: none;
        }
        li.gp_w_tr {
          // height: 45px;
          height: 45px;
          line-height: 45px;
        }
        li.gp_w_tr2 {
          div {
            font-size: 14px;
          }
        }
        li.gp_w_td {
          height: auto;
          line-height: 135px;
          div {
            span {
              height: 45px;
              line-height: 45px;
              display: block;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #848da0;
              border-bottom: 1px solid #cfe1f9;
              font-size: 16px;
            }
            span:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
}
.group_04 {
  .gp4_main {
    padding-top: 50px;
    margin-top: 62px;
    height: 1560px;
    .gp2_li {
      margin-bottom: 30px;
    }
  }
}
.group_05 {
  background: #ffffff;
  .gp5_box {
    width: 1060px;
    padding: 42px 40px 42px 28px;
    margin: 0 auto 0;
    background: linear-gradient(214deg, #effeff, #f3f6fe);
    ul {
      li {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
        .gp5_index {
          display: inline-block;
          margin-top: 6px;
          margin-right: 10px;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #ffffff;
          width: 24px;
          height: 24px;
          background: linear-gradient(177deg, #5dbcf9, #82ebf8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        p {
          flex: 1;
          line-height: 36px;
          text-align: left;
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #394b6d;
          span {
            background: none;
            color: #00a5ff;
          }
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  .gp5_botm {
    margin: auto;
    width: 1060px;
    height: 4px;
    background: linear-gradient(-90deg, #66e7fb 0%, #4db4eb 100%);
  }
}
.group_06 {
  background: none;
  border: 1px solid #ccc;
  .gp2_top {
    padding-bottom: 32px;
  }
  .gp2_main {
    padding-top: 0;
    padding: 0;
    box-shadow: none;
    background: transparent;
    label {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #6774f6;
    }
    .gp_warn {
      margin: 24px 30px 10px;
      ul {
        border: 1px solid #cfe1f9;
        li {
          display: flex;
          height: 100px;
          line-height: 50px;
        }
        li.gp_w_th2, li.gp_w_tr22{
          div:first-child {
            line-height: 100px;
          }
          div {
            p:last-child{
              display: flex;
              justify-content: space-around;
              border-top: 1px solid #cfe1f9;
              span{
                flex: 1;
              }
              span:first-child{
                border-right: 1px solid #cfe1f9;
              }
            }
          }
        }
        li.gp_w_tr22{
          div:first-child {
            line-height: 45px;
          }
          div {
            p:last-child{
              border-top: 0px solid #cfe1f9;
            }
          }
        }
        li.gp_w_tr1 {
          div {
            font-size: 16px;
            line-height: 45px;
          }
        }
        li.gp_block {
          display: flex;
        }
        li.gp_none {
          display: none;
        }
        li.gp_w_tr {
          // height: 45px;
          height: 45px;
          line-height: 45px;
        }
        li.gp_w_tr2 {
          div {
            font-size: 14px;
          }
        }
        li.gp_w_td {
          height: auto;
          line-height: 135px;
          div {
            span {
              height: 45px;
              line-height: 45px;
              display: block;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #848da0;
              border-bottom: 1px solid #cfe1f9;
              font-size: 16px;
            }
            span:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
}
.gp2lb_chart {
  display: flex;
  justify-content: space-around;
  padding: 0 80px 0;
}
.myChartgBox {
  position: relative;
  margin: 20px auto 40px;
  .myChartgTips {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    p {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #5e6c87;
    }
    p:last-child {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #6774f6;
    }
  }
  .myChartgLab {
    display: flex;
    justify-content: center;
    .mcl_span {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #7e87a1;
      margin: 0 14px;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: linear-gradient(90deg, #babfff, #7279ff);
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    .mcl_span1 {
      span {
        background: linear-gradient(91deg, #4dfbff, #00ccff);
      }
    }
  }
}
.myChartg {
  display: flex;
  justify-content: center;
  width: 202px;
  height: 202px;
  margin: 0 auto 2px;
}
.myCharts00 {
  display: flex;
  justify-content: center;
  width: 900px;
  height: 300px;
  margin: -40px auto 0;
}
.myCharts10 {
  display: flex;
  justify-content: center;
  width: 900px;
  height: 300px;
  margin: -40px auto 0;
}
.myCharts11 {
  display: flex;
  justify-content: center;
  width: 900px;
  height: 280px;
  margin: -40px auto 0;
}
.myChartgLab1 {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  .mcl_span {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #7e87a1;
    margin: 0 14px;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: linear-gradient(2deg, #b9c3fa, #6d89f7);
      border-radius: 50%;
      margin-right: 8px;
    }
  }
  .mcl_span1 {
    span {
      background: linear-gradient(2deg, #ffc5f0, #ff77c3);
    }
  }
  .mcl_span2 {
    font-size: 20px;
    color: #394b6d;
  }
}
</style>
