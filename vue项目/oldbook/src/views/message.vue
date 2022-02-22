<template>
  <div style="overflow: hidden; background: #f9f9f9">
    <div class="left">
      <div
        @click="showDetail(item)"
        class="msgFrame"
        v-for="(item, index) in message"
        :key="index"
      >
        <img :src="item.buyerpicture" />
        <div class="msgText">
          <p>{{ item.buyername }}</p>
          <p>向你请求了《{{ item.name }}》的购买</p>
        </div>
      </div>
    </div>
    <div class="right">
      <el-card class="msgdetail" v-if="isShow">
        <div slot="header" class="clearfix">
          <span>书单详情</span>
          <el-button
            @click="confirmBuyer"
            style="float: right; padding: 3px 0"
            type="text"
            >发布</el-button
          >
        </div>
        <div class="msgItem" v-for="(value, key, index) in getdetail()" :key="index">
          {{ title[index] }}: {{ value }}
        </div>
      </el-card>
    </div>
    <confirmbuy :show="isConfirm" :bookForm="detail" @close="close"></confirmbuy>
  </div>
</template>
<script>
import { request } from "../network/request";
import Confirmbuy from "../components/saler/confirmbuy.vue";
export default {
  components: {
      confirmbuy:Confirmbuy
  },
  name: "Message",
  data() {
    return {
      message: [],
      detail: {
        name: "",
        author: "",
        publisher: "",
        number: "",
        lowprice: "",
        highprice: "",
      },
      title: ["书名", "作者", "出版社", "需要数量", "最低价格", "最高价格"],
      isShow: false,
      isConfirm:false,
      
    };
  },
  methods: {
    showDetail(item) {
      this.detail.name = item.name ? item.name : "无";
      this.detail.author = item.author ? item.author : "无";
      this.detail.publisher = item.publisher ? item.publisher : "无";
      this.detail.number = item.number ? item.number : "无";
      this.detail.lowprice = item.lowprice ? item.lowprice : "无";
      this.detail.highprice = item.highprice ? item.highprice : "无";
      this.detail.buyer=item.buyer
      this.detail.id=item.id
      console.log(this.detail);
      this.isShow = true;
    },
    getdetail(){
        let obj={}
        for(let i in this.detail){
            if(i=="name"||i=="author"||i=="publisher"||i=="number"||i=="lowprice"||i=="highprice"){
                obj[i]=this.detail[i]
            }
        }
        return obj
    },
    confirmBuyer() {       
        this.isConfirm=true
        console.log(this.isConfirm)
    },
    close(){
        this.isConfirm=false
    }
  },
  created() {
    request({
      url: "/users/getFind",
      method: "post",
    })
      .then((res) => { 
        if (res.result1.length) {
          for (let n of res.result1) {
            this.message.push(n);
          }
        }
        if (res.result2.length) {
          for (let n of res.result2) {
            this.message.push(n);
          }
        }
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
.msgItem {
  font-family: "Microsoft YaHei";
  margin: 16px auto;
  font-size: 14px;
}
.clearfix span {
  font-family: "Microsoft YaHei";
  font-weight: 600;
}
</style>
