import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import ShimmerLoading from '../spinner/ShimmerLoadings';
import LoginPrompt from '../popups/LoginPopUp';

const AuthWrapper = ({ children }) => {

  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <ShimmerLoading />
  }

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  return <>{children}</>;
};

export default AuthWrapper