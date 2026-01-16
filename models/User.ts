/**
 * User model representing a user entity in the application.
 * Models are classes that represent entities used in the application.
 */
export class User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    role: 'admin' | 'user',
    createdAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  /**
   * Check if user is admin.
   */
  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
