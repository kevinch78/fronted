import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    role: 'user', // Por defecto 'user', cambiará a 'almacen' si es un almacén
    storeData: {
      name: '',
      address: '',
      contact: '',
      schedule: '',
      logo: '',
    },
    inventory: [], // Lista de productos
    advertising: {
      activePlan: false,
      campaigns: [],
    },
    reservations: [],
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user || { email: action.payload.email, name: action.payload.name };
      state.role = action.payload.role || 'user'; // Añadimos rol
      state.storeData = action.payload.storeData || state.storeData; // Datos del almacén
      state.inventory = action.payload.inventory || state.inventory;
      state.advertising = action.payload.advertising || state.advertising;
      state.reservations = action.payload.reservations || state.reservations;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = 'user';
      state.storeData = { name: '', address: '', contact: '', schedule: '', logo: '' };
      state.inventory = [];
      state.advertising = { activePlan: false, campaigns: [] };
      state.reservations = [];
    },
    updateStoreData: (state, action) => {
      state.storeData = { ...state.storeData, ...action.payload };
    },
    addProduct: (state, action) => {
      state.inventory.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.inventory.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.inventory[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.inventory = state.inventory.filter((p) => p.id !== action.payload);
    },
    toggleAdvertising: (state, action) => {
      state.advertising.activePlan = action.payload;
    },
    addCampaign: (state, action) => {
      state.advertising.campaigns.push(action.payload);
    },
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
  },
});

export const { login, logout, updateStoreData, addProduct, updateProduct, deleteProduct, toggleAdvertising, addCampaign, addReservation } = authSlice.actions;
export default authSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: false,
//     user: null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload; // Guardar datos del usuario (simulación)
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;