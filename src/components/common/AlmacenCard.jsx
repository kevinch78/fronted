const AlmacenCard = ({ name, direccion, image, onClick, isSelected, className }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer rounded-xl transition-all duration-200 ${isSelected ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-200'} border ${className}`}
    >
      <div className="w-full h-32 overflow-hidden rounded-lg mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Imagen por defecto si falla
        />
      </div>
      <h4 className="text-lg font-semibold text-gray-800 truncate">{name}</h4>
      <p className="text-gray-600 text-sm truncate">{direccion}</p>
    </div>
  );
};

export default AlmacenCard;