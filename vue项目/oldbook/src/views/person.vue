<template>
  <div class="all">
    <div class="headFrame">
      <p class="title">个人中心</p>

      <el-upload
        style="width: 71px; height: 71px; margin: 40px auto 0"
        class="avatar-uploader"
        action="http://localhost:3000/users/headUpload"
        :headers="header"
        :data="data"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
        <!-- <el-avatar v-if="imageUrl" :src="imageUrl" :size="70"></el-avatar> -->
        <el-image
          v-if="imageUrl"
          :src="imageUrl"
          fit="contain"
          style="width: 70px; height: 70px; border-radius: 50%"
        ></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p class="name">我是卖家</p>
    </div>
    <ul>
      <li
        class="list"
        v-for="(item, index) in showList"
        :key="item"
        @click="open(index)"
      >
        {{ item }}
      </li>
    </ul>
    <div class="content">
      <div v-if="isSaler == true">
        <salerdata v-if="show == 1"></salerdata>
        <setting v-else-if="show == 2"></setting>
      </div>
      <div v-else>
        <buyerdata v-if="show == 1"></buyerdata>
        <setting v-else-if="show == 2"></setting>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../network/request";
import Salerdata from "../components/saler/salerdata.vue";
import Setting from "../components/saler/setting.vue";
import Buyerdata from "../components/buyer/buyerdata.vue";
import App from "../App.vue";
export default {
  components: {
    salerdata: Salerdata,  
    setting: Setting,
    buyerdata: Buyerdata,
    App,
  },
  name: "Person",
  data() {
    return {
      saler: ["个人资料",  "设置"],
      buyer: ["个人资料", "设置"],
      isSaler: true,
      show: 0,
      imageUrl: "",
      header: {
        Authorization: this.$cookies.get("user_token"),
      },
      data: {
        type: this.$cookies.get("user_type"),
      },
    };
  },
  computed: {
    showList() {
      if (this.isSaler) {
        return this.saler;
      } else return this.buyer;
    },
  },
  methods: {
    open(index) {
      this.show = index + 1;
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
   
    if (this.$cookies.get("user_type") == "saler") {
      this.isSaler = true;
    } else {
      this.isSaler = false;
    }
    request({
      url: "/users/getUserInfo",
      method: "post",
    })
      .then((res) => {
        console.log(res);
        if (res.result[0].picture) {
          this.imageUrl = res.result[0].picture;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.all{
    background: #F9F9F9;
    height:75vw;
}
.title {
  text-align: center;
  font-weight: 500;
  margin: 0;
  font-family: "microsoft yahei";
}
.headFrame {
  padding: 1vw 0;
  height: 13vw;
  width: 18vw;
  background: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  top:5vh;
  left:3vw;
}
/* .headImg{
    margin-left:3vw;
    margin-top:5vw;
    border:1px solid #7a7a7a;
    border-radius:40px;
    overflow:hidden;
}  */
.name {
  font-family: "microsoft yahei";
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
}
.list {
  list-style: none;
  height: 6vw;
  line-height: 6vw;
  width: 18vw;
  background: white;
  text-align: center;
  border-bottom: 1px solid white;
  font-family: Arial, sans-serif;
  font-weight: 300;
}
ul {
  margin-top: 5vh;
  margin-left:3vw;
  padding: 0;
  width: 18vw;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius:10px;
}
.content {
  float: right;
  width: 70vw;
  height:55vw;
  position: relative;
  top: -63vh;
  right:3vw;
  background: white;
  border-radius: 10px;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 50%;
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff !important;
}
/* .avatar {
    width: 70px;
    height: 70px;
    display: block;
    border-radius: 50%;
    overflow: hidden;
  } */
</style>