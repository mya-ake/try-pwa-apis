import { Snackbar } from './Snackbar';

const snackbar = new Snackbar();

const install = Vue => {
  const messageFunc = message => {
    snackbar.add(message);
  };
  messageFunc.hide = () => {
    snackbar.hide();
  };
  Vue.prototype.$_message = messageFunc;
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
