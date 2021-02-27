describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(
      ($el) => { expect($el).to.have.value(75); }
    );
    
  });

  it('check invoke function', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(33);
    });
  });

  it('third test - check prop', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.prop('volume', 0.33);
    });
  });

  it('test if the image and sound sources change when you select the party horn radio button', () => {
    cy.get('#radio-party-horn').click();
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
    });
    cy.get('#sound-image').then($el => {
      expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
    })
  });

  it('Test if the volume image changes when increasing volumes ', () => {
    //highest level
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
    });
    // mid level
    cy.get('#volume-number').clear().type('66');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
    });
    // low level
    cy.get('#volume-number').clear().type('33');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
    });
    // zero level
    cy.get('#volume-number').clear().type('0');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-0.svg');
    });
  });

  it('Test if the honk button is disabled when the textbox input is a empty or a non-number', () => {
    cy.get('#volume-number').clear().type('0');
    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Test if an error is shown when you type a number outside of the given range for the volume textbox input', () => {
    cy.get('#volume-number').clear().type('200');
    cy.get('input:invalid').should('have.length', 1);
    cy.get('#volume-number').then($input => {
      expect($input[0].validationMessage).to.eq('Value must be less than or equal to 100.');
    });

    cy.get('#volume-number').clear().type('-1');
    cy.get('input:invalid').should('have.length', 1);
    cy.get('#volume-number').then($input => {
      expect($input[0].validationMessage).to.eq('Value must be greater than or equal to 0.');
    });
  });
});
