# Lawgical ⚖️

An AI-powered policy verification tool designed to help users distinguish between authentic government policies, fake news, and non-policy content in Nepal.

## 📋 Project Overview

**Lawgical** is a sophisticated web application that combines AI technology with curated datasets to verify the authenticity of policy documents and news content. The tool is specifically tailored for the Nepali context, supporting both English and Nepali languages.

### Key Features

- **🤖 AI-Powered Analysis**: Uses Google Gemini AI for advanced content analysis
- **📊 Dataset-Based Classification**: Employs a curated dataset of 50+ labeled examples
- **🔍 Advanced Search Integration**: Provides intelligent search strategies and verification tips
- **📱 Multi-Input Support**: Accepts text input and file uploads (with OCR support)
- **🌐 Multi-Language**: Supports both English and Nepali content
- **⚡ Real-Time Results**: Fast classification with confidence scoring
- **🔗 Quick Verification Links**: Direct links to trusted news sources and government websites

### Classification Categories

1. **Real Policy**: Authentic government policy documents
2. **Fake News**: Potentially false or misleading information
3. **Not Policy**: General news, entertainment, or non-policy content

## 🚀 Setup and Run Instructions

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rasuka12/ML-Wizards.git
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Required)
   ```bash
   # Copy the environment template
   cp .env.example .env
   
   # Edit the .env file with your API keys
   nano .env  # or use your preferred editor
   ```
   
   **Get your Google Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key and replace `your_gemini_api_key_here` in your `.env` file
   
   **Required Environment Variables:**
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application should be running locally

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

## 🛠️ Dependencies and Tools Used

### Frontend Framework
- **React 19.1.1** - Modern JavaScript library for building user interfaces
- **Vite 7.1.2** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.12** - Tailwind integration for Vite
- **Radix UI** - Unstyled, accessible UI components
  - `@radix-ui/react-slot 1.2.3`
- **Lucide React 0.539.0** - Beautiful icon library
- **class-variance-authority 0.7.1** - Class variant utilities
- **clsx 2.1.1** - Conditional class name utility
- **tailwind-merge 3.3.1** - Tailwind class merging utility

### AI & Analysis
- **Google Gemini API** - Advanced AI for content analysis and search suggestions
- **Custom Dataset** - 50+ labeled examples for similarity matching

### File Processing
- **Tesseract.js 6.0.1** - OCR (Optical Character Recognition) for image text extraction

### Development Tools
- **ESLint 9.33.0** - Code linting and quality
- **@eslint/js 9.33.0** - ESLint JavaScript configuration
- **eslint-plugin-react-hooks 5.2.0** - React Hooks linting
- **eslint-plugin-react-refresh 0.4.20** - React Fast Refresh support
- **globals 16.3.0** - Global variable definitions

### Testing
- **Playwright 1.54.2** - End-to-end testing framework

### Build Tools
- **@vitejs/plugin-react 5.0.0** - React plugin for Vite
- **@types/react 19.1.10** - TypeScript definitions for React
- **@types/react-dom 19.1.7** - TypeScript definitions for React DOM

### Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── Header.jsx      # Application header
│   ├── Footer.jsx      # Application footer
│   ├── TextInput.jsx   # Text input component
│   ├── FileUpload.jsx  # File upload with OCR
│   ├── AnalyzeButton.jsx # Analysis trigger button
│   └── ResultsDisplay.jsx # Results presentation
├── services/           # API and business logic
│   ├── geminiAPI.js    # Google Gemini AI integration
│   └── policyAPI.js    # Main policy analysis service
├── data/               # Dataset and static data
│   └── policyDataset.js # Labeled examples for classification
├── lib/                # Utility functions
│   └── utils.js        # Helper functions
└── types/              # Type definitions
    └── index.js        # TypeScript-style type exports
```

## 👥 Team Members and Roles

| Name | Role | Responsibilities |
|------|------|-----------------|
| **Rasuka Shrestha** 
| **Mahima Shrestha** 
| **Milan Sunar** 
| **Jayanti Acharya** 
| **Chime Lhamo Gurung** 

### Individual Contributions

- **Rasuka Shrestha**: 
- **Mahima Shrestha**: 
- **Milan Sunar**: 
- **Jayanti Acharya**: 
- **Chime Lhamo Gurung**: 

## 🔧 Configuration

### Environment Variables Setup

The application uses environment variables to securely store sensitive information like API keys.

**File Structure:**
- `.env` - Your actual API keys (never commit this)
- `.env.example` - Template file (safe to commit)
- `.gitignore` - Ensures `.env` files are not tracked

**Important Notes:**
- ⚠️ **Never commit your `.env` file** - it contains sensitive API keys
- ✅ **Always use the `.env.example` template** when setting up on new machines
- 🔑 **Vite requires `VITE_` prefix** for client-side environment variables

### API Configuration
- The application uses Google Gemini AI API for advanced analysis
- API key is loaded from `VITE_GEMINI_API_KEY` environment variable
- Error handling is included for missing API keys

### Dataset Configuration
- The application includes a pre-built dataset of 50 labeled examples
- Dataset can be expanded by adding entries to `src/data/policyDataset.js`

### Security Best Practices
- 🔒 All sensitive data is stored in environment variables
- 🚫 `.env` files are excluded from version control
- ⚡ Client-side variables use `VITE_` prefix as required by Vite
- 🔍 Console warnings appear if required API keys are missing

## 📝 License

This project is developed for NSA AI Hackathon. Please refer to the license file for detailed terms and conditions.

## 🤝 Contributing

This project was developed as part of a team effort to combat misinformation in Nepal. For contributions or improvements, please contact the development team.

---

**Built with ❤️ by the Lawgical Team**