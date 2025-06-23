import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UserTable = ({ users, loading, onRefresh }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post('http://44.201.171.2:3000/usuarios', { nome, email });
      setNome('');
      setEmail('');
      onRefresh();
    } catch {
      alert('Erro ao adicionar usuário');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja remover este usuário?')) return;
    await axios.delete(`http://44.201.171.2:3000/usuarios/${id}`);
    onRefresh();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <Form onSubmit={handleAddUser} className="mb-3">
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
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            type="email"
          />
        </Form.Group>
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Adicionar Usuário'}
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
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

export default UserTable;