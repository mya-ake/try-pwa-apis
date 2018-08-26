import logger from '~~/lib/logger';

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

  get APPROVED() {
    return 'approved';
  }

  get REJECTED() {
    return 'rejected';
  }

  get NOT_SUPPORTED() {
    return 'not_supported';
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
        logger.name('web-push').error(err);
        return false;
      });
    return result ? this.APPROVED : this.REJECTED;
  }

  getToken() {
    if (this.usable === false) {
      return null;
    }
    return this._messaging.getToken().catch(err => {
      logger.name('web-push').error(err);
      return null;
    });
  }

  _addTokenRefreshListener() {
    this._messaging.onTokenRefresh(this.getToken);
  }

  addMessageListener(listener) {
    this._messaging.onMessage(payload => {
      listener({ payload, messaging: this._messaging });
    });
  }
}
