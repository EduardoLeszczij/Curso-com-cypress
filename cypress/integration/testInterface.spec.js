/// <reference types="cypress" />

import Test from '../Pages/aplicationReact'
import loc from '../support/Locator'



describe('Testes funcionais em aplicação web', function() {
    after(() => {
        cy.clearLocalStorage()
    })
    
    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'teste usuário falso',
                token: 'qualquer coisa'
            }

        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 100,
                conta: 'Conta Teste',
                saldo: '15000.00'
            },
            {
                conta_id: 1000,
                conta: 'Conta para testar',
                saldo: '-1500.00'
            }]

        }).as('saldo')


        cy.visit('https://barrigareact.wcaquino.me/')                
        cy.get(loc.login.user)
            .type('lexi@gmail.com')
        cy.get('[data-test="email"]')
            .should('not.be.null')
        cy.get(loc.login.password)
            .type('123456')
        cy.get('button[class="btn btn-block btn-primary"]').click()
        cy.get('div[class="toast-message"]').should('contain', 'Bem vindo')
        cy.resetAplication()
        
    })

    beforeEach(() => {
        cy.get(loc.menu.screenHome).click()
        
    })

    it('Criar uma conta', function() {
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id: 1, nome: 'Conta Teste', visivel: true, usuario_id: 1},
                {id: 2, nome: 'Conta para testar', visivel: true, usuario_id: 1}
            ]


        }).as('contas')

        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'Conta para testar', visivel: true, usuario_id: 1}
        })


        cy.accessMenuAccount();

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id: 1, nome: 'Conta Teste', visivel: true, usuario_id: 1},
                {id: 2, nome: 'Conta para testar', visivel: true, usuario_id: 1},
                {id: 3, nome: 'teste', visivel: true, usuario_id: 1}
            ]


        }).as('contaInserida')

        cy.get('[data-test="nome"]').type('teste')
        cy.get('button[class="btn btn-primary btn-block"]').click();
        cy.wait(2000)
    });

    // it('Editar conta', function() {
    //     cy.accessMenuAccount();
    //     cy.xpath('//table//td[contains(., "teste")]/ ..//i[@class="far fa-edit"]').click()
    //     cy.get('[data-test="nome"]')
    //         .clear()
    //         .type('edit_test')
    //     cy.get('button[class="btn btn-primary btn-block"]').click();  
    //     cy.xpath(loc.mensage.updateAccount)
    //         .should('have.text', 'Conta atualizada com sucesso!')

    // });

    // it('Inserir conta repetida', () => {
    //     cy.accessMenuAccount();
    //     cy.get('[data-test="nome"]').type('edit_test')
    //     cy.get('button[class="btn btn-primary btn-block"]').click(); 
    //     cy.xpath(loc.mensage.badRequest).should('have.text', 'Erro: Error: Request failed with status code 400')
    // });

    // it('Inserir movimentação', () => {
    //     cy.get(loc.menu.movimentation).click()
    //     cy.get(loc.moviment.description).type('teste primary')
    //     cy.get(loc.moviment.interessed).type('Conta de teste')
    //     cy.get(loc.moviment.value).type('10')
    //     cy.get(loc.moviment.accountType).select('Conta para movimentacoes')
    //     cy.get(loc.moviment.status).click()
    //     cy.get('[class="btn btn-block btn-primary"]').click()
    // });

    // it.only('Verificar Saldo da Conta', () => {
    //     cy.xpath(loc.HOME.accountBalance('Conta para saldo')).should('contain', '534')
    //     cy.get(loc.menu.extract).click()
    //     cy.xpath(loc.screenExtract.editAccount('Movimentacao 1, calculo saldo')).click()
    //     cy.wait(1000)
    //     cy.get(loc.moviment.status).click()
    //     cy.get('[class="btn btn-block btn-primary"]').click()
    //     cy.get(loc.menu.screenHome).click()
    //     cy.xpath(loc.mensage.updateMoviment).should('have.text', 'Movimentação alterada com sucesso!')
    //     cy.xpath(loc.HOME.accountBalance('Conta para saldo')).should('contain', '4.034')
    // });

    // it('Deletar movimentação', () => {
    //     cy.get(loc.menu.extract).click()
    //     cy.xpath(loc.screenExtract.deletMoviment('Movimentacao para exclusao')).click()
    //     cy.xpath(loc.mensage.removedMoviment).should('have.text', 'Movimentação removida com sucesso!')
    // });

})