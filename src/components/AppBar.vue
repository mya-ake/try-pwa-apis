<template>
  <header
    class="mdc-top-app-bar mdc-top-app-bar--fixed app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button
          type="button"
          class="material-icons mdc-top-app-bar__navigation-icon">menu</button>
        <span class="mdc-top-app-bar__title">Try PWA</span>
      </section>
    </div>
  </header>
</template>

<script>
import { MDCTopAppBar } from '@material/top-app-bar';

export default {
  data() {
    return {
      appBar: null,
    };
  },

  mounted() {
    this.initializeMDC();
    this.attachHander();
  },

  methods: {
    initializeMDC() {
      this.appBar = MDCTopAppBar.attachTo(this.$el);
      this.appBar.listen('MDCTopAppBar:nav', this.handleClickMenu);
    },

    attachHander() {
      this.$on('set-main', this.handleSetMain);
    },

    handleClickMenu() {
      this.$emit('click-menu');
    },

    handleSetMain(el) {
      this.appBar.setScrollTarget(el);
    },
  },
};
</script>


<style lang="scss" scoped>
@import '@material/top-app-bar/_mixins';

.app-bar {
  @include mdc-top-app-bar-fill-color(teal);

  top: 0;
}
</style>
