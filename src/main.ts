import { ContentFilter, RegexKeywordNLPFilterStrategy } from './filter';

// Use the imported classes as needed
const regexPatterns = [
    /bitly\.com/i,
    /bit\.ly/i,
    /bitly/i,
];
const keywords = ['bitly', 'bit.ly', 'bitly.com'];

const bitlyFilter = new ContentFilter(new RegexKeywordNLPFilterStrategy(regexPatterns, keywords));

const text = "Check out bit.ly for more info!";
console.log(bitlyFilter.filterText(text)); // Example usage
