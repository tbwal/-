<template>
  <div style="background:#F9F9F9;">
    <p class="findTitle">向所有卖家发布</p>
    <div class="findFrame">
      <el-form ref="form" :model="findForm" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="findForm.name"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="findForm.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="findForm.publisher"></el-input>
        </el-form-item>
        <el-form-item label="需要数量">
          <el-input-number
            v-model="findForm.number"
            :min="1"
            label="需要数量"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="最高价格">
          <el-input
            v-model="findForm.highprice"
            autocomplete="off"
            style="width:55%"
          ></el-input>
        </el-form-item>
        <el-form-item label="最低价格" >
          <el-input
            v-model="findForm.lowprice"
            autocomplete="off"
           style="width:55%"
          ></el-input>
        </el-form-item>
        <el-button class="find-btn" type="primary" @click="findBooks('all')">发布</el-button>
      </el-form>
    </div>
    <p class="salerTitle">寻找卖家</p>
    <div class="salerFrame" v-for="(item, index) in allSaler" :key="index">
        <img style="width:8vw;height:8vw;margin-top:3vw;" :src="item.picture" >
        <p class="salerName">{{item.name}}</p>
        <p class="salerPhone">{{item.phonenumber}}</p>
        <!-- <p>{{getAddress(item)}}</p> -->
        <p class="salerAddress">广东省广州市</p>
        <el-button type="danger" @click="openForm(item)">找他</el-button>
    </div>
    <findform :salerid="salerid" :show="isShow" @sendForm="findBooks" @close="closeForm"></findform>
  </div>
</template>
<script>
import {request} from '../network/request';
import Findform from '../components/buyer/findform.vue'
export default {
  name: "Findsaler",
  components:{
      findform:Findform
  },
  data(){
      return{
          findForm:{
              name:'',
              author:'',
              publisher:'',
              number:1,
              highprice:'',
              lowprice:'',
              saler:''
          },
          allSaler:[],
          isShow:false,
          salerid:''
      }
  },
  methods:{
      findBooks(item){
        let data={}
          if(item=='all'){
             this.findForm.saler='all'
             for(let i in this.findForm){
                data[i]=this.findForm[i]
             }
          }else{
             for(let i in item){
                data[i]=item[i]
             }     
                
          }
           data.id=+new Date();
          console.log(data)
          request({
            url:'/users/findSaler',
            method:'post',
            data:data
          }).then((res)=>{
            if(res.code=='200'){
              console.log('申请成功')
              this.$router.go(0)
            }else{
              console.log('申请失败')
            }
          }).catch((err)=>{
            console.log(err)
          })
      },
      getAddress(item){
          return item.address
      },
      openForm(item){
        this.isShow=true
        this.salerid=item.id
       
      },
      closeForm(){
        this.isShow=false
      }
  },
  
  created(){
      request({
          url:"/users/getAllSaler",
          method:"post"
      }).then((res)=>{
          for(let n of res.result){
              this.allSaler.push(n)
          }
          
      }).catch((err)=>{
          console.log(err)
      })
  }
};
</script>
<style scoped>
.findTitle{
     font-family: "Microsoft YaHei", "\5b8b\4f53";
     text-align: center;
     margin-top:8vh;
}
.salerTitle{
    font-family: "Microsoft YaHei", "\5b8b\4f53";
     text-align: center;
     margin-top:13vh;
}
.findFrame{
    margin: 0 auto;
    width: 30vw;
    background:white;
    border-radius: 20px;
    padding:3vw 5vw 3vw 3vw;
    
}
.find-btn{
    margin-left:20%;
    width: 30%;
}
.salerFrame{
    margin-left:7vw;
    margin-top:8vh;
    background: white;
     display: inline-block;
     width: 16vw;
     text-align: center;
     border-radius: 10px;
}
.salerName{
     font-family: "Microsoft YaHei", "\5b8b\4f53";
     font-size: 15px;
}
.salerAddress{
    color: #999;
    font-family: "Microsoft YaHei", "\5b8b\4f53";
    font-size: 12px;
}
.salerPhone{
     font-family: "Microsoft YaHei", "\5b8b\4f53";
     font-size: 15px;
}
</style>
