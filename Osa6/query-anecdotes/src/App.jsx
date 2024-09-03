import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, postNew } from "./requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();

  const allAnecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false,
  });

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  console.log(JSON.parse(JSON.stringify(allAnecdotes)));

  if (allAnecdotes.isLoading) {
    return <div>loading data...</div>;
  }

  if (allAnecdotes.isError) {
    return <div>anecdote server not available due to problems in server</div>;
  }

  const anecdotes = allAnecdotes.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
