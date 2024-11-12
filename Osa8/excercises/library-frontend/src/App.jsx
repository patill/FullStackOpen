import { useEffect, useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import LoginForm from "./components/LoginForm";
import Userpage from "./components/Userpage";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const authors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log("new book added: ");
      console.log(data);

      const addedBook = data.data.bookAdded;
      console.log(addedBook);
      notify(`${addedBook.title} added.`);
      client.cache.updateQuery({ query: ALL_BOOKS, variables: {} }, (data) => {
        console.log(data);
        //const allBooks = data.allBooks;
        return {
          allBooks: data.allBooks.concat(addedBook),
        };
      });
      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: "" } },
        (data) => {
          console.log(data);
          return {
            allBooks: data.allBooks.concat(addedBook),
          };
        }
      );
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  //read the token from localstore once:
  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("me")}>My favourite books</button>
        ) : (
          ""
        )}
        {token ? <button onClick={() => setPage("add")}>add book</button> : ""}
        {!token ? <button onClick={() => setPage("login")}>login</button> : ""}
        {token ? <button onClick={logout}>logout</button> : ""}
      </div>
      <Authors show={page === "authors"} authors={authors} token={token} />
      <Books
        show={page === "books"}
        allBooks={allBooks}
        setError={notify}
        notify={errorMessage}
      />
      <Userpage show={page === "me"} notify={errorMessage} />
      <NewBook show={page === "add"} notify={errorMessage} setError={notify} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        notify={errorMessage}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
