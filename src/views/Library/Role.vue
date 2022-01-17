<template>
  <div class="role_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
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
      <div class="el_btn_box">
        <div style="display:flex">
          <el-form
            :inline="true"
            ref="roleForm"
            :model="roleForms"
            class="search_form"
          >
            <el-form-item label="角色:" prop="name">
              <el-input
                v-model="roleForms.name"
                placeholder="请输入角色"
                @blur="roleChange"
              >
                <i slot="prefix" @click="roleChange" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="el_tip" @click="helpTips">
            <img src="../../assets/images/what_icon.jpg" alt="">
            帮助提示
          </div>
        </div>
        <div style="display:flex">
          <div class="el_one" v-if="power1">
            <el-button class="el_btn_one" @click="addRole('新增')" type="primary">
              <i class="iconfont icon-jiahao"></i>
              新增角色
            </el-button>
          </div>
          <div class="el_two" v-if="power7">
            <el-button class="el_btn_two" @click="someDelete('所选')" type="primary">
              <i class="iconfont icon-shanchu1"></i>
              批量删除
            </el-button>
          </div>
        </div>
      </div>
      <template>
        <el-table
          border
          :data="tableData"
          style="width: 100%"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="index" label="序号" :index="indexMethod"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="memberNum" label="成员数量"> </el-table-column>
          <el-table-column prop="roleAuthNotice" label="角色描述">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="statusChange(scope.row)"
                :disabled="!power2 || scope.row.roleID == 'superAdministrator'"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span v-if="!power6&&!power4&&!power3&&!power5">暂无权限</span>
              <el-button v-if="power3" @click="lookGroup(scope.row)" type="text" size="small"
                >查看成员</el-button
              >
              <el-button v-if="power4" type="text" size="small" @click="powerSet(scope.row)"
                >权限设置</el-button
              >
              <el-button
                @click="addRole('编辑', scope.row)"
                type="text"
                size="small"
                v-if="power5"
                >编辑</el-button
              >
              <el-button v-if="power6 && scope.row.roleID != 'superAdministrator'" type="text" size="small" @click="roleDelete(scope.row)"
                >删除</el-button
              >
              <el-button v-if="power6 && scope.row.roleID == 'superAdministrator'" type="text" size="small" style="color:#ccc !important"
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
    <!-- 新增、编辑角色 -->
    <el-dialog
      class="fix_pass add_role"
      :close-on-click-modal="false"
      :title="isAddFlage ? '新增角色' : '编辑角色'"
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
            <el-checkbox style="margin-right:0.06rem; margin-top:-0.04rem" v-model="roleForm.copy"></el-checkbox>
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
    <!-- 查看成员弹窗 -->
    <el-dialog
      class="fix_pass look_group"
      :close-on-click-modal="false"
      title="查看成员"
      :visible.sync="dialogGroup"
    >
      <div class="group_box">
        <div class="el_btn_box">
          <div class="el_one">
            <el-button class="el_btn_one" @click="addMember" type="primary">
              <i class="iconfont icon-jiahao"></i>
              添加成员
            </el-button>
          </div>
        </div>
        <el-table
          border
          :data="memberData"
          style="width: 100%"
          @sort-change="sortChange"
        >
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="passport" label="登录账号"> </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.passport != 'administrator'" type="text" size="small" @click="memberDelete(scope.row)"
                >删除</el-button
              >
              <el-button v-if="scope.row.passport == 'administrator'" type="text" size="small" style="color:#ccc !important"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGroup = false">取 消</el-button>
        <el-button type="primary" @click="dialogGroup = false">确 定</el-button>
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
export default {
  name: "report",
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        });
      }
      return data;
    };
    return {
      power1: false,
      power2: false,
      power3: false,
      power4: false,
      power5: false,
      power6: false,
      power7: false,

      roleForms: {
        name: ''
      },
      teacherData: [], // 左边初始数据
      teacherIds: [], // 左边选中的，只有passport
      teacherNew: [], // 右边数据
      memberName: "",
      dialogGroupAdd: false,
      data: generateData(),
      value: [1],
      renderFunc(h, option) {
        return <span>{option.label}</span>;
      },
      dialogGroup: false,
      isAddFlage: true,
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
      cancel: 0,
      passInit: false,
      passInitAfter: false,
      tabActive: 1,
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
        cardNumber: "",
        account: "",
        status: ""
      },
      listData: [],
      tableData: [],
      memberData: [],
      checkList: [],
      roleName: '',
      cancelFlag: false,
      cancelName: ''
    };
  },
  created() {

  },
  mounted() {
    this.powerData()
    this.getInit();
    this.getList(this.currentPage);
  },
  methods: {
    roleChange(val) {
      this.roleName = this.roleForms.name
      this.getList(1);
    },
    indexMethod(index) {
      let that = this;
      return index + 1 + that.limit * (this.currentPage - 1);
    },
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power1 = power.includes(50401); // 角色管理--新增角色
      this.power2 = power.includes(50402); // 角色管理--启用/停用角色
      this.power3 = power.includes(50403); // 角色管理--添加成员
      this.power4 = power.includes(50404); // 角色管理--设置权限
      this.power5 = power.includes(50405); // 角色管理--编辑角色
      this.power6 = power.includes(50406); // 角色管理--删除角色
      this.power7 = power.includes(50407); // 角色管理--批量删除
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
        roleID: that.roleID,
        roleName: that.roleName,
        passports: listArr
      };
      that.$http
        .post(Url + "/aimw/role/addMembers", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            that.dialogGroupAdd = false;
            this.memberName = ''
            that.sLookGroup();
            this.getList(this.currentPage)
            this.$message.success('添加成功！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    teacherChange(data) {
      this.teacherIds = data;
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
    checkback(index, data) {
      this.teacherNew[index].check = !this.teacherNew[index].check;
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
    putClear() {
      let teachOrg = this.teacherNew;
      let arrOrg = this.teacherData;
      this.teacherData = arrOrg.concat(teachOrg).sort((a, b) => {
        return a.index - b.index;
      });
      this.teacherNew = [];
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
    getList(page) {
      let that = this;
      var param = {
        currentPage: page,
        pageSize: that.limit,
        roleName: that.roleForms.name
      };
      that.currentPage = page
      that.$http
        .get(Url + "/aimw/role/listRolesInfo", {
          params: param
        })
        .then(res => {
          let data = res.data.data;
          if (res.data.code == 0) {
            if (data) {
              for (let i in data.results) {
                data.results[i].index = Number(i) + Number((that.currentPage - 1) * that.limit + 1)
                if (data.results[i].status == 1) {
                  data.results[i].status = true;
                } else {
                  data.results[i].status = false;
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
    powerSet(row) {
      localStorage.setItem("powerDetail", JSON.stringify(row));
      this.$router.push({
        name: "power"
      });
    },
    addMember() {
      this.teacherIds = this.teacherData = this.teacherNew = [];
      this.getTeacher();
    },
    helpTips() {
      this.$confirm(
        '<div class="confirm_box confirm_box1"><p><span>角色代表操作权限和数据权限，操作权限是指具有该角色的用户是否能查看、新增、编辑、删除某些数据，数据权限是指具有该角色的用户能操作的数据的范围；</span></p><p class="p2"><span>超级管理员的权限是系统默认的最大权限的角色，不能修改。</span></p><p class="p3"><span>需要删除角色时必须先清除该职务下的所有成员。</span></p></div>',
        "帮助提示",
        {
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
          confirmButtonText: "关闭"
        }
      )
        .then(() => {

        })
        .catch(() => {

        });
    },
    // 查看成员
    lookGroup(row) {
      var that = this;
      that.memberData = []
      that.roleID = row.roleID;
      that.roleName = row.roleName;
      that.dialogGroup = true;
      var param = {
        roleID: row.roleID
      };
      that.$http
        .get(Url + "/aimw/role/listMembers", { params: param })
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            that.dialogGroup = true;
            that.memberData = data.data;
          } else {
            that.errorMsg = data.msg;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    sLookGroup() {
      let that = this;
      that.dialogGroup = true;
      var param = {
        roleID: that.roleID
      };
      that.$http
        .get(Url + "/aimw/role/listMembers", { params: param })
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            that.dialogGroup = true;
            that.memberData = data.data;
          } else {
            that.errorMsg = data.msg;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    statusChange(row) {
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
      if (row.status) {
        param.status = 1;
      } else {
        param.status = 0;
      }
      that.$http
        .put(Url + path, param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogAddRole = false;
            this.resetForm("roleForm");
            this.$message.success(param.status == 1 ? '已启用！' : '已停用！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 新增角色
    addRole(name, row) {
      var that = this;
      this.getInit();
      if (row) {
        if (row.status) {
          that.roleForm.status = 1;
        } else {
          that.roleForm.status = 0;
        }
        if (row.inheritRoleID != "") {
          that.roleForm.copy = true;
          that.cancelFlag = true
        } else {
          that.roleForm.copy = false;
          that.cancelFlag = false
        }
        that.cancelName = row.inheritRoleID
        that.roleForm.roleID = row.roleID;
        that.roleForm.name = row.roleName;
        that.roleForm.roleAuthNotice = row.roleAuthNotice;
        that.roleForm.inheritRoleID = row.inheritRoleID;
      } else {
        that.roleForm = {
          roleID: "",
          name: "",
          roleAuthNotice: "",
          status: "",
          roleAuthID: "",
          inheritRoleID: "",
          remark: "",
          copy: false,
          role: ""
        };
      }
      this.dialogAddRole = true;
      this.addNameOne = this.addMarkOne = false;
      if (name == "新增") {
        this.isAddFlage = true;
      } else {
        this.isAddFlage = false;
      }
    },
    generateUUID() {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
      }
      var uuid = "xxxxxxxxxxxxwxxxyxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 批量删除
    someDelete() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要删除的角色!"
        });
        return false;
      }
      var checkArr = [];
      let cont = 0
      for (let i in this.checkList) {
        if (this.checkList[i].memberNum != 0) {
          cont++
        }
        checkArr.push({ roleID: this.checkList[i].roleID });
      }
      if (cont == 0) {
        this.$confirm(
          '<div class="confirm_box"><p>确定要删除所选角色？</p><p class="con_p2">删除后不可恢复</p></div>',
          "提示",
          {
            dangerouslyUseHTMLString: true,
            cancelButtonText: "取消",
            confirmButtonText: "确定"
          }
        )
          .then(() => {
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
      } else {
        this.$confirm(
          '<div class="confirm_box"><p>角色无法删除</p><p class="con_p2">所选角色中有成员,无法删除</p></div>',
          "提示",
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: "知道了"
          }
        )
          .then(() => {

          })
          .catch(() => {

          });
      }
    },
    addRoleSub() {
      var that = this;
      this.addNameOne = this.addMarkOne = false;
      if (this.roleForm.name == "") {
        this.addNameOne = true;
        return false;
      }
      if (this.roleForm.roleAuthNotice == "") {
        this.addMarkOne = true;
        return false;
      }
      var param = {};
      var path = "";
      if (that.isAddFlage) {
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
        param.status = 1;
        param.roleID = that.generateUUID();
        path = "/aimw/role/addRole";
        that.$http
          .post(Url + path, param)
          .then(res => {
            var data = res.data;
            if (data.code == 0) {
              this.dialogAddRole = false;
              this.resetForm("roleForm");
              this.getList(1);
              this.$message.success('新增成功！');
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        let cancel = 0
        if (this.cancelFlag) {
          // 原状态勾选
          if (this.roleForm.copy) {
            if (this.roleForm.inheritRoleID == this.cancelName) {
              cancel = 0
            } else {
              cancel = 1
            }
          } else {
            cancel = 2
          }
        } else {
          // 原状态未勾选
          if (this.roleForm.copy) {
            cancel = 1
          } else {
            cancel = 0
          }
        }
        console.log(this.roleForm.inheritRoleID)
        if (this.roleForm.copy) {
          if (this.roleForm.inheritRoleID == '') {
            this.$message.warning('请选选择要复制角色权限')
            return false
          }
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
        param.cancel = cancel;
        path = "/aimw/role/updateRoleInfo";
        that.$http
          .put(Url + path, param)
          .then(res => {
            var data = res.data;
            if (data.code == 0) {
              this.dialogAddRole = false;
              this.resetForm("roleForm");
              this.getList(1);
              this.$message.success('更新成功！');
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    // 新增老师
    addTeacher() {
      this.$router.push({
        name: "addteacher"
      });
    },
    // 批量新增教师
    batchTeacher() {
      this.$router.push({
        name: "batchteacher"
      });
    },
    // 修改密码的
    fixPass(id) {
      this.passForm = {
        newPass: "",
        twoPass: ""
      };
      this.newRight1 = this.newRight2 = this.newRight3 = this.newPassFlag = this.twoPassFlag = false;
      this.twoPassFlag = false;
      this.dialogFixPass = true;
    },
    newChange(val) {
      if (val.indexOf("123456") != -1) {
        this.newRight1 = true;
      } else {
        this.newRight1 = false;
      }
      if (val.indexOf("123456wt") != -1) {
        this.newRight2 = true;
      } else {
        this.newRight2 = false;
      }
      if (val.indexOf("123456wt...") != -1) {
        this.newRight3 = true;
        setTimeout(() => {
          this.newPassFlag = false;
        }, 1000);
      } else {
        this.newRight3 = false;
        setTimeout(() => {
          this.newPassFlag = true;
        }, 100);
      }
    },
    newFcous(val) {
      this.newPassFlag = true;
    },
    newBlur(val) {
      this.newPassFlag = false;
    },
    twoChange(val) {
      if (val != this.passForm.newPass) {
        this.twoPassFlag = true;
      } else {
        this.twoPassFlag = false;
      }
    },
    handleSelectionChange(val) {
      this.checkList = val;
    },
    // 密码初始化
    passWordInit() {
      this.$message({
        type: "warning",
        message: "没有选择要初始化密码的数据!"
      });
      this.$confirm(
        '<div class="confirm_box"><p>确定要对所选数据进行密码初始化？</p><p class="con_p2">初始化后密码将更新为：<span>登录账号后6位</span></p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "初始化密码成功!"
          });
          this.passInit = true;
          setTimeout(() => {
            this.passInitAfter = true;
          }, 100);
          setTimeout(() => {
            this.passInit = false;
            this.passInitAfter = false;
          }, 3000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消初始化密码"
          });
        });
    },
    // 批量导出
    someExport() {
      this.$message({
        type: "warning",
        message: "没有选择要导出的数据!"
      });
    },
    memberDelete(row) {
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
          var checkArr = { roleID: this.roleID, passports: [{ passport: row.passport }] };
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
                this.sLookGroup()
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
    // 删除角色
    roleDelete(row) {
      if (row.memberNum == 0) {
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
                  this.getList(this.currentPage);
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
      } else {
        this.$confirm(
          '<div class="confirm_box"><p>角色无法删除</p><p class="con_p2">角色中有成员,无法删除</p></div>',
          "提示",
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: "知道了"
          }
        )
          .then(() => {

          })
          .catch(() => {

          });
      }
    },
    sortChange(e) {

    },
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
.role_wrap {
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
  .fix_pass {
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
      margin: 0.3rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-form-item{
        margin: 0;
        display: flex;
        align-items: center;
        .el-form-item__content{
          line-height: 1;
        }
      }
      .el-form-item__label{
        font-size: 0.16rem;
        line-height: 0.36rem;
        padding:  0 0.12rem 0 0 ;
      }

      .search_form{
        .el-input__prefix{
          left: unset;
          right: 5px;
        }
        .el-input__inner {
          height: 0.36rem;
          line-height: 0.36rem;
          font-size: 0.16rem;
          padding: 0 0.3rem 0 0.15rem;
        }
      }
      .el_tip{
        display: flex;
        align-items: center;
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #006CFF;
        height: 0.36rem;
        line-height: 0.36rem;
        padding-left: 0.18rem;
        img{
          width: 0.18rem;
          margin-right: 0.06rem;
        }
      }
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
      .el-table__header,
      .el-table__body {
        col:nth-child(1) {
          width: 0.48rem;
        }
        col:nth-child(2) {
          width: 0.8rem;
        }
        col:nth-child(4) {
          width: 0.8rem;
        }
        col:nth-child(6) {
          width: 1.6rem;
        }
        col:nth-child(7) {
          width: 1rem;
        }
        col:nth-child(8) {
          width: 2.2rem;
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
}
</style>
