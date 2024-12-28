import React from 'react';
import App from './App';

import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ArticlesProvider } from './contexts/ArticlesContext';
import { SearchBarProvider } from './contexts/SearchBarContext';

const container = document.getElementById('root');
const root = createRoot(container!);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {}
      <ArticlesProvider>
        <SearchBarProvider>
          <App />
        </SearchBarProvider>
      </ArticlesProvider>
    </QueryClientProvider> {}
  </React.StrictMode>
);
