// ArticlesContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Article } from '@interfaces/Article';
import { CacheManager } from '@utils/cacheManager'; // Import CacheManager

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

// Define ArticlesContext type
interface ArticlesContextProps {
  articles: Article[] | undefined;
  setArticles: React.Dispatch<React.SetStateAction<Article[] | undefined>>;
  articlesByKeyword: { keyword: string, articles: Article[] };
  setArticlesByKeyword: React.Dispatch<React.SetStateAction<{ keyword: string, articles: Article[] }>>;
  articlesBySpeaker: { speaker: string, articles: Article[] };
  setArticlesBySpeaker: React.Dispatch<React.SetStateAction<{ speaker: string, articles: Article[] }>>;
  cacheManager: CacheManager; // Include CacheManager instance in context
}

// Create ArticlesContext
const ArticlesContext = createContext<ArticlesContextProps | undefined>(undefined);

// Hook to access ArticlesContext
export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};

// ArticlesProvider component to wrap app and provide context
interface ArticlesProviderProps {
  children: ReactNode;
}

export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[] | undefined>([]); // All articles
  const [articlesByKeyword, setArticlesByKeyword] = useState<{ keyword: string, articles: Article[] }>({ keyword: '', articles: [] });
  const [articlesBySpeaker, setArticlesBySpeaker] = useState<{ speaker: string, articles: Article[] }>({ speaker: '', articles: [] });

  // Create CacheManager instance
  const cacheManager = new CacheManager();

  return (
    <ArticlesContext.Provider value={{
      articles, setArticles,
      articlesByKeyword, setArticlesByKeyword,
      articlesBySpeaker, setArticlesBySpeaker,
      cacheManager // Provide CacheManager through context
    }}>
      {children}
    </ArticlesContext.Provider>
  );
};
