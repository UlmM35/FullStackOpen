import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogReducer';

const BlogView = ({ blog }) => {

    const dispatch = useDispatch()

    if (!blog) {
        return null
    }

    const margin = {
        marginBottom: 5
    }

    const updateBlog = () => {
    dispatch(
      likeBlog({
        ...blog,
        likes: blog.likes + 1,
      }),
    );
  };

    return (
        <div>
          <h1>{blog.title} {blog.author}</h1>
          <div style={margin}> <a href={blog.url}>{blog.url}</a></div>
          <div>{blog.likes} likes <button onClick={updateBlog}>like</button></div>
          <div>added by {blog.author}</div>
          <h3>comments</h3>
        </div>
    )
}

export default BlogView