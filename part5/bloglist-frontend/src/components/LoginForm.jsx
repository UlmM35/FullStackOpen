import { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({ handleLogin, notification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()
        handleLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleCreate}>
          <div>
            username
            <input
              data-testid='username-input'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password-input'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
     </div>
    )
}

export default LoginForm