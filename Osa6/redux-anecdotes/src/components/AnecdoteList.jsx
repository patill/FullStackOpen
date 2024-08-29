import { useSelector, useDispatch } from "react-redux";
import { registerVote } from "../reducers/anecdoteReducer";
import PropTypes from "prop-types";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes. <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter.length > 0) {
      const arr = new Array();
      state.anecdotes
        .filter((anecdote) => anecdote.content.includes(state.filter))
        .forEach((a) => arr.push(a));
      return arr;
    }
    const arr = new Array();
    state.anecdotes.forEach((a) => arr.push(a));
    return arr;
  });

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(registerVote(anecdote.id))}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
