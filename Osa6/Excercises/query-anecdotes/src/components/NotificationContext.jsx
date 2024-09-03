import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      console.log("new notification added");
      state = action.payload;
      return state;
    }
    case "REMOVE":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "Initial notification"
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationDispatch = () => {
  const fullList = useContext(NotificationContext);
  return fullList[1];
};

export const sendNotification = (dispatch, message) => {
  dispatch({ type: "ADD", payload: message });
  setTimeout(() => dispatch({ type: "REMOVE" }), 5000);
};

export default NotificationContext;
