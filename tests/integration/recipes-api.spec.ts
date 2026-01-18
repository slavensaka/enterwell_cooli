import { test, expect } from '@playwright/test';

test.describe('Recipe API', () => {
  // Skip API tests if database is not available
  test.beforeEach(async ({ request }) => {
    try {
      const response = await request.get('/api/recipes');
      if (!response.ok()) {
        test.skip(true, 'Database not available - skipping API tests');
      }
    } catch (error) {
      test.skip(true, 'API not available - skipping API tests');
    }
  });

  test('GET /api/recipes returns list or empty array', async ({ request }) => {
    const response = await request.get('/api/recipes');
    expect(response.ok()).toBeTruthy();

    const recipes = await response.json();
    expect(Array.isArray(recipes)).toBe(true);
    
    // If there are recipes, check structure
    if (recipes.length > 0) {
      const recipe = recipes[0];
      expect(recipe).toHaveProperty('id');
      expect(recipe).toHaveProperty('name');
      expect(recipe).toHaveProperty('slug');
    }
  });

  test('GET /api/recipes/[id] handles non-existent recipe', async ({ request }) => {
    const response = await request.get('/api/recipes/non-existent-recipe');
    expect(response.status()).toBe(404);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'Recipe not found');
  });

  test('POST /api/recipes creates new recipe', async ({ request }) => {
    const newRecipe = {
      name: `Test Recipe ${Date.now()}`,
      authorUsername: 'testuser',
      servings: 2,
      category: 'GLAVNA_JELA', // OBVEZNO polje
      ingredients: [
        {
          quantity: '1',
          unit: 'cup',
          name: 'Flour',
          order: 1,
        },
      ],
      preparationSteps: [
        {
          stepNumber: 1,
          description: 'Mix ingredients',
        },
      ],
    };

    const response = await request.post('/api/recipes', {
      data: newRecipe,
    });
    expect(response.ok()).toBeTruthy();

    const createdRecipe = await response.json();
    expect(createdRecipe).toHaveProperty('id');
    expect(createdRecipe.name).toBe(newRecipe.name);
    expect(createdRecipe.category).toBe('GLAVNA_JELA');
    expect(createdRecipe.slug).toMatch(/^test-recipe/);
  });

  test('POST /api/recipes rejects invalid data', async ({ request }) => {
    const invalidRecipe = {
      // Missing required name and category fields
      authorUsername: 'testuser',
    };

    const response = await request.post('/api/recipes', {
      data: invalidRecipe,
    });
    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error');
    expect(error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: ['name'] }),
        expect.objectContaining({ path: ['category'] })
      ])
    );
  });

  test('PUT /api/recipes/[id] updates recipe', async ({ request }) => {
    // First create a recipe
    const newRecipe = {
      name: `Update Test Recipe ${Date.now()}`,
      authorUsername: 'testuser',
      servings: 1,
      category: 'DESERTI', // OBVEZNO polje
      ingredients: [
        {
          quantity: '1',
          unit: 'cup',
          name: 'Flour',
          order: 1,
        },
      ],
      preparationSteps: [
        {
          stepNumber: 1,
          description: 'Mix ingredients',
        },
      ],
    };

    const createResponse = await request.post('/api/recipes', {
      data: newRecipe,
    });
    const createdRecipe = await createResponse.json();
    const recipeId = createdRecipe.id;

    // Update it
    const updateData = {
      name: 'Updated Recipe Name',
    };

    const updateResponse = await request.put(`/api/recipes/${recipeId}`, {
      data: updateData,
    });
    expect(updateResponse.ok()).toBeTruthy();

    const updatedRecipe = await updateResponse.json();
    expect(updatedRecipe.name).toBe('Updated Recipe Name');
  });

  test('DELETE /api/recipes/[id] deletes recipe', async ({ request }) => {
    // First create a recipe
    const newRecipe = {
      name: `Delete Test Recipe ${Date.now()}`,
      authorUsername: 'testuser',
      servings: 1,
      category: 'PRILOZI', // OBVEZNO polje
      ingredients: [
        {
          quantity: '1',
          unit: 'cup',
          name: 'Flour',
          order: 1,
        },
      ],
      preparationSteps: [
        {
          stepNumber: 1,
          description: 'Mix ingredients',
        },
      ],
    };

    const createResponse = await request.post('/api/recipes', {
      data: newRecipe,
    });
    const createdRecipe = await createResponse.json();
    const recipeId = createdRecipe.id;

    // Delete it
    const deleteResponse = await request.delete(`/api/recipes/${recipeId}`);
    expect(deleteResponse.status()).toBe(204);

    // Verify it's gone
    const getResponse = await request.get(`/api/recipes/${recipeId}`);
    expect(getResponse.status()).toBe(404);
  });

  test('GET /api/recipes/[invalid] returns 404', async ({ request }) => {
    const response = await request.get('/api/recipes/invalid-id-12345');
    expect(response.status()).toBe(404);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'Recipe not found');
  });
});