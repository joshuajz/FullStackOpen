import React, { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  const showWhenVisible = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }

  return (
    <div>
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} <button onClick={toggleVisibility}>hide</button> <br />
          {blog.url} <br />
          likes {blog.likes} <button>like</button> <br />
          {blog.author}
        </div>
      </div>
    </div>
  )
}

export default Blog
