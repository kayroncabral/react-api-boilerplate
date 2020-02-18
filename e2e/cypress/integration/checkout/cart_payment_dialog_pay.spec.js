import { numeral } from '../../../src/utils/numeral'

describe('/checkout', () => {
  describe('Payment dialog - Pay', () => {
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
        .get('[data-cy=payment-form-pay]')
        .click()
    })

    it('should close dialog', () => {
      cy
        .get('#cart-dialog')
        .should('not.exist')
    })

    it('should clear cart', () => {
      cy
        .get('tr')
        .should('not.exist')
    })

    it.skip('should notify with a success snackbar with Venda finalizada', () => {
    })
  })
})
