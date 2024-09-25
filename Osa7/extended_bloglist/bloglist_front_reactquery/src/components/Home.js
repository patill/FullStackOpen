import Notification from "./Notification";
import Togglable from "./Togglable";
import AddBlogForm from "./AddBlogForm";
import Blog from "./Blog";

import LoginContext from "./LoginContext";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useRef } from "react";

const Home = () => {
  const [user] = useContext(LoginContext);
  const queryClient = useQueryClient();
  const toggleBlogForm = useRef();
  const [blogs] = queryClient.getQueriesData({ queryKey: ["blogs"] });
  const sortedBlogs = blogs[1].sort((a, b) => b.likes - a.likes);
  console.log("from home:");
  console.log(sortedBlogs);

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      <div className="formdiv">
        <Togglable buttonLabel="Post a new blog" ref={toggleBlogForm}>
          <AddBlogForm toggleRef={toggleBlogForm} />
        </Togglable>
      </div>

      {sortedBlogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog user={user} key={blog._id} blog={blog} />
        ))}
    </div>
  );
};

export default Home;
