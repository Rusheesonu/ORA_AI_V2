import natural from 'natural';

// Define the interface for a filtering strategy
/**
 * Interface defining the contract for a filtering strategy.
 */
export interface FilterStrategy {
    filter(text: string): boolean;
}

// Define the Regex, Keyword, and NLP filtering strategy
/**
 * A filtering strategy that uses regex patterns, keyword matching, and NLP processing.
 */
export class RegexKeywordNLPFilterStrategy implements FilterStrategy {
    private regexPatterns: RegExp[];
    private keywords: string[];
    private stemmer: typeof natural.PorterStemmer;
    private tokenizer: natural.WordTokenizer;
    private sentimentAnalyzer: natural.SentimentAnalyzer;

    /**
     * Constructor to initialize the filtering strategy with regex patterns and keywords.
     * @param regexPatterns - An array of regular expression patterns.
     * @param keywords - An array of keywords to match.
     */
    constructor(regexPatterns: RegExp[], keywords: string[]) {
        this.regexPatterns = regexPatterns;
        this.keywords = keywords.map(keyword => keyword.toLowerCase());
        this.stemmer = natural.PorterStemmer;
        this.tokenizer = new natural.WordTokenizer();
        this.sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    }

    /**
     * Normalize the text by removing URLs, non-alphanumeric characters, and extra spaces.
     * @param text - The text to normalize.
     * @returns The normalized text.
     */
    private normalizeText(text: string): string {
        // Remove URLs
        let normalizedText = text.replace(/https?:\/\/\S+/g, '');
    
        // Replace non-alphanumeric characters (excluding dots and slashes) with spaces
        normalizedText = normalizedText.replace(/[^a-zA-Z0-9./ ]/g, ' ');
    
        // Replace multiple spaces with a single space
        normalizedText = normalizedText.replace(/\s+/g, ' ');
    
        // Remove trailing dots
        normalizedText = normalizedText.replace(/\.$/, '');
    
        return normalizedText.toLowerCase().trim();
    }
    

    /**
     * Apply regex patterns to the text to check for matches.
     * @param text - The text to test.
     * @returns True if any regex pattern matches, otherwise false.
     */
    private applyRegex(text: string): boolean {
        console.log('Applying regex to:', text); // Debug
        return this.regexPatterns.some(pattern => pattern.test(text));
    }

    /**
     * Perform keyword matching by stemming and comparing with the keywords.
     * @param text - The text to match keywords against.
     * @returns True if any keyword matches, otherwise false.
     */
    private keywordMatching(text: string): boolean {
        const words = text.split(/\s+/);
        const stemmedWords = words.map(word => this.stemmer.stem(word));
        console.log('Keywords:', this.keywords); // Debug
        console.log('Stemmed Words:', stemmedWords); // Debug
        return this.keywords.some(keyword => stemmedWords.includes(this.stemmer.stem(keyword)));
    }

    /**
     * Perform NLP processing to refine matches.
     * Here, we use sentiment analysis as an example of NLP processing.
     * @param text - The text to analyze.
     * @returns True if the sentiment analysis indicates a positive or neutral sentiment, otherwise false.
     */
    private nlpProcessing(text: string): boolean {
        console.log('NLP processing for:', text); // Debug
        const sentiment = this.sentimentAnalyzer.getSentiment(this.tokenizer.tokenize(text));
        console.log('Sentiment score:', sentiment); // Debug
        // Example threshold for sentiment score
        return sentiment >= 0;
    }

    /**
     * Filter the text using regex patterns, keyword matching, and NLP processing.
     * @param text - The text to filter.
     * @returns True if the text passes all filters, otherwise false.
     */
    filter(text: string): boolean {
        const normalizedText = this.normalizeText(text);
        console.log('Normalized text:', normalizedText); // Debug

        // First level: Regex Filtering
        if (this.applyRegex(normalizedText)) {
            // Second level: Keyword Matching
            if (this.keywordMatching(normalizedText)) {
                // Third level: NLP Processing
                return this.nlpProcessing(normalizedText);
            }
        }
        return false;
    }
}

// Define the ContentFilter class that uses the filtering strategy
/**
 * A class that uses a filtering strategy to filter text.
 */
export class ContentFilter {
    private strategy: FilterStrategy;

    /**
     * Constructor to initialize the ContentFilter with a filtering strategy.
     * @param strategy - The filtering strategy to use.
     */
    constructor(strategy: FilterStrategy) {
        this.strategy = strategy;
    }

    /**
     * Filter the given text using the defined strategy.
     * @param text - The text to filter.
     * @returns True if the text passes the filter, otherwise false.
     */
    filterText(text: string): boolean {
        return this.strategy.filter(text);
    }
}

