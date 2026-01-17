import type { Meta, StoryObj } from '@storybook/react';
import { AssessmentForm } from './AssessmentForm';
import { useState } from 'react';

/**
 * AssessmentForm component for creating and editing assessments.
 *
 * ## Features
 * - **Validation**: Client-side form validation with error messages
 * - **Required Fields**: Name and Owner are required
 * - **Status Options**: scheduled, in-progress, blocked, complete
 * - **Priority Levels**: low, medium, high, critical
 * - **Edit Mode**: Supports both create and edit modes
 *
 * ## Props
 * - `assessment`: Optional assessment object for edit mode
 * - `onSubmit`: Callback function when form is submitted with valid data
 * - `onCancel`: Callback function when user cancels the form
 * - `isSubmitting`: Optional loading state during submission
 */
const meta = {
  title: 'Components/AssessmentForm',
  component: AssessmentForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive form component for creating and editing assessment records with validation.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AssessmentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Create new assessment mode
 */
function CreateModeContent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-panel border border-border rounded-lg p-6">
      {submitted ? (
        <div className="text-center">
          <p className="text-status-success mb-4">✓ Assessment created!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium"
          >
            Reset Form
          </button>
        </div>
      ) : (
        <AssessmentForm
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setSubmitted(true);
          }}
          onCancel={() => console.log('Form cancelled')}
        />
      )}
    </div>
  );
}

export const CreateMode: Story = {
  render: () => <CreateModeContent />
};

/**
 * Edit existing assessment mode
 */
function EditModeContent() {
  const [submitted, setSubmitted] = useState(false);
  const existingAssessment = {
    id: 'assess-001',
    name: 'Security Audit Q1',
    status: 'in-progress' as const,
    owner: 'John Doe',
    priority: 'high' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z'
  };

  return (
    <div className="bg-panel border border-border rounded-lg p-6">
      {submitted ? (
        <div className="text-center">
          <p className="text-status-success mb-4">✓ Assessment updated!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium"
          >
            Reset Form
          </button>
        </div>
      ) : (
        <AssessmentForm
          assessment={existingAssessment}
          onSubmit={(data) => {
            console.log('Form updated:', data);
            setSubmitted(true);
          }}
          onCancel={() => console.log('Form cancelled')}
        />
      )}
    </div>
  );
}

export const EditMode: Story = {
  render: () => <EditModeContent />
};

/**
 * Form in submitting state
 */
export const Submitting: Story = {
  render: () => (
    <div className="bg-panel border border-border rounded-lg p-6">
      <AssessmentForm
        onSubmit={(data) => console.log('Form submitted:', data)}
        onCancel={() => console.log('Form cancelled')}
        isSubmitting={true}
      />
    </div>
  )
};

/**
 * Form with validation errors
 */
export const WithValidationErrors: Story = {
  render: () => (
    <div className="bg-panel border border-border rounded-lg p-6">
      <p className="text-text-muted mb-4 text-sm">
        Try submitting the form without filling required fields to see validation errors.
      </p>
      <AssessmentForm
        onSubmit={(data) => console.log('Form submitted:', data)}
        onCancel={() => console.log('Form cancelled')}
      />
    </div>
  )
};

/**
 * Different status options demonstration
 */
export const StatusOptions: Story = {
  render: () => {
    const statuses = ['scheduled', 'in-progress', 'blocked', 'complete'] as const;

    return (
      <div className="space-y-4">
        {statuses.map((status) => (
          <div key={status} className="bg-panel border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 capitalize">{status}</h3>
            <AssessmentForm
              assessment={{
                id: `assess-${status}`,
                name: `Assessment - ${status}`,
                status,
                owner: 'Jane Smith',
                priority: 'medium',
                createdAt: '2024-01-01T00:00:00Z'
              }}
              onSubmit={(data) => console.log('Form submitted:', data)}
              onCancel={() => console.log('Form cancelled')}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Different priority options demonstration
 */
export const PriorityOptions: Story = {
  render: () => {
    const priorities = ['low', 'medium', 'high', 'critical'] as const;

    return (
      <div className="space-y-4">
        {priorities.map((priority) => (
          <div key={priority} className="bg-panel border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 capitalize">{priority}</h3>
            <AssessmentForm
              assessment={{
                id: `assess-${priority}`,
                name: `Assessment - ${priority} priority`,
                status: 'scheduled',
                owner: 'Alex Johnson',
                priority,
                createdAt: '2024-01-01T00:00:00Z'
              }}
              onSubmit={(data) => console.log('Form submitted:', data)}
              onCancel={() => console.log('Form cancelled')}
            />
          </div>
        ))}
      </div>
    );
  }
};
