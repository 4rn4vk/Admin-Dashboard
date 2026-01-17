import type { Meta, StoryObj } from '@storybook/react';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/**
 * Layout component providing the application shell with navigation.
 *
 * ## Features
 * - **Responsive Navigation**: Collapsible sidebar for mobile devices
 * - **Active Link Highlighting**: Visual feedback for current page
 * - **Header Section**: Configurable title and subtitle
 * - **Main Content Area**: Renders child routes via Outlet
 * - **Accessibility**: Proper ARIA labels for navigation controls
 *
 * ## Props
 * - `navLinks`: Array of navigation items with `to` and `label` properties
 * - `headerTitle`: Optional title displayed in the header (default: "Vite + React + TS")
 * - `headerSubtitle`: Optional subtitle in header (default: "Admin Dashboard Starter")
 */
const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main layout component with responsive navigation sidebar and header.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample page components for demonstration
const DashboardPage = () => (
  <div className="space-y-4">
    <div>
      <p className="eyebrow">Overview</p>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="muted">Key metrics and statistics.</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-panel border border-border rounded-lgx p-6">
        <p className="text-sm text-text-muted mb-2">Total Users</p>
        <p className="text-3xl font-bold text-text-primary">1,234</p>
      </div>
      <div className="bg-panel border border-border rounded-lgx p-6">
        <p className="text-sm text-text-muted mb-2">Active Sessions</p>
        <p className="text-3xl font-bold text-text-primary">892</p>
      </div>
      <div className="bg-panel border border-border rounded-lgx p-6">
        <p className="text-sm text-text-muted mb-2">Revenue</p>
        <p className="text-3xl font-bold text-text-primary">$45.2k</p>
      </div>
    </div>
  </div>
);

const AssessmentsPage = () => (
  <div className="space-y-4">
    <div>
      <p className="eyebrow">Workflows</p>
      <h2 className="text-2xl font-semibold">Assessments</h2>
      <p className="muted">Current reviews and their status.</p>
    </div>
    <div className="bg-panel border border-border rounded-lgx p-8 text-center">
      <p className="text-text-muted">Assessments content goes here...</p>
    </div>
  </div>
);

const UsersPage = () => (
  <div className="space-y-4">
    <div>
      <p className="eyebrow">Directory</p>
      <h2 className="text-2xl font-semibold">Users</h2>
      <p className="muted">People with access and their roles.</p>
    </div>
    <div className="bg-panel border border-border rounded-lgx p-8 text-center">
      <p className="text-text-muted">Users content goes here...</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-4">
    <div>
      <p className="eyebrow">Configuration</p>
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="muted">Manage your preferences.</p>
    </div>
    <div className="bg-panel border border-border rounded-lgx p-8 text-center">
      <p className="text-text-muted">Settings content goes here...</p>
    </div>
  </div>
);

/**
 * Default layout with standard navigation
 */
export const Default: Story = {
  render: () => (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              navLinks={[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/assessments', label: 'Assessments' },
                { to: '/users', label: 'Users' }
              ]}
            />
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

/**
 * Layout with custom header text
 */
export const CustomHeader: Story = {
  render: () => (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              navLinks={[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/assessments', label: 'Assessments' },
                { to: '/users', label: 'Users' }
              ]}
              headerTitle="Enterprise Portal"
              headerSubtitle="Management Console"
            />
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

/**
 * Layout with extended navigation
 */
export const ExtendedNavigation: Story = {
  render: () => (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              navLinks={[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/assessments', label: 'Assessments' },
                { to: '/users', label: 'Users' },
                { to: '/settings', label: 'Settings' },
                { to: '/reports', label: 'Reports' },
                { to: '/analytics', label: 'Analytics' }
              ]}
            />
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/reports"
            element={
              <div className="bg-panel border border-border rounded-lgx p-8 text-center">
                <p className="text-text-muted">Reports page</p>
              </div>
            }
          />
          <Route
            path="/analytics"
            element={
              <div className="bg-panel border border-border rounded-lgx p-8 text-center">
                <p className="text-text-muted">Analytics page</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

/**
 * Layout with minimal navigation
 */
export const MinimalNavigation: Story = {
  render: () => (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              navLinks={[
                { to: '/dashboard', label: 'Home' },
                { to: '/settings', label: 'Settings' }
              ]}
              headerTitle="Simple App"
              headerSubtitle="Dashboard"
            />
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

/**
 * Mobile view simulation (resize browser to see mobile menu)
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              navLinks={[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/assessments', label: 'Assessments' },
                { to: '/users', label: 'Users' }
              ]}
            />
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
