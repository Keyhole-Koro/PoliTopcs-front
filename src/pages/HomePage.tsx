import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Tile from '@components/Tile';
import Header from '@components/Header';
import useArticleAPI from '@api/articleAPI';
import { useArticles } from '@contexts/ArticlesContext';
import { useSearchBar } from '@contexts/SearchBarContext';
import useDebounce from '@hooks/useDebounce';
import { Article } from '@interfaces/Article';
import './HomePage.css';
import KeywordList from '@components/KeywordList';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { articles, setArticles, count, setCount } = useArticles();
  const { searchTerm, setSearchTerm } = useSearchBar();
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce delay
  const [showMoreButtonVisible, setShowMoreButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const countRef = useRef(count);

  const topStories = "最新のニュース";

  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    TopHeadlines,
    ArticlesByKeyword,
  } = useArticleAPI();

  const location = useLocation();

  useEffect(() => {
    // Restore the count from the ref when the component mounts
    setCount(countRef.current);
  }, []);

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      setLoading(true);
      try {
        setArticles(await TopHeadlines(countRef.current));
      } finally {
        setLoading(false);
      }
    };

    fetchTopHeadlines();
  }, [count]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword');
    if (keyword) {
      setSearchTerm(keyword);
    }
  }, [location]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchArticlesBySearchTerm = async () => {
        setLoading(true);
        try {
          
          setArticles(await ArticlesByKeyword(debouncedSearchTerm));
        } catch (error) {
          console.error('Error fetching articles by search term:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchArticlesBySearchTerm();
    } else {
      // If search term is empty, fetch top headlines
      const fetchTopHeadlines = async () => {
        setLoading(true);
        try {

          setArticles(await TopHeadlines(countRef.current));
        } catch (error) {
          console.error('Error fetching top headlines:', error);
        } finally {
          setLoading(false);
        }
      };

      if (!cooldown) {
        fetchTopHeadlines();
        setCooldown(true);
        setTimeout(() => setCooldown(false), 5000); // 5 seconds cooldown
      }
    }
  }, [debouncedSearchTerm]);

  const handleHeadlineClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  const toggleShowAll = async () => {
    const prevArticlesLength = articles.length;

    if (selectedCategory || searchTerm) {
      // Fetch articles based on selected category or search term
      const fetchArticles = async () => {
        setLoading(true);
        try {
          const newArticles = (await ArticlesByKeyword(searchTerm)).filter((newArticle: Article) => 
            !articles.some(existingArticle => existingArticle.id === newArticle.id)
          );
          setArticles(prevArticles => [...prevArticles, ...newArticles]);
        } catch (error) {
          console.error('Error fetching articles:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchArticles();
    } else {
      // Fetch more top headlines
      setCount(prev => {
        const newCount = prev + 5;
        countRef.current = newCount; // Update the ref with the new count
        return newCount;
      });

      const articles = await TopHeadlines(countRef.current);
              
      setArticles(prevArticles => {
        const newArticles = articles.filter((newArticle: Article) => 
          !prevArticles.some(existingArticle => existingArticle.id === newArticle.id)
        );
        return [...prevArticles, ...newArticles];
      });
      if (prevArticlesLength === articles.length) {
        setShowMoreButtonVisible(false);
      } else {
        setShowMoreButtonVisible(true);
      }
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword);
    ArticlesByKeyword(keyword);
  };

  const filteredHeadlines = articles
    ? articles
        .filter(headline =>
          (headline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           headline.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))) &&
          (dateFilter === '' || headline.date === dateFilter) &&
          (categoryFilter === '' || headline.category === categoryFilter)
        )
        .sort((a, b) => sortOrder === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  const keywords = articles ? Array.from(new Set(articles.map(headline => headline.category))) : [];

  return (
    <div>
      <Header />
      <KeywordList keywords={keywords} handleKeywordClick={handleKeywordClick} />
      <div className="app">
        <div className="top-headlines">
          <h2>{topStories}</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="headline-tiles">
                {filteredHeadlines.map((article) => (
                <Tile
                  key={"_tile_" + article.id}
                  headline={article}
                  width="calc(33.33% - 40px)"
                  onClick={() => handleHeadlineClick(article.id)}
                  handleKeywordClick={handleKeywordClick}
                />
              ))}
            </div>
          )}
          {articles === undefined && <div>No articles available.</div>}
        </div>
        {showMoreButtonVisible && (
          <button onClick={toggleShowAll} className="toggle-button">
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;