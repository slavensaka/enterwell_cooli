import type { Meta, StoryObj } from '@storybook/react';
import UserCard from './UserCard';
import { User } from '@/models/User';

/**
 * Storybook stories for UserCard component.
 * Stories allow isolated development and testing of components.
 */
const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof UserCard>;

// Sample users for stories
const regularUser = new User(1, 'John Doe', 'john@example.com', 'user', new Date('2024-01-15'));
const adminUser = new User(2, 'Jane Admin', 'jane@example.com', 'admin', new Date('2024-03-01'));

/**
 * Default user card.
 */
export const Default: Story = {
  args: {
    user: regularUser
  }
};

/**
 * Admin user with badge.
 */
export const AdminUser: Story = {
  args: {
    user: adminUser
  }
};

/**
 * User card with delete button.
 */
export const WithDelete: Story = {
  args: {
    user: regularUser,
    onDelete: (id) => console.log('Delete user:', id)
  }
};
