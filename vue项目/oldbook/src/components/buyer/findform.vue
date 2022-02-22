<template>
  <div>
    <el-dialog
      title="申请书单"
      :visible.sync="show"
      width="35%"
      :before-close="handleClose"
    >
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
      </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sendForm"
          >发布</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Findform",
  props: {
    salerid:{
      type:String,
      default:''
    },
    show: {
      type: Boolean,
      default: false,
    }
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
          }
      }
  },
  methods:{
      sendForm(){
          this.findForm.saler=this.salerid
          this.$emit('sendForm',this.findForm)
      },
      handleClose(){
          this.$emit('close')
      }
  }
};
</script>
<style scoped>
.findFrame{
    width: 25vw;
    background:white;
    border-radius: 20px;
    margin: 0 auto;
      
}
</style>