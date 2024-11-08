import { useState } from "react";
import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}> {errorMessage} </div>;
};

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allPersons }) => {
    return { allPersons: uniqByName(allPersons.concat(addedPerson)) };
  });
};

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const result = useQuery(ALL_PERSONS);
  //Update the cache with pollinterval every second second to force updating the page
  // as object parameter on the useQuery call: {pollIntervall: 2000}
  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`);
      //One possiblity to update cache. Problem, that also the Personform adds the person to the cache at the same time so it is seen twice
      client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(addedPerson),
        };
      });
      //Take care that person is not added twice to the cache
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });
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
