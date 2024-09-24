import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'

const Menu = () => {
    const padding = {
        padding: 5,
    }
    const user = useSelector((state) => state.login)
    const dispatch = useDispatch()
    console.log(user)

    const logout = (event) => {
        event.preventDefault()
        dispatch(handleLogout())
    }
    return (
        <div>
            <Link style={padding} to="/">
                Blogs home
            </Link>
            <Link style={padding} to="/users">
                Users
            </Link>
            {user ? (
                <span>
                    {user.name} logged in.
                    <button onClick={logout} type="submit">
                        logout
                    </button>
                </span>
            ) : (
                <Link style={padding} to="/login">
                    Login
                </Link>
            )}
        </div>
    )
}

export default Menu
