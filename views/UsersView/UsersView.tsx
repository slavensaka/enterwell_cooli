'use client';

import { observer } from 'mobx-react-lite';
import { useUsers } from '@/hooks/useUsers';
import UserCard from '@/components/UserCard/UserCard';
import LoadingContainer from '@/components/LoadingContainer/LoadingContainer';
import styles from './UsersView.module.scss';

/**
 * UsersView - displays list of users.
 * Views represent everything the user sees on an application route.
 * They use view-models for state management and can use shared components.
 */
const UsersView = observer(() => {
  const viewModel = useUsers();

  if (viewModel.error) {
    return (
      <div className={styles.container}>
        <h1>Users</h1>
        <p className={styles.error}>{viewModel.error}</p>
      </div>
    );
  }

  return (
    <LoadingContainer isLoading={viewModel.isLoading}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Users</h1>
          <span className={styles.count}>{viewModel.userCount} users</span>
        </div>

        <div className={styles.grid}>
          {viewModel.users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onSelect={(u) => viewModel.selectUser(u)}
              onDelete={(id) => viewModel.deleteUser(id)}
            />
          ))}
        </div>

        {viewModel.selectedUser && (
          <div className={styles.selected}>
            <h2>Selected: {viewModel.selectedUser.name}</h2>
            <button onClick={() => viewModel.selectUser(null)}>Clear</button>
          </div>
        )}
      </div>
    </LoadingContainer>
  );
});

export default UsersView;
