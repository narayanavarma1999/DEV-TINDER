import { configureStore, createSlice } from '@reduxjs/toolkit'
import userReducer from './userslice'
import authReducer from './authslice'
import feedReducer from './feedslice'


const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        feed: feedReducer
    },
})


export default store