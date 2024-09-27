import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import { useState } from 'react'

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

    const [isActive, setActive] = useState(false)

    console.log(isActive === true)

    const toggleNav = () => {
        setActive(!isActive)
    }
    return (
        <div>
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a
                        role="button"
                        className={
                            isActive
                                ? 'navbar-burger is-active'
                                : 'navbar-burger'
                        }
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="myNavbar"
                        onClick={toggleNav}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div
                    id="myNavbar"
                    className={
                        isActive === true
                            ? 'navbar-menu is-active'
                            : 'navbar-menu'
                    }
                >
                    <div className="navbar-start">
                        <Link className="navbar-item" style={padding} to="/">
                            Blogs home
                        </Link>
                        <Link
                            className="navbar-item"
                            style={padding}
                            to="/users"
                        >
                            Users
                        </Link>
                    </div>

                    <div className="navbar-end">
                        {user ? (
                            <span className="navbar-item">
                                {user.name} logged in.
                                <button
                                    className="button is-danger"
                                    onClick={logout}
                                    type="submit"
                                >
                                    logout
                                </button>
                            </span>
                        ) : (
                            <Link style={padding} to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Menu
