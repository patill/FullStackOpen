import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import blogReducer from './reducers/blogReducer'
import App from './App'
import './index.css'
import notificationReducer from './reducers/notificationReducer'
import commentReducer from './reducers/commentReducer'
import userReducer from './reducers/userReducer'
import appUserReducer from './reducers/appUserReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        login: userReducer,
        users: appUserReducer,
        comments: commentReducer,
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
)
