describe('/customers', () => {
  describe('UI elements', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/customers')
    })

    it('should have a main title with Todos os clientes', () => {
      cy
        .get('[data-cy=main-title]')
        .contains('Todos os clientes')
    })

    it('should have a Adicionar Cliente button', () => {
      cy
        .get('[data-cy=main-title]')
        .should('not.be.disabled')
    })

    it('should greets with Você ainda não cadastrou clientes. 😢', () => {
      cy
        .get('[data-cy=main-title]')
        .contains('Todos os clientes')
    })
  })
})
