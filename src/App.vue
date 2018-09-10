<template>
  <div id="app">
    <app-drawer/>
    <app-bar/>

    <main class="main">
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

<style>
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
  margin-top: 64px;
}
</style>
