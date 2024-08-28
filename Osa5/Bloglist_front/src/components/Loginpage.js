import { useState } from "react";
import Notification from "./Notification";
import PropTypes from "prop-types";

const Loginpage = ({ login, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <Notification classname="error" message={errorMessage} />
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

Loginpage.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Loginpage;
