<template>
  <div style="background: #F9F9F9;">
    <div class="block">
      <el-carousel :interval="4000" type="card" trigger="click" height="25vw">
        <el-carousel-item
          v-for="(item, index) in 3"
          :key="item"
          :style="{ backgroundImage: 'url(' + banners[index] + ')' }"
        >
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-autocomplete
      class="search-input"
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
    <el-button class="search-btn" @click="search" type="primary" icon="el-icon-search">搜索</el-button>
    <div v-if="isShowSearchres">
    <p class="goodsTitle">搜索结果</p>
    <div
      class="searchFrame"
      @click="showdetail(item)"
      v-for="(item, index) in searchres"
      :key="index+'one'"
    >
      <img :src="item.picture" style="height: 200px; width: 200px;float:left;" />
      <div class="detailFrame">
       <p class="booksName">{{ item.name }}</p>
       <p class="booksAuthor">{{ item.author }}/{{item.publisher}}</p>
       <p class="booksIsbn">ISBN：{{ item.isbn }}</p>
      <div style="margin-top:28%;">    
      <p style="float:right;" class="booksPrice">{{ item.price }}</p>
      <img :src="item.headpicture" style="height: 30px; width: 30px" />
      <span class="salername">{{item.salername}}</span>
      </div> 
      </div>
    </div>
    </div>
    <p class="goodsTitle">推荐图书</p>
    <div
      class="bookFrame"
      @click="showdetail(item)"
      v-for="(item, index) in salerBook"
      :key="index+'two'"
    >
      <img :src="item.picture" style="height: 200px; width: 200px" />
      <p class="booksName">{{ item.name }}</p>
      <p class="booksAuthor">{{ item.author }}</p>
      <p class="booksPrice">{{ item.price }}</p>
    </div>
    <p class="goodsTitle">图书分类</p>
    <category :allbook="allBook" @showDetail="showdetail"></category>
    <goodsdetail
      :bookdetail="detail"
      :show="isShow"
      @close="close"
    ></goodsdetail>
  </div>
</template>
<script>
import Category from "../components/user/category.vue";
import Goodsdetail from "../components/user/goodsdetail.vue";
import { request } from "../network/request";
export default {
  components: {
    goodsdetail: Goodsdetail,
    category: Category,
  },
  name: "Recommend",
  data() {
    return {
      banners: [
        require("../assets/banner1.jpg"),
        require("../assets/banner2.jpg"),
        require("../assets/banner3.jpg"),
      ],
      salerBook: [],
      allBook: [],
      detail: {},
      isShow: false,
      state: "",
      timeout: null,
      searchres:[],
      isShowSearchres:false
    };
  },
  methods: {
    showdetail(item) {
      this.isShow = true;
      this.detail = item;
      console.log(this.isShow);
      console.log(this.detail);
    },
    close() {
      this.isShow = false;
      this.detail = {};
    },
    querySearchAsync(queryString, cb) {
      let alldata = [];
      let nameArr=[]
      for (let n of this.allBook) {
        alldata.push(n);
      }
      var results = queryString?alldata.filter(this.createStateFilter(queryString)):alldata;
      for(let n of results){
        let item={}
        item.value=n.name//必须把结果赋值给value属性
        nameArr.push(item)
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(nameArr);
      }, 2000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.name.toLowerCase().indexOf(queryString.toLowerCase()) !=-1
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    search(){
      let results=this.allBook.filter((item)=>{
        return (
          item.name.toLowerCase().indexOf(this.state.toLowerCase())!=-1
        )
      })
      this.searchres=results
      this.isShowSearchres=true
    }
  },
  created() {
    request({
      url: "/users/getGoods",
      method: "post",
    })
      .then((res) => {
        if (res.code == "200") {
          console.log(res);
          if (res.result.length < 8) {
            for (let i = 0; i < res.result.length; i++) {
              this.salerBook.push(res.result[i]);
            }
          } else {
            for (let i = 0; i < 8; i++) {
              this.salerBook.push(res.result[i]);
            }
          }
          for (let n of res.result) {
            this.allBook.push(n);
          }
        } else {
          console.log("获取发布商品失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.el-carousel__item {
  background-size: 50vw 25vw;
}
.goodsTitle {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: #464646;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
}
.bookFrame {
  display: inline-block;
  margin-left: 8vw;

}
.booksName {
  color: #464646;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  font-size: 14px;
}
.booksAuthor {
  color: #999;
  font-size: 12px;
}
.booksPrice {
  color: #da0000;
  font-weight: bold;
  font-size: 17px;
  font-family: Arial;
}
.booksIsbn{
  color: #464646;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  font-size: 12px;
}
.search-input{
  margin-left: 35vw;
  width: 22vw;
}
.search-btn{
  margin-left: 2vw;
}
.searchFrame {
  display: inline-block;
  margin-left:12vw;
  width: 30vw;
  border-radius: 20px;
  padding:1vw;
  background: white;
}
.detailFrame{
  float: left;
}
.salername{
  font-size:12px;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
  color: #666;
}
</style>