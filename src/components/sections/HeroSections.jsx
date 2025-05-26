import inicio from '../../assets/img/inicio.webp';
import { useState } from 'react';
import OutfitChat from './OutfitChat';

const HeroSection = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartClick = () => {
    setShowChat(true);
  };

  return (
    <section className="bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Decoración de Fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 -z-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 rounded-full opacity-20 -z-10 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full opacity-10 -z-10 animate-pulse-slow"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 min-h-[32rem] sm:min-h-[36rem] md:min-h-[28rem]">
        {/* Contenido Izquierdo con Animación */}
        <div className="flex flex-col items-start text-center md:text-left animate-fade-in w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-3 drop-shadow-md animate-pulse-slow">
            ¿Sin Ideas? ✨
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800 mb-4 drop-shadow-md">
            ¡La IA Crea tu Outfit Perfecto! 👗
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto md:mx-0">
            Encuentra combinaciones únicas para cualquier ocasión con nuestra inteligencia artificial. 💡
          </p>
          {!showChat && (
            <button
              onClick={handleStartClick}
              className="bg-purple-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full hover:bg-purple-700 hover:scale-110 transition-all duration-300 transform shadow-lg flex items-center space-x-2 mx-auto md:mx-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              <span className="text-sm sm:text-base">Empezar Ahora</span>
            </button>
          )}
        </div>

        {/* Imagen Derecha o Chat con Animación */}
        <div className="w-full md:w-1/2 flex justify-center animate-slide-up">
          {!showChat ? (
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-48 sm:h-48 bg-purple-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <img
                src={inicio}
                alt="Main outfit"
                className="w-56 sm:w-64 md:w-72 h-80 sm:h-96 md:h-[28rem] object-cover rounded-xl shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-300"
                onError={(e) => {
                  console.log('Error al cargar la imagen de inicio:', inicio);
                  e.target.src = 'https://via.placeholder.com/300x400?text=Imagen+No+Disponible';
                }}
              />
            </div>
          ) : (
            <div className="w-full max-w-md">
              <OutfitChat />
            </div>
          )}
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
    from { opacity: 0; transform: translateY(50px); }
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
  .animate-slide-up { animation: slide-up 1s ease-out; }
  .animate-pulse-slow { animation: pulse-slow 3s infinite; }
  .animate-blob { animation: blob 15s infinite; }
  .animation-delay-2000 { animation-delay: 2000ms; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default HeroSection;