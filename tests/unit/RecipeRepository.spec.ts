import { RecipeRepository } from '@/repositories/RecipeRepository';
import { RecipeMapper } from '@/mappers/RecipeMapper';
import { prisma } from '@/lib/prisma';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    recipe: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// Mock RecipeMapper
jest.mock('@/mappers/RecipeMapper', () => ({
  RecipeMapper: {
    toModelArray: jest.fn(),
    toDTOArray: jest.fn(),
    toModel: jest.fn(),
    toDTO: jest.fn(),
    toCreateInput: jest.fn(),
    toUpdateInput: jest.fn(),
  },
}));

describe('RecipeRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllDTO', () => {
    it('should return all recipes as DTOs', async () => {
      const mockRecipes = [{ id: '1', name: 'Test Recipe' }];
      const mockModels = [{ id: '1', name: 'Test Recipe' }];
      const mockDTOs = [{ id: '1', name: 'Test Recipe' }];

      (prisma.recipe.findMany as jest.Mock).mockResolvedValue(mockRecipes);
      (RecipeMapper.toModelArray as jest.Mock).mockReturnValue(mockModels);
      (RecipeMapper.toDTOArray as jest.Mock).mockReturnValue(mockDTOs);

      const result = await RecipeRepository.getAllDTO();

      expect(prisma.recipe.findMany).toHaveBeenCalledWith({
        include: {
          ingredients: { orderBy: { order: 'asc' } },
          preparationSteps: { orderBy: { stepNumber: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(RecipeMapper.toModelArray).toHaveBeenCalledWith(mockRecipes);
      expect(RecipeMapper.toDTOArray).toHaveBeenCalledWith(mockModels);
      expect(result).toEqual(mockDTOs);
    });
  });

  describe('getAll', () => {
    it('should return all recipes as models', async () => {
      const mockRecipes = [{ id: '1', name: 'Test Recipe' }];
      const mockModels = [{ id: '1', name: 'Test Recipe' }];

      (prisma.recipe.findMany as jest.Mock).mockResolvedValue(mockRecipes);
      (RecipeMapper.toModelArray as jest.Mock).mockReturnValue(mockModels);

      const result = await RecipeRepository.getAll();

      expect(prisma.recipe.findMany).toHaveBeenCalledWith({
        include: {
          ingredients: { orderBy: { order: 'asc' } },
          preparationSteps: { orderBy: { stepNumber: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(RecipeMapper.toModelArray).toHaveBeenCalledWith(mockRecipes);
      expect(result).toEqual(mockModels);
    });
  });

  describe('getById', () => {
    it('should return recipe by id', async () => {
      const mockRecipe = { id: '1', name: 'Test Recipe' };
      const mockModel = { id: '1', name: 'Test Recipe' };

      (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(mockRecipe);
      (RecipeMapper.toModel as jest.Mock).mockReturnValue(mockModel);

      const result = await RecipeRepository.getById('1');

      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          ingredients: { orderBy: { order: 'asc' } },
          preparationSteps: { orderBy: { stepNumber: 'asc' } },
        },
      });
      expect(RecipeMapper.toModel).toHaveBeenCalledWith(mockRecipe);
      expect(result).toEqual(mockModel);
    });

    it('should return null if recipe not found', async () => {
      (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await RecipeRepository.getById('1');

      expect(result).toBeNull();
    });
  });

  describe('getBySlug', () => {
    it('should return recipe by slug', async () => {
      const mockRecipe = { id: '1', slug: 'test-recipe', name: 'Test Recipe' };
      const mockModel = { id: '1', slug: 'test-recipe', name: 'Test Recipe' };

      (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(mockRecipe);
      (RecipeMapper.toModel as jest.Mock).mockReturnValue(mockModel);

      const result = await RecipeRepository.getBySlug('test-recipe');

      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { slug: 'test-recipe' },
        include: {
          ingredients: { orderBy: { order: 'asc' } },
          preparationSteps: { orderBy: { stepNumber: 'asc' } },
        },
      });
      expect(RecipeMapper.toModel).toHaveBeenCalledWith(mockRecipe);
      expect(result).toEqual(mockModel);
    });
  });

  describe('create', () => {
    it('should create a new recipe', async () => {
      const input = { name: 'New Recipe', slug: 'new-recipe' };
      const mockCreateInput = { name: 'New Recipe', slug: 'new-recipe' };
      const mockCreated = { id: '1', ...input };
      const mockModel = { id: '1', ...input };

      (RecipeMapper.toCreateInput as jest.Mock).mockReturnValue(mockCreateInput);
      (prisma.recipe.create as jest.Mock).mockResolvedValue(mockCreated);
      (RecipeMapper.toModel as jest.Mock).mockReturnValue(mockModel);

      const result = await RecipeRepository.create(input);

      expect(RecipeMapper.toCreateInput).toHaveBeenCalledWith(input);
      expect(prisma.recipe.create).toHaveBeenCalledWith({
        data: mockCreateInput,
        include: {
          ingredients: { orderBy: { order: 'asc' } },
          preparationSteps: { orderBy: { stepNumber: 'asc' } },
        },
      });
      expect(RecipeMapper.toModel).toHaveBeenCalledWith(mockCreated);
      expect(result).toEqual(mockModel);
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const id = '1';
      const updates = { name: 'Updated Recipe' };
      const mockUpdateInput = { name: 'Updated Recipe' };
      const mockUpdated = { id, ...updates };
      const mockModel = { id, ...updates };

      (RecipeMapper.toUpdateInput as jest.Mock).mockReturnValue(mockUpdateInput);
      (prisma.recipe.update as jest.Mock).mockResolvedValue(mockUpdated);
      (RecipeMapper.toModel as jest.Mock).mockReturnValue(mockModel);

      const result = await RecipeRepository.update(id, updates);

      expect(RecipeMapper.toUpdateInput).toHaveBeenCalledWith(updates);
      expect(prisma.recipe.update).toHaveBeenCalledWith({
        where: { id },
        data: mockUpdateInput,
        include: {
          ingredients: { orderBy: { order: 'asc' } },
          preparationSteps: { orderBy: { stepNumber: 'asc' } },
        },
      });
      expect(RecipeMapper.toModel).toHaveBeenCalledWith(mockUpdated);
      expect(result).toEqual(mockModel);
    });
  });

  describe('delete', () => {
    it('should delete a recipe', async () => {
      const id = '1';

      (prisma.recipe.delete as jest.Mock).mockResolvedValue({});

      await RecipeRepository.delete(id);

      expect(prisma.recipe.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});