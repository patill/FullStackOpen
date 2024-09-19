import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {
    //const dispatch = useDispatch()
    const blogs = useSelector((state) => {
        return [...state.blogs]
    })
    console.log(blogs)

    return (
        <div>
            {' '}
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        user={user}
                        key={blog._id}
                        blog={blog}
                        //handleUpdateBlog={handleUpdateBlog}
                        //handleRemoveBlog={remove}
                    />
                ))}
        </div>
    )
}

export default BlogList
