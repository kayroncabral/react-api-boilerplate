describe('/checkout', () => {
  describe('Payment dialog - Cancel', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/checkout')
      cy
        .fixture('item.json')
        .as('item')
        .then(item => cy.addItemToCart([item]))
      cy
        .get('[data-cy=payment-widget-add-payment]')
        .click()
      cy
        .get('[data-cy=payment-form-cancel]')
        .click()
    })

    it('should close dialog', () => {
      cy
        .get('#cart-dialog')
        .should('not.exist')
    })

    it('should keep items in cart', () => {
      cy.get('@item').then((item) => {
        cy.containsItem(item)
      })
    })
  })
})
