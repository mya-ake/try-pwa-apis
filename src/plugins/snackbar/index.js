import { Snackbar } from './Snackbar';

const snackbar = new Snackbar();

const install = Vue => {
  Vue.prototype.$_message = message => {
    snackbar.add(message);
  };
};

export const snackbarMixin = {
  beforeDestroy() {
    snackbar.destroy();
  },

  methods: {
    setMDCSnackbar(mdcSnackbar) {
      snackbar.mdcSnackbar = mdcSnackbar;
    },
  },
};

export default {
  install,
};
