import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { loginUser, registerUser } from "../../utils/services/api.service";
import SuccessPopup from "../../utils/popups/SuccesPopUp";
import EmailExistsPopup from "../../utils/popups/EmailExistsPopUp";
import ErrorPopup from "../../utils/popups/ErrorPopUp";
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/appstore/userslice'
import { useNavigate } from "react-router-dom";
import ShimmerLoading from "../../utils/spinner/ShimmerLoadings";
import { loginSuccess } from "../../utils/appstore/authslice";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const AuthModal = ({ mode, onClose, openAuthModal, switchMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [authError, setAuthError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailExists, setShowEmailExists] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setSuccessMessage('You have successfully logged in!');
    setShowSuccess(true);
    navigate('/feed');
  };

  const handleRegisterSuccess = () => {
    setSuccessMessage('Your account has been created successfully!');
    setShowSuccess(true);
    navigate('/feed');
  };

  const handleLoginError = (message) => {
    setAuthError(message);
  };

  const handleRegisterError = (message) => {
    setAuthError(message);
  };

  const handleAuthError = (message) => {
    setAuthError(message);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      if (mode === "login") {
        const response = await loginUser(email, password);
        dispatch(addUser(response.data))
        dispatch(loginSuccess(response.data));
        if (response.success) {
          handleLoginSuccess();
        } else {
          handleLoginError(`Please Check Your Credentials`);
        }
      }

      if (mode === "register") {
        const response = await registerUser(name, email, password);
        if (response.success) {
          handleRegisterSuccess();
        } else {
          if (response.message.includes('EmailId Already Exists')) {
            setShowEmailExists(true);
          } else {
            handleRegisterError(response.message);
          }
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      handleAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    return <ShimmerLoading />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-lg animate-gradient"></div>
      
      {/* Main modal container */}
      <div className="relative w-full max-w-md">
        {/* Floating glass morphic card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-400/20 blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-400/20 blur-xl"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-sm"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>

          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
               
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {mode === 'login' ? 'Welcome back!' : 'Join us today'}
              </h2>
              <p className="text-gray-500 mt-2">
                {mode === 'login'
                  ? 'Sign in to access your account'
                  : 'Create an account to get started'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {mode === 'login' && (
                <div className="flex items-center justify-end">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 flex items-center justify-center"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </form>

            {/* Social login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/90 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="flex items-center justify-center py-2.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#4285F4">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center py-2.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Switch mode */}
            <div className="mt-8 text-center text-sm text-gray-500">
              {mode === 'login'
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showSuccess && (
        <SuccessPopup
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showEmailExists && (
        <EmailExistsPopup
          onClose={() => setShowEmailExists(false)}
          openAuthModal={openAuthModal}
        />
      )}

      {authError && <ErrorPopup message={authError} onClose={clearAuthError} />}
    </div>
  );
};

export default AuthModal;