<template>
  <el-dialog
    title="购书详情"
    :visible.sync="show"
    width="40%"
    :before-close="handleClose"
  >
    <div class="person">
      <span
        style="font-family: 'Microsoft YaHei'; font-size: 20px; color: black"
        >{{ persondata.name }}</span
      >
      <span style="margin-left: 20px">{{ persondata.phonenumber }}</span>
      <p style="color: black; font-size: 16px; font-family: 'Microsoft YaHei'">
        地址：{{ persondata.address }}
      </p>
    </div>
    <div class="buydetail">
      <div v-for="(item, index) in buydetail" :key="index">
        <img :src="item.picture" />
        <p>{{ item.name }}</p>
        <span style="color: #da0000; font-weight: 600">¥{{ item.price }}</span>
        <span>×{{ item.number }}</span>
      </div>
    </div>
    <el-button class="confirmbtn" @click="confirm">确认订单</el-button>
  </el-dialog>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Buyconfirm",
  props: {
    buydetail: {
      type: Array,
      default: function () {
        return [];
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      persondata: {
        name: "",
        phonenumber: "",
        address: "",
      },
    };
  },
  methods: {
    confirm() {
      var orderCode = "";
      for (var i = 0; i < 4; i++) {
        orderCode += Math.floor(Math.random() * 10);
      }
      const ordernumber = new Date().getTime() + orderCode;
      let date = new Date()
      let h=date.getHours();
      h=h<10?'0'+h:h
      let m =date.getMinutes();
      m=m<10?'0'+m:m
      let s=date.getSeconds()
      s=s<10?'0'+s:s
      let deal_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+h+':'+m+':'+s
      let data = this.buydetail;
      for (let n of data) {
        n.ordernumber=ordernumber
        n.phonenumber=this.persondata.phonenumber
        n.address=this.persondata.address
        n.deal_time=deal_time
        n.state='待发货'
      }
       request({
        url: "/users/buyConfirm",
        method: "post",
        data:data
      }).then((res) => {
        if(res.code=='200'){
           console.log("购买成功");
          console.log(res);
        }else{
          console.log("购买失败")
          console.log(res)
        }
        }).catch((err) => {
          console.log(err);
        });
    },
    handleClose() {
      this.$emit("close");
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
.person {
  height: 13vw;
  width: 30vw;
  background: #f6f6f6;
  margin-left: 3vw;
  border-radius: 10px;
}
.person span {
  position: relative;
  top: 4vw;
  left: 4vw;
}
.person p {
  position: relative;
  top: 4vw;
  left: 4vw;
}
.buydetail {
  width: 30vw;
  background: #f6f6f6;
  margin-top: 2vw;
  margin-left: 3vw;
  border-radius: 10px;
}
.buydetail img {
  width: 8vw;
  height: 8vw;
  margin-left: 2vw;
  margin-top: 2vw;
}
.buydetail p {
  position: relative;
  left: 11vw;
  bottom: 8vw;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.829);
  font-size: 16px;
}
.buydetail span {
  position: relative;
  left: 11vw;
  bottom: 8vw;
  font-size: 13px;
}
.confirmbtn {
  margin-top: 3vw;
  margin-left: 26vw;
}
</style>
