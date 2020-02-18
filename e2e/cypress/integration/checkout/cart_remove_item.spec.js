import { numeral } from '../../../src/utils/numeral'

describe('/checkout', () => {
  describe('Remove item from cart', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/checkout')
      cy
        .fixture('items.json')
        .as('items')
        .then(items => cy.addItemToCart(items))
    })

    it('should remove individually all items from cart', () => {
      cy.get('@items').then((items) => {
        cy
          .wrap(items)
          .each(() => cy.removeItemFromCart(0))
      })

      cy
        .get('tr')
        .should('not.exist')
    })

    it('should remove only the first item from cart', () => {
      cy.get('@items').then((items) => {
        const [_, ...keptItems] = items
        const keptItemIndex = 1
        const index = 0
        const item = items[index]

        cy
          .removeItemFromCart(index)
          .containsItem(items[keptItemIndex])

        cy.total(keptItems).then((total) => {
          cy
            .get('[data-cy=payment-widget-total]')
            .contains(`${numeral(total).format()}`)
        })
      })
    })

    it('should remove only the second item from cart', () => {
      cy.get('@items').then((items) => {
        const [firstItem] = items
        const keptItemIndex = 0
        const index = 1
        const item = items[index]

        cy
          .removeItemFromCart(index)
          .containsItem(items[keptItemIndex])

        cy.total([firstItem]).then((total) => {
          cy
            .get('[data-cy=payment-widget-total]')
            .contains(`${numeral(total).format()}`)
        })
      })
    })
  })
})
