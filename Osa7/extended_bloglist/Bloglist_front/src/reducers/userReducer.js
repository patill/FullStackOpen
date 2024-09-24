import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            console.log('from setUser')
            console.log(action.payload)
            state = action.payload
            return state
        },
    },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        console.log(loggedUserJSON)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }
}

export const login = (userObj) => {
    return async (dispatch) => {
        console.log('handleLogin fired')
        try {
            const user = await loginService.login(userObj)
            console.log(user)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setUser(user))
            dispatch(
                setNotification(
                    {
                        notification: `User ${user.username} logged in`,
                        class: 'notification',
                    },
                    6
                )
            )
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification(
                    { notification: 'Something went wrong', class: 'error' },
                    3
                )
            )
        }
    }
}

export const handleLogout = () => {
    return async (dispatch) => {
        console.log('handle logout fired')
        try {
            window.localStorage.removeItem('loggedBlogappUser')
            dispatch(setUser(null))
        } catch (exception) {
            console.log(exception)
        }
    }
}

export default userSlice.reducer
