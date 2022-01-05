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
  if (authorization && authorization.tooLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

module.exports = { errorHandler, getToken }
