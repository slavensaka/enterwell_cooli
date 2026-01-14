import { Product } from '@/models/Product';
import { ProductsMapper } from '@/mappers/ProductsMapper';

/**
 * Repository for managing product data.
 * In a real app, this would communicate with an API.
 */
export class ProductsRepository {
  /**
   * Fetches all products.
   * For demo purposes, returns mock data.
   */
  static async getProducts(): Promise<Product[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data
    const mockData = [
      { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
      { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
      { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard' },
      { id: 4, name: 'Monitor', price: 299.99, description: '27-inch 4K monitor' },
    ];

    return ProductsMapper.mapProducts(mockData);
  }

  /**
   * Fetches a single product by ID.
   */
  static async getProductById(id: number): Promise<Product | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  }
}
