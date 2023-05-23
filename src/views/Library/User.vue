<template>
  <div class="accout_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="search_form_box">
      <div class="search_title center_o_title">
        查询
      </div>
      <el-form
        :inline="true"
        ref="formSearch"
        :model="formSearch"
        class="search_form"
      >
        <el-form-item label="姓名:" prop="name">
          <el-input
            v-model="formSearch.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item :label="fid30207.fieldName + ':'" prop="department">
          <el-select v-model="formSearch.department" clearable multiple placeholder="全部">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option v-for="item in studyList" :key="item.Pid" :label="item.Name" :value="item.Pid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录手机号:" prop="passport">
          <el-input
            v-model="formSearch.passport"
            placeholder="请输入登录手机号"
          ></el-input>
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
    </div>
    <div class="tables_box">
      <div class="search_title center_o_title">
        列表
      </div>
      <div class="el_btn_box">
        <div class="el_one" v-if="power1">
          <el-button class="el_btn_one" @click="addUser" type="primary">
            <i class="iconfont icon-jiahao"></i>
            {{fid30101.fieldName}}
          </el-button>
        </div>
        <div class="el_two" v-if="power2">
          <el-button class="el_btn_two" @click="batchUser" type="primary">
            <i class="iconfont icon-daochu"></i>
            导入
          </el-button>
        </div>
        <div class="el_two" v-if="power3">
          <el-button class="el_btn_two" @click="someExport" type="primary">
            <i class="iconfont icon-daochu"></i>
            导出
          </el-button>
        </div>
        <div class="el_two" v-if="power4">
          <el-button class="el_btn_two" @click="fixFrame" type="primary">
            <i class="iconfont icon-bianji"></i>
            {{fid30102.fieldName}}
          </el-button>
        </div>
        <div class="el_two" v-if="power10">
          <el-button
            class="el_btn_two"
            @click="someStop()"
            type="primary"
          >
            <i class="iconfont icon-tingyong"></i>
            批量停用
          </el-button>
        </div>
        <div class="el_two" v-if="power9">
          <el-button
            class="el_btn_two"
            @click="someDelete()"
            type="primary"
          >
            <i class="iconfont icon-shanchu1"></i>
            批量删除
          </el-button>
        </div>
        <div class="el_two" v-if="power6">
          <el-button class="el_btn_two" @click="passStop" type="primary">
            <i class="iconfont icon-shuaxin"></i>
            重置密码
          </el-button>
        </div>
      </div>
      <template>
        <el-table
          ref="accountTables"
          border
          :data="tableData"
          style="width: 100%"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column type="index" label="序号" :index="indexMethod"> </el-table-column>
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
          <el-table-column prop="departmentName" :label="fid30207.fieldName"> </el-table-column>
          <!-- <el-table-column prop="phone" :label="fid30205.fieldName"> </el-table-column> -->
          <el-table-column prop="passport" :label="fid30201.fieldName"> </el-table-column>
          <el-table-column prop="accountState" label="状态">
            <template slot-scope="scope">
              <div class="naturalize">
                <img v-if="scope.row.accountState" src="../../assets/images/update.jpg" alt="">
                <img v-else src="../../assets/images/stops.jpg" alt="">
                <span>{{ scope.row.accountState ? "在用" : "停用" }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span v-if="!power5&&!power7&&!power8">暂无权限</span>
              <el-button v-if="power7" @click="toDetail(scope.row)" type="text" size="small"
                >编辑</el-button
              >
              <el-button v-if="power5" type="text" size="small" @click="onesStop(scope.row)"
                >{{ scope.row.accountState ? "停用" : "启用" }}</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="singleDelete(scope.row)"
                v-if="power8"
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
    <!-- 停用/启用 -->
    <el-dialog
      class="fix_pass"
      :close-on-click-modal="false"
      title="停用/启用"
      :visible.sync="dialogOnesStop"
    >
      <el-form ref="onesForm" :model="onesForm">
        <el-form-item required :label="fid30401.fieldName + ':'">
          <div class="users_stop users_stop_one">
            <ul>
              <li v-for="item in onesList" :key="item.passport">{{item.name}}——{{item.departmentName}}</li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOnesStop = false">取 消</el-button>
        <el-button type="primary" @click="onesSub">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量停用 -->
    <el-dialog
      class="fix_pass"
      :close-on-click-modal="false"
      title="批量停用"
      :visible.sync="dialogSomeStop"
    >
      <el-form ref="stopForm" :model="stopForm">
        <el-form-item required :label="fid30401.fieldName + ':'">
          <div class="users_stop">
            <ul>
              <li v-for="item in checkList" :key="item.passport">{{item.name}}——{{item.departmentName}}<span v-if="allowDelFlag" @click="delCheck(item)">X</span></li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSomeStop = false">取 消</el-button>
        <el-button type="primary" @click="stopSub">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog
      class="fix_pass"
      :close-on-click-modal="false"
      title="重置密码"
      :visible.sync="dialogSetPass"
    >
      <el-form ref="setpassForm" :model="setpassForm">
        <el-form-item required :label="fid30501.fieldName + ':'">
          <div class="users_stop">
            <ul>
              <li v-for="item in checkList" :key="item.passport">{{item.name}}——{{item.departmentName}}<span v-if="allowDelFlag" @click="delCheck(item)">X</span></li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item required label="登录密码:">
          <div class="reset_pass_h">
            <div :class="['rph_handler', handlerType == 1 ? 'rph_gray' : '']" @click="handlerTab(2)">
              <div class="rph_bg">
                <span></span>
              </div>
            </div>
            <span>默认密码: 登录账号后6位</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetPass = false">取 消</el-button>
        <el-button type="primary" @click="passSub">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改部门 -->
    <el-dialog
      class="fix_pass"
      :close-on-click-modal="false"
      :title="fid30102.fieldName"
      :visible.sync="dialogSomeFrame"
    >
      <el-form ref="framesForm" :model="framesForm">
        <el-form-item required :label="fid30301.fieldName + ':'">
          <div class="users_stop">
            <ul>
              <li v-for="item in checkList" :key="item.passport">{{item.name}}——{{item.departmentName}}<span v-if="allowDelFlag" @click="delCheck(item)">X</span></li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item required :label="fid30302.fieldName + ':'">
          <el-select v-model="department" :placeholder="'请选择' + fid30207.fieldName" style="width:100%">
            <el-option v-for="item in studyList" :key="item.Pid" :label="item.Name" :value="item.Pid"></el-option>
          </el-select>
          <div class="tip_left" v-show="frameFlag">
            <div class="tip_msg">
              <img src="../../assets/images/x.png" alt="" />
              请选择{{fid30302.fieldName}}
            </div>
          </div>
        </el-form-item>
        <el-form-item required label="备注原因:">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入修改原因"
            v-model="framesForm.reason"
            maxlength="200"
            show-word-limit
          >
          </el-input>
          <div class="tip_left" v-show="reasonFlag">
            <div class="tip_msg">
              <img src="../../assets/images/x.png" alt="" />
              请输入修改原因
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSomeFrame = false">取 消</el-button>
        <el-button type="primary" @click="framesSub">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Url from "@/assets/js/url.js";
export default {
  name: "report",
  data() {
    return {
      power1: false,
      power2: false,
      power3: false,
      power4: false,
      power5: false,
      power6: false,
      power7: false,
      power8: false,
      power9: false,
      power10: false,
      limit: 10,
      total: 0,
      pageNum: 1,
      currentPage: 1,
      passForm: {
        newPass: "",
        twoPass: ""
      },
      newPassFlag: false,
      newRight1: false,
      newRight2: false,
      newRight3: false,
      twoPassFlag: false,
      formSearch: {
        name: "",
        department: "",
        passport: ""
      },
      department: '',
      departmentName: '',
      tableData: [],
      checkList: [],
      dialogSomeStop: false,
      dialogOnesStop: false,
      dialogSetPass: false,
      dialogSomeFrame: false,
      treeLabel: '',
      treeLabels: '',
      stopForm: {
        name: '',
        frameAuthNotice: ''
      },
      onesForm: {
        name: '',
        frameAuthNotice: ''
      },
      setpassForm: {
        name: '',
        frameAuthNotice: ''
      },
      framesForm: {
        name: '',
        frameAuthNotice: '',
        reason: ''
      },
      treeData: [],
      allowDelFlag: true,
      oneStopFlage: false,
      onesList: [],
      handlerType: 2,
      defaultProps: {
        children: "list",
        label: "Name"
      },
      frameFlag: false,
      reasonFlag: false,
      studyList: [],
      fid30101: {
        enable: 0,
        fieldId: 30101,
        fieldName: "新增用户",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 0
      },
      fid30102: {
        enable: 0,
        fieldId: 30102,
        fieldName: "修改部门",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 0
      },
      fid30301: {
        enable: 1,
        fieldId: 30301,
        fieldName: "已选用户",
        fieldType: "特殊字段",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 1
      },
      fid30302: {
        enable: 1,
        fieldId: 30302,
        fieldName: "修改部门",
        fieldType: "筛选框",
        ifDelete: 0,
        ifEnable: 1,
        ifModify: 1,
        ifRequired: 1,
        required: 1
      },
      fid30401: {
        enable: 1,
        fieldId: 30401,
        fieldName: "已选用户",
        fieldType: "特殊字段",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 1
      },
      fid30501: {
        enable: 1,
        fieldId: 30501,
        fieldName: "已选用户",
        fieldType: "特殊字段",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 1
      },
      // fid30205: {
      //   enable: 1,
      //   fieldId: 30205,
      //   fieldName: "手机号码",
      //   fieldType: "单行文本",
      //   ifDelete: 1,
      //   ifEnable: 0,
      //   ifModify: 1,
      //   ifRequired: 1,
      //   required: 0
      // },
      fid30201: {
        enable: 1,
        fieldId: 30201,
        fieldName: "登录手机号",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 0,
        ifRequired: 0,
        required: 1
      },
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
      }
    };
  },
  created() {

  },
  mounted() {
    this.fieldData()
    this.powerData()
    // this.getList(1);
    // this.getList(this.currentPage)
    this.addChange2();
  },
  methods: {
    fieldData () {
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
                if (datas[i].fieldId == 30101) {
                  this.fid30101 = datas[i]
                }
                if (datas[i].fieldId == 30102) {
                  this.fid30102 = datas[i]
                }
                if (datas[i].fieldId == 30301) {
                  this.fid30301 = datas[i]
                }
                if (datas[i].fieldId == 30302) {
                  this.fid30302 = datas[i]
                }
                if (datas[i].fieldId == 30401) {
                  this.fid30401 = datas[i]
                }
                if (datas[i].fieldId == 30501) {
                  this.fid30501 = datas[i]
                }
                // if (datas[i].fieldId == 30205) {
                //   this.fid30205 = datas[i]
                // }
                if (datas[i].fieldId == 30201) {
                  this.fid30201 = datas[i]
                }
                if (datas[i].fieldId == 30207) {
                  this.fid30207 = datas[i]
                }
              }
            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.data.msg);
        });
    },
    clearTree() {
      this.department = ''
      this.departmentName = ''
      this.$refs.addTree0.setCurrentKey(null);
    },
    clean() {
      this.department = ''
      this.departmentName = ''
      this.$refs.addTree0.setCurrentKey(null);
      this.treeLabel = null;
    },
    handleNodeClick(data, node) {
      this.treeLabel = node.label;
      this.department = data.Pid
      this.departmentName = data.Name
      this.$refs.addTree1.blur();
    },
    clearTrees() {
      this.formSearch.department = ''
      this.$refs.listUserTree0.setCurrentKey(null);
    },
    cleans() {
      this.formSearch.department = ''
      this.$refs.listUserTree0.setCurrentKey(null);
      this.treeLabels = null;
    },
    handleNodeClicks(data, node) {
      this.treeLabels = node.label;
      this.formSearch.department = data.Pid
      this.$refs.listUserTree1.blur();
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
              this.studyList = []
              this.recursiveFunction2(schoolOrg)
              this.studyList.sort((a, b) => {
                return Number(a.Pid) - Number(b.Pid);
              });
              this.treeData = schoolOrg;
              this.getList(that.currentPage)
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
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
    getStr2(data) {
      let that = this
      data.forEach(function(row) {
        if (row.list) {
          that.getStr2(row.list)
        }
        if (row.Mark == 1) {
          that.studyList.push({ Name: row.Name, Pid: row.Pid })
        }
      })
    },
    recursiveFunction2(data) {
      let that = this;
      that.getStr2(data)
    },
    indexMethod(index) {
      let that = this;
      return index + 1 + that.limit * (this.currentPage - 1);
    },
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power1 = power.includes(50201); // 用户管理--新增用户
      this.power2 = power.includes(50202); // 用户管理--导入
      this.power3 = power.includes(50203); // 用户管理--导出
      this.power4 = power.includes(50204); // 用户管理--修改部门
      this.power5 = power.includes(50205); // 用户管理--启用/停用
      this.power6 = power.includes(50206); // 用户管理--重置密码
      this.power7 = power.includes(50207); // 用户管理--编辑用户
      this.power8 = power.includes(50208); // 用户管理--删除
      this.power9 = power.includes(50209); // 用户管理--批量删除
      this.power10 = power.includes(50210); // 用户管理--批量启用/停用
    },
    // 导入
    batchUser() {
      this.$router.push({
        name: "batchuser"
      });
    },
    // 密码重置 -- 校验
    newChange(value) {
      var reg = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,20}$/;
      var reg1 = value.length >= 6 && value.length <= 20;
      // eslint-disable-next-line no-useless-escape
      var reg2 = /^[A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/.test(
        value
      );
      var reg3 = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{1,30}$/.test(
        value
      );
      if (!(reg1 && reg2 && reg3)) {
        if (!reg1) {
          this.newRight1 = false;
        } else {
          this.newRight1 = true;
        }
        if (!reg2) {
          this.newRight2 = false;
        } else {
          this.newRight2 = true;
        }
        if (!reg3) {
          this.newRight3 = false;
        } else {
          this.newRight3 = true;
        }
        this.newPassFlag = true;
        return false;
      } else {
        this.newRight1 = true;
        this.newRight2 = true;
        this.newRight3 = true;
        setTimeout(() => {
          this.newPassFlag = false;
        }, 100);
      }
    },
    newFcous(val) {
      this.newPassFlag = true;
      this.twoPassFlag = false;
    },
    newBlur(val) {
      var value = this.passForm.newPass;
      var reg1 = value.length >= 6 && value.length <= 20;
      // eslint-disable-next-line no-useless-escape
      var reg2 = /^[A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/.test(
        value
      );
      var reg3 = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{1,30}$/.test(
        value
      );
      if (reg1 && reg2 && reg3) {
        this.newPassFlag = false;
      }
      if (
        this.passForm.newPass != this.passForm.twoPass && this.passForm.twoPass != '' &&
        !this.newPassFlag
      ) {
        this.twoPassFlag = true;
      }
    },
    handlerTab(type) {
      this.newPassFlag = false
      if (type == 1) {

      }
      this.handlerType = type
    },

    // 共用的已选用户删除
    delCheck(data) {
      let newCheck = []
      for (let i in this.checkList) {
        if (this.checkList[i].id != data.id) {
          newCheck.push(this.checkList[i])
        }
      }
      this.checkList = newCheck
      this.$refs.accountTables.toggleRowSelection(data);
      if (this.checkList.length < 2) {
        this.allowDelFlag = false
      } else {
        this.allowDelFlag = true
      }
    },

    // 重置密码 -- 点击
    passStop() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要重置密码的用户!"
        });
        return false;
      }
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push(this.checkList[i]);
      }
      this.dialogSetPass = true
      if (this.checkList.length < 2) {
        this.allowDelFlag = false
      } else {
        this.allowDelFlag = true
      }
      this.oneStopFlage = false
    },
    // 重置密码 -- 提交
    passSub() {
      let that = this;
      this.newPassFlag = false;
      if (this.handlerType == 1) {
        if (that.passForm.newPass == '') {
          this.newPassFlag = true;
          return false
        }
        if (!(this.newRight1 && this.newRight2 && this.newRight3)) {
          this.newPassFlag = true;
          return false
        }
      } else {
        var checkArr = [];
        for (let i in this.checkList) {
          checkArr.push({ passport: this.checkList[i].passport });
        }
      }
      that.$http.put(Url + "/aimw/user/initUserPwd", checkArr).then(res => {
        var data = res.data;
        if (data.code == 0) {
          this.$message({
            type: "success",
            message: "密码初始化成功!"
          });
          this.dialogSetPass = false;
          this.getList(this.currentPage)
        } else {
          this.$message({
            type: "error",
            message: "密码初始化失败!"
          });
        }
      });
    },

    // 修改部门 -- 点击
    fixFrame() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要修改的用户!"
        });
        return false;
      }
      this.frameFlag = this.reasonFlag = false;
      this.addChange3();
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push(this.checkList[i]);
      }
      this.dialogSomeFrame = true
      if (this.checkList.length < 2) {
        this.allowDelFlag = false
      } else {
        this.allowDelFlag = true
      }
    },
    // 修改部门 -- 提交
    framesSub() {
      var that = this;
      this.frameFlag = this.reasonFlag = false;
      if (this.department == "") {
        this.frameFlag = true;
        return false;
      }
      if (this.framesForm.reason == "") {
        this.reasonFlag = true;
        return false;
      }
      let checkArr = []
      for (let i in this.checkList) {
        checkArr.push({ passport: this.checkList[i].passport });
      }
      for (let i in this.studyList) {
        if (this.studyList[i].Pid == this.department) {
          this.departmentName = this.studyList[i].Name
        }
      }
      var param = {};
      param = {
        department: this.department,
        departmentName: this.departmentName,
        reason: this.framesForm.reason,
        changeInfo: checkArr
      };
      that.$http
        .put(Url + "/aimw/user/changeDepartment", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogSomeFrame = false
            this.department = ""
            this.departmentName = ""
            this.framesForm.reason = ""
            this.getList(this.currentPage)
            this.$refs.accountTables.clearSelection();
            this.$message.success('更新成功！');
          } else {
            this.$message.error("更新失败");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    // 单个停用
    onesStop(data) {
      this.onesList = []
      this.onesList.push(data)
      this.dialogOnesStop = true
    },
    onesSub() {
      var that = this;
      var param = {};
      param = {
        passport: this.onesList[0].passport,
        accountState: this.onesList[0].accountState ? 0 : 1
      };
      that.$http
        .put(Url + "/aimw/user/updateUserState", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogOnesStop = false
            this.getList(this.currentPage)
            this.$message.success(this.onesList[0].accountState == 1 ? '已停用！' : '已启用！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 批量停用
    someStop() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要停用的用户!"
        });
        return false;
      }
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push(this.checkList[i]);
      }
      this.dialogSomeStop = true
      if (this.checkList.length < 2) {
        this.allowDelFlag = false
      } else {
        this.allowDelFlag = true
      }
      this.oneStopFlage = false
    },
    stopSub() {
      var that = this;
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push({ passport: this.checkList[i].passport });
      }
      that.$http
        .put(Url + "/aimw/user/stopUsersAccount", checkArr)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogSomeStop = false
            this.getList(this.currentPage)
            this.$refs.accountTables.clearSelection();
            this.$message.success('批量停用成功！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 导出用户
    someExport() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要导出的用户!"
        });
        return false;
      }
      this.download()
    },
    download() {
      const content = [...this.checkList];
      import("@/excel/Export2Excel").then(excel => {
        // const tHeader = ["姓名", "性别", this.fid30207.fieldName, this.fid30205.fieldName, "登录账号", "状态"];
        // const filterVal = ["name", "genderStr", "departmentName", "phone", "passport", "accountStateStr"];
        const tHeader = ["姓名", "性别", this.fid30207.fieldName, this.fid30201.fieldName, "状态"];
        const filterVal = ["name", "genderStr", "departmentName", "passport", "accountStateStr"];
        const content = this.checkList
        for (let i in content) {
          if (content[i].accountState == 1) {
            content[i].accountStateStr = "在用"
          } else if (content[i].accountState == 0) {
            content[i].accountStateStr = "停用"
          }
          if (content[i].gender == 1) {
            content[i].genderStr = "男"
          } else if (content[i].gender == 0) {
            content[i].genderStr = "女"
          }
        }
        const data = this.formatJson(filterVal, content);
        excel.export_json_to_excel(tHeader, data, "用户列表");
        setTimeout(() => {
          this.toggleSelection()
          this.$message.success('导出成功！');
        }, 100);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    toggleSelection() {
      this.$refs.accountTables.clearSelection();
    },
    // 批量删除
    someDelete() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要删除的用户!"
        });
        return false;
      }
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push({ passport: this.checkList[i].passport });
      }
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除所选用户？</p><p class="con_p2">删除后所选用户的报告也会删除，不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          this.$http
            .delete(Url + "/aimw/user/deleteUsers", {
              data: checkArr
            })
            .then(res => {
              var data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList(this.currentPage)
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {

        });
    },
    // 单个删除
    singleDelete(row) {
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除当前用户？</p><p class="con_p2">删除后该用户的报告也会删除，不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          var checkArr = [{ passport: row.passport }]
          this.$http
            .delete(Url + "/aimw/user/deleteUsers", {
              data: checkArr
            })
            .then(res => {
              var data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList(this.currentPage)
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {

        });
    },
    // 编辑用户
    toDetail(data) {
      localStorage.setItem("teachDetail", JSON.stringify(data));
      this.$router.push({
        name: "detailuser",
        params: { userID: data.passport }
      });
    },
    // 新增用户
    addUser() {
      this.$router.push({
        name: "adduser"
      });
    },
    // 用户管理列表
    getList(page) {
      let that = this;
      that.currentPage = page
      let frameArr = []
      if (that.formSearch.department == '') {
        for (let i in this.studyList) {
          frameArr.push(this.studyList[i].Pid)
        }
      } else {
        frameArr = this.formSearch.department
      }
      var param = {
        currentPage: page,
        pageSize: that.limit,
        name: that.formSearch.name,
        departments: frameArr,
        passport: that.formSearch.passport
      };
      this.$http
        .get(Url + "/aimw/user/listUsersInfo", {
          params: param
        })
        .then(res => {
          let data = res.data.data;
          if (res.data.code == 0) {
            if (data) {
              for (let i in data.results) {
                if (data.results[i].accountState == 1) {
                  data.results[i].accountState = true;
                } else {
                  data.results[i].accountState = false;
                }
              }
              that.tableData = data.results;
              that.total = data.count;
              that.pageNum = data.count == 0 ? 1 : Math.ceil(data.count / that.limit)
            } else {
              that.tableData = [];
              that.total = 0;
              that.pageNum = 1
            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.data.msg);
        });
    },
    // 列表查询
    onSubmit() {
      this.getList(1);
    },
    // 列表重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList(1);
    },
    // table 复选框
    handleSelectionChange(val) {
      this.checkList = val;
    },
    sortChange(e) {

    },
    // table 分页
    handleSizeChange(val) {
      this.limit = val
      this.getList(1)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList(val)
    }
  }
};
</script>

<style lang="less">
.accout_wrap {
  text-align: left;
  margin: 0 0.22rem;
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
          .el-input {
            font-size: 0.16rem;
            .el-input__icon {
              width: 0.25rem;
              line-height: 0.36rem;
              font-size: 0.16rem;
            }
            .el-input__inner {
              width: 2.1rem;
              border: 0.01rem solid #dcdfe6;
              height: 0.36rem;
              line-height: 0.36rem;
              padding: 0 0.1rem;
            }
          }
          .el-select {
            width: 100%;
          }
        }
      }
      .el-form-item:first-child {
        margin-left: 0.22rem;
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
  }
  // 表格
  .tables_box {
    margin: 0.2rem 0;
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 0.04rem;
    padding: 0.2rem 0.24rem;
    position: relative;
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
        .naturalize{
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 0.08rem;
            height: 0.08rem;
            margin-right: 0.04rem;
          }
        }
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
      }
      .el-table__header,
      .el-table__body {
        col:nth-child(1) {
          width: 0.48rem;
        }
        col:nth-child(2) {
          width: 0.8rem;
        }
        col:nth-child(3) {
          width: 1.2rem;
        }
        col:nth-child(4) {
          width: 0.8rem;
        }
        col:nth-child(6) {
          width: 1.2rem;
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
  }
}
</style>
