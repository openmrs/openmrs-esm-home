import { HomePage } from "../pages";
import { test } from '../core';

test('View active visits', async ({ page }) => {
  const homePage = new HomePage(page);
 

  await test.step('When I visit the home page', async () => {
    await homePage.goto();
  });
})