# Content Filter

This project implements a flexible content filtering system using TypeScript. The filtering logic can be adapted for various scenarios, such as detecting keywords, blocking certain patterns, or filtering inappropriate content. The codebase is structured to allow easy customization by utilizing a strategy pattern for filtering.

## Table of Contents

- [Overview](#overview)
- [New Features](#new-features)
- [Installation](#installation)
- [Usage](#usage)
- [Filtering Approach](#filtering-approach)
- [Examples](#examples)
- [Assumptions & Limitations](#assumptions--limitations)
- [Future Improvements](#future-improvements)

## Overview

The content filtering system is built around the `ContentFilter` class, which uses different filtering strategies, such as regular expressions, to check for patterns in text. The modular design allows you to easily adapt the logic to various filtering tasks.

This specific implementation focuses on detecting mentions of "Bitly" (e.g., `bitly.com`, `bit.ly`, `bitly`) using a combination of regular expressions, keyword matching, and natural language processing (NLP).

## New Features

- **Enhanced Filtering Strategy:** The `RegexKeywordNLPFilterStrategy` class combines multiple levels of filtering:
  - **Regex Patterns:** Detects patterns in text using regular expressions.
  - **Keyword Matching:** Matches keywords after normalization and stemming.
  - **NLP Processing:** Provides an additional layer of filtering using natural language processing techniques.
  
- **Dynamic Input Loading:** 
  - **Regex Patterns:** Load regex patterns from a JSON file.
  - **Test Cases:** Load test cases from a JSON file.

## Installation

To get started with this project:

1. Clone the repository:
   ```
   git clone https://github.com/Rusheesonu/ORA_AI_V2
   cd ORA_AI_V2
   ```


2. Install dependencies:

   ```
   npm install
   ```

3. Build the Project

   ```
   npm run build
   ```

4. Run the tests:

   ```
   npm test
   ```
## Usage

After setting up the project, you can build and run the filtering system.

Loading Input Files

Regex Patterns: Place your regex patterns in a file named regex-patterns.json in the tests directory. The file should be an array of regex pattern strings, for example:


```
[
  "bitly\\.com",
  "bit\\.ly",
  "bitly"
]
```

Test Cases: Place your test cases in a file named test-cases.json in the tests directory. The file should be an array of objects with text and expected fields, for example:

```
[
  { "text": "Check out bit.ly for more info!", "expected": true },
  { "text": "Visit bitly.com for details!", "expected": true }
]
```
### Filtering Approach

The content filtering system leverages the Strategy Pattern to provide a flexible and modular approach to filtering. This design pattern allows for the separation of the filtering logic from the specific implementations, enabling easy adjustments and expansions. Below is a detailed explanation of each step in the filtering process:

Filtering Steps

1. Normalization

Objective: Clean and standardize the input text to ensure consistent processing and accurate matching.

Steps:

Remove URLs: All URLs are preserved as-is and not stripped away, ensuring that links like bit.ly remain intact for regex matching.

Remove Punctuation: Non-alphanumeric characters, except for dots and slashes, are replaced with spaces. This prevents the interference of punctuation marks with keyword matching.

Normalize Whitespace: Multiple spaces are consolidated into a single space to avoid issues caused by irregular spacing.

Convert to Lowercase: The entire text is converted to lowercase to ensure case-insensitive matching. This helps in finding keywords and patterns regardless of their case.

2. Pattern Matching

Objective: Identify specific patterns in the text using predefined regular expressions.

Steps:

Define Patterns: Regular expressions are defined to capture various patterns of interest, such as specific URLs or other key patterns relevant to the content filtering needs.

Apply Regex Patterns: Each regex pattern is applied to the normalized text to check for matches. This allows for the detection of specific formats or strings within the content.

3. Keyword Matching

Objective: Detect important keywords within the text after normalization and stemming.

Steps:

Tokenize Text: The normalized text is split into individual words based on whitespace.

Stem Words: Each word is processed using a stemming algorithm to reduce it to its root form, which helps in matching variations of the same keyword (e.g., "bit.ly" and "bitly").

Match Keywords: The list of keywords, also stemmed, is checked against the stemmed words from the text. This ensures that relevant keywords are detected even if they appear in different forms or with slight variations.

4. NLP Processing

Objective: Utilize Natural Language Processing (NLP) techniques to enhance the filtering accuracy.

Steps:

Implement NLP Techniques: Additional NLP methods are applied to refine the results, such as checking for specific entities or patterns that are not captured by regex or keyword matching alone.

Custom NLP Logic: Depending on the requirements, custom NLP logic can be added to handle more complex scenarios, such as sentiment analysis or entity recognition.

Ensure Comprehensive Filtering: This step provides an extra layer of filtering to ensure that all relevant content is captured, even if it doesn’t fit perfectly into the predefined regex or keyword patterns.

Conclusion

By combining these steps—Normalization, Pattern Matching, Keyword Matching, and NLP Processing—the filtering system provides a robust solution for detecting and handling relevant content. This approach ensures that the system is both flexible and accurate, allowing for adjustments and improvements as needed.

### Examples

Here are a few test cases demonstrating the filter's performance:

Positive Matches
Input: Check out bit.ly for more info!

Output: true (Detected bit.ly)
Input: Visit bitly.com for details.

Output: true (Detected bitly.com)
Negative Matches
Input: This is a test.

Output: false (No mention of bitly)
Input: Check out https://bit.ly/abc123

Output: false (URLs are removed before filtering)

### Assumptions & Limitations

Assumptions:

The input is assumed to be a valid string. Non-string inputs (e.g., null, undefined) will trigger errors.

The regular expression patterns are case-insensitive and work with common variations of the target strings.

URLs are stripped from the input before pattern matching.

Limitations:

The current implementation focuses solely on regular expression-based filtering. While effective for this use case, it may not be suitable for more complex filtering needs.

The filter may struggle with very large datasets unless optimized for performance.

Shortened or complex URLs might bypass detection since the system strips URLs before filtering.

### Future Improvements

Extended Filtering Strategies: Implement additional filtering strategies (e.g., keyword-based, AI-based) for greater flexibility.

Performance Optimization: Add optimizations for large datasets, possibly through distributed processing or other scaling techniques.

Dynamic Pattern Loading: Allow patterns to be loaded dynamically from external sources such as APIs or databases.

Configurable Normalization: Make text normalization configurable, enabling or disabling steps like URL removal based on user needs.

