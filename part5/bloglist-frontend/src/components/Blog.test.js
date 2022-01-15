import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    blog: {
      title: 'To kill a mockingbird',
      url: 'https://google.com/search',
      author: 'Joe',
      likes: 10,
      user: { username: 'John' },
    },
    user: { username: 'John' },
  }

  const handleDelete = () => {}

  const component = render(
    <Blog
      key="temp"
      blog={blog.blog}
      user={blog.user}
      handleDelete={handleDelete}
    />
  )

  expect(component.container).toHaveTextContent('To kill a mockingbird')
})
