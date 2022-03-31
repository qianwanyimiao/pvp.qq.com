<template>
  <div class="hero-edit">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form @submit.native.prevent="save">
      <!-- value表示默认显示哪个tab-pane -->
      <el-tabs value="basic" type="card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :headers="getAuthHeadersMixin()"
              :show-file-list="false"
              :on-success="(res) => $set(model, 'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :headers="getAuthHeadersMixin()"
              :show-file-list="false"
              :on-success="(res) => $set(model, 'banner', res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <!-- 加multiple就可以多选 -->
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.7em"
              :max="9"
              show-score
              v-model="model.scores.difficulty"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.7em"
              :max="9"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.7em"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.7em"
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <!-- 加multiple就可以多选 -->
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <!-- 加multiple就可以多选 -->
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})">+添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/uploads'"
                  :headers="getAuthHeadersMixin()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却与消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="model.skills.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳拍档" name="partners">
          <el-button
            @click="model.partners.push({})"
            style="margin-bottom: 1rem"
            >+添加英雄</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, index) in model.partners"
              :key="index"
            >
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="model.partners.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item class="submit">
        <el-button type="primary" native-type="submit"> 保存 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  components: {},
  data() {
    return {
      // 装备列表
      items: [],
      // 分类列表
      categories: [],
      // 英雄列表
      heroes: [],
      model: {
        name: "",
        avatar: "",
        // 评分
        scores: {
          difficulty: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
        skills: [],
        partners: [],
      },
    };
  },
  props: {
    id: {},
  },
  //方法集合
  methods: {
    afterUpload(res) {
      // this.$set(this.model, 'avatar', res.url)
      this.model.avatar = res.url;
    },
    async save() {
      let res;
      if (this.id) {
        // 根据分类是否存在有两种情况
        // 修改分类
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        // 新建分类
        res = await this.$http.post("rest/heroes", this.model);
      }

      console.log(res);
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 获取当前英雄数据（或者不存在）
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = res.data; // 这样写会覆盖原有的model，导致model里的scores不存在了
      // 用assign可以优先将this.model原来的属性复制过来
      // this.model = Object.assign({}, this.model, res.data)

      // 或者直接用...扩展操作符
      this.model = { ...this.model, ...res.data };
    },
    // 获取英雄类型列表
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 获取装备类型列表
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    // 获取英雄列表
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    },
    // async fetchParents() {
    //   const res = await this.$http.get(`rest/items`)
    //   this.parents = res.data
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.fetchParents()
    this.fetchItems();
    this.fetchHeroes();
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>
<style scoped>
/* 使用样式穿透，less语言使用/deep/ */
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  height: 5rem;
  width: auto;
  display: block;
}
.submit {
  border-top: 8px;
}
</style>