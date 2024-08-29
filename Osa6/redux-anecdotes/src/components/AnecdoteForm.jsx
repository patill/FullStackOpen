import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
  };

  return (
    <form onSubmit={addNewAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
