const ProductCard = ({ name, price, image }) => {
    return (
      <div className="w-full h-full bg-white shadow-md rounded-lg overflow-hidden">
        <img src={image} alt={name} className="w-full min-h-56 object-cover" />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">${price.toLocaleString()}</p>
        </div>
      </div>
    );
  };
  
  export default ProductCard;