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
### Fltering Approach

The filtering system uses a Strategy Pattern, which decouples the filtering logic from specific implementations. Here's how it works:

Normalization: The input text is cleaned by removing punctuation, URLs, and converting the text to lowercase for case-insensitive matching.

Pattern Matching: The RegexKeywordNLPFilterStrategy is used to detect patterns defined via regular expressions.

Keyword Matching: Keywords are matched after normalization and stemming.

NLP Processing: Provides an additional layer of filtering using NLP techniques.

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

