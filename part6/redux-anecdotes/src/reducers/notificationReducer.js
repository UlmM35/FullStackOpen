import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setMessageVote(state, action) {
            return state = `you voted for ${action.payload}`
        },
        setMessageForm(state, action) {
            return state = `you added ${action.payload}`
        },
        removeMessage(state) {
            // eslint-disable-next-line no-unused-vars
            return state = ''
        }
    }
})

export const {setMessageVote, setMessageForm, removeMessage} = notificationSlice.actions
export default notificationSlice.reducer