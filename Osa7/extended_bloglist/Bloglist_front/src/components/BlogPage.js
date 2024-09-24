import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { likeBlog } from '../reducers/blogReducer'

const BlogPage = () => {
    const blogs = useSelector((state) => state.blogs)
    const match = useMatch('/blogs/:id')
    const blog = match
        ? blogs.find((blog) => blog._id === match.params.id)
        : null

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
            <h1>{blog.title}</h1>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <div className="blog-likes">
                {blog.likes ? blog.likes : 0}
                {'  '} likes {'  '}
                <button onClick={handleLike} type="submit">
                    like
                </button>
            </div>
            <p>added by {blog.user.name}</p>

            <p>
                <a href="/">Back to the blog listing.</a>
            </p>
        </div>
    )
}

export default BlogPage
