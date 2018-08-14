import { usableServiceWorker } from './lib/check-api';
import logger from './../lib/logger';

export default () => {
  if (usableServiceWorker() === false) {
    return;
  }
  window.navigator.serviceWorker
    .register('./sw.js')
    .then(registration => {
      logger.name('sw').info('success', registration);
    })
    .catch(err => {
      logger.name('sw').error(err);
    });
};
