describe('useForm', () => {
  it('submits form', () => {
    cy.visit('/users/new-with-file')
    cy.get('[data-test="result-name"]').should('not.exist')
    cy.get('[name="name"]').type('Jane')
    cy.get('[name="email"]').type('jane@doe.com')
    cy.get('[name="avatar"]').attachFile('profile.jpeg')
    cy.get('button[type="submit"]').click()
    // cy.get('[data-test="result-name"]').should('have.text', 'Name: Jane')
  })
})