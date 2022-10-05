/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('test basic', () => (

    it('acessando page e executando algumas funções', () => {

        //clicando no botão e fazendo uma assertiva
        cy.get('input[id="buttonSimple"]')
            .click()
            .should('have.value', 'Obrigado!').debug
    })

)); 

describe('Imprimir titulo', () => {

    it.only('Imprime titulo no console', () => {

        let getTitle

        cy.title().then(title => {
            console.log(title)
        
            //Pegando o titulo e escrevendo em um campo
            cy.get('#formNome').type(title)

            getTitle = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            $el.val(getTitle)
        })

        //usando a função wrap
        cy.get('[id="elementosForm:sugestoes"]').then($el => {
            cy.wrap($el).type(getTitle)
        })
        

        
        
    });
})

