import { ContentFilter, RegexFilterStrategy } from '../src/filter';

describe('ContentFilter', () => {
    let bitlyFilter: ContentFilter;

    beforeEach(() => {
        // Define the regex patterns for the test
        const patterns = [ /bitly\.com/i, /bit\.ly/i, /bitly/i ];
        const regexStrategy = new RegexFilterStrategy(patterns);
        bitlyFilter = new ContentFilter(regexStrategy);
    });

    const testCases = [
        { text: 'Check out bit.ly for more info!', expected: true },
        { text: 'Visit bitly.com for details.', expected: true },
        { text: 'bitly', expected: true },
        { text: 'This is a test for Bitly.', expected: true },
        { text: 'The link is https://bit.ly/abc123', expected: false },
        { text: 'bit.ly and bitly.com', expected: true },
        { text: 'Nothing about Bitly here', expected: true },
        { text: 'This is a test.', expected: false },
        { text: 'Another example: bit.ly', expected: true },
        { text: 'Find more info at bitly', expected: true },
        { text: 'No mention of the company here', expected: false },
        { text: 'A bit.ly link', expected: true },
        { text: 'Bitly is a URL shortening service.', expected: true },
        { text: 'Check out our website.', expected: false },
        { text: 'A link to bitly.com', expected: true },
        { text: 'No relevant text', expected: false },
    ];

    testCases.forEach(({ text, expected }, index) => {
        test(`Test case ${index + 1}: ${expected ? 'should' : 'should not'} find mentions`, () => {
            expect(bitlyFilter.filterText(text)).toBe(expected);
        });
    });

    test('should handle empty strings and invalid inputs', () => {
        expect(() => bitlyFilter.filterText('')).not.toThrowError(); // Modify to match your handling logic
        expect(() => bitlyFilter.filterText(null as unknown as string)).toThrowError(); // Assuming null is invalid
    });
});
