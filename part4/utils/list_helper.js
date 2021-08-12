var _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = _.countBy(blogs, (blog) => {
    return blog.author
  })
  if (_.size(authors) === 1) {
    const author = Object.keys(authors)[0]
    return { 'author': author, 'blogs': authors[author] }
  }

  const author =  Object.keys(authors).reduce((previous, current) => {
    return previous > current ? previous : current
  })
  return { 'author': author, 'blogs': authors[author] }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs }
