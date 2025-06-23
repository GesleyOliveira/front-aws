import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://54.146.126.47'; // ajuste se necessário

export default function App() {
  // Usuários
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  // Produtos
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  // Feedback
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');

  // Carregar dados
  const fetchAll = async () => {
    setLoading(true);
    setErro('');
    try {
      const [usuariosRes, produtosRes] = await Promise.all([
        axios.get(`${API_URL}/usuarios`),
        axios.get(`${API_URL}/produtos`)
      ]);
      setUsuarios(usuariosRes.data);
      setProdutos(produtosRes.data);
    } catch (e) {
      setErro('Erro ao carregar dados.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Usuários
  const handleAddUsuario = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErro('');
    try {
      await axios.post(`${API_URL}/usuarios`, { nome, email });
      setNome('');
      setEmail('');
      setMsg('Usuário cadastrado com sucesso!');
      fetchAll();
    } catch {
      setErro('Erro ao cadastrar usuário.');
    }
    setLoading(false);
  };

  const handleDeleteUsuario = async (id) => {
    if (!window.confirm('Deseja remover este usuário?')) return;
    setLoading(true);
    setMsg('');
    setErro('');
    try {
      await axios.delete(`${API_URL}/usuarios/${id}`);
      setMsg('Usuário removido!');
      fetchAll();
    } catch {
      setErro('Erro ao remover usuário.');
    }
    setLoading(false);
  };

  // Produtos
  const handleAddProduto = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErro('');
    try {
      await axios.post(`${API_URL}/produtos`, {
        nome: nomeProduto,
        preco: parseFloat(preco),
        estoque: parseInt(estoque)
      });
      setNomeProduto('');
      setPreco('');
      setEstoque('');
      setMsg('Produto cadastrado com sucesso!');
      fetchAll();
    } catch {
      setErro('Erro ao cadastrar produto.');
    }
    setLoading(false);
  };

  const handleDeleteProduto = async (id) => {
    if (!window.confirm('Deseja remover este produto?')) return;
    setLoading(true);
    setMsg('');
    setErro('');
    try {
      await axios.delete(`${API_URL}/produtos/${id}`);
      setMsg('Produto removido!');
      fetchAll();
    } catch {
      setErro('Erro ao remover produto.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Administração</h1>

        {msg && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{msg}</div>}
        {erro && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{erro}</div>}
        {loading && (
          <div className="mb-4 flex justify-center">
            <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Usuários */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-blue-600">Usuários</h2>
            <form onSubmit={handleAddUsuario} className="flex flex-col md:flex-row gap-2 mb-4">
              <input
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                disabled={loading}
              />
              <input
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                type="email"
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                Adicionar
              </button>
            </form>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-2 px-3 text-left">Nome</th>
                    <th className="py-2 px-3 text-left">Email</th>
                    <th className="py-2 px-3 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(u => (
                    <tr key={u._id} className="border-t">
                      <td className="py-2 px-3">{u.nome}</td>
                      <td className="py-2 px-3">{u.email}</td>
                      <td className="py-2 px-3">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          onClick={() => handleDeleteUsuario(u._id)}
                          disabled={loading}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                  {usuarios.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-2 px-3 text-center text-gray-500">
                        Nenhum usuário cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Produtos */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-blue-600">Produtos</h2>
            <form onSubmit={handleAddProduto} className="flex flex-col md:flex-row gap-2 mb-4">
              <input
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Nome"
                value={nomeProduto}
                onChange={e => setNomeProduto(e.target.value)}
                required
                disabled={loading}
              />
              <input
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Preço"
                value={preco}
                onChange={e => setPreco(e.target.value)}
                required
                type="number"
                step="0.01"
                disabled={loading}
              />
              <input
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Estoque"
                value={estoque}
                onChange={e => setEstoque(e.target.value)}
                required
                type="number"
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                Adicionar
              </button>
            </form>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-2 px-3 text-left">Nome</th>
                    <th className="py-2 px-3 text-left">Preço</th>
                    <th className="py-2 px-3 text-left">Estoque</th>
                    <th className="py-2 px-3 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map(p => (
                    <tr key={p.id} className="border-t">
                      <td className="py-2 px-3">{p.nome}</td>
                      <td className="py-2 px-3">R$ {Number(p.preco).toFixed(2)}</td>
                      <td className="py-2 px-3">{p.estoque}</td>
                      <td className="py-2 px-3">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          onClick={() => handleDeleteProduto(p.id)}
                          disabled={loading}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                  {produtos.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-2 px-3 text-center text-gray-500">
                        Nenhum produto cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

