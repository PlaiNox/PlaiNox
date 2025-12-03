import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import axiosInstance from "../../api/axiosInstance.js";
const initialState = {

    user : {},
    cart : [],
    order : [],
    game : [],
    favorites : []
}

const BASE_URL = "/users"
export const getCurrentUser = createAsyncThunk("getCurrentUser", async ()=>{
    const response = await axiosInstance.get(`${BASE_URL}/me`);
    return response.data;
})
export const deleteCart = createAsyncThunk("deleteCart", async (id) =>{
    const response = await axiosInstance.delete(`${BASE_URL}/cart/delete/${id}`)
    return id;
})
export const addCart = createAsyncThunk("addCart", async (id)=>{
    const response = await axiosInstance.put(`${BASE_URL}/cart/${id}`)
    return response.data;
})
export const listCart = createAsyncThunk("listCart", async ()=>{
    const response = await axiosInstance.get(`${BASE_URL}/cart/list`)
    return response.data;
})
export const order = createAsyncThunk("order", async ()=>{
    const response = await axiosInstance.put(`${BASE_URL}/order`)
    return response.data;
})
export const libraryGame = createAsyncThunk("libraryGame", async ()=>{
    const response = await axiosInstance.get(`${BASE_URL}/library/list`)
    return response.data;
})
export const favoritesAdd = createAsyncThunk("favoritesAdd", async (id)=>{
    const response = await axiosInstance.put(`${BASE_URL}/favorite/${id}`)
    return response.data;
})
export const favoritesGame = createAsyncThunk("favoritesGame", async ()=>{
    const response = await axiosInstance.get(`${BASE_URL}/favorite/list`)
    return response.data;
})
export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers : (builder)=>{

        builder.addCase(getCurrentUser.fulfilled, (state, action)=>{
            state.user = action.payload;
        })
            .addCase(addCart.fulfilled, (state, action)=>{
                state.cart = action.payload;
            })
            .addCase(deleteCart.fulfilled, (state, action) =>{
                const deletedId = action.payload;
                state.cart = state.cart.filter((c) => c.cart_id !== deletedId);
            })
            .addCase(listCart.fulfilled, (state, action) =>{
                state.cart = action.payload;
            })
            .addCase(order.fulfilled, (state, action)=>{
                state.order = action.payload;
            })
            .addCase(libraryGame.fulfilled, (state, action) =>{
                state.game = action.payload;
            })
            .addCase(favoritesAdd.fulfilled, (state, action) =>{
                state.favorites = action.payload;
            })
            .addCase(favoritesGame.fulfilled, (state, action) =>{
                state.favorites = action.payload;
            })

    }
})

export const { } = userSlice.actions

export default userSlice.reducer

