import { useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Button from './components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { getUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const ref = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in <Button text={'log out'} />
      </div>
      <Togglable buttonLabel='new blog' ref={ref}>
        <BlogForm reference={ref} />
      </Togglable>
      <BlogList username={user.username} />
    </div>
  );
};

export default App;
