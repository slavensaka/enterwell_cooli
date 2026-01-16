import { User } from '@/models/User';

/**
 * Mapper for transforming raw API data to User models.
 * Mappers provide data mapping service - most common use case is
 * mapping data from the server to the models used in the application.
 */
export class UsersMapper {
  /**
   * Maps raw API response to User model.
   * Can include data transformations (formatting, localization, etc.)
   */
  static mapUser(data: any): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.role || 'user',
      new Date(data.created_at)
    );
  }

  /**
   * Maps array of raw API responses to User models.
   */
  static mapUsers(data: any[]): User[] {
    return data.map((item) => this.mapUser(item));
  }

  /**
   * Maps User model back to API format (for POST/PUT requests).
   */
  static toApiFormat(user: Partial<User>): Record<string, any> {
    return {
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
}
