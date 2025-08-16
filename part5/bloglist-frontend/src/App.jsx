import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

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

  const handleCreate = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(createdBlog))
      notify(`a new blog ${blogObj.title} by ${blogObj.author}`)
    } catch (exception){
      notify('You need to fill out the title/url fields.', true)
    }
  }

  const handleUpdate = async (blogObj) => {
    const updatedBlog = await blogService.update(blogObj)
    setBlogs(blogs.map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog))
  }

  const handleDelete = async (blogObj) => {
    await blogService.remove(blogObj)
    setBlogs(blogs.filter((blog) => blog.id !== blogObj.id))
    notify(`Deleted ${blogObj.title} by ${blogObj.author}`)
  }

  const notify = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const blogUser = user

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification}/>
        <form onSubmit={handleLogin}>
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <div>{user.name} logged in <button onClick={handleLogOut}>log out</button></div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} user={blogUser}/>
      )}
    </div>
  )
}

export default App