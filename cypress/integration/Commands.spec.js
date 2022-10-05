/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('Commands', function() {

    it('Cria comando de clicar em alert', () => {
        cy.clickAlert('[id="alert"]', 'Alert Simples')
    });
})