const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const fetch = await Blog.find({})
  response.json(fetch)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.url || !blog.title) {
    response.status(400).end()
  }

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.body.id
  const result = await Blog.deleteOne({ id: id })
  response.status('200').json(result)
})

module.exports = blogsRouter
