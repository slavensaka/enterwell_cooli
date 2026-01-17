import { NextRequest, NextResponse } from 'next/server';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { RecipeDTO } from '@/models/Recipe';
import { RecipeMapper } from '@/mappers/RecipeMapper';
import { z } from 'zod';
import { RecipeInputSchema } from '@/models/validation';

/**
 * GET /api/recipes
 * Retrieve all recipes.
 */
export async function GET() {
    try {
        const recipes = await RecipeRepository.getAllDTO();
        return NextResponse.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch recipes' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/recipes
 * Create a new recipe.
 */
export async function POST(request: NextRequest) {
    try {
        const json = await request.json();

        // 1. Zod Validation
        // parse() throws an error if validation fails
        const body = RecipeInputSchema.parse(json);

        // Auto-generate slug if not provided
        if (!body.slug) {
            body.slug = body.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') + '-' + Date.now();
        }

        // Check for existing slug to ensure uniqueness
        const existing = await RecipeRepository.getBySlug(body.slug);
        if (existing) {
            return NextResponse.json(
                { error: 'Slug already exists. Please provide a unique slug.' },
                { status: 409 }
            );
        }

        // Create recipe
        // We cast body to 'any' for the repo call because Zod types are strict and Repo expects Partial<Recipe>
        const newRecipe = await RecipeRepository.create(body as any);
        const newRecipeDTO = RecipeMapper.toDTO(newRecipe);

        return NextResponse.json(newRecipeDTO, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation Error', details: error.errors },
                { status: 400 }
            );
        }

        console.error('Error creating recipe:', error);
        return NextResponse.json(
            { error: 'Failed to create recipe' },
            { status: 500 }
        );
    }
}
