import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import almacenReducer from './slices/almacenSlice'
import authSlice from './slices/authSlice'
import inventoryReducer from './slices/inventorySlice'; // Añadimos el nuevo reducer

export const store = configureStore({
  reducer: {
    products: productReducer,
    almacenes : almacenReducer,
    auth: authSlice, // Añadimos el reducer de autenticación
    inventory: inventoryReducer,
  
  },
});