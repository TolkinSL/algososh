import { blueCircle, greenCircle, purpleCircle } from "./utils";
import {PARTIAL_CIRCLE_SMALL, PARTIAL_CIRCLE, PREFIX_CIRCLE, PREFIX_INPUT} from "./utils";

describe('Проверка страницы Связный список', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="testList"]').click();
    cy.contains("Связный список");
    cy.get(PREFIX_INPUT).first().as('value');
    cy.get(PREFIX_INPUT).last().as('index');
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
    cy.get(PARTIAL_CIRCLE).each( ($el) => {
      cy.get($el).should("have.css", "border-color", blueCircle).contains(/\S{1,4}/);
    });
  });
  it('тестирование добавление элемента в head', function () {
    const inputValue = 10;
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@addHead').click();
    cy.get(PARTIAL_CIRCLE_SMALL)
      .first()
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
    cy.get(PARTIAL_CIRCLE)
      .first()
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue)
    cy.get(PARTIAL_CIRCLE)
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
    cy.get(PARTIAL_CIRCLE_SMALL)
      .first()
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
    cy.get(PARTIAL_CIRCLE)
      .last()
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue)
    cy.get(PARTIAL_CIRCLE)
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
      cy.get(PARTIAL_CIRCLE_SMALL)
        .first()
        .should("have.css", "border-color", purpleCircle)
        .contains(inputValue)
      cy.wait(500);
    };
    cy.get(PREFIX_CIRCLE)
      .eq(inputIndex)
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue);
    cy.get(PREFIX_CIRCLE)
      .eq(inputIndex)
      .should("have.css", "border-color", blueCircle)
      .contains(inputValue);
  });
  it('тестирование удаление элемента из head', function () {
    cy.get('@delHead').click();
    cy.get(PREFIX_CIRCLE).its('length').then( (size) => {
      cy.get(PARTIAL_CIRCLE_SMALL)
        .first()
        .should("have.css", "border-color", purpleCircle);
      cy.get(PREFIX_CIRCLE).its('length').should('eq', size - 2);
    });
  });
  it('тестирование удаление элемента из tail', function () {
    cy.get('@delTail').click();
    cy.get(PREFIX_CIRCLE).its('length').then( (size) => {
      cy.get(PARTIAL_CIRCLE_SMALL)
        .first()
        .should("have.css", "border-color", purpleCircle);
      cy.get(PREFIX_CIRCLE).its('length').should('eq', size - 2);
    });
  });
  it('тестирование удаление элемента по индексу', function () {
    const inputIndex = 2;
    cy.get('@index').should('be.empty').type(inputIndex);
    cy.get('@delByIndex').click();
    for (let i = 0; i < inputIndex; i++) {
      cy.get(PARTIAL_CIRCLE)
        .eq(i)
        .should("have.css", "border-color", purpleCircle);
      if (i < inputIndex -1) {
        cy.wait(500);
      }
    };
    cy.get(PREFIX_CIRCLE).its('length').then( (size) => {
      cy.get(PARTIAL_CIRCLE_SMALL)
        .first()
        .should("have.css", "border-color", purpleCircle);
      cy.get(PREFIX_CIRCLE).its('length').should('eq', size - 2);
    });
  });

});