import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>create new</h2>
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <Filter />

      <AnecdoteList />
    </div>
  );
};

export default App;
