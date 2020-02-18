describe('/products', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/products')
  })

  it('should have a main title with Todos os produtos', () => {
    cy
      .get('[data-cy=main-title]')
      .contains('Todos os produtos')
  })

  it('should have a Adicionar Produto button', () => {
    cy
      .get('[data-cy=action-button]')
      .should('be.visible')
  })

  it('should greets with Ainda não há produtos', () => {
    cy
      .get('[data-cy=placeholder-title]')
      .contains('Ainda não há produtos')
  })

  it('should have a Adicionar Produto button', () => {
    cy
      .get('[data-cy=placeholder-action-button]')
      .should('be.visible')
  })
})
