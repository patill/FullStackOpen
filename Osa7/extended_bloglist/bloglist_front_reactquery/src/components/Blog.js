import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="blogentry">
      <h2 className="blogName">
        <Link to={`/blogs/${blog._id}`}>
          {blog.title} by {blog.author}
        </Link>
      </h2>
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
};

export default Blog;
