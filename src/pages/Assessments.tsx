import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  type Assessment,
  type AssessmentStatus,
  type AssessmentPriority
} from '../api/assessments';
import { AssessmentForm, type AssessmentFormData } from '../components/AssessmentForm';
import { Modal } from '../components/Modal';
import { useToast } from '../contexts/ToastContext';

const statusStyles: Record<AssessmentStatus, string> = {
  'in-progress': 'bg-brand-600 text-surface',
  blocked: 'bg-status-danger/20 text-status-danger border border-status-danger/40',
  scheduled: 'bg-status-info/15 text-status-info border border-status-info/30',
  complete: 'bg-status-success/20 text-status-success border border-status-success/40'
};

const priorityStyles: Record<AssessmentPriority, string> = {
  low: 'bg-gray-500/20 text-gray-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-orange-500/20 text-orange-400',
  critical: 'bg-red-500/20 text-red-400'
};

function Assessments() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Assessment>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const limit = 10;

  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);
  const toast = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['assessments', { page, sortBy, sortOrder, limit }],
    queryFn: () => fetchAssessments({ page, limit, sortBy, sortOrder })
  });

  const createMutation = useMutation({
    mutationFn: createAssessment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      setIsModalOpen(false);
      setMutationError(null);
      toast.success('Assessment created successfully');
    },
    onError: (error) => {
      const errorMessage = (error as Error).message;
      setMutationError(errorMessage);
      toast.error(`Failed to create assessment: ${errorMessage}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssessmentFormData }) =>
      updateAssessment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      setIsModalOpen(false);
      setEditingAssessment(null);
      setMutationError(null);
      toast.success('Assessment updated successfully');
    },
    onError: (error) => {
      const errorMessage = (error as Error).message;
      setMutationError(errorMessage);
      toast.error(`Failed to update assessment: ${errorMessage}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAssessment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      toast.success('Assessment deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete assessment: ${(error as Error).message}`);
    }
  });

  const handleCreate = () => {
    setEditingAssessment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (formData: AssessmentFormData) => {
    if (editingAssessment) {
      updateMutation.mutate({ id: editingAssessment.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAssessment(null);
  };

  const handleSort = (column: keyof Assessment) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    setPage(1);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const SortIcon = ({ column }: { column: keyof Assessment }) => {
    if (sortBy !== column) {
      return <span className="text-text-muted opacity-50">⇅</span>;
    }
    return <span className="text-brand-500">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Workflows</p>
          <h2 className="text-2xl font-semibold">Assessments</h2>
          <p className="muted">Current reviews, their owners, and status.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-surface transition-colors"
        >
          + New Assessment
        </button>
      </div>

      {isLoading && (
        <div className="bg-panel border border-border rounded-lgx p-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mb-4"></div>
          <p className="text-text-muted">Loading assessments...</p>
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
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Failed to Load Assessments
          </h3>
          <p className="text-text-muted mb-4">{(error as Error).message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {data && data.items.length === 0 && (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Assessments Yet</h3>
          <p className="text-text-muted mb-4">Get started by creating your first assessment.</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          >
            + Create Assessment
          </button>
        </div>
      )}

      {data && data.items.length > 0 && (
        <>
          {/* Table */}
          <div className="bg-panel border border-border rounded-lgx overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface/50 border-b border-border">
                  <tr>
                    <th
                      className="text-left px-4 py-3 text-sm font-semibold text-text-primary cursor-pointer hover:bg-surface/70 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Name
                        <SortIcon column="name" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-3 text-sm font-semibold text-text-primary cursor-pointer hover:bg-surface/70 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        <SortIcon column="status" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-3 text-sm font-semibold text-text-primary cursor-pointer hover:bg-surface/70 transition-colors"
                      onClick={() => handleSort('priority')}
                    >
                      <div className="flex items-center gap-2">
                        Priority
                        <SortIcon column="priority" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-3 text-sm font-semibold text-text-primary cursor-pointer hover:bg-surface/70 transition-colors"
                      onClick={() => handleSort('owner')}
                    >
                      <div className="flex items-center gap-2">
                        Owner
                        <SortIcon column="owner" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-3 text-sm font-semibold text-text-primary cursor-pointer hover:bg-surface/70 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-2">
                        Created
                        <SortIcon column="createdAt" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.items.map((item) => (
                    <tr key={item.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-text-primary">{item.name}</p>
                          <p className="text-xs text-text-muted">{item.id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ${statusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ${priorityStyles[item.priority]}`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-muted">{item.owner}</td>
                      <td className="px-4 py-3 text-sm text-text-muted">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-3 py-1 text-sm text-brand-500 hover:text-brand-400 font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteMutation.isPending}
                            className="px-3 py-1 text-sm text-status-danger hover:text-red-400 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between bg-panel border border-border rounded-lgx px-4 py-3">
            <p className="text-sm text-text-muted">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, data.pagination.total)} of{' '}
              {data.pagination.total} assessments
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-surface border border-border hover:bg-surface/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        page === pageNum
                          ? 'bg-brand-600 text-white'
                          : 'bg-surface border border-border hover:bg-surface/70'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === data.pagination.totalPages}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-surface border border-border hover:bg-surface/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAssessment ? 'Edit Assessment' : 'Create New Assessment'}
      >
        {mutationError && (
          <div className="mb-4 p-3 bg-status-danger/10 border border-status-danger/40 rounded-lg">
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-status-danger flex-shrink-0 mt-0.5"
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
              <div className="flex-1">
                <p className="text-sm font-medium text-status-danger">Error</p>
                <p className="text-sm text-status-danger/90">{mutationError}</p>
              </div>
              <button
                onClick={() => setMutationError(null)}
                className="text-status-danger hover:text-status-danger/80"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        <AssessmentForm
          assessment={editingAssessment}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>
    </section>
  );
}

export default Assessments;
