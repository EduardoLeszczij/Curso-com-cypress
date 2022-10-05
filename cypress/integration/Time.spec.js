/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('Teste voltando ao passado', () => {

    it('voltando ao passado', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '31/08/2022')

        cy.clock()
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '31/12/1969')

    });

    it('Setando data e hora', () => {
            
        const dt = new Date(2022, 4, 15, 10, 0, 0)

            cy.clock(dt.getTime())
            cy.get('#buttonNow').click()
            cy.get('#resultado > span').should('contain', '15/05/2022')
        });

    it.only('Testes para futuro', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16621')
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gt', 1662125036649)
        })

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('lte', 0)
        })
        cy.wait(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('lte', 1000)
        
        })

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 5000)
        
        })

    });
})