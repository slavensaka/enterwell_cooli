import { RecipeInputSchema, IngredientSchema, PreparationStepSchema } from '@/models/validation';

describe('Validation Schemas', () => {
  describe('IngredientSchema', () => {
    it('should validate valid ingredient', () => {
      const validIngredient = {
        quantity: '1 cup',
        unit: 'cup',
        name: 'Flour',
        order: 1,
      };

      expect(() => IngredientSchema.parse(validIngredient)).not.toThrow();
    });

    it('should reject ingredient without name', () => {
      const invalidIngredient = {
        quantity: '1 cup',
        unit: 'cup',
        order: 1,
      };

      expect(() => IngredientSchema.parse(invalidIngredient)).toThrow();
    });

    it('should reject ingredient with empty quantity', () => {
      const invalidIngredient = {
        quantity: '',
        unit: 'cup',
        name: 'Flour',
        order: 1,
      };

      expect(() => IngredientSchema.parse(invalidIngredient)).toThrow();
    });
  });

  describe('PreparationStepSchema', () => {
    it('should validate valid preparation step', () => {
      const validStep = {
        stepNumber: 1,
        description: 'Mix ingredients',
      };

      expect(() => PreparationStepSchema.parse(validStep)).not.toThrow();
    });

    it('should reject step without description', () => {
      const invalidStep = {
        stepNumber: 1,
      };

      expect(() => PreparationStepSchema.parse(invalidStep)).toThrow();
    });

    it('should reject step with invalid step number', () => {
      const invalidStep = {
        stepNumber: 0,
        description: 'Mix ingredients',
      };

      expect(() => PreparationStepSchema.parse(invalidStep)).toThrow();
    });
  });

  describe('RecipeInputSchema', () => {
    it('should validate valid recipe input', () => {
      const validRecipe = {
        name: 'Test Recipe',
        authorUsername: 'testuser',
        servings: 4,
        ingredients: [
          {
            quantity: '1 cup',
            name: 'Flour',
            order: 1,
          },
        ],
        preparationSteps: [
          {
            stepNumber: 1,
            description: 'Mix ingredients',
          },
        ],
      };

      expect(() => RecipeInputSchema.parse(validRecipe)).not.toThrow();
    });

    it('should reject recipe without name', () => {
      const invalidRecipe = {
        authorUsername: 'testuser',
        servings: 4,
      };

      expect(() => RecipeInputSchema.parse(invalidRecipe)).toThrow();
    });

    it('should reject recipe with invalid URL', () => {
      const invalidRecipe = {
        name: 'Test Recipe',
        authorUsername: 'testuser',
        mainImageUrl: 'invalid-url',
        servings: 4,
      };

      expect(() => RecipeInputSchema.parse(invalidRecipe)).toThrow();
    });

    it('should accept recipe with optional fields', () => {
      const validRecipe = {
        name: 'Test Recipe',
        authorUsername: 'testuser',
      };

      expect(() => RecipeInputSchema.parse(validRecipe)).not.toThrow();
    });
  });
});