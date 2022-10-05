/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('Esperas', () => {

    it('Espera o elemento aparecer', () => {
        cy.get('[value="Resposta Demorada"]')
            .click()
        cy.get('[id="novoCampo"]')
            .type('Testando')
            .should('have.value', 'Testando')
    });

    it.only('Should and Then', () => {
        cy.get('[value="Listar DOM"]')
        .click()
    cy.get('#Lista li span').then($el => {
        expect($el).to.have.length(1)
        expect($el).to.have.text('Item 1')
    })
    cy.reload()

    cy.get('[value="Listar DOM"]')
        .click()
    cy.get('#Lista li span').should($el => {
        expect($el).to.have.length(1)
        return 2   
    })
    });
})