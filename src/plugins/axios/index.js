import axios from 'axios';

const install = (Vue, config) => {
  const client = axios.create(config);
  Vue.prototype.$_axios = client;
};

export default {
  install,
};
