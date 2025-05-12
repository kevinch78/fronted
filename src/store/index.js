import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import almacenReducer from './slices/almacenSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    almacenes : almacenReducer
  },
});