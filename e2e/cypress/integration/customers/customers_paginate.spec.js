describe('/customers', () => {
  describe('Paginate between customers', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/customers')
    })

    it.skip('should paginate foward', () => {
    })

    it.skip('should paginate backward', () => {
    })
  })
})
