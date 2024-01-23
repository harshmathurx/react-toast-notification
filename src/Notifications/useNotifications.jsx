import {useContext} from "react"
import {NotificationContext} from "./NotificationContext"

const useNotifications = () => {
  const { notifications, setNotifications } = useContext(NotificationContext);

  console.log(notifications);
  
  const showNotification = ({ type, message }) => {
    const key = Math.floor(Math.random() * 10000).toString();
    const startTime = new Date().getTime();
    setNotifications((prevNotifs) => [
      ...prevNotifs,
      { type, message, key, startTime },
    ]);
  }

  return {showNotification};
};

export default useNotifications