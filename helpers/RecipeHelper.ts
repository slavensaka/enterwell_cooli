import { RecipeCategory } from '@/models/Recipe';

/**
 * Helper functions for recipe-related operations.
 */
export class RecipeHelper {
  /**
   * Get display name for recipe category in Croatian.
   */
  static getCategoryDisplayName(category: RecipeCategory): string {
    const categoryNames: Record<RecipeCategory, string> = {
      [RecipeCategory.GLAVNA_JELA]: 'Glavna jela',
      [RecipeCategory.DESERTI]: 'Deserti',
      [RecipeCategory.KRUH_I_PECIVA]: 'Kruh i peciva',
      [RecipeCategory.PREDJELA]: 'Predjela',
      [RecipeCategory.JUHE]: 'Juhe',
      [RecipeCategory.SALATE]: 'Salate',
      [RecipeCategory.PICA]: 'Pića',
      [RecipeCategory.SOKOVI_I_NAPICI]: 'Sokovi i napici',
      [RecipeCategory.PRILOZI]: 'Prilozi',
      [RecipeCategory.UMACI]: 'Umaci'
    };

    return categoryNames[category] || 'Nepoznata kategorija';
  }

  /**
   * Get all available categories with display names.
   */
  static getAllCategories(): Array<{ value: RecipeCategory; label: string }> {
    return Object.values(RecipeCategory).map(category => ({
      value: category,
      label: this.getCategoryDisplayName(category)
    }));
  }

  /**
   * Get category from string (case insensitive).
   */
  static getCategoryFromString(categoryStr: string): RecipeCategory | null {
    const upperStr = categoryStr.toUpperCase();
    const categories = Object.values(RecipeCategory);
    
    return categories.find(cat => cat === upperStr) || null;
  }
}