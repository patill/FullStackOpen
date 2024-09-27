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
        <div className="content">
            <h2>Log into application</h2>
            <Notification />
            <form onSubmit={handleLogin}>
                <div className="field">
                    <label className="label">username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={username}
                            name="Username"
                            placeholder="Type your username"
                            id="username"
                            onChange={handleUsernameChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">password</label>

                    <input
                        type="password"
                        placeholder="Type your password"
                        className="input"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="control">
                    <button
                        className="button is-link"
                        id="submit"
                        type="submit"
                    >
                        login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Loginpage
