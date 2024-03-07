<template>
  <div class="frame_work_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>组织架构</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="tables_box">
      <div
        :class="['pass_init', { pass_act: passInitAfter }]"
        v-show="passInit"
      >
        <img class="pass_icon" src="../../assets/images/index_top.png" alt="" />
        <div class="pass_txt">
          <p>密码初始化成功！</p>
          <p>初始密码为：<span>登录账号后6位</span></p>
        </div>
        <img class="pass_close" src="../../assets/images/yonghu.png" alt="" />
      </div>
      <div class="search_title center_o_title">
        列表
      </div>
      <div class="class_main">
        <div class="class_tree">
          <div :class="['tree_box mar00']">
            <el-tree
              v-if="reloadTree"
              :data="treeData"
              :indent="12"
              default-expand-all
              :default-expanded-keys="expandsList"
              :default-checked-keys="checksList"
              node-key="Pid"
              ref="tree"
              :props="defaultProps"
              @check="handleCheckChange"
              :render-content="renderContent"
            >
            </el-tree>
          </div>
        </div>
        <div class="class_student">
          <div class="class_list">
            <div class="el_btn_box">
              <div class="el_btn_right">
                <div class="el_one" v-if="power1">
                  <el-button
                    class="el_btn_one"
                    @click="classAdds"
                    type="primary"
                  >
                    <i class="iconfont icon-jiahao"></i>
                    {{ fid20101.fieldName }}
                  </el-button>
                </div>
                <div class="el_tip" @click="helpTips">
                  <img src="../../assets/images/what_icon.jpg" alt="" />
                  帮助提示
                </div>
              </div>
            </div>
            <div class="no_data" v-if="expandsList.length == 0">
              <div class="no_b">
                <img src="../../assets/images/nothing.png" alt="" />
                <p>暂无数据～</p>
              </div>
            </div>
            <template v-else>
              <el-table
                border
                :data="tableData"
                style="width: 100%"
                @sort-change="sortChange"
                @selection-change="checkboxChange"
              >
                <el-table-column type="index" label="序号" :index="indexMethod">
                </el-table-column>
                <el-table-column
                  prop="departmentName"
                  :label="fid20102.fieldName"
                >
                </el-table-column>
                <el-table-column prop="userNum" :label="fid20103.fieldName">
                </el-table-column>
                <el-table-column
                  prop="departmentInfo"
                  :label="fid20104.fieldName"
                >
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="更新时间"
                ></el-table-column>
                <el-table-column prop="status" label="启用">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.status"
                      @change="statusChange(scope.row)"
                      :disabled="!power2"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span v-if="!power3 && !power4">暂无权限</span>
                    <el-button
                      @click="classEdits(scope.row)"
                      type="text"
                      size="small"
                      v-if="power3"
                      >编辑</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      v-if="power4"
                      @click="singleDelete(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
      <div class="table_page" v-if="tableData.length > 0">
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
    <!-- 添加部门 -->
    <el-dialog
      class="fix_pass add_frame"
      :close-on-click-modal="false"
      :title="fid20201.fieldName"
      :visible.sync="dialogAddFrame"
    >
      <el-form ref="frameForm" :model="frameForm">
        <el-form-item required :label="fid20203.fieldName + ':'">
          <el-select
            :value="treeLabel"
            style="width:100%"
            @clear="clean"
            :placeholder="'请选择' + fid20203.fieldName"
            ref="addTree1"
            @click="clearTree"
          >
            <el-option
              :value="treeLabel"
              :label="treeLabel"
              class="tree_select"
            >
              <el-tree
                ref="addTree0"
                :data="treeData2"
                :indent="12"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                :expand-on-click-node="false"
                node-key="Pid"
                :props="defaultProps"
                :render-content="renderContent2"
              >
              </el-tree>
            </el-option>
          </el-select>
          <div class="tip_left" v-show="frameFlag">
            <div class="tip_msg">
              <img src="../../assets/images/x.png" alt="" />
              请选择{{ fid20203.fieldName }}
            </div>
          </div>
        </el-form-item>
        <el-form-item required :label="fid20102.fieldName + ':'">
          <el-input
            v-model="frameForm.name"
            :placeholder="'请输入' + fid20102.fieldName"
          ></el-input>
          <div class="tip_left" v-show="addNameOne">
            <div class="tip_msg" style="width:2rem">
              <img src="../../assets/images/x.png" alt="" />
              请输入{{ fid20102.fieldName }}
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="fid20104.fieldName + ':'">
          <el-input
            type="textarea"
            :rows="3"
            :placeholder="'请输入' + fid20104.fieldName"
            v-model="frameForm.frameAuthNotice"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFrame = false">取 消</el-button>
        <el-button type="primary" @click="addFrameSub">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑部门 -->
    <el-dialog
      class="fix_pass add_frame"
      :close-on-click-modal="false"
      :title="fid20202.fieldName"
      :visible.sync="dialogEditFrame"
    >
      <el-form ref="frameForm" :model="frameForm">
        <el-form-item required :label="fid20102.fieldName + ':'">
          <el-input
            v-model="frameForm.name"
            :placeholder="'请输入' + fid20102.fieldName"
          ></el-input>
          <div class="tip_left" v-show="addNameOne">
            <div class="tip_msg" style="width:2rem">
              <img src="../../assets/images/x.png" alt="" />
              请输入{{ fid20102.fieldName }}
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="fid20104.fieldName + ':'">
          <el-input
            type="textarea"
            :rows="3"
            :placeholder="'请输入' + fid20104.fieldName"
            v-model="frameForm.frameAuthNotice"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFrame = false">取 消</el-button>
        <el-button type="primary" @click="editFrameSub">确 定</el-button>
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
      reloadTree: true,
      power1: false,
      power2: false,
      power3: false,
      power4: false,
      treeLabel: "",
      dialogAddFrame: false,
      dialogEditFrame: false,
      frameFlag: false,
      addNameOne: false,
      dialogAddRole: false,
      frameForm: {
        department: "",
        name: "",
        frameAuthNotice: ""
      },

      yearSet: 0,
      yearDetail: {},
      expandsList: [],
      checksList: [],
      yearFlag: false,
      dialogRecovery: false,
      singleFlag: false,
      addClassOne: false,
      addLessonOne: false,
      addSortOne: false,
      addNumberOne: false,
      dialogAddClass: false,
      yearForm: {
        startTime: "",
        endTime: "",
        firstStartTime: "",
        firstEndTime: "",
        secondStartTime: "",
        secondEndTime: ""
      },
      addClassForm: {
        level: "",
        grade: "",
        classNew: "",
        mark: "",
        sort: "",
        number: ""
      },
      classAdd: [
        {
          name: "单个新增",
          active: false
        },
        {
          name: "批量新增",
          active: false
        }
      ],
      list: [],
      defaultProps: {
        children: "list",
        label: "Name"
      },
      treeData: [],
      treeData2: [],
      dialogFixPass: false,
      passInit: false,
      passInitAfter: false,
      tabActive: 1,
      limit: 10,
      limit1: 10,
      total: 0,
      total1: 0,
      pageNum: 1,
      pageNum1: 1,
      currentPage: 1,
      currentPage1: 1,
      passForm: {
        passport: "",
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
        passport: ""
      },
      classIds: [],
      tableData: [],
      checkList: [],
      recoveryData: [],
      checkListRe: [],
      levelList: [],
      gradeList: [],
      classList: [],
      coveryForm: {
        level: "",
        grade: "",
        class: ""
      },
      levelList1: [],
      gradeList1: [],
      classList1: [],
      framePid: "",
      fid20101: {
        enable: 0,
        fieldId: 20101,
        fieldName: "新增部门",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 0
      },
      fid20102: {
        enable: 0,
        fieldId: 20102,
        fieldName: "部门名称",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 0
      },
      fid20103: {
        enable: 0,
        fieldId: 20103,
        fieldName: "用户数量",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 0
      },
      fid20104: {
        enable: 0,
        fieldId: 20104,
        fieldName: "部门描述",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 0
      },
      fid20201: {
        enable: 1,
        fieldId: 20201,
        fieldName: "新增部门",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 1
      },
      fid20202: {
        enable: 1,
        fieldId: 20202,
        fieldName: "编辑部门",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 1
      },
      fid20203: {
        enable: 1,
        fieldId: 20203,
        fieldName: "上级部门",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 1
      }
    };
  },
  created() {},
  mounted() {
    let that = this;
    this.fieldData();
    this.authType = localStorage.getItem("userType");
    this.powerData();
    // 获取左侧班级树
    this.addChange1();
  },
  methods: {
    fieldData() {
      let that = this;
      var param = {
        fieldId: 20000
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
                if (datas[i].fieldId == 20101) {
                  this.fid20101 = datas[i];
                }
                if (datas[i].fieldId == 20102) {
                  this.fid20102 = datas[i];
                }
                if (datas[i].fieldId == 20103) {
                  this.fid20103 = datas[i];
                }
                if (datas[i].fieldId == 20104) {
                  this.fid20104 = datas[i];
                }
                if (datas[i].fieldId == 20201) {
                  this.fid20201 = datas[i];
                }
                if (datas[i].fieldId == 20202) {
                  this.fid20202 = datas[i];
                }
                if (datas[i].fieldId == 20203) {
                  this.fid20203 = datas[i];
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
    clearTree() {
      this.framePid = "";
      this.frameForm.name = "";
      this.$refs.addTree0.setCurrentKey(null);
    },
    clean() {
      this.framePid = "";
      this.frameForm.name = "";
      this.$refs.addTree0.setCurrentKey(null);
      this.treeLabel = "";
    },
    indexMethod(index) {
      let that = this;
      return index + 1 + that.limit * (this.currentPage - 1);
    },
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power1 = power.includes(50101); // 组织架构--新增部门
      this.power2 = power.includes(50102); // 组织架构--启用、停用部门
      this.power3 = power.includes(50103); // 组织架构--编辑
      this.power4 = power.includes(50104); // 组织架构--删除
    },
    addFrameSub() {
      var that = this;
      this.addNameOne = this.frameFlag = false;
      if (this.treeLabel == "") {
        this.frameFlag = true;
        return false;
      }
      if (this.frameForm.name == "") {
        this.addNameOne = true;
        return false;
      }
      var param = {};
      param = {
        department: that.framePid,
        departmentName: that.frameForm.name,
        departmentInfo: that.frameForm.frameAuthNotice
      };
      that.$http
        .post(Url + "/aimw/organization/addDepartment", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.addChange1();
            this.$message.success(this.fid20201.fieldName + "成功！");
            this.dialogAddFrame = false;
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    editFrameSub() {
      var that = this;
      this.addNameOne = false;
      if (this.frameForm.name == "") {
        this.addNameOne = true;
        return false;
      }
      var param = {};
      param = {
        department: that.framePid,
        departmentName: that.frameForm.name,
        departmentInfo: that.frameForm.frameAuthNotice
      };
      that.$http
        .put(Url + "/aimw/organization/updateDepartmentInfo", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.addChange1();
            this.$message.success("更新成功！");
            this.dialogEditFrame = false;
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 渲染树
    renderContent(h, { node, data, store }) {
      if (data.list && data.list.length > 0) {
        if (data.Mark == 1) {
          return (
            <span class="custom-tree-node">
              <i class="iconfont icon-wenjian"></i>
              <span style="color:#354b70">{node.label}</span>
            </span>
          );
        } else {
          return (
            <span class="custom-tree-node">
              <i class="iconfont icon-wenjian"></i>
              <span style="color:#999">{node.label}</span>
            </span>
          );
        }
      } else {
        if (data.Mark == 1) {
          return (
            <span class="custom-tree-node">
              <span style="color:#354b70">{node.label}</span>
            </span>
          );
        } else {
          return (
            <span class="custom-tree-node">
              <span style="color:#999">{node.label}</span>
            </span>
          );
        }
      }
    },
    statusChange(row) {
      var that = this;
      var param = {};
      param = {
        department: row.department,
        status: row.status ? 1 : 0
      };
      that.$http
        .put(Url + "/aimw/organization/updateDepartmentStatus", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogAddFrame = false;
            this.$message.success(param.status == 1 ? "已启用！" : "已停用！");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getStr2(data) {
      let that = this;
      data.forEach(function(row) {
        if (row.list) {
          row.list1 = row.list;
          that.getStr2(row.list);
        }
      });
    },
    recursiveFunction2(data) {
      let that = this;
      that.getStr2(data);
    },
    handleNodeClick(data, node) {
      if (data.Mark == 0) {
        return false;
      }
      let len1 = 0;
      let pidStr = "";
      let cont = 0;
      let total = -1;
      if (data.list1 && data.list1.length > 0) {
        len1 = data.list1.length - 1;
        pidStr = String(data.list1[len1].Pid);
        let num = pidStr.length;
        for (let i = num; i >= 0; i--) {
          let s = pidStr.substring(i - 1, i);
          total++;
          if (s > 0) {
            cont = i;
            break;
          }
        }
        let pidNo0 = Number(Number(pidStr.substring(0, cont)) + 1);
        let newPid = pidNo0 * Math.pow(10, total);
        this.framePid = newPid;
      } else {
        len1 = 0;
        pidStr = String(data.Pid);
        let num = pidStr.length;
        for (let i = num; i >= 0; i--) {
          let s = pidStr.substring(i - 1, i);
          total++;
          if (s > 0) {
            cont = i;
            break;
          }
        }
        let pidNo0 = Number(
          Number(pidStr.substring(0, cont)) * Math.pow(10, 2) + 1
        );
        let newPid = pidNo0 * Math.pow(10, total - 2);
        this.framePid = newPid;
      }
      this.treeLabel = node.label;
      this.$refs.addTree1.blur();
    },
    filter(data) {
      var newData = data.filter(x => x.Pid % 100 == 0);
      newData.forEach(x => x.list && (x.list = this.filter(x.list)));
      return newData;
    },
    // 获取左侧班级树
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
              this.recursiveFunction2(schoolOrg);
              this.filter(schoolOrg);
              this.treeData2 = schoolOrg;
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 渲染树
    renderContent2(h, { node, data, store }) {
      if (data.list && data.list.length > 0) {
        if (data.Mark == 1) {
          return (
            <span class="custom-tree-node">
              <i class="iconfont icon-wenjian"></i>
              <span>{node.label}</span>
            </span>
          );
        } else {
          return (
            <span class="custom-tree-node">
              <i style="color:#999" class="iconfont icon-wenjian"></i>
              <span style="color:#999">{node.label}</span>
            </span>
          );
        }
      } else {
        if (data.Mark == 1) {
          return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
            </span>
          );
        } else {
          return (
            <span class="custom-tree-node">
              <span style="color:#999">{node.label}</span>
            </span>
          );
        }
      }
    },
    // 选择班级
    handleCheckChange(data, checked, indeterminate) {
      this.checksList = checked.checkedKeys;
      this.getClass(1);
    },
    sortChange(e) {},
    handleSizeChange(val) {
      this.limit = val;
      this.getClass(1);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getClass(val);
    },
    helpTips() {
      this.$confirm(
        '<div class="confirm_box confirm_box1"><p><span>企业组织架构非常重要，部分管理功能以及数据权限是依赖于企业组织架构的，因此建议在正式使用产品前进行相关配置。</span></p><p class="p2"><span>部门组织架构支持多级、最多支持5级，点击左侧层级列表可切换至查看对应部分的子级部门。</span></p><p class="p3"><span>需要删除部门时必须先清除该部分下的所有成员。</span></p></div>',
        "帮助提示",
        {
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
          confirmButtonText: "关闭"
        }
      )
        .then(() => {})
        .catch(() => {});
    },
    // 新增班级
    classAdds() {
      this.treeLabel = "";
      this.frameForm = {
        name: "",
        frameAuthNotice: ""
      };
      this.addChange2();
      this.dialogAddFrame = true;
    },
    // 新增班级
    classEdits(row) {
      this.framePid = row.department;
      this.frameForm = {
        name: row.departmentName,
        frameAuthNotice: row.departmentInfo
      };
      this.dialogEditFrame = true;
    },
    // 密码修改 -- 弹窗
    fixPass(passport) {
      this.passForm = {
        passport: passport,
        newPass: "",
        twoPass: ""
      };
      this.newRight1 = this.newRight2 = this.newRight3 = this.newPassFlag = this.twoPassFlag = false;
      this.twoPassFlag = false;
      this.dialogFixPass = true;
    },
    // 单个删除
    singleDelete(row) {
      let that = this;
      if (row.userNum == 0) {
        this.$confirm(
          '<div class="confirm_box"><p>是否确定删除该部门？</p><p class="con_p2">仅当成员数量为0时才能执行删除操作，删除后将不可恢复</p></div>',
          "提示",
          {
            dangerouslyUseHTMLString: true,
            cancelButtonText: "取消",
            confirmButtonText: "确定"
          }
        )
          .then(() => {
            this.$http
              .post(Url + "/aimw/organization/deleteDepartment", {
                department: row.department
              })
              .then(res => {
                var data = res.data;
                if (data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.addChange1();
                } else {
                  this.$message.error(data.msg);
                }
              });
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        this.$confirm(
          '<div class="confirm_box"><p>部门无法删除</p><p class="con_p2">部门有成员时无法删除</p></div>',
          "提示",
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: "知道了"
          }
        )
          .then(() => {})
          .catch(() => {});
      }
    },
    // 选择要操作的学生数据
    checkboxChange(val) {
      this.checkList = val;
    },
    // 获取组织信息列表
    getClass(page) {
      let that = this;
      let classArr = [];
      for (let i in this.checksList) {
        classArr.push(this.checksList[i]);
      }
      this.classIds = classArr;
      var param = {
        currentPage: page,
        pageSize: that.limit,
        departmentIds: that.expandsList
      };
      that.currentPage = page;
      that.$http
        .get(Url + "/aimw/organization/listDepartmentsInfo", {
          params: param
        })
        .then(res => {
          let data = res.data.data;
          if (res.data.code == 0) {
            if (data) {
              if (data.results) {
                for (let i in data.results) {
                  if (data.results[i].status == 1) {
                    data.results[i].status = true;
                  } else {
                    data.results[i].status = false;
                  }
                }
                that.tableData = data.results;
                that.total = data.count;
                that.pageNum =
                  data.count == 0 ? 1 : Math.ceil(data.count / that.limit);
              } else {
                that.tableData = [];
                that.total = 0;
                that.pageNum = 1;
              }
            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getStr(data) {
      let that = this;
      data.forEach(function(row) {
        if (row.list) {
          that.getStr(row.list);
        }
        if (row.Mark == 1) {
          that.expandsList.push(row.Pid);
          that.checksList.push(row.Pid);
        }
      });
    },
    recursiveFunction(data) {
      let that = this;
      that.getStr(data);
    },
    // 获取左侧班级树
    addChange1() {
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
              that.checksList = [];
              that.expandsList = [];
              this.recursiveFunction(schoolOrg);
              this.treeData = schoolOrg;
              this.reloadTree = false;
              setTimeout(() => {
                this.reloadTree = true;
              }, 100);
              this.getClass(that.currentPage);
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style lang="less">
.frame_work_wrap {
  text-align: left;
  margin: 0 0.22rem;
  // 公共页面顶部标题
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
  .center_o_title {
    padding-bottom: 0.26rem;
    border-bottom: 0.01rem solid #e1e9ff;
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
    // 密码初始化提示框
    .pass_init {
      transition: width 0.4s ease-out, opacity 0.4s ease-in,
        visibility 0.4s ease-in;
      opacity: 0;
      visibility: 0;
      width: 0;
      height: 0.66rem;
      display: flex;
      position: absolute;
      right: 0.24rem;
      top: 0.24rem;
      background: #effeff;
      border: 1px solid;
      border-image: linear-gradient(185deg, #00eafe, #00b6f0) 1 1;
      box-shadow: 0px 3px 12px 0px rgba(155, 183, 161, 0.1);
      .pass_txt {
        margin-top: 0.12rem;
        p {
          font-size: 0.14rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #354b70;
          span {
            font-family: SourceHanSansCN-Regular;
            color: #006cff;
          }
        }
      }
      .pass_icon {
        width: 0.14rem;
        height: 0.14rem;
        margin: 0.16rem 0.04rem 0 0.08rem;
      }
      .pass_close {
        position: absolute;
        top: 0.12rem;
        right: 0.12rem;
        width: 0.1rem;
        height: 0.1rem;
      }
    }
    .pass_act {
      width: 3.16rem !important;
      opacity: 1 !important;
      visibility: 1 !important;
    }
    .el-switch__core {
      border-color: #ffffff;
      background: linear-gradient(-90deg, #d4e7ff 0%, #8fb1d7 100%);
    }
    .el-switch.is-checked .el-switch__core {
      background: linear-gradient(-90deg, #00b6f0, #00eafe);
    }
    // 表格上面的操作按钮
    .el_btn_box {
      margin: 0.18rem 0 0;
      padding-bottom: 0.18rem;
      margin-left: 0.16rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid #e1e9ff;
      .el_btn_left {
        height: 0.24rem;
        line-height: 0.24rem;
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #7786ac;
        display: flex;
        align-items: center;
        .shu_line {
          display: block;
          width: 0.03rem;
          height: 0.2rem;
          background: linear-gradient(1deg, #2ebeff, #4091fd);
        }
        .shu_year {
          display: block;
          margin: 0 0.08rem;
        }
        img {
          width: 0.18rem;
          height: 0.18rem;
        }
      }
      .el_btn_right {
        display: flex;
        .el_one,
        .el_two {
          margin-left: 0.18rem;
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
    }
    .class_main {
      min-height: 6.76rem;
      padding: 0;
      margin: 0 0 0 0.16rem;
      padding-left: 2.62rem;
      position: relative;
      .class_tree {
        margin-top: 0.24rem;
        width: 2.46rem;
        margin-right: 0.16rem;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        overflow-x: auto;
        .tree_box {
          width: 100%;
          position: absolute;
          margin: auto;
          left: 0;
          top: 0;
          bottom: 0;
          overflow: hidden;
          overflow-y: auto;
          border: 1px solid #e1e9ff;
          margin: 0.46rem 0 0;
          background: linear-gradient(
            0deg,
            rgba(196, 236, 255, 0.14) 0%,
            rgba(151, 205, 255, 0.14) 100%
          );
          border-radius: 0.04rem;
          padding: 0.1rem 0;
          .el-tree {
            background: transparent;
          }
          .is-leaf {
            width: 0;
          }
          .custom-tree-node {
            img {
              width: 0.14rem;
              height: 0.12rem;
            }
          }
          .el-tree-node {
            white-space: nowrap;
            outline: 0;
            display: table;
            padding: 0 0.01rem;
          }
          .el-tree-node__content {
            height: 0.36rem;
            .el-checkbox__inner::after {
              width: 3px !important;
              height: 7px !important;
            }
          }
          .el-tree-node__content>.el-tree-node__expand-icon{
            padding: 0.04rem;
          }
          // .el-tree-node .el-tree-node__content{
          //   padding-left: 0.18rem !important;
          // }
        }
        .mar00 {
          margin: 0 0;
          overflow: auto;
        }
        .el_two {
          position: absolute;
          top: 0;
          left: 0;
          margin-right: 0.18rem;
          width: 100%;
          height: 0.36rem;
          padding: 1px;
          background: linear-gradient(263deg, #00c2ff, #0075ff);
          border-radius: 0.04rem;
          overflow: hidden;
          .el_two_s {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 0.04rem;
          }
          .el_btn_one,
          .el_btn_two {
            border: 0;
            font-size: 0.16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            border-radius: 0.04rem;
            padding: 0;
            width: 100%;
            height: 100%;
            span {
              display: flex;
              justify-content: flex-start;
              padding: 0 0.13rem;
              align-items: center;
              img {
                width: 0.14rem;
                height: 0.14rem;
                margin: 0 0.04rem;
              }
            }
          }
          .el_btn_two {
            background: linear-gradient(
              0deg,
              rgba(196, 236, 255, 0.14) 0%,
              rgba(151, 205, 255, 0.14) 100%
            );
            border-radius: 0.03rem;
            color: #006cff;
            img {
              width: 0.18rem;
              height: 0.16rem;
            }
          }
        }
      }
      .class_student {
        border-left: 0.01rem solid #e1e9ff;
        .no_data {
          width: 100%;
          height: 6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .no_b {
            text-align: center;
            img {
              width: 2.33rem;
              height: 1.72rem;
            }
            p {
              margin-top: 0.4rem;
              font-size: 0.16rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #7786ac;
            }
          }
        }
        .class_list {
          padding: 0.16rem 0 0 0.16rem;
          // 表格上面的操作按钮
          .el_btn_box {
            margin: 0;
            padding-bottom: 0.18rem;
            margin-left: 0.16rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            border-bottom: 0;
            .el_btn_left {
              height: 0.24rem;
              line-height: 0.24rem;
              font-size: 0.18rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #7786ac;
              display: flex;
              align-items: center;
              .shu_line {
                display: block;
                width: 0.03rem;
                height: 0.2rem;
                background: linear-gradient(1deg, #2ebeff, #4091fd);
              }
              .shu_year {
                display: block;
                margin: 0 0.08rem;
              }
              img {
                width: 0.29rem;
                height: 0.22rem;
              }
            }
            .el_btn_right {
              display: flex;
              .el_one,
              .el_two {
                margin-left: 0.18rem;
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
              .el_tip {
                display: flex;
                align-items: center;
                font-size: 0.16rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #006cff;
                line-height: 1;
                padding-left: 0.18rem;
                img {
                  width: 0.18rem;
                  margin-right: 0.06rem;
                }
              }
            }
          }
        }
      }
    }
    //性别样式
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
      margin-bottom: 0.2rem;
      min-height: 6.08rem;
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
      .el-table-column--selection .cell {
        padding: 0;
      }
      .el-table__header,
      .el-table__body {
        col:nth-child(1) {
          width: 0.48rem;
        }
        col:nth-child(3) {
          width: 1rem;
        }
        col:nth-child(5) {
          width: 1.6rem;
        }
        col:nth-child(6) {
          width: 1rem;
        }
        col:nth-child(7) {
          width: 1.8rem;
        }
        col:nth-child(8) {
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
      margin-bottom: 0;
      margin-top: 0.18rem;
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
          height: 0.28rem;
          line-height: 0.28rem;
          color: #7786ac;
          font-size: 0.14rem;
        }
        .el-input--mini .el-input__icon {
          height: 0.28rem;
          line-height: 0.28rem;
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
            line-height: 0.28rem;
            height: 0.28rem;
          }
        }
      }
    }
  }
  //修改密码
  .fix_pass {
    display: flex;
    justify-content: center;
    align-items: center;
    // 左三角
    .tip_left  {
      width: 100% !important;
      position: relative;
      margin-top: 0.1rem;
      padding: 0.05rem 0.1rem;
      font-size: 0.14rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #7786ac;
      min-height: 0.34rem;
      line-height: 0.24rem;
      border: 0.01rem solid #e1e9ff;
      background-color: #fff;
      border-radius: 5px;
      -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    }

    .tip_left::before,
      .tip_left::after  {
      content: "";
      display: block;
      border-width: 0.06rem;
      position: absolute;
      left: 0.12rem;
      top: -0.13rem;
      border-style: dashed solid solid dashed;
      border-color: transparent transparent #e1e9ff transparent;
      font-size: 0;
      line-height: 0;
    }

    .tip_left::after  {
      top: -0.11rem;
      border-color: transparent transparent #fff transparent;
    }
    .tip_msg {
      display: flex;
      align-items: center;
      width: 100% !important;
      font-size: 0.14rem;
      img {
        display: block;
        margin-right: 0.06rem;
      }
    }
    .el-dialog {
      width: 5.4rem;
      overflow: hidden;
      height: auto;
      margin: 0 auto !important;
      .el-dialog__header {
        padding: 0.14rem 0.2rem;
        background: linear-gradient(-90deg, #4196ff, #005acb);
        .el-dialog__title {
          display: block;
          line-height: 1;
          color: #ffffff;
          font-size: 0.18rem;
        }
        .el-dialog__headerbtn {
          top: 0.14rem;
          .el-icon-close {
            color: #ffffff;
          }
        }
      }
      .el-dialog__body {
        padding: 0.28rem 0.3rem 0.05rem 0.01rem;
        .el-form {
          .el-form-item {
            display: flex;
            margin-bottom: 0.18rem;
            .el-form-item__label {
              font-size: 0.16rem;
              line-height: 0.36rem;
              padding: 0;
              margin-right: 0.1rem;
              width: 0.98rem;
            }
            .el-form-item__content {
              flex: 1;
              line-height: 0.36rem;
              .el-input {
                font-size: 0.16rem;
                .el-input__inner {
                  height: 0.36rem;
                  line-height: 0.36rem;
                  padding: 0 0.15rem;
                }
              }
            }
            .el-input__icon {
              line-height: 0.36rem;
            }
          }
        }
      }
      .el-dialog__footer {
        padding: 0.05rem 0.15rem 0;
        width: 2.94rem;
        margin: 0 auto 0.24rem;
        .el-button {
          width: 1.12rem !important;
          height: 0.36rem !important;
          color: #ffffff !important;
          font-size: 0.16rem !important;
          padding: 0;
          margin-left: 0.4rem;
          background: linear-gradient(261deg, #8fb1d7, #b8d5f5);
          box-shadow: 0px 4px 20px 0px rgba(171, 196, 227, 0.45);
          border: 0;
        }
        .el-button--primary {
          background: linear-gradient(263deg, #00c2ff, #0075ff);
          box-shadow: 0px 6px 36px 0px rgba(62, 150, 253, 0.19);
          border: none;
          margin-left: 0rem;
          float: left;
        }
      }
    }
  }
  .look_group {
    .group_box {
      margin-top: 0.28rem;
      margin-bottom: 0rem;
      .el-table {
        height: 3.2rem;
        min-height: 4.64rem;
        overflow: hidden;
        overflow-y: auto;
      }
      .el_btn_box {
        justify-content: flex-start !important;
        align-items: center;
        .address-select-list {
          margin-right: 0.15rem;
          .el-select {
            .el-input__inner {
              height: 0.36rem;
              line-height: 0.36rem;
              font-size: 0.16rem;
            }
            .el-input__icon {
              line-height: 0.36rem;
            }
          }
        }
      }
      .el-transfer {
        font-size: 0.16rem;
        width: 100%;
        display: flex !important;
        align-items: center;
        justify-content: space-between;
        .el-transfer-panel {
          width: 3.09rem;
          border: 0.01rem solid #e1e9ff;
          background: linear-gradient(
            0deg,
            rgba(196, 236, 255, 0.14) 0%,
            rgba(151, 205, 255, 0.14) 100%
          );
          .el-transfer-panel__header {
            background: linear-gradient(263deg, #babfff, #7279ff);
            .el-checkbox__label {
              padding-left: 0.06rem !important;
            }
            .el-checkbox {
              line-height: 0.36rem;
              font-size: 0.16rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              .el-checkbox__label {
                font-size: 0.16rem !important;
                color: #ffffff !important;
                span {
                  color: #ffffff;
                }
              }
              .el-checkbox__input.is-focus .el-checkbox__inner {
                border-color: transparent !important;
              }
            }
          }
          .el-transfer-panel__body {
            .el-checkbox__label {
              padding-left: 0.24rem !important;
            }
          }
        }
        .el-transfer__buttons {
          padding: 0 0.14rem;
          width: 1.44rem;
          .el-transfer__button:first-child {
            margin-bottom: 0.16rem;
          }
          .el-transfer__button {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.16rem;
            height: 0.36rem;
            line-height: 0.36rem;
            border-radius: 0.02rem;
            overflow: hidden;
            background: #ffffff;
            font-size: 0.16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #006cff;

            span {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              border: 0.01rem solid;
              border-image: linear-gradient(45deg, #0075ff, #00c2ff) 1 1;
              background: linear-gradient(
                0deg,
                rgba(196, 236, 255, 0.14) 0%,
                rgba(151, 205, 255, 0.14) 100%
              );
              span {
                display: inline-block;
                background: transparent;
                border: 0;
                width: auto;
                height: auto;
                margin: 0 0.02rem;
                font-size: 0.16rem;
              }
              .el-icon-arrow-left::before {
                content: "\E6EA";
              }
              .el-icon-arrow-right::before {
                content: "\E6E9";
              }
            }
          }
        }
      }
    }
    .el-dialog {
      width: 11.2rem;
      .el_btn_box {
        justify-content: flex-end;
        .el_one {
          margin-right: 0;
        }
      }
      .el-table {
        th {
          color: #354b70;
        }
        td {
          color: #7786ac;
        }
        th,
        td {
          font-family: Source Han Sans CN;
          font-weight: 400;
          text-align: center;
          height: 0.42rem !important;
        }
        .el-button--text {
          padding: 0;
          font-size: 0.16rem;
        }
      }
      .el-dialog__body {
        padding: 0 0.2rem !important;
      }
      .el-dialog__footer {
        width: auto;
        display: flex;
        justify-content: center;
        .el-button {
          margin-left: 1.08rem;
        }
        .el-button--primary {
          margin-left: 0;
        }
      }
    }
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
  }
  .add_class_dia {
    .el-dialog {
      width: 5.54rem;
      .el-select {
        width: 100%;
      }
      .small_class {
        display: inline-block !important;
        width: 1.45rem;
        margin: 0 0.06rem;
      }
      .el-form-item__label {
        width: 1.2rem !important;
      }
    }
  }
  .set_year {
    .el-dialog {
      width: 6.84rem;
      .set_year_t {
        display: flex;
        align-items: center;
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #006cff;
        line-height: 1;
        margin-bottom: 0.18rem;
        span {
          width: 0.03rem;
          height: 0.17rem;
          background: linear-gradient(0deg, #059dff 0%, #00c0ff 100%);
          margin-right: 0.1rem;
        }
      }
      .set_year_d {
        display: flex;
        align-items: center;
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 1.86rem;
        }
        .time_bg1 {
          .el-input__inner {
            background: linear-gradient(
              0deg,
              rgba(196, 236, 255, 0.14) 0%,
              rgba(151, 205, 255, 0.14) 100%
            );
          }
        }
      }
      .el-form-item__label {
        width: 1.04rem !important;
        color: #7786ac;
      }
      .el-input__inner {
        color: #354b70;
      }
      .el-dialog__body {
        padding: 0.28rem 0.3rem 0.05rem 0.3rem;
      }
    }
  }
  // 底部分页
  .table_pages {
    display: flex;
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 0.14rem;
    align-items: center;
    justify-content: flex-end;
    margin: 0.18rem 0 0.08rem;

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
</style>
