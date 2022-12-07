/// <reference types="cypress"/>

context("Buscar Rastreador", () => {
    it("texto", () => {
        cy.visit("http://localhost:3000/admin");
        cy.get('[name="cidade_origem"]').select('Santos');
        cy.get('[name="cidade_destino"]').select('Recife');
        cy.get('[name="date"]').type('2022-12-31');
        cy.get('#cadastrarCarga').click();
    })
})