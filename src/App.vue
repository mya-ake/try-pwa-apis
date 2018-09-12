<template>
  <div id="app">
    <app-drawer/>
    <div class="mdc-drawer-scrim"/>
    <app-bar/>

    <main class="main mdc-top-app-bar--fixed-adjust">
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
