describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:4200');
        cy.get('.log-in').click();
        cy.get('.login').type('viktoriamik2015@gmail.com')
        cy.get('.password').type('123456')
        cy.get('button').click()
    });
});
