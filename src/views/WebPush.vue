<template>
  <div>
    <h1>Web Push</h1>

    <base-button 
      type="button" 
      @click="handleClickRequestPermission"
    >プッシュ通知を許可する</base-button>
  </div>
</template>

<script>
import webPush from '@/services/web-push';

export default {
  name: 'WebPush',

  data() {
    return {
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
