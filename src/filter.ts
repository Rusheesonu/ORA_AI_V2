import natural from 'natural';

// Define the interface for a filtering strategy
export interface FilterStrategy {
    filter(text: string): boolean;
}

// Define the Regex, Keyword, and NLP strategy
export class RegexKeywordNLPFilterStrategy implements FilterStrategy {
    private regexPatterns: RegExp[];
    private keywords: string[];
    private stemmer: typeof natural.PorterStemmer;

    constructor(regexPatterns: RegExp[], keywords: string[]) {
        this.regexPatterns = regexPatterns;
        this.keywords = keywords.map(keyword => keyword.toLowerCase());
        this.stemmer = natural.PorterStemmer; // Ensure the correct stemmer is used
    }

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
    

    private applyRegex(text: string): boolean {
        console.log('Applying regex to:', text); // Debug
        return this.regexPatterns.some(pattern => pattern.test(text));
    }

    private keywordMatching(text: string): boolean {
        const words = text.split(/\s+/).map(word => this.stemmer.stem(word));
        console.log('Keywords:', this.keywords); // Debug
        console.log('Words:', words); // Debug
        return this.keywords.some(keyword => words.includes(this.stemmer.stem(keyword)));
    }

    private nlpProcessing(text: string): boolean {
        // Use NLP processing to further refine matches
        // Implement any additional NLP logic if needed
        console.log('NLP processing for:', text); // Debug
        return true;
    }

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
export class ContentFilter {
    private strategy: FilterStrategy;

    constructor(strategy: FilterStrategy) {
        this.strategy = strategy;
    }

    filterText(text: string): boolean {
        return this.strategy.filter(text);
    }
}
