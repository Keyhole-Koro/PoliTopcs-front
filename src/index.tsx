import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ArticlesProvider } from './contexts/ArticlesContext';
import { SearchBarProvider } from './contexts/SearchBarContext';

ReactDOM.render(
  <React.StrictMode>
    <ArticlesProvider>
      <SearchBarProvider>
        <App />
      </SearchBarProvider>
    </ArticlesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);