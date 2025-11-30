import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../redux/slices/gameSlice.jsx'
import authReducer from '../redux/slices/authenticationSlice.jsx'
import userReducer from '../redux/slices/userSlice.jsx'
export const store = configureStore({
    reducer: {

        game : gameReducer,
        auth : authReducer,
        user : userReducer
    },
})