<template>
  <!--推荐(首页)-->
  <div class="recommend">
    <transition mode="in-out">
      <my-scroll :style="{...com_state_style}">
        <!--轮播图-->
        <my-swiper v-if="banner[0]">
          <swiper-slide v-for="(item,index) in banner" :key="index">
            <div class="pic">
              <img :src="item.cover" alt @click="handleClick(item)" />
            </div>
          </swiper-slide>
        </my-swiper>

        <!--分类列表-->
        <category-list v-if="categoryList.data">
          <template #title>
            <h3 class="title">热门歌单推荐</h3>
          </template>
          <template #list>
            <li v-for="(item, index) in categoryList.data" :key="index" @click="handleClick(item)">
              <div class="pic">
                <img :src="item.cover" alt />
              </div>
              <div class="right">
                <h4 class="category_title">{{categoryList.category}}</h4>
                <p>{{item.child_title}}</p>
              </div>
            </li>
          </template>
        </category-list>
      </my-scroll>
    </transition>

    <transition mode="in-out">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import recommend from "../../../api/recommend";
import { mapState } from "vuex";

export default {
  name: "Recommend",
  data() {
    return {
      banner: [],
      categoryList: {}
    };
  },
  created() {
    //获取歌曲分类
    recommend().then(data => {
      if (data.status) {
        this.banner = data.data[0].v_card;
        this.categoryList = {
          category: data.data[1].category_title,
          data: data.data[1].v_card
        };
      }else{
        console.log(data.msg);
      }
    });
  },
  methods: {
    //跳转到歌单页
    handleClick(item) {
      if (item.child_id !== this.$route.params.id) {
        this.$router.push({
          name: "disc",
          params: {
            id: item.child_id
          }
        });
      }
    }
  },
  computed: {
    //当有音乐播放时给滚动组件添加的样式
    ...mapState(["com_state_style"])
  }
};
</script>

<style scoped lang="stylus">
.recommend {
  background-color: #000;
}
</style>