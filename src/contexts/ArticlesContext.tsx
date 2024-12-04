import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Article } from '@interfaces/Article';

interface ArticlesContextProps {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ArticlesContext = createContext<ArticlesContextProps | undefined>(undefined);

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};

interface ArticlesProviderProps {
  children: ReactNode;
}

export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [count, setCount] = useState(5);

  return (
    <ArticlesContext.Provider value={{ articles, setArticles, count, setCount }}>
      {children}
    </ArticlesContext.Provider>
  );
};