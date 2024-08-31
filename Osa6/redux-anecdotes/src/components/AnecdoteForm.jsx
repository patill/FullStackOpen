import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotesService";
import {
  notificationChange,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
    dispatch(notificationChange(`The anecdote: "${content}" has been added.`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <div>
      <form onSubmit={addNewAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
