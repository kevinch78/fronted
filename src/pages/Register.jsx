import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(login({ email, name, role, storeData: role === 'almacen' ? { name: '', address: '', contact: '', schedule: '', logo: '' } : null }));
      navigate('/');
    } else {
      setError('Por favor, completa todos los campos');
    }
  };

  return (
    <section className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Cuenta</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="user">Usuario</option>
              <option value="almacen">Almacén</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Crear Cuenta
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-purple-600 hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { login } from '../store/slices/authSlice'; // Usamos login para simular registro exitoso

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulación de registro (puedes reemplazar con una llamada a API)
//     if (name && email && password) {
//       // Simulamos que el registro crea un usuario y lo loguea automáticamente
//       dispatch(login({ email, name }));
//       navigate('/'); // Redirige a la página de inicio
//     } else {
//       setError('Por favor, completa todos los campos');
//     }
//   };

//   return (
//     <section className="max-w-md mx-auto py-12 px-4">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Cuenta</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Nombre</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="Tu nombre"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2">Correo</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="tu@email.com"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2">Contraseña</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Crear Cuenta
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           ¿Ya tienes cuenta? <Link to="/login" className="text-purple-600 hover:underline">Inicia Sesión</Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Register;