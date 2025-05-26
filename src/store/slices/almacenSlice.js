// almacenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const almacenSlice = createSlice({
  name: 'almacenes',
  initialState: {
    items: [],
    allItems: [],
    selectedAlmacen: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchAlmacenesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAlmacenesSuccess(state, action) {
      const almacenes = action.payload.map((store) => ({
        id: store.idDto,
        name: store.name,
        descripcion: store.detail, // Mapeamos 'detail' a 'descripcion'
        direccion: store.address,
        pagaPublicidad: store.pagaPublicidad,
        image: store.imgUrl, // Mapeamos 'imgUrl' a 'image'
      }));
      state.allItems = almacenes;
      state.items = almacenes.slice(0, 5); // Carga inicial de 5 ítems
      state.loading = false;
    },
    fetchAlmacenesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadMoreItems(state) {
      const currentLength = state.items.length;
      state.items = state.allItems.slice(0, currentLength + 5);
    },
    selectAlmacen(state, action) {
      state.selectedAlmacen = action.payload;
    },
  },
});

export const { fetchAlmacenesStart, fetchAlmacenesSuccess, fetchAlmacenesFailure, loadMoreItems, selectAlmacen } = almacenSlice.actions;
export default almacenSlice.reducer;

export const fetchAlmacenes = () => async (dispatch) => {
  try {
    dispatch(fetchAlmacenesStart());
    const response = await fetch('http://localhost:8080/api/almacenes/'); // Ajusta la URL de tu API
    const data = await response.json();
    console.log('Datos recibidos de la API:', data); // Log para depuración
    dispatch(fetchAlmacenesSuccess(data));
  } catch (error) {
    dispatch(fetchAlmacenesFailure(error.message));
  }
};