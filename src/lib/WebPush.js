import logger from '~~/lib/logger';

export class WebPush {
  constructor({ firebaseMessaging, publicKey }) {
    this._messaging = firebaseMessaging;
    this._messaging.usePublicVapidKey(publicKey);

    this._addTokenRefreshListener();
  }

  async requestPermission() {
    const response = await this._messaging.requestPermission().catch(err => {
      // エラーのときは拒否されているとき
      logger.name('web-push').error(err);
    });
    logger.name('web-push').info(response);
  }

  async getToken() {
    const token = await this._messaging.getToken().catch(err => {
      logger.name('web-push').error(err);
      return null;
    });
    if (token === null) {
      logger.name('web-push').info('no-token');
    } else {
      logger.name('web-push').info(`token:${token}`);
    }
  }

  _addTokenRefreshListener() {
    this._messaging.onTokenRefresh(this.getToken);
  }

  addMessageListener(listener) {
    this._messaging.onMessage(listener);
  }
}
