describe('/products', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/products')
  })

  it('should add a new internal product', () => {
    cy
      .get('[data-cy=action-button]')
      .click({ force: true })
      
    cy.get('form').within(() => {
      cy.get('input[name="internal"]').click()
      cy.get('input[name="price"]').type('5,00')
      cy.get('input[name="name"]').type('Limpador Ajax Fresh Lemon 500ML')
      cy.get('textarea[name="description"]').type('Limpador perfumado')
      cy.root().submit()
    })

    cy
      .get('[data-cy=snackbar-content]')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(67, 160, 71)')
    
    cy
      .get('#snackbar-message').contains('Produto adicionado')
  })

  it('should add a new product', () => {
    cy
      .get('[data-cy=action-button]')
      .click({ force: true })
      
    cy.get('form').within(() => {
      cy.get('input[name="gtin"]').type('7891024120804')
      cy.get('input[name="price"]').type('5,00')
      cy.get('select[name="measurement"]').select('unit')
      cy.get('input[name="ncm"]').type('123123')
      cy.get('input[name="name"]').type('Limpador Ajax Fresh Lemon 500ML')
      cy.get('textarea[name="description"]').type('Limpador perfumado')
      cy.root().submit()
    })

    cy
      .get('[data-cy=snackbar-content]')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(67, 160, 71)')
    
    cy
      .get('#snackbar-message').contains('Produto adicionado')
  })

  it('should not add a duplicate product', () => {
    cy
      .get('[data-cy=action-button]')
      .click({ force: true })
      
    cy.get('form').within(() => {
      cy.get('input[name="gtin"]').type('7891024120804')
      cy.get('input[name="price"]').type('5,00')
      cy.get('select[name="measurement"]').select('unit')
      cy.get('input[name="ncm"]').type('123123')
      cy.get('input[name="name"]').type('Limpador Ajax Fresh Lemon 500ML')
      cy.get('textarea[name="description"]').type('Limpador perfumado')
      cy.root().submit()
    })

    cy
      .get('[data-cy=snackbar-content]')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(211, 47, 47)')
    
    cy
      .get('#snackbar-message').contains('Produto já existe')
  })
})
