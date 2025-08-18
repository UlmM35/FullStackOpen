/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return state = `anecdote '${action.payload}' voted`
        case 'ADDED':
            return state = `added ${action.payload}`
        case 'RESET':
            return state = null
        case 'ERROR':
            return state = action.payload
        default:
            return state
    }
}


const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[0]
}

export const useDispatch = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[1]
}

export default NotificationContext