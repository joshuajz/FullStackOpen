const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('../tests/test_helper')

describe('When there is initally one user in the database.', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Creating a new user', async () => {
    const initalUsers = await helper.usersInDb()

    const newUser = {
      username: 'Mitch',
      name: 'Mitch William',
      password: 'salainen'
    }

    await api.post('/api/users').send(newUser).expect(200).expect('Content-Type', /application\/json/)

    const endUsers = await helper.usersInDb()
    expect(endUsers.length).toBe(initalUsers.length + 1)

    const usernames = endUsers.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

