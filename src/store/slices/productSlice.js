// import { createSlice } from '@reduxjs/toolkit';

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [
//       { id: 1, name: 'Casual', price: 50000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrbEtolVrdhvTxkvKXfqyGd1Pnti9t9mhWMg&s' },
//       { id: 2, name: 'Casual', price: 50000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrbEtolVrdhvTxkvKXfqyGd1Pnti9t9mhWMg&s' },
//       { id: 3, name: 'Casual', price: 50000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrbEtolVrdhvTxkvKXfqyGd1Pnti9t9mhWMg&s' },
//       { id: 4, name: 'Casual', price: 50000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrbEtolVrdhvTxkvKXfqyGd1Pnti9t9mhWMg&s' },
//     ],
//   },
//   reducers: {},
// });

// export default productSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [
      { id: 1, name: 'Camisa Casual', price: 50000, image: 'https://via.placeholder.com/150', category: 'Camisas' },
      { id: 2, name: 'Chaqueta de Cuero', price: 120000, image: 'https://via.placeholder.com/150', category: 'Chaquetas' },
      { id: 3, name: 'Zapatos Deportivos', price: 80000, image: 'https://via.placeholder.com/150', category: 'Zapatos' },
      { id: 4, name: 'Abrigo de Lana', price: 150000, image: 'https://via.placeholder.com/150', category: 'Abrigos' },
      { id: 5, name: 'Pantalones Vaqueros', price: 60000, image: 'https://via.placeholder.com/150', category: 'Pantalones' },
      { id: 6, name: 'Camiseta Básica', price: 30000, image: 'https://via.placeholder.com/150', category: 'Camisas' },
      { id: 7, name: 'Bufanda de Invierno', price: 25000, image: 'https://via.placeholder.com/150', category: 'Accesorios' },
      { id: 8, name: 'Sombrero Elegante', price: 40000, image: 'https://via.placeholder.com/150', category: 'Accesorios' },
      { id: 9, name: 'Chaqueta Impermeable', price: 90000, image: 'https://via.placeholder.com/150', category: 'Chaquetas' },
      { id: 10, name: 'Zapatos de Cuero', price: 95000, image: 'https://via.placeholder.com/150', category: 'Zapatos' },
      { id: 11, name: 'Abrigo de Invierno', price: 180000, image: 'https://via.placeholder.com/150', category: 'Abrigos' },
      { id: 12, name: 'Camisa Formal', price: 70000, image: 'https://via.placeholder.com/150', category: 'Camisas' },
    ],
    filteredProducts: [], // Productos filtrados y paginados
    currentPage: 1, // Página actual para paginación
    productsPerPage: 8, // Productos por página
    selectedCategory: 'Todos', // Categoría seleccionada para el filtro
  },
  reducers: {
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      state.currentPage = 1; // Reiniciar la página al filtrar
      if (category === 'Todos') {
        state.filteredProducts = state.allProducts.slice(0, state.productsPerPage);
      } else {
        state.filteredProducts = state.allProducts
          .filter((product) => product.category === category)
          .slice(0, state.productsPerPage);
      }
    },
    loadMoreProducts: (state) => {
      const start = (state.currentPage - 1) * state.productsPerPage;
      const end = start + state.productsPerPage;
      const filtered = state.selectedCategory === 'Todos'
        ? state.allProducts
        : state.allProducts.filter((product) => product.category === state.selectedCategory);
      state.filteredProducts = filtered.slice(0, end);
      state.currentPage += 1;
    },
  },
});

// Exportar las acciones
export const { filterByCategory, loadMoreProducts } = productSlice.actions;
export default productSlice.reducer;