import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Favori Listesini Getirir
export const getFavorites = createAsyncThunk('favorite/getFavorites', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/users/favorite/list`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Favori listesi döner
    } catch (error) {
        return rejectWithValue("Favoriler alınamadı");
    }
});

// Ekler / Çıkarır
export const addToFavorites = createAsyncThunk('favorite/addToFavorites', async (gameId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:8080/users/favorite/${gameId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Güncel liste döner
    } catch (error) {
        return rejectWithValue("İşlem başarısız");
    }
});

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: { favorites: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                alert("Favori listeniz güncellendi!");
            });
    }
});
export default favoriteSlice.reducer;