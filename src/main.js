import Vue from 'vue';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';

import registerSW from './register-sw';
import webPush from './services/web-push';
import logger from '~~/lib/logger';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

registerSW();

(async () => {
  await webPush.requestPermission();
  await webPush.getToken();
  webPush.addMessageListener(payload => {
    logger.name('push-listener').info(payload);
  });
})();
