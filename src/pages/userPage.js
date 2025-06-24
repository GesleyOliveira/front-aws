import React, { useState, useEffect } from 'react';
import api from '../../front-aws-main/src/services/api';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nome: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await api.get('usuarios');
      setUsers(response.data);
      setLoading(false);
    } catch {
      setError('Erro ao carregar usuários');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`usuarios/${editingId}`, formData);
      } else {
        await api.post('usuarios', formData);
      }
      setFormData({ nome: '', email: '' });
      setEditingId(null);
      fetchUsers();
    } catch {
      setError(editingId ? 'Erro ao atualizar usuário' : 'Erro ao criar usuário');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await api.delete(`usuarios/${id}`);
        fetchUsers();
      } catch {
        setError('Erro ao deletar usuário');
      }
    }
  };

  const handleEdit = (user) => {
    setFormData({ nome: user.nome, email: user.email });
    setEditingId(user._id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <span className="ml-4 text-blue-700 font-medium">Carregando...</span>
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
          {editingId ? 'Editar Usuário' : 'Criar Usuário'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
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
              onClick={() => {
                setEditingId(null);
                setFormData({ nome: '', email: '' });
              }}
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
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{user.nome}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-1 px-3 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
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

export default UserPage;
