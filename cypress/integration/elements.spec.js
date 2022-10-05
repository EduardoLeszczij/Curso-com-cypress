/// <reference types="cypress" />

describe('Elements Basics', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Text and Links', () => {
        cy.get('h3')
            .should('have.text', 'Campo de Treinamento')
        cy.get('span[class="facilAchar"]')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        cy.get('span[class="facilAchar"]')
            .contains('armadilhas')
        
        cy.get('a[href="#"]')
            .click()
            .should('have.text', 'Voltar')
        cy.reload()
        cy.get('div[id="resultado"]')
        .should('have.text', 'Status: Nao cadastrado')
    })

    it('Hooks', () => {
        before
        beforeEach
        after
        afterEach
    })

    it('text field', () => {
        cy.get('[id="formNome"]')
            .type('Eduardo')
        cy.get('[id="formNome"]')
            .should('have.value', 'Eduardo')
        cy.get('[id="elementosForm:sugestoes"]')
            .type('Warung')
            .should('have.value', 'Warung')
        cy.get('#tabelaUsuarios > tbody > tr:nth-child(1) > td:nth-child(6)')
            .type('Primeira linha')
            .should('not.be.null')
    });

    it('RadioButton', () => {
        cy.get('[id="formSexoMasc"]')
            .click()
            .should('be.checked');

        cy.get('[id="formSexoFem"]')
            .should('not.be.checked')
            .reload()

        cy.get('[id="formSexoFem"]')
            .click()
            .should('be.checked');
        
        cy.get('[id="formSexoMasc"]')
            .should('not.be.checked');
    });

    it('CheckBox', () => {
        cy.get('[name="formComidaFavorita"]')
            .click({multiple: true})
            .should('be.checked')
        cy.get('[id="formComidaCarne"]')
            .click()
            .should('not.be.checked')
        cy.get('[id="formComidaPizza"]')
            .click()
            .should('not.be.checked')
    });

    it('ComboBox', () => {
        cy.get('[name="formEscolaridade"]')
            .select('superior')
            .should('have.value', 'superior')  
            
        cy.get('[name="formEscolaridade"] > option')
            .should('have.length', 8)

        cy.get('[name="formEscolaridade"] > option').then($arr => {
            const value = []
            $arr.each(function() {
                value.push(this.innerHTML)
            })
            expect(value).to.include.members(['Superior'])
        })
        
    });

    it.only('ComboBox Multiple', () => {
        cy.get('[data-testid="dataEsportes"]')
            .select(['Karate', 'Corrida', 'natacao'])
        
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.eq(['natacao', 'Corrida', 'Karate'])
        })      
        
        cy.get('[data-testid="dataEsportes"]').invoke('val').should('eql', ['natacao', 'Corrida', 'Karate'])
    });

    it('timeout', () => {
        cy.get('[value="Listar DOM"]')
            .click()
        cy.get('#Lista li span', { timeout: 7000 })
            .should('contain', 'Item 2')
    })


})