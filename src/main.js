import Vue from 'vue';
import 'normalize.css';
import './assets/scss/styles.scss';

import App from './App.vue';
import router from './router';
import store from './store';

import snackbar from './plugins/snackbar/index';
import storage from './plugins/storage';
import axios from './plugins/axios';

import * as components from './components';
import { importBaseComponents } from './lib/utils';

import registerSW from './register-sw';

Vue.config.productionTip = false;

Vue.use(snackbar);
Vue.use(storage, { name: 'app' });
Vue.use(axios, {
  baseURL: 'https://push-manager.try-pwa.mya-ake.org',
  headers: {
    'x-api-key': process.env.API_KEY,
  },
});

importBaseComponents(Vue, components);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

registerSW();
