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
  const token = body.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }
  const user_ = await User.findById(decodedToken.id)
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
  const body = request.body
  const blog = await Blog.findById(body.id)
  // console.log(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(404).json({ error: "Invalid Token." })
  }
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user.toString()) {
    const result = await Blog.deleteOne({ id: body.id })
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
