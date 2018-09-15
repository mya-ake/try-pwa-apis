<template>
  <aside
    class="mdc-drawer mdc-drawer--modal">
    <div class="mdc-drawer__content">
      <nav
        ref="list"
        class="mdc-list">
        <a
          class="mdc-list-item mdc-list-item--activated"
          href="#"
          aria-selected="true">
          <i
            class="material-icons mdc-list-item__graphic"
            aria-hidden="true">inbox</i>Inbox
        </a>
        <a
          class="mdc-list-item"
          href="#">
          <i
            class="material-icons mdc-list-item__graphic"
            aria-hidden="true">send</i>Outgoing
        </a>
        <a
          class="mdc-list-item"
          href="#">
          <i
            class="material-icons mdc-list-item__graphic"
            aria-hidden="true">drafts</i>Drafts
        </a>
      </nav>
    </div>
  </aside>
</template>

<script>
import { MDCList } from '@material/list';
import { MDCDrawer } from '@material/drawer';

export default {
  data() {
    return {
      drawer: null,
    };
  },

  mounted() {
    this.initializeMDC();
    this.attachHandler();
  },

  methods: {
    initializeMDC() {
      this.drawer = MDCDrawer.attachTo(this.$el);
      MDCList.attachTo(this.$refs.list);
    },

    attachHandler() {
      this.$on('open', this.handleOpen);
      this.$on('close', this.handleClose);
    },

    open() {
      this.drawer.open = true;
    },

    close() {
      this.drawer.open = false;
    },

    handleOpen() {
      this.open();
    },

    handleClose() {
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
