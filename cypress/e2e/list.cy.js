import { blueCircle, greenCircle, purpleCircle } from "./utils";

describe('Проверка страницы Связный список', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="testList"]').click();
    cy.contains("Связный список");
    cy.get('[class^=input_input__]').first().as('value');
    cy.get('[class^=input_input__]').last().as('index');
    cy.contains('Добавить в head').first().as('addHead');
    cy.contains('Добавить в tail').first().as('addTail');
    cy.contains('Удалить из head').first().as('delHead');
    cy.contains('Удалить из tail').first().as('delTail');
    cy.contains('Добавить по индексу').first().as('addByIndex');
    cy.contains('Удалить по индексу').first().as('delByIndex');
  });
  it('кнопки отключены', function () {
    cy.get('@value')
      .should('be.empty')
      .get('@addHead')
      .should('be.disabled')
      .get('@addTail')
      .should('be.disabled')
      .get('@addByIndex')
      .should('be.disabled')
    cy.get('@index')
      .should('be.empty')
      .get('@addByIndex')
      .should('be.disabled')
      .get('@delByIndex')
      .should('be.disabled');
  });
  it('тестирование отрисовки дефолтного списка', function () {
    cy.get('[class*=circle_circle__]').each( ($el) => {
      cy.get($el).should("have.css", "border-color", blueCircle).contains(/\S{1,4}/);
    });
  });
  it('тестирование добавление элемента в head', function () {
    const inputValue = 10;
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@addHead').click();
    cy.get('[class*=circle_small__]')
      .first()
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .first()
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .first()
      .should("have.css", "border-color", blueCircle)
      .contains(inputValue)
      .parent()
      .parent()
      .contains('head')
  });
  it('тестирование добавление элемента в tail', function () {
    const inputValue = 10;
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@addTail').click();
    cy.get('[class*=circle_small__]')
      .first()
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .last()
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .last()
      .should("have.css", "border-color", blueCircle)
      .contains(inputValue)
      .parent()
      .parent()
      .contains('tail')
  });
  it('тестирование добавление элемента по индексу', function () {
    const inputValue = 10;
    const inputIndex = 2;
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@index').should('be.empty').type(inputIndex);
    cy.get('@addByIndex').click();
    for (let i = 0; i <= inputIndex; i++) {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", purpleCircle)
        .contains(inputValue)
      cy.wait(500);
    };
    cy.get('[class^=circle_circle__]')
      .eq(inputIndex)
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue);
    cy.get('[class^=circle_circle__]')
      .eq(inputIndex)
      .should("have.css", "border-color", blueCircle)
      .contains(inputValue);
  });
  it('тестирование удаление элемента из head', function () {
    cy.get('@delHead').click();
    cy.get('[class^=circle_circle__]').its('length').then( (size) => {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", purpleCircle);
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 2);
    });
  });
  it('тестирование удаление элемента из tail', function () {
    cy.get('@delTail').click();
    cy.get('[class^=circle_circle__]').its('length').then( (size) => {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", purpleCircle);
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 2);
    });
  });
  it('тестирование удаление элемента по индексу', function () {
    const inputIndex = 2;
    cy.get('@index').should('be.empty').type(inputIndex);
    cy.get('@delByIndex').click();
    for (let i = 0; i < inputIndex; i++) {
      cy.get('[class*=circle_circle__]')
        .eq(i)
        .should("have.css", "border-color", purpleCircle);
      if (i < inputIndex -1) {
        cy.wait(500);
      }
    };
    cy.get('[class^=circle_circle__]').its('length').then( (size) => {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", purpleCircle);
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 2);
    });
  });

});