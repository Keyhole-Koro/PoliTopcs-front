// ArticlesContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Article } from '@interfaces/Article';
import { CacheManager } from '@utils/cacheManager';

interface ArticlesContextProps {
  articles: Article[] | undefined;
  setArticles: React.Dispatch<React.SetStateAction<Article[] | undefined>>;
  articlesByKeyword: { keyword: string, articles: Article[] };
  setArticlesByKeyword: React.Dispatch<React.SetStateAction<{ keyword: string, articles: Article[] }>>;
  articlesBySpeaker: { speaker: string, articles: Article[] };
  setArticlesBySpeaker: React.Dispatch<React.SetStateAction<{ speaker: string, articles: Article[] }>>;
  cacheManager: CacheManager;
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
  const [articles, setArticles] = useState<Article[] | undefined>([]);
  const [articlesByKeyword, setArticlesByKeyword] = useState<{ keyword: string, articles: Article[] }>({ keyword: '', articles: [] });
  const [articlesBySpeaker, setArticlesBySpeaker] = useState<{ speaker: string, articles: Article[] }>({ speaker: '', articles: [] });

  const cacheManager = new CacheManager();

  return (
    <ArticlesContext.Provider value={{
      articles, setArticles,
      articlesByKeyword, setArticlesByKeyword,
      articlesBySpeaker, setArticlesBySpeaker,
      cacheManager
    }}>
      {children}
    </ArticlesContext.Provider>
  );
};
