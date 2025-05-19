import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    products: [], // Lista de productos del almacén
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    adjustStock: (state, action) => {
      const { id, quantity, reason } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index].stock += quantity;
        console.log(`Ajuste de stock: ${reason}, Cantidad: ${quantity}`);
      }
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, adjustStock } = inventorySlice.actions;
export default inventorySlice.reducer;