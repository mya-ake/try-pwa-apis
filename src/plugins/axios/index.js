import axios from 'axios';

const install = (Vue, config) => {
  if (name === null) {
    throw new Error(`Require name @storage plugin`);
  }

  const client = axios.create(config);
  Vue.prototype.$_axios = client;
};

export default {
  install,
};
