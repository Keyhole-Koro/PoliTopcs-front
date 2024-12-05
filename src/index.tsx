import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ArticlesProvider } from './contexts/ArticlesContext';
import { SearchBarProvider } from './contexts/SearchBarContext';

const container = document.getElementById('root');
const root = createRoot(container!); // Create a root.

root.render(
  <React.StrictMode>
    <ArticlesProvider>
      <SearchBarProvider>
        <App />
      </SearchBarProvider>
    </ArticlesProvider>
  </React.StrictMode>
);
