<template>
  <div>
    <el-dialog
      title="发布书籍"
      :visible.sync="show"
      :before-close="handleClose"
      width="35%"
    >
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
          v-if="picture"
          :src="picture"
          fit="contain"
          style="width: 70px; height: 70px; border-radius: 5px"
        ></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form :model="bookForm" >
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
              v-for="(item, index) in options"
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
          <el-input-number
            v-model="bookForm.number"
            :min="1"
            :max="100"
            label="库存"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="价格"
          :label-width="formLabelWidth"
          
        >
          <el-input-number
            v-model="bookForm.price"
            :min="1"
            :max="100"
            label="价格"
            @change="checkprice(bookForm.price)"
          ></el-input-number>
          <p style="font-family: 'Microsoft YaHei', '\5b8b\4f53';font-size:11px;margin:0;color:#f56c6c;" v-if="isShowCheck">建议不要超出买家的期望价格</p>
        </el-form-item>
      </el-form>
      <el-button style="margin-left: 40%" type="primary" @click="addgoods"
        >发布</el-button
      >
    </el-dialog>
  </div>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Confirmbuy",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    bookForm: {
      type: Object,
      default: function () {
        return {
          name: "",
          category: "",
          author: "",
          publisher: "",
          isbn: "",
          date: "",
          page: "",
          number: "",
          price: "",
          saler: "",
          salername: "",
          headpicture: "",
          lowprice: "",
          highprice: "",
          buyer: "",
          id: "",
        };
      },
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
      options: [
        "经济管理",
        "文学艺术",
        "人文社科",
        "科学技术",
        "教育管理",
        "生活休闲",
      ],
      picture: "",
      isShowCheck:false
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
      this.picture = res.url;
    },
    handleClose() {
      this.$emit("close");
    },
    // getNumber(n){
    //   return n*1
    // },
    checkprice(price){
      if(price<(this.bookForm.lowprice*1)||price>(this.bookForm.highprice*1)){
        this.isShowCheck=true;
      }else{
        this.isShowCheck=false;
      }
      
    },
    addgoods() {
      request({
        url: "/users/addGoods",
        method: "post",
        data: {
          picture: this.picture,
          name: this.bookForm.name,
          category: this.bookForm.category,
          author: this.bookForm.author,
          publisher: this.bookForm.publisher,
          isbn: this.bookForm.isbn,
          date: this.bookForm.date,
          page: this.bookForm.page,
          number: this.bookForm.number,
          price: this.bookForm.price,
          buyer: this.bookForm.buyer,
          id: this.bookForm.id,
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
</style>
