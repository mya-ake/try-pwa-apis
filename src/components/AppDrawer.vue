<doc>
list の tabindex の挙動がおかしい
  -> https://github.com/mya-ake/try-pwa-apis/issues/4
</doc>

<template>
  <aside
    class="mdc-drawer mdc-drawer--modal">
    <div class="mdc-drawer__content">
      <nav
        ref="list"
        class="mdc-list">
        <router-link
          v-for="menu in menus"
          ref="listItems"
          :key="menu.to"
          :to="menu.to"
          :aria-selected="menu.selected"
          :tabindex="menu.selected ? '-1' : '0'"
          :class="{ 'mdc-list-item--selected': menu.selected }"
          class="mdc-list-item drawer__item">
          <i
            class="material-icons mdc-list-item__graphic"
            aria-hidden="true">{{ menu.icon }}</i>
          <span>{{ menu.label }} {{ menu.selecte }}</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script>
import { MDCDrawer } from '@material/drawer';
import { MDCRipple } from '@material/ripple';

const menus = [
  {
    label: 'Home',
    icon: 'home',
    to: '/',
  },
  {
    label: 'Web Push',
    icon: 'notifications',
    to: '/web-push',
  },
  {
    label: 'Web Share',
    icon: 'share',
    to: '/web-share',
  },
];

export default {
  data() {
    return {
      drawer: null,
      selectedIndex: 0,
    };
  },

  computed: {
    menus() {
      return menus.map((menu, index) => {
        menu.selected = index === this.selectedIndex;
        return menu;
      });
    },

    activePath() {
      return this.$route.path;
    },
  },

  watch: {
    activePath: {
      async handler(path) {
        this.selectedIndex = this.findIndexActivePath(path);
        await this.$nextTick(); // DOM に反映されるのを待つ
        this.close();
        this.setRipple();
      },
      immediate: true,
    },
  },

  mounted() {
    this.initializeMDC();
    this.attachHandler();
  },

  methods: {
    initializeMDC() {
      this.drawer = MDCDrawer.attachTo(this.$el);
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

    findIndexActivePath(path) {
      return this.menus.findIndex(menu => menu.to === path);
    },

    setRipple() {
      this.$refs.listItems.forEach(vm => new MDCRipple(vm.$el));
    },
  },
};
</script>
