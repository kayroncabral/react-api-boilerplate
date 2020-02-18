// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { numeral } from '../../src/utils/numeral'

Cypress.Commands.add('login', () => {
  const user = {
    _id: '5a5940ce225c5ff3cbf572d3',
    name: 'Boas Novas Mercearia',
    email: 'boasnovasmercearia@gmail.com',
    cnpj: '',
    description: '',
    picture: 'https://lh3.googleusercontent.com/-ceiX9_1n8R8/AAAAAAAAAAI/AAAAAAAAAAc/kt__myUaIdM/s96-c/photo.jpg',
    subscription: {
      code: 'FB8525A0E3E3247BB4AEAFBE2D9C2A0B',
      status: 'ACTIVE',
      __typename: 'Subscription',
    },
    permissions: {
      myStore: true,
      reports: true,
      billing: true,
      checkout: true,
      products: true,
      orders: {
        create: true,
        edit: true,
        list: true,
        closeOrder: true,
        addPayment: true,
        addItem: true,
        __typename: 'OrderPermissions',
      },
      tags: true,
      purchases: true,
      suppliers: true,
      __typename: 'Permissions',
    },
    role: 'employer',
    createdAt: 1551874126904,
    updatedAt: 1551874126904,
    __typename: 'Grocery',
  }

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2JmZDYxZTIzNGJkZGE2Njg2MDRlYjkiLCJpYXQiOjE1NjM4MTYzNDJ9.Jfkz9c40kL0tXxEiZRKSSAYT1wgqCh3sdws0kZH1L-E'

  window.localStorage.setItem('grocery', JSON.stringify(user))
  window.localStorage.setItem('token', JSON.stringify(token))
})

Cypress.Commands.add('total', (items) => {
  const total = items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  return parseFloat(total)
})

Cypress.Commands.add('addItemToCart', (items) => {
  cy.wrap(items).each((item) => {
    cy
      .get('input[name="ean"]')
      .type(`${item.ean}{enter}`)
      .clear({ force: true })
  })
})

Cypress.Commands.add('removeItemFromCart', (index) => {
  cy
    .get('tr')
    .eq(index + 1)
    .children('[data-cy=order-widget-item-actions]')
    .children('[data-cy=order-widget-item-remove]')
    .click()
})

Cypress.Commands.add('removeAllItemsFromCart', () => {
  cy
    .get('[data-cy=order-widget-remove-all]')
    .click()
})

Cypress.Commands.add('containsItem', (item) => {
  cy
    .get('tr')
    .should('contain', item.ean)
    .should('contain', item.name)
    .should('contain', numeral(item.price).format())
    .should('contain', `${item.quantity} (${item.measurementType})`)
    .should('contain', numeral(item.price * item.quantity).format())
})

Cypress.Commands.add('addCustomers', (customers) => {
  cy.wrap(customers).each((customer) => {
    cy
      .get('[data-cy=customers-add-customer]')
      .click()
    cy
      .get('form')
      .within(() => {
        cy
          .get('#firstName')
          .type(customer.firstName)
        cy
          .get('#lastName')
          .type(customer.lastName)
        cy
          .get('#cpf')
          .type(customer.cpf)
        cy
          .get('#mobile')
          .type(customer.mobile)
        cy
          .get('#email')
          .type(customer.email)
        cy
          .get('#birthday')
          .type(customer.birthday)
      })
    cy
      .get('form')
      .submit()
  })
})
