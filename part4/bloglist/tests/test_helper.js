const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'Edsger',
    name: 'Dijkstra',
    password: 'Pathfinder'
  },
  {
    username: 'Alan',
    name: 'Turing',
    password: 'Finite'
  }
]

const initialBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      userId: `${initialUsers[0]._id}`
    },
    {
      title: 'Who wrote this?',
      author: 'Alan Turing',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 12305,
      userId: `${initialUsers[1]._id}`
    }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog.id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers,
    initialBlogs,
    blogsInDb,
    nonExistingId,
    usersInDb
}