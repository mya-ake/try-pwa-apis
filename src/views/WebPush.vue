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
      key="button-request-permission"
      :disabled="!usable"
      :async-on-click="handleClickRequestPermission"
      type="button"
      unelevated
    >プッシュ通知を利用する</base-button>
    <base-button
      v-else
      key="button-release-web-push"
      :disabled="!usable"
      :async-on-click="handleClickReleaseWebPush"      
      type="button"
    >プッシュ通知を解除する</base-button>
  </div>
</template>

<script>
import webPush from '@/services/web-push';
import logger from '~~/lib/logger';

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

  async mounted() {
    await this.intialize();
  },

  methods: {
    async intialize() {
      const enabledWebPush = await this.$_storage.load('enabledWebPush');
      if (enabledWebPush !== true) {
        return;
      }
      await this.getToken();
    },

    async getToken() {
      this.token = await webPush.getToken();
      await this.$_storage.save('enabledWebPush', true);
      logger.info(`push token: ${this.token}`);
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

    async handleClickReleaseWebPush() {
      const result = await webPush.deleteToken(this.token);
      if (result === webPush.FAILED) {
        this.$_message({
          message: 'プッシュ通知の解除に失敗しました',
          actionText: 'OK',
          actionHandler() {},
        });
        return;
      }

      await this.clearToken();

      this.$_message({
        message: 'プッシュ通知を解除しました',
        actionText: 'OK',
        actionHandler() {},
      });
    },

    async clearToken() {
      this.token = null;
      await this.$_storage.save('enabledWebPush', false);
    },
  },
};
</script>
