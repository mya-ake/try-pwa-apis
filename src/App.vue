<template>
  <div id="app">
    <app-drawer ref="drawer"/>
    <div class="mdc-drawer-scrim"/>
    <app-bar
      ref="appBar"
      @click-menu="handleClickMenu"/>
    <main
      ref="main"
      class="main mdc-top-app-bar--fixed-adjust">
      <router-view/>
    </main>

    <base-snackbar/>
  </div>
</template>

<script>
import { AppBar, AppDrawer } from '@/components';

export default {
  components: {
    AppBar,
    AppDrawer,
  },

  mounted() {
    this.$refs.appBar.$emit('set-main', document.body);
  },

  methods: {
    handleClickMenu() {
      this.$refs.drawer.$emit('open');
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
  display: block;
}
</style>
