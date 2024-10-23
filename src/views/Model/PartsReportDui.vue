<template>
    <div class="table-classd" ref="sprintSchoolPdf">
      <div class="table-style">
        <img class="shui_bg1" src="../../assets/images/report/shui_big.png" alt="" />
        <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" />
        <div class="table-border">
          <div class="g1_top">
            <span>AI心世界</span>
          </div>
          <div class="g1_top1">
            团体对比测评报告
          </div>
          <div class="g1_top3">
            <div>{{ gList.departmentNameA }}</div>
            <div>&</div>
            <div>{{ gList.departmentNameB }}</div>
          </div>
          <div class="g1_top2">
            <div>
              测评对象：<span>{{gList.departmentNameA}}测评人员&{{gList.departmentNameB}}测评人员</span>
            </div>
            <div>
              测评时间：<span>{{startDate + '—' + endDate}}</span>
            </div>
            <div>
              测评方式：{{'AI心世界'}}
            </div>
          </div>
        </div>
        <!-- <div class="group_tips">
          <img src="../../assets/images/part/tip_group.png" alt="" />
          <span>报告结果仅供参考，不作为学生选拨或诊断依据。</span>
        </div> -->
      </div>
      <div class="table-style group_01">
        <!-- <img class="shui_bg1" src="../../assets/images/report/shui_big.png" alt="" />
        <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" /> -->
  
        <div class="table-border">
          <div class="gp_all_tips">
            <img src="../../assets/images/part/tipss.png" alt="" />
            温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
          </div>
          <!-- <div class="gp2_top">
            <img
              style="width:62px;height:66px;"
              src="../../assets/images/part/Documents.png"
              alt=""
            />
            <span class="gp2_t_txt">总体测评情况</span>
          </div> -->
          <div class="gp_echart_box">
            <div class="gp_echart">
              <div class="gp_ec_txt">{{gList.departmentNameA}}风险情况</div>
              <div class="gp_ect_3d">
                <div class="myChartPie" ref="myChartPieA" id="myChartPieA" ></div>
                <div class="center_pie">
                  <div class="c_pie_li" v-for="item in wdPerctListA">
                    <div class="c_th_txt">
                      <span class="c_pie_th c_th0" :style="{'background': item.color3}"></span>
                      {{ item.name }}
                    </div>
                    <div class="c_th_p">
                      <span class="c_pie_td c_thp0">
                        {{ item.perct1 }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gp_ect_2d">
                <div class="myChartYes" ref="myChartYesA" id="myChartYesA"></div>
              </div>

            </div>
            <div class="gp_echart" style="left: 200px;">
              <div class="gp_ec_txt">{{gList.departmentNameB}}风险情况</div>
              <div class="gp_ect_3d">
                <div class="myChartPie" ref="myChartPieB" id="myChartPieB"></div>
                <div class="center_pie">
                  <div class="c_pie_li" v-for="item in wdPerctListB">
                    <div class="c_th_txt">
                      <span class="c_pie_th c_th0" :style="{'background': item.color3}"></span>
                      {{ item.name }}
                    </div>
                    <div class="c_th_p">
                      <span class="c_pie_td c_thp0">
                        {{ item.perct1 }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gp_ect_2d">
                <div class="myChartYes" ref="myChartYesB" id="myChartYesB"></div>
              </div>
            </div>
          </div>

          <div class="gp_titles">
            <div class="gp_head" style="margin-bottom: 20px;margin-top: 10px;">测评情况对比</div>
            <div class="gp_exl">
              <div class="gp_con gp_con1">
                <div>团队名称</div>
                <div>总人数</div>
                <div>实测人数</div>
                <div>实测占比</div>
                <div>风险人数</div>
                <div>风险占比</div>
              </div>
              <div style="width: 100%;" v-for="(item, index) in GroupStatistic" :key="index">
                <div class="gp_con">
                  <div>{{ item.departmentName }}</div>
                  <div>{{ item.totalNum }}</div>
                  <div>{{ item.evaNum }}</div>
                  <div>{{ item.evaPerct1 }}</div>
                  <div>{{ item.riskNum }}</div>
                  <div>{{ item.riskPerct1 }}</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div class="gp_con">
                  <div>合计</div>
                  <div>{{ totalNum }}</div>
                  <div>{{ evaNum }}</div>
                  <div>{{ evaPerct1 }}</div>
                  <div>{{ riskNum }}</div>
                  <div>{{ riskPerct1 }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="gp_titles" style="margin-top: 40px;" v-if="warningListsDui && warningListsDui.length > 0 && duiTab < 4">
            <div class="gp_exl">
              <div class="gp_con gp_con1">
                <div style="flex: 1;">序号</div>
                <div>团队名称</div>
                <div>姓名</div>
                <div>登录账号</div>
                <div style="flex: 2.6;">预警类型</div>
                <div>测试时间</div>
              </div>
              <div style="width: 100%;" v-for="(item, index) in warningListsDui.slice(0,9)" :key="index">
                <div class="gp_con">
                  <div style="flex: 1;">{{ item.id }}</div>
                  <div>{{ item.depName }}</div>
                  <div>{{ item.name }}</div>
                  <div>{{ item.passport }}</div>
                  <div style="flex: 2.6;">{{ item.levelStr}}</div>
                  <div>{{ item.datetime }}</div>
                </div>
              </div>
            </div>
          </div>
        <!--           
          <div class="gp_title">
            <div class="gp_head">测评人数</div>
            <div class="gp_txt">
              {{cpHead}}
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
          </div> -->
          <div class="gp_title" v-if="duiTab == 1">
            <div class="gp_head">指导建议：</div>
            <div class="gp_txt">
              {{ suggestionDui }}
            </div>
            <div class="gp_txt">
              {{ riskDui }}
            </div>
          </div>
          
        </div>
      </div>
      <div class="table-style group_01" v-if="duiTab == 2">
        <div class="table-border">
          <div class="gp_all_tips">
            <img src="../../assets/images/part/tipss.png" alt="" />
            温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
          </div>
          <div>
            <div>
              <div class="gp_title" style="margin-top:30px">
                <div class="gp_head">指导建议：</div>
                <div class="gp_txt">
                  {{ suggestionDui }}
                </div>
                <div class="gp_txt">
                  {{ riskDui }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="table-style group_01"  v-for="item in warnListDui">
        <div class="table-border">
          <div class="gp_all_tips">
            <img src="../../assets/images/part/tipss.png" alt="" />
            温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
          </div>
          <div>
            <div>
              
              <div class="gp_title" style="padding: 40px 40px 20px;">
                <div class="gp_exl">
                  <div class="gp_con gp_con1">
                    <div style="flex: 1;">序号</div>
                    <div>团队名称</div>
                    <div>姓名</div>
                    <div>登录账号</div>
                    <div style="flex: 2.6;">预警类型</div>
                    <div>测试时间</div>
                  </div>
                  <div style="width: 100%;" v-for="itemw in item" :key="itemw.id">
                    <div class="gp_con">
                      <div style="flex: 1;">{{ itemw.id }}</div>
                      <div>{{ itemw.depName }}</div>
                      <div>{{ itemw.name }}</div>
                      <div>{{ itemw.passport }}</div>
                      <div style="flex: 2.6;">{{ itemw.levelStr}}</div>
                      <div>{{ itemw.datetime }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gp_title" v-if="duiTab == 3 && suggestFlag && item.length < 18">
                <div class="gp_head">指导建议：</div>
                <div class="gp_txt">
                  {{ suggestionDui }}
                </div>
                <div class="gp_txt">
                  {{ riskDui }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-style group_01" v-if="duiTab == 3 && !suggestFlag">
        <div class="table-border">
          <div class="gp_all_tips">
            <img src="../../assets/images/part/tipss.png" alt="" />
            温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
          </div>
          <div>
            <div>
              <div class="gp_title" style="margin-top:30px">
                <div class="gp_head">指导建议：</div>
                <div class="gp_txt">
                  {{ suggestionDui }}
                </div>
                <div class="gp_txt">
                  {{ riskDui }}
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
          <!-- {{ ecList }} -->
          <div v-for="(item, index) in ecList" :key="index">
            <div class="gp_title">
              <div class="gp_head gp_head1">{{ item.name1 }}</div>
              <div class="gp_h_box">
                <div class="myChartZhu" :ref="'myChartZhu'+ index" :id="'myChartZhu' + index"></div>
                <div class="gp_h_bt">
                  <!-- <img
                    style="width:30px;height:26px;"
                    src="../../assets/images/part/Graphs.png"
                    alt=""
                  /> -->
                  <div class="gp_c_box" style="margin-bottom: 14px">
                    <div class="gp_h_txt">
                      <!-- 在该测评时间内，受测者{{item.name}}轻度风险{{item.level1}}次，中度风险{{item.level2}}次，重度风险{{item.level3}}次。 -->
                      <div class="gp_c_bt1">
                        <div class="gp_c1"></div>
                        {{item.nameA}}风险人数为{{item.num}}人（{{item.Pct}}）
                      </div>
                      <div class="gp_c_bt2">
                        <div>轻度风险{{item.infos.a}}人</div>
                        <div>中度风险{{item.infos.b}}人</div>
                        <div>重度风险{{item.infos.c}}人</div>
                      </div>
                    </div>
                  </div>
                  <div class="gp_c_box">
                    <div class="gp_h_txt">
                      <!-- 在该测评时间内，受测者{{item.name}}轻度风险{{item.level1}}次，中度风险{{item.level2}}次，重度风险{{item.level3}}次。 -->
                      <div class="gp_c_bt1">
                        <div class="gp_c1"></div>
                        {{item.nameB}}风险人数为{{item.numB}}人（{{item.PctB}}）
                      </div>
                      <div class="gp_c_bt2">
                        <div>轻度风险{{item.infos.a1}}人</div>
                        <div>中度风险{{item.infos.b1}}人</div>
                        <div>重度风险{{item.infos.c1}}人</div>
                      </div>
                    </div>
                  </div>
                  
                  
                </div>
                <!-- <div class="gp_h_bt" v-else>
                  <img
                    style="width:30px;height:26px;"
                    src="../../assets/images/part/Graphs.png"
                    alt=""
                  />
                  <div class="gp_h_txt">
                    在该测评时间内，受测者{{item.name}}无风险。
                  </div>
                </div> -->
              </div>
              
            </div>

          </div>
        </div>
      </div>

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
        warningLists: [],
        warnList: [],
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
  
        organizationName: '',
        depName: '',
        startDate: '',
        endDate: '',
        riskPage: 7,
        // ecCount: 0,
        wdPerctList: [],
        cpHead: '',
        cpList: [],
        cpList1: [],
        cpList2: [],
        cpList3: [],
        partsStr1: '',
        partsStr11: '',
        partsStr12: '',
        partsStr13: '',
        partsStr2: '',
        partsStr3: '',
        partsStr4: '',
        partsStr5: '',
        ecList: [],
        myChartZhu: "",
        myChartYesA: '',
        myChartYesB: '',
        riskPerct: '',
        riskPerct1: '',
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
        option: {},
        ecList: [],
        GroupStatistic: [],
        wdPerctListA: [],
        wdPerctListB: [],
        totalNum: '',
        evaNum: '',
        evaPerct1: '',
        riskNum: '',
        warningListsDui: [],
        warnListDui: [],
        suggestionDui: '',
        riskDui: '',
        duiTab: 1,
        suggestFlag: false
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
        return this.$store.state.partsDuiFlag;
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
          console.log('2222')
          this.zipFlag = false;
        }
      }
    },
    created () {
      // this.setLabel()
    },
    beforeDestroy() {
      console.log("销毁了");
      // this.loading.close();
      this.setPartsDuiFlag(false);
    },
    mounted() {
      // console.log(this.gList)
      // this.getInfo()
      console.log(this.cutStr("团队对比报告", 6))
  
      // this.echartsOther()
      console.log(this.cutStr("测试1字符串哈哈哈哈", 10).substring(this.cutStr("测试1字符串哈哈哈哈", 6).length, this.cutStr("测试1字符串哈哈哈哈", 10).length))
      // window.addEventListener("resize", () => {
      //   setTimeout(() => {
      //     // this.myChartZhu.resize();
      //     // this.myChartYesA.resize();
      //     // this.myChartYesB.resize();
      //     // this.changeSize()
      //   }, 100);
      // });
    },
    methods: {
      ...mapMutations(["setPartsDuiFlag"]),
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
      initChartA () {
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
        this.pieListA = []
        let flagNum = 0
        console.log(this.wdPerctListA )
        for ( let i in that.wdPerctListA) {
          this.pieListA.push({
            name: that.wdPerctListA[i].name,
            value: that.wdPerctListA[i].perct,
            y: that.wdPerctListA[i].perct,
            // y: 50,
            num: 0
          })
          if (that.wdPerctListA[i].perct > 0) {
            flagNum++
          }
        }
        
        console.log(this.pieListA)
        console.log(flagNum)
        if (flagNum === 0) {
          flag = true
        }
        console.log(flag)
        this.pieListA.forEach((item, index) => {
          item.itemStyle = {
            opacity: 1,
            color: that.wdPerctListA[index].color3
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
              color: that.wdPerctListA[index].color3,
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
                  backgroundColor: that.wdPerctListA[index].color3,
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
                color: that.wdPerctListA[index].color3
              }
            }
          }
        })
        // this.myChartPie = echarts.init(this.$refs.myChartPie);
        // console.log(this.pieList)
        // this.pieOption = getPie3D(this.pieList, 2, 300, 40, 20, 2, -1)
        // this.myChartPie.setOption(this.pieOption);
        // // // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
        // let pieList1 = JSON.parse(JSON.stringify(this.pieList))
        // if (!flag) {
        //   for (let i in pieList1) {
        //     pieList1[i].itemStyle.color = "transparent"
        //   }
        // }
        // this.pieOption.series.push({
        //   name: '预警', // 自己根据场景修改
        //   backgroundColor: 'transparent',
        //   color: 'transparent',
        //   type: 'pie',
        //   animation: false,
        //   label: {
        //     opacity: 1,
        //     fontSize: 13,
        //     lineHeight: 20
        //   },
        //   startAngle: -60, // 起始角度，支持范围[0, 360]。
        //   clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        //   radius: flag ? ['0%', '60%'] : ['0%', '60%'],
        //   center: ['50%', '50%'],
        //   data: pieList1,
        //   itemStyle: {
        //     color: "transparent",
        //     opacity: 1 // 这里必须是0，不然2d的图会覆盖在表面
        //   }
        // })
        // this.myChartPie.setOption(this.pieOption)
        // console.log(this.myChartPie)
        // // this.bindListen(this.myChartPie, 'pieOption')


        this.myChartPieA = echarts.init(this.$refs.myChartPieA);
        console.log(this.pieListA)
        this.pieOptionA = null
        this.pieOptionA = getPie3D(this.pieListA, 2, 240, 40, 20, 2, -1)
        this.myChartPieA.setOption(this.pieOptionA);
        // // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
        let pieList1A = JSON.parse(JSON.stringify(this.pieListA))
        if (!flag) {
          for (let i in pieList1A) {
            pieList1A[i].itemStyle.color = "transparent"
          }
        }
        if (flag) {
          this.pieOptionA.series.push({
            name: '预警', // 自己根据场景修改
            backgroundColor: 'transparent',
            color: 'transparent',
            type: 'pie',
            animation: false,
            labelLine: {
              show: false
            },
            label: {
              opacity: 0,
              fontSize: 13,
              lineHeight: 20
            },
            startAngle: 0, // 起始角度，支持范围[0, 360]。
            clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
            radius: flag ? ['0%', '60%'] : ['0%', '60%'],
            center: ['50%', '50%'],
            data: pieList1A,
            itemStyle: {
              color: "transparent",
              opacity: 1 // 这里必须是0，不然2d的图会覆盖在表面
            }
          })
        } else {
          this.pieOptionA.series.push({
            name: '预警', // 自己根据场景修改
            backgroundColor: 'transparent',
            color: 'transparent',
            type: 'pie',
            animation: false,
            labelLine: {
              show: false
            },
            label: {
              opacity: 0,
              fontSize: 13,
              lineHeight: 20
            },
            startAngle: 0, // 起始角度，支持范围[0, 360]。
            clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
            radius: flag ? ['0%', '60%'] : ['0%', '60%'],
            center: ['50%', '50%'],
            data: pieList1A,
            itemStyle: {
              color: "transparent",
              opacity: 0 // 这里必须是0，不然2d的图会覆盖在表面
            }
          })
        }
        
        this.myChartPieA.setOption(this.pieOptionA)
        console.log(this.myChartPieA)
      },
      // 图表初始化
      initChartB () {
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
        this.pieListB = []
        let flagNum = 0
        console.log(this.wdPerctListB )
        for ( let i in that.wdPerctListB) {
          this.pieListB.push({
            name: that.wdPerctListB[i].name,
            value: that.wdPerctListB[i].perct,
            y: that.wdPerctListB[i].perct,
            // y: 50,
            num: 0
          })
          if (that.wdPerctListB[i].perct > 0) {
            flagNum++
          }
        }
        
        console.log(this.pieListB)
        console.log(flagNum)
        if (flagNum === 0) {
          flag = true
        }
        
        this.pieListB.forEach((item, index) => {
          item.itemStyle = {
            opacity: 1,
            color: that.wdPerctListB[index].color3
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
              color: that.wdPerctListB[index].color3,
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
                  backgroundColor: that.wdPerctListB[index].color3,
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
                color: that.wdPerctListB[index].color3
              }
            }
          }
        })

        this.myChartPieB = echarts.init(this.$refs.myChartPieB);
        console.log(this.pieListB)
        this.pieOptionB = null
        this.pieOptionB = getPie3D(this.pieListB, 2, 240, 40, 20, 2, -1)
        this.myChartPieB.setOption(this.pieOptionB);
        // // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
        let pieList1B = JSON.parse(JSON.stringify(this.pieListB))
        if (!flag) {
          for (let i in pieList1B) {
            pieList1B[i].itemStyle.color = "transparent"
          }
        }
        if (flag) {
          this.pieOptionB.series.push({
            name: '预警', // 自己根据场景修改
            backgroundColor: 'transparent',
            color: 'transparent',
            type: 'pie',
            animation: false,
            labelLine: {
              show: false
            },
            label: {
              opacity: 0,
              fontSize: 13,
              lineHeight: 20
            },
            startAngle: 0, // 起始角度，支持范围[0, 360]。
            clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
            radius: flag ? ['0%', '60%'] : ['0%', '60%'],
            center: ['50%', '50%'],
            data: pieList1B,
            itemStyle: {
              color: "transparent",
              opacity: 1 // 这里必须是0，不然2d的图会覆盖在表面
            }
          })
        } else {
          this.pieOptionB.series.push({
            name: '预警', // 自己根据场景修改
            backgroundColor: 'transparent',
            color: 'transparent',
            type: 'pie',
            animation: false,
            labelLine: {
              show: false
            },
            label: {
              opacity: 0,
              fontSize: 13,
              lineHeight: 20
            },
            startAngle: 0, // 起始角度，支持范围[0, 360]。
            clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
            radius: flag ? ['0%', '60%'] : ['0%', '60%'],
            center: ['50%', '50%'],
            data: pieList1B,
            itemStyle: {
              color: "transparent",
              opacity: 0 // 这里必须是0，不然2d的图会覆盖在表面
            }
          })
        }
        this.myChartPieB.setOption(this.pieOptionB)
        console.log(this.myChartPieB)
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
      echartsOther() {
        let that = this;
        
        // 总体评估概况
        this.myChartYesA = echarts.init(this.$refs.myChartYesA);
        this.myChartYesA.setOption({
          title: {
            text: that.riskPerctA1,
            subtext: '有风险',
            textStyle: {
              color: 'rgba(51, 62, 117, 1)',
              fontSize: 40,
              fontWeight: 600
            },
            subtextStyle: {
              color: 'rgba(117, 122, 144, 1)',
              fontSize: 24,
              fontWeight: 600
            },
            itemGap: 10, // 主副标题距离
            left: 'center',
            top: '63'
          },
          angleAxis: {
            max: 100, // 满分
            clockwise: false, // 逆时针
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'category',
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          polar: {
            center: ['50%', '50%'],
            radius: '170' // 图形大小
          },
          series: [
            
            {
              type: 'bar',
              animation: false,
              avoidLabelOverlap: false,
              label: {
                position: 'center',
                show: true,
                formatter: function() {
                  let str = '{a|' + that.riskPerctA1 + '}' + '\n\n' + '{b|有风险}'
                  return str
                },
                rich: {
                  a: {
                    color: 'rgba(51, 62, 117, 1)', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                    fontSize: '40',
                    fontWeight: '600'
                  },
                  b: {
                    color: 'rgba(117, 122, 144, 1)',
                    fontSize: '24'
                  }
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  name: '报警',
                  value: that.riskPerctA,
                  itemStyle: {
                    normal: {
                      barBorderRadius: [2, 2, 0, 0],
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(255, 116, 138, 1)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(255, 199, 182, 1)'
                        }
                      ])
                    }
                  }
                }
              ],
              coordinateSystem: 'polar',
              roundCap: true,
              barWidth: 20,
              barGap: '-100%', // 两环重叠
              z: 2
            },
            {
              // 灰色环
              type: 'bar',
              animation: false,
              data: [
                {
                  value: 100,
                  itemStyle: {
                    color: 'rgba(242, 245, 252, 1)'
                  }
                }
              ],
              coordinateSystem: 'polar',
              roundCap: true,
              barWidth: 20,
              barGap: '-100%', // 两环重叠
              z: 1
            }
          ]
        });

        // 总体评估概况
        this.myChartYesB = echarts.init(this.$refs.myChartYesB);
        this.myChartYesB.setOption({
          title: {
            text: that.riskPerctB1,
            subtext: '有风险',
            textStyle: {
              color: 'rgba(51, 62, 117, 1)',
              fontSize: 40,
              fontWeight: 600
            },
            subtextStyle: {
              color: 'rgba(117, 122, 144, 1)',
              fontSize: 24,
              fontWeight: 600
            },
            itemGap: 10, // 主副标题距离
            left: 'center',
            top: '63'
          },
          angleAxis: {
            max: 100, // 满分
            clockwise: false, // 逆时针
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'category',
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          polar: {
            center: ['50%', '50%'],
            radius: '170' // 图形大小
          },
          series: [
            {
              type: 'bar',
              animation: false,
              avoidLabelOverlap: false,
              label: {
                position: 'center',
                show: true,
                formatter: function() {
                  let str = '{a|' + that.riskPerctB1 + '}' + '\n\n' + '{b|有风险}'
                  return str
                },
                rich: {
                  a: {
                    color: 'rgba(51, 62, 117, 1)', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                    fontSize: '40',
                    fontWeight: '600'
                  },
                  b: {
                    color: 'rgba(117, 122, 144, 1)',
                    fontSize: '24'
                  }
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  name: '报警',
                  value: that.riskPerctB,
                  itemStyle: {
                    normal: {
                      barBorderRadius: [2, 2, 0, 0],
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(255, 116, 138, 1)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(255, 199, 182, 1)'
                        }
                      ])
                    }
                  }
                }
              ],
              coordinateSystem: 'polar',
              roundCap: true,
              barWidth: 20,
              barGap: '-100%', // 两环重叠
              z: 2
            },
            {
              // 灰色环
              type: 'bar',
              animation: false,
              data: [
                {
                  value: 100,
                  itemStyle: {
                    color: 'rgba(242, 245, 252, 1)'
                  }
                }
              ],
              coordinateSystem: 'polar',
              roundCap: true,
              barWidth: 20,
              barGap: '-100%', // 两环重叠
              z: 1
            }
          ]
        });
        
      },
      echartInfo (dataName, datas) {
        let that = this;
        // for (let i in this.ecCount) {
        //   console.log(i)
        // }
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        console.log(dataName)
        console.log(datas)
        let listX = ["轻度风险", "中度风险", "重度风险"]
        let listY1 = [datas.infos.a, datas.infos.b, datas.infos.c]
        let listY2 = [datas.infos.a1, datas.infos.b1, datas.infos.c1]
        // depName: '测试92部门',
        // riskPerct: 30
        // let maxList = JSON.parse(JSON.stringify(datas.infos)).sort((a, b) => {
        //   return b.y - a.y
        // })
        // let max = maxList[0].y
        // datas.infos = datas.infos.reverse()
        
        // for (let i in datas.infos) {
          // listX.push(datas.infos[i].x.replace(/-/g, '/'))
          // listY1.push(datas.infos[i].a, datas.infos[i].b, datas.infos[i].c)
          // listY2.push(datas.infos[i].a1, datas.infos[i].b1, datas.infos[i].c1)
        // }
        console.log(listX)
        console.log(listY1)
        console.log(listY2)

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
              // max: max < 3 ? 3 : max, // 最大百分比
              type: 'value',
              minInterval: 1,
              // name: '单位（%）',
              nameGap: 35,
              nameTextStyle: { color: '#6F76B2' },
              axisTick: { show: false },
              axisLabel: {
                show: true,
                // padding: [0,0,0,-10],
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
              name: "A团体",
              type: "line",
              symbol: "none",
              smooth: true,
              animation: false,
              itemStyle: {
                normal: {
                  color: 'rgba(135, 201, 255, 1)',
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
                      color: 'rgba(72,146,254,0.1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(72,146,254,0.1)'
                    }
                  ])
                }
              },
              barWidth: 0,
              // color:"#00FFFF",
              data: listY1
            },
            {
              name: "B团体",
              type: "line",
              symbol: "none",
              smooth: true,
              animation: false,
              itemStyle: {
                normal: {
                  color: 'rgba(222, 185, 255, 1)',
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
                      color: 'rgba(184, 124, 255, 0.1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(189, 187, 255, 0.1)'
                    }
                  ])
                }
              },
              barWidth: 0,
              // color:"#00FFFF",
              data: listY2
            }
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
          console.log("this.gList")
          console.log(this.gList)
          let paramt = {
            organizationA: this.gList.organizationA,
            organizationB: this.gList.organizationB,
            departmentNameA: this.gList.departmentNameA,
            departmentNameB: this.gList.departmentNameB,
            startDate: this.gList.startDate,
            endDate: this.gList.endDate
          }
          
          // // 用例
          // alert(this.cutStr("测试1字符串哈哈哈哈", 1, 6));
          // alert(this.cutStr("测试1字符串哈哈哈哈", 6, 10));
          this.$http
            .post(Url + "/aimw/report/exportGroupCompareReport", paramt)
            .then(res => {
              console.log(res)
              // return
              // res.data = {
              //   "code": 0,
              //   "data": {
              //     "anxietyInfo": {
              //       "MildNum": 0,
              //       "MildPct": 0,
              //       "ModerateNum": 0,
              //       "ModeratePct": 0,
              //       "SevereNum": 0,
              //       "SeverePct": 0,
              //       "normalNum": 0,
              //       "normalPct": 0,
              //       "warningList": [
              //         {
              //           "finishTime": "2023/11/11 23:00:00",
              //           "level": 0,
              //           "name": "wt0",
              //           "passport": "1581132400"
              //         }
              //       ]
              //     },
              //     "anxietyPerct": 0,
              //     "depName": "string",
              //     "depressionInfo": {
              //       "MildNum": 0,
              //       "MildPct": 0,
              //       "ModerateNum": 0,
              //       "ModeratePct": 0,
              //       "SevereNum": 0,
              //       "SeverePct": 0,
              //       "normalNum": 0,
              //       "normalPct": 0,
              //       "warningList": [
              //         {
              //           "finishTime": "2023/11/11 23:00:01",
              //           "level": 0,
              //           "name": "wt1",
              //           "passport": "1581132401"
              //         }
              //       ]
              //     },
              //     "depressionPerct": 0,
              //     "evaNum": 0,
              //     "forcedInfo": {
              //       "MildNum": 0,
              //       "MildPct": 0,
              //       "ModerateNum": 0,
              //       "ModeratePct": 0,
              //       "SevereNum": 0,
              //       "SeverePct": 0,
              //       "normalNum": 0,
              //       "normalPct": 0,
              //       "warningList": [
              //         {
              //           "finishTime": "2023/11/11 23:00:02",
              //           "level": 0,
              //           "name": "wt2",
              //           "passport": "1581132402"
              //         }
              //       ]
              //     },
              //     "forcedPerct": 0,
              //     "ptsdInfo": {
              //       "MildNum": 0,
              //       "MildPct": 0,
              //       "ModerateNum": 0,
              //       "ModeratePct": 0,
              //       "SevereNum": 0,
              //       "SeverePct": 0,
              //       "normalNum": 0,
              //       "normalPct": 0,
              //       "warningList": [
              //         {
              //           "finishTime": "2023/11/11 23:00:03",
              //           "level": 0,
              //           "name": "wt3",
              //           "passport": "1581132403"
              //         }
              //       ]
              //     },
              //     "ptsdPerct": 0,
              //     "riskNum": 0,
              //     "riskPerct": 0,
              //     "suicideInfo": {
              //       "MildNum": 0,
              //       "MildPct": 0,
              //       "ModerateNum": 0,
              //       "ModeratePct": 0,
              //       "SevereNum": 0,
              //       "SeverePct": 0,
              //       "normalNum": 0,
              //       "normalPct": 0,
              //       "warningList": [
              //         {
              //           "finishTime": "2023/11/11 23:00:04",
              //           "level": 0,
              //           "name": "wt4",
              //           "passport": "1581132404"
              //         }
              //       ]
              //     },
              //     "suicidePerct": 0,
              //     "totalNum": 6,
              //     "violenceInfo": {
              //       "MildNum": 0,
              //       "MildPct": 0,
              //       "ModerateNum": 0,
              //       "ModeratePct": 0,
              //       "SevereNum": 0,
              //       "SeverePct": 0,
              //       "normalNum": 0,
              //       "normalPct": 0,
              //       "warningList": [
              //         {
              //           "finishTime": "2023/11/11 23:00:05",
              //           "level": 0,
              //           "name": "wt5",
              //           "passport": "1581132405"
              //         }
              //       ]
              //     },
              //     "violencePerct": 0
              //   },
              //   "msg": "string"
              // }

              // console.log(ress)
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
              console.log(data)
              // return
              if (data.code == 0) {
                let info = res.data.data
                console.log(info)
                info.departmentNameA = this.gList.departmentNameA,
                info.departmentNameB = this.gList.departmentNameB,
                info.startDate = this.gList.startDate;
                info.endDate = this.gList.endDate;
                console.log(info.totalNum)
                if (info.totalNum < 1) {
                  this.$message.error('当前部门内未发现测评人员的数据，请测评后再进行导出！')
                  this.loading.close();
                  this.setPartsDuiFlag(false)
                  return false
                }
                setTimeout(() => {
                  resolve(data.data);
                  this.loading.setText("正在请求数据");
                }, 500);
              } else {
                that.$message.error(data.msg);
                this.loading.close();
                this.setPartsDuiFlag(false);
              }
            })
            .catch(res => {
              console.log(res);
              this.loading.close();
              this.setPartsDuiFlag(false);
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
        let that = this;
        let algTypes = JSON.parse(localStorage.getItem("algTypes"));
        // this.zipFlag = false;
        console.log("!!!!!!!!!!!!!!!!!!!!!!"+algTypes)
        console.log(algTypes)
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
          this.setPartsDuiFlag(false);
          this.loading.setText("正在拼命导出");
          console.log('正在拼命导出')
          const zip = new JSZip();
          const promises = [];
          this.isShowPdf = true;
          for (let u = 0; u < selectedData.length; u++) {
            // 解析数据
            console.log(selectedData[u]);
            // EvaResult
            // this.organizationName = selectedData[u].organizationName;
            // this.depName = selectedData[u].depName;
            this.startDate = selectedData[u].startDate.substring(0, 4) + '年' + selectedData[u].startDate.substring(4, 6) + "月" + selectedData[u].startDate.substring(6, 8) + "日";
            console.log(this.startDate)
            this.endDate = selectedData[u].endDate.substring(0, 4) + '年' + selectedData[u].endDate.substring(4, 6) + "月" + selectedData[u].endDate.substring(6, 8) + "日";
            console.log(this.endDate)
            this.time = this.startDate + ' —— ' + this.endDate;
            
            this.evaNum = selectedData[u].evaNum
            this.evaPerct = selectedData[u].evaPerct
            this.evaPerct1 = this.perctInfo1(selectedData[u].evaPerct) + "%";
            this.riskNum = selectedData[u].riskNum
            this.riskPerct = selectedData[u].riskPerct
            this.riskPerct1 = this.perctInfo1(selectedData[u].riskPerct) + "%";
            this.totalNum = selectedData[u].totalNum
            
            if (selectedData[u].GroupStatistic && selectedData[u].GroupStatistic.length > 1) {
              selectedData[u].GroupStatistic[0].evaPerct1 = this.perctInfo1(selectedData[u].GroupStatistic[0].evaPerct) + "%";
              selectedData[u].GroupStatistic[0].riskPerct1 = this.perctInfo1(selectedData[u].GroupStatistic[0].riskPerct) + "%";
              selectedData[u].GroupStatistic[1].evaPerct1 = this.perctInfo1(selectedData[u].GroupStatistic[1].evaPerct) + "%";
              selectedData[u].GroupStatistic[1].riskPerct1 = this.perctInfo1(selectedData[u].GroupStatistic[1].riskPerct) + "%";
              if (selectedData[u].GroupStatistic[0].GroupUsersInfo === null) {
                selectedData[u].GroupStatistic[0].GroupUsersInfo = []
              }
              for (let o in selectedData[u].GroupStatistic[0].GroupUsersInfo) {
                selectedData[u].GroupStatistic[0].GroupUsersInfo[o].depName = selectedData[u].GroupStatistic[0].departmentName
                selectedData[u].GroupStatistic[0].GroupUsersInfo[o].id = Number(o) + 1
                
              }

              if (selectedData[u].GroupStatistic[1].GroupUsersInfo === null) {
                selectedData[u].GroupStatistic[1].GroupUsersInfo = []
              }
              for (let o in selectedData[u].GroupStatistic[1].GroupUsersInfo) {
                selectedData[u].GroupStatistic[1].GroupUsersInfo[o].depName = selectedData[u].GroupStatistic[1].departmentName
                selectedData[u].GroupStatistic[1].GroupUsersInfo[o].id = Number(o) + 1
              }

              this.warningListsDui = selectedData[u].GroupStatistic[0].GroupUsersInfo.concat(selectedData[u].GroupStatistic[1].GroupUsersInfo)
              console.log(this.warningListsDui)
              for (let i in this.warningListsDui) {
                let levelStr = []
                if (that.depressionFlag == 1) {
                  let wName = '抑郁'
                  let level =  this.warningListsDui[i].depressionLevel == 1 ? "轻度" + wName  :   this.warningListsDui[i].depressionLevel == 2 ? '中度' + wName :   this.warningListsDui[i].depressionLevel == 3 ? '重度' + wName : ''
                  if (level != '') {
                    levelStr.push(level)
                  }
                }
                if (that.anxietyFlag == 1) {
                  let wName = '焦虑'
                  let level =  this.warningListsDui[i].anxietyLevel == 1 ? "轻度" + wName  :   this.warningListsDui[i].anxietyLevel == 2 ? '中度' + wName :   this.warningListsDui[i].anxietyLevel == 3 ? '重度' + wName : ''
                  if (level != '') {
                    levelStr.push(level)
                  }
                }
                if (that.forcedFlag == 1) {
                  let wName = '强迫'
                  let level =  this.warningListsDui[i].forcedLevel == 1 ? "轻度" + wName  :   this.warningListsDui[i].forcedLevel == 2 ? '中度' + wName :   this.warningListsDui[i].forcedLevel == 3 ? '重度' + wName : ''
                  if (level != '') {
                    levelStr.push(level)
                  }
                }
                if (that.ptsdFlag == 1) {
                  let wName = 'PTSD'
                  let level =  this.warningListsDui[i].ptsdLevel == 1 ? "轻度" + wName  :   this.warningListsDui[i].ptsdLevel == 2 ? '中度' + wName : this.warningListsDui[i].ptsdLevel == 3 ? '重度' + wName : ''
                  if (level != '') {
                    levelStr.push(level)
                  }
                }
                if (that.violenceFlag == 1) {
                  let wName = '敌对'
                  let level =  this.warningListsDui[i].violenceLevel == 1 ? "轻度" + wName  :   this.warningListsDui[i].violenceLevel == 2 ? '中度' + wName : this.warningListsDui[i].violenceLevel == 3 ? '重度' + wName : ''
                  if (level != '') {
                    levelStr.push(level)
                  }
                }
                if (that.suicideFlag == 1) {
                  let wName = '自我伤害'
                  let level = this.warningListsDui[i].suicideLevel == 1 ? "轻度" + wName  :  this.warningListsDui[i].suicideLevel == 2 ? '中度' + wName :  this.warningListsDui[i].suicideLevel == 3 ? '重度' + wName : ''
                  if (level != '') {
                    levelStr.push(level)
                  }
                }
                this.warningListsDui[i].levelStr = levelStr.join('、')
                console.log(levelStr)
              }
              console.log(this.warningListsDui)

              let listd1 = []
              
              let warnLend1 = Math.ceil((this.warningListsDui.length - 9) / 23)
              for (let j = 0; j < warnLend1; j++) {
                listd1.push(this.warningListsDui.slice(9 + 23 * j, 9 + 23 * (Number(j) + 1)))
              }
              console.log(listd1)
              this.warnListDui = listd1

              let duiTab = 1
              console.log(this.warningListsDui.length)
              if (this.warningListsDui.length < 5) {
                duiTab = 1
              } else if (this.warningListsDui.length > 4 && this.warningListsDui.length < 10 ) {
                duiTab = 2
              } else if (this.warningListsDui.length > 9) {
                // && this.warningListsDui.length < 27 
                if (this.warnListDui[this.warnListDui.length - 1].length < 18) {
                  this.suggestFlag = true
                } else {
                  this.suggestFlag = false
                }
                duiTab = 3
              }
              this.duiTab = duiTab
              console.log('duiTab')
              console.log(duiTab)
              

              this.GroupStatistic = selectedData[u].GroupStatistic
              let suggestionDui = ''
              suggestionDui += this.GroupStatistic[0].departmentName + '实测占比' + this.GroupStatistic[0].evaPerct1 + '，' + this.GroupStatistic[1].departmentName + '实测占比' + this.GroupStatistic[1].evaPerct1 + '，'
              if (this.GroupStatistic[0].evaPerct > 95 && this.GroupStatistic[1].evaPerct > 95) {
                suggestionDui += this.GroupStatistic[0].departmentName + '和' + this.GroupStatistic[1].departmentName + '心理测评覆盖率都很高，请继续保持；此外，还可以将心理测评进行常态化，便于对心理健康状态进行追踪评估。'
              
              } else if (this.GroupStatistic[0].evaPerct < 96 && this.GroupStatistic[1].evaPerct <96) {
                
                suggestionDui += '管理者可多多组织职工参加AI心世界测评，提高心理测评的覆盖率；此外，还可以将心理测评进行常态化，便于对心理健康状态进行追踪评估。'
              
              } else {
                if (this.GroupStatistic[0].evaPerct > this.GroupStatistic[1].evaPerct) {
                  suggestionDui += this.GroupStatistic[0].departmentName + '心理测评覆盖率很高，请继续保持，' + this.GroupStatistic[1].departmentName
                } else {
                  suggestionDui += this.GroupStatistic[1].departmentName + '心理测评覆盖率很高，请继续保持，' + this.GroupStatistic[0].departmentName
                }
                 suggestionDui += '管理者可多多组织职工参加AI心世界测评，提高心理测评的覆盖率；此外，还可以将心理测评进行常态化，便于对心理健康状态进行追踪评估。'
             
              }
              this.suggestionDui = suggestionDui

              let riskDui = ''
              if (this.GroupStatistic[0].riskPerct == this.GroupStatistic[1].riskPerct) {

                riskDui += this.GroupStatistic[0].departmentName + '和' + this.GroupStatistic[1].departmentName + '预警人数占比相同（为' + this.GroupStatistic[0].riskPerct1 +'），建议管理者定期安排心理健康讲座，针对性地开展情绪舒缓活动，必要时，建议预警人员及时进行心理咨询或者去医院就诊。'
              
              } else {
                riskDui += this.GroupStatistic[0].departmentName + '预警人数占比（' + this.GroupStatistic[0].riskPerct1 + '）'
                if (this.GroupStatistic[0].riskPerct > this.GroupStatistic[1].riskPerct) {
                  riskDui += '高于'
                } else {
                  riskDui += '低于'
                }
                riskDui += this.GroupStatistic[1].departmentName + '（' + this.GroupStatistic[1].riskPerct1 + '）'
                riskDui += '，建议管理者定期安排心理健康讲座，针对性地开展情绪舒缓活动，必要时，建议预警人员及时进行心理咨询或者去医院就诊。'
              }
              this.riskDui = riskDui


              let departA = selectedData[u].GroupStatistic[0]
              let departB = selectedData[u].GroupStatistic[1]

              this.riskPerctA = departA.riskPerct
              this.riskPerctA1 = this.perctInfo1(departA.riskPerct) + "%";
              this.depressionPerctA = departA.depressionPerct
              this.anxietyPerctA = departA.anxietyPerct
              this.forcedPerctA = departA.forcedPerct
              this.ptsdPerctA = departA.forcedPerct
              this.violencePerctA = departA.violencePerct
              this.suicidePerctA = departA.suicidePerct

              this.depressionPerctA1 = this.perctInfo1(departA.depressionPerct) + "%";
              this.anxietyPerctA1 = this.perctInfo1(departA.anxietyPerct) + "%";
              this.forcedPerctA1 = this.perctInfo1(departA.forcedPerct) + "%";
              this.ptsdPerctA1 = this.perctInfo1(departA.ptsdPerct) + "%";
              this.violencePerctA1 = this.perctInfo1(departA.violencePerct) + "%";
              this.suicidePerctA1 = this.perctInfo1(departA.suicidePerct) + "%";

              let wdStrA = []
              if (this.depressionFlag == 1) {
                wdStrA.push(
                  {
                    name: '抑郁',
                    color1: 'rgba(132, 138, 255, 0.6)',
                    color2: 'rgba(162, 176, 255, 0.6)',
                    color3: "rgba(153, 169, 255, 1)",
                    color4: 'rgba(201, 204, 255, 1)',
                    // perct: 10,
                    perct: departA.depressionPerct,
                    perct1: this.depressionPerctA1,
                    // num: 10,
                    num: departA.depressionNum,
                    numB: departB.depressionNum,
                    Pct:  this.perctInfo1(departA.depressionPct) + "%",
                    PctB:  this.perctInfo1(departB.depressionPct) + "%",
                    nameA: selectedData[u].departmentNameA,
                    nameB: selectedData[u].departmentNameB,
                    infos: {
                      a: departA.depressionMildNum,
                      b: departA.depressionModerateNum,
                      c: departA.depressionSevereNum,
                      a1: departB.depressionMildNum,
                      b1: departB.depressionModerateNum,
                      c1: departB.depressionSevereNum
                    }
                  }
                )
              }
              if (this.anxietyFlag == 1) {
                wdStrA.push(
                  {
                    name: '焦虑',
                    color1: 'rgba(214, 182, 246, 0.6)',
                    color2: 'rgba(225, 203, 246, 0.6)',
                    color3: "rgba(214, 182, 246, 1)",
                    color4: 'rgba(225, 203, 246, 1)',
                    // perct: 15,
                    perct: departA.anxietyPerct,
                    perct1: this.anxietyPerctA1,
                    // num: 10,
                    num: departA.anxietyNum,
                    numB: departB.anxietyNum,
                    Pct:  this.perctInfo1(departA.anxietyPct) + "%",
                    PctB:  this.perctInfo1(departB.anxietyPct) + "%",
                    nameA: selectedData[u].departmentNameA,
                    nameB: selectedData[u].departmentNameB,
                    infos: {
                      a: departA.anxietyMildNum,
                      b: departA.anxietyModerateNum,
                      c: departA.anxietySevereNum,
                      a1: departB.anxietyMildNum,
                      b1: departB.anxietyModerateNum,
                      c1: departB.anxietySevereNum
                    }
                  }
                )
              }
              if (this.forcedFlag == 1) {
                wdStrA.push(
                  {
                    name: '强迫',
                    color1: 'rgba(255, 193, 150, 0.6)',
                    color2: 'rgba(255, 227, 184, 0.6)',
                    color3: "rgba(255, 210, 97, 1)",
                    color4: 'rgba(255, 210, 97, 1)',
                    // perct: 20,
                    perct: departA.forcedPerct,
                    perct1: this.forcedPerctA1,
                    // num: 10,
                    num: departA.forcedNum,
                    numB: departB.forcedNum,
                    Pct: this.perctInfo1(departA.forcedPct) + "%",
                    PctB: this.perctInfo1(departB.forcedPct) + "%",
                    nameA: selectedData[u].departmentNameA,
                    nameB: selectedData[u].departmentNameB,
                    infos: {
                      a: departA.forcedMildNum,
                      b: departA.forcedModerateNum,
                      c: departA.forcedSevereNum,
                      a1: departB.forcedMildNum,
                      b1: departB.forcedModerateNum,
                      c1: departB.forcedSevereNum
                    }
                  }
                )
              }
              if (this.ptsdFlag == 1) {
                wdStrA.push(
                  {
                    name: 'PTSD',
                    color1: 'rgba(255, 163, 163, 0.6)',
                    color2: 'rgba(255, 163, 163, 0.6)',
                    color3: '#FFA3A3',
                    color4: 'rgba(255, 207, 224, 1)',
                    // perct: 10,
                    perct: departA.ptsdPerct,
                    perct1: this.ptsdPerctA1,
                    // num: 10,
                    num: departA.ptsdNum,
                    numB: departB.ptsdNum,
                    Pct: this.perctInfo1(departA.ptsdPct) + "%",
                    PctB: this.perctInfo1(departB.ptsdPct) + "%",
                    nameA: selectedData[u].departmentNameA,
                    nameB: selectedData[u].departmentNameB,
                    infos: {
                      a: departA.ptsdMildNum,
                      b: departA.ptsdModerateNum,
                      c: departA.ptsdSevereNum,
                      a1: departB.ptsdMildNum,
                      b1: departB.ptsdModerateNum,
                      c1: departB.ptsdSevereNum
                    }
                  }
                )
              }
              if (this.violenceFlag == 1) {
                wdStrA.push(
                  {
                    name: '敌对',
                    color1: 'rgba(135, 201, 255, 0.6)',
                    color2: 'rgba(175, 236, 255, 0.6)',
                    color3: "rgba(148, 207, 255, 1)",
                    color4: 'rgba(178, 231, 247, 1)',
                    // perct: 6,
                    perct: departA.violencePerct,
                    perct1: this.violencePerctA1,
                    // num: 10,
                    num: departA.violenceNum,
                    numB: departB.violenceNum,
                    Pct: this.perctInfo1(departA.violencePct) + "%",
                    PctB: this.perctInfo1(departB.violencePct) + "%",
                    nameA: selectedData[u].departmentNameA,
                    nameB: selectedData[u].departmentNameB,
                    infos: {
                      a: departA.violenceMildNum,
                      b: departA.violenceModerateNum,
                      c: departA.violenceSevereNum,
                      a1: departB.violenceMildNum,
                      b1: departB.violenceModerateNum,
                      c1: departB.violenceSevereNum
                    }
                  }
                )
              }
              if (this.suicideFlag == 1) {
                wdStrA.push(
                  {
                    name: '自我伤害',
                    color1: 'rgba(255, 146, 186, 0.6)',
                    color2: 'rgba(255, 182, 207, 0.6)',
                    color3: "rgba(255, 178, 206, 1)",
                    color4: 'rgba(255, 207, 224, 1)',
                    // perct: 0,
                    perct: departA.suicidePerct,
                    perct1: this.suicidePerctA1,
                    // num: 10,
                    num: departA.suicideNum,
                    numB: departB.suicideNum,
                    Pct: this.perctInfo1(departA.suicidePct) + "%",
                    PctB: this.perctInfo1(departB.suicidePct) + "%",
                    nameA: selectedData[u].departmentNameA,
                    nameB: selectedData[u].departmentNameB,
                    infos: {
                      a: departA.suicideMildNum,
                      b: departA.suicideModerateNum,
                      c: departA.suicideSevereNum,
                      a1: departB.suicideMildNum,
                      b1: departB.suicideModerateNum,
                      c1: departB.suicideSevereNum
                    }
                  }
                )
              }
              let wdArrA = wdStrA
            
              let wdArrsA = wdArrA.sort((a, b) => {
                return b.perct - a.perct
              })
              console.log(wdArrsA)
              this.wdPerctListA = wdArrsA
              console.log(this.wdPerctListA)
              


              this.riskPerctB = departB.riskPerct
              this.riskPerctB1 = this.perctInfo1(departB.riskPerct) + "%";
              this.depressionPerctB = departB.depressionPerct
              this.anxietyPerctB = departB.anxietyPerct
              this.forcedPerctB = departB.forcedPerct
              this.ptsdPerctB = departB.forcedPerct
              this.violencePerctB = departB.violencePerct
              this.suicidePerctB = departB.suicidePerct

              this.depressionPerctB1 = this.perctInfo1(departB.depressionPerct) + "%";
              this.anxietyPerctB1 = this.perctInfo1(departB.anxietyPerct) + "%";
              this.forcedPerctB1 = this.perctInfo1(departB.forcedPerct) + "%";
              this.ptsdPerctB1 = this.perctInfo1(departB.ptsdPerct) + "%";
              this.violencePerctB1 = this.perctInfo1(departB.violencePerct) + "%";
              this.suicidePerctB1 = this.perctInfo1(departB.suicidePerct) + "%";

              let wdStrB = []
              if (this.depressionFlag == 1) {
                wdStrB.push(
                  {
                    name: '抑郁',
                    color1: 'rgba(132, 138, 255, 0.6)',
                    color2: 'rgba(162, 176, 255, 0.6)',
                    color3: "rgba(153, 169, 255, 1)",
                    color4: 'rgba(201, 204, 255, 1)',
                    // perct: 10,
                    perct: departB.depressionPerct,
                    perct1: this.depressionPerctB1,
                    // num: 10,
                    num: departB.depressionNum,
                    infos: {
                      a: departB.depressionMildNum,
                      b: departB.depressionModerateNum,
                      c: departB.depressionSevereNum
                    }
                  }
                )
              }
              if (this.anxietyFlag == 1) {
                wdStrB.push(
                  {
                    name: '焦虑',
                    color1: 'rgba(214, 182, 246, 0.6)',
                    color2: 'rgba(225, 203, 246, 0.6)',
                    color3: "rgba(214, 182, 246, 1)",
                    color4: 'rgba(225, 203, 246, 1)',
                    // perct: 15,
                    perct: departB.anxietyPerct,
                    perct1: this.anxietyPerctB1,
                    // num: 10,
                    num: departB.anxietyNum,
                    infos: {
                      a: departB.anxietyMildNum,
                      b: departB.anxietyModerateNum,
                      c: departB.anxietySevereNum
                    }
                  }
                )
              }
              if (this.forcedFlag == 1) {
                wdStrB.push(
                  {
                    name: '强迫',
                    color1: 'rgba(255, 193, 150, 0.6)',
                    color2: 'rgba(255, 227, 184, 0.6)',
                    color3: "rgba(255, 210, 97, 1)",
                    color4: 'rgba(255, 210, 97, 1)',
                    // perct: 20,
                    perct: departB.forcedPerct,
                    perct1: this.forcedPerctB1,
                    // num: 10,
                    num: departB.forcedNum,
                    infos: {
                      a: departB.forcedMildNum,
                      b: departB.forcedModerateNum,
                      c: departB.forcedSevereNum
                    }
                  }
                )
              }
              if (this.ptsdFlag == 1) {
                wdStrB.push(
                  {
                    name: 'PTSD',
                    color1: 'rgba(255, 163, 163, 0.6)',
                    color2: 'rgba(255, 163, 163, 0.6)',
                    color3: '#FFA3A3',
                    color4: 'rgba(255, 207, 224, 1)',
                    // perct: 10,
                    perct: departB.ptsdPerct,
                    perct1: this.ptsdPerctB1,
                    // num: 10,
                    num: departB.ptsdNum,
                    infos: {
                      a: departB.ptsdMildNum,
                      b: departB.ptsdModerateNum,
                      c: departB.ptsdSevereNum
                    }
                  }
                )
              }
              if (this.violenceFlag == 1) {
                wdStrB.push(
                  {
                    name: '敌对',
                    color1: 'rgba(135, 201, 255, 0.6)',
                    color2: 'rgba(175, 236, 255, 0.6)',
                    color3: "rgba(148, 207, 255, 1)",
                    color4: 'rgba(178, 231, 247, 1)',
                    // perct: 6,
                    perct: departB.violencePerct,
                    perct1: this.violencePerctB1,
                    // num: 10,
                    num: departB.violenceNum,
                    infos: {
                      a: departB.violenceMildNum,
                      b: departB.violenceModerateNum,
                      c: departB.violenceSevereNum
                    }
                  }
                )
              }
              if (this.suicideFlag == 1) {
                wdStrB.push(
                  {
                    name: '自我伤害',
                    color1: 'rgba(255, 146, 186, 0.6)',
                    color2: 'rgba(255, 182, 207, 0.6)',
                    color3: "rgba(255, 178, 206, 1)",
                    color4: 'rgba(255, 207, 224, 1)',
                    // perct: 0,
                    perct: departB.suicidePerct,
                    perct1: this.suicidePerctB1,
                    // num: 10,
                    num: departB.suicideNum,
                    infos: {
                      a: departB.suicideMildNum,
                      b: departB.suicideModerateNum,
                      c: departB.suicideSevereNum
                    }
                  }
                )
              }
              let wdArrB = wdStrB
            
              let wdArrsB = wdArrB.sort((a, b) => {
                return b.perct - a.perct
              })
              console.log(wdArrsB)
              this.wdPerctListB = wdArrsB
              console.log(this.wdPerctListB)
            }
            
            console.log(this.wdPerctListA)
            console.log(this.wdPerctListB)
            // let ecList = []
            this.wdPerctListA.sort((a, b) => {
              return b.perct - a.perct
            })
            // return
            for (let i in this.wdPerctListA) {
              console.log(this.wdPerctListA[i].name)
              let name = i < 1 ? '一、' + this.wdPerctListA[i].name : i == 1 ? '二、' + this.wdPerctListA[i].name : i == 2 ? '三、' + this.wdPerctListA[i].name : i == 3 ? '四、' + this.wdPerctListA[i].name : i == 4 ?  '五、' + this.wdPerctListA[i].name : '六、' + this.wdPerctListA[i].name
              this.wdPerctListA[i].name1 = name
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
            
            console.log(this.wdPerctListA)
            // console.log(ecList)
            for (let i in this.wdPerctListA) {
              this['myChartZhu' + i] = null
            }
            this.ecList = this.wdPerctListA
            setTimeout(() => {
              for (let i in this.ecList) {
                console.log(this.ecList[i])
                this.echartInfo('myChartZhu' + i, this.ecList[i])
              }
              this.initChartA()
              this.initChartB()
              this.echartsOther()
            }, 0);
            // return
            
            // // selectedData[u].evaPerct = this.perctInfo(selectedData[u].evaNum / selectedData[u].totalNum) + "%";
  
            // this.cpHead = '本机构共' + selectedData[u].totalNum + '人，实测' + selectedData[u].evaNum + '人（' + selectedData[u].evaPerct + '）。'
            // // 系统发现，本机构中有**人（23%）存在风险，**人（**%）无风险。
            // var rstr = '';
            // rstr += '系统发现，本机构实测人数中有' + selectedData[u].riskNum + '人（' + selectedData[u].riskPerct + '%）存在风险，' + parseInt(selectedData[u].evaNum - selectedData[u].riskNum) + '人（' + this.perctInfo1(100 - selectedData[u].riskPerct) + "%" + '）无风险。'
  
            // console.log(rstr)
            // this.partsStr2 = rstr
            

            // if (selectedData[u].depressionInfo.warningList === null) {
            //   selectedData[u].depressionInfo.warningList = []
            // }
            // if (selectedData[u].anxietyInfo.warningList === null) {
            //   selectedData[u].anxietyInfo.warningList = []
            // }
            // if (selectedData[u].forcedInfo.warningList === null) {
            //   selectedData[u].forcedInfo.warningList = []
            // }
            // if (selectedData[u].ptsdInfo.warningList === null) {
            //   selectedData[u].ptsdInfo.warningList = []
            // }
            // if (selectedData[u].violenceInfo.warningList === null) {
            //   selectedData[u].violenceInfo.warningList = []
            // }
            // if (selectedData[u].suicideInfo.warningList === null) {
            //   selectedData[u].suicideInfo.warningList = []
            // }
            


            // 焦虑（**%），其次分别为：强迫（**%），抑郁（**%），自我伤害（**%），敌对（**%）。
            
            // if (this.zibiFlag == 1) {
            //   wdStr.push(
            //     {
            //       name: '自闭',
            //       color1: 'rgba(189, 245, 184, 1)',
            //       color2: 'rgba(189, 245, 184, 1)',
            //       color3: '#BDF5B8',
            //       color4: 'rgba(255, 207, 224, 1)',
            //       num: selectedData[u].zibiNum,
            //       perct: selectedData[u].zibiPerct,
            //       riskNum: selectedData[u].zibiNum,
            //       level1: selectedData[u].zibiMildNum,
            //       level2: selectedData[u].zibiModerateNum,
            //       level3: selectedData[u].zibiSevereNum,
            //       info: zibiInfo
            //     }
            //   )
            // }
            
            // for (let i in wdArrs) {
            //   let infoArr = wdArrs[i].info.warningList
            //   for (let k in infoArr) {
            //     infoArr[k].id = Number(k) + 1
            //   }
            //   let info1 = []
            //   if (i < 1) {
            //     let infoLen1 = Math.ceil((infoArr.length - 13) / 23)
            //     for (let j = 0; j < infoLen1; j++) {
            //       info1.push(infoArr.slice(13 + 23 * j, 13 + 23 * (Number(j) + 1)))
            //     }
            //   } else {
            //     let infoLen1 = Math.ceil((infoArr.length - 14) / 23)
            //     for (let j = 0; j < infoLen1; j++) {
            //       info1.push(infoArr.slice(14 + 23 * j, 14 + 23 * (Number(j) + 1)))
            //     }
            //   }
              
            //   console.log(info1)

            //   wdArrs[i].info.warningInfo = info1
            // }
            // console.log(wdArrs)
            // let warningLists = []
            // if (selectedData[u].warningListAppendix === null) {
              
            // } else {
            //   warningLists = selectedData[u].warningListAppendix
            // }

            // let warningLists = [
            //   {anxietyLevel: 1,depressionLevel: 1,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 1,suicideLevel: 1,violenceLevel: 1},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 1},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 2,suicideLevel: 1,violenceLevel: 1},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0},
            //   {anxietyLevel: 0,depressionLevel: 0,finishTime: "2024-09-09 14:39:53",forcedLevel: 1,id: 1,levelStr: "轻度强迫、轻度自我伤害",name: "测试22",passport: "222222",ptsdLevel: 0,suicideLevel: 1,violenceLevel: 0}
            // ]
            // for (let i in warningLists) {
            //   console.log(warningLists[i])
            //   warningLists[i].id = Number(i) + 1
            //   let levelStr = []
            //   if (that.depressionFlag == 1) {
            //     let wName = '抑郁'
            //     let level = warningLists[i].depressionLevel == 1 ? "轻度" + wName  :  warningLists[i].depressionLevel == 2 ? '中度' + wName :  warningLists[i].depressionLevel == 3 ? '重度' + wName : ''
            //     if (level != '') {
            //       levelStr.push(level)
            //     }
            //   }
            //   if (that.anxietyFlag == 1) {
            //     let wName = '焦虑'
            //     let level = warningLists[i].anxietyLevel == 1 ? "轻度" + wName  :  warningLists[i].anxietyLevel == 2 ? '中度' + wName :  warningLists[i].anxietyLevel == 3 ? '重度' + wName : ''
            //     if (level != '') {
            //       levelStr.push(level)
            //     }
            //   }
            //   if (that.forcedFlag == 1) {
            //     let wName = '强迫'
            //     let level = warningLists[i].forcedLevel == 1 ? "轻度" + wName  :  warningLists[i].forcedLevel == 2 ? '中度' + wName :  warningLists[i].forcedLevel == 3 ? '重度' + wName : ''
            //     if (level != '') {
            //       levelStr.push(level)
            //     }
            //   }
            //   if (that.ptsdFlag == 1) {
            //     let wName = 'PTSD'
            //     let level = warningLists[i].ptsdLevel == 1 ? "轻度" + wName  :  warningLists[i].ptsdLevel == 2 ? '中度' + wName :  warningLists[i].ptsdLevel == 3 ? '重度' + wName : ''
            //     if (level != '') {
            //       levelStr.push(level)
            //     }
            //   }
            //   if (that.violenceFlag == 1) {
            //     let wName = '敌对'
            //     let level = warningLists[i].violenceLevel == 1 ? "轻度" + wName  :  warningLists[i].violenceLevel == 2 ? '中度' + wName :  warningLists[i].violenceLevel == 3 ? '重度' + wName : ''
            //     if (level != '') {
            //       levelStr.push(level)
            //     }
            //   }
            //   if (that.suicideFlag == 1) {
            //     let wName = '自我伤害'
            //     let level = warningLists[i].suicideLevel == 1 ? "轻度" + wName  :  warningLists[i].suicideLevel == 2 ? '中度' + wName :  warningLists[i].suicideLevel == 3 ? '重度' + wName : ''
            //     if (level != '') {
            //       levelStr.push(level)
            //     }
            //   }
            //   warningLists[i].levelStr = levelStr.join('、')
            //   console.log(levelStr)
            //   // console.log(i)
            //   // if (i < 1) {
            //   //   let listLen1 = Math.ceil((warningLists.length - 13) / 23)
            //   //   for (let j = 0; j < listLen1; j++) {
            //   //     list1.push(warningLists.slice(13 + 23 * j, 13 + 23 * (Number(j) + 1)))
            //   //   }
            //   // } else {
            //   //   let listLen1 = Math.ceil((warningLists.length - 14) / 23)
            //   //   for (let j = 0; j < listLen1; j++) {
            //   //     list1.push(warningLists.slice(14 + 23 * j, 14 + 23 * (Number(j) + 1)))
            //   //   }
            //   // }
              
            //   // console.log(list1)
            // }
            // selectedData[u].warningLists = list1 
            // this.warningLists = warningLists
            // console.log(warningLists)
            // let list22 = []
            // let warnLen2 = Math.ceil((warningLists.length - 21) / 23)
            // for (let j = 0; j < warnLen2; j++) {
            //   list22.push(warningLists.slice(21 + 23 * j, 21 + 23 * (Number(j) + 1)))
            // }
            // console.log(list22)
            // this.warnList = list22
            // var wstr = '';
            
            // if (wdArrs[0].perct > 0) {
            //   wstr += '如图所示，在该测评时间段内，各维度风险占比，由高到低，依次为：'
            //   for (let k in wdArrs) {
            //     if (wdArrs[k].perct > 0) {
            //       wstr += wdArrs[k].name + '（' + wdArrs[k].perct + '%）'
            //     } else {
            //       wstr += '无' + wdArrs[k].name + '风险'
            //     }
            //     if (k < wdArrs.length - 1) {
            //       wstr += '、'
            //     } else {
            //       wstr += '。'
            //     }
            //   }
            // } else {
            //   wstr += '如上图所示，在该测评时间段内，未检测出'
            //   for (let k in wdArrs) {
            //     wstr += wdArrs[k].name 
            //     if (k < wdArrs.length - 1) {
            //       wstr += '、'
            //     } else {
            //       wstr += ''
            //     }
            //   }
            //   wstr += '风险人员。'
            // }
            
            // console.log(wstr)
  
            // this.partsStr3 = wstr

            // var wsts = '';
            // if (selectedData[u].pinci) {

            // } else {
            //   selectedData[u].pinci = 0
            // }
            // let evaNump = this.perctInfo(selectedData[u].evaNum / selectedData[u].totalNum)
            // if (evaNump > 49) {
            //   wsts += '1.本机构测评人数占比较高（为' + evaNump + '%），说明本机构人员的心理健康受到重视，后续请继续保持。'
              
            // } else {
            //   wsts += '1.本机构测评人数占比较低（为' + evaNump + '%），相关管理者可多多组织本机构人员参加AI心世界测评，加大对于心理健康的重视。'
            // }
            // console.log(wsts)
            // this.partsStr4 = wsts
            // let wsts2 = ''
            // let flagNums = this.maxCount1(wdArrs)[0]
            // let flagName = this.maxCount1(wdArrs)[1]
            // console.log(flagNums)
            // console.log(flagName)
            // console.log(wdArrs)
            // // 1、若风险占比最高的维度占比≥10%，且占比比例为唯一值，则输出：
            // if (wdArrs[0].perct > 9 && flagNums == 1){
            //   console.log(1115)
            //   wsts2 = '2.系统发现，本机构' + flagName + '风险占比最高（' + wdArrs[0].perct + '%），相关管理者需多关注本机构' + flagName + '情况，有条件的可安排' + flagName + '主题相关讲座和课程；建议对' + flagName + '预警人员进行一对一评估，酌情安排个体咨询或团体辅导，若情况严重建议转介。'
            // }
            // // 21.若风险占比最高的维度占比＜10%，且占比比例不一的维度≥2，则输出：
            // if (wdArrs[0].perct > 9 && flagNums < wdArrs.length && flagNums > 1){
            //   console.log(1113)
            //   wsts2 += '2.系统发现，本机构在'
            //   for ( let i in wdArrs) {
            //     if (wdArrs[i].perct > 9) {
            //       if (i == 0) {
            //         wsts2 += wdArrs[i].name + '(' + wdArrs[i].perct + '%)'
            //       } else {
            //         wsts2 += '、' + wdArrs[i].name + '(' + wdArrs[i].perct + '%)'
            //       }
                  
                 
            //     }
            //   }
            //   wsts2 += '风险占比较高，相关管理者需多关注本机构人员心理健康情况，有条件的可安排相关主题讲座，组织团体活动让受测者放松身心；此外，还建议对预警人员进行一对一评估，酌情安排个体咨询或团体辅导，若情况严重建议转介。'
            // }
            // // 22.若风险占比最高的维度占比≥10%，所有维度占比一致，则输出：
            // if (wdArrs[0].perct > 9 && flagNums == wdArrs.length){
            //   console.log(1114)
            //   wsts2 = '2.系统发现，本机构在' + flagName + '风险维度占比较高（皆为' + wdArrs[0].perct + '%），相关管理者需多关注本机构人员心理健康情况，有条件的可安排相关主题讲座，组织团体活动让受测者放松身心；此外，还建议对预警人员进行一对一评估，酌情安排个体咨询或团体辅导，若情况严重建议转介。'
            // }
            // // 3.若风险占比最高的维度占比＜10%，且占比比例不一的维度≥2，则输出：
            // if (wdArrs[0].perct < 10 && wdArrs[0].perct > 0 && flagNums < wdArrs.length){
            //   console.log(1113)
            //   wsts2 += '2.系统发现，本机构在'
            //   for ( let i in wdArrs) {
            //     if (i == 0) {
            //       wsts2 += wdArrs[i].name + '(' + wdArrs[i].perct + '%)'
            //     } else {
            //       wsts2 += '、' + wdArrs[i].name + '(' + wdArrs[i].perct + '%)'
            //     }
            //   }
            //   wsts2 += '风险占比都不高，说明本机构人员心理健康风险较小，相关管理者可依据实际情况组织积极向上的团体活动，提升团队凝聚力和心理健康水平；此外，还建议对维度预警人员进行一对一评估，酌情安排个体咨询或团体辅导，若情况严重建议转介。'
            // }
            // // 4.若风险占比最高的维度占比＜10%，且所有维度占比一致，则输出：
            // if (wdArrs[0].perct < 10 && wdArrs[0].perct > 0 && flagNums == wdArrs.length){
            //   console.log(1112)
            //   wsts2 = '2.系统发现，本机构在' + flagName + '风险占比都不高（皆为' + wdArrs[0].perct + '%），说明本机构人员心理健康风险较小，相关管理者可依据实际情况组织积极向上的团体活动，提升团队凝聚力和心理健康水平；此外，还建议对维度预警人员进行一对一评估，酌情安排个体咨询或团体辅导，若情况严重建议转介。'
            // }
            // // 5.若风险占比全部为0，则输出：
            // console.log(wdArrs[0] )
            // console.log(wdArrs[0].perct )
            // console.log(wdArrs[0].perct == 0)
            // console.log(wdArrs[0].perct === 0)
            // if (wdArrs[0].perct == 0){
            //   console.log(111)
            //   wsts2 = '2.系统发现，本机构在' + flagName + '风险占比都很低（皆为0%），说明本机构人员心理健康风险较小，相关管理者可依据实际情况组织积极向上的团体活动，提升团队凝聚力和心理健康水平。'
            // }
            // console.log(wsts2)
            // // if (flagNums > 0 && flagNums < 4) {
              
            // // }
            // // if (flagNums > 3) {
            // //   wsts2 = '2.在该测评时间段内，受测者在' + flagName + '维度上预警较多，建议从多方面关注受测者身心状况，如饮食睡眠、人际关系等等；如有必要，还可以建议受测者及时寻求专业的心理咨询服务。'
            // // }
            // // if (flagNums < 1) {
            // //   wsts2 = '2.在该测评时间段内，受测者在各个维度上皆无风险，可进行适当运动、规律饮食等等，维持身心健康。'
            // // }
            
            // console.log(wsts2)
            // this.partsStr5 = wsts2
            // console.log(wdArr)
            // this.wdPerctList = wdArr
            // console.log(this.wdPerctList)
            
            // let ecList = []
            // this.wdPerctList.sort((a, b) => {
            //   return b.perct - a.perct
            // })
            // // return
            // for (let i in this.wdPerctList) {
            //   console.log(this.wdPerctList[i].name)
            //   let name = i < 1 ? '一、' + this.wdPerctList[i].name : i == 1 ? '二、' + this.wdPerctList[i].name : i == 2 ? '三、' + this.wdPerctList[i].name : i == 3 ? '四、' + this.wdPerctList[i].name : i == 4 ? '五、' + this.wdPerctList[i].name : '六、' + this.wdPerctList[i].name
            //   this.wdPerctList[i].names = name
            //   // let info = this.wdPerctList[i].info
            //   // let infos = []
            //   // infos.push({
            //   //   name: name,
            //   //   info: info
            //   // })
            //   // for (let j = 0; j < info.length; j += 20) {
            //   //   // 每次循环中取出原数组的五个元素，并存入新数组
            //   //   infos.push({
            //   //     name: j < 1 ? name : '',
            //   //     list: info.slice(j, j + 20)
            //   //   });
            //   //   ecList.push({
            //   //     name: j < 1 ? this.wdPerctList[i].name : '',
            //   //     color1: this.wdPerctList[i].color1,
            //   //     color2: this.wdPerctList[i].color2,
            //   //     list: info.slice(j, j + 20)
            //   //   })
            //   // }
            //   // this.wdPerctList[i].infos = infos
  
            //   // that.echartInfo(i + 'Z' + that.ecType)
            // }
            // console.log(this.wdPerctList)
            // console.log(ecList)
            // for (let i in ecList) {
            //   this['myChartZhu' + i] = null
            // }
            // this.ecList = ecList
            // setTimeout(() => {
            //   // for (let i in ecList) {
            //   //   // console.log(ecList[i])
            //   //   this.echartInfo('myChartZhu' + i, ecList[i])
            //   // }
            //   this.initChart()
            //   // this.echartsOther()
            // }, 0);
            // 等待每一个转为pdf
            
            console.log(htmlToZip)
            const p = await htmlToZip.getPdfs(
              this.$refs.sprintSchoolPdf,
              selectedData[u].departmentNameA+'&'+selectedData[u].departmentNameB+'-团体对比报告'
            );
            promises.push(p);
          }
          // return
          // this.loading.close();
          // 等到所有的promise执行完成依次压缩到zip中
          Promise.all(promises)
            .then(async pdfs => {
              console.log(pdfs);
              for (let i = 0; i < pdfs.length; i++) {
                const { PDF, name } = pdfs[i];
                // 如果只是导出一个pdf，则导出pdf格式
                if (pdfs.length === 1) {
                  PDF.save(`${name}-${new Date().getTime()}.pdf`);
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
      maxCount(arr1) {
        // 对数组进行排序，从小到大
        let arr = JSON.parse(JSON.stringify(arr1))
        arr.sort((a, b) => a.num - b.num);
        
        // 最大数字的出现次数
        let maxCount = 0;
        let maxStr = []
        console.log(arr)
        // 遍历数组，计算最大数字的出现次数
        let currentMax = arr[arr.length - 1].num;
        console.log(currentMax)
        if (currentMax > 0) {
          for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].num === currentMax) {
              maxCount++;
              maxStr.push(arr[i].name)
            } else {
              break;
            }
          }
          return [maxCount, maxStr.join('、')];
        } else {
          return [0, ''];
        }
        
      },
      maxCount1(arr1) {
        let arr = JSON.parse(JSON.stringify(arr1))
        // 对数组进行排序，从小到大
        arr.sort((a, b) => a.perct - b.perct);
        
        // 最大数字的出现次数
        let maxCount = 0;
        let maxStr = []
        console.log(arr)
        // 遍历数组，计算最大数字的出现次数
        let currentMax = arr[arr.length - 1].perct;
        console.log(currentMax)
        if (currentMax > 0) {
          for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].perct === currentMax) {
              maxCount++;
              maxStr.push(arr[i].name)
            } else {
              break;
            }
          }
          return [maxCount, maxStr.reverse().join('、')];
        } else {
          for (let i = arr.length - 1; i >= 0; i--) {
            maxStr.push(arr[i].name)
          }
          return [0, maxStr.reverse().join('、')];
        }
        
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
      width: 520px;
      height: 180px;
    }
    .table-classd {
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
        .gp_titles{
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
            line-height: 48px;
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
                font-size: 20px;
                color: #333E75;
                height: 100%;
                line-height: 1.2;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: 1px solid #A6ACCC;
                padding: 0 5px;
                flex: 1
              }
              div:nth-child(1) {
                flex: 2
              }
              div:nth-child(3) {
                // width: 100px;
              }
              div:nth-child(4) {
                // width: 100px;
              }
              div:nth-child(5) {
                // width: 120px;
              }
              div:nth-child(6) {
                flex: 1;
                border: 0;
                overflow: hidden;
              }
              // div:nth-child(7) {
              
              // }
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
          
        }
        .gp_all_tips{
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          bottom: 20px;
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
      .g1_top3{
        margin: 300px auto 0;
        div{
          text-align: center;
          font-size: 48px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333E75;
          line-height: 72px;
        }
      }
      .g1_top2{
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 200px;
        div{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 28px;
          color: #333E75;
          line-height: 60px;
          margin: 0 auto;
          width: 620px;
          text-align: left;
          display: flex;
          span{
            width: 480px !important;
            display: block;
          }
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
      .gp_echart_box{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 630px;
        margin-top: -150px;
        .gp_echart{
          width: 100%;
          height: auto;
          // padding: 30px 0;
          // background: #00a5ff;
          position: relative;
          // margin-bottom: -10px;
          transform: scale(0.6);
          position: absolute;
          left: -340px;
          .gp_ec_txt{
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            font-size: 46px;
            color: #333E75;
            line-height: 1;
            margin: 70px 0 60px;
            margin-left: 210px;
          }
          .gp_ect_3d{
            margin: -100px auto 0;
            width: 950px;
            height: 640px;
            // background: #5e6c87;
            .myChartPie{
              width: 950px;
              height: 550px;
            }
            .center_pie{
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              width: 70%;
              justify-content: flex-start;
              margin: 0 auto;
              flex-wrap: wrap;
              margin-left: 210px;
              margin-top: 30px;
              .c_pie_li {
                padding: 0;
                font-size: 32px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #354b70;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-right: 20px;
                min-width: 26%;
                padding: 20px 0 0;
                .c_pie_th {
                  display: inline-block;
                  width: 15px;
                  height: 15px;
                  margin-right: 8px;
                  border-radius: 50%;
                }
                .c_th_txt {
                  display: flex;
                  align-items: center;
                  font-size: 32px;
                }
                .c_th_p {
                  padding-left: 4px;
                  font-size: 32px;
                }
              }
            }
          }
          .gp_ect_2d{
            position: absolute;
            right: 20px;
            bottom: 60px;
            width: 200px;
            height: 200px;
            // background: #2A3487;
            .myChartYes{
              width: 200px;
              height: 200px;
            }
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
        .gp_txt{
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          font-size: 24px;
          color: #333E75;
          line-height: 48px;
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
            position: relative;
            div{
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 20px;
              color: #333E75;
              height: 100%;
              line-height: 1.2;
              display: flex;
              justify-content: center;
              align-items: center;
              border-right: 1px solid #A6ACCC;
              padding: 0 5px;
              flex: 1
            }
            .gp_con_a{
              position: absolute;
              width: 25%;
              height: 236px;
              left: 0;
              top: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1;
              background: #fff;
            }
            // div:nth-child(1) {
            //   width: 60px;
            // }
            // div:nth-child(2) {
            //   width: 180px;
            // }
            // div:nth-child(3) {
            //   width: 100px;
            // }
            // div:nth-child(8) {
            //   flex: 1;
            //   border: 0;
            //   overflow: hidden;
            // }
          }
          .gp_con1{
            div{
              font-weight: 600;
            }
          }
        }
        .gp_head1{
          padding: 16px 0 8px;
          font-size: 24px;
          color: #333E75;
          line-height: 28px;
        }
        .gp_h_box{
          display: flex;
          .gp_h_bt{
            flex: 1;
            padding-left: 24px;
            .gp_c_box{
              // margin-bottom: 14px;
            }
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
              .gp_c_bt1{
                display: flex;
                font-family: SourceHanSansCN, SourceHanSansCN;
                font-weight: 400;
                font-size: 18px;
                color: #333E75;
                align-items: center;
                .gp_c1{
                  width: 8px;
                  height: 8px;
                  background: linear-gradient(127deg, #87C9FF 0%, #AFECFF 100%);
                  border-radius: 50%;
                  margin-right: 5px;
                }
              }
              .gp_c_bt2{
                display: flex;
                justify-content: space-between;
                padding: 0 50px 0 13px;
                div{
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 400;
                  font-size: 18px;
                  color: #333E75;
                }
              }
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
  