import {greenCircle, purpleCircle} from "./utils";
import {PARTIAL_CIRCLE_SMALL, PARTIAL_CIRCLE, PREFIX_CIRCLE, PREFIX_INPUT} from "./utils";

describe('Проверка страницы Строка', function () {
    beforeEach(() => {
        cy.visit("/");
        cy.get('[data-test="testRecursion"]').click();
        cy.contains("Строка");
        cy.get(PREFIX_INPUT).first().as('input');
        cy.contains('Развернуть').first().as('button');
    });
    it('Кнопка добавления недоступна', function () {
        cy.get('@input').should('be.empty').get('@button').should('be.disabled');
    });
    it('Проверка разворота строки', function () {
        const step1 = 'work';
        const step2 = 'korw';
        const step3 = 'krow';
        const step1color = [
            greenCircle,
            purpleCircle,
            purpleCircle,
            greenCircle,
        ];
        const step2color = [
            greenCircle,
            purpleCircle,
            purpleCircle,
            greenCircle,
        ];
        const step3color = [
            greenCircle,
            greenCircle,
            greenCircle,
            greenCircle,
        ];
        cy.get('@input').should('be.empty').type(step1);
        cy.get('@button').click();
        cy.get(PREFIX_CIRCLE).each(($el, index) => {
            cy.get($el)
                .should("have.css", "border-color", step1color[index])
                .contains(step1[index])
        });
        cy.get(PREFIX_CIRCLE).each(($el, index) => {
            cy.get($el)
                .should("have.css", "border-color", step2color[index])
                .contains(step2[index])
        });
        cy.get(PREFIX_CIRCLE).each(($el, index) => {
            cy.get($el)
                .should("have.css", "border-color", step3color[index])
                .contains(step3[index])
        });
    })
});