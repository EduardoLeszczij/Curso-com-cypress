const locator = {
    login: {
        user: '[data-test="email"]',
        password: '[data-test="passwd"]',
    },
    menu: {
        screenHome: '[data-test="menu-home"]',
        settings: 'li > [data-test="menu-settings"]',
        extract: '[data-test="menu-extrato"]',
        reset: '[href="/reset"]',
        movimentation: '[data-test="menu-movimentacao"]'
    },
    mensage: {
        updateAccount: '//body// ../div[@id="toast-container"]/ ./div//div[contains(., "Conta atualizada com sucesso!")]',
        badRequest: '//body// ../div[@id="toast-container"]/ ./div//div[contains(., "Erro: Error: Request failed with status code 400")]',
        removedMoviment: '//body// ../div[@id="toast-container"]/ ./div//div[contains(., "Movimentação removida com sucesso!")]',
        updateMoviment: '//body// ../div[@id="toast-container"]/ ./div//div[contains(., "Movimentação alterada com sucesso!")]'

    },
    moviment: {
        description: '[data-test="descricao"]',
        value: '[data-test="valor"]',
        interessed: '[data-test="envolvido"]',
        accountType: '[data-test="conta"]',
        status: '[data-test="status"]'
    },
    HOME: {
        accountBalance: conta => `//table//td[contains(., "${conta}")]/ ../td[2]`,
    },
    screenExtract: {
        deletMoviment: conta => `//body// ../div[@class="d-flex w-100 justify-content-between"]/ ./span[contains(., "${conta}")]/ ../../../div[@class="col col-md-1"]/ ./a[@href="#"]`,
        editAccount: nome => `//body// ../div[@class="d-flex w-100 justify-content-between"]/ ./span[contains(., "${nome}")]/ ../../../div[@class="col col-md-1"]// ./i[@class="fas fa-edit"]` 
    }

}
export default locator