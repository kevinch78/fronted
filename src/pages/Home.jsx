import HeroSections from '../components/sections/HeroSections';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import Categories from '../components/sections/Categories';



const Home = () => {
  return (
    <>
      <HeroSections />
      <FeaturedProducts />
      <Categories />
    </>
  );
};

export default Home;


// import { useSelector } from 'react-redux';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import ProductCard from '../components/common/ProductCard';
// import CategoryCard from '../components/common/CategoryCard';
// import inicio from '../assets/img/inicio.webp';

// const Home = () => {
//   const products = useSelector((state) => state.products.products);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="bg-pulrple-light py-12 px-6">
//           <div className="max-w-5xl mx-auto flex items-center justify-between">
//             <div className="flex flex-col items-start">
//               <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
//                 ¿Sin ideas? 
//               </h1>
//               <h2 className='text-3xl font-bold text-black mb-4'>
//                 La IA te ayuda a outfit ideal
//               </h2>
//               <button className="bg-purple-600 text-white px-16 py-4 rounded-full hover:bg-purple-700">
//                 Empezar
//               </button>
//             </div>
//             <div className="px-16">
//               <img
//                 src={inicio}
//                 alt="Main outfit"
//                 className="w-64 h-96 object-cover rounded-lg"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Inspiración del Día */}
//         <section className=" bg-purple-lightplus py-12 px-6">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Inspiración del día</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {products.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   name={product.name}
//                   price={product.price}
//                   image={product.image}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Explora por Categorías */}
//         <section className="w-full bg-purple-200 py-12 px-6">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Explora por categorías</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               <CategoryCard name="Abrigos" />
//               <CategoryCard name="Chaquetas" />
//               <CategoryCard name="Camisas" />
//               <CategoryCard name="Zapatos" />
//             </div>
//           </div>
//         </section>
//       </main>
//       <section className='w-full mx-auto'>
//       <Footer />
//       </section>

//     </div>
//   );
// };

// export default Home;