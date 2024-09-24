import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import Notification from './Notification'
import Togglable from './Togglable'
import AddBlogForm from './AddBlogForm'
import BlogList from './BlogList'

const Home = () => {
    const toggleBlogForm = useRef()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    console.log(user)

    const logout = (event) => {
        event.preventDefault()
        dispatch(handleLogout())
    }
    return (
        <div>
            <h1>Blogs</h1>
            <Notification />

            <p>
                {user.username} logged in.
                <button onClick={logout} type="submit">
                    logout
                </button>
            </p>
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
