import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import logito from '../../assets/img/logito.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    setDropdownOpen(false);
    navigate('/');
  };

  // Función para normalizar texto y eliminar acentos
  const normalizeUrl = (text) => {
    return text
      .toLowerCase()
      .replace(' ', '-')
      .normalize('NFD') // Descompone caracteres con acentos
      .replace(/[\u0300-\u036f]/g, ''); // Elimina los acentos
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-xl py-4 px-6 flex items-center justify-between relative z-20">
      {/* Logo */}
      <Link to="/" className="flex items-center animate-fade-in">
        <img src={logito} alt="Logo" className="w-auto h-20 object-contain mx-5 hover:scale-105 transition-transform duration-300" />
      </Link>

      {/* Botón Hamburguesa para Móviles */}
      <button
        className="md:hidden text-white focus:outline-none hover:text-purple-300 transition-colors duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-8 h-8 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menú de Navegación - Desktop */}
      <div className="hidden md:flex space-x-8 items-center">
        {['Inicio', 'Catálogo', 'Almacenes', 'Sobre nosotros'].map((item, index) => (
          <Link
            key={item}
            to={item === 'Inicio' ? '/' : `/${normalizeUrl(item)}`} // Normalizamos la URL
            className={`text-white hover:text-purple-300 font-medium transition-colors duration-300 relative group animate-fade-in animation-delay-${index * 100}`}
          >
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Buscador y Perfil - Desktop */}
      <div className="hidden md:flex items-center space-x-5">
        {/* Buscador */}
        <div className="flex items-center space-x-2 animate-fade-in animation-delay-400">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos, tiendas y más 🔍"
              className="border border-purple-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-md w-72 transition-all duration-300 hover:border-purple-400"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Ícono de Perfil con Dropdown */}
        <div className="relative animate-fade-in animation-delay-500">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white hover:text-purple-300 transition-colors duration-200 relative group"
          >
            <svg className="w-7 h-7 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 19.071a8 8 0 1113.858 0A2 2 0 0116 21H8a2 2 0 01-1.879-1.929zM12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 animate-slide-down">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors duration-200"
                >
                  Iniciar Sesión
                </Link>
              ) : (
                <>
                  {role === 'almacen' && (
                    <Link
                      to="/store-management"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors duration-200"
                    >
                      Gestión de Almacén
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors duration-200"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Menú + Buscador - Mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-purple-700 to-purple-900 shadow-xl z-10 flex flex-col space-y-4 p-6 animate-slide-down">
          {['Inicio', 'Catálogo', 'Almacenes', 'Sobre nosotros'].map((item, index) => (
            <Link
              key={item}
              to={item === 'Inicio' ? '/' : `/${normalizeUrl(item)}`} // Normalizamos la URL aquí también
              className={`text-white hover:text-purple-300 font-medium transition-colors duration-200 animate-fade-in animation-delay-${index * 100}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-purple-300 font-medium transition-colors duration-200 animate-fade-in animation-delay-400"
            >
              Iniciar Sesión
            </Link>
          ) : (
            <>
              {role === 'almacen' && (
                <Link
                  to="/store-management"
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-purple-300 font-medium transition-colors duration-200 animate-fade-in animation-delay-400"
                >
                  Gestión de Almacén
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white hover:text-purple-300 font-medium text-left transition-colors duration-200 animate-fade-in animation-delay-500"
              >
                Cerrar Sesión
              </button>
            </>
          )}
          <div className="flex items-center space-x-2 mt-4 animate-fade-in animation-delay-600">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos 🔍"
                className="w-full border border-purple-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-md transition-all duration-300"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Animaciones CSS personalizadas
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-down {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-slide-down { animation: slide-down 0.5s ease-out; }
  .animate-pulse-slow { animation: pulse-slow 2s infinite; }
  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-500 { animation-delay: 500ms; }
  .animation-delay-600 { animation-delay: 600ms; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default Navbar;