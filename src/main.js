import Vue from 'vue';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';

import * as components from './components';
import { importBaseComponents } from './lib/utils';

import registerSW from './register-sw';

Vue.config.productionTip = false;

importBaseComponents(Vue, components);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

registerSW();
