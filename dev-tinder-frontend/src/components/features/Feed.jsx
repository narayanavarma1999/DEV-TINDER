import React, { useState, useEffect } from 'react';
import {
  HeartIcon,
  XMarkIcon,
  StarIcon,
  UserIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';


const Feed = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // Mock data for demonstration
  const mockProfiles = [
    {
      id: 1,
      name: "Alex",
      age: 28,
      location: "San Francisco, 5 miles away",
      about: "Full-stack developer specializing in React and Node.js. Love open source contributions and hackathons. When not coding, you can find me hiking or playing guitar.",
      interests: ["React", "Node.js", "TypeScript", "GraphQL", "Docker"],
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      ]
    },
    {
      id: 2,
      name: "Sarah",
      age: 25,
      location: "San Francisco, 2 miles away",
      about: "Frontend engineer with a passion for design systems and UI/UX. Currently working on a startup that helps developers build better portfolios. Coffee enthusiast ☕️",
      interests: ["JavaScript", "CSS", "Design Systems", "Figma", "UI/UX"],
      images: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
      ]
    },
    {
      id: 3,
      name: "Jamie",
      age: 30,
      location: "Oakland, 8 miles away",
      about: "DevOps engineer with 5+ years experience. Kubernetes, AWS, and infrastructure as code are my jam. Let's talk about scaling systems and the best tacos in the Bay Area!",
      interests: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Python"],
      images: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      ]
    }
  ];

  // Fetch profiles from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        // const response = await axios.get('your-api-endpoint');
        // setProfiles(response.data);
        setProfiles(mockProfiles); // Using mock data for now
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
    setSwipeDirection(action === 'like' ? 'right' : 'left');
    setIsSwiping(true);

    try {
      if (action === 'like') {
        // const response = await axios.post('your-api-endpoint/likes', {
        //   profileId: currentProfile.id
        // });

        // Mock response
        const mockResponse = { data: { isMatch: Math.random() > 0.7 } };

        if (mockResponse.data.isMatch) {
          setMatchedProfile(currentProfile);
          setShowMatchModal(true);
          setConnections([...connections, currentProfile]);
        }
      }

      setTimeout(() => {
        if (currentProfileIndex < profiles.length - 1) {
          setCurrentProfileIndex(currentProfileIndex + 1);
          setCurrentImageIndex(0);
        } else {
          // In a real app, you would fetch more profiles
          setCurrentProfileIndex(0);
          setCurrentImageIndex(0);
        }
        setIsSwiping(false);
        setSwipeDirection(null);
      }, 500);
    } catch (error) {
      console.error('Error handling swipe:', error);
      setIsSwiping(false);
      setSwipeDirection(null);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 flex items-center justify-center relative overflow-hidden">
        {/* Matching background elements from intro page */}
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
            Finding amazing developers for you...
          </motion.p>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 flex items-center justify-center relative overflow-hidden">
        {/* Matching background elements from intro page */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-ping"></div>

        <div className="text-center text-white p-6 max-w-md z-10">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-4"
          >
            No more developers nearby
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
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg flex items-center justify-center gap-2 mx-auto bg-white text-purple-700 hover:bg-purple-100"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 text-white relative overflow-hidden">
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
        >
          <UserIcon className="h-6 w-6" />
          <div className=''>
            
          </div>
        </motion.button>

        <div className="text-center">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">DevTinder</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-white/70"
          >
            Connect with fellow developers
          </motion.p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="btn btn-circle btn-ghost text-white hover:bg-white/10"
        >
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
        </motion.button>
      </motion.header>

      {/* Profile Card */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-4 pb-24">
        <AnimatePresence>
          <motion.div
            key={currentProfileIndex}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              x: isSwiping ? (swipeDirection === 'right' ? 500 : -500) : 0,
              rotate: isSwiping ? (swipeDirection === 'right' ? 15 : -15) : 0
            }}
            exit={{ scale: 0.9, opacity: 0, x: swipeDirection === 'right' ? 500 : -500 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md h-[75vh]"
          >
            {/* Card with glass morphism effect */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              {/* Profile Image */}
              <div className="relative h-3/4 w-full">
                <img
                  src={currentProfile.images[currentImageIndex]}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Like/Skip indicators */}
                {isSwiping && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: swipeDirection === 'right' ? 1 : 0,
                        x: swipeDirection === 'right' ? 0 : -50
                      }}
                      className="absolute top-10 left-10 bg-green-500/90 text-white px-4 py-2 rounded-full shadow-lg"
                    >
                      <HeartIcon className="h-6 w-6 inline mr-2" />
                      <span className="font-bold">LIKE</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: swipeDirection === 'left' ? 1 : 0,
                        x: swipeDirection === 'left' ? 0 : 50
                      }}
                      className="absolute top-10 right-10 bg-red-500/90 text-white px-4 py-2 rounded-full shadow-lg"
                    >
                      <XMarkIcon className="h-6 w-6 inline mr-2" />
                      <span className="font-bold">SKIP</span>
                    </motion.div>
                  </>
                )}

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
                {currentProfile?.images?.length > 1 && (
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm btn-ghost text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </motion.button>
                )}

                {/* Next image button */}
                {currentProfile?.images?.length > 1 && (
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm btn-ghost text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </motion.button>
                )}
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
        </AnimatePresence>
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