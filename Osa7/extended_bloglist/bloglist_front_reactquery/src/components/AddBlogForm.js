import { useState } from "react";
import { useAddBlog } from "../hooks/blogHooks";

const AddBlogForm = ({ toggleRef }) => {
  const [blog, setBlog] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogChange = (event) => {
    setBlog(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const addBlogMutation = useAddBlog();
  const postBlog = (event) => {
    console.log("post blog fired");
    event.preventDefault();
    addBlogMutation.mutate({ title: blog, author, url, likes: 0 });
    //saveBlog({ title: blog, author, url });
    toggleRef.current.toggleVisibility();
    setBlog("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>post a new blog</h2>
      <form onSubmit={postBlog}>
        <div>
          Blog
          <input
            type="text"
            value={blog}
            name="title"
            placeholder="Blog title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            placeholder="Blog author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            placeholder="Blog url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
