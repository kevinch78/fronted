const AlmacenCard = ({ name, direccion, image, onClick, isSelected, className }) => {
  const handleClick = () => {
    console.log('Clic en AlmacenCard:', name);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 cursor-pointer rounded-xl transition-all duration-200 ${isSelected ? 'bg-purple-100 border-purple-500' : 'bg-white border-gray-200'} border ${className}`}
    >
      <div className="w-full h-32 overflow-hidden rounded-lg mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('Error al cargar imagen en AlmacenCard:', image);
            e.target.src = 'https://via.placeholder.com/150?text=Imagen+No+Disponible';
          }}
        />
      </div>
      <h4 className="text-lg font-semibold text-gray-800 truncate">{name}</h4>
      <p className="text-gray-600 text-sm truncate">{direccion}</p>
    </div>
  );
};

export default AlmacenCard;