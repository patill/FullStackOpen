import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            console.log(action.payload)
            return action.payload
        },
        appendBlog(state, action) {
            const content = action.payload
            state.push(content)
        },
        removeFromList(state, action) {
            console.log(action.payload)
            //filter method does not mutate state
            //state = state.filter((blog) => action.payload !== blog.id)
            const index = state.findIndex((item) => item._id === action.payload)
            state.splice(index, 1)
            //console.log(JSON.parse(JSON.stringify(state)))
        },
        changeInList(state, action) {
            //console.log(action.payload)
            const item = state.find((item) => item._id === action.payload._id)
            //console.log(JSON.parse(JSON.stringify(item)))
            const changedItem = { ...item, likes: action.payload.likes }
            //console.log(JSON.parse(JSON.stringify(changedItem)))
            return state.map((blog) =>
                blog._id !== changedItem._id ? blog : changedItem
            )
        },
    },
})

export const { setBlogs, appendBlog, removeFromList, changeInList } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs))
            dispatch(
                setNotification(
                    {
                        notification: 'Blogs were created succeffully',
                        class: 'notification',
                    },
                    5
                )
            )
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification(
                    { notification: 'Something went wrong.', class: 'error' },
                    5
                )
            )
        }
    }
}

export const addBlog = (content) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.newBlog(content)
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotification(
                    {
                        notification: `Blog creation succeful: ${content.title}`,
                        class: 'notification',
                    },
                    5
                )
            )
        } catch (error) {
            dispatch(
                setNotification(
                    {
                        notification: 'Something went wrong here',
                        class: 'error',
                    },
                    5
                )
            )
        }
    }
}

export const removeBlog = (id) => {
    console.log('remove fired')
    return async (dispatch) => {
        try {
            await blogService.remove(id)
            dispatch(removeFromList(id))
            dispatch(
                setNotification(
                    {
                        notification: 'Blog removed.',
                        class: 'notification',
                    },
                    5
                )
            )
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification(
                    { notification: 'Some problem occurred.', class: 'error' },
                    5
                )
            )
        }
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.update(blog)
            console.log(updatedBlog)
            dispatch(changeInList(updatedBlog))
            dispatch(
                setNotification(
                    {
                        notification: `You liked ${updatedBlog.title}`,
                        class: 'notification',
                    },
                    5
                )
            )
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification(
                    {
                        notification: 'Some problem. Try again later',
                        class: 'error',
                    },
                    5
                )
            )
        }
    }
}

export default blogSlice.reducer
