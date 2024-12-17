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
                    <!-- 抑郁 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.2 抑郁维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）抑郁维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                        空洞与缺失
                    </div>
                    <div class="yy_txt noSplitBox">
                        主题的单一化
                    </div>
                    <div class="yy_txt noSplitBox">
                        使用封闭与孤立的元素
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议受测者个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             不否定自己的负面情绪，减少自我攻击的思维。
                        </div>
                        <div class="yy_txt noSplitBox">
                             找到自己喜欢做的事情，并投入其中。例如：去接近大自然，或者看影视剧，观看演唱会等。
                        </div>
                        <div class="yy_txt noSplitBox">
                             增加体育锻炼，或进行艺术活动与创作，例如音乐、舞蹈等。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             尽量减少或杜绝对孩子的批评指责，适当降低对孩子的要求。
                        </div>
                        <div class="yy_txt noSplitBox">
                             欣赏孩子的进步与改变，及时夸奖孩子的积极心态或者行为。例如：孩子主动做家务，家长应及时赞赏和感谢孩子的付出。
                        </div>
                        <div class="yy_txt noSplitBox">
                             倾听孩子的烦恼或者心里话，进行情感共鸣而非语言评价。例如：家长询问孩子“今天在学校，你的感受怎么样？”，用心倾听孩子的感受，不去评价孩子。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校尽量不采用成绩排名公示，减少评价，避免排名靠后的学生因成绩不好而自卑。
                        </div>
                        <div class="yy_txt noSplitBox">
                             创造同学之间的交流机会，组织学生感兴趣的课外活动。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期举行心理健康教育课程或活动，引导孩子主动觉察与接纳自己的负面情绪等等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【关键沙具】
                        </div>
                        <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议受测者个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照低风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             允许自己的抑郁症状出现并有所波动，不因自己努力后症状没有减轻而责怪自己。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当有自杀自伤意念或行为时，及时与身边关爱自己的人（家人、老师、同学和朋友等）寻求帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应接纳孩子目前的状态。例如孩子因情绪问题成绩下降，家长不能打骂孩子，可以陪伴孩子找到成绩下降的原因，帮助孩子克服困难。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应为孩子提供宽松的生活与精神环境，陪伴孩子度过最艰难的时刻。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应多关注孩子的情绪，如果孩子的情绪持续低落、饮食或睡眠出现异常，应及时带孩子去医院就医，不指责孩子。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应关注孩子的自杀自伤风险，例如孩子身上是否有伤，用爱温暖孩子，避免孩子伤害自己，一旦发现自杀自伤现象，及时与专业医院或机构联系。
                        </div>
                        <div class="yy_txt noSplitBox">
                             如经专业医生诊断后，需服用药物，家长需监督管理服药情况。
                        </div>
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期举行心理健康教育课程或活动，引导孩子主动觉察与接纳自己的负面情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校建立风险筛查与应对机制，例如：定期对学生的心理状态进行评估，对中风险人群给予心理支持；组织学生进行团体心理咨询，或者展开一对一个体咨询工作。
                        </div>
                        <div class="yy_txt noSplitBox">
                             相关心理老师在咨询中如发现个体的心理状态比较严重，短期内不能改善时，建议家长及时带个体去医院就医，并遵医嘱服药，并做好相应的记录工作。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议个体及时去医院就医，必要时进行住院治疗，并辅助心理咨询服务。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自杀意念比较强烈时，建议个人拨打自杀干预热线，寻求专业的支持和帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险家庭环境建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应抽出大量的时间陪伴孩子，用爱心、信心和耐心滋养孩子的心灵。
                        </div>
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期举行心理健康教育课程，如 AI 心理沙盘心境课程。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期进行危机排查工作，建立风险筛查与应对机制，对重度抑郁的学生进行重点关注，包括与家长合作及时反馈学生状况，建议家长带学生去医院就医，遵医嘱，必要时进行住院治疗。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对无法上学并住院治疗的抑郁症学生，学校应关注学生的治疗情况，当学生出院并具备上学条件时，应为学生提供良好的回归环境。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可开展相应心理课堂或讲座，引导全体同学尊重并正视抑郁症状，对有抑郁症学生提供帮助，避免因抑郁症状的污名化造成对个体的伤害。
                        </div>
                    <!-- </div> -->

                    <!-- 焦虑 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.3 焦虑维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）焦虑维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                        布局的混乱与堆积
                    </div>
                    <div class="yy_txt noSplitBox">
                        防御性结构
                    </div>
                    <div class="yy_txt noSplitBox">
                        使用封闭与孤立的元素
                    </div>
                    <div class="yy_txt noSplitBox">
                        动态表现
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议受测者个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             识别自己的灾难化思维，例如是否过度担心未来没有发生的事，考试之前就害怕自己考不好，这种害怕和担心让自己没有办法安心学习，对未来的焦虑影响了当下的学习状态。需要做出适当调整。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察对自己焦虑的情绪是否有抵触或者否定的情绪，尽量用接纳的态度面对自己的焦虑情绪，不让情绪评价再次伤害自己。例如当发现自己有焦虑情绪时，不去批评自己又开始焦虑了，要正面评价这种焦虑的情绪，对自己说“我现在焦虑，说明我很上进，我想让自己变得更好，我只需要将焦虑控制在一定范围内就好”。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时进行心理咨询，表达自己的情绪，让焦虑情绪得到理解和看见，并有宣泄的出口。例如有痛苦的情绪及时向家长、老师、学校咨询师表达。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察考试成绩对自己影响，开发更多的课外兴趣，用多个评价体系评估自己的能力。例如“我数学不好，但是我作文很好”，或者“我虽然学习不好，但是我画画很好，我一样是一个有价值，值得被爱的人”，或者“我虽然学习不好，也没有特长，但是我为人真诚热情，同学都喜欢和我玩，寻求我的帮助，我是一个很有价值的人”等等。
                        </div>
                        <div class="yy_txt noSplitBox">
                             增加体育锻炼，亲近大自然，放松心情，缓解紧张情绪。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家庭成员尽量减少对个体的批判与高要求，允许个体按照自己的节奏学习、进步，允许个体犯错，尽量营造温馨和睦宽容有爱的家庭环境，让个体感受到爱与包容，个体的自我才能变得强大，才能容忍未来的不确定性。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长还可以多带个体出去游玩，感受自然的风景，缓解焦虑的情绪等等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对受测者个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可尽量减少对学生的显性评价，减少学生焦虑的来源。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可多组织户外运动，让学生的大脑得到放松。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可开展有利于人际沟通的班级活动等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            建议个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己的焦虑情绪是否已经降低了学习效率，当学习时无法集中注意力而被大量焦虑情绪淹没时，需要寻求心理咨询的帮助。
                        </div>
                        <div class="yy_txt noSplitBox">
                             主动寻求心理援助，例如去精神科医院就医，遵医嘱服药，并寻求心理咨询服务的帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险家庭角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应多观察孩子的情绪状态，例如孩子是否有灾难化思维，是否自己给自己很大的压力，如果孩子的情绪非常不好，鼓励孩子说出来，例如家长可以说“我看到你最近情绪一直都不太好，是考试成绩不理想的原因吗？你愿意说说吗?我能做什么，才能帮到你？”。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家庭成员首先要做到自己不焦虑，调节好自身情绪，避免将自己的焦虑传递给个体。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长不催促不强迫孩子的学习，不评价孩子的成绩，接纳学生目前的学习状态和成绩，对于孩子的小小进步给予肯定和鼓励，有利于孩子自信心的增加。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当孩子焦虑症状影响其学习时，家长应接纳孩子目前的状态，适度降低对孩子的期待，并帮孩子与学校老师及时沟通，给予适当的缓和空间。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时带个体去做心理咨询，求助专业人员的帮助。家人带领但不强迫个体去精神科医院就诊，遵医嘱服药，并寻求心理咨询服务的帮助。
                        </div>
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可设立减压室、心理服务中心，鼓励焦虑个体进行情绪表达。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可与家长合作，综合孩子在学校和在家的状态，经心理老师评估后如果孩子整体状态没有向好的方向发展，学校应建议家长带孩子去医院就医，遵医嘱服药，并辅助进行心理咨询。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自己被大量的焦虑情绪困扰并且有身体的某些部位有异常反应，例如写字时出汗、手抖，感觉到心脏狂跳、心慌等，应及时与老师和家长反映，并由家长带领去专业医院就医，严格遵医嘱服药，并积极寻求心理咨询的帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险家庭环境建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长可尝试传递给孩子一个信息，即无论孩子成绩如何，自己都会100%爱孩子，孩子在自己心中的位置不会因考试成绩糟糕而有任何变化，给孩子提供充足的安全感。
                        </div>
                        <div class="yy_txt noSplitBox">
                             观察孩子的状态，必要时带孩子去专科医院就医，遵医嘱服药，照顾好孩子的生活。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可定期进行危机排查工作，尤其是在考试成绩出来之后，尽量避免公开成绩排名，避免学生过度的竞争与比较心态。
                        </div>
                        <div class="yy_txt noSplitBox">
                             考试成绩出来之后关注学生的情绪变化，与家长沟通合作，建立家校联盟。
                        </div>
                        <div class="yy_txt noSplitBox">
                             针对学生的学习困难，学校应为个体提供多样化的专项辅导课程，例如鼓励跨年级帮助，学长分享自己的成功经验，帮助个体克服学习中的困难。
                        </div>
                        <div class="yy_txt noSplitBox">
                             在重大事件到来之前，例如在考试之前（包括期中、期末考试以及升学考试），学校应组织主题为考试焦虑的团体辅导，有效缓解学生的考试焦虑，促使学生在考试时得到更好的发挥。
                        </div>
                        <div class="yy_txt noSplitBox">
                             定期在校内组织心理活动，开展心理课堂，还可以邀请家长一同参与。
                        </div>
                        <div class="yy_txt noSplitBox">
                             针对高焦虑个体，建议其家长带领学生就医，遵医嘱服药，必要时进行住院治疗，并辅助心理咨询服务。
                        </div>
                    <!-- </div> -->

                    <!-- 强迫 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.4 强迫维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）强迫维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                        重复性和过度控制
                    </div>
                    <div class="yy_txt noSplitBox">
                        对称性和极端整洁
                    </div>
                    <div class="yy_txt noSplitBox">
                        对立元素同时出现
                    </div>
                    <div class="yy_txt noSplitBox">
                        使用具有威胁性的沙具
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             识别自己的某些强迫的观念，例如：外面非常脏，有无数细菌，回家要把每一个细菌都消灭或者洗掉，并觉察由这些信念引起的焦虑情绪，接纳和安抚这种焦虑的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对自己的强迫症状采取不批判、不对抗的态度，学会跟它们和平共处，带着症状去生活。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻找可替代的同样可以缓解焦虑情绪的行为，而这种行为对自己的身体和社会功能没有损害性。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察学习、考试成绩对自己的意义，是否将自己的价值都寄托于它们之上，找到更多评价自己的体系，拓宽自己的价值视野。
                        </div>
                        <div class="yy_txt noSplitBox">
                             情绪不好时及时寻求家人和朋友的帮助。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时进行心理咨询，表达自己强迫的观念或行为以及由此引发的情绪，宣泄这些情绪，有利于症状的减轻。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家庭成员对个体给予无条件的爱，尽量减少对个体的批判，看到个体强迫行为背后焦虑的情绪，看到个体对发生的事情有强烈的责任，理解并接纳个体的强迫思维和行为，用爱和关心拥抱个体，降低个体的焦虑。
                        </div>
                        <div class="yy_txt noSplitBox">
                             多带个体亲近大自然，感受放松的环境，缓解焦虑的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时带个体去做心理咨询，求助专业人员的帮助。例如：箱庭治疗、ERP（暴露与反应阻止疗法）治疗等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校与相关管理者应淡化成绩对个体的评价影响，并鼓励个体发展多样化的技能，让个体在学习中体验到不让个体崩溃的压力，同时能促进个体成长进步。
                        </div>
                        <div class="yy_txt noSplitBox">
                             多开展团体活动，让个体宣泄自己的想法和情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校与相关管理者设立减压室，心理服务中心，鼓励个体进行对自己的焦虑情绪进行表达等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             主动寻求心理援助，例如去精神科医院就医，遵医嘱服药，并寻求心理咨询服务的帮助。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当强迫思维和行为影响到学习时，首先不否定自己，及时寻求身边人的理解和帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照低风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应观察孩子的行为或强迫思维，允许孩子有这些强迫症状，并和孩子一起面对它们。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家人带领但不强迫个体去精神科医院就诊，此外还可以带个体寻求心理咨询服务的帮助。
                        </div>
                        
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照低风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期进行危机排查工作，不强化成绩对学生的评价作用。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校应主动与家长合作，给学生一个放松的环境，鼓励学生发展自己的特长等等。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自己的强迫症状严重影响学习时，不对自己的症状产生巨大的排斥和反抗，相信自己通过专业的治疗，症状会有所缓解。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议及时去医院就医，必要时进行住院治疗，严格遵医嘱，并辅助心理咨询服务。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长或家人尽量不提学习成绩，为个体提供温暖的包容的环境，关心个体的身体健康和生理、心理需要，并满足这些需要，安抚个体的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议家长带领但不强迫个体去医院就医，并为孩子寻找合适的心理咨询服务。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校应观察学生的在校状况，尊重并不歧视有明显强迫症状的学生，在教学安排上允许学生有强迫行为，并鼓励身边的同学帮助该个体，避免污名化对个体的二次伤害。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可以开展相应的心理健康课程，帮助个人正确认识强迫症或强迫症状，进行心理健康教育。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可以开展相应的主题团体辅导活动，在安全、受保护的空间里，鼓励大家去表达自身，让个人明白并非只有自己才有，减轻个体的病耻感。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议学校定时进行危机排查，鼓励其家人带领并不强迫个体就医，必要时进行住院治疗，有条件的话，可协助提供合适的心理咨询资源。
                        </div>
                    <!-- </div> -->

                    <!-- 敌对 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.5 敌对维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）敌对维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                         冲突性场景的构建
                    </div>
                    <div class="yy_txt noSplitBox">
                         攻击性沙具的使用
                    </div>
                    <div class="yy_txt noSplitBox">
                         界限和障碍的设置
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己愤怒的情绪或者其他的情绪，以及引起这些情绪的原因，面对和接纳这些情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻找舒缓自己情绪的活动，例如：户外运动或室内对抗性运动，宣泄自己的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻求家人和朋友的帮助。例如：自己想打人时，用语言表达自己的愤怒，或者告诉家人和朋友，自己有想打人的冲动，用语言表达出来，而不是攻击行为。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时寻求学校心理老师的帮助。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             理解个体敌对行为背后的心理原因，关注个体内心的恐惧、悲伤等情绪，抱持这些负面情绪，用耐心和爱心支持个体。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时寻求专业机构或者心理咨询的帮助等等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             对个体的负面行为给予负面的反馈，但不否定个体的人格，不伤害个体的自尊。
                        </div>
                        <div class="yy_txt noSplitBox">
                             用团体辅导的形式让个体表达人际间的情绪问题，让个体看到自己的人际交往模式，用团体的力量影响个体的认知和行为风格等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             先运用理性学会控制自己的伤害行为，找到替代的非伤害的行为舒缓自己的情绪。例如：学习拳击（而不是打人）去发泄自己的情绪等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险家庭角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             父母或者家人自己不用暴力解决问题，包括肢体暴力和语言暴力，用温和的态度对待个体，用理性和商量的方式解决分歧与问题，给个体树立良好的榜样。
                        </div>
                        <div class="yy_txt noSplitBox">
                             教授或者影响个体用语言或者其他非伤害的形式表达自己的情绪或者想法，接纳个体的表达，并给予正向的回应。
                        </div>
                        <div class="yy_txt noSplitBox">
                             明白孩子的改变并非一朝一夕，家长要有耐心和爱心，陪伴孩子纠正自己的行为。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长对孩子的敌对行为不做出二次惩罚，例如孩子在学校打了同学，家长以坚定的态度和孩子沟通，而不是用打骂的方式教育孩子。家长教育孩子的方式直接影响了孩子处理关系的方式。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家人应学习如何科学应对个体的敌意行为，必要时寻求专业机构和心理咨询的帮助。
                        </div>
                        
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险学校角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             针对这一群体，多开展团体咨询，让孩子有机会体验到别人的想法，增强孩子的理解和共情别人的能力。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对个体进行心理评估，定期对个体进行心理治疗或者咨询等等。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自己的愤怒情绪波动很大想用攻击行为解决问题时，让自己默数 10个数，或者深呼吸，用第三方的视角看自己当下的状态，觉察攻击行为的后果。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻求专业机构或心理咨询的帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长积极与学校合作，向老师及时反馈在家状况，无论孩子表现多么糟糕，都不能以暴制暴，要用理性坚定的语言和温和的态度帮助孩子理解别人被攻击后的痛苦，并引导孩子做出积极的行为。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时带领但不强迫个体去专业机构寻求帮助，并带孩子进行心理咨询。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             与个体的家长或家人合作，探索行为背后的原因、情绪以及目的，鼓励个体表达自己的负面情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             定期检查个体的心理状态，与个体家人合作，在专业机构和心理医生的建议下联合制定应对方案。
                        </div>
                        <div class="yy_txt noSplitBox">
                             鼓励个体做利他的行为，并在发现个体有这种行为之后给予高度的赞赏，让个体在利他行为之后体验到被欣赏和价值感，及时强化等等。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建立监督机制，对比较严重的敌对行为给于惩罚。但不伤害个体的自尊，不否定个体的人格，创造个体为他人服务的可能性，提高个体的价值感。
                        </div>
                    <!-- </div> -->

                    <!-- 敌对 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.6 自我伤害维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）自我伤害维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                         破坏性和荒凉感的场景
                    </div>
                    <div class="yy_txt noSplitBox">
                         选择具有攻击性和残缺相关的沙具
                    </div>
                    <div class="yy_txt noSplitBox">
                         孤立或受困的角色
                    </div>
                    <div class="yy_txt noSplitBox">
                         重复的死亡和毁灭象征
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己负面的情绪，以及这些情绪产生的情景以及原因。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻找家人或者朋友表达并宣泄自身负面的情绪，明白自己内心真实的想法。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己是否将自己的人生价值放在某件单一的事情上，例如学习成绩、升学考试等。尝试寻找更多人生的意义，在自己喜欢或者擅长的事情上获得成就感和满足感。
                        </div>
                        <div class="yy_txt noSplitBox">
                             如果外部压力非常大，尝试屏蔽这些压力，守护好自己的世界，积极寻找支持自己的资源和力量。
                        </div>
                        <div class="yy_txt noSplitBox">
                             感觉自身需要的时候，可以寻找学校心理老师的帮助。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长不去对孩子提出过高的要求，觉察孩子的消极情绪，帮助孩子度过人生中的困难。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长鼓励孩子做自己喜欢的事，并对一点点的进步给于极大的鼓励和欣赏。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长关注孩子日常的情绪变化，有必要时，及时带孩子寻求专业机构或心理咨询帮助等等。
                        </div>
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             降低社会评价体系对个体的影响，尽量避免公开公布成绩排名等信息。
                        </div>
                        <div class="yy_txt noSplitBox">
                             提供更多的娱乐项目，丰富个体的生活，减轻压力，找到学习与生活之间的平衡状态等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当有自伤想法或冲动时，用其他非伤害的动作感受自己，例如用橡皮筋弹自己的手腕，用双手拍自己的四肢等，让自己紧张、焦虑与痛苦的情绪得到舒缓。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻求专业机构、医院或者心理咨询的帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险家庭角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             面对有自伤行为的孩子，家长应及时发现并给予充分的关心和爱护，家长不能批评指责孩子，或者在孩子的威胁中任由孩子做任何事。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长给予孩子无条件的爱，不因孩子学习不好，就不爱孩子，让孩子感受到无论自己多么糟糕，家人都是爱自己、支持自己的。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长可与孩子交谈，找到孩子自伤背后真正的原因，并做出相应的改变。例如孩子有自己的兴趣爱好，却不被家长支持，或者有自己的生活喜欢不被家长接纳，家长应给孩子更多的自由去探索世界，不必过分担心和焦虑孩子的未来。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长发现孩子有自伤的行为之后，应带领但不强迫孩子去医院就医，遵医嘱服药，或者寻求心理咨询的帮助。
                        </div>
                        
                        <div class="yy_t noSplitBox">
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
                        <div class="yy_txt noSplitBox">
                             参考低风险学校角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             组织团体辅导活动，让个体在团体中表达自己的情绪感受，获得团体人际间的支持，增强个体的自我强度，应对生活中的压力。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对个体的价值进行多元化的评估，不以某个单一的结果衡量个体的价值，例如不以学生的成绩衡量个体的全部价值等等。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当情绪非常痛苦时，及时拨打危机干预电话，寻求专业机构、医院、心理咨询、警察的帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应与学校密切合作，经常了解孩子在学校的情况，特别是考试前或者考试成绩不理想之后，及时安抚孩子的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长还可以及时寻求医院、专业机构的帮助，在专业的方案指导下保护孩子，并寻找合适的心理咨询资源给孩子。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对高危自伤人群给于重点关注，联合孩子家长制定专业看护方案，保护个体的人生安全。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对学生建立心理档案，对高敏感的孩子给予特殊关注。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建立危机排查机制，与家长合作，联合专业机构、医院或者咨询师制定应对方案。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校应建议家长带孩子去专科医院就医，遵医嘱服药，并辅助心理咨询治疗等等。
                        </div>
                    <!-- </div> -->


                    
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


                <!-- 3.测评结果 -->
                <div class="yy_box">
                    <div class="noSplitBox">
                        <div class="yy_o mulu_page">
                            3.测评结果
                        </div>
                        <div class="yy_t mulu_page">
                            3.1 总体测评结果
                        </div>
                        <div class="yy_t mulu_page">
                            3.1.1 各维度检出率
                        </div>
                        <div class="noSplitBox" style="width: 100%;height: 500px;margin: 30px auto;">
                            <div style="width: 400px;height: 400px;">检出率--雷达图</div>
                            <div class="yy_txt" style="text-align: center;">图 3 心理健康问题检出率对比分布</div>
                        </div>
                        

                        
                    </div>

                    <table cellspacing="0" cellpadding="30">
                        <tr class="pdf-details noSplitBox">
                            <th></th>
                            <th>抑郁</th>
                            <th>焦虑</th>
                            <th>强迫</th>
                            <th>敌对</th>
                            <th>自我伤害</th>
                        </tr>
                        <tr class="pdf-details noSplitBox">
                            <td>差值</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                        </tr>
                        <tr class="pdf-details noSplitBox">
                            <td>八一学校</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                        </tr>
                        <tr class="pdf-details noSplitBox">
                            <td>全国常模</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                        </tr>
                    </table>
                    <div class="yy_txt">
                        八一学校的学生中，较为突出的两类心理健康问题为焦虑和抑郁，分别为 31.9%和 24.3%，存在敌对和强迫的学生相对较少，分别为 18.6%和 18.8%。
                    </div>
                    <div class="yy_txt">
                        与全国常模相比，本校学生在自我伤害、敌对方面问题较小，强迫、抑郁和焦虑方面有待改善。其中，抑郁维度超出常模 4.4%。
                    </div>
                    <div class="noSplitBox" style="width: 100%;height: 500px;margin: 30px auto;">
                        <div style="width: 400px;height: 400px;">分布图--横向柱状图图</div>
                    </div>
                    <table cellspacing="0" cellpadding="30">
                        <tr class="pdf-details noSplitBox">
                            <th></th>
                            <th>抑郁</th>
                            <th>焦虑</th>
                            <th>强迫</th>
                            <th>敌对</th>
                            <th>自我伤害</th>
                        </tr>
                        <tr class="pdf-details noSplitBox">
                            <td>轻度问题</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                            <td>1.5%</td>
                        </tr>
                        <tr class="pdf-details noSplitBox">
                            <td>中度问题</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                        </tr>
                        <tr class="pdf-details noSplitBox">
                            <td>重度问题</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                            <td>21.5%</td>
                        </tr>
                    </table>
                    <div class="noSplitBox" style="width: 100%;margin: 30px auto;">
                        <div>
                            <div>
                                <span></span>轻度问题
                            </div>
                            <div>
                                <span></span>中度问题
                            </div>
                            <div>
                                <span></span>重度问题
                            </div>
                        </div>
                        <div class="yy_txt" style="text-align: center;">图 4 心理健康检出率分布图</div>
                    </div>
                    <div class="yy_txt noSplitBox">
                        根据图 4 所示的心理健康轻问题检出率分布图，我们可以得出以下几点重要发现：
                    </div>
                    <div class="yy_txt noSplitBox">
                        <span style="font-weight: 400;">焦虑问题最为普遍：</span>
                        <span>在所有心理健康问题中，焦虑问题的检出率最高，达到 31.9%。其中，焦虑轻度问题占绝大多数，占比高达 25.7%，焦虑中度问题占比 3.6%，焦虑重度问题占比 2.6%。这表明焦虑是本校中小学生中最常见的心理健康问题。</span>
                    </div>
                    <div class="yy_txt noSplitBox">
                        <span style="font-weight: 400;">抑郁问题次之：</span>
                        <span>抑郁问题的总检出率为 24.3%，其中抑郁轻度问题占比最大，为 21.7%，抑郁中度问题占比 2.4%，抑郁重度问题占比 0.2%。抑郁问题仅次于焦虑问题，成为本校中小学生心理健康问题中的第二大常见类型。</span>
                    </div>
                    <div class="yy_txt noSplitBox">
                        <span style="font-weight: 400;">自我伤害问题不容忽视：</span>
                        <span>自我伤害问题的总检出率为 20.7%，其中自我伤害轻度问题占比最多，为 20.1%，自我伤害中度问题占比 0.5%，自我伤害重度问题占比 0.1%。虽然自我伤害问题的检出率稍低一些，但它涉及到学生的生命安全，因此同样值得关注。</span>
                    </div>

                    <div class="yy_txt noSplitBox">
                        <span style="font-weight: 400;">强迫问题和敌对问题相对较少：</span>
                        <span>强迫问题的总检出率为 18.8%，其中强迫轻度问题占比最大，为 16.5%，强迫中度问题占比 1.5%，强迫重度问题占比 0.9%。敌对问题的总检出率为 18.6%，其中敌对轻度问题占比最大，为 16.9%，敌对中度问题占比 1.6%，敌对重度问题占比 0.2%。这两类问题虽然检出率相对较低，但也需要引起注意。</span>
                    </div>
                    
                    <div class="yy_txt noSplitBox">
                        综上所述，焦虑问题是本校中小学生最突出的心理健康问题，其次为抑郁问题。学校和家长应当对此给予高度重视，采取相应的预防和干预措施，以保障学生的心理健康。
                    </div>
                    <div class="yy_t mulu_page">
                       3.1.2 不同性别各维度检出率
                    </div>
                    <div class="noSplitBox" style="width: 100%;height: 500px;margin: 30px auto;">
                        <div style="width: 400px;height: 400px;">检出率--雷达图</div>
                        <div>
                            <div>
                                <span></span>男
                            </div>
                            <div>
                                <span></span>女
                            </div>
                        </div>
                        <div class="yy_txt" style="text-align: center;">图 5 不同性别学生心理健康问题检出率分布图</div>
                    </div>
                    <div class="yy_txt noSplitBox">
                        根据图 5 的数据显示，男生在心理健康问题检出率的前三位为焦虑、抑郁、敌对；女生在心理健康问题检出率的前三位为抑郁、自我伤害、焦虑。
                    </div>
                    <div class="yy_txt noSplitBox">
                        具体来看，男生在焦虑（45.4%）、抑郁（29.0%）、敌对（25.6%）、强迫（25.0%）和自我伤害（24.2%）五个维度上的检出率均高于女生。尤其是在焦虑维度，男生的检出率明显超过女生。这可能与男生通常更难以通过社交和情感交流缓解压力有关，导致他们更容易陷入焦虑状态。此外，社会对男生的情感表达常常存在一定的压制，使得他们在面临心理困扰时更倾向于内化这些情绪，而非寻求支持或倾诉，从而加剧了焦虑的表现。因此，针对男生的心理健康干预措施应更加重视情感表达能力的培养和社交支持网络的构建，以帮助他们有效应对心理压力。
                    </div>
                    <div class="yy_t mulu_page">
                        3.1.3 各个学段各维度检出率
                    </div>
                    <div>
                        <div class="yy_txt noSplitBox" style="text-align: center;">图 5 不同性别学生心理健康问题检出率分布图</div>
                        <table cellspacing="0" cellpadding="30">
                            <tr class="pdf-details noSplitBox">
                                <th></th>
                                <th>抑郁</th>
                                <th>焦虑</th>
                                <th>强迫</th>
                                <th>敌对</th>
                                <th>自我伤害</th>
                            </tr>
                            <tr class="pdf-details noSplitBox">
                                <td>轻度问题</td>
                                <td>1.5%</td>
                                <td>1.5%</td>
                                <td>1.5%</td>
                                <td>1.5%</td>
                                <td>1.5%</td>
                            </tr>
                            <tr class="pdf-details noSplitBox">
                                <td>中度问题</td>
                                <td>11.5%</td>
                                <td>11.5%</td>
                                <td>11.5%</td>
                                <td>11.5%</td>
                                <td>11.5%</td>
                            </tr>
                            <tr class="pdf-details noSplitBox">
                                <td>重度问题</td>
                                <td>21.5%</td>
                                <td>21.5%</td>
                                <td>21.5%</td>
                                <td>21.5%</td>
                                <td>21.5%</td>
                            </tr>
                        </table>
                        <div class="yy_txt noSplitBox" style="text-align: center;">注：加*表示该年级检出率同时高于全国常模和本校常模</div>
                        
                    </div>
                    <div class="yy_txt noSplitBox" style="text-align: center;">注：加*表示该年级检出率同时高于全国常模和本校常模</div>
                    <!-- 这里需要细分一下 -->

                    <div class="yy_txt noSplitBox" style="text-align: center;">由表中可以看出，预备年级测评维度检出率由高到低分别为：焦虑（36.1%）、抑郁（23.0%）、敌对（21.6%）、自我伤害（17.4%）、强迫（17.2%）；初中一年级测评维度检出率由高到低分别为：焦虑（28.0%）、抑郁（24.4%）、自我伤害（20.2%）、敌对（16.1%）、强迫（15.4%）；高中一年级测评维度检出率由高到低分别为：焦虑（31.9%）、抑郁（24.3%）、自我伤害（20.7%）、强迫（18.8%）、敌对（18.6%）。</div>


                    <div class="yy_t mulu_page">
                        3.2 预备年级测评分析
                    </div>
                    <div class="yy_t mulu_page">
                        3.2.1 预备年级测评结果概况
                    </div>
                    <div class="noSplitBox" style="width: 100%;height: 500px;margin: 30px auto;">
                        <div style="width: 400px;height: 400px;">检出率--雷达图</div>
                        <div>
                            <div>
                                <span></span>预备年级
                            </div>
                            <div>
                                <span></span>全国常模
                            </div>
                            <div>
                                <span></span>本校常模
                            </div>
                        </div>
                        <div class="yy_txt noSplitBox" style="text-align: center;">图 6 预备年级学生心理健康问题检出率对比分布图</div>
                    </div>
                    <div>
                        
                        <table cellspacing="0" cellpadding="30">
                            <tr class="pdf-details noSplitBox">
                                <th></th>
                                <th>抑郁</th>
                                <th>焦虑</th>
                                <th>强迫</th>
                                <th>敌对</th>
                                <th>自我伤害</th>
                            </tr>
                            <tr class="pdf-details noSplitBox">
                                <td>预备年级</td>
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
                        <div class="yy_txt noSplitBox" style="text-align: center;">注：加*表示该年级检出率同时高于全国常模和本校常模</div>
                        
                    </div>
                    <div class="yy_txt noSplitBox">
                        与全国常模相比，预备年级学生在强迫、自我伤害方面表现较好，敌对、抑郁和焦虑方面有待改善。其中，焦虑维度和抑郁维度超出全国常模较多，分别超出 6.3%和 3.1%。
                    </div>
                    <div class="yy_txt noSplitBox">
                        与本校常模相比，预备年级学生在强迫、自我伤害和抑郁方面表现较好，在敌对和焦虑方面有待改善。其中，焦虑和敌对维度超出本校常模较多，分别达到 4.2%和 2.3%。
                    </div>


                    <div class="yy_t mulu_page">
                        附录：各维度沙盘表现特征
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
                    <!-- 抑郁 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.2 抑郁维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）抑郁维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                        空洞与缺失
                    </div>
                    <div class="yy_txt noSplitBox">
                        主题的单一化
                    </div>
                    <div class="yy_txt noSplitBox">
                        使用封闭与孤立的元素
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议受测者个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             不否定自己的负面情绪，减少自我攻击的思维。
                        </div>
                        <div class="yy_txt noSplitBox">
                             找到自己喜欢做的事情，并投入其中。例如：去接近大自然，或者看影视剧，观看演唱会等。
                        </div>
                        <div class="yy_txt noSplitBox">
                             增加体育锻炼，或进行艺术活动与创作，例如音乐、舞蹈等。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             尽量减少或杜绝对孩子的批评指责，适当降低对孩子的要求。
                        </div>
                        <div class="yy_txt noSplitBox">
                             欣赏孩子的进步与改变，及时夸奖孩子的积极心态或者行为。例如：孩子主动做家务，家长应及时赞赏和感谢孩子的付出。
                        </div>
                        <div class="yy_txt noSplitBox">
                             倾听孩子的烦恼或者心里话，进行情感共鸣而非语言评价。例如：家长询问孩子“今天在学校，你的感受怎么样？”，用心倾听孩子的感受，不去评价孩子。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校尽量不采用成绩排名公示，减少评价，避免排名靠后的学生因成绩不好而自卑。
                        </div>
                        <div class="yy_txt noSplitBox">
                             创造同学之间的交流机会，组织学生感兴趣的课外活动。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期举行心理健康教育课程或活动，引导孩子主动觉察与接纳自己的负面情绪等等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【关键沙具】
                        </div>
                        <div class="yy_txt noSplitBox" v-for="iteml in item.list" :key="iteml.id">
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议受测者个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照低风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             允许自己的抑郁症状出现并有所波动，不因自己努力后症状没有减轻而责怪自己。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当有自杀自伤意念或行为时，及时与身边关爱自己的人（家人、老师、同学和朋友等）寻求帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应接纳孩子目前的状态。例如孩子因情绪问题成绩下降，家长不能打骂孩子，可以陪伴孩子找到成绩下降的原因，帮助孩子克服困难。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应为孩子提供宽松的生活与精神环境，陪伴孩子度过最艰难的时刻。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应多关注孩子的情绪，如果孩子的情绪持续低落、饮食或睡眠出现异常，应及时带孩子去医院就医，不指责孩子。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应关注孩子的自杀自伤风险，例如孩子身上是否有伤，用爱温暖孩子，避免孩子伤害自己，一旦发现自杀自伤现象，及时与专业医院或机构联系。
                        </div>
                        <div class="yy_txt noSplitBox">
                             如经专业医生诊断后，需服用药物，家长需监督管理服药情况。
                        </div>
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期举行心理健康教育课程或活动，引导孩子主动觉察与接纳自己的负面情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校建立风险筛查与应对机制，例如：定期对学生的心理状态进行评估，对中风险人群给予心理支持；组织学生进行团体心理咨询，或者展开一对一个体咨询工作。
                        </div>
                        <div class="yy_txt noSplitBox">
                             相关心理老师在咨询中如发现个体的心理状态比较严重，短期内不能改善时，建议家长及时带个体去医院就医，并遵医嘱服药，并做好相应的记录工作。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议个体及时去医院就医，必要时进行住院治疗，并辅助心理咨询服务。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自杀意念比较强烈时，建议个人拨打自杀干预热线，寻求专业的支持和帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险家庭环境建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应抽出大量的时间陪伴孩子，用爱心、信心和耐心滋养孩子的心灵。
                        </div>
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期举行心理健康教育课程，如 AI 心理沙盘心境课程。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期进行危机排查工作，建立风险筛查与应对机制，对重度抑郁的学生进行重点关注，包括与家长合作及时反馈学生状况，建议家长带学生去医院就医，遵医嘱，必要时进行住院治疗。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对无法上学并住院治疗的抑郁症学生，学校应关注学生的治疗情况，当学生出院并具备上学条件时，应为学生提供良好的回归环境。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可开展相应心理课堂或讲座，引导全体同学尊重并正视抑郁症状，对有抑郁症学生提供帮助，避免因抑郁症状的污名化造成对个体的伤害。
                        </div>
                    <!-- </div> -->

                    <!-- 焦虑 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.3 焦虑维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）焦虑维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                        布局的混乱与堆积
                    </div>
                    <div class="yy_txt noSplitBox">
                        防御性结构
                    </div>
                    <div class="yy_txt noSplitBox">
                        使用封闭与孤立的元素
                    </div>
                    <div class="yy_txt noSplitBox">
                        动态表现
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议受测者个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             识别自己的灾难化思维，例如是否过度担心未来没有发生的事，考试之前就害怕自己考不好，这种害怕和担心让自己没有办法安心学习，对未来的焦虑影响了当下的学习状态。需要做出适当调整。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察对自己焦虑的情绪是否有抵触或者否定的情绪，尽量用接纳的态度面对自己的焦虑情绪，不让情绪评价再次伤害自己。例如当发现自己有焦虑情绪时，不去批评自己又开始焦虑了，要正面评价这种焦虑的情绪，对自己说“我现在焦虑，说明我很上进，我想让自己变得更好，我只需要将焦虑控制在一定范围内就好”。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时进行心理咨询，表达自己的情绪，让焦虑情绪得到理解和看见，并有宣泄的出口。例如有痛苦的情绪及时向家长、老师、学校咨询师表达。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察考试成绩对自己影响，开发更多的课外兴趣，用多个评价体系评估自己的能力。例如“我数学不好，但是我作文很好”，或者“我虽然学习不好，但是我画画很好，我一样是一个有价值，值得被爱的人”，或者“我虽然学习不好，也没有特长，但是我为人真诚热情，同学都喜欢和我玩，寻求我的帮助，我是一个很有价值的人”等等。
                        </div>
                        <div class="yy_txt noSplitBox">
                             增加体育锻炼，亲近大自然，放松心情，缓解紧张情绪。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家庭成员尽量减少对个体的批判与高要求，允许个体按照自己的节奏学习、进步，允许个体犯错，尽量营造温馨和睦宽容有爱的家庭环境，让个体感受到爱与包容，个体的自我才能变得强大，才能容忍未来的不确定性。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长还可以多带个体出去游玩，感受自然的风景，缓解焦虑的情绪等等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对受测者个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可尽量减少对学生的显性评价，减少学生焦虑的来源。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可多组织户外运动，让学生的大脑得到放松。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可开展有利于人际沟通的班级活动等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            建议个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己的焦虑情绪是否已经降低了学习效率，当学习时无法集中注意力而被大量焦虑情绪淹没时，需要寻求心理咨询的帮助。
                        </div>
                        <div class="yy_txt noSplitBox">
                             主动寻求心理援助，例如去精神科医院就医，遵医嘱服药，并寻求心理咨询服务的帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险家庭角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应多观察孩子的情绪状态，例如孩子是否有灾难化思维，是否自己给自己很大的压力，如果孩子的情绪非常不好，鼓励孩子说出来，例如家长可以说“我看到你最近情绪一直都不太好，是考试成绩不理想的原因吗？你愿意说说吗?我能做什么，才能帮到你？”。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家庭成员首先要做到自己不焦虑，调节好自身情绪，避免将自己的焦虑传递给个体。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长不催促不强迫孩子的学习，不评价孩子的成绩，接纳学生目前的学习状态和成绩，对于孩子的小小进步给予肯定和鼓励，有利于孩子自信心的增加。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当孩子焦虑症状影响其学习时，家长应接纳孩子目前的状态，适度降低对孩子的期待，并帮孩子与学校老师及时沟通，给予适当的缓和空间。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时带个体去做心理咨询，求助专业人员的帮助。家人带领但不强迫个体去精神科医院就诊，遵医嘱服药，并寻求心理咨询服务的帮助。
                        </div>
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可设立减压室、心理服务中心，鼓励焦虑个体进行情绪表达。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可与家长合作，综合孩子在学校和在家的状态，经心理老师评估后如果孩子整体状态没有向好的方向发展，学校应建议家长带孩子去医院就医，遵医嘱服药，并辅助进行心理咨询。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面进行自我调整：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自己被大量的焦虑情绪困扰并且有身体的某些部位有异常反应，例如写字时出汗、手抖，感觉到心脏狂跳、心慌等，应及时与老师和家长反映，并由家长带领去专业医院就医，严格遵医嘱服药，并积极寻求心理咨询的帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险家庭环境建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长可尝试传递给孩子一个信息，即无论孩子成绩如何，自己都会100%爱孩子，孩子在自己心中的位置不会因考试成绩糟糕而有任何变化，给孩子提供充足的安全感。
                        </div>
                        <div class="yy_txt noSplitBox">
                             观察孩子的状态，必要时带孩子去专科医院就医，遵医嘱服药，照顾好孩子的生活。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可定期进行危机排查工作，尤其是在考试成绩出来之后，尽量避免公开成绩排名，避免学生过度的竞争与比较心态。
                        </div>
                        <div class="yy_txt noSplitBox">
                             考试成绩出来之后关注学生的情绪变化，与家长沟通合作，建立家校联盟。
                        </div>
                        <div class="yy_txt noSplitBox">
                             针对学生的学习困难，学校应为个体提供多样化的专项辅导课程，例如鼓励跨年级帮助，学长分享自己的成功经验，帮助个体克服学习中的困难。
                        </div>
                        <div class="yy_txt noSplitBox">
                             在重大事件到来之前，例如在考试之前（包括期中、期末考试以及升学考试），学校应组织主题为考试焦虑的团体辅导，有效缓解学生的考试焦虑，促使学生在考试时得到更好的发挥。
                        </div>
                        <div class="yy_txt noSplitBox">
                             定期在校内组织心理活动，开展心理课堂，还可以邀请家长一同参与。
                        </div>
                        <div class="yy_txt noSplitBox">
                             针对高焦虑个体，建议其家长带领学生就医，遵医嘱服药，必要时进行住院治疗，并辅助心理咨询服务。
                        </div>
                    <!-- </div> -->

                    <!-- 强迫 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.4 强迫维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）强迫维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                        重复性和过度控制
                    </div>
                    <div class="yy_txt noSplitBox">
                        对称性和极端整洁
                    </div>
                    <div class="yy_txt noSplitBox">
                        对立元素同时出现
                    </div>
                    <div class="yy_txt noSplitBox">
                        使用具有威胁性的沙具
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             识别自己的某些强迫的观念，例如：外面非常脏，有无数细菌，回家要把每一个细菌都消灭或者洗掉，并觉察由这些信念引起的焦虑情绪，接纳和安抚这种焦虑的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对自己的强迫症状采取不批判、不对抗的态度，学会跟它们和平共处，带着症状去生活。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻找可替代的同样可以缓解焦虑情绪的行为，而这种行为对自己的身体和社会功能没有损害性。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察学习、考试成绩对自己的意义，是否将自己的价值都寄托于它们之上，找到更多评价自己的体系，拓宽自己的价值视野。
                        </div>
                        <div class="yy_txt noSplitBox">
                             情绪不好时及时寻求家人和朋友的帮助。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时进行心理咨询，表达自己强迫的观念或行为以及由此引发的情绪，宣泄这些情绪，有利于症状的减轻。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家庭成员对个体给予无条件的爱，尽量减少对个体的批判，看到个体强迫行为背后焦虑的情绪，看到个体对发生的事情有强烈的责任，理解并接纳个体的强迫思维和行为，用爱和关心拥抱个体，降低个体的焦虑。
                        </div>
                        <div class="yy_txt noSplitBox">
                             多带个体亲近大自然，感受放松的环境，缓解焦虑的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时带个体去做心理咨询，求助专业人员的帮助。例如：箱庭治疗、ERP（暴露与反应阻止疗法）治疗等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校与相关管理者应淡化成绩对个体的评价影响，并鼓励个体发展多样化的技能，让个体在学习中体验到不让个体崩溃的压力，同时能促进个体成长进步。
                        </div>
                        <div class="yy_txt noSplitBox">
                             多开展团体活动，让个体宣泄自己的想法和情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校与相关管理者设立减压室，心理服务中心，鼓励个体进行对自己的焦虑情绪进行表达等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             主动寻求心理援助，例如去精神科医院就医，遵医嘱服药，并寻求心理咨询服务的帮助。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当强迫思维和行为影响到学习时，首先不否定自己，及时寻求身边人的理解和帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照低风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应观察孩子的行为或强迫思维，允许孩子有这些强迫症状，并和孩子一起面对它们。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家人带领但不强迫个体去精神科医院就诊，此外还可以带个体寻求心理咨询服务的帮助。
                        </div>
                        
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照低风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校定期进行危机排查工作，不强化成绩对学生的评价作用。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校应主动与家长合作，给学生一个放松的环境，鼓励学生发展自己的特长等等。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自己的强迫症状严重影响学习时，不对自己的症状产生巨大的排斥和反抗，相信自己通过专业的治疗，症状会有所缓解。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议及时去医院就医，必要时进行住院治疗，严格遵医嘱，并辅助心理咨询服务。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长或家人尽量不提学习成绩，为个体提供温暖的包容的环境，关心个体的身体健康和生理、心理需要，并满足这些需要，安抚个体的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议家长带领但不强迫个体去医院就医，并为孩子寻找合适的心理咨询服务。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参照中风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校应观察学生的在校状况，尊重并不歧视有明显强迫症状的学生，在教学安排上允许学生有强迫行为，并鼓励身边的同学帮助该个体，避免污名化对个体的二次伤害。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可以开展相应的心理健康课程，帮助个人正确认识强迫症或强迫症状，进行心理健康教育。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校可以开展相应的主题团体辅导活动，在安全、受保护的空间里，鼓励大家去表达自身，让个人明白并非只有自己才有，减轻个体的病耻感。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建议学校定时进行危机排查，鼓励其家人带领并不强迫个体就医，必要时进行住院治疗，有条件的话，可协助提供合适的心理咨询资源。
                        </div>
                    <!-- </div> -->

                    <!-- 敌对 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.5 敌对维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）敌对维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                         冲突性场景的构建
                    </div>
                    <div class="yy_txt noSplitBox">
                         攻击性沙具的使用
                    </div>
                    <div class="yy_txt noSplitBox">
                         界限和障碍的设置
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己愤怒的情绪或者其他的情绪，以及引起这些情绪的原因，面对和接纳这些情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻找舒缓自己情绪的活动，例如：户外运动或室内对抗性运动，宣泄自己的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻求家人和朋友的帮助。例如：自己想打人时，用语言表达自己的愤怒，或者告诉家人和朋友，自己有想打人的冲动，用语言表达出来，而不是攻击行为。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时寻求学校心理老师的帮助。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             理解个体敌对行为背后的心理原因，关注个体内心的恐惧、悲伤等情绪，抱持这些负面情绪，用耐心和爱心支持个体。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时寻求专业机构或者心理咨询的帮助等等。
                        </div>

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             对个体的负面行为给予负面的反馈，但不否定个体的人格，不伤害个体的自尊。
                        </div>
                        <div class="yy_txt noSplitBox">
                             用团体辅导的形式让个体表达人际间的情绪问题，让个体看到自己的人际交往模式，用团体的力量影响个体的认知和行为风格等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             先运用理性学会控制自己的伤害行为，找到替代的非伤害的行为舒缓自己的情绪。例如：学习拳击（而不是打人）去发泄自己的情绪等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险家庭角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             父母或者家人自己不用暴力解决问题，包括肢体暴力和语言暴力，用温和的态度对待个体，用理性和商量的方式解决分歧与问题，给个体树立良好的榜样。
                        </div>
                        <div class="yy_txt noSplitBox">
                             教授或者影响个体用语言或者其他非伤害的形式表达自己的情绪或者想法，接纳个体的表达，并给予正向的回应。
                        </div>
                        <div class="yy_txt noSplitBox">
                             明白孩子的改变并非一朝一夕，家长要有耐心和爱心，陪伴孩子纠正自己的行为。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长对孩子的敌对行为不做出二次惩罚，例如孩子在学校打了同学，家长以坚定的态度和孩子沟通，而不是用打骂的方式教育孩子。家长教育孩子的方式直接影响了孩子处理关系的方式。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家人应学习如何科学应对个体的敌意行为，必要时寻求专业机构和心理咨询的帮助。
                        </div>
                        
                        <div class="yy_t noSplitBox">
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
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险学校角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             针对这一群体，多开展团体咨询，让孩子有机会体验到别人的想法，增强孩子的理解和共情别人的能力。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对个体进行心理评估，定期对个体进行心理治疗或者咨询等等。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当自己的愤怒情绪波动很大想用攻击行为解决问题时，让自己默数 10个数，或者深呼吸，用第三方的视角看自己当下的状态，觉察攻击行为的后果。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻求专业机构或心理咨询的帮助。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长积极与学校合作，向老师及时反馈在家状况，无论孩子表现多么糟糕，都不能以暴制暴，要用理性坚定的语言和温和的态度帮助孩子理解别人被攻击后的痛苦，并引导孩子做出积极的行为。
                        </div>
                        <div class="yy_txt noSplitBox">
                             必要时带领但不强迫个体去专业机构寻求帮助，并带孩子进行心理咨询。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             与个体的家长或家人合作，探索行为背后的原因、情绪以及目的，鼓励个体表达自己的负面情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             定期检查个体的心理状态，与个体家人合作，在专业机构和心理医生的建议下联合制定应对方案。
                        </div>
                        <div class="yy_txt noSplitBox">
                             鼓励个体做利他的行为，并在发现个体有这种行为之后给予高度的赞赏，让个体在利他行为之后体验到被欣赏和价值感，及时强化等等。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建立监督机制，对比较严重的敌对行为给于惩罚。但不伤害个体的自尊，不否定个体的人格，创造个体为他人服务的可能性，提高个体的价值感。
                        </div>
                    <!-- </div> -->

                    <!-- 敌对 -->
                    <div class="yy_t noSplitBox mulu_page">
                        2.2.6 自我伤害维度样例
                    </div>
                    <div class="yy_t noSplitBox">
                        （一）自我伤害维度在沙盘中的表现特征
                    </div>
                    <div class="yy_txt noSplitBox">
                         破坏性和荒凉感的场景
                    </div>
                    <div class="yy_txt noSplitBox">
                         选择具有攻击性和残缺相关的沙具
                    </div>
                    <div class="yy_txt noSplitBox">
                         孤立或受困的角色
                    </div>
                    <div class="yy_txt noSplitBox">
                         重复的死亡和毁灭象征
                    </div>
                    <div class="yy_txt noSplitBox">
                        详细解释可见附录
                    </div>
                    
                    <div class="yy_t noSplitBox">
                        （二）经典案例解读
                    </div>
                    
                    
                    
                    
                    <div v-for="item in expListYy" :key="item.id">
                        <div class="yy_t noSplitBox">
                            （{{item.id}}）{{item.name}}问题
                        </div>
                        <div class="yy_t noSplitBox">
                            <img style="width: 500px;height: auto;" src="../../assets//images/report/t001.png" alt="">
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
                            <span style="font-weight: 400;">{{iteml.title}}：</span>
                            <span>{{iteml.txt}}</span>
                        </div>
                        <div class="yy_txt noSplitBox">
                            {{item.txt2}}
                        </div>
                    </div>

                    <div class="yy_t noSplitBox">
                        （三）指导建议
                    </div>
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （1）轻度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己负面的情绪，以及这些情绪产生的情景以及原因。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻找家人或者朋友表达并宣泄自身负面的情绪，明白自己内心真实的想法。
                        </div>
                        <div class="yy_txt noSplitBox">
                             觉察自己是否将自己的人生价值放在某件单一的事情上，例如学习成绩、升学考试等。尝试寻找更多人生的意义，在自己喜欢或者擅长的事情上获得成就感和满足感。
                        </div>
                        <div class="yy_txt noSplitBox">
                             如果外部压力非常大，尝试屏蔽这些压力，守护好自己的世界，积极寻找支持自己的资源和力量。
                        </div>
                        <div class="yy_txt noSplitBox">
                             感觉自身需要的时候，可以寻找学校心理老师的帮助。
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
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长不去对孩子提出过高的要求，觉察孩子的消极情绪，帮助孩子度过人生中的困难。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长鼓励孩子做自己喜欢的事，并对一点点的进步给于极大的鼓励和欣赏。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长关注孩子日常的情绪变化，有必要时，及时带孩子寻求专业机构或心理咨询帮助等等。
                        </div>
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             降低社会评价体系对个体的影响，尽量避免公开公布成绩排名等信息。
                        </div>
                        <div class="yy_txt noSplitBox">
                             提供更多的娱乐项目，丰富个体的生活，减轻压力，找到学习与生活之间的平衡状态等等。
                        </div>
                    <!-- </div> -->
                     <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （2）中度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当有自伤想法或冲动时，用其他非伤害的动作感受自己，例如用橡皮筋弹自己的手腕，用双手拍自己的四肢等，让自己紧张、焦虑与痛苦的情绪得到舒缓。
                        </div>
                        <div class="yy_txt noSplitBox">
                             寻求专业机构、医院或者心理咨询的帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考低风险家庭角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             面对有自伤行为的孩子，家长应及时发现并给予充分的关心和爱护，家长不能批评指责孩子，或者在孩子的威胁中任由孩子做任何事。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长给予孩子无条件的爱，不因孩子学习不好，就不爱孩子，让孩子感受到无论自己多么糟糕，家人都是爱自己、支持自己的。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长可与孩子交谈，找到孩子自伤背后真正的原因，并做出相应的改变。例如孩子有自己的兴趣爱好，却不被家长支持，或者有自己的生活喜欢不被家长接纳，家长应给孩子更多的自由去探索世界，不必过分担心和焦虑孩子的未来。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长发现孩子有自伤的行为之后，应带领但不强迫孩子去医院就医，遵医嘱服药，或者寻求心理咨询的帮助。
                        </div>
                        
                        <div class="yy_t noSplitBox">
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
                        <div class="yy_txt noSplitBox">
                             参考低风险学校角度的建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             组织团体辅导活动，让个体在团体中表达自己的情绪感受，获得团体人际间的支持，增强个体的自我强度，应对生活中的压力。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对个体的价值进行多元化的评估，不以某个单一的结果衡量个体的价值，例如不以学生的成绩衡量个体的全部价值等等。
                        </div>
                    <!-- </div> -->
                    <!-- <div v-for="item in expListYy" :key="item.id"> -->
                        <div class="yy_t noSplitBox">
                            （3）重度问题
                        </div>
                        
                        <div class="yy_t noSplitBox">
                            【个人角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议个人从以下几个方面调整自己：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险个人角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             当情绪非常痛苦时，及时拨打危机干预电话，寻求专业机构、医院、心理咨询、警察的帮助等等。
                        </div>
                        
                        
                        <div class="yy_t noSplitBox">
                            【家庭角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议家长从以下几个方面与孩子相处：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险家庭角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长应与学校密切合作，经常了解孩子在学校的情况，特别是考试前或者考试成绩不理想之后，及时安抚孩子的情绪。
                        </div>
                        <div class="yy_txt noSplitBox">
                             家长还可以及时寻求医院、专业机构的帮助，在专业的方案指导下保护孩子，并寻找合适的心理咨询资源给孩子。
                        </div>
                        
                        

                        <div class="yy_t noSplitBox">
                            【学校角度】
                        </div>
                        <div class="yy_txt noSplitBox">
                            可建议学校或者相关管理者从以下几个方面对个体进行帮助与支持：
                        </div>
                        <div class="yy_txt noSplitBox">
                             参考中风险学校角度建议。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对高危自伤人群给于重点关注，联合孩子家长制定专业看护方案，保护个体的人生安全。
                        </div>
                        <div class="yy_txt noSplitBox">
                             对学生建立心理档案，对高敏感的孩子给予特殊关注。
                        </div>
                        <div class="yy_txt noSplitBox">
                             建立危机排查机制，与家长合作，联合专业机构、医院或者咨询师制定应对方案。
                        </div>
                        <div class="yy_txt noSplitBox">
                             学校应建议家长带孩子去专科医院就医，遵医嘱服药，并辅助心理咨询治疗等等。
                        </div>
                    <!-- </div> -->


                    
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
            ],
            // 抑郁样例
            expListYy:[
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
            // width: 1190px;
            margin: 0 auto;
            border-collapse: collapse;
            
            text-align: center;
            position: relative;
            background: #f00;
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