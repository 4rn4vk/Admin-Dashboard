import { useState, useEffect } from 'react';
import type { Assessment, AssessmentStatus, AssessmentPriority } from '../api/assessments';

interface AssessmentFormProps {
  readonly assessment?: Assessment | null;
  readonly onSubmit: (_data: AssessmentFormData) => void;
  readonly onCancel: () => void;
  readonly isSubmitting?: boolean;
}

export interface AssessmentFormData {
  readonly name: string;
  readonly status: AssessmentStatus;
  readonly owner: string;
  readonly priority: AssessmentPriority;
}

type FormErrors = Partial<Record<keyof AssessmentFormData, string>>;

const statusOptions: readonly AssessmentStatus[] = [
  'scheduled',
  'in-progress',
  'blocked',
  'complete'
] as const;
const priorityOptions: readonly AssessmentPriority[] = [
  'low',
  'medium',
  'high',
  'critical'
] as const;

export function AssessmentForm({
  assessment,
  onSubmit,
  onCancel,
  isSubmitting
}: AssessmentFormProps) {
  const [formData, setFormData] = useState<AssessmentFormData>({
    name: '',
    status: 'scheduled',
    owner: '',
    priority: 'medium'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (assessment) {
      setFormData({
        name: assessment.name,
        status: assessment.status,
        owner: assessment.owner,
        priority: assessment.priority
      });
    }
  }, [assessment]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.owner.trim()) {
      newErrors.owner = 'Owner is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof AssessmentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
          Assessment Name <span className="text-status-danger">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-3 py-2 bg-surface border ${errors.name ? 'border-status-danger' : 'border-border'} rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent`}
          placeholder="Enter assessment name"
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-sm text-status-danger">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="owner" className="block text-sm font-medium text-text-primary mb-1">
          Owner <span className="text-status-danger">*</span>
        </label>
        <input
          type="text"
          id="owner"
          value={formData.owner}
          onChange={(e) => handleChange('owner', e.target.value)}
          className={`w-full px-3 py-2 bg-surface border ${errors.owner ? 'border-status-danger' : 'border-border'} rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent`}
          placeholder="Enter owner name"
          disabled={isSubmitting}
        />
        {errors.owner && <p className="mt-1 text-sm text-status-danger">{errors.owner}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-text-primary mb-1">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value as AssessmentStatus)}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          disabled={isSubmitting}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-text-primary mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value as AssessmentPriority)}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          disabled={isSubmitting}
        >
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : assessment ? 'Update Assessment' : 'Create Assessment'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-surface border border-border text-text-primary rounded-lg font-medium hover:bg-surface/70 focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
