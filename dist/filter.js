"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentFilter = exports.RegexFilterStrategy = void 0;
/**
 * Text filtering strategy based on regular expressions.
 */
class RegexFilterStrategy {
    /**
     * Creates an instance of RegexFilterStrategy.
     * @param patterns Array of RegExp patterns to match.
     */
    constructor(patterns) {
        if (!Array.isArray(patterns)) {
            throw new TypeError('Patterns should be an array of RegExp objects.');
        }
        this.patterns = patterns.map(pattern => {
            if (!(pattern instanceof RegExp)) {
                throw new TypeError('Each pattern must be an instance of RegExp.');
            }
            return pattern;
        });
    }
    /**
     * Filters text based on patterns.
     * @param text The text to be filtered.
     * @returns true if any pattern matches the text, false otherwise.
     */
    filter(text) {
        if (typeof text !== 'string') {
            throw new TypeError('The input must be a string.');
        }
        // Handle empty strings and invalid inputs
        if (text.trim() === '') {
            return false;
        }
        // Clean and normalize text
        const cleanedText = this.cleanText(text);
        return this.patterns.some(pattern => pattern.test(cleanedText));
    }
    /**
     * Cleans and normalizes text to improve pattern matching.
     * @param text The text to be cleaned.
     * @returns The cleaned text.
     */
    cleanText(text) {
        return text
            .trim() // Remove leading and trailing whitespace
            .toLowerCase() // Normalize to lowercase for case-insensitive matching
            .replace(/https?:\/\/\S+/gi, '') // Remove URLs
            .replace(/[^\w\s]/g, ''); // Remove punctuation and special characters
    }
}
exports.RegexFilterStrategy = RegexFilterStrategy;
/**
 * Class to handle content filtering based on a specific filter strategy.
 */
class ContentFilter {
    /**
     * Creates an instance of ContentFilter.
     * @param strategy The filter strategy to use.
     */
    constructor(strategy) {
        this.strategy = strategy;
    }
    /**
     * Filters text based on the filter strategy.
     * @param text The text to be filtered.
     * @returns true if the strategy matches the text, false otherwise.
     */
    filterText(text) {
        return this.strategy.filter(text);
    }
    /**
     * Updates the filter strategy.
     * @param strategy The new filter strategy to use.
     */
    updateStrategy(strategy) {
        this.strategy = strategy;
    }
}
exports.ContentFilter = ContentFilter;
