import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setMessage(state, action) {
            return state = action.payload
        },
    }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (text, seconds) => {
    return async dispatch => {
       await dispatch(setMessage(text)) 
       setTimeout(() => {
            dispatch(setMessage(''))
        }, seconds * 1000)
    }
}
export default notificationSlice.reducer