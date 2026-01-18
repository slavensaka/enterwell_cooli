import { RecipesView } from '@/views/Recipes/RecipesView';
import { RecipeRepository } from '@/repositories/RecipeRepository';

/**
 * Recipes page - displays a grid of all recipes.
 * Route: /recepti
 *
 * This is a Server Component that fetches data and passes it to the client component.
 */
export default async function RecipesPage() {
  let recipes = [];

  try {
    recipes = await RecipeRepository.getAllDTO();
  } catch (error) {
    console.warn('Database not available during build, using empty recipes array');
    // During build time on Vercel, database might not be available
    // Return empty array to allow build to complete
    recipes = [];
  }

  return <RecipesView recipes={recipes} />;
}
