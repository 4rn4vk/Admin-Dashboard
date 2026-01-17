import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { queryClient } from './lib/queryClient';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/ToastContainer';
import './index.css';

// Lazy-loaded page components for code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Assessments = React.lazy(() => import('./pages/Assessments'));
const Users = React.lazy(() => import('./pages/Users'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mb-4"></div>
        <p className="text-text-muted">Loading page...</p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container missing. Add a div with id="root" to index.html.');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // shell with nav + outlet
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: '/assessments',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Assessments />
          </Suspense>
        )
      },
      {
        path: '/users',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Users />
          </Suspense>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
