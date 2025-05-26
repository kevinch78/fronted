// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      const products = action.payload.map((product) => ({
        id: product.productId,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.imgUrl, // Mapeamos imgUrl a image
      }));
      state.products = products;
      state.loading = false;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await fetch('http://localhost:8081/api/productos'); // Ajusta la URL de tu API
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Datos recibidos de la API (products):', data); // Log para depuración
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    console.error('Error al fetchProducts:', error);
    dispatch(fetchProductsFailure(error.message));
  }
};