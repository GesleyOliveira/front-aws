import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import UserPage from './pages/userPage';
import Navbar from './components/navbar';
import ProductsPage from './pages/productsPage';
import BucketsPage from './pages/bucketsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* Navbar fixa no topo */}
        <header className="shadow z-10">
          <Navbar />
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/buckets" element={<BucketsPage />} />
          </Routes>
        </main>

        {/* Rodapé opcional */}
        {/* <footer className="text-center text-sm text-gray-500 py-4">
          © {new Date().getFullYear()} Seu Nome. Todos os direitos reservados.
        </footer> */}
      </div>
    </Router>
  );
}

export default App;
