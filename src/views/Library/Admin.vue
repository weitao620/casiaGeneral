<template>
  <div class="admins_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
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
        <el-form-item label="角色:" prop="roleId">
          <el-select @change="roleChange" v-model="formSearch.roleId" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.roleID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录账号:" prop="passport">
          <el-input
            v-model="formSearch.passport"
            placeholder="请输入登录账号"
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
      <div
        :class="['pass_init', { pass_act: passInitAfter }]"
        v-show="passInit"
      >
        <img class="pass_icon" src="../../assets/images/index_top.png" alt="" />
        <div class="pass_txt">
          <p>密码初始化成功！</p>
          <p>初始密码为：<span>登录账号后6位</span></p>
        </div>
      </div>
      <div class="search_title center_o_title">
        列表
      </div>
      <div class="el_btn_box">
        <div class="el_one" v-if="power1">
          <el-button class="el_btn_one" @click="addAdmin" type="primary">
            <i class="iconfont icon-jiahao"></i>
            新增管理员
          </el-button>
        </div>
        <div class="el_two" v-if="power2">
          <el-button class="el_btn_two" @click="batchAdmin" type="primary">
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
          <el-button
            class="el_btn_two"
            @click="someStop('所选')"
            type="primary"
          >
            <i class="iconfont icon-tingyong"></i>
            批量停用
          </el-button>
        </div>
        <div class="el_two" v-if="power5">
          <el-button
            class="el_btn_two"
            @click="someDelete('所选')"
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
          ref="amdinTables"
          border
          :data="tableData"
          style="width: 100%"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" :selectable="checkSelectable"> </el-table-column>
          <el-table-column type="index" label="序号" :index="indexMethod"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="roleName" label="角色"> </el-table-column>
          <el-table-column prop="phone" :label="fid40104.fieldName"> </el-table-column>
          <el-table-column prop="passport" label="登录账号"> </el-table-column>
          <el-table-column prop="accountState" label="账号状态">
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
              <span v-if="!power7&&!power8&&!power9">暂无权限</span>
              <el-button v-if="power7" @click="toDetail(scope.row)" type="text" size="small"
                >编辑</el-button
              >
              <el-button v-if="power8 && (scope.row.passport != 'administrator' && scope.row.passport != 'jiankong' )" type="text" size="small" @click="onesStop(scope.row)"
                >{{ scope.row.accountState ? "停用" : "启用" }}</el-button
              >
              <el-button v-if="power8 && (scope.row.passport == 'administrator' || scope.row.passport == 'jiankong')" type="text" disabled size="small"
                >停用</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="singleDelete(scope.row)"
                v-if="power9 && (scope.row.passport != 'administrator' && scope.row.passport != 'jiankong' )"
                >删除</el-button
              >
              <el-button
                type="text"
                size="small"
                disabled
                v-if="power9 && (scope.row.passport == 'administrator' || scope.row.passport == 'jiankong')"
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
      <el-form ref="onesAdminForm" :model="onesForm">
        <el-form-item required :label="fid40201.fieldName + ':'">
          <div class="users_stop users_stop_one">
            <ul>
              <li v-for="item in onesList" :key="item.passport">{{item.name}}</li>
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
      <el-form ref="stopAdminForm" :model="stopForm">
        <el-form-item required :label="fid40201.fieldName + ':'">
          <div class="users_stop">
            <ul>
              <li v-for="item in checkList" :key="item.passport">{{item.name}}<span v-if="allowDelFlag" @click="delCheck(item)">X</span></li>
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
        <el-form-item required :label="fid40301.fieldName + ':'">
          <div class="users_stop">
            <ul>
              <li v-for="item in checkList" :key="item.passport">{{item.name}}<span v-if="allowDelFlag" @click="delCheck(item)">X</span></li>
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
      roleList: [],
      formSearch: {
        name: "",
        roleId: "",
        passport: ""
      },
      tableData: [],
      checkList: [],
      dialogSomeStop: false,
      dialogOnesStop: false,
      dialogSetPass: false,
      treeLabel: '',
      stopForm: {
        name: '',
        frameAuthNotice: ''
      },
      onesForm: {
        passport: '',
        accountState: ''
      },
      setpassForm: {
        name: '',
        frameAuthNotice: ''
      },
      treeData: [],
      allowDelFlag: true,
      oneStopFlage: false,
      onesList: [],
      handlerType: 2,
      fid40201: {
        enable: 1,
        fieldId: 40201,
        fieldName: "已选人员",
        fieldType: "特殊字段",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 1
      },
      fid40301: {
        enable: 1,
        fieldId: 40301,
        fieldName: "已选人员",
        fieldType: "特殊字段",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid40104: {
        enable: 1,
        fieldId: 40104,
        fieldName: "手机号码",
        fieldType: "单行文本",
        ifDelete: 1,
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
    this.getList(1);
    this.getRoles()
  },
  methods: {
    checkSelectable(row) {
      return row.passport != 'administrator' || row.passport != 'jiankong'
    },
    fieldData () {
      let that = this;
      var param = {
        fieldId: 40000
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
                if (datas[i].fieldId == 40201) {
                  this.fid40201 = datas[i]
                }
                if (datas[i].fieldId == 40301) {
                  this.fid40301 = datas[i]
                }
                if (datas[i].fieldId == 40104) {
                  this.fid40104 = datas[i]
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
    // 获取角色列表
    getRoles() {
      let that = this;
      this.$http
        .get(Url + "/aimw/role/listRolesInfo")
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data) {
              this.roleList = data.data.results
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    roleChange(value) {
      let roleRow = {}
      console.log(value)
      roleRow = this.roleList.find((item) => {
        return item.roleID === value
      })
      console.log(roleRow)
      if (roleRow) {
        this.importRoleName = roleRow.roleName
      }
    },
    indexMethod(index) {
      let that = this;
      return index + 1 + that.limit * (this.currentPage - 1);
    },
    powerData() {
      let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
      this.power1 = power.includes(50301); // 管理员管理--新增管理员
      this.power2 = power.includes(50302); // 管理员管理--导入
      this.power3 = power.includes(50303); // 管理员管理--导出
      this.power4 = power.includes(50304); // 管理员管理--批量启用/停用
      this.power5 = power.includes(50305); // 管理员管理--批量删除
      this.power6 = power.includes(50306); // 管理员管理--重置密码
      this.power7 = power.includes(50307); // 管理员管理--编辑
      this.power8 = power.includes(50308); // 管理员管理--启用/停用
      this.power9 = power.includes(50309); // 管理员管理--删除
    },
    switchStatus(data) {
      let status = -1
      if (data.accountState) {
        status = 1
      } else {
        status = 2
      }
      let param = {
        passport: data.passport,
        accountState: status
      };
      this.$http
        .put(Url + "/aimw/teacher/updateUserStatus", param)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("修改成功！")
          }
          let data = res.data.data;
        });
    },
    toDetail(data) {
      localStorage.setItem("adminDetail", JSON.stringify(data));
      this.$router.push({
        name: "detailadmin",
        params: { userID: data.passport }
      });
    },
    // 新增管理员
    addAdmin() {
      this.$router.push({
        name: "addadmin"
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
        .put(Url + "/aimw/manager/updateUserState", param)
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
          message: "没有选择要停用的管理员!"
        });
        return false;
      }
      var checkArr = [];
      // for (let i in this.checkList) {
      //   if (this.checkList[i].passport == "administrator") {
      //     this.$message.warning(this.checkList[i].name + '不允许进行该操作')
      //     this.checkList.splice(i, 1)
      //   }
      // }
      for (let i in this.checkList) {
        checkArr.push(this.checkList[i]);
      }
      console.log(checkArr)
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
        .put(Url + "/aimw/manager/stopUsersAccount", checkArr)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogSomeStop = false
            this.getList(this.currentPage)
            this.$refs.amdinTables.clearSelection();
            this.$message.success('批量停用成功！');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 密码重置
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
    passStop() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要重置密码的管理员!"
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
      that.$http.put(Url + "/aimw/manager/initUserPwd", checkArr).then(res => {
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
            message: "密码修改失败!"
          });
        }
      });
    },
    delCheck(data) {
      let newCheck = []
      for (let i in this.checkList) {
        if (this.checkList[i].id != data.id) {
          newCheck.push(this.checkList[i])
        }
      }
      this.checkList = newCheck
      this.$refs.amdinTables.toggleRowSelection(data);
      if (this.checkList.length < 2) {
        this.allowDelFlag = false
      } else {
        this.allowDelFlag = true
      }
    },
    tabChange(type) {
      this.tabActive = type;
    },
    handleSelectionChange(val) {
      this.checkList = val;
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
    },
    onSubmit() {
      this.getList(1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList(1);
    },

    // 批量删除
    someDelete() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要删除的管理员!"
        });
        return false;
      }
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push({ passport: this.checkList[i].passport });
      }
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除所选管理员？</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          this.$http
            .delete(Url + "/aimw/manager/deleteManagers", {
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
        .catch((res) => {
          console.log(res)
        });
    },
    // 单个删除
    singleDelete(row) {
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除当前管理员？</p><p class="con_p2">删除后不可恢复</p></div>',
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
            .delete(Url + "/aimw/manager/deleteManagers", {
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
        .catch((res) => {
          console.log(res)
        });
    },
    // 导入
    batchAdmin() {
      this.$router.push({
        name: "batchadmin"
      });
    },
    // 导出
    someExport() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要导出的管理员!"
        });
        return false;
      }
      this.download()
    },
    download() {
      const content = [...this.checkList];
      import("@/excel/Export2Excel").then(excel => {
        const tHeader = ["姓名", "角色", this.fid40104.fieldName, "登录账号", "状态"];
        const filterVal = ["name", "roleName", "phone", "passport", "accountStateStr"];
        const content = this.checkList
        for (let i in content) {
          if (content[i].accountState == 1) {
            content[i].accountStateStr = "在用"
          } else if (content[i].accountState == 0) {
            content[i].accountStateStr = "停用"
          }
        }
        const data = this.formatJson(filterVal, content);
        excel.export_json_to_excel(tHeader, data, "管理员列表");
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
      this.$refs.amdinTables.clearSelection();
    },
    // 获取管理员列表
    getList(page) {
      let that = this;
      that.currentPage = page
      var param = {
        currentPage: page,
        pageSize: that.limit,
        name: that.formSearch.name,
        passport: that.formSearch.passport,
        roleId: that.formSearch.roleId
      };
      this.$http
        .get(Url + "/aimw/manager/listManagersInfo", {
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
    }
  }
};
</script>

<style lang="less">
.admins_wrap {
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
        col:nth-child(5) {
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
  // 修改密码
  .fix_pass {
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
}
</style>
