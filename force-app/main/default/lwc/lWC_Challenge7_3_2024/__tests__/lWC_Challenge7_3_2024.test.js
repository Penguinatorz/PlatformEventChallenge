import { createElement } from 'lwc';
import LWC_Challenge7_3_2024 from 'c/lWC_Challenge7_3_2024';

describe('c-l-w-c-challenge7-3-2024', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-l-w-c-challenge7-3-2024', {
            is: LWC_Challenge7_3_2024
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});