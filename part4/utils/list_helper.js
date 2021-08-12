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

  var largest = 0
  for (const [key, value] of Object.entries(authors)) {
    if (value > largest) {largest = value}
  }
  var authorsObjects = []
  for (const [key, value] of Object.entries(authors)) {
    if (value === largest) {authorsObjects.push({ 'author': key, 'blogs': value })}
  }
  return (authorsObjects.length === 1) ? authorsObjects[0] : authorsObjects
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  var authors = {}
  for (var i = 0; i < blogs.length; i++) {
    if (authors[blogs[i].author]) {
      authors[blogs[i].author] += blogs[i].likes
    }
    else {
      authors[blogs[i].author] = blogs[i].likes
    }

  }


  if (_.size(authors) === 1) {
    const author = Object.keys(authors)[0]
    return { 'author': author, 'likes': authors[author] }
  }

  var largest = 0
  for (const [key, value] of Object.entries(authors)) {
    if (value > largest) {largest = value}
  }
  var authorsObjects = []
  for (const [key, value] of Object.entries(authors)) {
    if (value === largest) {authorsObjects.push({ 'author': key, 'likes': value })}
  }
  return (authorsObjects.length === 1) ? authorsObjects[0] : authorsObjects
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
