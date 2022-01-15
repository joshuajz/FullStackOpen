import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete }) => {
  const [visible, setVisibility] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  let deleteButton

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const handleLike = () => {
    setLikes(likes + 1)
    blog.likes = blog.likes + 1
    blogService.blogPut(blog)
  }

  if (user.username === blog.user.username) {
    deleteButton = (
      <div>
        <button
          onClick={() => {
            handleDelete(blog)
          }}
        >
          delete
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} <button onClick={toggleVisibility}>hide</button> <br />
          {blog.url} <br />
          likes {likes} <button onClick={handleLike}>like</button> <br />
          {blog.author}
          {deleteButton}
        </div>
      </div>
    </div>
  )
}

export default Blog
