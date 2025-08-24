const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const passwordHash1 = bcrypt.hash('Pathfinder', 10)
const passwordHash2 = bcrypt.hash('Finite', 10)

const initialUsers = [
  {
    username: 'Edsger',
    name: 'Dijkstra',
    password: passwordHash1
  },
  {
    username: 'Alan',
    name: 'Turing',
    password: passwordHash2
  }
]


const initialBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
    },
    {
      title: 'Who wrote this?',
      author: 'Alan Turing',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 12305,
    },
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
    usersInDb,
}