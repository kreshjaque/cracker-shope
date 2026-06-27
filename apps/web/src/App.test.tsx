import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders customer catalog and product detail view', async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getByRole('heading', { name: /cracker shope/i })).toBeInTheDocument();
  expect(screen.getByText(/browse crackers/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /admin office/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /view classic gold sparklers/i }));
  expect(screen.getByRole('heading', { name: /classic gold sparklers/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /back to catalog/i })).toBeInTheDocument();
});
