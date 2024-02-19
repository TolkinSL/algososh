describe('Проверка страницы Фибоначчи', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="testFibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
    cy.get('[class^=input_input__]').first().as('input');
    cy.contains('Развернуть').first().as('button');
  });
  it('кнопка добавления недоступна', function () {
    cy.get('@input').should('be.empty').get('@button').should('be.disabled');
  });
  it('числа генерируются корректно', function () {
    const inputValue = 3;
    const result = '0112';
    cy.get('@input').should('be.empty').type(inputValue);
    cy.get('@button').click();
    cy.wait(1000);
    cy.get('[class^=circle_circle__]').each(($el, index) => {
      cy.get($el)
        .contains(result[index])
    });
  })
});