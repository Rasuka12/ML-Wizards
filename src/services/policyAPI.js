import { findSimilarExamples, getDatasetStats } from '../data/policyDataset.js';

/**
 * @typedef {import('../types/index.js').PolicyResult} PolicyResult
 */

/**
 * Enhanced Policy API service using dataset-based classification
 */
class PolicyAPI {
  /**
   * Analyze policy text using dataset similarity matching
   * @param {string} text - Policy text to analyze
   * @returns {Promise<PolicyResult>} Analysis result with dataset insights
   */
  static async analyzePolicy(text) {
    // Simulate realistic API processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    if (!text || text.trim().length < 10) {
      return {
        classification: 'not-policy',
        confidence: 95,
        explanation: 'Text too short to analyze meaningfully.',
        similarExamples: [],
        datasetStats: getDatasetStats()
      };
    }

    // Find similar examples from dataset
    const similarExamples = findSimilarExamples(text, 5);
    
    // Calculate classification based on similarity matching
    const classification = this._classifyUsingDataset(text, similarExamples);
    
    return {
      ...classification,
      similarExamples: similarExamples.slice(0, 3), // Top 3 most similar
      datasetStats: getDatasetStats()
    };
  }

  /**
   * Classify text using dataset-based similarity and pattern matching
   * @private
   */
  static _classifyUsingDataset(text, similarExamples) {
    const lowerText = text.toLowerCase();
    
    // Enhanced keyword patterns based on your actual dataset
    const realPolicyPatterns = [
      'government of nepal', 'ministry of', 'department of', 'office of the prime minister',
      'federal parliament', 'supreme court', 'nepal law commission', 'nepal rastra bank',
      'national planning commission', 'council of ministers', 'election commission',
      'act', 'regulation', 'policy', 'notification', 'circular', 'directive', 'guidelines',
      'cabinet', 'budget', 'fiscal year', 'infrastructure development', 'unesco funding',
      'सरकारले', 'मन्त्रालय', 'आर्थिक वर्ष', 'बजेट', 'घोषणा', 'नीति', 'कार्यक्रम'
    ]
    
    const fakeIndicators = [
      'urgent!', 'breaking news!', 'secret', 'leaked', 'confidential', 'exclusive',
      'forward this', 'share this', 'hurry up', 'limited time', 'expires today',
      'click this link', 'send citizenship number', 'share immediately', 
      'before government deletes', 'share before deleted', 'no paperwork needed',
      'तत्काल!', 'गोप्य जानकारी', 'सेयर गर्नुहोस्', 'पठाउनुहोस्', 'डिलिट हुनु अघि'
    ];
    
    const notPolicyPatterns = [
      'cricket team', 'football', 'weather', 'rainfall', 'shopping mall', 'bollywood',
      'restaurant', 'bank launches', 'mobile app', 'gordon ramsay', 'entertainment',
      'युट्यूबमा', 'क्रिकेट', 'मौसम', 'भ्यू', 'गीत', 'फुटबल', 'बसपार्क'
    ];

    // Count pattern matches
    const realMatches = realPolicyPatterns.filter(pattern => 
      lowerText.includes(pattern.toLowerCase())
    ).length;
    
    const fakeMatches = fakeIndicators.filter(indicator => 
      lowerText.includes(indicator.toLowerCase())
    ).length;
    
    const notPolicyMatches = notPolicyPatterns.filter(pattern => 
      lowerText.includes(pattern.toLowerCase())
    ).length;

    // Analyze similar examples from dataset
    const labelCounts = { real: 0, fake: 0, 'not-policy': 0 };
    let totalSimilarity = 0;
    
    similarExamples.forEach(example => {
      if (example.similarity > 0.1) { // Only consider meaningful similarities
        labelCounts[example.label] += example.similarity;
        totalSimilarity += example.similarity;
      }
    });

    // Determine classification using hybrid approach
    let classification;
    let confidence;
    let explanation;
    let reasoning = [];

    // Dataset-based prediction
    const datasetPrediction = totalSimilarity > 0.5 
      ? Object.keys(labelCounts).reduce((a, b) => labelCounts[a] > labelCounts[b] ? a : b)
      : null;

    // Rule-based classification with dataset validation
    if (fakeMatches >= 2) {
      classification = 'fake';
      confidence = Math.min(95, 70 + fakeMatches * 8);
      explanation = 'This text contains multiple indicators commonly found in misinformation or fake policy documents, including urgency tactics and social sharing appeals.';
      reasoning.push(`Found ${fakeMatches} fake indicators`);
    } else if (notPolicyMatches > 0 || text.length < 30) {
      classification = 'not-policy';
      confidence = Math.min(95, 65 + notPolicyMatches * 10 + (text.length < 30 ? 20 : 0));
      explanation = 'This appears to be general news, entertainment, sports, or other non-policy content rather than a government policy document.';
      reasoning.push(`Found ${notPolicyMatches} non-policy indicators`);
    } else if (realMatches >= 3) {
      classification = 'real';
      confidence = Math.min(95, 75 + realMatches * 5);
      explanation = 'This document contains official government terminology and institutional references consistent with authentic policy documents.';
      reasoning.push(`Found ${realMatches} official government terms`);
    } else if (realMatches >= 1) {
      classification = 'real';
      confidence = 55 + realMatches * 10;
      explanation = 'The document shows some characteristics of official policy but may be incomplete or informal.';
      reasoning.push(`Found ${realMatches} government-related terms`);
    } else if (datasetPrediction && totalSimilarity > 1) {
      // Use dataset prediction when pattern matching is inconclusive
      classification = datasetPrediction;
      const similarityScore = labelCounts[datasetPrediction] / totalSimilarity;
      confidence = Math.round(45 + similarityScore * 35);
      explanation = `Classification based on similarity to examples in our dataset. This text closely resembles ${classification === 'not-policy' ? 'non-policy content' : classification + ' policy documents'} from our training data.`;
      reasoning.push(`Dataset similarity: ${Math.round(similarityScore * 100)}%`);
    } else {
      // Fallback for unclear cases
      classification = 'not-policy';
      confidence = 45;
      explanation = 'Unable to determine clear classification patterns. The text may be ambiguous or require manual verification.';
      reasoning.push('Inconclusive pattern matching');
    }

    // Adjust confidence based on dataset agreement
    if (datasetPrediction === classification && totalSimilarity > 1) {
      confidence = Math.min(95, confidence + 10);
      reasoning.push('Dataset confirms classification');
    } else if (datasetPrediction && datasetPrediction !== classification && totalSimilarity > 1.5) {
      confidence = Math.max(30, confidence - 15);
      reasoning.push(`Dataset suggests ${datasetPrediction} instead`);
    }

    // Add reasoning to explanation if available
    if (reasoning.length > 0 && confidence < 80) {
      explanation += ` (Analysis: ${reasoning.join(', ')})`;
    }

    return {
      classification,
      confidence: Math.round(Math.max(25, Math.min(95, confidence))),
      explanation
    };
  }
}

export default PolicyAPI;