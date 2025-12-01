import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/users";

// Kütüphane Listesini Getir
export const getLibrary = createAsyncThunk('library/getLibrary', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/library/list`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Satın alınan oyunların listesi döner
    } catch (error) {
        return rejectWithValue("Kütüphane yüklenemedi");
    }
});

const librarySlice = createSlice({
    name: 'library',
    initialState: { games: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLibrary.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLibrary.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload;
            })
            .addCase(getLibrary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default librarySlice.reducer;