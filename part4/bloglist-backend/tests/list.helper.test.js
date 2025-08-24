const {test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 55,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 1000,
      __v: 0
    }
  ]

  const returnValBlogs = [
    {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    },
    {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    },
    {
      author: 'Markus',
      blogs: 5
    }
  ]

  const returnValLikes = [
    {
      author: 'Edsger W. Dijkstra',
      likes: 1
    }
  ]

  const returnValLikesMultiple = [
    {
      author: 'Edsger W. Dijkstra',
      likes: 1
    },
    {
      author: 'Markus',
      likes: 10000
    }
  ]

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 1060)
  })
})

describe('most likes', () => {

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, 0)
  })

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, listWithMultipleBlogs[2])
  })
})

describe('most blogs', () => {

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, 0)
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, returnValBlogs[0])
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, returnValBlogs[1])
  })
})

describe('most likes', () => {

  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, 0)
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(returnValLikes)
    assert.deepStrictEqual(result, returnValLikes[0])
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.mostLikes(returnValLikesMultiple)
    assert.deepStrictEqual(result, returnValLikesMultiple[1])
  })
})