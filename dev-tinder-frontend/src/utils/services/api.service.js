import axios from 'axios'
import { EMAIL_EXISTS, VITE_REACT_APP_HOST, VITE_REACT_APP_LOGIN, VITE_REACT_APP_REGISTER, VITE_REACT_APP_PROFILE } from '../constants/constants'


const loginUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_LOGIN;
const registerUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_REGISTER;
const profileLoginUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_PROFILE;

function parseFullName(name) {

    const trimmedName = name.trim().replace(/\s+/g, ' ');
    const nameParts = trimmedName.split(' ');

    const fullName = trimmedName;
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    return {
        fullName,
        firstName,
        lastName,
    };
}

export const loginUser = async (emailId, password) => {
    try {
        const response = await axios.post(`${loginUrl}`, { emailId, password }, { withCredentials: true });
        const data = await response.data
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const registerUser = async (name, emailId, password) => {
    try {
        const { fullName, firstName, lastName } = parseFullName(name)
        const response = await axios.post(`${registerUrl}`, { fullName, firstName, lastName, emailId, password });
        const data = await response.data
        if (response.data === EMAIL_EXISTS) {
            return { success: false, message: data || 'Registration failed' };
        }
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}


export const fetchUser = async () => {
    try {
        const user = await axios.get(profileLoginUrl, { withCredentials: true })
        return user.data
    } catch (error) {
        return null
    }
}


export const capitalizeFirstName = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}