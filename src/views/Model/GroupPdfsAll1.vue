<template>
    <div>
        <div class="group-class">
            <!-- 导出pdf的盒子，随着页面增多，需要拆成两个盒子，再拼接，确保清晰度 -->
            <div class="group_box" id="overviewpage">
                <div id="viewImage1">
                    <!-- 封面 -->
                    <div class="group_style">
                        <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" />
                        <div class="table-border noSplitBox">
                            <div class="g1_top">
                                <span>{{ schoolName }}</span>
                            </div>
                            <div class="g1_top1">
                                {{ reportName1 }}
                            </div>
                            <div class="g1_top1">
                                中小学生心理健康筛查评估
                            </div>
                            <div class="g1_top1">
                                团体报告
                            </div>
                            <div class="g2_top1" v-if="start != ''">
                                {{ start }} ～ {{ end }}
                            </div>
                        </div>
                    </div>
                    <!-- 目录 -->
                    <div class="ml_box">
                        <div class="ml_p noSplitBox">
                            目录
                        </div>
                        <div class="noSplitBox" v-for="(item, index) in muluList" :key="index">
                            <div :class="{
                                ml_p0: true,
                                pl30: item.mark == 2,
                                pl60: item.mark == 3,
                                pl90: item.mark == 4
                            }">
                                <div>
                                    {{ item.ids }} {{ item.name }}
                                </div>
                                <div class="ml_li"></div>
                                <div>{{ item.page}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 引言 -->
                    <div class="fuck yy_box ">
                        <div class="noSplitBox" style="height: 1640px;">
                            <div class="yy_o mulu_page mulu_empty_page">
                                1.引言
                            </div>
                            <div class="yy_t mulu_page">
                                1.1 测评目的
                            </div>
                            <div class="yy_txt">
                                {{start != '' ? start+'～'+end+'，' : ''}}{{ schoolName }}对校内{{ detail.totalClasses }}个班级{{ detail.gradeNumTxt }}学生进行了心理健康筛查评估。
                            </div>
                            <div class="yy_txt">
                                本次筛查评估主要用于揭示本校中小学生的心理健康水平和心理健康问题，明确不同学段和不同性别学生分别需要重点关注的心理健康问题，发现具有心理健康问题风险的学生，从而为本校开展学生心理健康教育以及心理问题风险管理提供重要的依据。
                            </div>
                            <div class="yy_t mulu_page">
                                1.2 测评工具
                            </div>
                            <div class="yy_txt">
                                此次筛查评估使用的测评工具为“AI心世界”智能心理测评系统。该系统结合心理投射和人工智能技术，在无意识状态下对受测者心理状态、个性特征和行为特征进行测量。该系统从五大心理健康问题（抑郁、焦虑、强迫、敌对、自我伤害）对中小学生心理状态进行科学评估。该系统完全自主研发，拥有10余项国家发明专利，已通过中国心理学会标准化委员会成果鉴定和公安部安全与警用电子产品质量检测中心认证。
                            </div>
                            <div class="yy_t mulu_page">
                                1.3 相关结论
                            </div>
                            <!-- 根据测评人群涉及多个学段、直升与非直升实际情况，进行相应输出：------这里可能要做个判断几个学段，初一有没有直升和非直升 -->
                            <div class="yy_txt">
                                本报告从全校各维度检出率、各学段各维度检出率、男女不同性别各维度检出率情况进行分析，相关结论如下：
                            </div>
                            <div class="yy_txt">
                                （1）全校各维度检出率：在具体的心理健康维度上，检出率由高到低依次为：
                                <span v-for="(item, index) in detail.wdJcList" :key="item.grade">{{ item.grade }}（{{ item.total }}%）{{ index < detail.wdJcList.length - 1 ? '、' : ''}}{{ index == detail.wdJcList.length - 1 ? '。' : '' }} </span>
                                <!-- 全部低于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 1">与全国常模相比，所有维度检出率都低于全国常模，该校测评年级心理健康整体表现较好。</span>
                                <!-- 全部等于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 2">与全国常模相比，所有维度都与之持平，本校心理健康问题与全国状况大致相当。</span>
                                <!-- 全部大于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 3">与全国常模相比，所有维度检出率都高于全国常模，该校测评年级心理健康问题较为突出。</span>
                                <!-- 部分大于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 4">其中，{{ detail.txtStr }}检出率高于全国常模，问题较为突出。</span>
                                <!-- 部分持平，最高持平全国常模 -->
                                <span v-if="detail.wdLevelTxt === 5">与全国常模相比，{{ detail.txtStr52 }}维度与之持平，{{ detail.txtStr51 }}维度低于全国常模。</span>
                            </div>
                            <div class="yy_txt">
                                （2）各学段各维度检出率：{{ detail.gradeTxt1 }}{{ detail.gradeTxt2 }}
                            </div>
                            <div class="yy_txt">
                                （3）男女不同性别各维度检出率：{{ detail.gradeTxt4 }}
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="yy_box basic_box" id="viewImage2">
                    <div class="noSplitBox">
                        <div class="yy_o mulu_page">
                            2.测评基本信息
                        </div>
                        <div class="yy_t mulu_page">
                            2.1 筛查评估样本与内容
                        </div>
                        <div class="yy_t mulu_page">
                            2.1.1 筛查评估对象和样本
                        </div>
                        <div class="yy_txt">
                            {{ schoolName }}对{{ detail.totalClasses }}个班级共{{ detail.totalStudents
                            }}名学生开展了心理健康筛查评估。{{ detail.gradeNumTxt1 }}
                        </div>
                        <div class="yy_txt">
                            参加本次筛查评估的{{ detail.totalStudents }}名学生中，{{ detail.gradeNumTxt2 }}各学段的学生人数占比分布情况如下图：
                        </div>
                        <div style="width: 100%;height: auto;">
                            <div style="width: 100%;height: 320px;margin: 0 auto;" class="myChart" ref="myChart1">
                            </div>
                            <div class="yy_biao" style="text-align: center;">图1 {{ schoolName }}参加筛查评估学生学段分布图</div>
                        </div>
                        <div class="yy_txt">
                            参加本次筛查评估的{{ detail.totalStudents }}位学生中，男生共{{ detail.maleStudents }}人，占比为{{
                                detail.maleStudentsPre }}%；女生共{{ detail.femaleStudents }}人，占比为{{ detail.femaleStudentsPre
                            }}%
                            ，各学段学生性别分布情况见下图：
                        </div>
                        <div style="width: 100%;height: auto;margin: 20px auto 10px;">
                            <div style="width: 100%;height: 320px;margin: 0 auto;" class="myChart" ref="myChart2">
                                学段--饼状图</div>
                            <div class="yy_biao" style="text-align: center;">图 2 {{ schoolName }}参加筛查评估男女性别人数对比图
                            </div>
                        </div>
                        <div class="yy_int">
                            各班级学生人数占比分布情况见下表：
                        </div>
                        <div class="yy_biao" style="">
                            表 1 {{ schoolName }}参加筛查评估各班级人数占比图
                        </div>
                    </div>
                    
                    
                    
                    
                    <table cellspacing="0">
                        <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                            <th style="width:20%">学段</th>
                            <th style="width:40%">班级</th>
                            <th style="width:20%">人次</th>
                            <th style="width:20%">占比</th>
                        </tr>
                        <tr v-for="(item, index) in this.detail.gradeList" :key="index"
                            class="pdf-details noSplitBox">
                            <td>{{ item.name }}</td>
                            <td>{{ item.grade }}</td>
                            <td>{{ item.count }}</td>
                            <td>{{ item.proportion }}%</td>
                        </tr>
                    </table>
                    <div class="noSplitBox">
                        <div class="yy_t mulu_page">
                            2.1.2 筛查评估指标和内容
                        </div>
                        <div class="yy_txt">
                            本次中小学生心理健康筛查评估采用线下团体测评的方式开展，即学生以班级为单位统一在校使用计算机创作电子箱庭（沙盘）进行测评，本次筛查评估内容包括学生的心理健康风险水平和心理健康问题两大方面。测评结果仅供参考，不作为诊断使用。
                        </div>
                        <div class="yy_t  mulu_page">
                            2.1.2.1 心理健康风险水平
                        </div>
                        <div class="yy_txt">
                            将学生的心理健康水平划分为四个等级：正常、轻度问题、中度问题和重度问题，具体解释见下表：
                        </div>

                        <div class="yy_biao" style="text-align: center;">
                            表 2 心理健康风险水平的解释和定义
                        </div>
                        <table cellspacing="0">
                            <tr class="pdf-details" style="background: #e9e9e9">
                                <th style="width:200px">心理健康水平</th>
                                <th>内容</th>
                            </tr>
                            <tr v-for="(item, index) in oneData2" :key="index" class="pdf-details">
                                <td>{{ item.name }}</td>
                                <td style="text-align: left;">{{ item.content }}</td>
                            </tr>
                        </table>

                        <div class="yy_t mulu_page">
                            2.1.2.2 心理健康问题
                        </div>
                        <div class="yy_txt">
                            本次筛查评估内容涵盖了我国中小学生常见的五类心理健康问题，包括：抑郁、焦虑、强迫、敌对、自我伤害。这些心理健康问题的具体解释见下表：
                        </div>
                        <div class="yy_biao" style="">
                            表 3 心理健康问题的筛查评估指标和解释
                        </div>
                        <table cellspacing="0">
                            <tr class="pdf-details" style="background: #e9e9e9">
                                <th style="width:200px">心理健康问题</th>
                                <th>内容</th>
                            </tr>
                            <tr v-for="(item, index) in oneData3" :key="index" class="pdf-details">
                                <td>{{ item.name }}</td>
                                <td style="text-align: left;">{{ item.content }}</td>
                            </tr>
                        </table>
                    </div>
                    
                </div>


                <!-- 3.测评结果 -->
                <div class="yy_box basic_box" id="viewImage3">
                    <div class="noSplitBox">
                        <div class="yy_t yy_o mulu_page">
                            3.测评结果
                        </div>
                        <div class="yy_t mulu_page">
                            3.1 总体测评结果
                        </div>
                        <div class="yy_t mulu_page">
                            3.1.1 各维度检出率
                        </div>
                        <div class="legends" style="width: 100%;height: auto;margin: 10px auto 0px;">
                            <div style="width: 100%;height: 320px;margin: 0 auto;" class="myChart" ref="myChart3">
                                检出率--雷达图</div>
                            <div class="c_legend">
                                <div>
                                    <span></span>
                                    <span>{{schoolName}}</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span>全国常模</span>
                                </div>
                            </div>

                        </div>
                        <table class="cm_table" cellspacing="0">
                            <tr class="pdf-details" style="background: #e9e9e9">
                                <th></th>
                                <th>抑郁</th>
                                <th>焦虑</th>
                                <th>强迫</th>
                                <th>敌对</th>
                                <th>自我伤害</th>
                            </tr>
                            <tr class="pdf-details">
                                <td>差值</td>
                                <td>{{ cmCha[0].num }}%</td>
                                <td>{{ cmCha[1].num }}%</td>
                                <td>{{ cmCha[2].num }}%</td>
                                <td>{{ cmCha[3].num }}%</td>
                                <td>{{ cmCha[4].num }}%</td>
                            </tr>
                            <tr class="pdf-details">
                                <td>{{ schoolName }}</td>
                                <td>{{ schoolCM[0] }}%</td>
                                <td>{{ schoolCM[1] }}%</td>
                                <td>{{ schoolCM[2] }}%</td>
                                <td>{{ schoolCM[3] }}%</td>
                                <td>{{ schoolCM[4] }}%</td>
                            </tr>
                            <tr class="pdf-details">
                                <td>全国常模</td>
                                <td>{{ ChinaCM[0] }}%</td>
                                <td>{{ ChinaCM[1] }}%</td>
                                <td>{{ ChinaCM[2] }}%</td>
                                <td>{{ ChinaCM[3] }}%</td>
                                <td>{{ ChinaCM[4] }}%</td>
                            </tr>
                        </table>
                        <div class="yy_biao" style="text-align: center;margin-top: -10px;margin-bottom: 0px;">图 3
                            心理健康问题检出率对比分布</div>

                        <div class="yy_txt">
                           {{ schoolName }}的学生中，{{ detail.jcTxt }}
                        </div>
                        <div class="yy_txt">
                           {{ detail.cmTxt }}
                        </div>
                    </div>
                    <div class="noSplitBox">
                        <div style="width: 100%;height: auto;margin: 10px auto 0px;">
                            <div style="width: 75%;height: 280px;margin: 0 auto;" class="myChart" ref="myChart4">
                            </div>
                        </div>
                        <table class="cm_table" cellspacing="0" style="margin-bottom: 10px;">
                            <tr class="pdf-details" style="background: #e9e9e9">
                                <th></th>
                                <th>抑郁</th>
                                <th>焦虑</th>
                                <th>强迫</th>
                                <th>敌对</th>
                                <th>自我伤害</th>
                            </tr>
                            <tr class="pdf-details">
                                <td>
                                    <div style="display: flex;justify-content: center;align-items: center;"><span
                                            style="margin-right:6px; width: 10px;height: 10px;border-radius: 50%;background: #8ACBFF"></span><span>轻度问题</span>
                                    </div>
                                </td>
                                <td>{{ wdJcListArr[0].mildProportion }}%</td>
                                <td>{{ wdJcListArr[1].mildProportion }}%</td>
                                <td>{{ wdJcListArr[2].mildProportion }}%</td>
                                <td>{{ wdJcListArr[3].mildProportion }}%</td>
                                <td>{{ wdJcListArr[4].mildProportion }}%</td>
                            </tr>
                            <tr class="pdf-details">
                                <td>
                                    <div style="display: flex;justify-content: center;align-items: center;"><span
                                            style="margin-right:6px; width: 10px;height: 10px;border-radius: 50%;background: #FFDDA0"></span><span>中度问题</span>
                                    </div>
                                </td>
                                <td>{{ wdJcListArr[0].moderateProportion }}%</td>
                                <td>{{ wdJcListArr[1].moderateProportion }}%</td>
                                <td>{{ wdJcListArr[2].moderateProportion }}%</td>
                                <td>{{ wdJcListArr[3].moderateProportion }}%</td>
                                <td>{{ wdJcListArr[4].moderateProportion }}%</td>
                            </tr>
                            <tr class="pdf-details">
                                <td>
                                    <div style="display: flex;justify-content: center;align-items: center;"><span
                                            style="margin-right:6px; width: 10px;height: 10px;border-radius: 50%;background: #FE9D9D"></span><span>重度问题</span>
                                    </div>
                                </td>
                                <td>{{ wdJcListArr[0].severeProportion }}%</td>
                                <td>{{ wdJcListArr[1].severeProportion }}%</td>
                                <td>{{ wdJcListArr[2].severeProportion }}%</td>
                                <td>{{ wdJcListArr[3].severeProportion }}%</td>
                                <td>{{ wdJcListArr[4].severeProportion }}%</td>
                            </tr>
                        </table>
                        <div class=" legends noSplitBox1"
                            style="width: 100%;height: auto;margin: 0px auto 0px;">
                            <div class="c_legend">
                                <div>
                                    <span></span>
                                    <span>轻度问题</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span>中度问题</span>
                                </div>
                                <div>
                                    <span></span>
                                    <span>重度问题</span>
                                </div>
                            </div>

                        </div>
                        <div class="yy_biao" style="text-align: center;margin-top: 0px;margin-bottom: 0px;">图 4
                            心理健康检出率分布图
                        </div>
                    </div>




                    <div class="yy_txt noSplitBox">
                        根据图 4 所示的心理健康问题检出率分布图，我们可以得出以下几点重要发现：
                    </div>
                    <div class="noSplitBox" v-html="detail.wdpStr"></div>
                    <div class="noSplitBox">
                        <div class="yy_t mulu_page">
                            3.1.2 不同性别各维度检出率
                        </div>
                        <div style="width: 100%;height: auto;margin: 10px auto 0px;">
                            <div style="width: 75%;height: 280px;margin: 0 auto;" class="myChart" ref="myChart5">
                            </div>
                            <div class="yy_biao" style="text-align: center;">图 5 不同性别学生心理健康问题检出率分布图</div>
                        </div>
                        <div class="yy_txt">
                            根据图 5 的数据显示，{{ detail.genderTxt5 }}
                        </div>
                        <div class="yy_txt">
                           {{ detail.genderTxt51 }}{{ detail.genderTxt52 }}
                        </div>
                        
                    </div>
                    <div class="noSplitBox">
                        <div class="yy_t mulu_page">
                            3.1.3 各个学段各维度检出率
                        </div>
                        <div class="yy_biao" style="text-align: center;">表 4 各个学段各维度检出率对比表</div>
                        <table cellspacing="0">
                            <tr class="pdf-details" style="background: #e9e9e9">
                                <th></th>
                                <th>抑郁</th>
                                <th>焦虑</th>
                                <th>强迫</th>
                                <th>敌对</th>
                                <th>自我伤害</th>
                            </tr>

                            <tr class="pdf-details" v-for="item in detail.gradeListOrg" :key="item.grade">
                                <td>{{ item.grade }}</td>
                                <td v-for="(itemp, indexp) in item.pList" :key="itemp.name">{{ itemp.percent }}%{{
                                    itemp.percent > ChinaCM[indexp] && itemp.percent > schoolCM[indexp] ? '*' : ''
                                }}
                                </td>
                            </tr>

                            <tr class="pdf-details">
                                <td>全国常模</td>
                                <td>{{ ChinaCM[0] }}%</td>
                                <td>{{ ChinaCM[1] }}%</td>
                                <td>{{ ChinaCM[2] }}%</td>
                                <td>{{ ChinaCM[3] }}%</td>
                                <td>{{ ChinaCM[4] }}%</td>
                            </tr>
                            <tr class="pdf-details">
                                <td>本校常模</td>
                                <td>{{ schoolCM[0] }}%</td>
                                <td>{{ schoolCM[1] }}%</td>
                                <td>{{ schoolCM[2] }}%</td>
                                <td>{{ schoolCM[3] }}%</td>
                                <td>{{ schoolCM[4] }}%</td>
                            </tr>

                        </table>
                        <div class="yy_biao" style="text-align: center;margin-top: -10px">注：加*表示该年级检出率同时高于全国常模和本校常模
                        </div>
                        <div class="yy_txt" style="margin-bottom: 10px;">
                            由表中可以看出，{{ detail.gradeTxtOrg }}
                        </div>
                    </div>

                    <!-- 需要一个学段的数组 -->
                    <div v-for="(item, index) in gradeAllList" :key="index">
                        
                        <div class="noSplitBox">
                            <div class="yy_t mulu_page">
                                3.{{ index + 2 }} {{ item.name }}测评分析
                            </div>
                            <div class="yy_t mulu_page">
                                3.{{ index + 2 }}.1 {{ item.name }}测评结果概况
                            </div>
                            <div class="legends" style="width: 100%;height: auto;margin: 10px auto 0px;">
                                <div style="width: 100%;height: 260px;margin: 0 auto;" class="myChart"
                                    :ref="'myChart1' + index">检出率--雷达图</div>
                                <div class="c_legend c_legend1">
                                    <div>
                                        <span></span>
                                        <span>{{ item.name }}</span>
                                    </div>
                                    <div>
                                        <span></span>
                                        <span>全国常模</span>
                                    </div>
                                    <div>
                                        <span></span>
                                        <span>本校常模</span>
                                    </div>
                                </div>

                            </div>
                            <table cellspacing="0">
                                <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                    <th></th>
                                    <th>抑郁</th>
                                    <th>焦虑</th>
                                    <th>强迫</th>
                                    <th>敌对</th>
                                    <th>自我伤害</th>
                                </tr>
                                <tr class="pdf-details noSplitBox">
                                    <td>{{ item.name }}</td>
                                    <td v-for="itemw in item.wdList" :key="itemw.name">{{ itemw.percent }}%</td>
                                </tr>

                                <tr class="pdf-details">
                                    <td>全国常模</td>
                                    <td>{{ ChinaCM[0] }}%</td>
                                    <td>{{ ChinaCM[1] }}%</td>
                                    <td>{{ ChinaCM[2] }}%</td>
                                    <td>{{ ChinaCM[3] }}%</td>
                                    <td>{{ ChinaCM[4] }}%</td>
                                </tr>
                                <tr class="pdf-details">
                                    <td>本校常模</td>
                                    <td>{{ schoolCM[0] }}%</td>
                                    <td>{{ schoolCM[1] }}%</td>
                                    <td>{{ schoolCM[2] }}%</td>
                                    <td>{{ schoolCM[3] }}%</td>
                                    <td>{{ schoolCM[4] }}%</td>
                                </tr>
                            </table>
                            <div class="yy_biao noSplitBox" style="text-align: center;margin-top: -10px">图 {{ 6 + 6
                                * index }}
                                {{ item.name }}学生心理健康问题检出率对比分布图</div>
                            <div class="yy_txt noSplitBox">
                               {{ item.allTxt0 }}
                            </div>
                            <div class="yy_txt noSplitBox">
                               {{ item.allTxt1 }}
                            </div>
                        </div>
                        
                        <div class="yy_t noSplitBox mulu_page">
                            3.{{ index + 2 }}.2 {{ item.name }}各维度检出率情况
                        </div>
                        <div v-for="(itemw, indexw) in item.wdList" :key="indexw">

                            <div class="noSplitBox" style="width: 100%;height: auto;margin: 0px auto 0px;">
                                <div class="yy_t mulu_page" style="padding-top: 0;padding-bottom: 0;">
                                    3.{{ index + 2 }}.2.{{ indexw + 1 }} {{ itemw.name }}维度
                                </div>
                                <div style="width: 70%;height: 170px;margin: 0 auto;" class="myChart"
                                    :ref="'myChart2' + index + indexw"></div>
                                <div class="rtr_ul">
                                    <ul>
                                        <li><span class="r_cir1"></span>{{ itemw.name }}</li>
                                        <li><span class="r_line1"></span>全国常模</li>
                                        <li><span class="r_line2"></span>年级常模</li>
                                    </ul>
                                </div>
                                <div class="yy_biao" style="text-align: center; padding: 0;">图 {{ 6 + 6 * index + indexw + 1 }}
                                    {{ item.name }}{{ itemw.name }}检出率对比图</div>
                                
                                <div class="yy_biao" style="text-align: center;">表 {{ 4 + 5 * index + indexw + 1 }}
                                    {{ itemw.name }}维度重点关注班级列表</div>
                                <table cellspacing="0" style="width: 100%;">
                                    <tr class="pdf-details noSplitBox" style="background: #e9e9e9">

                                        <th>情况描述</th>
                                        <th>班级</th>
                                    </tr>
                                    <tr class="pdf-details noSplitBox">
                                        <td style="width: 2.5rem;">高于全国常模和年级常模</td>
                                        <td v-if="item.cwdName">
                                            {{ item.cwdName[indexw] == '' ? '无' : item.cwdName[indexw] }}
                                        </td>
                                        

                                    </tr>

                                </table>
                                <div class="yy_biao"
                                    style="text-align: center;margin-top: -10px;margin-bottom: 0px;">
                                    注：加*表示该班检出率同时高于全国常模和年级常模</div>
                            </div>
                        </div>
                        <div class="yy_t noSplitBox" style="text-align: center;margin: 0px 0 10px">
                            {{ item.name }}各维度重点关注班级
                        </div>
                        <table cellspacing="0">
                            <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                <th>班级</th>
                                <th>抑郁</th>
                                <th>焦虑</th>
                                <th>强迫</th>
                                <th>敌对</th>
                                <th>自我伤害</th>
                            </tr>
                            <tr class="pdf-details noSplitBox" style="border-top: 0;height: 60px;" v-if="item.csListz.length == 0">
                                <td colspan="6">无</td>
                            </tr>
                            <tr class="pdf-details noSplitBox" v-for="(itemc, indexc) in item.csListz" :key="indexc">
                                <td v-if="itemc.nameFlag">{{ itemc.name }}</td>
                                <td v-if="itemc.nameFlag">{{ itemc.depressionPercentage }}%{{
                                    itemc.depressionPercentage > ChinaCM[0] && itemc.depressionPercentage >
                                        item.wdList[0].percent ? '*' : '' }}</td>
                                <td v-if="itemc.nameFlag">{{ itemc.anxietyPercentage }}%{{ itemc.anxietyPercentage >
                                    ChinaCM[1] && itemc.anxietyPercentage > item.wdList[1].percent ? '*' : '' }}
                                </td>
                                <td v-if="itemc.nameFlag">{{ itemc.forcedPercentage }}%{{ itemc.forcedPercentage >
                                    ChinaCM[2] && itemc.forcedPercentage > item.wdList[2].percent ? '*' : '' }}</td>
                                <td v-if="itemc.nameFlag">{{ itemc.violencePercentage }}%{{ itemc.violencePercentage
                                    > ChinaCM[3] && itemc.violencePercentage > item.wdList[3].percent ? '*' : '' }}
                                </td>
                                <td v-if="itemc.nameFlag">{{ itemc.suicidePercentage }}%{{ itemc.suicidePercentage >
                                    ChinaCM[4] & itemc.suicidePercentage > item.wdList[4].percent ? '*' : '' }}</td>
                            </tr>

                        </table>
                        <div class="yy_biao noSplitBox"
                            style="text-align: center;margin-top: -10px;margin-bottom: 0px;">
                            注：加*表示该班检出率同时高于全国常模和年级常模
                        </div>

                        <div class="noSplitBox" style="width: 100%;height: auto;margin: 0px auto ;">
                            <div class="yy_t mulu_page">
                                3.{{ index + 2 }}.3 {{ item.name }}不同性别测评情况
                            </div>
                            <div style="width: 100%;height: 420px;margin: 0 auto;" class="myChart"
                                :ref="'myChart3' + index"></div>
                            <table cellspacing="0" style="position: relative">
                                <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                    <th width="80px" style="position: relative;">
                                        <div
                                            style="position: absolute;left: -4px;top: -3px;width: 103%;height: 73px;background: #fff;">
                                        </div>
                                    </th>
                                    <th width="200px" colspan="2">抑郁</th>
                                    <th width="200px" colspan="2">焦虑</th>
                                    <th width="200px" colspan="2">强迫</th>
                                    <th width="200px" colspan="2">敌对</th>
                                    <th width="200px" colspan="2">自我伤害</th>
                                </tr>
                                <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                    <th></th>
                                    <th>男</th>
                                    <th>女</th>
                                    <th>男</th>
                                    <th>女</th>
                                    <th>男</th>
                                    <th>女</th>
                                    <th>男</th>
                                    <th>女</th>
                                    <th>男</th>
                                    <th>女</th>
                                </tr>
                                <tr class="pdf-details noSplitBox" v-if="item.gradeNanData && item.gradeNvData">
                                    <th style="display: flex;align-items: center;justify-content: center">
                                        <span
                                            style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FE9D9D"></span>
                                        <span>重度</span>
                                    </th>
                                    <th>{{ item.gradeNanData[0].severeNum }}</th>
                                    <th>{{ item.gradeNvData[0].severeNum }}</th>
                                    <th>{{ item.gradeNanData[1].severeNum }}</th>
                                    <th>{{ item.gradeNvData[1].severeNum }}</th>
                                    <th>{{ item.gradeNanData[2].severeNum }}</th>
                                    <th>{{ item.gradeNvData[2].severeNum }}</th>
                                    <th>{{ item.gradeNanData[3].severeNum }}</th>
                                    <th>{{ item.gradeNvData[3].severeNum }}</th>
                                    <th>{{ item.gradeNanData[4].severeNum }}</th>
                                    <th>{{ item.gradeNvData[4].severeNum }}</th>
                                </tr>
                                <tr class="pdf-details noSplitBox" v-if="item.gradeNanData && item.gradeNvData">
                                    <th style="display: flex;align-items: center;justify-content: center">
                                        <span
                                            style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FFDDA0"></span>
                                        <span>中度</span>
                                    </th>
                                    <th>{{ item.gradeNanData[0].moderateNum }}</th>
                                    <th>{{ item.gradeNvData[0].moderateNum }}</th>
                                    <th>{{ item.gradeNanData[1].moderateNum }}</th>
                                    <th>{{ item.gradeNvData[1].moderateNum }}</th>
                                    <th>{{ item.gradeNanData[2].moderateNum }}</th>
                                    <th>{{ item.gradeNvData[2].moderateNum }}</th>
                                    <th>{{ item.gradeNanData[3].moderateNum }}</th>
                                    <th>{{ item.gradeNvData[3].moderateNum }}</th>
                                    <th>{{ item.gradeNanData[4].moderateNum }}</th>
                                    <th>{{ item.gradeNvData[4].moderateNum }}</th>
                                </tr>
                                <tr class="pdf-details noSplitBox" v-if="item.gradeNanData && item.gradeNvData">
                                    <th style="display: flex;align-items: center;justify-content: center">
                                        <span
                                            style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #8ACBFF"></span>
                                        <span>轻度</span>
                                    </th>
                                    <th>{{ item.gradeNanData[0].mildNum }}</th>
                                    <th>{{ item.gradeNvData[0].mildNum }}</th>
                                    <th>{{ item.gradeNanData[1].mildNum }}</th>
                                    <th>{{ item.gradeNvData[1].mildNum }}</th>
                                    <th>{{ item.gradeNanData[2].mildNum }}</th>
                                    <th>{{ item.gradeNvData[2].mildNum }}</th>
                                    <th>{{ item.gradeNanData[3].mildNum }}</th>
                                    <th>{{ item.gradeNvData[3].mildNum }}</th>
                                    <th>{{ item.gradeNanData[4].mildNum }}</th>
                                    <th>{{ item.gradeNvData[4].mildNum }}</th>
                                </tr>
                                <tr class="pdf-details noSplitBox" v-if="item.gradeNanData && item.gradeNvData">
                                    <th style="display: flex;align-items: center;justify-content: center">
                                        <span
                                            style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #B5ECAF"></span>
                                        <span>正常</span>
                                    </th>
                                    <th>{{ item.gradeNanData[0].normalNum }}</th>
                                    <th>{{ item.gradeNvData[0].normalNum }}</th>
                                    <th>{{ item.gradeNanData[1].normalNum }}</th>
                                    <th>{{ item.gradeNvData[1].normalNum }}</th>
                                    <th>{{ item.gradeNanData[2].normalNum }}</th>
                                    <th>{{ item.gradeNvData[2].normalNum }}</th>
                                    <th>{{ item.gradeNanData[3].normalNum }}</th>
                                    <th>{{ item.gradeNvData[3].normalNum }}</th>
                                    <th>{{ item.gradeNanData[4].normalNum }}</th>
                                    <th>{{ item.gradeNvData[4].normalNum }}</th>
                                </tr>

                            </table>
                            <div class="yy_txt noSplitBox" v-if='item.gradeNan && item.gradeNv'>
                                {{ item.gradeNan[0] }}{{ item.gradeNv[0] }}
                            </div>
                            <div class="yy_txt noSplitBox" v-if='item.gradeNan && item.gradeNv'>
                                {{ item.gradeNan[1] }}{{ item.gradeNv[1] }}
                            </div>
                            <div class="yy_txt noSplitBox" v-if='item.gradeNan && item.gradeNv'>
                                {{ item.gradeNan[2] }}{{ item.gradeNv[2] }}
                            </div>
                            <div class="yy_txt noSplitBox" v-if='item.gradeNan && item.gradeNv'>
                                {{ item.gradeNan[3] }}{{ item.gradeNv[3] }}
                            </div>
                            <div class="yy_txt noSplitBox" v-if='item.gradeNan && item.gradeNv'>
                                {{ item.gradeNan[4] }}{{ item.gradeNv[4] }}
                            </div>
                        </div>
                        <div class="yy_t mulu_page">
                            3.{{ index + 2 }}.4 {{ item.name }}重点关注人员名单
                        </div>
                        <div  v-if="item.gradeObj" class="yy_txt noSplitBox">
                            说明：重点关注人员名单（共{{ item.gradeObj.gradeRiskNum }}人，占{{ item.name }}总人数{{ item.gradeObj.gradeRiskPercent
                            }}），主要包含单项维度达到重度问题人群、多项维度预警人群以及操作流程性问题人群（沙具总数少、时间短）这三类人群。
                        </div>
                        <div class="yy_txt noSplitBox" style="color: #f00;">
                            {{ item.name }}重点关注人员名单见附件。
                        </div>
                    </div>
                </div>
                <!-- 附录 -->
                <div class="yy_box noSplitBox mulu_page" id="viewImage4">
                    <div class="yy_o " style="text-align: center;padding: 0 0 20px">
                        附录：各维度沙盘表现特征
                    </div>
                    <ul class="j_table">
                        <li class="pdf-details" style="background: #e9e9e9">
                            <div class="j_th">心理健康问题</div>
                            <div class="j_th">表现特征</div>
                            <div class="j_th" style="justify-content: center;">具体表现</div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;"></div>
                            <div>空洞与缺失</div>
                            <div>
                                沙盘中可能会有意留出大片空白区域，这可能象征着患者内心深处的空虚感或缺失感。沙盘作品中可能会出现大量暗淡的颜色，如灰色、黑色，或者完全避免使用颜色，选择无色或自然色的沙具，这反映了他们内心的灰暗和缺乏活力。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;border-top: 1px solid #fff;">抑郁</div>
                            <div>主题的单一化</div>
                            <div>
                                沙盘作品的主题可能非常单一，缺乏多样性，表现出患者对外界兴趣的减少和活动范围的缩小。沙盘中可能出现死亡、疾病、孤独等消极情景，如枯萎的植物、空荡荡的房屋、孤独的人物等，这些都是抑郁情绪的象征。沙盘中自然元素（如树木、河流、花朵）的缺失，可能表示个体与自然的联系减弱，感受不到生命的力量和支持。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-top: 1px solid #fff;"></div>
                            <div>使用封闭与孤立的元素</div>
                            <div>沙盘中的物体可能被安排在一个封闭的空间内，如围墙、围栏等，反映出患者有隔离感，不愿意与外界交流。</div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;"></div>
                            <div>空洞与缺失</div>
                            <div>
                                沙盘中可能会有意留出大片空白区域，这可能象征着患者内心深处的空虚感或缺失感。沙盘作品中可能会出现大量暗淡的颜色，如灰色、黑色，或者完全避免使用颜色，选择无色或自然色的沙具，这反映了他们内心的灰暗和缺乏活力。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;border-top: 1px solid #fff;">焦虑</div>
                            <div>主题的单一化</div>
                            <div>
                                沙盘作品的主题可能非常单一，缺乏多样性，表现出患者对外界兴趣的减少和活动范围的缩小。沙盘中可能出现死亡、疾病、孤独等消极情景，如枯萎的植物、空荡荡的房屋、孤独的人物等，这些都是抑郁情绪的象征。沙盘中自然元素（如树木、河流、花朵）的缺失，可能表示个体与自然的联系减弱，感受不到生命的力量和支持。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-top: 1px solid #fff;"></div>
                            <div>使用封闭与孤立的元素</div>
                            <div>沙盘中的物体可能被安排在一个封闭的空间内，如围墙、围栏等，反映出患者有隔离感，不愿意与外界交流。</div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;margin-bottom: -1px"></div>
                            <div>空洞与缺失</div>
                            <div>
                                沙盘中可能会有意留出大片空白区域，这可能象征着患者内心深处的空虚感或缺失感。沙盘作品中可能会出现大量暗淡的颜色，如灰色、黑色，或者完全避免使用颜色，选择无色或自然色的沙具，这反映了他们内心的灰暗和缺乏活力。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div
                                style="border-bottom: 1px solid #fff;border-top: 1px solid #fff;vertical-align: bottom;align-items: flex-end;padding-bottom: 16px;">
                                强迫</div>
                            <div>主题的单一化</div>
                            <div>
                                沙盘作品的主题可能非常单一，缺乏多样性，表现出患者对外界兴趣的减少和活动范围的缩小。沙盘中可能出现死亡、疾病、孤独等消极情景，如枯萎的植物、空荡荡的房屋、孤独的人物等，这些都是抑郁情绪的象征。沙盘中自然元素（如树木、河流、花朵）的缺失，可能表示个体与自然的联系减弱，感受不到生命的力量和支持。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;border-top: 1px solid #fff;"></div>
                            <div>使用封闭与孤立的元素</div>
                            <div>沙盘中的物体可能被安排在一个封闭的空间内，如围墙、围栏等，反映出患者有隔离感，不愿意与外界交流。</div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-top: 1px solid #fff;"></div>
                            <div>使用封闭与孤立的元素</div>
                            <div>沙盘中的物体可能被安排在一个封闭的空间内，如围墙、围栏等，反映出患者有隔离感，不愿意与外界交流。</div>
                        </li>
                        <li class="pdf-details">

                            <div style="border-bottom: 1px solid #fff;"></div>
                            <div>空洞与缺失</div>
                            <div>
                                沙盘中可能会有意留出大片空白区域，这可能象征着患者内心深处的空虚感或缺失感。沙盘作品中可能会出现大量暗淡的颜色，如灰色、黑色，或者完全避免使用颜色，选择无色或自然色的沙具，这反映了他们内心的灰暗和缺乏活力。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;border-top: 1px solid #fff;">敌对</div>
                            <div>主题的单一化</div>
                            <div>
                                沙盘作品的主题可能非常单一，缺乏多样性，表现出患者对外界兴趣的减少和活动范围的缩小。沙盘中可能出现死亡、疾病、孤独等消极情景，如枯萎的植物、空荡荡的房屋、孤独的人物等，这些都是抑郁情绪的象征。沙盘中自然元素（如树木、河流、花朵）的缺失，可能表示个体与自然的联系减弱，感受不到生命的力量和支持。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-top: 1px solid #fff;"></div>
                            <div>使用封闭与孤立的元素</div>
                            <div>沙盘中的物体可能被安排在一个封闭的空间内，如围墙、围栏等，反映出患者有隔离感，不愿意与外界交流。</div>
                        </li>
                        <li class="pdf-details noSplitBox">
                            <div style="border-bottom: 1px solid #fff;"></div>
                            <div>空洞与缺失</div>
                            <div>
                                沙盘中可能会有意留出大片空白区域，这可能象征着患者内心深处的空虚感或缺失感。沙盘作品中可能会出现大量暗淡的颜色，如灰色、黑色，或者完全避免使用颜色，选择无色或自然色的沙具，这反映了他们内心的灰暗和缺乏活力。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div
                                style="border-bottom: 1px solid #fff;border-top: 1px solid #fff;vertical-align: bottom;align-items: flex-end;padding-bottom: 16px;">
                                自我伤害</div>
                            <div>主题的单一化</div>
                            <div>
                                沙盘作品的主题可能非常单一，缺乏多样性，表现出患者对外界兴趣的减少和活动范围的缩小。沙盘中可能出现死亡、疾病、孤独等消极情景，如枯萎的植物、空荡荡的房屋、孤独的人物等，这些都是抑郁情绪的象征。沙盘中自然元素（如树木、河流、花朵）的缺失，可能表示个体与自然的联系减弱，感受不到生命的力量和支持。
                            </div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-bottom: 1px solid #fff;border-top: 1px solid #fff;"></div>
                            <div>使用封闭与孤立的元素</div>
                            <div>沙盘中的物体可能被安排在一个封闭的空间内，如围墙、围栏等，反映出患者有隔离感，不愿意与外界交流。</div>
                        </li>
                        <li class="pdf-details">
                            <div style="border-top: 1px solid #fff;"></div>
                            <div>使用封闭与孤立的元素</div>
                            <div>沙盘中的物体可能被安排在一个封闭的空间内，如围墙、围栏等，反映出患者有隔离感，不愿意与外界交流。</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 附件 -->
        <div class="group-class" style="margin: 50px auto;" v-for="(item, index) in gradeFjList" :key="index">
            <div class="group_box" :id="'overviewpage' + index">
                <div class="yy_box basic_box" style="padding: 0 70px 20px;">
                    <div class="group_style" style="height: 1680px;position: relative;">
                        <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" />
                        <div :class="'noSplitBox' + index">
                            <div class="g1_top">
                                <span>{{ schoolName }}</span>
                            </div>
                            <div class="g1_top1">
                                {{ reportName1 }}
                            </div>
                            <div class="g1_top1">
                                中小学生心理健康筛查评估
                            </div>
                            <div class="g1_top1" style="font-size: 40px;">
                                {{ item.pdfName }}
                            </div>
                            <div class="g2_top1" v-if="start != ''">
                                {{ start }} ～ {{ end }}
                            </div>
                        </div>
                    </div>
                    <div :class="'noSplitBox' + index">
                        <div class="yy_o" style="text-align: center;padding: 10px 0 10px">
                        </div>
                    </div>

                    <table cellspacing="0" style="margin-bottom: 0;">
                        <tr :class="'noSplitBox' + index" style="background: #e9e9e9">
                            <th style="width: 40px;">序号</th>
                            <th style="width: 60px;">姓名</th>
                            <th style="width: auto;">学号</th>
                            <th style="width: 40px;">性别</th>
                            <th style="width: auto;">班级</th>
                            <th style="width: 42px;">抑郁</th>
                            <th style="width: 42px;">焦虑</th>
                            <th style="width: 42px;">强迫</th>
                            <th style="width: 42px;">敌对</th>
                            <th style="width: 80px;">自我伤害</th>
                            <th style="width: 80px;">沙具总数量较少</th>
                            <th style="width: 80px;">用时较短</th>
                        </tr>
                        <tr style="border-top: 0;height: 60px;" v-if="item.reportInfoList.length == 0">
                            <td colspan="12">无</td>
                        </tr>
                        <tr v-for="(itemr, indexr) in item.reportInfoList" :key="indexr"
                            :class="'noSplitBox' + index">
                            <td>{{ indexr+1 }}</td>
                            <td>{{ itemr.name }}</td>
                            <td>{{ itemr.passport }}</td>
                            <td>{{ itemr.gender == 1 ? '男' : '女' }}</td>
                            <td>{{ itemr.departmentName }}</td>
                            <td>{{ itemr.depressionLevel == 1 ? '轻度' : itemr.depressionLevel == 2 ? '中度' : itemr.depressionLevel == 3 ? '重度' : '正常'}}</td>
                            <td>{{ itemr.anxietyLevel == 1 ? '轻度' : itemr.anxietyLevel == 2 ? '中度' : itemr.anxietyLevel == 3 ? '重度' : '正常' }}</td>
                            <td>{{ itemr.forcedLevel == 1 ? '轻度' : itemr.forcedLevel == 2 ? '中度' : itemr.forcedLevel == 3 ? '重度' : '正常' }}</td>
                            <td>{{ itemr.violenceLevel == 1 ? '轻度' : itemr.violenceLevel == 2 ? '中度' : itemr.violenceLevel == 3 ? '重度' : '正常' }}</td>
                            <td>{{ itemr.suicideLevel == 1 ? '轻度' : itemr.suicideLevel == 2 ? '中度' : itemr.suicideLevel == 3 ? '重度' : '正常' }}</td>
                            <td>{{ itemr.bodiesCount < 3? '是' : '否'}}</td>
                            <td>{{ itemr.duringTime < 300 ? '是' : '否' }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- 附件结束 -->

    </div>

</template>
<script>
import PdfLoader from "@/common/utils/groupPdfAll";
import echarts from "../../assets/js/echarts";
import { color } from "highcharts";
import Urls from "@/assets/js/url.js";
// import { version } from "videojs-flash";
import { mapMutations } from "vuex";
const Url = 'http://36.110.172.213:11004'
export default {
    data() {
        return {
            gradeFjList: [
                {
                    reportInfoList: []
                },
                {
                    reportInfoList: []
                },
                {
                    reportInfoList: []
                },
                {
                    reportInfoList: []
                }
            ],
            allTxtZs3: '',
            zsClassWd: [],
            fzsClassWd: [],
            cmCha: [0, 0, 0, 0, 0],
            schoolCM: [0, 0, 0, 0, 0],
            ChinaCM: [19.9, 29.8, 17.3, 20.2, 21.9],
            wdJcListArr: [
                {
                    name: '抑郁',
                    mildProportion: 0,
                    moderateProportion: 0,
                    severeProportion: 0,
                },
                {
                    name: '焦虑',
                    mildProportion: 0,
                    moderateProportion: 0,
                    severeProportion: 0,
                },
                {
                    name: '强迫',
                    mildProportion: 0,
                    moderateProportion: 0,
                    severeProportion: 0,
                },
                {
                    name: '敌对',
                    mildProportion: 0,
                    moderateProportion: 0,
                    severeProportion: 0,
                },
                {
                    name: '自我伤害',
                    mildProportion: 0,
                    moderateProportion: 0,
                    severeProportion: 0,
                },
            ],
            detail: {
                yyQg: 19.9,
                jlQg: 29.8,
                qpQg: 17.3,
                ddQg: 20.2,
                zwshQg: 21.9,
                wdJcList: [],
                wdLevelTxt: 0,
                gradeTxt1: '',
                gradeTxt2: '',
                gradeTxt3: '',
                gradeTxt4: '',
                wdpStr: '',
                jcTxt: '',
                cmTxt: '',
                genderTxt5: '',
                genderTxt51: '',
                genderTxt52: '',
                manOrgs: [],
                womanOrgs: [],
                zsFlag: false,
                txtStr: '',
                txtStr52: '',
                txtStr51: '',
                gradeListOrg: [],
                gradeTxtOrg: '',
                schoolList: [],
                gradeList: [],
                totalClasses: '',
                gradeNumTxt: '',
                gradeNumTxt1: '',
                gradeNumTxt2: '',
                totalStudents: '',
                maleStudents: '',
                femaleStudents: '',
                maleStudentsPre: '',
                femaleStudentsPre: '',
            },
            schoolName: '',
            reportName1: '',
            reportFlag1: false,
            start: '',
            end: '',
            pTimeFlag1: false,
            dialogPartFrame1: false,
            part1: false,
            part2: false,
            part3: false,
            part4: false,
            part5: false,
            part6: false,
            part7: false,
            part8: false,
            part9: false,
            partAll: 0,
            partNum: 0,
            
            anliList0: [
                {
                    id: '',
                    ids: '',
                    name: '',
                    bireView: '',
                    txt1: '',
                    list: [
                        {
                            title: '',
                            txt: ''
                        }
                    ],
                    txt2: ''
                }
            ],
            anliList1: [
                {
                    id: '',
                    ids: '',
                    name: '',
                    bireView: '',
                    txt1: '',
                    list: [
                        {
                            title: '',
                            txt: ''
                        }
                    ],
                    txt2: ''
                }
            ],
            anliList2: [
                {
                    id: '',
                    ids: '',
                    name: '',
                    bireView: '',
                    txt1: '',
                    list: [
                        {
                            title: '',
                            txt: ''
                        }
                    ],
                    txt2: ''
                }
            ],
            anliList3: [
                {
                    id: '',
                    ids: '',
                    name: '',
                    bireView: '',
                    txt1: '',
                    list: [
                        {
                            title: '',
                            txt: ''
                        }
                    ],
                    txt2: ''
                }
            ],
            anliList4: [
                {
                    id: '',
                    ids: '',
                    name: '',
                    bireView: '',
                    txt1: '',
                    list: [
                        {
                            title: '',
                            txt: ''
                        }
                    ],
                    txt2: ''
                }
            ],
            anliList5: [
                {
                    id: '',
                    ids: '',
                    name: '',
                    bireView: '',
                    txt1: '',
                    list: [
                        {
                            title: '',
                            txt: ''
                        }
                    ],
                    txt2: ''
                }
            ],


            partList: {},
            partsForm1: {
                time: ''
            },
            
            muluList: [
                {
                    id: 1,
                    ids: '1',
                    name: '引言',
                    page: '',
                    mark: 1,
                    list: [
                        {
                            id: 1,
                            name: '测评目的',
                            page: '',
                            mark: 2
                        },
                        {
                            id: 2,
                            name: '测评工具',
                            page: '',
                            mark: 2
                        },
                        {
                            id: 3,
                            name: '相关结论',
                            page: '',
                            mark: 2
                        }
                    ]

                },
                {
                    id: 2,
                    name: '测评基本信息',
                    page: '',
                    mark: 1,
                    list: [
                        {
                            id: 1,
                            name: '筛查评估样本与内容',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '筛查评估对象和样本',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '筛查评估指标和内容',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '心理健康风险水平',
                                            page: '',
                                            mark: 4,
                                        },
                                        {
                                            id: 2,
                                            name: '心理健康问题',
                                            page: '',
                                            mark: 4,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    name: '测评结果',
                    page: '',
                    mark: 1,
                    list: [
                        {
                            id: 1,
                            name: '总体测评结果',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '各维度检出率',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '不同性别各维度检出率',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 3,
                                    name: '各个学段各维度检出率',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: '小学一年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '小学一年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '小学一年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '小学一年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '小学一年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 3,
                            name: '小学二年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '小学二年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '小学二年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '小学二年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '小学二年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 4,
                            name: '小学三年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '小学三年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '小学三年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '小学三年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '小学三年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 5,
                            name: '小学四年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '小学四年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '小学四年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '小学四年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '小学四年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 6,
                            name: '小学五年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '小学五年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '小学五年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '小学五年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '小学五年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 7,
                            name: '小学六年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '小学六年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '小学六年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '小学六年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '小学六年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 8,
                            name: '高中一年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '高中一年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '高中一年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '高中一年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '高中一年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 9,
                            name: '高中二年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '高中二年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '高中二年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '高中二年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '高中二年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 10,
                            name: '高中三年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '高中三年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '高中三年级各维度检出率情况',
                                    page: '',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '高中三年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '高中三年级重点关注人员名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '',
                    name: '附录：各维度沙盘表现特征',
                    page: '',
                    mark: 1,
                    list: [

                    ]
                }
            ],
            oneData2: [
                {
                    name: '正常',
                    content: '学生没有明显的心理健康问题，能够正常应对日常生活的压力，情绪稳定，行为规范，与人际关系融洽。'
                },
                {
                    name: '轻度问题',
                    content: '学生近期可能遇到情绪波动，可能表现出一些轻微的心理健康问题，情绪或行为偶尔出现异常，但基本不影响日常生活和学习。'
                },
                {
                    name: '中度问题',
                    content: '学生可能出现较为明显的心理健康问题，情绪不稳定或行为异常，对其生活、学习或人际关系造成了明显影响。'
                },
                {
                    name: '重度问题',
                    content: '学生的心理健康问题非常严重，严重影响其日常生活、学习和人际关系，甚至可能存在危险行为，需要重点关注和紧急干预。'
                }
            ],
            oneData3: [
                {
                    name: '抑郁',
                    content: '学生持续出现情绪低落，表现为对日常活动失去兴趣和愉悦感，伴随疲劳感、无价值感和无助感。'
                },
                {
                    name: '焦虑',
                    content: '学生在日常生活中持续的过度担忧和紧张，容易出现心跳加快、出汗、胃部不适等生理现象。'
                },
                {
                    name: '强迫',
                    content: '学生出现难以控制的强迫性思维和行为，表现为反复担心某些特定问题（如健康、清洁或秩序），并通过重复的仪式化行为（如反复检查、洗手）试图减轻内心焦虑。'
                },
                {
                    name: '敌对',
                    content: '学生持续表现出对他人或环境的敌意，表现为易怒、对人际关系充满敌对和攻击性，常伴随冲动的言语或行为攻击。'
                },
                {
                    name: '自我伤害',
                    content: '学生通过故意伤害自己的方式应对内心的情绪痛苦，表现为用物理手段（如割伤、打击、烧伤自己）来减轻心理上的痛苦或麻木感，通常伴随着深刻的无助感和情绪困扰，学生难以通过其他健康的方式释放情绪压力。'
                }
            ],
            // 正常样例
            expList1: [
                {
                    id: 1,
                    ids: '',
                    name: '正常',
                    bireView: '',
                    txt1: '沙盘的中间是一条河流和一座桥，左侧布置了山和房屋，右侧则是一些植物和人。整个沙盘中还在下雨。这种配置表明来访者创造了一个既有自然元素（雨、河流、山、植物），又有生活设施（房屋）和人际互动（人）的场景。',
                    list: [
                        {
                            title: '下雨',
                            txt: '下雨作为一种自然现象，象征情感的流动和净化。它可能反映出来访者当前经历的情感波动或内心的净化过程。下雨也可能表示来访者正在经历某种情感上的释放或洗礼。'
                        },
                        {
                            title: '河流',
                            txt: '河流作为中心元素，象征情感流动和生命的延续。河流将左侧的山和房屋与右侧的植物和人分隔开来，但桥的存在又将它们连接起来。这表明来访者在生活中经历某种情感上的变化或过渡，并希望通过沟通和连接找到平衡。'
                        },
                        {
                            title: '桥',
                            txt: '桥横跨河流，象征连接和沟通。桥的存在显示出来访者希望在不同的生活领域之间建立联系，可能是家庭与自然、过去与未来之间的桥梁。桥也反映了来访者对沟通和理解的渴望。'
                        },
                        {
                            title: '房屋',
                            txt: '房屋位于左侧，象征家庭、安全感和稳定的生活。房屋的存在表明来访者对家庭生活的重视和对内心安定的需求。房屋也可能代表来访者的内心家园，即他们感到最安全和舒适的地方。'
                        },
                        {
                            title: '植物',
                            txt: '植物位于右侧，象征自然、生长和生命力。植物的存在反映了来访者对自然界的亲近感和对生命成长的关注。植物也可能代表新的开始、希望和未来的可能性。'
                        },
                        {
                            title: '人',
                            txt: '人位于右侧，象征社会互动、人际关系和支持。人的存在显示出来访者重视与他人的联系和互动，可能反映了他们在生活中寻求支持和理解的愿望。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者当前处于一种既重视家庭和安全感，又关注自然和人际关系的状态。下雨和河流的存在进一步强化了情感流动和变化的主题，显示出来访者对内在情感世界的重视。桥的存在表明来访者希望在不同的生活领域之间建立联系和沟通，反映出他们对和谐与平衡的追求。整体来看，来访者可能在努力平衡家庭、自然和社会互动的不同需求，寻求内心的和谐与满足。'
                },
                {
                    id: 2,
                    name: '正常',
                    bireView: '',
                    txt1: '沙盘的左侧布置了房屋，象征稳定和家庭生活。中间是一条河流，河上有桥，连接两岸。河对岸则是树木，象征自然和生长。这种配置表明来访者在沙盘中创造了一个从家庭到自然的过渡场景。',
                    list: [
                        {
                            title: '房屋',
                            txt: '房屋位于左侧，象征家庭和安全感。这可能反映出来访者对家庭生活的重视和对稳定环境的需求。房屋也可能代表来访者的内心家园，即他们感到最安全和舒适的地方。'
                        },
                        {
                            title: '河流',
                            txt: '河流作为中心元素，象征情感流动和生命的延续。它将左侧的房屋与右侧的树木分隔开来，但同时也提供了连接的可能性。河流的存在可能表明来访者在生活中经历某种情感上的变化或过渡。'
                        },
                        {
                            title: '桥',
                            txt: '桥横跨河流，象征连接和沟通。桥的存在显示出来访者希望在不同的生活领域之间建立联系，可能是家庭与自然、过去与未来之间的桥梁。桥也反映了来访者对沟通和理解的渴望。'
                        },
                        {
                            title: '树木',
                            txt: '树木位于河对岸，象征自然、生长和生命力。树木的存在反映了来访者对自然界的亲近感和对生命成长的关注。树木也可能代表新的开始、希望和未来的可能性。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者当前处于一种寻求平衡和过渡的状态。他们重视家庭和安全感，同时对自然和生命的成长也有强烈的关注。河流和桥的存在表明来访者希望在不同的生活领域之间建立联系和沟通，反映出他们对和谐与平衡的追求。'
                }
            ],
            // 抑郁样例
            expListYy: [
                {
                    id: 1,
                    name: '轻度',
                    bireView: '',
                    txt1: '沙盘的四周布置了各种家具，而中间区域是空的。这种配置表明来访者创造了一个以家庭和日常生活为中心的场景，但中心区域留白，显示出某种空白或未填充的空间。',
                    list: [
                        {
                            title: '家具',
                            txt: '家具位于沙盘的四周，象征家庭、日常生活和安全感。这些家具的存在表明来访者对家庭环境和日常生活的重视，可能反映了他们对稳定和舒适的需求。家具的具体种类（如椅子、桌子、床等）也可能进一步揭示来访者对不同生活方面的关注。'
                        },
                        {
                            title: '空的中间区域',
                            txt: '沙盘的中间区域是空的，象征内心的空白、未解决的问题或潜在的空间。这种留白可能反映出来访者内心中的某种缺失或需要填补的部分。这可能是情感上的空白、未解决的心理问题，或者是对未来方向的不确定感。空的中间区域也可能表示来访者正在经历某种转变或探索阶段，尚未找到明确的答案或方向。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者当前处于一种既重视家庭和日常生活，又感到内心有某种空白或未解决的问题的状态。家具的存在显示出来访者对家庭环境和日常生活的依赖和重视，而空的中间区域则反映了他们内心的某种缺失或不确定性。整体来看，来访者可能在寻求内心的平衡和完整，希望填补这一空白并找到更多的内在满足感。'
                },
                {
                    id: 2,
                    name: '重度',
                    bireView: '',
                    txt1: '沙盘被河流分割成几块陆地，每块陆地上都布置了高山。这种配置表明来访者创造了一个由自然元素（河流和高山）构成的场景，每块陆地都被高山占据，而河流作为分隔线将这些陆地分开。',
                    list: [
                        {
                            title: '河流',
                            txt: '河流作为主要的分隔元素，象征界限、隔离和过渡。河流的存在表明来访者可能感到自己被某种无形的力量所隔离，难以与外界建立联系。这种隔离感可能导致她感到孤独和无助，进一步加剧了她的抑郁情绪。'
                        },
                        {
                            title: '高山和防御的围墙',
                            txt: '每块陆地上都有高山，象征保护、挑战和稳定。高山的存在可能反映出来访者在某些方面感到需要隔离或保护自己，同时也可能代表他们面临的挑战或障碍。高山也可能表示来访者内心深处的某些未解决的问题或困境。高山的分布表明来访者在不同的生活领域中都感受到了类似的挑战或需要保护的情感需求。'
                        },
                        {
                            title: '枯树和死去的人',
                            txt: '枯树和死去的人是典型的负面象征，代表死亡、衰败和绝望。这些元素的出现强烈暗示了来访者内心的消极情绪和对未来的悲观态度。枯树和死去的人的配置表明来访者可能感到自己的生命力正在逐渐消逝，对未来失去了希望。这种强烈的消极情绪和绝望感是抑郁的重要标志之一。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者当前处于一种高度警觉和防御的状态。他们可能感到生活中存在多方面的挑战或障碍，需要在不同的领域进行自我保护。枯树和死去的人的出现强烈暗示了来访者内心的消极情绪和对未来的悲观态度。'
                }
            ],
            // 焦虑样例
            expListJl: [
                {
                    id: 1,
                    name: '轻度',
                    bireView: '',
                    txt1: '沙盘的四周被高山环绕，中间是一个湖泊，湖泊周围布置了各种动物和一些军事设施。这种配置表明来访者创造了一个封闭且中心化的环境，高山作为边界，湖泊作为核心，动物和军事设施围绕在湖泊周围。',
                    list: [
                        {
                            title: '高山',
                            txt: '高山作为四周的边界，象征着保护和隔离。这种配置可能反映出来访者希望在自己的生活中建立一种安全感，避免外界的干扰或威胁。高山也可能表示来访者在某些方面感到孤立或需要独处。'
                        },
                        {
                            title: '湖泊',
                            txt: '湖泊位于沙盘的中心，象征着情感、内心世界和平静。它可能是来访者内心深处的情感或潜意识的体现，反映了对内心平静和情感稳定的追求。'
                        },
                        {
                            title: '动物',
                            txt: '各种动物围绕在湖泊周围，象征自然、生命力和多样性。这些动物可能代表来访者生活中的不同角色或关系，显示出他们对生活的多样性和丰富性的认可。动物的存在也可能反映出来访者对自然界的亲近感。'
                        },
                        {
                            title: '军事设施',
                            txt: '军事设施分布在湖泊周围，象征防御和安全。这些设施的存在显示出来访者对外界威胁的高度警惕，并准备采取措施进行自我保护。这可能表明来访者在生活中面临一些实际或心理上的挑战，需要保持高度的警觉和防御。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者当前处于一种既寻求内心平静和情感稳定，又对外界保持高度警觉的状态。高山和湖泊的组合反映出一种封闭但和谐的内心世界，而动物和军事设施则展示了来访者对生活多样性和安全需求的关注。'
                },
                {
                    id: 2,
                    name: '重度',
                    bireView: '',
                    txt1: '在沙盘中，左侧放置了一些残缺的肢体和眼球，中部有一个骷髅、大脑和心脏，周围是一些山围成的湖，右侧则是骷髅和修女。这种配置表明来访者可能在表达一种从创伤到内心深处再到某种精神或宗教层面的转变。',
                    list: [
                        {
                            title: '残缺的肢体和眼球',
                            txt: '这些沙具直接传达出来访者的身体和心理创伤，可能代表他对过去经历的深刻反思与痛苦。他感到自己在某种程度上是不完整的，无法完全面对自己的情绪和经历，这暗示了他对自我认同的困惑。'
                        },
                        {
                            title: '骷髅',
                            txt: '作为死亡的象征，骷髅反映出来访者对于生命脆弱性的深刻感受。他可能正面临对死亡的恐惧和存在的思考，显示出他内心的恐慌与不安，进一步加重了他的焦虑状态。'
                        },
                        {
                            title: '大脑和心脏',
                            txt: '大脑象征理智与思维，而心脏则代表情感与直觉。这两者的结合显示出他在努力平衡理性与情感的冲突，表明他在面临深重的焦虑时，内心的挣扎与困扰。'
                        },
                        {
                            title: '山围成的湖',
                            txt: '湖的平静与山的稳固象征着来访者渴望在内心动荡中寻找宁静，然而，这种希望与实际的焦虑感之间的矛盾，显示出他内心深处的挣扎与无力感。'
                        },
                        {
                            title: '右侧的骷髅和修女',
                            txt: '骷髅再次出现，强化了死亡主题，而修女则象征精神或宗教的慰藉。这种组合表明来访者在寻求超越物质世界的安慰，同时也反映出他内心对灵性支持的渴求，以应对深层的焦虑与孤独感。'
                        }
                    ],
                    txt2: '通过对沙盘配置和关键沙具的分析，可以看出，来访者正在经历深刻的创伤和内心冲突。他对生命的脆弱性、对死亡的恐惧，以及对自我认同的困惑，构成了他焦虑状态的根源。他在试图通过内在探索和寻求精神支持来实现平衡与治愈，但目前的表现显示出他在这一过程中面临巨大的压力和挑战。此案例的复杂性和深度，表明来访者需要专业的心理支持和指导，以帮助他逐步解开这些深层次的情感和心理困扰。'
                }
            ],
            // 强迫样例
            expListQp: [
                {
                    id: 1,
                    name: '轻度',
                    bireView: '',
                    txt1: '沙盘中央的河流将教堂和寺庙分隔在左右两侧，显示出一种有意识的分割，象征了来访者在不同精神信仰或文化间的内心划分。这种分隔并非极端的隔绝，而是通过桥梁保持了一种连接的可能性，说明来访者在追求分隔的同时，也希望不同的内心需求能够沟通和协同。这种安排显示出其对秩序的需求 ，但没有达到极端的程度，仅是象征性的分隔，符合轻度强迫表现。',
                    list: [
                        {
                            title: '下雨',
                            txt: '下雨作为一种自然现象，象征情感的流动和净化。它可能反映出来访者当前经历的情感波动或内心的净化过程。下雨也可能表示来访者正在经历某种情感上的释放或洗礼。'
                        },
                        {
                            title: '河流',
                            txt: '河流作为中心元素，象征情感流动和生命的延续。它将左侧的教堂与右侧的寺庙分隔开来，但同时也提供了连接的可能性。河流的存在表明来访者在生活中经历某种情感上的变化或过渡。'
                        },
                        {
                            title: '桥',
                            txt: '桥横跨河流，象征连接和沟通。桥的存在显示出来访者希望在不同的生活领域之间建立联系，可能是不同文化、信仰或精神追求之间的桥梁。桥也反映了来访者对沟通和理解的渴望。'
                        },
                        {
                            title: '象征物的重复和排列',
                            txt: '在寺庙周围安排的整齐坟墓，表明来访者对事物的排列和秩序的需求。整齐的坟墓显示出轻微的强迫性控制，尤其是对死亡或失去等象征物的“管理”。'
                        },
                        {
                            title: '教堂和对称的柱子与土著人',
                            txt: '对称的柱子通常象征稳定性、规则和支持，特别是在教堂这样具有精神象征的建筑附近，暗示来访者可能对其精神信仰或价值体系有一种固定且需要控制的心态。土著人可能象征原始或本能的部分，作为精神象征周围的一部分，反映了来访者对自己不同文化或信仰的认同和接纳。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者表现出对秩序、对称和分隔的轻度强迫需求，这种需求在精神象征的布置上尤为明显，表明来访者希望通过结构化管理来寻求内心的平衡与和谐。这种强迫需求虽不极端，但在情感控制、信仰秩序和象征性排列上仍有所体现。整体来看，来访者的强迫需求维持在轻度范围，属于强迫-轻度的状态。'
                },
                {
                    id: 2,
                    name: '重度',
                    bireView: '',
                    txt1: '沙盘左下角的高山和西游记的师徒四人，以及左上角和右下角分别放置的佛祖和菩萨，显示出一种控制和特定的象征组合。这些象征物并未随意分布，而是被安排在特定角落并以特定关系呈现，反映出一种强迫性的象征排列。',
                    list: [
                        {
                            title: '重复象征物的执着',
                            txt: '多个仙人掌、枯树、柳树的出现，表明来访者在对特定象征物上有一种执着的重复 ，即通过反复摆放来强化某种心理需求或情绪。这些象征物通常代表荒凉、枯萎或生机的缺失，可能反映了来访者对某些内心困境或痛苦的持续关注。这种固着性思维与强迫密切相关，显示出一种无法放下的情绪负担或内在困境。'
                        },
                        {
                            title: '精神象征的层次分布',
                            txt: '佛祖和菩萨分别位于沙盘的对角位置，象征着来访者对更高层次精神支持的极端依赖。将这两位精神象征置于沙盘的“守护”位置，表明来访者渴望通过精神信仰来构建自我保护的屏障，并对这种屏障的存在极度执着。这种分布反映了来访者对精神世界的结构化依赖 ，难以容忍精神象征的位置变动或失去。'
                        },
                        {
                            title: '情感流动的受限',
                            txt: '虽然沙盘中存在河流和桥梁，象征着情感流动和过渡，但河流位于右上角，显得相对孤立，表明来访者的情感表达可能受到某种内在限制。桥梁的存在并未连接核心象征物，暗示情感的流动性在来访者内心中被有意识地隔离开来。这种情感的“分区”进一步说明了来访者的情感控制需求，不允许情感流动对其内在精神秩序产生干扰，符合强迫的表现。'
                        }
                    ],
                    txt2: '基于沙盘中大量重复出现的仙人掌、枯树、柳树、和尚和寺庙，这种象征物的重复进一步强化了强迫的评估。来访者通过重复布置特定象征物来满足内在安全感、稳定感和秩序的需求，同时表现出对情感控制和精神支持的极端依赖。'
                }
            ],
            // 敌对样例
            expListDd: [
                {
                    id: 1,
                    name: '轻度',
                    bireView: '',
                    txt1: '沙盘的左侧放置了水和船只，这可能象征着情感、流动性和探索未知的旅程。中部布置了坦克和士兵，显示出一种冲突或战斗的状态。右侧则是堡垒和士兵，代表防御和安全。',
                    list: [
                        {
                            title: '左侧的水和船只',
                            txt: '水通常象征情感和潜意识，而船代表着探索与过渡。这个配置可能表明来访者在情感上经历变化或在寻找新的方向，显示出他对内心世界的关注和探索的渴望。'
                        },
                        {
                            title: '中部的坦克和士兵',
                            txt: '坦克和士兵位于沙盘中心，象征着冲突与对抗。这一配置反映出来访者当前面临的挑战和内心的斗争，显示出他在生活中感受到的一定程度的敌意或压力。'
                        },
                        {
                            title: '右侧的堡垒和士兵',
                            txt: '堡垒象征防御和安全，士兵则代表秩序与保护。这一部分显示出来访者对安全感和稳定的强烈需求，表明他希望在面对外部冲突时，能够有一个坚固的后盾。'
                        },
                        {
                            title: '军事元素的含义',
                            txt: '坦克和士兵的存在反映了来访者对冲突和对抗的直接感受，虽然这些元素表明了敌对的情绪，但由于与探索和安全的元素并存，显示出他并未完全陷入敌对状态，而是处于一种轻度的冲突感中。'
                        }
                    ],
                    txt2: '整体来看，来访者的沙盘作品表现出一种探索与希望并存的状态，虽然存在一定的敌对情绪，但整体情感上仍有对安全与稳定的渴望。他在敌对维度上处于轻度水平，表明他在面对挑战时能够认识到内心的冲突，并且在积极寻求解决方案。这种状态显示出他在处理敌对情绪时，具备一定的自我意识和调节能力。'
                },
                {
                    id: 2,
                    name: '重度',
                    bireView: '',
                    txt1: '沙盘中的河流将空间划分成多个陆地，象征着分离和界限。这种分割不仅表明了来访者在生活中感受到的隔阂或障碍，还暗示了他对不同情境或人际关系的警惕与防备。每块陆地上都布置了士兵和军事设施，这表明来访者在不同领域都感受到威胁与压力。他的沙盘配置显示出他对保护和防御的强烈需求，反映了他内心深处的焦虑和紧张。',
                    list: [
                        {
                            title: '士兵',
                            txt: '士兵分布在各个陆地上，象征着保护、防御和秩序。他们的存在表明来访者感受到某种威胁或需要应对的问题，并且时刻准备采取行动来保护自己，可能是因为面临实际或心理上的威胁。'
                        },
                        {
                            title: '军事设施',
                            txt: '军事设施（如堡垒、炮台等）进一步强化了防御和安全的主题。这些设施的存在显示出来访者对安全的高度关注和对外界潜在威胁的警惕。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者当前处于一种高度警觉和防御的状态。他可能感到生活中存在多方面的威胁或挑战，需要在不同的领域进行保护和防御。同时，河流的存在也暗示了某种情感上的流动和变化，表明来访者可能正在经历一些内在的调整和过渡。'
                }
            ],
            // 自我伤害样例
            expListZwsh: [
                {
                    id: 1,
                    name: '轻度',
                    bireView: '',
                    txt1: '沙盘中零星分布着一些人，这些人姿态各异，分布在不同的位置。这种配置表明来访者创造了一个以人际关系和社会互动为中心的场景，每个人物的姿态和位置都有其特定的意义。',
                    list: [
                        {
                            title: '零星分布的人物与人际关系的重视',
                            txt: '沙盘中零星分布着姿态各异的人物，表明来访者对人际关系和社会互动的高度关注。虽然这些人物的分布没有表现出极端的孤立或破碎感，但通过姿态的差异和分布的特点，显示出他们在人际关系中感受到的某种不安或复杂情绪。来访者似乎正在努力理解与他人的关系，或寻求在关系中的自我定位，这种状态符合轻度的自我伤害倾向，即对关系的不安全感可能导致轻微的情感受挫。'
                        },
                        {
                            title: '残缺的肢体象征创伤或不完整感',
                            txt: '沙盘中出现的残缺肢体，明显象征了来访者对自身不完整或受伤的感受。残缺的身体部位通常暗示心理或情感上的创伤，这种表现显示来访者在过去的经历中可能受到了伤害或遭遇过不愉快的情绪。这些象征虽然没有显示出强烈的自我攻击性，但仍反映出轻度的自我伤害倾向，暗示来访者对自身存在部分的不满或消极情绪。'
                        },
                        {
                            title: '姿态各异的人物与多样情绪',
                            txt: '沙盘中人物的不同姿态——例如站立、坐着、弯腰低头、手牵手等——表明来访者在不同人际情境中的多种情绪反应。这种多样化的姿态不仅反映了来访者对自身的反思，还揭示了他们在不同人际关系中的不确定感。尤其是弯腰或低头的姿态，可能象征来访者的内心疲惫或对某些关系的失望。虽然这些情绪表现没有极端化，但已显露出一定的自我伤害倾向，表现为在关系中受到挫折后的自我否定或失望。'
                        }
                    ],
                    txt2: '总体来看，该案例中的来访者在沙盘中表现出轻度的自我伤害倾向，主要体现在残缺的肢体和姿态各异的人物上。这些象征反映了来访者内心的不完整感、创伤经历以及在关系中的不确定性。同时，他们的沙盘布局仍然表达出对人际关系的重视和对自我的探索。这种对社会互动的关注和轻度的情绪挫折符合自我伤害的轻度范围。'
                },
                {
                    id: 2,
                    name: '中度',
                    bireView: '',
                    txt1: '沙盘的四角分别放置了头骨、大脑和心脏，中央则是一个骷髅。这种配置表明来访者创造了一个以象征死亡和生命核心元素为中心的场景，每个角落的元素都具有重要的象征意义。',
                    list: [
                        {
                            title: '头骨',
                            txt: '头骨位于沙盘的四角之一，象征死亡、终结和生命的脆弱性。头骨的存在可能反映出来访者对生命有限性的思考，或者他们在面对某种终结或变化时的感受。头骨也可能表示来访者对过去的回忆或对未来的担忧。'
                        },
                        {
                            title: '大脑',
                            txt: '大脑位于沙盘的另一角，象征智慧、思维和理性。大脑的存在表明来访者重视智力和思考能力，可能反映了他们对解决问题、理解事物和自我反思的需求。大脑也可能代表来访者对知识和学习的追求。'
                        },
                        {
                            title: '心脏',
                            txt: '心脏位于沙盘的另一角，象征情感、爱和生命力。心脏的存在显示出来访者对情感和内在感受的关注，可能反映了他们对人际关系、爱和情感支持的需求。心脏也可能表示来访者对内心情感世界的重视。'
                        },
                        {
                            title: '骷髅',
                            txt: '骷髅位于沙盘的中央，象征死亡、空虚和生命的本质。骷髅的存在可能反映出来访者对生命和死亡的深刻思考，以及对内心深处某些未解决的问题或恐惧的关注。骷髅也可能表示来访者在面对某种内心的空虚或迷茫时的状态。'
                        }
                    ],
                    txt2: '通过这些沙具的配置和选择，可以看出来访者当前处于一种深刻思考生命和死亡的状态。头骨、大脑和心脏分别代表了生命的脆弱性、智慧和情感，而中央的骷髅则进一步强调了对生命本质的探索和对死亡的思考。整体来看，来访者可能在经历某种内心的转变或反思，试图理解和平衡理性和情感，同时面对生命的有限性和深层次的恐惧。这种配置也反映了来访者对内心深处某些未解决的问题或恐惧的关注，可能需要更多的心理支持和探索。'
                }
            ],
            gradeAllList: [
                
                {
                    name: '预备年级',
                    wdList: [
                        {
                            name: '抑郁'
                        }, {
                            name: '焦虑'
                        }, {
                            name: '强迫'
                        }, {
                            name: '敌对'
                        }, {
                            name: '自我伤害'
                        }
                    ],
                    csList: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ],
                    csListz: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ]
                },
                {
                    name: '预备年级',
                    wdList: [
                        {
                            name: '抑郁'
                        }, {
                            name: '焦虑'
                        }, {
                            name: '强迫'
                        }, {
                            name: '敌对'
                        }, {
                            name: '自我伤害'
                        }
                    ],
                    csList: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ],
                    csListz: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ]
                },
                {
                    name: '预备年级',
                    wdList: [
                        {
                            name: '抑郁'
                        }, {
                            name: '焦虑'
                        }, {
                            name: '强迫'
                        }, {
                            name: '敌对'
                        }, {
                            name: '自我伤害'
                        }
                    ],
                    csList: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ],
                    csListz: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ]
                },
                {
                    name: '高中一年级',
                    wdList: [
                        {
                            name: '抑郁'
                        }, {
                            name: '焦虑'
                        }, {
                            name: '强迫'
                        }, {
                            name: '敌对'
                        }, {
                            name: '自我伤害'
                        }
                    ],
                    csList: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ],
                    csListz: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ]
                },
                {
                    name: '高中一年级',
                    wdList: [
                        {
                            name: '抑郁'
                        }, {
                            name: '焦虑'
                        }, {
                            name: '强迫'
                        }, {
                            name: '敌对'
                        }, {
                            name: '自我伤害'
                        }
                    ],
                    csList: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ],
                    csListz: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ]
                },
                {
                    name: '高中一年级',
                    wdList: [
                        {
                            name: '抑郁'
                        }, {
                            name: '焦虑'
                        }, {
                            name: '强迫'
                        }, {
                            name: '敌对'
                        }, {
                            name: '自我伤害'
                        }
                    ],
                    csList: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ],
                    csListz: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ]
                },
                {
                    name: '高中一年级',
                    wdList: [
                        {
                            name: '抑郁'
                        }, {
                            name: '焦虑'
                        }, {
                            name: '强迫'
                        }, {
                            name: '敌对'
                        }, {
                            name: '自我伤害'
                        }
                    ],
                    csList: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ],
                    csListz: [
                        {
                            name: "1班"
                        }, {
                            name: "2班"
                        }, {
                            name: "3班"
                        }, {
                            name: "4班"
                        }
                    ]
                }
            ],
            myChart1: '',
            myChart2: '',
            myChart3: '',
            myChart4: '',
            myChart5: ''

        };
    },
    props: {
        sList: {
            type: Object,
            default: () => {}
        }
    },
    beforeDestroy() {
        this.loading.close();
        this.setSchoolFlag(false);
    },
    mounted() {
        window.addEventListener("resize", () => {
            setTimeout(() => {
                this.myChart1.resize();
                this.myChart2.resize();
                this.myChart3.resize();
                this.myChart4.resize();
                this.myChart5.resize();
            }, 100);
        });
    },
    computed: {
        schoolPdfs1() {
            return this.$store.state.schoolFlag;
        },
        bindmodel() {
            const { part1, part2, part3, part4, part5, part6, part7, part8, part9, partNum} = this;
            return {
                part1,
                part2,
                part3,
                part4,
                part5,
                part6,
                part7,
                part8,
                part9,
                partNum
            };
        }
    },
    watch: {
        schoolPdfs1: function(newVal, oldVal) {
            if (newVal) {
                // 开始调接口，接口完事后，调用这个方法进行下载
                this.loading = this.$loading({
                    lock: true,
                    text: "报告生成中",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                
                // 获取该学校的所有年级列表
                let param7 = {
                    startDate: this.sList.startDate,
                    endDate: this.sList.endDate,
                    id: this.sList.schoolId
                };
                this.$http
                    .post(Url + "/aimw/export/gradeDimensionProportion", param7)
                    .then(res => {
                        let data = res.data.data;
                        if (res.data.code == 0) {
                            if (data.length == 0) {
                                this.$message({
                                    type: "warning",
                                    message: "未检测到测评数据，请确保参与测评的人员完成测评后再导出!"
                                });
                                this.loading.close()
                                this.setSchoolFlag(false)
                                return false
                            }
                            let muluArr = []
                            this.muluList = [
                                {
                                    id: 1,
                                    ids: '1',
                                    name: '引言',
                                    page: '',
                                    mark: 1,
                                    list: [
                                        {
                                            id: 1,
                                            name: '测评目的',
                                            page: '',
                                            mark: 2
                                        },
                                        {
                                            id: 2,
                                            name: '测评工具',
                                            page: '',
                                            mark: 2
                                        },
                                        {
                                            id: 3,
                                            name: '相关结论',
                                            page: '',
                                            mark: 2
                                        }
                                    ]

                                },
                                {
                                    id: 2,
                                    name: '测评基本信息',
                                    page: '',
                                    mark: 1,
                                    list: [
                                        {
                                            id: 1,
                                            name: '筛查评估样本与内容',
                                            page: '',
                                            mark: 2,
                                            list: [
                                                {
                                                    id: 1,
                                                    name: '筛查评估对象和样本',
                                                    page: '',
                                                    mark: 3
                                                },
                                                {
                                                    id: 2,
                                                    name: '筛查评估指标和内容',
                                                    page: '',
                                                    mark: 3,
                                                    list: [
                                                        {
                                                            id: 1,
                                                            name: '心理健康风险水平',
                                                            page: '',
                                                            mark: 4,
                                                        },
                                                        {
                                                            id: 2,
                                                            name: '心理健康问题',
                                                            page: '',
                                                            mark: 4,
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '测评结果',
                                    page: '',
                                    mark: 1,
                                    list: [
                                        {
                                            id: 1,
                                            name: '总体测评结果',
                                            page: '',
                                            mark: 2,
                                            list: [
                                                {
                                                    id: 1,
                                                    name: '各维度检出率',
                                                    page: '',
                                                    mark: 3
                                                },
                                                {
                                                    id: 2,
                                                    name: '不同性别各维度检出率',
                                                    page: '',
                                                    mark: 3
                                                },
                                                {
                                                    id: 3,
                                                    name: '各个学段各维度检出率',
                                                    page: '',
                                                    mark: 3
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: '',
                                    name: '附录：各维度沙盘表现特征',
                                    page: '',
                                    mark: 1,
                                    list: [

                                    ]
                                }
                            ]
                            this.muluList[2].list = []
                            this.muluList[2].list.push({
                                id: 1,
                                name: '总体测评结果',
                                page: '',
                                mark: 2,
                                list: [
                                    {
                                        id: 1,
                                        name: '各维度检出率',
                                        page: '',
                                        mark: 3
                                    },
                                    {
                                        id: 2,
                                        name: '不同性别各维度检出率',
                                        page: '',
                                        mark: 3
                                    },
                                    {
                                        id: 3,
                                        name: '各个学段各维度检出率',
                                        page: '',
                                        mark: 3
                                    }
                                ]
                            })
                            for (let i in data) {
                                let gArr = {
                                    id: Number(i) + 2,
                                    name: data[i].departmentName + '年级测评分析',
                                    page: '',
                                    mark: 2,
                                    list: [
                                        {
                                            id: 1,
                                            name: data[i].departmentName + '年级测评结果概况',
                                            page: '',
                                            mark: 3
                                        },
                                        {
                                            id: 2,
                                            name: data[i].departmentName + '年级各维度检出率情况',
                                            page: '',
                                            mark: 3,
                                            list: [
                                                {
                                                    id: 1,
                                                    name: '抑郁维度',
                                                    page: '',
                                                    mark: 4
                                                },
                                                {
                                                    id: 2,
                                                    name: '焦虑维度',
                                                    page: '',
                                                    mark: 4
                                                },
                                                {
                                                    id: 3,
                                                    name: '强迫维度',
                                                    page: '',
                                                    mark: 4
                                                },
                                                {
                                                    id: 4,
                                                    name: '敌对维度',
                                                    page: '',
                                                    mark: 4
                                                },
                                                {
                                                    id: 5,
                                                    name: '自我伤害维度',
                                                    page: '',
                                                    mark: 4
                                                }
                                            ]
                                        },
                                        {
                                            id: 3,
                                            name: data[i].departmentName + '年级不同性别测评情况',
                                            page: '',
                                            mark: 3
                                        },
                                        {
                                            id: 4,
                                            name: data[i].departmentName + '年级重点关注人员名单',
                                            page: '',
                                            mark: 3
                                        }
                                    ]
                                }
                                this.muluList[2].list.push(gArr)
                            }
                            for (let i in this.muluList) {
                                this.muluList[i].ids = this.muluList[i].id
                                muluArr.push(this.muluList[i])
                                let ml1 = this.muluList[i].list
                                for (let j in ml1) {
                                    ml1[j].ids = this.muluList[i].id + '.' + ml1[j].id
                                    muluArr.push(ml1[j])
                                    let ml2 = ml1[j].list
                                    for (let k in ml2) {
                                        ml2[k].ids = this.muluList[i].id + '.' + ml1[j].id + '.' + ml2[k].id
                                        muluArr.push(ml2[k])
                                        let ml3 = ml2[k].list
                                        for (let m in ml3) {
                                            ml3[m].ids = this.muluList[i].id + '.' + ml1[j].id + '.' + ml2[k].id + '.' + ml3[m].id
                                            muluArr.push(ml3[m])
                                        }
                                    }
                                }
                            }
                            this.muluList = muluArr
                            this.partAll = data.length*2
                            setTimeout(() => {
                                this.schoolSub()
                            }, 2000);
                        } else {
                            this.$message.error(data.msg);
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    });
                
            } else {
            }
        },
        bindmodel: {
            handler: function (newVal) {
                this.part1 = newVal.part1;
                this.part2 = newVal.part2;
                this.part3 = newVal.part3;
                this.part4 = newVal.part4;
                this.part5 = newVal.part5;
                this.part6 = newVal.part6;
                this.part7 = newVal.part7;
                this.part8 = newVal.part8;
                this.part9 = newVal.part9;
                this.partNum = newVal.partNum;
                
                // let partFlag = false
                
                    if (this.part1 && this.part2 && this.part3 && this.part4 && this.part5 && this.part6 && this.part7 && this.part8 && this.part9 && this.partNum == this.partAll) {
                        this.part1 = false;
                        this.part2 = false;
                        this.part3 = false;
                        this.part4 = false;
                        this.part5 = false;
                        this.part6 = false;
                        this.part7 = false;
                        this.part8 = false;
                        this.part9 = false;
                        this.partNum = 0;
                        

                        
                        this.echartInit()
                        // this.loading = this.$loading({
                        //     lock: true,
                        //     text: "报告生成中",
                        //     spinner: "el-icon-loading",
                        //     background: "rgba(0, 0, 0, 0.7)"
                        // });
                        setTimeout(() => {
                            this.handleExport()
                            setTimeout(() => {
                                for (let i in this.gradeFjList) {
                                    let name = this.gradeFjList[i].code + '重点关注人员名单见附件'
                                    
                                    this.gradeFjList[i].pdfName = name
                                    this.$forceUpdate()
                                    let id = "#overviewpage" + i
                                    let pdf = new PdfLoader(
                                        document.querySelector(id),
                                        name,
                                        "noSplitBox" + i,
                                        this.loading,
                                        1
                                    );
                                    pdf.outPutPdfFn();

                                }
                                setTimeout(() => {
                                    this.loading.close()
                                    this.setSchoolFlag(false)
                                }, 6000);
                                
                            }, 2000);



                        }, 100);


                    }
                // }
                
            }
        }
    },
    methods: {
        ...mapMutations(["setSchoolFlag"]),
        timeChange(val) {
            this.pTimeFlag1 = false
        },
        echartInit() {
            let that = this;
            // 参加筛查评估学生学段分布图
            let arr1 = []
            for (let i in that.detail.schoolList) {
                let obj1 = {
                    value: Number(that.detail.schoolList[i].percent),
                    name: that.detail.schoolList[i].name
                }
                arr1.push(obj1)
            }
            this.myChart1 = echarts.init(this.$refs.myChart1);
            this.myChart1.setOption({
                tooltip: {
                    trigger: "item"
                },
                legend: {
                    bottom: '0%',
                    left: 'center',
                    textStyle: {
                        fontSize: 16, // 设置图例字体大小为14
                        color: '#333E75'
                    }
                },
                graphic: {
                    type: 'text',
                    left: 'center',
                    top: '135',
                    style: {
                        text: that.detail.totalStudents,
                        textAlign: 'center',
                        fill: '#333E75',
                        fontSize: 20
                    }
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        animation: false,
                        radius: ["45%", "70%"],
                        center: ['50%', '46%'],
                        avoidLabelOverlap: false,
                        label: {
                            fontSize: 16,
                            color: '#333E75',
                            formatter: '{b} {d}%'
                        },
                        labelLine: {
                            lineStyle: {
                                
                            }
                        },
                        data: arr1
                    }
                ]
            });

            // 参加筛查评估男女性别人数对比图
            let arr2 = []
            arr2.push(['product', '男', '女'])
            for (let i in that.detail.schoolList) {
                let obj2 = [
                    that.detail.schoolList[i].name,
                    that.detail.schoolList[i].numMaleStudents,
                    that.detail.schoolList[i].numFemaleStudents,
                ]
                arr2.push(obj2)
            }
            this.myChart2 = echarts.init(this.$refs.myChart2);
            this.myChart2.setOption({
                color: ['#8ACBFF', '#FFB0DB'],
                legend: {
                    bottom: '0%',
                    left: 'center',
                    textStyle: {
                        fontSize: 16, // 设置图例字体大小为14
                        color: '#333E75'
                    }
                },
                tooltip: {},
                grid: {
                    // left: '1%',    // 左边距为容器宽度的10%
                    // right: '1%',   // 右边距为容器宽度的10%
                    top: '20',     // 顶部距离
                    // bottom: '10%'   // 底部距离
                },
                dataset: {
                    source: arr2
                },
                xAxis: {
                    type: 'category',
                    fontSize: 16,
                    show: true, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
                    axisTick: {
                        show: false // 不显示坐标轴刻度线
                    },
                    axisLine: {
                        // show: false, // 不显示坐标轴线
                    },
                    axisLabel: {
                        color: "#333E75",
                        fontSize: 16,
                        // show: false, // 不显示坐标轴上的文字
                    },
                    splitLine: {
                        show: false // 不显示网格线
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: "#333E75",
                            fontSize: 14,
                        }
                    }
                },
                series: [
                    {
                        type: 'bar',
                        barWidth: '35',
                        barGap: 0.3,
                        animation: false,
                        label: {
                            normal: {
                                show: true, // 显示顶部数字
                                position: 'top', // 在顶部显示
                                distance: 5,
                                color: "#333E75",
                                fontSize: 16,
                                formatter: function (params) {
                                    if (params.value[1] > 0) {
                                        return params.value[1];
                                    } else {
                                        return "";
                                    }
                                },
                            }
                        }
                    },
                    {
                        type: 'bar',
                        barWidth: '35',
                        barGap: 0.3,
                        animation: false,
                        label: {
                            normal: {
                                show: true, // 显示顶部数字
                                position: 'top', // 在顶部显示
                                distance: 5,
                                color: "#333E75",
                                fontSize: 16,
                                formatter: function (params) {
                                    if (params.value[2] > 0) {
                                        return params.value[2];
                                    } else {
                                        return "";
                                    }
                                },
                            }
                        }
                    }
                ]
            });
            // 心理健康问题检出率对比分布
            this.myChart3 = echarts.init(this.$refs.myChart3);
            this.myChart3.setOption({
                color: ['#ff8e00', '#0d7ce4'],
                title: {

                },
                legend: {
                    show: false

                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: '抑郁', max: 100 },
                        { name: '焦虑', max: 100 },
                        { name: '强迫', max: 100 },
                        { name: '敌对', max: 100 },
                        { name: '自我伤害', max: 100 }
                    ],
                    axisName: {
                        color: "#333E75",
                        fontSize: 14,
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'radar',
                        symbol: 'none',
                        fontSize: "16",
                        data: [
                            {
                                value: that.schoolCM,
                                name: that.schoolName
                            },
                            {
                                value: that.ChinaCM,
                                name: '全国常模',
                                lineStyle: {
                                    type: 'dashed'
                                },
                            }
                        ]
                    }
                ]
            });

            // 心理健康检出率分布图
            let lv41 = []
            let lv42 = []
            let lv43 = []
            for (let i in that.wdJcListArr) {
                lv41.push(that.wdJcListArr[i].mildProportion)
                lv42.push(that.wdJcListArr[i].moderateProportion)
                lv43.push(that.wdJcListArr[i].severeProportion)
            }
            this.myChart4 = echarts.init(this.$refs.myChart4);
            this.myChart4.setOption({
                color: ['#8ACBFF', '#FFDDA0', '#FE9D9D'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {
                    show: false
                },
                grid: {
                    top: '1%',
                    left: '3%',
                    right: '4%',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        color: "#333E75",
                        fontSize: 14,
                        formatter: '{value}%'
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        fontSize: 14,
                        color: "#333E75"
                    },
                    axisTick: {
                        show: false // 不显示坐标轴刻度线
                    },
                    data: ['抑郁', '焦虑', '强迫', '敌对', '自我伤害'].reverse()
                },
                series: [
                    {
                        name: '轻度问题',
                        type: 'bar',
                        barWidth: 25,
                        stack: 'total',
                        label: {
                            normal: {
                                show: true,
                                // position: 'top', // 在顶部显示
                                formatter: (params) => params.value + '%'
                            }

                        },
                        emphasis: {
                            focus: 'series'
                        },

                        data: lv41.reverse()
                    },
                    {
                        name: '中度问题',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            normal: {
                                show: true,
                                // position: 'top', // 在顶部显示
                                formatter: (params) => params.value + '%'
                            }
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: lv42.reverse()
                    },
                    {
                        name: '重度问题',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            normal: {
                                show: true,
                                // position: 'top', // 在顶部显示
                                formatter: (params) => params.value + '%'
                            }
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: lv43.reverse()
                    }
                ]
            });

            // 不同性别学生心理健康问题检出率分布图
            this.myChart5 = echarts.init(this.$refs.myChart5);
            this.myChart5.setOption({
                color: ['#8ACBFF', '#FFB0DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {
                    bottom: '0%',
                    left: 'center',
                    textStyle: {
                        fontSize: 14, // 设置图例字体大小为14
                        color: '#333E75'
                    }
                },
                grid: {
                    top: '1%',
                    left: '3%',
                    right: '6%',
                    bottom: '12%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        color: "#333E75",
                        fontSize: 14,
                        formatter: '{value}%'
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        fontSize: 14,
                        color: "#333E75"
                    },
                    axisTick: {
                        show: false // 不显示坐标轴刻度线
                    },
                    data: ['抑郁', '焦虑', '强迫', '敌对', '自我伤害'].reverse()
                },
                series: [
                    {
                        name: '男',
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'right',
                            fontSize: 12,
                            color: "#333E75",
                            // 使用formatter自定义显示的数值
                            formatter: function (params) {
                                // params是一个对象，包含数据的各种信息，如data值，数据索引等
                                return params.value + '%'; // 自定义数值格式，以美元符号开头，小数点后保留两位
                            }
                        },
                        data: that.detail.manOrgs
                    },
                    {
                        name: '女',
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'right',
                            fontSize: 12,
                            color: "#333E75",
                            formatter: function (params) {
                                // params是一个对象，包含数据的各种信息，如data值，数据索引等
                                return params.value + '%'; // 自定义数值格式，以美元符号开头，小数点后保留两位
                            }
                        },
                        data: that.detail.womanOrgs
                    }
                ]
            });

            for (let i in this.gradeAllList) {
                
                // 雷达图
                // this['myChart1' + i] = null
                let plist = this.gradeAllList[i].wdList
                let pArr = []
                for (let i in plist) {
                    pArr.push(plist[i].percent)
                }
                let cName = 'myChart1' + i
                this[cName] = echarts.init(this.$refs[cName][0]);
                this[cName].setOption({
                    color: ['#ff8e00', '#0d7ce4', '#c2361f'],
                    title: {

                    },
                    legend: {
                        show: false

                    },
                    radar: {
                        // shape: 'circle',
                        indicator: [
                            { name: '抑郁', max: 100 },
                            { name: '焦虑', max: 100 },
                            { name: '强迫', max: 100 },
                            { name: '敌对', max: 100 },
                            { name: '自我伤害', max: 100 }
                        ],
                        axisName: {
                            color: "#333E75",
                            fontSize: 14,
                        },
                    },
                    series: [
                        {
                            name: '',
                            type: 'radar',
                            symbol: 'none',
                            fontSize: "16",
                            data: [
                                {
                                    value: pArr,
                                    name: this.gradeAllList[i].name,
                                    label: {
                                        show: true
                                    }
                                },
                                {
                                    value: this.ChinaCM,
                                    name: '全国常模',
                                    lineStyle: {
                                        type: 'dashed'
                                    }
                                },
                                {
                                    value: this.schoolCM,
                                    name: '本校常模',
                                    lineStyle: {
                                        type: 'dashed'
                                    }
                                }
                            ]
                        }
                    ]
                });
                // 维度和性别
                    const rawData = [
                        [this.gradeAllList[i].gradeNanData[0].normalNum, this.gradeAllList[i].gradeNanData[1].normalNum, this.gradeAllList[i].gradeNanData[2].normalNum, this.gradeAllList[i].gradeNanData[3].normalNum, this.gradeAllList[i].gradeNanData[4].normalNum],
                        [this.gradeAllList[i].gradeNanData[0].mildNum, this.gradeAllList[i].gradeNanData[1].mildNum, this.gradeAllList[i].gradeNanData[2].mildNum, this.gradeAllList[i].gradeNanData[3].mildNum, this.gradeAllList[i].gradeNanData[4].mildNum],
                        [this.gradeAllList[i].gradeNanData[0].moderateNum, this.gradeAllList[i].gradeNanData[1].moderateNum, this.gradeAllList[i].gradeNanData[2].moderateNum, this.gradeAllList[i].gradeNanData[3].moderateNum, this.gradeAllList[i].gradeNanData[4].moderateNum],
                        [this.gradeAllList[i].gradeNanData[0].severeNum, this.gradeAllList[i].gradeNanData[1].severeNum, this.gradeAllList[i].gradeNanData[2].severeNum, this.gradeAllList[i].gradeNanData[3].severeNum, this.gradeAllList[i].gradeNanData[4].severeNum],
                        [this.gradeAllList[i].gradeNvData[0].normalNum, this.gradeAllList[i].gradeNvData[1].normalNum, this.gradeAllList[i].gradeNvData[2].normalNum, this.gradeAllList[i].gradeNvData[3].normalNum, this.gradeAllList[i].gradeNvData[4].normalNum],
                        [this.gradeAllList[i].gradeNvData[0].mildNum, this.gradeAllList[i].gradeNvData[1].mildNum, this.gradeAllList[i].gradeNvData[2].mildNum, this.gradeAllList[i].gradeNvData[3].mildNum, this.gradeAllList[i].gradeNvData[4].mildNum],
                        [this.gradeAllList[i].gradeNvData[0].moderateNum, this.gradeAllList[i].gradeNvData[1].moderateNum, this.gradeAllList[i].gradeNvData[2].moderateNum, this.gradeAllList[i].gradeNvData[3].moderateNum, this.gradeAllList[i].gradeNvData[4].moderateNum],
                        [this.gradeAllList[i].gradeNvData[0].severeNum, this.gradeAllList[i].gradeNvData[1].severeNum, this.gradeAllList[i].gradeNvData[2].severeNum, this.gradeAllList[i].gradeNvData[3].severeNum, this.gradeAllList[i].gradeNvData[4].severeNum]
                    ];
                    const totalData = [];
                    for (let i = 0; i < rawData[0].length; ++i) {
                        let sum = 0;
                        for (let j = 0; j < rawData.length; ++j) {
                            sum += rawData[j][i];
                        }
                        totalData.push(sum);
                    }
                    const grid = {
                        left: 100,
                        right: 0,
                        top: 50,
                        bottom: 20
                    };
                    const series = [
                        '男-正常',
                        '男-轻度',
                        '男-中度',
                        '男-重度',
                        '女-正常',
                        '女-轻度',
                        '女-中度',
                        '女-重度',
                    ].map((name, sid) => {
                        return {
                            name,
                            type: 'bar',
                            stack: sid < 4 ? 'total' : "Ad",
                            barWidth: 20,
                            barGap: 1,
                            label: {
                                show: true,
                                // formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
                            },
                            data: rawData[sid]
                        };
                    });
                    let xName = 'myChart3' + i
                    this[xName] = echarts.init(this.$refs[xName][0]);
                    this[xName].setOption({
                        color: ['#B5ECAF', '#8ACBFF', '#FFDDA0', '#FE9D9D', '#B5ECAF', '#8ACBFF', '#FFDDA0', '#FE9D9D'],
                        legend: {
                            show: false,
                            selectedMode: false
                        },
                        grid,
                        yAxis: {
                            type: 'value',
                            splitLine: {
                                show: false // 不显示网格线
                            }
                        },
                        xAxis: {
                            axisLabel: {
                                show: false,
                                fontSize: 14,
                                color: "#333E75"
                            },
                            axisTick: {
                                show: false // 不显示坐标轴刻度线
                            },
                            axisLine: {
                                show: false, // 不显示坐标轴线
                            },
                            type: 'category',
                            data: ['抑郁', '焦虑', '强迫', '敌对', '自我伤害']
                        },
                        series
                    });
                // }




                let wdList = this.gradeAllList[i].wdList

                for (let j in wdList) {
                    let className = []
                    let classPercent = []
                    for (let k in this.gradeAllList[i].cwdList[j]) {
                        className.push(this.gradeAllList[i].cwdList[j][k].name)
                        classPercent.push(this.gradeAllList[i].cwdList[j][k].percent)
                    }

                    let cName2 = 'myChart2' + i + j;
                    this[cName2] = echarts.init(this.$refs[cName2][0]);
                    this[cName2].setOption({
                        color: ['#ff8e00', '#0d7ce4', '#c2361f'],
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
                                data: className,
                                axisPointer: {
                                    type: "shadow"
                                },
                                axisTick: {
                                    show: false // 不显示坐标轴刻度线
                                },
                                axisLabel: {
                                    color: "#333E75",
                                    fontSize: 14
                                }
                            }
                        ],
                        yAxis: {
                            type: "value",
                            name: "",
                            min: 0,
                            // max: wdList[j].percent+10,
                            // interval: 2,
                            axisLabel: {
                                color: "#333E75",
                                fontSize: 14,
                                formatter: "{value}%"
                            },
                            // minInterval: 1
                        },
                        series: [
                            {
                                name: wdList[j].name,
                                type: "bar",
                                barMaxWidth: 14,
                                data: classPercent,
                                markLine: {
                                    symbol: "none",
                                    lineStyle: {
                                        normal: {
                                            color: "#006cff"
                                        }
                                    },
                                    data: [
                                        {
                                            yAxis: wdList[j].percent,
                                            name: "",
                                            lineStyle: {
                                                type: "dashed",
                                                color: "#0d7ce4",
                                                width: 2
                                            },
                                            label: {
                                                position: "end",
                                                fontSize: 12,
                                                formatter: "",
                                                color: "#0d7ce4"
                                            }
                                        },
                                        {
                                            yAxis: Number(this.ChinaCM[j]),
                                            name: "",
                                            lineStyle: {
                                                type: "dashed",
                                                color: "#ff0000",
                                                width: 2
                                            },
                                            label: {
                                                position: "end",
                                                fontSize: 12,
                                                formatter: "",
                                                color: "#ff0000"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    });
                }
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
            return y + "-" + m + "-" + d;
        },
        formTimes1(date) {
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
            return y + "年" + m + "月" + d + "日";
        },
        areAllValuesEqual(arr) {
            if (arr.length === 0) return true; // 空数组中的所有值都相等
            const firstValue = arr[0];
            return arr.every(value => value === firstValue);
        },
        countElements(array) {
            const countMap = new Map();

            array.forEach(element => {
                const currentCount = countMap.get(element) || 0;
                countMap.set(element, currentCount + 1);
            });

            return countMap;
        },
        toFixed(d, n) {
            var s = n + "";
            if (!d) d = 0;
            if (s.indexOf(".") == -1) s += ".";
            s += new Array(d + 1).join("0");
            if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
                var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
                if (a == d + 2) {
                    a = s.match(/\d/g);
                    if (parseInt(a[a.length - 1]) > 4) {
                        for (var i = a.length - 2; i >= 0; i--) {
                            a[i] = parseInt(a[i]) + 1;
                            if (a[i] == 10) {
                                a[i] = 0;
                                b = i != 1;
                            } else break;
                        }
                    }
                    s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

                }
                // if (b) s = s.substr(1);
                if (b) s = s.substring(1);
                return (pm + s).replace(/\.$/, "");
            }
            return this + "";
        },
        noRepeat2(arr) { //数组去重
            for (var i = 0; i < arr.length; i++) {
                if (arr.indexOf(arr[i]) != i) {
                    arr.splice(i, 1);//删除数组元素后数组长度减1后面的元素前移
                    i--;//数组下标回退
                }
            }
            return arr;
        },
        // 下载报告
        schoolSub() {
            var that = this;
           
            this.start =  this.sList.start
            this.end =  this.sList.end
            this.reportName1 =  this.sList.reportName
            this.schoolName =  this.sList.schoolName
            let star = this.sList.startDate
            let end = this.sList.endDate
            let schoolId =  this.sList.schoolId
            // 各维度检出率（3.2.3 可用添加性别和code)   有男女之分 可一起查可分开查
            let param1 = {
                code: 2,
                startDate: star,
                endDate: end,
                id: schoolId
            };
            this.$http
                .post(Url + "/aimw/export/dimensionProportion", param1)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        let wdJcList = [
                            {}, {}, {}, {}, {}
                        ]
                        let wdJcTotal = []
                        let schoolCM = [0, 0, 0, 0, 0]
                        // let ChinaCM = [0,0,0,0,0]

                        let cmCha = [
                            {
                                name: '抑郁',
                                num: 0
                            },
                            {
                                name: '焦虑',
                                num: 0
                            },
                            {
                                name: '强迫',
                                num: 0
                            },
                            {
                                name: '敌对',
                                num: 0
                            },
                            {
                                name: '自我伤害',
                                num: 0
                            },
                        ]
                        for (let i in data) {
                            data[i].normalNum = data[i].normalNum === null ? 0 : data[i].normalNum
                            data[i].mildNum = data[i].mildNum === null ? 0 : data[i].mildNum
                            data[i].moderateNum = data[i].moderateNum === null ? 0 : data[i].moderateNum
                            data[i].severeNum = data[i].severeNum === null ? 0 : data[i].severeNum

                            data[i].normalProportion = data[i].normalProportion === null ? 0 : data[i].normalProportion
                            data[i].mildProportion = data[i].mildProportion === null ? 0 : data[i].mildProportion
                            data[i].moderateProportion = data[i].moderateProportion === null ? 0 : data[i].moderateProportion
                            data[i].severeProportion = data[i].severeProportion === null ? 0 : data[i].severeProportion
                            if (data[i].grade == '抑郁') {
                                wdJcList[0] = data[i]
                                schoolCM[0] = data[i].total
                                cmCha[0].num = (Number(data[i].total) - Number(this.detail.yyQg)).toFixed(1)
                                if (data[i].total > this.detail.yyQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.yyQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[0] = data[i].level
                            }
                            if (data[i].grade == '焦虑') {
                                wdJcList[1] = data[i]
                                schoolCM[1] = data[i].total
                                cmCha[1].num = (Number(data[i].total) - Number(this.detail.jlQg)).toFixed(1)
                                if (data[i].total > this.detail.jlQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.jlQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[1] = data[i].level
                            }
                            if (data[i].grade == '强迫') {
                                wdJcList[2] = data[i]
                                schoolCM[2] = data[i].total
                                cmCha[2].num = (Number(data[i].total) - Number(this.detail.qpQg)).toFixed(1)
                                if (data[i].total > this.detail.qpQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.qpQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[2] = data[i].level
                            }
                            if (data[i].grade == '敌对') {
                                wdJcList[3] = data[i]
                                schoolCM[3] = data[i].total
                                cmCha[3].num = (Number(data[i].total) - Number(this.detail.ddQg)).toFixed(1)
                                if (data[i].total > this.detail.ddQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.ddQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[3] = data[i].level
                            }
                            if (data[i].grade == '自我伤害') {
                                wdJcList[4] = data[i]
                                schoolCM[4] = data[i].total
                                cmCha[4].num = (Number(data[i].total) - Number(this.detail.zwshQg)).toFixed(1)
                                if (data[i].total > this.detail.zwshQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.zwshQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[4] = data[i].level
                            }
                        }
                        let wdJcListArr = JSON.parse(JSON.stringify(wdJcList))
                        this.wdJcListArr = wdJcListArr

                        this.schoolCM = schoolCM
                        this.cmCha = cmCha
                        let c1 = 0
                        let c2 = 0
                        let c3 = 0
                        for (let i in cmCha) {
                            if (cmCha[i].num < 0) {
                                c1++
                            }
                            if (cmCha[i].num == 0) {
                                c2++
                            }
                            if (cmCha[i].num > 0) {
                                c3++
                            }
                        }
                        let cmChaSort = JSON.parse(JSON.stringify(cmCha)).sort((a, b) => {
                            return Number(b.num) - Number(a.num);
                        })
                        let cmTxt = ''
                        // A.若学校常模-全国常模都为正，
                        if (c3 == 5) {

                            cmTxt += '与全国常模相比，本校学生整体各维度检出率都高于全国常模，心理健康问题有待改善，'
                            let cmChaArr = []
                            for (let i in cmChaSort) {
                                if (cmChaSort[i].num == cmChaSort[0].num) {
                                    cmChaArr.push(cmChaSort[i].name)
                                }
                            }
                            if (cmChaArr.length < 5) {
                                cmTxt += '其中，' + cmChaArr.join('、') + '维度（皆）超出全国常模' + cmChaSort[0].num + '%。'
                            } else {
                                cmTxt += '各维度皆超出全国常模' + cmChaSort[0].num + '%。'
                            }
                        }
                        // B.若学校常模-全国常模都为负，
                        if (c1 == 5) {
                            // cmTxt += '其中，**（和**问题）相对较小，（皆）低于全国常模**%。'
                            // cmTxt += '各维度皆低于全国常模**%。'
                            cmTxt += '与全国常模相比，本校学生整体各维度都低于全国常模，心理健康问题总体表现较好，'
                            let cmChaArr1 = []
                            for (let i in cmChaSort) {
                                if (cmChaSort[i].num == cmChaSort[5].num) {
                                    cmChaArr1.push(cmChaSort[i].name)
                                }
                            }
                            if (cmChaArr1.length < 5) {
                                cmTxt += '其中，' + cmChaArr1.reverse().join('、') + '问题相对较小，（皆）低于全国常模' + cmChaSort[0].num + '%。'
                            } else {
                                cmTxt += '各维度皆低于全国常模' + cmChaSort[5].num + '%。'
                            }

                        }
                        // C.若学校常模-全国常模都为0，则第一、二、三句输出：
                        if (c2 == 5) {
                            cmTxt += '与全国常模相比，本校各维度检出率与全国常模基本持平，说明本校心理健康问题与全国状况相当。'
                        }
                        // D.若学校常模-全国常模有正、有负
                        if (c3 < 5 && c2 < 5 && c1 < 5) {
                            cmTxt += '与全国常模相比，本校学生在'
                            let csStr1 = []
                            let csStr2 = []
                            let csStr3 = []
                            for (let i in cmChaSort) {
                                if (cmChaSort[i].num > 0) {
                                    csStr1.push(cmChaSort[i].name)
                                    if (cmChaSort[i].num == cmChaSort[0].num) {
                                        csStr3.push(cmChaSort[i].name)
                                    }
                                }
                                if (cmChaSort[i].num < 0) {
                                    csStr2.push(cmChaSort[i].name)
                                }

                            }
                            if (csStr2.length > 0) {
                                // 显示负的
                                cmTxt += csStr2.join('、') + '方面问题较小'
                                if (csStr1.length == 0) {
                                    cmTxt += '。'
                                } else {
                                    cmTxt += '，'
                                }
                            }
                            if (csStr1.length > 0) {
                                // 显示正的
                                cmTxt += csStr1.join('、') + '方面有待改善，'
                                cmTxt += '其中，'
                                // 输出差值为正，且最大的维度
                                let csStr3s = csStr3.length > 1 ? '皆' : ''
                                cmTxt += csStr3.join('、') + '维度' + csStr3s + '超出全国常模' + cmChaSort[0].num + '%。'

                            }

                        }
                        this.detail.cmTxt = cmTxt
                        wdJcList.sort((a, b) => {
                            return Number(b.total) - Number(a.total);
                        });
                        let wdArrNum = []
                        let wdNum = []

                        for (let i in wdJcList) {
                            wdArrNum.push({
                                name: wdJcList[i].grade,
                                num: wdJcList[i].total,
                                lv1: wdJcList[i].mildProportion === null ? 0 :  wdJcList[i].mildProportion,
                                lv2: wdJcList[i].moderateProportion === null ? 0 :  wdJcList[i].moderateProportion,
                                lv3: wdJcList[i].severeProportion === null ? 0 :  wdJcList[i].severeProportion
                            })
                            wdNum.push(wdJcList[i].total)
                        }
                        let wdNumNo = that.noRepeat2(wdNum)
                        let wdpStr = ''
                        if (wdNumNo.length == 5) {
                            // A.若五个维度检出率彼此各不相同，则输出
                            // （第一句）**问题最为普遍：在所有心理健康问题中，**问题的检出率最高，达到 **%。其中，**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。这表明**是本校中小学生中最常见的心理健康问题。
                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '<span class="yy_txt_s1" style="font-weight: 500;">' + wdArrNum[0].name + '问题最为普遍：</span>'
                            wdpStr += '<span class="yy_txt_s1">在所有心理健康问题中，' + wdArrNum[0].name + '问题的检出率最高，达到' + wdArrNum[0].num + '%。其中，' + wdArrNum[0].name + '轻度问题占比为' + wdArrNum[0].lv1 + '%，' + wdArrNum[0].name + '中度问题占比为' + wdArrNum[0].lv2 + '%，' + wdArrNum[0].name + '重度问题占比为' + wdArrNum[0].lv3 + '%。这表明' + wdArrNum[0].name + '是本校中小学生中最常见的心理健康问题。</span>'
                            wdpStr += '</div>'
                            // （第二句）**问题次之：**问题的检出率为 **%，其中**轻度问题占比为 **%，**中度问题占比**%，**重度问题占比 **%。**问题仅次于**问题，成为本校中小学生心理健康问题中的第二大常见类型。
                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '<span class="yy_txt_s1" style="font-weight: 500;">' + wdArrNum[1].name + '问题次之：</span>'
                            wdpStr += '<span class="yy_txt_s1">' + wdArrNum[1].name + '问题的检出率为' + wdArrNum[1].num + '%。其中，' + wdArrNum[1].name + '轻度问题占比为' + wdArrNum[1].lv1 + '%，' + wdArrNum[1].name + '中度问题占比为' + wdArrNum[1].lv2 + '%，' + wdArrNum[1].name + '重度问题占比为' + wdArrNum[0].lv3 + '%。' + wdArrNum[1].name + '问题仅次于' + wdArrNum[0].name + '问题，成为本校中小学生心理健康问题中的第二大常见类型。</span>'
                            wdpStr += '</div>'
                            // （第三句）**问题不容忽视：**问题的检出率为**%，其中**轻度问题占比为 20.1%，**中度问题占比 **%，**重度问题占比**%。
                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '<span class="yy_txt_s1" style="font-weight: 500;">' + wdArrNum[2].name + '问题不容忽视：</span>'
                            wdpStr += '<span class="yy_txt_s1">' + wdArrNum[2].name + '问题的检出率为' + wdArrNum[2].num + '%。其中，' + wdArrNum[2].name + '轻度问题占比为' + wdArrNum[2].lv1 + '%，' + wdArrNum[2].name + '中度问题占比为' + wdArrNum[2].lv2 + '%，' + wdArrNum[2].name + '重度问题占比为' + wdArrNum[0].lv3 + '%。</span>'
                            wdpStr += '</div>'
                            // （第四句）**、**问题相对较少：**问题的检出率为 **%，其中**轻度问题占比为 **%，**中度问题占比，**重度问题占比**%。**问题的总检出率为**%，其中**轻度问题占比最大，为 **%，**中度问题占比**%，**重度问题占比**%。这两类问题虽然检出率相对较低，但也需要引起注意。

                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '<span class="yy_txt_s1" style="font-weight: 500;">' + wdArrNum[3].name + '、' + wdArrNum[4].name + '问题相对较少：</span>'
                            wdpStr += '<span class="yy_txt_s1">' + wdArrNum[3].name + '问题的检出率为' + wdArrNum[3].num + '%。其中' + wdArrNum[3].name + '轻度问题占比为' + wdArrNum[3].lv1 + '%，' + wdArrNum[3].name + '中度问题占比为' + wdArrNum[3].lv2 + '%，' + wdArrNum[3].name + '重度问题占比为' + wdArrNum[3].lv3 + '%。' + wdArrNum[4].name + '问题的检出率为' + wdArrNum[4].num + '%。其中' + wdArrNum[4].name + '轻度问题占比为' + wdArrNum[4].lv1 + '%，' + wdArrNum[4].name + '中度问题占比为' + wdArrNum[4].lv2 + '%，' + wdArrNum[4].name + '重度问题占比为' + wdArrNum[4].lv3 + '%。这两类问题虽然检出率相对较低，但也需要引起注意。</span>'
                            wdpStr += '</div>'
                            // （第五句）综上所述，**问题是本校中小学生最突出的心理健康问题，其次为**问题。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。

                            wdpStr += '<div class="yy_txt yy_txt_s1">'
                            wdpStr += '综上所述，' + wdArrNum[0].name + '问题是本校中小学生最突出的心理健康问题，其次为' + wdArrNum[1].name + '问题。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。'
                            wdpStr += '</div>'




                        } else if (wdNumNo.length == 1) {
                            // B.若五个维度检出率完全相同，则输出：
                            // （第一句）各维度检出率相当，皆为**%。抑郁轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%；焦虑轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%；强迫轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%；敌对轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%；自我伤害轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。
                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '各维度检出率相当，皆为' + wdArrNum[0].num + '%。'
                            for (let i in wdArrNum) {
                                wdpStr += wdArrNum[i].name + '轻度问题占比为' + wdArrNum[i].lv1 + '%，' + wdArrNum[i].name + '中度问题占比为' + wdArrNum[i].lv2 + '%，' + wdArrNum[i].name + '重度问题占比为' + wdArrNum[i].lv3 + '%'
                                if (i < wdArrNum.length - 1) {
                                    wdpStr += '；'
                                } else {
                                    wdpStr += '。'
                                }
                            }
                            wdpStr += '</div>'

                            // （第二句）这表明，本校各维度心理健康问题占比均衡，学校和家长应该进行相应注意。其中，抑郁和自我伤害可能涉及到学生的生命安全，因此需要尤为关注。

                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '这表明，本校各维度心理健康问题占比均衡，学校和家长应该进行相应注意。其中，抑郁和自我伤害可能涉及到学生的生命安全，因此需要尤为关注。'
                            wdpStr += '</div>'
                        } else if (wdNumNo.length == 2) {
                            // D.若检出率仅有两种数值，则输出：
                            let noArr1 = []
                            let noArr2 = []
                            for (let i in wdArrNum) {
                                if (wdArrNum[i].num == wdNumNo[0]) {
                                    noArr1.push(wdArrNum[i])
                                }
                                if (wdArrNum[i].num == wdNumNo[1]) {
                                    noArr2.push(wdArrNum[i])
                                }
                            }

                            // （第一句:）**（、**、**和**)问题最为普遍：在所有心理健康问题中，**、（**、**和**)问题的检出率最高，（皆）达到 **%。其中，**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%；**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%；**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）这表明**、（**、**和**)是本校中小学生中最常见的心理健康问题)。
                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '<span class="yy_txt_s1" style="font-weight: 500;">'
                            let wdp1 = ''
                            if (noArr1.length > 1) {
                                for (let i in noArr1) {
                                    wdp1 += noArr1[i].name
                                    if (i < noArr1.length - 2) {
                                        wdp1 += '、'
                                    }
                                    if (i == noArr1.length - 2) {
                                        wdp1 += '和'
                                    }
                                }
                            } else {
                                wdp1 += noArr1[0].name
                            }

                            wdpStr += wdp1 + '问题最为普遍：</span>'
                            wdpStr += '<span class="yy_txt_s1">在所有心理健康问题中，'

                            wdpStr += wdp1 + '问题的检出率最高，'
                            let no1Len = noArr1.length > 1 ? '皆' : ''
                            wdpStr += no1Len + '达到' + noArr1[0].num + '%。其中，'
                            for (let i in noArr1) {
                                wdpStr += noArr1[i].name + '轻度问题占比为' + noArr1[i].lv1 + '%，' + noArr1[i].name + '中度问题占比为' + noArr1[i].lv2 + '%，' + noArr1[i].name + '重度问题占比为' + noArr1[i].lv3 + '%'
                                if (i < noArr1.length - 1) {
                                    wdpStr += '；'
                                } else {
                                    wdpStr += '。'
                                }
                            }

                            wdpStr += '这表明' + wdp1 + '是本校中小学生中最常见的心理健康问题。</span>'
                            wdpStr += '</div>'
                            // （第二句）**（、**、**和**)问题相对较少：**问题的检出率相对较低，（皆）为 **%，其中**轻度问题占比为 **%，**中度问题占比**%，重度问题占比**%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）**（、**、**和**)问题虽然检出率相对较低，但也需要引起注意。
                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '<span style="font-weight: 500;">'
                            let wdp2 = ''
                            if (noArr2.length > 1) {
                                for (let i in noArr2) {
                                    wdp2 += noArr2[i].name
                                    if (i < noArr2.length - 2) {
                                        wdp2 += '、'
                                    }
                                    if (i == noArr2.length - 2) {
                                        wdp2 += '和'
                                    }
                                }
                            } else {
                                wdp2 += noArr2[0].name
                            }
                            wdpStr += wdp2 + '问题相对较少：</span>'
                            wdpStr += '<span>'

                            wdpStr += wdp2 + '问题的检出率相对较低，'
                            let no2Len = noArr2.length > 1 ? '皆' : ''
                            wdpStr += no2Len + '为' + noArr2[0].num + '%，其中，'
                            for (let i in noArr2) {
                                wdpStr += noArr2[i].name + '轻度问题占比为' + noArr2[i].lv1 + '%，' + noArr2[i].name + '中度问题占比为' + noArr2[i].lv2 + '%，' + noArr2[i].name + '重度问题占比为' + noArr2[i].lv3 + '%'
                                if (i < noArr2.length - 1) {
                                    wdpStr += '；'
                                } else {
                                    wdpStr += '。'
                                }
                            }
                            wdpStr += wdp2 + '问题虽然检出率相对较低，但也需要引起注意。</span>'
                            wdpStr += '</div>'
                            // （第三句）综上所述，**（、**、**和**)问题是本校中小学生最突出的心理健康问题，**（、**、**和**)问题相对较少。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。
                            wdpStr += '<div class="yy_txt">'
                            wdpStr += '综上所述，' + wdp1 + '问题是本校中小学生最突出的心理健康问题，' + wdp2 + '问题相对较少。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。'
                            wdpStr += '</div>'
                        } else {
                            // C.若检出率有3-4个数值不同：
                            if (wdNumNo.length == 3) { // 13344 11134
                                let noArr31 = []
                                let noArr32 = []
                                let noArr33 = []
                                for (let i in wdArrNum) {
                                    if (wdArrNum[i].num == wdNumNo[0]) {
                                        noArr31.push(wdArrNum[i])
                                    }
                                    if (wdArrNum[i].num == wdNumNo[1]) {
                                        noArr32.push(wdArrNum[i])
                                    }
                                    if (wdArrNum[i].num == wdNumNo[2]) {
                                        noArr33.push(wdArrNum[i])
                                    }
                                }
                                // （第一句:）**（和**)问题最为普遍：在所有心理健康问题中，**（和**）问题的检出率最高，（皆）达到 **%。其中，**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）这表明**（、**）是本校中小学生中最常见的心理健康问题。
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '<span style="font-weight: 500;">'
                                let wdp31 = ''
                                if (noArr31.length > 1) {
                                    for (let i in noArr31) {
                                        wdp31 += noArr31[i].name
                                        if (i < noArr31.length - 2) {
                                            wdp31 += '、'
                                        }
                                        if (i == noArr31.length - 2) {
                                            wdp31 += '和'
                                        }
                                    }
                                } else {
                                    wdp31 += noArr31[0].name
                                }
                                wdpStr += wdp31 + '问题最为普遍：</span>'
                                wdpStr += '<span>在所有心理健康问题中，'

                                wdpStr += wdp31 + '问题的检出率最高，'
                                let no31Len = noArr31.length > 1 ? '皆' : ''
                                wdpStr += no31Len + '达到' + noArr31[0].num + '%。其中，'
                                for (let i in noArr31) {
                                    wdpStr += noArr31[i].name + '轻度问题占比为' + noArr31[i].lv1 + '%，' + noArr31[i].name + '中度问题占比为' + noArr31[i].lv2 + '%，' + noArr31[i].name + '重度问题占比为' + noArr31[i].lv3 + '%'
                                    if (i < noArr31.length - 1) {
                                        wdpStr += '；'
                                    } else {
                                        wdpStr += '。'
                                    }
                                }
                                wdpStr += '这表明' + wdp31 + '是本校中小学生中最常见的心理健康问题。</span>'
                                wdpStr += '</div>'
                                // （第二句：）**（和**）问题次之：**问题的检出率为 **%，其中**轻度问题占比为 **%，**中度问题占比**%，**重度问题占比 **%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）这表明**（和**）是本校中小学生心理健康问题中的第二大常见类型。
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '<span style="font-weight: 500;">'
                                let wdp32 = ''
                                if (noArr32.length > 1) {
                                    for (let i in noArr32) {
                                        wdp32 += noArr32[i].name
                                        if (i < noArr32.length - 2) {
                                            wdp32 += '、'
                                        }
                                        if (i == noArr32.length - 2) {
                                            wdp32 += '和'
                                        }
                                    }
                                } else {
                                    wdp32 += noArr32[0].name
                                }
                                wdpStr += wdp32 + '问题次之：</span>'
                                wdpStr += '<span>'

                                wdpStr += wdp32 + '问题的检出率为' + noArr32[0].num + '%，其中，'
                                // let no2Len = noArr32.length > 1 ? '皆' : ''
                                // wdpStr += no2Len + '为'+ noArr32[0].num + '%，其中，'
                                for (let i in noArr32) {
                                    wdpStr += noArr32[i].name + '轻度问题占比为' + noArr32[i].lv1 + '%，' + noArr32[i].name + '中度问题占比为' + noArr32[i].lv2 + '%，' + noArr32[i].name + '重度问题占比为' + noArr32[i].lv3 + '%'
                                    if (i < noArr32.length - 1) {
                                        wdpStr += '；'
                                    } else {
                                        wdpStr += '。'
                                    }
                                }
                                wdpStr += '这表明' + wdp32 + '是本校中小学生心理健康问题中的第二大常见类型。</span>'
                                wdpStr += '</div>'

                                // （第三句）**（和**）问题相对较少：**问题的检出率为 **%，其中**轻度问题占比为 **%，**中度问题占比**度问题占比**%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）**（和**)问题虽然检出率相对较低，但也需要引起注意。
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '<span style="font-weight: 500;">'
                                let wdp33 = ''
                                if (noArr33.length > 1) {
                                    for (let i in noArr33) {
                                        wdp33 += noArr33[i].name
                                        if (i < noArr33.length - 2) {
                                            wdp33 += '、'
                                        }
                                        if (i == noArr33.length - 2) {
                                            wdp33 += '和'
                                        }
                                    }
                                } else {
                                    wdp33 += noArr33[0].name
                                }
                                wdpStr += wdp33 + '问题相对较少：</span>'
                                wdpStr += '<span>'
                                wdpStr += wdp33 + '问题的检出率为' + noArr33[0].num + '%，其中，'
                                // wdpStr += wdp33 + '问题的检出率相对较低，'
                                // let no33Len = noArr33.length > 1 ? '皆' : ''
                                // wdpStr += no33Len + '为'+ noArr33[0].num + '%，其中，'
                                for (let i in noArr33) {
                                    wdpStr += noArr33[i].name + '轻度问题占比为' + noArr33[i].lv1 + '%，' + noArr33[i].name + '中度问题占比为' + noArr33[i].lv2 + '%，' + noArr33[i].name + '重度问题占比为' + noArr33[i].lv3 + '%'
                                    if (i < noArr33.length - 1) {
                                        wdpStr += '；'
                                    } else {
                                        wdpStr += '。'
                                    }
                                }
                                wdpStr += wdp33 + '问题虽然检出率相对较低，但也需要引起注意。</span>'
                                wdpStr += '</div>'
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '综上所述，' + wdp31 + '问题是本校中小学生最突出的心理健康问题，其次为' + wdp32 + '问题。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。'
                                wdpStr += '</div>'
                            }

                            if (wdNumNo.length == 4) {
                                let noArr31 = []
                                let noArr32 = []
                                let noArr33 = []
                                let noArr34 = []
                                for (let i in wdArrNum) {
                                    if (wdArrNum[i].num == wdNumNo[0]) {
                                        noArr31.push(wdArrNum[i])
                                    }
                                    if (wdArrNum[i].num == wdNumNo[1]) {
                                        noArr32.push(wdArrNum[i])
                                    }
                                    if (wdArrNum[i].num == wdNumNo[2]) {
                                        noArr33.push(wdArrNum[i])
                                    }
                                    if (wdArrNum[i].num == wdNumNo[3]) {
                                        noArr34.push(wdArrNum[i])
                                    }
                                }
                                // （第一句:）**（和**)问题最为普遍：在所有心理健康问题中，**（和**）问题的检出率最高，（皆）达到 **%。其中，**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）这表明**（、**）是本校中小学生中最常见的心理健康问题。
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '<span style="font-weight: 500;">'
                                let wdp31 = ''
                                
                                if (noArr31.length > 1) {
                                    for (let i in noArr31) {
                                        wdp31 += noArr31[i].name
                                        if (i < noArr31.length - 2) {
                                            wdp31 += '、'
                                        }
                                        if (i == noArr31.length - 2) {
                                            wdp31 += '和'
                                        }
                                    }
                                } else {
                                    wdp31 += noArr31[0].name
                                }
                                wdpStr += wdp31 + '问题最为普遍：</span>'
                                wdpStr += '<span>在所有心理健康问题中，'

                                wdpStr += wdp31 + '问题的检出率最高，'
                                let no31Len = noArr31.length > 1 ? '皆' : ''
                                wdpStr += no31Len + '达到' + noArr31[0].num + '%。其中，'
                                for (let i in noArr31) {
                                    wdpStr += noArr31[i].name + '轻度问题占比为' + noArr31[i].lv1 + '%，' + noArr31[i].name + '中度问题占比为' + noArr31[i].lv2 + '%，' + noArr31[i].name + '重度问题占比为' + noArr31[i].lv3 + '%'
                                    if (i < noArr31.length - 1) {
                                        wdpStr += '；'
                                    } else {
                                        wdpStr += '。'
                                    }
                                }
                                wdpStr += '这表明' + wdp31 + '是本校中小学生中最常见的心理健康问题。</span>'
                                wdpStr += '</div>'
                                // （第二句：）**（和**）问题次之：**问题的检出率为 **%，其中**轻度问题占比为 **%，**中度问题占比**%，**重度问题占比 **%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）这表明**（和**）是本校中小学生心理健康问题中的第二大常见类型。
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '<span style="font-weight: 500;">'
                                let wdp32 = ''
                                if (noArr32.length > 1) {
                                    for (let i in noArr32) {
                                        wdp32 += noArr32[i].name
                                        if (i < noArr32.length - 2) {
                                            wdp32 += '、'
                                        }
                                        if (i == noArr32.length - 2) {
                                            wdp32 += '和'
                                        }
                                    }
                                } else {
                                    wdp32 += noArr32[0].name
                                }
                                wdpStr += wdp32 + '问题次之：</span>'
                                wdpStr += '<span>'

                                wdpStr += wdp32 + '问题的检出率为' + noArr32[0].num + '%，其中，'
                                // let no2Len = noArr32.length > 1 ? '皆' : ''
                                // wdpStr += no2Len + '为'+ noArr32[0].num + '%，其中，'
                                for (let i in noArr32) {
                                    wdpStr += noArr32[i].name + '轻度问题占比为' + noArr32[i].lv1 + '%，' + noArr32[i].name + '中度问题占比为' + noArr32[i].lv2 + '%，' + noArr32[i].name + '重度问题占比为' + noArr32[i].lv3 + '%'
                                    if (i < noArr32.length - 1) {
                                        wdpStr += '；'
                                    } else {
                                        wdpStr += '。'
                                    }
                                }
                                wdpStr += '这表明' + wdp32 + '是本校中小学生心理健康问题中的第二大常见类型。</span>'
                                wdpStr += '</div>'

                                // （第三句）**（和**）问题相对较少：**问题的检出率为 **%，其中**轻度问题占比为 **%，**中度问题占比**度问题占比**%。(**轻度问题占比为 **%，**中度问题占比 **%，**重度问题占比 **%。）**（和**)问题虽然检出率相对较低，但也需要引起注意。
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '<span style="font-weight: 500;">'
                                let wdp33 = ''
                                if (noArr33.length > 1) {
                                    for (let i in noArr33) {
                                        wdp33 += noArr33[i].name
                                        if (i < noArr33.length - 2) {
                                            wdp33 += '、'
                                        }
                                        if (i == noArr33.length - 2) {
                                            wdp33 += '和'
                                        }
                                    }
                                } else {
                                    wdp33 += noArr33[0].name
                                }
                                let wdp34 = ''
                                if (noArr34.length > 1) {
                                    for (let i in noArr34) {
                                        wdp34 += noArr34[i].name
                                        if (i < noArr34.length - 2) {
                                            wdp34 += '、'
                                        }
                                        if (i == noArr34.length - 2) {
                                            wdp34 += '和'
                                        }
                                    }
                                } else {
                                    wdp34 += noArr34[0].name
                                }
                                let noArr33s = noArr33.concat(noArr34)
                                let wdp3s = ''
                                if (noArr33s.length > 1) {
                                    for (let i in noArr33s) {
                                        wdp3s += noArr33s[i].name
                                        if (i < noArr33s.length - 2) {
                                            wdp3s += '、'
                                        }
                                        if (i == noArr33s.length - 2) {
                                            wdp3s += '和'
                                        }
                                    }
                                } else {
                                    wdp3s += noArr33s[0].name
                                }
                                wdpStr += wdp3s + '问题相对较少：</span>'
                                wdpStr += '<span>'
                                wdpStr += wdp33 + '问题的检出率为' + noArr33[0].num + '%，' + wdp34 + '问题的检出率为' + noArr34[0].num + '%，其中，'
                                // wdpStr += wdp33 + '问题的检出率相对较低，'
                                // let no33Len = noArr33.length > 1 ? '皆' : ''
                                // wdpStr += no33Len + '为'+ noArr33[0].num + '%，其中，'
                                for (let i in noArr33s) {
                                    wdpStr += noArr33s[i].name + '轻度问题占比为' + noArr33s[i].lv1 + '%，' + noArr33s[i].name + '中度问题占比为' + noArr33s[i].lv2 + '%，' + noArr33s[i].name + '重度问题占比为' + noArr33s[i].lv3 + '%'
                                    if (i < noArr33s.length - 1) {
                                        wdpStr += '；'
                                    } else {
                                        wdpStr += '。'
                                    }
                                }
                                wdpStr += wdp3s + '问题虽然检出率相对较低，但也需要引起注意。</span>'
                                wdpStr += '</div>'
                                wdpStr += '<div class="yy_txt">'
                                wdpStr += '综上所述，' + wdp31 + '问题是本校中小学生最突出的心理健康问题，其次为' + wdp32 + '问题。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。'
                                wdpStr += '</div>'
                            }


                        }
                        this.detail.wdpStr = wdpStr
                        wdJcTotal.sort((a, b) => {
                            return Number(b) - Number(a);
                        });
                        let oneFlag = this.areAllValuesEqual(wdJcTotal)
                        if (oneFlag) {
                            if (wdJcTotal[0] === 1) {
                                // 全部低于
                                this.detail.wdLevelTxt = 1
                            }
                            if (wdJcTotal[0] === 2) {
                                // 全部等于
                                this.detail.wdLevelTxt = 2
                            }
                            if (wdJcTotal[0] === 3) {
                                // 全部大于
                                this.detail.wdLevelTxt = 3
                            }
                        } else {
                            if (wdJcTotal[0] === 3) {
                                // 部分大于
                                this.detail.wdLevelTxt = 4
                            }
                            if (wdJcTotal[0] === 2) {
                                // 最高是持平，部分持平
                                this.detail.wdLevelTxt = 5
                            }
                        }
                        if (this.detail.wdLevelTxt == 4) {
                            let txtArr4 = []
                            for (let i in wdJcList) {
                                if (wdJcList[i].level > 2) {
                                    txtArr4.push(wdJcList[i])
                                }
                            }
                            let txtStr = ''
                            for (let i in txtArr4) {
                                txtStr += txtArr4[i].grade
                                if (i < txtArr4.length - 2) {
                                    txtStr += '、'
                                }
                                if (i == txtArr4.length - 2) {
                                    txtStr += '和'
                                }
                            }
                            this.detail.txtStr = txtStr
                        }
                        if (this.detail.wdLevelTxt == 5) {
                            let txtArr52 = []
                            let txtArr51 = []
                            for (let i in wdJcList) {
                                if (wdJcList[i].level == 2) {
                                    txtArr52.push(wdJcList[i])
                                }
                                if (wdJcList[i].level == 1) {
                                    txtArr51.push(wdJcList[i])
                                }
                            }
                            let txtStr52 = ''
                            for (let i in txtArr52) {
                                txtStr52 += txtArr52[i].grade
                                if (i < txtArr52.length - 2) {
                                    txtStr52 += '、'
                                }
                                if (i == txtArr52.length - 2) {
                                    txtStr52 += '和'
                                }
                            }
                            this.detail.txtStr52 = txtStr52
                            let txtStr51 = ''
                            for (let i in txtStr51) {
                                txtStr51 += txtStr51[i].grade
                                if (i < txtStr51.length - 2) {
                                    txtStr51 += '、'
                                }
                                if (i == txtStr51.length - 2) {
                                    txtStr51 += '和'
                                }
                            }
                            this.detail.txtStr51 = txtStr51
                        }




                        let jcTxt = ''
                        if (wdJcList.every(item => item.total === wdJcList[0].total)) {

                            // 若五个维度检出率完全相同，则输出：
                            jcTxt += '各类心理健康问题相当，检出率皆为：' + wdJcList[0].total + '%。'
                        } else {
                            // 若检出率前两个维度相同
                            if (wdJcList[0].total == wdJcList[1].total) {
                                // 检出率后两个维度也相同，但彼此不同
                                if (wdJcList[3].total == wdJcList[4].total) {
                                    jcTxt += '较为突出的两类心理健康问题为' + wdJcList[0].grade + '和' + wdJcList[1].grade + '，检出率皆为' + wdJcList[0].total + '%，存在' + wdJcList[3].grade + '和' + wdJcList[4].grade + '的学生相对较少，检出率皆为' + wdJcList[3].total + '%。'
                                } else {// 后两个维度不同输出
                                    jcTxt += '较为突出的两类心理健康问题为' + wdJcList[0].grade + '和' + wdJcList[1].grade + '，检出率皆为' + wdJcList[0].total + '%，存在' + wdJcList[3].grade + '和' + wdJcList[4].grade + '的学生相对较少，检出率分别为' + wdJcList[3].total + '%和' + wdJcList[4].total + '%。'
                                }
                            } else { //检出率前两个维度不同
                                // 后两个维度相同
                                if (wdJcList[3].total == wdJcList[4].total) {
                                    jcTxt += '较为突出的两类心理健康问题为' + wdJcList[0].grade + '和' + wdJcList[1].grade + '，检出率分别为' + wdJcList[0].total + '%和' + wdJcList[1].total + '%，存在' + wdJcList[3].grade + '和' + wdJcList[4].grade + '的学生相对较少，检出率皆为' + wdJcList[3].total + '%。'
                                } else {
                                    // 若五个维度检出率彼此各不相同或中间的跟其他四个相同，则先输出前两位及其检出率，后输出后两位及其检出率
                                    jcTxt += '较为突出的两类心理健康问题为' + wdJcList[0].grade + '和' + wdJcList[1].grade + '，检出率分别为' + wdJcList[0].total + '%和' + wdJcList[1].total + '%，存在' + wdJcList[3].grade + '和' + wdJcList[4].grade + '的学生相对较少，检出率分别为' + wdJcList[3].total + '%和' + wdJcList[4].total + '%。'
                                }
                            }
                        }
                        this.detail.jcTxt = jcTxt
                        this.detail.wdJcList = wdJcList


                        this.part1 = true;
                        // 各个学段各维度检出率  不需要男女之分
                        let param7 = {
                            startDate: star,
                            endDate: end,
                            id: schoolId,
                            // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                            // gender: 1
                        };
                        this.getDim7(param7, star, end)
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 根据年份和月份查询学校班级实际测评数量... 不需要男女之分
            let param2 = {
                startDate: star,
                endDate: end,
                id: this.sList.schoolId
            };
            this.$http
                .post(Url + "/aimw/export/exportGradeInfoByOrgIdAndDate", param2)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        let schoolList = data.schoolList
                        // let yuBei = {}
                        // let chuZhong = {}
                        // let gaoZhong = {}
                        for (let i in schoolList) {
                            schoolList[i].name = schoolList[i].grade
                            schoolList[i].percent = ((schoolList[i].numStudents / data.totalStudents) * 100).toFixed(1)
                            
                        }
                        data.schoolList = schoolList
                        let gradeList = data.gradeList
                        for (let i in gradeList) {
                            for (let j in schoolList) {
                                if (schoolList[j].id == gradeList[i].orgId) {
                                    // gradeList[i].grade = schoolList[j].grade + gradeList[i].grade
                                    gradeList[i].name = schoolList[j].grade
                                }
                            }
                            
                        }
                        data.gradeList = gradeList
                        this.detail.gradeList = data.gradeList

                        this.detail.totalClasses = data.totalClasses
                        this.detail.totalStudents = data.totalStudents
                        this.detail.maleStudents = data.maleStudents
                        this.detail.maleStudentsPre = ((data.maleStudents / data.totalStudents) * 100).toFixed(1)
                        this.detail.femaleStudents = data.femaleStudents
                        this.detail.femaleStudentsPre = ((data.femaleStudents / data.totalStudents) * 100).toFixed(1)
                        let gradeNumStr = '（其中：'
                        let gArr1 = []
                        for ( let i in data.schoolList) {
                            gArr1.push(data.schoolList[i].grade + data.schoolList[i].numClasses +'个')
                        }
                        gradeNumStr += gArr1.join('，')
                        gradeNumStr += '）的' + data.totalStudents + '名'
                        gradeNumStr += '（其中：'
                        let gArr2 = []
                        for ( let i in data.schoolList) {
                            gArr2.push(data.schoolList[i].grade + '年级学生' + data.schoolList[i].numStudents +'个')
                        }
                        gradeNumStr += gArr2.join('，')
                        gradeNumStr += '；'
                        gradeNumStr += '男生' + data.maleStudents + '，女生' + data.femaleStudents +  '名）'

                        this.detail.gradeNumTxt = gradeNumStr
                        let gradeNumStr1 = '其中，'
                        let gArr11 = []
                        for ( let i in data.schoolList) {
                            gArr11.push(data.schoolList[i].grade + data.schoolList[i].numClasses +'个')
                        }
                        gradeNumStr1 += gArr11.join('，')
                        gradeNumStr1 += '。'
                        
                        this.detail.gradeNumTxt1 = gradeNumStr1
                        
                        let gradeNumStr2 = '其中，'
                        let gArr12 = []
                        for ( let i in data.schoolList) {
                            gArr12.push(data.schoolList[i].grade + data.schoolList[i].numStudents +'人（占比' +data.schoolList[i].percent +'%）')
                        }
                        gradeNumStr2 += gArr12.join('，')
                        gradeNumStr2 += '。'
                        
                        this.detail.gradeNumTxt2 = gradeNumStr2
                        this.detail.schoolList = data.schoolList
                        this.part2 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 健康百分比    不需要男女之分
            let param3 = {
                startDate: star,
                endDate: end,
                id: this.sList.schoolId
            };
            this.$http
                .post(Url + "/aimw/export/exportHealthInfoByOrgIdAndDate", param3)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part3 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 性别各维度检出率 1.3男女不同性别各维度检出率 3.1.2 不同性别各维度检出率
            let param4 = {
                startDate: star,
                endDate: end,
                id: this.sList.schoolId
            };
            this.$http
                .post(Url + "/aimw/export/genderDimensionProportion", param4)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        let man = []
                        let woman = []
                        let manOrg = []
                        let womanOrg = []
                        let man3 = []
                        let woman3 = []
                        let manSum = 0
                        let womanSum = 0
                        for (let i in data) {
                            if (data[i].grade == '自伤') {
                                data[i].grade = '自我伤害'
                            }
                        }
                        let datap = JSON.parse(JSON.stringify(data))
                        for (let i in datap) {
                            datap[i].exNum = Number((datap[i].maleProportion - datap[i].femaleProportion).toFixed(1))
                            datap[i].absNum = Number(Math.abs(datap[i].maleProportion - datap[i].femaleProportion).toFixed(1))
                            if (datap[i].grade == '抑郁') {
                                data[0] = datap[i]
                            }
                            if (datap[i].grade == '焦虑') {
                                data[1] = datap[i]
                            }
                            if (datap[i].grade == '强迫') {
                                data[2] = datap[i]
                            }
                            if (datap[i].grade == '敌对') {
                                data[3] = datap[i]
                            }
                            if (datap[i].grade == '自我伤害') {
                                data[4] = datap[i]
                            }

                        }
                        let dataEx = JSON.parse(JSON.stringify(data)).sort((a, b) => {
                            return Number(b.absNum) - Number(a.absNum);
                        })
                        let genderTxt52 = ''
                        let maxAbs = dataEx[0]  //最大差值
                        if (maxAbs.absNum > 0) {
                            // 若最大差值为抑郁，男检出率＞女检出率时，输出：
                            if (maxAbs.grade == '抑郁') {
                                if (maxAbs.maleProportion > maxAbs.femaleProportion) { //男检出率＞女检出率时
                                    genderTxt52 += '尤其是在抑郁维度，男生的检出率明显高于女生。男生在遇到困难或挫折时，更难以用语言来表达自己的情感和需求，传统性别角色期待也让男生更难表现出软弱、哭泣等情绪。此外，对于男生来说，如果他们在学习上遇到困难或成绩不佳，可能会感到更加沮丧和无力，社会对男孩的学业期望也可能更高，从而增加了他们的学业压力。这些都可能让男生更容易陷入抑郁状态。因此，针对男生的心理健康干预措施应更加重视情感表达能力的培养和社交支持网络的构建，以帮助他们有效应对心理压力。'
                                }
                                if (maxAbs.maleProportion < maxAbs.femaleProportion) { //男检出率＜女检出率时
                                    genderTxt52 += '尤其实在抑郁维度，女生的检出率明显高于男生。女生通常对情绪更加敏感，能够更快地识别和读懂情绪，这种敏感性也可能使她们更容易受到负面情绪的影响，从而增加抑郁的风险。此外，女生的可能更在意人际关系的成功和获得他人的认可，当她们在人际关系中遇到问题时，可能更容易受到打击，从而产生抑郁情绪。因此，针对女生的心理健康干预措施应更加注重钝感力和自我价值的培养。'
                                }
                            }
                            // 若最大差值为焦虑，男检出率＞女检出率时，输出：
                            if (maxAbs.grade == '焦虑') {
                                if (maxAbs.maleProportion > maxAbs.femaleProportion) { //男检出率＞女检出率时
                                    genderTxt52 += '尤其是在焦虑维度，男生的检出率明显超过女生。这可能与男生通常更难以通过社交和情感交流缓解压力有关，导致他们更容易陷入焦虑状态。此外，社会对男生的情感表达常常存在一定的压制，使得他们在面临心理困扰时更倾向于内化这些情绪，而非寻求支持或倾诉，从而加剧了焦虑的表现。因此，针对男生的心理健康干预措施应更加重视情感表达能力的培养和社交支持网络的构建，以帮助他们有效应对心理压力。'
                                }
                                if (maxAbs.maleProportion < maxAbs.femaleProportion) { //男检出率＜女检出率时
                                    genderTxt52 += '尤其是在焦虑维度，女生的检出率明显超过男生。女生相对较为敏感，这种敏感会不自觉地主导她们的做事方法及心态情绪，她们往往会把事情看得很重，尤其是当如果事情没有朝着自己的预期发展，女生更容易缺乏自信、苦闷自卑，从而长期处于一种压抑、紧张、焦虑的状态中。此外，女生在人际关系上往往比男生更加细腻和复杂，更容易受到同学关系、师生关系等因素的影响，如果处理不好这些关系，就可能产生焦虑情绪。因此，应加强对女生的心理健康教育，帮助她们建立积极的心态和应对压力的能力。'
                                }
                            }
                            // 若最大差值为强迫，男检出率＞女检出率时，输出：
                            if (maxAbs.grade == '强迫') {
                                if (maxAbs.maleProportion > maxAbs.femaleProportion) { //男检出率＞女检出率时
                                    genderTxt52 += '尤其是在强迫维度，男生的检出率明显超过女生。男生在成长过程中可能面临更多的学业压力、社交压力等，这些压力也可能导致他们更容易产生焦虑情绪，进而发展为强迫症状。应当关注个体的心理健康状况，及时提供必要的支持和帮助。'
                                }
                                if (maxAbs.maleProportion < maxAbs.femaleProportion) { //男检出率＜女检出率时
                                    genderTxt52 += '尤其是在强迫维度，女生的检出率明显超过男生。对于女生来说，她们可能面临更多的学业压力、家庭期望以及人际关系等方面的挑战。这些压力可能导致她们在某些方面产生过度焦虑和担忧，进而发展为强迫思维和行为。特别是对于那些性格内向、胆小拘谨、过分追求完美的女生来说，她们可能更容易受到这些心理社会因素的影响。因此，家长和教育工作者需要关注女生的心理健康状况，及时发现并干预潜在的强迫症状，为她们提供必要的支持和帮助。'
                                }
                            }
                            // 若最大差值为敌对，男检出率＞女检出率时，输出：
                            if (maxAbs.grade == '敌对') {
                                if (maxAbs.maleProportion > maxAbs.femaleProportion) { //男检出率＞女检出率时
                                    genderTxt52 += '尤其是在敌对维度，男生的检出率明显超过女生。男生与女生在生理上存在差异，这些差异可能导致他们在面对压力和挑战时的反应不同，相较于女生，男生通常更具冒险精神，做事容易冲动，性格直率，这些都可能让男生更倾向于通过攻击或敌对行为来应对压力。此外，社会文化传统可能赋予了男生“强者”的角色，从而使男生更容易产生敌对情绪，以维护自己的“强者”形象。为了缓解男生的敌对情绪，家长、教师和社会应共同努力，为他们创造一个更加和谐、公正和包容的成长环境。'
                                }
                                if (maxAbs.maleProportion < maxAbs.femaleProportion) { //男检出率＜女检出率时
                                    genderTxt52 += '尤其是在敌对维度，女生的检出率明显超过男生。在学校中，女生可能更容易受到同伴关系、师生关系等因素的影响。如果她们感受到被孤立、排斥或受到不公平对待，可能更容易产生敌对情绪。同时，学习压力大、竞争激烈也可能导致女生更容易产生敌对态度来发泄自己的不满。此外，女生在面对问题时可能更倾向于采取保守或回避的应对方式，而不是积极寻求解决方案。这种应对方式可能使她们在面对困难时更容易陷入敌对情绪中。为了缓解女生的敌对情绪，家长、教师和社会应共同努力，为她们创造一个更加和谐、包容和支持的成长环境。同时，也需要加强对女生的心理健康教育，帮助她们建立积极的心态和应对压力的能力。'
                                }
                            }
                            // 若最大差值为自我伤害，男检出率＞女检出率时，输出：
                            if (maxAbs.grade == '自我伤害') {
                                if (maxAbs.maleProportion > maxAbs.femaleProportion) { //男检出率＞女检出率时
                                    genderTxt52 += '尤其是在自我伤害维度，男生的检出率明显超过女生。相对女生，男生可能更倾向于冲动和冒险行为，对风险的评估可能相对较低。这种性格特点可能导致他们在面对压力或情绪困扰时，更容易采取自我伤害等极端行为来应对。此外，传统的性别角色刻板印象认为男生应该坚强、勇敢，不应表达负面情绪。这种观念可能导致男生在面对情绪困扰时更难以寻求帮助，而采取自我伤害等极端行为来应对。为了预防和减少男生的自我伤害行为，家长、教师和社会应共同努力，为男生创造一个更加安全、包容和支持的成长环境。同时，也需要加强对男生的心理健康教育，帮助他们建立积极的心态和应对压力的能力。'
                                }
                                if (maxAbs.maleProportion < maxAbs.femaleProportion) { //男检出率＜女检出率时
                                    genderTxt52 += '尤其是在自我伤害维度，女生的检出率明显超过男生。女生通常比男生更加敏感细腻，对人际关系、学业压力、家庭氛围等变化更容易产生情感波动。这种敏感度可能导致女生在面对压力或挫折时更容易产生自我伤害的想法。此外，女生在青春期阶段可能更加关注自我认同和自尊。当她们感到自己不被理解、接受或重视时，可能更容易产生自我伤害的行为来表达自己的不满和痛苦。为了预防和减少女生的自我伤害行为，家长、教师和社会应共同努力，为女生创造一个更加安全、包容和支持的成长环境。同时，也需要加强对女生的心理健康教育，帮助她们建立积极的心态和应对压力的能力。'
                                }
                            }
                        } else {
                            // 男女检出率差值最大的一个维度(最大差值=0，即男女各维度检出率完全一致），则输出检出率最高的一个维度（注：检出率相同时，按抑郁、焦虑、强迫、敌对、自我伤害顺序）：
                            genderTxt52 += '其中，**维度检出率最高。'
                            let maxEx0 = JSON.parse(JSON.stringify(data)).sort((a, b) => {
                                return Number(b.maleProportion) - Number(a.maleProportion);
                            })
                            let maxWd = maxEx0[0] //最大维度
                            if (maxWd.grade == '抑郁') {
                                genderTxt52 += '中小学生的学业负担过重，学习竞争激烈，给他们带来了沉重的心理压力。长期处于这种高压状态下，容易导致心理失衡，进而引发抑郁。此外，中小学生正处于社交需求旺盛的时期，但在人际交往中可能会遇到各种问题，如被同学孤立等。这些负面的社交经历会使他们的自尊心受到打击，产生自我怀疑和自卑心理，从而引发抑郁。为缓解中小学生抑郁，需要家庭、学校和社会共同努力，为中小学生创造一个更加健康、积极、和谐的学习和成长环境。同时，也需要加强对中小学生的心理健康教育，提高他们的心理韧性和应对压力的能力。'
                            }
                            if (maxWd.grade == '焦虑') {
                                genderTxt52 += '中小学生可能面临过度内心冲突，对自我威胁的结果感到担忧，或者心理体验被压抑，这些都可能引发焦虑状况。长时间追求完美、自我期望过高，如果希望和现实之间差距太大，可能会造成心理失衡，进而诱发焦虑症状反复发作。为了缓解中小学生的焦虑，需要家庭、学校和社会共同努力，为中小学生创造一个更加健康、积极、和谐的学习和成长环境。'
                            }
                            if (maxWd.grade == '强迫') {
                                genderTxt52 += '中小学生可能由于各种原因形成了某些固定的、不合理的信念，这些信念会反复困扰他们，进而引发强迫行为。此外，长期处于高压状态下，学生可能更容易出现焦虑、抑郁等心理问题，继而引发强迫症状。学生在遇到问题时得不到及时的帮助和支持，他们可能会感到孤立无援，从而增加强迫的可能性。为缓解中小学生的强迫症状，需要加强对中小学生的心理健康教育，提高他们的心理韧性和应对压力的能力。'
                            }
                            if (maxWd.grade == '敌对') {
                                genderTxt52 += '在应试教育背景下，学生的学习压力非常大，这种压力不仅来源于学校和家庭的期望，还来自于同伴间的竞争。长期的高强度学习压力可能导致学生产生敌对情绪，以发泄内心的不满。此外，进入青春期的孩子自我意识增强，具有很强的独立感，认为自己是大人了。但父母仍然会插手孩子的事情，这往往被孩子们看成是一种束缚，容易使孩子产生反感或逆反心理，引起敌对。为了降低敌对情绪的出现率，需要家庭、学校和社会共同努力，为孩子创造一个更加健康、积极、和谐的学习和成长环境。同时，也需要加强对孩子的心理健康教育，提高他们的心理韧性和应对压力的能力。'
                            }
                            if (maxWd.grade == '自我伤害') {
                                genderTxt52 += '中小学生可能缺乏有效的情绪调节策略，当面临挫折或困难时，容易陷入消极情绪中无法自拔。为了逃避或缓解这种消极情绪，他们可能采取自我伤害行为。此外，父母忽视孩子的情感需求，缺乏对孩子的关注和支持，可能使孩子感到孤独和无助，从而通过自我伤害来寻求关注和安慰。当家庭关系紧张、冲突频繁时，使孩子长期处于紧张和焦虑状态，增加自我伤害的风险。为了降低自我伤害行为的发生率，需要家庭、学校和社会共同努力，为孩子创造一个更加健康、积极、和谐的学习和成长环境。同时，也需要加强对孩子的心理健康教育，提高他们的心理韧性和应对压力的能力。如果发现孩子有自我伤害的倾向或症状，应及时寻求专业医生的帮助和治疗。'
                            }
                        }

                        this.detail.genderTxt52 = genderTxt52
                        let manOrgs = []
                        let womanOrgs = []
                        // 若**年级直升班五个维度检出率之和＞非直升班，则输出：
                        for (let i in data) {
                            // if (data[i].grade == '初中A直升班') {

                            man.push({
                                grade: data[i].grade,
                                percentage: data[i].maleProportion,
                            })
                            manOrg.push({
                                grade: data[i].grade,
                                percentage: data[i].maleProportion
                            })
                            manOrgs.push(data[i].maleProportion)
                            manSum += data[i].maleProportion
                            // }  
                            // if (data[i].grade == '初中B非直升班') {
                            woman.push({
                                grade: data[i].grade,
                                percentage: data[i].femaleProportion
                            })
                            womanOrg.push({
                                grade: data[i].grade,
                                percentage: data[i].femaleProportion
                            })
                            womanOrgs.push(data[i].femaleProportion)


                            womanSum += data[i].femaleProportion
                            // }
                        }
                        this.detail.manOrgs = manOrgs
                        this.detail.womanOrgs = womanOrgs
                        let genderTxt51 = ''
                        if (JSON.stringify(manOrg) == JSON.stringify(womanOrg)) {
                            // 具体来看，男生和女生在各维度检出率一致，说明男女生心理健康问题相当，由高到低皆为**（**%）、**（**%）、**（**%）、**（**%）、**（**%）。
                            genderTxt51 += '具体来看，男生和女生在各维度检出率一致，说明男女生心理健康问题相当，由高到低皆为'
                            let manOrgSort = JSON.parse(JSON.stringify(manOrg)).sort((a, b) => {
                                return Number(b.percentage) - Number(a.percentage);
                            })
                            for (let i in manOrgSort) {
                                genderTxt51 += manOrgSort[i].grade + '（' + manOrgSort[i].percentage + '%）'
                                if (i < manOrgSort.length - 1) {
                                    genderTxt51 += '、'
                                } else {
                                    genderTxt51 += '。'
                                }
                            }
                        } else {
                            let cout1 = 0
                            let cout2 = 0
                            let cout3 = 0
                            let arr1 = []
                            let arr2 = []
                            let arr3 = []
                            for (let i in manOrg) {
                                for (let j in womanOrg) {
                                    if (manOrg[i].grade == womanOrg[j].grade) {
                                        if (manOrg[i].percentage - womanOrg[i].percentage > 0) {
                                            cout1++
                                            arr1.push(manOrg[j].grade)
                                        }
                                        if (womanOrg[i].percentage - manOrg[i].percentage > 0) {
                                            cout2++
                                            arr2.push(womanOrg[j].grade)
                                        }
                                        if (womanOrg[i].percentage == manOrg[i].percentage) {
                                            cout3++
                                            arr3.push(manOrg[j].grade)
                                        }
                                    }
                                }
                            }
                            if (cout1 == 5) {
                                // 具体来看，男生/女生在**（**%）、**（**%）、**（**%）、**（**%）和**（**%）五个维度上的检出率均高于女生/男生。
                                genderTxt51 += '具体来看，男生在'
                                let manOrgSort = JSON.parse(JSON.stringify(manOrg)).sort((a, b) => {
                                    return Number(b.percentage) - Number(a.percentage);
                                })
                                for (let i in manOrgSort) {
                                    genderTxt51 += manOrgSort[i].grade + '（' + manOrgSort[i].percentage + '%）'
                                    if (i < manOrgSort.length - 2) {
                                        genderTxt51 += '、'
                                    }
                                    if (i == manOrgSort.length - 2) {
                                        genderTxt51 += '和'
                                    }
                                }
                                genderTxt51 += '五个维度上的检出率均高于女生。'

                            } else if (cout2 == 5) {
                                // 具体来看，男生/女生在**（**%）、**（**%）、**（**%）、**（**%）和**（**%）五个维度上的检出率均高于女生/男生。
                                genderTxt51 += '具体来看，女生在'
                                let womanOrgSort = JSON.parse(JSON.stringify(womanOrg)).sort((a, b) => {
                                    return Number(b.percentage) - Number(a.percentage);
                                })
                                for (let i in womanOrgSort) {
                                    genderTxt51 += womanOrgSort[i].grade + '（' + womanOrgSort[i].percentage + '%）'
                                    if (i < womanOrgSort.length - 2) {
                                        genderTxt51 += '、'
                                    }
                                    if (i == womanOrgSort.length - 2) {
                                        genderTxt51 += '和'
                                    }
                                }
                                genderTxt51 += '五个维度上的检出率均高于男生。'

                            } else {
                                // 具体来看，男生（在**和**维度上的检出率高于女生，）（在**和**维度上的检出率与女生持平，）（在**和**维度上的检出率低于女生）。
                                genderTxt51 += '具体来看，男生'
                                if (cout1 > 0) {
                                    genderTxt51 += '在'
                                    for (let i in arr1) {
                                        genderTxt51 += arr1[i]
                                        if (i < arr1.length - 2) {
                                            genderTxt51 += '、'
                                        }
                                        if (i == arr1.length - 2) {
                                            genderTxt51 += '和'
                                        }
                                    }
                                    genderTxt51 += '维度上的检出率高于女生'
                                }
                                
                                if (cout2 == 0 && cout3 == 0 ) {
                                    genderTxt51 += '。'
                                } else {
                                    if (cout1 > 0) {
                                        genderTxt51 += '，'
                                    }
                                }


                                if (cout3 > 0) {
                                    genderTxt51 += '在'
                                    for (let i in arr3) {
                                        genderTxt51 += arr3[i]
                                        if (i < arr3.length - 2) {
                                            genderTxt51 += '、'
                                        }
                                        if (i == arr3.length - 2) {
                                            genderTxt51 += '和'
                                        }
                                    }
                                    genderTxt51 += '维度上的检出率与女生持平'
                                }
                                
                                if (cout2 == 0 && cout3 > 0) {
                                    genderTxt51 += '。'
                                } else {
                                    
                                    if (cout1 == 0 && cout3 == 0) {

                                    } else {
                                        if (cout3 == 0) {

                                        } else {
                                            if (cout2  > 0 ) {
                                                genderTxt51 += '，'
                                            }
                                            
                                        }
                                        
                                    }
                                }
                                if (cout2 > 0) {
                                    genderTxt51 += '在'
                                    for (let i in arr2) {
                                        genderTxt51 += arr2[i]
                                        if (i < arr2.length - 2) {
                                            genderTxt51 += '、'
                                        }
                                        if (i == arr2.length - 2) {
                                            genderTxt51 += '和'
                                        }
                                    }
                                    genderTxt51 += '维度上的检出率低于女生。'
                                }

                            }
                        }
                        this.detail.genderTxt51 = genderTxt51

                        man3 = man.sort((a, b) => {
                            return Number(b.percentage) - Number(a.percentage);
                        }).slice(0, 3)
                        woman3 = woman.sort((a, b) => {
                            return Number(b.percentage) - Number(a.percentage);
                        }).slice(0, 3)
                        let man3Str = []
                        for (let i in man3) {
                            man3Str.push(man3[i].grade)
                        }
                        let woman3Str = []
                        for (let i in woman3) {
                            woman3Str.push(woman3[i].grade)
                        }
                        let genderTxt5 = '男生在心理健康问题检出率的前三位为' + man3Str.join('、') + '；女生在心理健康问题检出率的前三位为' + woman3Str.join('、') + '。'
                        this.detail.genderTxt5 = genderTxt5


                        
                        let genderTxt = ''
                        if (manSum > womanSum) {
                            if (JSON.stringify(man3) == JSON.stringify(woman3)) {
                                genderTxt += '相较于女生，男生心理健康问题总体更加突出。'
                            } else {
                                genderTxt += '相较于女生，男生心理健康问题更加突出，且呈现更明显的'
                                let manCot = man3.concat(woman3)
                                let gArr3 = []
                                for (let i in manCot) {
                                    let gInfo3 = manCot[i].grade
                                    gArr3.push(gInfo3)
                                }
                                const counts = {};
                                for (const num of gArr3) {
                                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                                }
                                let count = 0
                                let sName = []
                                if (counts['抑郁'] == 1) {
                                    count++
                                    sName.push('抑郁')
                                }
                                if (counts['焦虑'] == 1) {
                                    count++
                                    sName.push('焦虑')
                                }
                                if (counts['强迫'] == 1) {
                                    count++
                                    sName.push('强迫')
                                }
                                if (counts['敌对'] == 1) {
                                    count++
                                    sName.push('敌对')
                                }
                                if (counts['自我伤害'] == 1) {
                                    count++
                                    sName.push('自我伤害')
                                }
                                genderTxt += sName.join('、')

                                genderTxt += '倾向。'
                            }
                        } else if (manSum < womanSum) {
                            if (JSON.stringify(man3) == JSON.stringify(woman3)) {
                                genderTxt += '相较于男生，女生心理健康问题总体更加突出。'
                            } else {
                                genderTxt += '相较于男生，女生心理健康问题更加突出，且呈现更明显的'
                                let manCot = man3.concat(woman3)
                                let gArr3 = []
                                for (let i in manCot) {
                                    let gInfo3 = manCot[i].grade
                                    gArr3.push(gInfo3)
                                }
                                const counts = {};
                                for (const num of gArr3) {
                                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                                }
                                let count = 0
                                let sName = []
                                if (counts['抑郁'] == 1) {
                                    count++
                                    sName.push('抑郁')
                                }
                                if (counts['焦虑'] == 1) {
                                    count++
                                    sName.push('焦虑')
                                }
                                if (counts['强迫'] == 1) {
                                    count++
                                    sName.push('强迫')
                                }
                                if (counts['敌对'] == 1) {
                                    count++
                                    sName.push('敌对')
                                }
                                if (counts['自我伤害'] == 1) {
                                    count++
                                    sName.push('自我伤害')
                                }
                                genderTxt += sName.join('、')

                                genderTxt += '倾向。'
                            }
                        } else {
                            if (JSON.stringify(man3) == JSON.stringify(woman3)) {
                                genderTxt += '男女生的心理健康问题相当。'
                            } else {
                                genderTxt += '男女生的心理健康问题相当，但'
                                let manCot = man3.concat(woman3)
                                let gArr3 = []
                                for (let i in manCot) {
                                    let gInfo3 = manCot[i].grade
                                    gArr3.push(gInfo3)
                                }
                                const counts = {};
                                for (const num of gArr3) {
                                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                                }
                                let count = 0
                                let sName = []
                                if (counts['抑郁'] == 1) {
                                    count++
                                    sName.push('抑郁')
                                }
                                if (counts['焦虑'] == 1) {
                                    count++
                                    sName.push('焦虑')
                                }
                                if (counts['强迫'] == 1) {
                                    count++
                                    sName.push('强迫')
                                }
                                if (counts['敌对'] == 1) {
                                    count++
                                    sName.push('敌对')
                                }
                                if (counts['自我伤害'] == 1) {
                                    count++
                                    sName.push('自我伤害')
                                }
                                let mstr3 = []
                                for (let i in sName) {
                                    if (JSON.stringify(man3).indexOf(sName[i]) != -1) {
                                        mstr3.push(sName[i])
                                    }
                                }
                                let wstr3 = []
                                for (let i in sName) {
                                    if (JSON.stringify(woman3).indexOf(sName[i]) != -1) {
                                        wstr3.push(sName[i])
                                    }
                                }
                                genderTxt += '男生呈现出更明显的' + mstr3.join('、')
                                genderTxt += '倾向，'
                                genderTxt += '女生呈现出更明显的' + mstr3.join('、')
                                genderTxt += '倾向。'
                            }
                        }
                        if (JSON.stringify(man3) == JSON.stringify(woman3)) {
                            genderTxt += '男女生心理健康问题检出率的前三位皆为'
                            for (let i in man3) {
                                genderTxt += man3[i].grade + '（' + man3[i].percentage + '%）'
                                if (i < man3.length - 1) {
                                    genderTxt += '、'
                                } else {
                                    genderTxt += '。'
                                }
                            }
                        } else {
                            if (manSum > womanSum) {
                                genderTxt += '男生心理健康问题检出率的前三位为'
                                for (let i in man3) {
                                    genderTxt += man3[i].grade + '（' + man3[i].percentage + '%）'
                                    if (i < man3.length - 2) {
                                        genderTxt += '、'
                                    }
                                    if (i == man3.length - 2) {
                                        genderTxt += '和'
                                    }
                                }
                                genderTxt += '；女生心理健康问题检出率的前三位为'
                                for (let i in woman3) {
                                    genderTxt += woman3[i].grade + '（' + woman3[i].percentage + '%）'
                                    if (i < woman3.length - 2) {
                                        genderTxt += '、'
                                    }
                                    if (i == woman3.length - 2) {
                                        genderTxt += '和'
                                    }
                                }
                                genderTxt += '。'
                            } else {
                                if (manSum > womanSum) {
                                    genderTxt += '；女生心理健康问题检出率的前三位为'
                                    for (let i in woman3) {
                                        genderTxt += woman3[i].grade + '（' + woman3[i].percentage + '%）'
                                        if (i < woman3.length - 2) {
                                            genderTxt += '、'
                                        }
                                        if (i == woman3.length - 2) {
                                            genderTxt += '和'
                                        }
                                    }
                                    genderTxt += '男生心理健康问题检出率的前三位为'
                                    for (let i in man3) {
                                        genderTxt += man3[i].grade + '（' + man3[i].percentage + '%）'
                                        if (i < man3.length - 2) {
                                            genderTxt += '、'
                                        }
                                        if (i == man3.length - 2) {
                                            genderTxt += '和'
                                        }
                                    }

                                    genderTxt += '。'
                                }
                            }


                        }

                        this.detail.gradeTxt4 = genderTxt

                        this.part4 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 性别健康百分比 不需要男女之分
            let param5 = {
                startDate: star,
                endDate: end,
                id: this.sList.schoolId
            };
            this.$http
                .post(Url + "/aimw/export/genderGroupHealthInfo", param5)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part5 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 学段健康百分比  不需要男女之分
            let param8 = {
                startDate: star,
                endDate: end,
                id: this.sList.schoolId
            };
            this.$http
                .post(Url + "/aimw/export/gradeGroupHealthInfo", param8)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part8 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        getDim7(param7, star, end) {
            this.$http
                .post(Url + "/aimw/export/gradeDimensionProportion", param7)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        let gradeWd = []
                        for (let i in data) {
                            data[i].classType = Number(i) + 1
                            data[i].grade = data[i].departmentName
                            data[i].name = data[i].departmentName
                            let iList = [
                                {
                                    name: '抑郁',
                                    numPer: {
                                        num: data[i].depressionNum,
                                        percent: data[i].depressionPercentage
                                    }
                                },
                                {
                                    name: '焦虑',
                                    numPer: {
                                        num: data[i].anxietyNum,
                                        percent: data[i].anxietyPercentage
                                    }
                                },
                                {
                                    name: '强迫',
                                    numPer: {
                                        num: data[i].forcedNum,
                                        percent: data[i].forcedPercentage
                                    }
                                },
                                {
                                    name: '敌对',
                                    numPer: {
                                        num: data[i].violenceNum,
                                        percent: data[i].violencePercentage
                                    }
                                },
                                {
                                    name: '自我伤害',
                                    numPer: {
                                        num: data[i].suicideNum,
                                        percent: data[i].suicidePercentage
                                    }
                                }
                            ]
                            let pList = [
                                {
                                    name: '抑郁',
                                    percent: data[i].depressionPercentage
                                },
                                {
                                    name: '焦虑',
                                    percent: data[i].anxietyPercentage
                                },
                                {
                                    name: '强迫',
                                    percent: data[i].forcedPercentage
                                },
                                {
                                    name: '敌对',
                                    percent: data[i].violencePercentage
                                },
                                {
                                    name: '自我伤害',
                                    percent: data[i].suicidePercentage
                                }
                            ]
                            for (let j in pList){
                                pList[j] = this.replaceNullsWithZero(pList[j])
                            }
                            data[i].pList = pList
                            data[i].info = iList.sort((a, b) => {
                                return Number(b.numPer.percent) - Number(a.numPer.percent);
                            });
                            gradeWd.push(data[i])
                        }
                        let strList = []
                        for (let i in gradeWd) {
                            strList.push(JSON.stringify(gradeWd[i].pList))
                        }
                        let a1 = this.areAllValuesEqual(strList)
                        let aTxt1 = ''
                        let aTxt2 = ''
                        if (a1) { //若各个学段各维度检出率完全一致
                            // 第三段--第1句--若各个学段各维度检出率完全一致则输出：
                            aTxt1 += "所有学段在抑郁、焦虑、强迫、敌对、自我伤害维度上的表现相同，检出率由高到低分别是："
                            let info2 = JSON.parse(JSON.stringify(gradeWd[0].info)).sort((a, b) => {
                                return Number(b.numPer.percent) - Number(a.numPer.percent);
                            });
                            for (let i in info2) {
                                aTxt1 += info2[i].name + '（' + info2[i].numPer.percent + '%）'
                                if (i < info2.length - 1) {
                                    aTxt1 += '、'
                                } else {
                                    aTxt1 += '。'
                                }
                            }
                            // 第三段--第2句--若各个学段各维度检出率完全一致，则输出检出率由高到低的前三个维度。
                            
                            let info3 = info2.slice(0, 3)
                            if (info3[0].numPer.percent > 0) {
                                aTxt2 += '其中，'
                                let info30 = []
                                for (let i in info3) {
                                    if (info3[i].numPer.percent > 0) {
                                        info30.push(info3[i])
                                    }
                                    
                                    
                                }
                                for (let i in info30) {
                                    aTxt2 += info30[i].name
                                    if (i < info30.length - 2) {
                                        aTxt2 += '、'
                                    }
                                    if (i == info30.length - 2) {
                                        aTxt2 += '和'
                                    }
                                }
                                
                                aTxt2 += '问题在所有学段上都比较突出。'
                            }
                            

                        } else {//若各个学段各维度检出率不完全一致

                            // 第一种情况，先取四个一样的

                            // let gArr4 = []
                            let gArr3 = []
                            for (let i in gradeWd) {
                                // gradeWd[i].info4 = gradeWd[i].info.slice(0,4)
                                gradeWd[i].info3 = gradeWd[i].info.slice(0, 3)
                                // for (let j in gradeWd[i].info4) {
                                //     let gInfo4 = gradeWd[i].info4[j].name
                                //     gArr4.push(gInfo4)
                                // }
                                for (let j in gradeWd[i].info3) {
                                    let gInfo3 = gradeWd[i].info3[j].name
                                    gArr3.push(gInfo3)
                                }
                            }
                            const counts = {};
                            for (const num of gArr3) {
                                counts[num] = counts[num] ? counts[num] + 1 : 1;
                            }
                            let count = 0
                            let sName = []
                            if (counts['抑郁'] == 3) {
                                count++
                                sName.push('抑郁')
                            }
                            if (counts['焦虑'] == 3) {
                                count++
                                sName.push('焦虑')
                            }
                            if (counts['强迫'] == 3) {
                                count++
                                sName.push('强迫')
                            }
                            if (counts['敌对'] == 3) {
                                count++
                                sName.push('敌对')
                            }
                            if (counts['自我伤害'] == 3) {
                                count++
                                sName.push('自我伤害')
                            }
                            this.countElements(gArr3)
                            if (count > 2) {
                                // 若各个学段各维度检出率不完全一致，检出率由高到低前三位维度中完全相同（相同维度数=3），则输出：
                                aTxt2 += sName.join('、')
                                aTxt2 += '在各学段上的问题都比较突出。'
                                for (let m in gradeWd) {
                                    aTxt2 += gradeWd[m].grade
                                    aTxt2 += '检出率由高到低前三位分别为'
                                    for (let n in gradeWd[m].info3) {
                                        aTxt2 += gradeWd[m].info3[n].name + '（' + gradeWd[m].info3[n].numPer.percent + '%）'
                                        if (n < gradeWd[m].info3.length - 1) {
                                            aTxt2 += '、'
                                        }
                                    }
                                    if (m < gradeWd.length - 1) {
                                        aTxt2 += '；'
                                    } else {
                                        aTxt2 += '。'
                                    }
                                }
                            } else if (count == 2) {
                                // 若各个学段检出率不完全一致，由高到低前三位维度中有相同维度（相同维度数=2），则按年级由低到高相应输出：
                                aTxt2 += sName.join('、')
                                aTxt2 += '在各学段上的问题都比较突出。除'
                                aTxt2 += sName.join('、')
                                aTxt2 += '问题外，'
                                for (let m in gradeWd) {
                                    aTxt2 += gradeWd[m].departmentName
                                    let info31 = []
                                    for (let n in gradeWd[m].info3) {
                                        if (sName.join('、').indexOf(gradeWd[m].info3[n].name) == -1) {
                                            info31.push(gradeWd[m].info3[n].name)
                                        }
                                    }
                                    aTxt2 += info31.join('和')
                                    if (m < 1) {
                                        aTxt2 += '问题相对突出'
                                    }
                                    if (m == 1) {
                                        aTxt2 += '问题比例有所提升'
                                    }
                                    if (m > 1) {
                                        aTxt2 += '问题显现'
                                    }
                                    if (m < gradeWd.length - 1) {
                                        aTxt2 += '，'
                                    } else {
                                        aTxt2 += '。'
                                    }
                                }
                            } else if (count == 1) {
                                // 若各个学段检出率不完全一致，由高到低前三位维度中有相同维度（相同维度数=2），则按年级由低到高相应输出：
                                aTxt2 += sName.join('、')
                                aTxt2 += '在各学段上的问题都比较突出。除'
                                aTxt2 += sName.join('、')
                                aTxt2 += '问题外，'
                                for (let m in gradeWd) {
                                    aTxt2 += gradeWd[m].departmentName
                                    let info31 = []
                                    for (let n in gradeWd[m].info3) {
                                        if (sName.join('、').indexOf(gradeWd[m].info3[n].name) == -1) {
                                            info31.push(gradeWd[m].info3[n].name)
                                        }
                                    }
                                    aTxt2 += info31.join('和')
                                    if (m < 1) {
                                        aTxt2 += '问题相对突出'
                                    }
                                    if (m == 1) {
                                        aTxt2 += '问题比例有所提升'
                                    }
                                    if (m > 1) {
                                        aTxt2 += '问题显现'
                                    }
                                    if (m < gradeWd.length - 1) {
                                        aTxt2 += '，'
                                    } else {
                                        aTxt2 += '。'
                                    }
                                }
                            } else {
                                // 若各个学段检出率不完全一致，由高到低前三位维度中相同维度数为0，则按年级由低到高相应输出：

                                for (let m in gradeWd) {
                                    aTxt2 += gradeWd[m].departmentName
                                    for (let n in gradeWd[m].info3) {
                                        aTxt2 += gradeWd[m].info3[n].name
                                        if (n < gradeWd[m].info3.length - 2) {
                                            aTxt2 += '、'
                                        }
                                        if (n == gradeWd[m].info3.length - 2) {
                                            aTxt2 += '和'
                                        }
                                    }
                                    if (m < 1) {
                                        aTxt2 += '问题相对突出'
                                    }
                                    if (m == 1) {
                                        aTxt2 += '问题比例有所提升'
                                    }
                                    if (m > 1) {
                                        aTxt2 += '问题显现'
                                    }
                                    if (m < gradeWd.length - 1) {
                                        aTxt2 += '，'
                                    } else {
                                        aTxt2 += '。'
                                    }
                                }
                            }


                            // 第三段--第1句--若各个学段各维度任一检出率不一致则输出：
                            aTxt1 = "不同学段学生在心理健康问题上表现出不同的特点，"
                        }
                        this.detail.gradeTxt1 = aTxt1
                        this.detail.gradeTxt2 = aTxt2
                        this.detail.gradeListOrg = JSON.parse(JSON.stringify(data))
                        let gradeTxtOrg = ''
                        for (let i in this.detail.gradeListOrg) {
                            
                            // this.detail.gradeListOrg[i] = this.replaceNullsWithZero(this.detail.gradeListOrg[i])
                            let orgArr = this.detail.gradeListOrg[i]
                            let pLists = JSON.parse(JSON.stringify(orgArr.pList)).sort((a, b) => {
                                return Number(b.percent) - Number(a.percent);
                            });
                            gradeTxtOrg += orgArr.grade + '测评维度检出率由高到低分别为：'
                            for (let j in pLists) {
                                gradeTxtOrg += pLists[j].name + '（' + pLists[j].percent + '%）'
                                if (j < pLists.length - 1) {
                                    gradeTxtOrg += '、'
                                }
                            }
                            if (i < this.detail.gradeListOrg.length - 1) {
                                gradeTxtOrg += '；'
                            } else {
                                gradeTxtOrg += '。'
                            }
                        }
                        this.detail.gradeTxtOrg = gradeTxtOrg
                        // 预备年级测评维度检出率由高到低分别为：焦虑（36.1%）、抑郁（23.0%）、敌对（21.6%）、自我伤害（17.4%）、强迫（17.2%）；初中一年级测评维度检出率由高到低分别为：焦虑（28.0%）、抑郁（24.4%）、自我伤害（20.2%）、敌对（16.1%）、强迫（15.4%）；高中一年级测评维度检出率由高到低分别为：焦虑（31.9%）、抑郁（24.3%）、自我伤害（20.7%）、强迫（18.8%）、敌对（18.6%）。
                        let gradeListTain = JSON.parse(JSON.stringify(data))
                        gradeListTain = gradeListTain
                        let gradeAllArr = []
                        for (let i in gradeListTain) {
                            gradeAllArr.push({
                                orgId: gradeListTain[i].department,
                                name: gradeListTain[i].name,
                                wdList: gradeListTain[i].pList,
                                csList: [],
                                csListz: []
                            })
                            // this.gradeAllList[i].wdList = gradeListTain[i].pList
                            // gradeListTain[i].csList = gradeListTain[i].pList
                        }
                        this.gradeAllList = gradeAllArr
                        // return
                        // let gradeAllTxt1 = ''
                        // gradeAllTxt1 += '与全国常模相比，'
                        // 与全国常模相比，预备年级/**年级学生（第一句）在强迫、自我伤害方面表现较好，（第二句：在**方面与全国常模持平，）（第三句）在敌对、抑郁和焦虑方面有待改善，分别超出全国常模 6.3%、 3.1%。
                        // 与全国常模相比，初中一年级学生（第一句）在强迫、自我伤害、敌对和焦虑方面表现较好。（第二句：在**方面与全国常模持平，）(第三句）在抑郁方面有待改善，超出全国常模 4.5%。
                        for (let i in this.gradeAllList) {
                            let wdList = gradeListTain[i].pList

                            let allTxt = '与全国常模相比，'
                            allTxt += this.gradeAllList[i].name + '学生'
                            let allCont0 = 0 //大于
                            let allCont1 = 0 //等于
                            let allCont2 = 0 //小于
                            for (let j in wdList) {
                                wdList[j].percentNo = Number(Math.abs(wdList[j].percent - this.ChinaCM[j]).toFixed(1))
                                wdList[j].percentNum = Number(wdList[j].percent - this.ChinaCM[j]).toFixed(1)
                                if (wdList[j].percent > this.ChinaCM[j]) {
                                    allCont0++
                                }
                                if (wdList[j].percent == this.ChinaCM[j]) {
                                    allCont1++
                                }
                                if (wdList[j].percent < this.ChinaCM[j]) {
                                    allCont2++
                                }
                            }
                            let percentArr = JSON.parse(JSON.stringify(wdList)).sort((a, b) => {
                                return Number(b.percentNo) - Number(a.percentNo);
                            }).slice(0, 3);
                            if (allCont0 == 5) { //都大于全国
                                allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面均有待改善，其中，'
                                allTxt += percentArr[0].name + '、' + percentArr[1].name + '和' + percentArr[2].name + '超出全国常模相对较多，分别为' + percentArr[0].percentNo + '%、' + percentArr[1].percentNo + '%和' + percentArr[2].percentNo + '%。'
                            } else if (allCont1 == 5) { //都等于全国
                                allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面都与全国常模持平，本年级心理健康问题与全国状况大致相当。'
                            } else if (allCont2 == 5) { //都小于全国
                                // allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面均表现比较好，其中，**、**和**低于全国常模相对较多，分别为**%、**%和%。'
                                allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面均表现比较好，其中，'

                                allTxt += percentArr[0].name + '、' + percentArr[1].name + '和' + percentArr[2].name + '低于全国常模相对较多，分别为' + percentArr[0].percentNo + '%、' + percentArr[1].percentNo + '%和' + percentArr[2].percentNo + '%。'
                            } else {
                                let d0 = [] //高
                                let d01 = [] //高
                                let d1 = [] //等于
                                let d2 = [] //低
                                for (let j in wdList) {
                                    if (wdList[j].percentNum > 0) {
                                        d0.push(wdList[j].name)
                                        d01.push(wdList[j].percentNo + '%')
                                    }
                                    if (wdList[j].percentNum == 0) {
                                        d1.push(wdList[j].name)
                                    }
                                    if (wdList[j].percentNum < 0) {
                                        d2.push(wdList[j].name)
                                    }
                                }
                                if (d2.length > 0) {
                                    allTxt += '在' + d2.join('、') + '方面表现较好'
                                }
                                if (d1.length == 0 && d0.length == 0 ) {
                                    allTxt += '。'
                                } else {
                                    if (d2.length > 0) {
                                        allTxt += '，'
                                    }
                                }

                                if (d1.length > 0) {
                                    allTxt += '在' + d1.join('、') + '在方面与全国常模持平'
                                }
                                
                                

                                
                                if (d0.length == 0 && d1.length > 0) {
                                    allTxt += '。'
                                } else {
                                    if (d2.length == 0 && d1.length == 0) {

                                    } else {
                                        if (d1.length == 0) {

                                        } else {
                                            if (d0.length  > 0 ) {
                                                allTxt += '，'
                                            }
                                            
                                        }
                                        
                                    }
                                    
                                }
                                if (d0.length > 0) {
                                    allTxt += '在' + d0.join('、') + '在方面有待改善，（分别）超出全国常模' + d01.join('、') + '。'
                                }

                            }
                            this.gradeAllList[i].allTxt0 = allTxt
                            //     if (this.gradeAllList[i].name.indexOf('初中') != -1) {

                            //     } else {

                            //     }

                        }
                        for (let i in this.gradeAllList) {
                            let wdList = gradeListTain[i].pList

                            let allTxt = '与本校常模相比，'
                            allTxt += this.gradeAllList[i].name + '学生'
                            let allCont0 = 0 //大于
                            let allCont1 = 0 //等于
                            let allCont2 = 0 //小于
                            for (let j in wdList) {
                                wdList[j].percentNo = Number(Math.abs(wdList[j].percent - this.schoolCM[j]).toFixed(1))
                                wdList[j].percentNum = Number(wdList[j].percent - this.schoolCM[j]).toFixed(1)
                                if (wdList[j].percent > this.schoolCM[j]) {
                                    allCont0++
                                }
                                if (wdList[j].percent == this.schoolCM[j]) {
                                    allCont1++
                                }
                                if (wdList[j].percent < this.schoolCM[j]) {
                                    allCont2++
                                }
                            }
                            let percentArr = JSON.parse(JSON.stringify(wdList)).sort((a, b) => {
                                return Number(b.percentNo) - Number(a.percentNo);
                            }).slice(0, 3);
                            if (allCont0 == 5) { //都大于全国
                                allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面均有待改善，其中，'
                                allTxt += percentArr[0].name + '、' + percentArr[1].name + '和' + percentArr[2].name + '超出本校常模相对较多，分别为' + percentArr[0].percentNo + '%、' + percentArr[1].percentNo + '%和' + percentArr[2].percentNo + '%。'
                            } else if (allCont1 == 5) { //都等于全国
                                allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面都与本校常模持平，本年级心理健康问题与本校状况大致相当。'
                            } else if (allCont2 == 5) { //都小于全国
                                // allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面均表现比较好，其中，**、**和**低于全国常模相对较多，分别为**%、**%和%。'
                                allTxt += '在抑郁、焦虑、强迫、敌对、自我伤害方面均表现比较好，其中，'
                                allTxt += percentArr[0].name + '、' + percentArr[1].name + '和' + percentArr[2].name + '低于本校常模相对较多，分别为' + percentArr[0].percentNo + '%、' + percentArr[1].percentNo + '%和' + percentArr[2].percentNo + '%。'
                            } else {
                                let d0 = [] //高
                                let d01 = [] //高
                                let d1 = [] //等于
                                let d2 = [] //低
                                for (let j in wdList) {
                                    if (wdList[j].percentNum > 0) {
                                        d0.push(wdList[j].name)
                                        d01.push(wdList[j].percentNo + '%')
                                    }
                                    if (wdList[j].percentNum == 0) {
                                        d1.push(wdList[j].name)
                                    }
                                    if (wdList[j].percentNum < 0) {
                                        d2.push(wdList[j].name)
                                    }
                                }
                                if (d2.length > 0) {
                                    allTxt += '在' + d2.join('、') + '方面表现较好，'
                                }
                                if (d1.length > 0) {
                                    allTxt += '在' + d1.join('、') + '在方面与本校常模持平'
                                }
                                if (d0.length == 0) {
                                    allTxt += '。'
                                } else {
                                    if (d2.length == 0) {
                                        allTxt += '，'
                                    }
                                }
                                if (d0.length > 0) {
                                    allTxt += '在' + d0.join('、') + '在方面有待改善，（分别）超出本校常模' + d01.join('、') + '。'
                                }

                            }
                            this.gradeAllList[i].allTxt1 = allTxt

                        }
                        // 各年级各班级各维度检出率情况(根据code X,C,G) 不需要男女之分
                        let param6 = {
                            startDate: star,
                            endDate: end,
                            id: this.sList.schoolId
                        };
                        this.getDim6(param6)
                        this.part7 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        getDim6(param6) {
            this.$http
                .post(Url + "/aimw/export/gradeClassDimensionProportion", param6)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        for (let i in data) {
                            data[i].name = data[i].departmentName
                            for (let j in this.gradeAllList) {
                                if (data[i].orgId == this.gradeAllList[j].orgId) {
                                    this.gradeAllList[j].csList.push(data[i])
                                }
                            }
                        }
                        for (let i in this.gradeAllList) {
                            let cList = this.gradeAllList[i].csList
                            let yyArr = []
                            let jlArr = []
                            let qpArr = []
                            let ddArr = []
                            let zwshArr = []
                            for (let j in cList) {

                                yyArr.push(
                                    {
                                        name: cList[j].departmentName,
                                        num: cList[j].depressionNum,
                                        percent: cList[j].depressionPercentage,
                                        nj: this.gradeAllList[i].wdList[0].percent,
                                        qg: this.ChinaCM[0],
                                        njFlag: cList[j].depressionPercentage > this.gradeAllList[i].wdList[0].percent ? true : false,
                                        qgFlag: cList[j].depressionPercentage > this.ChinaCM[0] ? true : false,
                                    }
                                )
                                jlArr.push(
                                    {
                                        name: cList[j].departmentName,
                                        num: cList[j].anxietyNum,
                                        percent: cList[j].anxietyPercentage,
                                        nj: this.gradeAllList[i].wdList[1].percent,
                                        qg: this.ChinaCM[1],
                                        njFlag: cList[j].anxietyPercentage > this.gradeAllList[i].wdList[1].percent ? true : false,
                                        qgFlag: cList[j].anxietyPercentage > this.ChinaCM[1] ? true : false,
                                    }
                                )
                                qpArr.push(
                                    {
                                        name: cList[j].departmentName,
                                        num: cList[j].forcedNum,
                                        percent: cList[j].forcedPercentage,
                                        nj: this.gradeAllList[i].wdList[2].percent,
                                        qg: this.ChinaCM[2],
                                        njFlag: cList[j].forcedPercentage > this.gradeAllList[i].wdList[2].percent ? true : false,
                                        qgFlag: cList[j].forcedPercentage > this.ChinaCM[2] ? true : false,
                                    }
                                )
                                ddArr.push(
                                    {
                                        name: cList[j].departmentName,
                                        num: cList[j].violenceNum,
                                        percent: cList[j].violencePercentage,
                                        nj: this.gradeAllList[i].wdList[3].percent,
                                        qg: this.ChinaCM[3],
                                        njFlag: cList[j].violencePercentage > this.gradeAllList[i].wdList[3].percent ? true : false,
                                        qgFlag: cList[j].violencePercentage > this.ChinaCM[3] ? true : false,
                                    }
                                )
                                zwshArr.push(
                                    {
                                        name: cList[j].departmentName,
                                        num: cList[j].suicideNum,
                                        percent: cList[j].suicidePercentage,
                                        nj: this.gradeAllList[i].wdList[4].percent,
                                        qg: this.ChinaCM[4],
                                        njFlag: cList[j].suicidePercentage > this.gradeAllList[i].wdList[4].percent ? true : false,
                                        qgFlag: cList[j].suicidePercentage > this.ChinaCM[4] ? true : false,
                                    }
                                )
                            }
                            this.gradeAllList[i].cwdList = [yyArr, jlArr, qpArr, ddArr, zwshArr]
                            this.gradeAllList[i].cwdName = ['', '', '', '', '']
                            this.gradeAllList[i].className = []
                            for (let m in this.gradeAllList[i].cwdList) {
                                let classArr = this.gradeAllList[i].cwdList[m]
                                let nameStr = []
                                for (let n in classArr) {
                                    if (classArr[n].njFlag || classArr[n].qgFlag) {
                                        if (classArr[n].njFlag && classArr[n].qgFlag) {
                                            nameStr.push(classArr[n].name + '*')
                                            this.gradeAllList[i].className.push(classArr[n].name)
                                        } else {
                                            nameStr.push(classArr[n].name)
                                        }

                                    }
                                }
                                this.gradeAllList[i].cwdName[m] = nameStr.join('、')
                            }
                            let classArrx = this.gradeAllList[i].className
                            for (let l in this.gradeAllList[i].csList) {
                                this.gradeAllList[i].csList[l].nameFlag = false
                                for (let o in classArrx) {

                                    
                                    if (this.gradeAllList[i].csList[l].departmentName == classArrx[o]) {
                                        this.gradeAllList[i].csList[l].nameFlag = true
                                        this.gradeAllList[i].csListz.push(this.gradeAllList[i].csList[l])
                                    }
                                }
                            }

                        }
                        this.genderQuestion(param6.startDate, param6.endDate)
                        this.part6 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });

        },
        replaceNullsWithZero(obj) {
            Object.keys(obj).forEach(key => {
                if (obj[key] === null) {
                    obj[key] = 0;
                }
            });
            return obj;
        },
        genderQuestion(star, end) {
            let that = this
            
            // 预备年级不同性别测评情况
            //重点关注人员名单
            let param9 = {
                startDate: star,
                endDate: end,
                id: this.sList.schoolId
            }

            this.$http
                .post(Url + "/aimw/export/serverCrowdList", param9)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        for (let i in this.gradeAllList) {
                            for (let j in data){
                                if (data[j].code == this.gradeAllList[i].name) {
                                    this.gradeAllList[i].gradeObj = data[j]
                                }
                            }
                            
                        }

                        this.gradeFjList = data
                        this.$forceUpdate()
                        this.part9 = true;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            let allNum = 0
            for (let i in this.gradeAllList) {
                let gradeLists = this.gradeAllList[i]
                // 男
                let paramNan = {
                    code: 1,
                    startDate: star,
                    endDate: end,
                    id: gradeLists.orgId,
                    gender: 1
                };
                this.$http
                    .post(Url + "/aimw/export/dimensionProportion", paramNan)
                    .then(res => {
                        let data = res.data.data;
                        if (res.data.code == 0) {
                            if (data.length == 0) {
                                data = [
                                    {
                                        gender:"男",
                                        grade:"抑郁",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"男",
                                        grade:"焦虑",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"男",
                                        grade:"强迫",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"男",
                                        grade:"敌对",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"男",
                                        grade:"自我伤害",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    }
                                ]
                            }
                            let datas = JSON.parse(JSON.stringify(data))
                            for (let i in datas) {
                                if (datas[i].grade == '抑郁') {
                                    data[0] = datas[i]
                                }
                                if (datas[i].grade == '焦虑') {
                                    data[1] = datas[i]
                                }
                                if (datas[i].grade == '强迫') {
                                    data[2] = datas[i]
                                }
                                if (datas[i].grade == '敌对') {
                                    data[3] = datas[i]
                                }
                                if (datas[i].grade == '自我伤害') {
                                    data[4] = datas[i]
                                }
                            }
                            let nanList = []
                            // let nanTxt = ''
                            for (let i in data) {
                                data[i] = this.replaceNullsWithZero(data[i])
                                let nanTxt = '在' + data[i].grade + '维度中，男生正常人数为' + data[i].normalNum + '人（' + data[i].normalProportion + '%），轻度问题为' + data[i].mildNum + '人（' + data[i].mildProportion + '%），中度问题为' + data[i].moderateNum + '人（' + data[i].moderateProportion + '%），重度问题为' + data[i].severeNum + '人（' + data[i].severeProportion + '%）；'
                                nanList.push(nanTxt)
                            }
                            this.gradeAllList[i].gradeNan = nanList
                            this.gradeAllList[i].gradeNanData = data
                            
                            this.$forceUpdate()
                            allNum++
                            this.partNum = allNum
                            // this.part91 = true

                        } else {
                            this.$message.error(data.msg);
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    });
                // 女
                let paramNv = {
                    code: 1,
                    startDate: star,
                    endDate: end,
                    id: gradeLists.orgId,
                    gender: 0
                };
                this.$http
                    .post(Url + "/aimw/export/dimensionProportion", paramNv)
                    .then(res => {
                        let data = res.data.data;
                        if (res.data.code == 0) {
                            if (data.length == 0) {
                                data = [
                                    {
                                        gender:"女",
                                        grade:"抑郁",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"女",
                                        grade:"焦虑",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"女",
                                        grade:"强迫",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"女",
                                        grade:"敌对",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    },
                                    {
                                        gender:"女",
                                        grade:"自我伤害",
                                        mildNum:0,
                                        mildProportion:0,
                                        moderateNum:0,
                                        moderateProportion:0,
                                        normalNum:0,
                                        normalProportion:0,
                                        severeNum:0,
                                        severeProportion:0,
                                        total:0
                                    }
                                ]
                            }
                            let datas = JSON.parse(JSON.stringify(data))
                            for (let i in datas) {
                                if (datas[i].grade == '抑郁') {
                                    data[0] = datas[i]
                                }
                                if (datas[i].grade == '焦虑') {
                                    data[1] = datas[i]
                                }
                                if (datas[i].grade == '强迫') {
                                    data[2] = datas[i]
                                }
                                if (datas[i].grade == '敌对') {
                                    data[3] = datas[i]
                                }
                                if (datas[i].grade == '自我伤害') {
                                    data[4] = datas[i]
                                }
                            }
                            let nvList = []
                            // let nanTxt = ''
                            for (let i in data) {
                                data[i] = this.replaceNullsWithZero(data[i])
                                let nvTxt = '女生正常人数为' + data[i].normalNum + '人（' + data[i].normalProportion + '%），轻度问题为' + data[i].mildNum + '人（' + data[i].mildProportion + '%），中度问题为' + data[i].moderateNum + '人（' + data[i].moderateProportion + '%），重度问题为' + data[i].severeNum + '人（' + data[i].severeProportion + '%）。'
                                nvList.push(nvTxt)
                            }
                            this.gradeAllList[i].gradeNv = nvList
                            this.gradeAllList[i].gradeNvData = data
                            this.$forceUpdate()
                            allNum++
                            this.partNum = allNum

                        } else {
                            this.$message.error(data.msg);
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    });
            }
            
            
        },
        extractBetween(str, startChar, endChar) {
            const regex = new RegExp(`${startChar}(.*?)${endChar}`);
            const match = str.match(regex);
            return match ? match[1] : '';
        },
        schoolReport() {
            console.log('导出团体报告')
            let that = this;
            this.pTimeFlag1 = false;
            this.reportFlag1 = false;
            this.reportName1 = ''
            this.partsForm1 = {
                time: ''
            }
            this.dialogPartFrame1 = true
            // this.getSchoolInfo()
        },
        handleExport() {
            let pdf = new PdfLoader(
                document.querySelector("#overviewpage"),
                this.schoolName + "中小学生心理健康筛查评估报告",
                "noSplitBox",
                this.loading,
                1
                // document.querySelector("#overviewNew"),
                // [document.querySelector("#viewImage1"), document.querySelector("#viewImage2"), document.querySelector("#viewImage3"),document.querySelector("#viewImage4")]
            );
            pdf.outPutPdfFn();
            this.muluPage = pdf.muluPage
            this.muluEmptyPage = pdf.muluEmptyPage
            for (let i in this.muluList) {
                this.muluList[i].page = pdf.muluPage[i] - this.muluEmptyPage + 1
            }
        },
    },
};
</script>
<style lang="less">
.yy_txt {
    font-size: 20px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #333E75;
    text-indent: 40px;
    padding: 2px 0;
    line-height: 30px;

}
</style>
<style lang="less" scoped>
.group-class {
    background: #ffffff;
    height: auto;
    width: 1200px;
    margin: 0 auto;

    .download {
        background: #8a7e7d;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        cursor: pointer;
        position: fixed;
        bottom: 0;
        right: 0;
    }

    .downloads {
        background: #ffffff;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        cursor: pointer;
        // position: fixed;
        // bottom: 0;
        // right: 0;
    }

    .group_box {

        // transform: scale(0.8);
        width: 100%;
        background: #fff;
        margin: 0 auto;
        height: auto;

        .group_style {
            // width: 1190px;
            margin: 0 auto;
            border-collapse: collapse;

            text-align: center;
            position: relative;

            // background: #f00;
            .table-border {
                position: relative;
                // width: 1191px;
                height: 1680px;
            }

            .shui_bg {
                position: absolute;
                margin: auto;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                width: 944px;
                height: 712px;
            }

            // .shui_bg1 {
            //     position: absolute;
            //     margin: auto;
            //     left: -450px;
            //     top: 100px;
            //     width: 2048px;
            //     height: 1546px;
            // }


            .g1_top {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 170px;

                img {
                    width: 136px;
                    height: auto;
                    margin-right: 20px;
                }

                span {
                    font-size: 68px;
                    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                    font-weight: bold;
                    color: #333E75;
                    line-height: 1;
                }
            }

            .g1_top1 {
                text-align: center;
                font-size: 52px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333E75;
                line-height: 1;
                margin: 50px auto;
            }

            .g2_top1 {
                position: absolute;
                width: 100%;
                // padding-top: 1100px;
                bottom: 120px;
                text-align: center;
                font-size: 32px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333E75;
                line-height: 1;
            }


        }

        .list {
            width: 1100px;
            // height: 100px;
            // line-height: 36px;
            background: rgb(111, 204, 198);
            color: #fff;
            margin: 0 auto;
        }
    }

}

table {
    width: 100%;
    margin: 0 auto 10px;

    tr {
        border: 1px solid #333E75;

        th {
            border: 1px solid #333E75;
            border-right: 0;

            text-align: center;
            font-size: 20px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 500;
            color: #333E75;
            padding: 3px 5px;
            //border-top: 0;
        }

        th:last-child {
            border-right: 1px solid #333E75;
        }

        td {
            border: 1px solid #333E75;
            border-right: 0;
            // border-top: 0;

            padding: 3px 5px;
            text-align: center;
            font-size: 18px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #333E75;
        }

        td:last-child {
            border-right: 1px solid #333E75;
        }
    }

}

.cm_table {
    width: 80%;

    tr {
        th {
            line-height: 1
        }

        td {
            line-height: 1;
        }
    }
}

.j_table {
    width: 100%;
    margin: 0 auto 30px;

    li {
        border-left: 1px solid #333E75;
        display: flex;

        div {
            border: 1px solid #333E75;
            border-right: 0;
            padding: 10px 5px;
            text-align: center;
            font-size: 20px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #333E75;
            display: flex;
            align-items: center;

            // flex: 1;
        }

        div:nth-child(1) {
            width: 15%;
            justify-content: center;
            border-left: 0;
        }

        div:nth-child(2) {
            width: 13.5%;
            justify-content: center;
            // text-align: left;
        }

        div:last-child {
            flex: 1;

            text-align: left;
            border-right: 1px solid #333E75;
        }

        .j_th {
            font-size: 22px;
            font-weight: 500;
        }


    }

}
</style>
<style lang="less" scoped>
.group-class {
    .group_box {
        #viewImage1, #viewImage2, #viewImage3, #viewImage4{
            background: #ffffff;
        }
        .ml_box {
            text-align: left;
            padding: 0 50px 30px;

            .ml_p {
                // display: flex;
                font-size: 38px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 500;
                color: #333E75;
                text-align: center;
                padding-top: 30px;
                padding-bottom: 30px;
            }

            .ml_p0 {
                // display: flex;

                padding-top: 6px;
                padding-bottom: 6px;
                display: flex;
                justify-content: space-between;

                div {
                    font-size: 20px;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #333E75;

                }

                .ml_li {
                    flex: 1;
                    border-bottom: 2px dashed #333E75;
                    margin: 0 10px 13px;
                }
            }

            .pl30 {
                padding-left: 30px
            }

            .pl60 {
                padding-left: 60px
            }

            .pl90 {
                padding-left: 90px
            }
        }

        .legends {
            position: relative;

            .c_legend {
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                right: 150px;
                height: 100px;

                div {
                    display: flex;
                    align-items: center;

                    span {
                        height: 0;
                        width: 20px;

                        border-bottom: 2px solid #ff8e00;
                        margin-right: 6px;
                    }

                    span:last-child {
                        height: auto;
                        border: 0;
                        width: 120px;
                        border: 0;
                        font-size: 14px;
                        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                        font-weight: 400;
                        color: #333E75;
                    }
                }

                div:last-child {
                    span {
                        border-bottom: 2px dashed #0d7ce4;
                    }

                    span:last-child {
                        border: 0;
                    }
                }
            }

            .c_legend1 {

                div {
                    span {
                        border-bottom: 2px solid #ff8e00;
                    }
                }

                div:nth-child(2) {
                    span {
                        border-bottom: 2px dashed #0d7ce4;
                    }

                    span:last-child {
                        border: 0;
                    }
                }

                div:last-child {
                    span {
                        border-bottom: 2px dashed #c2361f;
                    }
                }
            }
        }

        .noSplitBox1 {

            // position: relative;
            .c_legend {
                position: unset;
                // margin: auto;
                // top: 0;
                // bottom: 0;
                // right: 0;
                // left: 0;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: center;

                div {
                    display: flex;
                    align-items: center;
                    margin: 0 20px;

                    span {
                        height: 10px;
                        width: 10px;
                        border-radius: 50%;
                        background: #8ACBFF;
                        border: 0;
                        // border-bottom: 2px solid #ff8e00;
                        margin-right: 6px;
                    }

                    span:last-child {
                        height: auto;
                        border: 0;
                        width: auto;
                        background: transparent;
                        border: 0;
                        font-size: 16px;
                        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                        font-weight: 400;
                        color: #333E75;
                    }
                }

                div:nth-child(2) {
                    span {
                        background: #FFDDA0;
                        border: 0;
                    }

                    span:last-child {
                        background: transparent;
                        border: 0;
                    }
                }

                div:last-child {
                    span {
                        background: #FE9D9D;
                        border: 0;
                    }

                    span:last-child {
                        background: transparent;
                        border: 0;
                    }
                }
            }
        }

        .yy_box {
            text-align: left;
            padding: 20px 40px 20px;

            img {
                display: block;
                margin: 0 auto;

            }

            .yy_img {
                width: 480px;
                height: 270px;
                border-radius: 16px;
            }

            .yy_o {
                font-size: 26px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 600;
                color: #333E75;
                padding-top: 20px;
            }

            .yy_t {
                font-size: 22px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 500;
                color: #333E75;
                padding: 10px 0 5px;
            }

            .yy_txt {
                font-size: 20px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333E75;
                text-indent: 40px;
                padding: 2px 0;
                line-height: 30px;

            }

            .yy_txt_c {
                display: flex;
                // align-items: center;
                text-indent: 0;

                .yy_crl {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #333E75;
                    margin-right: 6px;
                    margin-left: 40px;
                    margin-top: 11px;
                }

                div {
                    flex: 1;

                    font-size: 20px;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #333E75;
                }
            }

            .yy_guide {
                .yy_txt {
                    text-indent: 20px;
                }

                .yy_txt_c {
                    text-indent: 0px;
                }
            }

            .yy_int {
                font-size: 24px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333E75;
                text-indent: 0;
                padding: 5px 0;
            }

            .yy_biao {
                font-size: 14px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333E75;
                // text-indent: 40px;
                // padding: 5px 0;
                text-align: center;
                padding: 5px 0;
            }

            .rtr_ul {
                ul {
                    display: flex;
                    justify-content: center;

                    li {
                        font-size: 14px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #333E75;
                        line-height: 1;
                        display: flex;
                        align-items: center;
                        padding: 5px 20px 10px;

                        span {
                            margin-right: 8px;
                            display: inline-block;
                            width: 20px;
                            height: 10px;
                            // border-radius: 50%;
                        }

                        span.r_cir1 {
                            background: #ff8e00;
                        }

                        span.r_line1 {
                            width: 20px;
                            height: 0;
                            border-radius: 0;
                            border-bottom: 2px dashed #ff0000;
                        }

                        span.r_line2 {
                            width: 20px;
                            height: 0;
                            border-radius: 0;
                            border-bottom: 2px dashed #0d7ce4;
                        }
                    }
                }
            }
        }

    }
}
</style>