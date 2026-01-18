import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import axe from 'axe-core';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// Basic axe-core accessibility smoke test. We disable color contrast checks in
// jsdom because it often produces false positives in test environments.
test('App has no detectable accessibility violations (axe-core)', async () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const results = await (axe as any).run(container as unknown as Element, {
    rules: {
      'color-contrast': { enabled: false }
    }
  });

  expect(results.violations).toHaveLength(0);
});
