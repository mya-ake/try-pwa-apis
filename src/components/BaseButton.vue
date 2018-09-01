<template>
  <button 
    ref="button" 
    :class="{
      'mdc-button--raised': raised,
      'base-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      'base-button--unelevated': unelevated,
      'base-button--processing': processing,
    }"
    class="base-button mdc-button"
    @click="handleClick"
  >
    <slot/>
  </button>
</template>

<script>
import { MDCRipple } from '@material/ripple';

export default {
  name: 'BaseButton',

  props: {
    raised: {
      type: Boolean,
      default: false,
    },

    unelevated: {
      type: Boolean,
      default: false,
    },

    asyncOnClick: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      processing: false,
    };
  },

  mounted() {
    this.initializeMDC();
  },

  methods: {
    initializeMDC() {
      new MDCRipple(this.$refs.button);
    },

    async handleClick() {
      this.$emit('click');
      if (typeof this.asyncOnClick !== 'function') {
        return;
      }
      if (this.processing === true) {
        return;
      }
      this.processing = true;
      await this.asyncOnClick();
      this.processing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@material/button/mdc-button';

.base-button {
  @include mdc-button-ink-color(teal);
  @include mdc-states(teal);
}

.base-button--unelevated,
.base-button--raised {
  @include mdc-button-container-fill-color(teal);
  @include mdc-button-ink-color(white);
  @include mdc-states(white);
}

.base-button--processing {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
