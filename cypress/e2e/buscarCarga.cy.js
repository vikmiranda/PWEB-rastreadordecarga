/// <reference types="cypress"/>

context("Buscar Rastreador", () => {
    it("texto", () => {
        cy.visit("http://localhost:3000");
        cy.get('input[name="cod_rastreio"]').type('JYFDN');
        cy.get('#btnRastrear').click();
    })
})