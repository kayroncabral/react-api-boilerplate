describe('/products', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/products')
  })

  it.skip('should add a new movement to inventory', () => {
  })
})
