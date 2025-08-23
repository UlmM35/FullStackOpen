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
            return state.map(b => b.id !== action.payload.id ? b : action.payload)
        },
        deleteBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload.id)
        }
    }
})

export const { appendBlog, setBlogs, replaceBlog, deleteBlog } = blogSlice.actions

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

export const likeBlog = (blogObj) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blogObj)
        dispatch(replaceBlog(updatedBlog))
    }
}

export const removeBlog = (blogObj) => {
    return async dispatch => {
        await blogService.remove(blogObj)
        dispatch(deleteBlog(blogObj))
    }
}

export default blogSlice.reducer