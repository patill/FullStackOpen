import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        //class: 'notification',
        //notification: 'Initial notification',
    },
    reducers: {
        notificationChange(state, action) {
            state = action.payload
            console.log(JSON.parse(JSON.stringify(state)))
            return state
        },
        removeNotification(state) {
            state = {}
            return state
        },
    },
})

export const { notificationChange, removeNotification } =
    notificationSlice.actions

//text has to be object with  {notification:, class: }
export const setNotification = (text, time) => {
    return async (dispatch) => {
        dispatch(notificationChange({ ...text }))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer
