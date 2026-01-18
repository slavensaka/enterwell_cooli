import { test, expect } from '@playwright/experimental-ct-react';
import { RecipesView } from '@/views/Recipes/RecipesView';

test.describe('RecipesView', () => {
  test('renders recipes grid', async ({ mount }) => {
    const recipes = [
      {
        id: '1',
        slug: 'test-recipe-1',
        name: 'Test Recipe 1',
        intro: 'Test intro 1',
        authorUsername: 'user1',
        authorId: null,
        mainImageUrl: '/cdn/test1.jpg',
        servingSuggestion: null,
        tips: null,
        difficulty: 'EASY' as const,
        servings: 4,
        prepTime: 10,
        cookTime: 20,
        cookingMethod: 'Bake',
        mealType: 'Main',
        season: 'Summer',
        occasion: 'Dinner',
        region: 'Croatia',
        ingredients: [],
        preparationSteps: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        slug: 'test-recipe-2',
        name: 'Test Recipe 2',
        intro: 'Test intro 2',
        authorUsername: 'user2',
        authorId: null,
        mainImageUrl: null, // Test fallback image
        servingSuggestion: null,
        tips: null,
        difficulty: 'MEDIUM' as const,
        servings: 2,
        prepTime: 15,
        cookTime: 30,
        cookingMethod: 'Fry',
        mealType: 'Dessert',
        season: 'Winter',
        occasion: 'Party',
        region: 'Italy',
        ingredients: [],
        preparationSteps: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const component = await mount(<RecipesView recipes={recipes} />);

    // Check header
    await expect(component.locator('h1')).toContainText('Najnoviji recepti');

    // Check recipes count
    const recipeCards = component.locator('.card');
    await expect(recipeCards).toHaveCount(2);

    // Check first recipe
    const firstCard = recipeCards.first();
    await expect(firstCard.locator('h2')).toContainText('Test Recipe 1');
    await expect(firstCard.locator('.username')).toContainText('user1');

    // Check image sources
    const images = component.locator('img');
    await expect(images.first()).toHaveAttribute('src', '/cdn/test1.jpg');
    // Second should have placeholder (since mainImageUrl is null)
    await expect(images.nth(1)).toHaveAttribute('src', /^https:\/\/images\.unsplash\.com/);
  });

  test('renders empty state when no recipes', async ({ mount }) => {
    const component = await mount(<RecipesView recipes={[]} />);

    await expect(component.locator('text=No recipes found')).toBeVisible();
  });

  test('recipe links work', async ({ mount }) => {
    const recipes = [
      {
        id: '1',
        slug: 'pizza-margarita',
        name: 'Pizza Margarita',
        intro: 'Classic pizza',
        authorUsername: 'chef',
        authorId: null,
        mainImageUrl: '/cdn/pizza.jpg',
        servingSuggestion: null,
        tips: null,
        difficulty: 'EASY' as const,
        servings: 2,
        prepTime: 20,
        cookTime: 15,
        cookingMethod: 'Bake',
        mealType: 'Main',
        season: null,
        occasion: null,
        region: 'Italy',
        ingredients: [],
        preparationSteps: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const component = await mount(<RecipesView recipes={recipes} />);

    const link = component.locator('a[href="/recept/pizza-margarita"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText('Pizza Margarita');
  });
});