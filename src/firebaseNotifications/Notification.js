import { useState, useEffect } from "react";
import { requestForToken, onMessageListener } from "./firebase";
// import { ToastContainer, toast } from "react-toastify";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    if (notification?.title) {
      window.Notification.requestPermission((permission) => {
        if (permission === "granted") {
          new window.Notification({ title: notification.title, body: notification.body });
        }
      });
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log("failed: ", err));
};

export default Notification;
