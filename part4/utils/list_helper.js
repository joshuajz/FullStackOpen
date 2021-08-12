
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce(((accumulated, blog) => accumulated + blog.likes), 0)
  return total
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const largest = blogs.reduce((previous, current) => {
    return (previous.likes > current.likes) ? previous : current
  })
  delete largest.__v
  delete largest._id
  return largest
}

module.exports = { dummy, totalLikes, favouriteBlog }
