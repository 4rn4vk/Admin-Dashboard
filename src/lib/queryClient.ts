import { QueryClient } from '@tanstack/react-query';

// Central QueryClient so cache and config are shared app-wide.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false
    }
  }
});
