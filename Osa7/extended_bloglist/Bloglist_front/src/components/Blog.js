import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    return (
        <div className="blogentry">
            <h2 className="blogName title is-4">
                <Link to={`/blogs/${blog._id}`}>
                    {blog.title} by {blog.author}
                </Link>{' '}
            </h2>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Blog
