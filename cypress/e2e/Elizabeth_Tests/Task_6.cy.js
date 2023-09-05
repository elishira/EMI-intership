it('duplicate pipeline', () => {
    cy.authAdminConsoleDevAdmin();
    const tmout = 20000;
    cy.get('#cloudProcessing > a', { timeout: tmout }).click()
    cy.get('#bg-list', { timeout: tmout }).find('tr', { timeout: tmout }).its('length').as('initialRowCount')
    cy.get(':nth-child(53) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
    cy.get(':nth-child(53) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()
    let pipelineName;
    cy.get('#bgName').invoke('val').then((text) => {
        pipelineName = text;
        cy.get('.close').click();
        cy.get('#deleteBg_196', { timeout: tmout }).click();
        cy.get(':nth-child(53) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(2) > a', { timeout: tmout }).click()
        cy.get('#updateBg').click();
        cy.reload();
        cy.get(':nth-child(54) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
        cy.get(':nth-child(54) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()

        cy.get('#bgName').invoke('val').should('eq', pipelineName + '_copy');
        cy.get('.close').click();
    });
    cy.get(':nth-child(54) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
    cy.get(':nth-child(54) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(3) > a', { timeout: tmout }).click()
    cy.get('@initialRowCount', { timeout: tmout }).then((initialRowCount) => {
        cy.get('#bg-list', { timeout: tmout })
            .find('tr', { timeout: tmout })
            .should('have.length', initialRowCount, { timeout: tmout })
    })
})