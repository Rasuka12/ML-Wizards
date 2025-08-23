import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="header-nepal relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-18 py-2">
          <div className="flex items-center space-x-4">
            {/* Fixed logo with solid white background and blue icon */}
            <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-lg border border-blue-100">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                Nepal Policy Detector
              </h1>
              <p className="text-sm text-blue-100 font-medium">
                Verify authenticity of government policies
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white bg-opacity-90 text-blue-700 shadow-lg backdrop-filter backdrop-blur-sm">
                🤖 AI-Powered
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white bg-opacity-90 text-green-700 shadow-lg backdrop-filter backdrop-blur-sm">
                🔒 Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;