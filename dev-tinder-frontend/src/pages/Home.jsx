import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthModal from "../components/AuthModal";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar"
import { fetchUser } from "../utils/constants/login";
import { addUser } from "../utils/appstore/userslice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const getProfile = async () => {
    try {
      const user = await fetchUser(); // Make sure this is async
      if (user) {
        dispatch(addUser(user));
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate('/login');
    }
  }

  useEffect(() => {
    getProfile(); // You were missing the parentheses here
  }, []);

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