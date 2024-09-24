import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
    const blogs = useSelector((state) => {
        return [...state.blogs]
    })
    const user = useSelector((state) => state.user)
    console.log(blogs)

    if (blogs.length === 0) {
        return <p>There were no blogs</p>
    }

    return (
        <div>
            {' '}
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog user={user} key={blog._id} blog={blog} />
                ))}
        </div>
    )
}

export default BlogList
