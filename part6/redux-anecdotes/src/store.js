import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationSlice from './reducers/notificationReducer'

const anecdoteStore = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationSlice,
    }
})

export default anecdoteStore