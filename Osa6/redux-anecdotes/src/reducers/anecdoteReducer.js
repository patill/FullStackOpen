import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotesService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
      console.log(JSON.parse(JSON.stringify(state)));
    },
    registerVote(state, action) {
      const id = action.payload;
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

export const { addAnecdote, registerVote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export default anecdoteSlice.reducer;
