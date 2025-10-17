import React from 'react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Animated 404 Number */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-800 opacity-10 absolute -top-4 -left-4 transform -rotate-12">
            404
          </div>
          <div className="text-9xl font-bold text-indigo-600 relative z-10 animate-pulse">
            404
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>

          {/* Text Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Return Home
            </button>
          </div>
        </div>

        {/* Additional Help Text */}
        <p className="text-gray-500 text-sm">
          Need help?{' '}
          <a 
            href="/contact" 
            className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;