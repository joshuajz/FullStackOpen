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
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState("")

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = { title, author, url, likes: parseInt(likes) }
      await blogService.addBlog(blog, user.token)
      setLikes("")
      setUrl("")
      setAuthor("")
      setTitle("")
    } catch (exception) {
      setErrorMessage("Invalid Message Input")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      setUser(user)

      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong Credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
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
      <p>{user.username} is logged in.</p>{" "}
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />{" "}
        <br></br>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />{" "}
        <br></br>
        url:
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />{" "}
        <br></br>
        likes:{" "}
        <input
          type="text"
          value={likes}
          name="Likes"
          onChange={({ target }) => setLikes(target.value)}
        />{" "}
        <br></br>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
