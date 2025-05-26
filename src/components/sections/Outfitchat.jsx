import React, { useState } from 'react';
import axios from 'axios';

const OutfitChat = ({ onOutfitGenerated }) => {
  const [gender, setGender] = useState({ hombre: false, mujer: false });
  const [message, setMessage] = useState('');
  const [outfitItems, setOutfitItems] = useState([]);
  const [accessory, setAccessory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateOutfit = async (e) => {
    e.preventDefault();

    const selectedGender = gender.hombre ? 'hombre' : gender.mujer ? 'mujer' : '';
    if (!selectedGender || !message.trim()) {
      setError('Por favor, selecciona al menos un género y escribe un mensaje.');
      return;
    }

    setLoading(true);
    setError(null);
    setOutfitItems([]);
    setAccessory('');
    try {
      console.log('Enviando solicitud a:', `http://localhost:8081/api/productos/chat?gender=${selectedGender}`);
      console.log('Cuerpo de la solicitud:', { message });

      const response = await axios.post(
        `http://localhost:8081/api/productos/chat?gender=${selectedGender}`,
        { message },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Respuesta completa de la API:', response);
      console.log('Datos devueltos:', response.data);

      if (typeof response.data === 'string' && response.data.trim()) {
        const cleanedData = response.data.replace(/\\n/g, '\n');
        const lines = cleanedData.split(/\n+/).map(line => line.trim()).filter(line => line);
        console.log('Líneas parseadas:', lines);

        const items = [];
        let accessoryText = '';

        lines.forEach(line => {
          console.log('Procesando línea:', line);
          // Detectar ítems con tienda (más flexible, sin exigir "Tienda:" explícito)
          const itemMatch = line.match(/^\*\s+\*\*([^:]+):\*\*\s*([^()]+?)\s*\(([^)]+)\)/i);
          if (itemMatch) {
            const itemName = itemMatch[2].trim();
            const store = itemMatch[3].trim();
            items.push({ name: itemName, store });
            console.log('Ítem encontrado:', { name: itemName, store });
          }
          // Detectar accesorio
          else if (line.includes('**Accesorio:**')) {
            accessoryText = line.replace('**Accesorio:**', '').trim().replace(/-\s*.*/, '');
            console.log('Accesorio encontrado:', accessoryText);
          }
        });

        if (items.length === 0 && !accessoryText) {
          setError('No se encontraron ítems ni accesorios en la respuesta. Verifica el formato de la API.');
        } else {
          setOutfitItems(items);
          setAccessory(accessoryText);
          if (onOutfitGenerated) onOutfitGenerated({ items, accessory: accessoryText });
        }
      } else {
        setError('La respuesta de la API no tiene el formato esperado. Revisa la consola para más detalles.');
      }
    } catch (err) {
      console.error('Error completo:', err);
      console.error('Respuesta del error (si existe):', err.response?.data);
      setError(err.response?.data?.message || 'Error al generar el outfit. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative animate-slide-up">
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-400 rounded-full opacity-20 blur-xl animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-300 rounded-full opacity-20 blur-xl animate-pulse-slow animation-delay-1000"></div>

      <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-200 relative z-10">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-purple-600 mr-3 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10c-1.2 0-2.4-.2-3.5-.6-.7 1.1-1.9 1.6-3.5 1.6-.5 0-.9-.1-1.3-.3-.6-.3-.9-.8-.9-1.4v-2.8c-1.2-.9-2-2.2-2-3.5 0-5.5 4.5-10 10-10zm0 2c-4.4 0-8 3.6-8 8 0 1.1.2 2.1.6 3.1-.9.5-1.6 1.4-1.6 2.4v1.9c.3 0 .5.1.8.1.7 0 1.2-.3 1.5-.7.9.3 1.9.5 2.7.5 4.4 0 8-3.6 8-8s-3.6-8-8-8zm-1 4h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <h3 className="text-xl font-extrabold text-gray-800 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent animate-pulse">
            ¡Crea tu Outfit Ideal! ✨
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-6 animate-fade-in">
            <label className="flex items-center bg-purple-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={gender.hombre}
                onChange={(e) => setGender({ ...gender, hombre: e.target.checked, mujer: false })}
                className="mr-2 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-400"
              />
              <span className="text-gray-800 font-medium">Hombre</span>
            </label>
            <label className="flex items-center bg-purple-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={gender.mujer}
                onChange={(e) => setGender({ ...gender, mujer: e.target.checked, hombre: false })}
                className="mr-2 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-400"
              />
              <span className="text-gray-800 font-medium">Mujer</span>
            </label>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Dime cómo quieres tu outfit (ej. 'Algo formal para clima frío') 🧥"
            className="w-full p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none transition-all duration-300 hover:border-purple-400 bg-white shadow-inner animate-fade-in animation-delay-200"
          />

          <button
            onClick={generateOutfit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 rounded-xl hover:scale-105 transition-all duration-300 disabled:bg-gray-400 shadow-lg flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Generando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-1 4h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <span>Generar Outfit</span>
              </>
            )}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in animation-delay-300">{error}</p>
          )}

          {(outfitItems.length > 0 || accessory) && (
            <div className="mt-4 animate-fade-in animation-delay-400">
              <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-1 4h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                Tu Outfit Perfecto:
              </h4>
              <div className="h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-100 border border-purple-200 rounded-xl p-3 bg-purple-50 shadow-inner">
                {outfitItems.length > 0 && (
                  <ul className="list-none pl-0 space-y-1">
                    {outfitItems.map((item, index) => (
                      <li key={index} className="text-gray-800 border-b border-purple-200 py-1 flex justify-between items-center text-sm">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-purple-500">({item.store})</span>
                      </li>
                    ))}
                  </ul>
                )}
                {accessory && (
                  <p className="text-gray-800 font-semibold mt-2 flex items-center text-sm">
                    <span className="mr-2">Accesorio recomendado:</span>
                    <span className="text-purple-600">{accessory}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Animaciones CSS personalizadas y estilos para el scrollbar
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-slide-up { animation: slide-up 1s ease-out; }
  .animate-pulse-slow { animation: pulse-slow 3s infinite; }
  .animate-bounce { animation: bounce 1.5s infinite; }
  .animate-pulse { animation: pulse 2s infinite; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-1000 { animation-delay: 1000ms; }

  /* Estilos para el scrollbar */
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f3e8ff;
    border-radius: 8px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 8px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default OutfitChat;