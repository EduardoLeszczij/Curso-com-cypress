/// <reference types="cypress" />



describe('iFrame', () => {

    it('iFrame', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('Testando iFrame!')
                .should('have.value', 'Testando iFrame!')
        })
    })

    it('iFrame com outra url', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Click OK!')
        })
        
    })

    it('Deve verificar se o Popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
                
        cy.get('#buttonPopUp').click()
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
            cy.get('@winOpen')
        })
        
    })

    describe('Com Links', () => {

        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Checar Popup por link', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        }); 

        it('Pega o Link do popup e acessa a página', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('Testando')
            })
        });

        it('Remover propriedade que abre popup em outra janela', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            
            cy.get('#tfield').type('Testando')
            cy.get('#otherButton').click()
            
        });
    })
    
})