import { Search, Shield } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

/**
 * @typedef {Object} AnalyzeButtonProps
 * @property {function(): void} onClick - Click handler
 * @property {boolean} isAnalyzing - Whether analysis is in progress
 * @property {boolean} disabled - Whether button is disabled
 * @property {string} text - Current text to analyze
 */

/**
 * @param {AnalyzeButtonProps} props
 */
const AnalyzeButton = ({ onClick, isAnalyzing = false, disabled = false, text = '' }) => {
  const isEmpty = !text?.trim();
  const isButtonDisabled = disabled || isAnalyzing || isEmpty;

  return (
    <div className="space-y-4">
      <button
        onClick={onClick}
        disabled={isButtonDisabled}
        className={`
          w-full flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 relative overflow-hidden
          ${isButtonDisabled 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'btn-nepal text-white shadow-2xl transform hover:scale-[1.02]'
          }
        `}
      >
        {!isButtonDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        )}
        
        {isAnalyzing ? (
          <>
            <LoadingSpinner size="md" className="text-white animate-spin-nepal" />
            <span>Analyzing Policy...</span>
          </>
        ) : (
          <>
            <Search className="h-6 w-6" />
            <span>Analyze Policy</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-75 animate-ping"></div>
          </>
        )}
      </button>
      
      {isEmpty && !isAnalyzing && (
        <div className="text-center">
          <p className="text-sm text-gray-600 bg-gray-50 rounded-full px-4 py-2 inline-block">
            📄 Please enter policy text or upload a document to analyze
          </p>
        </div>
      )}
      
      {isAnalyzing && (
        <div className="bg-gradient-to-r from-blue-50 to-red-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Shield className="h-6 w-6 text-blue-600 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-blue-900 mb-1">
                🔍 AI Analysis in Progress
              </p>
              <p className="text-sm text-blue-700">
                Verifying policy authenticity using advanced algorithms...
              </p>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeButton;