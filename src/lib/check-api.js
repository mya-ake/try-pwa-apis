export const usableServiceWorker = () => {
  return 'serviceWorker' in window.navigator;
};
