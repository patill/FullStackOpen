import {
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Menu from './Menu'
import Home from './Home'
import Loginpage from './Loginpage'
import Users from './Users'
import User from './User'
import BlogPage from './BlogPage'

const Router = () => {
    const user = useSelector((state) => state.login)
    console.log('from router')
    console.log(typeof user !== 'undefined')

    return (
        <div>
            <Menu />

            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        !user ? <Navigate replace to="/login" /> : <Home />
                    }
                />
                <Route
                    path="/blogs/:id"
                    element={user ? <BlogPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/users"
                    element={
                        user ? <Users /> : <Navigate replace to="/login" />
                    }
                />
                <Route path="/users/:id" element={<User />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Loginpage />}
                />
            </Routes>
        </div>
    )
}

export default Router
