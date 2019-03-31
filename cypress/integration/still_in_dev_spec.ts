describe('WIP in home page', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('loads', () => {
        cy.contains('Still In Development');
    });
});
