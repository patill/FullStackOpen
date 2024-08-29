import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>create new</h2>
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <AnecdoteList />
    </div>
  );
};

export default App;
