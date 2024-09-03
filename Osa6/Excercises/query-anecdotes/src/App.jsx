import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, voteAnecdote } from "./requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {
  useNotificationDispatch,
  sendNotification,
} from "./components/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const allAnecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false,
  });

  const Anecdote = ({ anecdote }) => {
    const handleVote = (anecdote) => {
      console.log("vote");
      voteMutation.mutate(anecdote);
      sendNotification(dispatch, `Added vote: ${anecdote.content}`);
    };

    const dispatch = useNotificationDispatch();

    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    );
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
      <div>
        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
      </div>
    </div>
  );
};

export default App;
