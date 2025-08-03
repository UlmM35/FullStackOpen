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
      return null;
  } else if (blogs.length === 1) {
    return blogs[0]
  }
  const blogLikes = blogs.map((blog) => blog.likes)
  const index = blogLikes.indexOf(Math.max(...blogLikes))
  return blogs[index]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}