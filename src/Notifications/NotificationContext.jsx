import {  createContext, useState, } from 'react';
import Notification from "./Notification"
export const NotificationContext = createContext([]);


export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      <div
        style={{
          position: 'absolute',
          zIndex: 999,
          right: 10,
          top: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {notifications.map((notif, index) => (
          <Notification
            {...notif}
            key={index}
            index={index}
            removeNotification={() => {
              setNotifications((prevNotifications) =>
                prevNotifications.filter((n) => n.key !== notif.key)
              );
            }}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};