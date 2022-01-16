describe('login form', function () {
  beforeEach(function () {
    cy.log('Performing a POST request to reset the database.')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('checking for login form', function () {
    cy.contains('username')
    cy.contains('password')
  })
})
