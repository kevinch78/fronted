// import { useSelector } from 'react-redux';
// import ProductCard from '../components/common/ProductCard';

// const Catalog = () => {
//   const products = useSelector((state) => state.products.products);

//   return (
//     <section className="py-12 px-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Catálogo de Productos</h1>
//         {products.length === 0 ? (
//           <p className="text-gray-600 text-center">No hay productos disponibles.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 name={product.name}
//                 price={product.price}
//                 image={product.image}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Catalog;

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/common/ProductCard';
import { filterByCategory, loadMoreProducts } from '../store/slices/productSlice';

const Catalog = () => {
  const dispatch = useDispatch();
  const { filteredProducts, allProducts, selectedCategory } = useSelector((state) => state.products);
  
  // Obtener categorías únicas para los filtros
  const categories = ['Todos', ...new Set(allProducts.map((product) => product.category))];
  
  // Referencia para el elemento que observaremos para el scroll
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtrar productos al hacer clic en una categoría
  const handleFilter = (category) => {
    dispatch(filterByCategory(category));
  };

  // Configurar Intersection Observer para carga infinita
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            dispatch(loadMoreProducts());
            setIsLoading(false);
          }, 500); // Simular una carga (puedes ajustar el tiempo o conectar a una API)
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [dispatch, isLoading]);

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Catálogo de Productos</h1>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-purple-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lista de Productos */}
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600 text-center">No hay productos disponibles para esta categoría.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        )}

        {/* Elemento para Intersection Observer */}
        <div ref={observerRef} className="h-10 flex items-center justify-center">
          {isLoading && <p className="text-gray-600">Cargando más productos...</p>}
        </div>
      </div>
    </section>
  );
};

export default Catalog;