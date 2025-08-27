import { useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import Users from './Users'
import BlogList from './BlogList'
import User from './User'
import BlogView from './BlogView'

const BlogRouter = () => {
    const users = useSelector(({ users }) => users)
    const blogs = useSelector(({ blogs }) => blogs)

    const matchUser = useMatch('/users/:id')
    const matchBlog = useMatch('/blogs/:id')

    const user = matchUser ? users.find(user => user.id === String(matchUser.params.id)) : null
    const blog = matchBlog ? blogs.find(blog => blog.id === String(matchBlog.params.id)) : null

    return (
      <Routes>
        <Route path="/" element={<BlogList />}/>
        <Route path="/users" element={<Users users={users}/>}/>
        <Route path="/users/:id" element={<User user={user}/>}/>
        <Route path="/blogs/:id" element={<BlogView blog={blog}/>}/>
      </Routes>
    )
}

export default BlogRouter