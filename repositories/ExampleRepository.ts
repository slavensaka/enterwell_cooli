import { ExampleMapper } from '@/mappers/ExampleMapper';
import { ExampleModel } from '@/models/ExampleModel';

/**
 * Repository for managing example data.
 * In a real app, this would communicate with an API.
 */
export class ExampleRepository {
  /**
   * Fetches example items.
   * This is mock data - replace with actual API calls.
   */
  static async getItems(): Promise<ExampleModel[]> {
    // Simulate API call
    const mockData = [
      { id: 1, title: 'First Item', description: 'This is the first example item' },
      { id: 2, title: 'Second Item', description: 'This is the second example item' },
      { id: 3, title: 'Third Item', description: 'This is the third example item' }
    ];

    return ExampleMapper.toModelArray(mockData);
  }
}
