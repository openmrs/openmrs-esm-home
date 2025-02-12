import { test, expect } from '@playwright/test';
import { HomePage } from '../pages';

// This test is a sample E2E test. You can delete it.

test('sample-test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(page.getByText('Clinic')).toBeVisible();
});
