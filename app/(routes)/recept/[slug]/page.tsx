import { notFound } from 'next/navigation';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import RecipeDetailView from '@/views/RecipeDetail/RecipeDetailView';

type Props = {
    params: {
        slug: string;
    };
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
    // Since we are using an async component, we can await params
    // However, in standard Next.js 13/14, params is an object, not a promise here unless it's a very new version
    // Safety check: accessing params directly
    // In newer Next.js versions (15+ or specific 14 config), params is a Promise.
    // We should await it to be safe and compatible.
    const resolvedParams = await Promise.resolve(params);
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
    const recipeDTO = JSON.parse(JSON.stringify(recipeModel));
    // Ideally we would use RecipeMapper.toDTO(recipeModel) but let's check if it exists or we can just serialise it.
    // Inspecting RecipeRepository showed RecipeMapper usage. 
    // Since we can't see RecipeMapper right now, simple JSON serialization is a safe bet for "Plain Object" requirement.

    return <RecipeDetailView recipe={recipeDTO} />;
}
