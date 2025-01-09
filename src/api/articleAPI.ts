// useArticleAPI.ts
import { useArticles } from '@contexts/ArticlesContext';
import { Article } from '@interfaces/Article';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const useArticleAPI = () => {
  const {
    articles,
    setArticles,
    articlesByKeyword,
    setArticlesByKeyword,
    articlesBySpeaker,
    setArticlesBySpeaker,
    cacheManager, // Access CacheManager from context
  } = useArticles();

  // Fetch top headlines from API or cache
  const fetchTopHeadlines = async (numOfArticles: number): Promise<Article[]> => {
    const cacheKey = `top-headlines-${numOfArticles}`;

    // Check if data exists in cache
    const cachedArticles = cacheManager.get<Article[]>(cacheKey);
    if (cachedArticles) {
      return cachedArticles;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/top-headlines?count=${numOfArticles}`);
      if (!response.ok) throw new Error('Failed to fetch top headlines');

      const data = await response.json();
      setArticles(data.articles); // Save data to context state
      cacheManager.set(cacheKey, data.articles); // Save data to cache
      return data.articles;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch top headlines');
    }
  };

  const fetchArticleByCategory = async (category: string): Promise<Article[]> => {
    const cacheKey = `category-${category}`;

    // Check if data exists in cache
    const cachedArticles = cacheManager.get<Article[]>(cacheKey);
    if (cachedArticles) {
      return cachedArticles;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/category/${category}`);
      if (!response.ok) throw new Error('Failed to fetch articles by category');

      const data = await response.json();
      setArticles(data.articles); // Save data to context state
      cacheManager.set(cacheKey, data.articles); // Save data to cache
      return data.articles;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch articles by category');
    }
  }

  // Fetch articles by keyword from API or cache
  const fetchArticlesByKeyword = async (keyword: string): Promise<Article[]> => {
    const cacheKey = `articles-keyword-${keyword}`;

    // Check if data exists in cache
    const cachedArticles = cacheManager.get<Article[]>(cacheKey);
    if (cachedArticles) {
      return cachedArticles;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/news?keyword=${keyword}`);
      if (!response.ok) throw new Error('Failed to fetch articles by keyword');

      const data = await response.json();
      setArticlesByKeyword({ keyword, articles: data.articles });
      cacheManager.set(cacheKey, data.articles); // Save data to cache
      return data.articles;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch articles by keyword');
    }
  };

  // Fetch articles by speaker from API or cache
  const fetchArticlesBySpeaker = async (speaker: string): Promise<Article[]> => {
    const cacheKey = `articles-speaker-${speaker}`;

    // Check if data exists in cache
    const cachedArticles = cacheManager.get<Article[]>(cacheKey);
    if (cachedArticles) {
      return cachedArticles;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/news/speaker/${speaker}`);
      if (!response.ok) throw new Error('Failed to fetch articles by speaker');

      const data = await response.json();
      setArticlesBySpeaker({ speaker, articles: data.articles });
      cacheManager.set(cacheKey, data.articles); // Save data to cache
      return data.articles;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch articles by speaker');
    }
  };

  return { fetchTopHeadlines, fetchArticlesByKeyword, fetchArticlesBySpeaker };
};

export default useArticleAPI;
