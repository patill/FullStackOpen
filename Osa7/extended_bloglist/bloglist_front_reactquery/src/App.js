import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Loginpage from "./components/Loginpage";
import Notification from "./components/Notification";
import {
  useNotificationDispatch,
  sendNotification,
} from "./components/NotificationContext";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";

const App = () => {
  const [user, setUser] = useState(null);

  const toggleBlogForm = useRef();

  const dispatch = useNotificationDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj);
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      sendNotification(dispatch, {
        text: "wrong credentials",
        className: "error",
      });
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      setUser(null);
    } catch (exception) {
      console.log(exception);
    }
  };

  if (user === null) {
    return <Loginpage login={handleLogin} />;
  }
  return (
    <div>
      <h1>Blogs</h1>

      <Notification />
      <p>
        {user.username} logged in.
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </p>
      <div className="formdiv">
        <Togglable buttonLabel="Post a new blog" ref={toggleBlogForm}>
          <AddBlogForm toggleRef={toggleBlogForm} />
        </Togglable>
      </div>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog user={user} key={blog._id} blog={blog} />
        ))}
    </div>
  );
};

export default App;
