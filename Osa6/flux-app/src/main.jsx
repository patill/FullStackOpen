import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./reducer.js";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

renderApp();
store.subscribe(renderApp);
