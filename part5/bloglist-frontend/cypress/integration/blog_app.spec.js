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

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem('loggedBlogappUser')).token
            }`,
          },
          body: {
            title: 'Book2',
            author: 'Barack',
            url: 'https://google.com',
            likes: '12',
          },
        })

        cy.visit('http://localhost:3000')
        cy.contains('Title').parent().as('blog1')
        cy.contains('Book2').parent().as('blog2')
      })

      it('like a blog', function () {
        cy.get('#view-blog').click()
        cy.contains('likes 12')
        cy.get('.likeButton').first().click()
        cy.contains('likes 13')
      })

      it('delete a blog', function () {
        cy.get('#view-blog').click()
        cy.get('#delete-button').click()
        cy.contains('Book2').should('not.exist')
        cy.contains('Title')
      })
      it('blogs are in sorted order', function () {
        cy.get('@blog1').contains('view').click()
        cy.get('@blog1').contains('like').as('like1')

        cy.get('@like1').click()
        cy.wait(250)
        cy.get('@like1').click()
        cy.wait(250)
        cy.get('@like1').click()

        cy.visit('http://localhost:3000')

        cy.get('.blog').then((blogList) => {
          cy.wrap(blogList[0]).contains(13)
          cy.wrap(blogList[1]).contains(12)
        })
      })
    })
  })
})
