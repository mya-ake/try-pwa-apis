export class WebPush {
  constructor({ firebaseMessaging, publicKey }) {
    this._usable = firebaseMessaging !== null;
    this._messaging = firebaseMessaging;

    if (this.usable === false) {
      return this;
    }
    this._messaging.usePublicVapidKey(publicKey);

    this._addTokenRefreshListener();
    return this;
  }

  get usable() {
    return this._usable;
  }

  get SUCCESS() {
    return "success";
  }

  get FAILED() {
    return "failed";
  }

  get APPROVED() {
    return "approved";
  }

  get REJECTED() {
    return "rejected";
  }

  get NOT_SUPPORTED() {
    return "not_supported";
  }

  async requestPermission() {
    if (this.usable === false) {
      return this.NOT_SUPPORTED;
    }
    const result = await this._messaging
      .requestPermission()
      .then(() => true)
      .catch(err => {
        // エラーのときは拒否されているとき
        console.error(err);
        return false;
      });
    return result ? this.APPROVED : this.REJECTED;
  }

  getToken() {
    if (this.usable === false) {
      return null;
    }
    return this._messaging.getToken().catch(err => {
      console.error(err);
      return null;
    });
  }

  deleteToken(token) {
    if (this.usable === false) {
      return this.FAILED;
    }
    return this._messaging
      .deleteToken(token)
      .then(result => {
        return result === true ? this.SUCCESS : this.FAILED;
      })
      .catch(err => {
        console.error(err);
        return this.FAILED;
      });
  }

  _addTokenRefreshListener() {
    // トークンリフレッシュはまだ再現ができてないので仮コード
    this._messaging.onTokenRefresh(() => {
      console.log("token refresh");
      this.getToken();
    });
  }

  addPushListener(listener) {
    if (this.usable === false) {
      return;
    }
    this._messaging.onMessage(listener);
  }
}
