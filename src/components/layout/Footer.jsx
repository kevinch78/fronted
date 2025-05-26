import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    // Simula un pequeño retraso para la animación inicial
  }, []);

  return (
    <footer className="bg-gradient-to-t from-purple-200 to-purple-400 py-12 px-6 relative overflow-hidden">
      {/* Decoración de Fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full opacity-10 -z-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-10 -z-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          {/* Columna 1: ¿Quiénes somos? */}
          <div className="px-4 animation-delay-0">
            <h4 className="font-semibold text-lg text-gray-800 mb-4">¿Quiénes somos?</h4>
            <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">
              Nuestra misión
            </a>
            <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">
              Conócenos
            </a>
          </div>

          {/* Columna 2: Ayuda */}
          <div className="px-4 animation-delay-100">
            <h4 className="font-semibold text-lg text-gray-800 mb-4">Ayuda</h4>
            <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">
              Términos y condiciones
            </a>
            <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">
              Política y privacidad
            </a>
          </div>

          {/* Columna 3: Síguenos */}
          <div className="px-4 animation-delay-200">
            <h4 className="font-semibold text-lg text-gray-800 mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Facebook">
                  <path d="M12 2.04c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm4.5 6.75h-3.75v-3.75h-3v3.75h-3.75v3h3.75v7.5h3v-7.5h3.75v-3zm-6-3v3h-3v3h3v7.5h3v-7.5h3.75v-3h-3.75v-3h-3z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
                  <path d="M12 2.04c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-10.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5zm-7 0c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm7 4.5c-1.1 0-2 .9-2 2v2h-4v-2c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-600 animation-delay-300">
          <p>© {new Date().getFullYear()} TuTienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// Animaciones CSS personalizadas
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes blob {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
  }
  .animate-fade-in { animation: fade-in 1s ease-out; }
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

export default Footer;