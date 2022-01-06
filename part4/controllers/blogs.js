const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const fetch = await Blog.find({}).populate("user")
  response.json(fetch)
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  const user_ = request.user
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
  const id = request.params.id
  const blog = await Blog.findById(id)

  const user = request.user

  if (!user) {
    response.statusMessage(400).json({ error: "Invalid User" })
  }

  if (blog.user.toString() === user._id.toString()) {
    const result = await Blog.deleteOne({ id: id })
    response.status("200").json(result)
  } else {
    response.status(400).json({ error: "Invalid user token." })
  }
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
