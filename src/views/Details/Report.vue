<template>
  <div class="detail_report_wrap">
    <img class="drw_bg" v-if='details.warningNum > 0' src="../../assets/images/news/yc_bg.png" alt="">
    <img class="drw_bg" v-else src="../../assets/images/news/zc_bg.png" alt="">
    
    <div class="top_back" @click="topBacks" v-show="scrollYs > part0">
      <img src="../../assets/images/report/to_top.png" alt="" />
    </div>
    <!-- scrollYs > part0 &&  -->
    <div
      class="r_futi r_futi_fix"
      v-show="!reviewFlag"
    >
      
      <div class="r_ff_box">
        <div
          :class="[
            'r_t_tab',
            { r_t_tab_act1: topAct == 1 }
          ]"
          @click="trendTab(1)"
        >
          <div>
            <img src="../../assets/images/news/zuopinjiedu.png" alt="" />
            <span>作品解读</span>
          </div>
          <div class="act1_line" v-if="topAct == 1"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 2 }]"
          @click="trendTab(2)"
        >
          <div>
            <img style="width: 0.52rem;height:0.45rem;" src="../../assets/images/news/bencigaik.png" alt="" />
            <span>本次概况</span>
          </div>
          <div class="act1_line" v-if="topAct == 2"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 3 }]"
          @click="trendTab(3)"
        >
          <div>
            <img style="width: 0.53rem;height:0.49rem;" src="../../assets/images/news/xlweidu.png" alt="" />
            <span>心理健康维度分析</span>
          </div>
          <div class="act1_line" v-if="topAct == 3"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 4 && bcType == 1 }]"
          @click="trendTab(4)"
          v-if="jjList.length > 0"
        >
          <div>
            <img style="width: 0.48rem;height:0.49rem;" src="../../assets/images/news/jiji.png" alt="" />
            <span>积极心理品质分析</span>
          </div>
          <div class="act1_line" v-if="topAct == 4 && bcType == 1 "></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 5 && bcType == 1  }]"
          @click="trendTab(5)"
        >
          
          <div>
            <img style="width: 0.43rem;height:0.52rem;" src="../../assets/images/news/rengefenxi.png" alt=""/>
            <span>人格分析</span>
          </div>
          <div class="act1_line" v-if="topAct == 5 && bcType == 1 "></div>
        </div>
        <!-- {{bcType}}-{{topAct}} -->
        <div
          :class="['r_t_tab', { r_t_tab_act1: (topAct == 4 && bcType == 3) || (topAct == 5 && bcType == 2) ||(topAct == 6 && bcType == 1)}]"
          @click="trendTab(6)"
        >
          <div>
            <img style="width: 0.54rem;height:0.44rem;" src="../../assets/images/news/beizhu.png" alt="" />
            <span>备注</span>
          </div>
          <div class="act1_line" v-if="(topAct == 4 && bcType == 3) || (topAct == 5 && bcType == 2) ||(topAct == 6 && bcType == 1)"></div>
        </div>
      </div>
      <div
        class="r_t_tab r_t_tab_t"
        @click="toReview"
      >
        <span>查看作品详情</span>
        <img src="../../assets/images/news/jiantou.png" alt="" />
      </div>
    </div>
    <!-- scrollYs > part0 &&  -->
    <!-- :class="['r_futi', { r_futi_fix: scrollYs > part0 }]" -->
    <div
      class="r_futi r_futi_fix"
      v-show="reviewFlag"
    >
      
      <div class="r_ff_box">
        <div
          :class="[
            'r_t_tab',
            { r_t_tab_act1: topAct == 1 }
          ]"
          @click="trendTabs(1)"
        >
          <div>
            <img style="width: 0.53rem;height: 0.51rem;" src="../../assets/images/news/tphg.png" alt="" />
            <span>图片回顾</span>
          </div>
          <div class="act1_line" v-if="topAct == 1"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 2 }]"
          @click="trendTabs(2)"
        >
          <div>
            <img style="width: 0.52rem;height:0.52rem;" src="../../assets/images/news/zpxxtj.png" alt="" />
            <span>作品信息统计</span>
          </div>
          <div class="act1_line" v-if="topAct == 2"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 3 }]"
          @click="trendTabs(3)"
        >
          <div>
            <img style="width: 0.53rem;height:0.52rem;" src="../../assets/images/news/sjsy.png" alt="" />
            <span>沙具使用情况统计</span>
          </div>
          <div class="act1_line" v-if="topAct == 3"></div>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act1: topAct == 4 }]"
          @click="trendTabs(4)"
        >
          <div>
            <img style="width: 0.54rem;height:0.53rem;" src="../../assets/images/news/syjlb.png" alt="" />
            <span>沙具使用记录表</span>
          </div>
          <div class="act1_line" v-if="topAct == 4"></div>
        </div>
        
      </div>
      <div
        class="r_t_tab r_t_tab_t"
        @click="toReview"
      >
        <span>查看测评分析</span>
        <img src="../../assets/images/news/jiantou.png" alt="" />
      </div>

      <!-- <div
        class="r_t_tab"
        style="margin-bottom:0.12rem;box-shadow: 0px 13px 43px 0px rgba(70, 101, 135, 0.1);"
        @click="toReview"
      >
        <img src="../../assets/images/report/part0.png" alt="" />
        <span>回到报告主页</span>
      </div>
      <div style="box-shadow: 0px 13px 43px 0px rgba(70, 101, 135, 0.1);">
        <div
          :class="[
            'r_t_tab',
            { r_t_tab_act1: topAct == 1 },
            { r_t_b0: topAct == 2 }
          ]"
          @click="trendTabs(1)"
        >
          <img src="../../assets/images/report/part1.png" alt="" />
          <span>图片回顾</span>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act2: topAct == 2 }]"
          @click="trendTabs(2)"
        >
          <img src="../../assets/images/report/part5.png" alt="" />
          <span>作品信息统计</span>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act2: topAct == 3 }]"
          @click="trendTabs(3)"
        >
          <img src="../../assets/images/report/part6.png" alt="" />
          <span>沙具统计</span>
        </div>
        <div
          :class="['r_t_tab', { r_t_tab_act2: topAct == 4 }]"
          @click="trendTabs(4)"
        >
          <img src="../../assets/images/report/part7.png" alt="" />
          <span>附录</span>
        </div>
      </div> -->
    </div>
    <div class="drw_contain">
      <div class="dt_header_wt">
        <div class="dt_h_box">
          <span>数据更新时间：{{ details.reportTime }}</span>
          <!-- v-if="part44" -->
          <div class="dt_download" @click="personExport">
            下载报告
          </div>
        </div>
      </div>

      <div class="drwc_box">
        <div class="drwc_b_flex">
          <img class="drwx_b_l" src="../../assets/images/news/rrzj.png" alt="">
          <div class="drwx_b_c">
            <span>认识你自己</span>
            <span>Know Yourself</span>
          </div>
          <div class="drwx_b_r">
            <p>“AI 心世界”是一款人工智能和心理沙盘相结合的特色产品，以“沙”为元素，通过有趣的玩“沙”方式认识你自己，创建属于每个人内心真正的“一沙一世界”。</p>
          </div>
        </div>
      </div>
      
      <!-- <div class="circle" style="width: 100px;height: 133.33px;border-radius: 50%;background-color: blue;display: inline-block;"></div> -->
      <div class="drwc_box" ref="parts0">
        <div class="drwc_b_person">
          <div class="dt_person_wt">
            <div class="dtp_main">
              <ul>
                <li style="width: 4rem;padding-bottom:0.3rem;">
                  <img
                    class="dt_per1"
                    src="../../assets/images/news/xingm.png"
                    alt=""
                  />
                  <span class="dt_blod">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                  <span>{{ details.name }}</span>
                </li>
                <li style="width: 3rem;padding-bottom:0.3rem;">
                  <img
                    class="dt_per2"
                    src="../../assets/images/news/denglu.png"
                    alt=""
                  />
                  <span class="dt_blod">登录账号：</span>
                  <span>{{ details.passport }}</span>
                </li>
                <li style="padding-bottom:0.3rem;">
                  <img
                    class="dt_per3"
                    src="../../assets/images/news/xingbie.png"
                    alt=""
                  />
                  <span class="dt_blod">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                  <span>{{ details.gender == 1 ? '男' : '女' }}</span>
                </li>
                <li style="width: 2.9rem;padding-bottom:0.3rem;">
                  <img
                    class="dt_per4"
                    src="../../assets/images/news/cishu.png"
                    alt=""
                  />
                  <span class="dt_blod">测评次数：</span>
                  <span>第{{ details.evaluationTime }}次</span>
                </li>
                <li style="width: 4rem">
                  <img
                    class="dt_per5"
                    src="../../assets/images/news/bumen.png"
                    alt=""
                  />
                  <span class="dt_blod">所属部门：</span>
                  <span>{{ details.departmentName }}</span>
                </li>
                <li style="width: 3rem">
                  <img
                    class="dt_per6"
                    src="../../assets/images/news/iphone.png"
                    alt=""
                  />
                  <span class="dt_blod">手&nbsp;机&nbsp;&nbsp;号：</span>
                  <span>{{ details.phone }}</span>
                </li>
                <li>
                  <img
                    class="dt_per7"
                    src="../../assets/images/news/shijian.png"
                    alt=""
                  />
                  <span class="dt_blod">测评时间：</span>
                  <span>{{ details.datetime }}</span>
                </li>
                <li style="width: 2.9rem">
                  <img
                    class="dt_per8"
                    src="../../assets/images/news/chusheng.png"
                    alt=""
                  />
                  <span class="dt_blod">出生日期：</span>
                  <span>{{ details.birth }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="drwc_box drwc_box_t">
        <div class="drwc_b_tips">
          <img class="drwx_b_l" style="width:0.22rem;" src="../../assets/images/news/tishi.png" alt="">
          <div class="drwx_b_r">
            <p>本报告结果仅供参考，不作为评价或选拔使用，可详见《指导建议手册》</p>
          </div>
          <img class="drwx_b_l" @click="toGuide" style="width:0.19rem;cursor: pointer;" src="../../assets/images/news/watch.png" alt="">
        </div>
      </div>
      <div v-show="!reviewFlag">
        <div class="drwc_box" ref="parts1">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.53rem;height: 0.55rem;" src="../../assets/images/news/zuopinjiedu.png" alt="">
              <span>作品解读</span>
            </div>
            <div class="drwc_b_work">
              <div class="dtm_contain">
                <div class="dtmc_left" style="width: auto;">
                  <div class="dtmcl_pic" v-if="birdViewImg !=''" @click="birdView">
                    <img :src="'data:image;base64,' + birdViewImg" alt="" />
                  </div>
                  <div class="dtmcl_pic" v-else>
                    <img src="../../assets/images/report/t001.png" alt="" />
                  </div>
                </div>
                <div class="dtmc_right1">
                  <div class="dtmcr_bts1">
                    <p v-if="details.themeDiscription && details.themeDiscription != ''">
                      <span v-html="details.themeDiscription"></span>
                    </p>
                    <p v-if="details.selfDiscription && details.selfDiscription != ''">
                      <span v-html="details.selfDiscription"></span>
                    </p>
                    <p v-if="details.satisfyArea && details.satisfyArea != ''">
                      <span v-html="details.satisfyArea"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="drwc_box" ref="parts2">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.52rem;height:0.45rem;" src="../../assets/images/news/bencigaik.png" alt="">
              <span>本次概况</span>
            </div>
            <div class="drwc_bw_t">
              <span class="drwcb_l"></span>
              <span class="drwcb_t">心理健康水平概况</span>
            </div>
            <div class="drwc_b_work">
              
              <div class="dtm_contain">
                <div class="dtmc_left" style="margin-top: 0.1rem;margin-right: 0">
                  <div class="dtmcl_chart" v-show="details.reportWarningInfo && details.warningList.length > 0">
                    <div id="myChart" class="my_chart" ref="myChart"></div>
                  </div>
                  <div class="dtmcl_chart" v-show="details.reportWarningInfo && details.warningList.length == 0">
                    <div class="dtmcl_c_nor">正常</div>
                  </div>
                  <div class="dtmcl_sys">
                    <!-- <div class="dtmcl_du3">
                      <span>数据解读</span>
                    </div> -->
                    <div class="dtmcl_sbox">
                      <div class="dtmcl_sb_t">风险评估：</div>
                      <div class="dtmcl_sb_c" v-if="details.reportWarningInfo">
                        <ul v-if="details.warningList.length > 0">
                          <li v-for="item in details.warningList" :key="item.id">
                            <span>{{item.name}}风险</span>
                            <img v-if="item.level == 1" src="../../assets/images/news/di.png" alt="">
                            <img v-if="item.level == 2" src="../../assets/images/news/zhong.png" alt="">
                            <img v-if="item.level == 3" src="../../assets/images/news/gao.png" alt="">
                          </li>
                        </ul>
                        <div v-else>
                          正常
                        </div>
                      </div>
                    </div>
                    <div class="dtmcl_stip">
                      <span>注：</span>
                      <img src="../../assets/images/news/hua.png" alt="">
                      <span>越多表示风险程度越高。</span>
                    </div>
                  </div>
                </div>
                <div class="dtmc_right">
                  <div class="dtmc_r_biao">
                    <ul>
                      <li>
                        <div>指标</div>
                        <div>本次结果</div>
                        <div>上次结果</div>
                      </li>
                      <li v-for="item in details.rangeList" :key="item.id">
                        <div>{{item.name}}</div>
                        <div>
                          <span v-if="item.level == -1">/</span>
                          <span v-if="item.level == 0">正常</span>
                          <img v-if="item.level == 1" src="../../assets/images/news/di.png" alt="">
                          <img v-if="item.level == 2" src="../../assets/images/news/zhong.png" alt="">
                          <img v-if="item.level == 3" src="../../assets/images/news/gao.png" alt="">
                        </div>
                        <div>
                          <span v-if="item.lastLevel == -1">/</span>
                          <span v-if="item.lastLevel == 0">正常</span>
                          <img v-if="item.lastLevel == 1" src="../../assets/images/news/di.png" alt="">
                          <img v-if="item.lastLevel == 2" src="../../assets/images/news/zhong.png" alt="">
                          <img v-if="item.lastLevel == 3" src="../../assets/images/news/gao.png" alt="">
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
            <div class="drwc_b_ysl" v-if="jjList.length > 0">
              <p></p>
            </div>
            <div class="drwc_bw_t">
              <span class="drwcb_l"></span>
              <span class="drwcb_t">积极心理品质分析</span>
            </div>
            <div class="drwc_b_work">
              
              <div class="dtm_contain">
                <div class="dtmc_left" style="margin-top: 0.1rem;margin-right: 0">
                  <div class="drwc_bw_shu drwc_bw_shu1">
                    <div class="tree_box">
                      <!-- <img class="tb_l1" src="../../assets/images/news/l1.png" alt="">
                      <div class="tb_s_c11"></div>
                      <div class="tb_s_c12"></div>
                      <div class="tb_s_c13"></div> -->
                      <img class="tb_l1" src="../../assets/images/news/l1.png" alt="">
                      <div class="tb_s_c11">
                        {{ jjList.length > 3 ? jjList[3].subDim[0].name : '' }}
                      </div>
                      <div class="tb_s_c12">
                        {{ jjList.length > 3 ? jjList[3].subDim[1].name : ''}}
                      </div>
                      <div class="tb_s_c13">
                        {{ jjList.length > 3 ? "..." : ''}}
                      </div>
                      <div :class="['cir_box11', { cir_box12: jjList.length > 3 && jjList[3].result.indexOf('中等') != -1 }, { cir_box13: jjList.length > 3 && jjList[3].result.indexOf('较高') != -1 }, { cir_box14: jjList.length > 3 && jjList[3].result.indexOf('极高') != -1 }]">
                        <div class="cir_img" v-if="jjList.length > 3"></div>
                        <div class="cir_lay"></div>
                        <div class="cir_cen">
                          <div v-if="jjList.length > 3">
                            <span v-for="item in jjList[3].title" :key="item.index">{{ item }}</span>
                          </div>
                        </div>
                      </div>
                      <!-- <img class="tb_l2" src="../../assets/images/news/l2.png" alt="">
                      <div class="tb_s_c21"></div>
                      <div class="tb_s_c22"></div>
                      <div class="tb_s_c23"></div> -->
                      <img class="tb_l2" src="../../assets/images/news/l2.png" alt="">
                      <div class="tb_s_c21">
                        {{ jjList.length > 1 ? jjList[1].subDim[0].name : '' }}
                      </div>
                      <div class="tb_s_c22">
                        {{ jjList.length > 1 ? jjList[1].subDim[1].name : ''}}
                      </div>
                      <div class="tb_s_c23">
                        {{ jjList.length > 1 ? "..." : ''}}
                      </div>
                      <div :class="['cir_box21', { cir_box22: jjList.length > 1 && jjList[1].result.indexOf('中等') != -1 }, { cir_box23: jjList.length > 1 && jjList[1].result.indexOf('较高') != -1 }, { cir_box24: jjList.length > 1 && jjList[1].result.indexOf('极高') != -1 }]">
                        <div class="cir_img" v-if="jjList.length > 1"></div>
                        <div class="cir_lay"></div>
                        <div class="cir_cen">
                          <div v-if="jjList.length > 1">
                            <span v-for="item in jjList[1].title" :key="item.index">{{ item }}</span>
                          </div>
                        </div>
                      </div>
                      <!-- <img class="tb_l3" src="../../assets/images/news/l3.png" alt="">
                      <div class="tb_s_c31"></div>
                      <div class="tb_s_c32"></div>
                      <div class="tb_s_c33"></div> -->
                      <img class="tb_l3" src="../../assets/images/news/l3.png" alt="">
                      <div class="tb_s_c31">
                        {{ jjList.length > 0 ? jjList[0].subDim[0].name : '' }}
                      </div>
                      <div class="tb_s_c32">
                        {{ jjList.length > 0 ? jjList[0].subDim[1].name : ''}}
                      </div>
                      <div class="tb_s_c33">
                        {{ jjList.length > 0 ? "..." : ''}}
                      </div>
                      <div :class="['cir_box31', { cir_box32: jjList.length > 0 && jjList[0].result.indexOf('中等') != -1 }, { cir_box33: jjList.length > 0 && jjList[0].result.indexOf('较高') != -1 }, { cir_box34: jjList.length > 0 && jjList[0].result.indexOf('极高') != -1 }]">
                        <div class="cir_img" v-if="jjList.length > 0"></div>
                        <div class="cir_lay"></div>
                        <div class="cir_cen">
                          <div v-if="jjList.length > 0">
                            <span v-for="item in jjList[0].title" :key="item.index">{{ item }}</span>
                          </div>
                        </div>
                      </div>
                      <!-- <img class="tb_l4" src="../../assets/images/news/l4.png" alt="">
                      <div class="tb_s_c41"></div>
                      <div class="tb_s_c42"></div>
                      <div class="tb_s_c43"></div> -->
                      <img class="tb_l4" src="../../assets/images/news/l4.png" alt="">
                      <div class="tb_s_c41">
                        {{ jjList.length > 2 ? jjList[2].subDim[0].name : '' }}
                      </div>
                      <div class="tb_s_c42">
                        {{ jjList.length > 2 ? jjList[2].subDim[1].name : ''}}
                      </div>
                      <div class="tb_s_c43">
                        {{ jjList.length > 2 ? "..." : ''}}
                      </div>
                      <div :class="['cir_box41', { cir_box42: jjList.length > 2 && jjList[2].result.indexOf('中等') != -1 }, { cir_box43: jjList.length > 2 && jjList[2].result.indexOf('较高') != -1 }, { cir_box44: jjList.length > 2 && jjList[2].result.indexOf('极高') != -1 }]">
                        <div class="cir_img" v-if="jjList.length > 2"></div>
                        <div class="cir_lay"></div>
                        <div class="cir_cen">
                          <div v-if="jjList.length > 2">
                            <span v-for="item in jjList[2].title" :key="item.index">{{ item }}</span>
                          </div>
                        </div>
                      </div>
                      <!-- <img class="tb_l5" src="../../assets/images/news/l5.png" alt="">
                      <div class="tb_s_c51"></div>
                      <div class="tb_s_c52"></div>
                      <div class="tb_s_c53"></div> -->
                      <img class="tb_l5" src="../../assets/images/news/l5.png" alt="">
                      <div class="tb_s_c51">
                        {{ jjList.length > 4 ? jjList[4].subDim[0].name : '' }}
                      </div>
                      <div class="tb_s_c52">
                        {{ jjList.length > 4 ? jjList[4].subDim[1].name : ''}}
                      </div>
                      <div class="tb_s_c53">
                        {{ jjList.length > 4 ? "..." : ''}}
                      </div>
                      <div :class="['cir_box51', { cir_box52: jjList.length > 4 && jjList[4].result.indexOf('中等') != -1 }, { cir_box53: jjList.length > 4 && jjList[4].result.indexOf('较高') != -1 }, { cir_box54: jjList.length > 4 && jjList[4].result.indexOf('极高') != -1 }]">
                        <div class="cir_img" v-if="jjList.length > 4"></div>
                        <div class="cir_lay"></div>
                        <div class="cir_cen">
                          <div v-if="jjList.length > 4">
                            <span v-for="item in jjList[4].title" :key="item.index">{{ item }}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <!-- <div class="dtmcl_chart" v-show="details.reportWarningInfo && details.warningList.length > 0">
                    <div id="myChart" class="my_chart" ref="myChart"></div>
                  </div>
                  <div class="dtmcl_chart" v-show="details.reportWarningInfo && details.warningList.length == 0">
                    <div class="dtmcl_c_nor">正常</div>
                  </div> -->
                  <div class="dtmcl_sys">
                    <!-- <div class="dtmcl_du3">
                      <span>数据解读</span>
                    </div> -->
                    <div class="dtmcl_sbox" v-if="jjName != ''">
                      <div class="dtmcl_sb_t">优势评估：该受测者在{{jjName}}得分最高，表现最好{{ jjTotal != '' ? '，' + jjTotal : '' }}。</div>
                      <!-- <div class="dtmcl_sb_c" v-if="details.reportWarningInfo">
                        <ul v-if="details.warningList.length > 0">
                          <li v-for="item in details.warningList" :key="item.id">
                            <span>{{item.name}}风险</span>
                            <img v-if="item.level == 1" src="../../assets/images/news/di.png" alt="">
                            <img v-if="item.level == 2" src="../../assets/images/news/zhong.png" alt="">
                            <img v-if="item.level == 3" src="../../assets/images/news/gao.png" alt="">
                          </li>
                        </ul>
                        <div v-else>
                          正常
                        </div>
                      </div> -->
                    </div>
                    <div class="dtmcl_stip">
                      <span>注：</span>
                      <img src="../../assets/images/news/xing.png" alt="" style="margin-right: 0.04rem;">
                      <span>越多表示在该维度上表现越好。</span>
                    </div>
                  </div>
                </div>
                <div class="dtmc_right">
                  <div class="dtmc_r_biao">
                    <ul>
                      <li>
                        <div>指标</div>
                        <div>本次结果</div>
                        <div>上次结果</div>
                      </li>
                      <li v-for="item in details.jjList" :key="item.id">
                        <div>{{item.title}}</div>
                        <div>
                          <span v-if="item.level == -1">/</span>
                          <img v-if="item.level == 0" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaodi.png" alt="">
                          <img v-if="item.level == 1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/zhongdeng.png" alt="">
                          <img v-if="item.level == 2" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaogao.png" alt="">
                          <img v-if="item.level == 3" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jigao.png" alt="">
                          <!-- <img v-if="item.result.indexOf('较低') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaodi.png" alt="">
                          <img v-if="item.result.indexOf('中等') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/zhongdeng.png" alt="">
                          <img v-if="item.result.indexOf('较高') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaogao.png" alt="">
                          <img v-if="item.result.indexOf('极高') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jigao.png" alt=""> -->
                        </div>
                        <div>
                          <span v-if="item.lastLevel == -1">/</span>
                          <img v-if="item.lastLevel == 0" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaodi.png" alt="">
                          <img v-if="item.lastLevel == 1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/zhongdeng.png" alt="">
                          <img v-if="item.lastLevel == 2" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaogao.png" alt="">
                          <img v-if="item.lastLevel == 3" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jigao.png" alt="">
                          <!-- <img v-if="item.result.indexOf('较低') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaodi.png" alt="">
                          <img v-if="item.result.indexOf('中等') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/zhongdeng.png" alt="">
                          <img v-if="item.result.indexOf('较高') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaogao.png" alt="">
                          <img v-if="item.result.indexOf('极高') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jigao.png" alt=""> -->
                          
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
            <!-- <div class="drwc_b_ys" v-if="jjName != ''">
              <p><span>优势评估：</span>该受测者在{{jjName}}得分最高，表现最好。</p>
            </div> -->
          </div>
        </div>

        <div class="drwc_box" ref="parts3">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.53rem;height:0.49rem;" src="../../assets/images/news/xlweidu.png" alt="">
              <span>心理健康维度分析</span>
            </div>
            <div class="drwc_b_tab">
              <div class="drwc_bt_left">
                <div class="drwc_btl" v-if='details.rangeList'>
                  <ul>
                    <li :class="[{ btl_act: item.id == btlActNum}]" :style="{display:item.flag == 1 ? 'block' : 'none'}" v-for="item in sysList" :key="item.id" @click="btlChange(item.id)">
                      {{ item.title }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="drwc_bt_right">
                <div class="drwc_btr">
                  <div class="wdrj_box">
                    <div class="wdrjs_li wdrj_main" :style="{display: item.flag == 1 && item.id == btlActNum ? 'block' : 'none'}" v-for="(item, index) in sysList" :key="item.id">
                      <div class="wdrj_title">
                        <span><span style="font-weight:500">{{item.title}}</span>—测评结果：</span>
                        <span v-if="item.level == 0">正常</span>
                        <img v-if="item.level == 1" src="../../assets/images/news/di.png" alt="">
                        <img v-if="item.level == 2" src="../../assets/images/news/zhong.png" alt="">
                        <img v-if="item.level == 3" src="../../assets/images/news/gao.png" alt="">
                      </div>
                      <div class="dtmsb_tar">
                        <div style="position:relative" id="perViolenceEchart">
                          <div class="top_top" v-if="item.subDim">
                            <span class="tt_txt">
                              {{ item.subDim[0].name }}
                              <!-- <div class="demsb_tool">
                                <div class="demsb_score">
                                  本次得分：<span>{{
                                    parseInt(item.subDim[0].score)
                                  }}</span>
                                </div>
                              </div> -->
                            </span>
                          </div>
                          <div class="bottom_left" v-if="item.subDim">
                            <span class="tt_txt">
                              {{ item.subDim[2].name }}
                              <!-- <div class="demsb_tool">
                                <div class="demsb_score">
                                  本次得分：<span>{{
                                    parseInt(item.subDim[2].score)
                                  }}</span>
                                </div>
                              </div> -->
                            </span>
                          </div>
                          <div class="bottom_right" v-if="item.subDim">
                            <span class="tt_txt">
                              {{ item.subDim[1].name }}
                              <!-- <div class="demsb_tool1">
                                <div class="demsb_score">
                                  本次得分：<span>{{
                                    parseInt(item.subDim[1].score)
                                  }}</span>
                                </div>
                              </div> -->
                            </span>
                          </div>
                          <!-- 抑郁 -->
                          <div v-if="index == 0" id="myChartLd2" class="myChartLd0" ref="myChartLd2" style="height:2.66rem"></div>
                          <!-- 焦虑 -->
                          <div v-if="index == 1" id="myChartLd3" class="myChartLd0" ref="myChartLd3" style="height:2.66rem"></div>
                          <!-- 强迫 -->
                          <div v-if="index == 2" id="myChartLd4" class="myChartLd0" ref="myChartLd4" style="height:2.66rem"></div>
                          <!-- PTSD -->
                          <div v-if="index == 3" id="myChartLd5" class="myChartLd0" ref="myChartLd5" style="height:2.66rem"></div>
                          <!-- 敌对 -->
                          <div v-if="index == 4" id="myChartLd6" class="myChartLd0" ref="myChartLd6" style="height:2.66rem"></div>
                          <!-- 自我伤害 -->
                          <div v-if="index == 5" id="myChartLd7" class="myChartLd0" ref="myChartLd7" style="height:2.66rem"></div>
                          <!-- 自闭 -->
                          <!-- <div v-if="index == 6" id="myChartLd8" class="myChartLd0" ref="myChartLd8" style="height:2.66rem"></div> -->
                        </div>
                      </div>
                      <div class="wdrj_suger" style="margin-top:0rem">
                        <div class="wdrjs_title">
                          <img src="../../assets/images/news/dot.png" alt="" />测评结果分析
                        </div>
                        <ul class="wdrjs_uls">
                          <li v-for="(items, indexs) in item.sysDim" :key="indexs">
                            <p>
                              {{ indexs + 1 }}.{{ items }}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div class="wdrj_suger" style="margin-top:0rem" v-if="item.suggestDim != ''">
                        <div class="wdrjs_title">
                          <img src="../../assets/images/news/dot.png" alt="" />指导建议
                        </div>
                        <ul class="wdrjs_uls">
                          <li v-for="(items, indexs) in item.suggestDim" :key="indexs">
                            <p v-if="!Array.isArray(items)" :style="{'font-weight': String(items).indexOf('针对') != -1 ? '500' : '400'}">
                              {{ items }}
                            </p>
                            <div v-if="Array.isArray(items)">
                              <div v-for="(itemu, indexu) in items" :key="indexu">
                                <p v-for="(itemv, indexv) in itemu" :key="indexv" :style="{'font-weight': String(itemv).indexOf('针对') != -1 ? '500' : '400'}">{{String(itemv).indexOf('针对') != -1 ? '' : indexv +'.'}}{{ itemv }}</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="drwc_b_tips drwc_b_tips1">
              <img class="drwx_b_l" style="width:0.22rem;" src="../../assets/images/news/tishi.png" alt="">
              <div class="drwx_b_r">
                <p>本报告结果仅供参考，不作为评价或选拔使用，可详见《指导建议手册》</p>
              </div>
              <img class="drwx_b_l" @click="toGuide" style="width:0.19rem;cursor: pointer;" src="../../assets/images/news/watch.png" alt="">
            </div>
          </div>
        </div>
        <div class="drwc_box" ref="parts61">
          <div class="drwc_common">
            <div class="wdrj_box">
              <div class="wdrj_main">
                <div class="wdrj_title" >
                  <img src="../../assets/images/news/dot.png" alt="" />
                  补充说明
                </div>
                <div class="wm_text" style="display: flex;align-items: center">
                  <el-input v-if="!assessmentFlag1" placeholder="请填写" :autosize="{ minRows: 3}" type="textarea" v-model="assessment1" @input="noteChange1" maxlength="300" show-word-limit></el-input>
                  <el-input v-else  disabled :autosize="{ minRows: 3}" type="textarea" v-model="assessment1"></el-input>
                  <el-button style="margin: 0 -0.3rem 0 0.2rem;" type="primary" v-if="!assessmentFlag1" @click="recordSub1">提交</el-button>
                  <el-button style="margin: 0 -0.3rem 0 0.2rem;" type="primary primary1" v-if="assessmentFlag1" @click="assessmentFlag1 = !assessmentFlag1">修改</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="drwc_box" ref="parts4" v-show="jjList.length > 0"> -->
        <div class="drwc_box" ref="parts4" style="display: none;">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.48rem;height:0.49rem;" src="../../assets/images/news/jiji.png" alt="">
              <span>积极心理品质分析</span>
            </div>
            <div class="drwc_b_tab drwc_b_tab1">
              <div class="drwc_bt_left drwc_bt_top">
                <div class="drwc_btl" v-if='details.jjList'>
                  <ul v-if="details.jjList.length > 1">
                    <li :class="[{ btl_act: item.id == jjActNum}]" :style="{'display':item.flag == 1 ? 'block' : 'none', 'border-left' : index == 0 && item.id == jjActNum ? '0' : '0.01rem solid rgba(203, 206, 224, 1)' }" v-for="(item, index) in jjList" :key="item.id" @click="jjChange(item.id)">
                      {{ item.title }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="drwc_bt_right drwc_bt_bottom">
                <div class="drwc_btr">
                  <div class="wdrj_box">
                    <div class="wdrjs_li wdrj_main" :style="{'margin-bottom': '0.3rem', display: item.flag == 1 && item.id == jjActNum ? 'block' : 'none'}" v-for="(item, index) in jjList" :key="item.id">
                      <div class="wdrj_title">
                        <span><span style="font-weight:500">{{item.title}}</span>—测评结果：</span>
                        <img v-if="item.result.indexOf('较低') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaodi.png" alt="">
                        <img v-if="item.result.indexOf('中等') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/zhongdeng.png" alt="">
                        <img v-if="item.result.indexOf('较高') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jiaogao.png" alt="">
                        <img v-if="item.result.indexOf('极高') != -1" style="width: 0.86rem;height: 0.2rem;" src="../../assets/images/news/jigao.png" alt="">
                      </div>
                      <div class="dtmsb_tar" style="height: auto;margin-top:0.24rem;margin: 0.2rem;width: auto;">
                        <div style="position:relative" id="perViolenceEchart">
                          <!-- <img class="dengpao" v-if="item.result.indexOf('较低') != -1" src="../../assets/images/news/jiaodis.png" alt="">
                          <img class="dengpao" v-if="item.result.indexOf('中等') != -1" src="../../assets/images/news/zhongdengs.png" alt="">
                          <img class="dengpao" v-if="item.result.indexOf('较高') != -1" src="../../assets/images/news/jiaogaos.png" alt="">
                          <img class="dengpao" v-if="item.result.indexOf('极高') != -1" src="../../assets/images/news/jigaos.png" alt=""> -->
                          <ol class="dtmsb_tu">
                            <li v-for="(itemm, indexm) in item.subDim" :key="indexm">
                              <img src="../../assets/images/news/dot_wz.png" alt="">
                              <span v-if="indexm < 2">{{itemm.name}}</span>
                              <span style="margin-left: 0.04rem;" v-else>......</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div class="wdrj_suger" style="margin-top:0rem">
                        <div class="wdrjs_title">
                          <img src="../../assets/images/news/dot.png" alt="" />测评结果分析
                        </div>
                        <ul class="wdrjs_uls">
                          <li v-for="(items, indexs) in item.sysDim" :key="indexs">
                            <p>
                              {{ indexs + 1 }}.{{ items }}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <!-- <div class="wdrj_suger" style="margin-top:0rem" v-if="item.suggestDim != ''">
                        <div class="wdrjs_title">
                          <img src="../../assets/images/news/dot.png" alt="" />指导建议
                        </div>
                        <ul class="wdrjs_uls">
                          <li v-for="(items, indexs) in item.suggestDim" :key="indexs">
                            <p v-if="!Array.isArray(items)" :style="{'font-weight': String(items).indexOf('针对') != -1 ? '500' : '400'}">
                              {{ items }}
                            </p>
                            <div v-if="Array.isArray(items)">
                              <div v-for="(itemu, indexu) in items" :key="indexu">
                                <p v-for="(itemv, indexv) in itemu" :key="indexv" :style="{'font-weight': String(itemv).indexOf('针对') != -1 ? '500' : '400'}">{{String(itemv).indexOf('针对') != -1 ? '' : indexv +'.'}}{{ itemv }}</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="drwc_b_ys drwc_b_ysp" style="border-top: 0.01rem solid #EAEBF1;" v-show="jjName != ''">
              <div class="drwc_sp_head">积极心理品质各维度表现情况</div>
              <div class="myChartZhu" ref="myChartZhuYs" id="myChartZhuYs"></div>
            </div>
            <div class="drwc_b_ys drwc_b_ysp" v-if="jjName != ''">
              <p>
                <img src="../../assets/images/news/dengpao_wz.png" alt="">
                该受测者在{{jjName}}表现最好，得分最高，管理者可以鼓励该受测者继续发挥自身在这些方面的优势。</p>
              
            </div>
          </div>
        </div>

        <div class="drwc_box" ref="parts4" v-if="jjList.length > 0">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.48rem;height:0.49rem;" src="../../assets/images/news/jiji.png" alt="">
              <span>积极心理品质分析</span>
            </div>
            <div class="drwc_bw_shu">
              <div class="tree_box">
                <!-- <img class="tb_l1" src="../../assets/images/news/l1.png" alt="">
                <div class="tb_s_c11"></div>
                <div class="tb_s_c12"></div>
                <div class="tb_s_c13"></div> -->
                <img class="tb_l1" src="../../assets/images/news/l1.png" alt="">
                <div class="tb_s_c11">
                  {{ jjList.length > 3 ? jjList[3].subDim[0].name : '' }}
                </div>
                <div class="tb_s_c12">
                  {{ jjList.length > 3 ? jjList[3].subDim[1].name : ''}}
                </div>
                <div class="tb_s_c13">
                  {{ jjList.length > 3 ? "..." : ''}}
                </div>
                <div :class="['cir_box11', { cir_box12: jjList.length > 3 && jjList[3].result.indexOf('中等') != -1 }, { cir_box13: jjList.length > 3 && jjList[3].result.indexOf('较高') != -1 }, { cir_box14: jjList.length > 3 && jjList[3].result.indexOf('极高') != -1 }]">
                  <div class="cir_img" v-if="jjList.length > 3"></div>
                  <div class="cir_lay"></div>
                  <div class="cir_cen">
                    <div v-if="jjList.length > 3">
                      <span v-for="item in jjList[3].title" :key="item.index">{{ item }}</span>
                    </div>
                  </div>
                </div>
                <!-- <img class="tb_l2" src="../../assets/images/news/l2.png" alt="">
                <div class="tb_s_c21"></div>
                <div class="tb_s_c22"></div>
                <div class="tb_s_c23"></div> -->
                <img class="tb_l2" src="../../assets/images/news/l2.png" alt="">
                <div class="tb_s_c21">
                  {{ jjList.length > 1 ? jjList[1].subDim[0].name : '' }}
                </div>
                <div class="tb_s_c22">
                  {{ jjList.length > 1 ? jjList[1].subDim[1].name : ''}}
                </div>
                <div class="tb_s_c23">
                  {{ jjList.length > 1 ? "..." : ''}}
                </div>
                <div :class="['cir_box21', { cir_box22: jjList.length > 1 && jjList[1].result.indexOf('中等') != -1 }, { cir_box23: jjList.length > 1 && jjList[1].result.indexOf('较高') != -1 }, { cir_box24: jjList.length > 1 && jjList[1].result.indexOf('极高') != -1 }]">
                  <div class="cir_img" v-if="jjList.length > 1"></div>
                  <div class="cir_lay"></div>
                  <div class="cir_cen">
                    <div v-if="jjList.length > 1">
                      <span v-for="item in jjList[1].title" :key="item.index">{{ item }}</span>
                    </div>
                  </div>
                </div>
                <!-- <img class="tb_l3" src="../../assets/images/news/l3.png" alt="">
                <div class="tb_s_c31"></div>
                <div class="tb_s_c32"></div>
                <div class="tb_s_c33"></div> -->
                <img class="tb_l3" src="../../assets/images/news/l3.png" alt="">
                <div class="tb_s_c31">
                  {{ jjList.length > 0 ? jjList[0].subDim[0].name : '' }}
                </div>
                <div class="tb_s_c32">
                  {{ jjList.length > 0 ? jjList[0].subDim[1].name : ''}}
                </div>
                <div class="tb_s_c33">
                  {{ jjList.length > 0 ? "..." : ''}}
                </div>
                <div :class="['cir_box31', { cir_box32: jjList.length > 0 && jjList[0].result.indexOf('中等') != -1 }, { cir_box33: jjList.length > 0 && jjList[0].result.indexOf('较高') != -1 }, { cir_box34: jjList.length > 0 && jjList[0].result.indexOf('极高') != -1 }]">
                  <div class="cir_img" v-if="jjList.length > 0"></div>
                  <div class="cir_lay"></div>
                  <div class="cir_cen">
                    <div v-if="jjList.length > 0">
                      <span v-for="item in jjList[0].title" :key="item.index">{{ item }}</span>
                    </div>
                  </div>
                </div>
                <!-- <img class="tb_l4" src="../../assets/images/news/l4.png" alt="">
                <div class="tb_s_c41"></div>
                <div class="tb_s_c42"></div>
                <div class="tb_s_c43"></div> -->
                <img class="tb_l4" src="../../assets/images/news/l4.png" alt="">
                <div class="tb_s_c41">
                  {{ jjList.length > 2 ? jjList[2].subDim[0].name : '' }}
                </div>
                <div class="tb_s_c42">
                  {{ jjList.length > 2 ? jjList[2].subDim[1].name : ''}}
                </div>
                <div class="tb_s_c43">
                  {{ jjList.length > 2 ? "..." : ''}}
                </div>
                <div :class="['cir_box41', { cir_box42: jjList.length > 2 && jjList[2].result.indexOf('中等') != -1 }, { cir_box43: jjList.length > 2 && jjList[2].result.indexOf('较高') != -1 }, { cir_box44: jjList.length > 2 && jjList[2].result.indexOf('极高') != -1 }]">
                  <div class="cir_img" v-if="jjList.length > 2"></div>
                  <div class="cir_lay"></div>
                  <div class="cir_cen">
                    <div v-if="jjList.length > 2">
                      <span v-for="item in jjList[2].title" :key="item.index">{{ item }}</span>
                    </div>
                  </div>
                </div>
                <!-- <img class="tb_l5" src="../../assets/images/news/l5.png" alt="">
                <div class="tb_s_c51"></div>
                <div class="tb_s_c52"></div>
                <div class="tb_s_c53"></div> -->
                <img class="tb_l5" src="../../assets/images/news/l5.png" alt="">
                <div class="tb_s_c51">
                  {{ jjList.length > 4 ? jjList[4].subDim[0].name : '' }}
                </div>
                <div class="tb_s_c52">
                  {{ jjList.length > 4 ? jjList[4].subDim[1].name : ''}}
                </div>
                <div class="tb_s_c53">
                  {{ jjList.length > 4 ? "..." : ''}}
                </div>
                <div :class="['cir_box51', { cir_box52: jjList.length > 4 && jjList[4].result.indexOf('中等') != -1 }, { cir_box53: jjList.length > 4 && jjList[4].result.indexOf('较高') != -1 }, { cir_box54: jjList.length > 4 && jjList[4].result.indexOf('极高') != -1 }]">
                  <div class="cir_img" v-if="jjList.length > 4"></div>
                  <div class="cir_lay"></div>
                  <div class="cir_cen">
                    <div v-if="jjList.length > 4">
                      <span v-for="item in jjList[4].title" :key="item.index">{{ item }}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="drwc_b_ys drwc_b_ysp" v-if="jjName != ''">
              <p>
                <img src="../../assets/images/news/dengpao_wz.png" alt="">
                该受测者在{{jjName}}表现最好，得分最高，管理者可以鼓励该受测者继续发挥自身在这些方面的优势。具体表现如下：</p>
              <p style="margin-left: 0.42rem;" v-for="(item, index) in jjDetail" :key="index">
                {{ index + 1 }}.{{ item }}
              </p>
            </div>
          </div>
        </div>
        <div class="drwc_box" ref="parts62">
          <div class="drwc_common">
            <div class="wdrj_box">
              <div class="wdrj_main">
                <div class="wdrj_title" >
                  <img src="../../assets/images/news/dot.png" alt="" />
                  补充说明
                </div>
                <div class="wm_text" style="display: flex;align-items: center">
                  <el-input v-if="!assessmentFlag2" placeholder="请填写" :autosize="{ minRows: 3}" type="textarea" v-model="assessment2" @input="noteChange2" maxlength="300" show-word-limit></el-input>
                  <el-input v-else  disabled :autosize="{ minRows: 3}" type="textarea" v-model="assessment2"></el-input>
                  <el-button style="margin: 0 -0.3rem 0 0.2rem;" type="primary" v-if="!assessmentFlag2" @click="recordSub2">提交</el-button>
                  <el-button style="margin: 0 -0.3rem 0 0.2rem;" type="primary primary1" v-if="assessmentFlag2" @click="assessmentFlag2 = !assessmentFlag2">修改</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="drwc_box" ref="parts5">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.43rem;height:0.52rem;" src="../../assets/images/news/rengefenxi.png" alt="">
              <span>人格分析</span>
            </div>
            <div class="drwc_b_tab drwc_b_tab1">
              <div class="drwc_bt_left drwc_bt_top">
                <div class="drwc_btl" v-if='details.rgList'>
                  <ul>
                    <li :class="[{ btl_act: item.id == rgActNum}]" :style="{'display':item.flag == 1 ? 'block' : 'none', 'border-left' : index == 0 && item.id == rgActNum ? '0' : '0.01rem solid rgba(203, 206, 224, 1)' }" v-for="(item, index) in rgList" :key="item.id" @click="rgChange(item.id)">
                      {{ item.title }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="drwc_bt_right drwc_bt_bottom">
                <div class="drwc_btr">
                  <div class="wdrj_box">
                    <div class="wdrjs_li wdrj_main" :style="{display: item.flag == 1 && item.id == rgActNum ? 'block' : 'none'}" v-for="(item, index) in rgList" :key="item.id">
                      <div class="wdrj_title">
                        <span><span style="font-weight:500">{{item.title}}</span>—测评结果：</span>
                        <span v-if="item.grade < 2 && item.grade > -1">低</span>
                        <span v-if="item.grade < 4 && item.grade > 1">偏低</span>
                        <span v-if="item.grade < 6 && item.grade > 3">中等</span>
                        <span v-if="item.grade < 8 && item.grade > 5">偏高</span>
                        <span v-if="item.grade < 10 && item.grade > 7">高</span>
                      </div>
                      <div class="wdrj_line">
                        <div class="wdrj_l_left">低</div>
                        <div class="wdrj_l_center">
                          <div class="wdrj_lc_txt">
                            <span>0分</span>
                            <span>{{item.title}}</span>
                            <span>9分</span>
                          </div>
                          <img
                            class="dttr_btn"
                            :style="{ left: item.gradep }"
                            src="../../assets/images/news/grade_btn.png"
                            alt=""
                          />
                          <span class="dttr_score" :style="{ left: item.gradep }">
                            {{item.grade}}分，
                            <span v-if="item.grade < 2 && item.grade > -1">低</span>
                            <span v-if="item.grade < 4 && item.grade > 1">偏低</span>
                            <span v-if="item.grade < 6 && item.grade > 3">中等</span>
                            <span v-if="item.grade < 8 && item.grade > 5">偏高</span>
                            <span v-if="item.grade < 10 && item.grade > 7">高</span>
                          <i></i>
                          </span>
                        </div>
                        <div class="wdrj_l_right">高</div>
                      </div>
                      <div class="dtmsb_tar">
                        <div style="position:relative" id="perViolenceEchart">
                          <div class="top_top" style="top:0.2rem" v-if="item.subDim">
                            <span class="tt_txt">
                              {{ item.subDim[0].name }}
                              <!-- <div class="demsb_tool" style="left: 2.3rem;">
                                <div class="demsb_score">
                                  本次得分：<span>{{
                                    parseInt(item.subDim[0].score)
                                  }}</span>
                                </div>
                              </div> -->
                            </span>
                          </div>
                          <div class="bottom_left" style="left: 3.3rem;bottom: 0.42rem;" v-if="item.subDim">
                            <span class="tt_txt">
                              {{ item.subDim[2].name }}
                              <!-- <div class="demsb_tool" style="left: 2.3rem;">
                                <div class="demsb_score">
                                  本次得分：<span>{{
                                    parseInt(item.subDim[2].score)
                                  }}</span>
                                </div>
                              </div> -->
                            </span>
                          </div>
                          <div class="bottom_right" style="left: 0.82rem;bottom: 0.42rem;" v-if="item.subDim">
                            <span class="tt_txt">
                              {{ item.subDim[1].name }}
                              <!-- <div class="demsb_tool1" style="right: 2.3rem;">
                                <div class="demsb_score">
                                  本次得分：<span>{{
                                    parseInt(item.subDim[1].score)
                                  }}</span>
                                </div>
                              </div> -->
                            </span>
                          </div>
                          <!-- 抑郁 -->
                          <div v-if="index == 0" id="myChartRg2" class="myChartLd0" ref="myChartRg2" style="height:2.66rem"></div>
                          <!-- 焦虑 -->
                          <div v-if="index == 1" id="myChartRg3" class="myChartLd0" ref="myChartRg3" style="height:2.66rem"></div>
                          <!-- 强迫 -->
                          <div v-if="index == 2" id="myChartRg4" class="myChartLd0" ref="myChartRg4" style="height:2.66rem"></div>
                          <!-- PTSD -->
                          <div v-if="index == 3" id="myChartRg5" class="myChartLd0" ref="myChartRg5" style="height:2.66rem"></div>
                          <!-- 敌对 -->
                          <div v-if="index == 4" id="myChartRg6" class="myChartLd0" ref="myChartRg6" style="height:2.66rem"></div>
                        </div>
                      </div>
                      <div class="wdrj_suger" style="margin-top:0rem">
                        <div class="wdrjs_title">
                          <img src="../../assets/images/news/dot.png" alt="" />测评结果分析
                        </div>
                        <ul class="wdrjs_uls">
                          <li v-for="(items, indexs) in item.sysDim" :key="indexs">
                            <p>
                              {{ items }}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <!-- <div class="wdrj_suger" style="margin-top:0rem" v-if="item.suggestDim != ''">
                        <div class="wdrjs_title">
                          <img src="../../assets/images/news/dot.png" alt="" />指导建议
                        </div>
                        <ul class="wdrjs_uls">
                          <li v-for="(items, indexs) in item.suggestDim" :key="indexs">
                            <p v-if="!Array.isArray(items)" :style="{'font-weight': String(items).indexOf('针对') != -1 ? '500' : '400'}">
                              {{ items }}
                            </p>
                            <div v-if="Array.isArray(items)">
                              <p v-for="(itemu, indexu) in items" :key="indexu">{{ indexu + 1 }}.{{ itemu }}</p>
                            </div>
                          </li>
                        </ul>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="drwc_box" ref="parts6">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.54rem;height:0.44rem;" src="../../assets/images/news/beizhu.png" alt="">
              <span>备注</span>
            </div>
            <div class="wdrj_box">
              <div class="wdrj_main">
                <div class="wdrj_title" >
                  <img src="../../assets/images/news/dot.png" alt="" />
                  补充说明
                </div>
                <div class="wm_text">
                  <el-input v-if="!assessmentFlag" placeholder="请填写" :autosize="{ minRows: 3}" type="textarea" v-model="assessment" @input="noteChange" maxlength="300" show-word-limit></el-input>
                  <el-input v-else  disabled :autosize="{ minRows: 3}" type="textarea" v-model="assessment"></el-input>
                  <el-button type="primary" v-if="!assessmentFlag" @click="recordSub">提交</el-button>
                  <el-button type="primary primary1" v-if="assessmentFlag" @click="assessmentFlag = !assessmentFlag">修改</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="r_t_tab r_t_tab_t r_t_tab_t0"
          @click="toReview"
        >
          <span>查看更多沙盘作品详情</span>
          <img src="../../assets/images/news/jiantou.png" alt="" />
        </div>
      </div>
      <div v-show="reviewFlag">
        <div class="drwc_box drwc_boxr" ref="partr1">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.53rem;height: 0.51rem;" src="../../assets/images/news/tphg.png" alt="" />
              <span>图片回顾</span>
            </div>
            <div class="dtm_img_sys">
              <el-carousel
                :interval="40000"
                arrow="always"
                type="card"
                height="2.68rem"
              >
                <el-carousel-item v-for="item in imgList" :key="item.name">
                  <div class="dtm_img_box">
                    <img v-if="item.img != ''" class="dtmi_img" :src="item.img" alt="" />
                    <img v-else class="dtmi_img" src="../../assets/images/report/t001.png" alt="" />
                    <div class="dtmi_txt">{{ item.name }}</div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <div class="drwc_box drwc_boxr" ref="partr2">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.52rem;height:0.52rem;" src="../../assets/images/news/zpxxtj.png" alt="" />
              <span>作品信息统计</span>
            </div>
            <div class="dtm_xls" v-if="reviewData.workInfo">
              <div class="dtmx_li">
                <div class="dtmxl_head">作品名称</div>
                <div class="dtmxl_body">{{ reviewData.workInfo.workName }}</div>
                <div class="dtmxl_head">自我像</div>
                <div class="dtmxl_body">{{ reviewData.workInfo.representSand }}</div>
              </div>
              <div class="dtmx_li">
                <div class="dtmxl_head">最重要的沙具</div>
                <div class="dtmxl_body">{{ reviewData.workInfo.importantSand }}</div>
                <div class="dtmxl_head">制作次数</div>
                <div class="dtmxl_body">
                  第<span>{{ reviewData.workInfo.time }}</span
                  >次
                </div>
              </div>
              <div class="dtmx_li">
                <div class="dtmxl_head">满意程度</div>
                <div class="dtmxl_body">
                  <span>{{ reviewData.workInfo.satisfaction }}</span
                  >分
                </div>
                <div class="dtmxl_head">制作用时</div>
                <div class="dtmxl_body">{{ reviewData.workInfo.operationTime }}</div>
              </div>
              <div class="dtmx_li">
                <div class="dtmxl_head">作品场景</div>
                <div class="dtmxl_body">{{ reviewData.workInfo.scene }}</div>
                <div class="dtmxl_head">沙具删除比例</div>
                <div class="dtmxl_body">
                  <span>{{ reviewData.workInfo.deleteScale }}</span
                  >%
                </div>
              </div>
              <div class="dtmx_li dtmx_lis" v-if="reviewData.workInfo.themeInfo">
                <div class="dtmxl_head">主题统计</div>
                <div class="dtmxl_body">
                  <div class="dtmxl_dl">
                    <div class="dtmxl_dt">创伤主题</div>
                    <div class="dtmxl_dd">
                      {{ reviewData.workInfo.themeInfo.traumaTheme }}
                    </div>
                    <div class="dtmxl_dds">
                      <span>{{ reviewData.workInfo.themeInfo.traumaNum }}</span
                      >个
                    </div>
                  </div>
                  <div class="dtmxl_dl">
                    <div class="dtmxl_dt">治愈主题</div>
                    <div class="dtmxl_dd">
                      {{
                        reviewData.workInfo.themeInfo.cureTheme != ""
                          ? reviewData.workInfo.themeInfo.cureTheme
                          : "/"
                      }}
                    </div>
                    <div class="dtmxl_dds">
                      <span>{{ reviewData.workInfo.themeInfo.cureNum }}</span
                      >个
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="drwc_box drwc_boxr" ref="partr3">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.53rem;height:0.52rem;" src="../../assets/images/news/sjsy.png" alt="" />
              <span>沙具使用情况统计</span>
            </div>
            <div>
              <div class="dtmt_tle" style="margin-bottom:0.2rem;">
                <img src="../../assets/images/news/dot.png" alt="" />
                <span>沙具使用数量分布</span>
              </div>
              <div class="myChartZhu" ref="myChartZhu" id="myChartZhu"></div>
            </div>
            <div style="margin-top:0.4rem;">
              <div class="dtmt_tle">
                <img src="../../assets/images/news/dot.png" alt="" />
                <span>沙具使用时长占比</span>
              </div>
              <div class="myChartRose" ref="myChartRose" id="myChartRose" style="margin-top: -0.3rem;margin-bottom: 0.2rem;"></div>

            </div>
          </div>
        </div>

        <div class="drwc_box drwc_boxr" ref="partr4">
          <div class="drwc_common">
            <div class="drwc_bw_head">
              <img style="width: 0.54rem;height:0.53rem;" src="../../assets/images/news/syjlb.png" alt="" />
              <span>沙具使用记录表</span>
            </div>
            <template>
              <el-table class='dtm_table' :data="actionInfo">
                <el-table-column prop="action_idx" label="操作序号"> </el-table-column>
                <el-table-column prop="action_time" label="操作时间"> </el-table-column>
                <el-table-column prop="bodies_name" label="沙具名称"> </el-table-column>
                <el-table-column prop="bodies_type" label="沙具类别"> </el-table-column>
                <el-table-column prop="action_content" label="操作内容">
                  <template slot-scope="scope">
                    <span style="color:#737AFD">{{scope.row.action_content}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <div class="table_page" v-if="total > 0">
              <div class="page_total">
                共 <span>{{ total }}</span> 条
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
        <div
          class="r_t_tab r_t_tab_t r_t_tab_t0"
          @click="toReview"
        >
          <span>查看测评分析</span>
          <img src="../../assets/images/news/jiantou.png" alt="" />
        </div>
      </div>
    </div>
    <div style="height:0;width:100%;overflow:hidden">
      <personReport
        v-if="getPersonFlag"
        :row="details"
        :rowr="reviewData"
        :rows="sandInfo"
        :row3="imgList"
        :row4="sandUseNumInfoName"
        :row5="sandUseNumInfoNum"
      ></personReport>
    </div>
    <el-dialog
      class="fix_pass"
      :close-on-click-modal="false"
      title="箱庭鸟瞰图"
      :visible.sync="birdFlag"
    >
      <img
        class="dtmcl_click"
        v-if="birdViewImg != ''"
        :src="'data:image;base64,' + birdViewImg"
        alt=""
      />
      <img
        class="dtmcl_click"
        v-else
        src="../../assets/images/report/t001.png"
        alt=""
      />
    </el-dialog>
  </div>
</template>

<script>
import personReport from "../Model/ModelReport.vue";
import { mapGetters, mapMutations } from "vuex";
import echarts from "../../assets/js/echarts";
import Url from "@/assets/js/url.js";
var fuluList = [];
const transColor = [
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "rgba(255, 42, 84, 1)"
      },
      {
        offset: 1,
        color: "rgba(255, 171, 150, 1)"
      }
    ])
  },
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#C4C8FF"
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
        color: "#EDF7FF"
      },
      {
        offset: 1,
        color: "#EDF7FF"
      }
    ])
  }
];
export default {
  name: "",
  components: {
    personReport
  },
  data() {
    return {

      btlActNum: 1,
      jjActNum: 1,
      rgActNum: 1,
      assessment1: '',
      assessmentFlag1: false,
      assessment2: '',
      assessmentFlag2: false,
      assessment: '',
      assessmentFlag: false,
      birdViewImg: '',
      actionInfo: [],
      limit: 10,
      total: 0,
      pageNum: 1,
      currentPage: 1,
      reviewFlag: false,
      // 分割
      part11: false,
      part22: false,
      part33: false,
      part55: false,
      part44: false,
      birdFlag: false,
      reviewData: {},
      imgList: [
        {
          name: "鸟瞰图",
          img: require("../../assets/images/report/t001.png")
        },
        {
          name: "西侧俯身45度视图",
          img: require("../../assets/images/report/t001.png")
        },
        {
          name: "东侧俯身45度视图",
          img: require("../../assets/images/report/t001.png")
        },
        {
          name: "操作者视图",
          img: require("../../assets/images/report/t001.png")
        }
      ],
      sandUseNumInfoName: [],
      sandUseNumInfoNum: [],
      personData: {
        id: 1,
        meetingName: "",
        meetingTheme: "",
        meetingPlace: "",
        meetingLevel: "",
        host: "",
        recorder: "",
        ccleader: "",
        approverName: "",
        participant: "",
        remark: "",
        meetingStartTime: "",
        meetingEndTime: "",
        meetMatters: [
          {
            type: "",
            workItem: "",
            principalName: "",
            planEndtime: "",
            workPlan: ""
          }
        ]
      },
      details: {},
      reportId: "",
      reportId0: "",
      token: '',
      token0: '',
      part0: "",
      part1: "",
      part2: "",
      part3: "",
      part4: "",
      part5: "",
      part6: "",
      part61: "",
      part62: "",
      parta1: "",
      parta2: "",
      parta3: "",
      parta4: "",
      scrollYs: 0,
      topAct: 0,
      topBack: false,
      // myChartScore: "",
      myChart: "",
      // myChartLd1: "",
      myChartLd2: "",
      myChartLd3: "",
      myChartLd4: "",
      myChartLd5: "",
      myChartLd6: "",
      myChartLd7: "",
      // myChartLd8: "",

      myChartRg2: "",
      myChartRg3: "",
      myChartRg4: "",
      myChartRg5: "",
      myChartRg6: "",
      myChartRose: "",
      myChartZhu: "",
      myChartZhuYs: "",
      myTxtFlag: false,
      warningList: [],
      sysList: [],
      sysList2: [],
      jjList: [],
      jjName: '',
      jjTotal: '',
      jjDetail: [],
      rgList: [],
      depressionFlag: 1,
      anxietyFlag: 1,
      forcedFlag: 1,
      suicideFlag: 0,
      violenceFlag: 0,
      personalityFlag: 0,
      tokenFlag: false,
      
      bcType: 1
    };
  },
  computed: {
    ...mapGetters(["getPersonFlag"]),
    bindmodel() {
      const { part11, part22, part33, part55 } = this;
      return {
        part11,
        part22,
        part33,
        part55
      };
    }
  },
  watch: {
    bindmodel: {
      handler: function(newVal) {
        this.part11 = newVal.part11;
        this.part22 = newVal.part22;
        this.part33 = newVal.part33;
        this.part55 = newVal.part55;
        if (this.part11 && this.part22 && this.part33) {
          this.part11 = false;
          this.part22 = false;
          this.part33 = false;
          this.loading.close();
        } else {
          if (this.part55) {
            this.part55 = false;
            this.part44 = true;
          }
        }
      }
    }
  },
  mounted() {
    let that = this;
    if (localStorage.getItem('version')) {
      if (localStorage.getItem('version') == 2) {
        this.tokenFlag = true
      }
    }
    this.reportId = this.$route.params.userID;
    console.log(this.reportId)
    this.token = this.$route.params.token;
    // console.log(String(this.token) === 'undefined')
    // console.log(String(this.token) == 'undefined')
    if (typeof this.token === 'undefined') {
      console.log("不免登录")
      this.tokenFlag = false
    } else {
      console.log("免登录")
      this.tokenFlag = true
    }
    // let href = window.location.href
    // let hrefStr = href.match(/details\/report\/(\S*)/)[1];
    // console.log(hrefStr)
    // this.reportId0 = hrefStr.split('/')[0]
    // this.token0 = hrefStr.split('/')[1]
    // console.log(this.reportId0)
    console.log(!localStorage.getItem('isLogin'))
    console.log(!(typeof this.token === 'undefined'))
    if (!localStorage.getItem('isLogin')) {
      if (typeof this.token === 'undefined') {
        console.log("不免登录")
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userAuth");
        localStorage.removeItem("passport");
        localStorage.removeItem("userType");
        this.$router.replace({
          path: "/login"
        });
        return false
      } else {
        console.log("免登录")
        this.tokenFlag = true
      }
    }
    let param = {
      // passport: JSON.parse(localStorage.getItem('userInfo')).passport
      // token: this.token
      // password: JSON.parse(localStorage.getItem('userInfo')).password
    }
    if (this.tokenFlag) {
      param.token = this.token
    } else {
      param.passport = JSON.parse(localStorage.getItem('userInfo')).passport
    }
    let postStr = this.tokenFlag ? '/aimw/zkyx/report/getDimInfo' : '/aimw/user/getAuthInfo'
    this.$http
      .get(Url + postStr, { params: param })
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
            let men1 = [0, 0, 0, 0, 0, 0]
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
          // localStorage.setItem("algTypes", JSON.stringify(data.data.algTypes));
          // if (data.data.algTypes) {
          //   // 是否显示抑郁
          //   this.depressionFlag = data.data.algTypes.depression
          //   // 是否显示焦虑
          //   this.anxietyFlag = data.data.algTypes.anxiety
          //   // 是否显示强迫
          //   this.forcedFlag = data.data.algTypes.forced
          //   // 是否显示自我伤害
          //   this.suicideFlag = data.data.algTypes.suicide
          //   // 是否显示敌对
          //   this.violenceFlag = data.data.algTypes.violence
          //   // 是否显示人格
          //   this.personalityFlag = data.data.algTypes.personality
          // }
          //
          // this.depressionFlag = 1
          // this.anxietyFlag = 1
          // this.forcedFlag = 1
          // this.suicideFlag = 0
          // this.violenceFlag = 0
          // this.personalityFlag = 0
          this.getDetail();
        } else {
          that.$message.error(data.msg);
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
        
        // this.myChartScore.resize();
        this.myChart.resize();
        // this.myChartLd1.resize();
        this.myChartLd2.resize();
        this.myChartLd3.resize();
        this.myChartLd4.resize();
        this.myChartLd5.resize();
        this.myChartLd6.resize();
        this.myChartLd7.resize();
        // this.myChartLd8.resize();
        this.myChartRg2.resize();
        this.myChartRg3.resize();
        this.myChartRg4.resize();
        this.myChartRg5.resize();
        this.myChartRg6.resize();
        
        this.myChartRose.resize();
        this.myChartZhu.resize();
        this.myChartZhuYs.resize();
      }, 100);
    });
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.listenerFunction);
  },
  methods: {
    ...mapMutations(["setPersonFlag"]),
    btlChange(id) {
      this.btlActNum = id
    },
    jjChange(id) {
      this.jjActNum = id
    },
    rgChange(id) {
      this.rgActNum = id
    },
    noteChange1(val) {
      console.log(val)

      let row = 0
      val.split('\n').forEach(item => {
        // if (item.length === 0) {
        row += 1
        // } else {
        //   row += Math.ceil(item.replace())
        // }
      });
      console.log(row)
      if (row > 10) {
        this.assessment1 = val.split('\n').slice(0, 10).join('\n')
        this.$message({
          type: "warning",
          message: "最多不能超过10行!"
        });
      } else {
        this.assessment1 = val
      }
      console.log(this.assessment1)
    },
    noteChange2(val) {
      console.log(val)

      let row = 0
      val.split('\n').forEach(item => {
        // if (item.length === 0) {
        row += 1
        // } else {
        //   row += Math.ceil(item.replace())
        // }
      });
      console.log(row)
      if (row > 10) {
        this.assessment2 = val.split('\n').slice(0, 10).join('\n')
        this.$message({
          type: "warning",
          message: "最多不能超过10行!"
        });
      } else {
        this.assessment2 = val
      }
      console.log(this.assessment2)
    },
    noteChange(val) {
      console.log(val)

      let row = 0
      val.split('\n').forEach(item => {
        // if (item.length === 0) {
        row += 1
        // } else {
        //   row += Math.ceil(item.replace())
        // }
      });
      console.log(row)
      if (row > 10) {
        this.assessment = val.split('\n').slice(0, 10).join('\n')
        this.$message({
          type: "warning",
          message: "最多不能超过10行!"
        });
      } else {
        this.assessment = val
      }
      console.log(this.assessment)
    },
    recordSub1() {
      let that = this;
      let param = {
        reportId: that.reportId,
        note: {
          mental_health_note: that.assessment1,
          positive_psychology_note: that.assessment2,
          personality_note: that.assessment
        }
      }
      console.log(param)
      // return
      if (this.tokenFlag) {
        param.token = this.token
      }
      let postStr1 = this.tokenFlag ? '/aimw/zkyx/report/updateNote' : '/aimw/report/updateNote'
      this.$http
        .put(Url + postStr1, param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            if (that.assessment1 != '') {
              this.assessmentFlag1 = true
              this.$message({
                type: "success",
                message: "心理健康维度分析补充说明提交成功!"
              });
            } else {
              that.$message({
                type: "success",
                message: "心理健康维度分析补充说明已清空!"
              })
              this.assessmentFlag1 = false
            }
            this.details.note = that.assessment1
            this.$forceUpdate()
          } else {
            this.$message({
              type: "error",
              message: "心理健康维度分析补充说明提交失败!"
            });
          }
        });
    },
    recordSub2() {
      let that = this;
      let param = {
        reportId: that.reportId,
        note: {
          mental_health_note: that.assessment1,
          positive_psychology_note: that.assessment2,
          personality_note: that.assessment
        }
      }
      console.log(param)
      // return
      if (this.tokenFlag) {
        param.token = this.token
      }
      let postStr1 = this.tokenFlag ? '/aimw/zkyx/report/updateNote' : '/aimw/report/updateNote'
      this.$http
        .put(Url + postStr1, param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            if (that.assessment2 != '') {
              this.assessmentFlag2 = true
              this.$message({
                type: "success",
                message: "积极心理品质分析补充说明提交成功!"
              });
            } else {
              that.$message({
                type: "success",
                message: "积极心理品质分析补充说明已清空!"
              })
              this.assessmentFlag2 = false
            }
            this.details.note2 = that.assessment2
            this.$forceUpdate()
          } else {
            this.$message({
              type: "error",
              message: "积极心理品质分析补充说明提交失败!"
            });
          }
        });
    },
    recordSub() {
      let that = this;
      let param = {
        reportId: that.reportId,
        note: {
          mental_health_note: that.assessment1,
          positive_psychology_note: that.assessment2,
          personality_note: that.assessment
        }
      }
      console.log(param)
      // return
      if (this.tokenFlag) {
        param.token = this.token
      }
      let postStr1 = this.tokenFlag ? '/aimw/zkyx/report/updateNote' : '/aimw/report/updateNote'
      this.$http
        .put(Url + postStr1, param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            if (that.assessment != '') {
              this.assessmentFlag = true
              this.$message({
                type: "success",
                message: "人格分析补充说明提交成功!"
              });
            } else {
              that.$message({
                type: "success",
                message: "人格分析补充说明已清空!"
              })
              this.assessmentFlag = false
            }
            this.details.note = that.assessment
            this.$forceUpdate()
          } else {
            this.$message({
              type: "error",
              message: "人格分析补充说明提交失败!"
            });
          }
        });
    },
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.actionInfo = this.pagination(val, this.limit, fuluList);
    },
    birdView() {
      this.birdFlag = true;
    },
    personExport() {
      this.setPersonFlag(true);
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
    // 获取报告详情
    getfourImg(birdView) {
      let that = this;
      var param = {
        reportId: that.reportId
      };
      if (this.tokenFlag) {
        param.token = this.token
      }
      let postStr2 = this.tokenFlag ? '/aimw/zkyx/report/reportReviewImgs' : '/aimw/report/reportReviewImgs'
      this.$http
        .get(Url + postStr2, {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            that.imgList = [
              {
                name: "鸟瞰图",
                img: "data:image;base64," + birdView
              },
              {
                name: "西侧俯身45度视图",
                img: "data:image;base64," + data.data.workView.westView
              },
              {
                name: "东侧俯身45度视图",
                img: "data:image;base64," + data.data.workView.eastView
              },
              {
                name: "操作者视图",
                img: "data:image;base64," + data.data.workView.operatorView
              }
            ];
            this.part55 = true;
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    perctInfo (data) {
      return Math.round(data.toFixed(2) * 100) / 100
    },
    getDetail() {
      let that = this;
      this.loading = this.$loading({
        lock: true,
        text: "报告生成中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var param = {
        reportId: that.reportId
      };
      if (this.tokenFlag) {
        param.token = this.token
      }
      let postStr3 = this.tokenFlag ? '/aimw/zkyx/report/appendix' : '/aimw/report/appendix'
      this.$http
        .get(Url + postStr3, {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data.data.actionInfoRet == 'null' || data.data.actionInfoRet == '') {
              data.data.actionInfoRet = '[]';
            }
            console.log(data.data.actionInfoRet)
            
            fuluList = JSON.parse(data.data.actionInfoRet);
            console.log(fuluList)
            that.total = fuluList.length;
            that.actionInfo = this.pagination(1, this.limit, fuluList);
            that.pageNum = fuluList.length == 0 ? 1 : Math.ceil(fuluList.length / that.limit);
            if (data.data.sandInfoRet.sandInfo) {
              that.sandInfo = data.data.sandInfoRet.sandInfo;
            } else {
              that.sandInfo = [];
            }
            this.part11 = true;
            setTimeout(() => {
              that.myTxtFlag = true;
            }, 500);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
      let postStr4 = this.tokenFlag ? '/aimw/zkyx/report/reportReview' : '/aimw/report/reportReview'
      this.$http
        .get(Url + postStr4, {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            data.data.workInfo.operationTime = this.toHHmmss(
              data.data.workInfo.operationTime * 1000
            );
            if (Number(data.data.workInfo.deleteScale) < 0) {
              data.data.workInfo.deleteScale = 0
            } else {
              data.data.workInfo.deleteScale = this.perctInfo(data.data.workInfo.deleteScale)
            }
            that.reviewData = data.data;
            let nameArr = [];
            let numArr = [];
            for (let i in data.data.sandUseNumInfo) {
              nameArr.push(data.data.sandUseNumInfo[i].sandName);
              numArr.push(data.data.sandUseNumInfo[i].num);
            }
            that.sandUseNumInfoName = nameArr;
            that.sandUseNumInfoNum = numArr;
            that.myChartInit1();
            this.part22 = true;
            setTimeout(() => {
              that.myTxtFlag = true;
            }, 500);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
      let postStr5 = this.tokenFlag ? '/aimw/zkyx/report/reportInfo' : '/aimw/report/reportInfo'
      this.$http
        .get(Url + postStr5, {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data.data.birth) {
              data.data.birth = data.data.birth.split(" ")[0];
            }
            // data.data.themeDiscription = '空洞主题释义：一般是指，不用玩具或使用缺少能量、毫无新意的无生命感玩具，给人一种沉默抑郁， 对任何事物都失去了兴趣的感觉。'
            if (data.data.themeDiscription && data.data.themeDiscription != '') {
              if (data.data.themeDiscription.indexOf("：")) {
                data.data.themeDiscription =
                  '<span style="color:#333E75;font-weight:500">' +
                  data.data.themeDiscription.substring(
                    0,
                    data.data.themeDiscription.indexOf("：") + 1
                  ) +
                  "</span>" +
                  data.data.themeDiscription.substring(
                    data.data.themeDiscription.indexOf("：") + 1,
                    data.data.themeDiscription.length
                  );
              }
            }
            // data.data.selfDiscription = '作品主题描述：受测者在沙箱中摆放极少的沙具（6个），几乎没有动沙，并且看起来很空旷，给人一种贫乏之感。'
            if (data.data.selfDiscription && data.data.selfDiscription != '') {
              if (data.data.selfDiscription && data.data.selfDiscription != '') {
                if (data.data.selfDiscription.indexOf("：")) {
                  data.data.selfDiscription =
                    '<span style="color:#333E75;font-weight:500">' +
                    data.data.selfDiscription.substring(
                      0,
                      data.data.selfDiscription.indexOf("：") + 1
                    ) +
                    "</span>" +
                  data.data.selfDiscription.substring(
                    data.data.selfDiscription.indexOf("：") + 1,
                    data.data.selfDiscription.length
                  );
                }
              }
              // data.data.satisfyArea = '主题象征意义：现该主题可能表明受测者对陌生环境感到不安（首次操作），在现实生活中可能表现为安全感低，在陌生环境下警惕性强。而选择少量玩具、使用小部分空间可能也是受测者对于自我价值的一种保护，避免暴露过多的心理内容，侧面反映了受测者害怕被了解、被评价，也可能反映出受测者心理世界的贫乏，不善于利用玩具来表达自己的想法，还可能反映出受测者情感淡漠，没有希望的情绪状态。'
              if (data.data.satisfyArea && data.data.satisfyArea != '') {
                if (data.data.satisfyArea.indexOf("：")) {
                  data.data.satisfyArea =
                    '<span style="color:#333E75;font-weight:500">' +
                    data.data.satisfyArea.substring(
                      0,
                      data.data.satisfyArea.indexOf("：") + 1
                    ) +
                    "</span>" +
                    data.data.satisfyArea.substring(
                      data.data.satisfyArea.indexOf("：") + 1,
                      data.data.satisfyArea.length
                    );
                }
              }
            }
            
            let oldWarning = []
            if (that.depressionFlag == 1) {
              oldWarning.push({
                id: 1,
                name: '抑郁',
                score: data.data.reportWarningInfo.depressionScore,
                lastScore: data.data.lastWarningInfo.depressionScore,
                level: data.data.reportWarningInfo.depressionLevel,
                lastLevel: data.data.lastWarningInfo.depressionLevel,
                flag: this.depressionFlag
              })
            }
            if (that.anxietyFlag == 1) {
              oldWarning.push({
                id: 2,
                name: '焦虑',
                score: data.data.reportWarningInfo.anxietyScore,
                lastScore: data.data.lastWarningInfo.anxietyScore,
                level: data.data.reportWarningInfo.anxietyLevel,
                lastLevel: data.data.lastWarningInfo.anxietyLevel,
                flag: that.anxietyFlag
              })
            }
            if (that.forcedFlag == 1) {
              oldWarning.push({
                id: 3,
                name: '强迫',
                score: data.data.reportWarningInfo.forcedScore,
                lastScore: data.data.lastWarningInfo.forcedScore,
                level: data.data.reportWarningInfo.forcedLevel,
                lastLevel: data.data.lastWarningInfo.forcedLevel,
                flag: that.forcedFlag
              })
            }
            if (that.ptsdFlag == 1) {
              oldWarning.push({
                id: 4,
                name: 'PTSD',
                score: data.data.reportWarningInfo.ptsdScore,
                lastScore: data.data.lastWarningInfo.ptsdScore,
                level: data.data.reportWarningInfo.ptsdLevel,
                lastLevel: data.data.lastWarningInfo.ptsdLevel,
                flag: that.ptsdFlag
              })
            }
            if (that.violenceFlag == 1) {
              oldWarning.push({
                id: 5,
                name: '敌对',
                score: data.data.reportWarningInfo.violenceScore,
                lastScore: data.data.lastWarningInfo.violenceScore,
                level: data.data.reportWarningInfo.violenceLevel,
                lastLevel: data.data.lastWarningInfo.violenceLevel,
                flag: that.violenceFlag
              })
            }
            if (that.suicideFlag == 1) {
              oldWarning.push({
                id: 6,
                name: '自我伤害',
                score: data.data.reportWarningInfo.suicideScore,
                lastScore: data.data.lastWarningInfo.suicideScore,
                level: data.data.reportWarningInfo.suicideLevel,
                lastLevel: data.data.lastWarningInfo.suicideLevel,
                flag: that.suicideFlag
              })
            }
            // if (that.zibiFlag == 1) {
            //   oldWarning.push({
            //     id: 7,
            //     name: '自闭',
            //     score: data.data.reportWarningInfo.zibiScore,
            //     lastScore: data.data.lastWarningInfo.zibiScore,
            //     level: data.data.reportWarningInfo.zibiLevel,
            //     lastLevel: data.data.lastWarningInfo.zibiLevel,
            //     flag: that.zibiFlag
            //   })
            // }
            data.data.warningList = [];
            data.data.whatWarn = [];
            data.data.warnLen = [];
            for (let i in oldWarning) {
              if (oldWarning[i].level > 0 && oldWarning[i].flag == 1) {
                data.data.warningList.push(oldWarning[i]);
              }
              if (oldWarning[i].score > 2 && oldWarning[i].flag == 1) {
                data.data.whatWarn.push(oldWarning[i]);
              }
              if (oldWarning[i].flag == 1) {
                data.data.warnLen.push(oldWarning[i])
              }
            }
            data.data.rangeList = data.data.warnLen;
            data.data.warningNum = data.data.whatWarn.length;
            
            let mentalHealth = {}
            let sysList0 = []
            let warningInfo = data.data.reportWarningInfo;
            if (data.data.mentalHealth) {
              console.log(data.data.mentalHealth)
              console.log(JSON.parse(data.data.mentalHealth))
              mentalHealth = JSON.parse(data.data.mentalHealth)
              if (that.depressionFlag == 1) {
                if (mentalHealth.depression) {
                  data.data.depressionSubdim = JSON.parse(mentalHealth.depression.subdim);
                  data.data.depressionAnalysis = mentalHealth.depression.analysis.split("@@");
                  data.data.depressionSuggestion = mentalHealth.depression.suggestion.split("|||")
                  console.log(data.data.depressionSuggestion)
                  for (let i in data.data.depressionSuggestion) {
                    if (data.data.depressionSuggestion[i].indexOf("&&") != -1) {
                      data.data.depressionSuggestion[i] = data.data.depressionSuggestion[i].split("&&")
                      for (let j in data.data.depressionSuggestion[i]) {
                        if (data.data.depressionSuggestion[i][j].indexOf("$$") != -1) {
                          data.data.depressionSuggestion[i][j] = data.data.depressionSuggestion[i][j].split("$$")
                        }
                      }
                    } else {
                      if (data.data.depressionSuggestion[i].indexOf("针对") != -1) {
                        data.data.depressionSuggestion[i] = [data.data.depressionSuggestion[i]]
                        for (let j in data.data.depressionSuggestion[i]) {
                          if (data.data.depressionSuggestion[i][j].indexOf("$$") != -1) {
                            data.data.depressionSuggestion[i][j] = data.data.depressionSuggestion[i][j].split("$$")
                          }
                        }
                      }
                    }
                  }
                  console.log(data.data.depressionSuggestion)
                  sysList0.push({
                    id: 1,
                    title: "抑郁",
                    grade: warningInfo.depressionScore,
                    level: warningInfo.depressionLevel,
                    subDim: data.data.depressionSubdim,
                    suggestDim: data.data.depressionSuggestion,
                    sysDim: data.data.depressionAnalysis,
                    flag: that.depressionFlag
                  })
                }
              }
              if (that.anxietyFlag == 1) {
                if (mentalHealth.anxiety) {
                  data.data.anxietySubdim = JSON.parse(mentalHealth.anxiety.subdim);
                  data.data.anxietyAnalysis = mentalHealth.anxiety.analysis.split("@@");
                  data.data.anxietySuggestion = mentalHealth.anxiety.suggestion.split("|||")
                  for (let i in data.data.anxietySuggestion) {
                    if (data.data.anxietySuggestion[i].indexOf("&&") != -1) {
                      data.data.anxietySuggestion[i] = data.data.anxietySuggestion[i].split("&&")
                      for (let j in data.data.anxietySuggestion[i]) {
                        if (data.data.anxietySuggestion[i][j].indexOf("$$") != -1) {
                          data.data.anxietySuggestion[i][j] = data.data.anxietySuggestion[i][j].split("$$")
                        }
                      }
                    } else {
                      if (data.data.anxietySuggestion[i].indexOf("针对") != -1) {
                        data.data.anxietySuggestion[i] = [data.data.anxietySuggestion[i]]
                        for (let j in data.data.anxietySuggestion[i]) {
                          if (data.data.anxietySuggestion[i][j].indexOf("$$") != -1) {
                            data.data.anxietySuggestion[i][j] = data.data.anxietySuggestion[i][j].split("$$")
                          }
                        }
                      }
                    }
                  }
                  console.log(data.data.anxietySuggestion)
                  sysList0.push({
                    id: 2,
                    title: "焦虑",
                    grade: warningInfo.anxietyScore,
                    level: warningInfo.anxietyLevel,
                    subDim: data.data.anxietySubdim,
                    suggestDim: data.data.anxietySuggestion,
                    sysDim: data.data.anxietyAnalysis,
                    flag: that.anxietyFlag
                  })
                }
              }
              if (that.forcedFlag == 1) {
                if (mentalHealth.forced) {
                  data.data.forcedSubdim = JSON.parse(mentalHealth.forced.subdim);
                  data.data.forcedAnalysis = mentalHealth.forced.analysis.split("@@");
                  data.data.forcedSuggestion = mentalHealth.forced.suggestion.split("|||")
                  for (let i in data.data.forcedSuggestion) {
                    if (data.data.forcedSuggestion[i].indexOf("&&") != -1) {
                      data.data.forcedSuggestion[i] = data.data.forcedSuggestion[i].split("&&")
                      for (let j in data.data.forcedSuggestion[i]) {
                        if (data.data.forcedSuggestion[i][j].indexOf("$$") != -1) {
                          data.data.forcedSuggestion[i][j] = data.data.forcedSuggestion[i][j].split("$$")
                        }
                      }
                    } else {
                      if (data.data.forcedSuggestion[i].indexOf("针对") != -1) {
                        data.data.forcedSuggestion[i] = [data.data.forcedSuggestion[i]]
                        for (let j in data.data.forcedSuggestion[i]) {
                          if (data.data.forcedSuggestion[i][j].indexOf("$$") != -1) {
                            data.data.forcedSuggestion[i][j] = data.data.forcedSuggestion[i][j].split("$$")
                          }
                        }
                      }
                    }
                  }
                  console.log(data.data.forcedSuggestion)
                  sysList0.push({
                    id: 3,
                    title: "强迫",
                    grade: warningInfo.forcedScore,
                    level: warningInfo.forcedLevel,
                    subDim: data.data.forcedSubdim,
                    suggestDim: data.data.forcedSuggestion,
                    sysDim: data.data.forcedAnalysis,
                    flag: that.forcedFlag
                  })
                }
              }
              if (that.ptsdFlag == 1) {
                if (mentalHealth.ptsd) {
                  data.data.ptsdSubdim = JSON.parse(mentalHealth.ptsd.subdim);
                  data.data.ptsdAnalysis = mentalHealth.ptsd.analysis.split("@@");
                  data.data.ptsdSuggestion = mentalHealth.ptsd.suggestion.split("|||")
                  for (let i in data.data.ptsdSuggestion) {
                    if (data.data.ptsdSuggestion[i].indexOf("&&") != -1) {
                      data.data.ptsdSuggestion[i] = data.data.ptsdSuggestion[i].split("&&")
                      for (let j in data.data.ptsdSuggestion[i]) {
                        if (data.data.ptsdSuggestion[i][j].indexOf("$$") != -1) {
                          data.data.ptsdSuggestion[i][j] = data.data.ptsdSuggestion[i][j].split("$$")
                        }
                      }
                    } else {
                      if (data.data.ptsdSuggestion[i].indexOf("针对") != -1) {
                        data.data.ptsdSuggestion[i] = [data.data.ptsdSuggestion[i]]
                        for (let j in data.data.ptsdSuggestion[i]) {
                          if (data.data.ptsdSuggestion[i][j].indexOf("$$") != -1) {
                            data.data.ptsdSuggestion[i][j] = data.data.ptsdSuggestion[i][j].split("$$")
                          }
                        }
                      }
                    }
                  }
                  console.log(data.data.ptsdSuggestion)
                  sysList0.push({
                    id: 4,
                    title: "PTSD",
                    grade: warningInfo.ptsdScore,
                    level: warningInfo.ptsdLevel,
                    subDim: data.data.ptsdSubdim,
                    suggestDim: data.data.ptsdSuggestion,
                    sysDim: data.data.ptsdAnalysis,
                    flag: that.ptsdFlag
                  })
                }
              }
              if (that.violenceFlag == 1) {
                if (mentalHealth.violence) {
                  data.data.violenceSubdim = JSON.parse(mentalHealth.violence.subdim);
                  data.data.violenceAnalysis = mentalHealth.violence.analysis.split("@@");
                  data.data.violenceSuggestion = mentalHealth.violence.suggestion.split("|||")
                  for (let i in data.data.violenceSuggestion) {
                    if (data.data.violenceSuggestion[i].indexOf("&&") != -1) {
                      data.data.violenceSuggestion[i] = data.data.violenceSuggestion[i].split("&&")
                      for (let j in data.data.violenceSuggestion[i]) {
                        if (data.data.violenceSuggestion[i][j].indexOf("$$") != -1) {
                          data.data.violenceSuggestion[i][j] = data.data.violenceSuggestion[i][j].split("$$")
                        }
                      }
                    } else {
                      if (data.data.violenceSuggestion[i].indexOf("针对") != -1) {
                        data.data.violenceSuggestion[i] = [data.data.violenceSuggestion[i]]
                        for (let j in data.data.violenceSuggestion[i]) {
                          if (data.data.violenceSuggestion[i][j].indexOf("$$") != -1) {
                            data.data.violenceSuggestion[i][j] = data.data.violenceSuggestion[i][j].split("$$")
                          }
                        }
                      }
                    }
                  }
                  console.log(data.data.violenceSuggestion)
                  sysList0.push({
                    id: 5,
                    title: "敌对",
                    grade: warningInfo.violenceScore,
                    level: warningInfo.violenceLevel,
                    subDim: data.data.violenceSubdim,
                    suggestDim: data.data.violenceSuggestion,
                    sysDim: data.data.violenceAnalysis,
                    flag: that.violenceFlag
                  })
                }
              }
              if (that.suicideFlag == 1) {
                if (mentalHealth.suicide) {
                  data.data.suicideSubdim = JSON.parse(mentalHealth.suicide.subdim);
                  data.data.suicideAnalysis = mentalHealth.suicide.analysis.split("@@");
                  data.data.suicideSuggestion = mentalHealth.suicide.suggestion.split("|||")
                  for (let i in data.data.suicideSuggestion) {
                    if (data.data.suicideSuggestion[i].indexOf("&&") != -1) {
                      data.data.suicideSuggestion[i] = data.data.suicideSuggestion[i].split("&&")
                      for (let j in data.data.suicideSuggestion[i]) {
                        if (data.data.suicideSuggestion[i][j].indexOf("$$") != -1) {
                          data.data.suicideSuggestion[i][j] = data.data.suicideSuggestion[i][j].split("$$")
                        }
                      }
                    } else {
                      if (data.data.suicideSuggestion[i].indexOf("针对") != -1) {
                        data.data.suicideSuggestion[i] = [data.data.suicideSuggestion[i]]
                        for (let j in data.data.suicideSuggestion[i]) {
                          if (data.data.suicideSuggestion[i][j].indexOf("$$") != -1) {
                            data.data.suicideSuggestion[i][j] = data.data.suicideSuggestion[i][j].split("$$")
                          }
                        }
                      }
                    }
                  }
                  console.log(data.data.suicideSuggestion)
                  sysList0.push({
                    id: 6,
                    title: "自我伤害",
                    grade: warningInfo.suicideScore,
                    level: warningInfo.suicideLevel,
                    subDim: data.data.suicideSubdim,
                    suggestDim: data.data.suicideSuggestion,
                    sysDim: data.data.suicideAnalysis,
                    flag: that.suicideFlag
                  })
                }
              }
              // if (that.zibiFlag == 1) {
              //   if (mentalHealth.zibi) {
              //     data.data.zibiSubdim = JSON.parse(mentalHealth.zibi.subdim);
              //     data.data.zibiAnalysis = mentalHealth.zibi.analysis.split("@@");
              //     data.data.zibiSuggestion = mentalHealth.zibi.suggestion.split("|||")
              //     for (let i in data.data.zibiSuggestion) {
              //       if (data.data.zibiSuggestion[i].indexOf("&&") != -1) {
              //         data.data.zibiSuggestion[i] = data.data.zibiSuggestion[i].split("&&")
              //         for (let j in data.data.zibiSuggestion[i]) {
              //           if (data.data.zibiSuggestion[i][j].indexOf("$$") != -1) {
              //             data.data.zibiSuggestion[i][j] = data.data.zibiSuggestion[i][j].split("$$")
              //           }
              //         }
              //       } else {
              //         if (data.data.zibiSuggestion[i].indexOf("针对") != -1) {
              //           data.data.zibiSuggestion[i] = [data.data.zibiSuggestion[i]]
              //           for (let j in data.data.zibiSuggestion[i]) {
              //             if (data.data.zibiSuggestion[i][j].indexOf("$$") != -1) {
              //               data.data.zibiSuggestion[i][j] = data.data.zibiSuggestion[i][j].split("$$")
              //             }
              //           }
              //         }
              //       }
              //     }
              //     console.log(data.data.zibiSuggestion)
              //     sysList0.push({
              //       id: 7,
              //       title: "自闭",
              //       grade: warningInfo.zibiScore,
              //       level: warningInfo.zibiLevel,
              //       subDim: data.data.zibiSubdim,
              //       suggestDim: data.data.zibiSuggestion,
              //       sysDim: data.data.zibiAnalysis,
              //       flag: that.zibiFlag
              //     })
              //   }
              // }
            }
            // this.sysList = sysList0.sort(function(n, m) {
            //   if (m.grade < n.grade) return -1;
            //   else if (m.grade > n.grade) return 1;
            //   else return 0;
            // });
            this.sysList = sysList0
            
            data.data.sysList = this.sysList;
            
            // 积极维度
            let positivePsychology = {}
            let jjList0 = []
            if (data.data.positivePsychology) {
              console.log(data.data.positivePsychology)
              console.log(JSON.parse(data.data.positivePsychology))
              positivePsychology = JSON.parse(data.data.positivePsychology)
              if (that.resilienceFlag == 1) {
                if (positivePsychology.resilience) {
                  data.data.resilienceSubdim = JSON.parse(positivePsychology.resilience.subdim)
                  data.data.resilienceAnalysis = positivePsychology.resilience.analysis.split("@@");
                  data.data.resilienceResult = positivePsychology.resilience.result;
                  let total = Number(data.data.resilienceSubdim[0].score) + Number(data.data.resilienceSubdim[1].score) + Number(data.data.resilienceSubdim[2].score)
                  jjList0.push({
                    id: 1,
                    title: "心理韧性",
                    result: data.data.resilienceResult,
                    subDim: data.data.resilienceSubdim,
                    level: data.data.positiveResults.resilienceLevel,
                    lastLevel: data.data.lastPositiveResults.resilienceLevel,
                    total: total,
                    // suggestDim: data.data.resilienceSuggestion,
                    sysDim: data.data.resilienceAnalysis,
                    flag: that.resilienceFlag
                  })
                }
              }
              if (that.selfFlag == 1) {
                if (positivePsychology.self) {
                  data.data.selfSubdim = JSON.parse(positivePsychology.self.subdim)
                  data.data.selfAnalysis = positivePsychology.self.analysis.split("@@");
                  data.data.selfResult = positivePsychology.self.result;
                  let total = Number(data.data.selfSubdim[0].score) + Number(data.data.selfSubdim[1].score) + Number(data.data.selfSubdim[2].score)
                  jjList0.push({
                    id: 2,
                    title: "积极自我",
                    result: data.data.selfResult,
                    subDim: data.data.selfSubdim,
                    level: data.data.positiveResults.selfLevel,
                    lastLevel: data.data.lastPositiveResults.selfLevel,
                    total: total,
                    // suggestDim: data.data.selfSuggestion,
                    sysDim: data.data.selfAnalysis,
                    flag: that.selfFlag
                  })
                }
              }
              if (that.emotionFlag == 1) {
                if (positivePsychology.emotion) {
                  data.data.emotionSubdim = JSON.parse(positivePsychology.emotion.subdim)
                  data.data.emotionAnalysis = positivePsychology.emotion.analysis.split("@@");
                  data.data.emotionResult = positivePsychology.emotion.result;
                  let total = Number(data.data.emotionSubdim[0].score) + Number(data.data.emotionSubdim[1].score) + Number(data.data.emotionSubdim[2].score)
                  jjList0.push({
                    id: 3,
                    title: "积极情绪",
                    result: data.data.emotionResult,
                    subDim: data.data.emotionSubdim,
                    level: data.data.positiveResults.emotionLevel,
                    lastLevel: data.data.lastPositiveResults.emotionLevel,
                    total: total,
                    // suggestDim: data.data.emotionSuggestion,
                    sysDim: data.data.emotionAnalysis,
                    flag: that.emotionFlag
                  })
                }
              }
              if (that.achievementFlag == 1) {
                if (positivePsychology.achievement) {
                  data.data.achievementSubdim = JSON.parse(positivePsychology.achievement.subdim)
                  data.data.achievementAnalysis = positivePsychology.achievement.analysis.split("@@");
                  data.data.achievementResult = positivePsychology.achievement.result;
                  let total = Number(data.data.achievementSubdim[0].score) + Number(data.data.achievementSubdim[1].score) + Number(data.data.achievementSubdim[2].score)
                  jjList0.push({
                    id: 4,
                    title: "积极成就",
                    result: data.data.achievementResult,
                    subDim: data.data.achievementSubdim,
                    level: data.data.positiveResults.achievementLevel,
                    lastLevel: data.data.lastPositiveResults.achievementLevel,
                    total: total,
                    // suggestDim: data.data.achievementSuggestion,
                    sysDim: data.data.achievementAnalysis,
                    flag: that.achievementFlag
                  })
                }
              }
              if (that.relationshipFlag == 1) {
                if (positivePsychology.relationship) {
                  data.data.relationshipSubdim = JSON.parse(positivePsychology.relationship.subdim)
                  data.data.relationshipAnalysis = positivePsychology.relationship.analysis.split("@@");
                  data.data.relationshipResult = positivePsychology.relationship.result;
                  let total = Number(data.data.relationshipSubdim[0].score) + Number(data.data.relationshipSubdim[1].score) + Number(data.data.relationshipSubdim[2].score)
                  jjList0.push({
                    id: 5,
                    title: "积极关系",
                    result: data.data.relationshipResult,
                    subDim: data.data.relationshipSubdim,
                    level: data.data.positiveResults.relationshipLevel,
                    lastLevel: data.data.lastPositiveResults.relationshipLevel,
                    total: total,
                    // suggestDim: data.data.relationshipSuggestion,
                    sysDim: data.data.relationshipAnalysis,
                    flag: that.relationshipFlag
                  })
                }
              }
            }
            this.jjList = jjList0
            data.data.jjList = this.jjList;
            console.log(data.data.jjList)
            // if (jjList0.length > 0) {
            //   let jjArr = jjList0.sort((a, b) => {
            //     return Number(b.total) - Number(a.total);
            //   });
            //   console.log(jjArr)
            //   // jjArr = jjArr.concat(jjArr)
            //   this.jjName = jjArr[0].title + '上'
            //   if (jjArr.length > 1) {
            //     if (jjArr[1].total == jjArr[0].total) {
            //       this.jjName = jjArr[0].title + "、" + jjArr[1].title + '上'
            //     }
            //   }
            //   if (jjArr.length > 2) {
            //     if (jjArr[2].total == jjArr[0].total) {
            //       this.jjName = jjArr[0].title + "、" + jjArr[1].title + '等方面'
            //     }
            //   }
            // }
            // data.data.jjName = this.jjName
            data.data.summary = [
              "积极自我",
              "简版总结",
              "详细总结第1段@@详细总结第2段@@详细总结第3段"
            ]
            if (data.data.summary && data.data.summary != null) {
              this.jjName = data.data.summary[0]
              this.jjTotal = data.data.summary[1]
              this.jjDetail = data.data.summary[2].split("@@")
            }
            data.data.jjName = this.jjName
            data.data.jjTotal = this.jjTotal
            data.data.jjDetail = this.jjDetail
            console.log(this.jjName)
            console.log(this.jjTotal)
            console.log(this.jjDetail)

            
            
            // 大五人格
            let personality = {}
            if (data.data.personality) {
              console.log(data.data.personality)
              console.log(JSON.parse(data.data.personality))
              personality = JSON.parse(data.data.personality)
              if (personality.extroversion) {
                data.data.extroversionSubdim = JSON.parse(personality.extroversion.subdim)
                data.data.extroversionAnalysis = personality.extroversion.analysis.split("@@");
              }
              if (personality.conscientiousness) {
                data.data.conscientiousnessSubdim = JSON.parse(personality.conscientiousness.subdim)
                data.data.conscientiousnessAnalysis = personality.conscientiousness.analysis.split("@@");
              }
              if (personality.nervousness) {
                data.data.nervousnessSubdim = JSON.parse(personality.nervousness.subdim)
                data.data.nervousnessAnalysis = personality.nervousness.analysis.split("@@");
              }
              if (personality.agreeableness) {
                data.data.agreeablenessSubdim = JSON.parse(personality.agreeableness.subdim)
                data.data.agreeablenessAnalysis = personality.agreeableness.analysis.split("@@");
              }
              if (personality.openness) {
                data.data.opennessSubdim = JSON.parse(personality.openness.subdim)
                data.data.opennessAnalysis = personality.openness.analysis.split("@@");
              }
            }
            
            let rgList0 = [
              {
                id: 1,
                title: "外向性",
                grade: personality.extroversion.score,
                gradep: Number(personality.extroversion.score) * 0.8 + "rem",
                gradep1: Number(personality.extroversion.score) * 80 + "px",
                subDim: data.data.extroversionSubdim,
                sysDim: data.data.extroversionAnalysis,
                flag: that.extroversionFlag
              },
              {
                id: 2,
                title: "尽责性",
                grade: personality.conscientiousness.score,
                gradep: Number(personality.conscientiousness.score) * 0.8 + "rem",
                gradep1: Number(personality.conscientiousness.score) * 80 + "px",
                subDim: data.data.conscientiousnessSubdim,
                sysDim: data.data.conscientiousnessAnalysis,
                flag: that.conscientiousnessFlag
              },
              {
                id: 3,
                title: "神经质",
                grade: personality.nervousness.score,
                gradep: Number(personality.nervousness.score) * 0.8 + "rem",
                gradep1: Number(personality.nervousness.score) * 80 + "px",
                subDim: data.data.nervousnessSubdim,
                sysDim: data.data.nervousnessAnalysis,
                flag: that.nervousnessFlag
              },
              {
                id: 4,
                title: "宜人性",
                grade: personality.agreeableness.score,
                gradep: Number(personality.agreeableness.score) * 0.8 + "rem",
                gradep1: Number(personality.agreeableness.score) * 80 + "px",
                subDim: data.data.agreeablenessSubdim,
                sysDim: data.data.agreeablenessAnalysis,
                flag: that.agreeablenessFlag
              },
              {
                id: 5,
                title: "开放性",
                grade: personality.openness.score,
                gradep: Number(personality.openness.score) * 0.8 + "rem",
                gradep1: Number(personality.openness.score) * 80 + "px",
                subDim: data.data.opennessSubdim,
                sysDim: data.data.opennessAnalysis,
                flag: that.opennessFlag
              }
            ];
            this.rgList = rgList0
            data.data.rgList = this.rgList;
            data.data.reportId = that.reportId
            console.log(data.data.note)
            if (data.data.note && data.data.note != '') {
              let notes = JSON.parse(data.data.note)
              
              if (notes.mental_health_note == '') {
                that.assessment1 = ''
                that.assessmentFlag1 = false
              } else {
                that.assessment1 = notes.mental_health_note
                that.assessmentFlag1 = true
              }
              if (notes.positive_psychology_note == '') {
                that.assessment2 = ''
                that.assessmentFlag2 = false
              } else {
                that.assessment2 = notes.positive_psychology_note
                that.assessmentFlag2 = true
              }
              if (notes.personality_note == '') {
                that.assessment = ''
                that.assessmentFlag = false
              } else {
                that.assessment = notes.personality_note
                that.assessmentFlag = true
              }

              // if (data.data.notes == '') {
              //   that.assessmentFlag = false
              // } else {
              //   that.assessmentFlag = true
              // }
            } else {
              that.assessmentFlag1 = false
              that.assessmentFlag2 = false
              that.assessmentFlag = false
              that.assessment1 = ''
              that.assessment2 = ''
              that.assessment = ''
            }
            that.details = data.data
            that.getBird()



            // that.details = that.justInfo(data.data);
            
            // data.data.birdView = ''
            // this.details.birdView = data.data.birdView;
            // this.birdViewImg = data.data.birdView;
            // that.imgList = [
            //   {
            //     name: "鸟瞰图",
            //     img: ""
            //   },
            //   {
            //     name: "西侧俯身45度视图",
            //     img: ''
            //   },
            //   {
            //     name: "东侧俯身45度视图",
            //     img: ''
            //   },
            //   {
            //     name: "操作者视图",
            //     img: ''
            //   }
            // ];
            // this.part55 = true;
            that.myChartInit();
            this.part33 = true;
            setTimeout(() => {
              that.myTxtFlag = true;
              that.topBacks();
            }, 500);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    toGuide() {
      let routeData = this.$router.resolve({
        name: "guide",
        params: {}
      });
      window.open(routeData.href, "_blank");
    },
    getBird() {
      let that = this;
      var param = {
        reportId: that.reportId
      };
      if (this.tokenFlag) {
        param.token = this.token
      }
      let postStr6 = this.tokenFlag ? '/aimw/zkyx/report/reportBirdView' : '/aimw/report/reportBirdView'
      this.$http
        .get(Url + postStr6, {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.details.birdView = data.data.birdView;
            this.birdViewImg = data.data.birdView;
            this.getfourImg(data.data.birdView);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 数据处理
    justInfo(list) {
      let data = list;
      // 本次
      if (data.reportWarningInfo.depressionLevel == 0) {
        data.reportWarningInfo.depressionLevelTxt = "正常";
      } else if (data.reportWarningInfo.depressionLevel == 1) {
        data.reportWarningInfo.depressionLevelTxt = "轻度";
      } else if (data.reportWarningInfo.depressionLevel == 2) {
        data.reportWarningInfo.depressionLevelTxt = "中度";
      } else if (data.reportWarningInfo.depressionLevel == 3) {
        data.reportWarningInfo.depressionLevelTxt = "重度";
      }
      if (data.reportWarningInfo.anxietyLevel == 0) {
        data.reportWarningInfo.anxietyLevelTxt = "正常";
      } else if (data.reportWarningInfo.anxietyLevel == 1) {
        data.reportWarningInfo.anxietyLevelTxt = "轻度";
      } else if (data.reportWarningInfo.anxietyLevel == 2) {
        data.reportWarningInfo.anxietyLevelTxt = "中度";
      } else if (data.reportWarningInfo.anxietyLevel == 3) {
        data.reportWarningInfo.anxietyLevelTxt = "重度";
      }
      if (data.reportWarningInfo.forcedLevel == 0) {
        data.reportWarningInfo.forcedLevelTxt = "正常";
      } else if (data.reportWarningInfo.forcedLevel == 1) {
        data.reportWarningInfo.forcedLevelTxt = "轻度";
      } else if (data.reportWarningInfo.forcedLevel == 2) {
        data.reportWarningInfo.forcedLevelTxt = "中度";
      } else if (data.reportWarningInfo.forcedLevel == 3) {
        data.reportWarningInfo.forcedLevelTxt = "重度";
      }
      if (data.reportWarningInfo.suicideLevel == 0) {
        data.reportWarningInfo.suicideLevelTxt = "正常";
      } else if (data.reportWarningInfo.suicideLevel == 1) {
        data.reportWarningInfo.suicideLevelTxt = "轻度";
      } else if (data.reportWarningInfo.suicideLevel == 2) {
        data.reportWarningInfo.suicideLevelTxt = "中度";
      } else if (data.reportWarningInfo.suicideLevel == 3) {
        data.reportWarningInfo.suicideLevelTxt = "重度";
      }
      if (data.reportWarningInfo.violenceLevel == 0) {
        data.reportWarningInfo.violenceLevelTxt = "正常";
      } else if (data.reportWarningInfo.violenceLevel == 1) {
        data.reportWarningInfo.violenceLevelTxt = "轻度";
      } else if (data.reportWarningInfo.violenceLevel == 2) {
        data.reportWarningInfo.violenceLevelTxt = "中度";
      } else if (data.reportWarningInfo.violenceLevel == 3) {
        data.reportWarningInfo.violenceLevelTxt = "重度";
      }
      // 上次
      if (data.lastWarningInfo.depressionLevel == 0) {
        data.lastWarningInfo.depressionLevelTxt = "正常";
      } else if (data.lastWarningInfo.depressionLevel == 1) {
        data.lastWarningInfo.depressionLevelTxt = "轻度";
      } else if (data.lastWarningInfo.depressionLevel == 2) {
        data.lastWarningInfo.depressionLevelTxt = "中度";
      } else if (data.lastWarningInfo.depressionLevel == 3) {
        data.lastWarningInfo.depressionLevelTxt = "重度";
      }
      if (data.lastWarningInfo.anxietyLevel == 0) {
        data.lastWarningInfo.anxietyLevelTxt = "正常";
      } else if (data.lastWarningInfo.anxietyLevel == 1) {
        data.lastWarningInfo.anxietyLevelTxt = "轻度";
      } else if (data.lastWarningInfo.anxietyLevel == 2) {
        data.lastWarningInfo.anxietyLevelTxt = "中度";
      } else if (data.lastWarningInfo.anxietyLevel == 3) {
        data.lastWarningInfo.anxietyLevelTxt = "重度";
      }
      if (data.lastWarningInfo.forcedLevel == 0) {
        data.lastWarningInfo.forcedLevelTxt = "正常";
      } else if (data.lastWarningInfo.forcedLevel == 1) {
        data.lastWarningInfo.forcedLevelTxt = "轻度";
      } else if (data.lastWarningInfo.forcedLevel == 2) {
        data.lastWarningInfo.forcedLevelTxt = "中度";
      } else if (data.lastWarningInfo.forcedLevel == 3) {
        data.lastWarningInfo.forcedLevelTxt = "重度";
      }
      if (data.lastWarningInfo.suicideLevel == 0) {
        data.lastWarningInfo.suicideLevelTxt = "正常";
      } else if (data.lastWarningInfo.suicideLevel == 1) {
        data.lastWarningInfo.suicideLevelTxt = "轻度";
      } else if (data.lastWarningInfo.suicideLevel == 2) {
        data.lastWarningInfo.suicideLevelTxt = "中度";
      } else if (data.lastWarningInfo.suicideLevel == 3) {
        data.lastWarningInfo.suicideLevelTxt = "重度";
      }
      if (data.lastWarningInfo.violenceLevel == 0) {
        data.lastWarningInfo.violenceLevelTxt = "正常";
      } else if (data.lastWarningInfo.violenceLevel == 1) {
        data.lastWarningInfo.violenceLevelTxt = "轻度";
      } else if (data.lastWarningInfo.violenceLevel == 2) {
        data.lastWarningInfo.violenceLevelTxt = "中度";
      } else if (data.lastWarningInfo.violenceLevel == 3) {
        data.lastWarningInfo.violenceLevelTxt = "重度";
      }
      // 平均
      if (data.warningAvgInfo.depressionLevel == 0) {
        data.warningAvgInfo.depressionLevelTxt = "正常";
      } else if (data.warningAvgInfo.depressionLevel == 1) {
        data.warningAvgInfo.depressionLevelTxt = "轻度";
      } else if (data.warningAvgInfo.depressionLevel == 2) {
        data.warningAvgInfo.depressionLevelTxt = "中度";
      } else if (data.warningAvgInfo.depressionLevel == 3) {
        data.warningAvgInfo.depressionLevelTxt = "重度";
      }
      if (data.warningAvgInfo.anxietyLevel == 0) {
        data.warningAvgInfo.anxietyLevelTxt = "正常";
      } else if (data.warningAvgInfo.anxietyLevel == 1) {
        data.warningAvgInfo.anxietyLevelTxt = "轻度";
      } else if (data.warningAvgInfo.anxietyLevel == 2) {
        data.warningAvgInfo.anxietyLevelTxt = "中度";
      } else if (data.warningAvgInfo.anxietyLevel == 3) {
        data.warningAvgInfo.anxietyLevelTxt = "重度";
      }
      if (data.warningAvgInfo.forcedLevel == 0) {
        data.warningAvgInfo.forcedLevelTxt = "正常";
      } else if (data.warningAvgInfo.forcedLevel == 1) {
        data.warningAvgInfo.forcedLevelTxt = "轻度";
      } else if (data.warningAvgInfo.forcedLevel == 2) {
        data.warningAvgInfo.forcedLevelTxt = "中度";
      } else if (data.warningAvgInfo.forcedLevel == 3) {
        data.warningAvgInfo.forcedLevelTxt = "重度";
      }
      if (data.warningAvgInfo.suicideLevel == 0) {
        data.warningAvgInfo.suicideLevelTxt = "正常";
      } else if (data.warningAvgInfo.suicideLevel == 1) {
        data.warningAvgInfo.suicideLevelTxt = "轻度";
      } else if (data.warningAvgInfo.suicideLevel == 2) {
        data.warningAvgInfo.suicideLevelTxt = "中度";
      } else if (data.warningAvgInfo.suicideLevel == 3) {
        data.warningAvgInfo.suicideLevelTxt = "重度";
      }
      if (data.warningAvgInfo.violenceLevel == 0) {
        data.warningAvgInfo.violenceLevelTxt = "正常";
      } else if (data.warningAvgInfo.violenceLevel == 1) {
        data.warningAvgInfo.violenceLevelTxt = "轻度";
      } else if (data.warningAvgInfo.violenceLevel == 2) {
        data.warningAvgInfo.violenceLevelTxt = "中度";
      } else if (data.warningAvgInfo.violenceLevel == 3) {
        data.warningAvgInfo.violenceLevelTxt = "重度";
      }
      return data;
    },
    topBacks() {
      window.scrollTo(0, 0);
      this.topAct = 0;
      setTimeout(() => {
        // 左边扶梯效果
        this.part0 = this.$refs.parts0.offsetTop;
        this.part1 = this.$refs.parts1.offsetTop;
        this.part2 = this.$refs.parts2.offsetTop;
        this.part3 = this.$refs.parts3.offsetTop;
        this.part4 = this.$refs.parts4.offsetTop;
        this.part5 = this.$refs.parts5.offsetTop;
        this.part6 = this.$refs.parts6.offsetTop;
        this.part61 = this.$refs.parts61.offsetTop;
        this.part62 = this.$refs.parts62.offsetTop;

        this.parta1 = this.$refs.partr1.offsetTop;
        this.parta2 = this.$refs.partr2.offsetTop;
        this.parta3 = this.$refs.partr3.offsetTop;
        this.parta4 = this.$refs.partr4.offsetTop;
        this.listenerFunction();
      }, 500);
    },
    trendTab(type) {
      this.topAct = type;
      if (type == 1) {
        this.bcType = 1
        window.scrollTo(0, this.part1 - 20);
      }
      if (type == 2) {
        this.bcType = 1
        window.scrollTo(0, this.part2 - 20);
      }
      if (type == 3) {
        this.bcType = 1
        window.scrollTo(0, this.part3 - 20);
      }
      if (type == 4) {
        this.bcType = 1
        window.scrollTo(0, this.part4 - 20);
      }
      if (type == 5) {
        this.bcType = 1
        window.scrollTo(0, this.part5 - 20);
      }
      if (type == 6) {
        console.log('111111')
        if (this.bcType < 2) {
          console.log('2')
          this.bcType = 3
          window.scrollTo(0, this.part61 - 20);
        } else {
          this.bcType = this.bcType - 1
          if (this.bcType == 2) {
            console.log('3')
            window.scrollTo(0, this.part62 - 20);
          } 
          if (this.bcType == 1) {
            console.log('4')
            window.scrollTo(0, this.part6 - 20);
          }
        }
        
        // window.scrollTo(0, this.part6 - 20);
      }
        
    },
    trendTabs(type) {
      this.topAct = type;
      if (type == 1) {
        window.scrollTo(0, this.parta1 - 40);
      }
      if (type == 2) {
        window.scrollTo(0, this.parta2 - 40);
      }
      if (type == 3) {
        window.scrollTo(0, this.parta3 - 40);
      }
      if (type == 4) {
        window.scrollTo(0, this.parta4 - 40);
      }
    },
    listenerFunction(e) {
      document.addEventListener("scroll", this.handleScroll, true);
    },
    handleScroll() {
      this.scrollYs = window.pageYOffset;
      // console.log(this.scrollYs)
      if (this.reviewFlag) {
        if (this.scrollYs < this.part0) {
          this.topAct = 0;
        }
        if (this.part0 < this.scrollYs && this.scrollYs < this.parta1) {
          this.topAct = 1;
        }
        if (this.parta1 < this.scrollYs && this.scrollYs < this.parta2) {
          this.topAct = 2;
        }
        if (this.parta2 < this.scrollYs && this.scrollYs < this.parta3) {
          this.topAct = 3;
        }
        if (this.parta3 < this.scrollYs && this.scrollYs < this.parta4) {
          this.topAct = 4;
        }
      } else {
        // console.log(this.part0)
        // console.log(this.scrollYs)
        if (this.scrollYs < this.part0) {
          this.topAct = 0;
        }
        if (this.part0 < this.scrollYs && this.scrollYs < this.part1) {
          this.topAct = 1;
        }
        if (this.part1 < this.scrollYs && this.scrollYs < this.part2) {
          this.topAct = 2;
        }
        if (this.part2 < this.scrollYs && this.scrollYs < this.part3) {
          this.topAct = 3;
        }
        if (this.part3 < this.scrollYs && this.scrollYs < this.part4) {
          this.topAct = 4;
          // if (this.suicideFlag == 1 || this.violenceFlag == 1) {
          //   this.topAct = 3;
          // } else {
          //   this.topAct = 5;
          // }
        }
        if (this.part4 < this.scrollYs && this.scrollYs < this.part5) {
          this.topAct = 5;
          // if (this.personalityFlag == 1) {
          //   this.topAct = 5;
          // } else {
          //   this.topAct = 3;
          // }
        }
        if (this.part5 < this.scrollYs && this.scrollYs < this.part6) {
          this.topAct = 6;
          // if (this.personalityFlag == 1) {
          //   this.topAct = 5;
          // } else {
          //   this.topAct = 3;
          // }
        }
      }
    },
    toReview() {
      this.bcType = 1
      this.reviewFlag = !this.reviewFlag;
      this.topBacks();
    },
    myChartInit() {
      let that = this;
      // 当前视口宽度
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
      // 本次概况左侧环形图
      this.myChart = echarts.init(this.$refs.myChart);
      let warningNum = this.details.warningNum ? this.details.warningNum : 0
      this.myChart.setOption({
        title: {
          text: warningNum + '项',
          subtext: '风险',
          textStyle: {
            color: '#333E75',
            fontSize: nowSize(30),
            fontWeight: 500
          },
          subtextStyle: {
            color: '#FF748A',
            fontSize: nowSize(20),
            fontWeight: 500
          },
          itemGap: nowSize(10), // 主副标题距离
          left: 'center',
          top: nowSize(55)
        },
        angleAxis: {
          max: 6, // 满分
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
          radius: nowSize(160) // 图形大小
        },
        series: [
          {
            type: 'bar',
            // animation: false,
            // avoidLabelOverlap: false,
            label: {
              position: 'center',
              show: false,
              formatter: function() {
                let str = '{a|' + warningNum + '}' + '\n\n' + '{b|有风险}'
                return str
              },
              rich: {
                a: {
                  color: 'rgba(51, 62, 117, 1)', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                  fontSize: nowSize(32),
                  fontWeight: '500'
                },
                b: {
                  color: 'rgba(117, 122, 144, 1)',
                  fontSize: nowSize(20)
                }
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: nowSize(24),
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                name: '风险',
                value: warningNum,
                itemStyle: {
                  normal: {
                    barBorderRadius: [nowSize(2), nowSize(2), 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#FF748A'
                      },
                      {
                        offset: 1,
                        color: '#FFC7B6'
                      }
                    ])
                  }
                }
              }
            ],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: nowSize(18),
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
            barWidth: nowSize(18),
            barGap: '-100%', // 两环重叠
            z: 1
          }
        ]
      });
      setTimeout(() => {
        this.myChartLd2 = echarts.init(document.getElementById("myChartLd2"));
        this.myChartLd2.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.sysList[0].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.sysList[0].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.sysList[0].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "70%"],
              radius: "100%",
              splitNumber: 3,
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.sysList[0].subDim[0].name,
              that.sysList[0].subDim[1].name,
              that.sysList[0].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.sysList[0].subDim[0].score,
                    that.sysList[0].subDim[1].score,
                    that.sysList[0].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartLd3 = echarts.init(
          document.getElementById("myChartLd3")
        );
        this.myChartLd3.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.sysList[1].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.sysList[1].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.sysList[1].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "70%"],
              radius: "100%",
              splitNumber: 3,
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.sysList[1].subDim[0].name,
              that.sysList[1].subDim[1].name,
              that.sysList[1].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.sysList[1].subDim[0].score,
                    that.sysList[1].subDim[1].score,
                    that.sysList[1].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartLd4 = echarts.init(
          document.getElementById("myChartLd4")
        );
        this.myChartLd4.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.sysList[2].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.sysList[2].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.sysList[2].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "70%"],
              radius: "100%",
              splitNumber: 3,
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.sysList[2].subDim[0].name,
              that.sysList[2].subDim[1].name,
              that.sysList[2].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.sysList[2].subDim[0].score,
                    that.sysList[2].subDim[1].score,
                    that.sysList[2].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        if (document.getElementById("myChartLd5") != null) {
          this.myChartLd5 = echarts.init(document.getElementById("myChartLd5"));
          this.myChartLd5.setOption({
            tooltip: {
              show: false,
              padding: nowSize(10),
              axisPointer: {
                type: "shadow"
              },
              backgroundColor: "#fff",
              textStyle: {
                color: "#5B6C89"
              },
              extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
            },
            radar: [
              {
                indicator: [
                  {
                    name: that.sysList[3].subDim[0].name,
                    max: 3,
                    axisLabel: { show: false }
                  },
                  {
                    name: that.sysList[3].subDim[1].name,
                    max: 3,
                    axisLabel: { show: false }
                  },
                  {
                    name: that.sysList[3].subDim[2].name,
                    max: 3,
                    axisLabel: { show: false }
                  }
                ],
                center: ["50%", "70%"],
                radius: "100%",
                splitNumber: 3,
                name: {
                  formatter: "",
                  textStyle: {
                    color: "#354B70"
                  }
                },
                splitArea: {
                  areaStyle: {
                    color: [
                      "rgba(249, 250, 255, 1)",
                      "rgba(249, 250, 255, 1)",
                      "rgba(249, 250, 255, 1)"
                    ].reverse()
                  }
                },
                axisLine: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    type: "dashed",
                    color: [
                      "rgba(201, 212, 255, 1)",
                      "rgba(201, 212, 255, 1)",
                      "rgba(201, 212, 255, 1)"
                    ].reverse()
                  }
                },
                axisLabel: {
                  show: true,
                  color: "#FFFFFF",
                  fontSize: nowSize(20),
                  height: nowSize(32),
                  formatter: function(value, index) {
                    return "{yxStyle" + index + "|" + index + "}";
                  },
                  rich: {
                    yxStyle0: {
                      color: "#00C0FF",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle1: {
                      color: "#006cff",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle2: {
                      color: "#6671FF",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle3: {
                      color: "#FE5FB8",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    }
                  }
                }
              }
            ],
            legend: {
              left: "center",
              bottom: "0",
              icon: "circle",
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 40,
              textStyle: {
                color: "#354B70"
              },
              data: [
                that.sysList[3].subDim[0].name,
                that.sysList[3].subDim[1].name,
                that.sysList[3].subDim[2].name
              ]
            },
            series: [
              {
                name: "",
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
                    value: [
                      that.sysList[3].subDim[0].score,
                      that.sysList[3].subDim[1].score,
                      that.sysList[3].subDim[2].score
                    ],
                    name: "本次得分",
                    symbol: "circle",
                    symbolSize: 0,
                    itemStyle: {
                      color: "#58B5FF"
                    },
                    // // 在圆点上显示相关数据
                    // label: {
                    //   show: true,
                    //   color: 'rgba(147, 207, 255, 1)',
                    //   fontSize: nowSize(12)
                    // },
                    areaStyle: {
                      opacity: 1,
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "rgba(138, 203, 255, 0.23)"
                          },
                          {
                            offset: 1,
                            color: "rgba(138, 203, 255, 0.23)"
                          }
                        ],
                        globalCoord: false
                      }
                    },
                    lineStyle: {
                      width: nowSize(1),
                      color: '#58B5FF'
                    }
                  }
                ]
              }
            ]
          });
        }
        console.log(document.getElementById("myChartLd6"))
        if (document.getElementById("myChartLd6") != null) {
          this.myChartLd6 = echarts.init(document.getElementById("myChartLd6"));
          this.myChartLd6.setOption({
            tooltip: {
              show: false,
              padding: nowSize(10),
              axisPointer: {
                type: "shadow"
              },
              backgroundColor: "#fff",
              textStyle: {
                color: "#5B6C89"
              },
              extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
            },
            radar: [
              {
                indicator: [
                  {
                    name: that.sysList[4].subDim[0].name,
                    max: 3,
                    axisLabel: { show: false }
                  },
                  {
                    name: that.sysList[4].subDim[1].name,
                    max: 3,
                    axisLabel: { show: false }
                  },
                  {
                    name: that.sysList[4].subDim[2].name,
                    max: 3,
                    axisLabel: { show: false }
                  }
                ],
                center: ["50%", "70%"],
                radius: "100%",
                splitNumber: 3,
                name: {
                  formatter: "",
                  textStyle: {
                    color: "#354B70"
                  }
                },
                splitArea: {
                  areaStyle: {
                    color: [
                      "rgba(249, 250, 255, 1)",
                      "rgba(249, 250, 255, 1)",
                      "rgba(249, 250, 255, 1)"
                    ].reverse()
                  }
                },
                axisLine: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    type: "dashed",
                    color: [
                      "rgba(201, 212, 255, 1)",
                      "rgba(201, 212, 255, 1)",
                      "rgba(201, 212, 255, 1)"
                    ].reverse()
                  }
                },
                axisLabel: {
                  show: true,
                  color: "#FFFFFF",
                  fontSize: nowSize(20),
                  height: nowSize(32),
                  formatter: function(value, index) {
                    return "{yxStyle" + index + "|" + index + "}";
                  },
                  rich: {
                    yxStyle0: {
                      color: "#00C0FF",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle1: {
                      color: "#006cff",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle2: {
                      color: "#6671FF",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle3: {
                      color: "#FE5FB8",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    }
                  }
                }
              }
            ],
            legend: {
              left: "center",
              bottom: "0",
              icon: "circle",
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 40,
              textStyle: {
                color: "#354B70"
              },
              data: [
                that.sysList[4].subDim[0].name,
                that.sysList[4].subDim[1].name,
                that.sysList[4].subDim[2].name
              ]
            },
            series: [
              {
                name: "",
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
                    value: [
                      that.sysList[4].subDim[0].score,
                      that.sysList[4].subDim[1].score,
                      that.sysList[4].subDim[2].score
                    ],
                    name: "本次得分",
                    symbol: "circle",
                    symbolSize: 0,
                    itemStyle: {
                      color: "#58B5FF"
                    },
                    // // 在圆点上显示相关数据
                    // label: {
                    //   show: true,
                    //   color: 'rgba(147, 207, 255, 1)',
                    //   fontSize: nowSize(12)
                    // },
                    areaStyle: {
                      opacity: 1,
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "rgba(138, 203, 255, 0.23)"
                          },
                          {
                            offset: 1,
                            color: "rgba(138, 203, 255, 0.23)"
                          }
                        ],
                        globalCoord: false
                      }
                    },
                    lineStyle: {
                      width: nowSize(1),
                      color: '#58B5FF'
                    }
                  }
                ]
              }
            ]
          });
        }
        console.log(document.getElementById("myChartLd7"))
        if (document.getElementById("myChartLd7") != null) {
          this.myChartLd7 = echarts.init(document.getElementById("myChartLd7"));
          this.myChartLd7.setOption({
            tooltip: {
              show: false,
              padding: nowSize(10),
              axisPointer: {
                type: "shadow"
              },
              backgroundColor: "#fff",
              textStyle: {
                color: "#5B6C89"
              },
              extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
            },
            radar: [
              {
                indicator: [
                  {
                    name: that.sysList[5].subDim[0].name,
                    max: 3,
                    axisLabel: { show: false }
                  },
                  {
                    name: that.sysList[5].subDim[1].name,
                    max: 3,
                    axisLabel: { show: false }
                  },
                  {
                    name: that.sysList[5].subDim[2].name,
                    max: 3,
                    axisLabel: { show: false }
                  }
                ],
                center: ["50%", "70%"],
                radius: "100%",
                splitNumber: 3,
                name: {
                  formatter: "",
                  textStyle: {
                    color: "#354B70"
                  }
                },
                splitArea: {
                  areaStyle: {
                    color: [
                      "rgba(249, 250, 255, 1)",
                      "rgba(249, 250, 255, 1)",
                      "rgba(249, 250, 255, 1)"
                    ].reverse()
                  }
                },
                axisLine: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    type: "dashed",
                    color: [
                      "rgba(201, 212, 255, 1)",
                      "rgba(201, 212, 255, 1)",
                      "rgba(201, 212, 255, 1)"
                    ].reverse()
                  }
                },
                axisLabel: {
                  show: true,
                  color: "#FFFFFF",
                  fontSize: nowSize(20),
                  height: nowSize(32),
                  formatter: function(value, index) {
                    return "{yxStyle" + index + "|" + index + "}";
                  },
                  rich: {
                    yxStyle0: {
                      color: "#00C0FF",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle1: {
                      color: "#006cff",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle2: {
                      color: "#6671FF",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    },
                    yxStyle3: {
                      color: "#FE5FB8",
                      fontSize: nowSize(12),
                      // fontWeight: "bold",
                      padding: [nowSize(3), -nowSize(12)]
                    }
                  }
                }
              }
            ],
            legend: {
              left: "center",
              bottom: "0",
              icon: "circle",
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 40,
              textStyle: {
                color: "#354B70"
              },
              data: [
                that.sysList[5].subDim[0].name,
                that.sysList[5].subDim[1].name,
                that.sysList[5].subDim[2].name
              ]
            },
            series: [
              {
                name: "",
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
                    value: [
                      that.sysList[5].subDim[0].score,
                      that.sysList[5].subDim[1].score,
                      that.sysList[5].subDim[2].score
                    ],
                    name: "本次得分",
                    symbol: "circle",
                    symbolSize: 0,
                    itemStyle: {
                      color: "#58B5FF"
                    },
                    // // 在圆点上显示相关数据
                    // label: {
                    //   show: true,
                    //   color: 'rgba(147, 207, 255, 1)',
                    //   fontSize: nowSize(12)
                    // },
                    areaStyle: {
                      opacity: 1,
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "rgba(138, 203, 255, 0.23)"
                          },
                          {
                            offset: 1,
                            color: "rgba(138, 203, 255, 0.23)"
                          }
                        ],
                        globalCoord: false
                      }
                    },
                    lineStyle: {
                      width: nowSize(1),
                      color: '#58B5FF'
                    }
                  }
                ]
              }
            ]
          });
        }
        
        // this.myChartLd8 = echarts.init(document.getElementById("myChartLd8"));
        // this.myChartLd8.setOption({
        //   tooltip: {
        //     show: false,
        //     padding: nowSize(10),
        //     axisPointer: {
        //       type: "shadow"
        //     },
        //     backgroundColor: "#fff",
        //     textStyle: {
        //       color: "#5B6C89"
        //     },
        //     extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
        //   },
        //   radar: [
        //     {
        //       indicator: [
        //         {
        //           name: that.sysList[6].subDim[0].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.sysList[6].subDim[1].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.sysList[6].subDim[2].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         }
        //       ],
        //       center: ["50%", "70%"],
        //       radius: "100%",
        //       splitNumber: 3,
        //       name: {
        //         formatter: "",
        //         textStyle: {
        //           color: "#354B70"
        //         }
        //       },
        //       splitArea: {
        //         areaStyle: {
        //           color: [
        //             "rgba(249, 250, 255, 1)",
        //             "rgba(249, 250, 255, 1)",
        //             "rgba(249, 250, 255, 1)"
        //           ].reverse()
        //         }
        //       },
        //       axisLine: {
        //         show: false
        //       },
        //       splitLine: {
        //         lineStyle: {
        //           type: "dashed",
        //           color: [
        //             "rgba(201, 212, 255, 1)",
        //             "rgba(201, 212, 255, 1)",
        //             "rgba(201, 212, 255, 1)"
        //           ].reverse()
        //         }
        //       },
        //       axisLabel: {
        //         show: true,
        //         color: "#FFFFFF",
        //         fontSize: nowSize(20),
        //         height: nowSize(32),
        //         formatter: function(value, index) {
        //           return "{yxStyle" + index + "|" + index + "}";
        //         },
        //         rich: {
        //           yxStyle0: {
        //             color: "#00C0FF",
        //             fontSize: nowSize(12),
        //             // fontWeight: "bold",
        //             padding: [nowSize(3), -nowSize(12)]
        //           },
        //           yxStyle1: {
        //             color: "#006cff",
        //             fontSize: nowSize(12),
        //             // fontWeight: "bold",
        //             padding: [nowSize(3), -nowSize(12)]
        //           },
        //           yxStyle2: {
        //             color: "#6671FF",
        //             fontSize: nowSize(12),
        //             // fontWeight: "bold",
        //             padding: [nowSize(3), -nowSize(12)]
        //           },
        //           yxStyle3: {
        //             color: "#FE5FB8",
        //             fontSize: nowSize(12),
        //             // fontWeight: "bold",
        //             padding: [nowSize(3), -nowSize(12)]
        //           }
        //         }
        //       }
        //     }
        //   ],
        //   legend: {
        //     left: "center",
        //     bottom: "0",
        //     icon: "circle",
        //     itemWidth: 10,
        //     itemHeight: 10,
        //     itemGap: 40,
        //     textStyle: {
        //       color: "#354B70"
        //     },
        //     data: [
        //       that.sysList[6].subDim[0].name,
        //       that.sysList[6].subDim[1].name,
        //       that.sysList[6].subDim[2].name
        //     ]
        //   },
        //   series: [
        //     {
        //       name: "",
        //       type: "radar",
        //       color: ["rgba(0,117,255,0.1)"],
        //       emphasis: {
        //         lineStyle: {
        //           width: nowSize(2),
        //           color: "rgba(0, 117, 255, 0.6)"
        //         }
        //       },
        //       data: [
        //         {
        //           value: [
        //             that.sysList[6].subDim[0].score,
        //             that.sysList[6].subDim[1].score,
        //             that.sysList[6].subDim[2].score
        //           ],
        //           name: "本次得分",
        //           symbol: "circle",
        //           symbolSize: 0,
        //           itemStyle: {
        //             color: "#58B5FF"
        //           },
        //           // // 在圆点上显示相关数据
        //           // label: {
        //           //   show: true,
        //           //   color: 'rgba(147, 207, 255, 1)',
        //           //   fontSize: nowSize(12)
        //           // },
        //           areaStyle: {
        //             opacity: 1,
        //             color: {
        //               type: "linear",
        //               x: 0,
        //               y: 0,
        //               x2: 0,
        //               y2: 1,
        //               colorStops: [
        //                 {
        //                   offset: 0,
        //                   color: "rgba(138, 203, 255, 0.23)"
        //                 },
        //                 {
        //                   offset: 1,
        //                   color: "rgba(138, 203, 255, 0.23)"
        //                 }
        //               ],
        //               globalCoord: false
        //             }
        //           },
        //           lineStyle: {
        //             width: nowSize(1),
        //             color: '#58B5FF'
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // });
        let xYs = []
        let yYs = []
        for (let i in that.jjList) {
          xYs.push(that.jjList[i].title)
          yYs.push(that.jjList[i].total)
        }
        this.myChartZhuYs = echarts.init(this.$refs.myChartZhuYs);
        this.myChartZhuYs.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            padding: nowSize(10),
            textStyle: {
              color: "rgba(42, 52, 135, 0.80)",
              fontSize: nowSize(16)
            },
            formatter: function(params) {
              console.log(params)
              var result =
                '<span style="display:inline-block;margin-right:0.04rem;border-radius:0.1rem;width:0.1rem;height:0.1rem;background: rgba(214, 182, 246, 1)");></span>' +
                '<span style="color:#7786AC;font-size:0.14rem">' +
                params[0].name +
                "</span>" +
                ':<span style="color:#7786AC;display:inline-block;font-weight:blod;margin-left:0.05rem;font-size:0.14rem;">' +
                params[0].value +
                "</span>";
              return result;
            }
          },

          grid: {
            top: "6%",
            left: "1%",
            right: "1%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: xYs,
              axisLine: {
                show: false
              },
              axisLabel: {
                fontSize: nowSize(16),
                color: "rgba(42,52,135,0.8)",
                showMaxLabel: true
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              min: 0,
              max: 9,
              splitLine: {
                show: false
              },
              axisLabel: {
                fontSize: nowSize(16),
                color: "rgba(42,52,135,0.8)",
                showMaxLabel: true
              },
              minInterval: 3
            }
          ],
          series: [
            {
              name: "维度总分",
              type: "bar",
              barMaxWidth: nowSize(14),
              label: {
                show: true, // 显示数值
                position: 'top', // 在顶部显示
                textStyle: {
                  color: 'rgba(42,52,135,0.8)', // 标签字体颜色
                  fontSize: nowSize(16) // 标签字体大小
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [nowSize(7), nowSize(7), nowSize(7), nowSize(7)],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(214, 182, 246, 1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(225, 203, 246, 1)"
                    }
                  ])
                }
              },
              data: yYs
            }
          ]
        });
        this.myChartRg2 = echarts.init(document.getElementById("myChartRg2"));
        this.myChartRg2.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.rgList[0].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[0].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[0].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "60%"],
              radius: "80%",
              splitNumber: 3,
              shape: 'circle',
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.rgList[0].subDim[0].name,
              that.rgList[0].subDim[1].name,
              that.rgList[0].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.rgList[0].subDim[0].score,
                    that.rgList[0].subDim[1].score,
                    that.rgList[0].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRg3 = echarts.init(document.getElementById("myChartRg3"));
        console.log(that.rgList[1])
        this.myChartRg3.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.rgList[1].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[1].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[1].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "60%"],
              radius: "80%",
              splitNumber: 3,
              shape: 'circle',
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.rgList[1].subDim[0].name,
              that.rgList[1].subDim[1].name,
              that.rgList[1].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.rgList[1].subDim[0].score,
                    that.rgList[1].subDim[1].score,
                    that.rgList[1].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRg4 = echarts.init(document.getElementById("myChartRg4"));
        this.myChartRg4.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.rgList[2].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[2].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[2].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "60%"],
              radius: "80%",
              splitNumber: 3,
              shape: 'circle',
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.rgList[2].subDim[0].name,
              that.rgList[2].subDim[1].name,
              that.rgList[2].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.rgList[2].subDim[0].score,
                    that.rgList[2].subDim[1].score,
                    that.rgList[2].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRg5 = echarts.init(document.getElementById("myChartRg5"));
        this.myChartRg5.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.rgList[3].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[3].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[3].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "60%"],
              radius: "80%",
              splitNumber: 3,
              shape: 'circle',
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    // fontWeight: "bold",
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.rgList[3].subDim[0].name,
              that.rgList[3].subDim[1].name,
              that.rgList[3].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.rgList[3].subDim[0].score,
                    that.rgList[3].subDim[1].score,
                    that.rgList[3].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRg6 = echarts.init(document.getElementById("myChartRg6"));
        this.myChartRg6.setOption({
          tooltip: {
            show: false,
            padding: nowSize(10),
            axisPointer: {
              type: "shadow"
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#5B6C89"
            },
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);"
          },
          radar: [
            {
              indicator: [
                {
                  name: that.rgList[4].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[4].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.rgList[4].subDim[2].name,
                  max: 3,
                  axisLabel: { show: false }
                }
              ],
              center: ["50%", "60%"],
              radius: "80%",
              splitNumber: 3,
              shape: 'circle',
              name: {
                formatter: "",
                textStyle: {
                  color: "#354B70"
                }
              },
              splitArea: {
                areaStyle: {
                  color: [
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)",
                    "rgba(249, 250, 255, 1)"
                  ].reverse()
                }
              },
              axisLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: [
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)",
                    "rgba(201, 212, 255, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: nowSize(20),
                height: nowSize(32),
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: nowSize(12),
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: nowSize(12),
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: nowSize(12),
                    padding: [nowSize(3), -nowSize(12)]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: nowSize(12),
                    padding: [nowSize(3), -nowSize(12)]
                  }
                }
              }
            }
          ],
          legend: {
            left: "center",
            bottom: "0",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            textStyle: {
              color: "#354B70"
            },
            data: [
              that.rgList[4].subDim[0].name,
              that.rgList[4].subDim[1].name,
              that.rgList[4].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
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
                  value: [
                    that.rgList[4].subDim[0].score,
                    that.rgList[4].subDim[1].score,
                    that.rgList[4].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 0,
                  itemStyle: {
                    color: "#58B5FF"
                  },
                  // // 在圆点上显示相关数据
                  // label: {
                  //   show: true,
                  //   color: 'rgba(147, 207, 255, 1)',
                  //   fontSize: nowSize(12)
                  // },
                  areaStyle: {
                    opacity: 1,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(138, 203, 255, 0.23)"
                        },
                        {
                          offset: 1,
                          color: "rgba(138, 203, 255, 0.23)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: nowSize(1),
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
      }, 500);
    },
    myChartInit1() {
      let that = this;
      // 当前视口宽度
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
      var theIndex = -1;
      let tuli = []
      for (let i in that.reviewData.sandUseTimeInfo) {
        tuli.push(that.reviewData.sandUseTimeInfo[i].sandTypeName)
      }
      this.myChartRose = echarts.init(this.$refs.myChartRose);
      this.myChartRose.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {d}%",
          padding: nowSize(10),
          textStyle: {
            color: "rgba(42, 52, 135, 0.80)",
            fontSize: nowSize(14)
          }
        },
        legend: {
          data: tuli,
          left: 'center',
          orient: 'horizontal',
          triggerOn: 'none',
          itemGap: nowSize(30),
          selectedMode: false,
          bottom: nowSize(18),
          itemHeight: nowSize(8),
          icon: 'circle',
          textStyle: {
            color: 'rgba(42, 52, 135, 1)',
            fontSize: nowSize(16),
            padding: [0, 0, 0, -10]
          }
        },
        series: [
          {
            name: "沙具使用时长占比",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            itemStyle: {
              emphasis: {
                shadowBlur: nowSize(10),
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0)"
              },
              normal: {
                color: function(params) {
                  theIndex++;
                  var colorList = [
                    {
                      c1: "rgba(237, 237, 255, 1)",
                      c2: "rgba(237, 237, 255, 1)"
                    },
                    {
                      c1: "rgba(181, 184, 255, 1)",
                      c2: "rgba(181, 184, 255, 1)"
                    },
                    {
                      c1: "rgba(209, 248, 205, 1)",
                      c2: "rgba(209, 248, 205, 1)"
                    },
                    {
                      c1: "rgba(138, 203, 255, 1)",
                      c2: "rgba(138, 203, 255, 1)"
                    },
                    {
                      c1: "rgba(255, 176, 219, 1)",
                      c2: "rgba(255, 176, 219, 1)"
                    },
                    {
                      c1: "rgba(255, 236, 215, 1)",
                      c2: "rgba(255, 236, 215, 1)"
                    },
                    {
                      c1: "rgba(255, 163, 163, 1)",
                      c2: "rgba(255, 163, 163, 1)"
                    },
                    {
                      c1: "rgba(255, 201, 157, 1)",
                      c2: "rgba(255, 201, 157, 1)"
                    }
                  ];
                  var userIndex = theIndex % colorList.length;
                  return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: colorList[userIndex].c1
                    },
                    {
                      offset: 1,
                      color: colorList[userIndex].c2
                    }
                  ]);
                }
              }
            },
            labelLine: {
              normal: {
                smooth: 0,
                length: nowSize(10),
                length2: nowSize(50)
              }
            },
            data: [
              {
                value: that.reviewData.sandUseTimeInfo[0].num,
                name: that.reviewData.sandUseTimeInfo[0].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(160, 160, 255, 1)"
                    }
                  }
                }
              },
              {
                value: that.reviewData.sandUseTimeInfo[1].num,
                name: that.reviewData.sandUseTimeInfo[1].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(115, 122, 253, 1)"
                    }
                  }
                }
              },
              {
                value: that.reviewData.sandUseTimeInfo[2].num,
                name: that.reviewData.sandUseTimeInfo[2].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(144, 220, 136, 1)"
                    }
                  }
                }
              },
              {
                value: that.reviewData.sandUseTimeInfo[3].num,
                name: that.reviewData.sandUseTimeInfo[3].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(88, 181, 255, 1)"
                    }
                  }
                }
              },
              {
                value: that.reviewData.sandUseTimeInfo[4].num,
                name: that.reviewData.sandUseTimeInfo[4].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(255, 142, 194, 1)"
                    }
                  }
                }
              },
              {
                value: that.reviewData.sandUseTimeInfo[5].num,
                name: that.reviewData.sandUseTimeInfo[5].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(251, 194, 132, 1)"
                    }
                  }
                }
              },
              {
                value: that.reviewData.sandUseTimeInfo[6].num,
                name: that.reviewData.sandUseTimeInfo[6].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(255, 117, 117, 1)"
                    }
                  }
                }
              },
              {
                value: that.reviewData.sandUseTimeInfo[7].num,
                name: that.reviewData.sandUseTimeInfo[7].sandTypeName,
                label: {
                  formatter: "{m|{b}} {a|{d}%}",
                  rich: {
                    m: {
                      fontSize: nowSize(14),
                      color: "rgba(42, 52, 135, 0.80)"
                    },
                    a: {
                      fontSize: nowSize(14),
                      color: "rgba(255, 173, 106, 1)"
                    }
                  }
                }
              }
            ]
          }
        ]
      });
      this.myChartZhu = echarts.init(this.$refs.myChartZhu);
      this.myChartZhu.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          padding: nowSize(10),
          textStyle: {
            color: "rgba(42, 52, 135, 0.80)",
            fontSize: nowSize(14)
          }
        },

        grid: {
          top: "4%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: that.sandUseNumInfoName,
            axisLine: {
              show: false
            },
            axisLabel: {
              fontSize: nowSize(14),
              color: "rgba(42,52,135,0.8)",
              showMaxLabel: true
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLabel: {
              fontSize: nowSize(14),
              color: "rgba(42,52,135,0.8)",
              showMaxLabel: true
            },
            minInterval: 1
          }
        ],
        series: [
          {
            name: "使用数量",
            type: "bar",
            barMaxWidth: nowSize(14),
            // label: {
            //   show: true, // 显示数值
            //   position: 'top', // 在顶部显示
            //   textStyle: {
            //     color: 'rgba(42,52,135,0.8)', // 标签字体颜色
            //     fontSize: nowSize(14) // 标签字体大小
            //   }
            // },
            itemStyle: {
              normal: {
                barBorderRadius: [nowSize(7), nowSize(7), nowSize(7), nowSize(7)],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(214, 182, 246, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(225, 203, 246, 1)"
                  }
                ])
              }
            },
            data: that.sandUseNumInfoNum
          }
        ]
      });
    }
  }
};
</script>
<style >
  .el-table__empty-text{
    line-height: 2rem;
  }
  .el-table::before{
    background: transparent
  }
</style>
<style lang="less">
.detail_report_wrap {
  padding-bottom: 0.02rem;
  background: rgba(5, 157, 255, 0.05);
  position: relative;
  // 新版样式
  .drw_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0
  }
  .drw_contain{
    position: relative;
    .dt_header_wt {
      width: 100%;
      height: 0.86rem;
      background: transparent;
      display: flex;
      justify-content: center;
      .dt_h_box {
        width: 14rem;
        display: flex;
        justify-content: flex-end;
        font-family: SourceHanSansCN;
        font-weight: 400;
        font-size: 0.18rem;
        color: #333E75;
        line-height: 0.42rem;
        margin-top: 0.28rem;
        .dt_download {
          width: 1.16rem;
          height: 0.42rem;
          background: #848AFF;
          border-radius: 0.08rem;
          font-family: SourceHanSansCN;
          font-weight: 500;
          font-size: 0.2rem;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.12rem;
        }
      }
    }
    .drwc_box{
      width: 14rem;
      // height: 600px;
      margin: 0 auto 0.34rem;
      background: rgba(255,255,255,0.6);
      box-shadow: 0 0.2rem 0.16rem 0 rgba(228, 228, 235, 0.13);
      border-radius: 0.2rem;
      .drwc_b_flex{
        display: flex;
        align-items: center;
        padding: 0.49rem 0.33rem 0.35rem 0.47rem;
        .drwx_b_l{
          width: 2.09rem;
          height: 1.35rem;
        }
        .drwx_b_c{
          margin: 0 0.53rem 0 0.24rem;
          span{
            display: block;
            font-size: 0.32rem;
            color: #333E75;
            line-height: 0.38rem;
            text-align: left;
          }
          span:nth-child(1){
            font-family: SourceHanSansCN;
            font-weight: 400;
            margin-bottom: 0.3rem;
          }
          span:nth-child(2){
            font-family: Montserrat, Montserrat;
            font-weight: 500;
          }
        }
        .drwx_b_r{
          flex: 1;
          p {
            width: 100%;
            text-align: left;
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.18rem;
            color: #333E75;
            line-height: 0.36rem;
            letter-spacing: 0.008rem;
          }
        }
      }
      .drwc_b_person{
        display: flex;
        align-items: center;
        .dt_person_wt {
          width: 14rem;
          border: 0.04rem solid #FFFFFF;
          border-radius: 0.2rem;
          display: flex;
          align-items: center;
          .dtp_main {
            padding: 0.25rem 0.35rem;
            ul {
              display: flex;
              flex-wrap: wrap;
              li {
                padding: 0.1rem 0;
                text-align: left;
                display: flex;
                align-items: center;
                width:3.2rem;
                img {
                  margin-right: 0.06rem;
                }
                img.dt_per1 {
                  width: 0.18rem;
                  height: 0.19rem;
                  margin: 0 0.07rem 0 0.01rem;
                }
                img.dt_per2 {
                  width: 0.15rem;
                  height: 0.21rem;
                  margin: 0 0.08rem 0 0.03rem;
                }
                img.dt_per3 {
                  width: 0.18rem;
                  height: 0.18rem;
                  margin: 0 0.07rem 0 0.01rem;
                }
                img.dt_per4 {
                  width: 0.20rem;
                  height: 0.19rem;
                }
                img.dt_per5 {
                  width: 0.17rem;
                  height: 0.20rem;
                  margin: 0 0.07rem 0 0.02rem;
                }
                img.dt_per6 {
                  width: 0.14rem;
                  height: 0.20rem;
                  margin: 0 0.09rem 0 0.03rem;
                }
                img.dt_per7 {
                  width: 0.20rem;
                  height: 0.20rem;
                }
                img.dt_per8 {
                  width: 0.20rem;
                  height: 0.19rem;
                }
                span {
                  font-family: SourceHanSansCN;
                  font-weight: 400;
                  font-size: 0.18rem;
                  color: #333E75;
                  word-break: break-all;
                  flex: 1;
                  padding-right: 0.04rem;
                }
                .dt_blod {
                  flex: none;
                }
              }
            }
          }
        }
      }
      .drwc_b_tips{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.04rem solid #FFFAF3;
        border-radius: 0.1rem;
        height: 0.44rem;
        .drwx_b_r{
          margin: 0 0.06rem;
          p {
            width: 100%;
            text-align: left;
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.18rem;
            color: #333E75;
            line-height: 0.36rem;
            letter-spacing: 0.01rem;
          }
        }
      }
      .drwc_b_tips1{
        border: 0;
        border-radius: 0;
        padding: 0.32rem 0;
        border-top: 0.01rem solid #EAEBF1;
        width: 90%;
        margin: 0 auto;
      }
      .drwc_common{
        border: 0.04rem solid #FFFFFF;
        border-radius: 0.2rem;

        .drwc_bw_head {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0.26rem 0 0.12rem;
          img{
            width: 0.53rem;
            height: 0.55rem;
          }
          span{
            font-family: SourceHanSansCN;
            font-weight: 500;
            font-size: 0.2rem;
            color: #2A3487;
            margin-left: 0.16rem;
          }
        }
        .wdrj_box{
          margin-bottom: 0rem;
          .wdrj_main {
            padding: 0.1rem 0.5rem 0.1rem;
            border-radius: 0.06rem;
            margin-bottom: 0.2rem;
            .wdrj_title {
              display: flex;
              align-items: center;
              font-family: SourceHanSansCN;
              font-weight: 400;
              font-size: 0.2rem;
              color: #2A3487;
              line-height: 0.34rem;
              img {
                width: 0.12rem;
                height: 0.12rem;
                margin-right: 0.07rem;
              }
            }
            .wm_text{
              text-align: left;
              padding: 0;
              margin: 0.16rem 0 0.16rem;
              word-break: break-all;
              .el-button {
                margin-top: 0.16rem;
                padding: 0.09rem 0.27rem;
                border-radius: 0.04rem;
                font-family: SourceHanSansCN;
                font-weight: 400;
                font-size: 0.2rem;
                color: #FFFFFF;
                height: 0.4rem;
                width: 1rem;
                background: rgba(132, 138, 255, 1);
              }
              .primary1{
                color: rgba(132, 138, 255, 1);
                border: 0.01rem solid rgba(132, 138, 255, 1) !important;
                background: linear-gradient(263deg, #ffffff, #ffffff);
                box-shadow: 0px 3px 18px 0px rgba(250, 250, 250, 0.19);
              }
              .el-textarea{
                font-size: 0.16rem;
                height: 100%;
                .el-textarea__inner{
                  resize: none;
                  font-size: 0.18rem;
                  color: #333E75;
                  height: 100%;
                  background: rgba(226, 234, 255, 0.40);
                  padding: 14px 0.15rem 14px !important;
                  border: 0;
                }
                .el-input__count{
                  bottom: 4px;
                  right: 8px;
                }
              }
            }
          }
        }
        .drwc_b_tab{
          display: flex;
          
          .drwc_bt_left{
            width: 1.8rem;
            margin: 0 0.6rem 0.38rem 0.86rem;
            .drwc_btl{
              width: 100%;
              background: rgba(226,234,255,0.4);
              border-radius: 0.1rem;
              min-height: 4rem;
              ul {
                padding: 0.02rem 0;
                li {
                  height: 0.5rem;
                  line-height: 0.5rem;
                  font-family: SourceHanSansCN;
                  font-weight: 400;
                  font-size: 0.2rem;
                  color: #2A3487;
                  margin:0.3rem 0;
                  border-left: 0.04rem solid transparent;
                  cursor: pointer;
                }
                li.btl_act {
                  border-left: 0.04rem solid #737AFD;
                  background: #ffffff;
                }
              }
            }
          }
          .drwc_bt_right{
            flex: 1;
            .drwc_btr {
              .wdrj_box {
                margin-bottom: 0rem;
                .wdrj_main {
                  padding: 0.1rem 0.3rem 0.2rem 0.1rem;
                  border-radius: 0.04rem;
                  margin-bottom: 0.2rem;
                  .wdrj_title {
                    display: flex;
                    align-items: center;
                    font-size: 0.22rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #354b70;
                    line-height: 0.34rem;
                    img {
                      width: 0.67rem;
                      height: 0.22rem;
                    }
                  }
                  .dtmsb_tar {
                    width: 8.25rem;
                    height: 2.66rem;
                    margin: -0.28rem auto 0.2rem;
                    position: relative;
                    .top_top {
                      position: absolute;
                      margin: auto;
                      left: 0;
                      right: 0;
                      top: 0.22rem;
                      width: 4.13rem;
                      .tt_txt {
                        font-size: 0.16rem;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #354b70;
                        line-height: 0.2rem;
                        display: block;
                        position: relative;
                      }
                    }
                    .bottom_left {
                      position: absolute;
                      margin: auto;
                      left: 3.7rem;
                      bottom: 0.03rem;
                      width: 4.13rem;
                      .tt_txt {
                        font-size: 0.16rem;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #354b70;
                        line-height: 0.2rem;
                        display: block;
                        position: relative;
                      }
                    }
                    .bottom_right {
                      position: absolute;
                      margin: auto;
                      left: 0.42rem;
                      bottom: 0.03rem;
                      width: 4.13rem;
                      .tt_txt {
                        font-size: 0.16rem;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #354b70;
                        line-height: 0.2rem;
                        display: block;
                        position: relative;
                      }
                    }
                    .dengpao{
                      width:3.12rem;
                      height:3.07rem;
                      margin:0 auto;
                    }
                    .demsb_tool1 {
                      position: absolute;
                      margin: auto;
                      right: 2.48rem;
                      top: -0.07rem;
                      width: auto;
                      min-width: 65px;
                      height: 0.34rem;
                      background: url(../../assets/images/report/exmaple.png) no-repeat
                        center;
                      background-size: 100% 100%;
                      text-align: left;
                      display: flex;
                      flex-wrap: wrap;
                      align-items: center;
                      .demsb_score {
                        font-size: 0.14rem;
                        padding-left: 0.1rem;
                        padding-right: 0.2rem;
                        line-height: 0.34rem;
                        color: #7486af;
                        display: flex;
                        span {
                          margin-left: -0.08rem;
                          color: #00c0ff;
                        }
                      }
                      .demsb_score1 {
                        span {
                          margin-left: -0.26rem;
                          color: #016cff;
                        }
                      }
                    }
                    .demsb_tool {
                      position: absolute;
                      margin: auto;
                      left: 2.48rem;
                      top: -0.07rem;
                      width: auto;
                      min-width: 65px;
                      height: 0.34rem;
                      background: url(../../assets/images/report/exmaple2.png) no-repeat
                        center;
                      background-size: 100% 100%;
                      text-align: left;
                      display: flex;
                      flex-wrap: wrap;
                      align-items: center;

                      .demsb_score {
                        font-size: 0.14rem;
                        padding-left: 0.2rem;
                        padding-right: 0.1rem;
                        line-height: 0.34rem;
                        color: #7486af;
                        display: flex;
                        span {
                          margin-left: -0.08rem;
                          color: #00c0ff;
                        }
                      }
                      .demsb_score1 {
                        span {
                          margin-left: -0.26rem;
                          color: #016cff;
                        }
                      }
                    }
                    ul {
                      position: absolute;
                      margin: auto;
                      left: 0;
                      right: 0;
                      bottom: -0.32rem;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      li {
                        padding: 0 0.2rem;
                        display: flex;
                        align-items: center;
                        span {
                          font-size: 0.16rem;
                          font-family: Source Han Sans CN;
                          font-weight: 400;
                          color: #7786ac;
                        }
                        span:first-child {
                          margin-right: 0.06rem;
                          width: 0.08rem;
                          height: 0.08rem;
                          background: linear-gradient(174deg, #1becff 0%, #00c6ff 98%);
                          border-radius: 50%;
                        }
                      }
                      li:last-child {
                        span:first-child {
                          background: linear-gradient(
                            0deg,
                            rgba(0, 117, 255, 0.99),
                            rgba(0, 194, 255, 0.99)
                          );
                        }
                      }
                    }
                    .myChartLd0 {
                      width: 8.26rem;
                      height: 4.4rem;
                    }
                    .dtmsb_ulc {
                      position: absolute;
                      margin: auto;
                      left: 0;
                      right: 0;
                      bottom: -0.54rem;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      li {
                        padding: 0 0.2rem;
                        display: flex;
                        align-items: center;
                        img {
                          width: 2.6rem;
                          height: auto;
                        }
                        span {
                          font-size: 0.16rem;
                          font-family: Source Han Sans CN;
                          font-weight: 400;
                          color: #7786ac;
                        }
                        span:first-child {
                          margin-right: 0.06rem;
                          width: 0.08rem;
                          height: 0.08rem;
                          background: linear-gradient(174deg, #1becff 0%, #00c6ff 98%);
                          border-radius: 50%;
                        }
                      }
                      li:last-child {
                        span:first-child {
                          background: linear-gradient(
                            0deg,
                            rgba(0, 117, 255, 0.99),
                            rgba(0, 194, 255, 0.99)
                          );
                        }
                      }
                    }
                  }
                  .wdrj_suger {
                    margin-top: 0.5rem;
                    text-align: left;
                    .wdrjs_uls{
                      padding-left: 0.18rem;
                      li{
                        display: flex;
                        font-size: 0.16rem;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #354B70;
                        line-height: 0.4rem;
                        span {
                          margin-top: 0.12rem;
                          margin-right: 0.1rem;
                          text-align: center;
                          line-height: 0.16rem;
                          width: 0.16rem;
                          height: 0.16rem;
                          background: linear-gradient(177deg, #1becff, #00c6ff);
                          border-radius: 50%;
                          font-size: 0.12rem;
                          font-family: Source Han Sans CN;
                          font-weight: bold;
                          color: #ffffff;
                        }
                        p {
                          line-height: 0.36rem;
                          font-family: SourceHanSansCN;
                          font-weight: 400;
                          font-size: 0.16rem;
                          color: #333E75;
                        }
                        img{
                          width: 0.16rem;
                          height: 0.16rem;
                          margin-right: 0.06rem;
                          margin-top: 0.12rem;
                        }
                      }
                    }
                    .wdrjs_title {
                      font-family: SourceHanSansCN;
                      font-weight: 400;
                      font-size: 0.18rem;
                      color: #333E75;
                      display: flex;
                      align-items: center;
                      line-height: 0.34rem;
                      margin-left: 0.03rem;
                      img {
                        width: 0.12rem;
                        height: 0.12rem;
                        margin-right: 0.06rem;
                      }
                      .wdrjst_res {
                        display: flex;
                        align-items: center;
                        img {
                          width: 0.19rem;
                          height: 0.22rem;
                          margin-right: 0.06rem;
                          margin-left: 0.2rem;
                        }
                        .wdrjstr_txt {
                          font-size: 0.18rem;
                          font-family: Source Han Sans CN;
                          font-weight: 400;
                          color: #FE5FB8;
                        }
                      }
                    }
                    .wdrjs_tips {
                      display: flex;
                      flex-wrap: wrap;
                      width: auto;
                      background: #fffef8;
                      border: 0.01rem solid #ffe100;
                      border-radius: 0.02rem;
                      padding: 0 0.1rem;
                      margin: 0.15rem 0.15rem 0;
                      min-height: 0.42rem;
                      img {
                        width: 0.32rem;
                        height: 0.34rem;
                        margin-top: 0.1rem;
                      }
                      p {
                        text-align: left;
                        padding-left: 0;
                        flex: 1;
                        font-size: 0.16rem;
                        span {
                          color: #ff7e00;
                        }
                      }
                    }
                    .wdrjst_res1 {
                      display: flex;
                      align-items: center;
                      padding: 0 0.15rem;
                      margin: 0.3rem 0 0.1rem;
                      line-height: 0.26rem;
                      img {
                        width: 0.19rem;
                        height: 0.22rem;
                        margin-right: 0.06rem;
                      }
                      span {
                        font-size: 0.18rem;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #354b70;
                      }
                      .wdrjstr_txt {
                        font-size: 0.18rem;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #FE5FB8;
                      }
                    }
                    .wdrjst_del {
                      padding: 0.24rem;
                      line-height: 0.39rem;
                      font-size: 0.18rem;
                      font-family: Source Han Sans CN;
                      font-weight: 400;
                      color: #354b70;
                      text-align: left;
                      .pd24 {
                        padding-left: 0.24rem;
                        font-size: 0.16rem;
                      }
                      div {
                        line-height: 0.39rem;
                        font-size: 0.18rem;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #354b70;
                        img {
                          width: 0.16rem;
                          height: 0.12rem;
                          margin-right: 0.08rem;
                        }
                      }
                      ul {
                        li {
                          font-size: 0.14rem;
                          font-family: Source Han Sans CN;
                          font-weight: 400;
                          color: #354b70;
                          display: flex;
                          img {
                            width: 0.06rem;
                            height: 0.06rem;
                            margin-right: 0.1rem;
                            margin-top: 0.16rem;
                          }
                        }
                      }
                    }
                    .wdrjst_del1 {
                      width: 10.82rem;
                      background: url(../../assets/images/report/h_bg1.png) no-repeat top
                        left;
                      background-size: 100% 100%;
                      margin-left: 0.3rem;
                    }
                    .wdrjst_del2 {
                      width: 10.82rem;
                      background: url(../../assets/images/report/h_bg2.png) no-repeat top
                        left;
                      background-size: 100% 100%;
                      margin-left: 0.3rem;
                    }
                    .gb_contain {
                      text-align: left;
                      padding: 0.10rem 0.25rem;
                      p {
                        padding: 0.06rem 0 0.06rem;
                        font-size: 0.16rem;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #354b70;
                        display: flex;
                        align-items: flex-start;
                        img {
                          width: 0.04rem;
                          height: 0.18rem;
                          margin-top: 0.02rem;
                          margin-right: 0.06rem;
                        }
                      }
                      ul {
                        li {
                          display: flex;
                          line-height: 0.36rem;
                          span {
                            margin-top: 0.09rem;
                            margin-right: 0.08rem;
                            text-align: center;
                            line-height: 0.16rem;
                            width: 0.16rem;
                            height: 0.16rem;
                            background: linear-gradient(177deg, #1becff, #00c6ff);
                            border-radius: 50%;
                            font-size: 0.12rem;
                            font-family: Source Han Sans CN;
                            font-weight: bold;
                            color: #ffffff;
                            border: 0.01rem solid #00c6ff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          }
                          p {
                            padding: 0;
                            flex: 1;
                            display: flex;
                            flex-wrap: wrap;
                          }
                        }
                      }
                    }
                  }
                  .wdrj_suger1 {
                    margin-top: 0.1rem;
                  }
                  .wm_text{
                    text-align: center;
                    padding: 0;
                    margin: 0.16rem 0 0.16rem;
                    word-break: break-all;
                    .el-button {
                      margin-top: 0.16rem;
                      border: 0.01rem solid #dcdfe6;
                      padding: 0.09rem 0.27rem;
                      font-size: 0.16rem;
                      border-radius: 0.04rem;

                      color: #ffffff;
                      background: linear-gradient(263deg, #00c2ff, #0075ff);
                      box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
                    }
                    .primary1{
                      color: #0075ff;
                      border: 0.01rem solid #0075ff !important;
                      background: linear-gradient(263deg, #ffffff, #ffffff);
                      box-shadow: 0px 3px 18px 0px rgba(250, 250, 250, 0.19);
                    }
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
                }
              }
            }
          }
        }
        .drwc_b_tab1{
          display: block;
          .drwc_bt_top{
            width: auto;
            margin: 0.24rem auto 0.38rem;
            .drwc_btl{
              width: auto;
              background: transparent;
              border-radius: unset;
              min-height: auto;
              ul{
                width: 10rem;
                height: 0.5rem;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                li{
                  flex: 1;
                  max-width:2rem;
                  border: 0.01rem solid rgba(203, 206, 224, 1);
                  margin: 0;
                  border-right: 0;
                  font-family: SourceHanSansCN;
                  font-weight: 400;
                  font-size: 0.2rem;
                  color: #2A3487;
                }
                li:last-child{
                  border-right: 0.01rem solid rgba(203, 206, 224, 1);
                }
                li.btl_act{
                  border: 0;
                  background: #FFFFFF;
                  box-shadow: 0 0.02rem 0.2rem 0 #EBECFF;
                  font-weight: 500;
                  border-left: 0.01rem solid rgba(203, 206, 224, 1);
                  color: #333E75;
                }
              }
            }
          }
          .drwc_bt_bottom{
            .drwc_btr{
              .wdrj_box{
                .wdrj_main{
                  width: 10.4rem;
                  margin: 0 auto 0.4rem;
                  padding: 0;
                  .dtmsb_tar{
                    ol.dtmsb_tu{
                      margin: 0;
                      padding: 0;
                      li{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin: 0.08rem 0;
                        img{
                          width: 0.18rem;
                          height: 0.18rem;
                          margin-right: 0.06rem;
                        }
                        span{
                          font-family: SourceHanSansCN;
                          font-weight: 400;
                          font-size: 0.18rem;
                          color: #2A3487;
                        }
                      }
                    }
                  }
                  .wdrj_line{
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.6rem;
                    margin-top: 0.8rem;
                    justify-content: center;
                    .wdrj_l_left{
                      font-family: SourceHanSansCN;
                      font-weight: 400;
                      font-size: 0.18rem;
                      color: #6F76B2;
                    }
                    .wdrj_l_center{
                      width: 7.2rem;
                      height: 0.1rem;
                      margin: 0 0.26rem;
                      border-radius: 0.06rem;
                      background: linear-gradient( 270deg, #999EFF 0%, #9DBDFF 50%, #CDE9FF 100%);
                      position: relative;
                      .wdrj_lc_txt{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-family: SourceHanSansCN;
                        font-weight: 400;
                        font-size: 0.16rem;
                        color: #6F76B2;
                        margin-top: 0.2rem;
                      }
                      .dttr_btn {
                        width: 0.48rem;
                        height: auto;
                        position: absolute;
                        margin: auto;
                        margin-left: -0.24rem;
                        left: 0;
                        top: -0.16rem;
                      }
                      .dttr_score{
                        position: absolute;
                        margin: auto;
                        margin-left: -0.6rem;
                        left: 0;
                        bottom: 0.28rem;
                        min-width: 1.2rem;
                        height: 0.36rem;
                        background: #FFFFFF;
                        box-shadow: 0 0.02rem 0.1rem 0 #DDDFFF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.18rem;
                        font-family: SourceHanSansCN;
                        font-weight: 400;
                        color: #737AFD;
                        i{
                          width: 0;
                          height: 0;
                          border-left: 0.08rem solid transparent;
                          border-right: 0.08rem solid transparent;
                          border-bottom: 0.08rem solid #ffffff;
                          position: absolute;
                          margin: auto;
                          left: 0;
                          right: 0;
                          bottom: -0.07rem;
                          transform: rotate(180deg);
                        }
                      }
                      .dttr_lv {
                        position: absolute;
                        margin: auto;
                        margin-left: -0.7rem;
                        left: 0;
                        top: 0.14rem;
                        width: 1.4rem;
                        height: 0.6rem;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        justify-content: center;
                        font-size: 0.18rem;
                        font-family: SourceHanSansCN;
                        font-weight: 400;
                        color: #6F76B2;
                      }
                    }
                    .wdrj_l_right{
                      font-family: SourceHanSansCN;
                      font-weight: 400;
                      font-size: 0.18rem;
                      color: #6F76B2;
                    }
                  }
                }
              }
            }
          }
        }
        .drwc_b_ysl{
          width: auto;
          padding: 0rem 0.4rem 0.3rem;
          // display: flex;
          p{
            border-top: 0.01rem solid #EAEBF1;
          }
        }
        .drwc_b_ys{
          width: auto;
          padding: 0rem 0.4rem 0.3rem;
          display: flex;
          .myChartZhu {
            margin: 0.3rem 0 0;
            width: 10.4rem;
            height: 1.6rem;
          }
          p{
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.18rem;
            color: #333E75;
            padding: 0.3rem 0 0;
            width: 100%;
            text-align: left;
            // border-top: 0.01rem solid #EAEBF1;
          }
          span{
            font-weight: 500;
          }
        }
        .drwc_bw_shu{
          .tree_box{
            position: relative;
            width: 4.62rem;
            height: 5.49rem;
            margin: 0.28rem auto 0.2rem;
            background: url(../../assets/images/news/tree.png) no-repeat center;
            background-size: 100% 100%;
            div{
              text-align: center;
            }
            .tb_l1{
              width: 0.51rem;
              height: 0.82rem;
              position: absolute;
              top: 2.34rem;
              left: 0.06rem;
            }
            .tb_l2{
              width: 0.78rem;
              height: 0.75rem;
              position: absolute;
              top: 1.03rem;
              left: 0.92rem;
            }
            .tb_l3{
              width: 0.82rem;
              height: 0.67rem;
              position: absolute;
              top: 0.7rem;
              left: 2.41rem;
            }
            .tb_l4{
              width: 0.74rem;
              height: 0.86rem;
              position: absolute;
              top: 1.37rem;
              left: 3.58rem;
            }
            .tb_l5{
              width: 0.51rem;
              height: 0.82rem;
              position: absolute;
              top: 2.46rem;
              right: -0.37rem;
            }

            .tb_s_c11{
              position: absolute;
              top: 2rem;
              left: 0.18rem;
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              background: #9EC870;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .tb_s_c12{
              position: absolute;
              top: 2.34rem;
              left: -0.24rem;
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              background: #78CFAE;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .tb_s_c13{
              position: absolute;
              top: 3.02rem;
              left: -0.16rem;
              width: 0.28rem;
              height: 0.28rem;
              border-radius: 50%;
              background: #62A77D;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.16rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              line-height: 0.2rem;
            }
            .cir_box11{
              width: 0.64rem;
              height: 0.64rem;
              position: absolute;
              top: 2.54rem;
              left: 0.32rem;
              .cir_img{
                height: 100%;
                width: 100%;
                background-color: #03A667;
                border-radius: 50%;
                transform: rotate(0deg);
                position: absolute;
                clip: rect(auto, 0.32rem, 0.32rem, auto);
              }
              .cir_lay{
                height: 0.58rem;
                width: 0.58rem;
                background-color: #D7EFEC;
                border-radius: 50%;
                position: absolute;
                top: 0.03rem;
                left: 0.03rem;
              }
              .cir_cen{
                height: 0.5rem;
                width: 0.5rem;
                background-color: #03A667;
                border-radius: 50%;
                position: absolute;
                top: 0.07rem;
                left: 0.07rem;
                font-family: SourceHanSansCN;
                font-weight: 500;
                font-size: 0.14rem;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                div{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  span{
                    width: 35%;
                    font-family: SourceHanSansCN;
                    font-weight: 500;
                    font-size: 0.14rem;
                    color: #FFFFFF;
                    margin: 0 2%;
                  }
                  span:nth-child(2n+1) {
                    text-align: right;
                  }
                  span:nth-child(2n+2) {
                    text-align: left;
                  }

                }
              }
            }
            .cir_box12 {
              width: 0.70rem;
              height: 0.70rem;
              .cir_img{
                clip: rect(0.35rem, auto, auto, auto);
                transform: rotate(90deg);
              }
              .cir_lay{
                height: 0.64rem;
                width: 0.64rem;
              }
              .cir_cen{
                height: 0.56rem;
                width: 0.56rem;
              }
            }
            .cir_box13 {
              width: 0.78rem;
              height: 0.78rem;
              .cir_img{
                clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
                transform: rotate(0deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.72rem;
                width: 0.72rem;
              }
              .cir_cen{
                height: 0.64rem;
                width: 0.64rem;
              }
            }
            .cir_box14 {
              width: 0.98rem;
              height: 0.98rem;
              top: 2.5rem;
              left: 0.3rem;
              .cir_img{
                transform: rotate(0deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.92rem;
                width: 0.92rem;
              }
              .cir_cen{
                height: 0.84rem;
                width: 0.84rem;
              }
            }
            .tb_s_c21{
              position: absolute;
              top: 1.2rem;
              left: 0.6rem;
              width: 0.42rem;
              height: 0.42rem;
              border-radius: 50%;
              background: #FFD0A2;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 0 0.06rem;
              line-height: 1.4
            }
            .tb_s_c22{
              position: absolute;
              top: 1.08rem;
              left: 1.54rem;
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              background: #FFDD66;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .tb_s_c23{
              position: absolute;
              top: 0.72rem;
              left: 1.04rem;
              width: 0.34rem;
              height: 0.34rem;
              border-radius: 50%;
              background: #F4B36E;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.16rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              line-height: 0.26rem;
            }

            .cir_box21{
              width: 0.64rem;
              height: 0.64rem;
              position: absolute;
              top: 1.6rem;
              left: 1.16rem;
              .cir_img{
                height: 100%;
                width: 100%;
                background-color: #FFB641;
                border-radius: 50%;
                transform: rotate(30deg);
                position: absolute;
                clip: rect(auto, 0.32rem, 0.32rem, auto);
              }
              .cir_lay{
                height: 0.58rem;
                width: 0.58rem;
                background-color: #D7EFEC;
                border-radius: 50%;
                position: absolute;
                top: 0.03rem;
                left: 0.03rem;
              }
              .cir_cen{
                height: 0.5rem;
                width: 0.5rem;
                background-color: #FFB641;
                border-radius: 50%;
                position: absolute;
                top: 0.07rem;
                left: 0.07rem;
                font-family: SourceHanSansCN;
                font-weight: 500;
                font-size: 0.14rem;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                div{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  span{
                    width: 35%;
                    font-family: SourceHanSansCN;
                    font-weight: 500;
                    font-size: 0.14rem;
                    color: #FFFFFF;
                    margin: 0 2%;
                  }
                  span:nth-child(2n+1) {
                    text-align: right;
                  }
                  span:nth-child(2n+2) {
                    text-align: left;
                  }

                }
              }
            }
            .cir_box22 {
              width: 0.70rem;
              height: 0.70rem;
              .cir_img{
                clip: rect(0.35rem, auto, auto, auto);
                transform: rotate(120deg);
              }
              .cir_lay{
                height: 0.64rem;
                width: 0.64rem;
              }
              .cir_cen{
                height: 0.56rem;
                width: 0.56rem;
              }
            }
            .cir_box23 {
              width: 0.78rem;
              height: 0.78rem;
              .cir_img{
                clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
                // transform: rotate(0deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.72rem;
                width: 0.72rem;
              }
              .cir_cen{
                height: 0.64rem;
                width: 0.64rem;
              }
            }
            .cir_box24 {
              width: 0.98rem;
              height: 0.98rem;
              top: 1.66rem;
              left: 1rem;
              .cir_img{
                // transform: rotate(0deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.92rem;
                width: 0.92rem;
              }
              .cir_cen{
                height: 0.84rem;
                width: 0.84rem;
              }
            }

            .tb_s_c31{
              position: absolute;
              top: 0.69rem;
              left: 3.08rem;
              width: 0.50rem;
              height: 0.50rem;
              border-radius: 50%;
              background: #FFAAD1;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 0 0.04rem;
            }
            .tb_s_c32{
              position: absolute;
              top: 0.70rem;
              left: 2.12rem;
              width: 0.44rem;
              height: 0.44rem;
              border-radius: 50%;
              background: #FFB5AD;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 0 0.04rem;
            }
            .tb_s_c33{
              position: absolute;
              top: 0.31rem;
              left: 2.65rem;
              width: 0.42rem;
              height: 0.42rem;
              border-radius: 50%;
              background: #F494A7;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.16rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              line-height: 0.32rem;
              padding: 0 0.02rem;
            }
            .cir_box31{
              width: 0.64rem;
              height: 0.64rem;
              position: absolute;
              top: 1.2rem;
              left: 2.48rem;
              .cir_img{
                height: 100%;
                width: 100%;
                background-color: #FF918C;
                border-radius: 50%;
                transform: rotate(62deg);
                position: absolute;
                clip: rect(auto, 0.32rem, 0.32rem, auto);
              }
              .cir_lay{
                height: 0.58rem;
                width: 0.58rem;
                background-color: #D7EFEC;
                border-radius: 50%;
                position: absolute;
                top: 0.03rem;
                left: 0.03rem;
              }
              .cir_cen{
                height: 0.5rem;
                width: 0.5rem;
                background-color: #FF918C;
                border-radius: 50%;
                position: absolute;
                top: 0.07rem;
                left: 0.07rem;
                font-family: SourceHanSansCN;
                font-weight: 500;
                font-size: 0.14rem;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                div{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  span{
                    width: 35%;
                    font-family: SourceHanSansCN;
                    font-weight: 500;
                    font-size: 0.14rem;
                    color: #FFFFFF;
                    margin: 0 2%;
                  }
                  span:nth-child(2n+1) {
                    text-align: right;
                  }
                  span:nth-child(2n+2) {
                    text-align: left;
                  }

                }
              }
            }
            .cir_box32 {
              width: 0.70rem;
              height: 0.70rem;
              .cir_img{
                clip: rect(0.35rem, auto, auto, auto);
                transform: rotate(142deg);
              }
              .cir_lay{
                height: 0.64rem;
                width: 0.64rem;
              }
              .cir_cen{
                height: 0.56rem;
                width: 0.56rem;
              }
            }
            .cir_box33 {
              width: 0.78rem;
              height: 0.78rem;
              .cir_img{
                clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
                transform: rotate(44deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.72rem;
                width: 0.72rem;
              }
              .cir_cen{
                height: 0.64rem;
                width: 0.64rem;
              }
            }
            .cir_box34 {
              width: 0.98rem;
              height: 0.98rem;
              top: 1.2rem;
              left: 2.34rem;
              .cir_img{
                // transform: rotate(0deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.92rem;
                width: 0.92rem;
              }
              .cir_cen{
                height: 0.84rem;
                width: 0.84rem;
              }
            }
            .tb_s_c41{
              position: absolute;
              top: 1.65rem;
              right: 0.02rem;
              width: 0.42rem;
              height: 0.42rem;
              border-radius: 50%;
              background: #90CEFF;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 0.02rem;
            }
            .tb_s_c42{
              position: absolute;
              top: 1.18rem;
              left: 3.56rem;
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              background: #93B8ED;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .tb_s_c43{
              position: absolute;
              top: 1.08rem;
              right: 0.1rem;
              width: 0.34rem;
              height: 0.34rem;
              border-radius: 50%;
              background: #60C8F2;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.16rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              line-height: 0.26rem;
            }
            .cir_box41{
              width: 0.64rem;
              height: 0.64rem;
              position: absolute;
              top: 2.02rem;
              right: 0.64rem;
              .cir_img{
                height: 100%;
                width: 100%;
                background-color: #5AB4EE;
                border-radius: 50%;
                transform: rotate(76deg);
                position: absolute;
                clip: rect(auto, 0.32rem, 0.32rem, auto);
              }
              .cir_lay{
                height: 0.58rem;
                width: 0.58rem;
                background-color: #D7EFEC;
                border-radius: 50%;
                position: absolute;
                top: 0.03rem;
                left: 0.03rem;
              }
              .cir_cen{
                height: 0.5rem;
                width: 0.5rem;
                background-color: #5AB4EE;
                border-radius: 50%;
                position: absolute;
                top: 0.07rem;
                left: 0.07rem;
                font-family: SourceHanSansCN;
                font-weight: 500;
                font-size: 0.14rem;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                div{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  span{
                    width: 35%;
                    font-family: SourceHanSansCN;
                    font-weight: 500;
                    font-size: 0.14rem;
                    color: #FFFFFF;
                    margin: 0 2%;
                  }
                  span:nth-child(2n+1) {
                    text-align: right;
                  }
                  span:nth-child(2n+2) {
                    text-align: left;
                  }

                }
              }
            }
            .cir_box42 {
              width: 0.70rem;
              height: 0.70rem;
              .cir_img{
                clip: rect(0.35rem, auto, auto, auto);
                transform: rotate(164deg);
              }
              .cir_lay{
                height: 0.64rem;
                width: 0.64rem;
              }
              .cir_cen{
                height: 0.56rem;
                width: 0.56rem;
              }
            }
            .cir_box43 {
              width: 0.78rem;
              height: 0.78rem;
              .cir_img{
                clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
                transform: rotate(70deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.72rem;
                width: 0.72rem;
              }
              .cir_cen{
                height: 0.64rem;
                width: 0.64rem;
              }
            }
            .cir_box44 {
              width: 0.98rem;
              height: 0.98rem;
              top: 2.0rem;
              right: 0.58rem;
              .cir_img{
                // transform: rotate(0deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.92rem;
                width: 0.92rem;
              }
              .cir_cen{
                height: 0.84rem;
                width: 0.84rem;
              }
            }
            .tb_s_c51{
              position: absolute;
              top: 2.12rem;
              right: -0.24rem;
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              background: #C2C2ED;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 0 0.04rem;
              line-height: 1.2;
            }
            .tb_s_c52{
              position: absolute;
              top: 2.47rem;
              right: -0.61rem;
              width: 0.34rem;
              height: 0.34rem;
              border-radius: 50%;
              background: #BD9DEE;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.1rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 0 0.04rem;
              line-height: 1.2;
            }
            .tb_s_c53{
              position: absolute;
              top: 3.17rem;
              right: -0.59rem;
              width: 0.28rem;
              height: 0.28rem;
              border-radius: 50%;
              background: #E3B4FF;
              font-family: SourceHanSansCN;
              font-weight: 500;
              font-size: 0.16rem;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              line-height: 0.2rem;
            }
            .cir_box51{
              width: 0.64rem;
              height: 0.64rem;
              position: absolute;
              top: 2.68rem;
              right: -0.17rem;
              .cir_img{
                height: 100%;
                width: 100%;
                background-color: #C8B4FF;
                border-radius: 50%;
                transform: rotate(130deg);
                position: absolute;
                clip: rect(auto, 0.32rem, 0.32rem, auto);
              }
              .cir_lay{
                height: 0.58rem;
                width: 0.58rem;
                background-color: #D7EFEC;
                border-radius: 50%;
                position: absolute;
                top: 0.03rem;
                left: 0.03rem;
              }
              .cir_cen{
                height: 0.5rem;
                width: 0.5rem;
                background-color: #C8B4FF;
                border-radius: 50%;
                position: absolute;
                top: 0.07rem;
                left: 0.07rem;
                font-family: SourceHanSansCN;
                font-weight: 500;
                font-size: 0.14rem;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                div{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  span{
                    width: 35%;
                    font-family: SourceHanSansCN;
                    font-weight: 500;
                    font-size: 0.14rem;
                    color: #FFFFFF;
                    margin: 0 2%;
                  }
                  span:nth-child(2n+1) {
                    text-align: right;
                  }
                  span:nth-child(2n+2) {
                    text-align: left;
                  }

                }
              }
            }
            .cir_box52 {
              width: 0.70rem;
              height: 0.70rem;
              .cir_img{
                clip: rect(0.35rem, auto, auto, auto);
                transform: rotate(214deg);
              }
              .cir_lay{
                height: 0.64rem;
                width: 0.64rem;
              }
              .cir_cen{
                height: 0.56rem;
                width: 0.56rem;
              }
            }
            .cir_box53 {
              width: 0.78rem;
              height: 0.78rem;
              .cir_img{
                clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
                transform: rotate(114deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.72rem;
                width: 0.72rem;
              }
              .cir_cen{
                height: 0.64rem;
                width: 0.64rem;
              }
            }
            .cir_box54 {
              width: 0.98rem;
              height: 0.98rem;
              top: 2.64rem;
              right: -0.14rem;
              .cir_img{
                // transform: rotate(0deg);
                clip: unset;
              }
              .cir_lay{
                height: 0.92rem;
                width: 0.92rem;
              }
              .cir_cen{
                height: 0.84rem;
                width: 0.84rem;
              }
            }
          }
        }
        .drwc_bw_shu1 {
          transform: scale(0.5); 
          margin-top: -1.1rem;
          height: 3.7rem;
        }
        .drwc_b_ysp{
          display: block;
          margin: 0 0.5rem;
          padding: 0 1rem 0.3rem;
          .drwc_sp_head{
            font-family: SourceHanSansCN;
            font-weight: 500;
            font-size: 0.18rem;
            color: #333E75;
            text-align: left;
            margin: 0.34rem 0 0.14rem;
          }
          p{
            padding:0.1rem 0 0;
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.16rem;
            color: #2A3487;
            display: flex;
            align-items: center;
            img{
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.02rem;
              margin-top: -0.1rem;
            }
          }
        }
        .drwc_bw_t{
          display: flex;
          align-items: center;
          margin-left: 0.4rem;
          .drwcb_l{
            width: 0.04rem;
            height: 0.18rem;
            background: #737AFD;
            margin-right: 0.08rem;
          }
          .drwcb_t{
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 0.18rem;
            color: #333E75;
          }
        }
        .drwc_b_work{
          display: flex;
          align-items: center;
          
          .dtm_contain {
            display: flex;
            justify-content: space-between;
            text-align: left;
            position: relative;
            width:100%;
            .dr_review {
              position: absolute;
              right: 0;
              top: -0.52rem;
              width: 1.26rem;
              line-height: 0.36rem;
              box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
              border-radius: 0.04rem;
              background: linear-gradient(0deg, #0075ff, #00c2ff);
              padding: 1px;
              overflow: hidden;
              .dr_bok {
                background: #ffffff;
                border-radius: 0.04rem;
              }
              span {
                text-align: center;
                display: block;
                border-radius: 0.04rem;
                height: 100%;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #006cff;
                line-height: 0.36rem;
                font-size: 0.16rem;
                background: rgba(5, 157, 255, 0.05);
              }
            }
            .dtmc_left {
              width: 5.0rem;
              margin: 0 0.32rem 0.4rem 0.4rem;
              // border-radius: 0.16rem;
              overflow: hidden;
              .dtmcl_pic {
                width: 3.08rem;
                height: 1.73rem;
                position: relative;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 0.16rem;
                }
                .dtmcl_click {
                  width: 0.8rem;
                  height: 0.77rem;
                  border-radius: 0rem;
                  position: absolute;
                  top: 0.92rem;
                  left: 1.83rem;
                }
              }
              .dtmcl_chart {
                position: relative;
                .dtmcl_c_nor{
                  width: 1.8rem;
                  height: 1.8rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin: 0 auto;
                  border-radius: 50%;
                  border: 0.18rem solid #82df95;
                  font-family: SourceHanSansCN;
                  font-weight: 500;
                  font-size: 0.38rem;
                  color: #82df95;
                }
                .my_chart {
                  width: 1.8rem;
                  height: 1.8rem;
                  margin: 0 auto;
                }
                .c_o_my_txt {
                  position: absolute;
                  width: 2rem;
                  text-align: center;
                  height: 0.24rem;
                  line-height: 0.24rem;
                  font-size: 0.18rem;
                  margin: auto;
                  top: 0.72rem;
                  left: 0;
                  right: 0;
                }
                .c_o_my_num {
                  position: absolute;
                  width: 2rem;
                  text-align: center;
                  height: 0.28rem;
                  line-height: 0.28rem;
                  font-size: 0.22rem;
                  font-weight: 500;
                  margin: auto;
                  top: 0.96rem;
                  color: #00c0ff;
                  left: 0;
                  right: 0;
                }
                .c_red {
                  color: rgba(255, 42, 84, 1);
                }
              }
              .dtmcl_du {
                display: flex;
                align-items: center;
                padding: 0 0.25rem;
                img {
                  width: 0.26rem;
                  height: 0.26rem;
                  margin-right: 0.06rem;
                }
                span {
                  font-size: 0.18rem;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #5b6c89;
                  line-height: 1;
                }
                .dtmcl_tx {
                  color: #00c0ff;
                }
              }
              .dtmcl_du1 {
                margin-bottom: 0.12rem;
                img {
                  width: 0.22rem;
                  height: 0.25rem;
                  margin-right: 0.06rem;
                }
                span{
                  font-size:0.2rem
                }
              }
              .dtmcl_sys {
                .dtmcl_du3{
                  margin-top: 0.1rem;
                  span{
                    font-family: SourceHanSansCN;
                    font-weight: 500;
                    font-size: 0.18rem;
                    color: #333E75;
                  }
                }
                .dtmcl_stip{
                  display: flex;
                  align-items: center;
                  margin-top: 0.08rem;
                  span{
                    font-family: SourceHanSansCN;
                    font-weight: 400;
                    font-size: 0.18rem;
                    color: #333E75;
                  }
                  img{
                    width:0.21rem;
                    height:0.21rem;
                    margin: 0 0.02rem 0 0;
                  }
                }
                .dtmcl_sbox{
                  display: flex;
                  margin-top:0.14rem;
                  .dtmcl_sb_t{
                    width: auto;
                    font-family: SourceHanSansCN;
                    font-weight: 500;
                    font-size: 0.18rem;
                    color: #333E75;
                  }
                  .dtmcl_sb_c{
                    flex: 1;
                    ul {
                      width: 100%;
                      display: flex;
                      flex-wrap: wrap;
                      li{
                        width: 50%;
                        display: flex;
                        align-items: center;
                        margin-bottom: 0.1rem;
                        span{
                          font-family: SourceHanSansCN;
                          font-weight: 400;
                          font-size: 0.18rem;
                          color: #333E75;
                        }
                        img {
                          width: 0.67rem;
                          height: 0.22rem;
                          margin-left:0.04rem;
                        }
                      }
                    }
                    div{
                      width: 100%;
                      // padding: 0 0.24rem;
                      font-family: SourceHanSansCN;
                      font-weight: 400;
                      font-size: 0.18rem;
                      color: #333E75;
                    }
                  }
                }
                .dtmcl_du2 {
                  margin-bottom: 0.12rem;
                  img {
                    width: 0.2rem;
                    height: 0.2rem;
                    margin-right: 0.06rem;
                  }
                }
              }
              .dtmcl_txt {
                margin: 0.1rem 0.24rem 0.14rem;
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #354b70;
                line-height: 0.3rem;
              }
            }
            .dtmc_right1 {
              flex: 1;
              overflow: hidden;
              .dtmcr_bts1 {
                padding: 0.12rem 0.25rem 0.25rem 0;
                // margin-bottom: 0.2rem;
                p {
                  text-align: left;
                  margin-bottom: 0.14rem;
                  // color: #5b6c89;
                  display: flex;
                  align-items: flex-start;
                  text-indent: 0.32rem;
                  img {
                    width: 0.04rem;
                    height: 0.18rem;
                    margin-top: 0.04rem;
                    margin-right: 0.1rem;
                  }
                  span {
                    text-align: left;
                    font-family: SourceHanSansCN;
                    font-weight: 400;
                    font-size: 0.16rem;
                    color: #333E75;
                    line-height: 1.4;
                  }
                }
              }
            }
            .dtmc_right {
              flex: 1;
              // background: #ffffff;
              // border-radius: 0.04rem;
              overflow: hidden;
              position: relative;
              margin: 0.1rem 0.4rem 0.36rem 0.1rem;
              // min-height:4.4rem;
              .dtmc_r_biao{
                width: 100%;
                ul {
                  width: 100%;
                  border: 0.01rem solid rgba(166, 172, 204, 1);
                  border-bottom: 0;
                  border-right: 0;
                  // display: flex;
                  li {
                    width: 100%;
                    display: flex;

                    div{
                      flex: 1;
                      text-align: center;
                      font-family: SourceHanSansCN;
                      font-weight: 400;
                      font-size: 0.14rem;
                      color: #2A3487;
                      border: 0.01rem solid rgba(166, 172, 204, 1);
                      border-left: 0;
                      border-top: 0;
                      padding: 0.1rem 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      span{
                        font-family: SourceHanSansCN;
                        font-weight: 400;
                        font-size: 0.14rem;
                        color: #333E75;
                      }
                      img{
                        width: 0.67rem;
                        height: 0.22rem;
                      }
                    }
                  }
                  li:nth-child(1) {
                    div{
                      font-family: SourceHanSansCN;
                      font-weight: 500;
                      font-size: 0.16rem;
                      padding: 0.14rem 0;
                    }
                  }
                }
              }
              .myChartScore{
                width: 8rem;
                height: 3rem;
              }
              .rtr_ul {
                ul {
                  display: flex;
                  justify-content: center;
                  li {
                    font-family: SourceHanSansCN;
                    font-weight: 400;
                    font-size: 0.16rem;
                    color: #2A3487;
                    line-height: 0.32rem;
                    display: flex;
                    align-items: center;
                    padding: 0rem 0.4rem 0.2rem;
                    span {
                      margin-right: 0.04rem;
                      display: inline-block;
                      width: 0.08rem;
                      height: 0.08rem;
                      border-radius: 50%;
                    }
                    span.r_cir1 {
                      background: rgba(147, 207, 255, 1);
                    }
                    span.r_cir2 {
                      background: rgba(169, 173, 255, 1);
                    }
                  }
                }
              }
              .dtmcl_box {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                position: absolute;
                top: 0.6rem;
                bottom: 0;
                left: 0;
                right: 0;
                min-height: 4rem;
                padding-bottom: 0.2rem;
                .dtmcr_ul {
                  width: 100%;
                }
              }
              .dtmcl_tle {
                display: flex;
                align-items: center;
                height: 0.6rem;
                background: linear-gradient(
                  90deg,
                  rgba(114, 121, 255, 0.78),
                  rgba(186, 191, 255, 0.78)
                );
                font-size: 0.22rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #ffffff;
                span {
                  text-align: center;
                }
                span:nth-child(1) {
                  width: 1.66rem;
                }
                span:nth-child(2) {
                  width: 1.84rem;
                }
                span:nth-child(3) {
                  width: 1.84rem;
                }
                span:nth-child(4) {
                  width: 2.4rem;
                }
              }
              .dtmcr_ul {
                display: flex;
                align-items: center;
                height: 0.6rem;
                font-size: 0.18rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #5b6c89;
                li {
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .dr_sp0 {
                    color: #00e805;
                  }
                  .dr_sp1 {
                    color: #ffe400;
                  }
                  .dr_sp2 {
                    color: #fc9b2f;
                  }
                  .dr_sp3 {
                    color: #fe2727;
                  }
                  .dr_li11 {
                    img {
                      display: block;
                      width: 0.9rem;
                      height: 0.34rem;
                      margin-right: 0.08rem;
                    }
                    span {
                      display: block;
                      border-radius: 0.16rem;
                      color: #FE5FB8;
                      height: 100%;
                      line-height: 0.32rem;
                      font-size: 0.18rem;
                      font-family: PingFang SC;
                      font-weight: 400;
                    }
                  }
                  .dr_li0,
                  .dr_li1,
                  .dr_li2,
                  .dr_li3 {
                    width: 0.88rem;
                    line-height: 0.32rem;
                    margin-right: 0.08rem;
                    background: linear-gradient(0deg, #FE5FB8, #ff83df);
                    border-radius: 0.16rem;
                    padding: 1px;
                    overflow: hidden;
                    span {
                      display: block;
                      border-radius: 0.16rem;
                      color: #FE5FB8;
                      height: 100%;
                      line-height: 0.32rem;
                      font-size: 0.18rem;
                      font-family: PingFang SC;
                      font-weight: 400;
                      background: linear-gradient(
                        94deg,
                        rgba(255, 119, 195, 0.12),
                        rgba(255, 160, 230, 0.12)
                      );
                    }
                  }
                  .dr_li2 {
                    background: linear-gradient(0deg, #a6acff, #7279ff);
                    span {
                      color: #6671FF;
                      background: linear-gradient(
                        94deg,
                        rgba(186, 191, 255, 0.12),
                        rgba(114, 121, 255, 0.12)
                      );
                    }
                  }
                  .dr_li3 {
                    background: linear-gradient(0deg, #0075ff, #00c2ff);
                    span {
                      color: #006cff;
                      background: linear-gradient(
                        94deg,
                        rgba(5, 157, 255, 0.05),
                        rgba(0, 192, 255, 0.05)
                      );
                    }
                  }
                  .dr_bok {
                    background: #ffffff;
                    border-radius: 0.16rem;
                  }
                }
                li:nth-child(1) {
                  width: 1.66rem;
                }
                li:nth-child(2) {
                  width: 1.84rem;
                }
                li:nth-child(3) {
                  width: 1.84rem;
                }
                li:nth-child(4) {
                  width: 2.4rem;
                }
              }
              .dtmcr_bt {
                margin-top: 0.2rem;
                margin-bottom: 0.3rem;
                padding: 0 0.58rem;
                .db_img {
                  display: flex;
                  align-items: center;
                  font-size: 0.18rem;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #006cff;
                  margin-bottom: 0.1rem;
                  img {
                    width: 0.28rem;
                    height: 0.28rem;
                    margin-right: 0.08rem;
                  }
                }
                p {
                  font-size: 0.16rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: #354b70;
                }
              }
            }
            
          }
        }
      }
      
    }
    .drwc_boxr {
      .drwc_common{
        margin-bottom: 0.4rem;
        .drwc_bw_head{
          img{
            width: 0.53rem;
            height: 0.51rem;
          }
        }
        .dtmt_tle {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 0 auto;
          width: 12rem;
          img {
            width: 0.12rem;
            height: 0.12rem;
          }
          span {
            margin: 0 0.1rem;
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.2rem;
            color: #333E75;
          }
        }
        .myChartRose,
        .myChartZhu {
          margin: 0 auto;
          width: 12rem;
          height: 4rem;
        }
        .dtm_xls {
          width: 12.58rem;
          margin: 0.3rem auto 0.4rem;
          border: 0.01rem solid rgba(215, 223, 251, 1);
          .dtmx_li {
            display: flex;

            height: 0.5rem;

            .dtmxl_head {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 2.5rem;
              border-bottom: 0.01rem solid rgba(215, 223, 251, 1);
              border-right: 0.01rem solid rgba(215, 223, 251, 1);
              background: rgba(246, 249, 255, 0.60);
              font-family: SourceHanSansCN;
              font-weight: 400;
              font-size: 0.18rem;
              color: #2A3487;
            }
            .dtmxl_body {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 3.78rem;
              border-bottom: 0.01rem solid rgba(215, 223, 251, 1);
              border-right: 0.01rem solid rgba(215, 223, 251, 1);
              font-family: SourceHanSansCN;
              font-weight: 400;
              font-size: 0.18rem;
              color: #2A3487;
              span {
                color: #2A3487;
              }
            }
            .dtmxl_body:last-child {
              border-right: 0;
            }
          }
          .dtmx_lis {
            height: 1rem;
            .dtmxl_head {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 2.5rem;
              border-bottom: 0 !important;
              border-right: 0.01rem solid rgba(215, 223, 251, 1);
              background: rgba(246, 249, 255, 0.60);
              font-family: SourceHanSansCN;
              font-weight: 400;
              font-size: 0.18rem;
              color: #2A3487;
            }
            .dtmxl_body {
              display: block;
              flex: 1;
              border-bottom: 0 !important;
              border-right: 0.01rem solid rgba(215, 223, 251, 1);
              .dtmxl_dl {
                height: 0.5rem;
                display: flex;

                .dtmxl_dt {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 2rem;
                  height: 0.5rem;
                  border-bottom: 0.01rem solid rgba(215, 223, 251, 1);
                  border-right: 0.01rem solid rgba(215, 223, 251, 1);
                  background: rgba(246, 249, 255, 0.60);
                  font-family: SourceHanSansCN;
                  font-weight: 400;
                  font-size: 0.18rem;
                  color: #2A3487;
                }
                .dtmxl_dd {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 4.28rem;
                  border-bottom: 0.01rem solid rgba(215, 223, 251, 1);
                  border-right: 0.01rem solid rgba(215, 223, 251, 1);
                  font-family: SourceHanSansCN;
                  font-weight: 400;
                  font-size: 0.18rem;
                  color: #2A3487;
                }

                .dtmxl_dds {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 3.78rem;
                  border-bottom: 0.01rem solid rgba(215, 223, 251, 1);
                  font-family: SourceHanSansCN;
                  font-weight: 400;
                  font-size: 0.18rem;
                  color: #2A3487;
                }
              }
              .dtmxl_dl:last-child {
                .dtmxl_dt {
                  border-bottom: 0 !important;
                }
                .dtmxl_dd {
                  border-bottom: 0 !important;
                }
                .dtmxl_dds {
                  border-bottom: 0 !important;
                }
              }
            }
            .dtmxl_body:last-child {
              border-right: 0;
            }
          }
        }
        .dtm_img_sys {
          height: 2.68rem;
          width: 11.60rem;
          margin: 0.3rem auto 0.2rem;
          .el-carousel__item h3 {
            font-size: 0.22rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #ffffff;
            margin: 0;
          }
          .el-carousel{
            .el-carousel__container{
              width: 90%;
              margin: 0 auto;
              .el-carousel__arrow{
                width: 0.48rem;
                height: 0.48rem;
                background: #ffffff;
                box-shadow: 0 0.02rem 0.1rem 0 #DDDFFF;
                border-radius: 50%;
                i {
                  font-size: 0.2rem;
                  color: rgba(115, 122, 253, 1);
                }
              }
              .el-carousel__arrow--left {
                left: -1.4rem;
              }
              .el-carousel__arrow--right {
                right: -1.4rem;
              }
              .el-carousel__item--card {
                width: 3.5rem;
                scale: 1.2;
                .el-carousel__mask{
                  width:0
                }
              }
              // .is-in-stage{
              //   scale: 1.2;
              // }
              .is-active{
                scale: 1;
                margin-left: 0.58rem;
              }
            }
          }
          .el-carousel--horizontal {
            overflow: inherit;
            .el-carousel__item--card {
              display: none;
            }
            .is-in-stage {
              display: block;
            }
          }
          .el-carousel__item {
            // border-radius: 0.04rem;
            // background-color: #ffffff;
            // border: 0.01rem solid #c4ecff;
            .el-carousel__mask {
              // background-color: rgba(70, 101, 135, 0.14);
            }
          }
          .is-active {
            background-color: #ffffff;
            .el-carousel__mask {
              background-color: #ffffff;
            }
          }
          .el-carousel__indicators--outside {
            display: none;
          }
          
          
          .dtm_img_box {
            height: 3rem;
            .dtmi_img {
              display: block;
              width: 3.5rem;
              height: 1.96rem;
              border-radius: 0.16rem;
            }
            .dtmi_txt {
              width: 100%;
              // height: 0.25rem;
              line-height: 0.25rem;
              padding: 0.23rem 0;
              font-family: SourceHanSansCN;
              font-weight: 400;
              font-size: 0.18rem;
              color: #6F76B2;
            }
          }
        }
        // 表格样式
        .dtm_table {
          margin-bottom: 0.2rem;
          min-height: auto;
          width: 10.08rem;
          margin: 0.3rem auto 0.2rem;
          border: 0;
          background: transparent !important;
          .el-table__header{
            background: rgba(230, 235, 247, 0.6) !important;
            overflow: hidden;
            border-radius: 0.11rem;
            thead th{
              font-weight: 500;
            }
          }
          .el-table::before{
            width: 0 !important;
            height: 0 !important;
          }
          .el-table--border,
          .el-table--group,
          .el-table--border:after,
          .el-table--group:after,
          .el-table:before {
            border: none
          }
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before {
            background: transparent !important;

          }
          
          th,
          tr,
          td {
            background: transparent !important;
            border: 0;
            height: 0.46rem;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            text-align: center;
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.18rem;
            color: #2A3487;
          }
          td,
          th.is-leaf {
            border: 0;
            border-color: transparent;
            background: transparent !important;
          }
          td {
            height: 0.4rem !important;
            color: #2A3487;
            border: 0;
          }
          thead {
            width:100%;
            height: 0.46rem;
            border-radius: 0.08rem;
            th,
            tr {
              background: rgba(230, 235, 247, 0.60);
              font-weight: 400;
              font-size: 0.18rem;
              color: #2A3487;
            }
          }
          .el-button--text {
            font-size: 0.16rem;
            padding: 0.09rem 0.06rem;
          }
          .el-table__header,
          .el-table__body {
            col:nth-child(1) {
              width: 1.2rem;
            }
            col:nth-child(2) {
              width: 2rem;
            }
            // col:nth-child(5) {
            //   width: 2rem;
            // }
            col:nth-child(6) {
              width: 0;
            }
          }
          .primary_g,
          .primary_r {
            width: 0.6rem;
            height: 0.24rem;
            line-height: 1;
            margin: 0 auto;
            background: linear-gradient(
              45deg,
              rgba(196, 236, 255, 1) 0%,
              rgba(151, 205, 255, 1) 100%
            );
            padding: 1px;
            border-radius: 0.02rem;
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
              color: #006cff;
            }
            .el-button--danger.is-plain,
            .el-button--danger.is-plain:focus,
            .el-button--danger.is-plain:hover {
              color: #ff8854;
            }
          }
          .primary_r {
            background: linear-gradient(
              45deg,
              rgba(253, 186, 133, 1) 0%,
              rgba(255, 126, 117, 1) 100%
            );
          }
        }
        // 底部分页
        .table_page {
          display: flex;
          font-family: Source Han Sans CN;
          font-weight: 400;
          font-size: 0.14rem;
          align-items: center;
          justify-content: flex-end;
          width: 10.3rem;
          margin: 0 auto 0.4rem;
          .page_total {
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.2rem;
            color: #2D3788;
            span {
              color: #737AFD;
            }
          }
          .el-pagination {
            .el-pager {
              .number {
                padding: 0 0.04rem;
                height: 0.4rem;
                width: 0.4rem;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                font-family: SourceHanSansCN;
                font-weight: 400;
                font-size: 0.2rem;
                color: #737AFD;
                line-height: 0.4rem;
                border: 0.1rem solid #ffffff;
                box-shadow: 0px 0.02rem 0.1rem 0px #DDDFFF;
                background: #FFFFFF;
                margin: 0 0.03rem;
              }
              .number.active {
                color: #737AFD;
                background: #F6F6FF;
                border: 0.01rem solid #737AFD;
              }
            }
            .btn-next,
            .btn-prev {
              color: #737AFD;
              background: #FFFFFF;
              cursor: pointer;
              width: 0.4rem;
              height: 0.4rem;
              border-radius: 50%;
              padding: 0;
              margin: 0 0.04rem;
              box-shadow: 0px 0.02rem 0.1rem 0px #DDDFFF;
             .el-icon{
                font-size:0.18rem;
              }
            }
            button:disabled{
              color: #ffffff;
              background: #becdf8;
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
    }
    .drwc_box_t{
      margin: 0 auto 0.34rem;
      background: rgba(255,247,230,0.9);
      box-shadow: 0 0.2rem 0.16rem 0 rgba(228, 228, 235, 0.13);
      border-radius: 0.1rem;
      
    }
  }

  // 旧版样式
  .fix_pass {
    .el-dialog {
      width: auto;
      .el-dialog__body {
        width: 12rem;
        padding: 0.2rem;
        .dtmcl_click {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
  }
  // .r_futi {
  //   position: absolute;
  //   left: 0.6rem;
  //   top: 9.36rem;
  //   z-index: 100;
  //   width: 1.6rem;
  //   .r_t_tab {
  //     border: 1px solid #c7e0ff;
  //     border-radius: 2px 2px 0px 0px;
  //     padding-top: 0.18rem;
  //     background: #f6fcff;
  //     img {
  //       display: block;
  //       width: 0.51rem;
  //       height: 0.51rem;
  //       margin: 0 auto;
  //     }
  //     span {
  //       display: block;
  //       width: 100%;
  //       text-align: center;
  //       font-size: 0.2rem;
  //       font-family: Source Han Sans CN;
  //       font-weight: 400;
  //       line-height: 0.24rem;
  //       padding: 0.13rem 0 0.18rem;
  //     }
  //   }
  //   .r_t_tab:last-child {
  //     border: 1px solid #c7e0ff;
  //     border-bottom: 1px solid #c7e0ff;
  //     border-top: 0;
  //     border-radius: 0px 0px 2px 2px;
  //   }
  //   .r_t_b0 {
  //     border-bottom: 0;
  //   }
  //   .r_t_tab_act1 {
  //     color: #006cff;
  //     border-color: #0090ff;
  //     background: rgba(255, 255, 255, 0.08);
  //   }
  //   .r_t_tab_act2 {
  //     color: #006cff;
  //     background: rgba(255, 255, 255, 0.08);
  //     border-top: 1px solid !important;
  //     border-color: #0090ff !important;
  //   }
  // }
  .r_t_tab_t0{
    // margin: 0 auto;
    display: inline-flex;
    margin-top: 0.22rem;
    width: auto;
    // height: 0.52rem;
    background: #848AFF;
    box-shadow: 0 0.02rem 0.6rem 0 rgba(208, 210, 248, 0.13);
    border-radius: 0.08rem;
    // border: 0.04rem solid #FFFFFF;
    padding: 0 0.14rem;
    // display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.22rem;
    span{
      width: auto;
      font-family: SourceHanSansCN, SourceHanSansCN;
      font-weight: 500;
      color: #FFFFFF;
      font-size: 0.2rem;
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
  .r_futi_fix {
    position: fixed;
    margin: auto;
    top: 1rem;
    left: 0.46rem;
    z-index: 1111;
    .r_t_tab_t{
      margin-top: 0.22rem;
      width: 1.76rem;
      // height: 0.52rem;
      background: #848AFF;
      box-shadow: 0 0.02rem 0.6rem 0 rgba(208, 210, 248, 0.13);
      border-radius: 0.42rem;
      // border: 0.04rem solid #FFFFFF;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.22rem;
      span{
        width: auto;
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 500;
        color: #FFFFFF;
        font-size: 0.2rem;
        line-height: 1;
        padding: 0.16rem 0;
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
  .dt_header {
    width: 100%;
    height: 0.6rem;
    background: #f7fbff;
    display: flex;
    justify-content: center;
    .dt_h_box {
      width: 12rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 0.16rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #0086ff;
      .dt_download {
        width: 1.1rem;
        height: 0.34rem;
        background: linear-gradient(263deg, #0075ff, #00c2ff);
        box-shadow: 0 0.03rem 0.18rem 0 rgba(62, 150, 253, 0.19);
        border-radius: 0.03rem;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.26rem;
      }
    }
  }
  .dt_top_bg {
    width: 100%;
    height: 5.9rem;
    position: relative;
    .dttb_tips {
      position: absolute;
      margin: auto;
      top: 0.25rem;
      left: 50%;
      margin-left: 0;
      padding: 0 0.21rem;
      height: 0.42rem;
      display: flex;
      align-items: center;
      background: rgba(255, 227, 251, 0.12);
      border: 0.01rem solid #ffe7f7;
      box-shadow: 0px 0.13rem 0.43rem 0px rgba(238, 93, 87, 0.1);
      border-radius: 0.02rem;
      img {
        margin: 0 0.05rem 0 0;
        width: 0.19rem;
        height: 0.22rem;
      }
      span {
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #fff7f6;
      }
    }
    .dttb_txt {
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.9);
      width: 8.97rem;
      text-align: left;
      position: absolute;
      margin: auto;
      top: 0.8rem;
      bottom: 0;
      right: 0;
      left: 0;
      h1 {
        font-size: 0.36rem;
        line-height: 1;
        margin: 0;
        padding: 0;
        margin-bottom: 0.28rem;
      }
      p {
        text-indent: 0.2rem;
        font-size: 0.2rem;
        line-height: 0.32rem;
        margin-bottom: 0.18rem;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    // .dt_person {
    //   position: absolute;
    //   margin: auto;
    //   top: 4.96rem;
    //   left: 0;
    //   right: 0;
    //   width: 12rem;
    //   height: 1.8rem;
    //   background: #ffffff;
    //   box-shadow: 0 0.13rem 0.43rem 0 rgba(70, 101, 135, 0.1);
    //   border-radius: 0.04rem;
    //   display: flex;
    //   align-items: center;
    //   .dtp_photo {
    //     width: 1.48rem;
    //     height: 1.48rem;
    //     margin-left: 0.2rem;
    //     margin-right: 0.1rem;
    //     img {
    //       width: 100%;
    //       height: 100%;
    //     }
    //   }
    //   .dtp_main {
    //     flex: 1;
    //     ul {
    //       display: flex;
    //       flex-wrap: wrap;
    //       li {
    //         padding: 0.1rem 0;
    //         text-align: left;
    //         display: flex;
    //         align-items: center;
    //         img {
    //           margin-right: 0.08rem;
    //         }
    //         img.dt_per1 {
    //           width: 0.16rem;
    //           height: 0.17rem;
    //         }
    //         img.dt_per2 {
    //           width: 0.17rem;
    //           height: 0.17rem;
    //         }
    //         img.dt_per3 {
    //           width: 0.14rem;
    //           height: 0.20rem;
    //         }
    //         img.dt_per4 {
    //           width: 0.17rem;
    //           height: 0.17rem;
    //           // margin-left: 0.02rem;
    //         }
    //         img.dt_per5 {
    //           width: 0.18rem;
    //           height: 0.18rem;
    //         }
    //         img.dt_per6 {
    //           width: 0.18rem;
    //           height: 0.18rem;
    //         }
    //         img.dt_per7 {
    //           width: 0.17rem;
    //           height: 0.14rem;
    //         }
    //         img.dt_per8 {
    //           width: 0.16rem;
    //           height: 0.17rem;
    //         }
    //         span {
    //           font-size: 0.16rem;
    //           font-family: Source Han Sans CN;
    //           font-weight: 500;
    //           color: #354b70;
    //           word-break: break-all;
    //           flex: 1;
    //           padding-right: 0.04rem;
    //         }
    //         .dt_blod {
    //           font-weight: 500;
    //           flex: none;
    //         }
    //       }
    //     }
    //   }
    // }
  }
  .dt_mains {
    width: 12rem;
    margin: 0 auto;
    padding-top: 0.86rem;

    .dtm_title {
      width: 1.88rem;
      height: 0.34rem;
      margin: 0.82rem auto 0.62rem;
      line-height: 0.34rem;
      text-align: center;
      font-size: 0.2rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      background: url("../../assets/images/report/title.png") no-repeat center;
      overflow: hidden;
      background-size: 100%;
    }
    .dtm_title2 {
      width: 2.98rem;
      background: url("../../assets/images/report/title2.png") no-repeat center;
      background-size: 100%;
    }
    .dtm_title3 {
      width: 3.38rem;
      background: url("../../assets/images/report/title3.png") no-repeat center;
      background-size: 100%;
    }
    // .dtm_contain {
    //   display: flex;
    //   justify-content: space-between;
    //   text-align: left;
    //   position: relative;
    //   .dr_review {
    //     position: absolute;
    //     right: 0;
    //     top: -0.52rem;
    //     width: 1.26rem;
    //     line-height: 0.36rem;
    //     box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
    //     border-radius: 0.04rem;
    //     background: linear-gradient(0deg, #0075ff, #00c2ff);
    //     padding: 1px;
    //     overflow: hidden;
    //     .dr_bok {
    //       background: #ffffff;
    //       border-radius: 0.04rem;
    //     }
    //     span {
    //       text-align: center;
    //       display: block;
    //       border-radius: 0.04rem;
    //       height: 100%;
    //       font-family: Source Han Sans CN;
    //       font-weight: 400;
    //       color: #006cff;
    //       line-height: 0.36rem;
    //       font-size: 0.16rem;
    //       background: rgba(5, 157, 255, 0.05);
    //     }
    //   }
    //   .dtmc_left {
    //     width: 4rem;
    //     border-radius: 0.04rem;
    //     background: #ffffff;
    //     overflow: hidden;
    //     .dtmcl_tle {
    //       display: flex;
    //       align-items: center;
    //       height: 0.6rem;
    //       background: linear-gradient(
    //         90deg,
    //         rgba(5, 157, 255, 0.7),
    //         rgba(49, 204, 255, 0.7)
    //       );
    //       font-size: 0.22rem;
    //       font-family: Source Han Sans CN;
    //       font-weight: 400;
    //       color: #ffffff;
    //       img {
    //         width: 0.3rem;
    //         height: 0.3rem;
    //         margin-right: 0.1rem;
    //         margin-left: 0.24rem;
    //       }
    //     }
    //     .dtmcl_pic {
    //       width: 3.58rem;
    //       height: 2.01rem;
    //       margin: 0.2rem auto 0.2rem;
    //       position: relative;
    //       img {
    //         width: 100%;
    //         height: 100%;
    //         border-radius: 0.04rem;
    //       }
    //       .dtmcl_click {
    //         width: 0.8rem;
    //         height: 0.77rem;
    //         border-radius: 0rem;
    //         position: absolute;
    //         top: 0.92rem;
    //         left: 1.83rem;
    //       }
    //     }
    //     .dtmcl_chart {
    //       position: relative;
    //       .my_chart {
    //         width: 1.9rem;
    //         height: 1.9rem;
    //         margin: 0 auto;
    //       }
    //       .c_o_my_txt {
    //         position: absolute;
    //         width: 2rem;
    //         text-align: center;
    //         height: 0.24rem;
    //         line-height: 0.24rem;
    //         font-size: 0.18rem;
    //         margin: auto;
    //         top: 0.72rem;
    //         left: 0;
    //         right: 0;
    //       }
    //       .c_o_my_num {
    //         position: absolute;
    //         width: 2rem;
    //         text-align: center;
    //         height: 0.28rem;
    //         line-height: 0.28rem;
    //         font-size: 0.22rem;
    //         font-weight: 500;
    //         margin: auto;
    //         top: 0.96rem;
    //         color: #00c0ff;
    //         left: 0;
    //         right: 0;
    //       }
    //       .c_red {
    //         color: rgba(255, 42, 84, 1);
    //       }
    //     }
    //     .dtmcl_du {
    //       display: flex;
    //       align-items: center;
    //       padding: 0 0.25rem;
    //       img {
    //         width: 0.26rem;
    //         height: 0.26rem;
    //         margin-right: 0.06rem;
    //       }
    //       span {
    //         font-size: 0.18rem;
    //         font-family: PingFang SC;
    //         font-weight: 400;
    //         color: #5b6c89;
    //         line-height: 1;
    //       }
    //       .dtmcl_tx {
    //         color: #00c0ff;
    //       }
    //     }
    //     .dtmcl_du1 {
    //       margin-bottom: 0.12rem;
    //       img {
    //         width: 0.22rem;
    //         height: 0.25rem;
    //         margin-right: 0.06rem;
    //       }
    //       span{
    //         font-size:0.2rem
    //       }
    //     }
    //     .dtmcl_sys {
    //       margin-bottom: 0.3rem;
    //       .dtmcl_du2 {
    //         margin-bottom: 0.12rem;
    //         img {
    //           width: 0.2rem;
    //           height: 0.2rem;
    //           margin-right: 0.06rem;
    //         }
    //       }
    //     }
    //     .dtmcl_txt {
    //       margin: 0.1rem 0.24rem 0.14rem;
    //       font-size: 0.16rem;
    //       font-family: Source Han Sans CN;
    //       font-weight: 400;
    //       color: #354b70;
    //       line-height: 0.3rem;
    //     }
    //   }
    //   .dtmc_right {
    //     width: 7.76rem;
    //     background: #ffffff;
    //     border-radius: 0.04rem;
    //     overflow: hidden;
    //     position: relative;
    //     min-height:4.4rem;
    //     .dtmcl_box {
    //       display: flex;
    //       flex-wrap: wrap;
    //       align-items: center;
    //       position: absolute;
    //       top: 0.6rem;
    //       bottom: 0;
    //       left: 0;
    //       right: 0;
    //       min-height: 4rem;
    //       padding-bottom: 0.2rem;
    //       .dtmcr_ul {
    //         width: 100%;
    //       }
    //     }
    //     .dtmcl_tle {
    //       display: flex;
    //       align-items: center;
    //       height: 0.6rem;
    //       background: linear-gradient(
    //         90deg,
    //         rgba(114, 121, 255, 0.78),
    //         rgba(186, 191, 255, 0.78)
    //       );
    //       font-size: 0.22rem;
    //       font-family: Source Han Sans CN;
    //       font-weight: 400;
    //       color: #ffffff;
    //       span {
    //         text-align: center;
    //       }
    //       span:nth-child(1) {
    //         width: 1.66rem;
    //       }
    //       span:nth-child(2) {
    //         width: 1.84rem;
    //       }
    //       span:nth-child(3) {
    //         width: 1.84rem;
    //       }
    //       span:nth-child(4) {
    //         width: 2.4rem;
    //       }
    //     }
    //     .dtmcr_ul {
    //       display: flex;
    //       align-items: center;
    //       height: 0.6rem;
    //       font-size: 0.18rem;
    //       font-family: Source Han Sans CN;
    //       font-weight: 400;
    //       color: #5b6c89;
    //       li {
    //         text-align: center;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         .dr_sp0 {
    //           color: #00e805;
    //         }
    //         .dr_sp1 {
    //           color: #ffe400;
    //         }
    //         .dr_sp2 {
    //           color: #fc9b2f;
    //         }
    //         .dr_sp3 {
    //           color: #fe2727;
    //         }
    //         .dr_li11 {
    //           img {
    //             display: block;
    //             width: 0.9rem;
    //             height: 0.34rem;
    //             margin-right: 0.08rem;
    //           }
    //           span {
    //             display: block;
    //             border-radius: 0.16rem;
    //             color: #FE5FB8;
    //             height: 100%;
    //             line-height: 0.32rem;
    //             font-size: 0.18rem;
    //             font-family: PingFang SC;
    //             font-weight: 400;
    //           }
    //         }
    //         .dr_li0,
    //         .dr_li1,
    //         .dr_li2,
    //         .dr_li3 {
    //           width: 0.88rem;
    //           line-height: 0.32rem;
    //           margin-right: 0.08rem;
    //           background: linear-gradient(0deg, #FE5FB8, #ff83df);
    //           border-radius: 0.16rem;
    //           padding: 1px;
    //           overflow: hidden;
    //           span {
    //             display: block;
    //             border-radius: 0.16rem;
    //             color: #FE5FB8;
    //             height: 100%;
    //             line-height: 0.32rem;
    //             font-size: 0.18rem;
    //             font-family: PingFang SC;
    //             font-weight: 400;
    //             background: linear-gradient(
    //               94deg,
    //               rgba(255, 119, 195, 0.12),
    //               rgba(255, 160, 230, 0.12)
    //             );
    //           }
    //         }
    //         .dr_li2 {
    //           background: linear-gradient(0deg, #a6acff, #7279ff);
    //           span {
    //             color: #6671FF;
    //             background: linear-gradient(
    //               94deg,
    //               rgba(186, 191, 255, 0.12),
    //               rgba(114, 121, 255, 0.12)
    //             );
    //           }
    //         }
    //         .dr_li3 {
    //           background: linear-gradient(0deg, #0075ff, #00c2ff);
    //           span {
    //             color: #006cff;
    //             background: linear-gradient(
    //               94deg,
    //               rgba(5, 157, 255, 0.05),
    //               rgba(0, 192, 255, 0.05)
    //             );
    //           }
    //         }
    //         .dr_bok {
    //           background: #ffffff;
    //           border-radius: 0.16rem;
    //         }
    //       }
    //       li:nth-child(1) {
    //         width: 1.66rem;
    //       }
    //       li:nth-child(2) {
    //         width: 1.84rem;
    //       }
    //       li:nth-child(3) {
    //         width: 1.84rem;
    //       }
    //       li:nth-child(4) {
    //         width: 2.4rem;
    //       }
    //     }
    //     .dtmcr_bt {
    //       margin-top: 0.2rem;
    //       margin-bottom: 0.3rem;
    //       padding: 0 0.58rem;
    //       .db_img {
    //         display: flex;
    //         align-items: center;
    //         font-size: 0.18rem;
    //         font-family: PingFang SC;
    //         font-weight: 400;
    //         color: #006cff;
    //         margin-bottom: 0.1rem;
    //         img {
    //           width: 0.28rem;
    //           height: 0.28rem;
    //           margin-right: 0.08rem;
    //         }
    //       }
    //       p {
    //         font-size: 0.16rem;
    //         font-family: Source Han Sans CN;
    //         font-weight: 400;
    //         color: #354b70;
    //       }
    //     }
    //   }
    //   .dtmc_right1 {
    //     width: 7.76rem;
    //     background: #ffffff;
    //     border-radius: 0.04rem;
    //     overflow: hidden;

    //     .dtmcl_tle {
    //       display: flex;
    //       align-items: center;
    //       height: 0.6rem;
    //       background: linear-gradient(
    //         90deg,
    //         rgba(114, 121, 255, 0.78),
    //         rgba(186, 191, 255, 0.78)
    //       );
    //       font-size: 0.22rem;
    //       font-family: Source Han Sans CN;
    //       font-weight: 400;
    //       color: #ffffff;
    //       img {
    //         width: 0.3rem;
    //         height: 0.3rem;
    //         margin-right: 0.1rem;
    //         margin-left: 0.24rem;
    //       }
    //     }
    //     .dtmcr_bts1 {
    //       padding: 0.36rem 0.36rem 0;
    //       margin-bottom: 0.2rem;
    //       p {
    //         text-align: left;
    //         margin-bottom: 0.2rem;
    //         color: #5b6c89;
    //         display: flex;
    //         align-items: flex-start;
    //         img {
    //           width: 0.04rem;
    //           height: 0.18rem;
    //           margin-top: 0.04rem;
    //           margin-right: 0.1rem;
    //         }
    //         span {
    //           text-align: left;
    //           font-size: 0.16rem;
    //           font-family: Source Han Sans CN;
    //           font-weight: 400;
    //           line-height: 0.24rem;
    //         }
    //       }
    //     }
    //   }
    // }
    .dtm_sys {
      height: 7rem;
      .el-carousel__container {
        min-height: 6.8rem;
        padding-bottom: 0.2rem;
      }
      .el-carousel__item h3 {
        font-size: 0.22rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
        margin: 0;
      }
      .el-carousel__item {
        background-color: #ffffff;
        .el-carousel__mask {
          background-color: rgba(70, 101, 135, 0.14);
        }
      }
      .is-active {
        background-color: #ffffff;
        .el-carousel__mask {
          background-color: #ffffff;
        }
      }
      .el-carousel__indicators--outside {
        display: none;
      }
      .el-carousel--horizontal {
        overflow: inherit;
      }
      .el-carousel__arrow {
        width: 0.68rem;
        height: 0.68rem;
        background: #ffffff;
        box-shadow: 0px 13px 43px 0px rgba(70, 101, 135, 0.14);
        border-radius: 50%;
        i {
          font-size: 0.26rem;
          color: #0075ff;
        }
      }
      .el-carousel__arrow--left {
        left: -0.9rem;
      }
      .el-carousel__arrow--right {
        right: -0.9rem;
      }
      .dtms_box {
        .dtmsb_tle {
          height: 1.7rem;
          h3 {
            font-size: 0.22rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #ffffff;
            padding-top: 0.21rem;
            padding-bottom: 0.08rem;
            line-height: 1;
          }
          .dtt_res {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.96rem;
            font-size: 0.18rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            .dtt_img {
              position: relative;
              display: flex;
              align-items: center;
              margin-left: 0.2rem;
              span {
                font-size: 0.2rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #ffffff;
              }
              img {
                width: 4.55rem;
                height: auto;
              }
              .dttr_btn {
                width: 0.4rem;
                height: auto;
                position: absolute;
                margin: auto;
                margin-left: -0.2rem;
                left: 0;
                bottom: -0.13rem;
              }
              .dttr_lv {
                position: absolute;
                margin: auto;
                margin-left: -0.8rem;
                left: 0;
                bottom: 0;
                top: 0.78rem;
                width: 1.6rem;
                height: 0.59rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.14rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #ffffff;
              }
              .dttr_gd {
                position: absolute;
                margin: auto;
                margin-left: -0.3rem;
                left: 0;
                bottom: 0;
                top: -0.58rem;
                width: 0.59rem;
                height: 0.5rem;
                background: url("../../assets/images/report/top_tips.png")
                  no-repeat center;
                background-size: 100%;
                font-size: 0.15rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                line-height: 0.34rem;
                color: #ff55b6;
                display: flex;
                justify-content: center;
              }
            }
          }
        }

        .dtmsb_tar {
          width: 5.25rem;
          margin: 0.2rem auto 0.3rem;
          position: relative;
          .top_top {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0.22rem;
            width: 4.13rem;
            .tt_txt {
              font-size: 0.16rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: #354b70;
              line-height: 0.2rem;
              display: block;
              position: relative;
            }
          }
          .bottom_left {
            position: absolute;
            margin: auto;
            left: 3.7rem;
            bottom: 0.03rem;
            width: 4.13rem;
            .tt_txt {
              font-size: 0.16rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: #354b70;
              line-height: 0.2rem;
              display: block;
              position: relative;
            }
          }
          .bottom_right {
            position: absolute;
            margin: auto;
            left: 0.42rem;
            bottom: 0.03rem;
            width: 4.13rem;
            .tt_txt {
              font-size: 0.16rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: #354b70;
              line-height: 0.2rem;
              display: block;
              position: relative;
            }
          }
          .dtmsb_ulc {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              padding: 0 0.2rem;
              display: flex;
              align-items: center;
              img {
                width: 2.4rem;
                height: auto;
              }
              span {
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #7786ac;
              }
              span:first-child {
                margin-right: 0.06rem;
                width: 0.08rem;
                height: 0.08rem;
                background: linear-gradient(174deg, #1becff 0%, #00c6ff 98%);
                border-radius: 50%;
              }
            }
            li:last-child {
              span:first-child {
                background: linear-gradient(
                  0deg,
                  rgba(0, 117, 255, 0.99),
                  rgba(0, 194, 255, 0.99)
                );
              }
            }
          }
          .demsb_tool1 {
            position: absolute;
            margin: auto;
            right: 2.48rem;
            top: -0.07rem;
            width: auto;
            min-width: 65px;
            height: 0.34rem;
            background: url(../../assets/images/report/exmaple.png) no-repeat
              center;
            background-size: 100% 100%;
            text-align: left;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .demsb_score {
              font-size: 0.14rem;
              padding-left: 0.1rem;
              padding-right: 0.2rem;
              line-height: 0.34rem;
              color: #7486af;
              display: flex;
              span {
                margin-left: -0.08rem;
                color: #00c0ff;
              }
            }
            .demsb_score1 {
              span {
                margin-left: -0.26rem;
                color: #016cff;
              }
            }
          }
          .demsb_tool {
            position: absolute;
            margin: auto;
            left: 2.48rem;
            top: -0.07rem;
            width: auto;
            min-width: 65px;
            height: 0.34rem;
            background: url(../../assets/images/report/exmaple2.png) no-repeat
              center;
            background-size: 100% 100%;
            text-align: left;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .demsb_score {
              font-size: 0.14rem;
              padding-left: 0.2rem;
              padding-right: 0.1rem;
              line-height: 0.34rem;
              color: #7486af;
              display: flex;
              span {
                margin-left: -0.08rem;
                color: #00c0ff;
              }
            }
            .demsb_score1 {
              span {
                margin-left: -0.26rem;
                color: #016cff;
              }
            }
          }
          .myChartLd0,
          .myChartLd2,
          .myChartLd3 {
            width: 5.25rem;
            height: 2.26rem;
          }
          ul {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -0.32rem;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              padding: 0 0.2rem;
              display: flex;
              align-items: center;
              span {
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #7786ac;
              }
              span:first-child {
                margin-right: 0.06rem;
                width: 0.08rem;
                height: 0.08rem;
                background: linear-gradient(174deg, #1becff 0%, #00c6ff 98%);
                border-radius: 50%;
              }
            }
            li:last-child {
              span:first-child {
                background: linear-gradient(
                  0deg,
                  rgba(0, 117, 255, 0.99),
                  rgba(0, 194, 255, 0.99)
                );
              }
            }
          }
        }
        .dtmcr_bts {
          padding: 0 0.3rem;
          margin-bottom: 0.2rem;
          .db_img {
            display: flex;
            align-items: center;
            font-size: 0.18rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: #006cff;
            margin-bottom: 0.1rem;
            img {
              width: 0.28rem;
              height: 0.28rem;
              margin-right: 0.1rem;
            }
          }
          p {
            text-align: left;
            font-size: 0.16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 0.24rem;
            margin-bottom: 0.04rem;
            color: #354b70;
            display: flex;
            align-items: flex-start;
            img {
              width: 0.04rem;
              height: 0.18rem;
              margin-top: 0.03rem;
              margin-right: 0.1rem;
            }
            span {
              margin-top: 0.05rem;
              margin-right: 0.1rem;
              width: 0.04rem;
              height: 0.16rem;
              background: linear-gradient(179deg, #059dff 0%, #00c0ff 100%);
            }
          }
        }
      }
    }
    .guide_box {
      margin-top: 0.82rem;
      margin-bottom: 1.04rem;
      .gb_main {
        width: 100%;
        border-radius: 0.04rem;
        background: #ffffff;
        overflow: hidden;
        .dtmcl_tle {
          display: flex;
          align-items: center;
          height: 0.6rem;
          background: linear-gradient(
            90deg,
            rgba(5, 157, 255, 0.7),
            rgba(49, 204, 255, 0.7)
          );
          font-size: 0.22rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          img {
            width: 0.3rem;
            height: 0.25rem;
            margin-right: 0.1rem;
            margin-left: 0.24rem;
          }
        }
        .gb_contain {
          text-align: left;
          padding: 0.2rem 0.25rem;
          p {
            padding: 0.16rem 0 0.06rem;
            font-size: 0.16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #354b70;
            display: flex;
            align-items: flex-start;
            img {
              width: 0.04rem;
              height: 0.18rem;
              margin-top: 0.02rem;
              margin-right: 0.06rem;
            }
          }
          ul {
            li {
              display: flex;
              line-height: 0.36rem;
              span {
                margin-top: 0.09rem;
                margin-right: 0.08rem;
                text-align: center;
                line-height: 0.16rem;
                width: 0.16rem;
                height: 0.16rem;
                background: linear-gradient(177deg, #1becff, #00c6ff);
                border-radius: 50%;
                font-size: 0.12rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #ffffff;
                border: 0.01rem solid #00c6ff;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              p {
                padding: 0;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
              }
            }
          }
        }
      }
    }
    .wdrj_box {
      margin-bottom: 0rem;
      .wdrj_main {
        padding: 0.1rem 0.3rem 0.2rem 0.1rem;
        // background: #ffffff;
        // box-shadow: 0 0.13rem 0.43rem 0 rgba(70, 101, 135, 0.04);
        border-radius: 0.04rem;
        margin-bottom: 0.2rem;
        .wdrj_title {
          display: flex;
          align-items: center;
          font-size: 0.22rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #354b70;
          line-height: 0.34rem;
          img {
            width: 0.28rem;
            height: 0.28rem;
            // margin-right: 0.1rem;
          }
        }
        .dtmsb_tar {
          width: 8.25rem;
          height: 2.66rem;
          margin: -0.28rem auto 0.2rem;
          position: relative;
          .top_top {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0.22rem;
            width: 4.13rem;
            .tt_txt {
              font-size: 0.16rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: #354b70;
              line-height: 0.2rem;
              display: block;
              position: relative;
            }
          }
          .bottom_left {
            position: absolute;
            margin: auto;
            left: 3.7rem;
            bottom: 0.03rem;
            width: 4.13rem;
            .tt_txt {
              font-size: 0.16rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: #354b70;
              line-height: 0.2rem;
              display: block;
              position: relative;
            }
          }
          .bottom_right {
            position: absolute;
            margin: auto;
            left: 0.42rem;
            bottom: 0.03rem;
            width: 4.13rem;
            .tt_txt {
              font-size: 0.16rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: #354b70;
              line-height: 0.2rem;
              display: block;
              position: relative;
            }
          }
          .demsb_tool1 {
            position: absolute;
            margin: auto;
            right: 2.48rem;
            top: -0.07rem;
            width: auto;
            min-width: 65px;
            height: 0.34rem;
            background: url(../../assets/images/report/exmaple.png) no-repeat
              center;
            background-size: 100% 100%;
            text-align: left;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .demsb_score {
              font-size: 0.14rem;
              padding-left: 0.1rem;
              padding-right: 0.2rem;
              line-height: 0.34rem;
              color: #7486af;
              display: flex;
              span {
                margin-left: -0.08rem;
                color: #00c0ff;
              }
            }
            .demsb_score1 {
              span {
                margin-left: -0.26rem;
                color: #016cff;
              }
            }
          }
          .demsb_tool {
            position: absolute;
            margin: auto;
            left: 2.48rem;
            top: -0.07rem;
            width: auto;
            min-width: 65px;
            height: 0.34rem;
            background: url(../../assets/images/report/exmaple2.png) no-repeat
              center;
            background-size: 100% 100%;
            text-align: left;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .demsb_score {
              font-size: 0.14rem;
              padding-left: 0.2rem;
              padding-right: 0.1rem;
              line-height: 0.34rem;
              color: #7486af;
              display: flex;
              span {
                margin-left: -0.08rem;
                color: #00c0ff;
              }
            }
            .demsb_score1 {
              span {
                margin-left: -0.26rem;
                color: #016cff;
              }
            }
          }
          ul {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -0.32rem;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              padding: 0 0.2rem;
              display: flex;
              align-items: center;
              span {
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #7786ac;
              }
              span:first-child {
                margin-right: 0.06rem;
                width: 0.08rem;
                height: 0.08rem;
                background: linear-gradient(174deg, #1becff 0%, #00c6ff 98%);
                border-radius: 50%;
              }
            }
            li:last-child {
              span:first-child {
                background: linear-gradient(
                  0deg,
                  rgba(0, 117, 255, 0.99),
                  rgba(0, 194, 255, 0.99)
                );
              }
            }
          }
          .myChartLd0 {
            width: 8.25rem;
            height: 4.4rem;
          }
          .dtmsb_ulc {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -0.54rem;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              padding: 0 0.2rem;
              display: flex;
              align-items: center;
              img {
                width: 2.6rem;
                height: auto;
              }
              span {
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #7786ac;
              }
              span:first-child {
                margin-right: 0.06rem;
                width: 0.08rem;
                height: 0.08rem;
                background: linear-gradient(174deg, #1becff 0%, #00c6ff 98%);
                border-radius: 50%;
              }
            }
            li:last-child {
              span:first-child {
                background: linear-gradient(
                  0deg,
                  rgba(0, 117, 255, 0.99),
                  rgba(0, 194, 255, 0.99)
                );
              }
            }
          }
        }
        .wdrj_suger {
          margin-top: 0.5rem;
          text-align: left;
          .wdrjs_uls{
            padding-left: 0.18rem;
            li{
              display: flex;
              font-size: 0.16rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354B70;
              line-height: 0.4rem;
              span {
                margin-top: 0.12rem;
                margin-right: 0.1rem;
                text-align: center;
                line-height: 0.16rem;
                width: 0.16rem;
                height: 0.16rem;
                background: linear-gradient(177deg, #1becff, #00c6ff);
                border-radius: 50%;
                font-size: 0.12rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #ffffff;
              }
              p {
                line-height: 0.36rem;
                font-family: SourceHanSansCN;
                font-weight: 400;
                font-size: 0.16rem;
                color: #333E75;
              }
              img{
                width: 0.16rem;
                height: 0.16rem;
                margin-right: 0.06rem;
                margin-top: 0.12rem;
              }
            }
          }
          .wdrjs_title {
            font-family: SourceHanSansCN;
            font-weight: 400;
            font-size: 0.18rem;
            color: #333E75;
            display: flex;
            align-items: center;
            line-height: 0.34rem;
            margin-left: 0.03rem;
            img {
              width: 0.12rem;
              height: 0.12rem;
              margin-right: 0.06rem;
            }
            .wdrjst_res {
              display: flex;
              align-items: center;
              img {
                width: 0.19rem;
                height: 0.22rem;
                margin-right: 0.06rem;
                margin-left: 0.2rem;
              }
              .wdrjstr_txt {
                font-size: 0.18rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FE5FB8;
              }
            }
          }
          .wdrjs_tips {
            display: flex;
            flex-wrap: wrap;
            width: auto;
            background: #fffef8;
            border: 0.01rem solid #ffe100;
            border-radius: 0.02rem;
            padding: 0 0.1rem;
            margin: 0.15rem 0.15rem 0;
            min-height: 0.42rem;
            img {
              width: 0.32rem;
              height: 0.34rem;
              margin-top: 0.1rem;
            }
            p {
              text-align: left;
              padding-left: 0;
              flex: 1;
              font-size: 0.16rem;
              span {
                color: #ff7e00;
              }
            }
          }
          .wdrjst_res1 {
            display: flex;
            align-items: center;
            padding: 0 0.15rem;
            margin: 0.3rem 0 0.1rem;
            line-height: 0.26rem;
            img {
              width: 0.19rem;
              height: 0.22rem;
              margin-right: 0.06rem;
            }
            span {
              font-size: 0.18rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354b70;
            }
            .wdrjstr_txt {
              font-size: 0.18rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #FE5FB8;
            }
          }
          .wdrjst_del {
            padding: 0.24rem;
            line-height: 0.39rem;
            font-size: 0.18rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #354b70;
            text-align: left;
            .pd24 {
              padding-left: 0.24rem;
              font-size: 0.16rem;
            }
            div {
              line-height: 0.39rem;
              font-size: 0.18rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354b70;
              img {
                width: 0.16rem;
                height: 0.12rem;
                margin-right: 0.08rem;
              }
            }
            ul {
              li {
                font-size: 0.14rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #354b70;
                display: flex;
                img {
                  width: 0.06rem;
                  height: 0.06rem;
                  margin-right: 0.1rem;
                  margin-top: 0.16rem;
                }
              }
            }
          }
          .wdrjst_del1 {
            width: 10.82rem;
            background: url(../../assets/images/report/h_bg1.png) no-repeat top
              left;
            background-size: 100% 100%;
            margin-left: 0.3rem;
          }
          .wdrjst_del2 {
            width: 10.82rem;
            background: url(../../assets/images/report/h_bg2.png) no-repeat top
              left;
            background-size: 100% 100%;
            margin-left: 0.3rem;
          }
          .gb_contain {
            text-align: left;
            padding: 0.10rem 0.25rem;
            p {
              padding: 0.06rem 0 0.06rem;
              font-size: 0.16rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354b70;
              display: flex;
              align-items: flex-start;
              img {
                width: 0.04rem;
                height: 0.18rem;
                margin-top: 0.02rem;
                margin-right: 0.06rem;
              }
            }
            ul {
              li {
                display: flex;
                line-height: 0.36rem;
                span {
                  margin-top: 0.09rem;
                  margin-right: 0.08rem;
                  text-align: center;
                  line-height: 0.16rem;
                  width: 0.16rem;
                  height: 0.16rem;
                  background: linear-gradient(177deg, #1becff, #00c6ff);
                  border-radius: 50%;
                  font-size: 0.12rem;
                  font-family: Source Han Sans CN;
                  font-weight: bold;
                  color: #ffffff;
                  border: 0.01rem solid #00c6ff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                p {
                  padding: 0;
                  flex: 1;
                  display: flex;
                  flex-wrap: wrap;
                }
              }
            }
          }
        }
        .wdrj_suger1 {
          margin-top: 0.1rem;
        }
        .wm_text{
          text-align: center;
          padding: 0;
          margin: 0.16rem 0 0.16rem;
          word-break: break-all;
          .el-button {
            margin-top: 0.16rem;
            border: 0.01rem solid #dcdfe6;
            padding: 0.09rem 0.27rem;
            font-size: 0.16rem;
            border-radius: 0.04rem;

            color: #ffffff;
            background: linear-gradient(263deg, #00c2ff, #0075ff);
            box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
          }
          .primary1{
            color: #0075ff;
            border: 0.01rem solid #0075ff !important;
            background: linear-gradient(263deg, #ffffff, #ffffff);
            box-shadow: 0px 3px 18px 0px rgba(250, 250, 250, 0.19);
          }
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
      }
    }
  }
  .dt_mains2 {
    width: 12rem;
    margin: 0 auto;
    padding-top: 0.86rem;

    .dtm_title {
      width: 1.88rem;
      height: 0.34rem;
      margin: 0.82rem auto 0.62rem;
      line-height: 0.34rem;
      text-align: center;
      font-size: 0.2rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      background: url("../../assets/images/report/title.png") no-repeat center;
      overflow: hidden;
      background-size: 100%;
    }

    .dtmt_tle {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.22rem;
        height: 0.08rem;
      }
      span {
        margin: 0 0.1rem;
        font-size: 0.2rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #354b70;
      }
    }
    .myChartRose,
    .myChartZhu {
      margin: 0 auto;
      width: 12rem;
      height: 4rem;
    }
    .dtm_img_sys {
      height: 4.08rem;
      width: 11.60rem;
      margin: 0.2rem auto;
      .el-carousel__item h3 {
        font-size: 0.22rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
        margin: 0;
      }
      .el-carousel__item {
        border-radius: 0.04rem;
        background-color: #ffffff;
        border: 0.01rem solid #c4ecff;
        .el-carousel__mask {
          background-color: rgba(70, 101, 135, 0.14);
        }
      }
      .is-active {
        background-color: #ffffff;
        .el-carousel__mask {
          background-color: #ffffff;
        }
      }
      .el-carousel__indicators--outside {
        display: none;
      }
      .el-carousel--horizontal {
        overflow: inherit;
        .el-carousel__item--card {
          display: none;
        }
        .is-in-stage {
          display: block;
        }
      }
      .el-carousel__arrow {
        width: 0.68rem;
        height: 0.68rem;
        background: #ffffff;
        box-shadow: 0px 13px 43px 0px rgba(70, 101, 135, 0.14);
        border-radius: 50%;
        i {
          font-size: 0.26rem;
          color: #0075ff;
        }
      }
      .el-carousel__arrow--left {
        left: -0.9rem;
      }
      .el-carousel__arrow--right {
        right: -0.9rem;
      }
      .dtm_img_box {
        height: 4.08rem;
        .dtmi_img {
          display: block;
          width: 6rem;
          height: 3.38rem;
        }
        .dtmi_txt {
          width: 100%;
          height: 0.7rem;
          line-height: 0.7rem;
          font-size: 0.2rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #51617d;
        }
      }
    }
    
    
    .dtm_sys {
      height: 7rem;
      .el-carousel__container {
        min-height: 6.8rem;
        padding-bottom: 0.2rem;
        overflow: hidden;
      }
      .el-carousel__item h3 {
        font-size: 0.22rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
        margin: 0;
      }
      .el-carousel__item {
        background-color: #ffffff;
        .el-carousel__mask {
          background-color: rgba(70, 101, 135, 0.14);
        }
      }
      .is-active {
        background-color: #ffffff;
        .el-carousel__mask {
          background-color: #ffffff;
        }
      }
      .el-carousel__indicators--outside {
        display: none;
      }
      .el-carousel--horizontal {
        overflow: inherit !important;
      }
      .el-carousel__arrow {
        width: 0.68rem;
        height: 0.68rem;
        background: #ffffff;
        box-shadow: 0px 13px 43px 0px rgba(70, 101, 135, 0.14);
        border-radius: 50%;
        i {
          font-size: 0.26rem;
          color: #0075ff;
        }
      }
      .el-carousel__arrow--left {
        left: -0.9rem;
      }
      .el-carousel__arrow--right {
        right: -0.9rem;
      }

      .dtms_box {
        .dtmsb_tle {
          height: 1.5rem;
          h3 {
            font-size: 0.22rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #ffffff;
            padding-top: 0.22rem;
            padding-bottom: 0.1rem;
            line-height: 1;
          }
          .dtt_res {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.96rem;
            font-size: 0.2rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            .dtt_img {
              position: relative;
              display: flex;
              align-items: center;
              margin-left: 0.2rem;
              span {
                font-size: 0.2rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #ffffff;
              }
              img {
                width: 4.18rem;
                height: 0.2rem;
              }
              .dttr_btn {
                width: 0.59rem;
                height: 0.59rem;
                position: absolute;
                margin: auto;
                margin-left: -0.3rem;
                left: 0;
                bottom: 0;
                top: 0;
              }
              .dttr_lv {
                position: absolute;
                margin: auto;
                margin-left: -0.3rem;
                left: 0;
                bottom: 0;
                top: 0.5rem;
                width: 0.59rem;
                height: 0.59rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.18rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #ffffff;
              }
              .dttr_gd {
                position: absolute;
                margin: auto;
                margin-left: -0.3rem;
                left: 0;
                bottom: 0;
                top: -0.58rem;
                width: 0.59rem;
                height: 0.5rem;
                background: url("../../assets/images/report/top_tips.png")
                  no-repeat center;
                background-size: 100%;
                font-size: 0.15rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                line-height: 0.34rem;
                color: #ff55b6;
                display: flex;
                justify-content: center;
              }
            }
          }
        }

        .dtmsb_tar {
          width: 3.1rem;
          height: 3.1rem;
          margin: 0 auto;
          position: relative;
          .myChartLd0,
          .myChartLd2,
          .myChartLd3 {
            width: 3.1rem;
            height: 3.1rem;
          }
          ul {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: 0.16rem;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              padding: 0 0.2rem;
              display: flex;
              align-items: center;
              span {
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #7786ac;
              }
              span:first-child {
                margin-right: 0.06rem;
                width: 0.08rem;
                height: 0.08rem;
                background: linear-gradient(174deg, #1becff 0%, #00c6ff 98%);
                border-radius: 50%;
              }
            }
            li:last-child {
              span:first-child {
                background: linear-gradient(
                  0deg,
                  rgba(0, 117, 255, 0.99),
                  rgba(0, 194, 255, 0.99)
                );
              }
            }
          }
        }
        .dtmcr_bts {
          padding: 0 0.58rem;
          margin-bottom: 0.2rem;
          .db_img {
            display: flex;
            align-items: center;
            font-size: 0.18rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: #006cff;
            margin-bottom: 0.1rem;
            img {
              width: 0.28rem;
              height: 0.28rem;
              margin-right: 0.1rem;
            }
          }
          p {
            text-align: left;
            font-size: 0.16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 0.28rem;
            color: #354b70;
            display: flex;
            align-items: flex-start;
            span {
              margin-top: 0.06rem;
              margin-right: 0.1rem;
              width: 0.04rem;
              height: 0.16rem;
              background: linear-gradient(179deg, #059dff 0%, #00c0ff 100%);
            }
          }
        }
      }
    }
  }
}
</style>
