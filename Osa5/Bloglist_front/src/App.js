import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Loginpage from "./components/Loginpage";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  const toggleBlogForm = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
  }, []);

  console.log(blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj);
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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

  const postBlog = (blogObj) => {
    const sendData = async (blogObj) => {
      //event.preventDefault();
      try {
        const newBlog = await blogService.newBlog(blogObj);
        console.log(newBlog);
        setNotification(`Successfully saved "${blogObj.title}"`);
        setTimeout(() => setNotification(null), 5000);
        setBlogs(blogs.concat(newBlog));
        toggleBlogForm.current.toggleVisibility();
        //setBlog("");
        //setAuthor("");
        //setUrl("");
      } catch (error) {
        setErrorMessage("Someting went wrong, try again");
        setTimeout(() => setErrorMessage(null), 5000);
      }
    };

    sendData(blogObj);
  };

  const handleUpdateBlog = async (changedBlog) => {
    const updatedBlog = await blogService.update(changedBlog);
    setBlogs(
      blogs
        //.sort((a, b) => a.likes + b.likes)
        .map((blog) => (blog._id !== updatedBlog._id ? blog : updatedBlog))
    );
  };

  const remove = async (id) => {
    //console.log(id);
    await blogService.remove(id);
    //need to update list here, sort again
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  if (user === null) {
    return <Loginpage login={handleLogin} errorMessage={errorMessage} />;
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification classname="error" message={errorMessage} />
      <Notification classname="notification" message={notification} />
      <p>
        {user.username} logged in.
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </p>
      {blogs
        //.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            user={user}
            key={blog._id}
            blog={blog}
            handleUpdateBlog={handleUpdateBlog}
            handleRemoveBlog={remove}
          />
        ))}

      <div className="formdiv">
        <Togglable buttonLabel="Post a new blog" ref={toggleBlogForm}>
          <AddBlogForm saveBlog={postBlog} />
        </Togglable>
      </div>
    </div>
  );
};

export default App;
