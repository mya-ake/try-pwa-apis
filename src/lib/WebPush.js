import logger from '~~/lib/logger';

export class WebPush {
  constructor({ firebaseMessaging, publicKey }) {
    this._messaging = firebaseMessaging;
    this._messaging.usePublicVapidKey(publicKey);
  }

  async requestPermission() {
    const response = await this._messaging.requestPermission().catch(err => {
      // エラーのときは拒否されているとき
      logger.name('web-push').error(err);
    });
    logger.name('web-push').info(response);
  }
}
