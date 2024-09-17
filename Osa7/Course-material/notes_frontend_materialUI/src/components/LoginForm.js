import { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField, Button } from '@mui/material'

const LoginForm = ({
    login,
    //handleUsernameChange,
    //handlePasswordChange,
    //username,
    //password,
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const user = { username, password }
        login(user)
        setUsername('')
        setPassword('')
    }
    return (
        <div >
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <TextField label="username" name="username"
                        value={username}
                        onChange={handleUsernameChange}/>
                    </div>
                   


                    <TextField label="password"
                        type="password"
                        value={password}
                        id="password"
                        onChange={handlePasswordChange}
                    />

                <Button variant="contained" type="submit" id="login-button">
                    login
                </Button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm
