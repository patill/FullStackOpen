import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { NotificationContextProvider } from "./components/NotificationContext";
import "./index.css";
import { LoginContextProvider } from "./components/LoginContext";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <LoginContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </LoginContextProvider>
    </QueryClientProvider>
  </Router>
);
