<template>
  <div>
    <el-tabs
      style="width: 80vw; margin-left: 10vw"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="经济管理" name="first">
        <div
          class="bookFrame"
          @click="showCategory(item)"
          v-for="(item, index) in getCategory(0)"
          :key="index"
        >
          <img :src="item.picture" style="height: 200px; width: 200px" />
          <p class="booksName">{{ item.name }}</p>
          <p class="booksAuthor">{{ item.author }}</p>
          <p class="booksPrice">{{ item.price }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文学艺术" name="second">
        <div
          class="bookFrame"
          @click="showCategory(item)"
          v-for="(item, index) in getCategory(1)"
          :key="index"
        >
          <img :src="item.picture" style="height: 200px; width: 200px" />
          <p class="booksName">{{ item.name }}</p>
          <p class="booksAuthor">{{ item.author }}</p>
          <p class="booksPrice">{{ item.price }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人文社科" name="third">
        <div
          class="bookFrame"
          @click="showCategory(item)"
          v-for="(item, index) in getCategory(2)"
          :key="index"
        >
          <img :src="item.picture" style="height: 200px; width: 200px" />
          <p class="booksName">{{ item.name }}</p>
          <p class="booksAuthor">{{ item.author }}</p>
          <p class="booksPrice">{{ item.price }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="科学技术" name="fourth">
        <div
          class="bookFrame"
          @click="showCategory(item)"
          v-for="(item, index) in getCategory(3)"
          :key="index"
        >
          <img :src="item.picture" style="height: 200px; width: 200px" />
          <p class="booksName">{{ item.name }}</p>
          <p class="booksAuthor">{{ item.author }}</p>
          <p class="booksPrice">{{ item.price }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="教育考试" name="five">
        <div
          class="bookFrame"
          @click="showCategory(item)"
          v-for="(item, index) in getCategory(4)"
          :key="index"
        >
          <img :src="item.picture" style="height: 200px; width: 200px" />
          <p class="booksName">{{ item.name }}</p>
          <p class="booksAuthor">{{ item.author }}</p>
          <p class="booksPrice">{{ item.price }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="生活休闲" name="six">
        <div
          class="bookFrame"
          @click="showCategory(item)"
          v-for="(item, index) in getCategory(5)"
          :key="index"
        >
          <img :src="item.picture" style="height: 200px; width: 200px" />
          <p class="booksName">{{ item.name }}</p>
          <p class="booksAuthor">{{ item.author }}</p>
          <p class="booksPrice">{{ item.price }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Category",
  props: {
    allbook: {
      type: Array,
      default: function () {
        return [];
      },
    }
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCategory(index) {
      if (index == 0) {
        return this.allbook.filter((item) => {
          return item.category == "经济管理";
        });
      } else if (index == 1) {
        return this.allbook.filter((item) => {
          return item.category == "文学艺术";
        });
      } else if (index == 2) {
        return this.allbook.filter((item) => {
          return item.category == "人文社科";
        });
      } else if (index == 3) {
        return this.allbook.filter((item) => {
          return item.category == "科学技术";
        });
      } else if (index == 4) {
        return this.allbook.filter((item) => {
          return item.category == "教育管理";
        });
      }else if(index == 5){
         return this.allbook.filter((item) => {
          return item.category == "生活休闲";
        });
      }
    },
    showCategory(item){
        console.log(item)
        this.$emit('showDetail',item)
    }
  },
 
};
</script>
<style scoped>
.bookFrame {
  display: inline-block;
  margin-left: 5vw;
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
  font-size: 15px;
  font-family: Arial;
}
</style>