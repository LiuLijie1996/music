import Vue from 'vue';
import App from './App.vue';
import 'components/common/index'
import router from './router/index';
import store from './store/index';

//公共样式
import './assets/css/index.css';

//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper, /* { default global options } */);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
