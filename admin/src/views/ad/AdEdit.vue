<template>
  <div class=''>
    <h1> {{id ? '编辑' : '新建'}}广告位 </h1>
    <el-form @submit.native.prevent="save">
      <!-- 输入广告位名称 -->
      <el-form-item label="名称" >
        <el-input v-model="model.name" ></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})">+添加广告</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24" v-for="(item, index) in model.items" :key="index">
              <el-form-item label="跳转链接（URL）">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top: 0.5rem">
                <el-upload
                  class="image-uploader"
                  :action="$http.defaults.baseURL + '/uploads'"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'image', res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="image" />
                  <i v-else class="el-icon-plus image-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="model.items.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
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
  name: 'AdEdit',
  components: {
  },
  data () {
    return {
      model: {
        items: []
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
      if(this.id){ // 根据广告位是否存在有两种情况
        // 修改广告位
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      }else{
        // 新建广告位
        res = await this.$http.post('rest/ads', this.model)
      }
     
      console.log(res);
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },

    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      // this.model = res.data  // 这样会覆盖掉
      this.model = {...this.model, ...res.data}
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
/* 使用样式穿透，less语言使用/deep/ */
.image-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 30vw;
  height: 30vh;
  line-height: 30vh;
  text-align: center;
}
.image {
  min-width: 30vw;
  height: 30vh;
  display: block;
}
.submit {
  border-top: 8px;
}
</style>