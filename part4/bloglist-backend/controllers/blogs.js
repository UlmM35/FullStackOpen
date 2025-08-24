const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'Token invalid' })
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).json({ error: 'title or url missing'})
    }

    const user = await User.findById(request.user)
    
    if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid'})
    }

    const blog = new Blog({
        ...request.body,
        likes: request.body.likes ? request.body.likes : 0,
        user: user
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(401).json({ error: 'blog doesnt exist'})
    }
    const blogUserId = blog.user.toString()

    if (user && user === blogUserId) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'Cant delete blog that wasnt created by you'})
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const { title, author, url, likes } = request.body
    const blog = {
        title: title,
        author: author,
        url: url,
        likes: likes,
    }

    if (!blog) {
        response.status(404).end()
    }
            
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    }).populate('user', { username: 1, name: 1, id: 1})
    response.json(updatedBlog)
})

module.exports = blogsRouter
