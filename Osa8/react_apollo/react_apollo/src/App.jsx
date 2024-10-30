import { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS } from "./queries";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}> {errorMessage} </div>;
};

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const result = useQuery(ALL_PERSONS);
  //Update the cache with pollinterval every second second to force updating the page
  // as object parameter on the useQuery call: {pollIntervall: 2000}
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <>
      <h1>Reading data from graphql server</h1>

      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>
      <PersonForm setError={notify} />
      <div>
        <Persons persons={result.data.allPersons} />
      </div>
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
