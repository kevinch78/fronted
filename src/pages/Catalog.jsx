import React from 'react';
import { useSelector } from 'react-redux';

const Catalog = () => {
  const { products, loading, error } = useSelector((state) => state.products || { products: [], loading: false, error: null });

  if (loading) return <div className="text-center py-4">Cargando productos...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <section className="bg-gradient-to-b from-purple-100 to-purple-300 py-16 px-4 min-h-screen relative overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 bg-purple-400 rounded-full opacity-20 blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300 rounded-full opacity-20 blur-xl animate-pulse-slow animation-delay-1000"></div>

      <div className="container mx-auto relative z-10 animate-slide-up">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent animate-fade-in">
          Catálogo
        </h1>

        <div className="mb-8 max-w-md mx-auto animate-fade-in animation-delay-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos 🔍"
              className="w-full p-3 pl-10 pr-10 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 bg-white shadow-md text-sm sm:text-base"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={`${product.id}-${index}`} // Clave única combinando id e índice
                className="border border-purple-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white animate-fade-in animation-delay-300"
              >
                <div className="h-72 overflow-hidden rounded-lg mb-4 flex items-center justify-center bg-gray-100 border border-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain transition-opacity duration-300 hover:opacity-90"
                    onError={(e) => {
                      console.log('Error al cargar imagen del producto:', product.image);
                      e.target.src = 'https://via.placeholder.com/300x400?text=Imagen+No+Disponible';
                    }}
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-gray-800 font-bold text-lg">${product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 animate-fade-in animation-delay-400">No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
};

// Animaciones CSS personalizadas (sin cambios relevantes aquí)
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-slide-up { animation: slide-up 1s ease-out; }
  .animate-pulse-slow { animation: pulse-slow 3s infinite; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-1000 { animation-delay: 1000ms; }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default Catalog;