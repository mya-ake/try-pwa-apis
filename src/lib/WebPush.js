import logger from '~~/lib/logger';

export class WebPush {
  constructor({ firebaseMessaging, publicKey }) {
    this._messaging = firebaseMessaging;
    this._messaging.usePublicVapidKey(publicKey);

    this._addTokenRefreshListener();
  }

  get APPROVED() {
    return 'approved';
  }

  get REJECTED() {
    return 'rejected';
  }

  async requestPermission() {
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
