import { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import FileUpload from './components/FileUpload';
import AnalyzeButton from './components/AnalyzeButton';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import PolicyAPI from './services/policyAPI';

function App() {
  const [policyText, setPolicyText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  const handleTextChange = (text) => {
    setPolicyText(text);
    // Clear results when text changes
    if (analysisResult || analysisError) {
      setAnalysisResult(null);
      setAnalysisError(null);
    }
  };

  const handleFileTextExtracted = (text) => {
    setPolicyText(text);
    // Clear previous results
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const handleAnalyze = async () => {
    if (!policyText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const result = await PolicyAPI.analyzePolicy(policyText);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearResults = () => {
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const handleReset = () => {
    setPolicyText('');
    setAnalysisResult(null);
    setAnalysisError(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100 to-red-50 opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-red-100 to-blue-50 opacity-30 animate-pulse"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="space-y-10">
            {/* Introduction */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gradient-nepal mb-4">
                Verify Policy Authenticity
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                Use our AI-powered tool to verify if a document is an official government policy, 
                potentially fake, or not a policy document at all. Enter text or upload a file to get started.
              </p>
              <div className="flex justify-center mt-6 space-x-4">
                <span className="badge-nepal">AI-Powered</span>
                <span className="badge-nepal">Secure Analysis</span>
                <span className="badge-nepal">Real-time Results</span>
              </div>
            </div>

            {/* Input Section */}
            <div className="card-nepal rounded-2xl p-8">
              <div className="space-y-8">
                <TextInput
                  value={policyText}
                  onChange={handleTextChange}
                  disabled={isAnalyzing}
                />
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <span className="text-sm text-gray-500 font-semibold px-4 py-2 bg-gray-50 rounded-full">OR</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
                
                <FileUpload
                  onTextExtracted={handleFileTextExtracted}
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            {/* Action Section */}
            <div className="card-nepal rounded-2xl p-8">
              <AnalyzeButton
                onClick={handleAnalyze}
                isAnalyzing={isAnalyzing}
                text={policyText}
              />
            </div>

            {/* Error Display */}
            {analysisError && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                  <p className="text-red-800 font-semibold text-lg">Analysis Error</p>
                </div>
                <p className="text-red-700 text-base mt-2">{analysisError}</p>
                <button
                  onClick={() => setAnalysisError(null)}
                  className="inline-flex items-center text-red-800 text-sm font-medium underline mt-3 hover:text-red-900 transition-colors"
                >
                  Dismiss Error
                </button>
              </div>
            )}

            {/* Results Section */}
            {analysisResult && (
              <div className="card-nepal rounded-2xl p-8">
                <ResultsDisplay
                  result={analysisResult}
                  originalText={policyText}
                  onClear={handleClearResults}
                />
              </div>
            )}

            {/* Reset Section */}
            {(policyText || analysisResult) && (
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 text-sm font-medium text-gray-700 hover:text-white border-2 border-gray-300 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 hover:border-transparent transition-all duration-300 transform hover:scale-105"
                >
                  Start New Analysis
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
