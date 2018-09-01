<template>
  <div>
    <h1>Web Share</h1>

    <base-button 
      :disabled="!usableShareApi" 
      unelevated
      @click="handleClickShare"
    >Share!</base-button>
    <p v-if="!usableShareApi">Web Share APIが利用できないブラウザのようです。</p>
  </div>
</template>

<script>
import { usableShareApi } from '@/lib/check-api';

export default {
  computed: {
    usableShareApi() {
      return usableShareApi();
    },
  },

  methods: {
    async handleClickShare() {
      try {
        // キャンセルされるとハンドリングできないみたい（Promiseが解決されない）
        await window.navigator.share({
          title: document.title,
          text: 'Web Share API のサンプルです。',
          url: window.location.href,
        });
        this.$_message({
          message: 'シェアしました。',
          actionText: 'OK',
          actionHandler() {},
        });
      } catch (err) {
        this.$_message({
          message: 'シェアに失敗しました。',
          actionText: 'OK',
          actionHandler() {},
        });
      }
    },
  },
};
</script>
