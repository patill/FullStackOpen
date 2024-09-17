import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { MyRoutes } from './routes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <MyRoutes />
    </Router>
)
