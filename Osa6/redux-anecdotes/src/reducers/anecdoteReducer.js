import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload;
      state.push({ content, votes: 0, id: getId() });
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
export default anecdoteSlice.reducer;
