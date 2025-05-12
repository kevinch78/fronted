import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:8080/api/almacenes/';

// Acción asíncrona para obtener almacenes desde la API
export const fetchAlmacenes = createAsyncThunk('almacenes/fetchAlmacenes', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los almacenes');
  }
  const data = await response.json();
  return data.map((store) => ({
    id: store.id || Date.now(), // Asegúrate de que la API devuelva un ID, si no, usa un timestamp temporal
    name: store.name,
    direccion: store.address,
    descripcion: store.detail,
    image: store.image || 'https://via.placeholder.com/150', // Placeholder si no hay imagen
    pagaPublicidad: store.pagaPublicidad || false,
  }));
});

const almacenesSlice = createSlice({
  name: 'almacenes',
  initialState: {
    allItems: [],
    items: [],
    currentPage: 1,
    itemsPerPage: 5,
    selectedAlmacen: null,
    loading: false,
    error: null,
  },
  reducers: {
    loadMoreItems: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      state.items = state.allItems.slice(0, end);
      state.currentPage += 1;
    },
    selectAlmacen: (state, action) => {
      state.selectedAlmacen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlmacenes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlmacenes.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload;
        state.items = action.payload.slice(0, state.itemsPerPage); // Cargar los primeros almacenes
      })
      .addCase(fetchAlmacenes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loadMoreItems, selectAlmacen } = almacenesSlice.actions;
export default almacenesSlice.reducer;