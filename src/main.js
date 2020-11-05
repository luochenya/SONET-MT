import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FBSignInButton from "vue-facebook-signin-button";
import "@/assets/css/index.scss";
import "vant/lib/index.css";
import { Popup, Toast, Swipe, SwipeItem, Switch, DatetimePicker, Uploader, List } from "vant";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.use(FBSignInButton);
// vant
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Switch);
Vue.use(DatetimePicker);
Vue.use(Uploader);
Vue.use(List);
Vue.config.productionTip = false;

// 彈出框禁止滑動
Vue.prototype.noScroll = function() {
  const mo = function(e) {
    e.preventDefault();
  };
  document.body.style.overflow = "hidden";
  document.addEventListener("touchmove", mo, false); // 禁止頁面滑動
};
// 彈出框可以滑動
Vue.prototype.canScroll = function() {
  const mo = function(e) {
    e.preventDefault();
  };
  document.body.style.overflow = ""; // 出現滾動條
  document.removeEventListener("touchmove", mo, false);
};
// 跳转路由回到页面顶部
router.afterEach(() => {
  window.scrollTo(0, 0);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
