class functionTest {

    login(){
        cy.visit('/')
        cy.get('[data-test="email"]').type(this.user.email)

    }
}

export default new functionTest;