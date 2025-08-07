const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

    test('blogs are returned as json object', async () => {
        await api
            .get('/api/blogs')
            .expect(200)    
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('unique identifier of blog posts is id not __id', async () => {
        const response = await api.get('/api/blogs')
        const responseKey = Object.keys(response.body[0])
        assert.strictEqual(responseKey[4], 'id')
    
    })


    describe('addition of a new blog', () => {
        test('adding a blog post successfully creates a new blog post', async () => {
        const newBlog = {
            title: 'Hello',
            author: 'World',
            url: 'https://helloworld.com',
            likes: 50,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        assert(titles.includes('Hello'))
    })

        test('if likes property is missing, it will default to 0 instead', async () => {
            const blogWithOutLikes = {
                title: 'Sad blog post',
                author: 'Mr.Sad',
                url: 'https://whyamiwithoutanylikes.com',
            }

            await api
                .post('/api/blogs')
                .send(blogWithOutLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

            const likes = Object.keys(blogsAtEnd[2])
            assert(likes.includes('likes'))
            assert.strictEqual(blogsAtEnd[2].likes, 0)
        })

        test('if title or url are missing respond with 400 Bad Request', async () => {
            const blogWithoutUrl = {
                title: 'w',
                author: 't',
                likes: 1000
            }
            const blogWithoutTitle = {
                author: 'b',
                url: 'https://hello.com',
                likes: 400
            }

            await api
                .post('/api/blogs')
                .send(blogWithoutUrl, blogWithoutTitle)
                .expect(400)
        })
    })


    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async() => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
            
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()

            const titles = blogsAtEnd.map(blog => blog.title)
            assert(!titles.includes(blogToDelete.titles))
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
        })
    })

    describe('viewing a specific blog', () => {
        test('succeeds with a valid id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToView = blogsAtStart[0]

            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(resultBlog.body, blogToView)
        })

        test('fails with statuscode 404 if blog does not exist', async () => {
            const validNonexistingId = await helper.nonExistingId()

            await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
        })

        test('fails with statuscode 400 id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api.get(`/api/blogs/${invalidId}`).expect(400)
        })
    })

    describe("when changing a specific blog's info", () => {
        test('succeeds with a valid id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToChange = blogsAtStart[0]
            
            blogToChange.likes = 100

            await api
                .put(`/api/blogs/${blogToChange.id}`)
                .send(blogToChange)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            const blogsAtEnd = await helper.blogsInDb()
            const changedBlog = blogsAtEnd[0]

            assert.deepStrictEqual(changedBlog, blogToChange)
        })

        test('fails with statuscode 404 if blog does not exist', async () => {
            const validNonexistingId = await helper.nonExistingId()
            
            await api.put(`/api/blogs/${validNonexistingId}`).expect(404)
        })

        test('fails with statuscode 400 if id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api.put(`/api/blogs/${invalidId}`).expect(400)
        })
    })


})


after(async () => {
    await mongoose.connection.close()
})