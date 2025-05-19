import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateStoreData, addProduct, toggleAdvertising, addCampaign, addReservation } from '../store/slices/authSlice';

const StoreManagement = () => {
  const { isAuthenticated, role, storeData, inventory, advertising, reservations } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || role !== 'almacen') {
      navigate('/login'); // Redirige si no está autenticado o no es almacén
    }
  }, [isAuthenticated, role, navigate]);

  // Estados para formularios
  const [storeForm, setStoreForm] = useState(storeData);
  const [productForm, setProductForm] = useState({ id: Date.now(), name: '', price: '', sizes: '', colors: '', stock: '' });
  const [campaignForm, setCampaignForm] = useState({ id: Date.now(), startDate: '', endDate: '' });

  const handleStoreUpdate = (e) => {
    e.preventDefault();
    dispatch(updateStoreData(storeForm));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(productForm));
    setProductForm({ id: Date.now(), name: '', price: '', sizes: '', colors: '', stock: '' });
  };

  const handleToggleAdvertising = () => {
    dispatch(toggleAdvertising(!advertising.activePlan));
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    dispatch(addCampaign({ ...campaignForm, status: 'activa' }));
    setCampaignForm({ id: Date.now(), startDate: '', endDate: '' });
  };

  const handleReservationSubmit = () => {
    const reservation = { id: Date.now(), date: new Date().toISOString(), status: 'pendiente' };
    dispatch(addReservation(reservation));
  };

  if (!isAuthenticated || role !== 'almacen') return null; // Renderizado condicional

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Almacén</h2>

      {/* Gestión de Perfil */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Actualizar Datos del Almacén</h3>
        <form onSubmit={handleStoreUpdate} className="space-y-4">
          <input
            type="text"
            value={storeForm.name}
            onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
            placeholder="Nombre comercial"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            value={storeForm.address}
            onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
            placeholder="Dirección"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            value={storeForm.contact}
            onChange={(e) => setStoreForm({ ...storeForm, contact: e.target.value })}
            placeholder="Datos de contacto"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            value={storeForm.schedule}
            onChange={(e) => setStoreForm({ ...storeForm, schedule: e.target.value })}
            placeholder="Horario"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            value={storeForm.logo}
            onChange={(e) => setStoreForm({ ...storeForm, logo: e.target.value })}
            placeholder="URL del logo"
            className="w-full p-2 border rounded-lg"
          />
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
            Actualizar
          </button>
        </form>
      </div>

      {/* Inventario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Inventario</h3>
        <form onSubmit={handleProductSubmit} className="space-y-4 mb-4">
          <input
            type="text"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            placeholder="Nombre del producto"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="number"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            placeholder="Precio"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            value={productForm.sizes}
            onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
            placeholder="Tallas (ej: S,M,L)"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            value={productForm.colors}
            onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
            placeholder="Colores (ej: Negro,Rojo)"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            value={productForm.stock}
            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
            placeholder="Stock inicial"
            className="w-full p-2 border rounded-lg"
            required
          />
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
            Agregar Producto
          </button>
        </form>
        <h4 className="font-medium mb-2">Productos:</h4>
        <ul className="list-disc pl-5">
          {inventory.map((prod) => (
            <li key={prod.id}>{prod.name} - ${prod.price} (Stock: {prod.stock})</li>
          ))}
        </ul>
      </div>

      {/* Publicidad */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Publicidad</h3>
        <button
          onClick={handleToggleAdvertising}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 mb-4"
        >
          {advertising.activePlan ? 'Desactivar Plan' : 'Activar Plan (Pago Simulado)'}
        </button>
        <form onSubmit={handleCampaignSubmit} className="space-y-4">
          <input
            type="date"
            value={campaignForm.startDate}
            onChange={(e) => setCampaignForm({ ...campaignForm, startDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="date"
            value={campaignForm.endDate}
            onChange={(e) => setCampaignForm({ ...campaignForm, endDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
            Crear Campaña
          </button>
        </form>
        <h4 className="font-medium mt-4 mb-2">Campañas:</h4>
        <ul className="list-disc pl-5">
          {advertising.campaigns.map((camp) => (
            <li key={camp.id}>{camp.startDate} - {camp.endDate} ({camp.status})</li>
          ))}
        </ul>
      </div>

      {/* Reservas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Reservas</h3>
        <button
          onClick={handleReservationSubmit}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 mb-4"
        >
          Agregar Reserva (Simulada)
        </button>
        <h4 className="font-medium mb-2">Reservas Pendientes:</h4>
        <ul className="list-disc pl-5">
          {reservations.map((res) => (
            <li key={res.id}>{res.date} ({res.status})</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StoreManagement;