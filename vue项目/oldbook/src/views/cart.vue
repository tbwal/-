<template>
  <div>
    <div class="cartFrame" v-for="(item,index) in cart" :key="index">
      <el-checkbox v-model="item.isBuy" label="1" style="position:relative;bottom:5vw;right:2vw;">&nbsp;</el-checkbox>
      <img :src="item.picture" >
      <p class="name">{{item.name}}</p>
      <p class="author">{{item.publisher}}<br>{{item.author}}</p>
      <el-input-number
      style="float: right;position:relative;top:-15vw;right:2vw;"
      v-model="item.number"
      :min="1"
      size="small"
    ></el-input-number>    
    <p class="price">¥{{item.price}}</p>
    </div>
     <el-button class="buy" round type="primary" @click="buy">一键购买</el-button>
     <buyconfirm :buydetail="buydetail" :show="isShow" @close="close"></buyconfirm>
  </div>
</template>
<script>
import { request } from "../network/request";
import Buyconfirm from "../components/buyer/buyconfirm.vue"
export default {
  components:{
    buyconfirm:Buyconfirm
  },
  name: "Cart",
  data() {
    return {
        cart:[],
        buydetail:[],
        isShow:false
    };
  },
   methods:{
    buy(){
      console.log(this.cart)
      for(let n of this.cart){
        if(n.isBuy==1){
          this.buydetail.push(n)
        }
      }
      this.isShow=true

    },
    close() {
      this.isShow = false;
      this.buydetail=[];
    },
  },
  created() {
    request({
      url: "/users/getCart",
      method: "post",
    })
      .then((res) => {
        if (res.code == "200") {
          console.log(res);
          for (let n of res.result) {
            n.isBuy=false;
            this.cart.push(n);
          }
          console.log(this.cart);
        } else {
          console.log("获取购物车失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.cartFrame{
  width:80vw;
  height:215px;
  background: #f6f6f6;
  margin-top: 50px;
  margin-left:10vw;
  border-radius:10px;
}
.cartFrame img{
  width: 11vw;
  height:11vw;
  margin-left:-0.5vw;
  margin-top:32px;
}
.name{
  display: inline-block;
  position: relative;
  bottom: 8vw;
  left:2vw;
  font-family: 'Microsoft YaHei',"\5b8b\4f53";
  font-weight: 700;
  color:#666;
}
.author{
  position: relative;
  bottom: 8vw;
  left:15vw;
  font-size:13px;
  color: #999;
}
.price{
  float: right;
  position: relative;
  top:-12vw;
  left:4vw;
  color: #DA0000;
  font-size:20px;
  font-weight:700;
  font-family: Arial;
}
.buy{
  float: right;
  margin-right:-10vw;

}
</style>
