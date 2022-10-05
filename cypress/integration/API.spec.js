/// <reference types="cypress" />

import dayjs from "dayjs"

describe('API', () => {
    
    let token
    
    before(() => {
        cy.getToken('lexi@gmail.com', '123456').then(tok => {
            token = tok
        })
    })

    beforeEach(() => {
        cy.RESET()  
    })

    it('Fazer login e criar uma conta', function() {
        cy.getToken('lexi@gmail.com', '123456')
            .then(token => {
                cy.api({
                    method: 'POST',
                    url: '/contas',
                    headers: { Authorization: ` JWT ${token}` },
                    body: {
                        nome: "teste API com Cypress"
                    }
                }).then(resp => {
                    expect(resp.status).to.be.eq(201)
                    expect(resp.body).to.be.property('nome', 'teste API com Cypress')
                })
            })
    });

    it('Altera Conta', () => {
        cy.api({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: ` JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(resp => {
            cy.api({
                method: 'PUT',
                url: `/contas/${resp.body[0].id}`,
                headers: { Authorization: ` JWT ${token}` },
                body: {
                    nome: "Alterado via Rest"
                }
    
            }).then(resp => {
                expect(resp.status).to.be.eq(200)
            })
        })
 
    });

    it('Inserir conta já existente', () => {
        cy.getToken('lexi@gmail.com', '123456')
            .then(token => {
                cy.api({
                    method: 'POST',
                    url: '/contas',
                    headers: { Authorization: ` JWT ${token}` },
                    body: {
                        nome: "Conta mesmo nome"
                    },
                    failOnStatusCode: false
                }).then(resp => {
                    expect(resp.status).to.be.eq(400)
                    expect(resp.body.error).to.be.eq('Já existe uma conta com esse nome!')
                })
            })
    });

    it('Inserir Movimentação', () => {
        cy.getAccountByName('Conta para movimentação')
            .then(contaId => {
                cy.api({
                    method: 'POST', 
                    url: `/transacoes`,
                    headers: { Authorization: ` JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: dayjs().format('DD/MM/YYYY'),
                        data_transacao: dayjs().format('DD/MM/YYYY'),
                        descricao: "Movimentação por API",
                        envolvido: "CCC",
                        status: true,
                        tipo: "REC",
                        valor: "3000"
                    }
                }).then(resp => {
                    expect(resp.status).to.be.eq(201)
                    expect(resp.body.descricao).be.equal('Movimentação por API')
                })
            })
    });

    it('Consultar Saldo', () => {
        cy.api({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: ` JWT ${token}` }
        }).then(resp => {
            let saldoConta = null
            resp.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).be.eq('534.00')
        })

        cy.api({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: ` JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(resp => {
            cy.api({
                method: 'PUT',
                url: `/transacoes/${resp.body[0].id}`,
                headers: { Authorization: ` JWT ${token}` },
                body: { 
                    status: true,
                    data_transacao: dayjs(resp.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(resp.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: resp.body[0].descricao,
                    envolvido: resp.body[0].envolvido,
                    conta_id: resp.body[0].conta_id,
                    valor: resp.body[0].valor
                }
            }).then(resp => {
    
            })
        })

        cy.api({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: ` JWT ${token}` }
        }).then(resp => {
            let saldoConta = null
            resp.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).be.eq('4034.00')
        })

    });

    it('Excluir Movimentação', () => {
        cy.api({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: ` JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(resp => {
            cy.api({
                method: 'DELETE',
                url: `/transacoes/${resp.body[0].id}`,
                headers: { Authorization: ` JWT ${token}` },
            }).its('status').should('be.equal', 204)
        })

    });

})