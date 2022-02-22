<template>
  <div>
    <el-dialog title="书籍详情" :visible.sync="show" :before-close="handleClose" width="35%">
      <el-upload
        style="text-align: center; margin-bottom: 22px"
        class="avatar-uploader"
        action="http://localhost:3000/users/goodUpload"
        :headers="header"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <el-image
          v-if="bookdetail.picture"
          :src="bookdetail.picture"
          fit="contain"
          style="width: 70px; height: 70px; border-radius: 5px"
        ></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form :model="bookdetail">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input
            v-model="bookdetail.name"
            autocomplete="off"
            :style="inputwidth"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-input
            v-model="bookdetail.category"
            autocomplete="off"
            :style="inputwidth"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input
            v-model="bookdetail.author"
            autocomplete="off"
            :style="inputwidth"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input
            v-model="bookdetail.publisher"
            autocomplete="off"
            :style="inputwidth"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="formLabelWidth">
          <el-input
            v-model="bookdetail.isbn"
            autocomplete="off"
            :style="inputwidth"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="出版时间" required>
          <el-date-picker
            type="date"
            placeholder="出版日期"
            v-model="bookdetail.date"
            style="width: 65%"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy年MM月dd日"
            :disabled="true"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="页数" :label-width="formLabelWidth">
          <el-input
            v-model="bookdetail.page"
            autocomplete="off"
            :style="inputwidth"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input-number
            v-model="bookdetail.number"
            :min="1"
            :max="100"
            label="库存"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input-number
            v-model="bookdetail.price"
            :min="1"
            label="价格"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updategoods">修改商品信息</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Updategoods",
  props: {
    bookdetail: {
      type: Object,
      default: function () {
        return {
          picture: "",
          name: "",
          category:"",
          author: "",
          publisher: "",
          isbn: "",
          date: "",
          page: "",
          number: "",
          price: "",
          saler: "",
        };
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputwidth: {
        width: "80%",
      },
      formLabelWidth: "80px",
      header: {
        Authorization: this.$cookies.get("user_token"),
      },
    };
  },
  methods: {
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
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.bookdetail.picture = res.url;
    },
    handleClose(){
        this.$emit('close')
    },
    updategoods() {
      request({
        url: "/users/updateGoods",
        method: "post",
        data: {
          picture:this.bookdetail.picture,
          name: this.bookdetail.name,
          number:this.bookdetail.number,
          price:this.bookdetail.price
        },
      }).then((res) => {
          console.log("修改成功");
          console.log(res);
          this.$router.go(0)
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>