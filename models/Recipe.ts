/**
 * Difficulty level enum for recipes
 */
export enum DifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

/**
 * Ingredient model for recipe ingredients
 */
export class Ingredient {
  constructor(
    public id: string,
    public recipeId: string,
    public quantity: string,
    public unit: string | null,
    public name: string,
    public order: number
  ) {}
}

/**
 * Preparation step model for recipe instructions
 */
export class PreparationStep {
  constructor(
    public id: string,
    public recipeId: string,
    public stepNumber: number,
    public description: string
  ) {}
}

/**
 * Recipe model representing a complete recipe entity with all fields
 */
export class Recipe {
  constructor(
    public id: string,
    public slug: string,
    public name: string,
    public intro: string | null,
    public authorUsername: string,
    public authorId: string | null,
    public mainImageUrl: string | null,
    public servingSuggestion: string | null,
    public tips: string | null,
    public difficulty: DifficultyLevel | null,
    public servings: number | null,
    public prepTime: number | null,
    public cookTime: number | null,
    public cookingMethod: string | null,
    public mealType: string | null,
    public season: string | null,
    public occasion: string | null,
    public region: string | null,
    public ingredients: Ingredient[],
    public preparationSteps: PreparationStep[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

/**
 * Plain Ingredient object DTO
 */
export type IngredientDTO = {
  id: string;
  recipeId: string;
  quantity: string;
  unit: string | null;
  name: string;
  order: number;
};

/**
 * Plain PreparationStep object DTO
 */
export type PreparationStepDTO = {
  id: string;
  recipeId: string;
  stepNumber: number;
  description: string;
};

/**
 * Plain Recipe object for passing between Server and Client components.
 * Next.js cannot serialize class instances, so we use plain objects.
 */
export type RecipeDTO = {
  id: string;
  slug: string;
  name: string;
  intro: string | null;
  authorUsername: string;
  authorId: string | null;
  mainImageUrl: string | null;
  servingSuggestion: string | null;
  tips: string | null;
  difficulty: DifficultyLevel | null;
  servings: number | null;
  prepTime: number | null;
  cookTime: number | null;
  cookingMethod: string | null;
  mealType: string | null;
  season: string | null;
  occasion: string | null;
  region: string | null;
  ingredients: IngredientDTO[];
  preparationSteps: PreparationStepDTO[];
  createdAt: Date;
  updatedAt: Date;
};
