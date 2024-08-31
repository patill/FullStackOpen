import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import PropTypes from "prop-types";
import {
  notificationChange,
  removeNotification,
} from "../reducers/notificationReducer";

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
      return [...state.anecdotes].filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }

    return [...state.anecdotes];
  });

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(addVote(anecdote.id));
              dispatch(notificationChange(`You voted "${anecdote.content}"`));
              setTimeout(() => dispatch(removeNotification()), 5000);
            }}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
