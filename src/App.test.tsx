import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders hero headline', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: /admin dashboard starter/i })
    ).toBeVisible();
  });

  it('increments the counter', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /bump score/i });

    button.click();
    expect(button).toHaveTextContent(/1\)$/);
  });
});
