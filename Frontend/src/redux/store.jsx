import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../redux/slices/gameSlice.jsx'
import authReducer from '../redux/slices/authenticationSlice.jsx'
import userReducer from '../redux/slices/userSlice.jsx'
import cartReducer from '../redux/slices/cartSlice.jsx'
import favoriteReducer from '../redux/slices/favoriteSlice.jsx'
import libraryReducer from '../redux/slices/librarySlice.jsx'

export const store = configureStore({
    reducer: {

        game : gameReducer,
        auth : authReducer,
        user : userReducer,
        cart: cartReducer,
        favorite: favoriteReducer,
        library: libraryReducer
    },
})