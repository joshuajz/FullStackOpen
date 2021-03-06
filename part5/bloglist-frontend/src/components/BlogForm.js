import React, { useState } from 'react'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  return (
    <div>
      <h2>Create a new blog</h2>
      <form
        onSubmit={(event) => {
          onSubmit(event, { title, author, url, likes })
          setTitle('')
          setAuthor('')
          setUrl('')
          setLikes('')
        }}
      >
        title:
        <input
          type="text"
          value={title}
          name="Title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br></br>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br></br>
        url:
        <input
          type="text"
          value={url}
          name="URL"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br></br>
        likes:{' '}
        <input
          type="text"
          value={likes}
          name="Likes"
          id="likes"
          onChange={({ target }) => setLikes(target.value)}
        />
        <br></br>
        <button type="submit" id="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
