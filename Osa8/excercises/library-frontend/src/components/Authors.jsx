import { useState } from "react";
import EditAuthor from "./EditAuthor";
import EditAuthorRS from "./EditAuthor_reactselect";

const Authors = (props) => {
  const [authorToChange, setAuthorToChange] = useState(null);
  console.log(authorToChange);
  const result = props.authors; //useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;

  console.log(authors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
              <td>
                {!a.born ? (
                  !authorToChange ? (
                    <button
                      onClick={() =>
                        setAuthorToChange({
                          name: a.name,
                        })
                      }
                    >
                      Edit author
                    </button>
                  ) : (
                    <button onClick={() => setAuthorToChange(null)}>
                      Close
                    </button>
                  )
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {authorToChange ? (
        <EditAuthor
          author={authorToChange}
          onClose={() => setAuthorToChange(null)}
        />
      ) : null}

      <EditAuthorRS authors={authors} />
    </div>
  );
};

export default Authors;
