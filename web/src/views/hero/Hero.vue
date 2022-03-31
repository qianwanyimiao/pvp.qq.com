<template>
  <div class="page-hero" v-if="model">
    <div
      class="top-bar bg-black py-2 px-3 d-flex text-white"
      style="align-items: center"
    >
      <img src="../../assets/logo.png" alt="logo" height="30" />
      <div class="px-2 flex-1">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div" class="text-white"
        >更多英雄 &gt;</router-link
      >
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white px-3 d-flex flex-column">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">
          {{ model.categories.map((v) => v.name).join("/") }}
        </div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficulty }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm"
            >皮肤：9 &gt;</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Hero",
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
      // this.fetch();
    },
  },
  //方法集合
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
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
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    justify-content: flex-end;
    height: 100%;
    padding-bottom: 1rem;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>  