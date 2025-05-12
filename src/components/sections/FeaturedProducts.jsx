// import { useSelector } from 'react-redux';
// import ProductCard from '../common/ProductCard';

// const FeaturedProducts = () => {
//   const products = useSelector((state) => state.products.products);

//   return (
//     <section className=" bg-purple-lightplus py-12 px-6">
//     <div className="max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Inspiración del día</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             name={product.name}
//             price={product.price}
//             image={product.image}
//           />
//         ))}
//       </div>
//     </div>
//   </section>

//   );
// };

// export default FeaturedProducts;

import { useSelector } from 'react-redux';
import ProductCard from '../common/ProductCard';

const FeaturedProducts = () => {
  const products = useSelector((state) => state.products.filteredProducts || []); // Usamos filteredProducts y un valor por defecto

  return (
    <section className="py-12 px-6 bg-purple-lightplus">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Inspiración del día</h2>
        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No hay productos destacados disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;