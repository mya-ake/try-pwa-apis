<template>
  <aside
    ref="drawer"
    class="mdc-drawer mdc-drawer--modal">
    <div class="mdc-drawer__content">
      <nav
        rel="list"
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
  mounted() {
    this.initializeMDC();
  },

  methods: {
    initializeMDC() {
      MDCDrawer.attachTo(this.$refs.drawer);
      MDCList.attachTo(this.$refs.list);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@material/list/mdc-list';
@import '@material/drawer/mdc-drawer';
</style>
