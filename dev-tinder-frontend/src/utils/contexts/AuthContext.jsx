import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../appstore/authslice';
import { addUser } from '../appstore/userslice';
import { fetchUser } from '../services/api.service';
import ShimmerLoading from '../spinner/ShimmerLoadings';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userData = useSelector(store => store.user)


    const getProfile = async () => {
        try {
            setIsLoading(true);
            const user = await fetchUser();
            if (user) {
                dispatch(addUser(user));
                setUser(user)
                setIsAuthenticated(true)
                dispatch(loginSuccess(user))
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            navigate('/redirect');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!userData) {
            getProfile();
        }else{
            setUser(userData);
            setIsAuthenticated(true);
            setIsLoading(false);
        }
    }, [userData]);

    if (isLoading) {
        return <ShimmerLoading />;
    }

    const value = {
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};