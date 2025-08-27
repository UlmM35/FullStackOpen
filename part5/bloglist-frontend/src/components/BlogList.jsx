import { useRef } from 'react'
import { useSelector } from 'react-redux';
import Blog from './Blog';
import Notification from './Notification';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user}) => user);

  const ref = useRef()

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={ref}>
        <BlogForm reference={ref} />
      </Togglable>
      <h2>blogs</h2>
      <Notification />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={user.username} />
      ))}
    </div>
  );
};

export default BlogList;
