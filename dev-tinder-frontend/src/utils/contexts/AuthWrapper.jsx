import { useSelector } from 'react-redux';
import LoginPrompt from '../popups/LoginPopUp';

const AuthWrapper = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(`isAuthenticated:${isAuthenticated}`)
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  return <>{children}</>;
};

export default AuthWrapper;