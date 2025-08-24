import { CheckCircle2, AlertTriangle, XCircle, Copy, Info, Search, Globe, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import GeminiAPI from '../services/geminiAPI';

/**
 * @typedef {Object} ResultsDisplayProps  
 * @property {import('../types/index.js').PolicyResult} result - Analysis result
 * @property {string} originalText - Original policy text
 * @property {function(): void} onClear - Clear results handler
 */

/**
 * @param {ResultsDisplayProps} props
 */
const ResultsDisplay = ({ result, originalText, onClear }) => {
  const [copied, setCopied] = useState(false);
  const [showDatasetInsights, setShowDatasetInsights] = useState(false);
  const [advancedSearchResults, setAdvancedSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showAdvancedResults, setShowAdvancedResults] = useState(false);
  const [copiedQuery, setCopiedQuery] = useState(null);

  if (!result) return null;

  const { classification, confidence, explanation, similarExamples = [], datasetStats = {} } = result;

  const getResultConfig = () => {
    switch (classification) {
      case 'real':
        return {
          icon: CheckCircle2,
          title: 'Official Policy',
          description: 'This appears to be a legitimate government policy document',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-900',
          progressColor: 'bg-green-600'
        };
      case 'fake':
        return {
          icon: XCircle,
          title: 'We could not verify the news',
          description: 'This document may not be an authentic government policy',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900',
          progressColor: 'bg-red-600'
        };
      case 'not-policy':
        return {
          icon: AlertTriangle,
          title: 'Not a Policy Document',
          description: 'This text does not appear to be a government policy',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          iconColor: 'text-amber-600',
          titleColor: 'text-amber-900',
          progressColor: 'bg-amber-600'
        };
      default:
        return {
          icon: Info,
          title: 'Unknown',
          description: 'Unable to classify this document',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-900',
          progressColor: 'bg-gray-600'
        };
    }
  };

  const config = getResultConfig();
  const Icon = config.icon;

  const copyToClipboard = async () => {
    try {
      const resultText = `Classification: ${config.title}\nConfidence: ${confidence}%${explanation ? `\nExplanation: ${explanation}` : ''}`;
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleAdvancedSearch = async () => {
    setIsSearching(true);
    setSearchError(null);
    setShowAdvancedResults(false);
    
    try {
      const searchResults = await GeminiAPI.searchRelatedNews(originalText || '', classification);
      setAdvancedSearchResults(searchResults);
      setShowAdvancedResults(true);
    } catch (error) {
      console.error('Advanced search failed:', error);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const copyQueryToClipboard = async (query, queryId) => {
    try {
      await navigator.clipboard.writeText(query);
      setCopiedQuery(queryId);
      setTimeout(() => setCopiedQuery(null), 2000);
    } catch (err) {
      console.error('Failed to copy query:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAdvancedSearch}
            disabled={isSearching}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isSearching ? (
              <>
                <Search className="h-4 w-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                <span>ADVANCED SEARCH</span>
              </>
            )}
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Copy className="h-3 w-3" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-6`}>
        <div className="flex items-start space-x-4">
          <Icon className={`h-8 w-8 ${config.iconColor} flex-shrink-0 mt-1`} />
          <div className="flex-1 space-y-4">
            <div>
              <h4 className={`text-xl font-bold ${config.titleColor}`}>
                {config.title}
              </h4>
              <p className="text-gray-700 mt-1">
                {config.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Confidence Score
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {confidence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${config.progressColor} h-3 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low Confidence</span>
                <span>High Confidence</span>
              </div>
            </div>

            {explanation && (
              <div className="pt-4 border-t border-gray-200">
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Explanation
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Search Results */}
      {showAdvancedResults && advancedSearchResults && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-xl font-bold text-blue-900 flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <span>Advanced Search Results</span>
            </h5>
            <button
              onClick={() => setShowAdvancedResults(false)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Hide Results
            </button>
          </div>


          {/* Quick Search Links */}
          {advancedSearchResults.quickSearchLinks && advancedSearchResults.quickSearchLinks.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 shadow-sm">
              <h6 className="text-sm font-semibold text-orange-800 mb-3 flex items-center space-x-1">
                <span>⚡</span>
                <span>Quick Search Links (Click to Search Now):</span>
              </h6>
              <div className="grid gap-2 md:grid-cols-2">
                {advancedSearchResults.quickSearchLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="text-lg mr-3">{link.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm group-hover:text-orange-700">
                        {link.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {link.description}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-orange-600 group-hover:text-orange-800" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 shadow-sm">
            <h6 className="text-sm font-semibold text-indigo-800 mb-2 flex items-center space-x-1">
              <span>🤖</span>
              <span>AI Analysis:</span>
            </h6>
            <p className="text-sm text-gray-700 leading-relaxed">{advancedSearchResults.analysis}</p>
          </div>

          {/* Related Sources */}
          {advancedSearchResults.sources && advancedSearchResults.sources.length > 0 && (
            <div className="mb-6">
              <h6 className="text-lg font-semibold text-blue-800 mb-4 flex items-center space-x-2">
                <span>📰</span>
                <span>Related News Sources & Official Channels:</span>
              </h6>
              <div className="grid gap-4 md:grid-cols-2">
                {advancedSearchResults.sources.map((source, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h7 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                          {source.title}
                        </h7>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {source.domain}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            source.relevance === 'High' ? 'bg-green-100 text-green-700' :
                            source.relevance === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {source.relevance} Relevance
                          </span>
                        </div>
                      </div>
                      {source.url !== '#' && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      {source.summary}
                    </p>
                    {source.searchTips && (
                      <div className="text-xs text-green-700 bg-green-50 p-2 rounded mb-2">
                        <span className="font-medium">💡 Search Tips:</span> {source.searchTips}
                      </div>
                    )}
                    <div className="text-xs text-blue-700 font-medium">
                      📊 {source.credibility}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Steps */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm">
            <h6 className="text-sm font-semibold text-green-800 mb-2 flex items-center space-x-1">
              <span>✅</span>
              <span>How to Verify This Policy:</span>
            </h6>
            <p className="text-sm text-gray-700 leading-relaxed">{advancedSearchResults.verification}</p>
          </div>

          {/* Context Information */}
          <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
            <h6 className="text-sm font-semibold text-amber-800 mb-2 flex items-center space-x-1">
              <span>📋</span>
              <span>Background Context:</span>
            </h6>
            <p className="text-sm text-gray-700 leading-relaxed">{advancedSearchResults.context}</p>
          </div>

          {/* Red Flags */}
          {advancedSearchResults.redFlags && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-200 shadow-sm">
              <h6 className="text-sm font-semibold text-red-800 mb-2 flex items-center space-x-1">
                <span>🚨</span>
                <span>Warning Signs to Watch For:</span>
              </h6>
              <p className="text-sm text-gray-700 leading-relaxed">{advancedSearchResults.redFlags}</p>
            </div>
          )}
        </div>
      )}

      {/* Search Error Display */}
      {searchError && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h6 className="font-semibold text-red-800">Advanced Search Failed</h6>
          </div>
          <p className="text-sm text-red-700 mt-2">{searchError}</p>
          <button
            onClick={() => setSearchError(null)}
            className="mt-3 text-xs text-red-600 hover:text-red-800 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Dataset Insights Section */}
      {(similarExamples.length > 0 || Object.keys(datasetStats).length > 0) && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-purple-900 flex items-center space-x-2">
              <div className="p-1 bg-purple-100 rounded-lg">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
              <span>Dataset Analysis</span>
            </h5>
            <button
              onClick={() => setShowDatasetInsights(!showDatasetInsights)}
              className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
            >
              {showDatasetInsights ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          {/* Dataset Stats */}
          {Object.keys(datasetStats).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-800">{datasetStats.total}</div>
                <div className="text-xs text-gray-600">Total Examples</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{datasetStats.real}</div>
                <div className="text-xs text-gray-600">Real Policies</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-red-600">{datasetStats.fake}</div>
                <div className="text-xs text-gray-600">Fake Policies</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{datasetStats.notPolicy}</div>
                <div className="text-xs text-gray-600">Non-Policy</div>
              </div>
            </div>
          )}

          {/* Similar Examples */}
          {showDatasetInsights && similarExamples.length > 0 && (
            <div className="space-y-3">
              <h6 className="font-medium text-purple-800 mb-3">Most Similar Examples:</h6>
              {similarExamples.map((example, index) => (
                <div key={example.id} className="bg-white p-4 rounded-lg border-l-4 border-purple-300 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        #{index + 1}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        example.label === 'real' ? 'bg-green-100 text-green-700' :
                        example.label === 'fake' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {example.label === 'not-policy' ? 'Non-Policy' : example.label.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Similarity Score</div>
                      <div className="text-sm font-semibold text-purple-600">
                        {(example.similarity * 20).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {example.text.length > 120 ? example.text.substring(0, 120) + '...' : example.text}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="bg-gray-50 px-2 py-1 rounded">{example.language}</span>
                    <span className="bg-gray-50 px-2 py-1 rounded">{example.category}</span>
                    <span className="bg-gray-50 px-2 py-1 rounded">{example.source}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">
              Important Note
            </p>
            <p className="text-blue-800">
              This analysis uses a dataset of 50 labeled examples and AI-powered pattern matching. 
              For critical decisions, please verify with official government sources and consult legal experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;