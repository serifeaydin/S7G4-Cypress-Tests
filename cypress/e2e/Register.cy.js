
 describe('Register Page', () => {
  describe('Error Messages', () => {
  it('Ad 2 karakterden oluşuyor', () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="ad-input"]').type("em");
    
    });
  it('Geçersiz email', () => {
      cy.visit("http://localhost:5173/");
      cy.get('[data-cy="eposta-input"]').type("emre@wit.");
      
    });
    it('Geçersiz password', () => {
      cy.visit("http://localhost:5173/");
      cy.get('[data-cy="password-input"]').type("1234");
      
    });

  });

  describe('Submit Messages', () => {
    it('Ad en az 3 karakterden oluşuyor', () => {
      cy.visit("http://localhost:5173/");
      cy.get('[data-cy="ad-input"]').type("emr");
      cy.get('[data-cy="submit-input"]').should("be.disabled");
      });
    it('Geçerli email', () => {
        cy.visit("http://localhost:5173/");
        cy.get('[data-cy="eposta-input"]').type("emre@wit.com.tr");
        cy.get('[data-cy="submit-input"]').should("be.disabled");
      });
      it('Geçerli password', () => {
        cy.visit("http://localhost:5173/");
        cy.get('[data-cy="password-input"]').type("AS12as.?");
        cy.get('[data-cy="submit-input"]').should("be.disabled");
      });
  
     
  });
 });