<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom" style="line-height: 1.69rem">
      <div
        @click="back"
        class="iconfont"
        style="width: 1.69rem; height: 1.69rem"
      >
        <svg
          t="1647250361334"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2257"
          width="100%"
          height="100%"
        >
          <path
            d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"
            p-id="2258"
            fill="#1296db"
          ></path>
        </svg>
      </div>
      <strong class="flex-1 text-blue pl-2">
        {{ model.title }}
      </strong>
      <div class="text-grey fs-xs">2022-03-15</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="py-1"
          :to="`/articles/${item._id}`"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          >{{ item.title }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Article",
  components: {},
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {
    id() {
      this.fetch();
    },
  },
  //方法集合
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },

    back() {
      this.$router.back(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fetch();
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
<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>  