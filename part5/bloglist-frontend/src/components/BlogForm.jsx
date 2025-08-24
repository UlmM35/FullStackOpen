import { useState, useRef } from 'react';
import { createBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const BlogForm = ({ reference }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    reference.current.toggleVisibility();
    dispatch(createBlog({ title: title, author: author, url: url }))
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new blogs</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:{' '}
          <input
            data-testid='title-input'
            id='title-input'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            data-testid='author-input'
            id='author-input'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            data-testid='url-input'
            id='url-input'
            type='url'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
