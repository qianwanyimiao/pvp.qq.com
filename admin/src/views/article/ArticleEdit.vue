<template>
  <div class="">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form @submit.native.prevent="save">
      <!-- 选择所属分类 -->
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <!-- value才是最终传到数据库的值，label是展示的值 -->
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 输入文章标题 -->
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit"> 保存 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleEdit",
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: [], // 文章所属分类（可能有多个）
    };
  },
  props: {
    id: {},
  },
  //方法集合
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 根据文章是否存在有两种情况
        // 修改文章
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 新建文章
        res = await this.$http.post("rest/articles", this.model);
      }

      console.log(res);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 获取文章数据
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 获取文章分类数据
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 文章详情中处理图片添加
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>
