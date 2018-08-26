<template>
  <div>
    <h1>Web Push</h1>

    <p>
      <span>プッシュ通知：</span>
      <span v-if="usable === false">使用不可</span>
      <span v-else-if="hasToken">設定済み</span>
      <span v-else>未設定</span>
    </p>
    <base-button 
      v-if="!hasToken"
      :disabled="!usable"
      type="button"
      @click="handleClickRequestPermission"
    >プッシュ通知を利用する</base-button>
  </div>
</template>

<script>
import webPush from '@/services/web-push';

export default {
  name: 'WebPush',

  data() {
    return {
      usable: webPush.usable,
      token: null,
    };
  },

  computed: {
    hasToken() {
      return this.token !== null;
    },
  },

  mounted() {
    this.getToken();
  },

  methods: {
    async getToken() {
      this.token = await webPush.getToken();
    },

    async handleClickRequestPermission() {
      const result = await webPush.requestPermission();
      if (result === webPush.REJECTED) {
        this.$_message({
          message: 'プッシュ通知は未設定です',
          actionText: 'OK',
          actionHandler() {},
        });
        return;
      }
      await this.getToken();
      this.$_message({
        message: 'プッシュ通知が設定されました',
        actionText: 'OK',
        actionHandler() {},
      });
    },
  },
};
</script>
