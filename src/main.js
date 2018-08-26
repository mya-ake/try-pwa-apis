import Vue from 'vue';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';

import snackbar from './plugins/snackbar/index';
import storage from './plugins/storage';

import * as components from './components';
import { importBaseComponents } from './lib/utils';

import registerSW from './register-sw';

Vue.config.productionTip = false;

Vue.use(snackbar);
Vue.use(storage, { name: 'app' });

importBaseComponents(Vue, components);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

registerSW();
