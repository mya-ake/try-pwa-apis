import localForage from 'localforage';
import { Storage } from './Storage';

const install = (Vue, { name = null } = {}) => {
  if (name === null) {
    throw new Error(`Require name @storage plugin`);
  }

  const db = localForage.createInstance({
    name,
  });
  Vue.prototype.$_storage = new Storage({ name, db });
};

export default {
  install,
};
