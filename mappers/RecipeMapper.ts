import { Recipe, RecipeDTO } from '@/models/Recipe';
import { Recipe as PrismaRecipe } from '@prisma/client';

/**
 * Mapper for Recipe entity.
 * Maps between Prisma Recipe (DTO) and Recipe model.
 */
export class RecipeMapper {
  /**
   * Maps Prisma Recipe to Recipe model.
   */
  static toModel(dto: PrismaRecipe): Recipe {
    return new Recipe(
      dto.id,
      dto.slug,
      dto.name,
      dto.createdAt,
      dto.updatedAt
    );
  }

  /**
   * Maps array of Prisma Recipes to array of Recipe models.
   */
  static toModelArray(dtos: PrismaRecipe[]): Recipe[] {
    return dtos.map((dto) => RecipeMapper.toModel(dto));
  }

  /**
   * Maps Prisma Recipe to plain RecipeDTO (for Server -> Client communication).
   */
  static toDTO(dto: PrismaRecipe): RecipeDTO {
    return {
      id: dto.id,
      slug: dto.slug,
      name: dto.name,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    };
  }

  /**
   * Maps array of Prisma Recipes to array of plain RecipeDTOs.
   */
  static toDTOArray(dtos: PrismaRecipe[]): RecipeDTO[] {
    return dtos.map((dto) => RecipeMapper.toDTO(dto));
  }

  /**
   * Maps Recipe model to Prisma Recipe create input.
   */
  static toCreateInput(model: Partial<Recipe>) {
    return {
      slug: model.slug!,
      name: model.name!
    };
  }

  /**
   * Maps Recipe model to Prisma Recipe update input.
   */
  static toUpdateInput(model: Partial<Recipe>) {
    return {
      slug: model.slug,
      name: model.name
    };
  }
}
