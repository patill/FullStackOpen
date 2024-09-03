import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postNew } from "../requests";
import {
  useNotificationDispatch,
  sendNotification,
} from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: postNew,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: () => {
      sendNotification(
        dispatch,
        "Too short anecdote, musta have at least 5 characters."
      );
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content });
    sendNotification(dispatch, `Created anecdote: ${content}`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
