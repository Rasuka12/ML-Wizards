/**
 * @typedef {Object} PolicyResult
 * @property {'real' | 'fake' | 'not-policy'} classification - The classification of the policy
 * @property {number} confidence - Confidence score from 0-100
 * @property {string} [explanation] - Optional explanation of the result
 */

/**
 * @typedef {Object} FileUploadStatus
 * @property {boolean} isUploading - Whether file is currently uploading
 * @property {number} progress - Upload progress from 0-100
 * @property {string} [error] - Error message if upload failed
 */

/**
 * @typedef {Object} AnalysisState
 * @property {boolean} isAnalyzing - Whether analysis is in progress
 * @property {PolicyResult} [result] - Analysis result if completed
 * @property {string} [error] - Error message if analysis failed
 */

export default {};