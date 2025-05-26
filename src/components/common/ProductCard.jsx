import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image, store } = product;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="w-full max-h-80 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center border border-gray-200">
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain transition-opacity duration-300 hover:opacity-90"
          onError={(e) => {
            console.log('Error al cargar imagen del producto:', image);
            e.target.src = 'https://via.placeholder.com/300x400?text=Imagen+No+Disponible';
          }}
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm">Precio: ${price?.toFixed(2) || 'N/A'}</p>
      <p className="text-gray-600 text-sm">Almacén: {store?.name || 'Sin almacén'}</p>
      <Link
        to={`/producto/${id}`}
        className="mt-3 inline-block bg-purple-600 text-white py-1.5 px-3 rounded-md text-sm hover:bg-purple-700 transition-colors duration-200"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default ProductCard;