import React, { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  XMarkIcon, 
  StarIcon, 
  UserIcon, 
  BoltIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getUserFeed } from '../../utils/services/api.service';

const Feed = () => {

  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);

  // Fetch profiles from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await getUserFeed()
        setProfiles(response.data);
        setCurrentProfileIndex(0);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = async (action) => {
    if (profiles.length === 0) return;

    const currentProfile = profiles[currentProfileIndex];
    
    try {
      if (action === 'like') {
        const response = await axios.post('https://api.yourservice.com/likes', {
          profileId: currentProfile.id
        });

        if (response.data.isMatch) {
          setMatchedProfile(currentProfile);
          setShowMatchModal(true);
          setConnections([...connections, currentProfile]);
        }
      }

      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
        setCurrentImageIndex(0);
      } else {
        const response = await axios.get('https://api.yourservice.com/profiles');
        setProfiles(response.data);
        setCurrentProfileIndex(0);
        setCurrentImageIndex(0);
      }
    } catch (error) {
      console.error('Error handling swipe:', error);
    }
  };

  const nextImage = () => {
    if (currentProfileIndex >= profiles.length) return;
    if (currentImageIndex < profiles[currentProfileIndex]?.images?.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 flex items-center justify-center">
        <div className="text-center">
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
            Finding amazing people for you...
          </motion.p>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 flex items-center justify-center">
        <div className="text-center text-white p-6 max-w-md">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-4"
          >
            No more profiles nearby
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6"
          >
            We've run out of potential matches in your area.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg flex items-center justify-center gap-2 mx-auto"
            onClick={() => window.location.reload()}
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh Profiles
          </motion.button>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-ping"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-300 opacity-15 rounded-full blur-xl animate-pulse"></div>

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
        >
          <UserIcon className="h-6 w-6" />
        </motion.button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">DevMatch</span>
          </h1>
          <p className="text-xs text-white/70">Find your coding partner</p>
        </div>
        
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="btn btn-circle btn-ghost text-white hover:bg-white/10"
        >
          <BoltIcon className="h-6 w-6" />
        </motion.button>
      </motion.header>

      {/* Profile Card */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-4 pb-24">
        <motion.div 
          key={currentProfileIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md h-[70vh]"
        >
          {/* Card with glass morphism effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Profile Image */}
            <div className="relative h-3/4 w-full">
              <img 
                // src={currentProfile.images[currentImageIndex]} 
                alt={currentProfile.fullName}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              {/* Profile info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-bold text-white"
                    >
                      {currentProfile.name}, <span className="font-medium">{currentProfile.age}</span>
                    </motion.h2>
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center mt-1"
                    >
                      <MapPinIcon className="h-5 w-5 mr-1 text-yellow-300" />
                      <span className="text-white/90">{currentProfile.location}</span>
                    </motion.div>
                  </div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex space-x-2"
                  >
                    {currentProfile?.interests?.slice(0, 3).map((interest, index) => (
                      <span 
                        key={index} 
                        className="badge badge-sm border-white/30 bg-white/10 text-white"
                      >
                        {interest}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              {/* Image navigation indicators */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-2">
                {currentProfile?.images?.map((_, index) => (
                  <motion.div 
                    key={index}
                    initial={{ width: '0.5rem' }}
                    animate={{ width: currentImageIndex === index ? '1.5rem' : '0.5rem' }}
                    className={`h-1.5 rounded-full ${currentImageIndex === index ? 'bg-yellow-300' : 'bg-white/50'}`}
                  ></motion.div>
                ))}
              </div>
              
              {/* Previous image button */}
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm btn-ghost text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </motion.button>
              
              {/* Next image button */}
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm btn-ghost text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </motion.button>
            </div>
            
            {/* Profile details */}
            <div className="p-6 h-1/4 overflow-y-auto">
              <motion.h3 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-semibold text-lg text-white mb-2"
              >
                About
              </motion.h3>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80"
              >
                {currentProfile.about}
              </motion.p>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <h3 className="font-semibold text-lg text-white mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile?.interests?.map((interest, index) => (
                    <motion.span 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="badge border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-10 flex justify-center items-center gap-6 p-6 bg-gradient-to-t from-purple-700/80 via-pink-500/50 to-transparent"
      >
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('skip')}
          className="btn btn-circle btn-lg bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-lg"
        >
          <XMarkIcon className="h-8 w-8" />
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn btn-circle btn-lg bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-lg"
        >
          <StarIcon className="h-6 w-6 text-yellow-300" />
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('like')}
          className="btn btn-circle btn-lg bg-gradient-to-br from-yellow-300 to-pink-400 border-none text-white shadow-lg hover:shadow-xl"
        >
          <HeartIcon className="h-8 w-8" />
        </motion.button>
      </motion.div>

      {/* Match Modal */}
      {showMatchModal && matchedProfile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mb-6"
            >
              <HeartIcon className="h-16 w-16 mx-auto text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">It's a Match!</h2>
            <p className="text-white/90 mb-6">You and {matchedProfile.name} have liked each other.</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="w-24 h-24 rounded-full border-4 border-white overflow-hidden"
              >
                <img 
                  src={matchedProfile.images[0]} 
                  alt={matchedProfile.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="w-24 h-24 rounded-full border-4 border-white overflow-hidden"
              >
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <UserIcon className="h-12 w-12 text-gray-500" />
                </div>
              </motion.div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMatchModal(false)}
                className="btn btn-ghost border-white text-white hover:bg-white/10"
              >
                Keep Browsing
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-white text-pink-600 hover:bg-white/90"
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Feed;