import { useMatch, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Notification from "./Notification";
import {
  useNotificationDispatch,
  sendNotification,
} from "./NotificationContext";
import LoginContext from "./LoginContext";
import { useLikeBlog, useRemoveBlog } from "../hooks/blogHooks";
import { useAddComment } from "../hooks/commentHooks";

const BlogPage = () => {
  const [currentUser] = useContext(LoginContext);
  const queryClient = useQueryClient();
  const [blogs] = queryClient.getQueriesData({ queryKey: ["blogs"] });
  const match = useMatch("/blogs/:id");
  let blog, blogId;

  if (blogs && blogs[1]) {
    blog = match ? blogs[1].find((blog) => blog._id === match.params.id) : null;
    blogId = match
      ? blogs[1].find((blog) => blog._id === match.params.id)._id
      : null;
  }

  console.log("Blogpage:");
  console.log(blog);
  console.log(blogId);

  const dispatch = useNotificationDispatch();
  const navigate = useNavigate();

  const likeBlogMutation = useLikeBlog();
  const removeBlogMutation = useRemoveBlog();
  const addCommentMutation = useAddComment(blogId);

  const handleLike = async (event) => {
    event.preventDefault();
    try {
      const blogToUpdate = blog;
      isNaN(blogToUpdate.likes)
        ? (blogToUpdate.likes = 1)
        : blogToUpdate.likes++;
      //blogToUpdate.user = currentUser.id;
      likeBlogMutation.mutate(blog);
    } catch (error) {
      console.log(error);
      return <p>There was an error.</p>;
    }
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    const confirm = window.confirm("Do you really want to remove?");
    console.log(confirm);
    if (confirm) {
      removeBlogMutation.mutate(blog);
      //dispatch(removeBlog(blog._id));
      navigate("/");
    }
  };

  const postComment = async (event) => {
    event.preventDefault();
    addCommentMutation.mutate({ id: blogId, text: event.target.text.value });
  };

  if (!blog) {
    sendNotification(dispatch, {
      notification: "This blog entry does not exist.",
      class: "error",
    });
    return (
      <div>
        <Notification />
        <p>This blog entry does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h1 className="blogName">{blog.title}</h1>
      <h3 className="blog-author">Author: {blog.author}</h3>
      <p className="blog-url">
        <a href={blog.url}>{blog.url}</a>
      </p>
      <div className="blog-likes">
        {blog.likes ? blog.likes : 0}
        {"  "} likes {"  "}
        <button onClick={handleLike} type="submit">
          like
        </button>
      </div>
      <p className="blog-username">added by {blog.user.name}</p>
      {currentUser.username === blog.user.username ? (
        <div>
          <button className="remove" onClick={handleRemove} type="submit">
            Remove
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="comments">
        <h2>Comments</h2>
        <form onSubmit={postComment}>
          <input name="text" />
          <button>Add comment</button>
        </form>

        <div className="comments-display">
          {blog.comments.length > 0 ? (
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment._id}>{comment.text}</li>
              ))}
            </ul>
          ) : (
            <p>Not comments yet</p>
          )}
        </div>
      </div>

      <p>
        <a href="/">Back to the blog listing.</a>
      </p>
    </div>
  );
};

export default BlogPage;
