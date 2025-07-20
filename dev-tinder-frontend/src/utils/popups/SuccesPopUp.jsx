import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const SuccessPopup = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Success!
          </h3>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full opacity-75 animate-ping"></div>
              <FaCheckCircle className="relative w-16 h-16 text-green-500" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-blue-800 dark:text-white mb-2">
            Welcome aboard!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message || "You have successfully logged in to your account."}
          </p>
          
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="btn btn-primary w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-medium rounded-lg py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue to Feed
          </button>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Need help? <a href="#" className="text-green-500 hover:underline">Contact support</a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;