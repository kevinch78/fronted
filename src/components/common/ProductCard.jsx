import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image, store } = product;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">Precio: ${price}</p>
      <p className="text-gray-600">Almacén: {store?.name || 'Sin almacén'}</p>
      <Link
        to={`/producto/${id}`}
        className="mt-2 inline-block bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default ProductCard;