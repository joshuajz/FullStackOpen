import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])
  console.log('blogs')
  console.log(blogs)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleAddBlog = async (event, { likes, author, title, url }) => {
    event.preventDefault()

    try {
      const blog = { title, author, url, likes: parseInt(likes) }
      await blogService.addBlog(blog, user.token)

      const blogsUpdated = await blogService.getAll()
      setBlogs(blogsUpdated.sort((a, b) => b.likes - a.likes))

      setErrorMessage('Blog added successfully!')
      console.log('set error msg')
      console.log(errorMessage)
      setTimeout(() => {
        console.log(errorMessage)
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Invalid Message Input')
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
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Successful Login!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleDelete = (blogDelete) => {
    if (window.confirm('Are you sure you want to delete the blog?')) {
      blogService.deleteBlog(blogDelete.id, user.token)
      setBlogs(blogs.filter((blog) => blog.id !== blogDelete.id))
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
      </div>
    )
  }
  console.log(blogs)
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <p>{user.username} is logged in.</p>{' '}
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleDelete={handleDelete}
        />
      ))}
      <Toggleable buttonLabel="create new blog">
        <BlogForm onSubmit={handleAddBlog} />
      </Toggleable>
    </div>
  )
}

export default App
