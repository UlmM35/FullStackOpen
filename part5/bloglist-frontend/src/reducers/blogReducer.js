import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        replaceBlog(state, action) {
            return state.map(b => b.id !== action.payload.id ? a : action.payload)
        }
    }
})

export const { appendBlog, setBlogs, replaceBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
} 

export const createBlog = (blogObj) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObj)
        dispatch(appendBlog(newBlog))
    }
}

export default blogSlice.reducer