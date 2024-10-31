import { useState } from "react";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("login")}>login</button>
      </div>
      <Authors show={page === "authors"} authors={authors} />
      <Books show={page === "books"} books={books} />
      <NewBook show={page === "add"} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
