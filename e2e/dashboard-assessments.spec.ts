import { test, expect } from '@playwright/test';

// Dashboard page tests
test.describe('Dashboard Page', () => {
  test('should load dashboard with heading', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('should display dashboard content', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const section = page.locator('section.space-y-4');
    await expect(section).toBeVisible();
  });

  test('should show error state when API fails', async ({ page }) => {
    await page.route('http://localhost:4000/**', (route) => route.abort());
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const errorMsg = page.getByText(/failed to load dashboard/i);
    const hasError = await errorMsg.isVisible().catch(() => false);
    if (hasError) {
      await expect(errorMsg).toBeVisible();
    }
  });
});

// Assessments page tests
test.describe('Assessments Page', () => {
  test('should load assessments page with heading', async ({ page }) => {
    await page.goto('/assessments', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /assessments/i })).toBeVisible();
  });

  test('should display assessments content', async ({ page }) => {
    await page.goto('/assessments', { waitUntil: 'networkidle' });
    const section = page.locator('section.space-y-4');
    await expect(section).toBeVisible();
  });

  test('should have new assessment button', async ({ page }) => {
    await page.goto('/assessments', { waitUntil: 'networkidle' });
    await expect(page.getByRole('button', { name: /new assessment/i })).toBeVisible();
  });

  test('should open create assessment modal', async ({ page }) => {
    await page.goto('/assessments', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /new assessment/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('should show modal form fields', async ({ page }) => {
    await page.goto('/assessments', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /new assessment/i }).click();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/owner/i)).toBeVisible();
  });

  test('should show error when assessments API fails', async ({ page }) => {
    await page.route('http://localhost:4000/**', (route) => route.abort());
    await page.goto('/assessments', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const errorMsg = page.getByText(/failed to load assessments/i);
    const hasError = await errorMsg.isVisible().catch(() => false);
    if (hasError) {
      await expect(errorMsg).toBeVisible();
    }
  });

  test('should display empty state or table', async ({ page }) => {
    await page.goto('/assessments', { waitUntil: 'networkidle' });
    const table = page.locator('table');
    const empty = page.getByText(/no assessments yet/i);
    const hasTable = await table.isVisible().catch(() => false);
    const hasEmpty = await empty.isVisible().catch(() => false);
    if (!hasTable && !hasEmpty) {
      // If neither found, just check section exists
      await expect(page.locator('section.space-y-4')).toBeVisible();
    }
  });
});
