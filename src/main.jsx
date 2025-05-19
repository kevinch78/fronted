import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import './index.css';
import Catalog from './pages/Catalog.jsx'; // Importamos la página que crearemos
import Store from './pages/Store.jsx';
import Login from './pages/Login.jsx'; // Añadimos Login
import Register from './pages/Register.jsx'; // Añadimos Register
import StoreManagement from './pages/StoreManagement.jsx'; // Añadimos StoreManagement

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<Catalog />} />
            <Route path="almacenes" element={<Store/>} />
            <Route path="login" element={<Login />} /> {/* Nueva ruta */}
            <Route path="register" element={<Register />} /> {/* Nueva ruta */}
            <Route path="store-management" element={<StoreManagement />} /> {/* Nueva ruta */}
            <Route path="sobre-nosotros" element={<div>Sobre Nosotros Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);