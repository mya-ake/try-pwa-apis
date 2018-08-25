import Vue from 'vue';
import Router from 'vue-router';
import { Home, WebPush } from './views';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/web-push',
      name: 'web-push',
      component: WebPush,
    },
  ],
});
