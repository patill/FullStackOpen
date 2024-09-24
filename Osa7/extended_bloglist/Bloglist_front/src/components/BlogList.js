import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
    const blogs = useSelector((state) => {
        return [...state.blogs]
    })
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
                    <Blog key={blog._id} blog={blog} />
                ))}
        </div>
    )
}

export default BlogList
