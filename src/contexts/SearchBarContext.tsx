import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchBarContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBarContext = createContext<SearchBarContextProps | undefined>(undefined);

export const useSearchBar = () => {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error('useSearchBar must be used within a SearchBarProvider');
  }
  return context;
};

interface SearchBarProviderProps {
  children: ReactNode;
}

export const SearchBarProvider: React.FC<SearchBarProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchBarContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchBarContext.Provider>
  );
};