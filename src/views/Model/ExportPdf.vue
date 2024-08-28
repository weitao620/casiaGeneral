<template>
  <div class="table-classs" ref="sprintSomePdf">
    <div class="table-style">
      <img class="shui_bg1" src="../../assets/images/report/shui_big.png" alt="" />
      <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" />
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="g1_top">
          <span>AI心世界</span>
        </div>
        <div class="g1_top1">
          个人报告
        </div>
        <div class="g1_top2">
          <div>
            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span><span>{{details.name}}</span>
          </div>

          <div>
            <span>测评次数：</span><span>第{{ details.evaluationTime }}次</span>
          </div>
          <div>
            <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span><span>{{details.gender == 1 ? '男' : '女'}}</span>
          </div>
          <div>
            <span>测评时间：</span><span>{{ details.datetime }}</span>
          </div>
          <div>
            <span>登录账号：</span><span>{{ details.passport }}</span>
          </div>
          <div>
            <span>所属单位：</span><span>{{ details.departmentName }}</span>
          </div>
          <div>
            <span>手&nbsp;&nbsp;机&nbsp;&nbsp;号：</span><span>{{ details.phone }}</span>
          </div>
          <div>
            <span>出生日期：</span><span>{{ details.birth }}</span>
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
        <div class="gp2_top" style="padding-bottom: 20px">
          <img src="../../assets/images/news/zuopinjiedu.png" style="width: 60px;height: auto" alt="">
          <span class="gp2_t_txt">作品解读</span>
        </div>
        <div class="gp_title">
          <div class="gp_txt">
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
        <div class="gp_title" style="padding: 40px 40px 10px;">
          <div class="gp_bird_box" v-if="reviewData.workInfo">
            <div class="gp_bird" v-if="details.birdView && details.birdView !=''">
              <img :src="'data:image;base64,' + details.birdView" alt="">
              <div>{{reviewData.workInfo.workName == '' ? '' : reviewData.workInfo.workName +' - '}}{{ details.datetime }}</div>
            </div>
            <div class="gp_bird" v-else>
              <img src="../../assets/images/report/t001.png" alt="">
              <div>{{reviewData.workInfo.workName == '' ? '' : reviewData.workInfo.workName +' - '}}{{ details.datetime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_02">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px">
          <img src="../../assets/images/news/bencigaik.png" style="width: 60px;height: auto" alt="">
          <span class="gp2_t_txt">本次概况</span>
        </div>
        <div class="gp2_main">
          <div class="myChartBox">
            <div class="dtmcl_chart" v-show="details.reportWarningInfo && details.warningList.length > 0">
              <div class="myChart" ref="myChart01" id="myChart01"></div>
            </div>
            <div class="dtmcl_chart" v-show="details.reportWarningInfo && details.warningList.length == 0">
              <div class="dtmcl_c_nor">正常</div>
            </div>
          </div>
          <div class="gp2_li">
            <div class="gp2l_head">
              <span>数据解读</span>
            </div>
          </div>
          <div class="dtmcl_sbox">
            <div class="dtmcl_sb_t">风险评估：</div>
            <div class="dtmcl_sb_c" v-if="details.reportWarningInfo">
              <ul v-if="details.warningList.length > 0">
                <li v-for="item in details.warningList" :key="item.id">
                  <span>{{item.name}}风险</span>
                  <img v-if="item.level == 1" src="../../assets/images/news/dis.png" alt="">
                  <img v-if="item.level == 2" src="../../assets/images/news/zhongs.png" alt="">
                  <img v-if="item.level == 3" src="../../assets/images/news/gaos.png" alt="">
                </li>
              </ul>
              <div v-else>
                正常
              </div>
            </div>
          </div>
          <div class="dtmcl_stip">
            <span>注：</span>
            <img src="../../assets/images/news/huas.png" alt="">
            <span>越多表示风险程度越高。</span>
          </div>
          <div class="dtmcl_sbox" v-if="details.jjName != ''" style="margin: 30px 0 20px;">
            <div class="dtmcl_sb_t">优势评估：</div>
            <div class="dtmcl_sb_c">该受测者在{{details.jjName}}得分最高，表现最好。</div>
          </div>
          <div class="gp2_li">
            <div class="gp2l_head">
              <span>数据对比</span>
            </div>
          </div>
          <div class="gp_warn">
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
                    <img v-if="item.level == 1" src="../../assets/images/news/dis.png" alt="">
                    <img v-if="item.level == 2" src="../../assets/images/news/zhongs.png" alt="">
                    <img v-if="item.level == 3" src="../../assets/images/news/gaos.png" alt="">
                  </div>
                  <div>
                    <span v-if="item.lastLevel == -1">/</span>
                    <span v-if="item.lastLevel == 0">正常</span>
                    <img v-if="item.lastLevel == 1" src="../../assets/images/news/dis.png" alt="">
                    <img v-if="item.lastLevel == 2" src="../../assets/images/news/zhongs.png" alt="">
                    <img v-if="item.lastLevel == 3" src="../../assets/images/news/gaos.png" alt="">
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_02" v-for="(item, index) in details.sysList" :key="item.title">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          本报告结果仅供参考，不作为评价或选拔使用，可详见《指导建议手册》。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px" v-if="index < 1">
          <img src="../../assets/images/news/xlweidu.png" style="width: 60px;height: auto" alt="">
          <span class="gp2_t_txt">心理健康维度分析</span>
        </div>
        <div class="gp2_main" :style="{'padding-top': index < 1 ? '0px' : '48px'}">
          <div class="drwc_btr">
            <div class="wdrj_box">
              <div class="wdrjs_li wdrj_main" :style="{display: item.flag == 1 ? 'block' : 'none'}">
                <div class="wdrj_title">
                  <span style="font-weight:500">{{index == 0 ? '一、' : index == 1 ? '二、' : index == 2 ? '三、' : index == 3 ? '四、' : index == 4 ? '五、' : index == 5 ? '六、' : index == 6 ? '七、' : index == 7 ? '八、' : ''}}{{item.title}}</span>
                </div>
                <div class="wdrj_title wdrj_titles">
                  <span>测评结果：</span>
                  <span v-if="item.level == 0">正常</span>
                  <img v-if="item.level == 1" src="../../assets/images/news/dis.png" alt="">
                  <img v-if="item.level == 2" src="../../assets/images/news/zhongs.png" alt="">
                  <img v-if="item.level == 3" src="../../assets/images/news/gaos.png" alt="">
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
                    <div v-if="index == 0" id="myChartLds2" class="myChartLd0" ref="myChartLds2"></div>
                    <!-- 焦虑 -->
                    <div v-if="index == 1" id="myChartLds3" class="myChartLd0" ref="myChartLds3"></div>
                    <!-- 强迫 -->
                    <div v-if="index == 2" id="myChartLds4" class="myChartLd0" ref="myChartLds4"></div>
                    <!-- PTSD -->
                    <div v-if="index == 3" id="myChartLds5" class="myChartLd0" ref="myChartLds5"></div>
                    <!-- 敌对 -->
                    <div v-if="index == 4" id="myChartLds6" class="myChartLd0" ref="myChartLds6"></div>
                    <!-- 自我伤害 -->
                    <div v-if="index == 5" id="myChartLds7" class="myChartLd0" ref="myChartLds7"></div>
                    <!-- 自闭 -->
                    <!-- <div v-if="index == 6" id="myChartLds8" class="myChartLd0" ref="myChartLds8"></div> -->
                  </div>
                </div>
                <div class="wdrj_suger" style="margin-top:0rem">
                  <div class="wdrjs_title">
                    测评结果分析
                  </div>
                  <ul class="wdrjs_uls">
                    <li v-for="(items, indexs) in item.sysDim" :key="indexs">
                      <p>
                        {{ indexs + 1 }}.{{ items }}
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="wdrj_suger wdrj_sugers" v-if="item.suggestDim != ''">
                  <div class="wdrjs_title">
                    指导建议
                  </div>
                  <ul class="wdrjs_uls">
                    <li v-for="(items, indexs) in item.suggestDim" :key="indexs">
                      <p v-if="!Array.isArray(items)" :style="{'font-weight': String(items).indexOf('针对') != -1 ? '600' : '400'}">
                        {{ items }}
                      </p>
                      <div v-if="Array.isArray(items)">
                        <div v-for="(itemu, indexu) in items" :key="indexu">
                          <p v-for="(itemv, indexv) in itemu" :key="indexv" :style="{'font-weight': String(itemv).indexOf('针对') != -1 ? '600' : '400'}">
                            <span v-if="String(itemv).indexOf('针对') != -1"></span>
                            {{String(itemv).indexOf('针对') != -1 ? '' : indexv +'.'}}{{ itemv }}
                          </p>
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
    </div>

    <div class="table-style group_02" style="display: none;" v-for="(item, index) in details.jjList" :key="item.title">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px" v-if="index < 1">
          <img src="../../assets/images/news/jiji.png" style="width: 60px;height: auto" alt="">
          <span class="gp2_t_txt">积极心理品质分析</span>
        </div>
        <div class="gp2_main" :style="{'padding-top': index < 1 ? '0px' : '48px'}">
          <div class="drwc_btr">
            <div class="wdrj_box">
              <div class="wdrjs_li wdrj_main" :style="{display: item.flag == 1 ? 'block' : 'none'}">
                <div class="wdrj_title">
                  <span style="font-weight:500">{{index == 0 ? '一、' : index == 1 ? '二、' : index == 2 ? '三、' : index == 3 ? '四、' : index == 4 ? '五、' : index == 5 ? '六、' : index == 6 ? '七、' : index == 7 ? '八、' : ''}}{{item.title}}</span>
                </div>
                <div class="wdrj_title wdrj_titles" style="margin-top: 16px;">
                  <span>测评结果：</span>
                  <span v-if="item.level == 0">正常</span>
                  <img v-if="item.result.indexOf('较低') != -1" style="width: 86px;height: 20px" src="../../assets/images/news/jiaodi.png" alt="">
                  <img v-if="item.result.indexOf('中等') != -1" style="width: 86px;height: 20px" src="../../assets/images/news/zhongdeng.png" alt="">
                  <img v-if="item.result.indexOf('较高') != -1" style="width: 86px;height: 20px" src="../../assets/images/news/jiaogao.png" alt="">
                  <img v-if="item.result.indexOf('极高') != -1" style="width: 86px;height: 20px" src="../../assets/images/news/jigao.png" alt="">
                </div>
                <div class="dtmsb_tar" style="height: auto;margin-top:10px;margin: 20px;margin-bottom:40px;width: auto;">
                  <div style="position:relative" id="perViolenceEchart">
                    <ol class="dtmsb_tu">
                      <li v-for="(itemm, indexm) in item.subDim" :key="indexm">
                        <img src="../../assets/images/news/dot_wz.png" alt="">
                        <span v-if="indexm < 2">{{itemm.name}}</span>
                        <span style="margin-left: 4px;" v-else>......</span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div class="wdrj_suger wdrj_sugers" style="margin-top:0">
                  <div class="wdrjs_title">
                    测评结果分析
                  </div>
                  <ul class="wdrjs_uls">
                    <li v-for="(items, indexs) in item.sysDim" :key="indexs">
                      <p>
                        {{ indexs + 1 }}.{{ items }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="drwc_b_ys drwc_b_ysp" v-if="index == details.jjList.length - 1">
            <div class="drwc_sp_head"><span></span>积极心理品质各维度表现情况</div>
            <div class="myChartZhu" v-show="index == details.jjList.length - 1" ref="myChartZhusYs" id="myChartZhusYs"></div>
          </div>
          <div class="drwc_b_ys drwc_b_ysp" v-if="index == details.jjList.length - 1 && details.jjName != ''">
            <p>
              <img src="../../assets/images/news/dengpao_wz.png" alt="">
              该受测者在{{details.jjName}}表现最好，得分最高，管理者可以鼓励该受测者继续发挥自身在这些方面的优势。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_02" v-if="details.jjList && details.jjList.length > 0">
      <div class="table-border">
        <div class="gp2_top" style="padding-bottom: 20px">
          <img src="../../assets/images/news/jiji.png" style="width: 60px;height: auto" alt="">
          <span class="gp2_t_txt">积极心理品质分析</span>
        </div>
        <div class="drwc_bw_shu">
          <div class="tree_box">
            <!-- <img class="tb_l1" src="../../assets/images/news/l1.png" alt="">
            <div class="tb_s_c11"></div>
            <div class="tb_s_c12"></div>
            <div class="tb_s_c13"></div> -->
            <img class="tb_l1" src="../../assets/images/news/l1.png" alt="">
            <div class="tb_s_c11">
              {{ details.jjList.length > 3 ? details.jjList[3].subDim[0].name : '' }}
            </div>
            <div class="tb_s_c12">
              {{ details.jjList.length > 3 ? details.jjList[3].subDim[1].name : ''}}
            </div>
            <div class="tb_s_c13">
              {{ details.jjList.length > 3 ? "..." : ''}}
            </div>
            <div :class="['cir_box11', { cir_box12: details.jjList.length > 3 && details.jjList[3].result.indexOf('中等') != -1 }, { cir_box13: details.jjList.length > 3 && details.jjList[3].result.indexOf('较高') != -1 }, { cir_box14: details.jjList.length > 3 && details.jjList[3].result.indexOf('极高') != -1 }]">
              <div class="cir_img" v-if="details.jjList.length > 3"></div>
              <div class="cir_img34" v-show="details.jjList.length > 3 && details.jjList[3].result.indexOf('较高') != -1"></div>
              <div class="cir_lay"></div>
              <div class="cir_cen">
                <div v-if="details.jjList.length > 3">
                  <span v-for="item in details.jjList[3].title" :key="item.index">{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- <img class="tb_l2" src="../../assets/images/news/l2.png" alt="">
            <div class="tb_s_c21"></div>
            <div class="tb_s_c22"></div>
            <div class="tb_s_c23"></div> -->
            <img class="tb_l2" src="../../assets/images/news/l2.png" alt="">
            <div class="tb_s_c21">
              {{ details.jjList.length > 1 ? details.jjList[1].subDim[0].name : '' }}
            </div>
            <div class="tb_s_c22">
              {{ details.jjList.length > 1 ? details.jjList[1].subDim[1].name : ''}}
            </div>
            <div class="tb_s_c23">
              {{ details.jjList.length > 1 ? "..." : ''}}
            </div>
            <div :class="['cir_box21', { cir_box22: details.jjList.length > 1 && details.jjList[1].result.indexOf('中等') != -1 }, { cir_box23: details.jjList.length > 1 && details.jjList[1].result.indexOf('较高') != -1 }, { cir_box24: details.jjList.length > 1 && details.jjList[1].result.indexOf('极高') != -1 }]">
              <div class="cir_img" v-if="details.jjList.length > 1"></div>
              <div class="cir_img34" v-show="details.jjList.length > 1 && details.jjList[1].result.indexOf('较高') != -1"></div>
              <div class="cir_lay"></div>
              <div class="cir_cen">
                <div v-if="details.jjList.length > 1">
                  <span v-for="item in details.jjList[1].title" :key="item.index">{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- <img class="tb_l3" src="../../assets/images/news/l3.png" alt="">
            <div class="tb_s_c31"></div>
            <div class="tb_s_c32"></div>
            <div class="tb_s_c33"></div> -->
            <img class="tb_l3" src="../../assets/images/news/l3.png" alt="">
            <div class="tb_s_c31">
              {{ details.jjList.length > 0 ? details.jjList[0].subDim[0].name : '' }}
            </div>
            <div class="tb_s_c32">
              {{ details.jjList.length > 0 ? details.jjList[0].subDim[1].name : ''}}
            </div>
            <div class="tb_s_c33">
              {{ details.jjList.length > 0 ? "..." : ''}}
            </div>
            <div :class="['cir_box31', { cir_box32: details.jjList.length > 0 && details.jjList[0].result.indexOf('中等') != -1 }, { cir_box33: details.jjList.length > 0 && details.jjList[0].result.indexOf('较高') != -1 }, { cir_box34: details.jjList.length > 0 && details.jjList[0].result.indexOf('极高') != -1 }]">
              
              <div class="cir_img" v-if="details.jjList.length > 0"></div>
              <div class="cir_img34" v-show="details.jjList.length > 0 && details.jjList[0].result.indexOf('较高') != -1"></div>
              <div class="cir_lay"></div>
              <div class="cir_cen">
                <div v-if="details.jjList.length > 0">
                  <span v-for="item in details.jjList[0].title" :key="item.index">{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- <img class="tb_l4" src="../../assets/images/news/l4.png" alt="">
            <div class="tb_s_c41"></div>
            <div class="tb_s_c42"></div>
            <div class="tb_s_c43"></div> -->
            <img class="tb_l4" src="../../assets/images/news/l4.png" alt="">
            <div class="tb_s_c41">
              {{ details.jjList.length > 2 ? details.jjList[2].subDim[0].name : '' }}
            </div>
            <div class="tb_s_c42">
              {{ details.jjList.length > 2 ? details.jjList[2].subDim[1].name : ''}}
            </div>
            <div class="tb_s_c43">
              {{ details.jjList.length > 2 ? "..." : ''}}
            </div>
            <div :class="['cir_box41', { cir_box42: details.jjList.length > 2 && details.jjList[2].result.indexOf('中等') != -1 }, { cir_box43: details.jjList.length > 2 && details.jjList[2].result.indexOf('较高') != -1 }, { cir_box44: details.jjList.length > 2 &&details.jjList[2].result.indexOf('极高') != -1 }]">
              <div class="cir_img" v-if="details.jjList.length > 2"></div>
              <div class="cir_img34" v-show="details.jjList.length > 2 && details.jjList[2].result.indexOf('较高') != -1"></div>
              <div class="cir_lay"></div>
              <div class="cir_cen">
                <div v-if="details.jjList.length > 2">
                  <span v-for="item in details.jjList[2].title" :key="item.index">{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- <img class="tb_l5" src="../../assets/images/news/l5.png" alt="">
            <div class="tb_s_c51"></div>
            <div class="tb_s_c52"></div>
            <div class="tb_s_c53"></div> -->
            <img class="tb_l5" src="../../assets/images/news/l5.png" alt="">
            <div class="tb_s_c51">
              {{ details.jjList.length > 4 ? details.jjList[4].subDim[0].name : '' }}
            </div>
            <div class="tb_s_c52">
              {{ details.jjList.length > 4 ? details.jjList[4].subDim[1].name : ''}}
            </div>
            <div class="tb_s_c53">
              {{ details.jjList.length > 4 ? "..." : ''}}
            </div>
            <div :class="['cir_box51', { cir_box52: details.jjList.length > 4 && details.jjList[4].result.indexOf('中等') != -1 }, { cir_box53: details.jjList.length > 4 && details.jjList[4].result.indexOf('较高') != -1 }, { cir_box54: details.jjList.length > 4 && details.jjList[4].result.indexOf('极高') != -1 }]">
              <div class="cir_img" v-if="details.jjList.length > 4"></div>
              <div class="cir_img34" v-show="details.jjList.length > 4 && details.jjList[4].result.indexOf('较高') != -1"></div>
              <div class="cir_lay"></div>
              <div class="cir_cen">
                <div v-if="details.jjList.length > 4">
                  <span v-for="item in details.jjList[4].title" :key="item.index">{{ item }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="drwc_b_ys drwc_b_yst" v-if="details.jjName != ''">
          <p>
            <img src="../../assets/images/news/dengpao_wz.png" alt="">
            该受测者在{{details.jjName}}表现最好，得分最高。
          </p>
          <p>
            <span></span><span>自我效能感：该受测者多数时候对自己较为有信心，敢于面对挑战。</span>
          </p>
          <p>
            <span></span><span>情绪管理：该受测者整体状态较好，面对困难和挫折，会主动调整好心态。</span>
          </p>
        </div>
      </div>
    </div>
    
    <div class="table-style group_02" v-for="(item, index) in details.rgList" :key="item.title">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px" v-if="index < 1">
          <img src="../../assets/images/news/rengefenxi.png" style="width: 50px;height: auto;margin-top: -6px;" alt="">
          <span class="gp2_t_txt">人格分析</span>
        </div>
        <div class="gp2_main" :style="{'padding-top': index < 1 ? '0px' : '48px'}">
          <div class="drwc_btr">
            <div class="wdrj_box">
              <div class="wdrjs_li wdrj_main" :style="{display: item.flag == 1 ? 'block' : 'none'}">
                <div class="wdrj_title">
                  <span style="font-weight:500">{{index == 0 ? '一、' : index == 1 ? '二、' : index == 2 ? '三、' : index == 3 ? '四、' : index == 4 ? '五、' : ''}}{{item.title}}</span>
                </div>
                <div class="wdrj_title wdrj_titles" style="margin-top:14px;">
                  <span>测评结果：</span>
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
                      :style="{ left: item.gradep1 }"
                      src="../../assets/images/news/grade_btn.png"
                      alt=""
                    />
                    <span class="dttr_score" :style="{ left: item.gradep1 }">
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
                <div class="dtmsb_tar" style="height: 366px">
                  <div style="position:relative" id="perViolenceEchart">
                    <div class="top_top" style="top:40px" v-if="item.subDim">
                      <span class="tt_txt">
                        {{ item.subDim[0].name }}
                        <!-- <div class="demsb_tool" style="left: 233px;">
                          <div class="demsb_score">
                            本次得分：<span>{{
                              parseInt(item.subDim[0].score)
                            }}</span>
                          </div>
                        </div> -->
                      </span>
                    </div>
                    <div class="bottom_left" style="left: 370px;bottom: 60px;" v-if="item.subDim">
                      <span class="tt_txt">
                        {{ item.subDim[2].name }}
                        <!-- <div class="demsb_tool" style="left: 233px;">
                          <div class="demsb_score">
                            本次得分：<span>{{
                              parseInt(item.subDim[2].score)
                            }}</span>
                          </div>
                        </div> -->
                      </span>
                    </div>
                    <div class="bottom_right" style="left: 45px;bottom: 60px;" v-if="item.subDim">
                      <span class="tt_txt">
                        {{ item.subDim[1].name }}
                        <!-- <div class="demsb_tool1" style="right: 233px;">
                          <div class="demsb_score">
                            本次得分：<span>{{
                              parseInt(item.subDim[1].score)
                            }}</span>
                          </div>
                        </div> -->
                      </span>
                    </div>
                    <!-- 抑郁 -->
                    <div v-if="index == 0" id="myChartRgs2" class="myChartLd0" ref="myChartRgs2" style="height:366px"></div>
                    <!-- 焦虑 -->
                    <div v-if="index == 1" id="myChartRgs3" class="myChartLd0" ref="myChartRgs3" style="height:366px"></div>
                    <!-- 强迫 -->
                    <div v-if="index == 2" id="myChartRgs4" class="myChartLd0" ref="myChartRgs4" style="height:366px"></div>
                    <!-- PTSD -->
                    <div v-if="index == 3" id="myChartRgs5" class="myChartLd0" ref="myChartRgs5" style="height:366px"></div>
                    <!-- 敌对 -->
                    <div v-if="index == 4" id="myChartRgs6" class="myChartLd0" ref="myChartRgs6" style="height:366px"></div>
                  </div>
                </div>
                <div class="wdrj_suger wdrj_sugers" style="margin-top: 50px;">
                  <div class="wdrjs_title">
                    测评结果分析
                  </div>
                  <ul class="wdrjs_uls">
                    <li v-for="(items, indexs) in item.sysDim" :key="indexs">
                      <p>
                        {{ items }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-style group_02">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_top" style="padding-bottom: 20px">
          <img src="../../assets/images/news/beizhu.png" style="width: 60px;height: auto" alt="">
          <span class="gp2_t_txt">附录</span>
        </div>
        <div class="gp2_main" style="margin-top: 0px">

          <div class="gp2_li">
            <div class="gp2l_head" style="margin-top: 0">
              <span>一、作品信息统计</span>
            </div>
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
          <div class="gp2_li">
            <div class="gp2l_head">
              <span>二、沙具使用情况统计</span>
            </div>
          </div>
          <div>
            <div class="dtmt_tle" style="margin-bottom: 10px">
              <span class="dt_dot"></span>
              <span>沙具使用数量分布</span>
            </div>
            <div class="myChartZhu1" ref="myChartZhu1" id="myChartZhu1"></div>
          </div>
          <div style="margin-top:30px;">
            <div class="dtmt_tle" style="margin-bottom: 0">
              <span class="dt_dot"></span>
              <span>沙具使用时长占比</span>
            </div>
            <div class="myChartRose1" ref="myChartRose1" id="myChartRose1"></div>

          </div>
        </div>
      </div>
    </div>
    
    <div class="table-style group_02" v-if="sandInfo.length > 0">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        
        <div class="gp2_main">
          <div class="gp2_li">
            <div class="gp2l_head" style="margin-top: 20px;">
              <span>沙具使用记录表</span>
            </div>
          </div>
          <div class="gp_warn">
            <div class="dtmc_r_biao">
              <ul>
                <li>
                  <div>序号</div>
                  <div>沙具类别</div>
                  <div>沙具</div>
                  <div>使用时长(秒)</div>
                  <div>是否删除沙具</div>
                </li>
                <li v-for="(item, index) in sandInfo.slice(0,23)" :key="index">
                  <div>
                    <span>{{item.id}}</span>
                  </div>
                  <div>
                    <span>{{item.type}}</span>
                  </div>
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                  <div>
                    <span>{{item.time}}</span>
                  </div>
                  <div>
                    <span>{{item.isDel}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in sandList" :key="index" class="table-style group_02">
      <div class="table-border">
        <div class="gp_all_tips">
          <img src="../../assets/images/part/tipss.png" alt="" />
          温馨提示：本报告结果仅供参考，不作为评价或选拔使用。
        </div>
        <div class="gp2_main" style="padding-top: 30px;">
          <div class="gp_warn">
            <div class="dtmc_r_biao">
              <ul>
                <li>
                  <div>序号</div>
                  <div>沙具类别</div>
                  <div>沙具</div>
                  <div>使用时长(秒)</div>
                  <div>是否删除沙具</div>
                </li>
                <li v-for="itemc in item" :key="itemc.id">
                  <div>
                    <span>{{itemc.id}}</span>
                  </div>
                  <div>
                    <span>{{itemc.type}}</span>
                  </div>
                  <div>
                    <span>{{itemc.name}}</span>
                  </div>
                  <div>
                    <span>{{itemc.time}}</span>
                  </div>
                  <div>
                    <span>{{itemc.isDel}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JSZip from "jszip";
import Url from "@/assets/js/url.js";
import htmlToZip from "@/common/utils/htmlToZip"
import echarts from "../../assets/js/echarts";
import { mapMutations } from "vuex";
var FileSaver = require('file-saver');
export default {
  name: "ExportPdf",
  data() {
    return {
      zipFlag: false,
      heNum: 37,
      myChartLds2: "",
      myChartLds3: "",
      myChartLds4: "",
      myChartLds5: "",
      myChartLds6: "",
      myChartLds7: "",
      myChartLds8: "",
      myChartZhusYs: "",
      myChartRgs2: "",
      myChartRgs3: "",
      myChartRgs4: "",
      myChartRgs5: "",
      myChartRgs6: "",
      // heNum: 37,
      myChartPies11: "",
      myChartPies22: "",
      myChartPies33: "",
      myChartLd11: "",
      myChartLd22: "",
      myChartLd33: "",
      myChartRose1: "",
      myChartZhu1: "",
      // myChartPiess11: "",
      // myChartPiess22: "",
      // myChartPiess33: "",
      // myChartRoses1: "",
      // myChartZhus1: "",
      // myChartLds11: "",
      // myChartLds22: "",
      // myChartLds33: "",
      gender: 1,
      myCharts01: "",
      details: {
      },
      reviewData: {},
      sandInfo: [],
      sandList: [],
      imgList: [],
      sandUseNumInfoName: [],
      sandUseNumInfoNum: [],
      depressionFlag: 1,
      anxietyFlag: 1,
      forcedFlag: 1,
      suicideFlag: 0,
      violenceFlag: 0,
      personalityFlag: 0
    };
  },
  props: {
    iList: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    somePdfs () {
      return this.$store.state.somePdfFlag
    }
  },
  watch: {
    somePdfs: function(newVal, oldVal) {
      if (newVal) {
        this.loading = this.$loading({
          lock: true,
          text: '正在请求数据 ( ' + 0 + ' / ' + this.iList.length + ' )',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.exportMeeting('all')
        this.zipFlag = true
      } else {
        this.zipFlag = false
      }
    }
  },
  mounted() {
    let that = this;
    let algTypes = JSON.parse(localStorage.getItem("algTypes"));
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
  },
  methods: {
    ...mapMutations(["setSomePdfFlag"]),
    getMeetingAll (id, count, len) {
      let that = this;
      return new Promise((resolve, reject) => {
        that.getDetail(id)
        // setTimeout(() => {
        //   setTimeout(() => {
        //     that.details.birdView = '';
        //     that.imgList = [
        //       {
        //         name: "鸟瞰图",
        //         img: ""
        //       },
        //       {
        //         name: "西侧俯身45度视图",
        //         img: ''
        //       },
        //       {
        //         name: "东侧俯身45度视图",
        //         img: ''
        //       },
        //       {
        //         name: "操作者视图",
        //         img: ''
        //       }
        //     ];
        //     let allAjax = {
        //       row: this.details,
        //       rowr: this.reviewData,
        //       rows: this.sandInfo,
        //       row3: this.imgList,
        //       row4: this.sandUseNumInfoName,
        //       row5: this.sandUseNumInfoNum
        //     }
        //     setTimeout(() => {
        //       resolve(allAjax)
        //       this.loading.setText('正在请求数据 ( ' + count + ' / ' + len + ' )')
        //     }, 500);
        //   }, 500);
        // }, 500);
        setTimeout(() => {
          let param = {
            reportId: id
          }
          this.$http
            .get(Url + "/aimw/report/reportBirdView", {
              params: param
            })
            .then(res => {
              let data = res.data;
              if (data.code == 0) {
                console.log(11111111)
                this.details.birdView = data.data.birdView
                this.$http
                  .get(Url + "/aimw/report/reportReviewImgs", {
                    params: param
                  })
                  .then(res1 => {
                    let data1 = res1.data;
                    if (data1.code == 0) {
                      that.imgList = [
                        {
                          name: "鸟瞰图",
                          img: "data:image;base64," + data.data.birdView
                        },
                        {
                          name: "西侧俯身45度视图",
                          img: "data:image;base64," + data1.data.workView.westView
                        },
                        {
                          name: "东侧俯身45度视图",
                          img: "data:image;base64," + data1.data.workView.eastView
                        },
                        {
                          name: "操作者视图",
                          img: "data:image;base64," + data1.data.workView.operatorView
                        }
                      ];
                      let allAjax = {
                        row: this.details,
                        rowr: this.reviewData,
                        rows: this.sandInfo,
                        row3: this.imgList,
                        row4: this.sandUseNumInfoName,
                        row5: this.sandUseNumInfoNum
                      }
                      setTimeout(() => {
                        resolve(allAjax)
                        this.loading.setText('正在请求数据 ( ' + count + ' / ' + len + ' )')
                      }, 500);
                    } else {
                      that.$message.error(data.msg);
                    }
                  })
                  .catch(res => {
                    console.log(res);
                  });
              } else {
                that.$message.error(data.msg);
              }
            })
            .catch(res => {
              console.log(res);
            });
        }, 500);
      })
    },
    async exportMeeting (type) {
      try {
        this.allLoading = true
        let selectedData = []
        for (let i in this.iList) {
          selectedData.push(await this.getMeetingAll(this.iList[i].reportId, Number(i) + 1, this.iList.length))
        }

        console.log(selectedData)
        this.setSomePdfFlag(false)
        this.loading.setText('正在拼命导出')

        const zip = new JSZip()
        const promises = []
        this.isShowPdf = true

        for (let i = 0; i < selectedData.length; i++) {
          // 解析数据
          this.gender = this.iList[i].gender
          this.details = selectedData[i].row
          this.reviewData = selectedData[i].rowr
          this.reviewData = selectedData[i].rowr
          this.sandInfo = selectedData[i].rows
          for (let i in this.sandInfo) {
            this.sandInfo[i].id = Number(i) + 1
          }
          let list2 = []
          let sandLen2 = Math.ceil((this.sandInfo.length - 40) / 43)
          for (let j = 0; j < sandLen2; j++) {
            list2.push(this.sandInfo.slice(40 + 43 * j, 40 + 43 * (Number(j) + 1)))
          }
          this.sandList = list2
          this.imgList = selectedData[i].row3
          this.sandUseNumInfoName = selectedData[i].row4
          this.sandUseNumInfoNum = selectedData[i].row5
          console.log(this.details)
          console.log(this.details.warnLen)
          console.log()
          this.initEcharts();
          const p = await htmlToZip.getPdfs(this.$refs.sprintSomePdf, selectedData[i].row.name, selectedData[i].row.evaluationTime, this.iList[i].reportId)
          promises.push(p)
        }
        console.log(promises)
        // 等到所有的promise执行完成依次压缩到zip中
        Promise.all(promises).then(async (pdfs) => {
          console.log(pdfs)
          for (let i = 0; i < pdfs.length; i++) {
            const { PDF, name, count, id } = pdfs[i]
            // 如果只是导出一个pdf，则导出pdf格式
            if (pdfs.length === 1) {
              PDF.save(`${name}-第${count}次-${id}.pdf`)
              setTimeout(() => {
                this.loading.close()
              }, 1000);
            } else {
              // 否则添加到压缩包里面
              await zip.file(`${name}-第${count}次-${id}.pdf`, PDF.output('blob'))
            }
          }
          console.log(pdfs)
          if (pdfs.length > 1) {
            await zip.generateAsync({ type: 'blob' }).then(content => {
              let nameZip = '评估报告 - ' + '共' + selectedData.length + '人 - ' + this.formTimes(new Date())
              FileSaver.saveAs(content, nameZip + '.zip')
            })
            setTimeout(() => {
              this.loading.close()
            }, 2000);
          }
        }).finally(() => {
          setTimeout(() => {
            this.loading.close()
          }, 2000);
        })
      } catch (e) {
        console.log(e)
        setTimeout(() => {
          this.loading.close()
        }, 2000);
        throw new Error(e)
      }
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
    perctInfo (data) {
      return Math.round(data.toFixed(2) * 100) / 100
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
      let timeN = y + "年" + m + "月" + d + '日 ' + h + '时' + minute + '分' + second + '秒'
      return timeN;
    },
    getDetail(id) {
      let that = this;
      var param = {
        reportId: id
      };
      this.$http
        .get(Url + "/aimw/report/appendix", {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data.data.sandInfoRet.sandInfo) {
              that.sandInfo = data.data.sandInfoRet.sandInfo;
            } else {
              that.sandInfo = [];
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
      this.$http
        .get(Url + "/aimw/report/reportReview", {
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
              data.data.workInfo.deleteScale = that.perctInfo(data.data.workInfo.deleteScale)
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
            console.log(1111111)
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
      this.$http
        .get(Url + "/aimw/report/reportInfo", {
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
            if (jjList0.length > 0) {
              let jjArr = jjList0.sort((a, b) => {
                return Number(b.total) - Number(a.total);
              });
              console.log(jjArr)
              // jjArr = jjArr.concat(jjArr)
              this.jjName = jjArr[0].title + '上'
              if (jjArr.length > 1) {
                if (jjArr[1].total == jjArr[0].total) {
                  this.jjName = jjArr[0].title + "、" + jjArr[1].title + '上'
                }
              }
              if (jjArr.length > 2) {
                if (jjArr[2].total == jjArr[0].total) {
                  this.jjName = jjArr[0].title + "、" + jjArr[1].title + '等方面'
                }
              }
            }
            data.data.jjName = this.jjName
            
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
            data.data.reportId = id
            if (data.data.note) {
              that.assessment = data.data.note
              if (data.data.note == '') {
                that.assessmentFlag = false
              } else {
                that.assessmentFlag = true
              }
            }
            that.details = data.data;
            // }, 0);
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
    initEcharts() {
      let that = this;
      that.myChart01 = echarts.init(that.$refs.myChart01);
      that.myChart01.setOption({
        title: {
          text: that.details.warningNum + '项',
          subtext: '风险',
          textStyle: {
            color: '#333E75',
            fontSize: 80,
            fontWeight: 500
          },
          subtextStyle: {
            color: '#FF748A',
            fontSize: 50,
            fontWeight: 500
          },
          itemGap: 30, // 主副标题距离
          left: 'center',
          top: 105
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
          radius: 340 // 图形大小
        },
        series: [
          {
            type: 'bar',
            animation: false,
            // avoidLabelOverlap: false,
            label: {
              position: 'center',
              show: false,
              formatter: function() {
                let str = '{a|' + that.details.warningNum + '}' + '\n\n' + '{b|有风险}'
                return str
              },
              rich: {
                a: {
                  color: 'rgba(51, 62, 117, 1)', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                  fontSize: 40,
                  fontWeight: '500'
                },
                b: {
                  color: 'rgba(117, 122, 144, 1)',
                  fontSize: 24
                }
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                name: '风险',
                value: that.details.warningNum,
                itemStyle: {
                  normal: {
                    barBorderRadius: [4, 4, 0, 0],
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
            barWidth: 40,
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
            barWidth: 40,
            barGap: '-100%', // 两环重叠
            z: 1
          }
        ]
      });
      setTimeout(() => {
        var theIndex = -1;
        this.myChartRose1 = echarts.init(
          document.getElementById("myChartRose1")
        );
        this.myChartRose1.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}%",
            padding: 10,
            textStyle: {
              color: "rgba(42, 52, 135, 0.80)",
              fontSize: 18
            }
          },
          legend: {
            show: false,
            // data: tuli,
            left: 'center',
            orient: 'horizontal',
            triggerOn: 'none',
            itemGap: 30,
            selectedMode: false,
            bottom: 18,
            itemHeight: 8,
            icon: 'circle',
            textStyle: {
              color: 'rgba(42, 52, 135, 1)',
              fontSize: 18,
              padding: [0, 0, 0, -10]
            }
          },
          series: [
            {
              name: "沙具使用时长占比",
              type: "pie",
              animation: false,
              radius: ["40%", "70%"],
              center: ["50%", "50%"],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
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
                  length: 10,
                  length2: 50
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
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
                        fontSize: 18,
                        color: "rgba(42, 52, 135, 0.80)"
                      },
                      a: {
                        fontSize: 18,
                        color: "rgba(255, 173, 106, 1)"
                      }
                    }
                  }
                }
              ]
            }
          ]
        });
        this.myChartZhu1 = echarts.init(
          document.getElementById("myChartZhu1")
        );
        this.myChartZhu1.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            padding: 10,
            textStyle: {
              color: "rgba(42, 52, 135, 0.80)",
              fontSize: 18
            }
          },

          grid: {
            top: "25",
            left: "4%",
            right: "0%",
            bottom: "2%",
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
                fontSize: 15,
                color: "#2A3487",
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
                fontSize: 15,
                color: "#2A3487",
                showMaxLabel: true
              },
              minInterval: 1
            }
          ],
          series: [
            {
              name: "使用数量",
              type: "bar",
              animation: false,
              barMaxWidth: 14,
              // barWidth: '12%',
              barCategoryGap: '0%',
              label: {
                show: true, // 显示数值
                position: 'top', // 在顶部显示
                textStyle: {
                  color: 'rgba(42,52,135,0.8)', // 标签字体颜色
                  fontSize: 16 // 标签字体大小
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 0, 0, 0],
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
        this.myChartLds2 = echarts.init(
          document.getElementById("myChartLds2")
        );
        this.myChartLds2.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[0].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[0].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[0].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
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
              that.details.sysList[0].subDim[0].name,
              that.details.sysList[0].subDim[1].name,
              that.details.sysList[0].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[0].subDim[0].score,
                    that.details.sysList[0].subDim[1].score,
                    that.details.sysList[0].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartLds3 = echarts.init(
          document.getElementById("myChartLds3")
        );
        this.myChartLds3.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[1].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[1].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[1].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
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
              that.details.sysList[1].subDim[0].name,
              that.details.sysList[1].subDim[1].name,
              that.details.sysList[1].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[1].subDim[0].score,
                    that.details.sysList[1].subDim[1].score,
                    that.details.sysList[1].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartLds4 = echarts.init(
          document.getElementById("myChartLds4")
        );
        this.myChartLds4.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[2].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[2].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[2].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
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
              that.details.sysList[2].subDim[0].name,
              that.details.sysList[2].subDim[1].name,
              that.details.sysList[2].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[2].subDim[0].score,
                    that.details.sysList[2].subDim[1].score,
                    that.details.sysList[2].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartLds5 = echarts.init(
          document.getElementById("myChartLds5")
        );
        this.myChartLds5.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[3].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[3].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[3].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
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
              that.details.sysList[3].subDim[0].name,
              that.details.sysList[3].subDim[1].name,
              that.details.sysList[3].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[3].subDim[0].score,
                    that.details.sysList[3].subDim[1].score,
                    that.details.sysList[3].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartLds6 = echarts.init(
          document.getElementById("myChartLds6")
        );
        this.myChartLds6.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[4].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[4].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[4].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
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
              that.details.sysList[4].subDim[0].name,
              that.details.sysList[4].subDim[1].name,
              that.details.sysList[4].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[4].subDim[0].score,
                    that.details.sysList[4].subDim[1].score,
                    that.details.sysList[4].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartLds7 = echarts.init(
          document.getElementById("myChartLds7")
        );
        this.myChartLds7.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[5].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[5].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[5].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -12]
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
              that.details.sysList[5].subDim[0].name,
              that.details.sysList[5].subDim[1].name,
              that.details.sysList[5].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[5].subDim[0].score,
                    that.details.sysList[5].subDim[1].score,
                    that.details.sysList[5].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        // this.myChartLds8 = echarts.init(
        //   document.getElementById("myChartLds8")
        // );
        
        // this.myChartLds8.setOption({
        //   tooltip: {
        //     show: false,
        //     padding: 10,
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
        //           name: that.details.sysList[6].subDim[0].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.details.sysList[6].subDim[1].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.details.sysList[6].subDim[2].name,
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
        //         fontSize: 20,
        //         height: 32,
        //         formatter: function(value, index) {
        //           return "{yxStyle" + index + "|" + index + "}";
        //         },
        //         rich: {
        //           yxStyle0: {
        //             color: "#00C0FF",
        //             fontSize: 12,
        //             // fontWeight: "bold",
        //             padding: [3, -12]
        //           },
        //           yxStyle1: {
        //             color: "#006cff",
        //             fontSize: 12,
        //             // fontWeight: "bold",
        //             padding: [3, -12]
        //           },
        //           yxStyle2: {
        //             color: "#6671FF",
        //             fontSize: 12,
        //             // fontWeight: "bold",
        //             padding: [3, -12]
        //           },
        //           yxStyle3: {
        //             color: "#FE5FB8",
        //             fontSize: 12,
        //             // fontWeight: "bold",
        //             padding: [3, -12]
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
        //       that.details.sysList[6].subDim[0].name,
        //       that.details.sysList[6].subDim[1].name,
        //       that.details.sysList[6].subDim[2].name
        //     ]
        //   },
        //   series: [
        //     {
        //       name: "",
        //       type: "radar",
        //       color: ["rgba(0,117,255,0.1)"],
        //       emphasis: {
        //         lineStyle: {
        //           width: 2,
        //           color: "rgba(0, 117, 255, 0.6)"
        //         }
        //       },
        //       data: [
        //         {
        //           value: [
        //             that.details.sysList[6].subDim[0].score,
        //             that.details.sysList[6].subDim[1].score,
        //             that.details.sysList[6].subDim[2].score
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
        //             width: 1,
        //             color: '#58B5FF'
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // });
        let xYs = []
        let yYs = []
        for (let i in that.details.jjList) {
          xYs.push(that.details.jjList[i].title)
          yYs.push(that.details.jjList[i].total)
        }
        this.myChartZhusYs = echarts.init(
          document.getElementById("myChartZhusYs")
        );
        this.myChartZhusYs.setOption({
          tooltip: {
            show: false,
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            padding: 10,
            textStyle: {
              color: "rgba(42, 52, 135, 0.80)",
              fontSize: 16
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
                fontSize: 20,
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
                fontSize: 20,
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
              animation: false,
              barMaxWidth: 20,
              label: {
                show: true, // 显示数值
                position: 'top', // 在顶部显示
                textStyle: {
                  color: 'rgba(42,52,135,0.8)', // 标签字体颜色
                  fontSize: 20 // 标签字体大小
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 0, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#D6B6F6"
                    },
                    {
                      offset: 1,
                      color: "#E1CBF6"
                    }
                  ])
                }
              },
              data: yYs
            }
          ]
        });
        this.myChartRgs2 = echarts.init(document.getElementById("myChartRgs2"));
        this.myChartRgs2.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.rgList[0].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[0].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[0].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
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
              that.details.rgList[0].subDim[0].name,
              that.details.rgList[0].subDim[1].name,
              that.details.rgList[0].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.rgList[0].subDim[0].score,
                    that.details.rgList[0].subDim[1].score,
                    that.details.rgList[0].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRgs3 = echarts.init(document.getElementById("myChartRgs3"));
        this.myChartRgs3.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.rgList[1].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[1].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[1].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
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
              that.details.rgList[1].subDim[0].name,
              that.details.rgList[1].subDim[1].name,
              that.details.rgList[1].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.rgList[1].subDim[0].score,
                    that.details.rgList[1].subDim[1].score,
                    that.details.rgList[1].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRgs4 = echarts.init(document.getElementById("myChartRgs4"));
        this.myChartRgs4.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.rgList[2].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[2].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[2].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
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
              that.details.rgList[2].subDim[0].name,
              that.details.rgList[2].subDim[1].name,
              that.details.rgList[2].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.rgList[2].subDim[0].score,
                    that.details.rgList[2].subDim[1].score,
                    that.details.rgList[2].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRgs5 = echarts.init(document.getElementById("myChartRgs5"));
        this.myChartRgs5.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.rgList[3].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[3].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[3].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
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
              that.details.rgList[3].subDim[0].name,
              that.details.rgList[3].subDim[1].name,
              that.details.rgList[3].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.rgList[3].subDim[0].score,
                    that.details.rgList[3].subDim[1].score,
                    that.details.rgList[3].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        this.myChartRgs6 = echarts.init(document.getElementById("myChartRgs6"));
        this.myChartRgs6.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.rgList[4].subDim[0].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[4].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.rgList[4].subDim[2].name,
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
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    // fontWeight: "bold",
                    padding: [3, -1]
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
              that.details.rgList[4].subDim[0].name,
              that.details.rgList[4].subDim[1].name,
              that.details.rgList[4].subDim[2].name
            ]
          },
          series: [
            {
              name: "",
              type: "radar",
              animation: false,
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.rgList[4].subDim[0].score,
                    that.details.rgList[4].subDim[1].score,
                    that.details.rgList[4].subDim[2].score
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
                    width: 1,
                    color: '#58B5FF'
                  }
                }
              ]
            }
          ]
        });
        // this.myChartPies11 = echarts.init(
        //   document.getElementById("myChartPies11")
        // );
        // this.myChartPies11.setOption({
        //   tooltip: {
        //     show: false,
        //     padding: 10,
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
        //           name: that.details.sysList[0].subDim[0].name,
        //           max: 3,
        //           axisLabel: { show: true }
        //         },
        //         {
        //           name: that.details.sysList[0].subDim[1].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.details.sysList[0].subDim[2].name,
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
        //             "rgba(251, 109, 183, 0.14)",
        //             "rgba(155, 160, 255, 0.14)",
        //             "rgba(5, 157, 255, 0.14)"
        //           ].reverse()
        //         }
        //       },
        //       axisLine: {
        //         show: false
        //       },
        //       splitLine: {
        //         lineStyle: {
        //           color: [
        //             "rgba(155, 160, 255, 1)",
        //             "rgba(5, 157, 255, 1)",
        //             "rgba(251, 109, 183, 1)"
        //           ].reverse()
        //         }
        //       },
        //       axisLabel: {
        //         show: true,
        //         color: "#FFFFFF",
        //         fontSize: 20,
        //         height: 32,
        //         formatter: function(value, index) {
        //           return "{yxStyle" + index + "|" + index + "}";
        //         },
        //         rich: {
        //           yxStyle0: {
        //             color: "#00C0FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle1: {
        //             color: "#006cff",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -10]
        //           },
        //           yxStyle2: {
        //             color: "#6671FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle3: {
        //             color: "#FE5FB8",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
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
        //       that.details.sysList[0].subDim[0].name,
        //       that.details.sysList[0].subDim[1].name,
        //       that.details.sysList[0].subDim[2].name
        //     ]
        //   },
        //   animation: false,
        //   series: [
        //     {
        //       name: "",
        //       type: "radar",
        //       color: ["rgba(0,117,255,0.4)"],
        //       emphasis: {
        //         lineStyle: {
        //           width: 2,
        //           color: "rgba(0, 117, 255, 0.6)"
        //         }
        //       },
        //       data: [
        //         {
        //           value: [
        //             that.details.sysList[0].subDim[0].score,
        //             that.details.sysList[0].subDim[1].score,
        //             that.details.sysList[0].subDim[2].score
        //           ],
        //           name: "本次得分",
        //           symbol: "circle",
        //           symbolSize: 4,
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
        //                   color: "rgba(27, 236, 255, 0.67)"
        //                 },
        //                 {
        //                   offset: 1,
        //                   color: "rgba(0, 198, 255, 0.67)"
        //                 }
        //               ],
        //               globalCoord: false
        //             }
        //           },
        //           lineStyle: {
        //             width: 1
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // });
        // this.myChartPies22 = echarts.init(
        //   document.getElementById("myChartPies22")
        // );
        // this.myChartPies22.setOption({
        //   tooltip: {
        //     show: false,
        //     padding: 10,
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
        //           name: that.details.sysList[1].subDim[0].name,
        //           max: 3,
        //           axisLabel: { show: true }
        //         },
        //         {
        //           name: that.details.sysList[1].subDim[1].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.details.sysList[1].subDim[2].name,
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
        //             "rgba(251, 109, 183, 0.14)",
        //             "rgba(155, 160, 255, 0.14)",
        //             "rgba(5, 157, 255, 0.14)"
        //           ].reverse()
        //         }
        //       },
        //       axisLine: {
        //         show: false
        //       },
        //       splitLine: {
        //         lineStyle: {
        //           color: [
        //             "rgba(155, 160, 255, 1)",
        //             "rgba(5, 157, 255, 1)",
        //             "rgba(251, 109, 183, 1)"
        //           ].reverse()
        //         }
        //       },
        //       axisLabel: {
        //         show: true,
        //         color: "#FFFFFF",
        //         fontSize: 20,
        //         height: 32,
        //         formatter: function(value, index) {
        //           return "{yxStyle" + index + "|" + index + "}";
        //         },
        //         rich: {
        //           yxStyle0: {
        //             color: "#00C0FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle1: {
        //             color: "#006cff",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -10]
        //           },
        //           yxStyle2: {
        //             color: "#6671FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle3: {
        //             color: "#FE5FB8",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
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
        //       that.details.sysList[1].subDim[0].name,
        //       that.details.sysList[1].subDim[1].name,
        //       that.details.sysList[1].subDim[2].name
        //     ]
        //   },
        //   animation: false,
        //   series: [
        //     {
        //       name: "",
        //       type: "radar",
        //       color: ["rgba(0,117,255,0.4)"],
        //       emphasis: {
        //         lineStyle: {
        //           width: 2,
        //           color: "rgba(0, 117, 255, 0.6)"
        //         }
        //       },
        //       data: [
        //         {
        //           value: [
        //             that.details.sysList[1].subDim[0].score,
        //             that.details.sysList[1].subDim[1].score,
        //             that.details.sysList[1].subDim[2].score
        //           ],
        //           name: "本次得分",
        //           symbol: "circle",
        //           symbolSize: 4,
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
        //                   color: "rgba(27, 236, 255, 0.67)"
        //                 },
        //                 {
        //                   offset: 1,
        //                   color: "rgba(0, 198, 255, 0.67)"
        //                 }
        //               ],
        //               globalCoord: false
        //             }
        //           },
        //           lineStyle: {
        //             width: 1
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // });
        // this.myChartPies33 = echarts.init(
        //   document.getElementById("myChartPies33")
        // );
        // this.myChartPies33.setOption({
        //   tooltip: {
        //     show: false,
        //     padding: 10,
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
        //           name: that.details.sysList[2].subDim[0].name,
        //           max: 3,
        //           axisLabel: { show: true }
        //         },
        //         {
        //           name: that.details.sysList[2].subDim[1].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.details.sysList[2].subDim[2].name,
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
        //             "rgba(251, 109, 183, 0.14)",
        //             "rgba(155, 160, 255, 0.14)",
        //             "rgba(5, 157, 255, 0.14)"
        //           ].reverse()
        //         }
        //       },
        //       axisLine: {
        //         show: false
        //       },
        //       splitLine: {
        //         lineStyle: {
        //           color: [
        //             "rgba(155, 160, 255, 1)",
        //             "rgba(5, 157, 255, 1)",
        //             "rgba(251, 109, 183, 1)"
        //           ].reverse()
        //         }
        //       },
        //       axisLabel: {
        //         show: true,
        //         color: "#FFFFFF",
        //         fontSize: 20,
        //         height: 32,
        //         formatter: function(value, index) {
        //           return "{yxStyle" + index + "|" + index + "}";
        //         },
        //         rich: {
        //           yxStyle0: {
        //             color: "#00C0FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle1: {
        //             color: "#006cff",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -10]
        //           },
        //           yxStyle2: {
        //             color: "#6671FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle3: {
        //             color: "#FE5FB8",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
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
        //       that.details.sysList[2].subDim[0].name,
        //       that.details.sysList[2].subDim[1].name,
        //       that.details.sysList[2].subDim[2].name
        //     ]
        //   },
        //   animation: false,
        //   series: [
        //     {
        //       name: "",
        //       type: "radar",
        //       color: ["rgba(0,117,255,0.4)"],
        //       emphasis: {
        //         lineStyle: {
        //           width: 2,
        //           color: "rgba(0, 117, 255, 0.6)"
        //         }
        //       },
        //       data: [
        //         {
        //           value: [
        //             that.details.sysList[2].subDim[0].score,
        //             that.details.sysList[2].subDim[1].score,
        //             that.details.sysList[2].subDim[2].score
        //           ],
        //           name: "本次得分",
        //           symbol: "circle",
        //           symbolSize: 4,
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
        //                   color: "rgba(27, 236, 255, 0.67)"
        //                 },
        //                 {
        //                   offset: 1,
        //                   color: "rgba(0, 198, 255, 0.67)"
        //                 }
        //               ],
        //               globalCoord: false
        //             }
        //           },
        //           lineStyle: {
        //             width: 1
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // });
        // this.myChartLd11 = echarts.init(document.getElementById("myChartLd11"));
        // this.myChartLd11.setOption({
        //   grid: {
        //     bottom: 30,
        //     left: 20,
        //     top: 40,
        //     right: 60
        //   },
        //   radar: {
        //     indicator: [
        //       { name: this.details.personalitySubDim[0].name, max: 100 },
        //       { name: this.details.personalitySubDim[5].name, max: 100 },
        //       { name: this.details.personalitySubDim[4].name, max: 100 },
        //       { name: this.details.personalitySubDim[3].name, max: 100 },
        //       { name: this.details.personalitySubDim[2].name, max: 100 },
        //       { name: this.details.personalitySubDim[1].name, max: 100 }
        //     ],
        //     center: ["50%", "50%"],
        //     radius: "70%",
        //     startAngle: -30,
        //     splitNumber: 5,
        //     name: {
        //       formatter: "{value}",
        //       textStyle: {
        //         color: "#354B70",
        //         fontSize: 14
        //       }
        //     },
        //     splitArea: {
        //       areaStyle: {
        //         color: [
        //           "rgba(255, 255, 255, 1)",
        //           "rgba(151, 205, 255, 0.14)"
        //         ].reverse()
        //       }
        //     },
        //     axisLine: {
        //       lineStyle: {
        //         color: "#DEE7FF"
        //       }
        //     },
        //     splitLine: {
        //       lineStyle: {
        //         color: "#DEE7FF"
        //       }
        //     }
        //   },
        //   animation: false,
        //   series: [
        //     {
        //       name: "人格解读",
        //       type: "radar",
        //       data: [
        //         {
        //           value: [this.details.personalitySubDim[0].score, this.details.personalitySubDim[5].score, this.details.personalitySubDim[4].score, this.details.personalitySubDim[3].score, this.details.personalitySubDim[2].score, this.details.personalitySubDim[1].score],
        //           name: "Actual Spending",
        //           symbol: "circle",
        //           symbolSize: 1,
        //           color: "rgba(0, 150, 255, 1)",
        //           itemStyle: {
        //             normal: {
        //               borderColor: "rgba(0, 150, 255, 1)"
        //             }
        //           }
        //         }
        //       ],
        //       label: {
        //         show: true,
        //         fontSize: 14,
        //         textStyle: {
        //           fontSize: 14,
        //           color: "#354B70"
        //         },
        //         formatter: function(params) {
        //           return params.value;
        //         }
        //       },
        //       areaStyle: {
        //         opacity: 0.4,
        //         color: {
        //           type: "linear",
        //           x: 0,
        //           y: 0,
        //           x2: 0,
        //           y2: 1,
        //           colorStops: [
        //             {
        //               offset: 0,
        //               color: "rgba(0, 150, 255, 1)"
        //             },
        //             {
        //               areaStyle: {
        //                 opacity: 0.4,
        //                 color: {
        //                   type: "linear",
        //                   x: 0,
        //                   y: 0,
        //                   x2: 0,
        //                   y2: 1,
        //                   colorStops: [
        //                     {
        //                       offset: 0,
        //                       color: "rgba(0, 150, 255, 1)"
        //                     },
        //                     {
        //                       offset: 1,
        //                       color: "rgba(41, 101, 255, 1)"
        //                     }
        //                   ],
        //                   globalCoord: false
        //                 }
        //               },
        //               offset: 1,
        //               color: "rgba(41, 101, 255, 1)"
        //             }
        //           ],
        //           globalCoord: false
        //         }
        //       },
        //       lineStyle: {
        //         width: 0
        //       }
        //     }
        //   ]
        // });
        // this.myChartLd33 = echarts.init(document.getElementById("myChartLd33"));
        // this.myChartLd33.setOption({
        //   tooltip: {
        //     show: false,
        //     padding: 10,
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
        //           name: that.details.sysList2[1].subDim[0].name,
        //           max: 3,
        //           axisLabel: { show: true }
        //         },
        //         {
        //           name: that.details.sysList2[1].subDim[1].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.details.sysList2[1].subDim[2].name,
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
        //             "rgba(251, 109, 183, 0.14)",
        //             "rgba(155, 160, 255, 0.14)",
        //             "rgba(5, 157, 255, 0.14)"
        //           ].reverse()
        //         }
        //       },
        //       axisLine: {
        //         show: false
        //       },
        //       splitLine: {
        //         lineStyle: {
        //           color: [
        //             "rgba(155, 160, 255, 1)",
        //             "rgba(5, 157, 255, 1)",
        //             "rgba(251, 109, 183, 1)"
        //           ].reverse()
        //         }
        //       },
        //       axisLabel: {
        //         show: true,
        //         color: "#FFFFFF",
        //         fontSize: 20,
        //         height: 32,
        //         formatter: function(value, index) {
        //           return "{yxStyle" + index + "|" + index + "}";
        //         },
        //         rich: {
        //           yxStyle0: {
        //             color: "#00C0FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle1: {
        //             color: "#006cff",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -10]
        //           },
        //           yxStyle2: {
        //             color: "#6671FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle3: {
        //             color: "#FE5FB8",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
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
        //     data: []
        //   },
        //   animation: false,
        //   series: [
        //     {
        //       name: "",
        //       type: "radar",
        //       color: ["rgba(0,117,255,0.1)"],
        //       emphasis: {
        //         lineStyle: {
        //           width: 2,
        //           color: "rgba(0, 117, 255, 0.6)"
        //         }
        //       },
        //       data: [
        //         {
        //           value: [
        //             that.details.sysList2[1].subDim[0].score,
        //             that.details.sysList2[1].subDim[1].score,
        //             that.details.sysList2[1].subDim[2].score
        //           ],
        //           name: "本次得分",
        //           symbol: "circle",
        //           symbolSize: 4,
        //           itemStyle: {
        //             color: "#0099ff"
        //           },
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
        //                   color: "rgba(27, 236, 255, 0.67)"
        //                 },
        //                 {
        //                   offset: 1,
        //                   color: "rgba(0, 198, 255, 0.67)"
        //                 }
        //               ],
        //               globalCoord: false
        //             }
        //           },
        //           lineStyle: {
        //             width: 1
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // });
        // this.myChartLd22 = echarts.init(document.getElementById("myChartLd22"));
        // this.myChartLd22.setOption({
        //   tooltip: {
        //     show: false,
        //     padding: 10,
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
        //           name: that.details.sysList2[0].subDim[0].name,
        //           max: 3,
        //           axisLabel: { show: true }
        //         },
        //         {
        //           name: that.details.sysList2[0].subDim[1].name,
        //           max: 3,
        //           axisLabel: { show: false }
        //         },
        //         {
        //           name: that.details.sysList2[0].subDim[2].name,
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
        //             "rgba(251, 109, 183, 0.14)",
        //             "rgba(155, 160, 255, 0.14)",
        //             "rgba(5, 157, 255, 0.14)"
        //           ].reverse()
        //         }
        //       },
        //       axisLine: {
        //         show: false
        //       },
        //       splitLine: {
        //         lineStyle: {
        //           color: [
        //             "rgba(155, 160, 255, 1)",
        //             "rgba(5, 157, 255, 1)",
        //             "rgba(251, 109, 183, 1)"
        //           ].reverse()
        //         }
        //       },
        //       axisLabel: {
        //         show: true,
        //         color: "#FFFFFF",
        //         fontSize: 20,
        //         height: 32,
        //         formatter: function(value, index) {
        //           return "{yxStyle" + index + "|" + index + "}";
        //         },
        //         rich: {
        //           yxStyle0: {
        //             color: "#00C0FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle1: {
        //             color: "#006cff",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -10]
        //           },
        //           yxStyle2: {
        //             color: "#6671FF",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
        //           },
        //           yxStyle3: {
        //             color: "#FE5FB8",
        //             fontSize: 12,
        //             fontWeight: "bold",
        //             padding: [-1, -12]
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
        //     data: []
        //   },
        //   animation: false,
        //   series: [
        //     {
        //       name: "",
        //       type: "radar",
        //       color: ["rgba(0,117,255,0.1)"],
        //       emphasis: {
        //         lineStyle: {
        //           width: 2,
        //           color: "rgba(0, 117, 255, 0.6)"
        //         }
        //       },
        //       data: [
        //         {
        //           value: [
        //             that.details.sysList2[0].subDim[0].score,
        //             that.details.sysList2[0].subDim[1].score,
        //             that.details.sysList2[0].subDim[2].score
        //           ],
        //           name: "本次得分",
        //           symbol: "circle",
        //           symbolSize: 4,
        //           itemStyle: {
        //             color: "#0099ff"
        //           },
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
        //                   color: "rgba(27, 236, 255, 0.67)"
        //                 },
        //                 {
        //                   offset: 1,
        //                   color: "rgba(0, 198, 255, 0.67)"
        //                 }
        //               ],
        //               globalCoord: false
        //             }
        //           },
        //           lineStyle: {
        //             width: 1
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // });
      }, 500);
    },
    initEchart() {
      let that = this;
      this.myCharts01 = echarts.init(this.$refs.myCharts01);
      this.myCharts01.setOption({
        tooltip: {
          show: false
        },
        series: [
          {
            name: "需关注",
            animation: false,
            type: "pie",
            clickable: false,
            radius: ["70%", "90%"],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{a}\n" + '20' + "单",
                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontFamily: "微软雅黑",
                  fontSize: 15,
                  fontWeight: "bolder"
                }
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: that.details.warningNum,
                name: "需关注",
                itemStyle: {
                  normal: {
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
                  }
                }
              },
              {
                value: Number(that.details.warnLen.length) - that.details.warningNum,
                name: "正常",
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#EFF7FE"
                      },
                      {
                        offset: 1,
                        color: "#EFF7FE"
                      }
                    ])
                  }
                }
              }
            ]
          }
        ]
      });
      setTimeout(() => {
        var theIndex = -1;
        this.myChartRoses1 = echarts.init(this.$refs.myChartRoses1);
        this.myChartRoses1.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: "面积模式",
              type: "pie",
              animation: false,
              radius: [30, "70%"],
              center: ["50%", "50%"],
              roseType: "area",
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                },
                normal: {
                  color: function(params) {
                    theIndex++;
                    var colorList = [
                      {
                        c1: "#97CDFF",
                        c2: "#C4ECFF"
                      },
                      {
                        c1: "#FFD356",
                        c2: "#FFEB8F"
                      },
                      {
                        c1: "#FE8986",
                        c2: "#FEAD7E"
                      },
                      {
                        c1: "#FC4FB0",
                        c2: "#FD76DA"
                      },
                      {
                        c1: "#5FF0F9",
                        c2: "#1BF6CA"
                      },
                      {
                        c1: "#00B6F0",
                        c2: "#00EAFE"
                      },
                      {
                        c1: "#7279FF",
                        c2: "#BABFFF"
                      },
                      {
                        c1: "#0075FF",
                        c2: "#00C2FF"
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
                  length: 10,
                  length2: 50
                }
              },
              data: [
                {
                  value: that.reviewData.sandUseTimeInfo[0].num,
                  name: that.reviewData.sandUseTimeInfo[0].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#79C2FF"
                      }
                    }
                  }
                },
                {
                  value: that.reviewData.sandUseTimeInfo[1].num,
                  name: that.reviewData.sandUseTimeInfo[1].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#FBD356"
                      }
                    }
                  }
                },
                {
                  value: that.reviewData.sandUseTimeInfo[2].num,
                  name: that.reviewData.sandUseTimeInfo[2].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#FF9E8C"
                      }
                    }
                  }
                },
                {
                  value: that.reviewData.sandUseTimeInfo[3].num,
                  name: that.reviewData.sandUseTimeInfo[3].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#FE5FB8"
                      }
                    }
                  }
                },
                {
                  value: that.reviewData.sandUseTimeInfo[4].num,
                  name: that.reviewData.sandUseTimeInfo[4].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#40E6F8"
                      }
                    }
                  }
                },
                {
                  value: that.reviewData.sandUseTimeInfo[5].num,
                  name: that.reviewData.sandUseTimeInfo[5].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#00C0FF"
                      }
                    }
                  }
                },
                {
                  value: that.reviewData.sandUseTimeInfo[6].num,
                  name: that.reviewData.sandUseTimeInfo[6].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#6671FF"
                      }
                    }
                  }
                },
                {
                  value: that.reviewData.sandUseTimeInfo[7].num,
                  name: that.reviewData.sandUseTimeInfo[7].sandTypeName,
                  label: {
                    formatter: "{b} {a|{d}%}",
                    rich: {
                      a: {
                        color: "#006cff"
                      }
                    }
                  }
                }
              ]
            }
          ]
        });
        this.myChartZhus1 = echarts.init(this.$refs.myChartZhus1);
        this.myChartZhus1.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },

          grid: {
            left: "3%",
            right: "4%",
            top: "30",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: that.sandUseNumInfoName,
              axisTick: {
                show: false,
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "直接访问",
              type: "bar",
              animation: false,
              barWidth: "16",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#00C2FF"
                    },
                    {
                      offset: 1,
                      color: "#0075FF"
                    }
                  ])
                }
              },
              data: that.sandUseNumInfoNum
            }
          ]
        });
        this.myChartPiess11 = echarts.init(
          document.getElementById("myChartPiess11")
        );
        this.myChartPiess11.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[0].subDim[0].name,
                  max: 3,
                  axisLabel: { show: true }
                },
                {
                  name: that.details.sysList[0].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[0].subDim[2].name,
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
                    "rgba(251, 109, 183, 0.14)",
                    "rgba(155, 160, 255, 0.14)",
                    "rgba(5, 157, 255, 0.14)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: [
                    "rgba(155, 160, 255, 1)",
                    "rgba(5, 157, 255, 1)",
                    "rgba(251, 109, 183, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -10]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
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
              that.details.sysList[0].subDim[0].name,
              that.details.sysList[0].subDim[1].name,
              that.details.sysList[0].subDim[2].name
            ]
          },
          animation: false,
          series: [
            {
              name: "",
              type: "radar",
              color: ["rgba(0,117,255,0.4)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[0].subDim[0].score,
                    that.details.sysList[0].subDim[1].score,
                    that.details.sysList[0].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 4,
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
                          color: "rgba(27, 236, 255, 0.67)"
                        },
                        {
                          offset: 1,
                          color: "rgba(0, 198, 255, 0.67)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: 1
                  }
                }
              ]
            }
          ]
        });
        this.myChartPiess22 = echarts.init(
          document.getElementById("myChartPiess22")
        );
        this.myChartPiess22.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[1].subDim[0].name,
                  max: 3,
                  axisLabel: { show: true }
                },
                {
                  name: that.details.sysList[1].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[1].subDim[2].name,
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
                    "rgba(251, 109, 183, 0.14)",
                    "rgba(155, 160, 255, 0.14)",
                    "rgba(5, 157, 255, 0.14)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: [
                    "rgba(155, 160, 255, 1)",
                    "rgba(5, 157, 255, 1)",
                    "rgba(251, 109, 183, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -10]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
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
              that.details.sysList[1].subDim[0].name,
              that.details.sysList[1].subDim[1].name,
              that.details.sysList[1].subDim[2].name
            ]
          },
          animation: false,
          series: [
            {
              name: "",
              type: "radar",
              color: ["rgba(0,117,255,0.4)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[1].subDim[0].score,
                    that.details.sysList[1].subDim[1].score,
                    that.details.sysList[1].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 4,
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
                          color: "rgba(27, 236, 255, 0.67)"
                        },
                        {
                          offset: 1,
                          color: "rgba(0, 198, 255, 0.67)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: 1
                  }
                }
              ]
            }
          ]
        });
        this.myChartPiess33 = echarts.init(
          document.getElementById("myChartPiess33")
        );
        this.myChartPiess33.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList[2].subDim[0].name,
                  max: 3,
                  axisLabel: { show: true }
                },
                {
                  name: that.details.sysList[2].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList[2].subDim[2].name,
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
                    "rgba(251, 109, 183, 0.14)",
                    "rgba(155, 160, 255, 0.14)",
                    "rgba(5, 157, 255, 0.14)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: [
                    "rgba(155, 160, 255, 1)",
                    "rgba(5, 157, 255, 1)",
                    "rgba(251, 109, 183, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -10]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
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
              that.details.sysList[2].subDim[0].name,
              that.details.sysList[2].subDim[1].name,
              that.details.sysList[2].subDim[2].name
            ]
          },
          animation: false,
          series: [
            {
              name: "",
              type: "radar",
              color: ["rgba(0,117,255,0.4)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList[2].subDim[0].score,
                    that.details.sysList[2].subDim[1].score,
                    that.details.sysList[2].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 4,
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
                          color: "rgba(27, 236, 255, 0.67)"
                        },
                        {
                          offset: 1,
                          color: "rgba(0, 198, 255, 0.67)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: 1
                  }
                }
              ]
            }
          ]
        });
        this.myChartLds11 = echarts.init(document.getElementById("myChartLds11"));
        this.myChartLds11.setOption({
          grid: {
            bottom: 30,
            left: 20,
            top: 40,
            right: 60
          },
          radar: {
            indicator: [
              { name: this.details.personalitySubDim[0].name, max: 100 },
              { name: this.details.personalitySubDim[5].name, max: 100 },
              { name: this.details.personalitySubDim[4].name, max: 100 },
              { name: this.details.personalitySubDim[3].name, max: 100 },
              { name: this.details.personalitySubDim[2].name, max: 100 },
              { name: this.details.personalitySubDim[1].name, max: 100 }
            ],
            center: ["50%", "50%"],
            radius: "70%",
            startAngle: -30,
            splitNumber: 5,
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#354B70",
                fontSize: 14
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(255, 255, 255, 1)",
                  "rgba(151, 205, 255, 0.14)"
                ].reverse()
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
          },
          animation: false,
          series: [
            {
              name: "人格解读",
              type: "radar",
              data: [
                {
                  value: [this.details.personalitySubDim[0].score, this.details.personalitySubDim[5].score, this.details.personalitySubDim[4].score, this.details.personalitySubDim[3].score, this.details.personalitySubDim[2].score, this.details.personalitySubDim[1].score],
                  name: "Actual Spending",
                  symbol: "circle",
                  symbolSize: 1,
                  color: "rgba(0, 150, 255, 1)",
                  itemStyle: {
                    normal: {
                      borderColor: "rgba(0, 150, 255, 1)"
                    }
                  }
                }
              ],
              label: {
                show: true,
                fontSize: 14,
                textStyle: {
                  fontSize: 14,
                  color: "#354B70"
                },
                formatter: function(params) {
                  return params.value;
                }
              },
              areaStyle: {
                opacity: 0.4,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 150, 255, 1)"
                    },
                    {
                      areaStyle: {
                        opacity: 0.4,
                        color: {
                          type: "linear",
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color: "rgba(0, 150, 255, 1)"
                            },
                            {
                              offset: 1,
                              color: "rgba(41, 101, 255, 1)"
                            }
                          ],
                          globalCoord: false
                        }
                      },
                      offset: 1,
                      color: "rgba(41, 101, 255, 1)"
                    }
                  ],
                  globalCoord: false
                }
              },
              lineStyle: {
                width: 0
              }
            }
          ]
        });
        this.myChartLds33 = echarts.init(document.getElementById("myChartLds33"));
        this.myChartLds33.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList2[1].subDim[0].name,
                  max: 3,
                  axisLabel: { show: true }
                },
                {
                  name: that.details.sysList2[1].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList2[1].subDim[2].name,
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
                    "rgba(251, 109, 183, 0.14)",
                    "rgba(155, 160, 255, 0.14)",
                    "rgba(5, 157, 255, 0.14)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: [
                    "rgba(155, 160, 255, 1)",
                    "rgba(5, 157, 255, 1)",
                    "rgba(251, 109, 183, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -10]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
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
            data: []
          },
          animation: false,
          series: [
            {
              name: "",
              type: "radar",
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList2[1].subDim[0].score,
                    that.details.sysList2[1].subDim[1].score,
                    that.details.sysList2[1].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 4,
                  itemStyle: {
                    color: "#0099ff"
                  },
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
                          color: "rgba(27, 236, 255, 0.67)"
                        },
                        {
                          offset: 1,
                          color: "rgba(0, 198, 255, 0.67)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: 1
                  }
                }
              ]
            }
          ]
        });
        this.myChartLds22 = echarts.init(document.getElementById("myChartLds22"));
        this.myChartLds22.setOption({
          tooltip: {
            show: false,
            padding: 10,
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
                  name: that.details.sysList2[0].subDim[0].name,
                  max: 3,
                  axisLabel: { show: true }
                },
                {
                  name: that.details.sysList2[0].subDim[1].name,
                  max: 3,
                  axisLabel: { show: false }
                },
                {
                  name: that.details.sysList2[0].subDim[2].name,
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
                    "rgba(251, 109, 183, 0.14)",
                    "rgba(155, 160, 255, 0.14)",
                    "rgba(5, 157, 255, 0.14)"
                  ].reverse()
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: [
                    "rgba(155, 160, 255, 1)",
                    "rgba(5, 157, 255, 1)",
                    "rgba(251, 109, 183, 1)"
                  ].reverse()
                }
              },
              axisLabel: {
                show: true,
                color: "#FFFFFF",
                fontSize: 20,
                height: 32,
                formatter: function(value, index) {
                  return "{yxStyle" + index + "|" + index + "}";
                },
                rich: {
                  yxStyle0: {
                    color: "#00C0FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle1: {
                    color: "#006cff",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -10]
                  },
                  yxStyle2: {
                    color: "#6671FF",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
                  },
                  yxStyle3: {
                    color: "#FE5FB8",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: [-1, -12]
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
            data: []
          },
          animation: false,
          series: [
            {
              name: "",
              type: "radar",
              color: ["rgba(0,117,255,0.1)"],
              emphasis: {
                lineStyle: {
                  width: 2,
                  color: "rgba(0, 117, 255, 0.6)"
                }
              },
              data: [
                {
                  value: [
                    that.details.sysList2[0].subDim[0].score,
                    that.details.sysList2[0].subDim[1].score,
                    that.details.sysList2[0].subDim[2].score
                  ],
                  name: "本次得分",
                  symbol: "circle",
                  symbolSize: 4,
                  itemStyle: {
                    color: "#0099ff"
                  },
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
                          color: "rgba(27, 236, 255, 0.67)"
                        },
                        {
                          offset: 1,
                          color: "rgba(0, 198, 255, 0.67)"
                        }
                      ],
                      globalCoord: false
                    }
                  },
                  lineStyle: {
                    width: 1
                  }
                }
              ]
            }
          ]
        });
      }, 500);
    }
  }
};
</script>
<style lang="less">
  .table-classs{
    .el-textarea.is-disabled .el-textarea__inner{
      background: linear-gradient(0deg, rgba(203, 235, 253, 0.1), rgba(161, 204, 250, 0.1));
      border-color: rgba(118, 154, 255, 1);
      color: #333333;
      cursor: not-allowed;
      font-size: 20px;
      color: #354B70;
      height: 100%;
      padding: 15px 20px 15px !important;
    }
  }
</style>
<style lang="less" scoped>

  // 最新的样式
  .table-classs {
    display: grid;
    background-color: #fff;
    width: 1191px;
    box-sizing: border-box;
    transform: scale(0.8);
    transform-origin: 0 0;
    margin: 0 auto;
    .table-style {
      border-collapse: collapse;
      width: 1190px;
      height: 1684px;
      // margin-bottom: 1px;
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
      .g1_top2{
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 180px;
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
            flex: 1;
            word-break: break-all;
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
      // 作品解读
      .gp2_top{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0 30px 0;
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
        padding: 0 68px;
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
          width: 100%;
          .gp_bird{
            width: 552px;
            height: auto;
            margin: 0 auto;
            img{
              display: block;
              width: 552px;
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
          p{
            span{
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 400 !important;
              font-size: 24px;
              color: #333E75;
              line-height: 50px;
              span{
                font-weight: 400 !important;
              }
            }
          }
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
          padding: 6px 0 8px;
          font-size: 19px;
          color: #333E75;
          line-height: 28px;
        }
        .gp_h_box{
          display: flex;
          .gp_h_bt{
            display: flex;
            flex: 1;
            padding:20px 0;
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
              font-size: 24px;
              color: #333E75;
              line-height: 36px;
              
            }
          }
        }
      }
      
    }
    .group_02 {
      .drwc_b_yst{
        width: auto;
        min-width: 306px;
        max-width: 666px;
        min-height: 108px;
        background: #F8FAFC;
        border: 1px solid #DADCE9;
        margin: 40px auto 0;
        z-index: 1;
        position: relative;
        padding: 10px 30px 20px;
        p{
          display: flex;
          font-family: SourceHanSansCN, SourceHanSansCN;
          font-weight: 400;
          font-size: 20px;
          color: #2A3487;
          line-height: 32px;
          padding: 10px 0 0;
          text-align: left;
          img{
            width: 40px;
            height: 40px;
            margin-right: 0px;
            margin-top: -8px;
            margin-left: -6px;
          }
          span{
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 400;
            font-size: 18px;
            color: #2A3487;
            line-height: 32px;
          }
          span:nth-child(1) {
            width: 6px;
            height: 6px;
            background: #2A3487;
            border-radius: 3px;
            line-height: 1;
            margin-top: 13px;
            margin-right: 6px;
          }
        }
      }
      .drwc_bw_shu{
        padding: 100px 0;
        transform: scale(1.6);
        margin-top: 100px;
        margin-left: -60px;
        margin-bottom: 0;
        .tree_box{
          position: relative;
          width: 462px;
          height: 549px;
          margin: 28px auto 20px;
          background: url(../../assets/images/news/tree.png) no-repeat center;
          background-size: 100% 100%;
          .tb_l1{
            width: 51px;
            height: 82px;
            position: absolute;
            top: 234px;
            left: 6px;
          }
          .tb_l2{
            width: 78px;
            height: 75px;
            position: absolute;
            top: 103px;
            left: 92px;
          }
          .tb_l3{
            width: 82px;
            height: 67px;
            position: absolute;
            top: 70px;
            left: 241px;
          }
          .tb_l4{
            width: 74px;
            height: 86px;
            position: absolute;
            top: 137px;
            left: 358px;
          }
          .tb_l5{
            width: 51px;
            height: 82px;
            position: absolute;
            top: 246px;
            right: -37px;
          }

          .tb_s_c11{
            position: absolute;
            top: 200px;
            left: 18px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #9EC870;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .tb_s_c12{
            position: absolute;
            top: 234px;
            left: -24px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #78CFAE;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 12px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .tb_s_c13{
            position: absolute;
            top: 302px;
            left: -16px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #62A77D;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            line-height: 20px;
          }
          .cir_box11{
            width: 64px;
            height: 64px;
            position: absolute;
            top: 254px;
            left: 32px;
            transform: rotate(-10deg);
            .cir_img{
              height: 32px;
              width: 32px;
              background-color: #03A667;
              border-radius: 50%;
              transform: rotate(0deg);
              position: absolute;
              border-radius: 32px 0 0 0;
            }
            .cir_lay{
              height: 58px;
              width: 58px;
              background-color: #D7EFEC;
              border-radius: 50%;
              position: absolute;
              top: 3px;
              left: 3px;
            }
            .cir_cen{
              height: 50px;
              width: 50px;
              background-color: #03A667;
              border-radius: 50%;
              position: absolute;
              top: 7px;
              left: 7px;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 500;
              font-size: 14px;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              transform: rotate(10deg);
              div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                span{
                  width: 35%;
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 14px;
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
            width: 70px;
            height: 70px;
            transform: rotate(-100deg);
            .cir_img{
              width: 70px;
              height: 35px;
              border-radius: 35px 35px 0 0;
              transform: rotate(0deg);
            }
            .cir_lay{
              height: 64px;
              width: 64px;
            }
            .cir_cen{
              height: 56px;
              width: 56px;
              transform: rotate(100deg);
            }
          }
          .cir_box13 {
            width: 78px;
            height: 78px;
            transform: rotate(70deg);
            .cir_img{
              width: 39px;
              height: 39px;
              border-radius: 39px 0 0 0;
              // clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
              transform: rotate(0deg);
              background: #D7EFEC;
              // clip: unset;
            }
            .cir_img34{
              width: 100%;
              height: 100%;
              background-color: #03A667;
              border-radius: 50%;
              // clip: unset;
            }
            .cir_lay{
              height: 72px;
              width: 72px;
            }
            .cir_cen{
              height: 64px;
              width: 64px;
              transform: rotate(-70deg);
            }
          }
          .cir_box14 {
            width: 98px;
            height: 98px;
            top: 250px;
            left: 30px;
            .cir_img{
              height: 100%;
              width: 100%;
              border-radius: 50%;
            }
            .cir_lay{
              height: 92px;
              width: 92px;
            }
            .cir_cen{
              height: 84px;
              width: 84px;
            }
          }
          .tb_s_c21{
            position: absolute;
            top: 120px;
            left: 60px;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #FFD0A2;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            padding: 0 20px;
          }
          .tb_s_c22{
            position: absolute;
            top: 108px;
            left: 154px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #FFDD66;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 12px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .tb_s_c23{
            position: absolute;
            top: 72px;
            left: 104px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #F4B36E;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            line-height: 26px;
          }
          .cir_box21{
            width: 64px;
            height: 64px;
            position: absolute;
            top: 160px;
            left: 116px;
            transform: rotate(30deg);
            .cir_img{
              height: 32px;
              width: 32px;
              background-color: #FFB641;
              border-radius: 50%;
              transform: rotate(0deg);
              position: absolute;
              border-radius: 32px 0 0 0;
            }
            .cir_lay{
              height: 58px;
              width: 58px;
              background-color: #D7EFEC;
              border-radius: 50%;
              position: absolute;
              top: 3px;
              left: 3px;
            }
            .cir_cen{
              height: 50px;
              width: 50px;
              background-color: #FFB641;
              border-radius: 50%;
              position: absolute;
              top: 7px;
              left: 7px;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 500;
              font-size: 14px;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              transform: rotate(-30deg);
              div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                span{
                  width: 35%;
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 14px;
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
            width: 70px;
            height: 70px;
            transform: rotate(-65deg);
            .cir_img{
              width: 70px;
              height: 35px;
              border-radius: 35px 35px 0 0;
              transform: rotate(0deg);
              // clip: rect(35px, auto, auto, auto);
              // transform: rotate(120deg);
            }
            .cir_lay{
              height: 64px;
              width: 64px;
            }
            .cir_cen{
              height: 56px;
              width: 56px;
              transform: rotate(65deg);
            }
          }
          .cir_box23 {
            width: 78px;
            height: 78px;
            transform: rotate(105deg);
            .cir_img{
              width: 39px;
              height: 39px;
              border-radius: 39px 0 0 0;
              // clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
              transform: rotate(0deg);
              background: #D7EFEC;
            }
            .cir_img34{
              width: 100%;
              height: 100%;
              background-color: #FFB641;
              border-radius: 50%;
              // clip: unset;
            }
            .cir_lay{
              height: 72px;
              width: 72px;
            }
            .cir_cen{
              height: 64px;
              width: 64px;
              transform: rotate(-105deg);
            }
          }
          .cir_box24 {
            width: 98px;
            height: 98px;
            top: 166px;
            left: 100px;
            .cir_img{
              height: 100%;
              width: 100%;
              border-radius: 50%;
            }
            .cir_lay{
              height: 92px;
              width: 92px;
            }
            .cir_cen{
              height: 84px;
              width: 84px;
            }
          }

          .tb_s_c31{
            position: absolute;
            top: 69px;
            left: 308px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #FFAAD1;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            padding: 0 4px;
          }
          .tb_s_c32{
            position: absolute;
            top: 70px;
            left: 212px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #FFB5AD;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 12px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            padding: 0 4px;
          }
          .tb_s_c33{
            position: absolute;
            top: 31px;
            left: 265px;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #F494A7;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            line-height: 32px;
            padding: 0 2px;
          }
          .cir_box31{
            width: 64px;
            height: 64px;
            position: absolute;
            top: 120px;
            left: 248px;
            transform: rotate(70deg);
            .cir_img{
              height: 32px;
              width: 32px;
              background-color: #FF918C;
              border-radius: 50%;
              transform: rotate(0deg);
              position: absolute;
              border-radius: 32px 0 0 0;
            }
            .cir_lay{
              height: 58px;
              width: 58px;
              background-color: #D7EFEC;
              border-radius: 50%;
              position: absolute;
              top: 3px;
              left: 3px;
            }
            .cir_cen{
              height: 50px;
              width: 50px;
              background-color: #FF918C;
              border-radius: 50%;
              position: absolute;
              top: 7px;
              left: 7px;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 500;
              font-size: 14px;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              transform: rotate(-70deg);
              div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                span{
                  width: 35%;
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 14px;
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
            width: 70px;
            height: 70px;
            transform: rotate(-30deg);
            .cir_img{
              width: 70px;
              height: 35px;
              border-radius: 35px 35px 0 0;
              transform: rotate(0deg);
              // clip: rect(35px, auto, auto, auto);
            }
            .cir_lay{
              height: 64px;
              width: 64px;
            }
            .cir_cen{
              height: 56px;
              width: 56px;
              transform: rotate(30deg);
            }
          }
          .cir_box33 {
            width: 78px;
            height: 78px;
            transform: rotate(140deg);
            .cir_img{
              width: 39px;
              height: 39px;
              border-radius: 39px 0 0 0;
              // clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
              transform: rotate(0deg);
              background: #D7EFEC;
              // clip: unset;
            }
            .cir_img34{
              width: 100%;
              height: 100%;
              background-color: #FF918C;
              border-radius: 50%;
              // clip: unset;
            }
            .cir_lay{
              height: 72px;
              width: 72px;
            }
            .cir_cen{
              height: 64px;
              width: 64px;
              transform: rotate(-140deg);
            }
          }
          .cir_box34 {
            width: 98px;
            height: 98px;
            top: 120px;
            left: 234px;
            .cir_img{
              height: 100%;
              width: 100%;
              border-radius: 50%;
            }
            .cir_lay{
              height: 92px;
              width: 92px;
            }
            .cir_cen{
              height: 84px;
              width: 84px;
            }
          }
          .tb_s_c41{
            position: absolute;
            top: 165px;
            right: 2px;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #90CEFF;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            padding: 2px;
          }
          .tb_s_c42{
            position: absolute;
            top: 118px;
            left: 356px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #93B8ED;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 12px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .tb_s_c43{
            position: absolute;
            top: 108px;
            right: 10px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #60C8F2;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            line-height: 26px;
          }
          .cir_box41{
            width: 64px;
            height: 64px;
            position: absolute;
            top: 202px;
            right: 64px;
            transform: rotate(70deg);
            .cir_img{
              height: 32px;
              width: 32px;
              background-color: #5AB4EE;
              border-radius: 50%;
              transform: rotate(0deg);
              position: absolute;
              border-radius: 32px 0 0 0;
            }
            .cir_lay{
              height: 58px;
              width: 58px;
              background-color: #D7EFEC;
              border-radius: 50%;
              position: absolute;
              top: 3px;
              left: 3px;
            }
            .cir_cen{
              height: 50px;
              width: 50px;
              background-color: #5AB4EE;
              border-radius: 50%;
              position: absolute;
              top: 7px;
              left: 7px;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 500;
              font-size: 14px;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              transform: rotate(-70deg);
              div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                span{
                  width: 35%;
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 14px;
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
            width: 70px;
            height: 70px;
            transform: rotate(-20deg);
            .cir_img{
              width: 70px;
              height: 35px;
              border-radius: 35px 35px 0 0;
              transform: rotate(0deg);
            }
            .cir_lay{
              height: 64px;
              width: 64px;
            }
            .cir_cen{
              height: 56px;
              width: 56px;
              transform: rotate(20deg);
            }
          }
          .cir_box43 {
            width: 78px;
            height: 78px;
            transform: rotate(155deg);
            .cir_img{
              width: 39px;
              height: 39px;
              border-radius: 39px 0 0 0;
              // clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
              transform: rotate(0deg);
              background: #D7EFEC;
              // clip: unset;
            }
            .cir_img34{
              width: 100%;
              height: 100%;
              background-color: #5AB4EE;
              border-radius: 50%;
              // clip: unset;
            }
            .cir_lay{
              height: 72px;
              width: 72px;
            }
            .cir_cen{
              height: 64px;
              width: 64px;
              transform: rotate(-155deg);
            }
          }
          .cir_box44 {
            width: 98px;
            height: 98px;
            top: 200px;
            right: 58px;
            .cir_img{
              height: 100%;
              width: 100%;
              border-radius: 50%;
            }
            .cir_lay{
              height: 92px;
              width: 92px;
            }
            .cir_cen{
              height: 84px;
              width: 84px;
            }
          }
          .tb_s_c51{
            position: absolute;
            top: 212px;
            right: -24px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #C2C2ED;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .tb_s_c52{
            position: absolute;
            top: 247px;
            right: -61px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #BD9DEE;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 12px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .tb_s_c53{
            position: absolute;
            top: 317px;
            right: -59px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #E3B4FF;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            line-height: 20px;
          }
          .cir_box51{
            width: 64px;
            height: 64px;
            position: absolute;
            top: 268px;
            right: -17px;
            transform: rotate(90deg);
            .cir_img{
              height: 32px;
              width: 32px;
              background-color: #C8B4FF;
              border-radius: 50%;
              transform: rotate(0deg);
              position: absolute;
              border-radius: 32px 0 0 0;
            }
            .cir_lay{
              height: 58px;
              width: 58px;
              background-color: #D7EFEC;
              border-radius: 50%;
              position: absolute;
              top: 3px;
              left: 3px;
            }
            .cir_cen{
              height: 50px;
              width: 50px;
              background-color: #C8B4FF;
              border-radius: 50%;
              position: absolute;
              top: 7px;
              left: 7px;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 500;
              font-size: 14px;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              transform: rotate(-90deg);
              div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                span{
                  width: 35%;
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 14px;
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
            width: 70px;
            height: 70px;
            transform: rotate(90deg);
            .cir_img{
              width: 70px;
              height: 35px;
              border-radius: 35px 35px 0 0;
              transform: rotate(0deg);
            }
            .cir_lay{
              height: 64px;
              width: 64px;
            }
            .cir_cen{
              height: 56px;
              width: 56px;
              transform: rotate(-90deg);
            }
          }
          .cir_box53 {
            width: 78px;
            height: 78px;
            transform: rotate(10deg);
            .cir_img{
              width: 39px;
              height: 39px;
              border-radius: 39px 0 0 0;
              // clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0% 0%, 50% 0%);
              transform: rotate(0deg);
              background: #D7EFEC;
              // clip: unset;
            }
            .cir_img34{
              width: 100%;
              height: 100%;
              background-color: #C8B4FF;
              border-radius: 50%;
              // clip: unset;
            }
            .cir_lay{
              height: 72px;
              width: 72px;
            }
            .cir_cen{
              height: 64px;
              width: 64px;
              transform: rotate(-10deg);
            }
          }
          .cir_box54 {
            width: 98px;
            height: 98px;
            top: 264px;
            right: -14px;
            .cir_img{
              height: 100%;
              width: 100%;
              border-radius: 50%;
            }
            .cir_lay{
              height: 92px;
              width: 92px;
            }
            .cir_cen{
              height: 84px;
              width: 84px;
            }
          }
        }
      }
      // .gp7_box{
      //   // width: 1060px;
      //   // margin: 0 auto;
      //   // margin-top: 40px;
      //   // ul{
      //   //   li.gp_w_th{
      //   //     height: 42px;
      //   //     line-height: 42px;
      //   //     font-size: 16px;
      //   //     font-family: Source Han Sans CN;
      //   //     font-weight: 400;
      //   //     color: #394B6D;
      //   //   }
      //   //   li{
      //   //     div{
      //   //       span{
      //   //         height: 36px;
      //   //         line-height: 36px;
      //   //         font-size: 15px;
      //   //         font-family: PingFang SC;
      //   //         font-weight: 400;
      //   //         color: #7986A9;
      //   //       }
      //   //     }
      //   //   }
      //   // }
      // }
      .gp2_main{
        margin: 0 auto;
        width: 1060px;
        background: #FFFFFF;
        // box-shadow: 0px 13px 43px 0px rgba(76, 100, 132, 0.1);
        // border-radius: 4px;
        padding: 20px 44px 0px;
        .myChartZhu1{
          margin: 0 auto;
          width: 1060px;
          height: 300px;
          margin-left: -45px;
        }
        .myChartRose1{
          margin: 0 auto;
          width: 972px;
          height: 400px;
        }
        .dtmt_tle{
          display: flex;
          align-items: center;
          margin: 30px 0 20px;
          span{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24px;
            color: #333E75;
          }
          .dt_dot{
            width: 8px;
            height: 8px;
            border: 2px solid #333E75;
            border-radius: 50%;
            margin: 0;
            margin-right: 5px;
            line-height: unset;
            background: transparent;
            display: inline-block;
          }
        }
        .dtm_xls {
          width: 100%;
          margin: 30px auto 40px;
          border: 1px solid #d7dffb;
          .dtmx_li {
            display: flex;
            height: 58px;
            .dtmxl_head {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 220px;
              border-bottom: 1px solid #d7dffb;
              border-right: 1px solid #d7dffb;
              background: transparent;
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 20px;
              color: #2A3487;
            }
            .dtmxl_body {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 265px;
              border-bottom: 1px solid #d7dffb;
              border-right: 1px solid #d7dffb;
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 20px;
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
            height: auto;
            .dtmxl_head {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 220px;
              border-bottom: 0 !important;
              border-right: 0.01rem solid #d7dffb;
              background: transparent;
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 20px;
              color: #2A3487;
            }
            .dtmxl_body {
              display: block;
              flex: 1;
              border-bottom: 0 !important;
              border-right: 1px solid rgba(215, 223, 251, 1);
              .dtmxl_dl {
                height: 58px;
                display: flex;

                .dtmxl_dt {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 133px;
                  height: 100%;
                  border-bottom: 0.01rem solid #d7dffb;
                  border-right: 0.01rem solid #d7dffb;
                  background: transparent;
                  font-family: PingFangSC, PingFang SC;
                  font-weight: 400;
                  font-size: 20px;
                  color: #2A3487;
                }
                .dtmxl_dd {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 352px;
                  border-bottom: 1px solid #d7dffb;
                  border-right: 1px solid #d7dffb;
                  font-family: PingFangSC, PingFang SC;
                  font-weight: 400;
                  font-size: 20px;
                  color: #2A3487;
                }

                .dtmxl_dds {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 265px;
                  border-bottom: 1px solid #d7dffb;
                  font-family: PingFangSC, PingFang SC;
                  font-weight: 400;
                  font-size: 20px;
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
        .drwc_b_ys{
          width: auto;
          padding: 0 40px 30px;
          display: flex;
          .myChartZhu {
            margin: 30px auto 0;
            width: 960px;
            height: 266px;
          }
          p{
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 400;
            font-size: 24px;
            color: #333E75;
            padding: 30px 0 0;
            width: 100%;
            text-align: left;
          }
          span{
            font-weight: 500;
          }
        }
        .drwc_b_ysp{
          display: block;
          margin: 0 auto;
          padding: 0;
          .drwc_sp_head{
            text-align: left;
            margin: 30px 0 10px;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 32px;
            color: #333E75;
            display: flex;
            align-items: center;
            span{
              width: 8px;
              height: 8px;
              border: 2px solid #333E75;
              border-radius: 50%;
              margin: 0;
              margin-right: 6px;
              line-height: unset;
              background: transparent;
              display: inline-block;
            }
          }
          p{
            padding: 26px 30px;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 400;
            font-size: 24px;
            color: #2A3487;
            display: flex;
            align-items: center;
            background: transparent;
            border: 1px solid #333E75;
            text-align: left;
            line-height: 42px;
            margin-top: 36px;
            img{
              width: 50px;
              height: 50px;
              margin-right: 4px;
              margin-top: -10px;
            }
          }
        }
        .drwc_btr {
          .wdrj_box {
            margin-bottom: 0;
            .wdrj_main {
              padding: 0px 0 20px 0px;
              border-radius: 4px;
              margin-bottom: 20px;
              .wdrj_title {
                display: flex;
                align-items: center;
                span{
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 32px;
                  color: #333E75;
                }
                img {
                  width: 80px;
                  height: 24px;
                }
              }
              .wdrj_titles {
                margin-left: 64px;
                margin-top: 6px;
                span{
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 400;
                  font-size: 28px;
                  color: #333E75;
                }
              }
              .wdrj_line{
                display: flex;
                align-items: center;
                margin-bottom: 60px;
                margin-top: 80px;
                justify-content: center;
                .wdrj_l_left{
                  font-family: PingFangSC, PingFang SC;
                  font-weight: 400;
                  font-size: 24px;
                  color: #6F76B2;
                }
                .wdrj_l_center{
                  width: 720px;
                  height: 12px;
                  margin: 0 20px;
                  border-radius: 6px;
                  background: linear-gradient( 270deg, #999EFF 0%, #9DBDFF 50%, #CDE9FF 100%);
                  position: relative;
                  .wdrj_lc_txt{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 20px;
                    color: #6F76B2;
                    margin-top: 20px;
                  }
                  .dttr_btn {
                    width: 48px;
                    height: auto;
                    position: absolute;
                    margin: auto;
                    margin-left: -24px;
                    left: 0;
                    top: -16px;
                  }
                  .dttr_score{
                    position: absolute;
                    margin: auto;
                    margin-left: -60px;
                    left: 0;
                    bottom: 28px;
                    min-width: 120px;
                    height: 48px;
                    background: url(../../assets/images/news/tuli.png) no-repeat center;
                    background-size: 100% 100%;
                    // box-shadow: 0 2px 10px 0 #DDDFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #737AFD;
                    i{
                      width: 0;
                      height: 0;
                      border-left: 8px solid transparent;
                      border-right: 8px solid transparent;
                      border-bottom: 8px solid #ffffff;
                      position: absolute;
                      margin: auto;
                      left: 0;
                      right: 0;
                      bottom: -7px;
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
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #6F76B2;
                  }
                }
                .wdrj_l_right{
                  font-family: PingFangSC, PingFang SC;
                  font-weight: 400;
                  font-size: 24px;
                  color: #6F76B2;
                }
              }
              .dtmsb_tar {
                width: 825px;
                height: 266px;
                margin: -30px auto 24px;
                position: relative;
                ol.dtmsb_tu{
                  margin: 0;
                  padding: 0;
                  li{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    margin: 14px 0;
                    img{
                      width: 32px;
                      height: 32px;
                      margin-right: 8px;
                    }
                    span{
                      font-family: SourceHanSansCN, SourceHanSansCN;
                      font-weight: 400;
                      font-size: 24px;
                      color: #333E75;
                      margin-top: -3px;
                    }
                  }
                }
                .top_top {
                  position: absolute;
                  margin: auto;
                  left: 0;
                  right: 0;
                  top: 22px;
                  width: 413px;
                  .tt_txt {
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 20px;
                    color: #6F76B2;
                    line-height: 20px;
                    display: block;
                    position: relative;
                  }
                }
                .bottom_left {
                  position: absolute;
                  margin: auto;
                  left: 370px;
                  bottom: 3px;
                  width: 413px;
                  .tt_txt {
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 20px;
                    color: #6F76B2;
                    line-height: 20px;
                    display: block;
                    position: relative;
                  }
                }
                .bottom_right {
                  position: absolute;
                  margin: auto;
                  left: 42px;
                  bottom: 3px;
                  width: 413px;
                  .tt_txt {
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 20px;
                    color: #6F76B2;
                    line-height: 20px;
                    display: block;
                    position: relative;
                  }
                }
                .dengpao{
                  width: 312px;
                  height: 307px;
                  margin:0 auto;
                }
                .demsb_tool1 {
                  position: absolute;
                  margin: auto;
                  right: 250px;
                  top: -8px;
                  width: auto;
                  min-width: 65px;
                  height: 34px;
                  background: url(../../assets/images/report/exmaple.png) no-repeat
                    center;
                  background-size: 100% 100%;
                  text-align: left;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  .demsb_score {
                    font-size: 16px;
                    padding-left: 14px;
                    padding-right: 20px;
                    line-height: 34px;
                    color: #7486af;
                    display: flex;
                    span {
                      margin-left: -8px;
                      color: #00c0ff;
                    }
                  }
                  .demsb_score1 {
                    span {
                      margin-left: -26px;
                      color: #016cff;
                    }
                  }
                }
                .demsb_tool {
                  position: absolute;
                  margin: auto;
                  left: 250px;
                  top: -8px;
                  width: auto;
                  min-width: 65px;
                  height: 34px;
                  background: url(../../assets/images/report/exmaple2.png) no-repeat
                    center;
                  background-size: 100% 100%;
                  text-align: left;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;

                  .demsb_score {
                    font-size: 16px;
                    padding-left: 20px;
                    padding-right: 14px;
                    line-height: 34px;
                    color: #7486af;
                    display: flex;
                    span {
                      margin-left: -8px;
                      color: #00c0ff;
                    }
                  }
                  .demsb_score1 {
                    span {
                      margin-left: -26px;
                      color: #016cff;
                    }
                  }
                }
                ul {
                  position: absolute;
                  margin: auto;
                  left: 0;
                  right: 0;
                  bottom: -32px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  li {
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    span {
                      font-size: 16px;
                      font-family: Source Han Sans CN;
                      font-weight: 400;
                      color: #7786ac;
                    }
                    span:first-child {
                      margin-right: 6px;
                      width: 8px;
                      height: 8px;
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
                  width: 826px;
                  height: 266px;
                }
                .dtmsb_ulc {
                  position: absolute;
                  margin: auto;
                  left: 0;
                  right: 0;
                  bottom: -54px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  li {
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    img {
                      width: 260px;
                      height: auto;
                    }
                    span {
                      font-size: 16px;
                      font-family: Source Han Sans CN;
                      font-weight: 400;
                      color: #7786ac;
                    }
                    span:first-child {
                      margin-right: 6px;
                      width: 8px;
                      height: 8px;
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
                margin-top: 50px;
                text-align: left;
                background: url(../../assets/images/news/sys_bg.png) no-repeat
                  center;
                background-size: 100% 100%;
                padding: 16px 26px;
                .wdrjs_uls{
                  padding-left: 0;
                  li{
                    display: flex;
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #354B70;
                    line-height: 40px;
                    span {
                      margin-top: 12px;
                      margin-right: 10px;
                      text-align: center;
                      line-height: 16px;
                      width: 16px;
                      height: 16px;
                      background: linear-gradient(177deg, #1becff, #00c6ff);
                      border-radius: 50%;
                      font-size: 12px;
                      font-family: Source Han Sans CN;
                      font-weight: bold;
                      color: #ffffff;
                    }
                    p {
                      line-height: 44px;
                      font-family: SourceHanSansCN, SourceHanSansCN;
                      font-weight: 400;
                      font-size: 24px;
                      color: #333E75;
                      display: flex;
                      align-items: center;
                      span{
                        width: 8px;
                        height: 8px;
                        border: 2px solid #333E75;
                        border-radius: 50%;
                        margin: 0;
                        margin-right: 5px;
                        line-height: unset;
                        background: transparent;
                        display: inline-block;
                      }
                    }
                    img{
                      width: 16px;
                      height: 16px;
                      margin-right: 6px;
                      margin-top: 12px;
                    }
                  }
                }
                .wdrjs_title {
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 28px;;
                  color: #333E75;
                  display: flex;
                  align-items: center;
                  line-height: 48px;
                  margin-left: 3px;
                  img {
                    width: 12px;
                    height: 12px;
                    margin-right: 6px;
                  }
                  .wdrjst_res {
                    display: flex;
                    align-items: center;
                    img {
                      width: 19px;
                      height: 22px;
                      margin-right: 6px;
                      margin-left: 20px;
                    }
                    .wdrjstr_txt {
                      font-size: 18px;
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
                  border: 1px solid #ffe100;
                  border-radius: 2px;
                  padding: 0 10px;
                  margin: 15px 15px 0;
                  min-height: 42px;
                  img {
                    width: 32px;
                    height: 34px;
                    margin-top: 10px;
                  }
                  p {
                    text-align: left;
                    padding-left: 0;
                    flex: 1;
                    font-size: 16px;
                    span {
                      color: #ff7e00;
                    }
                  }
                }
                .wdrjst_res1 {
                  display: flex;
                  align-items: center;
                  padding: 0 15px;
                  margin: 30px 0 10px;
                  line-height: 26px;
                  img {
                    width: 19px;
                    height: 22px;
                    margin-right: 6px;
                  }
                  span {
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #354b70;
                  }
                  .wdrjstr_txt {
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #FE5FB8;
                  }
                }
                .wdrjst_del {
                  padding: 24px;
                  line-height: 39px;
                  font-size: 18px;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: #354b70;
                  text-align: left;
                  .pd24 {
                    padding-left: 24px;
                    font-size: 16px;
                  }
                  div {
                    line-height: 39px;
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #354b70;
                    img {
                      width: 16px;
                      height: 12px;
                      margin-right: 8px;
                    }
                  }
                  ul {
                    li {
                      font-size: 14px;
                      font-family: Source Han Sans CN;
                      font-weight: 400;
                      color: #354b70;
                      display: flex;
                      img {
                        width: 6px;
                        height: 6px;
                        margin-right: 10px;
                        margin-top: 16px;
                      }
                    }
                  }
                }
                .wdrjst_del1 {
                  width: 1082px;
                  background: url(../../assets/images/report/h_bg1.png) no-repeat top
                    left;
                  background-size: 100% 100%;
                  margin-left: 30px;
                }
                .wdrjst_del2 {
                  width: 1082px;
                  background: url(../../assets/images/report/h_bg2.png) no-repeat top
                    left;
                  background-size: 100% 100%;
                  margin-left: 30px;
                }
                .gb_contain {
                  text-align: left;
                  padding: 10px 25px;
                  p {
                    padding: 6px 0 6px;
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #354b70;
                    display: flex;
                    align-items: flex-start;
                    img {
                      width: 4px;
                      height: 18px;
                      margin-top: 2px;
                      margin-right: 6px;
                    }
                  }
                  ul {
                    li {
                      display: flex;
                      line-height: 36px;
                      span {
                        margin-top: 9px;
                        margin-right: 8px;
                        text-align: center;
                        line-height: 16px;
                        width: 16px;
                        height: 16px;
                        background: linear-gradient(177deg, #1becff, #00c6ff);
                        border-radius: 50%;
                        font-size: 12px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #ffffff;
                        border: 1px solid #00c6ff;
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
              .wdrj_sugers{
                background: transparent;
                margin-top: 24px;
                border: 1px solid #333E75;
              }
              .wdrj_suger1 {
                margin-top: 10px;
              }
              .wm_text{
                text-align: center;
                padding: 0;
                margin: 16px 0 16px;
                word-break: break-all;
                .el-button {
                  margin-top: 16px;
                  border: 1px solid #dcdfe6;
                  padding: 9px 27px;
                  font-size: 16px;
                  border-radius: 4px;

                  color: #ffffff;
                  background: linear-gradient(263deg, #00c2ff, #0075ff);
                  box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
                }
                .primary1{
                  color: #0075ff;
                  border: 1px solid #0075ff !important;
                  background: linear-gradient(263deg, #ffffff, #ffffff);
                  box-shadow: 0px 3px 18px 0px rgba(250, 250, 250, 0.19);
                }
                .el-textarea{
                  font-size: 16px;
                  height: 100%;
                  .el-textarea__inner{
                    resize: none;
                    font-size: 16px;
                    color: #354B70;
                    height: 100%;
                    padding: 12px 15px 12px !important;
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
        .myChartBox{
          position: relative;
          margin: 20px auto 0px;
          .dtmcl_chart {
            position: relative;
            .dtmcl_c_nor{
              width: 385px;
              height: 385px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 auto;
              border-radius: 50%;
              border: 40px solid #82df95;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 500;
              font-size: 80px;
              color: #82df95;
            }
          }
          .myChartTips{
            position: absolute;
            top: 76px;
            left: 0;
            right: 0;
            p{
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #5E6C87;
            }
            p:last-child{
              font-size: 20px;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #006cff;
            }
            p.c_red{
              color: rgba(255, 42, 84, 1);
            }
          }
          .myChartLab{
            display: flex;
            justify-content: center;
            .mcl_span{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #7E87A1;
              margin: 0 14px;
              span{
                display: inline-block;
                width: 8px;
                height: 8px;
                background: linear-gradient(90deg, #BABFFF, #7279FF);
                border-radius: 50%;
                margin-right: 8px;
              }
            }
            .mcl_span1{
              span{
                background: linear-gradient(91deg, #4DFBFF, #00CCFF);
              }
            }
          }
        }
        .gp2_li {
          margin-bottom: 16px;
          .gp2l_head {
            display: flex;
            align-items: center;
            margin-top: 50px;
            img {
              width: 34px;
              height: 37px;
            }
            span {
              // margin-left: 10px;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 500;
              font-size: 28px;
              color: #333E75;
            }
          }
          .gp2l_body {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 20px;
            img {
              margin-top: 6px;
              margin-left: 25px;
              width: 4px;
              height: 18px;
              background: linear-gradient(180deg, #babfff, #7279ff);
            }
            .gp2lb_txt {
              line-height: 30px;
              margin-left: 15px;
              font-size: 20px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #394b6d;
              text-align: left;
              .gp2lb_num {
                color: #5983f7;
              }
              .gp3lb_num {
                color: #ED6BB5;
              }
              .gp4lb_num {
                color: #00A5FF;
              }
            }
          }
        }
        .dtmcl_sbox{
          display: flex;
          margin-top: 18px;
          .dtmcl_sb_t{
            width: auto;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 500;
            font-size: 24px;
            color: #333E75;
          }
          .dtmcl_sb_c{
            flex: 1;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 400;
            font-size: 24px;
            color: #333E75;
            text-align: left;
            ul {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              li{
                width: 33.33%;
                display: flex;
                align-items: center;
                margin-bottom: 14px;
                span{
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 400;
                  font-size: 24px;
                  color: #333E75;
                }
                img {
                  width: 80px;
                  height: 24px;
                  margin-left: 6px;
                }
              }
            }
            div{
              width: 100%;
              font-family: SourceHanSansCN, SourceHanSansCN;
              font-weight: 400;
              font-size: 24px;
              color: #333E75;
            }
          }
        }
        .dtmcl_stip{
          display: flex;
          align-items: center;
          margin-top: 10px;
          span{
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: 400;
            font-size: 24px;
            color: #333E75;
          }
          img{
            width: 24px;
            height: 24px;
            margin: 0 3px 0 0;
          }
        }
        .gp2b_tips{
          display: flex;
          align-items: center;
          img{
            width: 22px;
            height: 26px;
            margin-left: 46px;
            margin-right: 10px;
          }
          span{
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: 400;
          }
          p{
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #394B6D;
            line-height: 26px;
            span{
              font-size: 20px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #ED6BB5;
            }
            label{
              font-size: 20px;
            }
            .gp2bt_c{
              color: #52BEF9;
            }
          }
          p.c_o_my_num{
            color: #006cff;
          }
          p.c_red{
            color: rgba(255, 42, 84, 1);
          }
        }
        .dtmcl_txt{
          text-align: left;
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #394B6D;
          margin-left: 82px;
          margin-top: 10px;
        }
        .gp_warn{
          margin: 0 auto;
          .dtmc_r_biao{
            width: 100%;
            ul {
              width: 100%;
              border: 1px solid rgba(166, 172, 204, 1);
              border-bottom: 0;
              border-right: 0;
              // display: flex;
              li {
                width: 100%;
                display: flex;

                div{
                  flex: 1;
                  text-align: center;
                  font-family: PingFangSC, PingFang SC;
                  font-weight: 400;
                  font-size: 20px;
                  color: #2A3487;
                  border: 1px solid rgba(166, 172, 204, 1);
                  border-left: 0;
                  border-top: 0;
                  padding: 14px 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span{
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 20px;
                    color: #333E75;
                  }
                  img{
                    width: 80px;
                    height: 24px;
                  }
                }
              }
              li:nth-child(1) {
                div{
                  font-family: SourceHanSansCN, SourceHanSansCN;
                  font-weight: 500;
                  font-size: 20px;
                  padding: 18px 0;
                }
              }
            }
          }
        }
      }
    }
  }
  
.group_02 {
  background: linear-gradient(214deg, rgba(232, 220, 252, 0.3), rgba(252, 243, 254, 0.3));
  .gp2_top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0 45px 0;
    img {
      width: 132px;
      height: 127px;
    }
    .gp2_t_txt {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 36px;
      color: #2A3487;
      margin: 0 14px;
    }
    .gp2_t_eng {
      font-size: 30px;
      font-family: Montserrat;
      font-weight: bold;
      color: #7986a9;
    }
  }
  .gp2Cbox{
    text-align: left;
    margin-left: 78px;
    margin-top: 16px;
    margin-bottom: 0;
    .dtmcl_du {
      display: flex;
      align-items: center;
      padding: 0 0;
      img {
        width: 26px;
        height: 26px;
        margin-right:6px;
      }
      span {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5b6c89;
        line-height: 1;
      }
      .dtmcl_tx {
        color: #00c0ff;
      }
    }
    .dtmcl_du2 {
      margin-bottom: 12px;
      img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
    }
  }
  .gp2_box{
    margin: 0 auto;
    width: 1060px;
    padding: 50px;
    text-align: left;
    background: #FFFFFF;
    box-shadow: 0px 13px 43px 0px rgba(76, 100, 132, 0.1);
    border-radius: 4px;
    p{
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #394B6D;
      line-height: 36px;
      text-indent: 40px;
      margin-bottom: 30px;
    }
    .gp2b_tips{
      display: flex;
      align-items: center;
      img{
        width: 22px;
        height: 26px;
        margin-right: 10px;
      }
      span{
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FF8682;
      }
    }
  }
}
.myChart {
  display: flex;
  justify-content: center;
  width: 385px;
  height: 385px;
  margin: 0 auto;
}
</style>
