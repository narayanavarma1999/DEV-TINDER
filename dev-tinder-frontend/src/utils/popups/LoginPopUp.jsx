import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const LoginPrompt = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [showPrompt, setShowPrompt] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Show prompt after 1 second delay and start countdown
  useEffect(() => {
    const promptTimer = setTimeout(() => {
      if (!user) {
        setShowPrompt(true);
        
        // Start countdown when prompt shows
        const countdownTimer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownTimer);
              navigate('/');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(countdownTimer);
      }
    }, 1000);

    return () => clearTimeout(promptTimer);
  }, [user, navigate]);

  if (user || !showPrompt) return null;

  const handleManualRedirect = () => {
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-sm">
          {/* Animated floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0.2,
                transition: {
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Large animated card */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20"
      >
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

            {/* Countdown progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
              />
            </div>

            <p className="text-gray-600 mb-6">Redirecting in {countdown} seconds...</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleManualRedirect}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Continue to Home Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPrompt;