import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import IntroPage from './components/IntroPage';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import store from './utils/appstore/store';
import ShimmerLoading from './utils/spinner/ShimmerLoadings';
import GlobalShimmerLoader from './utils/spinner/ShimmerLoadings'


const App = () => {
  return (
    <LoadingProvider>
      <Router>
        <AppContent />
      </Router>
    </LoadingProvider>
  );
};

const AppContent = () => {
  const { isLoading, loadingText } = useLoading();

  return (
    <>
      <GlobalShimmerLoader isLoading={isLoading} loadingText={loadingText} />
      
      <div className={isLoading ? 'opacity-30 pointer-events-none' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;