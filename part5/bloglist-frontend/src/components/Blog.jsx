import { useState } from "react"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hide = { display: view ? 'none': ''}
  const show = { display: view ? '' : 'none'}

  const toggleView = () => {
    setView(!view)
  }

  const buttonLabel = view ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div style={hide}>
        {blog.title} {blog.author} <button onClick={toggleView}>{buttonLabel}</button>
      </div>
      <div style={show}>
        <div>{blog.title} <button onClick={toggleView}>{buttonLabel}</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog