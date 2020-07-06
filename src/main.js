import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'

import './assets/styles/index.css';
import "font-awesome/css/font-awesome.min.css";

Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
