import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/users";

// Sepet Verilerini Getirme
export const getCart = createAsyncThunk('cart/getCart', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/cart/list`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue("Sepet yüklenemedi");
    }
});

// Sepete Ekleme
export const addToCart = createAsyncThunk('cart/addToCart', async (gameId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${BASE_URL}/cart/${gameId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Hata");
    }
});

// Sepetten Silme
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (gameId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        // Backend: @DeleteMapping("/cart/delete/{id}")
        await axios.delete(`${BASE_URL}/cart/delete/${gameId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return gameId;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Silinemedi");
    }
});

// Satın Alma
export const checkoutCart = createAsyncThunk('cart/checkout', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        // Backend: @PutMapping("/order")
        const response = await axios.put(`${BASE_URL}/order`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Sipariş oluşturulamadı");
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Sepet Verilerini Getirme
            .addCase(getCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            // Ekleme İşlemi
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
                alert("Sepete eklendi!");
            })
            // Silme İşlemi
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.game.appId !== action.payload);
            })
            // Satın Alma İşlemi
            .addCase(checkoutCart.fulfilled, (state) => {
                state.items = [];
                alert("Satın alma başarılı! Kütüphanenize eklendi.");
            })
            .addCase(checkoutCart.rejected, (state, action) => {
                alert("Hata: " + (action.payload || "İşlem başarısız."));
            });
    }
});

export default cartSlice.reducer;