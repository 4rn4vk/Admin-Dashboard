import { test, expect } from '@playwright/test';

const API_BASE = 'http://localhost:4000';

const sampleAssessment = {
  id: 'a-1',
  name: 'Playwright Test Assessment',
  status: 'scheduled',
  owner: 'Test Owner',
  createdAt: new Date().toISOString(),
  priority: 'medium'
};

test.describe('Assessments - listing and create flow', () => {
  test('loads assessments list and shows a row', async ({ page }) => {
    // stub GET /api/assessments
    await page.route(`${API_BASE}/api/assessments*`, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [sampleAssessment],
          pagination: { page: 1, limit: 10, total: 1, totalPages: 1 }
        })
      });
    });

    await page.goto('/assessments');

    await expect(page.getByRole('heading', { name: /assessments/i })).toBeVisible();
    // table row should contain the assessment name
    await expect(page.getByText(sampleAssessment.name)).toBeVisible();
  });

  test('creates a new assessment via modal and shows toast', async ({ page }) => {
    // initial GET returns empty list
    await page.route(`${API_BASE}/api/assessments*`, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 1 }
        })
      });
    });

    // intercept POST to create assessment and return created entity
    await page.route(`${API_BASE}/api/assessments`, async (route, request) => {
      const reqBody = await request.postDataJSON();
      const created = {
        id: 'a-new',
        name: reqBody.name,
        status: reqBody.status,
        owner: reqBody.owner,
        priority: reqBody.priority,
        createdAt: new Date().toISOString()
      };
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(created)
      });
    });

    // After create, when the app refetches GET, return list containing created item
    let getCallCount = 0;
    await page.route(`${API_BASE}/api/assessments*`, (route) => {
      getCallCount++;
      if (getCallCount === 1) {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            items: [],
            pagination: { page: 1, limit: 10, total: 0, totalPages: 1 }
          })
        });
      } else {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            items: [sampleAssessment],
            pagination: { page: 1, limit: 10, total: 1, totalPages: 1 }
          })
        });
      }
    });

    await page.goto('/assessments');

    // open modal
    await page.getByRole('button', { name: /\+ New Assessment/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: /create new assessment/i })).toBeVisible();

    // fill form
    await page.fill('#name', 'Playwright Created');
    await page.fill('#owner', 'Playwright User');
    await page.selectOption('#status', 'scheduled');
    await page.selectOption('#priority', 'high');

    // submit and wait for toast (target button inside the dialog to avoid duplicate matches)
    await page
      .getByRole('dialog')
      .getByRole('button', { name: /create assessment/i })
      .click();

    await expect(
      page
        .getByRole('status', { name: /success notification/i })
        .locator('text=Assessment created successfully')
    ).toBeVisible();

    // confirm modal closed and new item appears in table
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByText(sampleAssessment.name)).toBeVisible();
  });
});
