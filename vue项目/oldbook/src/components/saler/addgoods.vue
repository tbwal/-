<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true"
      >发布书籍</el-button
    >
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="35%">
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
          v-if="imageUrl"
          :src="imageUrl"
          fit="contain"
          style="width: 70px; height: 70px; border-radius: 5px"
        ></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form :model="bookForm">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input
            v-model="bookForm.name"
            autocomplete="off"
            :style="inputwidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="bookForm.category" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input
            v-model="bookForm.author"
            autocomplete="off"
            :style="inputwidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input
            v-model="bookForm.publisher"
            autocomplete="off"
            :style="inputwidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="formLabelWidth">
          <el-input
            v-model="bookForm.isbn"
            autocomplete="off"
            :style="inputwidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="出版时间" required>
          <el-date-picker
            type="date"
            placeholder="出版日期"
            v-model="bookForm.date"
            style="width: 65%"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy年MM月dd日"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="页数" :label-width="formLabelWidth">
          <el-input
            v-model="bookForm.page"
            autocomplete="off"
            :style="inputwidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input
            v-model="bookForm.number"
            autocomplete="off"
            :style="inputwidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input
            v-model="bookForm.price"
            autocomplete="off"
            :style="inputwidth"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addgoods">发布</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Addgoods",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      bookForm: {
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
      },
      options:['经济管理','文学艺术','人文社科','科学技术','教育管理','生活休闲'],
      imageUrl: "",
      inputwidth: {
        width: "80%",
      },
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
      this.imageUrl = res.url;
      this.bookForm.picture = res.url;
    },
    addgoods() {
      request({
        url: "/users/addGoods",
        method: "post",
        data: {
          picture: this.bookForm.picture,
          name: this.bookForm.name,
          category:this.bookForm.category,
          author: this.bookForm.author,
          publisher: this.bookForm.publisher,
          isbn: this.bookForm.isbn,
          date: this.bookForm.date,
          page: this.bookForm.page,
          number: this.bookForm.number,
          price: this.bookForm.price,
        },
      })
        .then((res) => {
          console.log("发布成功");
          console.log(res);
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff !important;
}
.dialog-footer {
  text-align: center;
}
</style>
