export const createMessaging = firebaseApp => {
  try {
    return firebaseApp.messaging();
  } catch (err) {
    return null;
  }
};
