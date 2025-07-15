import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  const switchAuthMode = (mode) => {
    setAuthMode(mode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar openAuthModal={openAuthModal} />
      <main className="flex-grow">
        <Hero openAuthModal={openAuthModal} />
        <Features />
      </main>
      <Footer />
      
      {authModalOpen && (
        <AuthModal 
          mode={authMode} 
          onClose={closeAuthModal} 
          openAuthModal={openAuthModal} 
          switchMode={switchAuthMode}
        />
      )}
    </div>
  );
};

export default Home;