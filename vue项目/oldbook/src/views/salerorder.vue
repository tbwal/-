<template>
  <div>
    <div v-if="isShow">
      <el-tabs tab-position="left" style="height: 85vh">
        <el-tab-pane label="待处理">
          <el-card
            class="box-card"
            v-for="(item, index) in handle"
            :key="index"
          >
            <div slot="header" class="clearfix">
              <span class="ordernumber">订单号：{{ item.ordernumber }}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="show(item)"
                >发货</el-button
              >
            </div>
            <div class="text item">
              <p style="float: right; margin: 0">
                下单时间：{{ item.deal_time }}
              </p>
              <p>买家：{{ item.buyer }}</p>
              <p>手机号：{{ item.phonenumber }}</p>
              <p>发货地址：{{ item.address }}</p>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="待收货">
          <div
            class="receiveFrame"
            v-for="(item, index) in reception"
            :key="index"
          >
           <p class="receiveText">
            <span>订单号：{{ item.ordernumber }}</span>&nbsp;&nbsp;&nbsp;
            <span>下单时间：{{ item.deal_time }}</span>
            </p>
            <div style="height:10vw;margin-left:4vw;">
              <el-steps   direction="vertical" :active="1">
                <el-step  title="已发货"></el-step>
                <el-step
                  title="待收货"
                  description="预计七天后自动收货"
                ></el-step>
                <el-step title="已完成"></el-step>
              </el-steps>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成"
          ><el-card
            class="box-card"
            v-for="(item, index) in complete"
            :key="index"
          >
            <div slot="header" class="clearfix">
              <span class="ordernumber">订单号：{{ item.ordernumber }}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="show(item)"
                >查看</el-button
              >
            </div>
            <div class="text item">
              <p style="float: right; margin: 0">
                下单时间：{{ item.deal_time }}
              </p>
              <p>买家：{{ item.buyer }}</p>
              <p>手机号：{{ item.phonenumber }}</p>
              <p>发货地址：{{ item.address }}</p>
            </div>
          </el-card></el-tab-pane
        >
      </el-tabs>
    </div>
    <div v-else>
      <delivery :detail="detail"></delivery>
    </div>
  </div>
</template>
<script>
import { request } from "../network/request";
import Delivery from "../components/saler/delivery.vue";
export default {
  name: "Salerorder",
  components: {
    delivery: Delivery,
  },
  data() {
    return {
      total: [], //后台获取所有订单数据
      handle: [], //待处理数据
      reception: [], //待收货数据
      complete: [], //已完成数据
      isShow: true,
      detail: [], //点击发货时所指向的订单数据
    };
  },
  methods: {
    show(n) {
      this.isShow = false;
      this.detail = this.total.filter((item) => {
        return item.ordernumber == n.ordernumber;
      });
    },
  },
  created() {
    request({
      url: "/users/getSalerOrder",
      method: "post",
    })
      .then((res) => {
        if (res.code == "200") {
          //保存传过来的所有内容
          this.total = res.result;
          //提取需要的内容
          let order = res.result.map((item) => {
            let object = {};
            object.ordernumber = item.ordernumber;
            object.phonenumber = item.phonenumber;
            object.buyer = item.buyer;
            object.saler = item.saler;
            object.deal_time = item.deal_time;
            object.address = item.address;
            object.state = item.state;
            return object;
          });
          //数组对象去重
          let newobj = {};
          order = order.reduce((preVal, curVal) => {
            newobj[curVal.ordernumber]
              ? ""
              : (newobj[curVal.ordernumber] = preVal.push(curVal));
            return preVal;
          }, []);
          //给获取到的内容进行分类
          for (let m of order) {
            if (m.state == "待发货") {
              this.handle.push(m);
            } else if (m.state == "待收货") {
              this.reception.push(m);
            } else {
              this.complete.push(m);
            }
          }
        } else {
          console.log("没有订单");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 80vw;
  margin-left: 10px;
  margin-top: 20px;
}
.ordernumber {
  color: #464646;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  font-weight: 700;
}
.receiveFrame{
  width:70vw;
  height:15vw;
  border:1px solid #dbdada;
  border-radius: 15px;
  box-shadow: 0.5px 0.5px 7px 1px#d6d6d6 ;
  margin: 1vw 1vw;
}
.receiveText{
  margin-top:2vw;
  margin-left:4vw;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  color: #c0c0c0;
  font-size:13px;
}
/deep/ .el-step__title{
  font-size:13px;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
}
/deep/ .el-step__description{
  font-size:12px;
   font-family: "Microsoft YaHei", "\5b8b\4f53";
   color:#999;
}
</style>