import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  //this query for the genres:
  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });
  useEffect(() => {
    if (props.show) {
      //props.allBooks.refetch();
      setGenres(
        props.allBooks.data.allBooks
          .map((book) => book.genres)
          .reduce((a, b) => Array.from(new Set(a.concat(b))), [])
      );
      setSelectedGenre("");
    }
  }, [props.show]);

  const handleClick = (genre) => {
    setSelectedGenre(genre);
    filteredBooks.refetch({ genre: genre });
  };

  const isActive = (el) => (selectedGenre === el ? "active" : "");

  if (!props.show) {
    return null;
  }

  if (filteredBooks.loading) {
    return (
      <div>
        <h2>books</h2>
        {props.notify ? <p>{props.notify}</p> : ""}
        <div>
          {genres.map((el) => (
            <button
              key={el}
              className={isActive(el)}
              onClick={() => handleClick(el)}
            >
              {el}
            </button>
          ))}
          <button key="all" onClick={() => setSelectedGenre("")}>
            All
          </button>
        </div>
        <div>loading...</div>
      </div>
    );
  }

  if (filteredBooks.error) {
    return <div>There was an error: {filteredBooks.error}</div>;
  }

  return (
    <div>
      <h2>books</h2>
      {props.notify ? <p>{props.notify}</p> : ""}
      <div>
        {genres.map((el) => (
          <button
            key={el}
            className={isActive(el)}
            onClick={() => handleClick(el)}
          >
            {el}
          </button>
        ))}
        <button key="all" onClick={() => setSelectedGenre("")}>
          All
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.data.allBooks.map((a) => (
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

export default Books;
