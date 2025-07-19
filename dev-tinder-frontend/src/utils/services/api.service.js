import axios from 'axios'
import { EMAIL_EXISTS, VITE_REACT_APP_HOST, VITE_REACT_APP_LOGIN, VITE_REACT_APP_REGISTER, VITE_REACT_APP_PROFILE, VITE_REACT_APP_LOGOUT, VITE_REACT_APP_FEED, VITE_REACT_APP_EDIT_PROFILE, VITE_REACT_APP_IMAGE_UPLOAD, VITE_REACT_APP_USER_CONNECTIONS } from '../constants/constants'


const loginUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_LOGIN;
const registerUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_REGISTER;
const logoutUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_LOGOUT;
const feedUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_FEED;
const profileLoginUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_PROFILE;
const editProfileUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_EDIT_PROFILE;
const imageUploadUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_IMAGE_UPLOAD;
const userConnectionsUrl = VITE_REACT_APP_HOST + VITE_REACT_APP_USER_CONNECTIONS;

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
        console.log(`fetch user error:${error.message}`)
    }
}


export const capitalizeFirstName = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const logoutUser = async () => {
    try {
        const response = await axios.get(logoutUrl, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(`Error while logout:${error.message}`)
    }
}

export const getUserFeed = async () => {
    try {
        const response = await axios.get(feedUrl, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(`Error while fetching details:${error.message}`)
    }
}


export const editProfile = async (data) => {
    try {
        const response = await axios.patch(editProfileUrl, data, {
            withCredentials: true
        });
        return response.data
    } catch (error) {
        console.error("Error while updating profile:", error.message);
    }
};


export const uploadImage = async (formData) => {
    try {
        const response = await axios.post(imageUploadUrl, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}


export const fetchUserConnections = async () => {
    try {
        const response = await axios.get(userConnectionsUrl, { withCredentials: true });
        return response.data
    } catch (error) {
        console.log(`error while fetching connections:${error.message}`)
    }
}