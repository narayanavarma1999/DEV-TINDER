import { Provider } from 'react-redux';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import IntroPage from './components/IntroPage';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import store from './utils/appstore/store';
import ShimmerLoading from './utils/spinner/ShimmerLoadings';

export default function App() {

  return (
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/lazy" element={<ShimmerLoading/>} />
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/feed"
              element={<Feed />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}



