import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition-all">DevTinder</Link>
                <div className="flex items-center gap-4">
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                    <div className="avatar">
                        <div className="w-8 rounded-full ring ring-white ring-offset-2">
                            <img src="https://api.dicebear.com/7.x/identicon/svg?seed=dev" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
