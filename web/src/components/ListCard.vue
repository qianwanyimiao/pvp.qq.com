<template>
  <m-card :icon="icon" :title="title">
    <template v-slot:default="">
      <div class="nav">
        <div
          class="nav-item"
          :class="{ active: isActive === index }"
          v-for="(item, index) in categories"
          :key="index"
        >
          <div class="nav-link" @click="$refs.list.swiper.slideTo(index)">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="pt-3">
        <swiper
          ref="list"
          :options="{ autoHeight: true }"
          @slide-change="() => (isActive = $refs.list.swiper.activeIndex)"
        >
          <swiper-slide v-for="(category, index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </m-card>
</template>

<script>
export default {
  name: "ListCard",
  components: {},
  data() {
    return {
      isActive: 0,
    };
  },
  props: {
    // 标题
    title: {
      type: String,
      required: true,
    },
    // 图标
    icon: {
      type: String,
      required: true,
    },
    // 目录
    categories: {
      type: Array,
      required: true,
    },
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
<style scoped>
</style>