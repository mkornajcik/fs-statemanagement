import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

let notificationTimeout;

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState("");

  const notify = (message) => {
    clearTimeout(notificationTimeout);
    setNotification(message);
    notificationTimeout = setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return <NotificationContext.Provider value={{ notification, notify }}>{props.children}</NotificationContext.Provider>;
};
