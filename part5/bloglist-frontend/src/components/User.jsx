
const User = ({ user }) => {

    if (!user) {
        return null
    }

    return (
        <div>
          <h1>{user.name}</h1>
          <h2>added blogs</h2>
          <div>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </div>
        </div>
    )
}

export default User