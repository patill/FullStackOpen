import { useState } from "react";
import Notification from "./Notification";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {
  useNotificationDispatch,
  sendNotification,
} from "./NotificationContext";
import { useLoginDispatch, setUser } from "./LoginContext";

const Loginpage = () => {
  const loginDispatch = useLoginDispatch();
  const dispatch = useNotificationDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (userObj) => {
    try {
      const user = await loginService.login(userObj);
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(loginDispatch, user);
    } catch (exception) {
      sendNotification(dispatch, {
        text: "wrong credentials",
        className: "error",
      });
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const user = { username, password };
    login(user);
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <h2>Log into application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="submit" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Loginpage;
