import { CDN_BASE_URL } from '@/config/constants';

/**
 * CDN utility functions for handling image URLs
 */
export class CdnUtils {
  /**
   * Builds full CDN URL from cdnPath
   * @param cdnPath - Relative path like "/recipes/slug/image.jpg"
   * @returns Full CDN URL
   */
  static getImageUrl(cdnPath: string | null): string | null {
    if (!cdnPath) return null;

    // Remove leading slash and '/cdn/' prefix if present
    let cleanPath = cdnPath.startsWith('/') ? cdnPath.slice(1) : cdnPath;
    if (cleanPath.startsWith('cdn/')) {
      cleanPath = cleanPath.substring(4);
    }

    return `${CDN_BASE_URL}/api/cdn/${cleanPath}`;
  }

  /**
   * Extracts cdnPath from full CDN URL (reverse operation)
   * @param fullUrl - Full CDN URL
   * @returns cdnPath or null if not a CDN URL
   */
  static extractCdnPath(fullUrl: string): string | null {
    if (!fullUrl.startsWith(CDN_BASE_URL)) return null;

    const cdnPath = fullUrl.replace(`${CDN_BASE_URL}/api/cdn/`, '/');
    return cdnPath.startsWith('/') ? cdnPath : `/${cdnPath}`;
  }

  /**
   * Generates cdnPath for a recipe image
   * @param recipeSlug - Recipe slug
   * @param imageName - Image filename (e.g., "hero.webp")
   * @returns cdnPath like "/recipes/slug/hero.webp"
   */
  static generateRecipeImagePath(recipeSlug: string, imageName: string): string {
    return `/recipes/${recipeSlug}/${imageName}`;
  }
}