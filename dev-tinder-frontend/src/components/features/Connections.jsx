import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { fetchUserConnections } from '../../utils/services/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../../utils/appstore/connectionslice,js';

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  const connectionsData = useSelector((store) => store.connections)

  const fetchConnections = async () => {

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchUserConnections()
      setConnections(response);
      dispatch(addConnections(response))
    } catch (err) {
      console.error('Error fetching connections:', err);
      setError('Failed to load connections. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (!connectionsData) {
      fetchConnections();
    } else {
      setConnections(connectionsData)
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 flex items-center justify-center relative overflow-hidden">
        {/* Matching background elements */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-ping"></div>

        <div className="text-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xl font-medium text-white"
          >
            Loading your connections...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 flex items-center justify-center relative overflow-hidden">
        {/* Matching background elements */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-ping"></div>

        <div className="text-center text-white p-6 max-w-md z-10">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-4"
          >
            Oops!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6"
          >
            {error}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg flex items-center justify-center gap-2 mx-auto bg-white text-purple-700 hover:bg-purple-100"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 flex items-center justify-center relative overflow-hidden">
        {/* Matching background elements */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-ping"></div>

        <div className="text-center text-white p-6 max-w-md z-10">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-4"
          >
            No Connections Yet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6"
          >
            Keep swiping to find your perfect dev match!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg flex items-center justify-center gap-2 mx-auto bg-white text-purple-700 hover:bg-purple-100"
            onClick={() => window.location.href = '/feed'}
          >
            Start Swiping
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 relative overflow-hidden">
      {/* Matching background elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-ping"></div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 p-4 flex justify-between items-center"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="btn btn-circle btn-ghost text-white hover:bg-white/10"
          onClick={() => window.history.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <div className="text-center">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">My Connections</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-white/70"
          >
            {connections?.length} {connections?.length === 1 ? 'match' : 'matches'}
          </motion.p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="btn btn-circle btn-ghost text-white hover:bg-white/10 invisible"
        >
          <UserIcon className="h-6 w-6" />
        </motion.button>
      </motion.header>

      {/* Connections List */}
      <div className="relative z-10 px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-4"
        >
          {connections?.map((connection, index) => (
            <motion.div
              key={connection._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 flex items-center"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                  <img
                    src={connection.images?.[0] || 'https://via.placeholder.com/150'}
                    alt={connection.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">{connection.fullName}, {connection.age}</h3>
                <p className="text-white/80">{connection.location}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {connection.interests?.slice(0, 3).map((interest, i) => (
                    <span key={i} className="badge badge-xs border-white/30 bg-white/10 text-white">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 ml-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-circle btn-sm btn-ghost text-white hover:bg-white/20"
                  onClick={() => {/* Navigate to chat */ }}
                >
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-circle btn-sm btn-ghost text-white hover:bg-red-500/50"
                  onClick={() => handleUnmatch(connection.id)}
                >
                  <XMarkIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Connections;