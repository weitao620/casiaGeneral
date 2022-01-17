<template>
  <div class="field_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>字段管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="tables_box">
      <div class="search_title center_o_title">
        字段设置
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
      <template v-if="dataList.length > 0">
        <el-table
          border
          :data="dataList"
          :span-method="objectSpanMethod"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="model" label=""></el-table-column>
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="fieldName" label="字段名称"></el-table-column>
          <el-table-column prop="fieldType" label="字段类型"></el-table-column>
          <el-table-column prop="enable" label="状态">
            <template slot-scope="scope">
              <div class="naturalize" v-if="scope.row.enable == 0 && scope.row.required == 0 && scope.row.ifEnable == 0 && scope.row.ifRequired == 0">
                <span>/</span>
              </div>
              <div class="naturalize" v-else>
                <img v-if="scope.row.enable" src="../../assets/images/update.jpg" alt="">
                <img v-else src="../../assets/images/stops.jpg" alt="">
                <span>{{ scope.row.enable == 1 ? "启用" : "停用" }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="required" label="必填">
            <template slot-scope="scope">
              <div class="naturalize" v-if="scope.row.enable == 0 && scope.row.required == 0 && scope.row.ifEnable == 0 && scope.row.ifRequired == 0">
                <span>/</span>
              </div>
              <div class="naturalize" v-else>
                <span style="color:#FE5FB8;margin-right: 0.04rem;margin-top: 0.05rem;" v-if="scope.row.required == 1">*</span>
                <span>{{ scope.row.required == 1 ? "必填" : "非必填" }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="fixField(scope.row)"
                type="text"
                size="small"
                :disabled="scope.row.ifModify == 0"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog
      class="dialog_field"
      :close-on-click-modal="false"
      title="编辑字段"
      :visible.sync="dialogField"
    >
      <el-form :model="fieldForm">
        <el-form-item required label="显示名称:">
          <el-input
            v-model="fieldForm.fieldName"
            placeholder="请输入字段名称"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!(fieldForm.enable == 0 && fieldForm.required == 0 && ifEnable == 0 && ifRequired == 0)" label="状态:">
          <el-radio-group :disabled="ifEnable == 0" v-model="fieldForm.enable">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="!(fieldForm.enable == 0 && fieldForm.required == 0 && ifEnable == 0 && ifRequired == 0)" label="是否必填:">
          <el-radio-group :disabled="ifRequired == 0" v-model="fieldForm.required">
            <el-radio :label="1">是&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
            <el-radio :label="0">否&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogField = false">取 消</el-button>
        <el-button type="primary" @click="fieldSubmit">确 定</el-button>
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

      dialogAddRole: false,
      roleForm: {
        roleID: "",
        name: "",
        roleAuthNotice: "",
        enable: "",
        roleAuthID: "",
        inheritRoleID: "",
        remark: "",
        copy: false,
        role: ""
      },
      limit: 10,
      total: 0,
      pageNum: 1,
      currentPage: 1,
      listData: [],
      checkList: [],
      powerActive: 10000,
      tabList: [
        {
          type: 10000,
          name: "基础设置"
        },
        {
          type: 20000,
          name: "组织架构"
        },
        {
          type: 30000,
          name: "用户设置"
        },
        {
          type: 40000,
          name: "管理员设置"
        }
      ],
      dataList: [], // 当前展示的数据
      dialogField: false,
      fieldForm: {
        fieldName: "",
        enable: "",
        required: "0"
      },
      ifEnable: 1,
      ifRequired: 1
    };
  },
  created() {

  },
  mounted() {
    this.getInit();
    this.getList();
  },
  methods: {
    fixField(data) {
      this.ifEnable = data.ifEnable
      this.ifRequired = data.ifRequired
      this.fieldForm = {
        fieldId: data.fieldId,
        fieldName: data.fieldName,
        enable: data.enable,
        required: data.required
      };
      this.dialogField = true;
    },
    fieldSubmit() {
      let param = {
        fieldId: this.fieldForm.fieldId,
        fieldName: this.fieldForm.fieldName,
        enable: this.fieldForm.enable,
        required: this.fieldForm.required
      }
      this.$http
        .put(Url + "/aimw/field/updateFieldInfo", param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogField = false;
            this.getList()
            this.$message.success("更新成功！");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return this.ret(row, "firstSpan");
      }
    },
    ret(row, obj) {
      if (row && row[obj] != 0) {
        return {
          rowspan: row[obj],
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    },
    computeFirstSpan(firstObj) {
      for (let obj in firstObj) {
        let fristData = this.dataList.filter(d => d.fieldId === firstObj[obj][0])[0];
        if (fristData) fristData["firstSpan"] = firstObj[obj].length;
      }
    },
    computeSecondSpan(modelList, secondObj) {
      let secondList = [];
      for (let obj in secondObj) {
        let secondIds = secondObj[obj].filter(val => {
          return modelList.indexOf(val) > -1;
        });
        let fristData = this.dataList.filter(d => d.fieldId === secondIds[0])[0];
      }
    },
    buildMerge(dataList) {
      let firstObj = {};
      let secondObj = {};
      let firstObjKey = "";
      for (let i = 0, len = dataList.length; i < len; i++) {
        firstObjKey = dataList[i].model;
        if (!firstObj[firstObjKey]) {
          firstObj[firstObjKey] = new Array(dataList[i].fieldId);
        } else {
          firstObj[firstObjKey].push(dataList[i].fieldId);
        }
      }
      this.computeFirstSpan(firstObj);
    },
    powerTab(value) {
      this.powerActive = value;
      this.getList()
    },
    indexMethod(index) {
      let that = this;
      return index + 1 + that.limit * (this.currentPage - 1);
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
    getList() {
      let that = this;
      var param = {
        fieldId: this.powerActive
      };
      that.$http
        .get(Url + "/aimw/field/listFieldInfo", {
          params: param
        })
        .then(res => {
          let datas = res.data.data;
          if (res.data.code == 0) {
            if (datas) {
              var model = datas[0].fieldName;
              var in1 = 1
              datas.forEach((item, index) => {
                in1 = Number(index) + 1;
                let data0 = String(item.fieldId).substring(0, 3);
                if (datas[in1]) {
                  let data1 = String(datas[in1].fieldId).substring(0, 3);
                  if (in1 > datas.length + 1) {
                  } else {
                    item.model = model
                    if (data0 != data1) {
                      model = datas[in1].fieldName
                    } else {
                    }
                  }
                } else {
                  datas[index].model = datas[index - 1].model
                }
              });
              let newList = []
              for (let k in datas) {
                datas[k].fieldId = String(datas[k].fieldId)
                if (!((datas[k].model == datas[k].fieldName) && datas[k].fieldType == '')) {
                  newList.push(datas[k])
                }
              }
              this.dataList = newList
              this.buildMerge(this.dataList);
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
    enableChange(row) {
      var that = this;
      var param = {};
      var path = "/aimw/role/updateRoleInfo";
      param = {
        roleID: row.roleID,
        roleName: row.roleName,
        roleAuthNotice: row.roleAuthNotice,
        inheritRoleID: row.inheritRoleID
      };
      if (row.enable) {
        param.enable = 1;
      } else {
        param.enable = 0;
      }
      that.$http
        .put(Url + path, param)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.dialogAddRole = false;
            this.resetForm("roleForm");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 批量删除
    someDelete() {
      if (this.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "没有选择要删除的字段!"
        });
        return false;
      }
      var checkArr = [];
      for (let i in this.checkList) {
        checkArr.push({ passport: this.checkList[i].id });
      }
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除所选字段？</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          this.$http
            .delete(Url + "/aimw/teacher/deleteTeachers", {
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
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 单个删除
    singleDelete(row) {
      this.$confirm(
        '<div class="confirm_box"><p>确定要删除当前字段？</p><p class="con_p2">删除后不可恢复</p></div>',
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(() => {
          var checkArr = [{ passport: row.passport }];
          this.$http
            .delete(Url + "/aimw/teacher/deleteTeachers", {
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
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      this.checkList = val;
    },
    sortChange(e) {

    }
  }
};
</script>

<style lang="less">
.field_wrap {
  text-align: left;
  margin: 0 0.22rem;
  // 公共页面顶部标题 样式在 base.less 里
  // .com_title

  // 表格
  .tables_box {
    margin: 0.2rem 0;
    background: #ffffff;
    box-shadow: 0 0.04rem 0.4rem 0 rgba(47, 65, 110, 0.08);
    border-radius: 0.04rem;
    padding: 0.2rem 0.24rem;
    position: relative;
    // 公共带圈的标题 样式在 base.less 里
    // .search_title、.center_o_title

    // 表格上面的操作按钮
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

    // 表格样式
    .el-table {
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
      .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
        color: #C0C4CC !important;
      }
    }
  }
  //修改密码
  .dialog_field {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dialog {
      width: 5.4rem;
      overflow: hidden;
      height: auto;
      margin: 0 auto !important;
    }
  }
}
</style>
