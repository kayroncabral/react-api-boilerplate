import { numeral } from '../../../src/utils/numeral'

describe('/checkout', () => {
  describe('Add item to checkout', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/checkout')
      cy
        .fixture('items.json')
        .as('items')
        .then(items => cy.addItemToCart([items[0]]))
    })

    it.skip('should notify with a success snackbar when item is added', () => {
    })

    it.skip('should notify you with a warning snackbar when item is not found', () => {
    })

    it('should change total label for the sum of the sutotals of the items added', () => {
      cy.get('@items').then((items) => {
        cy.addItemToCart([items[1]])

        cy.total(items).then((total) => {
          cy
            .get('[data-cy=payment-widget-total]')
            .contains(`${numeral(total).format()}`)
        })
      })
    })

    it('should keep Adicionar Cliente button enabled', () => {
      cy
        .get('[data-cy=payment-widget-add-customer]')
        .should('not.be.disabled')
    })

    it('should enable Adicionar Pagamento button', () => {
      cy
        .get('[data-cy=payment-widget-add-payment]')
        .should('not.be.disabled')
    })

    it('should enable Remover todos button', () => {
      cy
        .get('[data-cy=order-widget-remove-all]')
        .should('not.be.disabled')
    })

    it('should hide Adicione produtos ao 🛒 para realizar uma venda', () => {
      cy
        .contains('h4', 'Adicione produtos ao 🛒 para realizar uma venda.')
        .should('not.exist')
    })

    it('should show the product ean added on items list', () => {
      cy.get('@items').then((items) => {
        cy.wrap([items[0]]).each((item, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', item.ean)
        })
      })
    })

    it('should show the product name added on items list', () => {
      cy.get('@items').then((items) => {
        cy.wrap([items[0]]).each((item, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', item.name)
        })
      })
    })

    it('should show the product price added on items list', () => {
      cy.get('@items').then((items) => {
        cy.wrap([items[0]]).each((item, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', numeral(item.price).format())
        })
      })
    })

    it('should show the product quantity added on items list', () => {
      cy.get('@items').then((items) => {
        cy.wrap([items[0]]).each((item, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', `${item.quantity} (${item.measurementType})`)
        })
      })
    })

    it('should show the product subtotal added on items list', () => {
      cy.get('@items').then((items) => {
        cy.wrap([items[0]]).each((item, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', numeral(item.price * item.quantity).format())
        })
      })
    })
  })
})
