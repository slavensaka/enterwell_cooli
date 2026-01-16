/**
 * Recipe model representing a recipe entity.
 */
export class Recipe {
  constructor(
    public id: string,
    public slug: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

/**
 * Plain Recipe object for passing between Server and Client components.
 * Next.js cannot serialize class instances, so we use plain objects.
 */
export type RecipeDTO = {
  id: string;
  slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
