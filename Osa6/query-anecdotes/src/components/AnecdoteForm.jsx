import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postNew } from "../requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: postNew,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content });
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
