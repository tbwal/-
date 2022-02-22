<template>
<div>
<el-menu router text-color="#333" active-text-color="#ff5959"  v-if="isSale" :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-menu-item :index="routerSaler[index]" v-for="(item,index) in saler" :key="index">{{item}} </el-menu-item>
</el-menu>
<el-menu router text-color="#333" active-text-color="#ff5959"   v-else :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-menu-item :index="routerBuyer[index]" v-for="(item,index) in buyer" :key="index">{{item}}</el-menu-item>
</el-menu>
<router-view></router-view>
</div>

</template>
<script>
export default {
  name: 'Home',
  data(){
    return{
      activeIndex:'1',
      saler:['商品推荐','商品管理','订单进程','消息','我的'],
      buyer:['商品推荐','我的订单','购物车','寻找卖家','消息','我的'],
      isSale:true,
      routerSaler:['/home/recommend','/home/manage','/home/salerorder','/home/message','/home/person'],
      routerBuyer:['/home/recommend','/home/order','/home/cart','/home/findsaler','/home/buyermessage','/home/person']
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  created(){
    console.log(this.$store.state.type)
    if(this.$cookies.get('user_type')=='saler'){
      this.isSale=true
    }else{
      this.isSale=false
    }
  }

}
</script>
<style scoped>
.el-menu-demo{
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  font-size:15px;
  color:#121212;
}
</style>