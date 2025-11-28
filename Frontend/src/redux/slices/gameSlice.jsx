/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

export default gameSlice.reducer*/



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const BASE_URL = "http://localhost:8080/game";

// getAllGame (mevcut)
export const getAllGame = createAsyncThunk("game/getAllGame", async (_, { rejectWithValue })=>{
  try{
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  }catch(err){
    return rejectWithValue(err.response?.data || err.message);
  }
})

// getGameDetails
export const getGameDetails = createAsyncThunk("game/getGameDetails", async (appId, { rejectWithValue })=>{
  try{
    const response = await axios.get(`${BASE_URL}/list/${appId}`);
    //console.log("API’den gelen data:", response.data);
    return response.data;
  }catch(err){
    return rejectWithValue(err.response?.data || err.message);
  }
})

const initialState = {
    games: [],
    selectedGame: null,
    loading: false,
    error: null
}

const gameSlice = createSlice({
    name:"game",
    initialState,
    reducers:{
      clearSelectedGame(state){
        state.selectedGame = null;
        state.error = null;
      }
    },
    extraReducers : (builder)=>{
        builder
          .addCase(getAllGame.pending, (state)=>{ state.loading = true; state.error = null; })
          .addCase(getAllGame.fulfilled, (state, action)=>{ state.loading = false; state.games = action.payload; })
          .addCase(getAllGame.rejected, (state, action)=>{ state.loading = false; state.error = action.payload || "Oyunlar alınamadı"; })

          .addCase(getGameDetails.pending, (state)=>{ state.loading = true; state.error = null; state.selectedGame = null; })
          .addCase(getGameDetails.fulfilled, (state, action)=>{ state.loading = false; state.selectedGame = action.payload; })
          .addCase(getGameDetails.rejected, (state, action)=>{ state.loading = false; state.error = action.payload || "Detay alınamadı"; });
    }
})

export const { clearSelectedGame } = gameSlice.actions
export default gameSlice.reducer

