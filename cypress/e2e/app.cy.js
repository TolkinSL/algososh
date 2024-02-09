describe('Тестирование переходов по страницам', function () {
    it('Переход /', function () {
        cy.visit('/');
    });
    it('Переход recursion', function () {
        cy.visit('/recursion');
    });
    it('Переход fibonacci', function () {
        cy.visit('/fibonacci');
    });
    it('Переход sorting', function () {
        cy.visit('/sorting');
    });
    it('Переход stack', function () {
        cy.visit('/stack');
    });
    it('Переход queue', function () {
        cy.visit('/queue');
    });
    it('Переход list', function () {
        cy.visit('/list');
    });
}); 