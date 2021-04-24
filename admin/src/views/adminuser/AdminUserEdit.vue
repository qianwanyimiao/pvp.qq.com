<template>
  <div class=''>
    <h1> {{id ? '编辑' : '新建'}}管理员 </h1>
    <el-form @submit.native.prevent="save"> 
      <!-- 输入用户名 -->
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
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
  name: 'AdminUserEdit',
  components: {
  },
  data () {
    return {
      model: {

      },

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
      if(this.id){ // 根据用户名是否存在有两种情况
        // 修改管理员
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      }else{
        // 新建管理员
        res = await this.$http.post('rest/admin_users', this.model)
      }
     
      console.log(res);
      this.$router.push('/admin_users/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 获取管理员列表信息
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
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