importScripts('https://www.gstatic.com/firebasejs/5.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '847955351677',
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  const { data } = payload;

  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: '/icons/android-chrome-192x192.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
