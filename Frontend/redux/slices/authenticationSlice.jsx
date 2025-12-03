import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const initialState = {
    user : {},
    loginResponse : []
}

const BASE_URL = "http://localhost:8080/auth"
export const register = createAsyncThunk("register", async (request)=>{
    const response = await axios.post(`${BASE_URL}/signup`,request)
    return response.data;
})
export const authenticate = createAsyncThunk("authenticate",async (request)=>{
    const response = await axios.post(`${BASE_URL}/login`,request)
    const data =  response.data;
    localStorage.setItem("token", data.token);
    return data;
})
export const verify = createAsyncThunk("verify", async (request)=>{
    const response = await axios.post(`${BASE_URL}/verify`,request)
    return response.data;
})

export const resend = createAsyncThunk("resend", async (email)=>{
    const response = await axios.post(`${BASE_URL}/resend?email=${email}`);
    return response.data;
});

export const authenticaitonSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    },
    extraReducers : (builder)=>{

        builder
            .addCase(register.fulfilled, (state, action)=>{
                state.user = action.payload;
            })
            .addCase(authenticate.fulfilled, (state, action) =>{
                state.loginResponse = action.payload;
            })
    }
})

export const { } = authenticaitonSlice.actions

export default authenticaitonSlice.reducer

