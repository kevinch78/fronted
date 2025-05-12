// import { Link } from 'react-router-dom';
// import logito from '../../assets/img/logito.webp'; // Ruta ajustada según tu estructura

// const Navbar = () => {
//   return (
//     <nav className="bg-purple-dark shadow-lg py-3 px-6 flex items-center justify-between">
//       {/* Logo alineado a la izquierda, sin recuadro */}
//       <Link to="/" className="flex items-center ">
//         <img
//           src={logito}
//           alt="Logo"
//           className="w-auto h-20 object-contain mx-5 " // Ajustamos el tamaño para que sea más visible
//         />
//       </Link>

//       {/* Menú de navegación */}
//       <div className="flex space-x-8">
//         <Link to="/" className="text-white hover:text-purple-300 font-medium transition-colors">
//           Inicio
//         </Link>
//         <Link to="/catalogo" className="text-white hover:text-purple-300 font-medium transition-colors">
//           Catálogo
//         </Link>
//         <Link to="/almacenes" className="text-white hover:text-purple-300 font-medium transition-colors">
//           Almacenes
//         </Link>
//         <Link to="/sobre-nosotros" className="text-white hover:text-purple-300 font-medium transition-colors">
//           Sobre nosotros
//         </Link>
//       </div>

//       {/* Buscador */}
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="Buscar productos, tiendas y más"
//           className="border border-gray-300 rounded-lg px-4 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm w-64"
//         />
//         <button className="text-white hover:text-purple-300 transition-colors">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import logito from '../../assets/img/logito.webp';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-dark shadow-lg py-3 px-6 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logito} alt="Logo" className="w-auto h-20 object-contain mx-5" />
      </Link>

      {/* Botón hamburguesa para móviles */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menú de navegación - desktop */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-white hover:text-purple-300 font-medium transition-colors">Inicio</Link>
        <Link to="/catalogo" className="text-white hover:text-purple-300 font-medium transition-colors">Catálogo</Link>
        <Link to="/almacenes" className="text-white hover:text-purple-300 font-medium transition-colors">Almacenes</Link>
        <Link to="/sobre-nosotros" className="text-white hover:text-purple-300 font-medium transition-colors">Sobre nosotros</Link>
      </div>

      {/* Buscador - desktop */}
      <div className="hidden md:flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar productos, tiendas y más"
          className="border border-gray-300 rounded-lg px-4 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow-sm w-64"
        />
        <button className="text-white hover:text-purple-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Menú + Buscador - mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-purple-dark shadow-md z-10 flex flex-col space-y-4 p-4">
          <Link to="/" className="text-white hover:text-purple-300 font-medium">Inicio</Link>
          <Link to="/catalogo" className="text-white hover:text-purple-300 font-medium">Catálogo</Link>
          <Link to="/almacenes" className="text-white hover:text-purple-300 font-medium">Almacenes</Link>
          <Link to="/sobre-nosotros" className="text-white hover:text-purple-300 font-medium">Sobre nosotros</Link>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              placeholder="Buscar productos"
              className="w-full border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none"
            />
            <button className="text-white hover:text-purple-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
