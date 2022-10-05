/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('Desafio', () => {
    
    it('Desafio', () => {
        cy.on('window:alert', msg => {
            console.log()
            expect(msg).to.be.eq('Nome eh obrigatorio')  
        })
        
        cy.get('#formNome').invoke('val', 'Eduardo')
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Sobrenome eh obrigatorio')
        })

        // cy.get('#formNome')
        //     .type('Eduardo')
        //     .should('not.be.null')
        
        cy.get('#formCadastrar')
            .click()


        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Sexo eh obrigatorio')
        // })


        


        // cy.get('[data-cy="dataSobrenome"]')
        //     .type('teste')
        
    

    });

    it.only('Desafio_1', () => {
        const stub = cy.stub().as('Alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar')
            .click().then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })
        
        cy.get('#formNome').type('Eduardo')
        cy.get('#formCadastrar')
            .click().then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
        
        cy.get('#formSobrenome').type('teste')
        cy.get('#formCadastrar')
            .click().then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            })
        
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar')
            .click()
        cy.get('#descNome > span').should('have.text', 'Eduardo')
    });
})