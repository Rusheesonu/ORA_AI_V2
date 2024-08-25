import fs from 'fs';
import path from 'path';
import { ContentFilter, RegexKeywordNLPFilterStrategy } from '../src/filter';

// Define types for test cases and regex patterns
interface TestCase {
    text: string;
    expected: boolean;
}

describe('ContentFilter with Regex, Keyword, and NLP Strategy', () => {
    // Load regex patterns from JSON file
    const regexPatternsPath = path.resolve(__dirname, 'regex-patterns.json');
    const regexPatterns: RegExp[] = JSON.parse(fs.readFileSync(regexPatternsPath, 'utf-8'))
        .map((pattern: string) => new RegExp(pattern, 'i'));

    // Load test cases from JSON file
    const testCasesPath = path.resolve(__dirname, 'test-cases.json');
    const testCases: TestCase[] = JSON.parse(fs.readFileSync(testCasesPath, 'utf-8'));

    // Extract keywords from regex patterns and normalize
    const keywords = regexPatterns.map((pattern: RegExp) => pattern.source)
        .map((pattern: string) => pattern.replace(/\\\./g, '.').toLowerCase());

    const bitlyFilter = new ContentFilter(new RegexKeywordNLPFilterStrategy(regexPatterns, keywords));

    const results: { text: string, expected: boolean, result: boolean }[] = [];

    testCases.forEach(({ text, expected }: TestCase, index: number) => {
        const result = bitlyFilter.filterText(text);
        results.push({ text, expected, result });

        test(`Test case ${index + 1}: ${expected ? 'should' : 'should not'} find mentions`, () => {
            expect(result).toBe(expected);
        });
    });

    // Write results to JSON file after all tests are complete
    afterAll(() => {
        const outputPath = path.resolve(__dirname, 'results.json');
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
    });
});
