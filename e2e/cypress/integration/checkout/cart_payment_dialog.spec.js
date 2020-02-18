import { numeral } from '../../../src/utils/numeral'

describe('/checkout', () => {
  describe('Payment dialog - UI elements', () => {
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

    it.skip('should have chash payment already selected', () => {
    })

    it('should change total label for the sum of the sutotals of the items added', () => {
      cy.get('@item').then((item) => {
        cy.total([item]).then((total) => {
          cy
            .get('[data-cy=payment-dialog-total]')
            .contains(`${numeral(total).format()}`)
        })
      })
    })

    it('should have Cancelar button', () => {
      cy
        .get('[data-cy=payment-form-cancel]')
        .should('not.be.disabled')
    })

    it('should have Pagar button', () => {
      cy
        .get('[data-cy=payment-form-pay]')
        .should('not.be.disabled')
    })
  })
})
