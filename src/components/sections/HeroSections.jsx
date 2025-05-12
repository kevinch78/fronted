import inicio from '../../assets/img/inicio.webp';
import { useState } from 'react';


const HeroSection = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartClick = () => {
    setShowChat(true);
  };

  return (
    <section className="bg-pulrple-light py-12 px-6"> {/* Corregí 'bg-pulrple-light' a 'bg-purple-200' */}
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">¿Sin ideas?</h1>
          <h2 className="text-3xl font-bold text-black mb-4"> La IA elige tu outfit ideal</h2>
          {!showChat && (
            <button
              onClick={handleStartClick}
              className="bg-purple-600 text-white px-16 py-4 rounded-full hover:bg-purple-700 transition-colors"
            >
              Empezar
            </button>
          )}
        </div>
        {!showChat ? (
          <div className="px-16">
            <img
              src={inicio}
              alt="Main outfit"
              className="w-64 h-96 object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="px-1 w-80">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Chat de IA</h3>
              <p className="text-gray-600 mb-4">Dime cómo quieres tu outfit:</p>
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona género</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="unisex">Unisex</option>
                </select>
                <select
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona estilo</option>
                  <option value="casual">Casual</option>
                  <option value="elegante">Elegante</option>
                  <option value="deportivo">Deportivo</option>
                </select>
                <select
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona clima</option>
                  <option value="caluroso">Caluroso</option>
                  <option value="frio">Frío</option>
                  <option value="lluvioso">Lluvioso</option>
                </select>
                <button
                  onClick={() => alert('¡Outfit generado! (Simulación)') }
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generar Outfit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

// const HeroSection = () => {
//     return (
//         <section className="bg-pulrple-light py-12 px-6">
//                   <div className="max-w-5xl mx-auto flex items-center justify-between">
//                     <div className="flex flex-col items-start">
//                       <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
//                         ¿Sin ideas? 
//                       </h1>
//                       <h2 className='text-3xl font-bold text-black mb-4'>
//                         La IA te ayuda a outfit ideal
//                       </h2>
//                       <button className="bg-purple-600 text-white px-16 py-4 rounded-full hover:bg-purple-700">
//                         Empezar
//                       </button>
//                     </div>
//                     <div className="px-16">
//                       <img
//                         src={inicio}
//                         alt="Main outfit"
//                         className="w-64 h-96 object-cover rounded-lg"
//                       />
//                     </div>
//                   </div>
//                 </section>

//     );
//   };
  
//   export default HeroSection;