import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../api/dashboard';

function Dashboard() {
  const { data, isLoading, error } = useQuery({
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

      {isLoading && <p className="muted">Loading dashboard…</p>}
      {error && <p className="muted">Failed to load: {(error as Error).message}</p>}

      {data && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-panel border border-border rounded-lgx p-4 shadow-panel/30 backdrop-blur-sm"
            >
              <p className="text-sm text-text-muted">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
              <span className={`text-sm font-semibold ${stat.delta.startsWith('-') ? 'text-status-danger' : 'text-status-success'}`}>
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
