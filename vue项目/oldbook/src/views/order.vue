<template>
  <div>
    <el-tabs tab-position="left" style="height: 50vh">
      <el-tab-pane label="待发货">
        <el-table :data="delivery" stripe style="width: 100%" height="50vh">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="书名：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="作者：">
                  <span>{{ props.row.author }}</span>
                </el-form-item>
                <el-form-item label="出版社：">
                  <span>{{ props.row.publisher }}</span>
                </el-form-item>
                <el-form-item label="isbn：">
                  <span>{{ props.row.isbn }}</span>
                </el-form-item>
                <el-form-item label="出版日期：">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item label="页数：">
                  <span>{{ props.row.page }}</span>
                </el-form-item>
                <el-form-item label="购买数量：">
                  <span>{{ props.row.number }}</span>
                </el-form-item>
                <el-form-item label="价格：">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="ordernumber" label="订单号"> </el-table-column>
          <el-table-column prop="name" label="书名"> </el-table-column>
          <el-table-column sortable prop="deal_time" label="下单时间">
          </el-table-column>
          <el-table-column prop="buyer" label="买家"> </el-table-column>
          <el-table-column prop="saler" label="卖家"> </el-table-column>
          <el-table-column prop="phonenumber" label="手机号"> </el-table-column>
          <el-table-column prop="address" label="收货地址"> </el-table-column>
          <el-table-column prop="totalprice" label="总价格"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待收货">
        <el-table :data="reception" stripe style="width: 100%" height="50vh">
          <el-table-column prop="ordernumber" label="订单号"> </el-table-column>
          <el-table-column prop="name" label="书名"> </el-table-column>
          <el-table-column sortable prop="deal_time" label="下单时间">
          </el-table-column>
          <el-table-column prop="buyer" label="买家"> </el-table-column>
          <el-table-column prop="saler" label="卖家"> </el-table-column>
          <el-table-column prop="phonenumber" label="手机号"> </el-table-column>
          <el-table-column prop="address" label="收货地址"> </el-table-column>
          <el-table-column prop="totalprice" label="总价格"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="receive(scope)"
                >确认收货</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成">
        <el-table :data="complete" stripe style="width: 100%" height="50vh">
          <el-table-column prop="ordernumber" label="订单号"> </el-table-column>
          <el-table-column prop="name" label="书名"> </el-table-column>
          <el-table-column sortable prop="deal_time" label="下单时间">
          </el-table-column>
          <el-table-column prop="buyer" label="买家"> </el-table-column>
          <el-table-column prop="saler" label="卖家"> </el-table-column>
          <el-table-column prop="phonenumber" label="手机号"> </el-table-column>
          <el-table-column prop="address" label="收货地址"> </el-table-column>
          <el-table-column prop="totalprice" label="总价格"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { request } from "../network/request";
export default {
  name: "Order",
  data() {
    return {
      delivery: [],
      reception: [],
      complete: [],
    };
  },
  methods: {
    show(scope) {
      console.log(scope.row);
    },
    receive(scope) {
      let data={
        ordernumber:scope.row.ordernumber,
      }
      request({
        url:"/users/receive",
        method:'post',
        data:data
      }).then((res)=>{
        if(res.code=='200'){
          console.log("成功确认收货")
          this.$router.go(0)
        }else{
          console.log("失败确认收货")
        }

      }).catch((err)=>{

      })
    },
  },
  created() {
    request({
      url: "/users/getOrder",
      method: "post",
    })
      .then((res) => {
        if (res.code == "200") {
          for (let n of res.result) {
            if (n.state == "待发货") {
              n.totalprice = n.price * n.number;
              this.delivery.push(n);
            } else if (n.state == "待收货") {
              n.totalprice = n.price * n.number;
              this.reception.push(n);
            } else {
              n.totalprice = n.price * n.number;
              this.complete.push(n);
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
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
