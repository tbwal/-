<template>
  <div style="background: #F9F9F9;">
    <addgoods></addgoods>
    <div class="bookFrame"  @click="updatedetail(item)" v-for="(item, index) in salerBook" :key="index">
      <div class="imgFrame">
        <img
          :src="salerBook[index].picture"
          style="height: 200px; width: 200px"
        />
      </div>
      <div class="textFrame">
        <p style="font-size: 13px; color: #464646; font-family: 'Microsoft YaHei', '\5b8b\4f53'; margin: 0">
          {{ salerBook[index].name }}
        </p>
        <p>{{ salerBook[index].author }}</p>
        <p>{{ salerBook[index].publisher }}</p>
        <p>出售数量：{{ salerBook[index].number }}</p>
      </div>
    </div>
    
    <updategoods :bookdetail="detail" :show="isShow"  @close="close"></updategoods>
    <!-- <div class="addButton">
      <img style="height: 100px; width: 100px" src="../assets/add-goods.jpg" />
    </div> -->
  </div>
</template>
<script>
import { request } from "../network/request";
import Addgoods from "../components/saler/addgoods.vue";
import Updategoods from "../components/saler/updategoods.vue";
export default {
  name: "manage",
  components: {
    addgoods: Addgoods,
    updategoods: Updategoods,
  },
  data() {
    return {
      salerBook: [],
      isShow:false,
      detail:{}
    };
  },
  created() {
    request({
      url: "/users/getSale",
      method: "post",
    })
      .then((res) => {
        console.log(res);
        for (let n of res.result) {
          this.salerBook.push(n);
        }
        console.log(this.salerBook);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
      updatedetail(item){
          this.isShow=true
          this.detail=item
      },
      close(){
          this.isShow=false
          this.detail={}
      }
  }
};
</script>
<style scoped>
.bookFrame {
  display: inline-block;
  margin-left: 100px;
  margin-top: 80px;
  border-radius: 5px;
  color: #868686;
  font-size: 12px;
}
.imgFrame {
  width: 200px;
  height: 200px;
  /* border: 1px solid #ff8484; */
  padding: 10px;
  background: white;
}
.textFrame {
  height: 70px;
  /* background: #ff8484; */
  background: white;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.addButton {
  margin-left: 100px;
  margin-top: 80px;
  height: 100px;
  width: 220px;
  text-align: center;
}
p:nth-of-type(3) {
  margin-top: -1px;
  float: left;
}
p:nth-of-type(4) {
  margin-top: -1px;
  float: right;
  color: #ff1c1c;
  font-size: 13px;
  font-weight: 700;
}
</style>