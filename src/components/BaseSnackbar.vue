<template>
  <div 
    ref="snackbar"
    class="mdc-snackbar mdc-snackbar--align-start"
    aria-live="assertive"
    aria-atomic="true"
    aria-hidden="true">
    <div class="mdc-snackbar__text"/>
    <div class="mdc-snackbar__action-wrapper">
      <button 
        type="button" 
        class="mdc-snackbar__action-button"/>
    </div>
  </div>
</template>

<script>
import { MDCSnackbar } from '@material/snackbar';
import { snackbarMixin } from '@/plugins/snackbar';

export default {
  mixins: [snackbarMixin],

  mounted() {
    this.initializeMDC();
  },

  methods: {
    initializeMDC() {
      const mdcSnackbar = new MDCSnackbar(this.$refs.snackbar);
      this.setMDCSnackbar(mdcSnackbar);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@material/snackbar/mdc-snackbar';
</style>
