import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AlmacenCard from '../components/common/AlmacenCard';
import { loadMoreItems, selectAlmacen, fetchAlmacenes } from '../store/slices/almacenSlice';

const Store = () => {
  const dispatch = useDispatch();
  const { items, allItems, selectedAlmacen, loading, error } = useSelector((state) => state.almacenes);

  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAlmacenes());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && items.length < allItems.length) {
          console.log('IntersectionObserver activado - Cargando más ítems...');
          setIsLoading(true);
          setTimeout(() => {
            dispatch(loadMoreItems());
            setIsLoading(false);
          }, 500);
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
  }, [dispatch, isLoading, items, allItems]);

  const handleSelectAlmacen = (almacen) => {
    console.log('Clic en almacén:', almacen.id, almacen.name);
    console.log('Estado actual de selectedAlmacen:', selectedAlmacen);
    if (!selectedAlmacen || selectedAlmacen.id !== almacen.id) {
      dispatch(selectAlmacen(almacen));
      console.log('Nuevo almacén seleccionado:', almacen.id);
    } else {
      console.log('El almacén ya estaba seleccionado, no se hace nada.');
    }
  };

  if (loading && items.length === 0) return (
    <p className="text-center mt-6 sm:mt-8 text-indigo-600 font-semibold animate-pulse">
      ✨ Cargando almacenes, un momento porfa... ✨
    </p>
  );
  if (error) return (
    <p className="text-center text-red-500 mt-6 sm:mt-8 font-semibold animate-bounce">
      🚨 Error: {error}
    </p>
  );

  return (
    <section className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 max-w-6xl mx-auto py-8 sm:py-10 px-4 sm:px-6 rounded-2xl sm:rounded-3xl shadow-lg my-4 sm:my-6">
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-purple-800 mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-700 animate-pulse">
        Explora Nuestros Almacenes 🛍️
      </h2>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* Lista de almacenes a la izquierda */}
        <div className="w-full sm:w-1/3 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-100 pr-2">
          <div className="space-y-4 sm:space-y-6">
            {items.map((almacen, index) => (
              <div
                key={almacen.id}
                className={`animate-slide-up animation-delay-${index * 100}`}
              >
                <AlmacenCard
                  name={almacen.name}
                  direccion={almacen.direccion}
                  image={almacen.image}
                  onClick={() => handleSelectAlmacen(almacen)}
                  isSelected={selectedAlmacen?.id === almacen.id}
                  className="bg-white hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg border border-purple-200 h-40 sm:h-48 flex flex-col justify-between"
                />
              </div>
            ))}
            <div ref={observerRef} className="h-8 sm:h-10 flex items-center justify-center">
              {isLoading && (
                <p className="text-purple-600 font-medium animate-pulse">
                  Cargando más almacenes... ⏳
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Detalles del almacén seleccionado a la derecha */}
        <div className="w-full sm:w-2/3 bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-purple-200 transform transition-all duration-500 hover:shadow-lg">
          {selectedAlmacen ? (
            <div className="animate-fade-in">
              <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-3 sm:mb-4 flex items-center">
                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                {selectedAlmacen.name}
              </h3>
              <img
                src={selectedAlmacen.image}
                alt={selectedAlmacen.name}
                className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6 border-2 border-purple-300 transform transition-all duration-300 hover:scale-102"
                onError={(e) => {
                  console.log('Error al cargar imagen de almacén:', selectedAlmacen.image);
                  e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                }}
              />
              <p className="text-gray-700 mb-2 sm:mb-3 flex items-center">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                </svg>
                <span className="font-semibold text-purple-700">Dirección:</span> {selectedAlmacen.direccion}
              </p>
              <p className="text-gray-700 mb-2 sm:mb-3 flex items-center">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
                <span className="font-semibold text-purple-700">Descripción:</span> {selectedAlmacen.descripcion}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 italic animate-pulse">
              🏬 Selecciona un almacén para ver sus detalles.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// Estilos personalizados con animaciones y scrollbar
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-pulse { animation: pulse 2s infinite; }
  .animate-bounce { animation: bounce 1.5s infinite; }
  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }

  /* Estilos para el scrollbar */
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px sm:width-8px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #e0e7ff;
    border-radius: 6px sm:border-radius-8px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 6px sm:border-radius-8px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default Store;