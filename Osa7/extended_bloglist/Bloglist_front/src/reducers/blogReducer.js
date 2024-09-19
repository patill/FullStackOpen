import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
            const changedItem = { ...item, likes: item.likes + 1 }
            //console.log(JSON.parse(JSON.stringify(changedItem)))
            return state.map((blog) =>
                blog._id !== changedItem._id ? blog : changedItem
            )
        },
    },
})

export const { setBlogs, appendBlog, removeFromList, changeInList } =
    blogSlice.actions

//TODO: use try catch and issue errors for notifications
export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.newBlog(content)
        dispatch(appendBlog(newBlog))
    }
}

export const removeBlog = (id) => {
    console.log('remove fired')
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(removeFromList(id))
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(blog)
        console.log(updatedBlog)
        dispatch(changeInList(updatedBlog))
    }
}

export default blogSlice.reducer
