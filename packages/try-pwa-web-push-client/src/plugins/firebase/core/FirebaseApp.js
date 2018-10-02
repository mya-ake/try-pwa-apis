import firebase from "firebase/app";
import "firebase/messaging";

export class FirebaseApp {
  constructor(config) {
    this._app = firebase.initializeApp(config);
  }

  get app() {
    return this._app;
  }

  createMessaging() {
    try {
      return this.app.messaging();
    } catch (err) {
      return null;
    }
  }
}
