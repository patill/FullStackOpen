import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  //this query for the books to show:
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: "" },
  });
  //this query for the genres:
  const genresData = useQuery(ALL_BOOKS, {
    variables: { genre: "" },
  });
  useEffect(() => {
    if (props.show) refetch({ genre: "" });
  }, [props.show, refetch]);
  useEffect(() => {
    if (!genresData.loading && !genresData.error && props.show) {
      console.log(genresData);
      setGenres(
        genresData.data.allBooks
          .map((book) => book.genres)
          .reduce((a, b) => Array.from(new Set(a.concat(b))), [])
      );
    }
  }, [genresData, props.show]);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>There was an error: {error}</div>;
  }

  console.log(data);

  console.log(genres);

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((el) => (
          <button key={el} onClick={() => refetch({ genre: el })}>
            {el}
          </button>
        ))}
        <button key="all" onClick={() => refetch({ genre: "" })}>
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
          {data.allBooks.map((a) => (
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
