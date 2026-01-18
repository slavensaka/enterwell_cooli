import { test, expect } from '@playwright/test';

test.describe('Recipes Page', () => {
  test('displays recipes list on /recepti', async ({ page }) => {
    // Increase timeout for slow database operations
    test.setTimeout(60000);
    
    await page.goto('/recepti', { waitUntil: 'networkidle' });

    // Check page title with more flexible approach
    const title = page.locator('h1');
    await expect(title).toBeVisible({ timeout: 10000 });

    // Check that recipes are loaded or show empty state
    try {
      const recipeCards = page.locator('[class*="card"]');
      await expect(recipeCards.first()).toBeVisible({ timeout: 10000 });
      
      // If recipes exist, check structure
      const firstCard = recipeCards.first();
      await expect(firstCard.locator('h2')).toBeVisible();
    } catch (error) {
      // If no recipes, check for empty state message
      const emptyMessage = page.locator('text=Nema recepata');
      await expect(emptyMessage.or(page.locator('text=No recipes'))).toBeVisible();
    }
  });

  test('navigates to recipe detail from list', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('/recepti', { waitUntil: 'networkidle' });

    // Wait for page to load and check if recipes exist
    const recipeLinks = page.locator('a[href^="/recept/"]');
    const linkCount = await recipeLinks.count();
    
    if (linkCount === 0) {
      test.skip(true, 'No recipes available to test navigation');
    }

    // Click on the first recipe link
    const firstRecipeLink = recipeLinks.first();
    const href = await firstRecipeLink.getAttribute('href');
    await firstRecipeLink.click();

    // Should navigate to detail page
    await expect(page).toHaveURL(href!, { timeout: 10000 });
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Recipe Detail Page', () => {
  test('displays recipe details on /recept/pizza-margarita', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('/recept/pizza-margarita', { waitUntil: 'networkidle' });

    // Check if recipe exists or shows 404
    const is404 = await page.locator('[class*="statusCode"]').isVisible();
    
    if (is404) {
      test.skip(true, 'Recipe pizza-margarita does not exist in database');
    }

    // Check title
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Check author exists (use flexible selector)
    await expect(page.locator('[class*="authorName"]')).toBeVisible();

    // Check image exists
    const image = page.locator('img').first();
    await expect(image).toBeVisible();

    // Check meta information exists
    await expect(page.locator('[class*="metaBar"]')).toBeVisible();

    // Check preparation steps section exists (only one now)
    await expect(page.locator('[class*="stepsContainer"]').first()).toBeVisible();
  });

  test('shows 404 for non-existent recipe', async ({ page }) => {
    await page.goto('/recept/definitely-non-existent-recipe-12345');

    // Should show 404 status code
    await expect(page.locator('[class*="statusCode"]')).toContainText('404');

    // Should show error message
    await expect(page.locator('h1')).toBeVisible();
  });
});