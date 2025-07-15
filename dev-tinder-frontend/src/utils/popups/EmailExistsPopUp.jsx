import { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaTimes, FaSignInAlt } from 'react-icons/fa';


const EmailExistsPopup = ({ onClose, openAuthModal }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 7000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Account Exists
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
              <div className="absolute inset-0 bg-yellow-100 rounded-full opacity-75 animate-ping"></div>
              <FaExclamationTriangle className="relative w-16 h-16 text-yellow-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Email Already Registered
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This email address is already associated with an account.
            Would you like to login instead?
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="btn btn-outline flex-1 border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 font-medium rounded-lg py-3 px-6 shadow hover:shadow-md transition-all duration-300"
            >
              Try Different Email
            </button>
            <button

              onClick={() => {
                setIsVisible(false)
                openAuthModal('login')
              }}
              className="btn btn-primary flex-1 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-medium rounded-lg py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaSignInAlt />
              Login Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailExistsPopup;