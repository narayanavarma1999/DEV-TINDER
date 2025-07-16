import { motion } from "framer-motion";
import DevCommunityHero from "./DevCommunityHero";
import { useSelector } from "react-redux";

const Hero = ({ openAuthModal }) => {

  const user = useSelector((store) => store.user);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-primary/5 via-white to-primary-light/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Welcome to DevTinder, <br className="hidden md:block" />
            <span className="text-primary">Let's Code, Connect, Collaborate</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            <h1 className="text-5xl font-extrabold mb-6 animate-fade-in-down">
              🦄 DevTinder: <span className="text-yellow-300">Where Coders Connect 💬</span>
            </h1>
          </motion.div>
          
          <DevCommunityHero />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            {!user && <button
              onClick={() => openAuthModal('register')}
              className="px-8 py-4 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary-light transition shadow-lg hover:shadow-xl"
            >
              Find Your Coding Partner 👨‍💻
            </button>}

          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-light/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;