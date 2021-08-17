const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initalNotes = [{'title': 'Google\'s best images.', 'author': 'John Sparrow', 'likes': 10}, {'title': 'A Guide to Databases.', 'author': 'John Sparrow', 'likes': 19}, {'title': 'How to purchase from Amazon - A Guide for Seniors', 'author': 'Tim Apple', 'likes': 6}]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initalNotes[0])
  await blogObject.save()
  blogObject = new Blog(initalNotes[1])
  await blogObject.save()
  blogObject = new Blog(initalNotes[2])
  await blogObject.save()
})

test('Connection to the database.', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('Returns the proper amount of notes.', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initalNotes.length)
})

test('Unique identifier named "id"', async () => {
  const contents = await Blog.find({})
  contents.forEach(note => {
    expect(note.id).toBeDefined()
  })
})

test('Adding a blog to the database', async () => {
  const newNote = new Blog({'title': 'Why Fullstackopen is Awesome', 'author': 'John Oliver', 'likes': 77})
  await newNote.save()

  const contents = await Blog.find({})
  const titles = contents.map(r => r.title)

  expect(contents).toHaveLength(initalNotes.length + 1)
  expect(titles).toContain('Why Fullstackopen is Awesome')
})

afterAll(() => {
  mongoose.connection.close()
})
