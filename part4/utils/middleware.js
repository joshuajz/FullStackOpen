const User = require("../models/user")
const jwt = require("jsonwebtoken")

const errorHandler = (error, request, response, next) => {
  console.log("##Error: ", error.name, ":", error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

const getToken = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  console.log("made it")
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    request.user = null
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

module.exports = { errorHandler, getToken, userExtractor }
