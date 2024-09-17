import React from 'react'
import Home from './views/Home'
import About from './views/About'
import NavBar from './views/NavBar'
import {
    Route,
    Router,
    Routes,
    Navigate,
    Switch,
    redirect,
} from 'react-router-dom'
import LoginForm from './components/LoginForm'

export const MyRoutes = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="Home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route exact path="/About" element={<About />} />
            </Routes>
        </div>
    )
}

//a bit better: https://reactrouter.com/en/main/start/tutorial
