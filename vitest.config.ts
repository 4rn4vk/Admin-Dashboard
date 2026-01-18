import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    exclude: ['node_modules/**', 'e2e/**', 'node_modules/**/types/**'],
    environment: 'jsdom',
    globals: true
  }
});
