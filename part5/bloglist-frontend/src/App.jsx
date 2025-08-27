import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { getUser } from './reducers/userReducer';
import BlogRouter from './components/BlogRouter';
import NavBar from './components/NavBar';
import { getUsers } from './reducers/usersReducer';

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user)
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <NavBar></NavBar>
      <h2>Blogs</h2>
      <BlogRouter />
    </div>
  );
};

export default App;
