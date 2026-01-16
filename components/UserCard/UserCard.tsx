'use client';

import { User } from '@/models/User';
import { DateHelper } from '@/helpers/DateHelper';
import styles from './UserCard.module.scss';

type UserCardProps = {
  user: User;
  onSelect?: (user: User) => void;
  onDelete?: (id: number) => void;
};

/**
 * UserCard component - displays a single user.
 * Components in /components folder are shared across multiple views.
 */
export default function UserCard({ user, onSelect, onDelete }: UserCardProps) {
  return (
    <div className={styles.card} onClick={() => onSelect?.(user)}>
      <div className={styles.header}>
        <h3 className={styles.name}>{user.name}</h3>
        {user.isAdmin() && <span className={styles.badge}>Admin</span>}
      </div>

      <p className={styles.email}>{user.email}</p>

      <div className={styles.footer}>
        <span className={styles.date}>
          Joined {DateHelper.formatRelative(user.createdAt)}
        </span>

        {onDelete && (
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(user.id);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
