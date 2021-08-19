const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initalNotes = [{'title': 'Google\'s best images.', 'author': 'John Sparrow', 'likes': 10, 'url': 'https://google.com/'}, {'title': 'A Guide to Databases.', 'author': 'John Sparrow', 'likes': 19, 'url': 'https://database.com/'}, {'title': 'How to purchase from Amazon - A Guide for Seniors', 'author': 'Tim Apple', 'likes': 6, 'url': 'https://amazon.com/'}]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initalNotes[0])
  await blogObject.save()
  blogObject = new Blog(initalNotes[1])
  await blogObject.save()
  blogObject = new Blog(initalNotes[2])
  await blogObject.save()
})

describe('Inital Notes', () => {
  test('Connection to the database.', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('Returns the proper amount of notes.', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initalNotes.length)
  })

  test('Unique identifier named "id"', async () => {
    const contents = await api.get('/api/blogs')
    contents.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('Additions', () => {
  test('Adding a blog to the database', async () => {
    const newNote = { 'title': 'Why Fullstackopen is Awesome', 'author': 'John Oliver', 'likes': 77, 'url': 'https://fullstackopen.com/en/' }

    await api.post('/api/blogs').send(newNote)//.expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const contents = response.body.map(b => b.title)

    expect(response.body).toHaveLength(initalNotes.length + 1)
    expect(contents).toContain('Why Fullstackopen is Awesome')
  })

  test('Adding a blog to the database, with no likes value.  Should default to 0.', async () => {
    const newNote = {'title': 'Why Fullstackopen is Awesome', 'author': 'John Oliver', 'url': 'https://johnoliver.com/'}

    await api.post('/api/blogs').send(newNote).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const note = response.body.find((note) => note.title === 'Why Fullstackopen is Awesome')
    expect(note.likes).toBe(0)
  })

  test('Creating a new blog without a title or url.', async () => {
    const newNote = {'author': 'John Oliver', 'likes': 10}

    const result = await api.post('/api/blogs').send(newNote).expect(400)
  })
})

describe('Deletions', () => {
  test('Deleting a blog based off id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    console.log('Deleting the blog with the id of: ', id)

    await api.delete(`/api/blogs/id=${id}`)

    const get = await api.get('/api/blogs')
    expect(get.body).toHaveLength(initalNotes.length - 1)
  })
})

describe('Updating an ID', () => {
  test('Updating a blog\'s likes', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    console.log('Updating the blog with the id of: ', id)

    await api.put(`/api/blogs/${id}`).send({'likes': 100})

    const get = await api.get('/api/blogs')
    const newLikes = get.body.filter((instance) => {
      if (instance.id === id) {
        return instance.likes
      }
    })
    expect(newLikes[0].likes).toEqual(100)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
