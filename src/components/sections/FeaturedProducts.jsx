import { useSelector } from 'react-redux';
import { useMemo } from 'react';

// Nuevo componente de tarjeta para productos destacados
const FeaturedProductCard = ({ product, index }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up animation-delay-${index * 100}`}
    >
      <div className="relative w-full h-48">
        <img
          src={product.image || 'https://via.placeholder.com/300x200?text=Producto+Sin+Imagen'}
          alt={product.name || 'Producto sin nombre'}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log(`Error al cargar imagen para el producto ${product.id || product.tempId}:`, product.image);
            e.target.src = 'https://via.placeholder.com/300x200?text=Producto+Sin+Imagen';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name || 'Producto sin nombre'}
        </h3>
        <p className="text-gray-600 text-sm truncate mb-2">
          {product.description || 'Sin descripción disponible'}
        </p>
        <p className="text-indigo-600 font-bold">
          ${product.price?.toFixed(2) || 'Precio no disponible'}
        </p>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const products = useSelector((state) => state.products.items || []);

  // Log para depurar los productos
  console.log('Productos desde el estado:', products);

  // Seleccionar 4 productos aleatorios usando useMemo
  const randomProducts = useMemo(() => {
    if (!products.length) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    console.log('Productos aleatorios seleccionados:', selected);
    return selected;
  }, [products]);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-purple-50 to-purple-100 relative overflow-hidden">
      {/* Decoración de Fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full opacity-10 -z-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 rounded-full opacity-10 -z-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto">
        {/* Título Mejorado con Animación */}
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3 drop-shadow-md animate-pulse-slow">
            Nuestros Productos
          </h2>
          <p className="text-lg text-gray-600">
            Descubre nuestra selección especial para inspirarte hoy
          </p>
        </div>

        {/* Cuadrícula de Productos */}
        {randomProducts.length === 0 ? (
          <p className="text-gray-600 text-center animate-fade-in">
            No hay productos destacados disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {randomProducts.map((product, index) => (
              <FeaturedProductCard
                key={product.id || product.tempId}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Animaciones CSS personalizadas
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  @keyframes blob {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
  }
  .animate-fade-in { animation: fade-in 1s ease-out; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-pulse-slow { animation: pulse-slow 3s infinite; }
  .animate-blob { animation: blob 15s infinite; }
  .animation-delay-0 { animation-delay: 0ms; }
  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-2000 { animation-delay: 2000ms; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default FeaturedProducts;