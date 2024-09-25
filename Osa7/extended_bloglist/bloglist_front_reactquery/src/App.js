import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";
import { useLoginDispatch, setUser } from "./components/LoginContext";
import Router from "./components/Router";

const App = () => {
  const loginDispatch = useLoginDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(loginDispatch, user);
      blogService.setToken(user.token);
    }
  }, []);

  //Fetching initial list with useQuery
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  return <Router />;
};

export default App;
