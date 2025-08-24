import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserConnections } from '../../utils/services/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../../utils/appstore/connectionslice,js';

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const dispatch = useDispatch();

  const connectionsData = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchUserConnections();
      setConnections(response.data);
      dispatch(addConnections(response.data));
    } catch (err) {
      console.error('Error fetching connections:', err);
      setError('Failed to load connections. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true)
      if (!connectionsData) {
        fetchConnections();
      } else {
        setConnections(connectionsData);
      }
    } catch (error) {
      console.log(`error while fetching connections:${error.message}`)
    } finally {
      setIsLoading(false)
    }

  }, []);

  const handleUnmatch = (id) => {
    // Implement unmatch logic
    setConnections(connections.filter(conn => conn._id !== id));
  };

  const filteredConnections = activeTab === 'recent'
    ? connections.slice(0, 3)
    : connections;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <div className="text-center z-10 px-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-white/80 border-t-transparent rounded-full mx-auto relative"
          >
            <motion.div
              className="absolute -inset-1 rounded-full border-2 border-white/30 animate-ping"
              style={{ animationDelay: '0.3s' }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl font-medium text-white/90 tracking-wide"
          >
            Loading your connections...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="mt-2 text-sm text-white/60"
          >
            Finding your perfect matches
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
        </div>

        <div className="text-center text-white p-8 max-w-md z-10 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-400/50">
              <XMarkIcon className="h-10 w-10 text-red-400" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-pink-300"
          >
            Connection Error
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6 text-white/80"
          >
            {error}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-lg rounded-full px-8 shadow-lg flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-none"
            onClick={fetchConnections}
          >
            <ArrowPathIcon className="h-5 w-5" />
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <div className="text-center text-white p-8 max-w-md z-10 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-pink-400/50">
              <HeartIcon className="h-10 w-10 text-pink-400" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-yellow-300"
          >
            No Connections Yet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6 text-white/80"
          >
            Keep swiping to find your perfect match!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-lg rounded-full px-8 shadow-lg flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-none"
            onClick={() => window.location.href = '/feed'}
          >
            <SparklesIcon className="h-5 w-5" />
            Start Swiping
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 p-6 pb-4"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-circle btn-ghost text-white hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </motion.button>

          <div className="text-center">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300"> Your Connections</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-white/70 mt-1"
            >
              {connections.length} {connections.length === 1 ? 'match' : 'matches'}
            </motion.p>
          </div>

          <div className="w-10"></div>
        </div>


        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'all'
              ? 'bg-white text-purple-800 shadow-md'
              : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            All Connections
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'recent'
              ? 'bg-white text-purple-800 shadow-md'
              : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            Recent
          </button>
        </div>
      </motion.header>

      <div className="relative z-10 px-5 pb-20">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 gap-4"
          >
            {filteredConnections.map((connection, index) => (
              <motion.div
                key={connection._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center w-2/4 ml-96"
              >
                <div className="flex-shrink-0 mr-4 relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 relative">
                    <img
                      src={connection?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80'}
                      alt={connection?.fullName}
                      className="w-full h-full object-cover"
                    />
                    {activeTab === 'recent' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-baseline">
                    <h3 className="text-sm font-semibold text-white">{connection?.fullName}</h3>
                    <span className="ml-2 text-white/70">{connection?.age}</span>
                  </div>
                  {connection?.location && <p className="text-white/80 text-sm flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {connection?.location}
                  </p>}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {connection?.interests?.slice(0, 3).map((interest, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="badge badge-sm border-white/20 bg-white/10 text-white/90 font-normal px-2.5 py-1.5"
                      >
                        {interest}
                      </motion.span>
                    ))}
                    {connection.interests?.length > 3 && (
                      <span className="badge badge-sm border-white/20 bg-white/5 text-white/60 font-normal px-2.5 py-1.5">
                        +{connection.interests.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-3">
                </div>
                <Link to={"/chat/" + connection._id}>
                  <button className="btn btn-primary">Chat</button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating action button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-20 btn btn-circle btn-lg shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 border-none text-white"
        onClick={() => window.location.href = '/feed'}
      >
        <SparklesIcon className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default Connections;