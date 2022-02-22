<template>
<div class="loginbg">
<div class="form" v-if="isLogin">
 <el-form  ref="form" :model="loginForm" label-width="60px">
  <el-form-item label="类型">
    <el-select v-model="loginForm.type" placeholder="请选择用户类型">
      <el-option label="商家" value="saler"></el-option>
      <el-option label="买家" value="buyer"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="账号">
    <el-input v-model="loginForm.id"></el-input>
  </el-form-item> 
  <el-form-item label="密码">
    <el-input v-model="loginForm.password"></el-input>
  </el-form-item> 
  <el-form-item>
    <el-button type="primary" @click="onLogin">立即登录</el-button>
    <el-button @click="toReg">注册</el-button>
  </el-form-item>
</el-form>
</div>
<div class="form" v-else>
 <el-form  ref="form" :model="regForm" label-width="60px">
  <el-form-item label="姓名">
    <el-input v-model="regForm.name"></el-input>
  </el-form-item> 
  <el-form-item label="类型">
    <el-select v-model="regForm.type" placeholder="请选择用户类型">
      <el-option label="商家" value="saler"></el-option>
      <el-option label="买家" value="buyer"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="账号">
    <el-input v-model="regForm.id"></el-input>
  </el-form-item> 
  <el-form-item label="密码">
    <el-input v-model="regForm.password"></el-input>
  </el-form-item> 
  <el-form-item>
    <el-button type="primary" @click="onReg">立即注册</el-button>
    <el-button @click="toLogin">登录</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>
<script>
import {request} from '../network/request'
export default {
  name: 'Login',
  data(){
    return{
      loginForm:{
        id:'',
        password:'',
        token:'',
        type:''
      },
      regForm:{
        name:'',
        type:'',      
        id:'',
        password:''
      },
      isLogin:true
    }
  },
  methods:{
    onLogin(){
      // this.$router.push('/home/'+this.loginForm.id);
      // this.$router.push('/home'); 
      // let data = {
      //   "id":this.loginForm.id,
      //   "password":this.loginForm.password
      // }
      // const data=JSON.stringify({      这方法没用,传到后端必须用application/json
      //   "id":this.loginForm.id,
      //   "password":this.loginForm.password
      // })
      request({
        url:'/users/userLogin',
        method:'post',
        data:{
          type:this.loginForm.type,
          id:this.loginForm.id,
          password:this.loginForm.password
        }
      }).then(res=>{
        if(res.code=='200'){
        this.loginForm.token = res.accessToken
        this.$cookies.set("user_token",this.loginForm.token)
        this.$cookies.set("user_type",this.loginForm.type)
        // this.$store.commit('setType',this.loginForm.type)
        this.$router.push('/home')
        }else{
          console.log(res)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    onReg(){
      request({
        url:'/users/userReg',
        method:'post',
        data:{
          name:this.regForm.name,
          type:this.regForm.type,
          id:this.regForm.id,
          password:this.regForm.password
        }
      }).then(res=>{
        console.log("注册成功")
        console.log(res)
        this.$router.go(0)
      }).catch(err=>{
        console.log(err)
      })
    },
    toReg(){
      this.isLogin=false;
    },
    toLogin(){
      this.isLogin=true;
    }
  }
}
</script>
<style scoped>
.loginbg{
  width:100vw;
  height:100vh;
  background-image:url('../assets/login.jpg');
  background-size:100vw 66vw;
  background-repeat:no-repeat;
}
.form{
  position:relative;

  left:37%;
  top:30vh;
  width:20vw;
  padding:2%;
  color:white;
}
.el-input__inner{
  border-radius:10px;
}

</style>