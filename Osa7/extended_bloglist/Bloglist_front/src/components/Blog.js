import { useState } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, handleUpdateBlog, handleRemoveBlog }) => {
    const [updatedBlog] = useState(blog)
    const [userId] = useState(blog.user.id)
    const [blogUserName] = useState(blog.user.username)
    const [currentUser] = useState(user)

    const handleLike = async (event) => {
        event.preventDefault()
        try {
            const blog = updatedBlog
            isNaN(blog.likes) ? (blog.likes = 1) : blog.likes++
            blog.user = userId
            handleUpdateBlog(blog)
        } catch (error) {
            console.log(error)
            return <p>There was an error.</p>
        }
    }

    const handleRemove = async (event) => {
        event.preventDefault()
        const confirm = window.confirm('Do you really want to remove?')
        console.log(confirm)
        if (confirm) {
            handleRemoveBlog(updatedBlog._id)
        }
    }
    return (
        <div className="blogentry">
            <h2 className="blogName">{blog.title} </h2>
            <Togglable buttonLabel="show">
                <div>
                    <h3 className="blog-author">Author: {blog.author}</h3>
                    <p className="blog-url">
                        URL: <a href={blog.url}>{blog.url}</a>
                    </p>
                    <div className="blog-likes">
                        likes: {blog.likes ? blog.likes : 0}
                        {'  '}
                        <button onClick={handleLike} type="submit">
                            like
                        </button>
                    </div>
                    <p className="blog-username">Lisääjä: {blog.user.name}</p>
                    {currentUser.username === blogUserName ? (
                        <div>
                            <button
                                className="remove"
                                onClick={handleRemove}
                                type="submit"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </Togglable>
        </div>
    )
}

Blog.propTypes = {
    user: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
    handleUpdateBlog: PropTypes.func.isRequired,
    handleRemoveBlog: PropTypes.func.isRequired,
}

export default Blog
