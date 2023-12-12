<template>
  <div class="review_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/library/heart' }"
            >心理档案</el-breadcrumb-item
          >
          <el-breadcrumb-item>查看心理档案</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="search_form_box">
      <div class="search_title center_o_title">
        历史箱庭评估信息
      </div>
      <div class="tables_box">
        <template>
          <el-table
            border
            :data="tableData"
            style="width: 100%"
            @sort-change="sortChange"
          >
            <!-- <el-table-column prop="index" width="80" label="序号">
            </el-table-column> -->
            <el-table-column prop="date" label="评估时间"> </el-table-column>
            <el-table-column prop="evaNum" label="第几次箱庭评估">
            </el-table-column>
            <el-table-column prop="evaTime" label="所用时长"> </el-table-column>
            <el-table-column prop="warning" label="评估结果">
              <template slot-scope="scope">
                <div class="primary_g primary_r0" v-if="scope.row.warning == 0">
                  <img class="primary_g_img" src="../../assets/images/index0.png" alt="">
                  <!-- <el-button type="primary" plain size="small">正常</el-button> -->
                </div>
                <div class="primary_r primary_r1" v-if="scope.row.warning == 1">
                  <img class="primary_g_img" src="../../assets/images/index1.png" alt="">
                  <!-- <el-button type="danger" plain size="small">轻度预警</el-button> -->
                </div>
                <div class="primary_r primary_r2" v-if="scope.row.warning == 2">
                  <img class="primary_g_img" src="../../assets/images/index2.png" alt="">
                  <!-- <el-button type="danger" plain size="small">中度预警</el-button> -->
                </div>
                <div class="primary_r primary_r3" v-if="scope.row.warning == 3">
                  <img class="primary_g_img" src="../../assets/images/index3.png" alt="">
                  <!-- <el-button type="danger" plain size="small">重度预警</el-button> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="tipsName" label="类型">
              <template slot-scope="scope">
                <span v-html="scope.row.tipsName"></span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span v-if="!power1">暂无权限</span>
                <el-button v-if="power1" @click="toDetail(scope.row)" type="text" size="small"
                  >查看测评报告</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- <div class="table_page">
          <div class="page_total">
            共 <span>{{ total }}</span> 条
          </div>
        </div> -->
        <div class="table_page">
          <div class="page_total">
            共 <span>{{ total }}</span> 条 , 第
            <span>{{ currentPage }}/{{ pageNum }}</span> 页
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="search_form_box trand_box">
      <div class="search_title center_o_title">
        变化趋势分析
      </div>
      <div class="trand_bottom">
        <div class="tab_box">
          <div
            :class="[
              'tab_btns tab_btns_l tab_btns_c',
              { tab_act: tabActive == 1 }
            ]"
            @click="tabChange(1)"
          >
            最近三次
          </div>
          <div
            :class="[
              'tab_btns tab_btns_z tab_btns_c',
              { tab_act: tabActive == 2 }
            ]"
            @click="tabChange(2)"
          >
            近半年
          </div>
          <div
            :class="[
              'tab_btns tab_btns_z tab_btns_c',
              { tab_act: tabActive == 3 }
            ]"
            @click="tabChange(3)"
          >
            近一年
          </div>
          <div
            :class="['tab_btns', { tab_act: tabActive == 4 }]"
            @click="tabChange(4)"
          >
            全部
          </div>
        </div>
        <el-form
          :inline="true"
          ref="formSearchVs"
          :model="formSearchVs"
          class="search_form"
        >
          <el-form-item label="添加对比:" prop="star">
            <el-select
              v-model="formSearchVs.star"
              @change="choseStar"
              placeholder="全部"
            >
              <el-option
                v-for="item in starData"
                :key="item.reportId"
                :label="'第' + item.evaNum + '次'"
                :value="item.reportId"
              ></el-option>
            </el-select>
          </el-form-item>
          <img src="../../assets/images/VS.png" alt="" />
          <el-form-item label="" prop="end" class="numCount">
            <el-select
              v-model="formSearchVs.end"
              @change="choseEnd"
              placeholder="全部"
            >
              <el-option
                v-for="item in endData"
                :key="item.reportId"
                :label="'第' + item.evaNum + '次'"
                :value="item.reportId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button
              type="primary"
              class="resets"
              @click="resetForm('formSearchVs')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="review_trend">
        <div class="r_trend_l">
          <div
            :class="[
              'r_t_tab',
              { r_t_tab_act1: trendAct == 1 },
              { r_t_b0: trendAct == 2 }
            ]"
            @click="trendTab(1)"
          >
            <img src="../../assets/images/total.png" alt="" />
            <span>综合趋势分析</span>
          </div>
          <div
            :class="['r_t_tab', { r_t_tab_act2: trendAct == 2 }]"
            @click="trendTab(2)"
          >
            <img src="../../assets/images/trend.png" alt="" />
            <span>指标趋势分析</span>
          </div>
        </div>
        <div class="r_trend_r">
          <div class="rtr_box" v-show="trendAct == 1">
            <div class="rtr_tle">综合趋势分析</div>
            <div class="myChartZhe1" id="myChartZhe1" ref="myChartZhe1"></div>
            <div class="rtr_ul">
              <ul>
                <li v-if="anxietyFlag == 1"><span class="r_cir1"></span>焦虑</li>
                <li v-if="depressionFlag == 1"><span class="r_cir2"></span>抑郁</li>
                <li v-if="forcedFlag == 1"><span class="r_cir3"></span>强迫</li>
                <li v-if="suicideFlag == 1"><span class="r_cir4"></span>PTSD</li>
                <li v-if="violenceFlag == 1"><span class="r_cir5"></span>心理韧性</li>
                <li><span class="r_line1"></span>预警线</li>
              </ul>
            </div>
          </div>
          <div class="rtr_box rtr_boxs" v-show="trendAct == 2">
            <div class="rtr_tle">
              指标趋势分析
              <div class="rtr_tabs_bx">
                <ul>
                  <li
                    :class="['rsb_yab', { sb_tab1: sbAct == 1 }]"
                    @click="sbTab(1)"
                  >
                    全部
                  </li>
                  <li
                    v-if="depressionFlag == 1"
                    :class="[
                      'rsb_yab',
                      { sb_tab10: sbAct == 1 },
                      { sb_tab1: sbAct == 2 }
                    ]"
                    @click="sbTab(2)"
                  >
                    抑郁
                  </li>
                  <li
                    v-if="anxietyFlag == 1"
                    :class="[
                      'rsb_yab',
                      { sb_tab10: sbAct == 2 },
                      { sb_tab1: sbAct == 3 }
                    ]"
                    @click="sbTab(3)"
                  >
                    焦虑
                  </li>
                  <li
                    v-if="forcedFlag == 1"
                    :class="[
                      'rsb_yab',
                      { sb_tab10: sbAct == 3 },
                      { sb_tab1: sbAct == 4 }
                    ]"
                    @click="sbTab(4)"
                  >
                    强迫
                  </li>
                  <li
                    v-if="suicideFlag == 1"
                    :class="[
                      'rsb_yab',
                      { sb_tab10: sbAct == 4 },
                      { sb_tab1: sbAct == 5 }
                    ]"
                    @click="sbTab(5)"
                  >
                    PTSD
                  </li>
                  <li
                    v-if="violenceFlag == 1"
                    :class="[
                      'rsb_yab',
                      { sb_tab10: sbAct == 5 },
                      { sb_tab1: sbAct == 6 }
                    ]"
                    @click="sbTab(6)"
                  >
                    心理韧性
                  </li>
                </ul>
              </div>
            </div>
            <div v-show="depressionFlag == 1">
              <div class="com_titles" v-show="sbAct == 1 || sbAct == 2">
                <div class="c_titless">
                  <img src="../../assets/images/rgimg.png" alt="" />
                  抑郁
                </div>
              </div>
              <div
                class="myChartZhe2"
                v-show="sbAct == 1 || sbAct == 2"
                id="myChartZhe2"
                ref="myChartZhe2"
              ></div>
              <div class="rtr_ul" v-show="sbAct == 1 || sbAct == 2">
                <ul v-if="chartData.length > 0">
                  <li><span class="r_cir1"></span>{{chartData[0].depressionSubScore[0].name}}</li>
                  <li><span class="r_cir3"></span>{{chartData[0].depressionSubScore[1].name}}</li>
                  <li><span class="r_cir2"></span>{{chartData[0].depressionSubScore[2].name}}</li>
                  <li><span class="r_line2"></span>抑郁水平</li>
                </ul>
              </div>
            </div>
            <div v-show="anxietyFlag == 1">
              <div class="com_titles" v-show="sbAct == 1 || sbAct == 3">
                <div class="c_titless">
                  <img src="../../assets/images/nlimg.png" alt="" />
                  焦虑
                </div>
              </div>
              <div
                class="myChartZhe3"
                v-show="sbAct == 1 || sbAct == 3"
                id="myChartZhe3"
                ref="myChartZhe3"
              ></div>
              <div class="rtr_ul" v-show="sbAct == 1 || sbAct == 3">
                <ul v-if="chartData.length > 0">
                  <li><span class="r_cir1"></span>{{chartData[0].anxietySubScore[0].name}}</li>
                  <li><span class="r_cir3"></span>{{chartData[0].anxietySubScore[1].name}}</li>
                  <li><span class="r_cir2"></span>{{chartData[0].anxietySubScore[2].name}}</li>
                  <li><span class="r_line2"></span>焦虑水平</li>
                </ul>
              </div>
            </div>
            <div v-show="forcedFlag == 1">
              <div class="com_titles" v-show="sbAct == 1 || sbAct == 4">
                <div class="c_titless">
                  <img src="../../assets/images/jksp.png" alt="" />
                  强迫
                </div>
              </div>
              <div
                class="myChartZhe4"
                v-show="sbAct == 1 || sbAct == 4"
                id="myChartZhe4"
                ref="myChartZhe4"
              ></div>
              <div class="rtr_ul" v-show="sbAct == 1 || sbAct == 4">
                <ul v-if="chartData.length > 0">
                  <li><span class="r_cir1"></span>{{chartData[0].forcedSubScore[0].name}}</li>
                  <li><span class="r_cir3"></span>{{chartData[0].forcedSubScore[1].name}}</li>
                  <li><span class="r_cir2"></span>{{chartData[0].forcedSubScore[2].name}}</li>
                  <li><span class="r_line2"></span>强迫水平</li>
                </ul>
              </div>
            </div>
            <div v-show="suicideFlag == 1">
              <div class="com_titles" v-show="sbAct == 1 || sbAct == 5">
                <div class="c_titless">
                  <img style="width:0.33rem" src="../../assets/images/report/f_icon2.png" alt="" />
                  PTSD
                </div>
              </div>
              <div
                class="myChartZhe4"
                v-show="sbAct == 1 || sbAct == 5"
                id="myChartZhe5"
                ref="myChartZhe5"
              ></div>
              <div class="rtr_ul" v-show="sbAct == 1 || sbAct == 5">
                <ul v-if="chartData.length > 0">
                  <li><span class="r_cir1"></span>{{chartData[0].suicideSubScore[0].name}}</li>
                  <li><span class="r_cir3"></span>{{chartData[0].suicideSubScore[1].name}}</li>
                  <li><span class="r_cir2"></span>{{chartData[0].suicideSubScore[2].name}}</li>
                  <li><span class="r_line2"></span>PTSD水平</li>
                </ul>
              </div>
            </div>
            <div v-show="violenceFlag == 1">
              <div class="com_titles" v-show="sbAct == 1 || sbAct == 6">
                <div class="c_titless">
                  <img style="width:0.32rem" src="../../assets/images/report/f_icon1.png" alt="" />
                  心理韧性
                </div>
              </div>
              <div
                class="myChartZhe4"
                v-show="sbAct == 1 || sbAct == 6"
                id="myChartZhe6"
                ref="myChartZhe6"
              ></div>
              <div class="rtr_ul" v-show="sbAct == 1 || sbAct == 6">
                <ul v-if="chartData.length > 0">
                  <li><span class="r_cir1"></span>{{chartData[0].violenceSubScore[0].name}}</li>
                  <li><span class="r_cir3"></span>{{chartData[0].violenceSubScore[1].name}}</li>
                  <li><span class="r_cir2"></span>{{chartData[0].violenceSubScore[2].name}}</li>
                  <li><span class="r_line2"></span>心理韧性水平</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "../../assets/js/echarts";
import Url from "@/assets/js/url.js";
let reviewDada = [];
var fuluList = [];
export default {
  name: "report",
  data() {
    return {
      power1: false,
      sbAct: 1,
      trendAct: 1,
      tabActive: 1,
      limit: 10,
      total: 0,
      pageNum: 1,
      currentPage: 1,
      formSearchR: {
        time: "",
        name: "",
        number: "",
        sex: "",
        class: "",
        status: ""
      },
      formSearchVs: {
        star: "",
        end: ""
      },
      sectionList: [],
      tableData: [],
      myChartZhe1: "",
      myChartZhe2: "",
      myChartZhe3: "",
      myChartZhe4: "",
      myChartZhe5: "",
      myChartZhe6: "",
      passport: "",
      chartData: [],
      starData: [],
      endData: [],
      depressionFlag: 1,
      anxietyFlag: 1,
      forcedFlag: 1,
      suicideFlag: 0,
      violenceFlag: 0,
      personalityFlag: 0
    };
  },
  created() {

  },
  mounted() {
    this.passport = this.$route.params.userID;
    this.powerData()
    this.getList(1);
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.myChartZhe1.resize();
        this.myChartZhe2.resize();
        this.myChartZhe3.resize();
        this.myChartZhe4.resize();
        this.myChartZhe5.resize();
        this.myChartZhe6.resize();
      }, 100);
    });
  },
  methods: {
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = this.pagination(val, this.limit, fuluList);
    },
    powerData() {
      let algTypes = JSON.parse(localStorage.getItem("algTypes"));
      // 是否显示抑郁
      this.depressionFlag = algTypes.depression
      // 是否显示焦虑
      this.anxietyFlag = algTypes.anxiety
      // 是否显示强迫
      this.forcedFlag = algTypes.forced
      // 是否显示PTSD
      this.suicideFlag = algTypes.suicide
      // 是否显示心理韧性
      this.violenceFlag = algTypes.violence
      // 是否显示人格
      this.personalityFlag = algTypes.personality
      //
      // this.depressionFlag = 1
      // this.anxietyFlag = 1
      // this.forcedFlag = 1
      // this.suicideFlag = 0
      // this.violenceFlag = 1
      // this.personalityFlag = 0
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power1 = power.includes(30103); // 心理档案--查看
    },
    isService(val) {
      let routeData = this.$router.resolve({
        name: "detailsreport",
        params: { userID: val.reportId }
      });
      window.open(routeData.href, "_blank");
    },
    toDetail(data) {
      localStorage.setItem("openReport", data.reportId);
      this.isService(data);
    },
    choseStar() {
      let starArr = [];
      for (let i in reviewDada) {
        if (reviewDada[i].reportId != this.formSearchVs.star) {
          starArr.push(reviewDada[i]);
        }
      }
      this.endData = starArr;
    },
    choseEnd() {
      let endArr = [];
      for (let i in reviewDada) {
        if (reviewDada[i].reportId != this.formSearchVs.end) {
          endArr.push(reviewDada[i]);
        }
      }
      this.starData = endArr;
    },
    choseYear() {
      let that = this;
      if (that.formSearchR.time.length == 0) {
        that.tableData = reviewDada;
      } else {
        let fuckArr = [];
        for (let i in reviewDada) {
          if (
            new Date(that.formSearchR.time[0]).getTime() < new Date(reviewDada[i].date).getTime() &&
            new Date(reviewDada[i].date).getTime() < new Date(that.formSearchR.time[1]).getTime()
          ) {
            fuckArr.push(reviewDada[i]);
          }
        }
        that.tableData = fuckArr;
      }
      // this.myChartZhe1s();
      // this.myChartZhe2s();
      // this.myChartZhe3s();
      // this.myChartZhe4s();
    },
    getList(page) {
      let that = this;

      this.currentPage = page;
      let param = {
        currentPage: page,
        pageSize: that.limit,
        passport: that.passport
      };
      this.$http
        .get(Url + "/aimw/mentalFile/mentalFileInfo", {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data.data) {
              for (let i in data.data) {
                let tipsNames = "/";
                let tipsNames0 = "";
                let tipsArr = [];
                // data.data[i].depressionScore.score = 1
                // data.data[i].anxietyScore.score = 1
                // data.data[i].forcedScore.score = 1
                // data.data[i].suicideScore.score = 
                if (this.depressionFlag == 1) {
                  if (
                    data.data[i].depressionScore.score > 2
                  ) {
                    tipsArr.push("抑郁");
                  }
                }
                if (this.anxietyFlag == 1) {
                  if (
                    data.data[i].anxietyScore.score > 2
                  ) {
                    tipsArr.push("焦虑");
                  }
                }
                if (this.forcedFlag == 1) {
                  if (
                    data.data[i].forcedScore.score > 2
                  ) {
                    tipsArr.push("强迫");
                  }
                }
                
                // if (this.violenceFlag == 1) {
                //   if (
                //     data.data[i].violenceScore.score > 2
                //   ) {
                //     tipsArr.push("心理韧性");
                //   }
                // }
                if (tipsArr.length > 0) {
                  tipsNames0 = tipsArr.join("、") + "水平高";
                }
                let tipsNames1 = ''
                let tipsArr1 = [];
                if (this.suicideFlag == 1) {
                  if (
                    data.data[i].suicideScore.score > 2
                  ) {
                    tipsArr1.push("PTSD");
                  }
                }
                if (tipsArr1.length > 0) {
                  tipsNames1 = tipsArr1.join("、") + "有风险";
                }
                if (tipsNames0 == '' && tipsNames1 == '') {
                  tipsNames = '/'
                } else {
                  let brs =  (tipsNames0 != '' && tipsNames1 != '') ? '<br>' : ''
                  tipsNames = tipsNames0 + brs + tipsNames1
                }
                data.data[i].dateCount = data.data[i].date.split(' ')[0] + " 第" + data.data[i].evaNum + "次";
                data.data[i].evaTime = that.toHHmmss(data.data[i].evaTime * 1000);
                data.data[i].tipsName = tipsNames;
              }
              let sArr = data.data;
              for (let i in data.data) {
                data.data[i].index = Number(i) + 1
              }
              fuluList = JSON.parse(JSON.stringify(data.data));
              console.log(fuluList)
              that.total = fuluList.length;
              that.tableData = this.pagination(1, this.limit, fuluList);
              that.pageNum = fuluList.length == 0 ? 1 : Math.ceil(fuluList.length / that.limit);
              reviewDada = data.data;
              that.chartData = data.data.slice(0, 3);
              that.starData = data.data;
              that.endData = data.data;
              this.myChartZhe1s();
              this.myChartZhe2s();
              this.myChartZhe3s();
              this.myChartZhe4s();
              this.myChartZhe5s();
              this.myChartZhe6s();
            } else {
              that.tableData = [];
              that.total = 0;
              that.pageNum = 1;
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    toHHmmss(data) {
      var s;
      var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.round((data % (1000 * 60)) / 1000);
      s =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      return s;
    },
    timestampToTime(timestamp) {
      var date = new Date(Number(611811142109107));
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    sbTab(type) {
      this.sbAct = type;
    },
    trendTab(type) {
      this.trendAct = type;
      this.myChartZhe1s();
      this.myChartZhe2s();
      this.myChartZhe3s();
      this.myChartZhe4s();
      this.myChartZhe5s();
      this.myChartZhe6s();
    },
    myChartZhe1s() {
      let that = this;
      let xArr = [];
      let yArr = [];
      let jArr = [];
      let qArr = [];
      let zArr = [];
      let bArr = [];
      let lArr = [];
      for (let i in that.chartData) {
        xArr.push(that.chartData[i].dateCount);
        yArr.push(that.chartData[i].depressionScore.score);
        jArr.push(that.chartData[i].anxietyScore.score);
        qArr.push(that.chartData[i].forcedScore.score);
        zArr.push(that.chartData[i].suicideScore.score);
        bArr.push(that.chartData[i].violenceScore.score);
        lArr.push(that.chartData[i].forcedScore.thre);
      }
      let serseArr = []
      if (this.anxietyFlag == 1) {
        serseArr.push({
          name: "焦虑",
          type: "bar",
          // barWidth: 16,
          barMaxWidth: 16,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#0075ff" },
              { offset: 1, color: "#00c2ff" }
            ])
          },
          data: jArr
        })
      }
      if (this.depressionFlag == 1) {
        serseArr.push({
          name: "抑郁",
          type: "bar",
          // barWidth: 16,
          barMaxWidth: 16,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#FE5FB8" },
              { offset: 1, color: "#ff83df" }
            ])
          },
          data: yArr
        })
      }
      if (this.forcedFlag == 1) {
        serseArr.push({
          name: "强迫",
          type: "bar",
          // barWidth: 16,
          barMaxWidth: 16,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#c4c8ff" },
              { offset: 1, color: "#7279ff" }
            ])
          },
          data: qArr
        })
      }
      if (this.suicideFlag == 1) {
        serseArr.push({
          name: "PTSD",
          type: "bar",
          // barWidth: 16,
          barMaxWidth: 16,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#00D8FF" },
              { offset: 1, color: "#46F7CB" }
            ])
          },
          data: zArr
        })
      }
      if (this.violenceFlag == 1) {
        serseArr.push({
          name: "心理韧性",
          type: "bar",
          // barWidth: 16,
          barMaxWidth: 16,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#FFE792" },
              { offset: 1, color: "#FFC90C" }
            ])
          },
          data: bArr
        })
      }
      let markLine = {
        symbol: "none",
        lineStyle: {
          normal: {
            color: "#006cff"
          }
        },
        data: [
          {
            yAxis: 3,
            name: "",
            lineStyle: {
              type: "dashed",
              color: "#FF77C3",
              width: 1
            },
            label: {
              position: "end",
              fontSize: 12,
              formatter: "",
              color: "#FF77C3"
            }
          }
        ]
      }
      serseArr[0].markLine = markLine
      this.myChartZhe1 = echarts.init(this.$refs.myChartZhe1);
      this.myChartZhe1.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          left: "0",
          top: "30",
          right: "60",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xArr,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: {
          type: "value",
          name: "",
          min: 0,
          max: 10,
          interval: 2,
          axisLabel: {
            formatter: "{value}"
          },
          minInterval: 1
        },
        series: serseArr
      });
    },
    myChartZhe2s() {
      let that = this;
      let xArr = [];
      let yArr = [];
      let jArr = [];
      let qArr = [];
      let lArr = [];
      for (let i in that.chartData) {
        xArr.push(that.chartData[i].dateCount);
        yArr.push(that.chartData[i].depressionSubScore[0].score);
        jArr.push(that.chartData[i].depressionSubScore[1].score);
        qArr.push(that.chartData[i].depressionSubScore[2].score);
        lArr.push(that.chartData[i].depressionScore.score);
      }
      this.myChartZhe2 = echarts.init(this.$refs.myChartZhe2);
      this.myChartZhe2.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          left: "0",
          top: "30",
          right: "60",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xArr,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: ""
            }
          }
        ],
        series: [
          {
            name: that.chartData[0].depressionSubScore[0].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00c2ff" },
                { offset: 1, color: "#0075ff" }
              ])
            },
            data: yArr,
            markLine: {
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "#006cff"
                }
              },
              data: [
                {
                  yAxis: lArr[0],
                  name: "",
                  lineStyle: {
                    type: "solid",
                    color: lArr.length == 1 ? "#ffbf0a" : "transparent",
                    width: 1
                  },
                  label: {
                    position: "end",
                    fontSize: 12,
                    formatter: "",
                    color: "#FF77C3"
                  }
                }
              ]
            }
          },
          {
            name: that.chartData[0].depressionSubScore[1].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#c4c8ff" },
                { offset: 1, color: "#7279ff" }
              ])
            },
            data: jArr
          },
          {
            name: that.chartData[0].depressionSubScore[2].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff83df" },
                { offset: 1, color: "#FE5FB8" }
              ])
            },
            data: qArr
          },
          {
            name: "抑郁水平",
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFC90C" },
                { offset: 0.33, color: "#FFA87E" },
                { offset: 0.66, color: "#FFDE6B" },
                { offset: 1, color: "#FFC600" }
              ])
            },
            data: lArr
          }
        ]
      });
    },
    myChartZhe3s() {
      let that = this;
      let xArr = [];
      let yArr = [];
      let jArr = [];
      let qArr = [];
      let lArr = [];
      for (let i in that.chartData) {
        xArr.push(that.chartData[i].dateCount);
        yArr.push(that.chartData[i].anxietySubScore[0].score);
        jArr.push(that.chartData[i].anxietySubScore[1].score);
        qArr.push(that.chartData[i].anxietySubScore[2].score);
        lArr.push(that.chartData[i].anxietyScore.score);
      }
      this.myChartZhe3 = echarts.init(this.$refs.myChartZhe3);
      this.myChartZhe3.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          left: "0",
          top: "30",
          right: "60",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xArr,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: ""
            }
          }
        ],
        series: [
          {
            name: that.chartData[0].anxietySubScore[0].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00c2ff" },
                { offset: 1, color: "#0075ff" }
              ])
            },
            data: yArr,
            markLine: {
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "#006cff"
                }
              },
              data: [
                {
                  yAxis: lArr[0],
                  name: "",
                  lineStyle: {
                    type: "solid",
                    color: lArr.length == 1 ? "#ffbf0a" : "transparent",
                    width: 1
                  },
                  label: {
                    position: "end",
                    fontSize: 12,
                    formatter: "",
                    color: "#FF77C3"
                  }
                }
              ]
            }
          },
          {
            name: that.chartData[0].anxietySubScore[1].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#c4c8ff" },
                { offset: 1, color: "#7279ff" }
              ])
            },
            data: jArr
          },
          {
            name: that.chartData[0].anxietySubScore[2].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff83df" },
                { offset: 1, color: "#FE5FB8" }
              ])
            },
            data: qArr
          },
          {
            name: "焦虑水平",
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFC90C" },
                { offset: 0.33, color: "#FFA87E" },
                { offset: 0.66, color: "#FFDE6B" },
                { offset: 1, color: "#FFC600" }
              ])
            },
            data: lArr
          }
        ]
      });
    },
    myChartZhe4s() {
      let that = this;
      let xArr = [];
      let yArr = [];
      let jArr = [];
      let qArr = [];
      let lArr = [];
      for (let i in that.chartData) {
        xArr.push(that.chartData[i].dateCount);
        yArr.push(that.chartData[i].forcedSubScore[0].score);
        jArr.push(that.chartData[i].forcedSubScore[1].score);
        qArr.push(that.chartData[i].forcedSubScore[2].score);
        lArr.push(that.chartData[i].forcedScore.score);
      }
      this.myChartZhe4 = echarts.init(this.$refs.myChartZhe4);
      this.myChartZhe4.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          left: "0",
          top: "30",
          right: "60",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xArr,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: ""
            }
          }
        ],
        series: [
          {
            name: that.chartData[0].forcedSubScore[0].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00c2ff" },
                { offset: 1, color: "#0075ff" }
              ])
            },
            data: yArr,
            markLine: {
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "#006cff"
                }
              },
              data: [
                {
                  yAxis: lArr[0],
                  name: "",
                  lineStyle: {
                    type: "solid",
                    color: lArr.length == 1 ? "#ffbf0a" : "transparent",
                    width: 1
                  },
                  label: {
                    position: "end",
                    fontSize: 12,
                    formatter: "",
                    color: "#FF77C3"
                  }
                }
              ]
            }
          },
          {
            name: that.chartData[0].forcedSubScore[1].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#c4c8ff" },
                { offset: 1, color: "#7279ff" }
              ])
            },
            data: jArr
          },
          {
            name: that.chartData[0].forcedSubScore[2].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff83df" },
                { offset: 1, color: "#FE5FB8" }
              ])
            },
            data: qArr
          },
          {
            name: "强迫水平",
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFC90C" },
                { offset: 0.33, color: "#FFA87E" },
                { offset: 0.66, color: "#FFDE6B" },
                { offset: 1, color: "#FFC600" }
              ])
            },
            data: lArr
          }
        ]
      });
    },
    myChartZhe5s() {
      let that = this;
      let xArr = [];
      let yArr = [];
      let jArr = [];
      let qArr = [];
      let lArr = [];
      for (let i in that.chartData) {
        xArr.push(that.chartData[i].dateCount);
        yArr.push(that.chartData[i].suicideSubScore[0].score);
        jArr.push(that.chartData[i].suicideSubScore[1].score);
        qArr.push(that.chartData[i].suicideSubScore[2].score);
        lArr.push(that.chartData[i].suicideScore.score);
      }
      this.myChartZhe5 = echarts.init(this.$refs.myChartZhe5);
      this.myChartZhe5.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          left: "0",
          top: "30",
          right: "60",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xArr,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: ""
            }
          }
        ],
        series: [
          {
            name: that.chartData[0].suicideSubScore[0].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00c2ff" },
                { offset: 1, color: "#0075ff" }
              ])
            },
            data: yArr,
            markLine: {
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "#006cff"
                }
              },
              data: [
                {
                  yAxis: lArr[0],
                  name: "",
                  lineStyle: {
                    type: "solid",
                    color: lArr.length == 1 ? "#ffbf0a" : "transparent",
                    width: 1
                  },
                  label: {
                    position: "end",
                    fontSize: 12,
                    formatter: "",
                    color: "#FF77C3"
                  }
                }
              ]
            }
          },
          {
            name: that.chartData[0].suicideSubScore[1].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#c4c8ff" },
                { offset: 1, color: "#7279ff" }
              ])
            },
            data: jArr
          },
          {
            name: that.chartData[0].suicideSubScore[2].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff83df" },
                { offset: 1, color: "#FE5FB8" }
              ])
            },
            data: qArr
          },
          {
            name: "PTSD水平",
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFC90C" },
                { offset: 0.33, color: "#FFA87E" },
                { offset: 0.66, color: "#FFDE6B" },
                { offset: 1, color: "#FFC600" }
              ])
            },
            data: lArr
          }
        ]
      });
    },
    myChartZhe6s() {
      let that = this;
      let xArr = [];
      let yArr = [];
      let jArr = [];
      let qArr = [];
      let lArr = [];
      for (let i in that.chartData) {
        xArr.push(that.chartData[i].dateCount);
        yArr.push(that.chartData[i].violenceSubScore[0].score);
        jArr.push(that.chartData[i].violenceSubScore[1].score);
        qArr.push(that.chartData[i].violenceSubScore[2].score);
        lArr.push(that.chartData[i].violenceScore.score);
      }
      this.myChartZhe6 = echarts.init(this.$refs.myChartZhe6);
      this.myChartZhe6.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          left: "0",
          top: "30",
          right: "60",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xArr,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: ""
            }
          }
        ],
        series: [
          {
            name: that.chartData[0].violenceSubScore[0].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00c2ff" },
                { offset: 1, color: "#0075ff" }
              ])
            },
            data: yArr,
            markLine: {
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "#006cff"
                }
              },
              data: [
                {
                  yAxis: lArr[0],
                  name: "",
                  lineStyle: {
                    type: "solid",
                    color: lArr.length == 1 ? "#ffbf0a" : "transparent",
                    width: 1
                  },
                  label: {
                    position: "end",
                    fontSize: 12,
                    formatter: "",
                    color: "#FF77C3"
                  }
                }
              ]
            }
          },
          {
            name: that.chartData[0].violenceSubScore[1].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#c4c8ff" },
                { offset: 1, color: "#7279ff" }
              ])
            },
            data: jArr
          },
          {
            name: that.chartData[0].violenceSubScore[2].name,
            type: "bar",
            // barWidth: 16,
            barMaxWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff83df" },
                { offset: 1, color: "#FE5FB8" }
              ])
            },
            data: qArr
          },
          {
            name: "心理韧性水平",
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFC90C" },
                { offset: 0.33, color: "#FFA87E" },
                { offset: 0.66, color: "#FFDE6B" },
                { offset: 1, color: "#FFC600" }
              ])
            },
            data: lArr
          }
        ]
      });
    },
    tabChange(type) {
      let that = this;
      this.tabActive = type;
      let today = new Date();
      let yearb = new Date();
      yearb.setMonth(yearb.getMonth() - 6);
      let yeart = new Date();
      yeart.setFullYear(yeart.getFullYear() - 1);
      if (type == 1) {
        that.chartData = reviewDada.slice(0, 3);
      }
      if (type == 2) {
        let fuckArr = [];
        for (let i in reviewDada) {
          if (
            yearb.getTime() < new Date(reviewDada[i].date).getTime() &&
            new Date(reviewDada[i].date).getTime() < today.getTime()
          ) {
            fuckArr.push(reviewDada[i]);
          }
        }
        that.chartData = fuckArr;
      }
      if (type == 3) {
        let fuckArr = [];
        for (let i in reviewDada) {
          if (
            yeart.getTime() < new Date(reviewDada[i].date).getTime() &&
            new Date(reviewDada[i].date).getTime() < today.getTime()
          ) {
            fuckArr.push(reviewDada[i]);
          }
        }
        that.chartData = fuckArr;
      }
      if (type == 4) {
        that.chartData = reviewDada;
      }
      this.myChartZhe1s();
      this.myChartZhe2s();
      this.myChartZhe3s();
      this.myChartZhe4s();
      this.myChartZhe5s();
      this.myChartZhe6s();
    },
    sortChange(e) {

    },
    onSubmit() {
      let that = this;
      this.tabActive = 0;
      let fuckArr = [];
      for (let i in reviewDada) {
        if (
          reviewDada[i].reportId == that.formSearchVs.star ||
          reviewDada[i].reportId == that.formSearchVs.end
        ) {
          fuckArr.push(reviewDada[i]);
        }
      }
      this.chartData = fuckArr;
      this.myChartZhe1s();
      this.myChartZhe2s();
      this.myChartZhe3s();
      this.myChartZhe4s();
      this.myChartZhe5s();
      this.myChartZhe6s();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.starData = reviewDada;
      this.endData = reviewDada;
      this.tabChange(1);
    },
    libraryHome(e) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="less">
.review_wrap {
  text-align: left;
  margin: 0 0.22rem;
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
    .tab_box {
      display: flex;
      justify-content: flex-end;
      box-shadow: 0px 2px 9px 0px rgba(0, 123, 255, 0.2);
      .tab_btns {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.8rem;
        height: 0.32rem;
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7786ac;
        background: #ffffff;
        border-radius: 0px 0.04rem 0.04rem 0px;
        img {
          margin-right: 0.02rem;
          width: 0.15rem;
          height: 0.15rem;
        }
      }
      .tab_btns_l {
        border-radius: 0.04rem 0px 0px 0.04rem;
        img {
          width: 0.18rem;
          height: 0.17rem;
        }
      }
      .tab_act {
        color: #ffffff;
        background: linear-gradient(-90deg, #babfff 0%, #7279ff 100%);
      }
    }
  }
  .search_title {
    display: flex;
    align-items: center;
    font-size: 0.2rem;
    line-height: 1;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #354b70;
    img {
      width: 0.14rem;
      height: 0.14rem;
      margin-right: 0.1rem;
    }
  }
  // 头部搜索项
  .search_form_box {
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 0.04rem;
    padding: 0.2rem 0.24rem;
    .search_form {
      margin-top: 0.24rem;
    }
    // 搜索项
    .el-form--inline {
      .el-form-item {
        margin: 0 0 0.16rem 0.32rem;
        .el-form-item__label {
          padding-right: 0.1rem;
          font-size: 0.16rem;
          line-height: 0.36rem;
        }
        .el-form-item__content {
          width: 1.7rem;
          line-height: 0.36rem;
          font-size: 0.16rem;
          .el-input {
            font-size: 0.16rem;
            .el-input__icon {
              width: 0.25rem;
              line-height: 0.36rem;
              font-size: 0.16rem;
            }
            .el-input__inner {
              width: 1.7rem;
              border: 0.01rem solid #dcdfe6;
              height: 0.36rem;
              line-height: 0.36rem;
              padding: 0 0.1rem;
            }
          }
          .el-select {
            width: 100%;
          }
        }
      }
      .el-form-item:first-child {
        margin-left: 0.22rem;
      }
      .el-form-item:last-child {
        margin-left: 0.22rem;
        .el-form-item__content {
          width: auto;
          .el-button + .el-button {
            margin-left: 0.18rem;
          }
        }
      }
    }
  }
  // 表格
  .tables_box {
    margin-top: 0.3rem;
    // 性别样式
    .sex_li {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      img {
        width: 0.14rem;
        height: 0.14rem;
        margin-right: 0.05rem;
      }
    }
    // 表格样式
    .el-table {
      margin-bottom: 0.15rem;
      .el-table--border,
      .el-table--group,
      .el-table--border:after,
      .el-table--group:after,
      .el-table:before {
        border-color: #e1e9ff;
      }
      .el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        background: #e1e9ff;
      }
      th,
      tr,
      td {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        font-family: Source Han Sans CN;
      }
      td,
      th.is-leaf {
        border-color: #e1e9ff;
      }
      td {
        color: #7786ac;
      }
      thead {
        th,
        tr {
          background: linear-gradient(0deg, #c4ecff 0%, #97cdff 100%);
          color: #354b70;
        }
      }
      .el-button--text {
        font-size: 0.16rem;
        padding: 0.09rem 0.06rem;
      }
      .primary_g,
      .primary_r {
        width: auto;
        max-width: 0.9rem;
        height: 0.32rem;
        line-height: 1;
        margin: 0 auto;
        // background: #ffffff;
        // background: linear-gradient(
        //   45deg,
        //   rgba(196, 236, 255, 1) 0%,
        //   rgba(151, 205, 255, 1) 100%
        // );
        // color: #006cff;
        // padding: 1px;
        // border-radius: 0.02rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .primary_g_img{
          width: 0.74rem;
        }
        .el-button--primary.is-plain,
        .el-button--danger.is-plain {
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          border-radius: 0.02rem;
          font-size: 0.16rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
        }
        .el-button--primary.is-plain,
        .el-button--primary.is-plain:focus,
        .el-button--primary.is-plain:hover {
          // color: #006cff;
          background: transparent !important;
        }
        .el-button--danger.is-plain,
        .el-button--danger.is-plain:focus,
        .el-button--danger.is-plain:hover {
          // color: #ff8854;
          background: transparent !important;
        }
      }
      // .primary_r0{
      //   color:#006cff !important;
      //   background: rgba(0, 108, 255, 0.1) !important;
      //   .el-button.is-plain,
      //   .el-button.is-plain:focus,
      //   .el-button.is-plain:hover {
      //     color: #006cff !important;
      //   }
      // }
      // .primary_r1 {
      //   color: #6671FF !important;
      //   background: rgba(102, 113, 255, 0.1) !important;
      //   .el-button.is-plain,
      //   .el-button.is-plain:focus,
      //   .el-button.is-plain:hover {
      //     color: #6671FF !important;
      //   }
      // }
      // .primary_r2 {
      //   color: #D674FF !important;
      //   background: rgba(214, 116, 255, 0.1) !important;
      //   .el-button.is-plain,
      //   .el-button.is-plain:focus,
      //   .el-button.is-plain:hover {
      //     color: #D674FF !important;
      //   }
      // }
      // .primary_r3 {
      //   color: #FE5FB8 !important;
      //   background: rgba(254, 95, 184, 0.1) !important;
      //   .el-button.is-plain,
      //   .el-button.is-plain:focus,
      //   .el-button.is-plain:hover {
      //     color: #FE5FB8 !important;
      //   }
      // }
    }
    // 底部分页
    .table_page {
      display: flex;
      font-family: Source Han Sans CN;
      font-weight: 400;
      font-size: 0.14rem;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 0rem;
      .page_total {
        font-size: 0.14rem;
        color: #828fb2;
        span {
          color: #006cff;
        }
      }
      .el-pagination {
        .el-pager {
          .number {
            padding: 0 0.04rem;
            height: 0.28rem;
            line-height: 0.26rem;
            border: 0.01rem solid #e1e9ff;
            font-size: 0.14rem;
            color: #7786ac;
            min-width: 0.28rem;
            background: linear-gradient(
              0deg,
              rgba(196, 236, 255, 0.14) 0%,
              rgba(151, 205, 255, 0.14) 100%
            );
            margin: 0 0.03rem;
          }
          .number.active {
            color: #ffffff;
            background: linear-gradient(0deg, #0075ff, #00c2ff);
          }
        }
        .btn-next,
        .btn-prev {
          background: center center no-repeat
            linear-gradient(0deg, #c4ecff 0%, #97cdff 100%);
          background-size: 100%;
          cursor: pointer;
          margin: 0;
          color: #85b4ff;
          min-width: 0.28rem;
          padding: 0;
          margin: 0 0.04rem;
        }
        .el-select .el-input .el-input__inner {
          color: #7786ac;
        }
        button,
        span:not([class*="suffix"]) {
          display: inline-block;
          font-size: 0.14rem;
          min-width: 0.28rem;
          height: 0.28rem;
          line-height: 0.28rem;
        }
        .el-pagination__sizes {
          margin-right: 0.05rem;
          color: #7786ac;
        }
        .el-pagination__jump {
          margin: 0;
          color: #7786ac;
          .el-pagination__editor.el-input .el-input__inner {
            color: #006cff;
          }
        }
      }
    }
  }
  .trand_box {
    margin: 0.2rem 0;
    .lines_boxs {
      padding: 0 0.1rem;
    }
    .com_titles {
      font-size: 0.18rem;
      color: #354b70;
      font-weight: 400;
      display: flex;
      align-items: center;
      margin: 0.16rem 0 -0.06rem;
      .c_titless {
        flex: 1;
        display: flex;
        font-size: 0.18rem;
        align-items: center;
        img {
          margin-right: 0.06rem;
          display: inline-block;
          width: 0.3rem;
        }
      }
    }
    // 查询、重置按钮
    .el-button {
      border: 0.01rem solid #dcdfe6;
      padding: 0.09rem 0.27rem;
      font-size: 0.16rem;
      border-radius: 0.04rem;
      background: linear-gradient(263deg, #00c2ff, #0075ff);
      box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
    }
    .el-button.resets {
      background: linear-gradient(261deg, #8fb1d7, #b8d5f5);
      box-shadow: 0px 2px 10px 0px rgba(171, 196, 227, 0.45);
    }
    .trand_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.24rem 0.1rem 0;
      .search_form {
        display: flex;
        align-items: center;
        margin: 0;
        img {
          width: 0.5rem;
          height: 0.39rem;
          margin: 0 0.08rem;
        }
      }
      .numCount {
        margin-right: 0.16rem !important;
      }
      .el-form--inline {
        .el-form-item {
          margin: 0;
        }
      }
      .tab_box {
        display: flex;
        justify-content: space-between;
        width: auto;
        border-radius: 0.04rem;
        float: right;
        box-shadow: 0px 2px 9px 0px rgba(0, 123, 255, 0.2);
        .tab_btns {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.8rem;
          height: 0.28rem;
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #7786ac;
          background: rgba(236, 247, 255, 0.8);
          border-radius: 0px 0.04rem 0.04rem 0px;
        }
        .tab_btns_l {
          border-radius: 0.04rem 0px 0px 0.04rem;
        }
        .tab_btns_z {
          border-radius: 0 0 0 0;
        }
        .tab_btns_c {
          border-right: 0.01rem solid #87b9db;
        }
        .tab_act {
          color: #ffffff;
          background: linear-gradient(90deg, #0075ff 0%, #00c2ff 100%);
        }
      }
    }
    .el-button {
      border: 0.01rem solid #dcdfe6;
      padding: 0.09rem 0.27rem;
      font-size: 0.16rem;
      border-radius: 4px;
      background: linear-gradient(263deg, #0075ff, #00c2ff);
      box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
    }
    .myChartZhe1,
    .myChartZhe2,
    .myChartZhe3,
    .myChartZhe4 {
      width: 13rem;
      height: 3rem;
    }

    .review_trend {
      padding: 0.36rem 0.1rem 0;
      .r_trend_l {
        float: left;
        margin-top: 0.45rem;
        width: 1.6rem;
        box-shadow: 0px 13px 43px 0px rgba(70, 101, 135, 0.1);
        .r_t_tab {
          border: 1px solid #c7e0ff;
          border-radius: 2px 2px 0px 0px;
          padding-top: 0.18rem;
          background: #f6fcff;
          img {
            display: block;
            width: 0.51rem;
            height: 0.51rem;
            margin: 0 auto;
          }
          span {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 0.2rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 1;
            padding: 0.13rem 0 0.18rem;
          }
        }
        .r_t_tab:last-child {
          border: 1px solid #c7e0ff;
          border-bottom: 1px solid #c7e0ff;
          border-top: 0;
          border-radius: 0px 0px 2px 2px;
        }
        .r_t_b0 {
          border-bottom: 0;
        }
        .r_t_tab_act1 {
          color: #006cff;
          border-color: #0090ff;
          background: rgba(255, 255, 255, 0.08);
        }
        .r_t_tab_act2 {
          color: #006cff;
          background: rgba(255, 255, 255, 0.08);
          border-top: 1px solid !important;
          border-color: #0090ff !important;
        }
      }
      .r_trend_r {
        margin-left: 1.82rem;
        padding-bottom: 0.4rem;
        .rtr_box {
          position: relative;
          padding-top: 0.35rem;
          width: 13rem;
          .rtr_tabs_bx {
            margin-top: 0.24rem;
            ul {
              display: flex;
              justify-content: center;
              li {
                padding: 0 0.14rem;
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #78a7da;
                line-height: 0.23rem;
                border: 0.01rem solid #c1deff;
              }
              li:nth-child(1) {
                border-right: 0;
              }
              li:nth-child(2) {
                border-right: 0;
              }
              li:nth-child(3) {
                border-right: 0;
              }
              .sb_tab1 {
                color: #006cff;
                border-right: 0.01rem solid !important;
                border: 0.01rem solid;
                border-image: linear-gradient(45deg, #0075ff, #00c2ff) 1 1;
                background: linear-gradient(
                  0deg,
                  rgba(196, 236, 255, 0.14) 0%,
                  rgba(151, 205, 255, 0.14) 100%
                );
                opacity: 0.76;
                border-radius: 2px 0px 0px 2px;
              }
              .sb_tab10 {
                border-left: 0;
              }
            }
          }
          .rtr_tle {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 0.34rem;
            text-align: center;
            margin: 0 auto;
            line-height: 0.35rem;
            font-size: 0.2rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #ffffff;
            background: url("../../assets/images/trend_tle.png") no-repeat
              center;
            background-size: 1.88rem 0.34rem;
          }
          .rtr_ul {
            ul {
              display: flex;
              justify-content: center;
              li {
                font-size: 0.14rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #354b70;
                line-height: 0.24rem;
                display: flex;
                align-items: center;
                padding: 0.2rem;
                span {
                  margin-right: 0.04rem;
                  display: inline-block;
                  width: 0.08rem;
                  height: 0.08rem;
                  border-radius: 50%;
                }
                span.r_cir1 {
                  background: linear-gradient(0deg, #0075ff, #00c2ff);
                }
                span.r_cir2 {
                  background: linear-gradient(0deg, #FE5FB8, #ff83df);
                }
                span.r_cir3 {
                  background: linear-gradient(0deg, #c4c8ff, #7279ff);
                }
                span.r_cir4 {
                  background: linear-gradient(0deg, #00D8FF, #46F7CB);
                }
                span.r_cir5 {
                  background: linear-gradient(0deg, #FFE792, #FFC90C);
                }
                span.r_line1 {
                  width: 0.12rem;
                  height: 0.02rem;
                  border-radius: 0;
                  background: linear-gradient(99deg, #ff77c3, #ff92cf);
                }
                span.r_line2 {
                  width: 0.12rem;
                  height: 0.02rem;
                  border-radius: 0;
                  background: linear-gradient(99deg, #ffbf0a, #ffa121);
                }
              }
            }
          }
        }
        .rtr_boxs {
          padding-top: 0.65rem;
        }
      }
    }
  }
}
</style>
