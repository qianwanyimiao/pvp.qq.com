import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/normalize.css";
import "./assets/css/basic.scss";
import "./assets/iconfont/iconfont.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
// import style (<= Swiper 5.x)
import "swiper/css/swiper.css";
import Card from "./components/Card.vue";
import ListCard from "./components/ListCard.vue";
import axios from "axios";
// 使用卡片组件
Vue.component("m-card", Card);

// 使用列表卡片组件
Vue.component("list-card", ListCard);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

// 全局注册http
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "/web/api",
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
