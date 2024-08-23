import { ContentFilter, RegexFilterStrategy } from './filter';

// Define the regex patterns for Bitly
const bitlyPatterns = [ /bitly\.com/i, /bit\.ly/i, /bitly/i ];

// Create a RegexFilterStrategy with the patterns
const regexStrategy = new RegexFilterStrategy(bitlyPatterns);

// Instantiate the ContentFilter with the strategy
const bitlyFilter = new ContentFilter(regexStrategy);

// Test the filter on some sample text
const testText = 'Check out this link: bit.ly/abc123';
const isMatch = bitlyFilter.filterText(testText);
console.log(isMatch); // Outputs: true or false based on the filtering
