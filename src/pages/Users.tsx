import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  return (
    <section className="space-y-4">
      <div>
        <p className="eyebrow">Directory</p>
        <h2 className="text-2xl font-semibold">Users</h2>
        <p className="muted">People with access, their roles, and responsibilities.</p>
      </div>

      {isLoading && <p className="muted">Loading users…</p>}
      {error && <p className="muted">Failed to load: {(error as Error).message}</p>}

      {data && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((user) => (
            <div
              key={user.id}
              className="bg-panel border border-border rounded-lgx p-4 shadow-panel/30 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold leading-tight">{user.name}</p>
                  <p className="text-sm text-text-muted">ID: {user.id}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-brand-600 text-surface text-xs font-semibold px-3 py-1 shadow-md">
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
