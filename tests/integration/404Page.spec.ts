// General imports
import { test, expect } from '@playwright/test';

// Helper import
import { screenshot } from '@/playwright/helpers/PlaywrightHelpers';

/**
 * 404 page tests.
 */
test.describe('404 page', () => {
  /**
   * Testing that the 404 page is shown when accessing route that does not exist.
   */
  test('shows when bad url is entered', async ({ page, browserName }) => {
    await page.goto('/this/is/some/bad/url');

    // Check that 404 status code is displayed
    await expect(page.locator('[class*="statusCode"]')).toContainText('404');

    // Check that error title is visible
    await expect(page.locator('h1')).toBeVisible();

    await screenshot(page, browserName, __filename, '404page');
  });
});
