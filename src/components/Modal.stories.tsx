import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';

/**
 * Modal component for displaying content in an overlay dialog.
 *
 * ## Features
 * - **Keyboard Support**: Press ESC to close
 * - **Focus Management**: Automatically focuses the dialog when opened
 * - **Backdrop Click**: Click outside to close
 * - **Accessibility**: Uses proper ARIA roles and labels
 *
 * ## Props
 * - `isOpen`: Controls visibility of the modal
 * - `onClose`: Callback function when modal is closed
 * - `title`: Title displayed at the top of the modal
 * - `children`: Content to display inside the modal
 */
const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible modal dialog component with keyboard navigation and focus management.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle state
function ModalWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700"
      >
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {children}
      </Modal>
    </div>
  );
}

/**
 * Basic modal with simple text content
 */
export const Basic: Story = {
  render: () => (
    <ModalWrapper title="Basic Modal">
      <p className="text-text-muted">This is a basic modal with some text content.</p>
    </ModalWrapper>
  )
};

/**
 * Modal with a form inside
 */
export const WithForm: Story = {
  render: () => (
    <ModalWrapper title="User Registration">
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700"
          >
            Submit
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-surface border border-border text-text-primary rounded-lg font-medium hover:bg-surface/70"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
};

/**
 * Modal with long content that scrolls
 */
export const WithLongContent: Story = {
  render: () => (
    <ModalWrapper title="Terms and Conditions">
      <div className="space-y-4 text-text-muted max-h-96 overflow-y-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam.
        </p>
        <p>
          Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>
        <div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">
            Accept
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
};

/**
 * Confirmation modal
 */
export const Confirmation: Story = {
  render: () => (
    <ModalWrapper title="Confirm Deletion">
      <div className="space-y-4">
        <p className="text-text-muted">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex gap-3 pt-2">
          <button className="flex-1 px-4 py-2 bg-status-danger text-white rounded-lg font-medium hover:bg-red-700">
            Delete
          </button>
          <button className="flex-1 px-4 py-2 bg-surface border border-border text-text-primary rounded-lg font-medium hover:bg-surface/70">
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
};
