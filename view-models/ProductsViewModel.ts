import { makeAutoObservable, runInAction } from 'mobx';
import { Product } from '@/models/Product';
import { ProductsRepository } from '@/repositories/ProductsRepository';

/**
 * View model for the Products page.
 * Manages state and logic for displaying products.
 */
export class ProductsViewModel {
  products: Product[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Loads products from the repository.
   */
  async loadProducts() {
    this.isLoading = true;
    this.error = null;

    try {
      const products = await ProductsRepository.getProducts();
      
      runInAction(() => {
        this.products = products;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Failed to load products';
        this.isLoading = false;
      });
    }
  }
}
