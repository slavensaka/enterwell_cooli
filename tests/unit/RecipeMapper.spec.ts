import { RecipeMapper } from '@/mappers/RecipeMapper';

describe('RecipeMapper', () => {
  describe('toCreateInput', () => {
    it('should map Recipe model to Prisma create input', () => {
      const model = {
        name: 'Test Recipe',
        slug: 'test-recipe',
        authorUsername: 'testuser',
        mainImageUrl: '/cdn/test.jpg',
        servings: 4,
      };

      const result = RecipeMapper.toCreateInput(model);

      expect(result).toEqual({
        slug: 'test-recipe',
        name: 'Test Recipe',
        authorUsername: 'testuser',
        cdnPath: '/cdn/test.jpg',
        servings: 4,
        intro: undefined,
        authorId: undefined,
        servingSuggestion: undefined,
        tips: undefined,
        difficulty: undefined,
        prepTime: undefined,
        cookTime: undefined,
        cookingMethod: undefined,
        mealType: undefined,
        season: undefined,
        occasion: undefined,
        region: undefined,
      });
    });
  });

  describe('toUpdateInput', () => {
    it('should map Recipe model to Prisma update input', () => {
      const model = {
        name: 'Updated Recipe',
        mainImageUrl: '/cdn/updated.jpg',
      };

      const result = RecipeMapper.toUpdateInput(model);

      expect(result).toEqual({
        slug: undefined,
        name: 'Updated Recipe',
        intro: undefined,
        authorUsername: undefined,
        authorId: undefined,
        cdnPath: '/cdn/updated.jpg',
        servingSuggestion: undefined,
        tips: undefined,
        difficulty: undefined,
        servings: undefined,
        prepTime: undefined,
        cookTime: undefined,
        cookingMethod: undefined,
        mealType: undefined,
        season: undefined,
        occasion: undefined,
        region: undefined,
      });
    });
  });
});