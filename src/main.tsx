import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Users from './pages/Users';
import { queryClient } from './lib/queryClient';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/ToastContainer';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container missing. Add a div with id="root" to index.html.');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // shell with nav + outlet
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/assessments', element: <Assessments /> },
      { path: '/users', element: <Users /> }
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
