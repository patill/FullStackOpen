import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const [notifiction] = useContext(NotificationContext);

  if (!notifiction) return null;

  return <div style={style}>{notifiction}</div>;
};

export default Notification;
