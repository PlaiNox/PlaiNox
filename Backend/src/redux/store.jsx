import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../redux/slices/gameSlice.jsx'
export const store = configureStore({
    reducer: {

        game : gameReducer
    },
})