import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './components/features/Feed';
import Home from './pages/Home';
import IntroPage from './pages/IntroPage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import store from './utils/appstore/store';
import { AuthProvider } from './utils/contexts/AuthContext';
import AuthWrapper from './utils/contexts/AuthWrapper';
import LoginPrompt from './utils/popups/LoginPopUp';
import ShimmerLoading from './utils/spinner/ShimmerLoadings';

export default function App() {
  return (
    <BrowserRouter basename='/'>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/feed" element={<AuthWrapper><Feed /></AuthWrapper>} />
            <Route path="/redirect" element={<LoginPrompt />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/lazy" element={<ShimmerLoading />} />
            <Route path="/check" element={<LoginPrompt />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}