import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import Loginpage from './components/Loginpage'
import Home from './components/Home'
import { initializeUser } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeUser())
    }, [])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    if (user === null) {
        return <Loginpage />
    }

    return <Home />
    //return <h1>Blogs</h1>
}

export default App
