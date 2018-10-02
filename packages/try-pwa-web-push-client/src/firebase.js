import Vue from "vue";
import Firebase from "./plugins/firebase";

import { appConfig, messagingConfig } from "./config/firebase-config";

Vue.use(Firebase, {
  appConfig,
  messagingConfig
});

Vue.$_webPush.addPushListener(payload => {
  console.log("[info]", "Received foreground message", payload);
  const { data } = payload;

  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: "/icons/android-chrome-192x192.png"
  };
  new Notification(notificationTitle, notificationOptions);
});
