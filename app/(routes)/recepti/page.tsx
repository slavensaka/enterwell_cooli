import { RecipesView } from '@/views/Recipes/RecipesView';
import { RecipeRepository } from '@/repositories/RecipeRepository';

/**
 * Recipes page - displays a grid of all recipes.
 * Route: /recepti
 *
 * This is a Server Component that fetches data and passes it to the client component.
 */
export default async function RecipesPage() {
  const recipes = await RecipeRepository.getAllDTO();

  return <RecipesView recipes={recipes} />;
}
