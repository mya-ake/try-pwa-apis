<template>
  <div id="app">
    <main class="main">
      <router-view/>
    </main>

    <base-snackbar/>
  </div>
</template>

<style>
#app {
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
