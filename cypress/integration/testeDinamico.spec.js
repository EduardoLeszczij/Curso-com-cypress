/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('Testes Dinâmicos', () => {

    const foods = ['carne', 'frango', 'pizza', 'vegetariano']
    foods.forEach(food => {

        it(`Teste selecionando ${food}` , function() {
            cy.fixture('users').as('usuario').then(() => {
                cy.get('#formNome').type(this.usuario.name)
                cy.get('#formSobrenome').type(this.usuario.lastName)
                cy.get(`[id=formSexoMasc][value=${this.usuario.sexo}]`).click()
                cy.get(`#formComidaFavorita input[value=${food}`).click()
                cy.get('[data-test="dataEscolaridade"]').select(this.usuario.escolaridade)
                cy.get('[data-testid="dataEsportes"]').select(this.usuario.esportes)
                cy.get('[id="formCadastrar"]').click()
                cy.get('#resultado > span').should('have.text', 'Cadastrado!')
            })
    
        })
    });

    it.only('Clicar em mais de um tipo de comida', function() {
        cy.fixture('users').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.name)
            cy.get('#formSobrenome').type(this.usuario.lastName)
            cy.get(`[id=formSexoMasc][value=${this.usuario.sexo}]`).click()
            cy.get(`#formComidaFavorita input`).each($el => {
                if($el.val() !== 'vegetariano')
                    cy.wrap($el).click()
            })
            cy.get('[data-test="dataEscolaridade"]').select(this.usuario.escolaridade)
            cy.get('[data-testid="dataEsportes"]').select(this.usuario.esportes)
            cy.clickAlert('[id="formCadastrar"]', 'Tem certeza que voce eh vegetariano?')
            cy.get('#resultado > span').should('have.text', 'Cadastrado!')
        })
    });
})