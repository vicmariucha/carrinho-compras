import { render, screen } from '@testing-library/react';
import App from './App';

test('renders store name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Lojinha Mariucha/i);
  expect(linkElement).toBeInTheDocument();
});
