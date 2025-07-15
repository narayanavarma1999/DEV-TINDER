import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IntroPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

            {/* Floating background circles */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-ping"></div>

            <header className="text-center z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4"
                >
                    Welcome to <span className="text-yellow-300">DevTinder</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-xl md:text-2xl font-light drop-shadow-sm max-w-xl mx-auto"
                >
                    A space where devs connect, create, and maybe even commit — together 💫
                </motion.p>
            </header>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-10 z-10"
            >
                <span className="loading loading-dots loading-lg text-white scale-150"></span>
            </motion.div>
        </div>
    );
};

export default IntroPage;
