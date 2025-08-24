const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let token
let userForToken1
let user

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user1 = new User({ username: 'root', passwordHash })
    await user1.save()

    await User.insertMany(helper.initialUsers)

    user = await User.findOne({username: 'Edsger'})
    userForToken1 = {
        username: helper.initialUsers[0].username,
        id: user._id.toString()
    }

    token = jwt.sign(userForToken1, process.env.SECRET)

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
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        assert(titles.includes('Hello'))
    })

        test('if likes property is missing, it will default to 0 instead', async () => {
            const users = await helper.usersInDb()
            const blogWithOutLikes = {
                title: 'Sad blog post',
                author: 'Mr.Sad',
                url: 'https://whyamiwithoutanylikes.com',
            }

            await api
                .post('/api/blogs')
                .send(blogWithOutLikes)
                .set('Authorization', `Bearer ${token}`)
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
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        })
    })


    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async() => {
            const newBlog = {
                title: 'Hello',
                author: 'World',
                url: 'https://helloworld.com',
                likes: 50,
            }

            const result = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)

            const deletedBlog = await api.delete(`/api/blogs/${result.body.id}`).set('Authorization', `Bearer ${token}`).expect(204)

            assert.strictEqual(deletedBlog.status, 204)
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

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  test('creation fails with a duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
    }

    const result = await api
        .post('/api/users')
        .send(duplicateUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with a username that is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const wrongUser = {
        username: 't',
        name: 't',
        password: 'rteratggrea'
    }

    const result = await api
        .post('/api/users')
        .send(wrongUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('username/password has to be longer than 2 letters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with a password that is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const wrongUser = {
        username: 'tgdagdagda',
        name: 't',
        password: 'r'
    }

    const result = await api
        .post('/api/users')
        .send(wrongUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('username/password has to be longer than 2 letters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})


after(async () => {
    await mongoose.connection.close()
})