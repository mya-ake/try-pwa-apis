export const usableServiceWorker = () => {
  return 'serviceWorker' in window.navigator;
};

export const usableShareApi = () => {
  return 'share' in window.navigator;
};
