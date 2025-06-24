import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renderiza a página inicial com o título Bem-vindo', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const title = screen.getByText(/Bem-vindo!/i);
  expect(title).toBeInTheDocument();
});
