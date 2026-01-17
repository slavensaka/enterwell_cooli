import { NextRequest, NextResponse } from 'next/server';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { RecipeMapper } from '@/mappers/RecipeMapper';

/**
 * GET /api/recipes/[id]
 * Retrieve a single recipe by ID or Slug.
 * The route param is named [id], but we can support checking both.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // Try finding by ID first (UUID format usually)
        let recipe = await RecipeRepository.getById(id);

        // If not found, try finding by Slug
        if (!recipe) {
            recipe = await RecipeRepository.getBySlug(id);
        }

        if (!recipe) {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(RecipeMapper.toDTO(recipe));
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/recipes/[id]
 * Update an existing recipe.
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        // Check if recipe exists
        // Note: getById only checks ID. If user passed slug in URL for PUT, this might fail if we don't resolve slug to ID.
        // For simplicity and strict REST, assume :id is the actual Database ID.
        let existingRecipe = await RecipeRepository.getById(id);

        // If we want to support slug in URL for updates too:
        if (!existingRecipe) {
            existingRecipe = await RecipeRepository.getBySlug(id);
        }

        if (!existingRecipe) {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }

        // Update
        const updatedRecipe = await RecipeRepository.update(existingRecipe.id, body); // Use the resolved ID

        return NextResponse.json(RecipeMapper.toDTO(updatedRecipe));
    } catch (error) {
        console.error('Error updating recipe:', error);
        return NextResponse.json(
            { error: 'Failed to update recipe' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/recipes/[id]
 * Delete a recipe.
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // Resolve slug to ID if needed
        let recipeToDelete = await RecipeRepository.getById(id);
        if (!recipeToDelete) {
            recipeToDelete = await RecipeRepository.getBySlug(id);
        }

        if (!recipeToDelete) {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }

        await RecipeRepository.delete(recipeToDelete.id);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return NextResponse.json(
            { error: 'Failed to delete recipe' },
            { status: 500 }
        );
    }
}
