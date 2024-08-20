<template>
  <div class="report_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>评估报告</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="tab_box" v-if="trainFlag">
        <div
          :class="['tab_btns tab_btns_l', { tab_act: tabActive == 0 }]"
          @click="tabChange(0)"
        >
          <i class="iconfont icon-xuesheng"></i>
          用户
        </div>
        <div
          :class="['tab_btns', { tab_act: tabActive == 1 }]"
          @click="tabChange(1)"
        >
          <i class="iconfont icon-wode"></i>
          游客
        </div>
      </div>
    </div>
    <div>
      <div class="search_form_box">
        <div class="search_title center_o_title">
          查询
        </div>
        <el-form
          v-show="tabActive == 0"
          :inline="true"
          ref="formSearch"
          :model="formSearch"
          class="search_form search_form0"
        >
          <el-form-item  prop="name" class="sf_name">
            <label slot="label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label>
            <el-input
              v-model="formSearch.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录账号:" prop="passport">
            <el-input
              v-model="formSearch.passport"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item :label="fid30207.fieldName + ':'" prop="department">
            <el-select
              v-model="formSearch.department"
              multiple
              placeholder="全部"
            >
              <el-option
                v-for="item in studyList"
                :key="item.Pid"
                :label="item.Name"
                :value="item.Pid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="time_data" label="测评时间:" prop="time">
            <el-date-picker
              v-model="formSearch.time"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="warning" label="评估结果:">
            <el-select v-model="formSearch.warning" placeholder="全部">
              <el-option label="全部" :value="4"></el-option>
              <el-option label="正常" :value="0"></el-option>
              <el-option label="" :value="1">
                <img style="width:0.67rem;" src="../../assets/images/news/di.png" alt="">
              </el-option>
              <el-option label="" :value="2">
                <img style="width:0.67rem;" src="../../assets/images/news/zhong.png" alt="">
              </el-option>
              <el-option label="" :value="3">
                <img style="width:0.67rem;" src="../../assets/images/news/gao.png" alt="">
              </el-option>
            </el-select>
            <!-- 选中后的列表 -->
            <div class="img-option img-selected" v-if="formSearch.warning > 0 && formSearch.warning < 4">
              <img v-if="formSearch.warning == 1" style="width:0.67rem;" src="../../assets/images/news/di.png" alt="">
              <img v-if="formSearch.warning == 2" style="width:0.67rem;" src="../../assets/images/news/zhong.png" alt="">
              <img v-if="formSearch.warning == 3" style="width:0.67rem;" src="../../assets/images/news/gao.png" alt="">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button
              type="primary"
              class="resets"
              @click="resetForm('formSearch')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-form
          v-show="tabActive == 1"
          :inline="true"
          ref="formSearchYou"
          :model="formSearchYou"
          class="search_form"
        >
          <el-form-item prop="name" label="昵称:">
            <el-input
              v-model="formSearchYou.name"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item prop="passport" label="ID:">
            <el-input
              v-model="formSearchYou.passport"
              placeholder="请输入ID"
            ></el-input>
          </el-form-item>
          <el-form-item class="time_data" prop="time" label="测评时间:">
            <el-date-picker
              v-model="formSearchYou.time"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="warning" label="评估结果:">
            <el-select v-model="formSearchYou.warning" placeholder="全部">
              <el-option label="全部" :value="4"></el-option>
              <el-option label="正常" :value="0"></el-option>
              <el-option label="" :value="1">
                <img style="width:0.67rem;" src="../../assets/images/news/di.png" alt="">
              </el-option>
              <el-option label="" :value="2">
                <img style="width:0.67rem;" src="../../assets/images/news/zhong.png" alt="">
              </el-option>
              <el-option label="" :value="3">
                <img style="width:0.67rem;" src="../../assets/images/news/gao.png" alt="">
              </el-option>
            </el-select>
            <!-- 选中后的列表 -->
            <div class="img-option img-selected" v-if="formSearchYou.warning > 0 && formSearchYou.warning < 4">
              <img v-if="formSearchYou.warning == 1" style="width:0.67rem;" src="../../assets/images/news/di.png" alt="">
              <img v-if="formSearchYou.warning == 2" style="width:0.67rem;" src="../../assets/images/news/zhong.png" alt="">
              <img v-if="formSearchYou.warning == 3" style="width:0.67rem;" src="../../assets/images/news/gao.png" alt="">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitYou">查询</el-button>
            <el-button
              type="primary"
              class="resets"
              @click="resetFormYou('formSearchYou')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="tables_box">
        <div class="search_title center_o_title">
          列表
        </div>
        <div class="el_btn_box">
          <div class="el_one" v-if="tabActive == 0 && power14">
            <el-button
              class="el_btn_one"
              @click="someExport('all')"
              type="primary"
            >
              <i class="iconfont icon-icon-"></i>
              批量导出个人报告
            </el-button>
          </div>
          <div class="el_two" v-if="tabActive == 0 && power26">
            <el-button
              class="el_btn_two"
              @click="apartsReport"
              type="primary"
            >
              <i class="iconfont icon-icon-"></i>
              导出团体报告
            </el-button>
          </div>
          <div class="el_two" v-if="tabActive == 0 && power15">
            <el-button
              class="el_btn_two"
              @click="someDelete('所选')"
              type="primary"
            >
              <i class="iconfont icon-shanchu1"></i>
              批量删除
            </el-button>
          </div>
          <div class="el_one" v-if="tabActive == 1 && power24">
            <el-button
              class="el_btn_one"
              @click="someExport('all')"
              type="primary"
            >
              <i class="iconfont icon-icon-"></i>
              批量导出个人报告
            </el-button>
          </div>
          <!-- <div class="el_one" v-if="tabActive == 1 && power24">
            <el-button
              class="el_btn_one"
              @click="someReport('all')"
              type="primary"
            >
              <i class="iconfont icon-icon-"></i>
              批量导出记录
            </el-button>
          </div> -->
          <div class="el_two" v-if="tabActive == 1 && power25">
            <el-button
              class="el_btn_two"
              @click="someDelete('所选')"
              type="primary"
            >
              <i class="iconfont icon-shanchu1"></i>
              批量删除
            </el-button>
          </div>
        </div>
        <template>
          <el-table
            v-if="tabActive == 0"
            border
            class="yhClas"
            :data="tableData"
            @sort-change="sortChange"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column type="index" label="序号" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
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
            <el-table-column prop="departmentName" :label="fid30207.fieldName">
            </el-table-column>
            <el-table-column prop="passport" label="登录账号">
            </el-table-column>
            <el-table-column prop="evaluationTime" sortable label="测评次数">
              <template slot-scope="scope">
                {{ scope.row.evaluationTime }}
              </template>
            </el-table-column>
            <el-table-column prop="date" sortable label="测评时间">
            </el-table-column>
            <el-table-column prop="warning" label="评估结果">
              <template slot-scope="scope">
                <div class="primary_g primary_r0" v-if="scope.row.warning == 0">
                  <!-- <img class="primary_g_img" src="../../assets/images/index0.png" alt=""> -->
                  <el-button type="primary" plain size="small">正常</el-button>
                </div>
                <div class="primary_r primary_r1" v-if="scope.row.warning == 1">
                  <img class="primary_g_img" style="width:0.67rem;" src="../../assets/images/news/di.png" alt="">
                  <!-- <img class="primary_g_img" src="../../assets/images/index1.png" alt=""> -->
                  <!-- <el-button type="danger" plain size="small">轻度预警</el-button> -->
                </div>
                <div class="primary_r primary_r2" v-if="scope.row.warning == 2">
                  <img class="primary_g_img" style="width: 0.67rem;" src="../../assets/images/news/zhong.png" alt="">
                  <!-- <img class="primary_g_img" src="../../assets/images/index2.png" alt=""> -->
                  <!-- <el-button type="danger" plain size="small">中度预警</el-button> -->
                </div>
                <div class="primary_r primary_r3" v-if="scope.row.warning == 3">
                  <img class="primary_g_img" style="width: 0.67rem;" src="../../assets/images/news/gao.png" alt="">
                  <!-- <img class="primary_g_img" src="../../assets/images/index3.png" alt=""> -->
                  <!-- <el-button type="danger" plain size="small">重度预警</el-button> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span v-if="!power11 && !power12 && !power13">暂无权限</span>
                <!-- <el-button @click="toWord(scope.row)" type="text" size="small"
                  >记录</el-button
                > -->
                <el-button
                  @click="toDetail(scope.row)"
                  v-if="power11"
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="oneExport(scope.row)"
                  v-if="power12"
                  >导出</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="singleDelete(scope.row)"
                  v-if="power13"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-table
            v-if="tabActive == 1"
            class="ykClas"
            border
            :data="tableData"
            @sort-change="sortChange"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column type="index" label="序号" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="passport" label="ID"> </el-table-column>
            <el-table-column prop="name" label="昵称"> </el-table-column>
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
            <el-table-column prop="date" sortable label="测评时间">
            </el-table-column>
            <el-table-column prop="warning" label="评估结果">
              <template slot-scope="scope">
                <div class="primary_g primary_r0" v-if="scope.row.warning == 0">
                  <!-- <img class="primary_g_img" src="../../assets/images/index0.png" alt=""> -->
                  <el-button type="primary" plain size="small">正常</el-button>
                </div>
                <div class="primary_r primary_r1" v-if="scope.row.warning == 1">
                  <img class="primary_g_img" style="width:0.67rem;" src="../../assets/images/news/di.png" alt="">
                  <!-- <img class="primary_g_img" src="../../assets/images/index1.png" alt=""> -->
                  <!-- <el-button type="danger" plain size="small">轻度预警</el-button> -->
                </div>
                <div class="primary_r primary_r2" v-if="scope.row.warning == 2">
                  <img class="primary_g_img" style="width: 0.67rem;" src="../../assets/images/news/zhong.png" alt="">
                  <!-- <img class="primary_g_img" src="../../assets/images/index2.png" alt=""> -->
                  <!-- <el-button type="danger" plain size="small">中度预警</el-button> -->
                </div>
                <div class="primary_r primary_r3" v-if="scope.row.warning == 3">
                  <img class="primary_g_img" style="width: 0.67rem;" src="../../assets/images/news/gao.png" alt="">
                  <!-- <img class="primary_g_img" src="../../assets/images/index3.png" alt=""> -->
                  <!-- <el-button type="danger" plain size="small">重度预警</el-button> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span v-if="!power21 && !power22 && !power23">暂无权限</span>
                <!-- <el-button @click="toWord(scope.row)" type="text" size="small"
                  >记录</el-button
                > -->
                <el-button
                  @click="toDetail(scope.row)"
                  v-if="power21"
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="oneExport(scope.row)"
                  v-if="power22"
                  >导出</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="singleDelete(scope.row)"
                  v-if="power23"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="table_page">
          <div class="page_total">
            共 <span>{{ total }}</span> 条 , 第
            <span>{{ currentPage }}/{{ pageNum }}</span> 页
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="limit"
            layout="prev, pager, next, sizes, jumper"
            :total="total"
          >
          </el-pagination>
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
    <!-- 批量导出 -->
    <div style="height:0;width:100%;overflow:hidden">
      <someReports :iList="pdfList"></someReports>
    </div>
    <!-- 批量导出记录1 -->
    <!-- <div style="height:0;width:100%;overflow:hidden">
      <wordFile :wList="wordList"></wordFile>
    </div> -->
    <!-- 导出团体报告 -->
    <el-dialog
      class="fix_pass fix_pass3"
      :close-on-click-modal="false"
      title="导出团体报告"
      :visible.sync="dialogPartFrame"
    >
      <el-form ref="partsForm" :model="partsForm">
        
        <!-- <el-form-item required :label="fid30302.fieldName + ':'">
          <el-select v-model="department" :placeholder="'请选择' + fid30207.fieldName" style="width:100%">
            <el-option v-for="item in studyList" :key="item.Pid" :label="item.Name" :value="item.Pid"></el-option>
          </el-select>
          <div class="tip_left" v-show="frameFlag">
            <div class="tip_msg">
              <img src="../../assets/images/x.png" alt="" />
              请选择{{fid30302.fieldName}}
            </div>
          </div>
        </el-form-item> -->
        <el-form-item required class="time_data" label="测评时间段:">
          <el-date-picker
            v-model="partsForm.time"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          >
          </el-date-picker>
          <div class="tip_left" v-show="pTimeFlag">
            <div class="tip_msg">
              <img src="../../assets/images/x.png" alt="" />
              请选择测评时间段
            </div>
          </div>
        </el-form-item>
        <el-form-item required label="选择团队:">
          <!-- studyList1 -->
          <el-select v-model="partsForm.organization" @change="orgChange" placeholder="请选择团队" style="width:100%">
            <el-option v-for="item in studyList" :key="item.Pid" :label="item.Name" :value="item.Pid"></el-option>
          </el-select>
          <div class="tip_left" v-show="organizationFlag">
            <div class="tip_msg">
              <img src="../../assets/images/x.png" alt="" />
              请选择团队
            </div>
          </div>
        </el-form-item>
        <el-form-item required label="统计方式:" class="tjfs">
          <el-radio-group v-model="partsForm.type" @change="pTypeChange">
            <el-radio :label="1">按最近一次测评结果统计</el-radio>
            <el-radio :label="2">按预警程度最高结果统计</el-radio>
          </el-radio-group>
          <!-- <div class="tip_left" v-show="pTypeFlag">
            <div class="tip_msg">
              <img src="../../assets/images/x.png" alt="" />
              请输入修改原因
            </div>
          </div> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="partsSub">下 载</el-button>
        <el-button @click="dialogPartFrame = false">取 消</el-button>
      </div>
    </el-dialog>
    <div style="height:0;width:100%;overflow:hidden">
      <PartsReport
        :gList="partList"
      ></PartsReport>
    </div>
  </div>
</template>

<script>
// import wordFile from "../Details/WordFile.vue";

import PartsReport from "../Model/PartsReport.vue";
import personReport from "../Model/ModelReport.vue";
import someReports from "../Model/ExportPdf.vue";
import { mapGetters, mapMutations } from "vuex";
import Url from "@/assets/js/url.js";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export default {
  name: "report",
  components: {
    personReport,
    someReports,
    PartsReport
    // wordFile
  },
  data() {
    return {
      partList: {},
      pTimeFlag: false,
      organizationFlag: false,
      pTypeFlag: false,
      partsForm: {
        time: '',
        organization: '',
        type: 1
      },
      organizationName: '',
      department: '',
      departmentName: '',
      dialogPartFrame: false,
      schoolOrg1: [],
      checkAll: false,
      isIndeterminate: false,
      pdfList: [],
      groupList: {},
      genderList: [],
      power1: false,
      power11: false,
      power12: false,
      power13: false,
      power14: false,
      power15: false,
      power26: false,
      power16: false,
      power2: false,
      power21: false,
      power22: false,
      power23: false,
      power24: false,
      power25: false,
      power3: false,

      checkedList: [],
      class: [],
      dialogAddClass: false,
      addClassOne: false,
      classFlag: false,
      addClassForm: {
        aside: 2,
        level: "",
        grade: "",
        class: []
      },
      // groupFlag: true,
      levelList: [],
      gradeList: [],
      classList: [],
      levelList1: [],
      gradeList1: [],
      classList1: [],
      checkList: [],
      tabActive: 0,
      limit: 10,
      total: 0,
      pageNum: 1,
      currentPage: 1,
      formSearch: {
        name: "",
        passport: "",
        department: "",
        // level: "",
        // grade: "",
        // class: "",
        time: "",
        warning: 4
      },
      formSearchYou: {
        name: "",
        passport: "",
        department: "",
        time: "",
        warning: 4
      },
      tableData: [],

      details: {},
      reviewData: {},
      sandInfo: [],
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
      part1: false,
      part2: false,
      part3: false,
      part4: false,
      treeLabels: "",
      treeData: [],
      defaultProps: {
        children: "list",
        label: "Name"
      },
      sysList2: [],
      depressionFlag: 1,
      anxietyFlag: 1,
      forcedFlag: 1,
      suicideFlag: 0,
      violenceFlag: 0,
      personalityFlag: 0,
      studyList: [],
      studyList1: [],
      fid30207: {
        enable: 1,
        fieldId: 30207,
        fieldName: "所属部门",
        fieldType: "筛选框",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      wordList: [],
      trainFlag: true
    };
  },
  computed: {
    ...mapGetters(["getGroupFlag", "getPersonFlag", "getSomePdfFlag"]),
    bindmodel() {
      const { part1, part2, part3, part4 } = this;
      return {
        part1,
        part2,
        part3,
        part4
      };
    }
  },
  watch: {
    bindmodel: {
      handler: function(newVal) {
        console.log(newVal)
        this.part1 = newVal.part1;
        this.part2 = newVal.part2;
        this.part3 = newVal.part3;
        this.part4 = newVal.part4;
        if (this.part1 && this.part2 && this.part3 && this.part4) {
          this.part1 = false;
          this.part2 = false;
          this.part3 = false;
          this.part4 = false;
          this.personExport();
          this.loading.close();
        } else {
        }
      }
    }
  },
  created() {},
  mounted() {
    this.fieldData();
    this.auth();
    this.addChange2();
    if (localStorage.getItem('version')) {
      if (localStorage.getItem('version') == 1) {
        this.trainFlag = false
      }
    }
  },
  methods: {
    ...mapMutations([
      "setGroupFlag",
      "setGradesFlag",
      "setPersonFlag",
      "setSomePdfFlag",
      "setPartsFlag"
    ]),
    renderContent(h, { node, data, store }) {
      if (data.Mark == 1) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      } else {
      }
    },
    fieldData() {
      let that = this;
      var param = {
        fieldId: 30000
      };
      that.$http
        .get(Url + "/aimw/field/listFieldInfo", {
          params: param
        })
        .then(res => {
          let datas = res.data.data;
          if (res.data.code == 0) {
            if (datas) {
              for (let i in datas) {
                if (datas[i].fieldId == 30207) {
                  this.fid30207 = datas[i];
                }
              }
            } else {
            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.data.msg);
        });
    },
    // 部门列表树
    addChange2() {
      let that = this;
      this.addChangeFlag = true;
      var param = {
        passport: localStorage.getItem("passport")
      };
      this.$http
        .get(Url + "/aimw/organization/listOrgTreeInfo", {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data) {
              this.addChangeFlag = true;
              let schoolOrg = JSON.parse(data.data).organization;
              console.log(schoolOrg)
              this.studyList = [];
              this.recursiveFunction2(schoolOrg);
              this.studyList.sort((a, b) => {
                return Number(a.Pid) - Number(b.Pid);
              });
              this.treeData = schoolOrg;
              this.tabChange(0);
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getStr2(data) {
      let that = this;
      data.forEach(function(row) {
        console.log(row)
        if (row.list) {
          console.log(1)
          that.getStr2(row.list);
        }
        if (row.Mark == 1) {
          console.log(2)
          that.studyList.push({ Name: row.Name, Pid: row.Pid, list: row.list })
        }
      });
    },
    recursiveFunction2(data) {
      let that = this;
      that.getStr2(data);
    },
    clearTrees() {
      this.formSearch.department = "";
      this.$refs.listUserTree01.setCurrentKey(null);
    },
    cleans() {
      this.formSearch.department = "";
      this.$refs.listUserTree01.setCurrentKey(null);
      this.treeLabels = null;
    },
    handleNodeClicks(data, node) {
      this.treeLabels = node.label;
      this.formSearch.department = data.Pid;
      this.$refs.listUserTree11.blur();
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
            localStorage.setItem(
              "algTypes",
              JSON.stringify(data.data.algTypes)
            );
            this.powerData();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    pTypeChange(val) {
      console.log(val)
    },
    asideChange(val) {
      if (val == 2) {
        this.classFlag = true;
      } else {
        this.classFlag = false;
      }
      this.addClassForm = {
        aside: val,
        level: "",
        grade: "",
        class: ""
      };
      this.checkAll = false;
      this.isIndeterminate = false;
      this.checkedList = [];
      this.addClassForm.level = this.levelList1[0].Pid;
      this.levleChange(this.levelList1[0].Pid);
      this.addClassForm.grade = this.gradeList1[0].Pid;
      this.gradeChange(this.gradeList1[0].Pid);
    },
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power11 = power.includes(20101); // 用户-查看
      this.power12 = power.includes(20102); // 用户-导出
      this.power13 = power.includes(20103); // 用户-删除
      this.power14 = power.includes(20104); // 用户-批量导出
      this.power15 = power.includes(20105); // 用户-批量删除
      this.power26 = power.includes(20111); // 用户-导出团体报告
      this.power21 = power.includes(20106); // 游客-查看
      this.power22 = power.includes(20107); // 游客-导出
      this.power23 = power.includes(20108); // 游客-删除
      this.power24 = power.includes(20109); // 游客-批量导出
      this.power25 = power.includes(20110); // 游客-批量删除
    },
    indexMethod(index) {
      let that = this;
      return index + 1 + that.limit * (this.currentPage - 1);
    },
    handleCheckAllChange(val) {
      let classArr = [];
      for (let i in this.classList1) {
        classArr.push(this.classList1[i].Pid);
      }
      this.addClassForm.class = val ? classArr : [];
      this.checkedList = val ? classArr : [];
      this.isIndeterminate = false;
    },
    handleclassChange(value) {
      this.checkedList = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.classList1.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.classList1.length;
    },
    sbChange(val) {
      let index = -1;
      if (JSON.stringify(this.checkedList).indexOf(val.Pid) == -1) {
        this.checkedList.push(val.Pid);
      } else {
        for (let i in this.checkedList) {
          if (this.checkedList[i] == val.Pid) {
            index = i;
          }
        }
      }
      if (this.checkedList.length > 0 && index > -1) {
        this.checkedList.splice(index, 1);
      }
      this.addClassForm.class = this.checkedList;
    },
    groupFlagChange(val) {
      this.groupFlag = val;
    },
    isWord(val) {
      this.$router.push({
        name: "expword",
        params: { userID: val.reportId }
      });
      // let routeData = this.$router.resolve({
      //   name: "expword",
      //   params: { userID: val.reportId }
      // });
      // window.open(routeData.href, '_self');
    },
    isService(val) {
      let routeData = this.$router.resolve({
        name: "detailsreport",
        params: { userID: val.reportId }
      });
      window.open(routeData.href, "_blank");
    },
    toWord(data) {
      localStorage.setItem("openReport", data.reportId);
      localStorage.setItem("expGender", data.gender);
      this.isWord(data);
    },
    toDetail(data) {
      localStorage.setItem("openReport", data.reportId);
      localStorage.setItem("expGender", data.gender);
      this.isService(data);
    },
    handleSelectionChange(val) {
      this.checkList = val;
    },
    // 学段 年级 班级 三级联动
    levleChange(val) {
      this.choseLevel1(val);
    },
    gradeChange(val) {
      this.choseGrade1(val);
    },
    choseLevel1(value) {
      this.gradeList1 = [];
      this.classList1 = [];
      this.addClassForm.grade = "";
      this.addClassForm.class = "";
      this.levelList.map(e => {
        if (value == e.Pid) {
          this.gradeList1 = e.list;
          if (e.list.length > 0) {
            this.addClassForm.grade = e.list[0].Pid;
            this.choseGrade1(e.list[0].Pid);
          }
          return false;
        }
      });
    },
    choseGrade1(value) {
      this.checkedList = [];
      this.checkAll = false;
      this.isIndeterminate = false;
      this.classList1 = [];
      this.addClassForm.class = "";
      this.gradeList1.map(e => {
        if (value == e.Pid) {
          this.classList1 = e.list;
          return false;
        }
      });
    },
    // 学段 年级 班级 三级联动
    choseLevel(value) {
      this.gradeList = [];
      this.classList = [];
      this.formSearch.grade = "";
      this.formSearch.class = "";
      this.levelList.map(e => {
        if (value == e.Pid) {
          this.gradeList = e.list;
          return false;
        }
      });
    },
    choseGrade(value) {
      this.classList = [];
      this.formSearch.class = "";
      this.gradeList.map(e => {
        if (value == e.Pid) {
          this.classList = e.list;
          return false;
        }
      });
    },
    // 获取报告列表  用户0 游客1
    getList(page) {
      let that = this;
      var param = {};
      let star = "";
      let end = "";
      this.currentPage = page;
      if (that.tabActive == 0) {
        if (that.formSearch.time != "" && that.formSearch.time) {
          star =
            that.formTimes(that.formSearch.time[0]).replace(/-/g, "") +
            "000000";
          end =
            that.formTimes(that.formSearch.time[1]).replace(/-/g, "") +
            "235959";
        }
        let frameArr = [];
        console.log(this.studyList);
        if (that.formSearch.department == "") {
          for (let i in this.studyList) {
            frameArr.push(this.studyList[i].Pid);
          }
        } else {
          frameArr = this.formSearch.department;
        }
        let warns = that.formSearch.warning;
        console.log(frameArr);
        param = {
          currentPage: page,
          pageSize: that.limit,
          type: that.tabActive,
          name: that.formSearch.name,
          passport: that.formSearch.passport,
          departments: frameArr,
          startDate: star,
          endDate: end,
          warning: warns,
          userAuth: localStorage.getItem("userAuth")
        };
      } else {
        if (that.formSearchYou.time != "" && that.formSearchYou.time) {
          star =
            that.formTimes(that.formSearchYou.time[0]).replace(/-/g, "") +
            "000000";
          end =
            that.formTimes(that.formSearchYou.time[1]).replace(/-/g, "") +
            "235959";
        }
        let warns = that.formSearchYou.warning;
        // if (that.formSearchYou.warning == "") {
        //   warns = 2;
        // } else {
        // warns = that.formSearchYou.warning;
        // }
        param = {
          currentPage: page,
          pageSize: that.limit,
          type: that.tabActive,
          name: that.formSearchYou.name,
          passport: that.formSearchYou.passport,
          startDate: star,
          endDate: end,
          warning: warns,
          userAuth: localStorage.getItem("userAuth")
        };
      }

      this.$http
        .get(Url + "/aimw/report/listReports", {
          params: param
        })
        .then(res => {
          let data = res.data.data;
          if (res.data.code == 0) {
            if (data) {
              that.tableData = data.results;
              that.total = data.count;
              that.pageNum =
                data.count == 0 ? 1 : Math.ceil(data.count / that.limit);
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
    personExport() {
      console.log(111)
      this.loading.close();
      this.setPersonFlag(true);
    },
    // 获取报告详情
    getfourImg(birdView, param) {
      let that = this;
      var parama = param;
      this.$http
        .get(Url + "/aimw/report/reportReviewImgs", {
          params: parama
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
            this.part4 = true;
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
    getDetail(datas) {
      let that = this;
      var param = {
        reportId: datas.reportId
      };
      this.loading = this.$loading({
        lock: true,
        text: "报告生成中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
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
            this.part1 = true;
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
            this.part2 = true;
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
        
      // this.$http
      //   .get(Url + "/aimw/report/reportBirdView", {
      //     params: param
      //   })
      //   .then(res => {
      //     let data = res.data;
      //     if (data.code == 0) {
      //       this.details.birdView = data.data.birdView;
      //       this.getfourImg(data.data.birdView, param);
      //     } else {
      //       that.$message.error(data.msg);
      //       this.part4 = true;
      //     }
      //   })
      //   .catch(res => {
      //     console.log(res);
      //   });
      this.details.birdView = '';
      that.imgList = [
        {
          name: "鸟瞰图",
          img: ""
        },
        {
          name: "西侧俯身45度视图",
          img: ''
        },
        {
          name: "东侧俯身45度视图",
          img: ''
        },
        {
          name: "操作者视图",
          img: ''
        }
      ];
      this.part4 = true;

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
                return Number(a.total) - Number(b.total);
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
            data.data.reportId = datas.reportId
            if (data.data.note) {
              that.assessment = data.data.note
              if (data.data.note == '') {
                that.assessmentFlag = false
              } else {
                that.assessmentFlag = true
              }
            }
            that.details = data.data;
            this.part3 = true;
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
    oneExport(datas) {
      localStorage.setItem("expGender", datas.gender);
      let that = this;
      let param = {
        passport: JSON.parse(localStorage.getItem("userInfo")).passport
        // password: JSON.parse(localStorage.getItem("userInfo")).password
      };
      this.$http
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
              let mental = data.data.algTypes.mentalDim.toString(2).split('')
              data.data.algTypes.depressionFlag = mental[0]
              data.data.algTypes.anxietyFlag = mental[1]
              data.data.algTypes.forcedFlag = mental[2]
              data.data.algTypes.ptsdFlag = mental[3]
              data.data.algTypes.violenceFlag = mental[4]
              data.data.algTypes.suicideFlag = mental[5]
              // data.data.algTypes.zibiFlag = mental[6]
              // personalityDim
              // 人格分析维度(0x11111由低位到高位分别代表：外向性extroversion、尽责性conscientiousness、神经质nervousness、宜人性agreeableness、开放性openness)
              // console.log(data.data.algTypes.personalityDim.toString(2).split(''))
              let personality = data.data.algTypes.personalityDim.toString(2).split('')
              data.data.algTypes.extroversionFlag = personality[0]
              data.data.algTypes.conscientiousnessFlag = personality[1]
              data.data.algTypes.nervousnessFlag = personality[2]
              data.data.algTypes.agreeablenessFlag = personality[3]
              data.data.algTypes.opennessFlag = personality[4]

              // positiveDim
              // 积极心理维度(0b11111由低到高代表：心理韧性resilience、积极自我self、积极成就achievement、积极情绪emotion、积极关系relationship)
              
              let positive = data.data.algTypes.positiveDim.toString(2).split('')
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
            this.getDetail(datas);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // // 批量导出记录
    someReport() {
      this.pdfList = [];
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要导出的报告!"
        });
        return false;
      }
      var checkArr = [];
      for (let i in this.checkList) {
        console.log(this.checkList[i]);
        checkArr.push({
          reportId: this.checkList[i].reportId
        });
      }
      this.wordList = checkArr;
      this.exportMeeting(this.wordList);
    },
    async exportMeeting(list) {
      console.log(list);
      this.loading = this.$loading({
        lock: true,
        text: "正在请求数据 ( " + 0 + " / " + list.length + " )",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      let selectedData = [];
      for (let i in list) {
        selectedData.push(
          await this.getMeetingAll(list[i].reportId, Number(i) + 1, list.length)
        );
      }
      console.log(selectedData);
      this.loading.setText("正在拼命导出");
      this.exportWord(selectedData);
    },
    getMeetingAll(id, count, len) {
      console.log(id, count, len);
      let that = this;
      return new Promise((resolve, reject) => {
        console.log("????");
        let param = {
          reportId: id
        };
        that.$http
          .get(Url + "/aimw/report/consultationInfo", {
            params: param
          })
          .then(res => {
            let data = res.data;
            console.log(data);
            let allAjax = {}
            if (data.code == 0) {
              this.$http
                .get(Url + "/aimw/report/reportBirdView", {
                  params: param
                })
                .then(res1 => {
                  let data1 = res1.data;
                  if (data1.code == 0) {
                    let bird = "data:image/jpg;base64," + data1.data.birdView;
                    if (data.data) {
                      console.log(data.data);
                      let consultationInfo = JSON.parse(data.data.consultationInfo)
                      let typeStart = []
                      let typeStartStr = []
                      for (let i in consultationInfo.type_stat) {
                        typeStart.push(i + '<i>' + consultationInfo.type_stat[i] + '</i>个')
                        typeStartStr.push(i + consultationInfo.type_stat[i] + '个')
                      }
                      consultationInfo.typeStat = typeStart.join('，')
                      consultationInfo.typeStatStr = typeStartStr.join('，')
                      consultationInfo.duringStr = this.getTime1(consultationInfo.during)
                      consultationInfo.sandList = consultationInfo.sand_record.records
                      consultationInfo.sand_picture = bird
                      allAjax = consultationInfo;
                    } else {
                      allAjax = {
                        sandList: [],
                        sand_record: {
                          records_num: 0,
                          records: []
                        },
                        name: "",
                        start_time: "",
                        finish_time: "",
                        discuss_process: "",
                        visitor_feeling: "",
                        sand_picture: bird,
                        during: '',
                        duringStr: '',
                        type_stat: {},
                        typeStat: [],
                        typeStatStr: '',
                        world_name: "",
                        theme: "",
                        assessment: "",
                        next_time: "",
                        next_aim: ""
                      }
                    }
                    setTimeout(() => {
                      resolve(allAjax);
                      this.loading.setText(
                        "正在请求数据 ( " + count + " / " + len + " )"
                      );
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
      });
    },
    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
      if (!base64Regex.test(dataURL)) {
        return false;
      }
      const stringBase64 = dataURL.replace(base64Regex, "");
      let binaryString;
      if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
      } else {
        // eslint-disable-next-line node/no-deprecated-api
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
      }
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes.buffer;
    },
    exportWord(list) {
      console.log(list);
      let that = this;
      const zip = new JSZip();
      const promises = [];
      list.forEach((item, index) => {
        console.log(item);
        const promise = new Promise((resolve, reject) => {
          let imgSize = {
            image: [200, 160]
          };

          // item.sand_picture = ''
          var ImageModule = require("docxtemplater-image-module-free");
          // 读取并获得模板文件的二进制内容
          JSZipUtils.getBinaryContent("/file/word.docx", function(
            error,
            content
          ) {
            console.log(error);
            console.log(content);
            // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
            // 抛出异常
            if (error) {
              throw error;
            }
            // 图片处理
            let opts = {};

            opts = {
              // 图像是否居中
              centered: false
            };

            opts.getImage = chartId => {
              console.log(chartId); // base64数据
              // 将base64的数据转为ArrayBuffer
              return that.base64DataURLToArrayBuffer(chartId);
            };
            opts.getSize = function(img, tagValue, tagName) {
              console.log(img); // ArrayBuffer数据
              console.log(tagValue); // base64数据
              console.log(tagName); // wordData对象的图像属性名
              // 自定义指定图像大小
              if (imgSize.hasOwnProperty(tagName)) {
                return imgSize[tagName];
              } else {
                return [343, 195];
              }
            };
            // 创建一个PizZip实例，内容为模板的内容
            console.log(content);
            let piz = new PizZip(content);
            // 创建并加载docxtemplater实例对象
            // eslint-disable-next-line new-cap
            let doc = new docxtemplater();
            doc.attachModule(new ImageModule(opts));
            doc.loadZip(piz);
            console.log(doc);
            // 设置模板变量的值
            doc.setData(item)
            // doc.setData({
            //   name: item.name,
            //   school: item.name,
            //   assess: item.name,
            //   remark: item.name,
            //   image:
            //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTY1OTcwMjRFNzZGMTFFQjg5QkZGREQxM0UxM0M0OEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTY1OTcwMjVFNzZGMTFFQjg5QkZGREQxM0UxM0M0OEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RTUxMjFGRkU3NkYxMUVCODlCRkZERDEzRTEzQzQ4QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RTUxMjIwMEU3NkYxMUVCODlCRkZERDEzRTEzQzQ4QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlOsPl0AAAGsSURBVHjafJO9TgJBFIXP7Awg2BpiCI1UKib6CMZYYDQ+Bca/ytKXwFhYEH0JCw0FsTQWJmpCLAnaUGjhT0GysLue2RnYXSDe5GN25l7O3LlzR+A+wJgtkyrZIgt2rU0a5Iq8xoNFTCANEdQ4HnLZUZhq/kDgkuMJ6RmBh8D8Gbghm3qiBP41itzZDF0HDgcHZ1kHmwRKhvOpDKSBcRukpuNF9jEo9wVeGCLju5zPAbt5oDgD5J6SGfRNhh5ZVX0ZFkzmIocxqnd6RmBgpbNR5WA3rDopiQpBX6enDHp++gXcfpv4lDKM/BEVxZ/SSNhmMIhlERZVThQxNCZXUnGnGK++nBTwGJMafvMWlCfRzgCL2jF+98JmwBhkpm/y5lC94dnrkTEOZoElW7Vjfq9njJBM0hT592CFMc/MIHHSz2Iym+tfYP8nUQN9jWv6CC2K15n+0fCM2ua7SQG9npaJ0tRJSxS6AZ0BW1mMWjl6HJHgmIWtTJ/reGHrCpdXtk0uiJ9m8dLT29kndbJDXElxUfgwr9GPdiqTPV5VhaPuEZd0SNM+51Y8lT8BBgCeGmfrVYo1fgAAAABJRU5ErkJggg==",
            //   // 教育经历
            //   table: [
            //     {
            //       id: 1,
            //       name: "21",
            //       date: "08:30:00",
            //       address: "北京市海淀区中关村大厦101室",
            //       txt1: "51",
            //       txt2: "61"
            //     },
            //     {
            //       id: 2,
            //       name: "22",
            //       date: "08:40:00",
            //       address: "北京市海淀区中关村大厦102室",
            //       txt1: "52",
            //       txt2: "62"
            //     },
            //     {
            //       id: 3,
            //       name: "23",
            //       date: "08:50:00",
            //       address: "北京市海淀区中关村大厦103室",
            //       txt1: "53",
            //       txt2: "63"
            //     }
            //   ]
            // });
            try {
              // 用模板变量的值替换所有模板变量
              doc.render();
            } catch (error) {
              let e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties
              };
              // console.log(JSON.stringify({ error: e }));
              // console.log('1111')
              // throw error;
            }
            // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
            let out = doc.getZip().generate({
              type: "blob",
              mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            // 将目标文件对象保存为目标类型的文件，并命名
            let fileName =
              item.name +
              "-第" +
              item.evaluationTime +
              "次-" +
              new Date().getTime() +
              ".docx";
            zip.file(fileName, out, { binary: true });
            resolve();
          });
        });
        promises.push(promise);
      });
      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then(content => {
          let nameZip =
            "咨询记录 - " +
            "共" +
            list.length +
            "人 - " +
            this.formTimes1(new Date());
          saveAs(content, nameZip + ".zip");
        });
        setTimeout(() => {
          this.loading.close();
        }, 2000);
      });
    },
    // 处理秒数为时分秒 h:m:s
    getTime1(num) {
      console.log(Math.floor(num / 60));
      let m = this.zeroFill(Math.floor(num / 60));
      let s = this.zeroFill(Math.floor(num % 60));
      let h = this.zeroFill(Math.floor(Math.floor(num / 60) / 60));
      // let time = "" + h + ":" + m + ":" + s + "";
      let time = "" + m + "分" + s + "秒";
      return time;
    },
    // 补零
    zeroFill(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    apartsReport() {
      console.log('导出团体报告')
      let that = this;
      this.addChange3();
      this.pTimeFlag = this.pTypeFlag = this.organizationFlag = false;
      this.partsForm = {
        time: '',
        organization: '',
        type: 1
      }
      that.studyList1 = []
      for (let i in this.studyList) {
        if (this.studyList[i].list) {
          console.log(3)
          that.studyList1.push({ Name: this.studyList[i].Name, Pid: this.studyList[i].Pid });
        }
      }
      
      this.dialogPartFrame = true
      
      // this.pdfList = []
      // var checkArr = [];
      // checkArr = [{
      //   reportId: that.reportId,
      //   gender: that.details.gender
      // }]
      // console.log(checkArr);
      // this.pdfList = checkArr
      // this.setSomePdfFlag(true);

      // let that = this;

      //   console.log(that.checkList)
      //   if (this.checkList.length == 0) {
      //     this.$message({
      //       type: "warning",
      //       message: "没有选择要下载的报告!"
      //     });
      //     return false;
      //   }
      //   this.pdfList = []
      //   var checkArr = [];
      //   for (let i in this.checkList) {
      //     checkArr.push({
      //       reportId: this.checkList[i].reportId,
      //       gender: this.checkList[i].gender
      //     });
      //   }
      //   console.log(checkArr);
      //   this.pdfList = checkArr
      //   this.setSomePdfFlag(true);
    },
    addChange3() {
      let that = this;
      this.addChangeFlag = true;
      var param = {
        passport: localStorage.getItem("passport")
      };
      this.$http
        .get(Url + "/aimw/organization/listOrgTreeInfo", {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data) {
              this.addChangeFlag = true;
              let schoolOrg = JSON.parse(data.data).organization;
              this.studyList = []
              this.recursiveFunction2(schoolOrg)
              this.studyList.sort((a, b) => {
                return Number(a.Pid) - Number(b.Pid);
              });
              this.treeData = schoolOrg;
              // this.getList(that.currentPage)
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    timeChange(val) {
      console.log(val)
      this.pTimeFlag = false
    },
    orgChange(val) {
      console.log(val)
      for (let i in this.studyList) {
        if (this.studyList[i].Pid == val) {
          this.organizationName = this.studyList[i].Name
        }
      }
      this.organizationFlag = false
    },
    // 下载报告
    partsSub() {
      var that = this;
      console.log(this.partsForm)
      this.pTimeFlag = this.pTypeFlag = this.organizationFlag = false;
      if (that.partsForm.time == '') {
        this.pTimeFlag = true;
        return false;
      }
      if (that.partsForm.organization == '') {
        this.organizationFlag = true;
        return false;
      }
      let star = "";
      let end = "";
      if (that.partsForm.time != "" && that.partsForm.time) {
        star =
          that.formTimes(that.partsForm.time[0]).replace(/-/g, "") +
          "000000";
        end =
          that.formTimes(that.partsForm.time[1]).replace(/-/g, "") +
          "235959";
      }
      
      let param = {
        organization: this.partsForm.organization,
        organizationName: this.organizationName,
        startDate: star,
        endDate: end,
        type: that.partsForm.type == 2 ? Number(1) : Number(0)
      };
      console.log(param)
      this.partList = param
      this.setPartsFlag(true);
      this.dialogPartFrame = false
      // return
      
      // if (this.department == "") {
      //   this.frameFlag = true;
      //   return false;
      // }
      // if (this.partsForm.reason == "") {
      //   this.reasonFlag = true;
      //   return false;
      // }
      // let checkArr = []
      // for (let i in this.checkList) {
      //   checkArr.push({ passport: this.checkList[i].passport });
      // }
      // for (let i in this.studyList) {
      //   if (this.studyList[i].Pid == this.department) {
      //     this.departmentName = this.studyList[i].Name
      //   }
      // }
      
    },
    // // 批量导出
    someExport() {
      let that = this;
      this.pdfList = [];
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要导出的报告!"
        });
        return false;
      }
      var checkArr = [];
      var genderArr = [];
      for (let i in this.checkList) {
        checkArr.push({
          reportId: this.checkList[i].reportId,
          gender: this.checkList[i].gender
        });
        
      }
      this.pdfList = checkArr;
      console.log(this.pdfList)
      that.$http
        .get(Url + "/aimw/user/getAuthInfo", { params: {
          passport: JSON.parse(localStorage.getItem("userInfo")).passport
        } })
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
              let mental = data.data.algTypes.mentalDim.toString(2).split('')
              data.data.algTypes.depressionFlag = mental[0]
              data.data.algTypes.anxietyFlag = mental[1]
              data.data.algTypes.forcedFlag = mental[2]
              data.data.algTypes.ptsdFlag = mental[3]
              data.data.algTypes.violenceFlag = mental[4]
              data.data.algTypes.suicideFlag = mental[5]
              // data.data.algTypes.zibiFlag = mental[6]
              // personalityDim
              // 人格分析维度(0x11111由低位到高位分别代表：外向性extroversion、尽责性conscientiousness、神经质nervousness、宜人性agreeableness、开放性openness)
              // console.log(data.data.algTypes.personalityDim.toString(2).split(''))
              let personality = data.data.algTypes.personalityDim.toString(2).split('')
              data.data.algTypes.extroversionFlag = personality[0]
              data.data.algTypes.conscientiousnessFlag = personality[1]
              data.data.algTypes.nervousnessFlag = personality[2]
              data.data.algTypes.agreeablenessFlag = personality[3]
              data.data.algTypes.opennessFlag = personality[4]

              // positiveDim
              // 积极心理维度(0b11111由低到高代表：心理韧性resilience、积极自我self、积极成就achievement、积极情绪emotion、积极关系relationship)
              
              let positive = data.data.algTypes.positiveDim.toString(2).split('')
              data.data.algTypes.resilienceFlag = positive[0]
              data.data.algTypes.selfFlag = positive[1]
              data.data.algTypes.achievementFlag = positive[2]
              data.data.algTypes.emotionFlag = positive[3]
              data.data.algTypes.relationshipFlag = positive[4]
              localStorage.setItem("algTypes", JSON.stringify(data.data.algTypes));
            }
            
            if (data.data.algTypes) {
              // 是否显示抑郁
              that.depressionFlag = data.data.algTypes.depressionFlag
              // 是否显示焦虑
              that.anxietyFlag = data.data.algTypes.anxietyFlag
              // 是否显示强迫
              that.forcedFlag = data.data.algTypes.forcedFlag
              // 是否显示PTSD
              that.ptsdFlag = data.data.algTypes.ptsdFlag
              // 是否显示敌对
              that.violenceFlag = data.data.algTypes.violenceFlag
              // 是否显示自我伤害
              that.suicideFlag = data.data.algTypes.suicideFlag
              // // 是否显示自闭
              // this.zibiFlag = data.data.algTypes.zibiFlag
              // 是否显示大五人格
              that.extroversionFlag = data.data.algTypes.extroversionFlag
              that.conscientiousnessFlag = data.data.algTypes.conscientiousnessFlag
              that.nervousnessFlag = data.data.algTypes.nervousnessFlag
              that.agreeablenessFlag = data.data.algTypes.agreeablenessFlag
              that.opennessFlag = data.data.algTypes.opennessFlag

              // 是否显示心理韧性
              that.resilienceFlag = data.data.algTypes.resilienceFlag
              // 是否显示积极自我
              that.selfFlag = data.data.algTypes.selfFlag
              // 是否显示积极成就
              that.achievementFlag = data.data.algTypes.achievementFlag
              // 是否显示积极情绪
              that.emotionFlag = data.data.algTypes.emotionFlag
              // 是否显示积极关系
              that.relationshipFlag = data.data.algTypes.relationshipFlag
            }

            this.setSomePdfFlag(true);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 批量删除
    someDelete() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要删除的数据!"
        });
        return false;
      }
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push({ reportId: this.checkList[i].reportId });
      }
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除所选数据？</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          this.$http
            .delete(Url + "/aimw/report/deleteReports", {
              data: checkArr
            })
            .then(res => {
              var data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList(this.currentPage);
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {});
    },
    // 单个删除
    singleDelete(row) {
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除当前数据？</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          var checkArr = [{ reportId: row.reportId }];
          this.$http
            .delete(Url + "/aimw/report/deleteReports", {
              data: checkArr
            })
            .then(res => {
              var data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList(this.currentPage);
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {});
    },
    tabChange(type) {
      this.tabActive = type;
      this.$refs["formSearch"].resetFields();
      this.$refs["formSearchYou"].resetFields();
      this.getList(1);
    },
    sortChange(e) {},
    handleSizeChange(val) {
      this.limit = val;
      this.getList(1);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(val);
    },
    onSubmit() {
      this.getList(1);
    },
    onSubmitYou() {
      this.getList(1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList(1);
    },
    resetFormYou(formName) {
      this.$refs[formName].resetFields();
      this.getList(1);
    },
    libraryHome(e) {
      this.$router.push({ name: "login" });
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
      let timeN =
        y +
        "年" +
        m +
        "月" +
        d +
        "日 " +
        h +
        "时" +
        minute +
        "分" +
        second +
        "秒";
      return timeN;
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
    }
  }
};
</script>

<style lang="less">
.wf_exp {
  .el-message-box__content {
    padding: 30px 15px 25px;
  }
}
.report_wrap {
  text-align: left;
  margin: 0 0.22rem;
  .add_class_dia {
    .el-checkbox__inner {
      width: 0.16rem;
      height: 0.16rem;
      .el-checkbox__inner::after {
        left: 0.04rem;
        top: 0.01rem;
      }
      .el-checkbox__inner::after {
        height: 0.08rem !important;
        width: 0.05rem !important;
      }
    }
    .el-checkbox__input {
      float: left;
      margin-top: 0.08rem;
    }
    .el-checkbox__label {
      font-size: 0.16rem !important;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.2rem;
      color: #606266 !important;
    }
    .el-form-item__content {
      width: 100%;
      line-height: 0.36rem;
      display: flex;
      .el-radio-group {
        height: auto;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .address-select-list {
        width: 100%;
        .adress-select {
          width: 95%;
        }
      }
    }
    .el-radio__input {
      height: 0.2rem;
    }
    .el-radio {
      line-height: 0.36rem;
      display: flex;
      align-items: center;
    }
    .el-radio__label {
      font-size: 0.16rem !important;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.2rem;
      color: #606266;
    }
    .el-radio__inner {
      width: 0.2rem;
      height: 0.2rem;
    }
    .el-radio__inner::after {
      width: 0.08rem;
      height: 0.08rem;
    }
  }
  // 公共带圈的标题
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
  // 公共页面顶部标题：带用户/游客
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
        min-width: 0.8rem;
        min-height: 0.32rem;
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7786ac;
        background: #ffffff;
        border-radius: 0 0.04rem 0.04rem 0;
        padding: 0 0.08rem;
        img {
          margin-right: 0.02rem;
          width: 0.15rem;
          height: 0.15rem;
        }
      }
      .tab_btns_l {
        border-radius: 0.04rem 0 0 0.04rem;
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
  // 头部搜索项
  .search_form_box {
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 0.04rem;
    padding: 0.2rem 0.24rem;
    .search_form {
      margin-top: 0.24rem;
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
          width: 2.1rem;
          line-height: 0.36rem;
          font-size: 0.16rem;
          position: relative;
          .el-input {
            font-size: 0.16rem;
            .el-input__icon {
              width: 0.25rem;
              line-height: 0.36rem;
              font-size: 0.16rem;
            }
            .el-input__inner {
              border: 0.01rem solid #dcdfe6;
              height: 0.36rem;
              line-height: 0.36rem;
              padding: 0 0.1rem;
            }
          }
          .el-select {
            width: 100%;
          }
          .img-option{
            position: absolute;
            margin: auto;
            left: 0.12rem;
            top: 0.01rem;
            background: #ffffff;
            width: auto;
            height: 0.34rem;
            bottom: 0.01rem;
            display: flex;
            align-items: center;
          }
        }
      }
      .el-form-item {
        margin-left: 0.22rem;
      }
      .el-form-item:first-child {
        margin-left: 0.22rem;
      }
      .time_data {
        .el-input__inner {
          width: 2.9rem !important;
          padding-left: 0.2rem !important;
        }
        .el-form-item__content {
          width: 2.9rem;
        }
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
    .search_form0{
      .el-form-item {
        .el-form-item__content {
          width: 2.4rem;
        }
        .time_data {
          .el-input__inner {
            width: 2.9rem !important;
            padding-left: 0.2rem !important;
          }
          .el-form-item__content {
            width: 2.9rem;
          }
        }
      }
    }
  }
  // 表格
  .tables_box {
    margin: 0.2rem 0;
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 0.04rem;
    padding: 0.2rem 0.24rem;
    // 表格上面的操作按钮
    .el_btn_box {
      margin: 0.18rem 0;
      display: flex;
      .el_one,
      .el_two {
        margin-right: 0.18rem;
        // width: 1.16rem;
        // height: 0.36rem;
        padding: 1px;
        background: linear-gradient(263deg, #00c2ff, #0075ff);
        border-radius: 0.04rem;
        overflow: hidden;
        box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
        .el_btn_one,
        .el_btn_two {
          border: 0;
          font-size: 0.16rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          background: linear-gradient(263deg, #00c2ff, #0075ff);
          border-radius: 0.04rem;
          padding: 0.08rem 0.1rem;
          width: 100%;
          height: 100%;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 0.14rem;
              height: 0.14rem;
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
          img {
            width: 0.18rem;
            height: 0.16rem;
          }
        }
      }
    }
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
      margin-bottom: 0.56rem;
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
        margin-left: 0;
        margin-right: 0;
      }
      .el-table__header,
      .el-table__body {
        col:nth-child(1) {
          width: 0.48rem;
        }
        col:nth-child(2) {
          width: 0.6rem;
        }
        col:nth-child(3) {
          width: 1rem;
        }
        col:nth-child(4) {
          width: 0.6rem;
        }
        // col:nth-child(5) {
        //   width: 1.4rem;
        // }
        col:nth-child(7) {
          width: 0.8rem;
        }
        col:nth-child(8) {
          width: 1.5rem;
        }
        col:nth-child(9) {
          width: 1rem;
        }
        col:nth-child(10) {
          width: 1.8rem;
        }
        col:nth-child(11) {
          width: 0;
        }
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
      // .primary_r {
      //   background: linear-gradient(
      //     45deg,
      //     rgba(253, 186, 133, 1) 0%,
      //     rgba(255, 126, 117, 1) 100%
      //   );
      // }
      // .primary_r2 {
      //   background: linear-gradient(
      //     45deg,
      //     rgba(253, 186, 133, 1) 0%,
      //     rgba(255, 126, 117, 1) 100%
      //   );
      // }
      // .primary_r3 {
      //   background: linear-gradient(
      //     45deg,
      //     rgba(253, 186, 133, 1) 0%,
      //     rgba(255, 126, 117, 1) 100%
      //   );
      // }
    }
    .ykClas {
      .el-table__header,
      .el-table__body {
        col:nth-child(1) {
          width: 0.48rem;
        }
        col:nth-child(2) {
          width: 0.8rem;
        }
        col:nth-child(4) {
          width: 1.2rem;
        }
        col:nth-child(5) {
          width: 1rem;
        }
        col:nth-child(6) {
          width: 1.6rem;
        }
        col:nth-child(7) {
          width: 1rem;
        }
        col:nth-child(8) {
          width: 1.6rem;
        }
        col:nth-child(9) {
          width: 0;
        }
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
      margin-bottom: 0.36rem;
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
}
</style>
