<template>
  <div style="overflow: hidden; background: #f9f9f9">
    <div class="left">
      <div
        @click="showDetail(item)"
        class="msgFrame"
        v-for="(item, index) in message"
        :key="index"
      >
        <img :src="item.headpicture" />
        <div class="msgText">
          <p>{{ item.salername }}</p>
          <p>向你发布了《{{ item.name }}》,请查收！！</p>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="bookFrame" v-if="isShow">
        <img
          :src="detail.picture"
          style="height: 200px; width: 200px; float: left"
        />
        <div class="detailFrame">
          <p class="booksName">{{ detail.name }}</p>
          <p class="booksAuthor">
            {{ detail.author }}/{{ detail.publisher }}/页码：{{ detail.page }}
          </p>
          <p class="booksIsbn">ISBN：{{ detail.isbn }}</p>
          <p class="booksDate">出版日期：{{ detail.date }}</p>
          <div style="margin-top: 28%">
            <p style="float: right" class="booksPrice">{{ detail.price }}</p>
            <img :src="detail.headpicture" style="height: 30px; width: 30px" />
            <span class="salername">{{ detail.salername }}</span>
          </div>
        </div>
      </div>
      <div style="float: right; margin-right: 9vw" v-if="isShow">
        <el-input-number
          class="booksNumber"
          v-model="number"
          :min="1"
          :max="detail.number"
          label="购买数量"
          size="mini"
        ></el-input-number>
        <el-button size="mini" type="primary" @click="buy">购买</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../network/request";
export default {
  name: "Buyermessage",
  data() {
    return {
      message: [],
      detail: {},
      isShow: false,
      persondata: {
        name: "",
        phonenumber: "",
        address: "",
      },
      number: "",
    };
  },
  methods: {
    showDetail(item) {
      for (let i in item) {
        this.detail[i] = item[i];
      }
      console.log(this.detail);
      this.isShow = true;
    },
    buy() {
      var flag = false;
      var orderCode = "";
      for (var i = 0; i < 4; i++) {
        orderCode += Math.floor(Math.random() * 10);
      }
      const ordernumber = new Date().getTime() + orderCode;
      let date = new Date();
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      let deal_time =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        h +
        ":" +
        m +
        ":" +
        s;
      let data = [];
      data.push(this.detail);
      for (let n of data) {
        n.ordernumber = ordernumber;
        n.phonenumber = this.persondata.phonenumber;
        n.address = this.persondata.address;
        n.deal_time = deal_time;
        n.state = "待发货";
        n.number = this.number;
      }
      request({
        url: "/users/buyConfirm",
        method: "post",
        data: data,
      })
        .then((res) => {
          if (res.code == "200") {
            console.log("购买成功");
            console.log(res);
            //删除回复消息以及发布信息
            let id = this.detail.id;
            console.log("删除时间戳为" + id);
            request({
              url: "/users/deleteMsg",
              method: "post",
              data: { id: id },
            })
              .then((res) => {
                if (res.code == "200") {
                  console.log("删除成功");
                } else {
                  console.log("删除失败");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("购买失败");
            flag = true;
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      
    },
  },
  created() {
    request({
      url: "/users/getReply",
      method: "post",
    })
      .then((res) => {
        if (res.result) {
          for (let n of res.result) {
            this.message.push(n);
          }
        } else {
          console.log("获取失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    request({
      url: "/users/getUserInfo",
      method: "post",
    })
      .then((res) => {
        console.log(res);
        this.persondata.name = res.result[0].name;
        this.persondata.phonenumber = res.result[0].phonenumber;
        this.persondata.address = res.result[0].address;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.left {
  float: left;
  width: 45vw;
  margin-left: 3vw;
  background: white;
}
.right {
  float: left;
  width: 45vw;
  margin-left: 3vw;
  background: white;
}
.msgFrame {
  width: 45vw;
  height: 8vw;
  background: white;
  border-bottom: 1px solid rgba(212, 208, 208, 0.98);
}
.msgFrame img {
  width: 6vw;
  height: 6vw;
  float: left;
  margin-left: 1vw;
  margin-top: 1vw;
  border-radius: 50%;
}
.msgText {
  float: left;
  margin-left: 2vw;
  margin-top: 10px;
}
.msgText p:nth-of-type(1) {
  font-family: "Microsoft YaHei";
  font-weight: 600;
}
.msgText p:nth-of-type(2) {
  font-family: "Microsoft YaHei";
  font-weight: 300;
  color: #888;
  font-size: 13px;
}
.bookFrame {
  display: inline-block;
  margin-left: 7vw;
  width: 35vw;
  border-radius: 20px;
  padding: 1vw;
  background: white;
}
.detailFrame {
  float: left;
}
.booksName {
  color: #464646;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  font-size: 14px;
}
.booksAuthor {
  color: #999;
  font-size: 12px;
}
.booksPrice {
  color: #da0000;
  font-weight: bold;
  font-size: 17px;
  font-family: Arial;
}
.booksIsbn,
.booksDate {
  color: #464646;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  font-size: 12px;
}
.booksNumber {
  margin-right: 2vw;
}
.salername {
  font-size: 12px;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  color: #666;
}
</style>