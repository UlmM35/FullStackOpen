import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', true)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: `${title}`,
      author: `${author}`,
      url: `${url}`
    }
    try {
      await blogService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      notify(`a new blog ${newBlog.title} by ${newBlog.author}`)
    } catch (exception){
      notify('You need to fill out the title/author fields.', true)
    }
  }

  const notify = (message, isError = false) => {
    setNotification({ message, isError})
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification}/>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <div>{user.name} logged in <button onClick={handleLogOut}>log out</button></div>
      <h2>create new blogs</h2>
      <form onSubmit={handleCreate}>
        <div>title: <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author: <input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url: <input type='url' value={url} name='Url' onChange={({ target }) => setUrl(target.value)}/></div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App