import {
  Recipe,
  RecipeDTO,
  Ingredient,
  IngredientDTO,
  PreparationStep,
  PreparationStepDTO
} from '@/models/Recipe';
import {
  Recipe as PrismaRecipe,
  Ingredient as PrismaIngredient,
  PreparationStep as PrismaPreparationStep
} from '@prisma/client';

/**
 * Prisma Recipe with relations included
 */
type PrismaRecipeWithRelations = PrismaRecipe & {
  ingredients: PrismaIngredient[];
  preparationSteps: PrismaPreparationStep[];
};

/**
 * Mapper for Ingredient entity
 */
export class IngredientMapper {
  /**
   * Maps Prisma Ingredient to Ingredient model
   */
  static toModel(prisma: PrismaIngredient): Ingredient {
    return new Ingredient(
      prisma.id,
      prisma.recipeId,
      prisma.quantity,
      prisma.unit,
      prisma.name,
      prisma.order
    );
  }

  /**
   * Maps Ingredient model to plain DTO
   */
  static toDTO(ingredient: Ingredient): IngredientDTO {
    return {
      id: ingredient.id,
      recipeId: ingredient.recipeId,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      name: ingredient.name,
      order: ingredient.order
    };
  }
}

/**
 * Mapper for PreparationStep entity
 */
export class PreparationStepMapper {
  /**
   * Maps Prisma PreparationStep to PreparationStep model
   */
  static toModel(prisma: PrismaPreparationStep): PreparationStep {
    return new PreparationStep(
      prisma.id,
      prisma.recipeId,
      prisma.stepNumber,
      prisma.description
    );
  }

  /**
   * Maps PreparationStep model to plain DTO
   */
  static toDTO(step: PreparationStep): PreparationStepDTO {
    return {
      id: step.id,
      recipeId: step.recipeId,
      stepNumber: step.stepNumber,
      description: step.description
    };
  }
}

/**
 * Mapper for Recipe entity.
 * Maps between Prisma Recipe (with relations) and Recipe model.
 */
export class RecipeMapper {
  /**
   * Maps Prisma Recipe (with relations) to Recipe model.
   */
  static toModel(prismaRecipe: PrismaRecipeWithRelations): Recipe {
    return new Recipe(
      prismaRecipe.id,
      prismaRecipe.slug,
      prismaRecipe.name,
      prismaRecipe.intro,
      prismaRecipe.authorUsername,
      prismaRecipe.authorId,
      prismaRecipe.cdnPath,
      prismaRecipe.servingSuggestion,
      prismaRecipe.tips,
      prismaRecipe.difficulty,
      prismaRecipe.servings,
      prismaRecipe.prepTime,
      prismaRecipe.cookTime,
      prismaRecipe.cookingMethod,
      prismaRecipe.mealType,
      prismaRecipe.season,
      prismaRecipe.occasion,
      prismaRecipe.region,
      prismaRecipe.ingredients.map(IngredientMapper.toModel),
      prismaRecipe.preparationSteps.map(PreparationStepMapper.toModel),
      prismaRecipe.createdAt,
      prismaRecipe.updatedAt
    );
  }

  /**
   * Maps array of Prisma Recipes to array of Recipe models.
   */
  static toModelArray(dtos: PrismaRecipeWithRelations[]): Recipe[] {
    return dtos.map((dto) => RecipeMapper.toModel(dto));
  }

  /**
   * Maps Recipe model to plain RecipeDTO (for Server -> Client communication).
   */
  static toDTO(recipe: Recipe): RecipeDTO {
    return {
      id: recipe.id,
      slug: recipe.slug,
      name: recipe.name,
      intro: recipe.intro,
      authorUsername: recipe.authorUsername,
      authorId: recipe.authorId,
      mainImageUrl: recipe.mainImageUrl,
      servingSuggestion: recipe.servingSuggestion,
      tips: recipe.tips,
      difficulty: recipe.difficulty,
      servings: recipe.servings,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      cookingMethod: recipe.cookingMethod,
      mealType: recipe.mealType,
      season: recipe.season,
      occasion: recipe.occasion,
      region: recipe.region,
      ingredients: recipe.ingredients.map(IngredientMapper.toDTO),
      preparationSteps: recipe.preparationSteps.map(PreparationStepMapper.toDTO),
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    };
  }

  /**
   * Maps array of Recipe models to array of plain RecipeDTOs.
   */
  static toDTOArray(recipes: Recipe[]): RecipeDTO[] {
    return recipes.map((recipe) => RecipeMapper.toDTO(recipe));
  }

  /**
   * Maps Recipe model to Prisma Recipe create input.
   */
  static toCreateInput(model: Partial<Recipe>) {
    return {
      slug: model.slug!,
      name: model.name!,
      intro: model.intro,
      authorUsername: model.authorUsername!,
      authorId: model.authorId,
      mainImageUrl: model.mainImageUrl,
      servingSuggestion: model.servingSuggestion,
      tips: model.tips,
      difficulty: model.difficulty,
      servings: model.servings,
      prepTime: model.prepTime,
      cookTime: model.cookTime,
      cookingMethod: model.cookingMethod,
      mealType: model.mealType,
      season: model.season,
      occasion: model.occasion,
      region: model.region
    };
  }

  /**
   * Maps Recipe model to Prisma Recipe update input.
   */
  static toUpdateInput(model: Partial<Recipe>) {
    return {
      slug: model.slug,
      name: model.name,
      intro: model.intro,
      authorUsername: model.authorUsername,
      authorId: model.authorId,
      mainImageUrl: model.mainImageUrl,
      servingSuggestion: model.servingSuggestion,
      tips: model.tips,
      difficulty: model.difficulty,
      servings: model.servings,
      prepTime: model.prepTime,
      cookTime: model.cookTime,
      cookingMethod: model.cookingMethod,
      mealType: model.mealType,
      season: model.season,
      occasion: model.occasion,
      region: model.region
    };
  }
}
