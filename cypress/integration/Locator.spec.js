/// <reference types="cypress" />


beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('Locator', () => {
    
    it('', () => {
        cy.get('#tabelaUsuarios tbody > tr:eq(0) > td:eq(5)')
            .type('Achei o Localizador')
        
        cy.get('#tabelaUsuarios tbody > tr:eq(0) > td:eq(1)')
            .should('have.text', 'Superior')
        cy.get('#tabelaUsuarios tbody > tr:eq(2) > td:eq(3) > input')
            .click()
            .should('be.checked')
        cy.get('#tabelaUsuarios tbody > tr:eq(4) > td:eq(2) > input')
            .click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Usuario A')
        })
    });
})