import { MetadataRoute } from 'next';
import { RecipeRepository } from '@/repositories/RecipeRepository';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/recepti`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic recipe routes
  let recipeRoutes: MetadataRoute.Sitemap = [];
  try {
    const recipes = await RecipeRepository.getAllDTO();
    recipeRoutes = recipes.map((recipe) => ({
      url: `${baseUrl}/recept/${recipe.slug}`,
      lastModified: recipe.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.warn('Error generating recipe sitemap entries:', error);
    // Fallback: empty array during build if DB unavailable
  }

  return [...staticRoutes, ...recipeRoutes];
}
