import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        isError: null,
        text: null,
    },
    reducers: {
        setMessage(state, action) {
            state.isError = action.payload.isError
            state.text = action.payload.text
        },
        clearMessage(state, action) {
            state.isError = null
            state.text = null
        }
    }
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (text, isError) => {
    return async dispatch => {
        await dispatch(setMessage({text: text, isError: isError}))
        setTimeout(() => {
            dispatch(clearMessage())
        }, 5000)
    }
}

export default notificationSlice.reducer