import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

//Action creators
// export const registerVote = (id) => {
//   return {
//     type: "vote",
//     payload: { id },
//   };
// };

// export const addAnecdote = (content) => {
//   return {
//     type: "ADD",
//     payload: { content, votes: 0, id: getId() },
//   };
// };

//main reducer
// const reducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);
//   switch (action.type) {
//     case "vote": {
//       const id = action.payload.id;
//       console.log(id);
//       const itemToChange = state.find((n) => n.id === id);
//       const changedItem = { ...itemToChange, votes: itemToChange.votes + 1 };
//       return state.map((anecdote) =>
//         anecdote.id !== changedItem.id ? anecdote : changedItem
//       );
//     }
//     case "ADD":
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

// export default reducer;

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
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
  },
});

export const { addAnecdote, registerVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
