import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    component = render(<BlogForm onSubmit={mockHandler} />)
  })

  test('adding a new blog', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')

    fireEvent.change(title, { target: { value: 'Title of the form :]' } })
    fireEvent.change(author, { target: { value: 'John Hopkins' } })
    fireEvent.change(url, { target: { value: 'https://google.com/hello' } })
    fireEvent.change(likes, { target: { value: '8' } })

    const submit = component.container.querySelector('#submit')

    fireEvent.click(submit)
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
