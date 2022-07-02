describe('usePage', () => {
  it('fetches page data', () => {
    cy.visit('/')
    cy.get('p').should('have.text', 'Jane Doe')
  })
})