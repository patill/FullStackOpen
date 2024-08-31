import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotesService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
      console.log(JSON.parse(JSON.stringify(state)));
    },
    registerVote(state, action) {
      console.log(action.payload);
      const id = action.payload.id;
      const itemToChange = state.find((n) => n.id === id);
      const changedItem = { ...itemToChange, votes: itemToChange.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id !== changedItem.id ? anecdote : changedItem
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { registerVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.saveVote(id);
    console.log(votedAnecdote.data);
    dispatch(registerVote(votedAnecdote.data));
  };
};

export default anecdoteSlice.reducer;
