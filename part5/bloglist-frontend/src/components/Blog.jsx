import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, username }) => {
  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hide = { display: view ? 'none' : '' };
  const show = { display: view ? '' : 'none' };
  const showToCreator = {
    display: username === blog.user.username ? '' : 'none',
  };

  const toggleView = () => {
    setView(!view);
  };

  const updateBlog = () => {
    dispatch(
      likeBlog({
        ...blog,
        likes: blog.likes + 1,
      }),
    );
  };

  const deleteBlog = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    dispatch(removeBlog({ ...blog }));
    dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, false));
  };

  const buttonLabel = view ? 'hide' : 'view';

  return (
    <div style={blogStyle} className='blog'>
      <div style={hide} className='blogHidden'>
        {blog.title} {blog.author}{' '}
        <button className='viewButton' onClick={toggleView}>
          {buttonLabel}
        </button>
      </div>
      <div style={show} className='blogShow'>
        <div>
          {blog.title} <button onClick={toggleView}>{buttonLabel}</button>
        </div>
        <div>{blog.url}</div>
        <div className='likes'>
          likes {blog.likes} <button onClick={updateBlog}>like</button>
        </div>
        <div>{blog.author}</div>
        <button style={showToCreator} onClick={deleteBlog}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
