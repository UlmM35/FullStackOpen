import { useSelector } from 'react-redux';
import Blog from './Blog';
import Notification from './Notification';

const BlogList = ({ username }) => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={username} />
      ))}
    </div>
  );
};

export default BlogList;
