import { prisma } from '@/lib/prisma';
import { RecipeMapper } from '@/mappers/RecipeMapper';
import { Recipe, RecipeDTO } from '@/models/Recipe';

/**
 * Repository for managing Recipe data.
 * Handles all database operations for recipes.
 */
export class RecipeRepository {
  /**
   * Fetches all recipes from the database as plain DTOs.
   * Use this for Server -> Client component communication.
   */
  static async getAllDTO(): Promise<RecipeDTO[]> {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return RecipeMapper.toDTOArray(recipes);
  }

  /**
   * Fetches all recipes from the database as Recipe models.
   * Use this for server-side logic only.
   */
  static async getAll(): Promise<Recipe[]> {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return RecipeMapper.toModelArray(recipes);
  }

  /**
   * Fetches a single recipe by ID.
   */
  static async getById(id: string): Promise<Recipe | null> {
    const recipe = await prisma.recipe.findUnique({
      where: { id }
    });

    return recipe ? RecipeMapper.toModel(recipe) : null;
  }

  /**
   * Fetches a single recipe by slug.
   */
  static async getBySlug(slug: string): Promise<Recipe | null> {
    const recipe = await prisma.recipe.findUnique({
      where: { slug }
    });

    return recipe ? RecipeMapper.toModel(recipe) : null;
  }

  /**
   * Creates a new recipe.
   */
  static async create(data: Partial<Recipe>): Promise<Recipe> {
    const recipe = await prisma.recipe.create({
      data: RecipeMapper.toCreateInput(data)
    });

    return RecipeMapper.toModel(recipe);
  }

  /**
   * Updates an existing recipe by ID.
   */
  static async update(id: string, data: Partial<Recipe>): Promise<Recipe> {
    const recipe = await prisma.recipe.update({
      where: { id },
      data: RecipeMapper.toUpdateInput(data)
    });

    return RecipeMapper.toModel(recipe);
  }

  /**
   * Deletes a recipe by ID.
   */
  static async delete(id: string): Promise<void> {
    await prisma.recipe.delete({
      where: { id }
    });
  }
}
