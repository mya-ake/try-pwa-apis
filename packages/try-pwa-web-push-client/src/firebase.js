import Vue from "vue";
import Firebase from "./plugins/firebase";

import { appConfig, messagingConfig } from "./config/firebase-config";

Vue.use(Firebase, {
  appConfig,
  messagingConfig
});
