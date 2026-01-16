import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '@/models/User';
import { UsersRepository } from '@/repositories/UsersRepository';
import { showSuccessNotification, showErrorNotification } from '@/services/NotificationsService';

/**
 * ViewModel for the Users page.
 * View-models persist data characteristic to a view and contain
 * logic to retrieve and modify that data.
 * 
 * This ViewModel exists throughout the app lifecycle (singleton pattern)
 * because it manages a list that should persist across navigation.
 */
export class UsersViewModel {
  // Observable state
  users: User[] = [];
  selectedUser: User | null = null;
  isLoading = false;
  error: string | null = null;

  // Singleton instance
  private static instance: UsersViewModel;

  private constructor() {
    makeAutoObservable(this);
  }

  /**
   * Get singleton instance.
   * Use singleton for list views to preserve state across navigation.
   */
  static getInstance(): UsersViewModel {
    if (!UsersViewModel.instance) {
      UsersViewModel.instance = new UsersViewModel();
    }
    return UsersViewModel.instance;
  }

  /**
   * Loads all users from the repository.
   */
  async loadUsers(): Promise<void> {
    if (this.users.length > 0) return; // Already loaded

    this.isLoading = true;
    this.error = null;

    try {
      const users = await UsersRepository.getUsers();

      runInAction(() => {
        this.users = users;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Failed to load users';
        this.isLoading = false;
      });
      showErrorNotification('Failed to load users');
    }
  }

  /**
   * Selects a user for viewing/editing.
   */
  selectUser(user: User | null): void {
    this.selectedUser = user;
  }

  /**
   * Creates a new user.
   */
  async createUser(userData: Partial<User>): Promise<boolean> {
    this.isLoading = true;

    try {
      const newUser = await UsersRepository.createUser(userData);

      runInAction(() => {
        this.users.push(newUser);
        this.isLoading = false;
      });

      showSuccessNotification('User created successfully');
      return true;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      showErrorNotification('Failed to create user');
      return false;
    }
  }

  /**
   * Deletes a user.
   */
  async deleteUser(id: number): Promise<boolean> {
    try {
      await UsersRepository.deleteUser(id);

      runInAction(() => {
        this.users = this.users.filter((u) => u.id !== id);
        if (this.selectedUser?.id === id) {
          this.selectedUser = null;
        }
      });

      showSuccessNotification('User deleted successfully');
      return true;
    } catch (err) {
      showErrorNotification('Failed to delete user');
      return false;
    }
  }

  /**
   * Computed: Get admin users only.
   */
  get adminUsers(): User[] {
    return this.users.filter((u) => u.isAdmin());
  }

  /**
   * Computed: Get user count.
   */
  get userCount(): number {
    return this.users.length;
  }
}
