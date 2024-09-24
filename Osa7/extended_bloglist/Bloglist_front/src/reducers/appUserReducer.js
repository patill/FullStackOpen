import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            console.log(action.payload)
            return action.payload
        },
    },
})

export const { setUsers } = usersSlice.actions

export const getAppUsers = () => {
    return async (dispatch) => {
        try {
            const users = await usersService.getAll()
            dispatch(setUsers(users))
        } catch (err) {
            console.log(err)
        }
    }
}

export default usersSlice.reducer
