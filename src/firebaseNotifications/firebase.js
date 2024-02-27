// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP-zGOyrVw5x4tgkVVk3Nre0_Cu6YfZJE",
  authDomain: "second-14d46.firebaseapp.com",
  projectId: "second-14d46",
  storageBucket: "second-14d46.appspot.com",
  messagingSenderId: "271585504102",
  appId: "1:271585504102:web:ba899fdffddea394ceb6a7",
  measurementId: "G-YZ6LY28BV5",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
  // when sending message requests to different push services
  return getToken(messaging, {
    vapidKey: `BAp841oU8qawoHVxNdZ3XgpI_0ZeiFY_wO98NIJ_tWQmiXLuKr8HWIJaCz_9xlaJWYm5rtasIjozUl_wdqVQ4cE`,
  }) //to authorize send requests to supported web push services
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);

        if (localStorage.getItem("fcmToken") && currentToken !== localStorage.getItem("fcmToken")) {
          localStorage.setItem("fcmToken", currentToken);
        } else if (!localStorage.getItem("fcmToken")) {
          localStorage.setItem("fcmToken", currentToken);
        }
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
