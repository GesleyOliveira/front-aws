import React, { useState, useEffect } from 'react';
import api from '../../front-aws-main/src/services/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nome: '', preco: '', estoque: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/produtos');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar produtos');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/produtos/${editingId}`, formData);
      } else {
        await api.post('/produtos', formData);
      }
      setFormData({ nome: '', preco: '', estoque: '' });
      setEditingId(null);
      await fetchProducts();
    } catch (err) {
      setError(editingId ? 'Erro ao atualizar produto' : 'Erro ao criar produto');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await api.delete(`/produtos/${id}`);
        await fetchProducts();
      } catch (err) {
        setError('Erro ao deletar produto');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      nome: product.nome,
      preco: product.preco,
      estoque: product.estoque,
    });
    setEditingId(product.id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ nome: '', preco: '', estoque: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 mb-10"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          {editingId ? 'Editar Produto' : 'Novo Produto'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-600 mb-1">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-600 mb-1">
              Preço
            </label>
            <input
              id="preco"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="estoque" className="block text-sm font-medium text-gray-600 mb-1">
              Estoque
            </label>
            <input
              id="estoque"
              type="number"
              value={formData.estoque}
              onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md"
          >
            {editingId ? 'Atualizar' : 'Criar'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-5 rounded-md"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">Preço</th>
              <th className="text-left px-4 py-3">Estoque</th>
              <th className="text-left px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{product.nome}</td>
                <td className="px-4 py-2">R$ {Number(product.preco).toFixed(2)}</td>
                <td className="px-4 py-2">{product.estoque}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-1 px-3 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
