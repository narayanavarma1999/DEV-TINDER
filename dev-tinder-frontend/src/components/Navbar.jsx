import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = ({ openAuthModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Dev<span className="text-primary-light">Tinder</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-700 hover:text-primary">
              Features
            </Link>
            <Link to="/templates" className="text-gray-700 hover:text-primary">
              Templates
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary">
              Pricing
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary">
              Blog
            </Link>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
              >
                Log in
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
              >
                Get started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/features" className="text-gray-700 hover:text-primary">
              Features
            </Link>
            <Link to="/templates" className="text-gray-700 hover:text-primary">
              Templates
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary">
              Pricing
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary">
              Blog
            </Link>
            
            <div className="flex flex-col space-y-2 pt-4">
              <button 
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  openAuthModal('register');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
              >
                Find Your Coding Partner 👨‍💻
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;