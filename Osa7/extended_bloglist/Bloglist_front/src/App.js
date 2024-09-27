import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Router from './components/Router'
import { initializeUser } from './reducers/userReducer'
import { getAppUsers } from './reducers/appUserReducer'
import 'bulma/css/bulma.min.css'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeBlogs())
        dispatch(getAppUsers())
    }, [])

    return <Router />
}

export default App
