import { makeAutoObservable, runInAction } from 'mobx';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { Recipe } from '@/models/Recipe';

/**
 * View model for Recipes list view.
 * Manages state and logic for displaying recipes.
 */
export class RecipesViewModel {
  recipes: Recipe[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Loads all recipes from the repository.
   */
  async loadRecipes(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const recipes = await RecipeRepository.getAll();

      runInAction(() => {
        this.recipes = recipes;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to load recipes';
        this.isLoading = false;
      });
    }
  }
}
