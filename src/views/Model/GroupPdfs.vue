<template>
    <div>
        <div class="group-class">

            <div class="download" @click="apartsReport">点击下载</div>
            <div class="downloads"></div>
            <!-- 导出pdf的盒子，随着页面增多，需要拆成两个盒子，再拼接，确保清晰度 -->
            <div class="group_box" id="overviewpage">
                <!-- 封面 -->
                <div class="group_style">
                    <img class="shui_bg" src="../../assets/images/report/shui.png" alt="" />
                    <div class="table-border noSplitBox">
                        <div class="g1_top">
                            <span>{{schoolName}}</span>
                        </div>
                        <div class="g1_top1">
                            {{reportName}}
                        </div>
                        <div class="g1_top1">
                            中小学生心理健康筛查评估
                        </div>
                        <div class="g1_top1">
                            团体报告
                        </div>
                        <div class="g2_top1">
                            {{start}} ～ {{ end }}
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
                            <div>{{ index < 4 ? '1' : item.page }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 引言 -->
                    <!--  -->
                    <div class="fuck yy_box mulu_empty_page">
                        <div class="noSplitBox" style="padding-bottom: 600px;">

                            <div class="yy_o noSplitBox mulu_page">
                                1.引言
                            </div>
                            <div class="yy_t noSplitBox mulu_page">
                                1.1 测评目的
                            </div>
                            <div class="yy_txt noSplitBox">
                                {{start}} ～ {{ end }}，{{schoolName}}对校内 {{ detail.totalClasses }} 个班级（其中：预备年级（小学六年级）{{ detail.yuBei.numClasses }}个，初中{{ detail.chuZhong.numClasses }}个，高中{{ detail.gaoZhong.numClasses }}个）的 {{detail.totalStudents}}
                                名（其中：预备年级学生{{ detail.yuBei.numStudents }}名，初中一年级学生{{ detail.chuZhong.numStudents }}名，高中一年级学生{{ detail.gaoZhong.numStudents }}名；男生{{detail.maleStudents}}名，女生{{detail.femaleStudents}}名）学生进行了心理健康筛查评估。
                            </div>
                            <div class="yy_txt noSplitBox">
                                本次筛查评估主要用于揭示本校中小学生的心理健康水平和心理健康问题，明确不同学段和不同性别学生分别需要重点关注的心理健康问题，发现具有心理健康问题风险的学生，从而为本校开展学生心理健康教育以及心理问题风险管理提供重要的依据。
                            </div>
                            <div class="yy_t noSplitBox mulu_page">
                                1.2 测评工具
                            </div>
                            <div class="yy_txt noSplitBox">
                                此次筛查评估使用的测评工具为“AI
                                心世界”智能心理测评系统。该系统结合心理投射和人工智能技术，在无意识状态下对受测者心理状态、个性特征和行为特征进行测量。该系统从五大心理健康问题（抑郁、焦虑、强迫、敌对、自我伤害）对中小学生心理状态进行科学评估。该系统完全自主研发，拥有
                                10 余项国家发明专利，已通过中国心理学会标准化委员会成果鉴定和公安部安全与警用电子产品质量检测中心认证。
                            </div>
                            <div class="yy_t noSplitBox mulu_page">
                                1.3 相关结论
                            </div>
                            <!-- 根据测评人群涉及多个学段、直升与非直升实际情况，进行相应输出：------这里可能要做个判断几个学段，初一有没有直升和非直升 -->
                            <div class="yy_txt noSplitBox">
                                本报告从全校各维度检出率、各学段各维度检出率、初中一年级直升班与非直升班各维度检出率、男女不同性别各维度检出率情况进行分析，相关结论如下：
                            </div>
                            <div class="yy_txt noSplitBox">
                                （1）全校各维度检出率：在具体的心理健康维度上，检出率由高到低依次为：
                                <span v-for="(item,index) in detail.wdJcList" :key="item.grade">
                                    {{ index > 0 ? '、' : '' }}{{ item.grade }}（{{ item.total }}%）
                                </span>。
                               
                                <!-- 全部低于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 1">与全国常模相比，所有维度检出率都低于全国常模，该校测评年级心理健康整体表现较好。</span>
                                
                                <!-- 全部等于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 2">与全国常模相比，所有维度都与之持平，本校心理健康问题与全国状况大致相当。</span>
                                
                                <!-- 全部大于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 3">与全国常模相比，所有维度检出率都高于全国常模，该校测评年级心理健康问题较为突出。</span>
                                <!-- 部分大于全国常模 -->
                                <span v-if="detail.wdLevelTxt === 4">其中，
                                    
                                    {{detail.txtStr}}检出率高于全国常模，问题较为突出。</span>
                                <!-- 部分持平，最高持平全国常模 -->
                                <span v-if="detail.wdLevelTxt === 5">与全国常模相比，
                                    {{detail.txtStr52}}维度与之持平，{{detail.txtStr51}}维度低于全国常模。</span>
                            </div>
                            <div class="yy_txt noSplitBox">
                                （2）各学段各维度检出率：{{detail.gradeTxt1}}{{detail.gradeTxt2}}
                            </div>
                            <div class="yy_txt noSplitBox">
                                （3）初中一年级直升与非直升班各维度检出率：初中一年级非直升班相比直升班心理问题更加显著。直升班的心理健康问题检出率的前三位为焦虑（28.0%）、抑郁（21.5%）、强迫（16.7%）；非直升班的心理健康问题检出率的前三位为：焦虑（27.9%）、抑郁（27.2%）、自我伤害（23.7%）。
                            </div>
                            <div class="yy_txt noSplitBox">
                                （4）男女不同性别各维度检出率：相较于女生，男生心理问题更加突出，且呈现更明显的敌对倾向。男生心理健康问题检出率的前三位为焦虑（45.4%）、抑郁（29.0%）和敌对（25.6%）；女生心理健康问题检出率的前三位为抑郁（18.9%）、自我伤害（16.7%）和焦虑（16.4%）。
                            </div>
                        </div>
                    </div>


                    <div class="yy_box basic_box">
                        <!-- <div class="fss"> -->
                        <div class="yy_o noSplitBox mulu_page">
                            2.测评基本信息
                        </div>
                        <div class="yy_t noSplitBox mulu_page">
                            2.1 筛查评估样本与内容
                        </div>
                        <div class="yy_t noSplitBox mulu_page">
                            2.1.1 筛查评估对象和样本
                        </div>
                        <div class="yy_txt noSplitBox">
                            北京市八一学校对 46 个班级共 1873 名学生开展了心理健康筛查评估。其中，预备年级 10 个班级，初中 20 个班级，高中 16 个班级。
                        </div>
                        <div class="yy_txt noSplitBox">
                            参加本次筛查评估的 1873 名学生中，预备年级学生有 413 人（占比22.1%），初中生有 840 人（占比 44.9%），高中生有 620 人（占比
                            33.1%）。各学段的学生人数占比分布情况如下图：
                        </div>
                        <div class="noSplitBox">
                            <div style="width: 100%;height: auto;">
                                <div style="width: 100%;height: 320px;margin: 0 auto;" class="myChart" ref="myChart1">
                                </div>
                                <div class="yy_biao" style="text-align: center;">图1 北京市八一学校参加筛查评估学生学段分布图</div>
                            </div>
                        </div>
                        <div class="yy_txt noSplitBox">
                            参加本次筛查评估的 1873 位学生中，男生共 999 人，占比为 53.3%；女生共 874 人，占比为 46.7% ，各学段学生性别分布情况见下图：
                        </div>
                        <div class="noSplitBox">

                            <div style="width: 100%;height: auto;margin: 20px auto 10px;">
                                <div style="width: 100%;height: 320px;margin: 0 auto;" class="myChart" ref="myChart2">
                                    学段--饼状图</div>
                                <div class="yy_biao" style="text-align: center;">图 2 北京市八一学校参加筛查评估男女性别人数对比图</div>
                            </div>
                        </div>

                        <div class="yy_int noSplitBox">
                            各班级学生人数占比分布情况见下表：
                        </div>
                        <div class="yy_biao noSplitBox" style="">
                            表 1 北京市八一学校参加筛查评估各班级人数占比图
                        </div>
                        <table cellspacing="0">
                            <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
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
                        <div class="noSplitBox">

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
                                <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                    <th style="width:200px">心理健康水平</th>
                                    <th>内容</th>
                                </tr>
                                <tr v-for="(item, index) in oneData2" :key="index" class="pdf-details noSplitBox">
                                    <td>{{ item.name }}</td>
                                    <td style="text-align: left;">{{ item.content }}</td>
                                </tr>
                            </table>

                        </div>

                        <div class="noSplitBox">
                            <div class="yy_t noSplitBox mulu_page">
                                2.1.2.2 心理健康问题
                            </div>
                            <div class="yy_txt noSplitBox">
                                本次筛查评估内容涵盖了我国中小学生常见的五类心理健康问题，包括：抑郁、焦虑、强迫、敌对、自我伤害。这些心理健康问题的具体解释见下表：
                            </div>
                            <div class="yy_biao" style="">
                                表 3 心理健康问题的筛查评估指标和解释
                            </div>
                            <table cellspacing="0">
                                <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                    <th style="width:200px">心理健康问题</th>
                                    <th>内容</th>
                                </tr>
                                <tr v-for="(item, index) in oneData3" :key="index" class="pdf-details noSplitBox">
                                    <td>{{ item.name }}</td>
                                    <td style="text-align: left;">{{ item.content }}</td>
                                </tr>
                            </table>
                        </div>

                        <div class="yy_t noSplitBox mulu_page">
                            2.2 典型样例
                        </div>
                        <div class="yy_txt noSplitBox">
                            为了让报告更具实用性和操作性，在本次测评的 1873
                            名学生中，根据测评系统的评估结果在每个维度的不同风险水平中各抽取一个相对应的典型沙盘案例进行专家分析（仅展示沙盘的图像基础信息，隐去学生个人信息）。通过真实的案例，老师们可以将评测系统的评估结果与学生的实际情况进行更直观的比对，提升心理老师的专业技能，以便更好地支撑对学生心理的筛查和干预。
                        </div>
                        <div class="yy_t noSplitBox mulu_page">
                            2.2.1 正常样例
                        </div>
                        <div v-for="(item, index) in expList1" :key="index">
                            <div class="noSplitBox">
                                <div class="yy_t">
                                    样例 {{ index + 1 }}：{{ item.name }}
                                </div>
                                <div class="yy_txt">
                                    <img class="yy_img" src="../../assets//images/report/t001.png" alt="">
                                </div>
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
                                <span style="font-weight: 500;">{{ iteml.title }}：</span>
                                <span>{{ iteml.txt }}</span>
                            </div>
                            <div class="yy_txt noSplitBox">
                                {{ item.txt2 }}
                            </div>
                        </div>
                        <!-- 抑郁 -->
                        <div>
                            <div class="yy_t noSplitBox mulu_page">
                                2.2.2 抑郁维度样例
                            </div>
                            <div class="yy_t noSplitBox">
                                （一）抑郁维度在沙盘中的表现特征
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>空洞与缺失</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>主题的单一化</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>使用封闭与孤立的元素</div>
                            </div>
                            <div class="yy_txt noSplitBox">
                                详细解释可见附录
                            </div>
                            <div class="yy_t noSplitBox">
                                （二）经典案例解读
                            </div>
                            <div v-for="(item, index) in expListYy" :key="index">
                                <div class="noSplitBox">
                                    <div class="yy_t">
                                        （{{ index + 1 }}）{{ item.name }}问题
                                    </div>
                                    <div class="yy_t">
                                        <img class="yy_img" src="../../assets//images/report/t001.png" alt="">
                                    </div>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【空间配置】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt1 }}
                                </div>
                                <div class="yy_t noSplitBox">
                                    【关键沙具】
                                </div>
                                <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                                    <span style="font-weight: 500;">{{ iteml.title }}：</span>
                                    <span>{{ iteml.txt }}</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt2 }}
                                </div>
                            </div>

                            <div class="yy_t noSplitBox">
                                （三）指导建议
                            </div>
                            <!-- 抑郁指导建议 -->
                            <div class="yy_guide">
                                <div class="yy_t noSplitBox">
                                    （1）轻度问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>不否定自己的负面情绪，减少自我攻击的思维。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>找到自己喜欢做的事情，并投入其中。例如：去接近大自然，或者看影视剧，观看演唱会等。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>增加体育锻炼，或进行艺术活动与创作，例如音乐、舞蹈等。</div>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">情趣陶冶：</span>
                                    <span>养宠物、聆音、冥想、书法、绘画、唱歌、旅行等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">运动建议：</span>
                                    <span>健步走、慢跑、游泳、骑自行车、跳舞、瑜伽、打球等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>尽量减少或杜绝对孩子的批评指责，适当降低对孩子的要求。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>欣赏孩子的进步与改变，及时夸奖孩子的积极心态或者行为。例如：孩子主动做家务，家长应及时赞赏和感谢孩子的付出。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>倾听孩子的烦恼或者心里话，进行情感共鸣而非语言评价。例如：家长询问孩子“今天在学校，你的感受怎么样？”，用心倾听孩子的感受，不去评价孩子。</div>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校尽量不采用成绩排名公示，减少评价，避免排名靠后的学生因成绩不好而自卑。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>创造同学之间的交流机会，组织学生感兴趣的课外活动。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校定期举行心理健康教育课程或活动，引导孩子主动觉察与接纳自己的负面情绪等等。</div>
                                </div>

                                <!-- 中度 -->
                                <div class="yy_t noSplitBox">
                                    （2）中度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照低风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>允许自己的抑郁症状出现并有所波动，不因自己努力后症状没有减轻而责怪自己。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>当有自杀自伤意念或行为时，及时与身边关爱自己的人（家人、老师、同学和朋友等）寻求帮助等等。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应接纳孩子目前的状态。例如孩子因情绪问题成绩下降，家长不能打骂孩子，可以陪伴孩子找到成绩下降的原因，帮助孩子克服困难。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应为孩子提供宽松的生活与精神环境，陪伴孩子度过最艰难的时刻。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应多关注孩子的情绪，如果孩子的情绪持续低落、饮食或睡眠出现异常，应及时带孩子去医院就医，不指责孩子。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应关注孩子的自杀自伤风险，例如孩子身上是否有伤，用爱温暖孩子，避免孩子伤害自己，一旦发现自杀自伤现象，及时与专业医院或机构联系。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>如经专业医生诊断后，需服用药物，家长需监督管理服药情况。</div>
                                </div>
                                <div class="yy_t noSplitBox" style="font-weight: 500;">
                                    家庭爱的链接:
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭欢聚：</span>
                                    <span>家庭共进晚餐、外出享受美食、品茶畅聊、共同享受美好厨房时光等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭旅行：</span>
                                    <span>共同制定旅行计划、海边沙滩享受日光浴、郊外徒步旅行登山等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭文化活动：</span>
                                    <span>全家一起阅读、赏花灯、写春联、看春晚、赏龙舟等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭运动活动：</span>
                                    <span>全家一起散步、打球、与父亲进行拳击比赛等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校定期举行心理健康教育课程或活动，引导孩子主动觉察与接纳自己的负面情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校建立风险筛查与应对机制，例如：定期对学生的心理状态进行评估，对中风险人群给予心理支持；组织学生进行团体心理咨询，或者展开一对一个体咨询工作。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>相关心理老师在咨询中如发现个体的心理状态比较严重，短期内不能改善时，建议家长及时带个体去医院就医，并遵医嘱服药，并做好相应的记录工作。</div>
                                </div>
                                <!-- 重度 -->
                                <div class="yy_t noSplitBox">
                                    （3）重度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照中风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>建议个体及时去医院就医，必要时进行住院治疗，并辅助心理咨询服务。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>当自杀意念比较强烈时，建议个人拨打自杀干预热线，寻求专业的支持和帮助。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照中风险家庭环境建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应抽出大量的时间陪伴孩子，用爱心、信心和耐心滋养孩子的灵。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应多关注孩子的自杀自伤风险，学习危机干预的基本知识和技术，最大程度保护孩子。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校定期举行心理健康教育课程，如 AI 心理沙盘心境课程。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        学校定期进行危机排查工作，建立风险筛查与应对机制，对重度抑郁的学生进行重点关注，包括与家长合作及时反馈学生状况，建议家长带学生去医院就医，遵医嘱，必要时进行住院治疗。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>对无法上学并住院治疗的抑郁症学生，学校应关注学生的治疗情况，当学生出院并具备上学条件时，应为学生提供良好的回归环境。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可开展相应心理课堂或讲座，引导全体同学尊重并正视抑郁症状，对有抑郁症学生提供帮助，避免因抑郁症状的污名化造成对个体的伤害。</div>
                                </div>
                            </div>
                        </div>


                        <!-- 焦虑 -->
                        <div>
                            <div class="yy_t noSplitBox mulu_page">
                                2.2.3 焦虑维度样例
                            </div>
                            <div class="yy_t noSplitBox">
                                （一）焦虑维度在沙盘中的表现特征
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>布局的混乱与堆积</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>防御性结构</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>动态表现</div>
                            </div>
                            <div class="yy_txt noSplitBox">
                                详细解释可见附录
                            </div>
                            <div class="yy_t noSplitBox">
                                （二）经典案例解读
                            </div>
                            <div v-for="(item, index) in expListJl" :key="index">
                                <div class="yy_t noSplitBox">
                                    （{{ index + 1 }}）{{ item.name }}问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    <img class="yy_img" src="../../assets//images/report/t001.png" alt="">
                                </div>
                                <div class="yy_t noSplitBox">
                                    【空间配置】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt1 }}
                                </div>
                                <div class="yy_t noSplitBox">
                                    【关键沙具】
                                </div>
                                <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                                    <span style="font-weight: 500;">{{ iteml.title }}：</span>
                                    <span>{{ iteml.txt }}</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt2 }}
                                </div>
                            </div>

                            <div class="yy_t noSplitBox">
                                （三）指导建议
                            </div>
                            <!-- 焦虑指导建议 -->
                            <div class="yy_guide">
                                <div class="yy_t noSplitBox">
                                    （1）轻度问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        之前就害怕自己考不好，这种害怕和担心让自己没有办法安心学习识别自己的灾难化思维，例如是否过度担心未来没有发生的事，考试，对未来的焦虑影响了当下的学习状态。需要做出适当调整。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        觉察对自己焦虑的情绪是否有抵触或者否定的情绪，尽量用接纳的态度面对自己的焦虑情绪，不让情绪评价再次伤害自己。例如当发现自己有焦虑情绪时，不去批评自己又开始焦虑了，要正面评价这种焦虑的情绪，对自己说“我现在焦虑，说明我很上进，我想让自己变得更好，我只需要将焦虑控制在一定范围内就好”。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>必要时进行心理咨询，表达自己的情绪，让焦虑情绪得到理解和看见，并有宣泄的出口。例如有痛苦的情绪及时向家长、老师、学校咨询师表达。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        觉察考试成绩对自己影响，开发更多的课外兴趣，用多个评价体系评估自己的能力。例如“我数学不好，但是我作文很好”，或者“我虽然学习不好，但是我画画很好，我一样是一个有价值，值得被爱的人”，或者“我虽然学习不好，也没有特长，但是我为人真诚热情，同学都喜欢和我玩，寻求我的帮助，我是一个很有价值的人”等等。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>增加体育锻炼，亲近大自然，放松心情，缓解紧张情绪。</div>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">情趣陶冶：</span>
                                    <span>养宠物、聆音、冥想、书法、绘画、唱歌、旅行等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">运动建议：</span>
                                    <span>健步走、慢跑、太极拳、游泳、骑自行车、跳舞、瑜伽、打球等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学习、进步，允许个体犯错，尽量营造温馨和睦宽容有爱的家庭环境，让个体感受到爱与包容，个体的自我才能变得强大，才能容忍未来的不确定性。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长还可以多带个体出去游玩，感受自然的风景，缓解焦虑的情绪等等。</div>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可尽量减少对学生的显性评价，减少学生焦虑的来源。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可多组织户外运动，让学生的大脑得到放松。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可开展有利于人际沟通的班级活动等等。</div>
                                </div>

                                <!-- 中度 -->
                                <div class="yy_t noSplitBox">
                                    （2）中度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险个人角度的建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>觉察自己的焦虑情绪是否已经降低了学习效率，当学习时无法集中注意力而被大量焦虑情绪淹没时，需要寻求心理咨询的帮助。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>主动寻求心理援助，例如去精神科医院就医，遵医嘱服药，并寻求心理咨询服务的帮助。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险家庭角度的建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        己给自己很大的压力，如果孩子的情绪非常不好，鼓励孩子说出来家长应多观察孩子的情绪状态，例如孩子是否有灾难化思维，是否自，例如家长可以说“我看到你最近情绪一直都不太好，是考试成绩不理想的原因吗？你愿意说说吗?我能做什么，才能帮到你？”。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家庭成员首先要做到自己不焦虑，调节好自身情绪，避免将自己的焦虑传递给个体。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长不催促不强迫孩子的学习，不评价孩子的成绩，接纳学生目前的学习状态和成绩，对于孩子的小小进步给予肯定和鼓励，有利于孩子自信心的增加。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>当孩子焦虑症状影响其学习时，家长应接纳孩子目前的状态，适度降低对孩子的期待，并帮孩子与学校老师及时沟通，给予适当的缓和空间。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>必要时带个体去做心理咨询，求助专业人员的帮助。家人带领但不强迫个体去精神科医院就诊，遵医嘱服药，并寻求心理咨询服务的帮助。</div>
                                </div>
                                <div class="yy_t noSplitBox" style="font-weight: 500;">
                                    家庭爱的链接:
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭欢聚：</span>
                                    <span>家庭共进晚餐、外出享受美食、品茶畅聊、共同享受美好厨房时光等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭旅行：</span>
                                    <span>共同制定旅行计划、海边沙滩享受日光浴、郊外徒步旅行登山等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭文化活动：</span>
                                    <span>全家一起阅读、赏花灯、写春联、看春晚、赏龙舟等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭运动活动：</span>
                                    <span>全家一起散步、打球、与父亲进行拳击比赛等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险学校角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可设立减压室、心理服务中心，鼓励焦虑个体进行情绪表达。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        后如果孩子整体状态没有向好的方向发展，学校应建议家长带孩子学校可与家长合作，综合孩子在学校和在家的状态，经心理老师评估去医院就医，遵医嘱服药，并辅助进行心理咨询。
                                    </div>
                                </div>
                                <!-- 重度 -->
                                <div class="yy_t noSplitBox">
                                    （3）重度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        当自己被大量的焦虑情绪困扰并且有身体的某些部位有异常反应，例如写字时出汗、手抖，感觉到心脏狂跳、心慌等，应及时与老师和家长反映，并由家长带领去专业医院就医，严格遵医嘱服药，并积极寻求心理咨询的帮助等等。
                                    </div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险家庭环境建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长可尝试传递给孩子一个信息，即无论孩子成绩如何，自己都会100%爱孩子，孩子在自己心中的位置不会因考试成绩糟糕而有任何变化，给孩子提供充足的安全感。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>观察孩子的状态，必要时带孩子去专科医院就医，遵医嘱服药，照顾好孩子的生活。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可定期进行危机排查工作，尤其是在考试成绩出来之后，尽量避免公开成绩排名，避免学生过度的竞争与比较心态。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>考试成绩出来之后关注学生的情绪变化，与家长沟通合作，建立家校联盟。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>针对学生的学习困难，学校应为个体提供多样化的专项辅导课程，例如鼓励跨年级帮助，学长分享自己的成功经验，帮助个体克服学习中的困难。</div>
                                </div>

                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        在重大事件到来之前，例如在考试之前（包括期中、期末考试以及升学考试），学校应组织主题为考试焦虑的团体辅导，有效缓解学生的考试焦虑，促使学生在考试时得到更好的发挥。
                                    </div>
                                </div>

                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>定期在校内组织心理活动，开展心理课堂，还可以邀请家长一同参与。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>针对高焦虑个体，建议其家长带领学生就医，遵医嘱服药，必要时进行住院治疗，并辅助心理咨询服务。</div>
                                </div>
                            </div>
                        </div>
                        <!-- 强迫 -->
                        <div>
                            <div class="yy_t noSplitBox mulu_page">
                                2.2.4 强迫维度样例
                            </div>
                            <div class="yy_t noSplitBox">
                                （一）强迫维度在沙盘中的表现特征
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>重复性和过度控制</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>对称性和极端整洁</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>对立元素同时出现</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>使用具有威胁性的沙具</div>
                            </div>
                            <div class="yy_txt noSplitBox">
                                详细解释可见附录
                            </div>
                            <div class="yy_t noSplitBox">
                                （二）经典案例解读
                            </div>
                            <div v-for="(item, index) in expListQp" :key="index">
                                <div class="yy_t noSplitBox">
                                    （{{ index + 1 }}）{{ item.name }}问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    <img class="yy_img" src="../../assets//images/report/t001.png" alt="">
                                </div>
                                <div class="yy_t noSplitBox">
                                    【空间配置】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt1 }}
                                </div>
                                <div class="yy_t noSplitBox">
                                    【关键沙具】
                                </div>
                                <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                                    <span style="font-weight: 500;">{{ iteml.title }}：</span>
                                    <span>{{ iteml.txt }}</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt2 }}
                                </div>
                            </div>

                            <div class="yy_t noSplitBox">
                                （三）指导建议
                            </div>
                            <!-- 强迫指导建议 -->
                            <div class="yy_guide">
                                <div class="yy_t noSplitBox">
                                    （1）轻度问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>识别自己的某些强迫的观念，例如：外面非常脏，有无数细菌，回家要把每一个细菌都消灭或者洗掉，并觉察由这些信念引起的焦虑情绪，接纳和安抚这种焦虑的情绪。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>对自己的强迫症状采取不批判、不对抗的态度，学会跟它们和平共处，带着症状去生活。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>寻找可替代的同样可以缓解焦虑情绪的行为，而这种行为对自己的身体和社会功能没有损害性。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>觉察学习、考试成绩对自己的意义，是否将自己的价值都寄托于它们之上，找到更多评价自己的体系，拓宽自己的价值视野。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>情绪不好时及时寻求家人和朋友的帮助。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>必要时进行心理咨询，表达自己强迫的观念或行为以及由此引发的情绪，宣泄这些情绪，有利于症状的减轻。</div>
                                </div>

                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">情趣陶冶：</span>
                                    <span>养宠物、聆音、冥想、书法、绘画、唱歌、旅行等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">运动建议：</span>
                                    <span>健步走、慢跑、太极拳、游泳、骑自行车、跳舞、瑜伽、打球等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        家庭成员对个体给予无条件的爱，尽量减少对个体的批判，看到个体强迫行为背后焦虑的情绪，看到个体对发生的事情有强烈的责任，理解并接纳个体的强迫思维和行为，用爱和关心拥抱个体，降低个体的焦虑。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>多带个体亲近大自然，感受放松的环境，缓解焦虑的情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>必要时带个体去做心理咨询，求助专业人员的帮助。例如：箱庭治疗、ERP（暴露与反应阻止疗法）治疗等。</div>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>样化的技能，让个体在学习中体验到不让个体崩溃的压力，同时能学校与相关管理者应淡化成绩对个体的评价影响，并鼓励个体发展多促进个体成长进步。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>多开展团体活动，让个体宣泄自己的想法和情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校与相关管理者设立减压室，心理服务中心，鼓励个体进行对自己的焦虑情绪进行表达等等。</div>
                                </div>

                                <!-- 中度 -->
                                <div class="yy_t noSplitBox">
                                    （2）中度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险个人角度的建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>理咨询服务的帮助主动寻求心理援助，例如去精神科医院就医，遵医嘱服药，并寻求心。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>当强迫思维和行为影响到学习时，首先不否定自己，及时寻求身边人的理解和帮助。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照低风险家庭角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应观察孩子的行为或强迫思维，允许孩子有这些强迫症状，并和孩子一起面对它们。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家人带领但不强迫个体去精神科医院就诊，此外还可以带个体寻求心理咨询服务的帮助。</div>
                                </div>
                                <div class="yy_t noSplitBox" style="font-weight: 500;">
                                    家庭爱的链接:
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭欢聚：</span>
                                    <span>家庭共进晚餐、外出享受美食、品茶畅聊、共同享受美好厨房时光等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭旅行：</span>
                                    <span>共同制定旅行计划、海边沙滩享受日光浴、郊外徒步旅行登山等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭文化活动：</span>
                                    <span>全家一起阅读、赏花灯、写春联、看春晚、赏龙舟等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭运动活动：</span>
                                    <span>全家一起散步、打球、与父亲进行拳击比赛等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照低风险学校角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校定期进行危机排查工作，不强化成绩对学生的评价作用。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校应主动与家长合作，给学生一个放松的环境，鼓励学生发展自己的特长等等。</div>
                                </div>
                                <!-- 重度 -->
                                <div class="yy_t noSplitBox">
                                    （3）重度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照中风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>当自己的强迫症状严重影响学习时，不对自己的症状产生巨大的排斥和反抗，相信自己通过专业的治疗，症状会有所缓解。</div>
                                </div>

                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>建议及时去医院就医，必要时进行住院治疗，严格遵医嘱，并辅助心理咨询服务。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照中风险家庭角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长或家人尽量不提学习成绩，为个体提供温暖的包容的环境，关心个体的身体健康和生理、心理需要，并满足这些需要，安抚个体的情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>建议家长带领但不强迫个体去医院就医，并为孩子寻找合适的心理咨询服务。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参照中风险学校角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校应观察学生的在校状况，尊重并不歧视有明显强迫症状的学生，在教学安排上允许学生有强迫行为，并鼓励身边的同学帮助该个体，避免污名化对个体的二次伤害。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可以开展相应的心理健康课程，帮助个人正确认识强迫症或强迫症状，进行心理健康教育。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校可以开展相应的主题团体辅导活动，在安全、受保护的空间里，鼓励大家去表达自身，让个人明白并非只有自己才有，减轻个体的病耻感。</div>
                                </div>

                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>建议学校定时进行危机排查，鼓励其家人带领并不强迫个体就医，必要时进行住院治疗，有条件的话，可协助提供合适的心理咨询资源。</div>
                                </div>
                            </div>
                        </div>

                        <!-- 敌对 -->
                        <div>
                            <div class="yy_t noSplitBox mulu_page">
                                2.2.5 敌对维度样例
                            </div>
                            <div class="yy_t noSplitBox">
                                （一）敌对维度在沙盘中的表现特征
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>冲突性场景的构建</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>攻击性沙具的使用</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>界限和障碍的设置</div>
                            </div>
                            <div class="yy_txt noSplitBox">
                                详细解释可见附录
                            </div>
                            <div class="yy_t noSplitBox">
                                （二）经典案例解读
                            </div>
                            <div v-for="(item, index) in expListDd" :key="index">
                                <div class="yy_t noSplitBox">
                                    （{{ index + 1 }}）{{ item.name }}问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    <img class="yy_img" src="../../assets//images/report/t001.png" alt="">
                                </div>
                                <div class="yy_t noSplitBox">
                                    【空间配置】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt1 }}
                                </div>
                                <div class="yy_t noSplitBox">
                                    【关键沙具】
                                </div>
                                <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                                    <span style="font-weight: 500;">{{ iteml.title }}：</span>
                                    <span>{{ iteml.txt }}</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt2 }}
                                </div>
                            </div>

                            <div class="yy_t noSplitBox">
                                （三）指导建议
                            </div>
                            <!-- 敌对指导建议 -->
                            <div class="yy_guide">
                                <div class="yy_t noSplitBox">
                                    （1）轻度问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>觉察自己愤怒的情绪或者其他的情绪，以及引起这些情绪的原因，面对和接纳这些情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>寻找舒缓自己情绪的活动，例如：户外运动或室内对抗性运动，宣泄自己的情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>寻求家人和朋友的帮助。例如：自己想打人时，用语言表达自己的愤怒，或者告诉家人和朋友，自己有想打人的冲动，用语言表达出来，而不是攻击行为。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>必要时寻求学校心理老师的帮助。</div>
                                </div>

                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">情趣陶冶：</span>
                                    <span>养宠物、聆音、冥想、书法、绘画、唱歌、旅行等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">运动建议：</span>
                                    <span>健步走、慢跑、太极拳、游泳、骑自行车、跳舞、瑜伽、打球等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>理解个体敌对行为背后的心理原因，关注个体内心的恐惧、悲伤等情绪，抱持这些负面情绪，用耐心和爱心支持个体。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>必要时寻求专业机构或者心理咨询的帮助等等。</div>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>对个体的负面行为给予负面的反馈，但不否定个体的人格，不伤害个体的自尊。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>用团体辅导的形式让个体表达人际间的情绪问题，让个体看到自己的人际交往模式，用团体的力量影响个体的认知和行为风格等等。</div>
                                </div>

                                <!-- 中度 -->
                                <div class="yy_t noSplitBox">
                                    （2）中度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>先运用理性学会控制自己的伤害行为，找到替代的非伤害的行为舒缓自己的情绪。例如：学习拳击（而不是打人）去发泄自己的情绪等等。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险家庭角度的建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>父母或者家人自己不用暴力解决问题，包括肢体暴力和语言暴力，用温和的态度对待个体，用理性和商量的方式解决分歧与问题，给个体树立良好的榜样。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>教授或者影响个体用语言或者其他非伤害的形式表达自己的情绪或者想法，接纳个体的表达，并给予正向的回应。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>明白孩子的改变并非一朝一夕，家长要有耐心和爱心，陪伴孩子纠正自己的行为。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        家长对孩子的敌对行为不做出二次惩罚，例如孩子在学校打了同学，家长以坚定的态度和孩子沟通，而不是用打骂的方式教育孩子。家长教育孩子的方式直接影响了孩子处理关系的方式。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家人应学习如何科学应对个体的敌意行为，必要时寻求专业机构和心理咨询的帮助。</div>
                                </div>
                                <div class="yy_t noSplitBox" style="font-weight: 500;">
                                    家庭爱的链接:
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭欢聚：</span>
                                    <span>家庭共进晚餐、外出享受美食、品茶畅聊、共同享受美好厨房时光等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭旅行：</span>
                                    <span>共同制定旅行计划、海边沙滩享受日光浴、郊外徒步旅行登山等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭文化活动：</span>
                                    <span>全家一起阅读、赏花灯、写春联、看春晚、赏龙舟等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭运动活动：</span>
                                    <span>全家一起散步、打球、与父亲进行拳击比赛等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险学校角度的建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>针对这一群体，多开展团体咨询，让孩子有机会体验到别人的想法增强孩子的理解和共情别人的能力。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>对个体进行心理评估，定期对个体进行心理治疗或者咨询等等。</div>
                                </div>
                                <!-- 重度 -->
                                <div class="yy_t noSplitBox">
                                    （3）重度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>当自己的愤怒情绪波动很大想用攻击行为解决问题时，让自己默数 10个数，或者深呼吸，用第三方的视角看自己当下的状态，觉察攻击行为的后果。</div>
                                </div>

                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>寻求专业机构或心理咨询的帮助。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险家庭角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        家长积极与学校合作，向老师及时反馈在家状况，无论孩子表现多么糟糕，都不能以暴制暴，要用理性坚定的语言和温和的态度帮助孩子理解别人被攻击后的痛苦，并引导孩子做出积极的行为。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>必要时带领但不强迫个体去专业机构寻求帮助，并带孩子进行心理咨询。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险学校角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>与个体的家长或家人合作，探索行为背后的原因、情绪以及目的，励个体表达自己的负面情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>定期检查个体的心理状态，与个体家人合作，在专业机构和心理医生的建议下联合制定应对方案。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>鼓励个体做利他的行为，并在发现个体有这种行为之后给予高度的赞赏，让个体在利他行为之后体验到被欣赏和价值感，及时强化等等。</div>
                                </div>

                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>建立监督机制，对比较严重的敌对行为给于惩罚。但不伤害个体的自尊，不否定个体的人格，创造个体为他人服务的可能性，提高个体的价值感。</div>
                                </div>
                            </div>
                        </div>

                        <!-- 自我伤害 -->
                        <div>
                            <div class="yy_t noSplitBox mulu_page">
                                2.2.6 自我伤害维度样例
                            </div>
                            <div class="yy_t noSplitBox">
                                （一）自我伤害维度在沙盘中的表现特征
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>破坏性和荒凉感的场景</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>选择具有攻击性和残缺相关的沙具</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>孤立或受困的角色</div>
                            </div>
                            <div class="yy_txt yy_txt_c noSplitBox">
                                <span class="yy_crl"></span>
                                <div>重复的死亡和毁灭象征</div>
                            </div>
                            <div class="yy_txt noSplitBox">
                                详细解释可见附录
                            </div>
                            <div class="yy_t noSplitBox">
                                （二）经典案例解读
                            </div>
                            <div v-for="(item, index) in expListZwsh" :key="index">
                                <div class="yy_t noSplitBox">
                                    （{{ index + 1 }}）{{ item.name }}问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    <img class="yy_img" src="../../assets//images/report/t001.png" alt="">
                                </div>
                                <div class="yy_t noSplitBox">
                                    【空间配置】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt1 }}
                                </div>
                                <div class="yy_t noSplitBox">
                                    【关键沙具】
                                </div>
                                <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                                    <span style="font-weight: 500;">{{ iteml.title }}：</span>
                                    <span>{{ iteml.txt }}</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    {{ item.txt2 }}
                                </div>
                            </div>

                            <div class="yy_t noSplitBox">
                                （三）指导建议
                            </div>
                            <!-- 自我伤害指导建议 -->
                            <div class="yy_guide">
                                <div class="yy_t noSplitBox">
                                    （1）轻度问题
                                </div>
                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>觉察自己负面的情绪，以及这些情绪产生的情景以及原因。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>寻找家人或者朋友表达并宣泄自身负面的情绪，明白自己内心真实的想法。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>觉察自己是否将自己的人生价值放在某件单一的事情上，例如学习成绩、升学考试等。尝试寻找更多人生的意义，在自己喜欢或者擅长的事情上获得成就感和满足感。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>如果外部压力非常大，尝试屏蔽这些压力，守护好自己的世界，积极寻找支持自己的资源和力量。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>感觉自身需要的时候，可以寻找学校心理老师的帮助。</div>
                                </div>

                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">情趣陶冶：</span>
                                    <span>养宠物、聆音、冥想、书法、绘画、唱歌、旅行等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">运动建议：</span>
                                    <span>健步走、慢跑、太极拳、游泳、骑自行车、跳舞、瑜伽、打球等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长不去对孩子提出过高的要求，觉察孩子的消极情绪，帮助孩子度过人生中的困难。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长鼓励孩子做自己喜欢的事，并对一点点的进步给于极大的鼓励和欣赏。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长关注孩子日常的情绪变化，有必要时，及时带孩子寻求专业机构或心理咨询帮助等等。</div>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>降低社会评价体系对个体的影响，尽量避免公开公布成绩排名等信息。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>提供更多的娱乐项目，丰富个体的生活，减轻压力，找到学习与生活之间的平衡状态等等。</div>
                                </div>

                                <!-- 中度 -->
                                <div class="yy_t noSplitBox">
                                    （2）中度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>筋弹自己的手腕，用双手拍自己的四肢等，让自己紧张、焦虑与痛当有自伤想法或冲动时，用其他非伤害的动作感受自己，例如用橡皮苦的情绪得到舒缓。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>寻求专业机构、医院或者心理咨询的帮助等等。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险家庭角度的建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>面对有自伤行为的孩子，家长应及时发现并给予充分的关心和爱护，家长不能批评指责孩子，或者在孩子的威胁中任由孩子做任何事。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长给予孩子无条件的爱，不因孩子学习不好，就不爱孩子，让孩子感受到无论自己多么糟糕，家人都是爱自己、支持自己的。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>
                                        家长可与孩子交谈，找到孩子自伤背后真正的原因，并做出相应的改变。例如孩子有自己的兴趣爱好，却不被家长支持，或者有自己的生活喜欢不被家长接纳，家长应给孩子更多的自由去探索世界，不必过分担心和焦虑孩子的未来。
                                    </div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长发现孩子有自伤的行为之后，应带领但不强迫孩子去医院就医，遵医嘱服药，或者寻求心理咨询的帮助。</div>
                                </div>
                                <div class="yy_t noSplitBox" style="font-weight: 500;">
                                    家庭爱的链接:
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭欢聚：</span>
                                    <span>家庭共进晚餐、外出享受美食、品茶畅聊、共同享受美好厨房时光等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭旅行：</span>
                                    <span>共同制定旅行计划、海边沙滩享受日光浴、郊外徒步旅行登山等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭文化活动：</span>
                                    <span>全家一起阅读、赏花灯、写春联、看春晚、赏龙舟等。</span>
                                </div>
                                <div class="yy_txt noSplitBox">
                                    <span style="font-weight: 400;">家庭运动活动：</span>
                                    <span>全家一起散步、打球、与父亲进行拳击比赛等。</span>
                                </div>

                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考低风险学校角度的建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>组织团体辅导活动，让个体在团体中表达自己的情绪感受，获得团体人际间的支持，增强个体的自我强度，应对生活中的压力。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>对个体的价值进行多元化的评估，不以某个单一的结果衡量个体的价值，例如不以学生的成绩衡量个体的全部价值等等。</div>
                                </div>
                                <!-- 重度 -->
                                <div class="yy_t noSplitBox">
                                    （3）重度问题
                                </div>

                                <div class="yy_t noSplitBox">
                                    【个人角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议个人从以下几个方面调整自己：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险个人角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>当情绪非常痛苦时，及时拨打危机干预电话，寻求专业机构、医院、心理咨询、警察的帮助等等。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【家庭角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议家长从以下几个方面与孩子相处：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险家庭角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长应与学校密切合作，经常了解孩子在学校的情况，特别是考试前或者考试成绩不理想之后，及时安抚孩子的情绪。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>家长还可以及时寻求医院、专业机构的帮助，在专业的方案指导下保护孩子，并寻找合适的心理咨询资源给孩子。</div>
                                </div>


                                <div class="yy_t noSplitBox">
                                    【学校角度】
                                </div>
                                <div class="yy_txt noSplitBox">
                                    建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>参考中风险学校角度建议。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>对高危自伤人群给于重点关注，联合孩子家长制定专业看护方案，保护个体的人生安全。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>对学生建立心理档案，对高敏感的孩子给予特殊关注。</div>
                                </div>
                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>建立危机排查机制，与家长合作，联合专业机构、医院或者咨询师制定应对方案。</div>
                                </div>

                                <div class="yy_txt yy_txt_c noSplitBox">
                                    <span class="yy_crl"></span>
                                    <div>学校应建议家长带孩子去专科医院就医，遵医嘱服药，并辅助心理咨询治疗等等。</div>
                                </div>
                            </div>
                        </div>
                        <!-- </div> -->


                    </div>


                    <!-- 3.测评结果 -->
                    <div class="yy_box basic_box">
                        <div class="noSplitBox">
                            <div class="yy_o noSplitBox mulu_page">
                                3.测评结果
                            </div>
                            <div class="yy_t noSplitBox mulu_page">
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
                                        <span>八一中学</span>
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
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                </tr>
                                <tr class="pdf-details">
                                    <td>八一学校</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                </tr>
                                <tr class="pdf-details">
                                    <td>全国常模</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                </tr>
                            </table>
                            <div class="yy_biao" style="text-align: center;margin-top: -20px;margin-bottom: 20px;">图 3
                                心理健康问题检出率对比分布</div>

                            <div class="yy_txt">
                                八一学校的学生中，较为突出的两类心理健康问题为焦虑和抑郁，分别为 31.9%和 24.3%，存在敌对和强迫的学生相对较少，分别为 18.6%和 18.8%。
                            </div>
                            <div class="yy_txt">
                                与全国常模相比，本校学生在自我伤害、敌对方面问题较小，强迫、抑郁和焦虑方面有待改善。其中，抑郁维度超出常模 4.4%。
                            </div>
                        </div>
                        <div class="noSplitBox">
                            <div style="width: 100%;height: auto;margin: 10px auto 0px;">
                                <div style="width: 75%;height: 280px;margin: 0 auto;" class="myChart" ref="myChart4">
                                </div>

                            </div>
                            <table class="cm_table" cellspacing="0" style="margin-bottom: 10px;">
                                <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                    <th></th>
                                    <th>抑郁</th>
                                    <th>焦虑</th>
                                    <th>强迫</th>
                                    <th>敌对</th>
                                    <th>自我伤害</th>
                                </tr>
                                <tr class="pdf-details noSplitBox">
                                    <td>
                                        <div style="display: flex;justify-content: center;align-items: center;"><span
                                                style="margin-right:6px; width: 10px;height: 10px;border-radius: 50%;background: #8ACBFF"></span><span>轻度问题</span>
                                        </div>
                                    </td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                </tr>
                                <tr class="pdf-details noSplitBox">
                                    <td>
                                        <div style="display: flex;justify-content: center;align-items: center;"><span
                                                style="margin-right:6px; width: 10px;height: 10px;border-radius: 50%;background: #FFDDA0"></span><span>中度问题</span>
                                        </div>
                                    </td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                </tr>
                                <tr class="pdf-details noSplitBox">
                                    <td>
                                        <div style="display: flex;justify-content: center;align-items: center;"><span
                                                style="margin-right:6px; width: 10px;height: 10px;border-radius: 50%;background: #FE9D9D"></span><span>重度问题</span>
                                        </div>
                                    </td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                </tr>
                            </table>
                            <div class="noSplitBox legends noSplitBox1"
                                style="width: 100%;height: auto;margin: 0px auto 10px;">
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
                            <div class="yy_biao" style="text-align: center;margin-top: 0px;margin-bottom: 20px;">图 4
                                心理健康检出率分布图
                            </div>
                        </div>




                        <div class="yy_txt noSplitBox">
                            根据图 4 所示的心理健康轻问题检出率分布图，我们可以得出以下几点重要发现：
                        </div>
                        <div class="yy_txt noSplitBox">
                            <span style="font-weight: 500;">焦虑问题最为普遍：</span>
                            <span>在所有心理健康问题中，焦虑问题的检出率最高，达到 31.9%。其中，焦虑轻度问题占绝大多数，占比高达 25.7%，焦虑中度问题占比 3.6%，焦虑重度问题占比
                                2.6%。这表明焦虑是本校中小学生中最常见的心理健康问题。</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            <span style="font-weight: 500;">抑郁问题次之：</span>
                            <span>抑郁问题的总检出率为 24.3%，其中抑郁轻度问题占比最大，为 21.7%，抑郁中度问题占比 2.4%，抑郁重度问题占比
                                0.2%。抑郁问题仅次于焦虑问题，成为本校中小学生心理健康问题中的第二大常见类型。</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            <span style="font-weight: 500;">自我伤害问题不容忽视：</span>
                            <span>自我伤害问题的总检出率为 20.7%，其中自我伤害轻度问题占比最多，为 20.1%，自我伤害中度问题占比 0.5%，自我伤害重度问题占比
                                0.1%。虽然自我伤害问题的检出率稍低一些，但它涉及到学生的生命安全，因此同样值得关注。</span>
                        </div>

                        <div class="yy_txt noSplitBox">
                            <span style="font-weight: 500;">强迫问题和敌对问题相对较少：</span>
                            <span>强迫问题的总检出率为 18.8%，其中强迫轻度问题占比最大，为 16.5%，强迫中度问题占比 1.5%，强迫重度问题占比 0.9%。敌对问题的总检出率为
                                18.6%，其中敌对轻度问题占比最大，为 16.9%，敌对中度问题占比 1.6%，敌对重度问题占比 0.2%。这两类问题虽然检出率相对较低，但也需要引起注意。</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            综上所述，焦虑问题是本校中小学生最突出的心理健康问题，其次为抑郁问题。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。
                        </div>
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
                                根据图 5 的数据显示，男生在心理健康问题检出率的前三位为焦虑、抑郁、敌对；女生在心理健康问题检出率的前三位为抑郁、自我伤害、焦虑。
                            </div>
                            <div class="yy_txt">
                                具体来看，男生在焦虑（45.4%）、抑郁（29.0%）、敌对（25.6%）、强迫（25.0%）和自我伤害（24.2%）五个维度上的检出率均高于女生。尤其是在焦虑维度，男生的检出率明显超过女生。这可能与男生通常更难以通过社交和情感交流缓解压力有关，导致他们更容易陷入焦虑状态。此外，社会对男生的情感表达常常存在一定的压制，使得他们在面临心理困扰时更倾向于内化这些情绪，而非寻求支持或倾诉，从而加剧了焦虑的表现。因此，针对男生的心理健康干预措施应更加重视情感表达能力的培养和社交支持网络的构建，以帮助他们有效应对心理压力。
                            </div>
                        </div>




                        <div class="noSplitBox mulu_page">
                            <div class="yy_t ">
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
                                <tr class="pdf-details">
                                    <td>预备年级</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                    <td>1.5%</td>
                                </tr>
                                <tr class="pdf-details">
                                    <td>初中一年级</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                    <td>11.5%</td>
                                </tr>
                                <tr class="pdf-details">
                                    <td>高中一年级</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                </tr>
                                <tr class="pdf-details">
                                    <td>全国常模</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                </tr>
                                <tr class="pdf-details">
                                    <td>本校常模</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                    <td>21.5%</td>
                                </tr>
                            </table>
                            <div class="yy_biao" style="text-align: center;margin-top: -30px">注：加*表示该年级检出率同时高于全国常模和本校常模
                            </div>
                        </div>

                        <!-- 这里需要细分一下 -->

                        <div class="yy_txt noSplitBox" style="margin-bottom: 30px;">
                            由表中可以看出，预备年级测评维度检出率由高到低分别为：焦虑（36.1%）、抑郁（23.0%）、敌对（21.6%）、自我伤害（17.4%）、强迫（17.2%）；初中一年级测评维度检出率由高到低分别为：焦虑（28.0%）、抑郁（24.4%）、自我伤害（20.2%）、敌对（16.1%）、强迫（15.4%）；高中一年级测评维度检出率由高到低分别为：焦虑（31.9%）、抑郁（24.3%）、自我伤害（20.7%）、强迫（18.8%）、敌对（18.6%）。
                        </div>


                        <!-- 需要一个学段的数组 -->
                        <div v-for="(item, index) in gradeList" :key="index">
                            <div class="yy_t noSplitBox mulu_page">
                                3.{{ index + 2 }} {{ item.name }}测评分析
                            </div>
                            <div class="noSplitBox">
                                <div class="yy_t mulu_page">
                                    3.{{ index + 2 }}.1 {{ item.name }}测评结果概况
                                </div>
                                <div class="legends" style="width: 100%;height: auto;margin: 10px auto 0px;">
                                    <div style="width: 100%;height: 300px;margin: 0 auto;" class="myChart"
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
                                <!-- <div class="noSplitBox"> -->
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
                                        <td>1.5%</td>
                                        <td>1.5%</td>
                                        <td>1.5%</td>
                                        <td>1.5%</td>
                                        <td>1.5%</td>
                                    </tr>
                                    <tr class="pdf-details noSplitBox">
                                        <td>全国常模</td>
                                        <td>11.5%</td>
                                        <td>11.5%</td>
                                        <td>11.5%</td>
                                        <td>11.5%</td>
                                        <td>11.5%</td>
                                    </tr>
                                    <tr class="pdf-details noSplitBox">
                                        <td>本校常模</td>
                                        <td>21.5%</td>
                                        <td>21.5%</td>
                                        <td>21.5%</td>
                                        <td>21.5%</td>
                                        <td>21.5%</td>
                                    </tr>
                                </table>
                                <div class="yy_txt noSplitBox" style="text-align: center;">图 {{ 6 + 6 * index }}
                                    {{ item.name }}学生心理健康问题检出率对比分布图</div>

                                <!-- </div> -->
                            </div>


                            <div class="yy_txt noSplitBox">
                                与全国常模相比，预备年级学生在强迫、自我伤害方面表现较好，敌对、抑郁和焦虑方面有待改善。其中，焦虑维度和抑郁维度超出全国常模较多，分别超出 6.3%和 3.1%。
                            </div>
                            <div class="yy_txt noSplitBox">
                                与本校常模相比，预备年级学生在强迫、自我伤害和抑郁方面表现较好，在敌对和焦虑方面有待改善。其中，焦虑和敌对维度超出本校常模较多，分别达到 4.2%和 2.3%。
                            </div>
                            <!-- 初中多一个 -->

                            <div class="noSplitBox" style="width: 100%;height: auto;margin: 30px auto 30px;"
                                v-show="item.name.indexOf('初中') != -1">
                                <div style="width: 75%;height: 280px;margin: 0 auto;" class="myChart"
                                    :ref="'myChart9' + index"></div>
                                <div class="yy_biao" style="text-align: center;">直升与非直升学生心理健康问题检出率分布图</div>
                                <div class="yy_txt">
                                    从上图中可以看出，初中 11-20 班（非本校直升）学生在敌对、自我伤害和抑郁等维度上表现出更高的检出率，尤其是抑郁和自我伤害问题更为明显。相对而言，初中 1-10
                                    班（本校直升）学生在强迫和焦虑维度稍高，说明该群体可能存在较高的自我要求和对学业的焦虑。
                                </div>
                            </div>
                            <!-- <div class="noSplitBox" style="width: 100%;height: auto;margin: 30px auto;">
                            <div style="width: 400px;height: 400px;">{{item.name}}--柱状图</div>
                            <div class="yy_biao" style="text-align: center;"></div>
                        </div> -->


                            <div class="yy_t mulu_page">
                                3.{{ index + 2 }}.2 {{ item.name }}各维度检出率情况
                            </div>
                            <div v-for="(itemw, indexw) in item.wdList" :key="indexw">

                                <div class="noSplitBox" style="width: 100%;height: auto;margin: 10px auto 15px;">
                                    <div class="yy_t mulu_page">
                                        3.{{ index + 2 }}.2.{{ indexw + 1 }} {{ itemw.name }}维度
                                    </div>
                                    <div style="width: 80%;height: 260px;margin: 0 auto;" class="myChart"
                                        :ref="'myChart2' + index + indexw"></div>
                                    <!-- <div class="myChartZhe1" id="myChartZhe1" ref="myChartZhe1"></div> -->
                                    <div class="rtr_ul">
                                        <ul>
                                            <li><span class="r_cir1"></span>{{ itemw.name }}</li>
                                            <li><span class="r_line1"></span>全国常模</li>
                                            <li><span class="r_line2"></span>本校常模</li>
                                        </ul>
                                    </div>
                                    <div class="yy_biao" style="text-align: center;">图 {{ 6 + 6 * index + indexw + 1 }}
                                        {{ item.name }}{{ itemw.name }}检出率对比图</div>
                                    <!-- </div>
                            <div class="noSplitBox"> -->
                                    <div class="yy_biao" style="text-align: center;">表 {{ 4 + 5 * index + indexw + 1 }}
                                        {{ itemw.name }}维度重点关注班级列表</div>
                                    <table cellspacing="0" style="width: 80%;">
                                        <tr class="pdf-details noSplitBox" style="background: #e9e9e9">

                                            <th>情况描述</th>
                                            <th>班级</th>
                                        </tr>
                                        <tr class="pdf-details noSplitBox">
                                            <td>高于全国常模和年级常模</td>
                                            <td>
                                                3 班、4 班*、5 班*、7 班、8 班*、10 班
                                            </td>

                                        </tr>

                                    </table>
                                    <div class="yy_biao"
                                        style="text-align: center;margin-top: -30px;margin-bottom: 10px;">
                                        注：加*表示该班检出率同时高于全国常模和年级常模</div>
                                </div>
                            </div>
                            <div class="yy_t noSplitBox" style="text-align: center;margin: 30px 0 10px">
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
                                <tr class="pdf-details noSplitBox" v-for="(itemc, indexc) in item.csList" :key="indexc">
                                    <td>{{ itemc.name }}</td>
                                    <td>{{ itemc.name }}*</td>
                                    <td>{{ itemc.name }}</td>
                                    <td>{{ itemc.name }}*</td>
                                    <td>{{ itemc.name }}</td>
                                    <td>{{ itemc.name }}</td>
                                </tr>

                            </table>
                            <div class="yy_biao noSplitBox"
                                style="text-align: center;margin-top: -30px;margin-bottom: 30px;">
                                注：加*表示该班检出率同时高于全国常模和年级常模
                            </div>

                            <div class="noSplitBox" style="width: 100%;height: auto;margin: 30px auto;">
                                <div class="yy_t mulu_page">
                                    3.{{ index + 2 }}.3 {{ item.name }}不同性别测评情况
                                </div>
                                <div v-show="item.name.indexOf('初中') == -1">
                                    <div style="width: 100%;height: 500px;margin: 0 auto;" class="myChart"
                                        :ref="'myChart3' + index"></div>
                                    <table cellspacing="0" style="position: relative">
                                        <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                            <th width="5%">
                                                <div
                                                    style="position: absolute;left: -1px;top: -1px;width: 97px;height: 106px;background: #fff;">
                                                </div>
                                            </th>
                                            <th width="10%" colspan="2">抑郁</th>
                                            <th width="10%" colspan="2">焦虑</th>
                                            <th width="10%" colspan="2">强迫</th>
                                            <th width="10%" colspan="2">敌对</th>
                                            <th width="10%" colspan="2">自我伤害</th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FE9D9D"></span>
                                                <span>重度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FFDDA0"></span>
                                                <span>中度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #8ACBFF"></span>
                                                <span>轻度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #B5ECAF"></span>
                                                <span>正常</span>
                                            </th>
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

                                    </table>
                                    <div class="yy_txt noSplitBox">
                                        在抑郁维度中，男生正常人数为 171 人（75.7%），轻度问题为48 人（21.2%），中度问题为 6 人（2.7%），重度问题为 1
                                        人（0.4%）；女生正常人数为
                                        147
                                        人（78.6%），轻度问题为 37 人（19.8%），中度问题为 3 人（1.6%），重度问题为 0 人（0%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在焦虑维度中，男生正常人数为 100 人（44.3%），轻度问题为104 人（46.0%），中度问题为 13 人（5.8%），重度问题为 9
                                        人（4.0%）；女生正常人数为
                                        164
                                        人（87.7%），轻度问题为 17 人（9.1%），中度问题为 1 人（0.5%），重度问题为 5 人（2.7%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在强迫维度中，男生正常人数为 170 人（75.2%），轻度问题为49 人（21.7%），中度问题为 2 人（0.9%），重度问题为 5
                                        人（2.2%）；女生正常人数为
                                        172
                                        人（92.0%），轻度问题为 13 人（7.0%），中度问题为 0 人（0%），重度问题为 2 人（1.1%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在敌对维度中，男生正常人数为 154 人（68.1%），轻度问题为66 人（29.2%），中度问题为 5 人（2.2%），重度问题为 1
                                        人（0.4%）；女生正常人数为
                                        170
                                        人（90.9%），轻度问题为 13 人（7.0%），中度问题为 4 人（2.1%），重度问题为 0 人（0%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在自我伤害维度中，男生正常人数为 179 人（79.2%），轻度问题为 45 人（19.9%），中度问题为 2 人（0.9%），重度问题为 0
                                        人（0%）；女生正常人数为
                                        162
                                        人（86.6%），轻度问题为 25 人（13.4%），中度问题为 0 人（0%），重度问题为 0 人（0%）。
                                    </div>
                                </div>

                                <div v-show="item.name.indexOf('初中') != -1">

                                    <div class="yy_t" style="text-align: center;margin: 20px 0;">
                                        {{ item.name }}直升班不同性别测评情况
                                    </div>
                                    <div style="width: 100%;height: 500px;margin: 0 auto;" class="myChart"
                                        :ref="'myChart31' + index"></div>
                                    <table cellspacing="0" style="position: relative">
                                        <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                            <th width="5%">
                                                <div
                                                    style="position: absolute;left: -1px;top: -1px;width: 97px;height: 106px;background: #fff;">
                                                </div>
                                            </th>
                                            <th width="10%" colspan="2">抑郁</th>
                                            <th width="10%" colspan="2">焦虑</th>
                                            <th width="10%" colspan="2">强迫</th>
                                            <th width="10%" colspan="2">敌对</th>
                                            <th width="10%" colspan="2">自我伤害</th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FE9D9D"></span>
                                                <span>重度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FFDDA0"></span>
                                                <span>中度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #8ACBFF"></span>
                                                <span>轻度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #B5ECAF"></span>
                                                <span>正常</span>
                                            </th>
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

                                    </table>
                                    <div class="yy_txt noSplitBox">
                                        在抑郁维度中，男生正常人数为 171 人（75.7%），轻度问题为48 人（21.2%），中度问题为 6 人（2.7%），重度问题为 1
                                        人（0.4%）；女生正常人数为
                                        147
                                        人（78.6%），轻度问题为 37 人（19.8%），中度问题为 3 人（1.6%），重度问题为 0 人（0%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在焦虑维度中，男生正常人数为 100 人（44.3%），轻度问题为104 人（46.0%），中度问题为 13 人（5.8%），重度问题为 9
                                        人（4.0%）；女生正常人数为
                                        164
                                        人（87.7%），轻度问题为 17 人（9.1%），中度问题为 1 人（0.5%），重度问题为 5 人（2.7%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在强迫维度中，男生正常人数为 170 人（75.2%），轻度问题为49 人（21.7%），中度问题为 2 人（0.9%），重度问题为 5
                                        人（2.2%）；女生正常人数为
                                        172
                                        人（92.0%），轻度问题为 13 人（7.0%），中度问题为 0 人（0%），重度问题为 2 人（1.1%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在敌对维度中，男生正常人数为 154 人（68.1%），轻度问题为66 人（29.2%），中度问题为 5 人（2.2%），重度问题为 1
                                        人（0.4%）；女生正常人数为
                                        170
                                        人（90.9%），轻度问题为 13 人（7.0%），中度问题为 4 人（2.1%），重度问题为 0 人（0%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在自我伤害维度中，男生正常人数为 179 人（79.2%），轻度问题为 45 人（19.9%），中度问题为 2 人（0.9%），重度问题为 0
                                        人（0%）；女生正常人数为
                                        162
                                        人（86.6%），轻度问题为 25 人（13.4%），中度问题为 0 人（0%），重度问题为 0 人（0%）。
                                    </div>
                                    <div class="yy_t" style="text-align: center;margin: 20px 0;">
                                        {{ item.name }}非直升班不同性别测评情况
                                    </div>
                                    <div style="width: 100%;height: 500px;margin: 0 auto;" class="myChart"
                                        :ref="'myChart32' + index"></div>
                                    <table cellspacing="0" style="position: relative">
                                        <tr class="pdf-details noSplitBox" style="background: #e9e9e9">
                                            <th width="5%">
                                                <div
                                                    style="position: absolute;left: -1px;top: -1px;width: 97px;height: 106px;background: #fff;">
                                                </div>
                                            </th>
                                            <th width="10%" colspan="2">抑郁</th>
                                            <th width="10%" colspan="2">焦虑</th>
                                            <th width="10%" colspan="2">强迫</th>
                                            <th width="10%" colspan="2">敌对</th>
                                            <th width="10%" colspan="2">自我伤害</th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FE9D9D"></span>
                                                <span>重度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #FFDDA0"></span>
                                                <span>中度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #8ACBFF"></span>
                                                <span>轻度</span>
                                            </th>
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
                                        <tr class="pdf-details noSplitBox">
                                            <th style="display: flex;align-items: center;justify-content: center">
                                                <span
                                                    style="width: 10px;height: 10px;border-radius: 50%;margin-right: 6px;background: #B5ECAF"></span>
                                                <span>正常</span>
                                            </th>
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

                                    </table>
                                    <div class="yy_txt noSplitBox">
                                        在抑郁维度中，男生正常人数为 171 人（75.7%），轻度问题为48 人（21.2%），中度问题为 6 人（2.7%），重度问题为 1
                                        人（0.4%）；女生正常人数为
                                        147
                                        人（78.6%），轻度问题为 37 人（19.8%），中度问题为 3 人（1.6%），重度问题为 0 人（0%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在焦虑维度中，男生正常人数为 100 人（44.3%），轻度问题为104 人（46.0%），中度问题为 13 人（5.8%），重度问题为 9
                                        人（4.0%）；女生正常人数为
                                        164
                                        人（87.7%），轻度问题为 17 人（9.1%），中度问题为 1 人（0.5%），重度问题为 5 人（2.7%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在强迫维度中，男生正常人数为 170 人（75.2%），轻度问题为49 人（21.7%），中度问题为 2 人（0.9%），重度问题为 5
                                        人（2.2%）；女生正常人数为
                                        172
                                        人（92.0%），轻度问题为 13 人（7.0%），中度问题为 0 人（0%），重度问题为 2 人（1.1%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在敌对维度中，男生正常人数为 154 人（68.1%），轻度问题为66 人（29.2%），中度问题为 5 人（2.2%），重度问题为 1
                                        人（0.4%）；女生正常人数为
                                        170
                                        人（90.9%），轻度问题为 13 人（7.0%），中度问题为 4 人（2.1%），重度问题为 0 人（0%）。
                                    </div>
                                    <div class="yy_txt noSplitBox">
                                        在自我伤害维度中，男生正常人数为 179 人（79.2%），轻度问题为 45 人（19.9%），中度问题为 2 人（0.9%），重度问题为 0
                                        人（0%）；女生正常人数为
                                        162
                                        人（86.6%），轻度问题为 25 人（13.4%），中度问题为 0 人（0%），重度问题为 0 人（0%）。
                                    </div>
                                </div>



                            </div>
                            <div class="yy_t mulu_page">
                                3.{{ index + 2 }}.4 {{ item.name }}重点关注人群名单
                            </div>
                            <div class="yy_txt noSplitBox">
                                说明：重点关注人群名单（共 40 人，占预备年级总人数 9.9%），主要包含单项维度达到重度问题人群、多项维度预警人群以及操作流程性问题人群（沙具总数少、时间短）这三类人群。
                            </div>
                            <div class="yy_txt noSplitBox" style="color: #f00;">
                                {{ item.name }}重点关注人群名单见附件一。
                            </div>
                            <!-- <div class="noSplitBox" style="width: 100%;height: 40px;"></div> -->
                        </div>
                    </div>
                    <!-- 附录 -->
                    <div class="yy_box noSplitBox mulu_page">
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
                                <!-- <div rowspan="3">抑郁</div> -->
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
                                <!-- <div rowspan="4">抑郁</div> -->
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
                                <!-- <div rowspan="3">抑郁</div> -->

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
                                <!-- <div rowspan="4">抑郁</div> -->
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

                    <!-- <div class="yy_t noSplitBox">
    （2）各学段各维度检出率：不同学段学生在心理健康问题上表现出不同的特点，焦虑、抑郁在各学段上的问题都比较突出。除焦虑、抑郁问题外，预备年级敌对问题相对突出，初中学段自我伤害比例有所提升，高中学段强迫问题显现。
</div>
<div class="yy_t noSplitBox">
    （3）初中一年级直升与非直升班各维度检出率：初中非直升班相比直升班心理问题更加显著。直升班的心理健康问题检出率的前三位为焦虑（28.0%）、抑郁（21.5%）、强迫（16.7%）；非直升班的心理健康问题检出率的前三位为：焦虑（27.9%）、抑郁（27.2%）、自我伤害（23.7%）。
</div>
<div class="yy_t noSplitBox">
    （4）男女不同性别各维度检出率：相较于女生，男生心理问题更加突出，且呈现更明显的敌对倾向。男生心理健康问题检出率的前三位为焦虑（45.4%）、抑郁（29.0%）和敌对（25.6%）；女生心理健康问题检出率的前三位为抑郁（18.9%）、自我伤害（16.7%）和焦虑（16.4%）。
</div> -->
                    <!-- </div> -->

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
            <!-- 导出团体报告 -->
            <el-dialog class="fix_pass fix_pass3" :close-on-click-modal="false" title="导出团体报告"
                :visible.sync="dialogPartFrame">
                <el-form ref="partsForm" :model="partsForm">

                    <el-form-item label="学校名称：">
                        <el-input disabled v-model="schoolName"></el-input>
                    </el-form-item>
                    <el-form-item label="报告名称：">
                        <el-input v-model="reportName" placeholder="请输入报告名称（例：**年秋季学期）"></el-input>
                        <!-- <div style="width:4rem;height:0.36rem"></div> -->
                        <div class="tip_left" v-show="reportFlag">
                            <div class="tip_msg">
                                <img src="../../assets/images/x.png" alt="" />
                                报告名称不能为空
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item required class="time_data" label="测评时间段:">
                        <el-date-picker v-model="partsForm.time" type="daterange" range-separator="~"
                            start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange">
                        </el-date-picker>
                        <div class="tip_left" v-show="pTimeFlag">
                            <div class="tip_msg">
                                <img src="../../assets/images/x.png" alt="" />
                                请选择测评时间段
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="partsSub">下 载</el-button>
                    <el-button @click="dialogPartFrame = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>

</template>
<script>
import PdfLoader from "@/common/utils/groupPdf";
import echarts from "../../assets/js/echarts";
import { color } from "highcharts";
import Urls from "@/assets/js/url.js";
const Url = 'http://36.110.172.217:11008'
// import { content } from "html2canvas/dist/types/css/property-descriptors/content";
export default {
    data() {
        return {
            detail:{
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
                txtStr: '',
                txtStr52:'',
                txtStr51:'',
                totalClasses: '',
                totalStudents: '',
                maleStudents: '',
                femaleStudents: '',
                yuBei:{

                },
                chuZhong: {

                },
                gaoZhong: {

                }
            },
            schoolName: '',
            reportName: '',
            reportFlag: false,
            start: '',
            end: '',
            pTimeFlag: false,
            dialogPartFrame: false,
            part1: false,
            part2: false,
            part3: false,
            part4: false,
            part5: false,
            part6: false,
            part7: false,
            part8: false,


            partList: {},
            partsForm: {
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
                        },
                        {
                            id: 2,
                            name: '典型样例',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '正常样例',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '抑郁维度样例',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 3,
                                    name: '焦虑维度样例',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '强迫维度样例',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 5,
                                    name: '敌对维度样例',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 6,
                                    name: '自我伤害维度样例',
                                    page: '',
                                    mark: 3
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
                            name: '预备年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '预备年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '预备年级各维度检出率情况',
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
                                    name: '预备年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '预备年级重点关注人群名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 3,
                            name: '初中一年级测评分析',
                            page: '',
                            mark: 2,
                            list: [
                                {
                                    id: 1,
                                    name: '初中一年级测评结果概况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 2,
                                    name: '初中一年级各维度检出率情况',
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
                                    name: '初中一年级不同性别测评情况',
                                    page: '',
                                    mark: 3
                                },
                                {
                                    id: 4,
                                    name: '初中一年级重点关注人群名单',
                                    page: '',
                                    mark: 3
                                }
                            ]
                        },
                        {
                            id: 4,
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
                                    name: '高中一年级重点关注人群名单',
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
                }, {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '预备年级',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '初中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
                }, {
                    grade: '高中',
                    class: 'X2025 届 1 班',
                    personNum: '41',
                    percent: '2.19%'
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
            ],
            // 抑郁样例
            expListYy: [
                {
                    id: 1,
                    name: '轻度',
                    img: '',
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
                    img: '',
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
                    img: '',
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
                    img: '',
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
                    img: '',
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
                    img: '',
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
                    img: '',
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
                    img: '',
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
                    img: '',
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
                    img: '',
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
            gradeList: [
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
                    ]
                },
                {
                    name: '初中一年级',
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
                    ]
                }
            ],
            myChart1: '',
            myChart2: '',
            myChart3: '',
            myChart4: '',
            myChart5: '',
            // myChart91: '',
            // chartList1: []

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
        this.echartInit()
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
        bindmodel() {
            const { part1, part2, part3, part4, part5, part6, part7, part8 } = this;
            return {
                part1,
                part2,
                part3,
                part4,
                part5,
                part6,
                part7,
                part8
            };
        }
    },
    watch: {
        bindmodel: {
            handler: function (newVal) {
                console.log(newVal)
                this.part1 = newVal.part1;
                this.part2 = newVal.part2;
                this.part3 = newVal.part3;
                this.part4 = newVal.part4;
                this.part5 = newVal.part5;
                this.part6 = newVal.part6;
                this.part7 = newVal.part7;
                this.part8 = newVal.part8;
                if (this.part1 && this.part2 && this.part3 && this.part4 && this.part5 && this.part6 && this.part7 && this.part8) {
                    this.part1 = false;
                    this.part2 = false;
                    this.part3 = false;
                    this.part4 = false;
                    this.part5 = false;
                    this.part6 = false;
                    this.part7 = false;
                    this.part8 = false;
                    // this.personExport();
                    this.loading.close();
                    // this.loading = this.$loading({
                    //     lock: true,
                    //     text: "报告生成中",
                    //     spinner: "el-icon-loading",
                    //     background: "rgba(0, 0, 0, 0.7)"
                    // });
                    // setTimeout(() => {
                    //     this.handleExport()
                    // }, 100);


                } else {

                }
            }
        }
    },
    methods: {
        timeChange(val) {
            console.log(val)
            this.pTimeFlag = false
        },
        echartInit() {
            // 参加筛查评估学生学段分布图
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
                        text: '1873',
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
                            formatter: '{b}: {d}%',
                            // emphasis: {
                            //     show: true,
                            //     textStyle: {
                            //         fontSize: 14
                            //     },
                            //     color: "#5B6C89",
                            //     formatter: "{c}"
                            // }
                        },
                        labelLine: {
                            lineStyle: {
                                // color: '#235894',
                                // with: 2
                            }
                        },
                        data: [
                            { value: 413, name: '预备年级' },
                            { value: 840, name: '初中段' },
                            { value: 620, name: '高中段' }
                        ]
                    }
                ]
            });

            // 参加筛查评估男女性别人数对比图
            this.myChart2 = echarts.init(this.$refs.myChart2);
            this.myChart2.setOption({
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
                    top: '5%',     // 顶部距离
                    // bottom: '10%'   // 底部距离
                },
                dataset: {
                    source: [
                        ['product', '男', '女'],
                        ['预备年级', 226, 180],
                        ['初中', 443, 397],
                        ['高中', 330, 290]
                    ]
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
                                    console.log(params)
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
                                    console.log(params)
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
            console.log(this.myChart3);
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
                                value: [10, 22, 33, 14, 65],
                                name: '八一中学'
                            },
                            {
                                value: [30, 40, 30, 50, 60],
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
            this.myChart4 = echarts.init(this.$refs.myChart4);
            console.log(this.myChart4);
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
                    data: ['抑郁', '焦虑', '强迫', '敌对', '自我伤害']
                },
                series: [
                    {
                        name: '轻度问题',
                        type: 'bar',
                        barWidth: 25,
                        stack: 'total',
                        label: {
                            show: true,
                            formatter: (params) => params.value + '%'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [12, 22, 30, 32, 1]
                    },
                    {
                        name: '中度问题',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            // formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
                            formatter: (params) => params.value + '%'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [20, 32, 10, 13, 9]
                    },
                    {
                        name: '重度问题',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            // formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
                            formatter: (params) => params.value + '%'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [20, 12, 1, 14, 9]
                    }
                ]
            });

            // 不同性别学生心理健康问题检出率分布图
            this.myChart5 = echarts.init(this.$refs.myChart5);
            console.log(this.myChart5);
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
                    data: ['抑郁', '焦虑', '强迫', '敌对', '自我伤害']
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
                        data: [10, 100]
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
                        data: [20, 82]
                    }
                ]
            });

            for (let i in this.gradeList) {
                if (this.gradeList[i].name.indexOf('初中') != '-1') {
                    // 直升与非直升学生心理健康问题检出率分布图
                    let zName = 'myChart9' + i
                    this[zName] = echarts.init(this.$refs[zName][0]);
                    console.log(this[zName]);
                    this[zName].setOption({
                        // color: ['#8ACBFF', '#FFB0DB'],
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
                            data: ['抑郁', '焦虑', '强迫', '敌对', '自我伤害']
                        },
                        series: [
                            {
                                name: '1-10班（本校直升）',
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
                                data: [10, 100, 20, 55, 5]
                            },
                            {
                                name: '11-20班（非本校直升）',
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
                                data: [20, 82, 40, 85, 51]
                            }
                        ]
                    });

                    // 直升
                    const rawData1 = [
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8]
                    ];
                    const totalData1 = [];
                    for (let i = 0; i < rawData1[0].length; ++i) {
                        let sum1 = 0;
                        for (let j = 0; j < rawData1.length; ++j) {
                            sum1 += rawData1[j][i];
                        }
                        console.log(sum1)
                        totalData1.push(sum1);
                    }
                    console.log(totalData1)
                    const grid1 = {
                        left: 100,
                        right: 0,
                        top: 50,
                        bottom: 20
                    };
                    const series1 = [
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
                            data: rawData1[sid]
                        };
                    });
                    let xName1 = 'myChart31' + i
                    this[xName1] = echarts.init(this.$refs[xName1][0]);
                    console.log(this[xName1]);
                    this[xName1].setOption({
                        color: ['#B5ECAF', '#8ACBFF', '#FFDDA0', '#FE9D9D', '#B5ECAF', '#8ACBFF', '#FFDDA0', '#FE9D9D'],
                        legend: {
                            show: false,
                            selectedMode: false
                        },
                        grid: grid1,
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
                        series: series1
                    });

                    // 非直升
                    const rawData2 = [
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8],
                        [1, 2, 3, 4, 5, 6, 7, 8]
                    ];
                    const totalData2 = [];
                    for (let i = 0; i < rawData2[0].length; ++i) {
                        let sum2 = 0;
                        for (let j = 0; j < rawData2.length; ++j) {
                            sum2 += rawData2[j][i];
                        }
                        console.log(sum2)
                        totalData2.push(sum2);
                    }
                    console.log(totalData2)
                    const grid2 = {
                        left: 100,
                        right: 0,
                        top: 50,
                        bottom: 20
                    };
                    const series2 = [
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
                            data: rawData2[sid]
                        };
                    });
                    let xName2 = 'myChart32' + i
                    this[xName2] = echarts.init(this.$refs[xName2][0]);
                    console.log(this[xName2]);
                    this[xName2].setOption({
                        color: ['#B5ECAF', '#8ACBFF', '#FFDDA0', '#FE9D9D', '#B5ECAF', '#8ACBFF', '#FFDDA0', '#FE9D9D'],
                        legend: {
                            show: false,
                            selectedMode: false
                        },
                        grid: grid2,
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
                        series: series2
                    });
                }
                // 雷达图
                // this['myChart1' + i] = null
                let cName = 'myChart1' + i
                this[cName] = echarts.init(this.$refs[cName][0]);
                console.log(this[cName]);
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
                                    value: [10, 22, 33, 14, 65],
                                    name: '八一中学'
                                },
                                {
                                    value: [30, 40, 30, 50, 60],
                                    name: '全国常模',
                                    lineStyle: {
                                        type: 'dashed'
                                    },
                                },
                                {
                                    value: [20, 10, 50, 10, 40],
                                    name: '本校常模',
                                    lineStyle: {
                                        type: 'dashed'
                                    },
                                }
                            ]
                        }
                    ]
                });
                // 维度和性别
                const rawData = [
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8],
                    [1, 2, 3, 4, 5, 6, 7, 8]
                ];
                const totalData = [];
                for (let i = 0; i < rawData[0].length; ++i) {
                    let sum = 0;
                    for (let j = 0; j < rawData.length; ++j) {
                        sum += rawData[j][i];
                    }
                    console.log(sum)
                    totalData.push(sum);
                }
                console.log(totalData)
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
                console.log(this[xName]);
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



                let wdList = this.gradeList[i].wdList
                for (let j in wdList) {
                    let cName2 = 'myChart2' + i + j;
                    this[cName2] = echarts.init(this.$refs[cName2][0]);
                    console.log(this[cName2]);
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
                                data: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班'],
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
                            // max: 100,
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
                                // itemStyle: {
                                //     normal: {
                                //         barBorderRadius: [7, 7, 0, 0],
                                //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                //             { offset: 0, color: "#BDF5B8" },
                                //             { offset: 1, color: "#BDF5B8" }
                                //         ])
                                //     }
                                // },
                                data: [1, 2, 3, 4, 5, 6, 7, 8],
                                markLine: {
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
                                            yAxis: 2,
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
        // 下载报告
        partsSub() {
            var that = this;
            console.log(this.partsForm)
            this.pTimeFlag = false;
            this.reportFlag = false
            if (that.reportName == '') {
                this.reportFlag = true;
                return false;
            }
            if (that.partsForm.time == '') {
                this.pTimeFlag = true;
                return false;
            }
            
            let star = "";
            let end = "";
            if (that.partsForm.time != "" && that.partsForm.time) {
                this.start = that.formTimes1(that.partsForm.time[0])
                this.end = that.formTimes1(that.partsForm.time[1])
                star =
                    that.formTimes(that.partsForm.time[0]).replace(/-/g, "") +
                    "000000";
                end =
                    that.formTimes(that.partsForm.time[1]).replace(/-/g, "") +
                    "235959";
            }

            let param = {
                // organization: this.partsForm.organization,
                // organizationName: this.organizationName,
                startDate: star,
                endDate: end,
                code: '',
                gender: 1,
                // type: that.partsForm.type == 2 ? Number(1) : Number(0),
                // isFourFlag: this.isFourFlag
            };
            console.log(param)
            this.partList = param

            this.dialogPartFrame = false
            // 开始调接口，接口完事后，调用这个方法进行下载
            this.loading = this.$loading({
                lock: true,
                text: "数据加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });

            // 各维度检出率（3.2.3 可用添加性别和code)   有男女之分 可一起查可分开查
            let param1 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 0
            };
            this.$http
                .post(Url + "/aimw/export/dimensionProportion", param1)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        let wdJcList = [
                            {},{},{},{},{}
                        ]
                        let wdJcTotal = []
                        for (let i in data) {
                            if (data[i].grade == '抑郁'){
                                wdJcList[0] = data[i]
                                
                                if (data[i].total > this.detail.yyQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.yyQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[0] = data[i].level
                            }
                            if (data[i].grade == '焦虑'){
                                wdJcList[1] = data[i]
                                if (data[i].total > this.detail.jlQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.jlQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[1] = data[i].level
                            }
                            if (data[i].grade == '强迫'){
                                wdJcList[2] = data[i]
                                if (data[i].total > this.detail.qpQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.qpQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[2] = data[i].level
                            }
                            if (data[i].grade == '敌对'){
                                wdJcList[3] = data[i]
                                if (data[i].total > this.detail.ddQg) {
                                    data[i].level = 3
                                } else if (data[i].total < this.detail.ddQg) {
                                    data[i].level = 1
                                } else {
                                    data[i].level = 2
                                }
                                wdJcTotal[3] = data[i].level
                            }
                            if (data[i].grade == '自我伤害'){
                                wdJcList[4] = data[i]
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
                        console.log(wdJcList)
                        wdJcList.sort((a, b) => {
                            return Number(b.total) - Number(a.total);
                        });
                        console.log(wdJcTotal)
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
                            console.log(txtArr4)
                            let txtStr = ''
                            for (let i in txtArr4) {
                                txtStr += txtArr4[i].grade
                                if (i < txtArr4.length - 2){
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
                            console.log(txtArr52)
                            console.log(txtArr51)
                            let txtStr52 = ''
                            for (let i in txtArr52) {
                                txtStr52 += txtArr52[i].grade
                                if (i < txtArr52.length - 2){
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
                                if (i < txtStr51.length - 2){
                                    txtStr51 += '、'
                                }
                                if (i == txtStr51.length - 2) {
                                    txtStr51 += '和'
                                }
                            }
                            this.detail.txtStr51 = txtStr51
                        }

                        
                        
                        console.log(wdJcList)
                        
                        console.log(this.areAllValuesEqual(wdJcTotal))
                        this.detail.wdJcList = wdJcList


                        this.part1 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 根据年份和月份查询学校班级实际测评数量... 不需要男女之分
            let param2 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 1
            };
            this.$http
                .post(Url + "/aimw/export/exportGradeInfoByOrgIdAndDate", param2)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        let schoolList = data.schoolList
                        let yuBei = {}
                        let chuZhong = {}
                        let gaoZhong = {}
                        for (let i in schoolList) {
                            if (schoolList[i].grade.indexOf('X') != -1) {
                                yuBei = schoolList[i]
                            }
                            if (schoolList[i].grade.indexOf('C') != -1) {
                                chuZhong = schoolList[i]
                            }
                            if (schoolList[i].grade.indexOf('G') != -1) {
                                gaoZhong = schoolList[i]
                            }
                        }
                        this.detail.totalClasses = data.totalClasses
                        this.detail.totalStudents = data.totalStudents
                        this.detail.maleStudents = data.maleStudents
                        this.detail.femaleStudents = data.femaleStudents
                        this.detail.yuBei = yuBei
                        this.detail.chuZhong = chuZhong
                        this.detail.gaoZhong = gaoZhong

                        this.part2 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 健康百分比    不需要男女之分
            let param3 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 1
            };
            this.$http
                .post(Url + "/aimw/export/exportHealthInfoByOrgIdAndDate", param3)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part3 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 性别各维度检出率 不需要男女之分
            let param4 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 1
            };
            this.$http
                .post(Url + "/aimw/export/genderDimensionProportion", param4)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part4 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 性别健康百分比 不需要男女之分
            let param5 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 0
            };
            this.$http
                .post(Url + "/aimw/export/genderGroupHealthInfo", param5)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part5 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 各年级各班级各维度检出率情况(根据code X,C,G) 不需要男女之分
            let param6 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 1
            };
            this.$http
                .post(Url + "/aimw/export/gradeClassDimensionProportion", param6)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part6 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 各个学段各维度检出率  不需要男女之分
            let param7 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 1
            };
            this.$http
                .post(Url + "/aimw/export/gradeDimensionProportion", param7)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        let gradeWd = []
                        for (let i in data) {
                            if (data[i].departmentName.indexOf('X') != -1){
                                data[i].grade = '预备年级'
                            }
                            if (data[i].departmentName.indexOf('C') != -1){
                                data[i].grade = '初中一年级'
                            }
                            if (data[i].departmentName.indexOf('G') != -1){
                                data[i].grade = '高中一年级'
                            }
                            let iList = [
                                {
                                    name: '抑郁',
                                    numPer:{
                                        num:  data[i].depressionNum,
                                        percent:  data[i].depressionPercentage
                                    }
                                },
                                {
                                    name: '焦虑',
                                    numPer:{
                                        num:  data[i].anxietyNum,
                                        percent:  data[i].anxietyPercentage
                                    }
                                },
                                {
                                    name: '强迫',
                                    numPer:{
                                        num:  data[i].forcedNum,
                                        percent:  data[i].forcedPercentage
                                    }
                                },
                                {
                                    name: '敌对',
                                    numPer:{
                                        num:  data[i].violenceNum,
                                        percent:  data[i].violencePercentage
                                    }
                                },
                                {
                                    name: '自我伤害',
                                    numPer:{
                                        num:  data[i].suicideNum,
                                        percent:  data[i].suicidePercentage
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
                                    percent:  data[i].forcedPercentage
                                },
                                {
                                    name: '敌对',
                                    percent:  data[i].violencePercentage
                                },
                                {
                                    name: '自我伤害',
                                    percent: data[i].suicidePercentage
                                }
                            ]
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
                        console.log(strList)
                        let a1 = this.areAllValuesEqual(strList)
                        console.log(a1)
                        let aTxt1 = ''
                        let aTxt2 = ''
                        if (a1) { //若各个学段各维度检出率完全一致
                            // 第三段--第1句--若各个学段各维度检出率完全一致则输出：
                            aTxt1 += "所有学段在抑郁、焦虑、强迫、敌对、自我伤害维度上的表现相同，检出率由高到低分别是："
                            let info2 = JSON.parse(JSON.stringify(gradeWd[0].info)).sort((a, b) => {
                                return Number(b.numPer.percent) - Number(a.numPer.percent);
                            });
                            for (let i in info2){
                                aTxt1 += info2[i].name + '（' + info2.numPer.percent + '%）'
                                if (i < info2.length - 1) {
                                    aTxt1 += '、'
                                } else {
                                    aTxt1 += '。'
                                }
                            }
                            // 第三段--第2句--若各个学段各维度检出率完全一致，则输出检出率由高到低的前三个维度。
                            aTxt2 += '其中，'
                            let info3 = info2.slice(0,3)
                            for (let i in info3){
                                aTxt2 += info3[i].name
                                if (i < info3.length - 2){
                                    aTxt2 += '、'
                                }
                                if (i == info3.length - 2) {
                                    aTxt2 += '和'
                                }
                            }
                            aTxt2 += '问题在所有学段上都比较突出。'
                           
                        } else {//若各个学段各维度检出率不完全一致
                            
                            console.log(gradeWd)
                            // 第一种情况，先取四个一样的
                            
                            // let gArr4 = []
                            let gArr3 = []
                            for (let i in gradeWd) {
                                // gradeWd[i].info4 = gradeWd[i].info.slice(0,4)
                                gradeWd[i].info3 = gradeWd[i].info.slice(0,3)
                                // for (let j in gradeWd[i].info4) {
                                //     let gInfo4 = gradeWd[i].info4[j].name
                                //     gArr4.push(gInfo4)
                                // }
                                for (let j in gradeWd[i].info3) {
                                    let gInfo3 = gradeWd[i].info3[j].name
                                    gArr3.push(gInfo3)
                                }
                            }
                            console.log(gradeWd)
                            // console.log(gArr4)
                            
                            console.log(gArr3)
                            const counts = {};
                            for (const num of gArr3) {
                                counts[num] = counts[num] ? counts[num] + 1 : 1;
                            }
                            console.log(counts['抑郁'], counts['焦虑'], counts['强迫'], counts['敌对'], counts['自我伤害'])
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
                            console.log(this.countElements(gArr3))
                            console.log(count)
                            
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
                                    aTxt2 += gradeWd[m].grade
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
                                    if (m < gradeWd.length - 1){
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
                                    aTxt2 += gradeWd[m].grade
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
                                    if (m < gradeWd.length - 1){
                                        aTxt2 += '，'
                                    } else {
                                         aTxt2 += '。'
                                    }
                                }
                            } else {
                                // 若各个学段检出率不完全一致，由高到低前三位维度中相同维度数为0，则按年级由低到高相应输出：
                               
                                for (let m in gradeWd) {
                                    aTxt2 += gradeWd[m].grade
                                    for (let n in gradeWd[m].info3) {
                                        aTxt2 += gradeWd[m].info3[n].name
                                        if (n < gradeWd[m].info3.length - 2){
                                            aTxt2 += '、'
                                        }
                                        if (i == gradeWd[m].info3.length - 2) {
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
                                    if (m < gradeWd.length - 1){
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
                        console.log(this.detail.gradeTxt1)

                        console.log(gradeWd)
                        
                        this.part7 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            // 学段健康百分比  不需要男女之分
            let param8 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 1
            };
            this.$http
                .post(Url + "/aimw/export/gradeGroupHealthInfo", param8)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        
                        let zsClass = []
                        let fzsClass = []
                        let zsClass3 = []
                        let fzsClass3 = []
                        let zsSum = 0
                        let fzsSum = 0
                        // 若**年级直升班五个维度检出率之和＞非直升班，则输出：
                        for (let i in data) {
                            if (data[i].grade == '初中A直升班') {
                                zsClass.push(data[i])
                                zsSum += data[i].percentage
                            }  
                            if (data[i].grade == '初中B非直升班') {
                                fzsClass.push(data[i])
                                fzsSum += data[i].percentage
                            }
                        }
                        console.log(zsClass)
                        console.log(fzsClass)
                        console.log(zsSum)
                        console.log(fzsSum)
                        let zsTxt = ''
                        // 若**年级直升班五个维度检出率之和＞非直升班，则输出：
                        if (zsSum > fzsSum) {
                            zsTxt += '初中一年级' + '直升班相比非直升班心理健康问题更加显著。'
                        }
                        // 若**年级直升班五个维度检出率之和＜非直升班，则输出：
                        if (zsSum < fzsSum) {
                            zsTxt += '初中一年级' + '非直升班相比直升班心理健康问题更加显著。'
                        }
                        // 若**年级直升班五个维度检出率之和=非直升班，则输出：
                        if (zsSum == fzsSum) {
                            zsTxt += '初中一年级' + '直升班与非直升班心理健康问题相当。'
                        }
                        let zsClassArr = []
                        for (let i in zsClass) {
                            zsClassArr.push({
                                dimension: zsClass[i].dimension,
                                percentage: zsClass[i].percentage
                            })
                        }
                        zsClass3 = zsClassArr.sort((a, b) => {
                            return Number(b.percentage) - Number(a.percentage);
                        }).slice(0, 3)
                        console.log(zsClass3)
                        let fzsClassArr = []
                        for (let i in fzsClass) {
                            fzsClassArr.push({
                                dimension: fzsClass[i].dimension,
                                percentage: fzsClass[i].percentage
                            })
                        }
                        fzsClass3 = fzsClassArr.sort((a, b) => {
                            return Number(b.percentage) - Number(a.percentage);
                        }).slice(0, 3)
                        console.log(fzsClass3)
                        
                        this.gradeTxt3 = zsTxt
                        this.part8 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });

            // 学段健康百分比  不需要男女之分
            let param9 = {
                startDate: star,
                endDate: end,
                code: '',
                // isUpgrade: 0, //是否直升班(1:直升，2：非直升)	
                // gender: 1
            };
            this.$http
                .post(Url + "/aimw/export/serverCrowdList", param9)
                .then(res => {
                    let data = res.data.data;
                    if (res.data.code == 0) {
                        this.part9 = true;
                    } else {
                        that.$message.error(data.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });

        },
        apartsReport() {
            console.log('导出团体报告')
            let that = this;
            this.pTimeFlag = false;
            this.reportFlag = false;
            this.reportName = ''
            this.partsForm = {
                time: ''
            }

            this.getSchoolInfo()
        },
        // 学校信息
        getSchoolInfo() {
            let that = this;
            that.$http
                .get(Urls + "/aimw/organization/listOrganizationInfo")
                .then(res => {
                    var data = res.data.data;
                    if (res.data.code == 0) {
                        // that.id = data.id;
                        that.schoolName = data.name;
                        this.dialogPartFrame = true
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        handleExport() {
            let pdf = new PdfLoader(
                document.querySelector("#overviewpage"),
                "pdf",
                "noSplitBox",
                this.loading
            );
            // this.muluPage = pdf.muluPage
            pdf.outPutPdfFn();
            this.muluPage = pdf.muluPage
            this.muluEmptyPage = pdf.muluEmptyPage

            console.log(this.muluList)

            console.log(this.muluPage)
            console.log(this.muluEmptyPage)
            for (let i in this.muluList) {
                this.muluList[i].page = pdf.muluPage[i] - this.muluEmptyPage + 2
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
    margin: 0 auto 30px;

    tr {
        border: 1px solid #333E75;

        th {
            border: 1px solid #333E75;
            border-right: 0;

            text-align: center;
            font-size: 22px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 500;
            color: #333E75;
            padding: 10px 5px;
            //border-top: 0;
        }

        th:last-child {
            border-right: 1px solid #333E75;
        }

        td {
            border: 1px solid #333E75;
            border-right: 0;
            // border-top: 0;

            padding: 10px 5px;
            text-align: center;
            font-size: 20px;
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
        .ml_box {
            text-align: left;
            padding: 0 80px 30px;

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

                padding-top: 10px;
                padding-bottom: 10px;
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
            padding: 20px 70px 20px;

            img {
                display: block;
                margin: 0 auto;

            }

            .yy_img {
                width: 480px;
                height: auto;
                border-radius: 16px;
            }

            .yy_o {
                font-size: 28px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 600;
                color: #333E75;
                padding-top: 20px;
            }

            .yy_t {
                font-size: 24px;
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
                line-height: 32px;

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
                font-size: 18px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333E75;
                // text-indent: 40px;
                // padding: 5px 0;
                text-align: center;
                padding: 10px 0;
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
                        padding: 10px 20px 20px;

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