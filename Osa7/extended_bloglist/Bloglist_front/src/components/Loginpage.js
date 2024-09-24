import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'
import Notification from './Notification'

const Loginpage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const user = { username, password }
        //login(user)
        dispatch(login(user))
        setUsername('')
        setPassword('')
    }
    return (
        <div>
            <h2>Log into application</h2>
            <Notification />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="submit" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

export default Loginpage
