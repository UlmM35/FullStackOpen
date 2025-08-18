import { useContext } from 'react'
import AnecdoteContext from '../NotificationContext'
import { useReducer } from 'react'

const Notification = () => {
  const [notification, dispatch] = useContext(AnecdoteContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification ? '' : 'none'
  }

  if (notification) {
    setTimeout(() => {
      dispatch({ type: 'RESET'})
    }, 5000)
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
