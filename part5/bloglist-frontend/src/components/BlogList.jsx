import { useSelector } from 'react-redux';
import Blog from './Blog';
import Notification from './Notification';

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user}) => user);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={user.username} />
      ))}
    </div>
  );
};

export default BlogList;
