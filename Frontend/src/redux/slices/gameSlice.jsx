import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const initialState = {

    games: [],
    selectedGame :{},
    favoritesGame : [],
    orderedGame : [],
    error: null,
    loading :false
}

const BASE_URL = "http://localhost:8080/game"
export const getAllGame = createAsyncThunk("getAllGame", async ()=>{
   const response = await  axios.get(`${BASE_URL}/list`);
   return response.data;
})
export const getGameDetails = createAsyncThunk("getGameDetails", async (appId)=>{
    const response = await axios.get(`${BASE_URL}/list/${appId}`);
    return response.data;
})
export const getOrderedGame = createAsyncThunk("getOrderedGame", async ()=>{
    const response = await axios.get(`${BASE_URL}/ordered`);
    return response.data;
})
export const getFavoritesGame= createAsyncThunk("getFavoritesGame", async ()=>{
    const response = await axios.get(`${BASE_URL}/favorites`);
    return response.data;
})
export const gameSlice = createSlice({
    name:"game",
    initialState,
    reducers:{
        clearSelectedGame(state){
            state.selectedGame = null;
            state.error = null;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        }

    },
    extraReducers : (builder)=>{

        builder.addCase(getAllGame.pending, (state)=>{ state.loading = true; state.error = null; })
            .addCase(getAllGame.fulfilled, (state, action)=>{ state.loading = false; state.games = action.payload; })
            .addCase(getAllGame.rejected, (state, action)=>{ state.loading = false; state.error = action.payload || "Oyunlar alınamadı"; })

            .addCase(getGameDetails.pending, (state)=>{ state.loading = true; state.error = null; state.selectedGame = null; })
            .addCase(getGameDetails.fulfilled, (state, action)=>{ state.loading = false; state.selectedGame = action.payload; })
            .addCase(getGameDetails.rejected, (state, action)=>{ state.loading = false; state.error = action.payload || "Detay alınamadı"; })

            .addCase(getFavoritesGame.fulfilled,(state, action)=>{
                state.favoritesGame = action.payload;
                state.games = action.payload;
            })
            .addCase(getOrderedGame.fulfilled, (state, action)=>{
                state.orderedGame = action.payload;
                state.games = action.payload;
            })
    }
})

export const { clearSelectedGame,setSearchQuery} = gameSlice.actions

export default gameSlice.reducer

