import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export const initializeUser = (info) => {
    return async dispatch => {
        try {
            const user = await loginService.login(info)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token)
            dispatch(setUser(user))
        } catch (exception) {
            dispatch(setNotification('wrong username/password', true))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }
}

export const logOut = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(removeUser())
    }
}

export default userSlice.reducer