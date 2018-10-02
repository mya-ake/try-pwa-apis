import localForage from "localforage";
import { Storage } from "./Storage";

const install = (Vue, { name = "app-storage" } = {}) => {
  const db = localForage.createInstance({
    name
  });

  const storage = new Storage({ db });
  Object.defineProperty(Vue.prototype, "$_storage", {
    get() {
      return storage;
    }
  });
};

export default {
  install
};
