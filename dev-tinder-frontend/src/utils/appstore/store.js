import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userslice'
import authReducer from './authslice'
import feedReducer from './feedslice'
import connectionReducer from './feedslice'


const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        feed: feedReducer,
        connections: connectionReducer
    },
})


export default store