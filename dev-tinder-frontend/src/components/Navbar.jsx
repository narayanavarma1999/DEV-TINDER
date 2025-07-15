import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const Navbar = ({ openAuthModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const user = useSelector((store) => store.user);

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center ml-24">
            <Link to="/" className="text-2xl font-bold text-primary">
              Dev<span className="text-primary-light">Tinder</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-5">
              <Link to="/features" className="text-gray-700 hover:text-primary transition px-2 py-1">
                Features
              </Link>
              <Link to="/templates" className="text-gray-700 hover:text-primary transition px-2 py-1">
                Templates
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-primary transition px-2 py-1">
                Pricing
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary transition px-2 py-1">
                Blog
              </Link>
            </div>

            {/* Auth Buttons or Profile */}
            {!user ? (
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
            ) : (
              <div className="flex items-center gap-3 ml-2">
                {/* Notification Bell */}
                <button className="relative p-1 text-gray-700 hover:text-primary transition">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative mr-2">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1 focus:outline-none"
                  >
                    <div className="avatar">
                      <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white">
                        <img
                          src={user.photoURL || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                          alt="Profile"
                        />
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Cog6ToothIcon className="h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          // Add logout logic here
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary transition"
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
        <div className="md:hidden bg-white py-3 px-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <Link
              to="/features"
              className="text-gray-700 hover:text-primary transition py-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/templates"
              className="text-gray-700 hover:text-primary transition py-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-primary transition py-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary transition py-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            <div className="flex flex-col space-y-2 pt-3">
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition text-sm font-medium"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('register');
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-light transition text-sm font-medium"
                  >
                    Find Your Coding Partner 👨‍💻
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <Link
                    to="/profile"
                    className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;