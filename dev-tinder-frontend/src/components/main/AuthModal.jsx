import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { loginUser, registerUser } from "../../utils/constants/login";
import SuccessPopup from "../../utils/popups/SuccesPopUp";
import EmailExistsPopup from "../../utils/popups/EmailExistsPopUp";
import ErrorPopup from "../../utils/popups/ErrorPopUp";
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/appstore/userslice'
import { useNavigate } from "react-router-dom";


const AuthModal = ({ mode, onClose, openAuthModal, switchMode }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [authError, setAuthError] = useState(null);
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
        if (response.success) {
          handleLoginSuccess();
        } else {
          handleLoginError(response.message);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome back' : 'Get started'}
            </h2>
            <p className="text-gray-600 mt-2">
              {mode === 'login'
                ? 'Log in to your account'
                : 'Create a new account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition"
            >
              {mode === 'login' ? 'Log in' : 'Sign up'}
            </button>
          </form>

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

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login'
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="text-primary hover:text-primary-light font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#4285F4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#000000">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;