import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from "../utils/constants/login";
import { addUser } from "../utils/appstore/userslice";
import Navbar from "../components/main/Navbar";
import Hero from "../components/features/Hero";
import Features from "../components/features/Features";
import Footer from "../components/main/Footer";
import AuthModal from "../components/main/AuthModal";
import ShimmerLoading from "../utils/spinner/ShimmerLoadings";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = await fetchUser();
      if (user) {
        dispatch(addUser(user));
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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

  if (loading) {
    return <ShimmerLoading />; 
  }

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