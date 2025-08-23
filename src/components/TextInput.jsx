import { useState } from 'react';
import { FileText, X } from 'lucide-react';

const MAX_CHARACTERS = 10000;

/**
 * @typedef {Object} TextInputProps
 * @property {string} value - Current text value
 * @property {function(string): void} onChange - Text change handler
 * @property {boolean} disabled - Whether input is disabled
 */

/**
 * @param {TextInputProps} props
 */
const TextInput = ({ value, onChange, disabled = false }) => {
  const characterCount = value.length;
  const isNearLimit = characterCount > MAX_CHARACTERS * 0.8;
  const isOverLimit = characterCount > MAX_CHARACTERS;

  const handleClear = () => {
    onChange('');
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      onChange(newText);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="policy-text" className="flex items-center space-x-3 text-lg font-semibold text-gray-800">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-red-500 rounded-lg shadow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span>Policy Text</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-200 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>
      
      <div className="relative">
        <textarea
          id="policy-text"
          value={value}
          onChange={handleTextChange}
          disabled={disabled}
          placeholder="📝 Enter policy text here or upload a document to verify if it's an official policy, fake policy, or not a policy at all..."
          className={`
            input-nepal w-full min-h-[240px] p-6 rounded-2xl resize-none text-gray-700 text-base leading-relaxed shadow-lg transition-all duration-300
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-70' : 'bg-white hover:shadow-xl focus:shadow-2xl'}
            ${isOverLimit ? 'border-red-400 focus:ring-red-500' : ''}
            placeholder:text-gray-400 placeholder:italic
          `}
          rows={10}
          aria-describedby="character-count"
        />
        
        {/* Character count badge overlay */}
        <div className="absolute bottom-4 right-4">
          <div className={`
            px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm
            ${isOverLimit ? 'bg-red-100 text-red-700' : isNearLimit ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}
          `}>
            {characterCount.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="font-medium">Maximum {MAX_CHARACTERS.toLocaleString()} characters</span>
        </div>
        
        {/* Progress bar */}
        <div className="flex items-center space-x-3">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                isOverLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-gradient-to-r from-blue-500 to-red-500'
              }`}
              style={{ width: `${Math.min((characterCount / MAX_CHARACTERS) * 100, 100)}%` }}
            />
          </div>
          <span className={`text-xs font-bold ${
            isOverLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-blue-600'
          }`}>
            {Math.round((characterCount / MAX_CHARACTERS) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextInput;