//import React from "react";
import store from "./reducer/noteReducer.js";
import "./App.css";

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content}
            <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

//const root = ReactDOM.createRoot(document.getElementById("root"));

export default App;
