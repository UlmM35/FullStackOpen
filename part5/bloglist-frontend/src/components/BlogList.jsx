import { useSelector } from 'react-redux'
import Blog from './Blog'
import Notification from './Notification'

const BlogList = ({ user, handleLogOut, handleUpdate, handleDelete}) => {
    const blogs = useSelector(({ blogs}) => blogs)

    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            username={user.username}
            />
        ))}
      </div>
    )
}

export default BlogList