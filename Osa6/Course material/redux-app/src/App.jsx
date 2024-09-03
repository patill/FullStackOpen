//import React from "react";
import { useEffect } from "react";
import "./App.css";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/visibilityFilter";
import { initializeNotes } from "./reducer/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, []);
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
