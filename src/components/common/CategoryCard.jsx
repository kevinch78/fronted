import { Link } from 'react-router-dom';

const CategoryCard = ({ name, imageUrl }) => {
  return (
    <Link
      to={`/categoria/${name.toLowerCase()}`}
      className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 transform text-center"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    </Link>
  );
};

export default CategoryCard;