import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../api/dashboard';

function Dashboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard
  });

  return (
    <section className="space-y-4">
      <div>
        <p className="eyebrow">Overview</p>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="muted">Key KPIs from the mock API.</p>
      </div>

      {isLoading && (
        <div className="bg-panel border border-border rounded-lgx p-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mb-4"></div>
          <p className="text-text-muted">Loading dashboard data...</p>
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
          <h3 className="text-lg font-semibold text-text-primary mb-2">Failed to Load Dashboard</h3>
          <p className="text-text-muted mb-4">{(error as Error).message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {data && data.stats.length === 0 && (
        <div className="bg-panel border border-border rounded-lgx p-12 text-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-text-muted mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Dashboard Data</h3>
          <p className="text-text-muted">Dashboard statistics are not available at this time.</p>
        </div>
      )}

      {data && data.stats.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-panel border border-border rounded-lgx p-6 shadow-panel/30 backdrop-blur-sm"
            >
              <p className="text-sm text-text-muted mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-text-primary mb-2">{stat.value}</p>
              <span
                className={`text-sm font-semibold ${stat.delta.startsWith('-') ? 'text-status-danger' : 'text-status-success'}`}
              >
                {stat.delta}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
