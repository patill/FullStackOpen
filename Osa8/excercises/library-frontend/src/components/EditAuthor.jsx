import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";

const EditAuthor = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState(undefined);
  console.log(props);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });

  if (result.loading) return <div>loading...</div>;

  if (!props.author) return null;

  //setName(props.author.name);

  const submit = async (event) => {
    event.preventDefault();

    console.log("edit author...");
    editAuthor({ variables: { name: props.author.name, setBornTo: born } });
    props.setAuthorToChange(null);
    //setName("");
    //setBorn(undefined);
  };

  return (
    <div>
      <h3>Edit birthyear:</h3>
      <form onSubmit={submit}>
        <div>
          author
          <input
            value={props.author.name}
            onChange={({ target }) => setName(target.value)}
            disabled="disabled"
          />
        </div>
        <div>
          born
          <input
            value={born}
            type="number"
            min="1900"
            max="2020"
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>

        <button type="submit">edit</button>
      </form>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default EditAuthor;
