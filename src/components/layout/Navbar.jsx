import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import logito from '../../assets/img/logito.webp';

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

  return (
    <nav className="bg-purple-dark shadow-lg py-3 px-6 flex items-center justify-between relative">
      <Link to="/" className="flex items-center">
        <img src={logito} alt="Logo" className="w-auto h-20 object-contain mx-5" />
      </Link>
      <button className="md:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-white hover:text-purple-300 font-medium transition-colors">Inicio</Link>
        <Link to="/catalogo" className="text-white hover:text-purple-300 font-medium transition-colors">Catálogo</Link>
        <Link to="/almacenes" className="text-white hover:text-purple-300 font-medium transition-colors">Almacenes</Link>
        <Link to="/sobre-nosotros" className="text-white hover:text-purple-300 font-medium transition-colors">Sobre nosotros</Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar productos, tiendas y más"
            className="border border-gray-300 rounded-lg px-4 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm w-64"
          />
          <button className="text-white hover:text-purple-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white hover:text-purple-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 19.071a8 8 0 1113.858 0A2 2 0 0116 21H8a2 2 0 01-1.879-1.929zM12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors">
                    Iniciar Sesión
                  </Link>
                </>
              ) : (
                <>
                  {role === 'almacen' && (
                    <Link to="/store-management" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors">
                      Gestión de Almacén
                    </Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors">
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-purple-dark shadow-md z-10 flex flex-col space-y-4 p-4">
          <Link to="/" className="text-white hover:text-purple-300 font-medium">Inicio</Link>
          <Link to="/catalogo" className="text-white hover:text-purple-300 font-medium">Catálogo</Link>
          <Link to="/almacenes" className="text-white hover:text-purple-300 font-medium">Almacenes</Link>
          <Link to="/sobre-nosotros" className="text-white hover:text-purple-300 font-medium">Sobre nosotros</Link>
          {!isAuthenticated ? (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-white hover:text-purple-300 font-medium">
              Iniciar Sesión
            </Link>
          ) : (
            <>
              {role === 'almacen' && (
                <Link to="/store-management" onClick={() => setMenuOpen(false)} className="text-white hover:text-purple-300 font-medium">
                  Gestión de Almacén
                </Link>
              )}
              <button onClick={handleLogout} className="text-white hover:text-purple-300 font-medium text-left">
                Cerrar Sesión
              </button>
            </>
          )}
          <div className="flex items-center space-x-2 mt-2">
            <input type="text" placeholder="Buscar productos" className="w-full border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none" />
            <button className="text-white hover:text-purple-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Añadimos useNavigate
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../store/slices/authSlice';
// import logito from '../../assets/img/logito.webp';

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para el dropdown
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     setMenuOpen(false);
//     setDropdownOpen(false); // Cerramos el dropdown al cerrar sesión
//     navigate('/'); // Redirigimos a la página de inicio
//   };

//   return (
//     <nav className="bg-purple-dark shadow-lg py-3 px-6 flex items-center justify-between relative">
//       {/* Logo */}
//       <Link to="/" className="flex items-center">
//         <img src={logito} alt="Logo" className="w-auto h-20 object-contain mx-5" />
//       </Link>

//       {/* Botón hamburguesa para móviles */}
//       <button
//         className="md:hidden text-white focus:outline-none"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Menú de navegación - desktop */}
//       <div className="hidden md:flex space-x-8">
//         <Link to="/" className="text-white hover:text-purple-300 font-medium transition-colors">Inicio</Link>
//         <Link to="/catalogo" className="text-white hover:text-purple-300 font-medium transition-colors">Catálogo</Link>
//         <Link to="/almacenes" className="text-white hover:text-purple-300 font-medium transition-colors">Almacenes</Link>
//         <Link to="/sobre-nosotros" className="text-white hover:text-purple-300 font-medium transition-colors">Sobre nosotros</Link>
//       </div>

//       {/* Buscador y Perfil - desktop */}
//       <div className="hidden md:flex items-center space-x-4">
//         {/* Buscador */}
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Buscar productos, tiendas y más"
//             className="border border-gray-300 rounded-lg px-4 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm w-64"
//           />
//           <button className="text-white hover:text-purple-300 transition-colors">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </button>
//         </div>

//         {/* Ícono de Perfil con Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="text-white hover:text-purple-300 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 19.071a8 8 0 1113.858 0A2 2 0 0116 21H8a2 2 0 01-1.879-1.929zM12 11a4 4 0 100-8 4 4 0 000 8z" />
//             </svg>
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
//               {isAuthenticated ? (
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors"
//                 >
//                   Cerrar Sesión
//                 </button>
//               ) : (
//                 <Link
//                   to="/login"
//                   onClick={() => setDropdownOpen(false)}
//                   className="block px-4 py-2 text-gray-700 hover:bg-purple-100 transition-colors"
//                 >
//                   Iniciar Sesión
//                 </Link>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Menú + Buscador - mobile */}
//       {menuOpen && (
//         <div className="md:hidden absolute top-full left-0 w-full bg-purple-dark shadow-md z-10 flex flex-col space-y-4 p-4">
//           <Link to="/" className="text-white hover:text-purple-300 font-medium">Inicio</Link>
//           <Link to="/catalogo" className="text-white hover:text-purple-300 font-medium">Catálogo</Link>
//           <Link to="/almacenes" className="text-white hover:text-purple-300 font-medium">Almacenes</Link>
//           <Link to="/sobre-nosotros" className="text-white hover:text-purple-300 font-medium">Sobre nosotros</Link>
//           {isAuthenticated ? (
//             <button
//               onClick={handleLogout}
//               className="text-white hover:text-purple-300 font-medium text-left"
//             >
//               Cerrar Sesión
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               onClick={() => setMenuOpen(false)}
//               className="text-white hover:text-purple-300 font-medium"
//             >
//               Iniciar Sesión
//             </Link>
//           )}
//           <div className="flex items-center space-x-2 mt-2">
//             <input
//               type="text"
//               placeholder="Buscar productos"
//               className="w-full border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none"
//             />
//             <button className="text-white hover:text-purple-300">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;