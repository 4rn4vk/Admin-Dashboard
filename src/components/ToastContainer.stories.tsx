import type { Meta, StoryObj } from '@storybook/react';
import { ToastContainer } from './ToastContainer';
import { ToastProvider, useToast } from '../contexts/ToastContext';

/**
 * ToastContainer component for displaying notification messages.
 *
 * ## Features
 * - **Auto-dismiss**: Toasts automatically disappear after a timeout
 * - **Multiple Types**: success, error, info, warning
 * - **Live Region**: Announces messages to screen readers
 * - **Dismissible**: Users can manually close notifications
 * - **Stacking**: Multiple toasts stack vertically
 *
 * ## Usage
 * Must be used within a ToastProvider context. Use the `useToast()` hook
 * to trigger notifications from anywhere in your app.
 *
 * ## Toast Types
 * - `success`: Green toast for successful operations
 * - `error`: Red toast for errors and failures
 * - `info`: Blue toast for informational messages
 * - `warning`: Yellow/orange toast for warnings
 */
const meta = {
  title: 'Components/ToastContainer',
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A notification toast system with accessibility support and auto-dismiss functionality.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    )
  ]
} satisfies Meta<typeof ToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component with buttons to trigger toasts
function ToastDemo() {
  const toast = useToast();

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-panel border border-border rounded-lgx p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Toast Notifications</h2>
            <p className="text-text-muted mb-6">
              Click the buttons below to trigger different types of toast notifications.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toast.success('Operation completed successfully!')}
              className="px-4 py-3 bg-status-success text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Show Success
            </button>
            <button
              onClick={() => toast.error('An error occurred while processing your request.')}
              className="px-4 py-3 bg-status-danger text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Show Error
            </button>
            <button
              onClick={() => toast.info('Here is some helpful information for you.')}
              className="px-4 py-3 bg-status-info text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Show Info
            </button>
            <button
              onClick={() => toast.warning('Warning: Please review your input before proceeding.')}
              className="px-4 py-3 bg-status-warning text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Show Warning
            </button>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              onClick={() => {
                toast.success('First notification');
                setTimeout(() => toast.info('Second notification'), 300);
                setTimeout(() => toast.warning('Third notification'), 600);
              }}
              className="w-full px-4 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
              Show Multiple Toasts
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

/**
 * Interactive demo with all toast types
 */
export const Interactive: Story = {
  render: () => <ToastDemo />
};

/**
 * Success toast example
 */
function SuccessToastDemo() {
  const toast = useToast();

  // Trigger toast on mount
  setTimeout(() => {
    toast.success('Your changes have been saved successfully!');
  }, 100);

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto bg-panel border border-border rounded-lgx p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Success Message</h2>
        <p className="text-text-muted">A success toast will appear automatically.</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export const SuccessToast: Story = {
  render: () => <SuccessToastDemo />
};

/**
 * Error toast example
 */
function ErrorToastDemo() {
  const toast = useToast();

  setTimeout(() => {
    toast.error('Failed to connect to the server. Please try again.');
  }, 100);

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto bg-panel border border-border rounded-lgx p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Error Message</h2>
        <p className="text-text-muted">An error toast will appear automatically.</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export const ErrorToast: Story = {
  render: () => <ErrorToastDemo />
};

/**
 * Info toast example
 */
function InfoToastDemo() {
  const toast = useToast();

  setTimeout(() => {
    toast.info('New features have been added to the dashboard. Check them out!');
  }, 100);

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto bg-panel border border-border rounded-lgx p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Info Message</h2>
        <p className="text-text-muted">An info toast will appear automatically.</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export const InfoToast: Story = {
  render: () => <InfoToastDemo />
};

/**
 * Warning toast example
 */
function WarningToastDemo() {
  const toast = useToast();

  setTimeout(() => {
    toast.warning('Your session will expire in 5 minutes. Please save your work.');
  }, 100);

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto bg-panel border border-border rounded-lgx p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Warning Message</h2>
        <p className="text-text-muted">A warning toast will appear automatically.</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export const WarningToast: Story = {
  render: () => <WarningToastDemo />
};

/**
 * Multiple stacked toasts
 */
function MultipleToastsDemo() {
  const toast = useToast();

  setTimeout(() => {
    toast.success('File uploaded successfully');
    setTimeout(() => toast.info('Processing started'), 500);
    setTimeout(() => toast.warning('Review required'), 1000);
    setTimeout(() => toast.error('Validation failed on row 15'), 1500);
  }, 100);

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto bg-panel border border-border rounded-lgx p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Multiple Notifications</h2>
        <p className="text-text-muted">Multiple toasts will stack vertically.</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export const MultipleToasts: Story = {
  render: () => <MultipleToastsDemo />
};

/**
 * Long message toast
 */
function LongMessageDemo() {
  const toast = useToast();

  setTimeout(() => {
    toast.info(
      'This is a much longer notification message that demonstrates how the toast component handles extended text content. The component should wrap the text appropriately and maintain good readability.'
    );
  }, 100);

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto bg-panel border border-border rounded-lgx p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Long Message</h2>
        <p className="text-text-muted">A toast with a longer message will appear.</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export const LongMessage: Story = {
  render: () => <LongMessageDemo />
};
