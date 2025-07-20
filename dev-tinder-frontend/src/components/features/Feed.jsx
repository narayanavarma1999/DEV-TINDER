import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  HeartIcon,
  XMarkIcon,
  StarIcon,
  UserIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserFeed, sendRequest } from '../../utils/services/api.service';
import { addFeed, removeUserFromFeed } from '../../utils/appstore/feedslice'
import { SEND_REQUEST_STATUS_IGNORED, SEND_REQUEST_STATUS_INTERESTED } from '../../utils/constants/constants';


const Feed = () => {

  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await getUserFeed();
        setProfiles(response.data);
        dispatch(addFeed(response.data))
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = async (action, userId) => {
    if (profiles.length === 0) return;

    setSwipeDirection(action === SEND_REQUEST_STATUS_INTERESTED ? 'right' : 'left');
    setIsSwiping(true);
    dispatch(removeUserFromFeed(userId))
    setProfiles(prev => prev.filter(req => req._id !== userId))
    await sendRequest(action, userId)

    try {

      setTimeout(() => {
        if (currentProfileIndex < profiles.length - 1) {
          setCurrentProfileIndex(currentProfileIndex + 1);
          setCurrentImageIndex(0);
        } else {
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
          </div>
        </motion.header>


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
            <span className="bg-clip-text text-3xl text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">DevTinder</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-clip-text text-sm  text-transparent font-semibold text-white/70"
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
                  src={currentProfile?.images[currentImageIndex] || 'data:image/jpeg;base64,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'}
                  alt={currentProfile.fullName}
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
                        {currentProfile?.fullName}, <span className="font-medium">{currentProfile?.age}</span>
                      </motion.h2>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center mt-1"
                      >
                        <MapPinIcon className="h-5 w-5 mr-1 text-yellow-300" />
                        <span className="text-white/90">{currentProfile?.location}</span>
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
                  {currentProfile?.about}
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
          onClick={() => handleSwipe(SEND_REQUEST_STATUS_IGNORED, currentProfile._id)}
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
          onClick={() => handleSwipe(SEND_REQUEST_STATUS_INTERESTED, currentProfile._id)}
          className="btn btn-circle btn-lg bg-gradient-to-br from-yellow-300 to-pink-400 border-none text-white shadow-lg hover:shadow-xl"
        >
          <HeartIcon className="h-8 w-8" />
        </motion.button>
      </motion.div>

    </div>
  );
};

export default Feed;