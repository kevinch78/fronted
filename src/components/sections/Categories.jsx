import CategoryCard from '../common/CategoryCard';
import chaqueta from '../../assets/img/chaqueta.webp';
import pantalones2 from '../../assets/img/pantalones2.webp';
import zapatos from '../../assets/img/zapatos.webp';
import camisa from '../../assets/img/camisa.webp';

const Categories = () => {
  return (
    <section className="bg-gradient-to-b from-purple-100 to-purple-200 py-16 px-6 relative overflow-hidden">
      {/* Decoración de Fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full opacity-10 -z-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 rounded-full opacity-10 -z-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto">
        {/* Título Mejorado con Animación */}
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3 drop-shadow-md animate-pulse-slow">
            Explora por Categorías
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra el estilo perfecto para cada ocasión
          </p>
        </div>

        {/* Cuadrícula de Categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="animate-slide-up animation-delay-0">
            <CategoryCard name="Pantalones" imageUrl={pantalones2} />
          </div>
          <div className="animate-slide-up animation-delay-100">
            <CategoryCard name="Chaquetas" imageUrl={chaqueta} />
          </div>
          <div className="animate-slide-up animation-delay-200">
            <CategoryCard name="Camisas" imageUrl={camisa} />
          </div>
          <div className="animate-slide-up animation-delay-300">
            <CategoryCard name="Zapatos" imageUrl={zapatos} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Animaciones CSS personalizadas
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  @keyframes blob {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
  }
  .animate-fade-in { animation: fade-in 1s ease-out; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-pulse-slow { animation: pulse-slow 3s infinite; }
  .animate-blob { animation: blob 15s infinite; }
  .animation-delay-0 { animation-delay: 0ms; }
  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-2000 { animation-delay: 2000ms; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default Categories;