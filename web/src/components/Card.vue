<template>
  <div class="card bg-white mt-3 p-3">
      <div class="card-header d-flex ai-center pb-4">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  components: {
  },
  data () {
    return {};
  },
  props: {
    // 标题
    title: {
      type: String,
      required: true
    },
    // 图标
    icon: {
      type: String,
      required: true
    }
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  //生命周期 - 更新之前
  updated () {},
  //生命周期 - 销毁完成
  destroyed () {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated () {},
  }
</script>
<style scoped lang="scss">
@import "../assets/css/_variable";
  .card {
    border-bottom: 1px solid $border-color;
    .card-header {
      border-bottom: 1px solid #d4d9de;
    }
  }
</style>