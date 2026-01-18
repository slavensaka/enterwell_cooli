import { notFound } from 'next/navigation';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { RecipeMapper } from '@/mappers/RecipeMapper';
import RecipeDetailView from '@/views/RecipeDetail/RecipeDetailView';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export const revalidate = 60; // ISR: Revalidate every 60 seconds

// Generate static params for all existing recipes at build time
export async function generateStaticParams() {
    // We need a lightweight method to just fetch all slugs
    // Ideally RecipeRepository.getAllSlugs(), but getAllDTO is fine for now if not too large
    const recipes = await RecipeRepository.getAllDTO();

    return recipes.map((recipe) => ({
        slug: recipe.slug,
    }));
}

export default async function RecipePage({ params }: Props) {
    // In Next.js 15+, params is a Promise
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    // We need to fetch the recipe by slug
    // The Repository returns a Recipe model (class instance), but for Client Component we need a DTO
    // But wait, the Repository.getBySlug returns a Promise<Recipe | null>.
    // We should create a DTO-returning method in the Repo OR map it here.
    // The repo has getAllDTO but not getBySlugDTO. Let's use getBySlug and map it manually or add a method.
    // Actually, RecipeRepository.getAllDTO uses RecipeMapper.toDTOArray.

    // Let's first fetch the model
    const recipeModel = await RecipeRepository.getBySlug(slug);

    if (!recipeModel) {
        notFound();
    }

    // We need to convert the model to a plain object (DTO) because Class instances with methods cannot be passed to Client Components
    const recipeDTO = RecipeMapper.toDTO(recipeModel);

    return <RecipeDetailView recipe={recipeDTO} />;
}
