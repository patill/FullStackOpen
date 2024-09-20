import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import Loginpage from './components/Loginpage'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import BlogList from './components/BlogList'

const App = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)

    const toggleBlogForm = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        console.log(loggedUserJSON)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (userObj) => {
        try {
            const user = await loginService.login(userObj)
            console.log(user)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            dispatch(
                setNotification(
                    {
                        notification: `User ${user.username} logged in`,
                        class: 'notification',
                    },
                    6
                )
            )
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification(
                    { notification: 'Something went wrong', class: 'error' },
                    3
                )
            )
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
        } catch (exception) {
            console.log(exception)
        }
    }

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    if (user === null) {
        return <Loginpage login={handleLogin} />
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification />

            <p>
                {user.username} logged in.
                <button onClick={handleLogout} type="submit">
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

export default App
