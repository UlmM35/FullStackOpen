import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blogs</h2>
      <form onSubmit={addBlog}>
        <div>title: <input id='title-input' type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author: <input id='author-input' type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url: <input id='url-input' type='url' value={url} name='Url' onChange={({ target }) => setUrl(target.value)}/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm