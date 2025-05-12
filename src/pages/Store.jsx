// import { useEffect, useRef, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import AlmacenCard from '../components/common/AlmacenCard';
// import { loadMoreItems, selectAlmacen } from '../store/slices/almacenSlice';

// const Store = () => {
//   const dispatch = useDispatch();
//   const { items, allItems, selectedAlmacen, loading, error } = useSelector((state) => state.almacenes);

//   // Referencia para el Intersection Observer
//   const observerRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Cargar los primeros almacenes al montar
//   useEffect(() => {
//     if (items.length === 0) {
//       dispatch(loadMoreItems());
//     }
//     // Seleccionar el primer almacén por defecto
//     if (!selectedAlmacen && allItems.length > 0) {
//       dispatch(selectAlmacen(allItems[0]));
//     }
//   }, [dispatch, items, selectedAlmacen, allItems]);

//   // Configurar Intersection Observer para carga infinita
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !isLoading && items.length < allItems.length) {
//           setIsLoading(true);
//           setTimeout(() => {
//             dispatch(loadMoreItems());
//             setIsLoading(false);
//           }, 500); // Simular carga
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => {
//       if (observerRef.current) {
//         observer.unobserve(observerRef.current);
//       }
//     };
//   }, [dispatch, isLoading, items, allItems]);

//   if (loading) return <p className="text-center mt-10">Cargando almacenes...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

//   return (
//     <section className="max-w-6xl mx-auto py-10 px-4 ">
//       <h2 className="text-2xl font-bold text-gray-800 mb-5">Almacenes disponibles</h2>
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Lista de almacenes a la izquierda */}
//         <div className="md:w-1/3 max-h-[70vh] overflow-y-auto">
//           <div className="space-y-3">
//             {items.map((almacen) => (
//               <AlmacenCard
//                 key={almacen.id}
//                 name={almacen.name}
//                 direccion={almacen.direccion}
//                 image={almacen.image}
//                 onClick={() => dispatch(selectAlmacen(almacen))}
//                 isSelected={selectedAlmacen && selectedAlmacen.id === almacen.id}
//               />
//             ))}
//             <div ref={observerRef} className="h-10 flex items-center justify-center">
//               {isLoading && <p className="text-gray-600">Cargando más almacenes...</p>}
//             </div>
//           </div>
//         </div>

//         {/* Detalles del almacén seleccionado a la derecha */}
//         <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
//           {selectedAlmacen ? (
//             <>
//               <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedAlmacen.name}</h3>
//               <img
//                 src={selectedAlmacen.image}
//                 alt={selectedAlmacen.name}
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />
//               <p className="text-gray-600 mb-2"><strong>Dirección:</strong> {selectedAlmacen.direccion}</p>
//               <p className="text-gray-600"><strong>Descripción:</strong> {selectedAlmacen.descripcion}</p>
//             </>
//           ) : (
//             <p className="text-gray-600">Selecciona un almacén para ver los detalles.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Store;

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AlmacenCard from '../components/common/AlmacenCard';
import { loadMoreItems, selectAlmacen, fetchAlmacenes } from '../store/slices/almacenSlice';

const Store = () => {
  const dispatch = useDispatch();
  const { items, allItems, selectedAlmacen, loading, error } = useSelector((state) => state.almacenes);

  // Referencia para el Intersection Observer
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar almacenes al montar
  useEffect(() => {
    dispatch(fetchAlmacenes()); // Fetch desde la API al montar
  }, [dispatch]);

  // Configurar Intersection Observer para carga infinita
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && items.length < allItems.length) {
          setIsLoading(true);
          setTimeout(() => {
            dispatch(loadMoreItems());
            setIsLoading(false);
          }, 500); // Simular carga
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

  if (loading && items.length === 0) return <p className="text-center mt-10">Cargando almacenes...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Almacenes disponibles</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Lista de almacenes a la izquierda */}
        <div className="md:w-1/3 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {items.map((almacen) => (
              <AlmacenCard
                key={almacen.id}
                name={almacen.name}
                direccion={almacen.direccion}
                image={almacen.image}
                onClick={() => dispatch(selectAlmacen(almacen))}
                isSelected={selectedAlmacen && selectedAlmacen.id === almacen.id}
              />
            ))}
            <div ref={observerRef} className="h-10 flex items-center justify-center">
              {isLoading && <p className="text-gray-600">Cargando más almacenes...</p>}
            </div>
          </div>
        </div>

        {/* Detalles del almacén seleccionado a la derecha */}
        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          {selectedAlmacen ? (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedAlmacen.name}</h3>
              <img
                src={selectedAlmacen.image}
                alt={selectedAlmacen.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-2"><strong>Dirección:</strong> {selectedAlmacen.direccion}</p>
              <p className="text-gray-600 mb-2"><strong>Descripción:</strong> {selectedAlmacen.descripcion}</p>
              {/* <p className="text-gray-600"><strong>Publicidad:</strong> {selectedAlmacen.pagaPublicidad ? 'Sí' : 'No'}</p> */}
            </>
          ) : (
            <p className="text-gray-600">Selecciona un almacén para ver los detalles.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Store;