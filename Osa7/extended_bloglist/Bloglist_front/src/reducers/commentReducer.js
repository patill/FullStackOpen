import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { setNotification } from './notificationReducer'

const commentSclice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        appendComment(state, action) {
            state.push(action.payload)
        },
    },
})

export const getComments = (id) => {
    return async (dispatch) => {
        try {
            const res = await commentService.getAll(id)
            dispatch(setComments(res))
            dispatch(
                setNotification(
                    { notification: 'Comments loaded', class: 'notification' },
                    2
                )
            )
        } catch (err) {
            dispatch(
                setNotification(
                    { notification: 'There was an error', class: 'error' },
                    3
                )
            )
        }
    }
}

export const addComment = (id, text) => {
    return async (dispatch) => {
        try {
            const newComment = await commentService.postNew(id, text)
            dispatch(appendComment(newComment))
            dispatch(
                setNotification(
                    {
                        notification: 'Comment successfully created',
                        class: 'notification',
                    },
                    3
                )
            )
        } catch (err) {
            dispatch(
                setNotification(
                    { notification: 'Something went wrong', class: 'error' },
                    4
                )
            )
        }
    }
}

export const { setComments, appendComment } = commentSclice.actions

export default commentSclice.reducer
