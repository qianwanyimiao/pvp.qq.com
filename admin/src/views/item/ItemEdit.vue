<template>
  <div class="">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form @submit.native.prevent="save">
      <!-- 输入物品名称 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="icon-uploader"
          :action="$http.defaults.baseURL + '/uploads'"
          :headers="getAuthHeadersMixin()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="icon" />
          <i v-else class="el-icon-plus icon-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit"> 保存 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ItemEdit",
  components: {},
  data() {
    return {
      model: {},
      // parents: [], // 父级目录选项
    };
  },
  props: {
    id: {},
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    afterUpload(res) {
      // 对于data新增的数据要这样才能实现响应式
      this.$set(this.model, 'icon', res.url)
    },
    async save() {
      let res;
      if (this.id) {
        // 根据装备是否存在有两种情况
        // 修改装备
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        // 新建装备
        res = await this.$http.post("rest/items", this.model);
      }

      console.log(res);
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },

    // async fetchParents() {
    //   const res = await this.$http.get(`rest/items`)
    //   this.parents = res.data
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.fetchParents()
    this.id && this.fetch();
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
/* 使用样式穿透，less语言使用/deep/ */
.icon-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.icon-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.icon-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.icon {
  width: 178px;
  height: 178px;
  display: block;
}
</style>