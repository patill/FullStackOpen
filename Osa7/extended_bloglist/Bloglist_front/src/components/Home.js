import { useRef } from 'react'
import { useSelector } from 'react-redux'

import Notification from './Notification'
import Togglable from './Togglable'
import AddBlogForm from './AddBlogForm'
import BlogList from './BlogList'

const Home = () => {
    const toggleBlogForm = useRef()
    const user = useSelector((state) => state.login)
    console.log(user)

    return (
        <div>
            <h1 className="title">Blogs</h1>
            <Notification />

            <div className="formdiv">
                <Togglable buttonLabel="Post a new blog" ref={toggleBlogForm}>
                    <AddBlogForm ref={toggleBlogForm} />
                </Togglable>
            </div>

            <BlogList user={user} />
        </div>
    )
}

export default Home
