import axios from 'axios'
import { EMAIL_EXISTS } from '../constants/constants';

const loginUrl = import.meta.env.VITE_REACT_APP_HOST + import.meta.env.VITE_REACT_APP_LOGIN;
const registerUrl = import.meta.env.VITE_REACT_APP_HOST + import.meta.env.VITE_REACT_APP_REGISTER;
const profileUrl = import.meta.env.VITE_REACT_APP_HOST + import.meta.env.VITE_REACT_APP_PROFILE;

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
        const response = await axios.get(profileUrl, { withCredentials: true });
        const user = response.data;
        return user
    } catch (error) {
        console.error(`Error: ${error.message}`)
        return null;
    }   
}

