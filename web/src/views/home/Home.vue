<template>
  <div class="home">
    <!-- 首页轮播图 -->
    <swiper :options="swiperOptions">
      <swiper-slide
        ><img class="w-100" src="../../assets/images/home/slide1.jpg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="../../assets/images/home/slide2.jpg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="../../assets/images/home/slide3.jpg"
      /></swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right pr-2 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- 图标导肮 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-mall"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-es"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-newp"></i>
          <div class="py-2">新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-glory"></i>
          <div class="py-2">荣耀·传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-camp"></i>
          <div class="py-2">王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-public"></i>
          <div class="py-2">公众号</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite-version"></i>
          <div class="py-2">版本介绍</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite-gameenv"></i>
          <div class="py-2">对局环境</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite-ip"></i>
          <div class="py-2">IP共创计划</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite-creativity"></i>
          <div class="py-2">创意互动营</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- 新闻资讯 -->
    <list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template v-slot:items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${items._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(items, index) in category.newsList"
          :key="index"
        >
          <span class="text-info">[{{ items.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            items.title
          }}</span>
          <span style="color: #777" class="fs-sm">{{
            items.createdAt | date
          }}</span>
        </router-link>
      </template>
    </list-card>

    <!-- 英雄列表 -->
    <list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template v-slot:items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            style="width: 16.5%; padding: 0.5rem"
            class="text-center"
            v-for="(hero, index) in category.heroList"
            :key="index"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </list-card>
    <list-card icon="card-hero" title="精彩集锦" :categories="heroCats">
    </list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        pagination: {
          el: ".pagination-home",
        },
        // Some Swiper option/callback...
      },
      newsCats: [],
      heroCats: [],
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  props: {},
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async fetchNewCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },

    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fetchNewCats();
    this.fetchHeroCats();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //生命周期 - 更新之前
  updated() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/_variable";

.pagination-home {
  padding-left: -20px;
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 24.5%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>  