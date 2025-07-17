import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';

const LoginPrompt = () => {

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [showPrompt, setShowPrompt] = useState(false);

  // Show prompt after 1.5 seconds delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) setShowPrompt(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [user]);

  if (user || !showPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-sm">
          {/* Animated floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Large animated card */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 animate-float">
        {/* Close button */}
        <button
          onClick={() => setShowPrompt(false)}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Card content */}
        <div className="relative z-0 p-8">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/20 rounded-full blur-xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-xl" />

          <div className="relative z-10 text-center">
            <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <SparklesIcon className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-3">Discover Your Feed</h2>
            <p className="text-lg text-gray-800 mb-6">
              To view personalized content, please login to your account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/home')}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Continue to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;