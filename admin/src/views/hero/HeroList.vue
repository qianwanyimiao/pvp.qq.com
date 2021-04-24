<template>
  <div class="category-list">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220px"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template v-slot="scope">
          <img :src="scope.row.avatar" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180px">
        <template v-slot="scope">
          <!-- 将表格这行数据的id作为参数进行跳转页面 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
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
  name: "HeroList",

  data() {
    return {
      items: [],
    };
  },

  //方法集合
  methods: {
    // 获取英雄数据并显示
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.items = res.data;
    },
    // 删除某个英雄
    async remove(row) {
      this.$confirm(`是否确定删除英雄 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$http.delete(`rest/heroes/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 删除后刷新一下显示数据
        this.fetch();
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fetch();
  },
};
</script>
