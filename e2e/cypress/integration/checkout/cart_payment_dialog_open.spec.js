import { numeral } from '../../../src/utils/numeral'

describe('/checkout', () => {
  describe('Payment dialog - Open', () => {
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
    })

    it('should have dialog opened', () => {
      cy
        .get('#cart-dialog')
        .should('exist')
    })
  })
})
