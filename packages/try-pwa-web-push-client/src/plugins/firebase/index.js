import { FirebaseApp } from "./core/FirebaseApp";
import { WebPush } from "./services/WebPush";

const install = (Vue, { appConfig, messagingConfig } = {}) => {
  const firebaseApp = new FirebaseApp(appConfig);
  const firebaseMessaging = firebaseApp.createMessaging();

  const webPush = new WebPush({
    firebaseMessaging,
    publicKey: messagingConfig.publicKey
  });

  Vue.$_webPush = webPush;
  Object.defineProperty(Vue.prototype, "$_webPush", {
    get() {
      return webPush;
    }
  });
};

export default {
  install
};
