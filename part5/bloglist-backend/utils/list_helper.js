const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }
    return blogs.reduce((sum, val) => sum + val.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
      return 0;
  } else if (blogs.length === 1) {
    return blogs[0]
  }
  const blogLikes = blogs.map((blog) => blog.likes)
  const index = blogLikes.indexOf(Math.max(...blogLikes))
  return blogs[index]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    const returnVal = {
      author: blogs[0].author,
      blogs: 1
    }
    return returnVal
  }
  const countBlogs = blogs.reduce((acc, curr) => {
    acc[curr.author] = (acc[curr.author] || 0) + 1
    return acc
  }, {})
  const authorWithMostBlogs = Object.keys(countBlogs).reduce((a, b) => countBlogs[a] > countBlogs[b] ? a : b)
  const returnVal = {
    author: authorWithMostBlogs,
    blogs: countBlogs[authorWithMostBlogs]
  }
  console.log(returnVal)
  return returnVal
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    const returnVal = {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
    return returnVal
  }

  const countBlogLikes = {}
  blogs.forEach(element => {
    countBlogLikes[element.author] = element.likes
  })
  const authorWithMostLikes = Object.keys(countBlogLikes).reduce((a, b) => countBlogLikes[a] > countBlogLikes[b] ? a : b)
  const returnVal = {
    author: authorWithMostLikes,
    likes: countBlogLikes[authorWithMostLikes]
  }
  return returnVal
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}