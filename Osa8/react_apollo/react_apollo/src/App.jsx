import { useState } from "react";
import { useQuery } from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}> {errorMessage} </div>;
};

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [count, setCount] = useState(0);
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

  return (
    <>
      <h1>Reading data from graphql server</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <div>
        <Persons persons={result.data.allPersons} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
