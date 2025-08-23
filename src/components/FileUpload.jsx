import { useState, useRef } from 'react';
import { Upload, File, AlertCircle, CheckCircle2, X, Image, Camera } from 'lucide-react';
import { createWorker } from 'tesseract.js';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (increased for images)
const ALLOWED_TYPES = ['text/plain', 'application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/gif'];

/**
 * @typedef {Object} FileUploadProps
 * @property {function(string): void} onTextExtracted - Callback when text is extracted from file
 * @property {boolean} disabled - Whether upload is disabled
 */

/**
 * @param {FileUploadProps} props
 */
const FileUpload = ({ onTextExtracted, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ isUploading: false, progress: 0, error: null, statusText: '' });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const fileInputRef = useRef(null);
  const ocrWorkerRef = useRef(null);

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only PDF, TXT, and image files (JPG, PNG, BMP, GIF) are supported';
    }
    return null;
  };

  const isImageFile = (file) => {
    return file.type.startsWith('image/');
  };

  const performOCR = async (file) => {
    try {
      setUploadStatus(prev => ({ ...prev, statusText: 'Initializing OCR engine...' }));
      
      // Create OCR worker
      const worker = await createWorker('eng');
      ocrWorkerRef.current = worker;
      
      setUploadStatus(prev => ({ ...prev, progress: 20, statusText: 'Processing image...' }));
      
      // Perform OCR with progress tracking
      const { data: { text, confidence } } = await worker.recognize(file, {
        logger: m => {
          if (m.status === 'recognizing text') {
            const progress = Math.round(20 + (m.progress * 60)); // 20-80%
            setUploadStatus(prev => ({ 
              ...prev, 
              progress, 
              statusText: `Extracting text... ${Math.round(m.progress * 100)}%` 
            }));
          }
        }
      });
      
      setUploadStatus(prev => ({ ...prev, progress: 90, statusText: 'Cleaning up...' }));
      
      // Clean up worker
      await worker.terminate();
      ocrWorkerRef.current = null;
      
      if (text.trim().length === 0) {
        throw new Error('No text found in the image. Please try a clearer image.');
      }
      
      if (confidence < 30) {
        throw new Error('Low confidence text extraction. Please try a clearer image.');
      }
      
      setExtractedText(text);
      return text;
    } catch (error) {
      if (ocrWorkerRef.current) {
        await ocrWorkerRef.current.terminate();
        ocrWorkerRef.current = null;
      }
      throw error;
    }
  };

  const processFile = async (file) => {
    setUploadStatus({ isUploading: true, progress: 0, error: null, statusText: 'Starting...' });
    setUploadedFile(file);
    setImagePreview(null);
    setExtractedText('');

    try {
      let extractedText = '';

      if (isImageFile(file)) {
        // Create image preview
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        
        // Perform OCR on image
        extractedText = await performOCR(file);
      } else if (file.type === 'text/plain') {
        setUploadStatus(prev => ({ ...prev, progress: 50, statusText: 'Reading text file...' }));
        extractedText = await file.text();
      } else if (file.type === 'application/pdf') {
        // Mock PDF text extraction (you can replace this with a real PDF parser)
        setUploadStatus(prev => ({ ...prev, progress: 50, statusText: 'Processing PDF...' }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        extractedText = `[PDF Content from ${file.name}]\n\nThis is a mock extracted text from the PDF file. In a real implementation, you would use a PDF parsing library like PDF.js to extract the actual text content from the PDF file.`;
      }

      onTextExtracted(extractedText);
      setUploadStatus({ isUploading: false, progress: 100, error: null, statusText: 'Complete!' });
    } catch (error) {
      console.error('File processing error:', error);
      setUploadStatus({ 
        isUploading: false, 
        progress: 0, 
        error: error.message || 'Failed to process file',
        statusText: ''
      });
    }
  };

  const handleFile = async (file) => {
    const error = validateFile(file);
    if (error) {
      setUploadStatus({ isUploading: false, progress: 0, error });
      return;
    }
    await processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadStatus({ isUploading: false, progress: 0, error: null, statusText: '' });
    setExtractedText('');
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Upload Document
      </label>
      
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}
          ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
          ${uploadStatus.error ? 'border-red-300 bg-red-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,.jpg,.jpeg,.png,.bmp,.gif"
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />
        
        {uploadStatus.isUploading ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              {isImageFile(uploadedFile) ? (
                <Camera className="h-8 w-8 text-blue-500 animate-pulse" />
              ) : (
                <Upload className="h-8 w-8 text-blue-500 animate-pulse" />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {uploadStatus.statusText || 'Processing file...'}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadStatus.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{uploadStatus.progress}% complete</p>
            </div>
          </div>
        ) : uploadedFile ? (
          <div className="space-y-4">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto" />
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="max-w-sm mx-auto">
                <img 
                  src={imagePreview} 
                  alt="Uploaded preview" 
                  className="w-full h-auto rounded-lg shadow-lg border-2 border-gray-200"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-2">
              {isImageFile(uploadedFile) ? (
                <Image className="h-4 w-4 text-gray-500" />
              ) : (
                <File className="h-4 w-4 text-gray-500" />
              )}
              <span className="text-sm font-medium text-gray-700">{uploadedFile.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Extracted Text Preview */}
            {extractedText && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                <p className="text-xs font-medium text-gray-700 mb-2">Extracted Text Preview:</p>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {extractedText.length > 150 ? extractedText.substring(0, 150) + '...' : extractedText}
                </p>
              </div>
            )}
            
            <p className="text-xs text-green-600">
              {isImageFile(uploadedFile) ? 'Text extracted successfully!' : 'File processed successfully'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center space-x-4">
              <Upload className="h-8 w-8 text-gray-400" />
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Drop your file or image here, or <span className="text-blue-600">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, TXT, Images (JPG, PNG) up to {MAX_FILE_SIZE / (1024 * 1024)}MB
              </p>
              <p className="text-xs text-blue-600 mt-1 font-medium">
                📸 Upload screenshots or photos of policy documents for text extraction!
              </p>
            </div>
          </div>
        )}
      </div>
      
      {uploadStatus.error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{uploadStatus.error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;