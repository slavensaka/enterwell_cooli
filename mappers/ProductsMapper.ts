import { Product } from '@/models/Product';

/**
 * Maps raw API data to Product models.
 */
export class ProductsMapper {
  /**
   * Maps a single product from API response to Product model.
   */
  static mapProduct(data: any): Product {
    return new Product(
      data.id,
      data.name,
      data.price,
      data.description
    );
  }

  /**
   * Maps an array of products from API response to Product models.
   */
  static mapProducts(data: any[]): Product[] {
    return data.map(item => this.mapProduct(item));
  }
}
