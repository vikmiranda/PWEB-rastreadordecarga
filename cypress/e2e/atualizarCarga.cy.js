/// <reference types="cypress"/>

context("Buscar Rastreador", () => {
    it("texto", () => {
        cy.visit("http://localhost:3000");
        cy.visit("http://localhost:3000/admin");
        cy.get('#visualizarDashboard').click();
        cy.get('#atualizarCarga').click();
        cy.get('[name="cod_rastreio"]').type('JYFDN');
        cy.get('[name="cidade_atual"]').select('Aracáju');
        cy.get('[name="tipo_evento"]').select('Reivindicar');
        cy.get('#cargaAtualizada').click();
    })
})