/// <reference types="cypress" />

var chance = require('chance').Chance();

context('Create Shop', () => {
	before(() => {
		cy.signIn();
	});

	beforeEach(() => {
		Cypress.Cookies.preserveOnce('__session', '__client');
		cy.session;
	});

	describe('list quiz', () => {
		it('should list the quiz', () => {
			const quiz = [
				{
					question: chance.sentence(),
					answer: chance.word(),
				},
				{
					question: chance.sentence(),
					answer: chance.word(),
				},
			];
			const quizTitle = chance.word({
				length: 10,
			});

			cy.get('#burger').click();
			cy.get('.drawer-side > .menu > :nth-child(2) > a').click();
			cy.contains('Create New Quiz!').click();

			cy.contains('Add Question').click();
			cy.get(':nth-child(1) > .input').type(quiz[0].question);
			cy.get('.card-body > .flex > :nth-child(2) > .input').type(
				quiz[0].answer
			);

			cy.contains('Add Question').click();
			cy.get(
				':nth-child(4) > .card-body > .flex > :nth-child(1) > .input'
			).type(quiz[1].question);
			cy.get(
				':nth-child(4) > .card-body > .flex > :nth-child(2) > .input'
			).type(quiz[1].answer);

			// save
			cy.get('.input[name="title"]').type(quizTitle);
			cy.contains('Save').click();
		});
	});
});
