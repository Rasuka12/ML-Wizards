/**
 * Gemini API service for advanced news search and verification
 */

// Environment variables (Vite requires VITE_ prefix for client-side access)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Google Custom Search API (optional - currently not implemented)
const GOOGLE_SEARCH_API_KEY = import.meta.env.VITE_GOOGLE_SEARCH_API_KEY || null;
const GOOGLE_SEARCH_ENGINE_ID = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID || null;

// Validate required environment variables
if (!GEMINI_API_KEY) {
  console.error('⚠️  VITE_GEMINI_API_KEY is not set in environment variables');
}

/**
 * @typedef {Object} NewsSource
 * @property {string} title - News article title
 * @property {string} url - Source URL
 * @property {string} domain - Domain name
 * @property {string} summary - Brief summary
 * @property {string} relevance - Relevance score
 * @property {string} credibility - Source credibility assessment
 */

/**
 * @typedef {Object} AdvancedSearchResult
 * @property {string} searchQuery - The search query used
 * @property {NewsSource[]} sources - Related news sources
 * @property {string} analysis - AI analysis of the search results
 * @property {string} verification - Verification status
 * @property {string} context - Additional context
 */

class GeminiAPI {
  /**
   * Search for related news and sources using Gemini AI
   * @param {string} policyText - The policy text to search for
   * @param {string} classification - The classification result (real/fake/not-policy)
   * @returns {Promise<AdvancedSearchResult>} Search results with sources
   */
  static async searchRelatedNews(policyText, classification) {
    try {
      const prompt = this._createSearchPrompt(policyText, classification);
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        throw new Error('No response generated from Gemini API');
      }

      return this._parseResponse(generatedText, policyText);
    } catch (error) {
      console.error('Gemini API search error:', error);
      throw new Error(`Advanced search failed: ${error.message}`);
    }
  }

  /**
   * Create a search prompt for Gemini API
   * @private
   */
  static _createSearchPrompt(policyText, classification) {
    const shortText = policyText.length > 500 ? policyText.substring(0, 500) + '...' : policyText;
    
    return `You are an AI assistant helping to verify policy information for Nepal. 

POLICY TEXT TO ANALYZE:
"${shortText}"

CURRENT CLASSIFICATION: ${classification}

TASK: Create specific search strategies and provide detailed guidance for finding related news about this policy. Focus on:

1. **Search Keywords**: Extract key terms and create multiple specific search queries
2. **Search Strategies**: Provide specific search approaches for different platforms
3. **Verification Steps**: Detailed steps to verify authenticity
4. **Context**: Background about this policy area
5. **Red Flags**: Warning signs to watch for

IMPORTANT: Do not provide generic homepage URLs or placeholder text like "To be determined". Instead, provide:
- Specific search queries that users can copy-paste into Google/news sites
- Detailed search instructions for finding relevant articles
- Exact verification steps with specific websites to check
- Always provide actual working URLs (like https://www.mof.gov.np for Ministry of Finance)

Please format your response as JSON with the following structure:
{
  "searchQuery": "Primary search terms for Google",
  "alternativeQueries": [
    "Alternative search query 1",
    "Alternative search query 2",
    "Alternative search query 3"
  ],
  "searchStrategies": [
    {
      "platform": "Google News",
      "query": "Exact search terms to use",
      "instructions": "How to search effectively on this platform"
    },
    {
      "platform": "Kathmandu Post",
      "query": "Site-specific search terms",
      "instructions": "How to search their archives"
    }
  ],
  "sources": [
    {
      "title": "Government of Nepal Official Portal",
      "url": "https://www.nepal.gov.np",
      "domain": "nepal.gov.np",
      "summary": "Search their announcements section for official policy publications",
      "searchTips": "Check 'Latest News' and 'Notices' sections",
      "relevance": "High",
      "credibility": "Official Government Source"
    },
    {
      "title": "Ministry of Finance, Nepal",
      "url": "https://www.mof.gov.np",
      "domain": "mof.gov.np",
      "summary": "Official source for budget, financial policies, and economic announcements",
      "searchTips": "Check Press Releases, Budget Documents, and Policy sections",
      "relevance": "High",
      "credibility": "Official Government Source"
    }
  ],
  "analysis": "Your analysis of the policy and its likely authenticity based on the content",
  "verification": "Step-by-step verification process with specific actions to take",
  "context": "Background context about this policy area in Nepal",
  "redFlags": "Specific warning signs and red flags to look for in this type of policy"
}

Focus on actionable search strategies rather than direct links, since news articles change frequently.`;
  }

  /**
   * Parse the Gemini API response
   * @private
   */
  static _parseResponse(generatedText, originalText) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Validate and enhance the response
      const searchResult = {
        searchQuery: parsedData.searchQuery || 'Nepal policy verification',
        alternativeQueries: parsedData.alternativeQueries || [],
        searchStrategies: parsedData.searchStrategies || [],
        sources: this._validateSources(parsedData.sources || []),
        quickSearchLinks: this._generateQuickSearchLinks(parsedData.searchQuery || 'Nepal policy verification', originalText),
        analysis: parsedData.analysis || 'Unable to provide detailed analysis.',
        verification: parsedData.verification || 'Verify through official government channels.',
        context: parsedData.context || 'Context information not available.',
        redFlags: parsedData.redFlags || 'Look for official government seals and sources.'
      };

      return searchResult;
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      
      // Fallback response if parsing fails
      const fallbackQuery = this._extractKeywords(originalText);
      return {
        searchQuery: fallbackQuery,
        alternativeQueries: [
          'Nepal government policy announcement',
          'Nepal ministry official statement',
          'Nepal policy gazette notification'
        ],
        searchStrategies: this._getFallbackStrategies(),
        sources: this._getFallbackSources(),
        quickSearchLinks: this._generateQuickSearchLinks(fallbackQuery, originalText),
        analysis: 'Advanced analysis temporarily unavailable. Please verify through official channels.',
        verification: 'Check official Nepal government websites and trusted news sources.',
        context: 'For Nepal policy verification, always consult government websites ending in .gov.np',
        redFlags: 'Be cautious of urgent messages asking for immediate action or personal information.'
      };
    }
  }

  /**
   * Generate quick search links for immediate access
   * @private
   */
  static _generateQuickSearchLinks(searchQuery, originalText) {
    console.log('DEBUG - searchQuery:', searchQuery);
    console.log('DEBUG - originalText:', originalText);
    
    // Use the actual policy text but keep it shorter for better search results
    let dynamicQuery = '';
    
    if (originalText && originalText.trim().length > 0) {
      dynamicQuery = originalText.trim();
      
      // If text is too long, use first sentence or first 50 characters for better search results
      if (dynamicQuery.length > 50) {
        const firstSentence = dynamicQuery.split(/[.!?]/)[0];
        if (firstSentence.length > 0 && firstSentence.length <= 60) {
          dynamicQuery = firstSentence.trim();
        } else {
          dynamicQuery = dynamicQuery.substring(0, 50).trim();
        }
      }
    } else if (searchQuery && searchQuery.trim().length > 0) {
      dynamicQuery = searchQuery.trim();
    } else {
      // Final fallback
      dynamicQuery = 'Nepal policy verification';
    }
    
    // Clean up the query (remove extra spaces, special characters that might break URLs)
    dynamicQuery = dynamicQuery.replace(/\s+/g, ' ').trim();
    
    console.log('Final dynamic query being used:', dynamicQuery);
    
    const encodedQuery = encodeURIComponent(dynamicQuery);
    const encodedNewsQuery = encodeURIComponent(`${dynamicQuery} Nepal`);
    
    // Truncate description if too long for display
    const shortDescription = dynamicQuery.length > 60 ? dynamicQuery.substring(0, 60) + '...' : dynamicQuery;
    
    return [
      {
        title: "Google Search",
        url: `https://www.google.com/search?q=${encodedQuery}`,
        description: `Search Google: ${shortDescription}`,
        icon: "🔍"
      },
      {
        title: "Google News Search",
        url: `https://news.google.com/search?q=${encodedNewsQuery}&hl=en-US&gl=US&ceid=US:en`,
        description: `Search news: ${shortDescription}`,
        icon: "📰"
      },
      {
        title: "Kathmandu Post Search", 
        url: `https://kathmandupost.com/search?q=${encodedQuery}`,
        description: `Search Kathmandu Post: ${shortDescription}`,
        icon: "📰"
      },
      {
        title: "Republica Search",
        url: `https://myrepublica.nagariknetwork.com/search?q=${encodedQuery}`,
        description: `Search Republica: ${shortDescription}`,
        icon: "📰"
      },
      {
        title: "YouTube Search",
        url: `https://www.youtube.com/results?search_query=${encodedQuery}`,
        description: `Search YouTube: ${shortDescription}`,
        icon: "📺"
      }
    ];
  }


  /**
   * Get fallback search strategies
   * @private
   */
  static _getFallbackStrategies() {
    return [
      {
        platform: "Google News",
        query: "Nepal government policy announcement site:kathmandupost.com OR site:myrepublica.nagariknetwork.com",
        instructions: "Search for recent news about Nepal government policies from trusted sources"
      },
      {
        platform: "Kathmandu Post Search",
        query: "government policy Nepal ministry",
        instructions: "Go to kathmandupost.com, use their search function and check the Politics/National section"
      },
      {
        platform: "PM Office Website",
        query: "policy decision statement",
        instructions: "Visit opmcm.gov.np and check Press Releases and Government Decisions sections"
      },
      {
        platform: "YouTube Official Channels",
        query: "Nepal government policy PM office official",
        instructions: "Search for official government channels for press conferences and policy announcements"
      }
    ];
  }

  /**
   * Validate and enhance source information
   * @private
   */
  static _validateSources(sources) {
    const validatedSources = sources.map(source => ({
      title: source.title || 'Untitled Source',
      url: source.url || '#',
      domain: source.domain || 'unknown',
      summary: source.summary || 'No summary available',
      searchTips: source.searchTips || 'Search their website for relevant information',
      relevance: source.relevance || 'Medium',
      credibility: source.credibility || 'Unknown'
    }));

    // Add some default Nepal sources if none provided
    if (validatedSources.length === 0) {
      return this._getFallbackSources();
    }

    return validatedSources;
  }

  /**
   * Extract keywords from policy text for search
   * @private
   */
  static _extractKeywords(text) {
    const commonWords = ['government', 'nepal', 'policy', 'ministry', 'official', 'announcement'];
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    const keywords = [...new Set([...commonWords, ...words.slice(0, 5)])];
    return keywords.join(' ');
  }

  /**
   * Get fallback sources when API parsing fails
   * @private
   */
  static _getFallbackSources() {
    return [
      {
        title: 'Office of the Prime Minister and Council of Ministers',
        url: 'https://www.opmcm.gov.np',
        domain: 'opmcm.gov.np',
        summary: 'Official announcements and policy decisions from PM office',
        searchTips: 'Check Press Releases, Statements, and Government Decisions sections',
        relevance: 'High',
        credibility: 'Official Government Source'
      },
      {
        title: 'Ministry of Finance, Nepal',
        url: 'https://www.mof.gov.np',
        domain: 'mof.gov.np',
        summary: 'Official source for budget, financial policies, and economic announcements',
        searchTips: 'Check Press Releases, Budget Documents, and Policy sections for financial information',
        relevance: 'High',
        credibility: 'Official Government Source'
      },
      {
        title: 'Ministry of Federal Affairs and General Administration',
        url: 'https://www.mofaga.gov.np',
        domain: 'mofaga.gov.np',
        summary: 'Federal policies and administrative announcements',
        searchTips: 'Check News & Events and Publications sections for policy updates',
        relevance: 'High',
        credibility: 'Official Government Source'
      },
      {
        title: 'The Kathmandu Post',
        url: 'https://kathmandupost.com',
        domain: 'kathmandupost.com',
        summary: 'Leading English daily newspaper in Nepal',
        searchTips: 'Use search function and check National/Politics sections',
        relevance: 'High',
        credibility: 'Established Media Outlet'
      },
      {
        title: 'Republica',
        url: 'https://myrepublica.nagariknetwork.com',
        domain: 'myrepublica.nagariknetwork.com',
        summary: 'English daily newspaper covering national news',
        searchTips: 'Search their archives and check Government/Politics category',
        relevance: 'High',
        credibility: 'Established Media Outlet'
      },
      {
        title: 'Gorkhapatra - National Daily',
        url: 'https://gorkhapatraonline.com',
        domain: 'gorkhapatraonline.com',
        summary: 'Nepal\'s oldest national daily newspaper',
        searchTips: 'Check their Government and Policy sections for official news',
        relevance: 'High',
        credibility: 'Established Media Outlet'
      },
      {
        title: 'Nepal Press',
        url: 'https://www.nepalpress.com',
        domain: 'nepalpress.com',
        summary: 'Online news portal covering government policies',
        searchTips: 'Use search function to find specific policy announcements',
        relevance: 'Medium',
        credibility: 'Online News Portal'
      }
    ];
  }

  /**
   * Get verification tips for users
   * @param {string} classification - Policy classification
   * @returns {string[]} Array of verification tips
   */
  static getVerificationTips(classification) {
    const baseTips = [
      '🏛️ Check official government websites (.gov.np)',
      '📰 Verify with established Nepal news outlets',
      '📱 Check official government social media accounts',
      '📞 Contact relevant ministry directly',
      '🔍 Look for official seals and letterheads'
    ];

    if (classification === 'fake') {
      baseTips.push(
        '⚠️ Be suspicious of urgent calls to action',
        '🚫 Avoid sharing unverified information',
        '📧 Don\'t provide personal information via unofficial channels'
      );
    }

    return baseTips;
  }
}

export default GeminiAPI;