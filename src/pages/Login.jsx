import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación (puedes reemplazar con una llamada a API)
    if (email === 'user@example.com' && password === 'password123') {
      dispatch(login({ email, name: 'Usuario Ejemplo' }));
      navigate('/');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <section className="bg-gradient-to-b from-purple-100 to-purple-300 py-16 px-4 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decoración de Fondo */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-purple-400 rounded-full opacity-20 blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300 rounded-full opacity-20 blur-xl animate-pulse-slow animation-delay-1000"></div>

      <div className="max-w-md w-full mx-auto animate-slide-up">
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-200 relative z-10">
          {/* Título con Ícono */}
          <div className="flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-purple-600 mr-3 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-1 4h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <h2 className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Iniciar Sesión
            </h2>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4 animate-fade-in">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Correo */}
            <div className="relative animate-fade-in animation-delay-200">
              <label className="block text-gray-700 mb-2 font-medium">Correo</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 bg-white shadow-inner"
                  placeholder="tu@email.com"
                  required
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6-8-8-8zm4-6H8v-2h8v2z"/>
                </svg>
              </div>
            </div>

            {/* Campo de Contraseña */}
            <div className="relative animate-fade-in animation-delay-300">
              <label className="block text-gray-700 mb-2 font-medium">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 bg-white shadow-inner"
                  placeholder="••••••••"
                  required
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6-8-8-8zm2-6h-4v-2h4v2zm-2-4v4h-2V8h2z"/>
                </svg>
              </div>
            </div>

            {/* Botón de Enviar */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 animate-fade-in animation-delay-400"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-1 4h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span>Iniciar Sesión</span>
            </button>
          </form>

          {/* Enlace de Registro */}
          <p className="mt-6 text-center text-gray-600 animate-fade-in animation-delay-500">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-purple-600 hover:text-purple-800 hover:underline font-semibold transition-all duration-200">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

// Animaciones CSS personalizadas
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
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-slide-up { animation: slide-up 1s ease-out; }
  .animate-pulse-slow { animation: pulse-slow 3s infinite; }
  .animate-bounce { animation: bounce 1.5s infinite; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-500 { animation-delay: 500ms; }
  .animation-delay-1000 { animation-delay: 1000ms; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default Login;