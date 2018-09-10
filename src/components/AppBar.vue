<template>
  <header
    class="mdc-top-app-bar mdc-top-app-bar--fixed app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <a
          href="#"
          class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
        <span class="mdc-top-app-bar__title">Try PWA</span>
      </section>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@material/top-app-bar/mdc-top-app-bar';

.app-bar {
  @include mdc-top-app-bar-fill-color(teal);

  top: 0;
}
</style>
