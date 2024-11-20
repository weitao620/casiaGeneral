<template>
  <div class="index_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>主页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="index_main" v-show="power1">
      <div class="index_main_top">
        <div class="top_left">
          <div class="left_wel">
            <div class="welcome">
              <div class="w_txt1">欢迎回来！</div>
              <div class="w_txt2">AI心世界&nbsp;&nbsp;AI Mental World</div>
            </div>
            <div class="person" v-if="detail.name">
              <img
                class="per_photo per_photo1"
                src="../../assets/images/manger.png"
                alt=""
              />

              <div class="per_msg">
                <div class="per_msg_t">{{ detail.name }}</div>
                <div class="per_msg_b">{{ detail.roleName }}</div>
              </div>
              <div class="per_msg">
                <div class="per_msg_t">上次登录时间</div>
                <div class="per_msg_b montserrat">
                  {{ detail.lastLoginTime }}
                </div>
              </div>
              <div class="per_center" @click="toPerson">
                个人中心 →
              </div>
            </div>
          </div>
          <div class="left_survey">
            <div class="center_o_title">
              评估概况
            </div>
            <div class="survey_box">
              <div class="sur_left">
                <div class="stxt1">本月</div>
                <div class="stxt2">
                  <span>{{ detail.monthHealthNum }}</span
                  >人为心理健康状态
                </div>
                <div class="stxt3">
                  <span
                    :class="[
                      'stxt_r',
                      { stxt_g: detail.changePerct.indexOf('-') != -1 }
                    ]"
                    >{{ detail.changePerct }}</span
                  >
                  <i
                    class="el-icon-bottom-right stxt_g"
                    v-if="detail.changePerct.indexOf('-') != -1"
                  ></i>
                  <i class="el-icon-top-right stxt_r" v-else></i>
                  相较于上月
                </div>
                <div class="per_more" @click="toReport">了解更多 →</div>
              </div>
              <div class="sur_right" id="myChartGauge" ref="myChartGauge"></div>
            </div>
          </div>
          <div class="center_o">
            <div class="center_o_title">
              风险频次统计
              <el-tooltip
                class="item"
                effect="dark"
                content="频次：即所有用户在游戏操作中出现的风险的次数，每出现一种记为一次。"
                placement="right"
              >
                <img
                  class="c_o_tip c_o_tip1"
                  src="../../assets/images/what_icon.jpg"
                  alt=""
                />
              </el-tooltip>
            </div>
            <div id="myChart" ref="myChart"></div>
            <div class="center_pie">
              <div class="c_pie_li" v-if="depressionFlag == 1">
                <div class="c_th_txt">
                  <span class="c_pie_th c_th0"></span>
                  抑郁
                </div>
              </div>
              <div class="c_pie_li" v-if="anxietyFlag == 1">
                <div class="c_th_txt">
                  <span class="c_pie_th c_th1"></span>
                  焦虑
                </div>
              </div>
              <div class="c_pie_li" v-if="forcedFlag == 1">
                <div class="c_th_txt">
                  <span class="c_pie_th c_th2"></span>
                  强迫
                </div>
              </div>
              <div class="c_pie_li" v-if="ptsdFlag == 1">
                <div class="c_th_txt">
                  <span class="c_pie_th c_th3"></span>
                  PTSD
                </div>
              </div>
              <div class="c_pie_li" v-if="violenceFlag == 1">
                <div class="c_th_txt">
                  <span class="c_pie_th c_th4"></span>
                  敌对
                </div>
              </div>
              <div class="c_pie_li" v-if="suicideFlag == 1">
                <div class="c_th_txt">
                  <span class="c_pie_th c_th5"></span>
                  自我伤害
                </div>
              </div>
              <!-- <div class="c_pie_li" v-if="zibiFlag == 1">
                <div class="c_th_txt">
                  <span class="c_pie_th c_th6"></span>
                  自闭
                </div>
              </div> -->
            </div>
            <div class="c_o_my_txt" v-show="myTxtFlag">累计风险频次</div>
            <div class="c_o_my_num" v-show="myTxtFlag">
              {{ detail.warningStatistics.allWarningNum }}
            </div>
          </div>
        </div>
        <div class="top_right">
          <div class="right_total">
            <div class="total_t">
              <div class="total_txt">
                <div class="t_txt1">
                  {{ detail.participationNum }}<span>人</span>
                </div>
                <div class="t_txt2">参与测评</div>
              </div>
              <img src="../../assets/images/car2.png" alt="" />
            </div>
            <div class="total_o">
              <div class="total_txt">
                <div class="t_txt1">
                  {{ detail.evaluationCount }}<span>次</span>
                </div>
                <div class="t_txt2">累计评测</div>
              </div>
              <img src="../../assets/images/car1.png" alt="" />
            </div>
            <div class="total_f">
              <div class="total_txt">
                <div class="t_txt1">{{ detail.warningNum }}<span>次</span></div>
                <div class="t_txt2">风险次数</div>
              </div>
              <img src="../../assets/images/car3.png" alt="" />
            </div>
          </div>
          <div class="right_trend">
            <div class="center_o_title">
              整体趋势
            </div>
            <div class="tab_box">
              <div
                :class="['tab_btns tab_btns_l', { tab_act: tabActive == 1 }]"
                @click="tabChange(1)"
              >
                近7天
              </div>
              <div
                :class="[
                  'tab_btns tab_btns_z tab_btns_c',
                  { tab_act: tabActive == 2 }
                ]"
                @click="tabChange(2)"
              >
                近30天
              </div>
              <div
                :class="['tab_btns', { tab_act: tabActive == 3 }]"
                @click="tabChange(3)"
              >
                近半年
              </div>
            </div>
            <div class="myChartLine" id="myChartLine" ref="myChartLine"></div>
            <div class="center_pie" style="justify-content: center;">
              <div class="c_pie_li">
                <span class="c_pie_th c_ths0"></span>
                测评人数
              </div>
              <div class="c_pie_li">
                <span class="c_pie_th c_ths1"></span>
                
                <img v-if="!warningFlag" class="c_p_l_img" style="width:0.67rem;" src="../../assets/images/news/di.png" alt="" />
                <div v-else>轻度预警</div>
              </div>
              <div class="c_pie_li">
                <span class="c_pie_th c_ths2"></span>
                <img v-if="!warningFlag" class="c_p_l_img" style="width:0.67rem;" src="../../assets/images/news/zhong.png" alt="" />
                <div v-else>中度预警</div>
              </div>
              <div class="c_pie_li">
                <span class="c_pie_th c_ths3"></span>
                <img v-if="!warningFlag" class="c_p_l_img" style="width:0.67rem;" src="../../assets/images/news/gao.png" alt="" />
                <div v-else>重度预警</div>
              </div>
            </div>
          </div>
          <div class="right_tow">
            <div class="center_t" style="flex:1">
              <div class="center_o_title">
                风险类型分布
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="百分比计算方式：出现某项风险类型的人数/用户总人数=结果"
                  placement="right"
                >
                  <img
                    class="c_o_tip c_o_tip1"
                    src="../../assets/images/what_icon.jpg"
                    alt=""
                  />
                </el-tooltip>
              </div>
              <div id="myChartPie" ref="myChartPie"></div>
              <div class="center_pie" v-if="detail.warningStatistics">
                <div class="c_pie_li" v-if="depressionFlag == 1">
                  <div class="c_th_txt">
                    <span class="c_pie_th c_th0"></span>
                    抑郁
                  </div>
                  <div class="c_th_p">
                    <span class="c_pie_td c_thp0">{{
                      parseInt(detail.warningStatistics.depressionPerct * 100) + "%"
                    }}</span>
                  </div>
                </div>
                <div class="c_pie_li" v-if="anxietyFlag == 1">
                  <div class="c_th_txt">
                    <span class="c_pie_th c_th1"></span>
                    焦虑
                  </div>
                  <div class="c_th_p">
                    <span class="c_pie_td c_thp1">{{
                      parseInt(detail.warningStatistics.anxietyPerct * 100) + "%"
                    }}</span>
                  </div>
                </div>
                <div class="c_pie_li" v-if="forcedFlag == 1">
                  <div class="c_th_txt">
                    <span class="c_pie_th c_th2"></span>
                    强迫
                  </div>
                  <div class="c_th_p">
                    <span class="c_pie_td c_thp2">{{
                      parseInt(detail.warningStatistics.forcePerct * 100) + "%"
                    }}</span>
                  </div>
                </div>
                <div class="c_pie_li" v-if="ptsdFlag == 1">
                  <div class="c_th_txt">
                    <span class="c_pie_th c_th3"></span>
                    PTSD
                  </div>
                  <div class="c_th_p">
                    <span class="c_pie_td c_thp3">{{
                      parseInt(detail.warningStatistics.ptsdPerct * 100) + "%"
                    }}</span>
                  </div>
                </div>
                <div class="c_pie_li" v-if="violenceFlag == 1">
                  <div class="c_th_txt">
                    <span class="c_pie_th c_th4"></span>
                    敌对
                  </div>
                  <div class="c_th_p">
                    <span class="c_pie_td c_thp4">{{
                      parseInt(detail.warningStatistics.violencePerct * 100) + "%"
                    }}</span>
                  </div>
                </div>
                <div class="c_pie_li" v-if="suicideFlag == 1">
                  <div class="c_th_txt">
                    <span class="c_pie_th c_th5"></span>
                    自我伤害
                  </div>
                  <div class="c_th_p">
                    <span class="c_pie_td c_thp5">{{
                      parseInt(detail.warningStatistics.suicidePerct * 100) + "%"
                    }}</span>
                  </div>
                </div>
                <!-- <div class="c_pie_li" v-if="zibiFlag == 1">
                  <div class="c_th_txt">
                    <span class="c_pie_th c_th6"></span>
                    自闭
                  </div>
                  <div class="c_th_p">
                    <span class="c_pie_td c_thp6">{{
                      parseInt(detail.warningStatistics.zibiPerct * 100) + "%"
                    }}</span>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="center_f" style="flex:1">
              <div class="center_o_title">
                风险指标分析
              </div>
              <div id="myChartZero" ref="myChartZero"></div>
              <div class="center_pie">
                <div class="c_pie_li">
                  <span class="c_pie_th c_th0"></span>
                  男
                </div>
                <div class="c_pie_li">
                  <span class="c_pie_th c_th1"></span>
                  女
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index_main_center"></div>
      <div class="index_main_bottom" v-if="power2">
        <div class="bottom_o">
          <div class="center_o_title">
            最新评估
          </div>
          <div class="b_o_tab" v-if="trainFlag">
            <div class="tab_box">
              <div
                :class="['tab_btns tab_btns_l', { tab_act: tabFlag == 0 }]"
                @click="tabFalgChange(0)"
              >
                用户
              </div>
              <div
                :class="['tab_btns', { tab_act: tabFlag == 1 }]"
                @click="tabFalgChange(1)"
              >
                游客
              </div>
            </div>
            <div class="b_o_more" @click="toReport">
              查看更多&gt;
            </div>
          </div>
          <div class="b_o_tab" v-else>
            <div class="tab_box_t">
              <div class="tab_btns_t"></div>
            </div>
            <div class="b_o_more b_o_more_t" @click="toReport">
              查看更多&gt;
            </div>
          </div>
          <template>
            <el-table :data="tableData" :class="[tabFlag == 0 ? 'yhsClass' : 'yksclass']" style="width: 100%">
              <el-table-column prop="photo" v-if="tabFlag == 0" label="头像">
                <template slot-scope="scope">
                  <div class="sex_li_head">
                    <img
                      style="width:0.48rem;height:0.48rem"
                      v-if="scope.row.gender == 1"
                      src="../../assets/images/mo_man.png"
                      alt=""
                    />
                    <img
                      v-else
                      style="width:0.48rem;height:0.48rem"
                      src="../../assets/images/mo_woman.png"
                      alt=""
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                v-else
                prop="passport"
                label="ID"
              ></el-table-column>
              <el-table-column prop="name" v-if="tabFlag == 0" label="姓名">
              </el-table-column>
              <el-table-column prop="name" v-else label="昵称">
              </el-table-column>
              <el-table-column prop="gender" label="性别">
                <template slot-scope="scope">
                  <div class="sex_li">
                    <img
                      v-if="scope.row.gender == 1"
                      src="../../assets/images/man.png"
                      alt=""
                    />
                    <img v-else src="../../assets/images/woman.png" alt="" />
                    <div>{{ scope.row.gender == 1 ? "男" : "女" }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="departmentName" v-if="tabFlag == 0" label="所属部门">
              </el-table-column>
              <el-table-column prop="passport" v-if="tabFlag == 0" label="登录账号">
              </el-table-column>
              <el-table-column
                prop="evaluationTime"
                v-if="tabFlag == 0"
                label="测评次数"
              >
              </el-table-column>
              <el-table-column prop="date" sortable label="测评时间">
              </el-table-column>
              <el-table-column prop="warning" label="评估结果">
                <template slot-scope="scope">
                  <div class="primary_g primary_r0" v-if="scope.row.warning == 0">
                    <el-button v-if="!warningFlag" type="primary" plain size="small">正常</el-button>
                    <img v-else class="primary_g_img" src="../../assets/images/index0.png" alt="">
                    
                  </div>
                  <div class="primary_r primary_r1" v-if="scope.row.warning == 1">
                    <img v-if="!warningFlag" class="primary_g_img" style="width:0.67rem;" src="../../assets/images/news/di.png" alt="">
                    <img v-else class="primary_g_img" src="../../assets/images/index1.png" alt="">
                    <!-- <el-button type="danger" plain size="small">轻度预警</el-button> -->
                  </div>
                  <div class="primary_r primary_r2" v-if="scope.row.warning == 2">
                    <img v-if="!warningFlag" class="primary_g_img" style="width: 0.67rem;" src="../../assets/images/news/zhong.png" alt="">
                    <img v-else class="primary_g_img" src="../../assets/images/index2.png" alt="">
                    <!-- <el-button type="danger" plain size="small">中度预警</el-button> -->
                  </div>
                  <div class="primary_r primary_r3" v-if="scope.row.warning == 3">
                    <img v-if="!warningFlag" class="primary_g_img" style="width: 0.67rem;" src="../../assets/images/news/gao.png" alt="">
                    <img v-else class="primary_g_img" src="../../assets/images/index3.png" alt="">
                    <!-- <el-button type="danger" plain size="small">重度预警</el-button> -->
                  </div>
                  <!-- <div class="primary_r" v-if="scope.row.warning == 1">
                    <el-button type="danger" plain size="small"
                      >需关注</el-button
                    >
                  </div>
                  <div class="primary_g" v-else>
                    <el-button type="primary" plain size="small"
                      >正常</el-button
                    >
                  </div> -->
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span v-if="tabFlag == 0 && !power3">暂无权限</span>
                  <el-button
                    @click="toDetail(scope.row)"
                    v-if="tabFlag == 0 && power3"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <span v-if="tabFlag == 1 && !power4">暂无权限</span>
                  <el-button
                    @click="toDetail(scope.row)"
                    v-if="tabFlag == 1 && power4"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    <div class="power_no_wrap" v-show="!power1">
      <div class="power_no_center">
        <img src="../../assets/images/nothing.png" alt="" />
        <p>请联系管理员开放权限</p>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "../../assets/js/echarts";
import Url from "@/assets/js/url.js";
import { mapGetters } from "vuex";
var value = 0; // 值，0~1之间
var startAngle = 200; // 开始角度
var endAngle = -20; // 结束角度
var splitCount = 40; // 刻度数量
var pointerAngle = (startAngle - endAngle) * (1 - value) + endAngle; // 当前指针（值）角度
export default {
  name: "index",
  data() {
    return {
      pieNameValue: [],
      power1: false,
      power11: false,
      power2: false,
      power3: false,
      power4: false,
      power5: false,
      power6: false,
      days: 7,
      listT1: [],
      listT2: [],
      listT3: [],
      listT4: [],
      listT5: [],
      detail: {
        changePerct: "",
        evaluationCount: "",
        headIcon: "",
        lastLoginTime: "",
        monthHealthNum: "",
        name: "",
        gender: "1",
        participationNum: "",
        roleName: "",
        warningFemale: "",
        warningMale: "",
        warningNum: "",
        warningStatistics: {
          allWarningNum: "",
          anxietyNum: "",
          anxietyPerct: "",
          depressionNum: "",
          depressionPerct: "",
          forceNum: "",
          forcePerct: ""
        }
      },
      myTxtFlag: false,
      tabFlag: 0,
      tabActive: 1,
      myChartZero: "",
      myChartPie: "",
      myChart: "",
      tableData: [],
      depressionFlag: 1,
      anxietyFlag: 1,
      forcedFlag: 1,
      ptsdFlag: 0,
      suicideFlag: 0,
      violenceFlag: 0,
      zibiFlag: 0,
      personalityFlag: 0,
      chart1List: [],
      piePrect: [],
      pieName: [],
      screenWidth: document.body.clientWidth,
      trainFlag: true,
      warningFlag: false
    };
  },
  created() {

  },
  mounted() {
    let that = this;
    if (localStorage.getItem("algTypes")) {
      let algTypes = JSON.parse(localStorage.getItem("algTypes"));
      let config = JSON.parse(algTypes.config)
      this.warningFlag = config.warningType == 1 ? true : false
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    this.auth();
    if (localStorage.getItem('version')) {
      if (localStorage.getItem('version') == 1) {
        this.trainFlag = false
      }
    }
  },
  methods: {
    perctInfo (data) {
      return Math.round(data.toFixed(4) * 10000) / 100
    },
    auth() {
      let that = this;
      let param = {
        passport: JSON.parse(localStorage.getItem("userInfo")).passport
        // password: JSON.parse(localStorage.getItem("userInfo")).password
      };
      that.$http
        .get(Url + "/aimw/user/getAuthInfo", { params: param })
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            let obja = {
              menuAuthID: []
            };
            if (data.data.userAuth == "") {
              data.data.userAuth = JSON.stringify(obja);
            } else {
              if (JSON.parse(data.data.userAuth).menuAuthID) {

              } else {
                let nOb = JSON.parse(data.data.userAuth);
                nOb.menuAuthID = [];
                data.data.userAuth = JSON.stringify(nOb);
              }
            }
            localStorage.setItem("userAuth", data.data.userAuth);
            localStorage.setItem("userType", 1);
            if (data.data.algTypes.mentalDim) {
              // mentalDim
              // 心理健康维度(0b111111由低位到高位分别代表：抑郁、焦虑、强迫、自我伤害、敌对、PTSD)

              // console.log(data.data.algTypes.mentalDim.toString(2).split(''))
              let mental = data.data.algTypes.mentalDim.toString(2).split('').reverse()
              data.data.algTypes.depressionFlag = mental[0]
              data.data.algTypes.anxietyFlag = mental[1]
              data.data.algTypes.forcedFlag = mental[2]
              data.data.algTypes.suicideFlag = mental[3]
              data.data.algTypes.violenceFlag = mental[4]
              data.data.algTypes.ptsdFlag = mental[5]
              // data.data.algTypes.zibiFlag = mental[6]
              // personalityDim
              // 人格分析维度(0x11111由低位到高位分别代表：外向性extroversion、尽责性conscientiousness、神经质nervousness、宜人性agreeableness、开放性openness)
              // console.log(data.data.algTypes.personalityDim.toString(2).split(''))
              let personality = data.data.algTypes.personalityDim.toString(2).split('').reverse()
              data.data.algTypes.extroversionFlag = personality[0]
              data.data.algTypes.conscientiousnessFlag = personality[1]
              data.data.algTypes.nervousnessFlag = personality[2]
              data.data.algTypes.agreeablenessFlag = personality[3]
              data.data.algTypes.opennessFlag = personality[4]

              // positiveDim
              // 积极心理维度(0b11111由低到高代表：心理韧性resilience、积极自我self、积极成就achievement、积极情绪emotion、积极关系relationship)
              
              let positive = data.data.algTypes.positiveDim.toString(2).split('').reverse()
              data.data.algTypes.resilienceFlag = positive[0]
              data.data.algTypes.selfFlag = positive[1]
              data.data.algTypes.achievementFlag = positive[2]
              data.data.algTypes.emotionFlag = positive[3]
              data.data.algTypes.relationshipFlag = positive[4]
              localStorage.setItem("algTypes", JSON.stringify(data.data.algTypes));
            }
            
            
            if (data.data.algTypes) {
              // 是否显示抑郁
              this.depressionFlag = data.data.algTypes.depressionFlag
              // 是否显示焦虑
              this.anxietyFlag = data.data.algTypes.anxietyFlag
              // 是否显示强迫
              this.forcedFlag = data.data.algTypes.forcedFlag
              // 是否显示PTSD
              this.ptsdFlag = data.data.algTypes.ptsdFlag
              // 是否显示敌对
              this.violenceFlag = data.data.algTypes.violenceFlag
              // 是否显示自我伤害
              this.suicideFlag = data.data.algTypes.suicideFlag
              // // 是否显示自闭
              // this.zibiFlag = data.data.algTypes.zibiFlag
              // 是否显示大五人格
              this.extroversionFlag = data.data.algTypes.extroversionFlag
              this.conscientiousnessFlag = data.data.algTypes.conscientiousnessFlag
              this.nervousnessFlag = data.data.algTypes.nervousnessFlag
              this.agreeablenessFlag = data.data.algTypes.agreeablenessFlag
              this.opennessFlag = data.data.algTypes.opennessFlag
              // 是否显示心理韧性
              this.resilienceFlag = data.data.algTypes.resilienceFlag
              // 是否显示积极自我
              this.selfFlag = data.data.algTypes.selfFlag
              // 是否显示积极成就
              this.achievementFlag = data.data.algTypes.achievementFlag
              // 是否显示积极情绪
              this.emotionFlag = data.data.algTypes.emotionFlag
              // 是否显示积极关系
              this.relationshipFlag = data.data.algTypes.relationshipFlag
            }
            //
            // this.depressionFlag = 1
            // this.anxietyFlag = 1
            // this.forcedFlag = 1
            // this.ptsdFlag = 1
            // this.violenceFlag = 1
            // this.suicideFlag = 1
            // this.zibiFlag = 1
            // this.personalityFlag = 0
            that.powerData();
            if (this.power1) {
              that.tabChange(1);
              that.tabFalgChange(0);
              this.$http
                .get(Url + "/aimw/index", {
                  params: {
                    passport: JSON.parse(localStorage.getItem("userInfo"))
                      .passport,
                    userAuth: localStorage.getItem("userAuth")
                  }
                })
                .then(res => {
                  if (res.data.code == 0) {
                    that.detail = res.data.data;
                    console.log(that.detail)
                    that.detail.warningMale = that.perctInfo(that.detail.warningStatistics.warningMalePerct);
                    that.detail.warningFemale = that.perctInfo(that.detail.warningStatistics.warningFemalePerct);
                    that.detail.changePerct = that.perctInfo(that.detail.changePerct) + "%"
                    value = Number(that.detail.monthHealthPerct.toFixed(2));
                    pointerAngle =
                      (startAngle - endAngle) * (1 - value) + endAngle;
                    // this.getUserInfo();
                    let chartArr = []
                    let piePrect = []
                    let pieName = []
                    let pieNameValue = []
                    console.log(this.depressionFlag)
                    console.log(this.anxietyFlag)
                    console.log(this.forcedFlag)
                    console.log(this.ptsdFlag)
                    console.log(this.violenceFlag)
                    console.log(this.suicideFlag)
                    if (this.depressionFlag == 1) {
                      piePrect.push(that.detail.warningStatistics.depressionPerct)
                      pieName.push({
                        name: "抑郁",
                        max: 1
                      })
                      pieNameValue.push({
                        name: "抑郁",
                        value: that.detail.warningStatistics.depressionPerct,
                        color1: "#8ACBFF",
                        color2: "#519AFE"
                      })
                      chartArr.push({
                        value: that.detail.warningStatistics.depressionNum,
                        name: "抑郁",
                        itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                offset: 0,
                                color: "#8ACBFF"
                              },
                              {
                                offset: 1,
                                color: "#8ACBFF"
                              }
                            ])
                          }
                        }
                      })
                    }
                    if (this.anxietyFlag == 1) {
                      piePrect.push(that.detail.warningStatistics.anxietyPerct)
                      pieName.push({
                        name: "焦虑",
                        max: 1
                      })
                      pieNameValue.push({
                        name: "焦虑",
                        value: that.detail.warningStatistics.anxietyPerct,
                        color1: "#FFB0DB",
                        color2: "#FF89CB"
                      })
                      chartArr.push({
                        value: that.detail.warningStatistics.anxietyNum,
                        name: "焦虑",
                        itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                offset: 0,
                                color: "#FFB0DB"
                              },
                              {
                                offset: 1,
                                color: "#FFB0DB"
                              }
                            ])
                          }
                        }
                      })
                    }
                    if (this.forcedFlag == 1) {
                      piePrect.push(that.detail.warningStatistics.forcePerct)
                      pieName.push({
                        name: "强迫",
                        max: 1
                      })
                      pieNameValue.push({
                        name: "强迫",
                        value: that.detail.warningStatistics.forcePerct,
                        color1: "#B5B8FF",
                        color2: "#7C82FF"
                      })
                      chartArr.push({
                        value: that.detail.warningStatistics.forceNum,
                        name: "强迫",
                        itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                offset: 0,
                                color: "#B5B8FF"
                              },
                              {
                                offset: 1,
                                color: "#B5B8FF"
                              }
                            ])
                          }
                        }
                      })
                    }
                    if (this.ptsdFlag == 1) {

                      piePrect.push(that.detail.warningStatistics.ptsdPerct)
                      pieName.push({
                        name: "PTSD",
                        max: 1
                      })
                      pieNameValue.push({
                        name: "PTSD",
                        value: that.detail.warningStatistics.ptsdPerct,
                        color1: "#FFA3A3",
                        color2: "#FF8481"
                      })
                      chartArr.push({
                        value: that.detail.warningStatistics.ptsdNum,
                        name: "PTSD",
                        itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                offset: 0,
                                color: "#FFA3A3"
                              },
                              {
                                offset: 1,
                                color: "#FFA3A3"
                              }
                            ])
                          }
                        }
                      })
                    }
                    if (this.violenceFlag == 1) {
                      piePrect.push(that.detail.warningStatistics.violencePerct)
                      pieName.push({
                        name: "敌对",
                        max: 1
                      })
                      pieNameValue.push({
                        name: "敌对",
                        value: that.detail.warningStatistics.violencePerct,
                        color1: "#FFD29D",
                        color2: "#FFBB79"
                      })
                      chartArr.push({
                        value: that.detail.warningStatistics.violenceNum,
                        name: "敌对",
                        itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                offset: 0,
                                color: "#FFD29D"
                              },
                              {
                                offset: 1,
                                color: "#FFD29D"
                              }
                            ])
                          }
                        }
                      })
                    }
                    if (this.suicideFlag == 1) {
                      piePrect.push(that.detail.warningStatistics.suicidePerct)
                      pieName.push({
                        name: "自我伤害",
                        max: 1
                      })
                      pieNameValue.push({
                        name: "自我伤害",
                        value: that.detail.warningStatistics.suicidePerct,
                        color1: "#BDF5B8",
                        color2: "#8DE684"
                      })
                      chartArr.push({
                        value: that.detail.warningStatistics.suicideNum,
                        name: "自我伤害",
                        itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                offset: 0,
                                color: "#BDF5B8"
                              },
                              {
                                offset: 1,
                                color: "#BDF5B8"
                              }
                            ])
                          }
                        }
                      })
                    }
                    // if (this.zibiFlag == 1) {
                    //   piePrect.push(that.detail.warningStatistics.zibiPerct)
                    //   pieName.push({
                    //     name: "自闭",
                    //     max: 1
                    //   })
                    //    pieNameValue.push({
                    //      name: "自闭",
                    //      value: that.detail.warningStatistics.zibiPerct,
                    //      color1: "#fff5b3",
                    //      color2: "#f7de3b"
                    //    }) 
                    // chartArr.push({
                    //   value: that.detail.warningStatistics.zibiNum,
                    //   name: "自闭",
                    //   itemStyle: {
                    //     normal: {
                    //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    //         {
                    //           offset: 0,
                    //           color: "#fff5b3"
                    //         },
                    //         {
                    //           offset: 1,
                    //           color: "#fff5b3"
                    //         }
                    //       ])
                    //     }
                    //   }
                    // })
                    // }
                    this.chart1List = chartArr
                    this.piePrect = piePrect
                    
                    this.pieName = pieName
                    this.pieNameValue = pieNameValue
                    console.log(chartArr)
                    console.log(pieName)
                    console.log(piePrect)
                    this.draw();
                    setTimeout(() => {
                      this.myTxtFlag = true;
                    }, 500);
                  }
                })
                .catch(res => {
                  console.log(res);
                });
              window.addEventListener("resize", () => {
                setTimeout(() => {
                  this.myTxtFlag = false;
                  setTimeout(() => {
                    this.myTxtFlag = true;
                  }, 500);

                  this.myChart.resize();
                  this.myChartPie.resize();
                  this.myChartZero.resize();
                  this.myChartLine.resize();
                }, 100);
              });
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 获取个人中心信息
    getUserInfo() {
      let that = this;
      that.$http
        .get(Url + "/aimw/user/getUserProfile", {
          params: {
            passport: JSON.parse(localStorage.getItem("userInfo")).passport
          }
        })
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            that.detail.gender = data.data.gender;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power1 = power.includes(10100); // 系统主页
      this.power2 = power.includes(20000); // 最近十条数据
      this.power3 = power.includes(20101); // 用户查看
      this.power4 = power.includes(20106); // 游客查看
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
    toPerson() {
      this.$router.push({
        name: "person"
      });
    },
    toReport() {
      this.$router.push("/library/report");
    },
    tabFalgChange(type) {
      let that = this;
      this.tabFlag = type;
      this.$http
        .get(Url + "/aimw/index/listLatestReports", {
          params: {
            passport: JSON.parse(localStorage.getItem("userInfo")).passport,
            userType: type,
            userAuth: localStorage.getItem("userAuth")
          }
        })
        .then(res => {
          let data = res.data.data;
          that.tableData = data;
        });
    },
    tabChange(type) {
      var that = this;
      that.tabActive = type;
      if (type == 1) {
        that.days = 7;
      } else if (type == 2) {
        that.days = 30;
      } else if (type == 3) {
        that.days = 180;
      }
      this.$http
        .get(Url + "/aimw/index/trend", {
          params: {
            days: that.days,
            userAuth: localStorage.getItem("userAuth")
          }
        })
        .then(res => {
          let list = res.data.data.reverse();
          let listA1 = [];
          let listA2 = [];
          let listA3 = [];
          let listA4 = [];
          let listA5 = [];
          for (let i in list) {
            listA1.push(list[i].date.split(" ")[0]);
            listA2.push(list[i].evaluateNum ? list[i].evaluateNum : 0);
            listA3.push(list[i].mildWarningNum ? list[i].mildWarningNum : 0);
            listA4.push(list[i].moderateWarningNum ? list[i].moderateWarningNum : 0);
            listA5.push(list[i].severeWarningNum ? list[i].severeWarningNum : 0);
            // listA3.push(list[i].warningNUM);
          }
          that.listT1 = listA1;
          that.listT2 = listA2;
          that.listT3 = listA3;
          that.listT4 = listA4;
          that.listT5 = listA5;
          console.log(listA5)
          // that.listT3 = listA3;
          this.draw1();
        });
    },
    draw1() {
      let that = this;
      var datax = that.listT1;
      var datas1 = that.listT2;
      var datas2 = that.listT3;
      var datas3 = that.listT4;
      var datas4 = that.listT5;
      this.myChartLine = echarts.init(this.$refs.myChartLine);
      this.myChartLine.setOption({
        color: ["#0075FF", "#6671FF", "#D674FF", "#FE5FB8"],
        tooltip: {
          trigger: "axis",
          confine: true,
          axisPointer: {
            type: "line"
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5B6C89"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          formatter: function(obj) {
            if (!that.warningFlag) {
              let di = require('../../assets/images/news/di.png')
              let zhong = require('../../assets/images/news/zhong.png')
              let gao = require('../../assets/images/news/gao.png')
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3);color:#354B70;font-weight: 600; font-size: 0.16rem;padding-bottom: 0px;margin-bottom: 0.02rem">' +
                obj[0].name +
                "</div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #8ACBFF;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(268deg, #0075ff, #00c2ff);border-radius: 50%;margin-right:0.04rem"></span>' +
                "测评人数" +
                "：<span style='color:#519AFE;font-weight: 600;'>" +
                // "：<span style='color:rgba(0,194,255,1);font-weight: 600;'>" +
                obj[0].value +
                "</span></div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #B5B8FF;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(90deg, #FEF569, #FFD800);border-radius: 50%;margin-right:0.04rem"></span>' +
                '<img style="width:0.67rem;height:0.22rem" src="' + di + '" alt="" />' +
                "：<span style='color:#7C82FF;font-weight: 600;'>" +
                // "：<span style='color:rgba(255, 210, 0, 1);font-weight: 600;'>" +
                obj[1].value +
                "</span></div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #FFD29D;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(90deg, #FFCE9F, #FF849C);border-radius: 50%;margin-right:0.04rem"></span>' +
                '<img style="width:0.67rem;height:0.22rem" src="' + zhong + '" alt="" />' +
                "：<span style='color:#FFBB79;font-weight: 600;'>" +
                // "：<span style='color:rgba(252, 155, 47, 1);font-weight: 600;'>" +
                obj[2].value +
                "</span></div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #FFA3A3;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(74deg, #FFAB96, #FF0F47);border-radius: 50%;margin-right:0.04rem"></span>' +
                '<img style="width:0.67rem;height:0.22rem" src="' + gao + '" alt="" />' +
                "：<span style='color:#FF8481;font-weight: 600;'>" +
                // "：<span style='color:rgba(254, 39, 39, 1);font-weight: 600;'>" +
                obj[3].value +
                "</span></div>"
              );
            } else {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3);color:#354B70;font-weight: 600; font-size: 0.16rem;padding-bottom: 0px;margin-bottom: 0.02rem">' +
                obj[0].name +
                "</div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #8ACBFF;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(268deg, #0075ff, #00c2ff);border-radius: 50%;margin-right:0.04rem"></span>' +
                "测评人数" +
                "：<span style='color:#519AFE;font-weight: 600;'>" +
                // "：<span style='color:rgba(0,194,255,1);font-weight: 600;'>" +
                obj[0].value +
                "</span></div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #B5B8FF;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(90deg, #FEF569, #FFD800);border-radius: 50%;margin-right:0.04rem"></span>' +
                "轻度预警" +
                "：<span style='color:#7C82FF;font-weight: 600;'>" +
                // "：<span style='color:rgba(255, 210, 0, 1);font-weight: 600;'>" +
                obj[1].value +
                "</span></div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #FFD29D;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(90deg, #FFCE9F, #FF849C);border-radius: 50%;margin-right:0.04rem"></span>' +
                "中度预警" +
                "：<span style='color:#FFBB79;font-weight: 600;'>" +
                // "：<span style='color:rgba(252, 155, 47, 1);font-weight: 600;'>" +
                obj[2].value +
                "</span></div>" +
                '<div style="display:flex;align-items:center;color:#7786AC;"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: #FFA3A3;border-radius: 50%;margin-right:0.04rem"></span>' +
                // '<div style="display:flex;align-items:center"><span style="display:inline-block;width:0.08rem;height:0.08rem;background: linear-gradient(74deg, #FFAB96, #FF0F47);border-radius: 50%;margin-right:0.04rem"></span>' +
                "重度预警" +
                "：<span style='color:#FF8481;font-weight: 600;'>" +
                // "：<span style='color:rgba(254, 39, 39, 1);font-weight: 600;'>" +
                obj[3].value +
                "</span></div>"
              );
            }
            
          }
        },
        grid: {
          left: "20",
          top: "40",
          right: "34",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#7786AC",
            showMaxLabel: true
          },
          data: datax
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#DEE7FF"
            }
          },
          axisLabel: {
            color: "#7786AC"
          },
          axisTick: {
            show: false
          },
          minInterval: 1
        },
        series: [
          {
            name: "测评人数",
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: "#8ACBFF"
            },
            lineStyle: {
              // color: "rgba(0,194,255,1)"
              color: "#8ACBFF"
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       {
            //         offset: 0,
            //         color: "rgba(0,194,255,0.04)"
            //       },
            //       {
            //         offset: 1,
            //         color: "rgba(0,194,255,0)"
            //       }
            //     ])
            //   }
            // },
            data: datas1
          },
          {
            name: "轻度",
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
              // color: "rgba(255, 210, 0, 1)"
              color: "#B5B8FF"
            },
            lineStyle: {
              // color: "rgba(255, 210, 0, 1)"
              color: "#B5B8FF"
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       {
            //         offset: 0,
            //         color: "rgba(255, 210, 0, 0.04)"
            //       },
            //       {
            //         offset: 1,
            //         color: "rgba(255, 210, 0, 0)"
            //       }
            //     ])
            //   }
            // },
            data: datas2
          },
          {
            name: "中度",
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
              // color: "rgba(252, 155, 47, 1)"
              color: "rgba(252, 155, 47, 1)"
            },
            lineStyle: {
              // color: "rgba(252, 155, 47, 1)"
              color: "rgba(252, 155, 47, 1)"
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       {
            //         offset: 0,
            //         color: "rgba(252, 155, 47, 0.04)"
            //       },
            //       {
            //         offset: 1,
            //         color: "rgba(252, 155, 47, 0)"
            //       }
            //     ])
            //   }
            // },
            data: datas3
          },
          {
            name: "重度",
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
              // color: "rgba(254, 39, 39, 1)"
              color: "#FFD29D"
              
            },
            lineStyle: {
              // color: "rgba(254, 39, 39, 1)"
              color: "#FFD29D"
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       {
            //         offset: 0,
            //         color: "rgba(254, 39, 39, 0.04)"
            //       },
            //       {
            //         offset: 1,
            //         color: "rgba(254, 39, 39, 0)"
            //       }
            //     ])
            //   }
            // },
            data: datas4
          }
        ]
      });
    },
    draw() {
      let that = this;
      // 当前视口宽度
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
      this.myChartGauge = echarts.init(this.$refs.myChartGauge);
      this.myChartGauge.setOption({
        series: [
          {
            type: "gauge",
            radius: "90%",
            startAngle: pointerAngle,
            endAngle: endAngle,
            splitNumber: 1,
            axisLine: {
              show: false,
              lineStyle: {
                width: nowSize(3),
                opacity: 0
              }
            },
            anchor: {
              show: true,
              showAbove: true,
              size: nowSize(6),
              itemStyle: {
                borderColor: "transparent",
                borderWidth: nowSize(3)
              }
            },
            title: { show: false },
            detail: {
              show: true,
              valueAnimation: true,
              fontSize: nowSize(24),
              color: "#006cff",
              offsetCenter: [0, "30%"],
              formatter: function(value) {
                // console.log(value)
                return Math.round(value.toFixed(4) * 10000) / 100 + "%";
              }
            },
            splitLine: { show: false },
            axisTick: {
              length: nowSize(15),
              splitNumber: Math.ceil((1 - value) * splitCount),
              lineStyle: {
                color: "#E6EDFF",
                width: nowSize(2)
              }
            },
            axisLabel: { show: false },
            pointer: { show: true },
            itemStyle: {},
            data: [
              {
                value: value,
                name: "评估",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#4BC8FF"
                      },
                      {
                        offset: 1,
                        color: "#1661FF"
                      }
                    ],
                    globalCoord: false
                  }
                }
              }
            ]
          },
          {
            type: "gauge",
            radius: "90%",
            startAngle: startAngle,
            endAngle: pointerAngle,
            splitNumber: 1,
            axisLine: {
              show: false,
              lineStyle: {
                width: nowSize(2),
                opacity: 0
              }
            },
            title: { show: false },
            detail: { show: false },
            splitLine: { show: false },
            axisTick: {
              length: 16,
              splitNumber: Math.ceil(value * splitCount),
              lineStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4BC8FF"
                    },
                    {
                      offset: 1,
                      color: "#1661FF"
                    }
                  ],
                  globalCoord: false
                },
                width: nowSize(2)
              }
            },
            axisLabel: { show: false },
            pointer: { show: false },
            itemStyle: {},
            data: [
              {
                value: value,
                name: "评估"
              }
            ]
          },
          {
            type: "gauge",
            radius: "96%",
            startAngle: pointerAngle,
            endAngle: pointerAngle,
            splitNumber: 1,
            axisLine: {
              show: false,
              lineStyle: {
                width: nowSize(2),
                opacity: 0
              }
            },
            title: { show: false },
            detail: { show: false },
            splitLine: { show: false },
            axisTick: {
              length: 22,
              splitNumber: 1,
              lineStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4BC8FF"
                    },
                    {
                      offset: 1,
                      color: "#1661FF"
                    }
                  ],
                  globalCoord: false
                },
                width: nowSize(2)
              }
            },
            axisLabel: { show: false },
            pointer: { show: false },
            itemStyle: {},
            data: [
              {
                value: value,
                name: "评估"
              }
            ]
          }
        ]
      });

      // 风险频次统计
      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption({
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              width: nowSize(35),
              color: "rgba(72, 117, 174, 0.25)"
            }
          },
          backgroundColor: "#ffffff",
          borderWidth: 0,
          padding: [nowSize(4), nowSize(8), nowSize(4), nowSize(8)],
          textStyle: {
            color: "#5B6C89",
            padding: 0
          },
          formatter: function(params) {
            let colc = ['#519AFE', '#FF89CB', '#7C82FF', '#FF8481', '#FFBB79', '#8DE684', '#f7de3b']
            var result =
              '<span style="display:inline-block;margin-right:0.04rem;border-radius:0.1rem;width:0.1rem;height:0.1rem;background: linear-gradient(174deg, ' +
              params.color.colorStops[0].color +
              "," +
              params.color.colorStops[1].color +
              '");></span>' +
              '<span style="color:#7786AC;font-size:0.14rem">' +
              params.name +
              "</span>" +
              ':<span style="display:inline-block;font-weight:blod;margin-left:0.05rem;font-size:0.14rem;font-weight:600;color:' +
              //  colc[params.dataIndex] +
               params.color.colorStops[0].color +
              '">' +
              params.value +
              "</span>";
            return result;
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["53%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: nowSize(14)
                },
                color: "#5B6C89",
                formatter: "累计风险频次\n{hr|{c}次}",
                rich: {
                  hr: {
                    color: "#51A7FF",
                    padding: [0, 0, nowSize(0), 0]
                  }
                }
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: nowSize(30),
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.chart1List
          }
        ]
      });

      // 风险类型分布
      this.myChartPie = echarts.init(this.$refs.myChartPie);
      this.myChartPie.setOption({
        tooltip: {
          padding: nowSize(10),
          axisPointer: {
            type: "shadow"
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5B6C89"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);",
          formatter: function(obj) {
            console.log(obj)
            // for (let i in obj){
            //   console.log(obj[i])
            // }
            var value = obj.value;
            let html = ''
            console.log(that.pieNameValue)
            html += '<div style="border-bottom: 1px solid rgba(255,255,255,.3);font-weight: 600; font-size: 0.18rem;padding-bottom: 0px;margin-bottom: 0.07rem">' +
              obj.seriesName +
              "</div>"
            for (let i in that.pieNameValue) {
                html += '<div><span style="font-size:0.14rem;display:inline-block;width:0.08rem;height:0.08rem;background: ' + that.pieNameValue[i].color1 + ';border-radius: 50%;margin-right:0.04rem"></span>' +
              "<span style='font-size:0.14rem;'>" +
              that.pieNameValue[i].name + "：</span>" +
              // "<span style='font-size:0.14rem;color:#519AFE'>" +
              "<span style='font-size:0.14rem;color:" + that.pieNameValue[i].color2 + "'>" +
              (parseInt(that.pieNameValue[i].value * 100) + "%") +
              "</span></div>"
            }
            // if (that.anxietyFlag == 1) {
            //   html += '<div><span style="font-size:0.14rem;display:inline-block;width:0.08rem;height:0.08rem;background: #FFB0DB;border-radius: 50%;margin-right:0.04rem"></span>' +
            //   "<span style='font-size:0.14rem;'>焦虑：2</span>" +
            //   "<span style='font-size:0.14rem;color:#FF89CB'>" +
            //   (parseInt(value[1] * 100) + "%") +
            //   "</span></div>"
            // }
            // if (that.forcedFlag == 1) {
            //   html += '<div><span style="font-size:0.14rem;display:inline-block;width:0.08rem;height:0.08rem;background: #B5B8FF;border-radius: 50%;margin-right:0.04rem"></span>' +
            //   "<span style='font-size:0.14rem;'>强迫：3</span>" +
            //   "<span style='font-size:0.14rem;color:#7C82FF'>" +
            //   (parseInt(value[2] * 100) + "%") +
            //   "</span></div>"
            // }
            // if (that.ptsdFlag == 1) {
            //   html += '<div><span style="font-size:0.14rem;display:inline-block;width:0.08rem;height:0.08rem;background: #FFA3A3;border-radius: 50%;margin-right:0.04rem"></span>' +
            //   "<span style='font-size:0.14rem;'>PTSD：4</span>" +
            //   "<span style='font-size:0.14rem;color:#FF8481'>" +
            //   (parseInt(value[3] * 100) + "%") +
            //   "</span></div>"
            // }
            // if (that.violenceFlag == 1) {
            //   html += '<div><span style="font-size:0.14rem;display:inline-block;width:0.08rem;height:0.08rem;background: #FFD29D;border-radius: 50%;margin-right:0.04rem"></span>' +
            //   "<span style='font-size:0.14rem;'>敌对：5</span>" +
            //   "<span style='font-size:0.14rem;color:#FFBB79'>" +
            //   (parseInt(value[4] * 100) + "%") +
            //   "</span></div>"
            // }
            // if (that.suicideFlag == 1) {
            //   html += '<div><span style="font-size:0.14rem;display:inline-block;width:0.08rem;height:0.08rem;background: #BDF5B8;border-radius: 50%;margin-right:0.04rem"></span>' +
            //   "<span style='font-size:0.14rem;'>自我伤害：6</span>" +
            //   "<span style='font-size:0.14rem;color:#8DE684'>" +
            //   (parseInt(value[5] * 100) + "%") +
            //   "</span></div>"
            // }
            // if (that.zibiFlag == 1) {
            //   html += '<div><span style="font-size:0.14rem;display:inline-block;width:0.08rem;height:0.08rem;background:#fff5b3;border-radius: 50%;margin-right:0.04rem"></span>' +
            //    "<span style='font-size:0.14rem;'>自闭：</span>" +
            //   "<span style='font-size:0.14rem;color:#f7de3b'>" +
            //   (parseInt(value[6] * 100) + "%") +
            //   "</span></div>"
            // }
            return html;
          }
        },
        radar: [
          {
            indicator: that.pieName,
            center: ["50%", "50%"],
            radius: "65%",
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#7786AC"
              }
            },
            splitArea: {
              areaStyle: {
                color: ["#fff"]
              }
            },
            axisLine: {
              lineStyle: {
                color: "#DEE7FF"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#DEE7FF"
              }
            }
          }
        ],
        legend: {
          left: "center",
          bottom: "0",
          icon: "circle",
          itemWidth: nowSize(10),
          itemHeight: nowSize(10),
          itemGap: nowSize(40),
          textStyle: {
            color: "#354B70"
          },
          data: []
        },
        series: [
          {
            name: "风险类型分布",
            type: "radar",
            color: ["rgba(0,117,255,0.1)"],
            emphasis: {
              lineStyle: {
                width: nowSize(2),
                color: "rgba(0, 117, 255, 0.6)"
              }
            },
            data: [
              {
                value: that.piePrect,
                symbol: "circle",
                symbolSize: 0,
                itemStyle: {
                  normal: {
                    borderColor: "#4BC8FF",
                    borderWidth: 1
                  }
                },
                areaStyle: {
                  opacity: 0.6,
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(0, 117, 255, 0.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0, 194, 255, 0.5)"
                      }
                    ],
                    globalCoord: false
                  }
                },
                lineStyle: {
                  width: nowSize(3)
                }
              }
            ]
          }
        ]
      });

      // 风险指标分析
      this.myChartZero = echarts.init(this.$refs.myChartZero);
      this.myChartZero.setOption({
        grid: {
          left: nowSize(20),
          top: nowSize(40),
          right: nowSize(20),
          bottom: nowSize(10),
          containLabel: true
        },
        xAxis: {
          type: "value",
          max: 100,
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#DEE7FF"
            }
          },
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)"
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#7786AC",
            showMaxLabel: true
          }
        },
        yAxis: {
          type: "category",
          data: ["女", "男"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fffff"
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: "#7786AC",
            showMaxLabel: true
          },
          minInterval: 1
        },
        tooltip: {
          padding: 0,
          axisPointer: {
            type: "shadow"
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5B6C89"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          formatter: function(obj) {
            var value = obj.value;
            return (
              '<div style="padding:0.1rem 0.14rem;">' +
              '<div style="border-bottom: 0.01rem solid rgba(255,255,255,.3); font-size: 0.18rem;padding-bottom:0.02rem;margin-bottom:0.02rem">' +
              obj.seriesName +
              "</div>" +
              "占比" +
              "：" +
              value +
              "%</div>"
            );
          }
        },
        series: [
          {
            name: "男",
            type: "bar",
            stack: "total",
            barWidth: nowSize(20),
            // label: {
            //   show: true,
            //   color: "#ffffff",
            //   formatter: '{c}%'
            // },
            color: new echarts.graphic.LinearGradient(1, 0.5, 0, 0.5, [
              {
                offset: 0,
                color: "#8ACBFF"
              },
              {
                offset: 1,
                color: "#8ACBFF"
              }
            ]),
            data: ["女", that.detail.warningMale]
          },
          {
            name: "女",
            type: "bar",
            stack: "total",
            // label: {
            //   show: true,
            //   color: "#ffffff",
            //   formatter: '{c}%'
            // },
            color: new echarts.graphic.LinearGradient(1, 0.5, 0, 0.5, [
              {
                offset: 0,
                color: "#FFB0DB"
              },
              {
                offset: 1,
                color: "#FFB0DB"
              }
            ]),
            data: [that.detail.warningFemale, "男"]
          }
        ]
      });
    }
  },
  computed: {
    ...mapGetters(["getCollapseFlag", "getUserName"])
  },
  watch: {
    getCollapseFlag: function(oldVal, newVal) {
      this.myChart.resize();
      this.myChartPie.resize();
      this.myChartZero.resize();
      this.myChartGauge.resize();
      this.myChartLine.resize();
    },
    screenWidth(val) {
      this.screenWidth = val;
      this.draw()
      this.myChartGauge.resize();
    }
  }
};
</script>

<style lang="less">
.index_wrap {
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
  }
  #myChart,
  #myChartPie,
  #myChartZero {
    width: 100%;
    height: 2.54rem;
    z-index: 1;
  }

  #myChartPie {
    height: 2.34rem;
  }
  .index_main {
    .index_main_top {
      display: flex;
      .top_left {
        flex: 1;
        .center_o,
        .center_t,
        .center_f {
          flex: 1;
          height: 3.22rem;
          background: #ffffff;
          padding: 0 0.24rem 0.28rem 0.24rem;
          box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
          border-radius: 4px;
        }
        .center_o {
          margin-top: 0.2rem;
          position: relative;
          .center_pie {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: 0.28rem;
            z-index: 11;
            .c_pie_li {
              padding: 0;
              font-size: 0.14rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354b70;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              .c_pie_th {
                display: inline-block;
                width: 0.08rem;
                height: 0.08rem;
                margin-right: 0.04rem;
                border-radius: 50%;
              }
              .c_th_txt {
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 0.14rem;
              }
              .c_th_p {
                padding-left: 0.12rem;
              }
              .c_thp0 {
                color: #519AFE;
              }
              .c_thp1 {
                color: #FF89CB;
              }
              .c_thp2 {
                color: #7C82FF;
              }
              .c_thp3 {
                color: #FF8481;
              }
              .c_thp4 {
                color: #FFBB79;
              }
              .c_thp5 {
                color: #8DE684;
              }
              .c_thp6 {
                color: #f7de3b;
              }

              // .c_th0 {
              //   background: linear-gradient(0deg, #0075ff 0%, #00c2ff 100%);
              // }
              // .c_th1 {
              //   background: linear-gradient(-90deg, #FE5FB8, #ff83df);
              // }
              // .c_th2 {
              //   background: linear-gradient(90deg, #c4c8ff, #7279ff);
              // }
              // .c_th3 {
              //   background: linear-gradient(-90deg, #00D8FF, #46F7CB);
              // }
              // .c_th4 {
              //   background: linear-gradient(90deg, #FFE792, #FFC90C);
              // }
              .c_th0 {
                background: #8ACBFF;
              }
              .c_th1 {
                background: #FFB0DB;
              }
              .c_th2 {
                background: #B5B8FF;
              }
              .c_th3 {
                background: #FFA3A3;
              }
              .c_th4 {
                background: #FFD29D;
              }
              .c_th5 {
                background: #BDF5B8;
              }
              .c_th6 {
                background: #fff5b3;
              }
              .c_pie_td {
                display: inline-block;
                font-size: 0.14rem;
                font-family: Montserrat-Regular;
                font-weight: 400;
                margin-left: 0.04rem;
              }
            }
          }
          .c_o_my_txt {
            position: absolute;
            width: 2rem;
            text-align: center;
            height: 0.28rem;
            line-height: 0.28rem;
            font-size: 0.18rem;
            margin: auto;
            top: -0.1rem;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
          }
          .c_o_my_num {
            position: absolute;
            width: 2rem;
            text-align: center;
            height: 0.28rem;
            line-height: 0.28rem;
            font-size: 0.2rem;
            font-weight: 500;
            margin: auto;
            top: 0.46rem;
            color: #509AFF;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
        .center_t {
          margin: 0 0.2rem;
          width: 5.09rem;
          position: relative;
          .center_pie {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: 0.28rem;
            z-index: 11;
            .c_pie_li {
              padding: 0;
              font-size: 0.14rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354b70;
              display: flex;
              align-items: center;
              .c_pie_th {
                display: inline-block;
                width: 0.08rem;
                height: 0.08rem;
                margin-right: 0.04rem;
                border-radius: 50%;
              }
              .c_th0 {
                background: linear-gradient(0deg, #0075ff 0%, #00c2ff 100%);
              }
              .c_th1 {
                background: linear-gradient(-90deg, #FE5FB8, #ff83df);
              }
              .c_th2 {
                background: linear-gradient(90deg, #c4c8ff, #7279ff);
              }
              .c_th3 {
                background: linear-gradient(-90deg, #00D8FF, #46F7CB);
              }
              .c_th4 {
                background: linear-gradient(90deg, #FFE792, #FFC90C);
              }
              .c_pie_td {
                display: inline-block;
                font-size: 0.14rem;
                font-family: Montserrat-Regular;
                font-weight: 400;
                margin-left: 0.04rem;
              }
            }
          }
        }
        .center_f {
          width: 5.09rem;
        }
        .left_wel {
          height: 2.48rem;
          margin-bottom: 0.2rem;
          background: #ffffff;
          box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
          border-radius: 4px;
          .welcome {
            height: 1.17rem;
            background: url("../../assets/images/welcome.png") no-repeat center;
            background-size: 100% 1.17rem;
            line-height: 1;
            padding-left: 0.24rem;
            .w_txt1 {
              font-size: 0.2rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #006cff;
              padding: 0.32rem 0 0.16rem;
            }
            .w_txt2 {
              font-size: 0.18rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(0, 108, 255, 0.8);
            }
          }
          .person {
            display: flex;
            align-items: center;
            position: relative;
            height: 1.31rem;
            padding: 0 0.1rem 0 0.1rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            .per_photo {
              width: 1.04rem;
              height: 1.04rem;
              margin-right: 0rem;
            }
            .per_photo1 {
              border: 0;
            }
            .per_msg {
              line-height: 1;
              margin-right: 0.24rem;
              .per_msg_t {
                padding-bottom: 0.24rem;
                font-size: 0.18rem;
                color: #354b70;
                max-width:1.1rem;
              }
              .per_msg_b {
                min-height: 0.18rem;
                font-size: 0.16rem;
                color: #7786ac;
                max-width:1.1rem;
              }
              .montserrat{
                max-width: unset
              }
            }
            .per_center {
              width: 1.02rem;
              height: 0.36rem;
              background: linear-gradient(263deg, #0075ff, #00c2ff);
              box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
              border-radius: 3px;
              font-size: 0.16rem;
              color: #ffffff;
              text-align: center;
              line-height: 0.36rem;
              position: absolute;
              top: 0.24rem;
              right: 0.24rem;
            }
          }
        }
        .left_survey {
          height: 2.84rem;
          background: #ffffff;
          box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
          border-radius: 4px;
          padding: 0 0.24rem 0.28rem 0.24rem;
          .survey_box {
            display: flex;
            position: relative;
            .sur_left {
              line-height: 1;
              flex: 1;
              .stxt1 {
                margin-top: 0.36rem;
                font-size: 0.18rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #354b70;
              }
              .stxt2 {
                margin-top: 0.16rem;
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #7786ac;
                span {
                  font-size: 0.36rem;
                  font-family: Microsoft YaHei;
                  font-weight: bold;
                  color: #006cff;
                }
              }
              .stxt3 {
                margin-top: 0.29rem;
                font-size: 0.16rem;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #354b70;
                span {
                  font-size: 0.2rem;
                  font-family: Montserrat;
                  font-weight: 500;
                  color: #03e2f1;
                }
                .stxt_r {
                  color: #FE5FB8;
                }
                .stxt_g {
                  color: #03e2f1;
                }
                i.stxt_r {
                  font-size: 0.2rem;
                }
                i.stxt_g {
                  font-size: 0.2rem;
                }
                img {
                  width: 0.14rem;
                  height: 0.14rem;
                  margin: 0 0.11rem 0 0.08rem;
                }
              }
              .per_more {
                margin-top: 0.32rem;
                width: 1.02rem;
                height: 0.36rem;
                background: linear-gradient(263deg, #0075ff, #00c2ff);
                box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
                border-radius: 3px;
                font-size: 0.16rem;
                color: #ffffff;
                text-align: center;
                line-height: 0.36rem;
              }
            }
            .sur_right {
              width: 2.44rem;
              height: 2.44rem;
              position: absolute;
              right: -0.2rem;
            }
          }
        }
      }
      .top_right {
        flex: 2;
        margin-left: 0.2rem;
        .right_tow {
          display: flex;
          margin-top: 0.2rem;
          .center_o,
          .center_t,
          .center_f {
            flex: 1;
            width: 5.1rem;
            height: 3.22rem;
            background: #ffffff;
            padding: 0 0.24rem 0.28rem 0.24rem;
            box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
            border-radius: 4px;
          }
          .center_o {
            margin-top: 0.2rem;
          }
          .center_t {
            margin-right: 0.2rem;
            width: 5.09rem;
            position: relative;
            .center_pie {
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              position: absolute;
              margin: auto;
              left: 0;
              right: 0;
              bottom: 0.07rem;
              z-index: 11;
              .c_pie_li {
                padding: 0;
                font-size: 0.14rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #354b70;
                // display: flex;
                // align-items: center;
                // flex-wrap: wrap;
                .c_pie_th {
                  display: inline-block;
                  width: 0.08rem;
                  height: 0.08rem;
                  margin-right: 0.04rem;
                  border-radius: 50%;
                }
                .c_th_txt {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  font-size: 0.14rem;
                }
                .c_th_p {
                  padding-left: 0.08rem;
                }
                .c_thp0 {
                  color: #519AFE;
                }
                .c_thp1 {
                  color: #FF89CB;
                }
                .c_thp2 {
                  color: #7C82FF;
                }
                .c_thp3 {
                  color: #FF8481;
                }
                .c_thp4 {
                  color: #FFBB79;
                }
                .c_thp5 {
                  color: #8DE684;
                }
                .c_thp6 {
                  color: #f7de3b;
                }
                .c_th0 {
                  background: #8ACBFF;
                }
                .c_th1 {
                  background: #FFB0DB;
                }
                .c_th2 {
                  background: #B5B8FF;
                }
                .c_th3 {
                  background: #FFA3A3;
                }
                .c_th4 {
                  background: #FFD29D;
                }
                .c_th5 {
                  background: #BDF5B8;
                }
                .c_th6 {
                  background: #fff5b3;
                }
                .c_pie_td {
                  display: inline-block;
                  font-size: 0.14rem;
                  font-family: Montserrat-Regular;
                  font-weight: 400;
                  margin-left: 0.04rem;
                }
              }
            }
          }
          .center_f {
            width: 5.09rem;
            position: relative;
            .center_pie {
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              position: absolute;
              margin: auto;
              left: 0;
              right: 0;
              top: 0.75rem;
              z-index: 11;
              .c_pie_li {
                padding: 0;
                font-size: 0.14rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #354b70;
                display: flex;
                align-items: center;
                .c_pie_th {
                  display: inline-block;
                  width: 0.08rem;
                  height: 0.08rem;
                  margin-right: 0.04rem;
                  border-radius: 50%;
                }
                .c_th0 {
                  background: #8ACBFF;
                }
                .c_th1 {
                  background: #FFB0DB;
                }
                // .c_th0 {
                //   background: linear-gradient(0deg, #0075ff 0%, #00c2ff 100%);
                // }
                // .c_th1 {
                //   background: linear-gradient(-90deg, #FE5FB8, #ff83df);
                // }
                // .c_th2 {
                //   background: linear-gradient(90deg, #c4c8ff, #7279ff);
                // }
                // .c_th3 {
                //   background: linear-gradient(-90deg, #FFE792, #FFC90C);
                // }
                // .c_th4 {
                //   background: linear-gradient(90deg, #00D8FF, #46F7CB);
                // }
                .c_pie_td {
                  display: inline-block;
                  font-size: 0.14rem;
                  font-family: Montserrat-Regular;
                  font-weight: 400;
                  margin-left: 0.04rem;
                }
              }
            }
          }
        }
        .right_total {
          height: 1.44rem;
          margin-bottom: 0.2rem;
          display: flex;
          justify-content: space-between;
          .total_o,
          .total_t,
          .total_f {
            flex: 1;
            height: 100%;
            border-radius: 4px;
            font-size: 0.18rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
              margin-right: 0.34rem;
            }
            .total_txt {
              line-height: 1;
              margin-left: 0.4rem;
              .t_txt1 {
                font-size: 0.36rem;
                font-family: Montserrat;
                font-weight: bold;
                color: #ffffff;
                margin-bottom: 0.16rem;
                span {
                  font-size: 0.16rem;
                }
              }
              .t_txt2 {
                font-size: 0.18rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #ffffff;
              }
            }
          }
          .total_o {
            margin: 0 0.2rem;
            background: linear-gradient(-90deg, #6B8BDF 0%, #A1B6ED 99%);
            box-shadow: 0px 4px 10px 0px rgba(113,141,212,0.39);
            img {
              width: 0.72rem;
              height: 0.52rem;
            }
          }
          .total_t {
            background: linear-gradient(90deg, #4bc9ff 0%, #3270f3 100%);
            box-shadow: 0px 4px 10px 0px rgba(67, 173, 251, 0.39);
            img {
              width: 0.73rem;
              height: 0.48rem;
            }
          }
          .total_f {
            background: linear-gradient(90deg, #9da3f8 0%, #333cf2 100%);
            box-shadow: 0px 4px 10px 0px rgba(118, 158, 233, 0.36);
            img {
              width: 0.73rem;
              height: 0.48rem;
            }
          }
        }
        .right_trend {
          height: 3.88rem;
          background: #ffffff;
          box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
          border-radius: 4px;
          padding: 0 0.24rem 0.28rem 0.24rem;
          position: relative;
          .center_pie {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0.75rem;
            z-index: 11;
            .c_pie_li {
              padding: 0 0.3rem;
              font-size: 0.14rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354b70;
              display: flex;
              align-items: center;
              .c_pie_th {
                display: inline-block;
                width: 0.08rem;
                height: 0.08rem;
                margin-right: 0.04rem;
                border-radius: 50%;
              }
              .c_th0 {
                background: linear-gradient(0deg, #0075ff 0%, #00c2ff 100%);
              }
              .c_th1 {
                background: linear-gradient(-90deg, #FE5FB8, #ff83df);
              }
              .c_th2 {
                background: linear-gradient(90deg, #c4c8ff, #7279ff);
              }
              .c_th3 {
                background: linear-gradient(-90deg, #FFE792, #FFC90C);
              }
              .c_th4 {
                background: linear-gradient(90deg, #00D8FF, #46F7CB);
              }
              // .c_ths0{
              //   background: linear-gradient(268deg, #0075ff, #00c2ff);
              // }
              // .c_ths1{
              //   background: linear-gradient(90deg, #FEF569, #FFD800);
              // }
              // .c_ths2{
              //   background: linear-gradient(90deg, #FFCE9F, #FF849C);
              // }
              // .c_ths3{
              //   background: linear-gradient(74deg, #FFAB96, #FF0F47);
              // }
              .c_ths0{
                background: #8ACBFF;
              }
              .c_ths1{
                background: #B5B8FF;
              }
              .c_ths2{
                background: #FFD29D;
              }
              .c_ths3{
                background: #FFA3A3;
              }
              .c_pie_td {
                display: inline-block;
                font-size: 0.14rem;
                font-family: Montserrat-Regular;
                font-weight: 400;
                margin-left: 0.04rem;
              }
              .c_p_l_img {
                width:0.67rem;
                height:0.22rem;
              }
            }
          }
          .myChartLine {
            width: 100%;
            height: 2.94rem;
            margin-bottom: 0.26rem;
            overflow: hidden;
          }
          .tab_box {
            display: flex;
            justify-content: flex-end;
            width: 2.04rem;
            border-radius: 0.04rem;
            float: right;
            box-shadow: 0px 2px 9px 0px rgba(0, 123, 255, 0.2);
            .tab_btns {
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 0.68rem;
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
              border-left: 0.01rem solid #87b9db;
              border-right: 0.01rem solid #87b9db;
              border-radius: 0 0 0 0;
            }
            .tab_act {
              color: #ffffff;
              background: linear-gradient(90deg, #0075ff 0%, #00c2ff 100%);
            }
          }
        }
      }
    }
    .center_o_title {
      font-size: 0.18rem;
      line-height: 1;
      padding: 0.2rem 0 0;
      color: #354b70;
      font-weight: 400;
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 0.24rem;
      .c_o_tip {
        display: inline-block;
        text-align: center;
        font-size: 0.16rem;
        color: #ffffff;
        font-weight: 600;
        line-height: 0.18rem;
        margin-left: 0.07rem;
        width: 0.18rem;
        height: 0.18rem;
        border-radius: 50%;
        background: linear-gradient(
          176deg,
          rgba(0, 117, 255, 0.75),
          rgba(0, 194, 255, 0.75)
        );
      }
      .c_o_tip1 {
        background: transparent;
      }
    }
    .center_o_title::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0.21rem;
      width: 0.14rem;
      height: 0.14rem;
      background-image: url(../../assets/images/ti.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .index_main_bottom {
      margin-bottom: 0.2rem;
      .bottom_o {
        padding: 0 0.24rem 0.28rem 0.24rem;
        min-height: 4.5rem;
        background: #ffffff;
        box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
        border-radius: 4px;
        .el-table--border::after,
        .el-table--group::after,
        .el-table::before {
          height: 0;
        }
        .b_o_tab {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: Source Han Sans CN;
          font-weight: 400;
          .b_o_more {
            font-size: 0.16rem;
            color: #009aff;
          }
          .tab_box {
            margin: 0.18rem 0 0.15rem;
            display: flex;
            justify-content: flex-end;
            box-shadow: 0px 2px 9px 0px rgba(0, 123, 255, 0.2);
            .tab_btns {
              cursor: pointer;
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
            }
            .tab_btns_l {
              border-radius: 0.04rem 0px 0px 0.04rem;
            }
            .tab_btns_c {
              border-right: 0.01rem solid #87b9db;
            }
            
            .tab_act {
              color: #ffffff;
              background: linear-gradient(90deg, #0075ff 0%, #00c2ff 100%);
            }
          }
          .tab_box_t{
            margin: 0.0rem 0 0.1rem;
            .tab_btns_t{
              width: 0.8rem;
              height: 0.32rem;
            }
            
          }
          .b_o_more_t{
            margin-bottom: 0.1rem;
          }
        }
        margin: 0.2rem 0;
        background: #ffffff;
        box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
        border-radius: 4px;
        padding: 0.2rem 0.24rem;
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
        .sex_li_head {
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 1;
          img {
            width: 0.4rem;
            height: 0.4rem;
          }
        }
        .el_btn_box {
          margin: 0.18rem 0;
          .el-button + .el-button {
            margin-left: 0.18rem;
            padding: 0.09rem 0.14rem;
          }
          .el_btn_one,
          .el_btn_two {
            font-size: 0.16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            background: linear-gradient(263deg, #0075ff, #00c2ff);
            box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
            border-radius: 0.03rem;
            padding: 0.09rem 0.14rem;
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              img {
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
          }
        }
        .el-table {
          margin-bottom: 0rem;
          .el-table__header-wrapper {
            height: 0.42rem;
          }
          th.is-leaf {
            padding: 0.04rem 0;
          }
          td {
            height: 0.56rem;
            padding: 0;
          }
        }
        .el-table th,
        .el-table tr,
        .el-table td {
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          font-family: Source Han Sans CN;
        }
        .el-table td,
        .el-table th.is-leaf {
          border-color: #e1e9ff;
          border: 0;
        }
        .el-table thead th,
        .el-table thead tr {
          color: #354b70;
        }
        .el-table__header,
        .el-table__body {
          col:nth-child(7) {
            width: 2rem;
          }
        }
        .el-table td {
          color: #7786ac;
        }
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
        .el-button--mini,
        .el-button--small {
          font-size: 0.16rem;
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
            width: 0.67rem;
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
        .primary_r0{
          .el-button--primary.is-plain{
            color: #7786AC
          }
        }
        // .primary_r0{
        //   color:rgba(0, 232, 5, 1) !important;
        //   background: rgba(0, 232, 5, 0.1) !important;
        //   .el-button.is-plain,
        //   .el-button.is-plain:focus,
        //   .el-button.is-plain:hover {
        //     color: rgba(0, 232, 5, 1) !important;
        //   }
        // }
        // .primary_r1 {
        //   color: rgba(255, 210, 0, 1) !important;
        //   background: rgba(255, 210, 0, 0.1) !important;
        //   .el-button.is-plain,
        //   .el-button.is-plain:focus,
        //   .el-button.is-plain:hover {
        //     color: rgba(255, 210, 0, 1) !important;
        //   }
        // }
        // .primary_r2 {
        //   color: rgba(252, 155, 47, 1) !important;
        //   background: rgba(252, 155, 47, 0.1) !important;
        //   .el-button.is-plain,
        //   .el-button.is-plain:focus,
        //   .el-button.is-plain:hover {
        //     color: rgba(252, 155, 47, 1) !important;
        //   }
        // }
        // .primary_r3 {
        //   color: rgba(254, 39, 39, 1) !important;
        //   background: rgba(254, 39, 39, 0.1) !important;
        //   .el-button.is-plain,
        //   .el-button.is-plain:focus,
        //   .el-button.is-plain:hover {
        //     color: rgba(254, 39, 39, 1) !important;
        //   }
        // }
      }
    }
  }
}
</style>
