
const CategoryCard = ({ name, imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full h-60">
        <img src={imageUrl} alt={name} className=" w-full h-full object-cover" />
      </div>
      <div className="p-2">
        <h3 className="text-lg font-semibold text-gray-800 text-center">{name}</h3>
      </div>
    </div>
  );
};
export default CategoryCard;



