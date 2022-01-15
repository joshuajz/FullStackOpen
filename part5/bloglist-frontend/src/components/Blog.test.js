import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
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

    component = render(
      <Blog
        key="temp"
        blog={blog.blog}
        user={blog.user}
        handleDelete={handleDelete}
      />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('To kill a mockingbird')
  })

  test('renders content & clicks show blog', () => {
    const div = component.container.querySelector('.toggleableContent')

    expect(div).toHaveStyle('display: none')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('https://google.com/search')
    expect(component.container).toHaveTextContent('10')

    expect(div).toHaveStyle('display: block')
  })

  test('clicking like button twice', () => {
    const div = component.container.querySelector('.toggleableContent')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('https://google.com/search')
    expect(component.container).toHaveTextContent('10')

    expect(div).toHaveStyle('display: block')

    const likeButton = component.container.querySelector('.likeButton')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(component.container).toHaveTextContent('likes 12')
  })
})
