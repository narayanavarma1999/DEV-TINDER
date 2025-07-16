import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FeedNavigationButton() {

  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden rounded-full"
    >
      <h1 className='text-8xl mb-10 mr-12'>🚀 Explore Your Feed</h1>
      <button
        onClick={() => navigate('/feed')}
        className="relative z-10 px-10 py-5 text-xl font-bold text-white
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  rounded-full border-2 border-white/20
                  shadow-lg hover:shadow-xl hover:shadow-purple-500/40
                  transition-all duration-300 mb-24"
      >
        Enter Your Feed
      </button>
      <div className="absolute inset-0 flex justify-around items-center pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="block w-1 h-1 bg-white rounded-full"
            style={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 40 - 20
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}