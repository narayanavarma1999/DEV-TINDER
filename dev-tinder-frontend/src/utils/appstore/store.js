import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userslice'
import authReducer from './authslice'
import feedReducer from './feedslice'
import connectionReducer from './feedslice'
import requestReducer from './requestslice'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer
    },
})


export default store