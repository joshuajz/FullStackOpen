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
})
