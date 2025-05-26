import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/slices/productSlice';
import { useEffect } from 'react';

const ErrorFallback = ({ error }) => (
  <div className="text-center py-4 text-red-500">
    <h2>Oops! Algo salió mal.</h2>
    <p>{error.message}</p>
    <button onClick={() => window.location.reload()} className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
      Recargar
    </button>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {loading && <div className="text-center py-4">Cargando productos...</div>}
        {error && <div className="text-center py-4 text-red-500">Error: {error}</div>}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default App;