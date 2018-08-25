<template>
  <button 
    ref="button" 
    class="base-button mdc-button"
    @click="$emit('click')"
  >
    <slot/>
  </button>
</template>

<script>
import { MDCRipple } from '@material/ripple';

export default {
  name: 'BaseButton',

  mounted() {
    this.initializeMDC();
  },

  methods: {
    initializeMDC() {
      new MDCRipple(this.$refs.button);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@material/button/mdc-button';

.base-button {
  @include mdc-button-container-fill-color(teal);
  @include mdc-button-ink-color(white);
  @include mdc-states(white);
}
</style>
