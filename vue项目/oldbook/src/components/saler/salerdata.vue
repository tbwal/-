<template>
  <div>
    <el-descriptions title="我的信息">
      <el-descriptions-item label="账号"
        >{{ persondata.id }}
      </el-descriptions-item>
      <el-descriptions-item label="姓名">{{
        persondata.name
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{
        persondata.sex
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        persondata.phonenumber
      }}</el-descriptions-item>
      <el-descriptions-item label="用户类型">
        <el-tag size="small">{{ $cookies.get("user_type")=='saler'?'卖家':'买家' }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="发货地址">{{
        persondata.address
      }}</el-descriptions-item>
      <el-descriptions-item label="自我介绍">{{
        persondata.introduce
      }}</el-descriptions-item>
    </el-descriptions>
    <p class="edit-title">请选择你要修改的信息</p>
    <el-select style="margin-left: 5%" v-model="options2" multiple>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button
      class="edit-btn"
      @click="showEdit"
      type="primary"
      icon="el-icon-edit"
      circle
    ></el-button>
    <el-form
      style="float: right"
      ref="editDetail"
      :model="editDetail"
      label-width="80px"
    >
      <div v-for="(value, key, index) in editDetail" :key="index">
        <div v-if="isTrue[index].flag">
          <el-form-item :label="options[index].label">
            <el-input
              @input="inputChange($event)"
              v-model="editDetail[key]"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <el-button
        @click="editSelect"
        class="submit-btn"
        v-if="getSubmit"
        type="primary"
        plain
        >提交</el-button
      >
    </el-form>
    <!-- <div v-if="isEditPassword" class="pwdForm">
      <div>密码：<el-input v-model="password" show-password></el-input></div>
      <div style="margin-top: 4vh">
        确认：<el-input
          v-model="password2"
          placeholder="请再输入一次密码"
          show-password
        ></el-input>
      </div>
      <el-button @click="editPassword" class="pwd-btn" type="primary" plain
        >提交</el-button
      >
    </div> -->
    <div v-if="isEditPassword" class="pwdForm">
      <el-form
        ref="pwdForm"
        :model="pwdForm"
        status-icon
        :rules="rules"
        label-width="10vw"
      >
        <el-form-item label="输入已有的密码" prop="oldPwd">
          <el-input
            show-password
            type="password"
            v-model="pwdForm.oldPwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            show-password
            type="password"
            v-model="pwdForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            show-password
            type="password"
            v-model="pwdForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editPassword('pwdForm')" class="pwd-btn" type="primary" plain
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <p class="pwd-title">是否要修改密码：</p>
    <el-switch
      style="margin-left: 5%"
      @change="showEditPassword"
      v-model="isEditPassword"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
  </div>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Salerdata",
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.pwd) {
        callback(new Error("请输入原来的密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.pwdForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      persondata: {
        id: "",
        name: "",
        sex: "",
        phonenumber: "",
        address: "",
        introduce: "",
      },
      options: [
        {
          value: 0,
          label: "账号",
        },
        {
          value: 1,
          label: "姓名",
        },
        {
          value: 2,
          label: "性别",
        },
        {
          value: 3,
          label: "手机号",
        },
        {
          value: 4,
          label: "发货地址",
        },
        {
          value: 5,
          label: "自我介绍",
        },
      ],
      options2: [],
      editDetail: {},
      pwd: "", //数据库获取过来的密码
      pwdForm: {
        oldPwd: "", //重新输入原有的密码
        password: "",
        password2: "",
      },
      rules: {
        oldPwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        password2: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      isTrue: [
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
      ],
      isEditPassword: false,
      //   field: ["姓名", "性别", "账号", "自我介绍", "手机号码", "发货地址"],
    };
  },
  computed: {
    getSubmit() {
      let isGet = false;
      for (let n of this.isTrue) {
        if (n.flag == true) {
          isGet = true;
          break;
        }
      }
      return isGet;
    },
  },
  methods: {
    inputChange(e) {
      this.$forceUpdate();
    },
    showEdit() {
      for (let m of this.isTrue) {
        m.flag = false;
      }
      for (let n of this.options2) {
        this.isTrue[n].flag = true;
      }
      this.isEditPassword = false;
    },
    showEditPassword() {
      for (let n of this.isTrue) {
        n.flag = false;
      }
    },
    editSelect() {
      let data = {};
      for (let i in this.editDetail) {
        data[i] = this.editDetail[i];
      }
      data.user_type = "saler";
      request({
        url: "/users/updateUserInfo",
        method: "post",
        data: data,
      })
        .then((res) => {
          if (res.code == "200") {
            console.log("修改成功");
            console.log(this.editDetail);
            this.$router.go(0)
          } else {
            console.log("修改失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      for (let n of this.isTrue) {
        n.flag = false;
      }
    },
    editPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {};
          data.user_type = this.$cookies.get("user_type");
          data.password = this.pwdForm.password;
          request({
            url: "/users/updatePassword",
            method: "post",
            data: data,
          })
            .then((res) => {
              if (res.code == "200") {
                console.log("修改成功");
              } else {
                console.log("修改失败");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  created() {
    request({
      url: "/users/getUserInfo",
      method: "post",
    })
      .then((res) => {
        console.log(res);
        this.persondata.name = res.result[0].name;
        this.persondata.sex = res.result[0].sex;
        this.persondata.id = res.result[0].id;
        this.persondata.introduce = res.result[0].introduce;
        this.persondata.phonenumber = res.result[0].phonenumber;
        this.persondata.address = res.result[0].address;
        this.pwd = res.result[0].password;
        for (let i in this.persondata) {
          this.editDetail[i] = this.persondata[i];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.el-input {
  width: 15vw;
  margin-right: 7vw;
}
.el-descriptions {
  margin: 5%;
}
.before {
  display: none;
}
.after {
  display: block;
}
.edit-btn {
  margin-left: 3%;
}
.submit-btn {
  margin-left: 6vw;
  width: 10vw;
}
.edit-title {
  margin-left: 5%;
  font-size: 16px;
  font-weight: 300;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
}
.pwd-title {
  margin-left: 5%;
  margin-top: 3%;
  font-size: 16px;
  font-weight: 300;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
}
.pwdForm {
  float: right;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  font-weight: 200;
}
.pwd-btn {
  margin-left: 6vw;
  margin-top: 4vh;
  width: 10vw;
}
</style>
