/// <reference types="cypress" />

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

describe('Alerts', () => {

    it('Alert', () => {
        cy.clickAlert('[id="alert"]', 'Alert Simples')
    });

    it('Alert com mock', () => {
        const stub = cy.stub().as('Alert')
        cy.on('window:alert', stub)
        cy.get('[id="alert"]').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Confirm Simples')
        }) 
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Confirmado')
        })
        cy.get('[id="confirm"]').click()
    });

    it('Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        }) 
        cy.get('[id="confirm"]').click()
    });

    it('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('7')
        })
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Era 7?')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('[id="prompt"]').click()
    });
        

})