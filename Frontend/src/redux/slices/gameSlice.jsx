import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const initialState = {

    games: [],
    selectedGame :{}
}

const BASE_URL = "http://localhost:8080/game"
export const getAllGame = createAsyncThunk("getAllGame", async ()=>{
   const response = await  axios.get(`${BASE_URL}/list`);
   return response.data;
})
export const gameSlice = createSlice({
    name:"game",
    initialState,
    reducers:{

    },
    extraReducers : (builder)=>{

        builder.addCase(getAllGame.fulfilled, (state,aciton)=>{
            state.games = aciton.payload;
        })
    }
})

export const { } = gameSlice.actions

export default gameSlice.reducer

