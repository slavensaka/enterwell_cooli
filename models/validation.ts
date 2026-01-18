import { z } from 'zod';
import { DifficultyLevel, RecipeCategory } from './Recipe';

// Schema for Ingredient creation/update
export const IngredientSchema = z.object({
    id: z.string().uuid().optional(), // ID is optional for new ingredients
    quantity: z.string().min(1, "Quantity is required"),
    unit: z.string().nullable().optional(),
    name: z.string().min(1, "Ingredient name is required"),
    order: z.number().int().min(0).optional()
});

// Schema for PreparationStep creation/update
export const PreparationStepSchema = z.object({
    id: z.string().uuid().optional(),
    stepNumber: z.number().int().min(1),
    description: z.string().min(1, "Step description is required")
});

// Schema for Creating/Updating a Recipe
// We make most fields optional to allow partial updates (PATCH style), 
// but for strict creation, we might want to enforce some.
// Zod schemas are flexible. Here we define the "Shape" of a valid recipe input.
export const RecipeInputSchema = z.object({
    name: z.string().min(1, "Recipe name is required").max(100),
    slug: z.string().min(1).optional(), // Optional because we auto-generate it if missing
    intro: z.string().nullable().optional(),
    authorUsername: z.string().min(1, "Author username is required"),
    authorId: z.string().nullable().optional(),
    mainImageUrl: z.string().url("Must be a valid URL").nullable().optional(),
    servingSuggestion: z.string().nullable().optional(),
    tips: z.string().nullable().optional(),
    difficulty: z.nativeEnum(DifficultyLevel).nullable().optional(),
    servings: z.number().int().positive().nullable().optional(),
    prepTime: z.number().int().min(0).nullable().optional(), // in minutes
    cookTime: z.number().int().min(0).nullable().optional(),
    cookingMethod: z.string().nullable().optional(),
    mealType: z.string().nullable().optional(),
    category: z.nativeEnum(RecipeCategory).refine(val => val !== undefined, {
        message: "Recipe category is required"
    }), // OBVEZNO polje
    season: z.string().nullable().optional(),
    occasion: z.string().nullable().optional(),
    region: z.string().nullable().optional(),

    // Relations: expected as arrays of objects
    ingredients: z.array(IngredientSchema).optional(),
    preparationSteps: z.array(PreparationStepSchema).optional()
});

// Export the inferred type for use in code
export type RecipeInput = z.infer<typeof RecipeInputSchema>;
