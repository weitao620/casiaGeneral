<template>
  <div class="add_user_wrap">
    <div class="com_title">
      <div class="c_titles">
        <div class="com_cir">
          <img src="../../assets/images/index_top.png" alt="" />
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/library/user' }"
            >用户管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="person_main">
      <div class="person_box">
        <el-form
          label-position="right"
          class="person_contain"
          label-width="1.4rem"
          :model="formAddUser"
        >
          <div class="person_msg">
            <img src="../../assets/images/personMsg.png" alt="" />
            基础信息
          </div>
          <el-form-item v-if="fid30203.enable == 1" :required="fid30203.required == 1" :label="fid30203.fieldName + '：'">
            <el-input
              v-model="formAddUser.name"
              :placeholder="'请输入' + fid30203.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="nameFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请输入{{fid30203.fieldName}}
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid30201.enable == 1" :required="fid30201.required == 1" :label="fid30201.fieldName + '：'">
            <el-input
              disabled
              v-model="formAddUser.passport"
              :placeholder="'请输入' + fid30201.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="passportFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请输入{{fid30201.fieldName}}且只能包含数字、字母的6~20位字符
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid30202.enable == 1" :required="fid30202.required == 1" :label="fid30202.fieldName + '：'">
            <el-input
              style="width:1.4rem"
              type="password"
              @input="newChange"
              @focus="newFcous"
              @blur="newBlur"
              v-model="formAddUser.password"
              placeholder="手动设置密码"
            ></el-input>
            <div style="margin-left:0.1rem">
              <el-radio-group v-model="singleBtn">
                <el-radio
                  :label="1"
                  :disabled="!singleBtn"
                  @click.native.prevent="singleChange(1)"
                  >默认密码:{{fid30201.fieldName}}后6位</el-radio
                >
              </el-radio-group>
            </div>
            <div class="tip_left" style="width:3.48rem" v-show="newPassFlag">
              <div class="tip_msg">
                <img v-if="newRight1" src="../../assets/images/ok.png" alt="" />
                <img v-else src="../../assets/images/x.png" alt="" />
                6-20个字符
              </div>
              <div class="tip_msg">
                <img v-if="newRight2" src="../../assets/images/ok.png" alt="" />
                <img v-else src="../../assets/images/x.png" alt="" />
                只能包含字母、数字组合以及标点符号（除空格）
              </div>
              <div class="tip_msg">
                <img v-if="newRight3" src="../../assets/images/ok.png" alt="" />
                <img v-else src="../../assets/images/x.png" alt="" />
                字母、数字和标点符合至少包含2种
              </div>
            </div>
          </el-form-item>
          
          <el-form-item v-if="fid30204.enable == 1" :required="fid30204.required == 1" :label="fid30204.fieldName + '：'">
            <el-radio-group v-model="formAddUser.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="fid30210.enable == 1" :required="fid30210.required == 1" :label="fid30210.fieldName + '：'">
            <el-date-picker
              v-model="formAddUser.birth"
              type="date"
              :placeholder="'请选择'+ fid30210.fieldName"
              format="yyyy年MM月dd日"
              :editable="false"
              :clearable="false"
            >
            </el-date-picker>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="birthFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请选择{{fid30210.fieldName}}
              </div>
            </div>
          </el-form-item>
          <!-- <el-form-item v-if="fid30205.enable == 1" :required="fid30205.required == 1" :label="fid30205.fieldName + '：'">
            <el-input
              v-model="formAddUser.phone"
              :placeholder="'请输入' + fid30205.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="phoneFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid30205.fieldName}}不能为空 / 格式有误
              </div>
            </div>
          </el-form-item> -->
          <el-form-item v-if="fid30206.enable == 1" :required="fid30206.required == 1" :label="fid30206.fieldName + '：'">
            <el-input
              v-model="formAddUser.email"
              :placeholder="'请输入' + fid30206.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="emailFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid30206.fieldName}}不能为空 / 格式有误
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid30207.enable == 1" :required="fid30207.required == 1" :label="fid30207.fieldName + '：'">
            <el-select v-model="formAddUser.department" :placeholder="'请选择' + fid30207.fieldName">
              <el-option v-for="item in studyList" :key="item.Pid" :label="item.Name" :value="item.Pid"></el-option>
            </el-select>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="frameFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                请选择{{fid30207.fieldName}}
              </div>
            </div>
          </el-form-item>
          <div class="person_msg">
            <img src="../../assets/images/personMsg.png" alt="" />
            辅助信息
          </div>
          <el-form-item v-if="fid30208.enable == 1" :required="fid30208.required == 1" :label="fid30208.fieldName + '：'">
            <el-input
              v-model="formAddUser.jobNumber"
              :placeholder="'请输入' + fid30208.fieldName"
            ></el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="jobFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid30208.fieldName}}不能为空
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="fid30209.enable == 1" :required="fid30209.required == 1" :label="fid30209.fieldName + '：'">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="formAddUser.remark"
              maxlength="200"
              show-word-limit
            >
            </el-input>
            <div style="width:4rem;height:0.36rem"></div>
            <div class="tip_left" v-show="remarkFlag">
              <div class="tip_msg">
                <img src="../../assets/images/x.png" alt="" />
                {{fid30209.fieldName}}不能为空
              </div>
            </div>
          </el-form-item>
          <el-form-item class="sub_center">
            <el-button type="primary" @click="addSubmit">保存</el-button>
            <el-button type="primary" class="resets" @click="goBack"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Url from "@/assets/js/url.js";
export default {
  name: "person",
  data() {
    return {
      singleBtn: 1,
      newPassFlag: false,
      newRight1: false,
      newRight2: false,
      newRight3: false,
      // 所属部门
      frameTree: [], // 树结构
      treeLabel: "",
      frameFlag: false,
      department: "",
      departmentName: "",
      defaultProps: {
        children: "list",
        label: "Name"
      },
      // 验证信息
      passportFlag: false,
      passwordFlag: false,
      nameFlag: false,
      phoneFlag: false,
      birthFlag: false,
      emailFlag: false,
      jobFlag: false,
      remarkFlag: false,
      // 表单
      formAddUser: {
        passport: "", // 登录账号
        password: "", // 登录密码
        name: "", // 用户姓名
        gender: 1, // 性别
        phone: "", // 手机号
        birth: "", // 出生日期
        email: "", // 邮箱地址
        department: "", // 所属部门ID
        departmentName: "", // 所属部门名称
        jobNumber: "", // 工号
        remark: "", // 备注
        headIcon: "" // 头像
      },
      diaLogForm: {
        file: "",
        imgBase64: ""
      },
      headIcons: "",
      studyList: [],
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
      fid30202: {
        enable: 1,
        fieldId: 30202,
        fieldName: "登录密码",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 0,
        ifRequired: 0,
        required: 1
      },
      fid30203: {
        enable: 1,
        fieldId: 30203,
        fieldName: "用户姓名",
        fieldType: "单行文本",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 1
      },
      fid30204: {
        enable: 1,
        fieldId: 30204,
        fieldName: "用户性别",
        fieldType: "单选",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
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
      fid30206: {
        enable: 1,
        fieldId: 30206,
        fieldName: "邮箱地址",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 0
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
      },
      fid30208: {
        enable: 1,
        fieldId: 30208,
        fieldName: "工号",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid30209: {
        enable: 1,
        fieldId: 30209,
        fieldName: "备注信息",
        fieldType: "单行文本",
        ifDelete: 1,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 1,
        required: 0
      },
      fid30210: {
        enable: 1,
        fieldId: 30210,
        fieldName: "出生日期",
        fieldType: "筛选框",
        ifDelete: 0,
        ifEnable: 0,
        ifModify: 1,
        ifRequired: 0,
        required: 1
      }
    };
  },
  created() {

  },
  mounted() {
    this.fieldData()
    this.passport = this.$route.params.userID;
    this.addChange();
    this.getInfo()
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
                if (datas[i].fieldId == 30201) {
                  this.fid30201 = datas[i]
                }
                if (datas[i].fieldId == 30202) {
                  this.fid30202 = datas[i]
                }
                if (datas[i].fieldId == 30203) {
                  this.fid30203 = datas[i]
                }
                if (datas[i].fieldId == 30204) {
                  this.fid30204 = datas[i]
                }
                
                if (datas[i].fieldId == 30210) {
                  this.fid30210 = datas[i]
                }
                if (datas[i].fieldId == 30206) {
                  this.fid30206 = datas[i]
                }
                if (datas[i].fieldId == 30207) {
                  this.fid30207 = datas[i]
                }
                if (datas[i].fieldId == 30208) {
                  this.fid30208 = datas[i]
                }
                if (datas[i].fieldId == 30209) {
                  this.fid30209 = datas[i]
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
    getInfo() {
      let that = this;
      that.$http
        .get(Url + "/aimw/user/getUserInfo", {
          params: {
            passport: that.passport
          }
        })
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            if (data.data.password != '') {
              this.singleBtn = false
            } else {
              this.singleBtn = 1
            }
            if (data.data.department == 0) {
              data.data.department = ''
            }
            this.treeLabel = data.data.departmentName
            if (this.fid30201.enable == 1) {
              this.formAddUser.passport = data.data.passport
            }
            if (this.fid30202.enable == 1) {
              this.formAddUser.password = data.data.password
            }
            if (this.fid30203.enable == 1) {
              this.formAddUser.name = data.data.name
            }
            if (this.fid30204.enable == 1) {
              this.formAddUser.gender = data.data.gender
            }
            
            if (this.fid30210.enable == 1) {
              this.formAddUser.birth = data.data.birth
            }
            if (this.fid30206.enable == 1) {
              this.formAddUser.email = data.data.email
            }
            if (this.fid30207.enable == 1) {
              this.formAddUser.department = data.data.department
              this.formAddUser.departmentName = data.data.departmentName
            }
            if (this.fid30208.enable == 1) {
              this.formAddUser.jobNumber = data.data.jobNumber
            }
            if (this.fid30209.enable == 1) {
              this.formAddUser.remark = data.data.remark
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 密码修改 -- 验证新密码
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
    // 密码修改 -- 新密码获得焦点时
    newFcous(val) {
      this.singleBtn = false;
      this.newPassFlag = true;
      this.twoPassFlag = false;
    },
    // 密码修改 -- 新密码失去焦点时
    newBlur(val) {
      if (this.formAddUser.password == "") {
        this.singleBtn = 1;
      }
      var value = this.formAddUser.password;
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
    },
    singleChange(txt) {
      this.singleBtn ? (this.singleBtn = false) : (this.singleBtn = txt);
      this.formAddUser.password = "";
      this.newRight1 = false;
      this.newRight2 = false;
      this.newRight3 = false;
      if (this.singleBtn) {
        this.newPassFlag = false;
      } else {
        this.newPassFlag = true;
      }
    },
    // 所属部门
    // 获取所属部门树结构
    addChange() {
      let that = this;
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
              let schoolOrg = JSON.parse(data.data).organization;
              this.studyList = []
              this.recursiveFunction2(schoolOrg)
              this.studyList.sort((a, b) => {
                return Number(a.Pid) - Number(b.Pid);
              });
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
    clearTree() {
      this.formAddUser.department = ''
      this.formAddUser.departmentName = ''
      this.$refs.editUserTree0.setCurrentKey(null);
    },
    clean() {
      this.formAddUser.department = ''
      this.formAddUser.departmentName = ''
      this.$refs.editUserTree0.setCurrentKey(null);
      this.treeLabel = null;
    },
    frameClick(data, node) {
      this.treeLabel = node.label;
      this.formAddUser.department = data.Pid;
      this.formAddUser.departmentName = data.Name;
      this.$refs.editUserTree1.blur();
    },
    // 更换头像
    clearFiles() {
      this.$refs["imgUserUpload"].clearFiles();
    },
    // 图片选择后 保存在 diaLogForm.imgBroadcastList 对象中
    imgBroadcastChange(file, fileList) {
      if (file.size > 512000) {
        this.$message.error("上传的头像太大，建议500KB以下");
        this.clearFiles();
        return false;
      }
      this.diaLogForm.file = file;
      this.uploadImgToBase64(file.raw);
    },
    uploadImgToBase64(file) {
      let that = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        that.diaLogForm.imgBase64 = this.result;
        that.formAddUser.headIcon = this.result;
        that.headIcons = this.result;
      };
    },
    // 新增用户提交
    addSubmit() {
      let that = this;
      this.passportFlag = this.passwordFlag = this.nameFlag = this.phoneFlag = this.birthFlag = this.emailFlag = this.jobFlag = this.remarkFlag = this.frameFlag = false;
      var regp = /^1[3456789]\d{9}$/;
      var regzh = /^[A-Za-z0-9]{6,20}$/;
      var rege = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.fid30201.enable == 1 && this.fid30201.required == 1 && (this.formAddUser.passport == "" || !regzh.test(this.formAddUser.passport))) {
        this.passportFlag = true;
        return false;
      }
      if (this.singleBtn) {

      } else {
        if (!this.newPassFlag) {

        } else {
          if (this.fid30202.enable == 1 && this.fid30202.required == 1) {
            this.newPassFlag = true;
            return false;
          }
        }
      }
      if (this.fid30203.enable == 1 && this.fid30203.required == 1 && this.formAddUser.name == "") {
        this.nameFlag = true;
        return false;
      }
      // if (this.fid30205.enable == 1 && this.fid30205.required == 1 && ((this.formAddUser.phone != "" && !regp.test(this.formAddUser.phone)) || this.formAddUser.phone == "")) {
      //   this.phoneFlag = true;
      //   return false;
      // }
      if (this.fid30210.enable == 1 && this.fid30210.required == 1 && this.formAddUser.birth == "") {
        this.birthFlag = true;
        return false;
      }
      if (this.fid30206.enable == 1 && this.fid30206.required == 1 && ((this.formAddUser.email != "" && !rege.test(this.formAddUser.email)) || this.formAddUser.email == "")) {
        this.emailFlag = true;
        return false;
      }
      if (this.fid30207.enable == 1 && this.fid30207.required == 1 && this.formAddUser.department == "") {
        this.frameFlag = true;
        return false;
      }
      if (this.fid30207.enable == 1) {
        for (let i in this.studyList) {
          if (this.studyList[i].Pid == this.formAddUser.department) {
            this.formAddUser.departmentName = this.studyList[i].Name
          }
        }
      } else {
        this.formAddUser.departmentName = ''
      }
      if (this.fid30208.enable == 1 && this.fid30208.required == 1 && this.formAddUser.jobNumber == "") {
        this.jobFlag = true;
        return false;
      }
      if (this.fid30209.enable == 1 && this.fid30209.required == 1 && this.formAddUser.remark == "") {
        this.remarkFlag = true;
        return false;
      }
      if (this.formAddUser.password == '') {
        this.formAddUser.password = this.formAddUser.passport.substring(this.formAddUser.passport.length - 6, this.formAddUser.passport.length)
      }
      console.log(this.formAddUser)
      
      // return
      let birth = ''
      if (String(this.formAddUser.birth).indexOf('-') == -1) {
        birth = this.formTimes(this.formAddUser.birth)
        this.formAddUser.birth = birth
      }
      that.$http
        .put(Url + "/aimw/user/updateUserInfo", this.formAddUser)
        .then(res => {
          var data = res.data;
          if (data.code == 0) {
            this.$router.push({
              path: "/library/user"
            });
            this.$message.success('更新成功！');
          } else {
            this.$message.error('更新失败！');
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    formTimes(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      // var h = date.getHours();
      // h = h < 10 ? "0" + h : h;
      // var minute = date.getMinutes();
      // minute = minute < 10 ? "0" + minute : minute;
      // var second = date.getSeconds();
      // second = second < 10 ? "0" + second : second;
      // + ' ' + h + ':' + minute + ':' + second
      return y + "-" + m + "-" + d;
    },
    // 返回
    goBack() {
      this.$router.push({
        path: "/library/user"
      });
    }
  }
};
</script>

<style lang="less">
.add_user_wrap {
  text-align: left;
  margin: 0 0.22rem;
  // 主要内容区
  .person_main {
    background: #ffffff;
    box-shadow: 0px 4px 40px 0px rgba(47, 65, 110, 0.08);
    border-radius: 4px;
    padding: 0.26rem 0.4rem 0.4rem;
    margin-bottom: 0.22rem;
    .person_box {
      width: 12.6rem;
      margin: 0 auto;
      padding-left: 3.3rem;
      position: relative;
      // 左边头像
      .s_logo {
        position: absolute;
        left: 1.8rem;
        top: 0;
        width: 1.4rem;
        .school_logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 0.23rem;
          width: 1.4rem;
          height: 1.4rem;
          background: #ffffff;
          box-shadow: 0px 2px 16px 0px rgba(42, 150, 236, 0.27);
          border-radius: 50%;
          .s_logo_bg {
            width: 1.4rem;
            height: 1.4rem;
            background: linear-gradient(0deg, #c4ecff, #97cdff);
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 1.46rem;
              height: 1.46rem;
            }
          }
        }
        .el-button {
          display: block;
          margin: 0 auto;
          width: 1.4rem;
          padding: 0.09rem 0.1rem;
        }
      }
      /*左三角*/
      .tip_left {
        position: absolute;
        left: 3.6rem;
        top: 0;
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
        left: -0.13rem;
        top: 0.12rem;
        border-style: dashed solid solid dashed;
        border-color: transparent #e1e9ff transparent transparent;
        font-size: 0;
        line-height: 0;
      }

      .tip_left::after  {
        left: -0.11rem;
        border-color: transparent #fff transparent transparent;
      }
      .tip_msg {
        font-size: 0.14rem;
        img {
          width: 0.12rem;
          height: 0.12rem;
        }
      }
      // 表单
      .person_contain {
        .person_msg {
          width: 4.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.2rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #354b70;
          margin: 0.2rem 0;
          img {
            width: 0.38rem;
            height: 0.38rem;
            margin-right: 0.07rem;
          }
        }
        .address-select-list {
          display: flex;
          .el-select {
            width: 100%;
            margin-right: 0.1rem;
          }
          .el-select:last-child {
            margin-right: 0;
          }
          .el-input__suffix {
            right: 0.05rem;
          }
          .el-select__caret {
            font-size: 0.14rem;
          }
          .el-input__icon {
            width: 0.25rem;
            line-height: 0.36rem;
          }
        }
        .type-select-list {
          .el-select {
            width: 100%;
          }
        }
        .el-radio {
          line-height: 0.24rem;
          display: flex;
          align-items: center;
        }
        .el-radio__label {
          font-size: 0.16rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #7786ac;
          padding-left: 0.06rem;
        }
        .el-radio__inner {
          width: 0.2rem;
          height: 0.2rem;
        }
        .el-radio__inner::after {
          width: 0.08rem;
          height: 0.08rem;
        }
        .el-textarea__inner {
          font-size: 0.16rem;
        }
      }
      .el-input {
        height: 0.36rem;
        width: 3.5rem;
      }
      .el-form-item__label {
        font-size: 0.16rem;
        line-height: 0.36rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #7786ac;
        padding-right: 0;
      }
      .el-form-item__content {
        line-height: 0.36rem;
        display: flex;
        .el-radio-group {
          height: 0.36rem;
          display: flex;
          align-items: center;
        }
        .el-textarea {
          width: 3.5rem;
        }
        .el-input--prefix .el-input__inner{
          padding-left: 0.3rem;
        }
        .el-input--suffix .el-input__inner{
          padding-right: 0.3rem;
        }
      }
      .el-input__inner {
        height: 0.36rem;
        line-height: 0.36rem;
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #354b70;
      }
      .el-input__inner:focus {
        border-color: #39a1fe;
      }
      .el-button {
        border: 0.01rem solid #dcdfe6;
        padding: 0.09rem 0.27rem;
        font-size: 0.16rem;
        border-radius: 4px;
        background: linear-gradient(263deg, #0075ff, #00c2ff);
        box-shadow: 0px 3px 18px 0px rgba(62, 150, 253, 0.19);
      }
      .el-button.resets {
        margin-left: 0.38rem;
        background: linear-gradient(261deg, #b8d5f5, #8fb1d7);
        box-shadow: 0px 2px 10px 0px rgba(171, 196, 227, 0.45);
      }
    }
  }
  .sub_center {
    width: 4.9rem;
    display: flex;
    justify-content: center;
    .el-form-item__content {
      margin-left: 0 !important;
      text-align: center;
    }
  }
}
</style>
