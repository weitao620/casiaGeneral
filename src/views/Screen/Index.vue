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
                  <div class="to_img_box">
                    <img
                      :class="['to_img', 'to_img'+ normalRank]"
                      src="../../assets/images/heart/icon1.png"
                      alt=""
                    />
                  </div>
                  <div class="to_type i_col1">正常</div>
                  <div class="to_num">
                    <span>{{ normalNum }}</span
                    >人
                  </div>
                </div>
                <div class="t_one">
                  <div class="to_img_box">
                    <img
                      :class="['to_img', 'to_img'+ mildRank]"
                      src="../../assets/images/heart/icon2.png"
                      alt=""
                    />
                  </div>
                  <div class="to_type i_col2">轻度预警</div>
                  <div class="to_num">
                    <span>{{ mildNum }}</span
                    >人
                  </div>
                </div>
                <div class="t_one">
                  <div class="to_img_box">
                    <img
                      :class="['to_img', 'to_img'+ moderateRank]"
                      src="../../assets/images/heart/icon3.png"
                      alt=""
                    />
                  </div>
                  <div class="to_type i_col3">中度预警</div>
                  <div class="to_num">
                    <span>{{ moderateNum }}</span
                    >人
                  </div>
                </div>
                <div class="t_one">
                  <div class="to_img_box">
                    <img
                      :class="['to_img', 'to_img'+ severeRank]"
                      src="../../assets/images/heart/icon4.png"
                      alt=""
                    />
                  </div>
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
              src="../../assets/images/heart/hv_bg2.png"
              alt=""
            />
            <div class="hvml_main">
              <div class="tv_ec">
                <div class="tv_ec_head">
                  <div class="center_pie" style="justify-content: center;">
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp0"></span>
                      抑郁
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp1"></span>
                      焦虑
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp2"></span>
                      强迫
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp3"></span>
                      PTSD
                    </div>
                    <div class="c_pie_li">
                      <span class="c_pie_th c_thp4"></span>
                      心理韧性
                    </div>
                  </div>
                </div>
                <!-- <div style="height:1.04rem"></div> -->
                <div class="myChartPie" id="myChartPie" ref="myChartPie">
                  
                </div>
                <div class="chart_heart">预警指标</div>
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
                  <div class="tv_ec_head" style="height: 0.4rem;">
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
              <div class="lib_b_lizi2"></div>
            </div>
            <img
              class="img0 img6"
              src="../../assets/images/heart/bottom6.png"
              alt=""
            />
            <img
              class="img0 img7"
              src="../../assets/images/heart/bottom7.png"
              alt=""
            />

            <!-- <img
              class="img0 img2"
              src="../../assets/images/heart/bottom2.png"
              alt=""
            /> -->

            <img
              class="img0 img3"
              src="../../assets/images/heart/bottom3.png"
              alt=""
            />
            <!-- <img
              class="img0 img4"
              src="../../assets/images/heart/bottom4.png"
              alt=""
            /> -->

            <div class="hvml_total">
              <div class="hvml_t_head">
                <ul>
                  <li></li>
                </ul>
              </div>
              <div class="hvml_t_mian">
                <ol>
                  <li>
                    <div style="margin-top:1.1rem">
                      <span>{{ participationNum }}人</span>
                      <p>参与测评</p>
                    </div>
                    <img
                      class=""
                      src="../../assets/images/heart/bottom4.png"
                      alt=""
                    />
                  </li>
                  <li style="margin: 0 0.1rem;">
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
                    <div style="margin-top:1.1rem">
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
                        <!-- <div
                          v-if="warningFactor.fshPerct !== 0"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.wmzyPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.wmzyPerct !== 1"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.wmzyPerct !== 0"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.gjxPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.gjxPerct !== 1"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.gjxPerct !== 0"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.zlPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.zlPerct !== 1"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.zlPerct !== 0"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.byPerct !== 1"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.byPerct !== 1"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.byPerct !== 0"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.pzPerct === 0"
                          class="huml_plb_l"
                        ></div>
                        <div
                          v-if="warningFactor.pzPerct === 0"
                          class="huml_plb_t"
                        ></div> -->
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
                        <!-- <div
                          v-if="warningFactor.pzPerct !== 0"
                          class="huml_plb_t"
                        ></div> -->
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="huml_p_li">
                  <div class="huml_pl_name" style="width:0;"></div>
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
                    <div>
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
              <div class="tv_ec" style="display: flex;align-items: center;justify-content: space-between;">
                <div class="tv_head">
                  <div
                    class="myChartPieCrl"
                    id="myChartPieCrl"
                    ref="myChartPieCrl"
                  ></div>
                  <div class="chart_heart1">年龄段</div>
                </div>
                <div class="tv_head1">
                  <div
                    class="myChartPieSex"
                    id="myChartPieSex"
                    ref="myChartPieSex"
                  ></div>
                  <div class="chart_heart2">性别</div>
                </div>
              </div>
            </div>
          </div>
          <div class="hvml_box">
            <div class="hvml_b_head" style="left: 0.93rem;">
              舒缓游戏使用排行
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

    </div>
  </div>
</template>

<script>
import echarts from "../../assets/js/echarts";
import { mapMutations } from "vuex";
import Url from "@/assets/js/url.js";
import NP from "number-precision";
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

// const pieColor = [
//   "rgba(157, 113, 255, 1)",
//   "rgba(103, 135, 250, 1)",
//   "rgba(255, 212, 105, 1)",
//   "rgba(92, 212, 247, 1)",
//   "rgba(244, 142, 46, 1)"
// ];
// const crlColor = ["#FFD469", "#9D71FF", "#7795FF", "#5CD4F7"];
// const sexColor = ["#7795FF", "#9D71FF"];
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
      normalRank: 0,
      mildRank: 0,
      moderateRank: 0,
      severeRank: 0,
      gameNew: [],
      gameList: [
        {
          id: 1,
          name: "点球成林",
          flag: false
        },
        {
          id: 2,
          name: "解压泥",
          flag: false
        },
        {
          id: 3,
          name: "海洋瀑布",
          flag: false
        },
        {
          id: 4,
          name: "雨点协奏曲",
          flag: false
        },
        {
          id: 5,
          name: "火眼金睛",
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
      pieList: [],
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
          name: "男",
          value: 0
        },
        {
          name: "女",
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
      // console.log(val);
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
        // console.log("数据发生变化啦"); // 修改数据时，能看到输出结果
        // console.log("新：" + newVal, "老：" + oldVal);
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
        // console.log(111);
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    // 调接口
    // this.getLines("n");
    // this.getInfo("n");
    document.removeEventListener('touchstart', this.hideTip);
    document.addEventListener('touchstart', this.hideTip);
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
          // console.log(data);
          if (data.code == 0) {
            // console.log("initWebSocket");
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
          // console.log(data);
          if (data.code == 0) {
            // console.log("initWebSocket");
            let info = data.data.reverse();
            for (let i in info) {
              let nowDate = info[i].date.split(" ")[0];
              info[i].date =
                nowDate.split("-")[1] + "/" + nowDate.split("-")[2];
              info[i].date1 = nowDate;
            }
            // console.log(info);
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
          // console.log(data);
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
            let forArr = [
              {
                name: 'normal',
                num: info.normalNum
              },
              {
                name: 'mild',
                num: info.mildNum
              },
              {
                name: 'moderate',
                num: info.moderateNum
              },
              {
                name: 'severe',
                num: info.severeNum
              }
            ]
            forArr.sort((a, b) => {
              return b.num - a.num;
            });
            for (let i in forArr) {
              forArr[i].rank = Number(i) + 1
            }
            let saArr = []
            for (let i in forArr) {
              let val = saArr.indexOf(forArr[i].num)
              if (val > -1) {
                forArr[i].rank = forArr[i - 1].rank
              } else {
                saArr.push(forArr[i].num)
              }
              this[forArr[i].name + 'Num'] = forArr[i].num
              this[forArr[i].name + 'Rank'] = forArr[i].rank
            }
            // 受欢迎的游戏
            let gameArr = [0, 0, 0, 0, 0];
            this.gameNew = [];
            let erStr = "";
            if (info.popularGame !== 0) {
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
            // console.log(this.gameNew);
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
            // console.log(this.warningFactor);
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
                typeName: "PTSD",
                value: info.warningFactor.rjgd
                // value: 600
              },
              {
                name: "抑郁程度",
                frame: "yycd",
                type: "4",
                typeName: "PTSD",
                value: info.warningFactor.yycd
                // value: 88
              },
              {
                name: "创伤经历",
                frame: "csjl",
                type: "4",
                typeName: "PTSD",
                value: info.warningFactor.csjl
                // value: 55
              },

              {
                name: "冲动性",
                frame: "cdx",
                type: "5",
                typeName: "心理韧性",
                value: info.warningFactor.cdx
                // value: 333
              },
              {
                name: "无规则感",
                frame: "wgzg",
                type: "5",
                typeName: "心理韧性",
                value: info.warningFactor.wgzg
                // value: 23
              },
              {
                name: "敌意",
                frame: "dy",
                type: "5",
                typeName: "心理韧性",
                value: info.warningFactor.dy
                // value: 12
              }
            ];
            yinList.sort((a, b) => {
              return b.value - a.value;
            });
            // console.log(yinList);
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
              // console.log(i % 2);
              
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
              // console.log(yinList[i].size);
            }
            // console.log(yinList);
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
            // console.log(ar1, ar2, ar3, ar4, ar5);
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
            // console.log(arTal);

            let yinArr = [];
            for (let i in arTal) {
              for (let j in arTal[i].list) {
                yinArr.push(arTal[i].list[j]);
              }
            }
            // console.log(yinArr);
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
            // console.log(info);
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
            this.logout()
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    logout() {
      let param = {
        passport: localStorage.getItem("passport")
      };
      this.$http.post(Url + "/aimw/user/logout", param).then(res => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userAuth");
        localStorage.removeItem("passport");
        localStorage.removeItem("userType");
        localStorage.removeItem("mqttTopic");
        this.$router.replace({
          path: "/login"
        });
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
      // console.log("切换告警数据统计接口");
      this.getLines("s");
    },
    
    echartInit1() {
      let that = this;
      // console.log(123);
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
      // console.log(this.myChartTrend);
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
          borderColor: "#5d95ff",
          borderWidth: nowSize(1),
          textStyle: {
            color: "#ffffff"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          formatter: function(obj) {
            // var value = obj.value;
            // console.log(obj);
            // console.log(obj[0].dataIndex);
            // console.log(dList1);
            return (
              '<div style="margin:-10px;padding:0.1rem;">' +
              '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem;line-height:1.5">' +
              dList1[obj[0].dataIndex] +
              "</div>" +
              '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0.1rem;line-height:1">' +
              '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; background: rgba(0, 84, 255, 1);margin-right:0.04rem"></span>' +
              "测评人次" +
              "：<span style='color:#ffffff'>" +
              obj[0].value +
              "</span>" +
              "</div>" +
              '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
              '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem;background: rgba(243, 141, 42, 1);margin-right:0.04rem"></span>' +
              "预警人次" +
              "：<span style='color:#ffffff'>" +
              obj[1].value +
              "</span>" +
              "</div>" +
              '</div>'
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
              color: "#ffffff",
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
                color: "rgba(14, 95, 255, 1)",
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
                    color: "rgba(47, 69, 255, 0.92)"
                  },
                  {
                    offset: 1,
                    color: "rgba(28, 0, 255, 0)"
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
                color: "rgba(243, 141, 42, 1)",
                lineStyle: {
                  type: "solid",
                  width: nowSize(2)
                }
              }
            },
            // lineStyle: {
            //   color: "rgba(0,194,255,1)"
            // },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(250, 100, 0, 0.52)"
                  },
                  {
                    offset: 1,
                    color: "rgba(250, 100, 0, 0)"
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
    hideTip(e) {
      // console.log(e.target.nodeName != 'CANVAS')
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
      // console.log(456);
      // 当前视口宽度
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function(val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
      // 绘制立体饼图
      // this.warningStatistic.depressionPerct = 1
      // this.warningStatistic.anxietyPerct = 0
      // this.warningStatistic.forcePerct = 0
      // this.warningStatistic.suicidePerct = 0
      // this.warningStatistic.violencePerct = 0
      // this.warningStatistic.depressionNum = 0
      // this.warningStatistic.anxietyNum = 0
      // this.warningStatistic.forceNum = 0
      // this.warningStatistic.suicideNum = 0
      // this.warningStatistic.violenceNum = 0
      let pieFlag = false
      if (this.warningStatistic.depressionPerct === 0 && this.warningStatistic.anxietyPerct === 0 && this.warningStatistic.forcePerct === 0 && this.warningStatistic.suicidePerct === 0 && this.warningStatistic.violencePerct === 0) {
        pieFlag = true
      }
      this.pieList = [
        {
          name: "抑郁",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.depressionPerct, 100),
          num: this.warningStatistic.depressionNum
        },
        {
          name: "焦虑",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.anxietyPerct, 100),
          num: this.warningStatistic.anxietyNum
        },
        {
          name: "强迫",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.forcePerct, 100),
          num: this.warningStatistic.forceNum
        },
        {
          name: "PTSD",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.suicidePerct, 100),
          num: this.warningStatistic.suicideNum
        },
        {
          name: "心理韧性",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.violencePerct, 100),
          num: this.warningStatistic.violenceNum
        }
      ];
      let pieNumArr = [
        {
          name: "抑郁",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.depressionPerct, 100)
        },
        {
          name: "焦虑",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.anxietyPerct, 100)
        },
        {
          name: "强迫",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.forcePerct, 100)
        },
        {
          name: "PTSD",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.suicidePerct, 100)
        },
        {
          name: "心理韧性",
          value: pieFlag ? 20 : NP.times(this.warningStatistic.violencePerct, 100)
        }
      ]
      let pieColorArr = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(123, 106, 255, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(123, 106, 255, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(0, 84, 255, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(0, 84, 255, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(26, 166, 225, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(26, 166, 225, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(193, 193, 193, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(193, 193, 193, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(243, 141, 42, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(243, 141, 42, 1)' // 100% 处的颜色
        }]
      }]
      let pieColorArr1 = [
        'rgba(123, 106, 255, 1)', 'rgba(0, 84, 255, 1)', 'rgba(26, 166, 225, 1)', 'rgba(193, 193, 193, 1)', 'rgba(243, 141, 42, 1)'
      ]
      let richPieColor = {}
      pieColorArr1.forEach((item, idx) => {
        richPieColor[`color${idx}`] = {
          fontSize: nowSize(14),
          height: nowSize(15),
          fontWeight: 'bold',
          align: 'left',
          color: item
        };
        richPieColor[`name${idx}`] = {
          fontSize: nowSize(14),
          height: nowSize(15),
          fontWeight: 'bold',
          align: 'left'
        }
      })
      var dataPie = [];
      for (var i = 0; i < pieNumArr.length; i++) {
        dataPie.push({
          value: pieNumArr[i].value,
          name: pieNumArr[i].name
        });
      }
      var seriesPieOption = [
        {
          name: '',
          type: 'pie',
          radius: ['54%', '64%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          color: 'transparent',
          itemStyle: {
            normal: {
              color: 'transparent',
              label: {
                show: true,
                position: 'outside',
                color: '#ffffff',
                padding: [nowSize(0), 0, 0, nowSize(-0)],
                formatter: function(params) {
                  // console.log(params)
                  if (pieFlag) {
                    return `{name${params.dataIndex}|${params.name}：}{color${params.dataIndex}|${0}%}`
                  } else {
                    return `{name${params.dataIndex}|${params.name}：}{color${params.dataIndex}|${params.value}%}`
                  }
                },
                rich: richPieColor
              },
              labelLine: {
                length: nowSize(10),
                length2: nowSize(4),
                show: true,
                lineStyle: {
                  color: 'transparent'
                }
              }
            }
          },
          data: dataPie
        }
      ];
      var numPie = 0
      const seriesPieOption2 = pieNumArr.map((item, index) => {
        numPie += item.value
        const a = {
          type: 'bar',
          data: ['', '', '', numPie],
          coordinateSystem: 'polar',
          z: 9999 - index,
          name: item.name,
          roundCap: true,
          color: pieColorArr1[index],
          barGap: '-100%',
          itemStyle: {
            normal: {
              shadowBlur: nowSize(2),
              shadowColor: pieColorArr1[index]
            }
          }
        }
        return a
      })
      this.myChartPie = echarts.init(this.$refs.myChartPie);
      this.myChartPie.setOption({
        color: pieColorArr,
        tooltip: {
          trigger: "item",
          // trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#00AAFF",
              width: nowSize(0),
              type: "solid"
            }
          },
          backgroundColor: "rgba(5, 16, 62, 1)",
          borderColor: "#5d95ff",
          borderWidth: nowSize(1),
          textStyle: {
            color: "#ffffff"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          formatter: function(params) {
            // console.log(params)
            let result = ''
            if (params.seriesType == 'bar') {
              // console.log(dataPie[params.seriesIndex - 1])
              result =
              '<div style="margin:-10px;padding:0.1rem;">' +
                '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem;line-height:1.5">' +
                  params.seriesName +
                "</div>" +
                '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
                '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; margin-right:0.04rem;background:' +
                params.color + '");></span>' +
                that.pieList[params.seriesIndex - 1].num +
                '次<span style="margin-left:0.06rem;">占比' +
                (pieFlag ? 0 : dataPie[params.seriesIndex - 1].value) +
                '%</span>' +
                "</div>" +
                "</div>"
            } else {
              result =
              '<div style="margin:-10px;padding:0.1rem;">' +
                '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem;line-height:1.5">' +
                  params.name +
                "</div>" +
                '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
                '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; margin-right:0.04rem;background:' +
                (params.name === "抑郁" ? pieColorArr1[0] : params.name === "焦虑" ? pieColorArr1[1] : params.name === "强迫" ? pieColorArr1[2] : params.name === "自我伤害" ? pieColorArr1[3] : pieColorArr1[4]) + '");></span>' +
                that.pieList[params.dataIndex].num +
                '次<span style="margin-left:0.06rem;">占比' +
                (pieFlag ? 0 : params.value) +
                '%</span>' +
                "</div>" +
                "</div>"
            }
            return result;
          }
        },
        angleAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 100,
          boundaryGap: ['0', '100'],
          startAngle: 90
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          // data: [that.sexList[0].name, that.sexList[1].name],
          z: 10
        },
        polar: {
          radius: '64%'
        },
        series: [...seriesPieOption, ...seriesPieOption2]
      });
      // 绘制立体环饼图1
      // this.ageGenderStatistic.belowThirtyPerct = 0
      // this.ageGenderStatistic.thirtyToFortyPerct = 0
      // this.ageGenderStatistic.fortyToFiftyPerct = 0.5
      // this.ageGenderStatistic.aboveFiftyPerct = 0.5

      let crlFlag = false
      if (this.ageGenderStatistic.belowThirtyPerct === 0 && this.ageGenderStatistic.thirtyToFortyPerct === 0 && this.ageGenderStatistic.fortyToFiftyPerct === 0 && this.ageGenderStatistic.aboveFiftyPerct === 0) {
        crlFlag = true
      }
      this.crlList = [
        {
          name: "30岁以下",
          value: crlFlag ? 25 : NP.times(this.ageGenderStatistic.belowThirtyPerct, 100)
        },
        {
          name: "31-40岁",
          value: crlFlag ? 25 : NP.times(this.ageGenderStatistic.thirtyToFortyPerct, 100)
        },
        {
          name: "41-50岁",
          value: crlFlag ? 25 : NP.times(this.ageGenderStatistic.fortyToFiftyPerct, 100)
        },
        {
          name: "51岁以上",
          value: crlFlag ? 25 : NP.times(this.ageGenderStatistic.aboveFiftyPerct, 100)
        }
      ];
      let crlNumArr = this.crlList
      let crlColorArr = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(0, 84, 255, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(0, 84, 255, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(26, 166, 225, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(26, 166, 225, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(193, 193, 193, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(193, 193, 193, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(243, 141, 42, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(243, 141, 42, 1)' // 100% 处的颜色
        }]
      }]
      let crlColorArr1 = ['rgba(0, 84, 255, 1)', 'rgba(26, 166, 225, 1)', 'rgba(193, 193, 193, 1)', 'rgba(243, 141, 42, 1)']
      let richCrlColor = {}
      crlColorArr1.forEach((item, idx) => {
        richCrlColor[`color${idx}`] = {
          fontSize: nowSize(14),
          height: nowSize(15),
          fontWeight: 'bold',
          align: 'left',
          color: item
        };
        richCrlColor[`name${idx}`] = {
          fontSize: nowSize(14),
          height: nowSize(15),
          fontWeight: 'bold',
          align: 'left'
        }
      })
      var dataCrl = [];
      for (var c = 0; c < crlNumArr.length; c++) {
        dataCrl.push({
          value: crlNumArr[c].value,
          name: crlNumArr[c].name
        });
      }
      var seriesCrlOption = [
        {
          name: '',
          type: 'pie',
          radius: ['54%', '64%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          color: 'transparent',
          itemStyle: {
            normal: {
              color: 'transparent',
              label: {
                show: true,
                position: 'outside',
                color: '#ffffff',
                padding: [nowSize(-10), 0, 0, nowSize(-0)],
                formatter: function(params) {
                  // console.log(params)
                  if (crlFlag) {
                    return `{name${params.dataIndex}|${params.name}：}\n{color${params.dataIndex}|${0}%}`
                  } else {
                    return `{name${params.dataIndex}|${params.name}：}\n{color${params.dataIndex}|${params.value}%}`
                  }
                },
                rich: richCrlColor
              },
              labelLine: {
                // length: crlFlag ? nowSize(2) : nowSize(6),
                // length2: crlFlag ? nowSize(2) : nowSize(6),
                length: nowSize(8),
                length2: nowSize(4),
                show: true,
                lineStyle: {
                  color: 'transparent'
                }
              }
            }
          },
          data: dataCrl
        }
      ];
      var numCrl = 0
      const seriesCrlOption2 = crlNumArr.map((item, index) => {
        numCrl += item.value
        const a = {
          type: 'bar',
          data: ['', '', '', numCrl],
          coordinateSystem: 'polar',
          z: 9999 - index,
          name: item.name,
          roundCap: true,
          color: crlColorArr1[index],
          barGap: '-100%',
          itemStyle: {
            normal: {
              shadowBlur: nowSize(2),
              shadowColor: crlColorArr1[index]
            }
          }
        }
        return a
      })
      this.myChartPieCrl = echarts.init(this.$refs.myChartPieCrl);
      this.myChartPieCrl.setOption({
        color: crlColorArr,
        tooltip: {
          trigger: "item",
          // trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#00AAFF",
              width: nowSize(0),
              type: "solid"
            }
          },
          backgroundColor: "rgba(5, 16, 62, 1)",
          borderColor: "#5d95ff",
          borderWidth: nowSize(1),
          textStyle: {
            color: "#ffffff"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          formatter: function(params) {
            // console.log(params)
            let result = ''
            if (params.seriesType == 'bar') {
              // console.log(dataCrl[params.seriesIndex - 1])
              result =
              '<div style="margin:-10px;padding:0.1rem;">' +
                '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem;line-height:1.5">' +
                  params.seriesName +
                "</div>" +
                '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
                '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; margin-right:0.04rem;background:' +
                params.color + '");></span>' +
                (crlFlag ? 0 : Math.round(dataCrl[params.seriesIndex - 1].value / 100 * that.participationNum)) +
                '人<span style="margin-left:0.06rem;">占比' +
                (crlFlag ? 0 : dataCrl[params.seriesIndex - 1].value) +
                '%</span>' +
                "</div>" +
                "</div>"
            } else {
              result =
              '<div style="margin:-10px;padding:0.1rem;">' +
                '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem;line-height:1.5">' +
                  params.name +
                "</div>" +
                '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
                '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; margin-right:0.04rem;background:' +
                (params.name === "30岁以下" ? crlColorArr1[0] : params.name === "31-40岁" ? crlColorArr1[1] : params.name === "41-50岁" ? crlColorArr1[2] : crlColorArr1[3]) + '");></span>' +
                (crlFlag ? 0 : Math.round(params.value / 100 * that.participationNum)) +
                '人<span style="margin-left:0.06rem;">占比' +
                (crlFlag ? 0 : params.value) +
                '%</span>' +
                "</div>" +
                "</div>"
            }
            return result;
          }
        },
        angleAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 100,
          boundaryGap: ['0', '100'],
          startAngle: 90
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          // data: [that.sexList[0].name, that.sexList[1].name],
          z: 10
        },
        polar: {
          radius: '64%'
        },
        series: [...seriesCrlOption, ...seriesCrlOption2]
      });
      // 绘制立体环饼图2
      // this.ageGenderStatistic.malePerct = 0
      // this.ageGenderStatistic.femalePerct = 0
      let sexFlag = false
      if (this.ageGenderStatistic.malePerct === 0 && this.ageGenderStatistic.femalePerct === 0) {
        sexFlag = true
      }
      this.sexList = [
        {
          name: "男",
          value: sexFlag ? 50 : NP.times(this.ageGenderStatistic.malePerct, 100)
        },
        {
          name: "女",
          value: sexFlag ? 50 : NP.times(this.ageGenderStatistic.femalePerct, 100)
        }
      ];
      
      let sexNumArr = this.sexList
      let sexColorArr = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(0, 84, 255, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(0, 84, 255, 1)' // 100% 处的颜色
        }]
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(243, 141, 42, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(243, 141, 42, 1)' // 100% 处的颜色
        }]
      }]
      let sexColorArr1 = ['rgba(0, 84, 255, 1)', 'rgba(243, 141, 42, 1)']
      let richSexColor = {}
      sexColorArr1.forEach((item, idx) => {
        richSexColor[`color${idx}`] = {
          fontSize: nowSize(14),
          height: nowSize(15),
          fontWeight: 'bold',
          align: 'left',
          color: item
        };
        richSexColor[`name${idx}`] = {
          fontSize: nowSize(14),
          height: nowSize(15),
          fontWeight: 'bold',
          align: 'left'
        }
      })
      var dataSex = [];
      for (var s = 0; s < sexNumArr.length; s++) {
        dataSex.push({
          value: sexNumArr[s].value,
          name: sexNumArr[s].name
        });
      }
      var seriesSexOption = [
        {
          name: '',
          type: 'pie',
          radius: ['54%', '64%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          color: 'transparent',
          itemStyle: {
            normal: {
              color: 'transparent',
              label: {
                show: true,
                position: 'outside',
                color: '#ffffff',
                padding: [nowSize(-4), 0, 0, nowSize(-0)],
                formatter: function(params) {
                  // console.log(params)
                  if (sexFlag) {
                    return `{color${params.dataIndex}|${0}}\n{name${params.dataIndex}|${params.name}：}{color${params.dataIndex}|${0}%}`
                  } else {
                    return `{color${params.dataIndex}|${Math.round(params.value / 100 * that.participationNum)}}\n{name${params.dataIndex}|${params.name}：}{color${params.dataIndex}|${params.value}%}`
                  }
                },
                rich: richSexColor
              },
              labelLine: {
                // length: sexFlag ? nowSize(1) : nowSize(6),
                // length2: sexFlag ? nowSize(1) : nowSize(6),
                length: nowSize(10),
                length2: nowSize(4),
                show: true,
                lineStyle: {
                  color: 'transparent'
                }
              }
            }
          },
          data: dataSex
        }
      ];
      var numSex = 0
      const seriesSexOption2 = sexNumArr.map((item, index) => {
        numSex += item.value
        const a = {
          type: 'bar',
          data: ['', '', '', numSex],
          coordinateSystem: 'polar',
          z: 9999 - index,
          name: item.name,
          roundCap: true,
          color: sexColorArr1[index],
          barGap: '-100%',
          itemStyle: {
            normal: {
              shadowBlur: nowSize(2),
              shadowColor: sexColorArr1[index]
            }
          }
        }
        return a
      })
      this.myChartPieSex = echarts.init(this.$refs.myChartPieSex);
      this.myChartPieSex.setOption({
        color: sexColorArr,
        tooltip: {
          trigger: "item",
          // trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#00AAFF",
              width: nowSize(0),
              type: "solid"
            }
          },
          backgroundColor: "rgba(5, 16, 62, 1)",
          borderColor: "#5d95ff",
          borderWidth: nowSize(1),
          textStyle: {
            color: "#ffffff"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          formatter: function(params) {
            // console.log(params)
            let result = ''
            if (params.seriesType == 'bar') {
              // console.log(dataSex[params.seriesIndex - 1])
              result =
              '<div style="margin:-10px;padding:0.1rem;">' +
                '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem;line-height:1.5">' +
                  params.seriesName +
                "</div>" +
                '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
                '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; margin-right:0.04rem;background:' +
                params.color + '");></span>' +
                (sexFlag ? 0 : Math.round(dataSex[params.seriesIndex - 1].value / 100 * that.participationNum)) +
                '人<span style="margin-left:0.06rem;">占比' +
                  (sexFlag ? 0 : dataSex[params.seriesIndex - 1].value) +
                '%</span>' +
                "</div>" +
                "</div>"
            } else {
              result =

                '<div style="margin:-10px;padding:0.1rem;">' +
                '<div style="font-weight: 600; font-size: 0.2rem;padding-bottom: 0px;margin-bottom: 0.08rem;line-height:1.5">' +
                  params.name +
                "</div>" +
                '<div style="display:flex;justify-content:flex-start;align-items:center;margin-bottom:0rem;line-height:1">' +
                '<span style="display:inline-block;width:0.08rem;height:0.08rem;border-radius:0.04rem; margin-right:0.04rem;background:' +
                (params.name === "男" ? sexColorArr1[0] : sexColorArr1[1]) + '");></span>' +
                (sexFlag ? 0 : Math.round(params.value / 100 * that.participationNum)) +
                '人<span style="margin-left:0.06rem;">占比' +
                  (sexFlag ? 0 : params.value) +
                '%</span>' +
                "</div>" +
                "</div>"
            }
            return result;
          }
        },
        angleAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 100,
          boundaryGap: ['0', '100'],
          startAngle: 90
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          // data: [that.sexList[0].name, that.sexList[1].name],
          z: 10
        },
        polar: {
          radius: '64%'
        },
        series: [...seriesSexOption, ...seriesSexOption2]
      });
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
              animation: liziAnimation 12s linear infinite;
              // opacity: 1;
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
            .lib_b_lizi2 {
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
              transform: translate(0, 9.98rem) rotateY(180deg);
              animation: lizisAnimation 12s 6s linear infinite;
              margin-top: -9.26rem;
              // opacity: 0.5;
            }
            @keyframes lizisAnimation {
              0% {
                transform: translate(0, 9.98rem) rotateY(180deg);
                // background-position: 0 -50%;
                opacity: 0;
              }
              1% {
                transform: translate(0, 7rem) rotateY(180deg);
                // background-position: 0 -20%;
                opacity: 0;
              }
              1.05% {
                transform: translate(0, 7rem) rotateY(180deg);
                // background-position: 0 -20%;
                opacity: 0.5;
              }
              // 50% {
              //   transform: translate(0, -85%);
              //   // background-position: 0 50%;
              //   opacity: 1;
              // }
              99% {
                transform: translate(0, -8rem) rotateY(180deg);
                // background-position: 0 120%;
                opacity: 0.5;
              }
              99.05% {
                transform: translate(0, -8rem) rotateY(180deg);
                // background-position: 0 120%;
                opacity: 0;
              }
              100% {
                transform: translate(0, 9.98rem) rotateY(180deg);
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
          .img7 {
            width:100%;
            display: block;
            bottom: 0.1rem;
            left: 0;
            right: 0;
            z-index: 1;
            transform: translate(0, 0);
            animation: cir1 3s linear infinite;
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
            bottom: 0.26rem;
            left: 0rem;
            right: 0;
            z-index: 2;
            animation: opc 3s linear infinite;
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
            opacity: 0;
          }
          .img6 {
            display: block;
            bottom: 0.14rem;
            left: 0;
            right: 0;
            width: 5.91rem;
            z-index: 3;
            animation: opas 4s linear infinite;
            opacity: 1;
          }
          @keyframes opas {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
            100% {
              opacity: 1;
            }
            
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
              transform: translate(0, 0);
            }
            25% {
              opacity: 0;
              transform: translate(0, 0.1rem);
            }
            50% {
              opacity: 1;
              transform: translate(0, 0);
            }
            75% {
              opacity: 0;
              transform: translate(0, -0.1rem);
            }
            100% {
              opacity: 1;
              transform: translate(0, 0);
            }
          }
          @keyframes cir1 {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(0, 0.1rem);
            }
            50% {
              transform: translate(0, 0);
            }
            75% {
              transform: translate(0, -0.1rem);
            }
            100% {
              transform: translate(0, 0);
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
            top: 0.1rem;
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
                  width: 3.12rem;
                  height: 1.05rem;
                  background: url("../../assets/images/heart/zongti.png")
                    no-repeat center;
                  background-size: 100%;
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
                margin-top: 0.3rem;
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
                      font-size: 0.18rem;
                      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                      font-weight: 500;
                      color: RGBA(165, 177, 193, 1);
                    }
                  }
                  img {
                    width: 100%;
                    height: 100%;
                    transform: rotate(0deg);
                    animation: rotx 20s linear infinite;
                    transform-origin: center;
                    margin-top: 1.1rem;
                  }
                  .img11 {
                    transform: rotate(360deg);
                    animation: rotx1 10s linear infinite;
                    margin-top: 0rem;
                  }
                  .img22 {
                    margin-top: 1.1rem;
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
          margin-bottom: 0.17rem;
          // height: 3.07rem;
          .hvml_b_head {
            font-size: 0.2rem;
            line-height: 1;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #FFFFFF;
            position: absolute;
            top: 0.12rem;
            left: 1.08rem;
          }
          .hvml_b_bg {
            display: block;
            width: 6.02rem;
            height: 3.1rem;
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
                
                .to_img_box{
                  width: 1.13rem;
                  height: 1.13rem;
                  background: url("../../assets/images/heart/dizuo.png")
                    no-repeat center bottom;
                  background-size: 1.13rem 1.13rem;
                  margin-bottom: -0.1rem;
                  .to_img {
                    width: 0.31rem;
                    height: 0.41rem;
                  }
                  .to_img1{
                    margin-top:-0.16rem
                  }
                  .to_img2{
                    margin-top:-0.1rem
                  }
                  .to_img3{
                    margin-top:-0.04rem
                  }
                  .to_img4{
                    margin-top:0.02rem
                  }
                }
                
                .to_type {
                  font-size: 0.24rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  line-height: 0.36rem;
                }
                .i_col1 {
                  color: #62E0C9;
                }
                .i_col2 {
                  color: #EDE188;
                }
                .i_col3 {
                  color: #ED9A4A;
                }
                .i_col4 {
                  color: #E66969;
                }
                .to_num {
                  font-size: 0.18rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  span {
                    font-size: 0.22rem;
                    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                    font-weight: 400;
                    line-height: 0.32rem;
                  }
                }
              }
            }
            .tv_ec {
              width: 100%;
              height: 100%;
              // margin-bottom: 0.32rem;
              overflow: hidden;
              position: relative;
              .tv_ec_head {
                font-size: 0.28rem;
                // line-height: 0.8rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                position: absolute;
                top: 0.04rem;
                height:0.5rem;
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
                    min-width: 0.5rem;
                    // padding: 0 0.1rem;
                    
                    background: rgba(2, 20, 57, 1);
                    border: 0.02rem solid rgba(93, 149, 255, 1);
                    cursor: pointer;
                    font-size: 0.16rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #ffffff;
                    // padding: 0 0.08rem;
                    
                    // border: 0.01rem solid #ffffff;
                  }
                  li:last-child {
                    border-left: 0;
                  }

                  .tv_ec_act {
                    // color: #ffffff;
                    background: rgba(6, 51, 143, 1);
                    // border: 0.02rem solid rgba(93, 149, 255, 1);
                  }
                  // .tv_ec_act2 {
                  //   // color: #ffffff;
                  //   background: rgba(6, 51, 143, 1);
                  //   // border: 0.02rem solid rgba(93, 149, 255, 1);
                  // }
                  // // .tv_ec_act30{
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
                  height: 0.34rem;
                  z-index: -1;
                  .c_pie_li {
                    padding: 0 0.14rem;
                    font-size: 0.16rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #7497DA;
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
                      background: rgba(0, 84, 255, 1)
                    }
                    .c_ths1 {
                      background: rgba(243, 141, 42, 1);
                    }
                    .c_thp0 {
                      background: rgba(123, 106, 255, 1);
                    }
                    .c_thp1 {
                      background: rgba(0, 84, 255, 1);
                    }
                    .c_thp2 {
                      background: rgba(55, 196, 255, 1);
                    }
                    .c_thp3 {
                      background: rgba(193, 193, 193, 1);
                    }
                    .c_thp4 {
                      background: rgba(243, 141, 42, 1);
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
                    font-size: 0.16rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #7497DA;
                    .c_thq1 {
                      background: rgba(26, 166, 225, 1)
                    }
                    .c_thq2 {
                      background: rgba(123, 106, 255, 1)
                    }
                    .c_thq3 {
                      background: rgba(55, 121, 255, 1)
                    }
                    .c_thq4 {
                      background: rgba(243, 141, 42, 1)
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
                height: 2.2rem;
                margin-top: 0.38rem;
                // background: #ffffff;
              }
              .chart_heart{
                position: absolute;
                margin: auto;
                top: 0.38rem;
                bottom: 0;
                right: 0;
                left: 0;
                min-width: 1rem;
                height: 0.28rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.2rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #FFFFFF;
              }
              .tv_head{
                width: 3.1rem;
                height: 2.2rem;
                position: relative;
              }
              .tv_head1{
                width: 2.8rem;
                height: 2.2rem;
                position: relative;
              }
              .myChartPieCrl {
                margin-top: 0;
                width: 3.1rem;
                height: 2.2rem;
                // background: #ffffff;
              }
              .myChartPieSex {
                margin-top: 0;
                width: 2.8rem;
                height: 2.2rem;
                // background: #ffffff;
              }
              .chart_heart1{
                position: absolute;
                margin: auto;
                top: 0rem;
                bottom: 0;
                right: 0;
                left: 0;
                min-width: 0.8rem;
                height: 0.28rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.2rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #FFFFFF;
              }
              .chart_heart2{
                position: absolute;
                margin: auto;
                top: 0rem;
                bottom: 0;
                right: 0;
                left: 0;
                min-width: 0.8rem;
                height: 0.28rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.2rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #FFFFFF;
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
                padding: 0 0.1rem;
                img {
                  display: block;
                  width: 1.72rem;
                  height: 1.88rem;
                }
              }
              li:first-child {
                padding-left: 0.2rem;
              }
              li:last-child {
                padding-right: 0.2rem;
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
                color: rgba(26, 166, 225, 1);
                // background: url("../../assets/images/heart/level1.png")
                //   no-repeat center;
                // background-size: cover;
              }
              .level_bg2 {
                color: rgba(123, 106, 255, 1);
                // background: url("../../assets/images/heart/level2.png")
                //   no-repeat center;
                // background-size: cover;
              }
              .level_bg3 {
                color: rgba(55, 121, 255, 1);
                // background: url("../../assets/images/heart/level3.png")
                //   no-repeat center;
                // background-size: cover;
              }
              .level_bg4 {
                color: rgba(243, 141, 42, 1);
                // background: url("../../assets/images/heart/level4.png")
                //   no-repeat center;
                // background-size: cover;
              }
            }
            .hvml_person {
              margin-top: 0.28rem;
              .huml_p_li {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 0.34rem;
                .huml_pl_name {
                  width: 1.0rem;
                  font-size: 0.18rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #FFFFFF;
                  text-align: right;
                }
                .huml_pl_box {
                  width: 4rem;
                  margin-right: 0.3rem;
                  margin-left: 0.2rem;
                  height: 0.12rem;
                  display: flex;
                  align-items: center;
                  // background: #ffffff;
                  padding: 0 0 0 0;
                  border-radius: 0.06rem;
                  // background: RGBA(4, 15, 53, 1);
                  overflow: hidden;
                  cursor: pointer;
                  // 长方体
                  .huml_plb_left {
                    position: relative;
                    height: 0.12rem;
                    margin-top: 0rem;
                    // background: rgba(1, 89, 255, 0.50);
                    .huml_plb_c {
                      position: absolute;
                      left: 0rem;
                      top: 0;
                      width: 100%;
                      height: 0.12rem;
                      background: linear-gradient(270deg, #3D77FD 0%, #0F307A 100%);
                      z-index: 2;
                      border-radius: 0.06rem;
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
                    margin-top: 0rem;
                    .huml_plb_c {
                      position: absolute;
                      left: 0rem;
                      top: 0;
                      width: 100%;
                      height: 0.12rem;
                      background: linear-gradient(270deg, #F38D2A 0%, #5C4A3B 100%);
                      z-index: 1;
                      // border-radius: 0.06rem;
                      
                    }
                    .huml_plb_l {
                      position: absolute;
                      left: -0.11rem;
                      top: 0rem;
                      width: 0.12rem;
                      height: 0.12rem;
                      background: #5C4A3B;
                      border-radius: 0.06rem 0 0 0.06rem;
                      z-index: 0;
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
                  width: 4.8rem;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-top: -0.14rem;
                  margin-right: 0.24rem;
                  margin-left: 1.1rem;
                  div {
                    width: 20%;
                    text-align: center;
                    font-size: 0.16rem;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 1
                  }
                }
              }
              .center_p_per {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                position: absolute;
                margin: auto;
                left: 0;
                right: 0rem;
                top: 0;
                // bottom: 0;
                // z-index: -1;
                .c_pie_li {
                  padding: 0 0.12rem;
                  font-size: 0.16rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #7497DA;
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
                    background: rgba(0, 84, 255, 1);
                  }
                  .c_ths1 {
                    background: rgba(243, 141, 42, 1);
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
