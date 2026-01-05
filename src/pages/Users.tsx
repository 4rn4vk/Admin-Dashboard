import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, type UserRole, type UserStatus } from '../api/users';

const roleStyles: Record<UserRole, string> = {
  Admin: 'bg-purple-500/20 text-purple-400 border border-purple-500/40',
  Reviewer: 'bg-blue-500/20 text-blue-400 border border-blue-500/40',
  Contributor: 'bg-green-500/20 text-green-400 border border-green-500/40'
};

const statusStyles: Record<UserStatus, string> = {
  active: 'bg-status-success/20 text-status-success border border-status-success/40',
  inactive: 'bg-gray-500/20 text-gray-400 border border-gray-500/40'
};

function Users() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', { search, role: roleFilter, status: statusFilter }],
    queryFn: () => fetchUsers({ search, role: roleFilter, status: statusFilter })
  });

  return (
    <section className="space-y-4">
      <div>
        <p className="eyebrow">Directory</p>
        <h2 className="text-2xl font-semibold">Users</h2>
        <p className="muted">People with access, their roles, and responsibilities.</p>
      </div>

      {/* Filters */}
      <div className="bg-panel border border-border rounded-lgx p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-text-primary mb-2">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-2">
              Role
            </label>
            <select
              id="role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | '')}
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Contributor">Contributor</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-text-primary mb-2">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus | '')}
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {(search || roleFilter || statusFilter) && (
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => {
                setSearch('');
                setRoleFilter('');
                setStatusFilter('');
              }}
              className="text-sm text-brand-500 hover:text-brand-400 font-medium transition-colors"
            >
              Clear all filters
            </button>
            <span className="text-sm text-text-muted">
              {data ? `${data.items.length} user${data.items.length !== 1 ? 's' : ''} found` : ''}
            </span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="bg-panel border border-border rounded-lgx p-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mb-4"></div>
          <p className="text-text-muted">Loading users...</p>
        </div>
      )}

      {error && (
        <div className="bg-panel border border-status-danger/40 rounded-lgx p-8 text-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-status-danger mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Failed to Load Users</h3>
          <p className="text-text-muted mb-4">{(error as Error).message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {data && (
        <div className="bg-panel border border-border rounded-lgx overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                      No users found matching your filters
                    </td>
                  </tr>
                ) : (
                  data.items.map((user) => (
                    <tr key={user.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-text-primary">{user.name}</p>
                          <p className="text-xs text-text-muted">{user.id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-muted">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ${roleStyles[user.role]}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ${statusStyles[user.status]}`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default Users;
