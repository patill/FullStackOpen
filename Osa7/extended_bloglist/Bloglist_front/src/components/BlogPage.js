import { useSelector, useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

import Notification from './Notification'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useEffect } from 'react'

const BlogPage = () => {
    const currentUser = useSelector((state) => state.login)
    const blogs = useSelector((state) => state.blogs)
    const match = useMatch('/blogs/:id')
    const blog = match
        ? blogs.find((blog) => blog._id === match.params.id)
        : null

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            dispatch(removeBlog(blog._id))
            navigate('/')
        }
    }

    const postComment = async (event) => {
        event.preventDefault()
        const text = event.target.text.value
        console.log(text)
        console.log(blog._id)
        dispatch(commentBlog(blog, text))
    }

    if (!blog) {
        dispatch(
            setNotification(
                {
                    notification: 'This blog entry does not exist.',
                    class: 'error',
                },
                5
            )
        )
        return (
            <div>
                <Notification />
                <p>This blog entry does not exist.</p>
            </div>
        )
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
                {'  '} likes {'  '}
                <button onClick={handleLike} type="submit">
                    like
                </button>
            </div>
            <p className="blog-username">added by {blog.user.name}</p>
            {currentUser.username === blog.user.username ? (
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
    )
}

export default BlogPage
