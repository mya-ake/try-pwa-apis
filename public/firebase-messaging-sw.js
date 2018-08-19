importScripts('https://www.gstatic.com/firebasejs/5.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '847955351677',
});

const messaging = firebase.messaging();
