import React from "react";
import ReactDOM from "react-dom/client";
import store from "./reducer.js";
import "./App.css";

function App() {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
}

//const root = ReactDOM.createRoot(document.getElementById("root"));

export default App;
