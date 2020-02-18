describe('/checkout', () => {
  describe('Cart UI elements', () => {
    before(() => {
      cy.login()
      cy.visit('/checkout')
    })

    it('should have a ean input field', () => {
      cy
        .get('input[name="ean"]')
        .should('have.attr', 'placeholder', 'Digite o código de barras')
    })

    it('should be focused on ean input filed', () => {
      cy
        .focused()
        .should('have.attr', 'placeholder', 'Digite o código de barras')
    })

    it('should have a total label with R$ 0,00', () => {
      cy
        .get('[data-cy=payment-widget-total]')
        .contains('R$ 0,00')
    })

    it('should have an Adicionar Cliente button', () => {
      cy
        .get('[data-cy=payment-widget-add-customer]')
        .should('not.be.disabled')
    })

    it('should have an Adicionar Pagamento button disabled', () => {
      cy
        .get('[data-cy=payment-widget-add-payment]')
        .should('be.disabled')
    })

    it('should greets with Adicione produtos ao 🛒 para realizar uma venda', () => {
      cy.contains('h4', 'Adicione produtos ao 🛒 para realizar uma venda.')
    })
  })
})
