<template>
    <div>
        <div class="group-class">
            <div class="download" @click="handleExport">点击下载</div>


            <div class="group_box" id="overviewpage">
                <div class="group_style noSplitBox">
                    <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" />
                    <div class="table-border">
                        <div class="g1_top">
                            <span>北京市八一学校</span>
                        </div>
                        <div class="g1_top1">
                            2024 年秋季学期
                        </div>
                        <div class="g1_top1">
                            中小学生心理健康筛查评估
                        </div>
                        <div class="g1_top1">
                            团体报告
                        </div>
                        <div class="g2_top1">
                            2024 年 10 月
                        </div>
                    </div>
                </div>
                <div class="ml_box">
                    <div class="ml_p noSplitBox">
                        目录
                    </div>
                    <!-- <div v-for="(items,index) in muluList" :key="index">
                        {{ index }}
                    </div> -->
                    <div v-for="item in muluList" :key="item.index">
                        <div :class="{
                            ml_p0: true,
                            noSplitBox: true,
                            pl30: item.mark == 2,
                            pl60: item.mark == 3,
                            pl120: item.mark == 4
                        } ">
                            <div v-if="item.id < 10">
                                {{ item.ids }} {{ item.name }}
                            </div>
                            <div v-else>
                                {{ item.name }}
                            </div>
                            <div class="ml_li">
                                
                            </div>
                            <div>
                                {{ item.page }}
                            </div>
                        </div>
                        <!-- <div v-for="item1 in item.list" :key="item1.id">
                            <div class="ml_p0 pl30 noSplitBox" >
                                <div>
                                    {{ item.id }}.{{ item1.id }} {{ item1.name }}
                                </div>
                                <div class="ml_li">
                                
                                </div>
                                <div>
                                    {{ item1.page }}
                                </div>
                            </div>
                            <div v-for="item2 in item1.list" :key="item2.id">
                                <div class="ml_p0 pl60 noSplitBox" >
                                    <div>
                                        {{ item.id }}.{{ item1.id }}.{{ item2.id }} {{ item2.name }}
                                    </div>
                                    <div class="ml_li">
                                
                                    </div>
                                    <div>
                                        {{ item2.page }}
                                    </div>
                                </div>
                            </div>
                            
                        </div> -->
                    </div>
                </div>
                <div class="yy_box">
                    <div class="noSplitBox">
                        <div class="yy_o mulu_page">
                            1.引言
                        </div>
                        <div class="yy_t mulu_page">
                            1.1 测评目的
                        </div>
                        <div class="yy_txt ">
                            2024 年 9 月，北京市八一学校对校内 46 个班级（其中：预备年级（小学六年级）10 个，初中 20 个，高中 16 个）的 1873 名（其中：预备年级学生 413 名，初中一年级学生 840 名，高中一年级学生 620 名；男生 999名，女生 874 名）学生进行了心理健康筛查评估。
                        </div>
                        <div class="yy_txt ">
                            本次筛查评估主要用于揭示本校中小学生的心理健康水平和心理健康问题，明确不同学段和不同性别学生分别需要重点关注的心理健康问题，发现具有心理健康问题风险的学生，从而为本校开展学生心理健康教育以及心理问题风险管理提供重要的依据。
                        </div>
                        <div class="yy_t mulu_page">
                            1.2 测评工具
                        </div>
                        <div class="yy_txt ">
                            此次筛查评估使用的测评工具为“AI 心世界”智能心理测评系统。该系统结合心理投射和人工智能技术，在无意识状态下对受测者心理状态、个性特征和行为特征进行测量。该系统从五大心理健康问题（抑郁、焦虑、强迫、敌对、自我伤害）对中小学生心理状态进行科学评估。该系统完全自主研发，拥有 10 余项国家发明专利，已通过中国心理学会标准化委员会成果鉴定和公安部安全与警用电子产品质量检测中心认证。
                        </div>
                        <div class="yy_t noSplitBox mulu_page">
                            1.3 相关结论
                        </div>
                        <div class="yy_txt noSplitBox">
                            本报告从全校各维度检出率、各学段各维度检出率、初中一年级直升班与非直升班各维度检出率、男女不同性别各维度检出率情况进行分析，相关结论如下：
                        </div>
                        <div class="yy_txt noSplitBox">
                            （1）全校各维度检出率：在具体的心理健康维度上，检出率由高到低依次为：焦虑（31.9%）、抑郁（24.3%）、自我伤害（20.7%）、强迫（18.8%）、敌对（18.6%）。其中，焦虑、抑郁和强迫检出率高于全国常模，问题较为突出。
                        </div>
                    </div>
                    
                    
                    
                    <div class="yy_txt noSplitBox">
                        （2）各学段各维度检出率：不同学段学生在心理健康问题上表现出不同的特点，焦虑、抑郁在各学段上的问题都比较突出。除焦虑、抑郁问题外，预备年级敌对问题相对突出，初中学段自我伤害比例有所提升，高中学段强迫问题显现。
                    </div>
                    <div class="yy_txt noSplitBox">
                        （3）初中一年级直升与非直升班各维度检出率：初中非直升班相比直升班心理问题更加显著。直升班的心理健康问题检出率的前三位为焦虑（28.0%）、抑郁（21.5%）、强迫（16.7%）；非直升班的心理健康问题检出率的前三位为：焦虑（27.9%）、抑郁（27.2%）、自我伤害（23.7%）。
                    </div>
                    <div class="yy_txt noSplitBox">
                        （4）男女不同性别各维度检出率：相较于女生，男生心理问题更加突出，且呈现更明显的敌对倾向。男生心理健康问题检出率的前三位为焦虑（45.4%）、抑郁（29.0%）和敌对（25.6%）；女生心理健康问题检出率的前三位为抑郁（18.9%）、自我伤害（16.7%）和焦虑（16.4%）。
                    </div>
                </div>
                <div class="yy_box">
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
                            北京市八一学校对 46 个班级共 1873 名学生开展了心理健康筛查评估。其中，预备年级 10 个班级，初中 20 个班级，高中 16 个班级。
                        </div>
                        <div class="yy_txt">
                            参加本次筛查评估的 1873 名学生中，预备年级学生有 413 人（占比22.1%），初中生有 840 人（占比 44.9%），高中生有 620 人（占比 33.1%）。各学段的学生人数占比分布情况如下图：
                        </div>
                        <div class="noSplitBox" style="width: 100%;height: 500px;margin: 30px auto;">
                            <div style="width: 400px;height: 400px;">学段--饼状图</div>
                            <div class="yy_txt" style="text-align: center;">图1 北京市八一学校参加筛查评估学生学段分布图</div>
                        </div>
                    </div>
                    <div class="yy_txt noSplitBox">
                        参加本次筛查评估的 1873 位学生中，男生共 999 人，占比为 53.3%；女生共 874 人，占比为 46.7% ，各学段学生性别分布情况见下图：
                    </div>
                    <div class="noSplitBox" style="width: 100%;height: 500px;margin: 30px auto;">
                        <div style="width: 400px;height: 400px;">男女--柱状图</div>
                        <div class="yy_txt" style="text-align: center;">图 2 北京市八一学校参加筛查评估男女性别人数对比图</div>
                    </div>
                    <div class="yy_t noSplitBox">
                        各班级学生人数占比分布情况见下表：
                    </div>
                    <div class="yy_txt noSplitBox" style="text-align: center;">
                        表 1 北京市八一学校参加筛查评估各班级人数占比图
                    </div>
                    <table cellspacing="0" cellpadding="30">
                        <tr class="pdf-details noSplitBox">
                            <th style="width:20%">学段</th>
                            <th style="width:40%">班级</th>
                            <th style="width:20%">人次</th>
                            <th style="width:20%">占比</th>
                        </tr>
                        <tr v-for="(item, index) in oneData1" :key="index" class="pdf-details noSplitBox">
                            <td>{{ item.grade }}</td>
                            <td>{{ item.class }}</td>
                            <td>{{ item.personNum }}</td>
                            <td>{{ item.percent }}</td>
                        </tr>
                    </table>
                    
                    <div class="yy_t noSplitBox mulu_page">
                        2.1.2 筛查评估指标和内容
                    </div>
                    <div class="yy_txt noSplitBox">
                        本次中小学生心理健康筛查评估采用线下团体测评的方式开展，即学生以班级为单位统一在校使用计算机创作电子箱庭（沙盘）进行测评，本次筛查评估内容包括学生的心理健康风险水平和心理健康问题两大方面。测评结果仅供参考，不作为诊断使用。
                    </div>
                    <div class="yy_t noSplitBox mulu_page">
                        2.1.2.1 心理健康风险水平
                    </div>
                    <div class="yy_txt noSplitBox">
                        将学生的心理健康水平划分为四个等级：正常、轻度问题、中度问题和重度问题，具体解释见下表：
                    </div>
                    <div class="yy_t noSplitBox" style="text-align: center;">
                        表 2 心理健康风险水平的解释和定义
                    </div>
                    <table cellspacing="0" cellpadding="30">
                        <tr class="pdf-details noSplitBox">
                            <th style="width:200px">心理健康水平</th>
                            <th>内容</th>
                        </tr>
                        <tr v-for="(item, index) in oneData2" :key="index" class="pdf-details noSplitBox">
                            <td>{{ item.name }}</td>
                            <td style="text-align: left;">{{ item.content }}</td>
                        </tr>
                    </table>

                    <div class="yy_t noSplitBox mulu_page">
                        2.1.2.2 心理健康问题
                    </div>
                    <div class="yy_txt noSplitBox">
                        本次筛查评估内容涵盖了我国中小学生常见的五类心理健康问题，包括：抑郁、焦虑、强迫、敌对、自我伤害。这些心理健康问题的具体解释见下表：
                    </div>
                    <div class="yy_txt noSplitBox" style="text-align: center;">
                        表 3 心理健康问题的筛查评估指标和解释
                    </div>
                    <table cellspacing="0" cellpadding="30">
                        <tr class="pdf-details noSplitBox">
                            <th style="width:200px">心理健康问题</th>
                            <th>内容</th>
                        </tr>
                        <tr v-for="(item, index) in oneData3" :key="index" class="pdf-details noSplitBox">
                            <td>{{ item.name }}</td>
                            <td style="text-align: left;">{{ item.content }}</td>
                        </tr>
                    </table>
                    <div class="yy_t noSplitBox mulu_page">
                        2.2 典型样例
                    </div>
                    <div class="yy_txt noSplitBox">
                        为了让报告更具实用性和操作性，在本次测评的 1873 名学生中，根据测评系统的评估结果在每个维度的不同风险水平中各抽取一个相对应的典型沙盘案例进行专家分析（仅展示沙盘的图像基础信息，隐去学生个人信息）。通过真实的案例，老师们可以将评测系统的评估结果与学生的实际情况进行更直观的比对，提升心理老师的专业技能，以便更好地支撑对学生心理的筛查和干预。
                    </div>
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.1 正常样例
                    </div>
                    <div v-for="item in expList1" :key="item.id">
                        <div class="yy_t noSplitBox">
                            样例 {{item.id}}：{{item.name}}
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
                        </div>
                        <div class="yy_t noSplitBox">
                            （1）箱庭空间配置
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{ item.txt1 }}
                        </div>
                        <div class="yy_t noSplitBox">
                            （2）关键沙具分析
                        </div>
                        <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox mulu_page">
                        2.2.2 抑郁维度样例
                    </div>








                    
                    <!-- <div class="yy_t noSplitBox">
                        （2）各学段各维度检出率：不同学段学生在心理健康问题上表现出不同的特点，焦虑、抑郁在各学段上的问题都比较突出。除焦虑、抑郁问题外，预备年级敌对问题相对突出，初中学段自我伤害比例有所提升，高中学段强迫问题显现。
                    </div>
                    <div class="yy_t noSplitBox">
                        （3）初中一年级直升与非直升班各维度检出率：初中非直升班相比直升班心理问题更加显著。直升班的心理健康问题检出率的前三位为焦虑（28.0%）、抑郁（21.5%）、强迫（16.7%）；非直升班的心理健康问题检出率的前三位为：焦虑（27.9%）、抑郁（27.2%）、自我伤害（23.7%）。
                    </div>
                    <div class="yy_t noSplitBox">
                        （4）男女不同性别各维度检出率：相较于女生，男生心理问题更加突出，且呈现更明显的敌对倾向。男生心理健康问题检出率的前三位为焦虑（45.4%）、抑郁（29.0%）和敌对（25.6%）；女生心理健康问题检出率的前三位为抑郁（18.9%）、自我伤害（16.7%）和焦虑（16.4%）。
                    </div> -->
                </div>
                
                <!-- <p class="noSplitBox mulu" style="height: 100px;">目录</p>
                <p class="noSplitBox" style="height: 40px;">目录</p>
                <p class="noSplitBox" style="height: 40px;">目录</p>
                <p class="noSplitBox" style="height: 40px;">目录</p>
                <p class="noSplitBox" style="height: 40px;">目录</p>
                <p class="noSplitBox" style="height: 40px;">目录</p> -->

                <!-- <div class="noSplitBox mulu" style="height: 800px;background: #f00;">1</div>
                <div class="noSplitBox mulu" style="height: 800px;background: #f00;">2</div>
                <div class="noSplitBox mulu" style="height: 800px;background: #f00;">3</div> -->

                <!-- <div class="list noSplitBox" v-for="(item, index) in 100">111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}
                </div>
                <div class="noSplitBox mulu_page">12313213</div>
                <div class="list noSplitBox" v-for="(item, index) in 100">111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index }}111111---{{ index
                    }}111111---{{ index }}
                </div>
                <div class="noSplitBox mulu_page">12313213</div>
                <table class="mulu_page" cellspacing="0" cellpadding="30">
                    <tr class="pdf-details noSplitBox">
                        <th style="width:80px">日期</th>
                        <th style="width:100px">姓名</th>
                        <th>地址</th>
                    </tr>
                    <tr v-for="(item, index) in tableData" :key="index" class="pdf-details noSplitBox">
                        <td>{{ item.date }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.address }}</td>
                    </tr>
                </table>
                <div class="noSplitBox mulu_page">12313213</div> -->
                
            </div>
        </div>
    </div>
</template>
<script>
import PdfLoader from "@/common/utils/groupPdf";
// import { content } from "html2canvas/dist/types/css/property-descriptors/content";
export default {
    data() {
        return {
            muluList: [
                {
                    id: 1,
                    name: '引言',
                    page: '1',
                    mark: 1,
                    list:[
                        {
                           id: 1,
                           name: '测评目的',
                           page: '1',
                           mark: 2
                        },
                        {
                           id: 2,
                           name: '测评工具',
                           page: '1',
                           mark: 2
                        },
                        {
                           id: 3,
                           name: '相关结论',
                           page: '1',
                           mark: 2
                        }
                    ]

                },
                {
                    id: 2,
                    name: '测评基本信息',
                    page: '1',
                    mark: 1,
                    list:[
                        {
                           id: 1,
                           name: '筛查评估样本与内容',
                           page: '1',
                           mark: 2,
                           list:[
                                {
                                    id: 1,
                                    name: '筛查评估对象和样本',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '筛查评估指标和内容',
                                    page: '1',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '心理健康风险水平',
                                            page: '1',
                                            mark: 4,
                                        },
                                        {
                                            id: 2,
                                            name: '心理健康问题',
                                            page: '1',
                                            mark: 4,
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                           id: 2,
                           name: '典型样例',
                           page: '1',
                           mark: 2,
                           list:[
                                {
                                    id: 1,
                                    name: '正常样例',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '抑郁维度样例',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 3,
                                    name: '焦虑维度样例',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '强迫维度样例',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 5,
                                    name: '敌对维度样例',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 6,
                                    name: '自我伤害维度样例',
                                    page: '1',
                                    mark: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    name: '测评结果',
                    page: '1',
                    mark: 1,
                    list:[
                        {
                           id: 1,
                           name: '总体测评结果',
                           page: '1',
                           mark: 2,
                           list:[
                                {
                                    id: 1,
                                    name: '各维度检出率',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '不同性别各维度检出率',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 3,
                                    name: '各个学段各维度检出率',
                                    page: '1',
                                    mark: 3
                                }
                            ]
                        },
                        {
                           id: 2,
                           name: '预备年级测评分析',
                           page: '1',
                           mark: 2,
                           list:[
                                {
                                    id: 1,
                                    name: '预备年级测评结果概况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '预备年级各维度检出率情况',
                                    page: '1',
                                    mark: 3,
                                    list: [
                                        {
                                            id: 1,
                                            name: '抑郁维度',
                                            page: '1',
                                            mark: 4
                                        },
                                        {
                                            id: 2,
                                            name: '焦虑维度',
                                            page: '1',
                                            mark: 4
                                        },
                                        {
                                            id: 3,
                                            name: '强迫维度',
                                            page: '1',
                                            mark: 4
                                        },
                                        {
                                            id: 4,
                                            name: '敌对维度',
                                            page: '1',
                                            mark: 4
                                        },
                                        {
                                            id: 5,
                                            name: '自我伤害维度',
                                            page: '1',
                                            mark: 4
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '预备年级不同性别测评情况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '预备年级重点关注人群名单',
                                    page: '1',
                                    mark: 3
                                }
                            ]
                        },
                        {
                           id: 3,
                           name: '初中一年级测评分析',
                           page: '1',
                           mark: 2,
                           list:[
                                {
                                    id: 1,
                                    name: '初中一年级测评结果概况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '初中一年级各维度检出率情况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 3,
                                    name: '初中一年级不同性别测评情况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '初中一年级重点关注人群名单',
                                    page: '1',
                                    mark: 3
                                }
                            ]
                        },
                        {
                           id: 4,
                           name: '高中一年级测评分析',
                           page: '1',
                           mark: 2,
                           list:[
                                {
                                    id: 1,
                                    name: '高中一年级测评结果概况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '高中一年级各维度检出率情况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 3,
                                    name: '高中一年级不同性别测评情况',
                                    page: '1',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '高中一年级重点关注人群名单',
                                    page: '1',
                                    mark: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 11,
                    name: '附录：各维度沙盘表现特征',
                    page: '1',
                    mark: 1,
                    list:[
                        
                    ]
                }
            ],
            tableData: [
                { date: '2016-05-02', name: '王大虎', address: '上海市普陀区金沙江路 111 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-02', name: '王大虎', address: '上海市普陀区金沙江路 111 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' },
                { date: '2016-05-04', name: '王二虎', address: '上海市普陀区金沙江路 112 锤' },
                { date: '2016-05-01', name: '王三虎', address: '上海市普陀区金沙江路 113 子' },
                { date: '2016-05-03', name: '王四虎', address: '上海市普陀区金沙江路 114 呢' },
                { date: '2016-05-03', name: '王没虎', address: '上海市普陀区金沙江路 110 弄' }
            ],
            oneData1: [
                {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                },{
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }
            ],
            oneData2:[
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
            oneData3:[
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
            expList1:[
                {
                    id: 1,
                    name: '正常',
                    img: '',
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
                    img: '',
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
            ]
            
        };
    },
    mounted() {
        let muluArr = []
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
        console.log(muluArr)
        this.muluList = muluArr
        console.log(this.muluList)
    },
    methods: {
        handleExport() {
            let pdf = new PdfLoader(
                document.querySelector("#overviewpage"),
                "pdf",
                "noSplitBox"
            );
            // this.muluPage = pdf.muluPage
            pdf.outPutPdfFn();
            this.muluPage = pdf.muluPage

            console.log(this.muluList)
            
            console.log(this.muluPage)
            for (let i in this.muluList) {
                this.muluList[i].page = pdf.muluPage[i]
            }
        },
    },
};
</script>
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
    }

    .group_box {
        width: 100%;
        background: #fff;
        margin: 0 auto;
        height: auto;

        .group_style {
            width: 1190px;
            margin: 0 auto;
            border-collapse: collapse;
            
            text-align: center;
            position: relative;
            background: #f00;
            .table-border {
                position: relative;
                width: 1191px;
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
            .g2_top1{
                position: absolute;
                width: 100%;
                // padding-top: 1100px;
                bottom: 120px;
                text-align: center;
                font-size: 36px;
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
    margin: 0 auto;

    tr {
        border: 1px solid #000;

        th {
            border: 1px solid #000;
            border-right: 0;

            text-align: center;
            font-size: 24px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 600;
            color: #333E75;
            padding: 20px 10px;
            //border-top: 0;
        }

        th:last-child {
            border-right: 1px solid #000;
        }

        td {
            border: 1px solid #000;
            border-right: 0;
            border-top: 0;

            padding: 20px 10px;
            text-align: center;
            font-size: 24px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #333E75;
        }

        td:last-child {
            border-right: 1px solid #000;
        }
    }

}
</style>
<style lang="less" scoped>
    .group-class {
        .group_box{
            .ml_box{
                text-align: left;
                padding: 0 120px;
                .ml_p{
                    // display: flex;
                    font-size: 42px;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #333E75;
                    text-align: center;
                    padding-top: 80px;
                    padding-bottom: 40px;
                }
                .ml_p0{
                    // display: flex;
                    
                    padding-top: 15px;
                    padding-bottom: 15px;
                    display: flex;
                    justify-content: space-between;
                    div{
                        font-size: 30px;
                        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                        font-weight: 400;
                        color: #333E75;
                        
                    }
                    .ml_li{
                        flex: 1;
                        border-bottom: 2px dashed #333E75;
                        margin: 0 10px 18px;
                    }
                }
                .pl30{
                    padding-left: 30px
                }
                .pl60{
                    padding-left: 60px
                }
                .pl120{
                    padding-left: 120px
                }
            }
            .yy_box{
                text-align: left;
                padding: 30px 80px 30px;
                .yy_o{
                    font-size: 42px;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #333E75;
                    padding-top: 60px;
                }
                .yy_t{
                    font-size: 34px;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #333E75;
                    padding: 30px 0 10px;
                }
                .yy_txt{
                    font-size: 30px;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #333E75;
                    text-indent: 60px;
                    padding: 20px 0;
                }
            }
            
        }
    }
</style>