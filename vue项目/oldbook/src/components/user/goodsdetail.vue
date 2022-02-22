<template>
  <el-dialog
    title="书籍详情"
    :visible.sync="show"
    width="30%"
    :before-close="handleClose"
  >
    <img :src="bookdetail.picture" />
    <p>{{ bookdetail.name }}</p>
    <p>{{ bookdetail.author }}</p>
    <p>{{ bookdetail.publisher }}</p>
    <p>{{ bookdetail.isbn }}</p>
    <p>{{ bookdetail.date }}</p>
    <p>{{ bookdetail.page }}</p>
    <p>{{ bookdetail.number }}</p>
    <p>{{ bookdetail.price }}</p>

    <el-input-number
      style="float: right"
      v-model="buynumber"
      :min="1"
      size="small"
      placeholder="购买数量"
    ></el-input-number>
    <span slot="footer" class="dialog-footer" v-if="type == 'buyer'">
      <el-button @click="addcart">加入购物车</el-button>
      <el-button @click="dialogVisible = false">购买</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Goodsdetail",
  props: {
    bookdetail: {
      type: Object,
      default: function () {
        return {
          picture: "",
          name: "",
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
      type: "",
      buynumber: "",
    };
  },
  created() {
    this.type = this.$cookies.get("user_type");
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    addcart(){
      request({
        url: "/users/addCart",
        method: "post",
        data: {
          picture: this.bookdetail.picture,
          name: this.bookdetail.name,
          author: this.bookdetail.author,
          publisher: this.bookdetail.publisher,
          isbn: this.bookdetail.isbn,
          date:this.bookdetail.date,
          page:this.bookdetail.page,
          number:this.buynumber,
          price:this.bookdetail.price,
          saler:this.bookdetail.saler
        },
      }).then((res) => {
          console.log("加购成功");
          console.log(res);
          this.$router.push('/home/cart')
        }).catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
