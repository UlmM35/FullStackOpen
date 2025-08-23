import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs}) => blogs) 

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef()

  const handleLogin = async (info) => {
    try {
      const user = await loginService.login(info)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      dispatch(setNotification('wrong username/password', true))
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.clear();
  };

  const handleCreate = async (blogObj) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createBlog(blogObj))
      dispatch(setNotification(`a new blog ${blogObj.title} by ${blogObj.author}`, false));
    } catch (exception) {
      dispatch(setNotification('You need to fill out the title/url fields.', true));
    }
  };

  const handleUpdate = async (blogObj) => {
    const updatedBlog = await blogService.update(blogObj);
    setBlogs(
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
    );
  };

  const handleDelete = async (blogObj) => {
    await blogService.remove(blogObj);
    setBlogs(blogs.filter((blog) => blog.id !== blogObj.id));
    dispatch(setNotification(`Deleted ${blogObj.title} by ${blogObj.author}`, false));
  };

  if (user === null) {
    return (
      <LoginForm handleLogin={handleLogin}/>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogOut}>log out</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm handleCreate={handleCreate} />
      </Togglable>
      <BlogList user={user}  handleLogOut={handleLogOut} handleCreate={handleCreate} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
