import UsersView from '@/views/UsersView/UsersView';

/**
 * Users page route.
 * App routes serve only as encapsulation around views components.
 * This keeps the app less coupled with Next.js routing.
 */
export default function UsersPage() {
  return <UsersView />;
}
