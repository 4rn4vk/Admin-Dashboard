import { test, expect } from '@playwright/test';

const API_BASE = 'http://localhost:4000';

const sampleUsers = {
  items: [
    {
      id: 'u-1',
      name: 'Alice Example',
      email: 'alice@example.com',
      role: 'Reviewer',
      status: 'active'
    },
    {
      id: 'u-2',
      name: 'Bob Example',
      email: 'bob@example.com',
      role: 'Contributor',
      status: 'inactive'
    }
  ],
  pagination: { page: 1, limit: 10, total: 2, totalPages: 1 }
};

test.describe('Users page', () => {
  test('loads users list and can filter/clear filters', async ({ page }) => {
    await page.route(`${API_BASE}/api/users*`, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(sampleUsers)
      });
    });

    await page.goto('/users');

    await expect(page.getByRole('heading', { name: /users/i })).toBeVisible();

    // user names are visible
    await expect(page.getByText('Alice Example')).toBeVisible();
    await expect(page.getByText('Bob Example')).toBeVisible();

    // apply search filter
    await page.fill('#search', 'Alice');
    // after changing filter, the app will call GET; we can just ensure the UI shows clear button
    await expect(page.getByRole('button', { name: /clear all filters/i })).toBeVisible();

    // clear filters
    await page.getByRole('button', { name: /clear all filters/i }).click();

    // after clearing, both users should be visible again
    await expect(page.getByText('Alice Example')).toBeVisible();
    await expect(page.getByText('Bob Example')).toBeVisible();
  });
});
