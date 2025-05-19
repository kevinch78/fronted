import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from '../store/slices/authSlice';

const Profile = () => {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState({
    name: '',
    address: '',
    contact: '',
    hours: '',
    logo: '',
  });
  const [error, setError] = useState('');

  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeData.name || !storeData.address) {
      setError('Nombre y dirección son obligatorios');
      return;
    }
    // Simulación: Guardar datos del almacén (puedes conectar a una API más adelante)
    console.log('Datos del almacén guardados:', storeData);
    setError('');
  };

  if (!user) {
    return <p className="text-center mt-10">Por favor, inicia sesión para gestionar tu perfil.</p>;
  }

  return (
    <section className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Perfil</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Rol Actual: {role}</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => handleRoleChange('cliente')}
            className={`px-4 py-2 rounded-lg ${role === 'cliente' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-purple-500 transition-colors`}
          >
            Cliente
          </button>
          <button
            onClick={() => handleRoleChange('almacen')}
            className={`px-4 py-2 rounded-lg ${role === 'almacen' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-purple-500 transition-colors`}
          >
            Almacén
          </button>
        </div>
      </div>

      {role === 'almacen' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Datos del Almacén</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Nombre Comercial</label>
              <input
                type="text"
                name="name"
                value={storeData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Nombre del almacén"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Dirección</label>
              <input
                type="text"
                name="address"
                value={storeData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Dirección del almacén"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Datos de Contacto</label>
              <input
                type="text"
                name="contact"
                value={storeData.contact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Teléfono o email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Horario</label>
              <input
                type="text"
                name="hours"
                value={storeData.hours}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Ej: Lunes a Viernes 9:00-18:00"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Logo (URL)</label>
              <input
                type="text"
                name="logo"
                value={storeData.logo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="URL del logo"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Guardar Datos
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Profile;