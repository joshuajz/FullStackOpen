import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })
      setUser(user)
      console.log(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong Credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <h3>login to the application</h3>
          <div>
            username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password:
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button type="submit">login</button>
        </form>

        {/* <div>
          <h1>Blogs:</h1>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div> */}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} is logged in.</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
