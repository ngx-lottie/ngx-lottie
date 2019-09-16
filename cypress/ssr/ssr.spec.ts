/// <reference types="cypress" />

import { MainPo } from '../support/main.po';

function unescapeHtml(text: string): string {
  const unescapedText = {
    '&a;': '&',
    '&q;': '"',
    '&s;': "'",
    '&l;': '<',
    '&g;': '>'
  };

  return text.replace(/&[^;]+;/g, (s: string) => unescapedText[s]);
}

describe('Server side rendering', () => {
  const main = new MainPo();

  beforeEach(() => main.navigateTo());

  // We can only be sure that SSR works properly only by compairing
  // transfer state loaded from server
  it('should contain transfer data for "data.json" animation', () => {
    // Arrange & act
    cy.get('script#ngx-lottie-universal-state')
      .invoke('text')
      .then(text => {
        // Assert
        const state = JSON.parse(unescapeHtml(text as any));
        expect(typeof state).to.equal('object');

        const keys = Object.keys(state['animation-data']);
        expect(keys.length).to.equal(11);
      });
  });
});
