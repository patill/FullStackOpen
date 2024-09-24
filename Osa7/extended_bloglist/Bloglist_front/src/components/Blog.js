import { useState } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ user, blog }) => {
    const [updatedBlog] = useState(blog)
    const [userId] = useState(blog.user.id)
    const [blogUserName] = useState(blog.user.username)
    const [currentUser] = useState(user)
    const dispatch = useDispatch()

    const handleLike = async (event) => {
        event.preventDefault()
        try {
            dispatch(likeBlog(blog))
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
            dispatch(removeBlog(updatedBlog._id))
        }
    }
    return (
        <div className="blogentry">
            <h2 className="blogName">
                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>{' '}
            </h2>
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
}

export default Blog
