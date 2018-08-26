import firebase from 'firebase/app';
import 'firebase/messaging';
import { config } from '~~/config/firebase';

const app = firebase.initializeApp(config);
export default app;

export const firebaseMessaging = (() => {
  try {
    return app.messaging();
  } catch (err) {
    return null;
  }
})();
