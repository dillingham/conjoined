describe('usePage', () => {
  it('fetches page data from root', () => {
    cy.visit('/')
    cy.get('p').should('have.text', 'Jane Doe')
  })

  it('fetches page data with parameters', () => {
    cy.visit('/users/1')
    cy.get('[data-test="user-id"]').should('have.text', 'id: 1')
    cy.get('[data-test="user-name"]').should('have.text', 'name: Frank')
  })
})