describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('When: I use the undo feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my snack bar with undo', () => {
    cy.clearLocalStorage();
    cy.get('input[type="search"]').type('html');
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    cy.get('[data-testing="want-to-read"]').eq(0).click();
    cy.get('[data-testing="toggle-reading-list"]').eq(0).click();
    cy.get('[data-testing="finish-book-item"]').eq(0).click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('When: I use the finish feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should use finish', () => {
    cy.clearLocalStorage();
    cy.get('input[type="search"]').type('kk');
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    cy.get('[data-testing="want-to-read"]').eq(0).click();
    cy.get('[data-testing="toggle-reading-list"]').eq(0).click();
    cy.get('[data-testing="remove-book-item"]').eq(0).click();


  });
});
