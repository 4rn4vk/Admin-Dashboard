import { useQuery } from '@tanstack/react-query';
import { fetchAssessments, type AssessmentStatus } from '../api/assessments';

const statusStyles: Record<AssessmentStatus, string> = {
  'in-progress': 'bg-brand-600 text-surface',
  blocked: 'bg-status-danger/20 text-status-danger border border-status-danger/40',
  scheduled: 'bg-status.info/15 text-status-info border border-status-info/30',
  complete: 'bg-status.success/20 text-status.success border border-status.success/40'
};

function Assessments() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['assessments'],
    queryFn: fetchAssessments
  });

  return (
    <section className="space-y-4">
      <div>
        <p className="eyebrow">Workflows</p>
        <h2 className="text-2xl font-semibold">Assessments</h2>
        <p className="muted">Current reviews, their owners, and status.</p>
      </div>

      {isLoading && <p className="muted">Loading assessments…</p>}
      {error && <p className="muted">Failed to load: {(error as Error).message}</p>}

      {data && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="bg-panel border border-border rounded-lgx p-4 shadow-panel/30 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold leading-tight">{item.name}</p>
                  <p className="text-sm text-text-muted">ID: {item.id}</p>
                </div>
                <span className={`inline-flex items-center rounded-full text-xs font-semibold px-3 py-1 shadow-sm ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-text-muted mt-3">Owner: {item.owner}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Assessments;
