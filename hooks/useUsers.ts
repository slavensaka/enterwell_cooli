import { useEffect, useState } from 'react';
import { UsersViewModel } from '@/view-models/UsersViewModel';

/**
 * Custom hook for accessing UsersViewModel.
 * Hooks let us extract component logic into reusable functions.
 * They are similar to helpers but focused on React components.
 */
export function useUsers() {
  const [viewModel] = useState(() => UsersViewModel.getInstance());

  useEffect(() => {
    viewModel.loadUsers();
  }, [viewModel]);

  return viewModel;
}
