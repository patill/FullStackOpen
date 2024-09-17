import { useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Form, Button } from 'react-bootstrap'

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
        <div className="container">
            <h2>Login</h2>

            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username</Form.Label>

                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" id="login-button">
                    login
                </Button>
            </Form>
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
