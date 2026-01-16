import { User } from '@/models/User';
import { UsersMapper } from '@/mappers/UsersMapper';
// import { get, post, requestDelete } from '@/services/HttpService'; // Uncomment for real API

/**
 * Repository for managing user data.
 * Repositories serve as application boundaries through which the app retrieves data.
 * They use mappers to transform the data they retrieve.
 */
export class UsersRepository {
  /**
   * Fetches all users from the API.
   */
  static async getUsers(): Promise<User[]> {
    // In real app: const response = await HttpService.get('/users');
    // For demo, using mock data:
    await this.simulateNetworkDelay();

    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', created_at: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', created_at: '2024-02-20' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user', created_at: '2024-03-10' }
    ];

    return UsersMapper.mapUsers(mockData);
  }

  /**
   * Fetches a single user by ID.
   */
  static async getUserById(id: number): Promise<User | null> {
    await this.simulateNetworkDelay();

    const users = await this.getUsers();
    return users.find((u) => u.id === id) || null;
  }

  /**
   * Creates a new user.
   */
  static async createUser(userData: Partial<User>): Promise<User> {
    await this.simulateNetworkDelay();

    // In real app: const response = await HttpService.post('/users', UsersMapper.toApiFormat(userData));
    const mockResponse = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user',
      created_at: new Date().toISOString()
    };

    return UsersMapper.mapUser(mockResponse);
  }

  /**
   * Deletes a user by ID.
   */
  static async deleteUser(id: number): Promise<boolean> {
    await this.simulateNetworkDelay();
    // In real app: await HttpService.delete(`/users/${id}`);
    return true;
  }

  private static simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}
