import { purpleCircle, blueCircle } from "./utils";
import {PARTIAL_CIRCLE_SMALL, PARTIAL_CIRCLE, PREFIX_CIRCLE, PREFIX_INPUT} from "./utils";

describe('Проверка страницы Очередь', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="testQueue"]').click();
    cy.contains("Очередь");
    cy.get(PREFIX_INPUT).first().as('input');
    cy.contains('Добавить').first().as('add');
    cy.contains('Удалить').first().as('del');
    cy.contains('Очистить').first().as('clear');
  });
  it('кнопки отключены', function () {
    cy.get('@input')
      .should('be.empty')
      .get('@add')
      .should('be.disabled')
      .get('@del')
      .should('be.disabled')
      .get('@clear')
      .should('be.disabled');
  });
  it('тестирование добавление', function () {
    const inputValue = 2;
    cy.get('@input').should('be.empty').type(inputValue);
    cy.get('@add').click();
    cy.get(PREFIX_CIRCLE)
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
      .parent()
      .parent()
      .contains('head')
      .parent()
      .contains('tail')
    cy.get(PREFIX_CIRCLE)
      .should("have.css", "border-color", blueCircle)
  });
  it('тестирование удаления', function () {
    if (cy.get(PREFIX_CIRCLE).first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@del').click();
    cy.get(PREFIX_CIRCLE)
      .first()
      .should("have.css", "border-color", purpleCircle)
    cy.get(PREFIX_CIRCLE)
      .first()
      .should("have.css", "border-color", blueCircle)
    cy.get(PREFIX_CIRCLE).each( ($el) => {
      cy.get($el).contains('tail').should("have.length", 0);
    });
  });
  it('тестирование очистки', function () {
    if (cy.get(PREFIX_CIRCLE).first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@clear').click();
    cy.get(PREFIX_CIRCLE).each( ($el) => {
      cy.get($el).contains('head').should("have.length", 0);
      cy.get($el).should("have.css", "border-color", blueCircle);
    });
  });
});