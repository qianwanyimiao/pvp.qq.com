<template>
  <div class="category-list">
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220px"></el-table-column>
      <el-table-column prop="title" label="标题" ></el-table-column>
      <!-- <el-table-column prop="categories" label="所属分类"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="180px">
        <template v-slot="scope">
          <!-- 将表格这行数据的id作为参数进行跳转页面 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  components: {},
  data() {
    return {
      items: [],
    };
  },
  props: {},
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取文章数据并显示
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },
    // 删除某篇文章
    async remove(row) {
      this.$confirm(`是否确定删除文章《${row.title}》`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 删除后刷新一下显示数据
          this.fetch()
        })
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
<style scoped>
</style>