/// <reference types="cypress" />

describe('Helpers', () => {
    it('Its, Wrap', () => {
        const obj = {name: 'Eduardo', years: 10}
        cy.wrap(obj).should('have.property', 'name')
        cy.wrap(obj).its('years').should('be.eq', 10)

        const obj2 = {name: 'Eduardo', years: 10, endereco: { rua: "de oliveira" } }
        cy.wrap(obj2).its('name').should('be.eq', 'Eduardo')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'oliveira')
        cy.wrap(obj2).its('endereco.rua').should('be.equal', 'de oliveira')

    });

    it('Ivoke', () => {
        const getVelue = () => 1;
        const soma = (a, b) => a + b; 

        cy.wrap({ get: getVelue}).invoke('get').should('be.eq', 1)
        cy.wrap({ func: soma}).invoke('func', 1, 6).should('be.eq', 7)


        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'testando invoke')
        cy.window().invoke('alert', 'visualizou ?')
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="Hacked">')

    });
})