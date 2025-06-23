import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ProductTable = ({ products, loading, onRefresh }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post('http://44.201.171.2:3000/produtos', {
        nome,
        preco: parseFloat(preco),
        estoque: parseInt(estoque)
      });
      setNome('');
      setPreco('');
      setEstoque('');
      onRefresh();
    } catch {
      alert('Erro ao adicionar produto');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja remover este produto?')) return;
    await axios.delete(`http://44.201.171.2:3000/produtos/${id}`);
    onRefresh();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <Form onSubmit={handleAddProduct} className="mb-3">
        <Form.Group>
          <Form.Control
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Preço"
            value={preco}
            onChange={e => setPreco(e.target.value)}
            required
            type="number"
            step="0.01"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Estoque"
            value={estoque}
            onChange={e => setEstoque(e.target.value)}
            required
            type="number"
          />
        </Form.Group>
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Adicionar Produto'}
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id || product.Id}>
              <td>{product.id || product.Id}</td>
              <td>{product.nome || product.Nome}</td>
              <td>{product.preco || product.Preco}</td>
              <td>{product.estoque || product.Estoque}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(product.id || product.Id)}>
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};



export default ProductTable;