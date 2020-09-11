require('./bootstrap');

import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";

import store from './store';

import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(VueAxios, axios)
new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
