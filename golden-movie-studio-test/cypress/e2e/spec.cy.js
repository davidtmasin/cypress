/// <reference types="cypress"/>

describe('US-012: Cadastro de Membro', () => {
  it('Deve fazer o cadastro de campos obrigatórios', () => {

    cy.visit('http://127.0.0.1:8080/')

    cy.get('#signup-firstname').type('Xablau')
    cy.get('#signup-lastname').type('Master')
    cy.get('#signup-email').type('xablau2@teste.com')
    cy.get('#signup-phone').type('123456789')
    cy.get('#signup-password').type('Teste@123')
    cy.get('#signup-button').click()

    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso!')

  })
})