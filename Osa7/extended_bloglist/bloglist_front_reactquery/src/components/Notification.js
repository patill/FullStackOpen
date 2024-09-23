import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Notification = () => {
  const [notification] = useContext(NotificationContext);
  console.log(notification);
  //console.log(classname);
  if (!notification) {
    return null;
  }

  return <div className={notification.className}>{notification.text}</div>;
};

export default Notification;
