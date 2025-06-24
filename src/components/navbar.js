import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Título */}
        <span className="text-xl font-bold text-blue-600">Atividade P2</span>

        {/* Links de navegação */}
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/users"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Usuários
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Produtos
          </Link>
          <Link
            to="/buckets"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Buckets
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
