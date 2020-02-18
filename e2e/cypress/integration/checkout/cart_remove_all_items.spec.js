describe('/checkout', () => {
  describe('Remove all items from cart', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/checkout')
      cy
        .fixture('items.json')
        .as('items')
        .then(items => cy.addItemToCart(items))
      cy.removeAllItemsFromCart()
    })

    it('should change total label to R$ 0,00', () => {
      cy
        .get('[data-cy=payment-widget-total]')
        .contains('R$ 0,00')
    })

    it('should disable Adicionar Pagamento button', () => {
      cy
        .get('[data-cy=payment-widget-add-payment]')
        .should('be.disabled')
    })

    it('should show greets with Adicione produtos ao 🛒 para realizar uma venda', () => {
      cy.contains('h4', 'Adicione produtos ao 🛒 para realizar uma venda.')
    })

    it('should hide the items list', () => {
      cy
        .get('tr')
        .should('not.exist')
    })
  })
})
