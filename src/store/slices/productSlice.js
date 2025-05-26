// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_URL = 'http://localhost:8081/api/productos';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:8081/api/productos'); // Reemplaza con tu endpoint
  return response.data; // Asegúrate de que esto sea un array
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], // Inicializa como array vacío
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Asegúrate de que action.payload sea un array
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;