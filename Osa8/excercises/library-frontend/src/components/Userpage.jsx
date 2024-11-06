import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { useEffect, useState } from "react";

const Userpage = (props) => {
  const [booklist, setBooklist] = useState([]);
  const user = useQuery(ME);
  const books = useQuery(ALL_BOOKS, { variables: { genre: "" } });
  console.log(user);
  console.log(books.loading);

  useEffect(() => {
    if (props.show && !user.loading && !user.error) {
      console.log("effect running after user data defined");
      console.log(`Genre is ${user.data.me.favoriteGenre}`);
      books.refetch({ genre: user.data.me.favoriteGenre });
    }
  }, [props.show, user.data, user.loading, user.error, books]);

  if (!props.show) {
    return null;
  }

  if (books.loading || user.loading) return "Loading...";

  console.log(books.data);
  console.log(booklist);
  return (
    <div>
      <h1>Me</h1>
      <h2>My favorite books for the genre {user.data.me.favoriteGenre}</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data?.allBooks
            .filter((el) => el.genres.includes(user.data.me.favoriteGenre))
            .map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userpage;
