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
  console.log("MADE IT TO THE MIDDLEWARE")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7)
    console.log(request.token)
  } else {
    request.token = null
  }
  next()
}

module.exports = { errorHandler, getToken }
