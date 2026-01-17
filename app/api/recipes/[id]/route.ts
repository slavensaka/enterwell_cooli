import { NextRequest, NextResponse } from 'next/server';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { RecipeMapper } from '@/mappers/RecipeMapper';
import { z } from 'zod';
import { RecipeInputSchema } from '@/models/validation';

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
        const json = await request.json();

        // Validate with Zod (partial allowed for updates)
        const body = RecipeInputSchema.partial().parse(json);

        // Check if recipe exists
        // ... getById/getBySlug logic ...
        let existingRecipe = await RecipeRepository.getById(id);

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
        // We cast body to 'any' because strict Zod types vs Repo Partial<Recipe> mismatch
        const updatedRecipe = await RecipeRepository.update(existingRecipe.id, body as any);

        return NextResponse.json(RecipeMapper.toDTO(updatedRecipe));
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation Error', details: error.issues },
                { status: 400 }
            );
        }

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
