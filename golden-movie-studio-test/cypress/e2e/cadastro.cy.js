/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

describe("US-012: Cadastro de Membro", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it("Deve fazer o cadastro ao preencher os campos obrigatórios", () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.zodiacSign(),
      email: faker.internet.exampleEmail(),
    };

    cy.get("#signup-firstname").type(data.firstName);
    cy.get("#signup-lastname").type(data.lastName);
    cy.get("#signup-email").type(data.email);
    cy.get("#signup-phone").type("123456789");
    cy.get("#signup-password").type("Teste@123");
    cy.get("#signup-button").click();

    cy.get("#signup-response").should(
      "contain",
      "Cadastro realizado com sucesso!"
    );
  });

  it("Deve fazer o cadastro sem preencher o telefone", () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.zodiacSign(),
      email: faker.internet.exampleEmail(),
    };

    cy.get("#signup-firstname").type(data.firstName);
    cy.get("#signup-lastname").type(data.lastName);
    cy.get("#signup-email").type(data.email);
    cy.get("#signup-password").type("Teste@123");
    cy.get("#signup-button").click();

    cy.get("#signup-response").should(
      "contain",
      "Cadastro realizado com sucesso!"
    );
  });

  it("Não deve cadastrar com e-mail inválido", () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.zodiacSign(),
    };

    cy.get("#signup-firstname").type(data.firstName);
    cy.get("#signup-lastname").type(data.lastName);
    cy.get("#signup-email").type("xablau@");
    cy.get("#signup-password").type("Te@1");
    cy.get("#signup-button").click();

    cy.get("#signup-response").should(
      "contain",
      "E-mail deve ser um email válido"
    );
  });

  it("Não deve cadastrar sem preencher os campos obrigatórios", () => {
    cy.get("#signup-button").click();
    
    cy.get("#signup-response").should(
      "contain",
      "Nome não pode estar vazio"
    );
  });

  it('Não deve cadastrar com senha fraca', () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.zodiacSign(),
      email: faker.internet.exampleEmail(),
    };

    cy.get("#signup-firstname").type(data.firstName);
    cy.get("#signup-lastname").type(data.lastName);
    cy.get("#signup-email").type(data.email);
    cy.get("#signup-password").type("Teste");
    cy.get("#signup-button").click();

    cy.get("#signup-response").should(
      "contain",
      "Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)"
    );
    


  });

});
