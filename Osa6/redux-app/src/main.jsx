//import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import noteReducer from "./reducer/noteReducer";
import filterReducer from "./reducer/filterReducer";
//import noteService from "./services/notes";
//import { setNotes } from "./reducer/noteReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});
console.log(store.getState());

//noteService.getAll().then((notes) => store.dispatch(setNotes(notes)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
