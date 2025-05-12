import CategoryCard from '../common/CategoryCard';
import chaqueta from '../../assets/img/chaqueta.webp';
import pantalones2 from '../../assets/img/pantalones2.webp';
import zapatos from '../../assets/img/zapatos.webp';
import camisa from '../../assets/img/camisa.webp'



const Categories = () => {
  return (
    <section className="bg-purple-200 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explora por categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard name="Pantalones" imageUrl={pantalones2} />
          <CategoryCard name="Chaquetas" imageUrl={chaqueta}  />
          <CategoryCard name="Camisas" imageUrl={camisa}  />
          <CategoryCard name="Zapatos" imageUrl={zapatos}  />
        </div>
      </div>
    </section>
  );
};

export default Categories;

