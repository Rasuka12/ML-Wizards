import { Heart, Users, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-nepal mt-16 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-red-500 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-gray-800 text-lg">Nepal Policy Detector</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              AI-powered tool for verifying government policy authenticity in Nepal.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-gray-800 text-lg">Hackathon Team</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Built for transparent governance and citizen empowerment.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-gray-800 text-lg">Made with Care</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Promoting digital literacy and fighting misinformation.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t-2 border-gradient-to-r from-blue-200 to-red-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="font-semibold">© 2025 Nepal Policy Detector</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-red-100 rounded-full font-medium">Hackathon Project</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Powered by</span>
              <span className="font-bold text-gradient-nepal">AI Technology</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              <span className="font-semibold">⚠️ Disclaimer:</span> This tool provides AI-based analysis and should not replace official verification processes. 
              Always consult official government sources for critical policy information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;