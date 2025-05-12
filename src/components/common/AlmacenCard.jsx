const AlmacenCard = ({ name, direccion, image, onClick, isSelected }) => {
    return (
      <div
        onClick={onClick}
        className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
          isSelected ? 'bg-purple-200' : 'bg-white hover:bg-gray-100'
        } shadow-md`}
      >
        <img src={image} alt={name} className="w-16 h-16 object-cover rounded-lg mr-4" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">{direccion}</p>
        </div>
      </div>
    );
  };
  
  export default AlmacenCard;