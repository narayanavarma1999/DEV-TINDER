import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Features from "../components/features/Features";
import Hero from "../components/features/Hero";
import AuthModal from "../components/main/AuthModal";
import Footer from "../components/main/Footer";
import Navbar from "../components/main/Navbar";
import { loginSuccess, logoutSuccess } from "../utils/appstore/authslice";
import { addUser, removeUser } from "../utils/appstore/userslice";
import { fetchUser, logoutUser } from "../utils/services/api.service";
import ShimmerLoading from "../utils/spinner/ShimmerLoadings";



const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const userData = useSelector((store) => store.user)

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = await fetchUser();
      if (user) {
        dispatch(addUser(user));
        dispatch(loginSuccess(user))
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate('/redirect');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(removeUser());
      dispatch(logoutSuccess());
      navigate('/logout')
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  useEffect(() => {
    if (!userData) {
      getProfile();
    }
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
      <Navbar
        openAuthModal={openAuthModal}
        handleLogout={handleLogout}
      />
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