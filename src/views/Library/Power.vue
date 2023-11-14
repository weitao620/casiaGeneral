<template>
  <div class="power_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>基础设置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/library/role' }"
            >角色管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>权限设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="search_form_box">
      <div class="search_title center_o_title">
        设置权限
      </div>
      <div class="search_heado">
        <div class="search_heado_left">
          <span>{{powerDetail.roleName}}</span>
          <span>{{powerDetail.roleAuthNotice != '' ? powerDetail.roleAuthNotice : '暂无相关描述'}}</span>
        </div>
        <div class="el_btn_box">
          <div class="el_one">
            <el-button class="el_btn_one" type="primary" @click="addRole()">
              <i class="iconfont icon-bianji"></i>
              编辑角色
            </el-button>
          </div>
          <div class="el_two" v-if="this.powerDetail.roleID != 'superAdministrator'">
            <el-button class="el_btn_two" type="primary" @click="statusChange">
              <i class="iconfont icon-tingyong"></i>
              {{this.powerDetail.status == 1 ? '停用' : '启用'}}角色
            </el-button>
          </div>
          <div class="el_two" style="background:#999" v-else>
            <el-button class="el_btn_two" style="color:#999" type="primary">
              <i class="iconfont icon-tingyong"></i>
              停用角色
            </el-button>
          </div>
          <div class="el_two" v-if="this.powerDetail.roleID != 'superAdministrator'">
            <el-button class="el_btn_two" type="primary" @click="roleDelete">
              <i class="iconfont icon-shanchu1"></i>
              删除角色
            </el-button>
          </div>
          <div class="el_two" style="background:#999" v-else>
            <el-button class="el_btn_two" style="color:#999" type="primary">
              <i class="iconfont icon-shanchu1"></i>
              删除角色
            </el-button>
          </div>
        </div>
      </div>
      <div class="power_tabs">
        <div
          class="p_tab_box"
          :style="{ width: (tabList.length * 140) / 100 + 'rem' }"
        >
          <div
            v-for="item in tabList"
            :key="item.type"
            :class="['p_tab_btn', powerActive == item.type ? 'p_tab_act' : '']"
            @click="powerTab(item.type)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="power_main" v-if="powerActive == 1">
        <div class="p_main_list">
          <div class="p_check_all">
            <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">选择全部</el-checkbox>
          </div>
          <el-checkbox-group v-model="checkList" @change="powerChange">
            <ul
              :class="[
                'pm_list_body',
                { style2: !(index == 0 || index == menuAuth.length - 1) }
              ]"
              v-for="(item, index) in menuAuth"
              :key="item.Pid"
            >
              <li class="list_one_li">
                <div class="llo_one">
                  <el-checkbox
                    class="list_one"
                    :pid="item.Pid"
                    v-model="item.Mark"
                    :label="item.Pid"
                    >{{ item.Name }}</el-checkbox
                  >
                </div>
                <div class="list_one_box">
                  <div
                    class="list_two_box"
                    v-for="item1 in item.list"
                    :key="item1.Pid"
                    :label="item1.Pid"
                  >
                    <div class="list_two_flex" v-if="item1.Pid != 0">
                      <el-checkbox class="list_two" :pid="item1.Pid" :label="item1.Pid">
                        {{item1.Name}}
                      </el-checkbox>
                      <div class="list_two_flex5"></div>
                    </div>
                    <div class="list_two_li">
                      <div
                        class="list_thr_box"
                        v-for="(item2, index2) in item1.list"
                        :key="item2.Pid"
                        :label="item2.Pid"
                        :style="{'border-bottom': item1.list.length > 6 &&index2 <6 ? '0.01rem dashed #00c2ff' : 0}"
                      >
                        <el-checkbox class="list_thr" :pid="item2.Pid" :label="item2.Pid">{{
                          item2.Name
                        }}</el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </el-checkbox-group>
          <div class="pm_btns">
            <el-button v-if="this.powerDetail.roleID != 'superAdministrator'" type="primary" @click="onSubmit">保存</el-button>
            <el-button v-else type="primary" style="background:#aaa" @click="onSubmit1">保存</el-button>
            <el-button type="primary" class="resets" @click="goBack"
              >取消</el-button
            >
          </div>
        </div>
      </div>
      <div class="power_main" v-if="powerActive == 2">
        <div class="power_mtxt">（设置该角色管理员可以操作的部门范围）</div>
        <el-form>
          <el-form-item class="chose_stats" required label="已选择部门:">
            <ul class="chose_s_ul">
              <li v-for="(item, index) in studyList" :key="index">
                {{ item.Name }}<span @click="studyDel(item, index)">X</span>
              </li>
            </ul>
          </el-form-item>
        </el-form>
        <div class="power_tree">
          <el-tree
            v-if="reloadTree"
            :data="treeData"
            default-expand-all
            :default-checked-keys="checksList"
            node-key="Pid"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @check="handleCheckChange"
            :render-content="renderContent"
          >
          </el-tree>
        </div>
        <div class="p_class_list">
          <div class="pm_btns">
            <el-button v-if="this.powerDetail.roleID != 'superAdministrator'" type="primary" @click="onSubmit">保存</el-button>
            <el-button v-else type="primary" style="background:#aaa" @click="onSubmit1">保存</el-button>
            <el-button type="primary" class="resets" @click="goBack"
              >取消</el-button
            >
          </div>
        </div>
      </div>
      <div class="power_main" v-if="powerActive == 3">
        <div class="tables_box">
          <div class="el_btn_box">
            <div class="el_one">
              <el-button class="el_btn_one" type="primary" @click="addMember">
                <i class="iconfont icon-jiahao"></i>
                添加成员
              </el-button>
            </div>
            <div class="el_two">
              <el-button
                class="el_btn_two"
                @click="someMemberDelete"
                type="primary"
              >
                <i class="iconfont icon-shanchu1"></i>
                批量删除
              </el-button>
            </div>
          </div>
          <template>
            <el-table
              ref="accountTables"
              border
              :data="memberData"
              style="width: 100%"
              @sort-change="sortChange"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection"> </el-table-column>
              <el-table-column type="index" label="序号" :index="indexMethod"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="passport" label="登录账号"> </el-table-column>
              <el-table-column prop="addRoleTime" label="添加时间"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.passport != 'administrator'"
                    type="text"
                    size="small"
                    @click="memberDelete(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    v-if="scope.row.passport == 'administrator'"
                    type="text"
                    size="small"
                    style="color:#ccc !important"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    <el-dialog
      class="fix_pass add_role"
      :close-on-click-modal="false"
      title="编辑角色"
      :visible.sync="dialogAddRole"
    >
      <el-form ref="roleForm" :model="roleForm">
        <el-form-item required label="角色名称:">
          <el-input
            v-model="roleForm.name"
            placeholder="请输入角色名称"
          ></el-input>
          <div class="tip_left" v-show="addNameOne">
            <div class="tip_msg" style="width:2rem">
              <img src="../../assets/images/x.png" alt="" />
              请输入角色名称
            </div>
          </div>
        </el-form-item>
        <el-form-item required label="角色描述:">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="roleForm.roleAuthNotice"
            maxlength="200"
            show-word-limit
          >
          </el-input>
          <div class="tip_left" v-show="addMarkOne">
            <div class="tip_msg" style="width:2rem">
              <img src="../../assets/images/x.png" alt="" />
              请输入内容
            </div>
          </div>
        </el-form-item>
        <el-form-item v-show="roleForm.roleID != 'superAdministrator'">
          <div class="copy_role">
            <el-checkbox v-model="roleForm.copy"></el-checkbox>
            <span>复制</span>
            <section>
              <el-select v-model="roleForm.inheritRoleID" placeholder="请选择">
                <el-option
                  v-for="item in listData"
                  :key="item.roleID"
                  :label="item.roleName"
                  :value="item.roleID"
                >
                </el-option>
              </el-select>
            </section>
            <span>的角色权限</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSub">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="fix_pass look_group"
      :close-on-click-modal="false"
      title="添加成员"
      :visible.sync="dialogGroupAdd"
    >
      <div class="group_box">
        <div class="member_box">
          <div class="mem_main">
            <div class="mm_top">
              <i class="iconfont icon-wode"></i>
              选择成员
            </div>
            <div class="mem_ul">
              <el-input
                class="mem_input"
                @input="getTeacher"
                v-model="memberName"
                placeholder="输入成员姓名"
                suffix-icon="el-icon-search"
              ></el-input>
              <el-checkbox-group v-model="teacherIds" @change="teacherChange">
                <ul>
                  <li v-for="item in teacherData" :key="item.passport">
                    <el-checkbox :label="item.passport">{{
                      item.name
                    }}</el-checkbox>
                  </li>
                </ul>
              </el-checkbox-group>
            </div>
          </div>
          <div class="mem_center">
            <div>
              <div class="mem_c_bg" @click="putRight">
                <div class="mem_cb">
                  加入右侧
                  <i class="el-icon-right"></i>
                </div>
              </div>
              <div class="mem_c_bg" @click="putLeft">
                <div class="mem_cb">
                  <i class="el-icon-back"></i>
                  加入左侧
                </div>
              </div>
            </div>
          </div>
          <div class="mem_main">
            <div class="mm_top mm_tops">
              <div>
                已选<span>{{ teacherNew.length }}</span
                >条
              </div>
              <div @click="putClear">清空</div>
            </div>
            <div class="mem_ul">
              <ul>
                <li
                  v-for="(item, index) in teacherNew"
                  :key="item.passport"
                  :class="{ mmli_check: item.check }"
                  @click="checkback(index, item)"
                >
                  <div>{{ item.name }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGroupAdd = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Url from "@/assets/js/url.js";
let justList = [];
let onlyList = [];
let fuclist = []
export default {
  name: "",
  data() {
    return {
      radios: "1",
      classType: 10000,
      powerActive: 1,
      tabList: [
        {
          type: 1,
          name: "操作权限"
        },
        {
          type: 2,
          name: "部门权限"
        },
        {
          type: 3,
          name: "成员列表"
        }
      ],
      checkList: [],
      classList: [],

      powerDetail: {},
      menuAuth: [],
      schoolAuth: [],
      isIndeterminate: true,
      checkAll: false,
      treeData: [],
      defaultProps: {
        children: "list",
        label: "Name"
      },
      expandsList: [],
      checksList: [],
      studyList: [],
      reloadTree: true,
      // 成员列表
      memberData: [],
      checkList3: [],
      limit: 10,
      total: 0,
      pageNum: 1,
      currentPage: 1,
      formSearch: {
        name: "",
        cardNumber: "",
        account: "",
        accountState: ""
      },
      // 编辑角色
      listData: [],
      addNameOne: false,
      addMarkOne: false,
      dialogAddRole: false,
      roleForm: {
        roleID: "",
        name: "",
        roleAuthNotice: "",
        status: "",
        roleAuthID: "",
        inheritRoleID: "",
        remark: "",
        copy: false,
        role: ""
      },
      // 添加成员
      dialogGroupAdd: false,
      memberName: "",
      teacherIds: [],
      teacherData: [],
      teacherNew: [],
      checkmList: []
    };
  },
  created() {

  },
  mounted() {
    let that = this;
    this.powerDetail = JSON.parse(localStorage.getItem("powerDetail"));
    this.getList();
  },
  methods: {
    // 删除角色
    roleDelete() {
      let row = JSON.parse(localStorage.getItem("powerDetail"))
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除当前角色？</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          var checkArr = { roleID: row.roleID };
          this.$http
            .delete(Url + "/aimw/role/deleteRoles", {
              data: checkArr
            })
            .then(res => {
              var data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.$router.push({
                  path: "/library/role"
                });
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
    // 批量删除成员
    someMemberDelete() {
      if (this.checkmList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要删除的成员!"
        });
        return false;
      }
      var checkArr = [];
      let noName = ''
      for (let i in this.checkmList) {
        if (this.checkmList[i].passport != 'administrator') {
          checkArr.push({ passport: this.checkmList[i].passport });
        }
        if (this.checkmList[i].passport == 'administrator') {
          noName = "<span style='color:#FE5FB8'>(其中" + this.checkmList[i].name + "不会被删除)</span>"
        }
      }
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除所选成员？' + noName + '</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          this.$http
            .delete(Url + "/aimw/role/deleteMember", {
              data: { roleID: this.powerDetail.roleID, passports: checkArr }
            })
            .then(res => {
              var data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList1()
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
    memberDelete(row) {
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除当前成员？</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          var checkArr = { roleID: this.powerDetail.roleID, passports: [{ passport: row.passport }] };
          this.$http
            .delete(Url + "/aimw/role/deleteMember", {
              data: checkArr
            })
            .then(res => {
              var data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList1()
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
    checkback(index, data) {
      this.teacherNew[index].check = !this.teacherNew[index].check;
    },
    addGroup() {
      let that = this;
      let listArr = [];
      for (var i in that.teacherNew) {
        listArr.push({
          passport: that.teacherNew[i].passport
        });
      }
      var param = {
        roleID: this.powerDetail.roleID,
        passports: listArr
      };
      that.$http
        .post(Url + "/aimw/role/addMembers", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            that.dialogGroupAdd = false;
            this.memberName = ''
            that.getList1();
            this.$message.success("添加成功！");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    putClear() {
      let teachOrg = this.teacherNew;
      let arrOrg = this.teacherData;
      this.teacherData = arrOrg.concat(teachOrg).sort((a, b) => {
        return a.index - b.index;
      });
      this.teacherNew = [];
    },
    putLeft() {
      let arrOrg = this.teacherData;
      let teachOrg = [];
      let teachArr = [];
      for (let i in this.teacherNew) {
        teachOrg.push(this.teacherNew[i]);
        teachArr.push(this.teacherNew[i]);
      }
      for (let i in teachArr) {
        if (teachArr[i].check) {
          arrOrg.push(teachOrg[i]);
          teachOrg.splice(i, 1, "");
        }
      }
      for (var i = 0; i < teachOrg.length; i++) {
        if (teachOrg[i] == "") {
          teachOrg.splice(i, 1);
          i = i - 1;
        }
      }
      this.teacherData = arrOrg.sort((a, b) => {
        return a.index - b.index;
      });
      this.teacherNew = teachOrg;
      for (let i in this.teacherNew) {
        this.teacherIds.push(this.teacherNew[i].passport)
      }
    },
    putRight() {
      let that = this;
      let teachData = [];
      for (let i in this.teacherData) {
        teachData.push(this.teacherData[i]);
      }
      for (let i in teachData) {
        for (let j in that.teacherIds) {
          if (that.teacherIds[j] == teachData[i].passport) {
            teachData[i].check = false;
            that.teacherNew.push(teachData[i]);
            teachData.splice(i, 1, "");
          }
        }
      }
      for (var i = 0; i < teachData.length; i++) {
        if (teachData[i] == "") {
          teachData.splice(i, 1);
          i = i - 1;
        }
      }
      that.teacherData = teachData;
      that.teacherNew = that.teacherNew.sort((a, b) => {
        return a.index - b.index;
      });
    },
    teacherChange(data) {
      this.teacherIds = data;
    },
    addMember() {
      this.teacherIds = this.teacherData = this.teacherNew = [];
      this.getTeacher();
    },
    getTeacher() {
      let that = this;
      var param = {
        limit: 10000,
        name: that.memberName
      };
      this.$http
        .get(Url + "/aimw/manager/listManagersInfo", {
          params: param
        })
        .then(res => {
          let data = res.data.data.results;
          for (let j in that.teacherNew) {
            for (let i in data) {
              if (data[i]) {
                if (data[i].passport == that.teacherNew[j].passport) {
                  data.splice(i, 1)
                  i = i - 1;
                }
              }
            }
          }
          that.dialogGroupAdd = true;
          for (let i in data) {
            data[i].check = false;
            data[i].index = i;
          }
          let justArr = []
          for (let j in that.memberData) {
            for (let i in data) {
              if (data[i]) {
                if (data[i].passport == that.memberData[j].passport) {
                  data.splice(i, 1)
                  i = i - 1;
                }
              }
            }
          }
          that.teacherData = data;
        });
    },
    getInit() {
      let that = this;
      that.$http
        .get(Url + "/aimw/role/listRolesInfo")
        .then(res => {
          let data = res.data.data;
          if (res.data.code == 0) {
            if (data) {
              that.listData = data.results;
            } else {
              that.listData = [];
            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.data.msg);
        });
    },
    // 新增角色
    addRole() {
      let row = JSON.parse(localStorage.getItem("powerDetail"))
      var that = this;
      this.getInit();
      if (row.status) {
        that.roleForm.status = 1;
      } else {
        that.roleForm.status = 0;
      }
      if (row.inheritRoleID != "") {
        that.roleForm.copy = true;
      } else {
        that.roleForm.copy = false;
      }
      that.roleForm.roleID = row.roleID;
      that.roleForm.name = row.roleName;
      that.roleForm.roleAuthNotice = row.roleAuthNotice;
      that.roleForm.inheritRoleID = row.inheritRoleID;
      this.dialogAddRole = true;
    },
    addRoleSub() {
      var that = this;
      this.addNameOne = this.addMarkOne = false;
      if (this.roleForm.name == "") {
        this.addNameOne = true;
        return false;
      }
      if (this.roleForm.roleAuth == "") {
        this.addMarkOne = true;
        return false;
      }
      var param = {};
      var path = "";
      if (this.roleForm.copy) {
        param = {
          roleName: this.roleForm.name,
          roleAuthNotice: this.roleForm.roleAuthNotice,
          inheritRoleID: this.roleForm.inheritRoleID
        };
      } else {
        param = {
          roleName: this.roleForm.name,
          roleAuthNotice: this.roleForm.roleAuthNotice,
          inheritRoleID: ""
        };
      }
      param.status = that.roleForm.status;
      param.roleID = that.roleForm.roleID;
      that.$http
        .put(Url + "/aimw/role/updateRoleInfo", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogAddRole = false;
            this.powerDetail.inheritRoleID = param.inheritRoleID
            this.powerDetail.roleAuthNotice = param.roleAuthNotice
            this.powerDetail.roleID = param.roleID
            this.powerDetail.roleName = param.roleName
            this.powerDetail.status = param.status
            localStorage.setItem('powerDetail', JSON.stringify(this.powerDetail))
            this.getList();
            this.$message.success('更新成功！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    statusChange() {
      let row = JSON.parse(localStorage.getItem("powerDetail"))
      var that = this;
      var param = {};
      var path = "/aimw/role/updateRoleInfo";
      param = {
        roleID: row.roleID,
        roleName: row.roleName,
        roleAuthNotice: row.roleAuthNotice,
        inheritRoleID: row.inheritRoleID,
        cancel: 0
      };
      if (row.status == 1) {
        param.status = 0;
      } else {
        param.status = 1;
      }
      that.$http
        .put(Url + path, param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogAddRole = false;
            this.powerDetail.status = param.status
            localStorage.setItem('powerDetail', JSON.stringify(this.powerDetail))
            this.getList();
            this.$message.success(param.status == 1 ? '已启用！' : '已停用！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    indexMethod(index) {
      let that = this;
      return index + 1 + that.limit * (this.currentPage - 1);
    },
    sortChange(e) {

    },
    // table 复选框
    handleSelectionChange(val) {
      this.checkmList = val;
    },
    studyDel(data, index) {
      this.studyList.splice(index, 1);
      this.reloadTree = false;
      setTimeout(() => {
        this.reloadTree = true;
      }, 0);
    },
    // 选择班级
    handleCheckChange(data, checked, indeterminate) {
      this.checksList = checked.checkedKeys
    },
    // 渲染树
    renderContent(h, { node, data, store }) {
      let arrk = {
        Name: data.Name,
        Pid: data.Pid
      }
      let that = this;
      if (data.list) {
        return (
          <span class="custom-tree-node">
            <el-checkbox
              checked={
                JSON.stringify(that.studyList).indexOf(
                  JSON.stringify(arrk)
                ) != -1
              }
              on-change={() => this.append(arrk, data, node)}
            ></el-checkbox>
            <span style="margin-left:0.06rem">{node.label}</span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>
              <el-checkbox
                checked={
                  JSON.stringify(that.studyList).indexOf(
                    JSON.stringify(arrk)
                  ) != -1
                }
                on-change={() => this.append(arrk, data, node)}
              ></el-checkbox>
            </span>
            <span style="margin-left:0.06rem">{node.label}</span>
          </span>
        );
      }
    },
    append(arrk, data, node) {
      let that = this;
      let params = {
        Name: arrk.Name,
        Pid: arrk.Pid
      };
      if (
        JSON.stringify(that.studyList).indexOf(JSON.stringify(params)) != -1
      ) {
        for (let i in that.studyList) {
          if (that.studyList[i].Pid == params.Pid) {
            that.studyList.splice(i, 1);
          }
        }
      } else {
        that.studyList.push(params);
      }
    },
    // 获取左侧班级树
    addChange() {
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
              that.checksList = []; // 获取哪几个班的班级数据
              that.expandsList = []; // 左侧要选中班级的id
              this.treeData = schoolOrg;
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
          row.list1 = row.list
          that.getStr2(row.list)
        }
        if (row.Mark == 1) {
          that.studyList.push({ Name: row.Name, Pid: row.Pid })
          that.checksList.push(row.Pid)
        }
      })
    },
    recursiveFunction2(data) {
      let that = this;
      that.getStr2(data)
    },
    getList() {
      let that = this;
      that.$http
        .get(Url + "/aimw/role/listAuthInfo", {
          params: {
            roleID: this.powerDetail.roleID
          }
        })
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            localStorage.setItem("powerDetailNew", data.data)
            let detail = JSON.parse(data.data)
            this.menuAuth = []
            fuclist = []
            this.checkList = []
            this.menuAuth = detail.menuAuth.function;
            for (let i in that.menuAuth) {
              if (that.menuAuth[i].Mark == 1) {
                that.checkList.push(that.menuAuth[i].Pid);
                let check1 = that.menuAuth[i].list;
                for (let j in check1) {
                  if (check1[j].Mark == 1) {
                    that.checkList.push(check1[j].Pid);
                    let check2 = check1[j].list;
                    for (let k in check2) {
                      if (check2[k].Mark == 1) {
                        that.checkList.push(check2[k].Pid);
                      }
                    }
                  }
                }
              }
            }
            for (let i in that.menuAuth) {
              fuclist.push(that.menuAuth[i].Pid);
              let check1 = that.menuAuth[i].list;
              for (let j in check1) {
                fuclist.push(check1[j].Pid);
                let check2 = check1[j].list;
                for (let k in check2) {
                  fuclist.push(check2[k].Pid);
                }
              }
            }
            justList = that.checkList;
            if (justList.length == fuclist.length) {
              this.checkAll = true
            } else {
              this.checkAll = false
            }
            this.organizationAuth = []
            this.organizationAuth = detail.organizationAuth.organization;
            that.studyList = []
            that.classList = []
            this.recursiveFunction2(this.organizationAuth)
            this.treeData = that.organizationAuth
            this.reloadTree = false;
            setTimeout(() => {
              this.reloadTree = true;
            }, 100);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    powerTab(value) {
      this.powerActive = value;
      if (value == 2) {

      }
      if (value == 3) {
        this.getList1(1);
      }
    },
    // 用户管理列表
    getList1(page) {
      let that = this;
      var param = {
        roleID: this.powerDetail.roleID
      };
      this.$http
        .get(Url + "/aimw/role/listMembers", {
          params: param
        })
        .then(res => {
          let data = res.data.data;
          if (res.data.code == 0) {
            if (data) {
              that.memberData = data;
            } else {
              that.memberData = [];
            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.data.msg);
        });
    },
    handleCheckAllChange(val) {
      this.checkList = val ? fuclist : [];
      justList = val ? fuclist : [];
      this.isIndeterminate = false;
    },
    powerChange(value) {
      let that = this;
      let power = [];
      let list = JSON.parse(localStorage.getItem("powerDetailNew")).menuAuth.function;
      let org = justList;
      if (org.length > value.length) {
        setTimeout(() => {
          justList = power;
          let check = that.checkList;
          for (let k in check) {
            for (let i in list) {
              if (list[i].Pid === check[k]) {
                list[i].Marks = 1;
              }
              let lv1 = list[i].list;
              for (let j in lv1) {
                if (lv1[j].Pid === check[k]) {
                  lv1[j].Marks = 1;
                }
                let lv2 = lv1[j].list;
                for (let o in lv2) {
                  if (lv2[o].Pid === check[k]) {
                    lv2[o].Marks = 1;
                  }
                }
              }
            }
          }
          var checkNew = [];
          for (let i in list) {
            if (list[i].Marks == 1) {
              checkNew.push(list[i].Pid);
              let check1 = list[i].list;
              for (let j in check1) {
                if (check1[j].Marks == 1) {
                  checkNew.push(check1[j].Pid);
                  let check2 = check1[j].list;
                  for (let k in check2) {
                    if (check2[k].Marks == 1) {
                      checkNew.push(check2[k].Pid);
                    }
                  }
                }
                if (!check1[j].Marks) {
                  let check2 = check1[j].list;
                  for (let k in check2) {
                    that.$delete(check2[k], "Marks");
                  }
                }
              }
            }
            if (!list[i].Marks) {
              let check1 = list[i].list;
              for (let j in check1) {
                if (check1[j].Marks) {
                  that.$delete(check1[j], "Marks");
                }
                if (!check1[j].Marks) {
                  let check2 = check1[j].list;
                  for (let k in check2) {
                    if (check2[k].Marks) {
                      that.$delete(check2[k], "Marks");
                    }
                  }
                }
              }
            }
          }
          justList = checkNew
          that.checkList = checkNew;
          if (justList.length == fuclist.length) {
            this.checkAll = true
          } else {
            this.checkAll = false
          }
        }, 100);
      } else {
        for (let i in value) {
          if (value[i] % 10000 != 0) {
            power.push(Number(String(value[i]).substr(0, 1) + "0000"));
            if (value[i] % 100 != 0) {
              power.push(Number(String(value[i]).substr(0, 3) + "00"));
            }
          }
          power.push(value[i]);
        }
        that.checkList = Array.from(new Set(power)).sort(function(a, b) {
          return a - b;
        });
        power = Array.from(new Set(power)).sort(function(a, b) {
          return a - b;
        });
        setTimeout(() => {
          justList = power;
          let check = that.checkList;
          for (let k in check) {
            for (let i in list) {
              if (list[i].Pid === check[k]) {
                list[i].Marks = 1;
              }
              let lv1 = list[i].list;
              for (let j in lv1) {
                if (lv1[j].Pid === check[k]) {
                  lv1[j].Marks = 1;
                }
                let lv2 = lv1[j].list;
                for (let o in lv2) {
                  if (lv2[o].Pid === check[k]) {
                    lv2[o].Marks = 1;
                  }
                }
              }
            }
          }
          if (justList.length - 1 == fuclist.length) {
            this.checkAll = true
          } else {
            this.checkAll = false
          }
        }, 100);
      }
    },
    onSubmit1() {
      this.$message.warning(this.powerDetail.roleName + "不允许进行修改！");
    },
    onSubmit() {
      let that = this;
      for (let i in that.checkList) {
        if (that.checkList[i] == 30100) {
          that.checkList.splice(i, 1);
        }
      }
      let studyArr = []
      for (let i in that.studyList) {
        studyArr.push(that.studyList[i].Pid)
      }
      let powerIds = {
        menuAuthID: that.checkList,
        organizationAuthID: studyArr
      }
      var role = {
        roleID: that.powerDetail.roleID,
        roleAuthID: JSON.stringify(powerIds)
      };
      let param = role;
      that.$http
        .put(Url + "/aimw/role/updateAuthInfo", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.getList();
            this.$message({
              type: "success",
              message: "更新成功!"
            });
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    goBack() {
      this.$router.push({
        path: "/library/role"
      });
    }
  }
};
</script>

<style lang="less">
.power_wrap {
  text-align: left;
  margin: 0 0.22rem;
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
  // 头部搜索项
  .search_form_box {
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 0.04rem;
    padding: 0.2rem 0.24rem;
    margin-bottom: 0.22rem;
    .search_heado{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.17rem;
      margin-top: 0.2rem;
      background: url(../../assets/images/sys_bg.png) no-repeat;
      background-size: 100% auto;
      padding-left: 2.1rem;
      padding-right: 0.3rem;
      .search_heado_left{
        span{
          display: block;
          font-size: 0.18rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(42, 119, 226, 0.8);
        }
        span:first-child{
          font-size: 0.2rem;
          color: #006cff;
          margin-bottom: 0.18rem;
        }
      }
      .el_btn_box {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el_one,
        .el_two {
          margin-left: 0.18rem;
          // width: 1.16rem;
          // height: 0.36rem;
          padding: 1px;
          background: linear-gradient(263deg, #00c2ff, #0075ff);
          border-radius: 0.04rem;
          overflow: hidden;
          box-shadow: 0 0.03rem 0.18rem 0 rgba(62, 150, 253, 0.19);
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
            box-shadow: 0 0.03rem 0.18rem 0 rgba(62, 150, 253, 0.19);
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
  }
  .power_main {
    .power_mtxt{
      font-size: 0.16rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #354B70;
    }
    .power_tree{
      width: 3.5rem;
      height: 2.7rem;
      border: 1px solid #E1E9FF;
      background: linear-gradient(0deg, rgba(196,236,255,0.1) 0%, rgba(151,205,255,0.1) 100%);
      border-radius: 2px;
      overflow: hidden;
      overflow-y: auto;
      margin-left: 1.1rem;
      .el-tree{
        background: transparent;
      }
    }
    .chose_stats {
      display: flex;
      align-items: flex-start;
      margin: 0.12rem 0;
      .el-form-item__label{
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #7786AC;
        line-height: 0.4rem;
      }
      .el-form-item__content {
        flex: 1 !important;
        display: flex;
      }
      .chose_s_ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-top: 0.07rem;
          margin-bottom: 0.05rem;
          margin-right: 0.2rem;
          position: relative;
          color: #3984fb;
          height: 0.26rem;
          display: flex;
          align-items: center;
          padding: 0 0.34rem 0 0.13rem;
          border: 0.01rem solid;
          border-image: linear-gradient(
              90deg,
              rgba(46, 190, 255, 1),
              rgba(64, 145, 253, 1)
            )
            1 1;
          span {
            position: absolute;
            top: -0.01rem;
            right: -0.01rem;
            width: 0.26rem;
            height: 0.26rem;
            background: linear-gradient(
              90deg,
              rgba(46, 190, 255, 1),
              rgba(64, 145, 253, 1)
            );
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 0.14rem;
          }
        }
      }
    }
    .p_main_tip {
      height: 0.52rem;
      padding: 1px;
      background: linear-gradient(185deg, #00eafe, #00b6f0);
      box-shadow: 0px 3px 12px 0px rgba(155, 183, 161, 0.1);
      border-radius: 0.02rem;
      overflow: hidden;
      .p_main_bor {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #effeff;
        border-radius: 0.02rem;
        .pm_btips {
          width: 0.18rem;
          height: 0.18rem;
          border-radius: 50%;
          background: linear-gradient(-90deg, #00eafe, #00b6f0);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.15rem;
          color: #ffffff;
          font-weight: 800;
          margin-right: 0.06rem;
          margin-left: 0.22rem;
        }
        img {
          width: 0.18rem;
          height: 0.18rem;
          margin-right: 0.06rem;
          margin-left: 0.22rem;
        }
        span {
          font-size: 0.16rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #354b70;
        }
      }
    }
    .p_main_list {
      margin: 0.27rem 0 0.25rem;
      .el-checkbox__label{
        font-size: 0.16rem !important;
      }
      .el-checkbox__input{
        margin-top: -0.02rem;
      }
      .p_check_all{
        width: 100%;
        height: 0.48rem;
        border: 0.01rem dashed #00c2ff;
        background: linear-gradient(90deg,rgba(0, 117, 255, 0.2) 0%, rgba(0, 194, 255, 0.2) 100%);
        border-radius: 0.02rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pm_btns {
        margin-top: 0.32rem;
        display: flex;
        justify-content: center;
        .el-button {
          border: 0.01rem solid #dcdfe6;
          padding: 0.09rem 0.27rem;
          font-size: 0.16rem;
          border-radius: 4px;
          background: linear-gradient(263deg, #00c2ff, #0075ff);
          box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
        }
        .el-button.resets {
          margin-left: 0.78rem;
          background: linear-gradient(261deg, #b8d5f5, #8fb1d7);
          box-shadow: 0px 2px 10px 0px rgba(171, 196, 227, 0.45);
        }
      }
      ul.pm_list_head {
        display: flex;
        justify-content: space-between;
        li {
          flex: 1;
          border: 0.01rem dashed #00c2ff;
          text-align: center;
          font-size: 0.18rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #006cff;
          background: linear-gradient(
            180deg,
            rgba(0, 117, 255, 0.05) 0%,
            rgba(0, 194, 255, 0.05) 100%
          );
          border-radius: 0.02rem;
          line-height: 0.5rem;
        }
        li.mlr_10 {
          margin: 0 0.1rem;
        }
      }
      ul.pm_list_body {
        display: flex;
        border-top: 0;
        .list_one_li{
          width: 100%;
          .llo_one{
            width: 100%;
            height: 0.48rem;
            border: 0.01rem dashed #00c2ff;
            background: linear-gradient(90deg,rgba(0, 117, 255, 0.14) 0%, rgba(0, 194, 255, 0.14) 100%);
            border-radius: 0.02rem;
            border-top: 0;
            padding-left: 0.24rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .list_one_box{
            .list_two_box{
              .list_two_flex{
                display: flex;
                border: 0.01rem dashed #00c2ff;
                border-radius: 0.02rem;
                border-top: 0;
                .list_two{
                  width: 16.66%;
                  height: 100%;
                  background: linear-gradient(0deg,rgba(147, 161, 255, 0.1) 0%, rgba(216, 160, 254, 0.1) 100%);
                  height: 0.48rem;
                  border-right: 0.01rem dashed #00c2ff;
                  padding-left: 0.24rem;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                }
                .list_two_flex5{
                  padding-left: 1.2rem;
                  width: 73.34%;
                }
              }
              .list_two_li{
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: center;
                border: 0.01rem dashed #00c2ff;
                border-top: 0;
                .list_thr_box{
                  width: 16.66%;
                  height: 0.48rem;
                  padding-left: 0.24rem;
                  border-right: 0.01rem dashed #00c2ff;
                  border-bottom: 0.01rem dashed #00c2ff;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                }
                .list_thr_box:nth-child(n+7){
                  border-right: 0.01rem dashed #00c2ff;
                  border-bottom: 0;
                }
                .list_thr_box:nth-child(6n){
                  border-right:0;
                }
              }
            }
          }
        }
      }
    }
    .pm_select {
      font-size: 0.16rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #7786ac;
      .el-select {
        width: 4.1rem;
      }
      .el-input__inner {
        color: #354b70;
        font-size: 0.16rem;
        height: 0.36rem;
        line-height: 0.36rem;
      }
    }
    .p_class_list {
      .pm_btns {
        margin-top: 0.42rem;
        margin-bottom: 0.12rem;
        display: flex;
        justify-content: center;
        .el-button {
          border: 0.01rem solid #dcdfe6;
          padding: 0.09rem 0.27rem;
          font-size: 0.16rem;
          border-radius: 4px;
          background: linear-gradient(263deg, #00c2ff, #0075ff);
          box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
        }
        .el-button.resets {
          margin-left: 0.78rem;
          background: linear-gradient(261deg, #b8d5f5, #8fb1d7);
          box-shadow: 0px 2px 10px 0px rgba(171, 196, 227, 0.45);
        }
      }
      .p_c_top {
        margin-top: 0.24rem;
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #7786ac;
        .el-radio__label {
          font-size: 0.16rem;
          color: #7786ac;
        }
      }
      .pc_list {
        margin-top: 0.2rem;
        .pc_head {
          margin-top: 0.2rem;
          width: 100%;
          border: 0.01rem dashed #00c2ff;
          text-align: center;
          font-size: 0.18rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #006cff;
          background: linear-gradient(
            180deg,
            rgba(0, 117, 255, 0.05) 0%,
            rgba(0, 194, 255, 0.05) 100%
          );
          border-radius: 0.02rem;
          line-height: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.28rem;
            height: 0.22rem;
            margin-right: 0.12rem;
          }
        }
        .pc_body {
          margin-top: 0.14rem;
          width: 100%;
          border: 0.01rem dashed #00c2ff;
          font-size: 0.18rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #006cff;
          background: linear-gradient(
            180deg,
            rgba(0, 117, 255, 0.05) 0%,
            rgba(0, 194, 255, 0.05) 100%
          );
          border-radius: 0.02rem;
          line-height: 0.5rem;
          display: flex;
          padding: 0.1rem 0.42rem;
          flex-wrap: wrap;
          li {
            width: 10%;
            text-align: center;
            .el-checkbox {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .el-checkbox__label {
              min-width: 0.48rem;
              text-align: left;
              font-size: 0.16rem !important;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #354b70;
              line-height: 0.52rem;
            }
          }
        }
        .pc_body1{
          li{
            width: 100%;
            text-align: left;
          }
        }
      }
    }
  }
  // 表格
  .tables_box {
    border-radius: 0.04rem;
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
        col {
          width: 3.3rem;
        }
        col:nth-child(1) {
          width: 0.86rem;
        }
        col:nth-child(2) {
          width: 1.2rem;
        }
        col:nth-child(7) {
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
  .add_role {
    .copy_role {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #7786ac;
      }
      .el-select {
        width: 1.48rem;
        margin: 0 0.06rem;
      }
      .el-checkbox__inner {
        display: block;
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.06rem;
      }
    }
  }
  .look_group {
    .group_box {
      margin-top: 0.28rem;
      margin-bottom: 0.23rem;
      .member_box {
        display: flex;
        justify-content: center;
        align-items: center;
        .mem_main {
          width: 3.09rem;
          height: 3.82rem;
          border: 1px solid #e1e9ff;
          padding-bottom: 0.1rem;
          background: linear-gradient(
            0deg,
            rgba(196, 236, 255, 0.14) 0%,
            rgba(151, 205, 255, 0.14) 100%
          );
          .mm_top {
            height: 0.36rem;
            display: flex;
            align-items: center;
            background: linear-gradient(263deg, #babfff, #7279ff);
            font-size: 0.16rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            i {
              margin: 0 0.06rem 0 0.1rem;
            }
          }
          .mm_tops {
            justify-content: space-between;
            div {
              margin: 0 0.1rem;
              display: flex;
              align-items: center;
              span {
                color: #03e2f1;
                font-size: 0.18rem;
                margin: -0.02rem 0.02rem 0;
              }
            }
          }
          .mem_ul {
            .mem_input {
              display: block;
              margin: 0.15rem auto 0.1rem;
              width: 2.68rem;
              height: 0.36rem;
              .el-input__inner {
                height: 0.36rem;
                line-height: 0.36rem;
                font-size: 0.16rem;
              }
            }
            ul {
              height: 2.8rem;
              overflow: hidden;
              overflow-y: auto;
              li {
                font-size: 0.15rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #7786ac;
                line-height: 0.32rem;
                padding-left: 0.38rem;
              }
              .mmli_check {
                font-size: 0.15rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #006cff;
                background: linear-gradient(0deg, #c4ecff 0%, #97cdff 100%);
              }
            }
          }
        }
        .mem_center {
          width: 1.44rem;
          height: 3.82rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          .mem_c_bg {
            margin: 0 auto;
            width: 1.16rem;
            height: 0.36rem;
            padding: 1px;
            background: linear-gradient(45deg, #0075ff, #00c2ff);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.02rem;
            .mem_cb {
              width: 100%;
              height: 100%;
              background: #ffffff;
              border-radius: 0.02rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.16rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #006cff;
              i {
                font-size: 0.2rem;
              }
            }
          }
          .mem_c_bg:first-child {
            margin-bottom: 0.16rem;
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
      width: 8.04rem;
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
}
</style>
