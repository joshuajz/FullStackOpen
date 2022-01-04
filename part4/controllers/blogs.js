const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const fetch = await Blog.find({}).populate("user")
  response.json(fetch)
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body
  const user_ = await User.findById(body.user_id)
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user_,
  })
  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.url || !blog.title) {
    response.status(400).end()
  }

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }

  user_.blogs.push(blog._id)
  await user_.save()
})

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.body.id
  const result = await Blog.deleteOne({ id: id })
  response.status("200").json(result)
})

blogsRouter.put("/:id", async (request, response) => {
  const t = await Blog.findOneAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  )
  response.json(t)
})

module.exports = blogsRouter
