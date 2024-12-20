import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setPage, show, notify, setToken, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors);
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      console.log("completed");
      setPage("books");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(token);
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    console.log("submit called");
    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      {notify ? <p>{notify}</p> : ""}
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
