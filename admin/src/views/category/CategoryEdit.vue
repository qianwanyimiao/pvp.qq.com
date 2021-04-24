<template>
  <div class=''>
    <h1> {{id ? '编辑' : '新建'}}分类 </h1>
    <el-form @submit.native.prevent="save">
      <!-- 选择上级分类 -->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" >
        <!-- value才是最终传到数据库的值，label是展示的值 -->
        <el-option v-for="item in parents"
          :key="item.id"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
      </el-form-item>
      <!-- 输入分类名称 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  components: {
  },
  data () {
    return {
      model: {

      },
      parents: [], // 父级目录选项
    };
  },
  props: {
    id: {}
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async save() {
      let res
      if(this.id){ // 根据分类是否存在有两种情况
        // 修改分类
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      }else{
        // 新建分类
        res = await this.$http.post('rest/categories', this.model)
      }
     
      console.log(res);
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },

    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },

    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.fetchParents()
    this.id && this.fetch()
  },
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
<style scoped>
</style>