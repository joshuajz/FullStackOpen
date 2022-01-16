describe('login form', function () {
  beforeEach(function () {
    cy.log('Performing a POST request to reset the database.')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = { name: 'Jane Doe', username: 'jane', password: 'doe' }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('checking for login form', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('successfully login', function () {
      cy.get('#username').type('jane')
      cy.get('#password').type('doe')
      cy.get('#login-button').click()

      cy.contains('jane is logged in.')
    })
    it('fail to login', function () {
      cy.get('#username').type('notjane')
      cy.get('#password').type('notdoe')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'jane',
        password: 'doe',
      }).then(function (response) {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('a blog can be created', function () {
      cy.get('#create-blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Obama')
      cy.get('#url').type('https://google.com')
      cy.get('#likes').type('10')
      cy.get('#submit').click()

      cy.contains('Blog added successfully!')
      cy.contains('Title')
    })

    describe('when a blog has been created', function () {
      beforeEach(function () {
        console.log(localStorage.getItem('loggedBlogappUser'))

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem('loggedBlogappUser')).token
            }`,
          },
          body: {
            title: 'Title',
            author: 'Obama',
            url: 'https://google.com',
            likes: '10',
          },
        })
        cy.visit('http://localhost:3000')
      })

      it('like a blog', function () {
        cy.get('#view-blog').click()
        cy.contains('likes 10')
        cy.get('.likeButton').click()
        cy.contains('likes 11')
      })
    })
  })
})
