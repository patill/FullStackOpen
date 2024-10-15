import { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const EditAuthorRS = (props) => {
  const [born, setBorn] = useState(undefined);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(props);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });

  if (!props.authors) return null;

  const options = props.authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log("edit author...");
    console.log(`name: ${selectedOption.value}, setBornTo: ${born}`);
    const variable = {
      variables: { name: selectedOption.value, setBornTo: born },
    };
    console.log(variable);
    editAuthor(variable);

    //setName("");
    //setBorn(undefined);
  };

  return (
    <div>
      <h3>Edit birthyear:</h3>
      <form onSubmit={submit}>
        <div>
          author
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
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
    </div>
  );
};

export default EditAuthorRS;
