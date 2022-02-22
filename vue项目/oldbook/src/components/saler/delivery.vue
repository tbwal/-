<template>
  <div>
    <el-card class="box-card" v-for="(item, index) in detail" :key="index">
      <img :src="item.picture" />
      <div style="display: inline-block">
        <div class="column1">
          <p>书名：{{ item.name }}</p>
          <p>出版社：{{ item.publisher }}</p>
          <p>出版日期：{{ item.date }}</p>
        </div>
        <div class="column2">
          <p>作者：{{ item.author }}</p>
          <p>ISBN：{{ item.isbn }}</p>
          <p>页数：{{ item.page }}</p>
        </div>
        <p class="footer">
          <span class="price">¥{{ item.price }}</span>
          <span class="number">×{{ item.number }}</span>
        </p>
      </div>
    </el-card>
    <el-button @click="delivery" type="primary" plain>发货</el-button>
  </div>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Delivery",
  props: {
    detail: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    delivery() {
      let ordernumber = this.detail[0].ordernumber;
      request({
        url: "/users/delivery",
        method: "post",
        data: {
          ordernumber: ordernumber,
        },
      })
        .then((res) => {
          if (res.code == "200") {
            console.log("发货成功");
          } else {
            console.log("发货失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log(this.detail);
  },
};
</script>
<style scoped>
.box-card {
  width: 60vw;
  margin: 5vh auto 0;
}
.img {
  float: left;
}
.column1 {
  float: left;
  font-size: 12px;
  margin-right: 12vw;
  margin-left: 3vw;
  margin-bottom: 14%;
}
.column2 {
  float: left;
  font-size: 12px;
  margin-bottom: 5vh;
}
.price {
  color: #da0000;
  margin-left: 27vw;
  font-size: 17px;
  position: relative;
  bottom: 15px;
}
.number {
  font-size: 14px;
  margin-left: 10px;
  position: relative;
  bottom: 15px;
}
</style>
