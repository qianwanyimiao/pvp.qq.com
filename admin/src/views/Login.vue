<template>
  <div class='login'>
    <el-card class="login-card" shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>登录</span>
      </div>
      <!-- prevent表示阻止表单的默认提交不要跳转页面 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
      
    </el-card>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      model: {}
    };
  },
  props: {},
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async login() {
      // 登录成功后得到返回的token
      const res = await this.$http.post('login', this.model)
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  },
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
<style scoped>
.login-card {
  width: 60vw;
  max-width: 400px;
  margin: 6rem auto;
  text-align: center;
}
</style>