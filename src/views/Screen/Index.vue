<template>
  <div class="heart_view_wrap">
    <div class="hv_box">
      <div class="hv_main">
        <div class="hvm_left">
          <div class="hvml_box">
            <div class="hvml_b_head">测评结果分布</div>
            <img
              class="hvml_b_bg"
              src="../../assets/images/heart/hv_bg.png"
              alt=""
            />
            <div class="hvml_main">
              <div class="hvml_tain">
                <div class="t_one">
                  <img
                    class="to_img"
                    src="../../assets/images/heart/icon1.png"
                    alt=""
                  />
                  <div class="to_type i_col1">正常</div>
                  <div class="to_num">
                    <span>{{ normalNum }}</span
                    >人
                  </div>
                </div>
                <div class="t_one">
                  <img
                    class="to_img"
                    src="../../assets/images/heart/icon2.png"
                    alt=""
                  />
                  <div class="to_type i_col2">轻度预警</div>
                  <div class="to_num">
                    <span>{{ mildNum }}</span
                    >人
                  </div>
                </div>
                <div class="t_one">
                  <img
                    class="to_img"
                    src="../../assets/images/heart/icon3.png"
                    alt=""
                  />
                  <div class="to_type i_col3">中度预警</div>
                  <div class="to_num">
                    <span>{{ moderateNum }}</span
                    >人
                  </div>
                </div>
                <div class="t_one">
                  <img
                    class="to_img"
                    src="../../assets/images/heart/icon4.png"
                    alt=""
                  />
                  <div class="to_type i_col4">重度预警</div>
                  <div class="to_num">
                    <span>{{ severeNum }}</span
                    >人
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hvml_box">
            <div class="hvml_b_head">预警指标分布</div>
            <img
              class="hvml_b_bg"
              src="../../assets/images/heart/hv_bg.png"
              alt=""
            />
            <div class="hvml_main">
              <div class="tv_ec">
                <div class="tv_ec_head">
                  <div class="center_pie" style="justify-content: center;">
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp0"></span>
                      抑郁
                      <!-- &nbsp;<span class="c_thpt0">{{ pieList[0].value}}%</span> -->
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp1"></span>
                      焦虑
                      <!-- &nbsp;<span class="c_thpt1">{{ pieList[1].value}}%</span> -->
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp2"></span>
                      强迫
                      <!-- &nbsp;<span class="c_thpt2">{{ pieList[2].value}}%</span> -->
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp3"></span>
                      自我伤害
                      <!-- &nbsp;<span class="c_thpt3">{{ pieList[3].value}}%</span> -->
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp4"></span>
                      敌对
                      <!-- &nbsp;<span class="c_thpt4">{{ pieList[4].value}}%</span> -->
                    </div>
                  </div>
                </div>
                <div class="myChartPie" id="myChartPie" ref="myChartPie"></div>
              </div>
            </div>
          </div>
          <div class="hvml_box">
            <div class="hvml_b_head" style="left: 1.3rem;">预警因子</div>
            <img
              class="hvml_b_bg"
              src="../../assets/images/heart/hv_bg.png"
              alt=""
            />
            <div class="hvml_main">
              <div class="hvm_m_ball">
                <div class="tv_ec">
                  <div class="tv_ec_head">
                    <div class="center_pie" style="justify-content: center;">
                      <div class="c_pie_li c_pie_liq">
                        <span class="c_pie_th c_thq1"></span>
                        0-9次
                      </div>
                      <div class="c_pie_li c_pie_liq">
                        <span class="c_pie_th c_thq2"></span>
                        10-49次
                      </div>
                      <div class="c_pie_li c_pie_liq">
                        <span class="c_pie_th c_thq3"></span>
                        50-99次
                      </div>
                      <div class="c_pie_li c_pie_liq">
                        <span class="c_pie_th c_thq4"></span>
                        ≥100次
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <block v-for="item in fiveList" :key="item.index">
                  <block v-for="items in item.list" :key="items.frame"></block> -->
                <el-tooltip
                  effect="light"
                  placement="top"
                  v-for="(items, indexs) in fiveList"
                  :key="items.frame"
                >
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span
                        :class="[
                          'c_pie_th',
                          items.value < 10 ? 'c_thq1' : '',
                          items.value > 9 && items.value < 50 ? 'c_thq2' : '',
                          items.value > 49 && items.value < 100 ? 'c_thq3' : '',
                          items.value > 99 ? 'c_thq4' : ''
                        ]"
                      ></span>
                      <span>{{ items.name }}：</span>
                      <span>{{ items.value }}次</span>
                    </div>
                  </div>
                  <div
                    :class="[
                      'wddw',
                      'wddw' + indexs,
                      items.value < 10 ? 'level_bg1' : '',
                      items.value > 9 && items.value < 50 ? 'level_bg2' : '',
                      items.value > 49 && items.value < 100 ? 'level_bg3' : '',
                      items.value > 99 ? 'level_bg4' : ''
                    ]"
                    style="cursor: pointer"
                  >
                    <div
                      :style="{
                        'font-size': items.size / 100 + 'rem'
                      }"
                    >
                      {{ items.name }}
                    </div>
                  </div>
                </el-tooltip>
                <!-- </block>
                </block> -->
                <!-- <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.swch < 10 ? 'c_thq1' : '', warningFactor.swch > 9 && warningFactor.swch < 50 ? 'c_thq2' : '',  warningFactor.swch > 49 && warningFactor.swch < 100 ? 'c_thq3' : '', warningFactor.swch > 99 ? 'c_thq4' : '']"></span>
                      <span>思维迟缓：</span>
                      <span>{{ warningFactor.swch }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'yy_swch', warningFactor.swch < 10 ? 'level_bg1' : '', warningFactor.swch > 9 && warningFactor.swch < 50 ? 'level_bg2' : '',  warningFactor.swch > 49 && warningFactor.swch < 100 ? 'level_bg3' : '', warningFactor.swch > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">思维</div>
                    <div class="level_txt">迟缓</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.jlqf < 10 ? 'c_thq1' : '', warningFactor.jlqf > 9 && warningFactor.jlqf < 50 ? 'c_thq2' : '',  warningFactor.jlqf > 49 && warningFactor.jlqf < 100 ? 'c_thq3' : '', warningFactor.jlqf > 99 ? 'c_thq4' : '']"></span>
                      <span>精力缺乏：</span>
                      <span>{{ warningFactor.jlqf }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'yy_jlqf', warningFactor.jlqf < 10 ? 'level_bg1' : '', warningFactor.jlqf > 9 && warningFactor.jlqf < 50 ? 'level_bg2' : '',  warningFactor.jlqf > 49 && warningFactor.jlqf < 100 ? 'level_bg3' : '', warningFactor.jlqf > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">精力</div>
                    <div class="level_txt">缺乏</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.xjyq < 10 ? 'c_thq1' : '', warningFactor.xjyq > 9 && warningFactor.xjyq < 50 ? 'c_thq2' : '',  warningFactor.xjyq > 49 && warningFactor.xjyq < 100 ? 'c_thq3' : '', warningFactor.xjyq > 99 ? 'c_thq4' : '']"></span>
                      <span>消极预期：</span>
                      <span>{{ warningFactor.xjyq }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'jl_xjyq', warningFactor.xjyq < 10 ? 'level_bg1' : '', warningFactor.xjyq > 9 && warningFactor.xjyq < 50 ? 'level_bg2' : '',  warningFactor.xjyq > 49 && warningFactor.xjyq < 100 ? 'level_bg3' : '', warningFactor.xjyq > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">消极</div>
                    <div class="level_txt">预期</div>
                  </div>
                </el-tooltip>
                
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.yjr < 10 ? 'c_thq1' : '', warningFactor.yjr > 9 && warningFactor.yjr < 50 ? 'c_thq2' : '',  warningFactor.yjr > 49 && warningFactor.yjr < 100 ? 'c_thq3' : '', warningFactor.yjr > 99 ? 'c_thq4' : '']"></span>
                      <span>易激怒：</span>
                      <span>{{ warningFactor.yjr }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'jl_yjn', warningFactor.yjr < 10 ? 'level_bg1' : '', warningFactor.yjr > 9 && warningFactor.yjr < 50 ? 'level_bg2' : '',  warningFactor.yjr > 49 && warningFactor.yjr < 100 ? 'level_bg3' : '', warningFactor.yjr > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_s">易激怒</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.hkba < 10 ? 'c_thq1' : '', warningFactor.hkba > 9 && warningFactor.hkba < 50 ? 'c_thq2' : '',  warningFactor.hkba > 49 && warningFactor.hkba < 100 ? 'c_thq3' : '', warningFactor.hkba > 99 ? 'c_thq4' : '']"></span>
                      <span>惶恐不安：</span>
                      <span>{{ warningFactor.hkba }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'jl_hkba', warningFactor.hkba < 10 ? 'level_bg1' : '', warningFactor.hkba > 9 && warningFactor.hkba < 50 ? 'level_bg2' : '',  warningFactor.hkba > 49 && warningFactor.hkba < 100 ? 'level_bg3' : '', warningFactor.hkba > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">惶恐</div>
                    <div class="level_txt">不安</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.qpxw < 10 ? 'c_thq1' : '', warningFactor.qpxw > 9 && warningFactor.qpxw < 50 ? 'c_thq2' : '',  warningFactor.qpxw > 49 && warningFactor.qpxw < 100 ? 'c_thq3' : '', warningFactor.qpxw > 99 ? 'c_thq4' : '']"></span>
                      <span>强迫行为：</span>
                      <span>{{ warningFactor.qpxw }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'qp_qpxw', warningFactor.qpxw < 10 ? 'level_bg1' : '', warningFactor.qpxw > 9 && warningFactor.qpxw < 50 ? 'level_bg2' : '',  warningFactor.qpxw > 49 && warningFactor.qpxw < 100 ? 'level_bg3' : '', warningFactor.qpxw > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">强迫</div>
                    <div class="level_txt">行为</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.qpsw < 10 ? 'c_thq1' : '', warningFactor.qpsw > 9 && warningFactor.qpsw < 50 ? 'c_thq2' : '',  warningFactor.qpsw > 49 && warningFactor.qpsw < 100 ? 'c_thq3' : '', warningFactor.qpsw > 99 ? 'c_thq4' : '']"></span>
                      <span>强迫思维：</span>
                      <span>{{ warningFactor.qpsw }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'qp_qpsw', warningFactor.qpsw < 10 ? 'level_bg1' : '', warningFactor.qpsw > 9 && warningFactor.qpsw < 50 ? 'level_bg2' : '',  warningFactor.qpsw > 49 && warningFactor.qpsw < 100 ? 'level_bg3' : '', warningFactor.qpsw > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">强迫</div>
                    <div class="level_txt">思维</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.dkqp < 10 ? 'c_thq1' : '', warningFactor.dkqp > 9 && warningFactor.dkqp < 50 ? 'c_thq2' : '',  warningFactor.dkqp > 49 && warningFactor.dkqp < 100 ? 'c_thq3' : '', warningFactor.dkqp > 99 ? 'c_thq4' : '']"></span>
                      <span>对抗强迫：</span>
                      <span>{{ warningFactor.dkqp }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'qp_dkqp', warningFactor.dkqp < 10 ? 'level_bg1' : '', warningFactor.dkqp > 9 && warningFactor.dkqp < 50 ? 'level_bg2' : '',  warningFactor.dkqp > 49 && warningFactor.dkqp < 100 ? 'level_bg3' : '', warningFactor.dkqp > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">对抗</div>
                    <div class="level_txt">强迫</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.rjgd < 10 ? 'c_thq1' : '', warningFactor.rjgd > 9 && warningFactor.rjgd < 50 ? 'c_thq2' : '',  warningFactor.rjgd > 49 && warningFactor.rjgd < 100 ? 'c_thq3' : '', warningFactor.rjgd > 99 ? 'c_thq4' : '']"></span>
                      <span>人际孤独：</span>
                      <span>{{ warningFactor.rjgd }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'zw_rjgd', warningFactor.rjgd < 10 ? 'level_bg1' : '', warningFactor.rjgd > 9 && warningFactor.rjgd < 50 ? 'level_bg2' : '',  warningFactor.rjgd > 49 && warningFactor.rjgd < 100 ? 'level_bg3' : '', warningFactor.rjgd > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">人际</div>
                    <div class="level_txt">孤独</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.yycd < 10 ? 'c_thq1' : '', warningFactor.yycd > 9 && warningFactor.yycd < 50 ? 'c_thq2' : '',  warningFactor.yycd > 49 && warningFactor.yycd < 100 ? 'c_thq3' : '', warningFactor.yycd > 99 ? 'c_thq4' : '']"></span>
                      <span>抑郁程度：</span>
                      <span>{{ warningFactor.yycd }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'zw_yycd', warningFactor.yycd < 10 ? 'level_bg1' : '', warningFactor.yycd > 9 && warningFactor.yycd < 50 ? 'level_bg2' : '',  warningFactor.yycd > 49 && warningFactor.yycd < 100 ? 'level_bg3' : '', warningFactor.yycd > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">抑郁</div>
                    <div class="level_txt">程度</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.csjl < 10 ? 'c_thq1' : '', warningFactor.csjl > 9 && warningFactor.csjl < 50 ? 'c_thq2' : '',  warningFactor.csjl > 49 && warningFactor.csjl < 100 ? 'c_thq3' : '', warningFactor.csjl > 99 ? 'c_thq4' : '']"></span>
                      <span>创伤经历：</span>
                      <span>{{ warningFactor.csjl }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'zw_csjl', warningFactor.csjl < 10 ? 'level_bg1' : '', warningFactor.csjl > 9 && warningFactor.csjl < 50 ? 'level_bg2' : '',  warningFactor.csjl > 49 && warningFactor.csjl < 100 ? 'level_bg3' : '', warningFactor.csjl > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">创伤</div>
                    <div class="level_txt">经历</div>
                  </div>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.cdx < 10 ? 'c_thq1' : '', warningFactor.cdx > 9 && warningFactor.cdx < 50 ? 'c_thq2' : '',  warningFactor.cdx > 49 && warningFactor.cdx < 100 ? 'c_thq3' : '', warningFactor.cdx > 99 ? 'c_thq4' : '']"></span>
                      <span>冲动性：</span>
                      <span>{{ warningFactor.cdx }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'dd_cdx', warningFactor.cdx < 10 ? 'level_bg1' : '', warningFactor.cdx > 9 && warningFactor.cdx < 50 ? 'level_bg2' : '',  warningFactor.cdx > 49 && warningFactor.cdx < 100 ? 'level_bg3' : '', warningFactor.cdx > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_s">冲动性</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.wgzg < 10 ? 'c_thq1' : '', warningFactor.wgzg > 9 && warningFactor.wgzg < 50 ? 'c_thq2' : '',  warningFactor.wgzg > 49 && warningFactor.wgzg < 100 ? 'c_thq3' : '', warningFactor.wgzg > 99 ? 'c_thq4' : '']"></span>
                      <span>无规规感：</span>
                      <span>{{ warningFactor.wgzg }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'dd_wgzg', warningFactor.wgzg < 10 ? 'level_bg1' : '', warningFactor.wgzg > 9 && warningFactor.wgzg < 50 ? 'level_bg2' : '',  warningFactor.wgzg > 49 && warningFactor.wgzg < 100 ? 'level_bg3' : '', warningFactor.wgzg > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_t">无规</div>
                    <div class="level_txt">规感</div>
                  </div>
                </el-tooltip>

                <el-tooltip effect="light" placement="top">
                  <div slot="content">
                    <div class="top_title">预警因子</div>
                    <div class="c_pies">
                      <span :class="['c_pie_th', warningFactor.dy < 10 ? 'c_thq1' : '', warningFactor.dy > 9 && warningFactor.dy < 50 ? 'c_thq2' : '',  warningFactor.dy > 49 && warningFactor.dy < 100 ? 'c_thq3' : '', warningFactor.dy > 99 ? 'c_thq4' : '']"></span>
                      <span>敌意：</span>
                      <span>{{ warningFactor.dy }}次</span>
                    </div>
                  </div>
                  <div :class="['hvm_mb_bg', 'dd_dy', warningFactor.dy < 10 ? 'level_bg1' : '', warningFactor.dy > 9 && warningFactor.dy < 50 ? 'level_bg2' : '',  warningFactor.dy > 49 && warningFactor.dy < 100 ? 'level_bg3' : '', warningFactor.dy > 99 ? 'level_bg4' : '']">
                    <div class="level_txt level_txt_s">敌意</div>
                  </div>
                </el-tooltip> -->
              </div>
            </div>
          </div>
        </div>
        <div class="hvm_left">
          <div class="hvml_img">
            <div class="lib_boxz">
              <div class="lib_b_lizi"></div>
            </div>

            <img
              class="img0 img1"
              src="../../assets/images/heart/bottom1.png"
              alt=""
            />

            <img
              class="img0 img2"
              src="../../assets/images/heart/bottom2.png"
              alt=""
            />

            <img
              class="img0 img3"
              src="../../assets/images/heart/bottom3.png"
              alt=""
            />
            <img
              class="img0 img4"
              src="../../assets/images/heart/bottom4.png"
              alt=""
            />

            <div class="hvml_total">
              <div class="hvml_t_head">
                <ul>
                  <li>总</li>
                  <li>体</li>
                  <li>概</li>
                  <li>况</li>
                </ul>
              </div>
              <div class="hvml_t_mian">
                <ol>
                  <li>
                    <div style="margin-top:1.2rem">
                      <span>{{ participationNum }}人</span>
                      <p>参与测评</p>
                    </div>
                    <img
                      class=""
                      src="../../assets/images/heart/bottom4.png"
                      alt=""
                    />
                  </li>
                  <li style="margin: 0 0.5rem;">
                    <div>
                      <span>{{ evaluationCount }}次</span>
                      <p>累计测评</p>
                    </div>
                    <img
                      class="img11"
                      src="../../assets/images/heart/bottom4.png"
                      alt=""
                    />
                  </li>
                  <li>
                    <div style="margin-top:1.2rem">
                      <span>{{ warningNum }}次</span>
                      <p>风险预警</p>
                    </div>
                    <img
                      class="img22"
                      src="../../assets/images/heart/bottom4.png"
                      alt=""
                    />
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div class="hvml_box">
            <div class="hvml_b_head">人格特征分布</div>
            <img
              class="hvml_b_bg"
              src="../../assets/images/heart/hv_bg.png"
              alt=""
            />
            <div class="hvml_main">
              <div class="hvml_person">
                <div class="center_p_per" style="justify-content: center;">
                  <div class="c_pie_li">
                    <span class="c_pie_th c_ths0"></span>
                    低
                  </div>
                  <div class="c_pie_li">
                    <span class="c_pie_th c_ths1"></span>
                    高
                  </div>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name">反社会</div>

                  <el-tooltip effect="light" placement="top">
                    <div slot="content">
                      <div class="top_title">反社会</div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq11"></span>
                        <span>低：</span>
                        <span>{{ warningFactor.fshPerctLowNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.fshPerctLowPer }}%</span
                        >
                      </div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq12"></span>
                        <span>高：</span>
                        <span>{{ warningFactor.fshPerctHeighNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.fshPerctHeighPer }}%</span
                        >
                      </div>
                    </div>
                    <div class="huml_pl_box">
                      <div
                        class="huml_plb_left"
                        :style="{
                          width: warningFactor.fshPerctLow * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.fshPerct !== 1"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.fshPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.fshPerct !== 1"
                          class="huml_plb_t"
                        ></div>
                      </div>
                      <div
                        class="huml_plb_right"
                        :style="{
                          width: warningFactor.fshPerctHeigh * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.fshPerct !== 0"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.fshPerct !== 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.fshPerct !== 0"
                          class="huml_plb_t"
                        ></div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name">完美主义</div>
                  <el-tooltip effect="light" placement="top">
                    <div slot="content">
                      <div class="top_title">完美主义</div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq11"></span>
                        <span>低：</span>
                        <span>{{ warningFactor.wmzyPerctLowNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.wmzyPerctLowPer }}%</span
                        >
                      </div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq12"></span>
                        <span>高：</span>
                        <span>{{ warningFactor.wmzyPerctHeighNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.wmzyPerctHeighPer }}%</span
                        >
                      </div>
                    </div>
                    <div class="huml_pl_box">
                      <div
                        class="huml_plb_left"
                        :style="{
                          width: warningFactor.wmzyPerctLow * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.wmzyPerct !== 1"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.wmzyPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.wmzyPerct !== 1"
                          class="huml_plb_t"
                        ></div>
                      </div>
                      <div
                        class="huml_plb_right"
                        :style="{
                          width: warningFactor.wmzyPerctHeigh * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.wmzyPerct !== 0"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.wmzyPerct !== 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.wmzyPerct !== 0"
                          class="huml_plb_t"
                        ></div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name">攻击性</div>
                  <el-tooltip effect="light" placement="top">
                    <div slot="content">
                      <div class="top_title">攻击性</div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq11"></span>
                        <span>低：</span>
                        <span>{{ warningFactor.gjxPerctLowNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.gjxPerctLowPer }}%</span
                        >
                      </div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq12"></span>
                        <span>高：</span>
                        <span>{{ warningFactor.gjxPerctHeighNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.gjxPerctHeighPer }}%</span
                        >
                      </div>
                    </div>
                    <div class="huml_pl_box">
                      <div
                        class="huml_plb_left"
                        :style="{
                          width: warningFactor.gjxPerctLow * 4 + 'rem'
                        }"
                      >
                        <!-- {{warningFactor.gjxPerct == 0}} -->
                        <div
                          v-if="warningFactor.gjxPerct !== 1"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.gjxPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.gjxPerct !== 1"
                          class="huml_plb_t"
                        ></div>
                      </div>
                      <div
                        class="huml_plb_right"
                        :style="{
                          width: warningFactor.gjxPerctHeigh * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.gjxPerct !== 0"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.gjxPerct !== 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.gjxPerct !== 0"
                          class="huml_plb_t"
                        ></div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name">自恋</div>
                  <el-tooltip effect="light" placement="top">
                    <div slot="content">
                      <div class="top_title">自恋</div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq11"></span>
                        <span>低：</span>
                        <span>{{ warningFactor.zlPerctLowNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.zlPerctLowPer }}%</span
                        >
                      </div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq12"></span>
                        <span>高：</span>
                        <span>{{ warningFactor.zlPerctHeighNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.zlPerctHeighPer }}%</span
                        >
                      </div>
                    </div>
                    <div class="huml_pl_box">
                      <div
                        class="huml_plb_left"
                        :style="{ width: warningFactor.zlPerctLow * 4 + 'rem' }"
                      >
                        <div
                          v-if="warningFactor.zlPerct !== 1"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.zlPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.zlPerct !== 1"
                          class="huml_plb_t"
                        ></div>
                      </div>
                      <div
                        class="huml_plb_right"
                        :style="{
                          width: warningFactor.zlPerctHeigh * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.zlPerct !== 0"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.zlPerct !== 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.zlPerct !== 0"
                          class="huml_plb_t"
                        ></div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name">边缘</div>
                  <el-tooltip effect="light" placement="top">
                    <div slot="content">
                      <div class="top_title">边缘</div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq11"></span>
                        <span>低：</span>
                        <span>{{ warningFactor.byPerctLowNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.byPerctLowPer }}%</span
                        >
                      </div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq12"></span>
                        <span>高：</span>
                        <span>{{ warningFactor.byPerctHeighNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.byPerctHeighPer }}%</span
                        >
                      </div>
                    </div>
                    <div class="huml_pl_box">
                      <div
                        class="huml_plb_left"
                        :style="{ width: warningFactor.byPerctLow * 4 + 'rem' }"
                      >
                        <div
                          v-if="warningFactor.byPerct !== 1"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.byPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.byPerct !== 1"
                          class="huml_plb_t"
                        ></div>
                      </div>
                      <div
                        class="huml_plb_right"
                        :style="{
                          width: warningFactor.byPerctHeigh * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.byPerct !== 0"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.byPerct !== 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.byPerct !== 0"
                          class="huml_plb_t"
                        ></div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name">偏执</div>
                  <el-tooltip effect="light" placement="top">
                    <div slot="content">
                      <div class="top_title">偏执</div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq11"></span>
                        <span>低：</span>
                        <span>{{ warningFactor.pzPerctLowNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.pzPerctLowPer }}%</span
                        >
                      </div>
                      <div class="c_pies">
                        <span class="c_pie_th c_thq12"></span>
                        <span>高：</span>
                        <span>{{ warningFactor.pzPerctHeighNum }}人</span>
                        <span style="margin-left:0.1rem"
                          >占比{{ warningFactor.pzPerctHeighPer }}%</span
                        >
                      </div>
                    </div>
                    <div class="huml_pl_box">
                      <div
                        class="huml_plb_left"
                        :style="{ width: warningFactor.pzPerctLow * 4 + 'rem' }"
                      >
                        <div
                          v-if="warningFactor.pzPerct === 0"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.pzPerct === 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.pzPerct === 0"
                          class="huml_plb_t"
                        ></div>
                      </div>
                      <div
                        class="huml_plb_right"
                        :style="{
                          width: warningFactor.pzPerctHeigh * 4 + 'rem'
                        }"
                      >
                        <div
                          v-if="warningFactor.pzPerct !== 0"
                          class="huml_plb_c"
                        ></div>
                        <div
                          v-if="warningFactor.pzPerct !== 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.pzPerct !== 0"
                          class="huml_plb_t"
                        ></div>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name"></div>
                  <div class="huml_pl_box huml_pl_cent">
                    <div>
                      0%
                    </div>
                    <div>
                      25%
                    </div>
                    <div>
                      50%
                    </div>
                    <div>
                      75%
                    </div>
                    <div style="text-align: revert;">
                      100%
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="tv_ec">
                <div class="tv_ec_head">
                  <div class="center_pie" style="justify-content: center;">
                    <div class="c_pie_li">
                      <span class="c_pie_th c_ths0"></span>
                      测评人数
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_ths1"></span>
                      预警人次
                    </div>
                  </div>
                </div>
                <div class="myChartLine" id="myChartLine" ref="myChartLine"></div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="hvm_left">
          <div class="hvml_box">
            <div class="hvml_b_head">测评趋势分析</div>
            <img
              class="hvml_b_bg"
              src="../../assets/images/heart/hv_bg.png"
              alt=""
            />
            <div class="hvml_main">
              <div class="tv_ec">
                <div class="tv_ec_head">
                  <div class="center_pie" style="justify-content: center;">
                    <div class="c_pie_li">
                      <span class="c_pie_th c_ths0"></span>
                      测评人次
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_ths1"></span>
                      预警人次
                    </div>
                  </div>
                  <ul>
                    <li
                      @click="ecAct(7)"
                      :class="[{ tv_ec_act: ecActNum == 7 }]"
                    >
                      7天
                    </li>
                    <li
                      @click="ecAct(30)"
                      :class="[{ tv_ec_act: ecActNum == 30 }]"
                    >
                      30天
                    </li>
                  </ul>
                </div>
                <div
                  class="myChartTrend"
                  id="myChartTrend"
                  ref="myChartTrend"
                ></div>
              </div>
            </div>
          </div>
          <div class="hvml_box">
            <div class="hvml_b_head">参测人群结构</div>
            <img
              class="hvml_b_bg"
              src="../../assets/images/heart/hv_bg.png"
              alt=""
            />
            <div class="hvml_main">
              <div class="tv_ec" style="display: flex;align-items: center;">
                <!-- <div class="tv_ec_head">
                  <div class="center_pie" style="justify-content: center;">
                    <div class="c_pie_li">
                      <span class="c_pie_th c_ths0"></span>
                      测评人数
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_ths1"></span>
                      预警人次
                    </div>
                  </div>
                </div> -->
                <div
                  class="myChartPieCrl"
                  id="myChartPieCrl"
                  ref="myChartPieCrl"
                ></div>
                <div
                  class="myChartPieSex"
                  id="myChartPieSex"
                  ref="myChartPieSex"
                ></div>
              </div>
            </div>
          </div>
          <div class="hvml_box">
            <div class="hvml_b_head" style="left: 1.05rem;">
              功能区使用排行
            </div>
            <img
              class="hvml_b_bg"
              src="../../assets/images/heart/hv_bg1.png"
              alt=""
            />
            <div class="hvml_main">
              <ul class="hvml_m_game" v-if="gameNew.length != 0">
                <li v-for="item in gameNew" :key="item.id">
                  <img
                    :src="
                      require('../../assets/images/heart/game' +
                        item.id +
                        '.png')
                    "
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="tv_top">
        <div class="tv_t_left">
          <div class="tv_tl_title">
            <span></span>
            <p>异常信息统计</p>
          </div>
          <div class="tv_tl_tain">
            <div class="tv_tlt_box">
              <div class="tv_tltb_num">
                <span>{{todayAlarmNum}}</span>
                <span>个</span>
              </div>
              <div class="tv_tltb_txt">今日异常识别</div>
              <img class="tv_tltb_img" src="../../assets/images/warn_01.png" alt="">
            </div>
            <div class="tv_tlt_box">
              <div class="tv_tltb_num">
                <span>{{alarmCount}}</span>
                <span>个</span>
              </div>
              <div class="tv_tltb_txt">累计异常识别</div>
              <img class="tv_tltb_img" src="../../assets/images/warn_02.png" alt="">
            </div>
          </div>
        </div>
        <div class="tv_t_left tv_t_center">
          <div class="tv_tl_title">
            <span></span>
            <p>识别数量统计</p>
          </div>
          <div class="tv_tl_tain">
            <div class="tv_ec">
              <div class="tv_ec_head">
                <div class="center_pie" style="justify-content: center;">
                  <div class="c_pie_li">
                    <span class="c_pie_th c_ths0"></span>
                    异常识别
                  </div>
                  <div class="c_pie_li">
                    <span class="c_pie_th c_ths1"></span>
                    工序识别
                  </div>
                </div>
                <ul>
                  <li @click="ecAct(7)" :class="[{ tv_ec_act: ecActNum == 7 }]">
                    7天
                  </li>
                  <li @click="ecAct(30)" :class="[{ tv_ec_act: ecActNum == 30 }]">
                    30天
                  </li>
                </ul>
              </div>
              <div class="myChartTrend" id="myChartTrend" ref="myChartTrend"></div>
            </div>
          </div>
        </div>
        <div class="tv_t_left tv_t_right">
          <div class="tv_tl_title">
            <span></span>
            <p>工序识别统计</p>
          </div>
          <div class="tv_tl_tain">
            <div class="tv_tlt_box">
              <div class="tv_tltb_num">
                <span>{{todayProcessNum}}</span>
                <span>个</span>
              </div>
              <div class="tv_tltb_txt">今日工序识别</div>
              <img class="tv_tltb_img" src="../../assets/images/warn_03.png" alt="">
            </div>
            <div class="tv_tlt_box">
              <div class="tv_tltb_num">
                <span>{{processCount}}</span>
                <span>个</span>
              </div>
              <div class="tv_tltb_txt">累计工序识别</div>
              <img class="tv_tltb_img" src="../../assets/images/warn_04.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="tv_top tv_bottom">
        <div class="tv_t_left tv_t_center">
          <div class="tv_tl_title">
            <span></span>
            <p>最近告警记录</p>
          </div>
          <div class="tv_tl_tain">
            <div class="tv_r_record">
              <div style="padding-right: 0.04rem;">
                <ul class="tv_rr_ul">
                  <li class="tv_rr_li tv_rr_lis">
                    <div class="tv_rr_txt" style="padding-left: 0.54rem;">
                      类型
                    </div>
                    <div class="tv_rr_txt" style="padding-left: 0.1rem;width:28%;">
                      设备名称
                    </div>
                    <div class="tv_rr_txt" style="padding-left: 0.1rem;width:34%;">
                      时间
                    </div>
                    <div class="tv_rr_txt tv_rr_abs" @click="lookMore(0)">
                      查看更多>
                    </div>
                  </li>
                </ul>
                <ul class="tv_rr_ul" style="padding: 0 0.2rem;height: 3.36rem;overflow: hidden;overflow-y: auto;">
                  <li class="tv_rr_li tv_rr_lip" v-for="item in alarmRecords" :key="item.index">
                    <div class="tv_rr_lipl" @click="viewImg(item.alarmId)">
                      <img @click.stop="flagChange(item.alarmId)" :class="['tv_rrl_tip', item.alarmFlag == 1 ? '' : 'flag_gray']" src="../../assets/images/c_tip.png" alt="">
                      <div class="tv_rr_txt" style="padding-left: 0.54rem;">
                        {{item.alarmName}}
                      </div>
                      <div class="tv_rr_txt" style="padding-left: 0.1rem;width:28%;">
                        {{item.deviceName}}
                      </div>
                      <div class="tv_rr_txt tv_rr_img" style="padding-left: 0.1rem;width:34%;">
                        {{item.alarmTime}}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="tv_t_left tv_t_center">
          <div class="tv_tl_title">
            <span></span>
            <p>最近工序记录</p>
          </div>
          <div class="tv_tl_tain">
            <div class="tv_r_record">
              <div style="padding-right: 0.04rem;">
                <ul class="tv_rr_ul">
                  <li class="tv_rr_li tv_rr_lis">
                    <div class="tv_rr_txt" style="padding-left: 0.54rem;">
                      类型
                    </div>
                    <div class="tv_rr_txt" style="padding-left: 0.1rem;width:28%;">
                      设备名称
                    </div>
                    <div class="tv_rr_txt" style="padding-left: 0.1rem;width:34%;">
                      时间
                    </div>
                    <div class="tv_rr_txt tv_rr_abs" @click="lookMore(-1)">
                      查看更多>
                    </div>
                  </li>
                </ul>
                <ul class="tv_rr_ul" style="padding: 0 0.2rem;height: 3.36rem;overflow: hidden;overflow-y: auto;">
                  <li class="tv_rr_li tv_rr_lip" v-for="item in processRecords" :key="item.index">
                    <div class="tv_rr_lipl">
                      <img @click="flagChange(item.alarmId)" :class="['tv_rrl_tip', item.alarmFlag == 1 ? '' : 'flag_gray']" src="../../assets/images/c_tip.png" alt="">
                      <div class="tv_rr_txt" style="padding-left: 0.54rem;">
                        {{item.alarmName}}
                      </div>
                      <div class="tv_rr_txt" style="padding-left: 0.1rem;width:28%;">
                        {{item.deviceName}}
                      </div>
                      <div class="tv_rr_txt tv_rr_img" style="padding-left: 0.1rem;width:34%;">
                        {{item.alarmTime}}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="tv_t_left">
          <div class="tv_tl_title">
            <span></span>
            <p>当前施工工序</p>
          </div>
          <div class="tv_tl_tain" style="margin-bottom: 0.21rem;">
            <div class="tv_tlt_pic">
              <img v-if="processImgData != ''" class="tv_tltp_img" :src="processImgData" alt="">
              <div v-else class="tv_tltp_i_bg"></div>
              
              <div class="tv_tltp_txt">{{processName == '' ? '暂无工序' : processName}}</div>
            </div>
          </div>
          <div class="tv_tl_title">
            <span></span>
            <p>当前告警</p>
          </div>
          <div class="tv_tl_tain">
            <div class="tv_tlt_pic">
              <img v-if="alarmImgData != ''" class="tv_tltp_img" :src="alarmImgData" alt="">
              <div v-else class="tv_tltp_i_bg"></div>
              <div class="tv_tltp_txt">{{alarmName == '' ? '暂无告警' : alarmName}}</div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import echarts from "@/assets/js/echarts";
import "echarts-gl";
import { mapMutations } from "vuex";
import { getPie3D, getParametricEquation } from "@/assets/js/chart.js";
import highcharts from "highcharts"; // 必须引入
import highcharts3d from "highcharts/highcharts-3d"; // 3D必须有引入
// import { PictorialBarChart } from 'echarts/charts';
import Url from "@/assets/js/url.js";
import NP from "number-precision";
highcharts3d(highcharts);
// NP.strip(num)         // strip a number to nearest right number
// NP.plus(num1, num2, num3, ...)   // addition, num + num2 + num3, two numbers is required at least.
// NP.minus(num1, num2, num3, ...)  // subtraction, num1 - num2 - num3
// NP.times(num1, num2, num3, ...)  // multiplication, num1 * num2 * num3
// NP.divide(num1, num2, num3, ...) // division, num1 / num2 / num3
// NP.round(num, ratio)  // round a number based on ratio

// NP.strip(0.09999999999999998); // = 0.1
// NP.plus(0.1, 0.2);             // = 0.3, not 0.30000000000000004
// NP.plus(2.3, 2.4);             // = 4.7, not 4.699999999999999
// NP.minus(1.0, 0.9);            // = 0.1, not 0.09999999999999998
// NP.times(3, 0.3);              // = 0.9, not 0.8999999999999999
// NP.times(0.362, 100);          // = 36.2, not 36.199999999999996
// NP.divide(1.21, 1.1);          // = 1.1, not 1.0999999999999999
// NP.round(0.105, 2);            // = 0.11, not 0.1
// import InStall from "@/assets/js/jingdu.js";

// echarts.use([PictorialBarChart]);

const pieColor = [
  "rgba(157, 113, 255, 1)",
  "rgba(103, 135, 250, 1)",
  "rgba(255, 212, 105, 1)",
  "rgba(92, 212, 247, 1)",
  "rgba(244, 142, 46, 1)"
];
const crlColor = ["#FFD469", "#9D71FF", "#7795FF", "#5CD4F7"];
const sexColor = ["#7795FF", "#9D71FF"];
export default {
  name: "screenindex",
  data() {
    return {
      participationNum: 0,
      evaluationCount: 0,
      warningNum: 0,
      normalNum: 0,
      mildNum: 0,
      moderateNum: 0,
      severeNum: 0,
      gameNew: [],
      gameList: [
        {
          id: 1,
          name: "AI心世界",
          flag: false
        },
        {
          id: 2,
          name: "嗨唱宣泄区",
          flag: false
        },
        {
          id: 3,
          name: "沉浸放松区",
          flag: false
        },
        {
          id: 4,
          name: "身心舒缓区",
          flag: false
        },
        {
          id: 5,
          name: "游戏互动区",
          flag: false
        }
      ],
      warningStatistic: {
        anxietyPerct: 0,
        depressionPerct: 0,
        forcePerct: 0,
        suicidePerct: 0,
        violencePerct: 0
      },
      ageGenderStatistic: {
        belowThirtyPerct: 0,
        thirtyToFortyPerct: 0,
        fortyToFiftyPerct: 0,
        aboveFiftyPerct: 0,
        malePerct: 0,
        femalePerct: 0
      },
      warningFactor: {
        byPerct: 0,
        cdx: 0,
        csjl: 0,
        dkqp: 0,
        dy: 0,
        fshPerct: 0,
        gjxPerct: 0,
        hkba: 0,
        jlqf: 0,
        pzPerct: 0,
        qpsw: 0,
        qpxw: 0,
        qxdl: 0,
        rjgd: 0,
        swch: 0,
        wgzg: 0,
        wmzyPerct: 0,
        xjyq: 0,
        yjr: 0,
        yycd: 0,
        zlPerct: 0
      },
      fiveList: [],
      imgData: "",
      imgFlag: false,
      alarmCount: 0,
      todayAlarmNum: 0,
      processCount: 0,
      todayProcessNum: 0,
      alarmName: "",
      alarmImgData: "",
      processName: "",
      processImgData: "",
      alarmRecords: [],
      processRecords: [],
      statistic: [],
      myChartTrend: null,
      myChartPie: null,
      pieOption: {},
      pieList: [
        {
          name: "抑郁",
          value: 0
        },
        {
          name: "焦虑",
          value: 0
        },
        {
          name: "强迫",
          value: 0
        },
        {
          name: "自我伤害",
          value: 0
        },
        {
          name: "敌对",
          value: 0
        }
      ],
      myChartPieCrl: null,
      crlOption: {},
      crlList: [
        {
          name: "30岁以下",
          value: 0
        },
        {
          name: "31-40岁",
          value: 0
        },
        {
          name: "41-50岁",
          value: 0
        },
        {
          name: "51岁以上",
          value: 0
        }
      ],
      myChartPieSex: null,
      sexOption: {},
      sexList: [
        {
          name: "男性",
          value: 0
        },
        {
          name: "女性",
          value: 0
        }
      ],
      // myChartLine: null,
      ecActNum: 7,

      screenWidth: document.body.clientWidth
    };
  },
  watch: {
    screenWidth(val) {
      console.log(val);
      this.screenWidth = val;
      this.echartInit();
      this.echartInit1();
      this.myChartTrend.resize();
      this.myChartPie.resize();
      this.myChartPieCrl.resize();
      this.myChartPieSex.resize();
    },
    // 此时我监听的是对象，当$store.state.userInfo.Name发生修改时，此时需要深度监听才能监听到数据变化
    "$store.state.mqttUpdate": {
      deep: true, // 深度监听设置为 true
      handler: function(newVal, oldVal) {
        console.log("数据发生变化啦"); // 修改数据时，能看到输出结果
        console.log("新：" + newVal, "老：" + oldVal);
        if (newVal) {
          this.getLine("y");
        }
      }
    }
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        console.log(111);
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };

    document.removeEventListener('touchstart', this.hideTip);
    document.addEventListener('touchstart', this.hideTip);
    // this.echartInit();
    // 二进制转成数组
    // 5

    // let  parseInt(erStr, 2)
    // 调接口
    // this.getLines("n");
    // this.getInfo("n");
    this.$forceUpdate();
  },
  beforeDestroy() {
    console.log("销毁");
  },
  methods: {
    ...mapMutations(["setSysType", "setMqttUpdate"]),
    lookMore(type) {
      sessionStorage.setItem("sysType", 2);
      this.setSysType(2);
      this.$router.push(
        {
          name: "warnview",
          params: { type: type }
        },
        () => {},
        () => {}
      );
    },
    // viewImg(id) {
    //   // console.log(id+'222')
    //   let that = this;
    //   let params = {
    //     alarmId: id
    //   };
    //   console.log(params);
    //   that.$http
    //     .get(Url + "/ltgsAlarmSystem/tunnel/alarm/getImgData", {
    //       params: params
    //     })
    //     .then(res => {
    //       let data = res.data;
    //       console.log(data);
    //       if (data.code == 0) {
    //         this.imgData =
    //           data.data.imgData != ""
    //             ? "data:image;base64," + data.data.imgData
    //             : "";
    //         this.imgFlag = true;
    //         console.log(this.imgData);
    //         console.log(this.imgFlag);
    //       } else {
    //         that.$message.error(data.msg);
    //       }
    //     })
    //     .catch(res => {
    //       console.log(res);
    //     });
    // },
    // flagChange(id) {
    //   // console.log(id+"111111")
    //   // return
    //   let that = this;
    //   console.log("点小红旗，清除告警标记");
    //   let param = {
    //     alarmId: id
    //   };
    //   console.log(param);
    //   that.$http
    //     .put(Url + "/aimw/index/screenIndex", param)
    //     .then(res => {
    //       var data = res.data;
    //       if (data.code == 0) {
    //         let warnList = this.alarmRecords;
    //         for (let i in warnList) {
    //           if (warnList[i].alarmId == id) {
    //             warnList[i].alarmFlag = 0;
    //           }
    //         }
    //         let warnList1 = this.processRecords;
    //         for (let i in warnList1) {
    //           if (warnList1[i].alarmId == id) {
    //             warnList1[i].alarmFlag = 0;
    //           }
    //         }
    //         this.alarmRecords = warnList;
    //         this.processRecords = warnList1;
    //       } else {
    //         that.$message.error(data.msg);
    //       }
    //     })
    //     .catch(res => {
    //       console.log(res);
    //     });
    // },
    getLine(type) {
      let that = this;
      let params = {
        days: this.ecActNum,
        // currentTime: this.nowTimeForm(new Date().getTime()),
        type: type
      };
      // console.log(params);
      that.$http
        .get(Url + "/aimw/index/screenTrend", {
          params: params
        })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.code == 0) {
            console.log("initWebSocket");
            let info = data.data.reverse();
            for (let i in info) {
              let nowDate = info[i].date.split(" ")[0];
              info[i].date =
                nowDate.split("-")[1] + "/" + nowDate.split("-")[2];
              info[i].date1 = nowDate;
            }
            this.statistic = info;

            this.echartInit1();
            this.getInfo(type);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getLines(type) {
      let that = this;
      let params = {
        days: this.ecActNum,
        // currentTime: this.nowTimeForm(new Date().getTime()),
        type: type
      };
      // console.log(params);
      that.$http
        .get(Url + "/aimw/index/screenTrend", {
          params: params
        })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.code == 0) {
            // console.log("initWebSocket");
            let info = data.data.reverse();
            for (let i in info) {
              let nowDate = info[i].date.split(" ")[0];
              info[i].date =
                nowDate.split("-")[1] + "/" + nowDate.split("-")[2];
              info[i].date1 = nowDate;
            }
            console.log(info);
            this.statistic = info;
            this.echartInit1();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getInfo(type) {
      let that = this;
      let param = {
        // days: this.ecActNum,
        // currentTime: this.nowTimeForm(new Date().getTime()),
        type: type
      };
      that.$http
        .get(Url + "/aimw/index/screenIndex", {
          params: param
        })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.code == 0) {
            // console.log("initWebSocket");
            let info = data.data;
            this.participationNum = info.participationNum;
            this.evaluationCount = info.evaluationCount;
            this.warningNum = info.warningNum;
            this.normalNum = info.normalNum;
            this.mildNum = info.mildNum;
            this.moderateNum = info.moderateNum;
            this.severeNum = info.severeNum;
            // info.popularGame = 1
            // 受欢迎的游戏
            let gameArr = [0, 0, 0, 0, 0];
            this.gameNew = [];
            let erStr = "";
            if (info.popularGame !== 0) {
              console.log(info.popularGame)
              erStr = info.popularGame.toString(2);
            } else {
              erStr = "11100";
            }
            console.log(erStr);
            let erArrs = erStr.split("").reverse();
            console.log(erArrs)
            for (let i in erArrs) {
              gameArr[i] = erArrs[i]
            }
            let erArr = gameArr.reverse()
            console.log(erArr)
            for (let i in erArr) {
              if (erArr[i] == 1) {
                this.gameList[i].flag = true;
              } else {
                this.gameList[i].flag = false;
              }
            }
            for (let i in this.gameList) {
              if (this.gameList[i].flag) {
                this.gameNew.push(this.gameList[i]);
              }
            }
            console.log(this.gameNew);
            console.log(this.gameNew)
            this.warningStatistic = info.warningStatistic;
            // info.warningFactor.qxdl = 110
            // 反社会
            info.warningFactor.fshPerctLow = NP.minus(
              1,
              info.warningFactor.fshPerct
            );
            info.warningFactor.fshPerctLowPer = NP.times(
              info.warningFactor.fshPerctLow,
              100
            );
            info.warningFactor.fshPerctHeigh = info.warningFactor.fshPerct.toFixed(
              4
            );
            info.warningFactor.fshPerctHeighPer = NP.times(
              info.warningFactor.fshPerctHeigh,
              100
            );
            info.warningFactor.fshPerctLowNum = Math.round(
              info.participationNum * info.warningFactor.fshPerctLow
            );
            info.warningFactor.fshPerctHeighNum = Math.round(
              info.participationNum * info.warningFactor.fshPerctHeigh
            );
            // 完美主义
            // console.log(InStall)

            info.warningFactor.wmzyPerctLow = NP.minus(
              1,
              info.warningFactor.wmzyPerct
            );
            info.warningFactor.wmzyPerctLowPer = NP.times(
              info.warningFactor.wmzyPerctLow,
              100
            );
            info.warningFactor.wmzyPerctHeigh = info.warningFactor.wmzyPerct.toFixed(
              4
            );
            info.warningFactor.wmzyPerctHeighPer = NP.times(
              info.warningFactor.wmzyPerctHeigh,
              100
            );
            info.warningFactor.wmzyPerctLowNum = Math.round(
              info.participationNum * info.warningFactor.wmzyPerctLow
            );
            info.warningFactor.wmzyPerctHeighNum = Math.round(
              info.participationNum * info.warningFactor.wmzyPerctHeigh
            );
            // 攻击性
            info.warningFactor.gjxPerctLow = NP.minus(
              1,
              info.warningFactor.gjxPerct
            );
            info.warningFactor.gjxPerctLowPer = NP.times(
              info.warningFactor.gjxPerctLow,
              100
            );
            info.warningFactor.gjxPerctHeigh = info.warningFactor.gjxPerct.toFixed(
              4
            );
            info.warningFactor.gjxPerctHeighPer = NP.times(
              info.warningFactor.gjxPerctHeigh,
              100
            );
            info.warningFactor.gjxPerctLowNum = Math.round(
              info.participationNum * info.warningFactor.gjxPerctLow
            );
            info.warningFactor.gjxPerctHeighNum = Math.round(
              info.participationNum * info.warningFactor.gjxPerctHeigh
            );
            // 自恋
            info.warningFactor.zlPerctLow = NP.minus(
              1,
              info.warningFactor.zlPerct
            );
            info.warningFactor.zlPerctLowPer = NP.times(
              info.warningFactor.zlPerctLow,
              100
            );
            info.warningFactor.zlPerctHeigh = info.warningFactor.zlPerct.toFixed(
              4
            );
            info.warningFactor.zlPerctHeighPer = NP.times(
              info.warningFactor.zlPerctHeigh,
              100
            );
            info.warningFactor.zlPerctLowNum = Math.round(
              info.participationNum * info.warningFactor.zlPerctLow
            );
            info.warningFactor.zlPerctHeighNum = Math.round(
              info.participationNum * info.warningFactor.zlPerctHeigh
            );
            // 边缘
            info.warningFactor.byPerctLow = NP.minus(
              1,
              info.warningFactor.byPerct
            );
            info.warningFactor.byPerctLowPer = NP.times(
              info.warningFactor.byPerctLow,
              100
            );
            info.warningFactor.byPerctHeigh = info.warningFactor.byPerct.toFixed(
              4
            );
            info.warningFactor.byPerctHeighPer = NP.times(
              info.warningFactor.byPerctHeigh,
              100
            );
            info.warningFactor.byPerctLowNum = Math.round(
              info.participationNum * info.warningFactor.byPerctLow
            );
            info.warningFactor.byPerctHeighNum = Math.round(
              info.participationNum * info.warningFactor.byPerctHeigh
            );
            // 偏执
            info.warningFactor.pzPerctLow = NP.minus(
              1,
              info.warningFactor.pzPerct
            );
            info.warningFactor.pzPerctLowPer = NP.times(
              info.warningFactor.pzPerctLow,
              100
            );
            info.warningFactor.pzPerctHeigh = info.warningFactor.pzPerct.toFixed(
              4
            );
            info.warningFactor.pzPerctHeighPer = NP.times(
              info.warningFactor.pzPerctHeigh,
              100
            );
            info.warningFactor.pzPerctLowNum = Math.round(
              info.participationNum * info.warningFactor.pzPerctLow
            );
            info.warningFactor.pzPerctHeighNum = Math.round(
              info.participationNum * info.warningFactor.pzPerctHeigh
            );

            this.warningFactor = info.warningFactor;
            console.log(this.warningFactor);
            let yinList = [
              {
                name: "情绪低落",
                frame: "qxdl",
                type: "1",
                typeName: "抑郁",
                value: info.warningFactor.qxdl
                // value: 15
              },
              {
                name: "思维迟缓",
                frame: "swch",
                type: "1",
                typeName: "抑郁",
                value: info.warningFactor.swch
                // value: 14
              },
              {
                name: "精力缺乏",
                frame: "jlqf",
                type: "1",
                typeName: "抑郁",
                value: info.warningFactor.jlqf
                // value: 13
              },

              {
                name: "消极预期",
                frame: "xjyq",
                type: "2",
                typeName: "焦虑",
                value: info.warningFactor.xjyq
                // value: 12
              },
              {
                name: "易激怒",
                frame: "yjr",
                type: "2",
                typeName: "焦虑",
                value: info.warningFactor.yjr
                // value: 11
              },
              {
                name: "惶恐不安",
                frame: "hkba",
                type: "2",
                typeName: "焦虑",
                value: info.warningFactor.hkba
                // value: 10
              },

              {
                name: "强迫行为",
                frame: "qpxw",
                type: "3",
                typeName: "强迫",
                value: info.warningFactor.qpxw
                // value: 9
              },
              {
                name: "强迫思维",
                frame: "qpsw",
                type: "3",
                typeName: "强迫",
                value: info.warningFactor.qpsw
                // value: 8
              },
              {
                name: "对抗强迫",
                frame: "dkqp",
                type: "3",
                typeName: "强迫",
                value: info.warningFactor.dkqp
                // value: 700
              },

              {
                name: "人际孤独",
                frame: "rjgd",
                type: "4",
                typeName: "自我伤害",
                value: info.warningFactor.rjgd
                // value: 600
              },
              {
                name: "抑郁程度",
                frame: "yycd",
                type: "4",
                typeName: "自我伤害",
                value: info.warningFactor.yycd
                // value: 88
              },
              {
                name: "创伤经历",
                frame: "csjl",
                type: "4",
                typeName: "自我伤害",
                value: info.warningFactor.csjl
                // value: 55
              },

              {
                name: "冲动性",
                frame: "cdx",
                type: "5",
                typeName: "敌对",
                value: info.warningFactor.cdx
                // value: 333
              },
              {
                name: "无规则感",
                frame: "wgzg",
                type: "5",
                typeName: "敌对",
                value: info.warningFactor.wgzg
                // value: 23
              },
              {
                name: "敌意",
                frame: "dy",
                type: "5",
                typeName: "敌对",
                value: info.warningFactor.dy
                // value: 12
              }
            ];
            yinList.sort((a, b) => {
              return b.value - a.value;
            });
            console.log(yinList);
            for (let i in yinList) {
              if (yinList[0].value < 10) {
                if (yinList[i].value >= 0 && yinList[i].value < 10) {
                  yinList[i].size = 36;
                }
              }
              if (yinList[0].value > 9 && yinList[0].value < 50) {
                if (yinList[i].value >= 0 && yinList[i].value < 10) {
                  yinList[i].size = 30;
                } else if (yinList[i].value > 9 && yinList[i].value < 50) {
                  yinList[i].size = 36;
                }
              }
              if (yinList[0].value > 49 && yinList[0].value < 100) {
                if (yinList[i].value >= 0 && yinList[i].value < 10) {
                  yinList[i].size = 24;
                } else if (yinList[i].value > 9 && yinList[i].value < 50) {
                  yinList[i].size = 30;
                } else if (yinList[i].value > 49 && yinList[i].value < 100) {
                  yinList[i].size = 36;
                }
              }
              if (yinList[i].value > 99) {
                if (yinList[i].value >= 0 && yinList[i].value < 10) {
                  yinList[i].size = 18;
                } else if (yinList[i].value > 9 && yinList[i].value < 50) {
                  yinList[i].size = 24;
                } else if (yinList[i].value > 49 && yinList[i].value < 100) {
                  yinList[i].size = 30;
                } else if (yinList[i].value > 99) {
                  yinList[i].size = 36;
                }
              }
              console.log(i % 2);
              
              // if (i == 0) {
              //   // if (yinList[i].value >= 0 && yinList[i].value < 10) {
              //   //   yinList[i].size = 20;
              //   // }
              //   yinList[i].size = 60;
              // }
              // if (i == 1) {
              //   yinList[i].size = 40;
              // }
              // if (i == 2) {
              //   yinList[i].size = 38;
              // }
              // if (i == 3) {
              //   yinList[i].size = 36;
              // }
              // if (i == 4) {
              //   yinList[i].size = 36;
              // }
              // if (i == 5) {
              //   yinList[i].size = 34;
              // }
              // if (i == 6) {
              //   yinList[i].size = 32;
              // }

              // if (i == 7) {
              //   yinList[i].size = 30;
              // }
              // if (i == 8) {
              //   yinList[i].size = 28;
              // }
              // if (i == 9) {
              //   yinList[i].size = 26;
              // }
              // if (i == 10) {
              //   yinList[i].size = 24;
              // }
              // if (i == 11) {
              //   yinList[i].size = 22;
              // }
              // if (i == 12) {
              //   yinList[i].size = 20;
              // }
              // if (i == 13) {
              //   yinList[i].size = 18;
              // }
              // if (i == 14) {
              //   yinList[i].size = 16;
              // }
              console.log(yinList[i].size);
            }
            console.log(yinList);
            let ar1 = [];
            let ar2 = [];
            let ar3 = [];
            let ar4 = [];
            let ar5 = [];
            // yinList.sort((a, b) => {
            //   return a.type - b.type
            // })
            // console.log(yinList)
            for (let i in yinList) {
              if (yinList[i].type == 1) {
                ar1.push(yinList[i]);
              }
              if (yinList[i].type == 2) {
                ar2.push(yinList[i]);
              }
              if (yinList[i].type == 3) {
                ar3.push(yinList[i]);
              }
              if (yinList[i].type == 4) {
                ar4.push(yinList[i]);
              }
              if (yinList[i].type == 5) {
                ar5.push(yinList[i]);
              }
            }
            console.log(ar1, ar2, ar3, ar4, ar5);
            let arTal = [
              { list: ar1 },
              { list: ar2 },
              { list: ar3 },
              { list: ar4 },
              { list: ar5 }
            ];
            arTal.sort((a, b) => {
              return b.list[0].value - a.list[0].value;
            });
            // console.log(yinList)
            console.log(arTal);

            let yinArr = [];
            for (let i in arTal) {
              for (let j in arTal[i].list) {
                yinArr.push(arTal[i].list[j]);
              }
            }
            console.log(yinArr);
            this.fiveList = yinArr;
            // 男 女
            info.ageGenderStatistic.malePerct = info.ageGenderStatistic.malePerct.toFixed(
              4
            );
            info.ageGenderStatistic.femalePerct = info.ageGenderStatistic.femalePerct.toFixed(
              4
            );
            info.ageGenderStatistic.malePerctNum = Math.round(
              info.ageGenderStatistic.malePerct * info.participationNum
            );
            info.ageGenderStatistic.femalePerctNum = Math.round(
              info.ageGenderStatistic.femalePerct * info.participationNum
            );

            info.ageGenderStatistic.belowThirtyPerct = info.ageGenderStatistic.belowThirtyPerct.toFixed(
              4
            );
            info.ageGenderStatistic.thirtyToFortyPerct = info.ageGenderStatistic.thirtyToFortyPerct.toFixed(
              4
            );
            info.ageGenderStatistic.fortyToFiftyPerct = info.ageGenderStatistic.fortyToFiftyPerct.toFixed(
              4
            );
            info.ageGenderStatistic.aboveFiftyPerct = info.ageGenderStatistic.aboveFiftyPerct.toFixed(
              4
            );

            this.ageGenderStatistic = info.ageGenderStatistic;
            console.log(info);
            this.echartInit();
            // this.todayProcessNum = info.todayProcessNum;
            // this.processCount = info.processCount;

            // this.processImgData =
            //   info.processImgData != ""
            //     ? "data:image;base64," + info.processImgData
            //     : "";
            // this.processName = info.processName;

            // this.alarmImgData =
            //   info.alarmImgData != ""
            //     ? "data:image;base64," + info.alarmImgData
            //     : "";
            // this.alarmName = info.alarmName;

            // this.alarmRecords = info.alarmRecords;
            // this.processRecords = info.processRecords;

            this.setMqttUpdate(false);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    nowTimeForm(time) {
      let date = new Date(time);
      let y = 1900 + date.getYear();
      let m = "0" + (date.getMonth() + 1);
      let d = "0" + date.getDate();
      let hh = "0" + date.getHours(); // 获取当前小时
      let mm = "0" + date.getMinutes(); // 获取当前分钟
      let ss = "0" + date.getSeconds(); // 获取当前秒数
      return (
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length) +
        " " +
        hh.substring(hh.length - 2, hh.length) +
        ":" +
        mm.substring(mm.length - 2, mm.length) +
        ":" +
        ss.substring(ss.length - 2, ss.length)
      );
    },
    ecAct(num) {
      this.ecActNum = num;
      console.log("切换告警数据统计接口");
      this.getLines("s");
    },
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
    bindListen(myChart, optionName) {
      let that = this;
      let selectedIndex = '';
      let hoveredIndex = '';
      console.log(myChart);
      console.log(this[optionName]);
      // 监听点击事件，实现选中效果（单选）
      // myChart.on('click', function (params) {
      //   console.log(params)
      //   console.log(that.option)
      //   console.log(that[optionName])
      //   console.log(params)
      //   // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      //   let isSelected = !that[optionName].series[params.seriesIndex].pieStatus.selected;
      //   let isHovered = that[optionName].series[params.seriesIndex].pieStatus.hovered;
      //   let k = that[optionName].series[params.seriesIndex].pieStatus.k;
      //   let startRatio = that[optionName].series[params.seriesIndex].pieData.startRatio;
      //   let endRatio = that[optionName].series[params.seriesIndex].pieData.endRatio;
      //   // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      //   if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
      //     that[optionName].series[selectedIndex].parametricEquation = that.getParametricEquation(that[optionName].series[selectedIndex].pieData.startRatio, that[optionName].series[selectedIndex].pieData.endRatio, false, false, k, that[optionName].series[selectedIndex].pieData.value);
      //     that[optionName].series[selectedIndex].pieStatus.selected = false;
      //   }
      //   // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      //   that[optionName].series[params.seriesIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, that[optionName].series[params.seriesIndex].pieData.value);
      //   that[optionName].series[params.seriesIndex].pieStatus.selected = isSelected;
      //   // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      //   // eslint-disable-next-line no-unused-expressions
      //   selectedIndex = isSelected ? params.seriesIndex : null;
      //   // 使用更新后的 option，渲染图表
      //   myChart.setOption(that[optionName]);
      // });
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", params => {
        // console.log(params)
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = this[optionName].series[hoveredIndex].pieStatus
              .selected;
            isHovered = false;
            startRatio = this[optionName].series[hoveredIndex].pieData
              .startRatio;
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
            k = this[optionName].series[hoveredIndex].pieStatus.k;
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
            );
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            params.seriesName !== "pie2d" &&
            params.seriesName !== "预警"
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            console.log(this[optionName].series[params.seriesIndex]);
            isSelected = this[optionName].series[params.seriesIndex].pieStatus
              .selected;
            isHovered = true;
            startRatio = this[optionName].series[params.seriesIndex].pieData
              .startRatio;
            endRatio = this[optionName].series[params.seriesIndex].pieData
              .endRatio;
            k = this[optionName].series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            this[optionName].series[
              params.seriesIndex
            ].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[params.seriesIndex].pieData.value + 2
            );
            this[optionName].series[
              params.seriesIndex
            ].pieStatus.hovered = isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName]);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on("globalout", () => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = this[optionName].series[hoveredIndex].pieStatus.k;
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio;
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
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
          );
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName]);
      });
    },

    // // 3D饼图的配置项，同echarjs的series
    // getPie3D(pieData, internalDiameterRatio) {
    //   let series = [];
    //   let sumValue = 0;
    //   let startValue = 0;
    //   let endValue = 0;
    //   let legendData = [];
    //   let k =
    //     typeof internalDiameterRatio !== "undefined"
    //       ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
    //       : 1 / 3;

    //   // 5个饼图参数
    //   for (let i = 0; i < pieData.length; i++) {
    //     sumValue += pieData[i].value;
    //     let seriesItem = {
    //       name:
    //         typeof pieData[i].name === "undefined"
    //           ? ''
    //           : pieData[i].name,
    //       type: "surface",
    //       parametric: true,
    //       // wireframe: {
    //       //   show: false
    //       // },
    //       // label: {
    //       //   // show: true,
    //       //   // color: "#fff",
    //       //   // fontSize: 30,
    //       //   // position: "center",
    //       //   formatter: function (params) {
    //       //     console.log(params)
    //       //     return '1123';
    //       //   },
    //       //   // rich: {
    //       //   //   nameSty: {
    //       //   //     fontSize: 14,
    //       //   //     color: "#fff"
    //       //   //   },
    //       //   //   valueSty: {
    //       //   //     fontSize: 14,
    //       //   //     color: "#fff"
    //       //   //   }
    //       //   // }
    //       //   // formatter: (item) => {
    //       //   //   //  console.log(item)
    //       //   //   return item.data.name + ":" + item.data.value + "";
    //       //   // }
    //       // },
    //       // avoidLabelOverlap: false,
    //       // labelLine: {
    //       //   normal: {
    //       //     lineStyle: {
    //       //       color: "rgba(255, 255, 255, 0.3)"
    //       //     },
    //       //     smooth: 0,
    //       //     length: 0,
    //       //     length2: 0
    //       //   }
    //       // },
    //       pieData: pieData[i],
    //       // pieStatus: {
    //       //   selected: false,
    //       //   hovered: false,
    //       //   k: k
    //       // }
    //     };
    //     if (typeof pieData[i].itemStyle != "undefined") {
    //       let itemStyle = {};
    //       if (typeof pieData[i].itemStyle.color != "undefined") {
    //         itemStyle.color = pieData[i].itemStyle.color
    //       } else {
    //         itemStyle.color = null
    //       }
    //       if (typeof pieData[i].itemStyle.opacity != "undefined") {
    //         itemStyle.opacity = pieData[i].itemStyle.opacity
    //       } else {
    //         itemStyle.opacity = null
    //       }
    //       seriesItem.itemStyle = itemStyle;
    //     }
    //     console.log(seriesItem)
    //     series.push(seriesItem);
    //   }
    //   console.log(series)
    //   // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    //   // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    //   for (let i = 0; i < series.length; i++) {
    //     endValue = startValue + series[i].pieData.value;
    //     console.log(series[i]);
    //     series[i].pieData.startRatio = startValue / sumValue;
    //     series[i].pieData.endRatio = endValue / sumValue;
    //     series[i].label = {
    //       normal: {
    //         show: true,
    //         color: series[i].itemStyle.color,
    //         formatter: [
    //           '{b|{b}}',
    //           '{c|{c}}{b|台}',
    //           '{d|{d}%}'
    //         ].join('\n'), // 用\n来换行
    //         rich: {
    //           b: {
    //             color: '#fff',
    //             lineHeight: 25,
    //             align: 'left'
    //           },
    //           c: {
    //             fontSize: 22,
    //             color: '#fff',
    //             textShadowColor: '#1c90a6',
    //             textShadowOffsetX: 0,
    //             textShadowOffsetY: 2,
    //             textShadowBlur: 5
    //           },
    //           d: {
    //             color: series[i].itemStyle.color,
    //             align: 'left'
    //           }
    //         }
    //       }
    //     }
    //     series[i].labelLine = {
    //       normal: {
    //         lineStyle: {
    //           width: 1,
    //           color: 'rgba(255,255,255,0.7)'
    //         }
    //       }
    //     }
    //     series[i].parametricEquation = this.getParametricEquation(
    //       series[i].pieData.startRatio,
    //       series[i].pieData.endRatio,
    //       false,
    //       false,
    //       k,
    //       series[i].pieData.value
    //     );
    //     startValue = endValue;
    //     console.log(series[i].name)
    //     legendData.push({ name: series[i].name, icon: 'circle' });
    //   }
    //   // 准备待返回的配置项，把准备好的 legendData、series 传入。
    //   let option = {
    //     tooltip: {
    //       // trigger: 'item',
    //       // trigger: "manual",
    //       formatter: params => {
    //         if (params.seriesName !== "mouseoutSeries") {
    //           return `${
    //             params.seriesName
    //           }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
    //             params.color
    //           };"></span>${
    //             option.series[params.seriesIndex].pieData.value
    //           }`;
    //         }
    //       }
    //     },
    //     legend: {
    //       // show: false
    //       data: legendData,
    //       itemWidth: 8, // 色标图宽
    //       itemHeight: 8, // 色标图高
    //       // orient: "vertical", // 垂直显示
    //       orient: "horizontal", // 横向显示
    //       top: 5,
    //       right: 0,
    //       left: 0,
    //       itemGap: 20, // 色标间隔
    //       textStyle: {
    //         color: "#fff",
    //         fontSize: 14
    //       }
    //     },
    //     xAxis3D: {
    //       min: -1,
    //       max: 1
    //     },
    //     yAxis3D: {
    //       min: -1,
    //       max: 1
    //     },
    //     zAxis3D: {
    //       min: -1,
    //       max: 1
    //     },
    //     grid3D: {
    //       show: false,
    //       boxHeight: '6',
    //       top: "10",
    //       left: "0",
    //       // bottom: "0",
    //       environment: "auto",
    //       viewControl: {
    //         distance: 280, // 远近
    //         alpha: 40, // 饼图X轴旋转
    //         beta: 0, // 饼图Y轴旋转
    //         autoRotate: true
    //       }
    //     },
    //     series: series
    //   };
    //   return option;
    // },

    // getParametricEquation(
    //   startRatio,
    //   endRatio,
    //   isSelected,
    //   isHovered,
    //   k,
    //   height
    // ) {
    //   // 计算
    //   // console.log("getParametricEquation")
    //   let midRatio = (startRatio + endRatio) / 2;
    //   let startRadian = startRatio * Math.PI * 2;
    //   let endRadian = endRatio * Math.PI * 2;
    //   let midRadian = midRatio * Math.PI * 2;

    //   if (startRatio === 0 && endRatio === 1) {
    //     isSelected = false;
    //   }

    //   // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    //   k = typeof k !== "undefined" ? k : 1 / 3;

    //   // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    //   let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    //   let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    //   // 计算高亮效果的放大比例（未高亮，则比例为 1）
    //   let hoverRate = isHovered ? 1.05 : 1;

    //   // 返回曲面参数方程
    //   return {
    //     u: {
    //       min: -Math.PI,
    //       max: Math.PI * 3,
    //       step: Math.PI / 32
    //     },

    //     v: {
    //       min: 0,
    //       max: Math.PI * 2,
    //       step: Math.PI / 20
    //     },

    //     x: function(u, v) {
    //       if (u < startRadian) {
    //         return (
    //           offsetX +
    //           Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       if (u > endRadian) {
    //         return (
    //           offsetX +
    //           Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       return (
    //         offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    //       );
    //     },

    //     y: function(u, v) {
    //       if (u < startRadian) {
    //         return (
    //           offsetY +
    //           Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       if (u > endRadian) {
    //         return (
    //           offsetY +
    //           Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
    //         );
    //       }
    //       return (
    //         offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    //       );
    //     },

    //     z: function(u, v) {
    //       if (u < -Math.PI * 0.5) {
    //         return Math.sin(u);
    //       }
    //       if (u > Math.PI * 2.5) {
    //         return Math.sin(u);
    //       }
    //       return Math.sin(v) > 0 ? 1 * height : -1;
    //     }
    //   };
    // },
    echartInit1() {
      let that = this;
      console.log(123);
      // 当前视口宽度
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function(val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
      let cList = [];
      let pList = [];
      let dList = [];
      let dList1 = [];

      for (let i in this.statistic) {
        cList.push(this.statistic[i].warningNum);
        pList.push(this.statistic[i].evaluateNum);
        dList.push(this.statistic[i].date);
        dList1.push(this.statistic[i].date1);
      }
      // console.log(dList1)
      this.myChartTrend = echarts.init(this.$refs.myChartTrend);
      console.log(this.myChartTrend);
      // 绘制条形图
      this.myChartTrend.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#00AAFF",
              width: nowSize(0),
              type: "solid"
            }
          },
          backgroundColor: "rgba(5, 16, 62, 1)",
          borderColor: "rgba(138, 184, 255, 1)",
          borderWidth: nowSize(1),
          textStyle: {
            color: "#ffffff"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          formatter: function(obj) {
            // var value = obj.value;
            console.log(obj);
            console.log(obj[0].dataIndex);
            console.log(dList1);
            return (
              '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem">' +
              dList1[obj[0].dataIndex] +
              "</div>" +
              '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0.1rem;line-height:1">' +
              '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; background: linear-gradient(270deg, #66FFFF 0%, #0077FF 100%);margin-right:0.04rem"></span>' +
              "测评人次" +
              "：<span style='color:#ffffff'>" +
              obj[0].value +
              "</span>" +
              "</div>" +
              '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
              '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem;background: linear-gradient(180deg, #FEDB65 0%, #FFBE44 100%);margin-right:0.04rem"></span>' +
              "预警人次" +
              "：<span style='color:#ffffff'>" +
              obj[1].value +
              "</span>" +
              "</div>"
            );
          }
        },
        grid: {
          top: nowSize(74),
          left: nowSize(16),
          right: nowSize(36),
          bottom: nowSize(15),
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
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
              margin: nowSize(20),
              color: "#B0CDFF",
              fontSize: nowSize(16),
              showMaxLabel: true
              // interval: 0
            },
            data: dList
            // data: [
            //   "08/17",
            //   "08/17",
            //   "08/17",
            //   "08/17",
            //   "08/17",
            //   "08/17",
            //   "08/17"
            // ]
          }
        ],
        yAxis: [
          {
            // name: "(次)",
            // nameTextStyle: {
            //   // x轴name的样式调整
            //   color: "#ffffff",
            //   fontSize: nowSize(18),
            //   padding: [0, 0, nowSize(10), -nowSize(0)] // 上右下左与原位置距离
            // },
            // nameGap: nowSize(20),  // x轴name与横坐标轴线的间距
            // nameLocation: "end", // x轴name处于x轴的什么位置
            type: "value",
            // max: Number(that.detail.evaluationCount),
            // min: 10,
            // splitNumber: 10,
            // axisLine: {
            //   show: false
            // },
            splitLine: {
              // show: false
              lineStyle: {
                color: "rgba(216,216,216,0.18)"
              }
            },
            axisLabel: {
              margin: nowSize(20),
              fontSize: nowSize(16),
              color: "#ffffff"
            },
            axisTick: {
              show: false
            },
            minInterval: 10
          }
        ],
        series: [
          {
            name: "测评人次：",
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#00F2EF",
                lineStyle: {
                  type: "solid",
                  width: nowSize(2)
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(47,69,255,0.92)"
                  },
                  {
                    offset: 1,
                    color: "rgba(28,0,255,0)"
                  }
                ])
              }
            },
            barWidth: nowSize(0),
            // color:"#00FFFF",
            data: pList
            // data: [3, 2, 1, 40, 2, 5, 1]
          },
          {
            name: "预警人次：",
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(254, 219, 101, 1)",
                lineStyle: {
                  type: "solid",
                  width: nowSize(2)
                }
              }
            },
            lineStyle: {
              color: "rgba(0,194,255,1)"
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(250,100,0,0.52)"
                  },
                  {
                    offset: 1,
                    color: "rgba(250,100,0,0)"
                  }
                ])
              }
            },
            data: cList
            // data: [9, 1, 3, 4, 61, 0, 0]
          }
        ]
      });
    },
    fontChart(res) {
      let docEl = document.documentElement;
      let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (!clientWidth) return;
      // 此处的3840 为设计稿的宽度，记得修改！
      let fontSize = clientWidth / 1920;
      return res * fontSize;
    },
    hideTip(e) {
      console.log(e.target.nodeName != 'CANVAS')
      // 点击事件 是否是 Echarts图
      if (e.target.nodeName != 'CANVAS') {
        // getInstanceByDom:获取 dom 容器上的实例
        this.myChartTrend.dispatchAction({
          type: 'hideTip'
        })
        this.myChartTrend.dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: 'leave'
        })
        this.myChartPie.dispatchAction({
          type: 'hideTip'
        })
        this.myChartPie.dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: 'leave'
        })
        this.myChartPieSex.dispatchAction({
          type: 'hideTip'
        })
        this.myChartPieSex.dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: 'leave'
        })
        this.myChartPieCrl.dispatchAction({
          type: 'hideTip'
        })
        this.myChartPieCrl.dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: 'leave'
        })
      }
    },
    echartInit() {
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
      console.log(this.warningStatistic.depressionNum)
      console.log(this.warningStatistic.depressionNum ? this.warningStatistic.depressionNum : 0)
      this.pieList = [
        {
          name: "抑郁",
          value: NP.times(this.warningStatistic.depressionPerct, 100),
          y: NP.times(this.warningStatistic.depressionPerct, 100),
          // y: 50,
          num: this.warningStatistic.depressionNum ? this.warningStatistic.depressionNum : 0
        },
        {
          name: "焦虑",
          value: NP.times(this.warningStatistic.anxietyPerct, 100),
          y: NP.times(this.warningStatistic.anxietyPerct, 100),
          // y: 10,
          num: this.warningStatistic.anxietyNum
            ? this.warningStatistic.anxietyNum
            : 0
        },
        {
          name: "强迫",
          value: NP.times(this.warningStatistic.forcePerct, 100),
          y: NP.times(this.warningStatistic.forcePerct, 100),
          // y: 20,
          num: this.warningStatistic.forceNum
            ? this.warningStatistic.forceNum
            : 0
        },
        {
          name: "自我伤害",
          value: NP.times(this.warningStatistic.suicidePerct, 100),
          y: NP.times(this.warningStatistic.suicidePerct, 100),
          // y: 10,
          num: this.warningStatistic.suicideNum
            ? this.warningStatistic.suicideNum
            : 0
        },
        {
          name: "敌对",
          value: NP.times(this.warningStatistic.violencePerct, 100),
          y: NP.times(this.warningStatistic.violencePerct, 100),
          // y: 10,
          num: this.warningStatistic.violenceNum
            ? this.warningStatistic.violenceNum
            : 0
        }
      ];
      console.log(this.pieList)
      // this.pieList.sort((a, b) => {
      //   return a.y - b.y;
      // });
      // this.dataList = [
      //   { name: "测试1:", y: 6.3, color: "#388D60" },
      //   { name: "测试2:", y: 2.3, color: "#BEB84C" },
      //   { name: "测试3:", y: 2.3, color: "#3A55B0" },
      //   { name: "测试4:", y: 9.3, color: "#7B40A5" },
      //   { name: "测试5:", y: 0.0, color: "#B76B3D" }
      // ]
      // this.option = {
      //   chart: {
      //     type: "pie", // 饼图
      //     options3d: {
      //       enabled: true, // 使用3d功能
      //       alpha: 70, // 延y轴向内的倾斜角度
      //       beta: 0
      //     },
      //     backgroundColor: "rgba(0, 0, 0, 0)", // 不显示背景色
      //     width: 520,
      //     height: 220 // 设置大小是为了饼图能在想要的区域中显示
      //   },
      //   legend: {
      //     bottom: "0%",
      //     itemStyle: {
      //       // 图例文字的样式
      //       color: "#999",
      //       fontSize: 10
      //     },
      //     left: "center",
      //     itemWidth: 100,
      //     // doesn't perfectly work with our tricks, disable it
      //     selectedMode: false,
      //     data: this.dataList.map((item, index) => {
      //       item.icon = "circle";
      //       return item;
      //     })
      //   },
      //   title: {
      //     text: "" // 图表的标题文字
      //   },
      //   subtitle: {
      //     text: "" // 副标题文字
      //   },
      //   plotOptions: {
      //     pie: {
      //       allowPointSelect: true, // 每个扇块能否选中
      //       cursor: "pointer", // 鼠标指针
      //       size: 150,
      //       showInLegend: true, // 是否显示图例
      //       depth: 35, // 饼图的厚度
      //       dataLabels: {
      //         enabled: true, // 是否显示饼图的线形tip
      //         distance: 30, // 设置引导线的长度
      //         color: "#999", // 全局设置字体颜色
      //         style: {
      //           textOutline: "none", // 去掉文字白边
      //           fontSize: "12"
      //         },
      //         formatter: function () {
      //           return this.point.name + this.y + "%";
      //         }
      //       }
      //     }
      //   },
      //   credits: {
      //     enabled: false // 禁用版权url    此处不设置
      //   },
      //   series: [
      //     {
      //       type: "pie",
      //       name: "", // 统一的前置词,非必须
      //       data: this.dataList,
      //       startAngle: 0, // 调整饼图的角度   方向：顺时针
      //       label: {
      //         show: true,
      //         position: "outside",
      //         formatter: "{b}：{d}%",
      //         normal: {
      //           show: true,
      //           fontSize: 14,
      //           formatter: ["  {a|{b}：{d}%}"].join("\n"), // 用\n来换行
      //           rich: {
      //             a: {
      //               left: 20,
      //               padding: [0, -140, 0, -180] // 位置按需要调整
      //             }
      //           }
      //         }
      //       }
      //     }
      //   ]
      // }
      // this.option.series[0].data.forEach((item, index) => {
      //   item.name = this.dataList[index].name;
      //   item.y = this.dataList[index].y;
      // });
      // Highcharts.chart("myChartPie", this.option);

      // // 可以用
      // this.dataList = this.pieList;
      // let quantity = 0; // 总数
      // console.log(this.dataList)
      // this.dataList.forEach(item => {
      //   quantity += item.y;
      // });
      // this.dataList.forEach(item => {
      //   item.bfb = parseInt((item.y / quantity) * 100);
      //   item.h = item.bfb * 0.5 >= 50 ? 50 : item.bfb * 0.5;
      //   // item.h = parseInt(0.60 * item.bfb); // 最高高度60，根据比例渲染高度
      //   // console.log(this.dataList, "dataList----->>>");
      // });
      // console.log(this.dataList)
      // // 修改3d饼图绘制过程
      // var each = highcharts.each;
      // var round = Math.round;
      // var cos = Math.cos;
      // var sin = Math.sin;
      // var deg2rad = Math.deg2rad;
      // highcharts.wrap(
      //   highcharts.seriesTypes.pie.prototype,
      //   "translate",
      //   function(proceed) {
      //     proceed.apply(this, [].slice.call(arguments, 1));
      //     // Do not do this if the chart is not 3D
      //     console.log(this.chart)
      //     if (!this.chart.is3d()) {
      //       return;
      //     }
      //     var series = this;
      //     var chart = series.chart;
      //     var options = chart.options;
      //     var seriesOptions = series.options;
      //     var depth = seriesOptions.depth || 0;
      //     var options3d = options.chart.options3d;
      //     var alpha = options3d.alpha;
      //     var beta = options3d.beta;
      //     var z = seriesOptions.stacking
      //       ? (seriesOptions.stack || 0) * depth
      //       : series._i * depth;
      //     z += depth / 2;
      //     if (seriesOptions.grouping !== false) {
      //       z = 0;
      //     }
      //     each(series.data, function(point) {
      //       var shapeArgs = point.shapeArgs;
      //       var angle;
      //       point.shapeType = "arc3d";
      //       var ran = that.fontChart(point.options.h);
      //       shapeArgs.z = z;
      //       shapeArgs.depth = depth * 0.75 + ran;
      //       shapeArgs.alpha = alpha;
      //       shapeArgs.beta = beta;
      //       shapeArgs.center = series.center;
      //       shapeArgs.ran = ran;
      //       angle = (shapeArgs.end + shapeArgs.start) / 2;
      //       point.slicedTranslation = {
      //         translateX: round(
      //           cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
      //         ),
      //         translateY: round(
      //           sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
      //         )
      //       };
      //     });
      //   }
      // );
      // (function(H) {
      //   H.wrap(highcharts.SVGRenderer.prototype, "arc3dPath", function(
      //     proceed
      //   ) {
      //     // Run original proceed method
      //     var ret = proceed.apply(this, [].slice.call(arguments, 1));
      //     ret.zTop = (ret.zOut + 0.5) / 100;
      //     return ret;
      //   });
      // })(highcharts);
      // highcharts.chart('myChartPie', {
      //   chart: {
      //     animation: false,
      //     backgroundColor: "none",
      //     type: "pie", // 饼图
      //     margin: [0, 0, 0, 0],
      //     options3d: {
      //       enabled: true, // 使用3d功能
      //       alpha: 60, // 延y轴向内的倾斜角度
      //       beta: 0
      //     },
      //     events: {
      //       load: function() {
      //         var each = highcharts.each;
      //         var points = this.series[0].points;
      //         each(points, function(p, i) {
      //           p.graphic.attr({
      //             translateY: -p.shapeArgs.ran
      //           });
      //           p.graphic.side1.attr({
      //             translateY: -p.shapeArgs.ran
      //           });
      //           p.graphic.side2.attr({
      //             translateY: -p.shapeArgs.ran
      //           });
      //         });
      //       }
      //     }
      //   },
      //   tooltip: {
      //     // show: false,
      //     backgroundColor: 'rgb(5, 16, 62)',
      //     borderColor: 'rgba(138, 184, 255, 1)',
      //     borderWidth: nowSize(1),
      //     textStyle: {
      //       color: '#fff',
      //       fontSize: 13
      //     },
      //     useHTML: true,
      //     headerFormat: '<small style="color: #ffffff">{point.key}</small><table>',
      //     pointFormat: '<tr><td ><small style="background: {point.color};width:0.08rem;height:0.08rem;border-radius:50%"></small></td>' +
      //     '<td style="text-align: left;color: #ffffff">{point.num} {point.y}%</td></tr>',
      //     footerFormat: '</table>'
      //     // formatter: function() {
      //     //   return (
      //     //     '<span style="margin:-10px;padding:0.1rem;"><span style="display:block;color:#fff;font-size:0.2rem;font-weight:600">' + this.point.name + '</span><br style="line-height:0.2rem"/>' +
              
      //     //     `<span style="display:flex;align-items:center;justify-content: center;"><span style="display:inline-block;margin-right:0.04rem;border-radius:0.08rem;width:0.08rem;height:0.08rem;background-color:${this.point.color};"></span>` +
      //     //     `<span style="color:#fff;font-size:0.16rem;margin-right:0.1rem">${this.point.num}次&nbsp;&nbsp;</span><span style="color:#fff;font-size:0.16rem;">占比${this.point.y}%</span></span></span>`
      //     //   )
      //     // }
      //   },
      //   legend: {
      //     enabled: false // 关闭图例
      //     // align: "center", // 水平方向位置
      //     // verticalAlign: "center", // 垂直方向位置
      //     // layout: "vertical",
      //     // x: that.fontChart(0),
      //     // y: that.fontChart(30),
      //     // symbolWidth: that.fontChart(10),
      //     // symbolHeight: that.fontChart(10),
      //     // symbolRadius: "50%", // 修改成圆
      //     // itemMarginBottom: that.fontChart(8),
      //     // labelFormat: "{name}&nbsp;&nbsp;&nbsp;&nbsp;{y}",
      //     // itemStyle: {
      //     //   color: "#f4f4f6",
      //     //   fontSize: that.fontChart(12)
      //     // }
      //   },
      //   title: {
      //     // enabled: false,
      //     text: ""
      //   },
      //   subtitle: {
      //     text: ""
      //   },
      //   plotOptions: {
      //     pie: {
      //       // allowPointSelect: true, // 每个扇块能否选中
      //       // cursor: "pointer", // 鼠标指针
      //       // size: 150,
      //       // showInLegend: true, // 是否显示图例
      //       // depth: 35, // 饼图的厚度
      //       // dataLabels: {
      //       //   enabled: true, // 是否显示饼图的线形tip
      //       //   distance: 30, // 设置引导线的长度
      //       //   color: "#999", // 全局设置字体颜色
      //       //   style: {
      //       //     textOutline: "none", // 去掉文字白边
      //       //     fontSize: "12"
      //       //   },
      //       //   formatter: function () {
      //       //     return this.point.name + this.y + "%";
      //       //   }
      //       // },
      //       allowPointSelect: false, // 禁用点击
      //       cursor: "pointer",
      //       depth: that.fontChart(45),
      //       showInLegend: true,
      //       size: '85%', // 外圈直径大小
      //       // innerSize: that.fontChart(95), // 内圈直径大小
      //       center: ["50%", "65%"],
      //       colors: pieColor,
      //       dataLabels: {
      //         enabled: true, // 是否显示饼图的线形tip
      //         distance: that.fontChart(20),
      //         align: "center",
      //         position: "outside",
      //         // format: "{point.bfb}%",
      //         // formatter: (point, b) => {
      //         //   console.log(point, 'ponit-->>')
      //         //   console.log(b, 'ponit-->>')
      //         // },
      //         style: {
      //           textOutline: "none",
      //           fontSize: that.fontChart(18),
      //           padding: -10,
      //           style: {
      //             fontWeight: "bold",
      //             fontSize: "14px",
      //             color: "#fff",
      //             textOutline: "1px 1px transparent"
      //           }
      //         },
      //         formatter: function () {
      //           return (
      //             '<div style="display:flex;margin-top:-0.2rem">' +
      //             // '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; background: rgba(160, 208, 255, 1);margin-right:0.04rem"></span>' +
      //             "<span style='color:#ffffff'>" +
      //               this.point.name +
      //             "：</span>" +
      //             "<span style='color:#ffffff'>" +
      //               this.y +
      //             "%</span>" +
      //             "</div>"
      //           )
      //         }
      //       }
      //     }
      //   },
      //   credits: {
      //     enabled: false // 禁用版权信息
      //   },
      //   series: [
      //     {
      //       type: "pie",
      //       name: "",
      //       // startAngle: 0,
      //       data: that.dataList
      //     }
      //   ]
      // });
      if (this.pieList[0].value === 0 &&
      this.pieList[1].value === 0 &&
      this.pieList[2].value === 0 &&
      this.pieList[3].value === 0 &&
      this.pieList[4].value === 0) {
        flag = true
      }
      this.pieList.forEach((item, index) => {
        item.itemStyle = {
          opacity: 1,
          color: pieColor[index]
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
            lineHeight: nowSize(30),
            color: pieColor[index],
            formatter: [
              '{b|{b}：}{d|{d}%}'
            ].join('\n'), // 用\n来换行
            rich: {
              b: {
                fontSize: nowSize(14),
                fontFamily: 'SourceHanSansCN-Regular, SourceHanSansCN',
                fontWeight: 400,
                color: '#fff',
                lineHeight: nowSize(28),
                align: 'left'
              },
              d: {
                fontSize: nowSize(14),
                fontFamily: 'SourceHanSansCN-Regular, SourceHanSansCN',
                fontWeight: 600,
                lineHeight: nowSize(28),
                color: pieColor[index],
                align: 'left'
              },
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
            length: nowSize(25),
            length2: nowSize(45),
            showAbove: true,
            // minTurnAngle: 90,
            minSurfaceAngle: 90,
            lineStyle: {
              width: nowSize(1),
              color: pieColor[index]
            }
          }
        }
      })
      this.myChartPie = echarts.init(this.$refs.myChartPie);
      console.log(this.pieList)
      this.pieOption = getPie3D(this.pieList, 2, 300, 45, 20, 1, -1)
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
        label: {
          opacity: 1,
          fontSize: 13,
          lineHeight: 20
        },
        startAngle: -60, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: flag ? ['0%', '60%'] : ['0%', '60%'],
        center: ['50%', '60%'],
        data: pieList1,
        itemStyle: {
          color: "transparent",
          opacity: 1 // 这里必须是0，不然2d的图会覆盖在表面
        }
      })
      this.myChartPie.setOption(this.pieOption)
      console.log(this.myChartPie)
      this.bindListen(this.myChartPie, 'pieOption')
      // this.bindListen(this.myChartPieCrl, 'crlOption')
      // let optionPie = this.getPie3D(pieList, '');
      // this.myChartPie.setOption(optionPie);

      // 绘制立体环饼图1
      let crlFlag = false;
      this.crlList = [
        {
          name: "30岁以下",
          value: NP.times(this.ageGenderStatistic.belowThirtyPerct, 100)
        },
        {
          name: "31-40岁",
          value: NP.times(this.ageGenderStatistic.thirtyToFortyPerct, 100)
        },
        {
          name: "41-50岁",
          value: NP.times(this.ageGenderStatistic.fortyToFiftyPerct, 100)
        },
        {
          name: "51岁以上",
          value: NP.times(this.ageGenderStatistic.aboveFiftyPerct, 100)
        }
      ];
      if (
        this.crlList[0].value === 0 &&
        this.crlList[1].value === 0 &&
        this.crlList[2].value === 0 &&
        this.crlList[3].value === 0
      ) {
        crlFlag = true;
      }
      this.crlList.forEach((item, index) => {
        item.itemStyle = {
          opacity: 1,
          color: crlColor[index]
        };
        item.tooltip = {
          formatter: params => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${
                params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${params.series[params.seriesIndex].pieData.value}`;
            }
          }
        };
        item.label = {
          normal: {
            show: true,
            lineHeight: nowSize(20),
            color: crlColor[index],
            overflow: "none",
            formatter: ["{b|{b}：}\n{d|{d}%}"].join("\n"), // 用\n来换行
            rich: {
              b: {
                fontSize: nowSize(12),
                fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
                fontWeight: 400,
                color: "#fff",
                lineHeight: nowSize(14),
                align: "left"
              },
              d: {
                fontSize: nowSize(12),
                fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
                fontWeight: 600,
                lineHeight: nowSize(14),
                color: crlColor[index],
                align: "left"
              },
              hr: {
                backgroundColor: crlColor[index],
                borderRadius: nowSize(3),
                width: nowSize(6),
                height: nowSize(6)
              }
            }
          }
        };
        item.labelLine = {
          normal: {
            length: nowSize(25),
            length2: nowSize(10),
            showAbove: true,
            minTurnAngle: 90,
            maxSurfaceAngle: 90,
            lineStyle: {
              width: nowSize(1),
              color: crlColor[index]
            }
          }
        };
      });

      this.myChartPieCrl = echarts.init(this.$refs.myChartPieCrl);
      this.crlOption = getPie3D(
        this.crlList,
        0.75,
        260,
        30,
        20,
        1,
        this.participationNum
      );
      this.myChartPieCrl.setOption(this.crlOption);
      // // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      let crlList1 = JSON.parse(JSON.stringify(this.crlList));
      if (!crlFlag) {
        for (let i in crlList1) {
          crlList1[i].itemStyle.color = "transparent";
        }
      }
      this.crlOption.series.push({
        name: "预警", // 自己根据场景修改
        backgroundColor: "transparent",
        color: "transparent",
        type: "pie",
        label: {
          opacity: 1,
          fontSize: nowSize(14),
          lineHeight: nowSize(20)
          // overflow: 'breanAll'
        },
        labelLayout: {
          // verticalAlign: 'middle'
          // y: '10%'
          // rotate: -30
        },
        startAngle: -60, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: crlFlag ? ["0%", "38%"] : ["0%", "38%"],
        center: ["50%", "60%"],
        data: crlList1,
        itemStyle: {
          color: "transparent",
          opacity: 0 // 这里必须是0，不然2d的图会覆盖在表面
        }
      });
      this.myChartPieCrl.setOption(this.crlOption);
      this.bindListen(this.myChartPieCrl, "crlOption");

      // 绘制立体环饼图2
      let sexFlag = false;
      this.sexList = [
        {
          name: "男性",
          value: NP.times(this.ageGenderStatistic.malePerct, 100)
          // value: 1
        },
        {
          name: "女性",
          value: NP.times(this.ageGenderStatistic.femalePerct, 100)
          // value: 0
        }
      ];
      if (this.sexList[0].value === 0 && this.sexList[1].value === 0) {
        sexFlag = true;
      }
      this.sexList.forEach((item, index) => {
        item.itemStyle = {
          opacity: 1,
          color: sexColor[index]
        };
        item.tooltip = {
          formatter: params => {
            console.log(params)
            if (params.seriesName !== "mouseoutSeries") {
              return `${
                params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${(params.series[params.seriesIndex].pieData.value /
                100) *
                this.participationNum}`;
            }
          }
        };
        item.label = {
          normal: {
            show: true,
            // lineHeight: nowSize(18),
            color: sexColor[index],
            overflow: "none",
            formatter: `{c|${this.sexList[index].value / 100 * that.participationNum}}\n{b|{b}：}{d|{d}%}`, // 用\n来换行
            rich: {
              b: {
                fontSize: nowSize(12),
                fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
                fontWeight: 400,
                color: "#fff",
                lineHeight: nowSize(14),
                align: "left"
              },
              c: {
                // width: '100%',
                fontSize: nowSize(12),
                fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
                fontWeight: 600,
                color: sexColor[index],
                // color: '#fff',
                lineHeight: nowSize(14),
                align: "left"
              },
              d: {
                fontSize: nowSize(12),
                fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
                fontWeight: 600,
                color: sexColor[index],
                // padding: [0, 0, 0, -nowSize(4)],
                lineHeight: nowSize(14),
                align: "left"
              }
            }
          }
        };
        item.labelLine = {
          normal: {
            length: nowSize(20),
            length2: nowSize(10),
            showAbove: true,
            minTurnAngle: 90,
            maxSurfaceAngle: 90,
            lineStyle: {
              width: nowSize(1),
              color: sexColor[index]
            }
          }
        };
      });

      this.myChartPieSex = echarts.init(this.$refs.myChartPieSex);
      this.sexOption = getPie3D(
        this.sexList,
        0.75,
        260,
        30,
        20,
        1,
        this.participationNum
      );
      this.myChartPieSex.setOption(this.sexOption);
      let sexList1 = JSON.parse(JSON.stringify(this.sexList));
      if (!sexFlag) {
        for (let i in sexList1) {
          sexList1[i].itemStyle.color = "transparent";
        }
      }

      this.sexOption.series.push({
        name: "预警", // 自己根据场景修改
        backgroundColor: "transparent",
        color: "transparent",
        type: "pie",
        label: {
          opacity: 1,
          fontSize: nowSize(13),
          lineHeight: nowSize(20)
        },
        startAngle: -60, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: sexFlag ? ["0%", "38%"] : ["0%", "38%"],
        center: ["50%", "60%"],
        data: sexList1,
        itemStyle: {
          color: "transparent",
          opacity: 0 // 这里必须是0，不然2d的图会覆盖在表面
        }
      });
      this.myChartPieSex.setOption(this.sexOption);
      this.bindListen(this.myChartPieSex, "sexOption");
    }
  }
};
</script>
<style lang="less">
.el-tooltip__popper.is-light {
  background: rgba(5, 16, 62, 1);
  border: 0.01rem solid rgba(138, 184, 255, 1);
  color: #fff;
  .top_title {
    font-size: 0.2rem;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 600;
    color: #ffffff;
    padding: 0.06rem 0 0.12rem;
  }
  .c_pies {
    display: flex;
    font-size: 0.16rem;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;
    align-items: center;
    padding: 0 0 0.06rem 0;
    .c_pie_th {
      display: inline-block;
      width: 0.08rem;
      height: 0.08rem;
      border-radius: 0.04rem;
      margin-right: 0.08rem;
    }
    .c_thq11 {
      background: linear-gradient(270deg, #66ffff 0%, #0077ff 100%);
    }
    .c_thq12 {
      background: linear-gradient(180deg, #fedb65 0%, #ffbe44 100%);
    }
    .c_thq1 {
      background: linear-gradient(270deg, #66ffff 0%, #54a4ff 100%);
    }
    .c_thq2 {
      background: linear-gradient(270deg, #3c97ff 0%, #6787fa 100%);
    }
    .c_thq3 {
      background: linear-gradient(270deg, #a181ff 0%, #7e5dff 100%);
    }
    .c_thq4 {
      background: linear-gradient(180deg, #fedb65 0%, #ffbe44 100%);
    }
    // .c_thq1 {
    //   background: linear-gradient(
    //     270deg,
    //     #66ffff 0%,
    //     #0077ff 100%
    //   );
    // }
    // .c_thq2 {
    //   background: linear-gradient(
    //     270deg,
    //     #ffffff 0%,
    //     #53ff6d 100%
    //   );
    // }
    // .c_thq3 {
    //   background: linear-gradient(
    //     180deg,
    //     #fedb65 0%,
    //     #ffbe44 100%
    //   );
    // }
    // .c_thq4 {
    //   background: linear-gradient(
    //     270deg,
    //     #dcb6ff 0%,
    //     #b973ff 100%
    //   );
    // }
  }
}
.el-tooltip__popper .popper__arrow {
  border-width: 0;
  opacity: 0;
  // border-color: rgba(151, 205, 255, 0.3);
}
.el-popover {
  position: absolute;
  background: #ffffff;
  width: 4rem;
  margin-right: 0.1rem;
  border-radius: 0.04rem;
  border: 0.01rem solid #ebeef5;
  padding: 0.1rem;
  right: 0.32rem;
  left: auto !important;
  z-index: 2000;
  color: #333333;
  line-height: 1.5;
  text-align: justify;
  font-size: 0.18rem;
  -webkit-box-shadow: 0 0.02rem 0.12rem 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.02rem 0.12rem 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
}
.tv_rr_ul {
  .tv_rr_li {
    .el-popover__reference-wrapper {
      .el-button {
        width: 100%;
        padding: 0;
        background: transparent;
        border: 0;
        span {
          display: block;
          width: 100%;
          color: #ffffff;
          font-size: 0.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }
      }
    }
  }
}
.tv_left_search {
  width: 95%;
  margin: 0.2rem 0;
  .el-input__inner {
    -webkit-appearance: none;
    background-color: transparent;
    background-image: none;
    border-radius: 0.04rem;
    border: 0.02rem solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #ffffff;
    display: inline-block;
    height: 0.48rem;
    line-height: 0.48rem;
    outline: 0;
    padding: 0 0.4rem 0 0.2rem;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    // border-top-right-radius: 0;
    // border-bottom-right-radius: 0;
    // border-right: 0;
    width: 100%;
    font-size: 0.2rem;
  }
  .el-input__suffix {
    right: 0.08rem;
    .el-icon-search {
      width: 0.32rem;
      line-height: 0.48rem;
      font-size: 0.2rem;
      color: #ffffff;
    }
  }
  // .el-input-group__append, .el-input-group__prepend {
  //     background-color: transparent;
  //     color: #ffffff;
  //     vertical-align: middle;
  //     display: table-cell;
  //     position: relative;
  //     border: 0.02rem solid #DCDFE6;
  //     border-radius: 0.04rem;
  //     padding: 0;
  //     width: 0.01rem;
  //     white-space: nowrap;
  //     border-left: 0;
  //     border-top-left-radius: 0;
  //     border-bottom-left-radius: 0;
  // }
  // .el-button {
  //     display: inline-block;
  //     line-height: 1;
  //     white-space: nowrap;
  //     cursor: pointer;
  //     background: transparent;
  //     border: 0.01rem solid #DCDFE6;
  //     color: #ffffff;
  //     -webkit-appearance: none;
  //     text-align: center;
  //     -webkit-box-sizing: border-box;
  //     box-sizing: border-box;
  //     outline: 0;
  //     margin: 0;
  //     -webkit-transition: .1s;
  //     transition: .1s;
  //     font-weight: 500;
  //     padding: 0.10rem 0.2rem;
  //     font-size: 0.24rem;
  //     border-radius: 0.04rem;
  // }
}
</style>
<style lang="less" scoped>
.heart_view_wrap {
  // display: flex;
  // justify-content: flex-start;
  // text-align: left;
  // padding-top: 0.28rem;
  // padding-bottom: 0.1rem;
  // width: 100%;
  padding: 0.1rem 0.2rem 0rem;
  .hv_box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    .hv_main {
      display: flex;
      justify-content: space-between;
      .hvm_left {
        // width: 6.12rem;
        .hvml_img {
          height: 6.34rem;
          margin-bottom: 0.2rem;
          position: relative;
          .lib_boxz {
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0rem;
            left: 0;
            right: 0rem;
            margin-left: -2.1rem;
            overflow: hidden;
            width: 9.98rem;
            height: 9.26rem;
            z-index: -1;
            .lib_b_lizi {
              width: 9.98rem;
              height: 9.26rem;
              // position: absolute;
              // margin: auto;
              // top: 0;
              // bottom: 0rem;
              // left: 0;
              // right: 0rem;
              background: url(../../assets/images/heart/bg_lizi.png) no-repeat
                center;
              background-size: cover;
              transform: translate(0, 9.98rem);
              animation: liziAnimation 9s linear infinite;
            }
            @keyframes liziAnimation {
              0% {
                transform: translate(0, 9.98rem);
                // background-position: 0 -50%;
                opacity: 0;
              }
              1% {
                transform: translate(0, 7rem);
                // background-position: 0 -20%;
                opacity: 0;
              }
              1.05% {
                transform: translate(0, 7rem);
                // background-position: 0 -20%;
                opacity: 1;
              }
              // 50% {
              //   transform: translate(0, -85%);
              //   // background-position: 0 50%;
              //   opacity: 1;
              // }
              99% {
                transform: translate(0, -8rem);
                // background-position: 0 120%;
                opacity: 1;
              }
              99.05% {
                transform: translate(0, -8rem);
                // background-position: 0 120%;
                opacity: 0;
              }
              100% {
                transform: translate(0, 9.98rem);
                // background-position: 0 150%;
                opacity: 0;
              }
            }
          }

          // @keyframes sizeAnimation {
          //   0% { background-position: 0 200%; opacity: 0.2;}
          //   15% { background-position: 0 140%; opacity: 1;}
          //   50% { background-position: 0 0%; opacity: 1;}
          //   85% { background-position: 0 -140%; opacity: 1;}
          //   100% { background-position: 0 -200%; opacity: 0.2;}
          // }
          .img0 {
            display: none;
            position: absolute;
            margin: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 85%;
          }
          .img1 {
            display: block;
            bottom: 0.1rem;
            left: 0;
            right: 0;
            z-index: 1;
          }
          .img3 {
            display: block;
            bottom: -0.08rem;
            left: 0rem;
            right: 0;
            z-index: 2;
            animation: opc 1.5s linear infinite;
          }
          .img2 {
            display: block;
            bottom: 0.32rem;
            left: -1.3rem;
            width: 7.65rem;
            height: 4.57rem;
            right: 0;
            z-index: 3;
            transform: translate(0, 0);
            animation: cir 3s linear infinite;
          }
          .img4 {
            display: block;
            bottom: -1.24rem;
            left: 0;
            right: 0;
            transform-origin: center;
            transform: rotateX(73deg) rotateY(0deg) rotateZ(0);
            width: 4.7rem;
            z-index: 4;
            animation: rotate 15s linear infinite;
            opacity: 0.6;
          }
          @keyframes rotate {
            from {
              transform: rotateX(73deg) rotateY(0deg) rotateZ(0deg);
            }
            to {
              transform: rotateX(73deg) rotateY(0deg) rotateZ(360deg);
            }
          }
          @keyframes opc {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          @keyframes cir {
            0% {
              transform: translate(0, 0);
              // opacity: 1;
              // scale: 1;
              // height: 4.57rem;
              // margin-bottom: 0rem;
              // bottom: 0.32rem;
            }
            25% {
              transform: translate(0, 0.18rem);
              // opacity: 0.9;
              // scale: 1;
              // // height: 4.87rem;
              // margin-bottom: 0.2rem;
              // bottom: 0.52rem;
            }
            50% {
              transform: translate(0, 0);
              // opacity: 1;
              // scale: 1;
              // // height: 4.57rem;
              // margin-bottom: 0rem;
              // bottom: 0.32rem;
            }
            75% {
              transform: translate(0, -0.18rem);
              // opacity: 0.9;
              // scale: 1;
              // // height: 4.27rem;
              // margin-bottom: 0.2rem;
              // bottom: 0.12rem;
            }
            100% {
              transform: translate(0, 0);
              // opacity: 1;
              // scale: 1;
              // height: 4.57rem;
              // margin-bottom: 0rem;
              // bottom: 0.32rem;
            }
            // 100% {
            //   bottom: 0.36rem;
            // }
          }
          .hvml_total {
            position: relative;
            top: 0.2rem;
            z-index: 6;
            .hvml_t_head {
              ul {
                width: 4rem;
                margin: 0 auto;
                display: flex;
                justify-content: space-around;
                li {
                  font-size: 0.36rem;
                  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                  font-weight: bold;
                  color: #ffffff;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 0.62rem;
                  height: 0.72rem;
                  background: url("../../assets/images/heart/total.png")
                    no-repeat center;
                  background-size: cover;
                }
              }
            }
            .hvml_t_mian {
              margin-top: 0.24rem;
              ol {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                li {
                  width: 1.6rem;
                  height: 1.6rem;
                  position: relative;
                  // margin: 0 0.2rem;
                  div {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 7;
                    width: 1.6rem;
                    height: 1.6rem;
                    // display: flex;
                    // flex-wrap: wrap;
                    // justify-content: center;
                    // align-items: center;
                    span {
                      display: block;
                      width: 100%;
                      font-size: 0.28rem;
                      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                      font-weight: bold;
                      color: #ffffff;
                      margin-top: 0.5rem;
                      line-height: 1.2;
                    }
                    p {
                      width: 100%;
                      font-size: 0.2rem;
                      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                      font-weight: 500;
                      color: #ffffff;
                    }
                  }
                  img {
                    width: 100%;
                    height: 100%;
                    transform: rotate(0deg);
                    animation: rotx 20s linear infinite;
                    transform-origin: center;
                    margin-top: 1.2rem;
                  }
                  .img11 {
                    transform: rotate(360deg);
                    animation: rotx1 10s linear infinite;
                    margin-top: 0rem;
                  }
                  .img22 {
                    margin-top: 1.2rem;
                    transform: rotate(0deg);
                    animation: rotx2 15s linear infinite;
                  }
                  @keyframes rotx {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                  @keyframes rotx1 {
                    from {
                      transform: rotate(360deg);
                    }
                    to {
                      transform: rotate(0deg);
                    }
                  }
                  @keyframes rotx2 {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                }
              }
            }
          }
        }

        .hvml_box {
          width: 100%;
          position: relative;
          margin-bottom: 0.2rem;
          // height: 3.07rem;
          .hvml_b_head {
            font-size: 0.2rem;
            line-height: 1;
            font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
            font-weight: 800;
            color: #ffffff;
            position: absolute;
            top: 0.12rem;
            left: 1.09rem;
          }
          .hvml_b_bg {
            display: block;
            width: 6.12rem;
            height: 3.07rem;
          }
          .hvml_main {
            position: absolute;
            margin: auto;
            top: 0.44rem;
            left: 0.04rem;
            right: 0.04rem;
            bottom: 0.04rem;

            // background: #000;
            .hvml_tain {
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 100%;
              height: 100%;
              .t_one {
                .to_img {
                  width: 1.22rem;
                  height: 1.08rem;
                }
                .to_type {
                  font-size: 0.24rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  line-height: 0.36rem;
                }
                .i_col1 {
                  color: #5af0ff;
                }
                .i_col2 {
                  color: #fedb65;
                }
                .i_col3 {
                  color: #ff952e;
                }
                .i_col4 {
                  color: #e892ff;
                }
                .to_num {
                  font-size: 0.18rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #ffffff;

                  span {
                    font-size: 0.26rem;
                    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                    font-weight: 500;
                    line-height: 0.4rem;
                  }
                }
              }
            }
            .tv_ec {
              width: 100%;
              // margin-bottom: 0.32rem;
              position: relative;
              .tv_ec_head {
                font-size: 0.28rem;
                line-height: 0.8rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                position: absolute;
                top: 0.24rem;
                left: 0;
                width: 100%;
                z-index: 100;
                span {
                }
                ul {
                  display: flex;
                  align-items: center;
                  margin-right: 0.24rem;
                  li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // width: 0.8rem;
                    height: 0.26rem;
                    width: 0.5rem;
                    // padding: 0 0.1rem;
                    background: rgba(44, 58, 135, 1);

                    border: 0.02rem solid rgba(44, 58, 135, 1);
                    cursor: pointer;
                    font-size: 0.16rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #ffffff;
                    // border: 0.01rem solid #ffffff;
                  }

                  .tv_ec_act {
                    color: #ffffff;
                    background: rgba(37, 59, 177, 1);
                    border: 0.02rem solid rgba(93, 149, 255, 1);
                  }
                  // .tv_ec_act30{
                  //   border-color: #00AAFF;
                  //   color: #00AAFF;
                  // }
                  // .tv_ec_actr{
                  //   border-right: 0;
                  // }
                  // .tv_ec_actl{
                  //   border-left: 0;
                  // }
                }
                .center_pie {
                  display: flex;
                  justify-content: space-evenly;
                  align-items: center;
                  position: absolute;
                  margin: auto;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  z-index: -1;
                  .c_pie_li {
                    padding: 0 0.14rem;
                    font-size: 0.16rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #b0cdff;
                    display: flex;
                    align-items: center;
                    line-height: 0.34rem;
                    .c_pie_th {
                      display: inline-block;
                      width: 0.08rem;
                      height: 0.08rem;
                      border-radius: 0.04rem;
                      margin-right: 0.08rem;
                    }
                    .c_ths0 {
                      background: linear-gradient(
                        270deg,
                        #66ffff 0%,
                        #0077ff 100%
                      );
                    }
                    .c_ths1 {
                      background: linear-gradient(
                        180deg,
                        #fedb65 0%,
                        #ffbe44 100%
                      );
                    }
                    .c_thp0 {
                      background: linear-gradient(
                        270deg,
                        #a181ff 0%,
                        #7e5dff 100%
                      );
                    }
                    .c_thp1 {
                      background: linear-gradient(
                        270deg,
                        #3c97ff 0%,
                        #6787fa 100%
                      );
                    }
                    .c_thp2 {
                      background: linear-gradient(
                        180deg,
                        #fedb65 0%,
                        #ffbe44 100%
                      );
                    }
                    .c_thp3 {
                      background: linear-gradient(
                        270deg,
                        #66ffff 0%,
                        #54a4ff 100%
                      );
                    }
                    .c_thp4 {
                      background: linear-gradient(
                        270deg,
                        #ff952e 0%,
                        #e45d52 100%
                      );
                    }
                    .c_thpt0 {
                      color: #9d71ff;
                    }
                    .c_thpt1 {
                      color: #4469ec;
                    }
                    .c_thpt2 {
                      color: #ffd469;
                    }
                    .c_thpt3 {
                      color: #ff952e;
                    }
                    .c_thpt4 {
                      color: #5cd4f7;
                    }
                    .c_pie_td {
                      display: inline-block;
                      font-size: 0.14rem;
                      font-family: Montserrat-Regular;
                      font-weight: 400;
                      margin-left: 0.04rem;
                    }
                  }
                  .c_pie_liq {
                    padding: 0 0.08rem;
                    .c_thq1 {
                      background: linear-gradient(
                        270deg,
                        #66ffff 0%,
                        #54a4ff 100%
                      );
                    }
                    .c_thq2 {
                      background: linear-gradient(
                        270deg,
                        #3c97ff 0%,
                        #6787fa 100%
                      );
                    }
                    .c_thq3 {
                      background: linear-gradient(
                        270deg,
                        #a181ff 0%,
                        #7e5dff 100%
                      );
                    }
                    .c_thq4 {
                      background: linear-gradient(
                        180deg,
                        #fedb65 0%,
                        #ffbe44 100%
                      );
                    }
                  }
                }
              }
              .myChartTrend {
                width: 100%;
                height: 2.6rem;
                // background: #ffffff;
              }
              .myChartPie {
                width: 100%;
                height: 2.5rem;
                // background: #ffffff;
              }
              .myChartPieCrl {
                margin-top: -0.28rem;
                width: 55%;
                height: 2.6rem;
                // background: #ffffff;
              }
              .myChartPieSex {
                margin-top: -0.28rem;
                width: 45%;
                height: 2.6rem;
                // background: #ffffff;
              }
              // .myChartTrend, .myChartLine{
              //   width: 100%;
              //   height: 2.6rem;
              //   // background: #ffffff;
              // }
            }
            .hvml_m_game {
              display: flex;
              // justify-content: space-around;
              align-items: center;
              width: 100%;
              height: 100%;
              overflow: hidden;
              overflow-x: auto;
              li {
                padding: 0 0.14rem;
                img {
                  display: block;
                  width: 1.74rem;
                  height: 1.9rem;
                }
              }
            }
            .hvm_m_ball {
              position: relative;
              width: 100%;
              height: 100%;
              .hvm_mb_bg {
                position: absolute;
                left: 0;
                top: 0;
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                overflow: hidden;
                background: url("../../assets/images/heart/level1.png")
                  no-repeat center;
                background-size: cover;
                cursor: pointer;
                // display: flex;
                // align-items: flex-start;
                // justify-content: center;
                // flex-wrap: wrap;
                .level_txt {
                  width: 100%;
                  font-size: 0.14rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #ffffff;
                  line-height: 0.18rem;
                }
                .level_txt_t {
                  margin-top: 0.07rem;
                }
                .level_txt_s {
                  margin-top: 0.16rem;
                }
              }
              .wddw {
                width:1.8rem;
                height: 0.42rem;
                div{

                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  line-height: 0.42rem !important;
                }
              }
              .wddw0 {
                position: absolute;
                bottom: 1.24rem;
                left: 2.3rem;
              }
              .wddw1 {
                position: absolute;
                bottom: 1.72rem;
                left: 2.3rem;
              }
              .wddw2 {
                position: absolute;
                bottom: 0.83rem;
                left: 2.45rem;
              }
              .wddw3 {
                position: absolute;
                bottom: 1rem;
                right: 0.2rem;
              }
              .wddw4 {
                position: absolute;
                bottom: 1.82rem;
                right: 0.14rem;
              }
              .wddw5 {
                position: absolute;
                bottom: 1.4rem;
                right: 0.4rem;
              }
              .wddw6 {
                position: absolute;
                bottom: 0.15rem;
                left: 0.1rem;
              }
              .wddw7 {
                position: absolute;
                bottom: 0.6rem;
                left: 0.7rem;
              }
              .wddw8 {
                position: absolute;
                bottom: 0.08rem;
                left: 1.8rem;
              }
              .wddw9 {
                position: absolute;
                bottom: 1.45rem;
                left: 0.7rem;
              }
              .wddw10 {
                position: absolute;
                bottom: 1.84rem;
                left: 0.16rem;
              }
              .wddw11 {
                position: absolute;
                bottom: 1.08rem;
                left: 0.2rem;
              }
              .wddw12 {
                position: absolute;
                bottom: 0.44rem;
                left: 2.8rem;
              }
              .wddw13 {
                position: absolute;
                bottom: 0.04rem;
                right: 0.1rem;
              }
              .wddw14 {
                position: absolute;
                bottom: 0.6rem;
                left: 4.26rem;
              }

              .yy_qxdl {
                position: absolute;
                top: 1.28rem;
                left: 3.14rem;
              }
              .yy_swch {
                position: absolute;
                top: 0.59rem;
                left: 2.89rem;
              }
              .yy_jlqf {
                position: absolute;
                top: 1.91rem;
                left: 0.52rem;
              }

              .jl_xjyq {
                position: absolute;
                top: 1.09rem;
                left: 0.95rem;
              }
              .jl_yjn {
                position: absolute;
                top: 0.44rem;
                left: 4.91rem;
              }
              .jl_hkba {
                position: absolute;
                top: 1.94rem;
                left: 4.76rem;
              }

              .qp_qpxw {
                position: absolute;
                top: 1.09rem;
                left: 1.94rem;
              }
              .qp_qpsw {
                position: absolute;
                top: 0.44rem;
                left: 1.51rem;
              }
              .qp_dkqp {
                position: absolute;
                top: 1.69rem;
                left: 3.82rem;
              }

              .zw_rjgd {
                position: absolute;
                top: 0.69rem;
                left: 0.27rem;
              }
              .zw_yycd {
                position: absolute;
                top: 1.74rem;
                left: 1.51rem;
              }
              .zw_csjl {
                position: absolute;
                top: 1.03rem;
                left: 4.41rem;
              }
              .dd_cdx {
                position: absolute;
                top: 0.53rem;
                left: 3.82rem;
              }
              .dd_wgzg {
                position: absolute;
                top: 1.9rem;
                left: 2.51rem;
              }
              .dd_dy {
                position: absolute;
                top: 1.28rem;
                left: 5.26rem;
              }

              .level_bg1 {
                color: rgba(92, 212, 247, 1);
                // background: url("../../assets/images/heart/level1.png")
                //   no-repeat center;
                // background-size: cover;
              }
              .level_bg2 {
                color: rgba(63, 106, 255, 1);
                // background: url("../../assets/images/heart/level2.png")
                //   no-repeat center;
                // background-size: cover;
              }
              .level_bg3 {
                color: rgba(156, 113, 255, 1);
                // background: url("../../assets/images/heart/level3.png")
                //   no-repeat center;
                // background-size: cover;
              }
              .level_bg4 {
                color: rgba(255, 212, 105, 1);
                // background: url("../../assets/images/heart/level4.png")
                //   no-repeat center;
                // background-size: cover;
              }
            }
            .hvml_person {
              margin-top: 0.28rem;
              .huml_p_li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.34rem;
                .huml_pl_name {
                  width: 1.1rem;
                  font-size: 0.18rem;
                  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                  font-weight: 500;
                  color: #ffffff;
                  text-align: right;
                }
                .huml_pl_box {
                  width: 4.6rem;
                  margin-right: 0.3rem;
                  height: 0.36rem;
                  display: flex;
                  align-items: center;
                  // background: #ffffff;
                  padding: 0 0 0 0.3rem;
                  cursor: pointer;
                  // 长方体
                  .huml_plb_left {
                    position: relative;
                    height: 0.12rem;
                    margin-top: 0.06rem;
                    // background: rgba(1, 89, 255, 0.50);
                    .huml_plb_c {
                      position: absolute;
                      left: 0rem;
                      top: 0;
                      width: 100%;
                      height: 0.12rem;
                      background: rgba(1, 89, 255, 0.6);
                      z-index: 2;
                    }
                    .huml_plb_l {
                      position: absolute;
                      left: -0.06rem;
                      top: 0rem;
                      width: 0.06rem;
                      height: 0.12rem;
                      transform-origin: right;
                      transform: skew(0, 30deg);
                      background: rgba(80, 132, 198, 0.8);
                      z-index: 2;
                    }
                    .huml_plb_t {
                      width: 100%;
                      position: absolute;
                      right: 0rem;
                      top: -0.04rem;
                      height: 0.04rem;
                      transform-origin: bottom;
                      transform: skew(60deg, 0);
                      background: rgba(119, 203, 255, 0.9);
                      z-index: 2;
                    }
                  }
                  .huml_plb_right {
                    position: relative;
                    height: 0.12rem;
                    margin-top: 0.06rem;
                    .huml_plb_c {
                      position: absolute;
                      left: 0rem;
                      top: 0;
                      width: 100%;
                      height: 0.12rem;
                      background: rgba(254, 185, 52, 0.6);
                      z-index: 1;
                    }
                    .huml_plb_l {
                      position: absolute;
                      left: -0.06rem;
                      top: 0rem;
                      width: 0.06rem;
                      height: 0.12rem;
                      transform-origin: right;
                      transform: skew(0, 30deg);
                      background: rgba(236, 200, 159, 0.8);
                      z-index: 1;
                    }
                    .huml_plb_t {
                      width: 100%;
                      position: absolute;
                      right: 0rem;
                      top: -0.04rem;
                      height: 0.04rem;
                      transform-origin: bottom;
                      transform: skew(60deg, 0);
                      background: rgba(255, 231, 185, 0.9);
                      z-index: 1;
                    }
                  }
                }
                .huml_pl_cent {
                  display: flex;
                  justify-content: space-between;
                  padding-left: 0.24rem;
                  margin-top: -0.14rem;
                  div {
                    width: 20%;
                    text-align: left;
                    font-size: 0.16rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #ffffff;
                  }
                }
              }
              .center_p_per {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                position: absolute;
                margin: auto;
                // left: 0;
                right: 0.16rem;
                top: 0;
                // bottom: 0;
                // z-index: -1;
                .c_pie_li {
                  padding: 0 0.14rem;
                  font-size: 0.16rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #b0cdff;
                  display: flex;
                  align-items: center;
                  line-height: 0.42rem;
                  .c_pie_th {
                    display: inline-block;
                    width: 0.08rem;
                    height: 0.08rem;
                    border-radius: 0.04rem;
                    margin-right: 0.08rem;
                  }
                  .c_ths0 {
                    background: linear-gradient(
                      270deg,
                      #66ffff 0%,
                      #0077ff 100%
                    );
                  }
                  .c_ths1 {
                    background: linear-gradient(
                      180deg,
                      #fedb65 0%,
                      #ffbe44 100%
                    );
                  }
                }
              }
            }
          }
        }
      }
      .hvm_center {
        flex: 1;
      }
      .hvm_right {
        width: 6.12rem;
      }
    }
    // // display: flex;
    // padding: 0 0.6rem;
    // // justify-content: flex-start;
    // // text-align: left;
    // .tv_top{
    //   display: flex;
    //   justify-content: space-between;
    //   .tv_t_left{
    //       width: 3.74rem;
    //     .tv_tl_title{
    //       width: 100%;
    //       height: 0.36rem;
    //       background: linear-gradient(90deg, rgba(86,254,254,0.44) 0%, rgba(86,254,254,0) 100%);
    //       display: flex;
    //       align-items: center;
    //       margin-bottom: 0.12rem;
    //       span{
    //         width: 0.04rem;
    //         height: 0.36rem;
    //         background: #4DF1E3;
    //       }
    //       p{
    //         padding-left: 0.12rem;
    //         font-size: 0.2rem;
    //         font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    //         font-weight: bold;
    //         color: #FFFFFF;
    //         line-height: 0.36rem;
    //       }
    //     }
    //     .tv_tl_tain{
    //       width: 100%;
    //       height: 3.7rem;
    //       background: rgba(65,147,183,0.2);
    //       border: 0.01rem solid #4DF1E3;
    //       display: flex;
    //       justify-content: space-around;
    //       align-items: center;
    //       position: relative;
    //       .tv_tlt_box{
    //         .tv_tltb_num{
    //           display: flex;
    //           align-items: flex-end;
    //           justify-content: center;
    //           span{
    //             font-size: 0.48rem;
    //             font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
    //             font-weight: 500;
    //             color: #66FFFF;
    //             line-height: 1;
    //           }
    //           span:last-child{
    //             font-size: 0.24rem;
    //             font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    //             margin-bottom: 0.06rem;
    //             // font-weight: 300;
    //           }
    //         }
    //         .tv_tltb_txt{
    //           font-size: 0.22rem;
    //           font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    //           font-weight: 400;
    //           color: #FFFFFF;
    //           line-height: 1;
    //           margin: 0.17rem auto;
    //         }
    //         .tv_tltb_img{
    //           width: 1.22rem;
    //           height: 0.94rem;
    //         }
    //       }
    //       .tv_tlt_pic{

    //         .tv_tltp_img{
    //           width: 2rem;
    //           height: 1.14rem;
    //           // background: rgba(55, 125, 160, 0.6);
    //         }
    //         .tv_tltp_i_bg{
    //           width: 2rem;
    //           height: 1.14rem;
    //           background: rgba(55, 125, 160, 0.6);
    //         }
    //         .tv_tltp_txt{
    //           font-size: 0.2rem;
    //           font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    //           font-weight: 500;
    //           color: #FFFFFF;
    //           line-height: 1;
    //           margin-top: 0.04rem;
    //         }
    //       }
    //       .tv_ec {
    //         width: 100%;
    //         // margin-bottom: 0.32rem;
    //         position: relative;
    //         .tv_ec_head {
    //           font-size: 0.28rem;
    //           line-height: 0.8rem;
    //           display: flex;
    //           justify-content: flex-end;
    //           align-items: center;
    //           position: absolute;
    //           top: 0.24rem;
    //           left: 0;
    //           width: 100%;
    //           z-index: 100;
    //           span {
    //           }
    //           ul {
    //             display: flex;
    //             align-items: center;
    //             margin-right: 0.24rem;
    //             li {
    //               display: flex;
    //               align-items: center;
    //               justify-content: center;
    //               width: 0.8rem;
    //               height: 0.34rem;
    //               background: rgba(53, 106, 131, 1);

    //               border: 0.016rem solid rgba(53, 106, 131, 1);
    //               cursor: pointer;
    //               font-size: 0.2rem;
    //               font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    //               font-weight: 400;
    //               color: #CAFAFF;
    //               // border: 0.01rem solid #ffffff;
    //             }

    //             .tv_ec_act {
    //               color: #ffffff;
    //               background: linear-gradient(180deg, rgba(0,255,247,0) 0%, rgba(0,255,247,0.4) 100%);
    //               border: 0.016rem solid #08FFFF;
    //             }
    //             // .tv_ec_act30{
    //             //   border-color: #00AAFF;
    //             //   color: #00AAFF;
    //             // }
    //             // .tv_ec_actr{
    //             //   border-right: 0;
    //             // }
    //             // .tv_ec_actl{
    //             //   border-left: 0;
    //             // }
    //           }
    //           .center_pie {
    //             display: flex;
    //             justify-content: space-evenly;
    //             align-items: center;
    //             position: absolute;
    //             margin: auto;
    //             left: 0;
    //             right: 0;
    //             top: 0;
    //             bottom: 0;
    //             z-index: -1;
    //             .c_pie_li {
    //               padding: 0 0.14rem;
    //               font-size: 0.2rem;
    //               font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    //               font-weight: 400;
    //               color: #FFFFFF;
    //               display: flex;
    //               align-items: center;
    //               .c_pie_th {
    //                 display: inline-block;
    //                 width: 0.08rem;
    //                 height: 0.08rem;
    //                 margin-right: 0.1rem;
    //               }
    //               .c_ths0 {
    //                 background: rgba(160, 208, 255, 1);
    //               }
    //               .c_ths1 {
    //                 background: rgba(102, 255, 255, 1);
    //               }
    //               .c_pie_td {
    //                 display: inline-block;
    //                 font-size: 0.14rem;
    //                 font-family: Montserrat-Regular;
    //                 font-weight: 400;
    //                 margin-left: 0.04rem;
    //               }
    //             }
    //           }
    //         }
    //         .myChartTrend {
    //           width: 100%;
    //           height: 3.7rem;
    //           // background: #ffffff;
    //         }
    //       }

    //     }
    //   }
    //   .tv_t_center{
    //     width: auto;
    //     flex: 1;
    //     margin: 0 0.4rem;

    //   }
    // }
    // .tv_bottom{
    //   margin-top: 0.38rem;
    //   .tv_t_left{
    //     width: 3.74rem;
    //     .tv_tl_tain{
    //       height: 1.75rem;
    //     }

    //   }
    //   .tv_t_center{
    //     width: auto;
    //     flex: 1;
    //     margin:0 0.4rem 0 0;
    //     .tv_tl_tain{
    //       height: 4.2rem;
    //       margin-bottom: 0;
    //       display: block;
    //       .tv_r_record {
    //         width: 100%;
    //         // position: absolute;
    //         // top: 0;
    //         .tv_rr_ul {
    //           padding: 0.2rem 0.2rem 0.06rem 0.2rem;
    //           li {
    //             display: flex;
    //             justify-content: space-between;
    //             position: relative;
    //             // padding: 0.1rem 0.06rem;
    //             span {
    //               font-size: 0.22rem;
    //               font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    //               font-weight: 500;
    //               color: #FFFFFF;
    //             }

    //             .tv_rr_txt {
    //               display: flex;
    //               align-items: center;
    //               text-align: left;
    //               width: 38%;
    //               // width: 58%;
    //               // padding: 0 0.2rem;
    //               font-size: 0.22rem;
    //               font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    //               font-weight: 500;
    //               color: #FFFFFF;
    //               padding: 0.04rem 0;
    //               // justify-content: center;
    //               // text-align: center;
    //               .el-icon-s-flag{
    //                 font-size: 0.18rem;
    //                 color: #ff0000;
    //               }
    //               .flag_gray{
    //                 display: none
    //               }
    //               .tv_rr_new {
    //                 display: flex;
    //                 justify-content: center;
    //                 align-items: center;
    //                 font-size: 0.14rem;
    //                 color: #ff0000;
    //                 text-align: center;
    //                 margin-right: 0.06rem;
    //                 width: 0.2rem;
    //               }
    //               span {
    //                 flex: 1;
    //                 overflow: hidden;
    //                 white-space: nowrap;
    //                 text-overflow: ellipsis;
    //                 -o-text-overflow: ellipsis;
    //               }
    //             }
    //             .tv_rr_abs{
    //               position: absolute;
    //               margin: auto;
    //               right: 0;
    //               top: 0;
    //               bottom: 0;
    //               width: auto;
    //               font-size: 0.2rem;
    //               font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    //               font-weight: 400;
    //               color: #08FFFF;
    //             }
    //             .tv_rr_img{
    //               img{

    //                 width: 1.4rem;
    //               }
    //             }
    //             .tv_rr_time {
    //               display: block;
    //             }
    //           }
    //           .tv_rr_lis {
    //             // background: rgba(151, 205, 255, 0.14);
    //           }
    //           .tv_rr_lip{
    //             width: 100%;
    //             min-height: 0.48rem;
    //             background: url("../../assets/images/c_line.png") no-repeat bottom center;
    //             background-size: 100%;

    //             .tv_rr_lipl{
    //               display: flex;
    //               align-items: center;
    //               width: 100%;
    //               background: linear-gradient(180deg, rgba(0,216,254,0.1) 0%, rgba(0,217,254,0.2) 100%) ;
    //               position: relative;
    //               .tv_rr_txt{
    //                 font-size: 0.18rem;
    //                 font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    //                 font-weight: 400;
    //                 color: #FFFFFF;
    //               }
    //               .tv_rrl_tip{
    //                 position: absolute;
    //                 margin: auto;
    //                 left: 0.15rem;
    //                 top: 0;
    //                 bottom: 0;
    //                 width: 0.27rem;
    //                 height: 0.31rem;
    //                 z-index: 1;
    //               }
    //               .flag_gray{
    //                 display: none;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }

    //   }

    // }
  }
  // .tv_left {
  //   width: 4rem;
  //   // background: #000000;
  //   padding-left: 0.3rem;
  //   .tv_left_head {
  //     font-size: 0.28rem;
  //     line-height: 0.8rem;
  //   }
  //   .tv_left_title {
  //     font-size: 0.24rem;
  //     height: 0.6rem;
  //     display: flex;
  //     align-items: center;
  //     .el-icon-video-camera {
  //       font-size: 0.3rem;
  //       margin-right: 0.1rem;
  //     }
  //   }
  //   ul {
  //     padding-left: 0.4rem;
  //     li {
  //       height: 0.48rem;
  //       display: flex;
  //       align-items: center;
  //       cursor: pointer;
  //       i {
  //         font-size: 0.24rem;
  //         margin-right: 0.06rem;
  //         color: #ffffff;
  //       }
  //       .el-icon-video-pause {
  //         color: #00aaff;
  //       }
  //       span {
  //         font-size: 0.22rem;
  //         color: #ffffff;
  //       }
  //       .v_blue {
  //         color: #00aaff;
  //       }
  //     }
  //   }
  // }
  // .tv_center {
  //   flex: 1;
  //   padding: 0 0.44rem;
  //   // background: #ef3708;
  //   ul.tv_c_ul {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     li {
  //       width: 1.6rem;
  //       font-size: 0.24rem;
  //       color: #9f9f9f;
  //       margin: 0 0.03rem;
  //       background: rgba(151, 205, 255, 0.14);
  //       line-height: 0.48rem;
  //       text-align: center;
  //       cursor: default;
  //     }
  //     li.lhr_act {
  //       color: #ffffff;
  //       background: rgba(151, 205, 255, 0.3);
  //     }
  //   }
  //   .fullBg {
  //     position: fixed;
  //     margin: auto;
  //     left: 0;
  //     right: 0;
  //     top: 0;
  //     bottom: 0;
  //     width: 100%;
  //     height: 100%;
  //     background: rgba(0, 0, 0, 0.3);
  //     z-index: 998;
  //   }
  //   .tv_c_four {
  //     width: 100%;
  //     height: auto;
  //     min-height: 4.9rem;
  //     // background: #f00;
  //     ol {
  //       display: flex;
  //       justify-content: space-between;
  //       flex-wrap: wrap;
  //       padding: 0.1rem;
  //       li {
  //         width: 50%;
  //         padding: 0.1rem;
  //         position: relative;
  //         img {
  //           display: block;
  //           width: 100%;
  //           height: auto;
  //         }
  //         video {
  //           display: block;
  //           width: 100%;
  //           height: auto;
  //           margin: 0 !important;
  //           background: #000;
  //         }
  //         .video_fix {
  //           position: fixed;
  //           margin: auto !important;
  //           left: 0;
  //           right: 0;
  //           top: 0;
  //           bottom: 0;
  //           width: 70%;
  //           height: auto;
  //           z-index: 999;
  //         }
  //         .el-icon-full-screen {
  //           padding: 0.2rem;
  //           position: absolute;
  //           right: 0.1rem;
  //           bottom: 0.1rem;
  //           font-size: 0.32rem;
  //           color: #ffffff;
  //           z-index: 999;
  //         }
  //         .el-icon-circle-close {
  //           position: fixed;
  //           right: 12%;
  //           top: 18%;
  //           font-size: 0.64rem;
  //         }
  //       }
  //     }
  //   }
  //   .tv_c_one {
  //     width: 100%;
  //     height: auto;
  //     min-height: 4.9rem;
  //     // background: #105fcd;
  //     // padding: 0.2rem;
  //     ol {
  //       display: flex;
  //       justify-content: space-between;
  //       flex-wrap: wrap;
  //       padding: 0.2rem;
  //       li {
  //         width: 100%;
  //         video {
  //           display: block;
  //           width: 100%;
  //           height: auto;
  //           margin: 0 !important;
  //           background: #000;
  //         }
  //       }
  //     }
  //   }
  //   .tv_ec {
  //     margin-bottom: 0.32rem;
  //     .tv_ec_head {
  //       font-size: 0.28rem;
  //       line-height: 0.8rem;
  //       display: flex;
  //       justify-content: space-between;
  //       align-items: center;
  //       span {
  //       }
  //       ul {
  //         display: flex;
  //         align-items: center;
  //         li {
  //           display: flex;
  //           align-items: center;
  //           justify-content: center;
  //           width: 1rem;
  //           height: 0.42rem;
  //           line-height: 0.42rem;
  //           background: rgba(151, 205, 255, 0.14);
  //           color: #9f9f9f;
  //           cursor: pointer;
  //           // border: 0.01rem solid #ffffff;
  //         }

  //         .tv_ec_act {
  //           color: #ffffff;
  //           background: rgba(151, 205, 255, 0.3);
  //         }
  //         // .tv_ec_act30{
  //         //   border-color: #00AAFF;
  //         //   color: #00AAFF;
  //         // }
  //         // .tv_ec_actr{
  //         //   border-right: 0;
  //         // }
  //         // .tv_ec_actl{
  //         //   border-left: 0;
  //         // }
  //       }
  //     }
  //     // .myChartTrend {
  //     //   width: 100%;
  //     //   height: 3.34rem;
  //     //   // background: #ffffff;
  //     // }
  //   }
  //   .tv_right_head {
  //     font-size: 0.28rem;
  //     line-height: 0.8rem;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     span {
  //       color: #ffffff;
  //     }
  //     .tv_rh_more {
  //       color: #00aaff;
  //       font-size: 0.2rem;
  //     }
  //   }
  //   // .tv_r_record {
  //   //   .tv_rr_ul {
  //   //     li {
  //   //       display: flex;
  //   //       justify-content: space-between;
  //   //       padding: 0.1rem 0.06rem;
  //   //       span {
  //   //         color: #ffffff;
  //   //         font-size: 0.2rem;
  //   //       }

  //   //       .tv_rr_txt {
  //   //         display: flex;
  //   //         align-items: center;
  //   //         width: 20%;
  //   //         // width: 58%;
  //   //         padding: 0 0.2rem;

  //   //         font-size: 0.16rem;
  //   //         // justify-content: center;
  //   //         // text-align: center;
  //   //         .el-icon-s-flag{
  //   //           font-size: 0.18rem;
  //   //           color: #ff0000;
  //   //         }
  //   //         .flag_gray{
  //   //           color: #9f9f9f;
  //   //         }
  //   //         .tv_rr_new {
  //   //           display: flex;
  //   //           justify-content: center;
  //   //           align-items: center;
  //   //           font-size: 0.14rem;
  //   //           color: #ff0000;
  //   //           text-align: center;
  //   //           margin-right: 0.06rem;
  //   //           width: 0.2rem;
  //   //         }
  //   //         span {
  //   //           flex: 1;
  //   //           overflow: hidden;
  //   //           white-space: nowrap;
  //   //           text-overflow: ellipsis;
  //   //           -o-text-overflow: ellipsis;
  //   //         }
  //   //       }
  //   //       .tv_rr_img{
  //   //         img{

  //   //           width: 1.4rem;
  //   //         }
  //   //       }
  //   //       .tv_rr_time {
  //   //         display: block;
  //   //       }
  //   //     }
  //   //     .tv_rr_lis {
  //   //       background: rgba(151, 205, 255, 0.14);
  //   //     }
  //   //   }
  //   // }
  // }
  // .tv_right {
  //   width: 3rem;
  //   // background: #105fcd;
  //   .tv_right_head {
  //     font-size: 0.28rem;
  //     line-height: 0.8rem;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     span {
  //       color: #ffffff;
  //     }
  //     .tv_rh_more {
  //       color: #00aaff;
  //       font-size: 0.2rem;
  //     }
  //   }
  //   .tv_r_total {
  //     ul.tv_rt_ul {
  //       display: flex;
  //       justify-content: center;
  //       flex-wrap: wrap;
  //       li {
  //         width: 100%;
  //         margin: 0.2rem 0;
  //         img {
  //           display: block;
  //           margin: 0 auto;
  //           width: 1.2rem;
  //         }
  //         span {
  //           text-align: center;
  //           font-size: 0.2rem;
  //           line-height: 0.32rem;
  //           display: block;
  //           color: #96d0e3;
  //         }
  //         span.rt_y {
  //           color: #f7a202;
  //         }
  //       }
  //     }
  //   }

  // }
}
</style>
