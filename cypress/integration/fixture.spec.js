/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

describe('Fixtures', () => {

    it('Preenche os campos com o arquivo de users', function() {
        cy.fixture('users').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.name)
            cy.get('#formSobrenome').type(this.usuario.lastName)
            cy.get(`[id=formSexoMasc][value=${this.usuario.sexo}]`).click()
            cy.get(`[id="formComidaFrango"][value=${this.usuario.comida}]`).click()
            cy.get('[data-test="dataEscolaridade"]').select(this.usuario.escolaridade)
            cy.get('[data-testid="dataEsportes"]').select(this.usuario.esportes)
            cy.get('[id="formCadastrar"]').click()
            cy.get('#resultado > span').should('have.text', 'Cadastrado!')
        })

    });
})