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
  }
  return blogs.find((blogs.likes))
}

module.exports = {
  dummy,
  totalLikes
}