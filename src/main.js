import Vue from 'vue';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';

import registerSW from './register-sw';
import webPush from './services/web-push';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

registerSW();

webPush.requestPermission();
