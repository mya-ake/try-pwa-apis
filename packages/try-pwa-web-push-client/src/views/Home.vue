<template>
  <div class="home">
    <h1>Try Web Push</h1>

    <section>
      <h2>Env Information</h2>

      <p>
        <span>Web Push：</span>
        <span>{{ webPushUsable | usable }}</span>
      </p>
      <p>
        <span>Has Push Token：</span>
        <span>{{ hasToken | usable }}</span>
      </p>
    </section>

    <section>
      <h2>Actions</h2>

      <div>
        <button
          v-if="!hasToken"
          :disabled="!webPushUsable"
          type="button"
          @click="handleClickUse">Use web push</button>
      </div>

      <div class="row">
        <button
          v-if="hasToken"
          type="button"
          @click="handleClickSend">Send push notification</button>
      </div>

      <div>
        <button
          v-if="hasToken"
          type="button"
          @click="handleClickStop">Stop using web push</button>
      </div>

      <p v-if="hasMessage">Message:{{ message }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      token: null,
      message: ""
    };
  },

  filters: {
    usable(flg) {
      return flg === true ? "⭕" : "❌";
    }
  },

  computed: {
    webPushUsable: vm => vm.$_webPush.usable,
    hasToken: vm => vm.token !== null,
    hasMessage: vm => vm.message.length > 0
  },

  async mounted() {
    await this.initialize();
  },

  methods: {
    async initialize() {
      this.token = await this.$_storage.load("push-token");
      if (this.hasToken === false) {
        return;
      }
    },

    async handleClickUse() {
      const result = await this.$_webPush.requestPermission();
      if (result === this.$_webPush.REJECTED) {
        this.message =
          "プッシュ通知は拒否されています。サイト情報を表示からステータスをご確認ください。";
        return;
      }

      await this.getToken();

      this.message = "プッシュ通知が設定されました。";
    },

    async getToken() {
      const token = await this.$_webPush.getToken();
      this.token = token;
      await this.$_storage.save("push-token", token);
    },

    async handleClickSend() {
      const response = await this.$_axios
        .post("/notify", {
          token: this.token
        })
        .catch(err => err.response);

      if (response.status === 200) {
        this.message = "プッシュ通知を送信しました";
      } else {
        this.message = "プッシュ通知の送信に失敗しました";
        console.error(response);
      }
    },

    async handleClickStop() {
      const result = await this.$_webPush.deleteToken(this.token);
      if (result === this.$_webPush.FAILED) {
        this.message = "プッシュ通知の解除に失敗しました";
        return;
      }

      await this.clearToken();

      this.message = "プッシュ通知を解除しました";
    },

    async clearToken() {
      this.token = null;
      await this.$_storage.delete("push-token");
    }
  }
};
</script>

<style lang="postcss" scoped>
.row {
  margin-bottom: 16px;
}
</style>
