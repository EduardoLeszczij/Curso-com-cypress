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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from '../support/Locator'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.eq(message)
    })
})

Cypress.Commands.add('resetAplication', () => {
    cy.get(loc.menu.settings).click()
    cy.get(loc.menu.reset).click()
})

Cypress.Commands.add('accessMenuAccount', () => {
    cy.get(loc.menu.settings).click()
    cy.get('[href="/contas"]').click()
})

Cypress.Commands.add('getToken', (usuario, senha) => {
    cy.api({
        method: 'POST',
        url: '/signin',
        body: {
            email: usuario,
            redirecionar: false,
            senha: senha
        }
    }).its('body.token').should('not.be.empty')
})

Cypress.Commands.add('RESET', () => {
    cy.getToken('lexi@gmail.com', '123456').then(token => { 
        cy.api({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}`}
        })
    })
})

Cypress.Commands.add('getAccountByName', () => {
    cy.getToken('lexi@gmail.com', '123456').then(token => {
        cy.api({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: ` JWT ${token}` },
            qs: {
                nome: 'Conta para movimentacoes'
            }
        }).then(resp => {
            return resp.body[0].id
        })
    })
})