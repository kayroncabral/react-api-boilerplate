describe('/customers', () => {
  describe('Add new customer', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/customers')
      cy
        .fixture('customers.json')
        .as('customers')
        .then(customers => cy.addCustomers([customers[0]]))
    })

    it.skip('should notify with a success snackbar when customer is added', () => {
    })

    it.skip('should notify you with a warning snackbar when customer not added', () => {
    })

    it.skip('should show the customer firstName added on customers list', () => {
      cy.get('@customers').then((customers) => {
        cy.wrap([customers[0]]).each((customer, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', customer.firstName)
        })
      })
    })

    it.skip('should show the customer lastName added on customers list', () => {
      cy.get('@customers').then((customers) => {
        cy.wrap([customers[0]]).each((customer, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', customer.lastName)
        })
      })
    })

    it.skip('should show the customer cpf added on customers list', () => {
      cy.get('@customers').then((customers) => {
        cy.wrap([customers[0]]).each((customer, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', customer.cpf)
        })
      })
    })

    it.skip('should show the customer mobile added on customers list', () => {
      cy.get('@customers').then((customers) => {
        cy.wrap([customers[0]]).each((customer, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', customer.mobile)
        })
      })
    })

    it.skip('should show the customer email added on customers list', () => {
      cy.get('@customers').then((customers) => {
        cy.wrap([customers[0]]).each((customer, index) => {
          cy
            .get('tr')
            .eq(index + 1)
            .should('contain', customer.email)
        })
      })
    })
  })
})
