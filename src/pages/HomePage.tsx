import './HomePage.css';

import React, { MouseEvent, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Article } from '@interfaces/Article';
import Tile from '@components/Tile';
import Header from '@components/Header';
import KeywordList from '@components/KeywordList';
import { useArticles } from '@contexts/ArticlesContext';
import { useSearchBar } from '@contexts/SearchBarContext';
import useArticleAPI from '@api/articleAPI';
import useDebounce from '@hooks/useDebounce';

const HomePage: React.FC = () => {

  const navigate = useNavigate();
  const { articles, setArticles } = useArticles();
  const { searchTerm, setSearchTerm } = useSearchBar();
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce delay
  const [ showMoreButtonVisible, setShowMoreButtonVisible ] = useState(true);
  const [ loading, setLoading ] = useState(false);

  const topStories = "最新のニュース";
  const ShowMore = "もっと見る";

  const [ numOfTopHeadlines, setNumOfTopHeadlines ] = useState(5);

  const {
    fetchTopHeadlines,
    fetchArticlesByKeyword
  } = useArticleAPI();

  const location = useLocation();

  useEffect(() => {
    const fetchTopHeadlines_ = async () => {
      setLoading(true);
      try {
        setArticles(await fetchTopHeadlines(numOfTopHeadlines));
      } finally {
        setLoading(false);
      }
    };

    fetchTopHeadlines_();
  }, [numOfTopHeadlines]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword');
    if (keyword) {
      setSearchTerm(keyword);
    }
  }, [location]);

  useEffect(() => {
    const fetchArticlesBySearchTerm = async () => {
      setLoading(true);
      try {
        setArticles(await fetchArticlesByKeyword(debouncedSearchTerm));
      } catch (error) {
        console.error('Error fetching articles by search term:', error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearchTerm === '') {
      const fetchTopHeadlines_ = async () => {
        setArticles(await fetchTopHeadlines(numOfTopHeadlines));
      };
      fetchTopHeadlines_();
    } else {
      fetchArticlesBySearchTerm();
    }

  }, [searchTerm, debouncedSearchTerm]);

  const handleTileClick = (id: string, event: MouseEvent) => {
    event.stopPropagation();
    navigate(`/article/${id}`);
  };

  const toggleShowMore = async () => {

  };

  const handleKeywordClick = (keyword: string, event: MouseEvent) => {
    event.stopPropagation();
    setSearchTerm(keyword);
  };

  const categories = articles ? Array.from(new Set(articles.map(headline => headline.category))) : [];

  const headlines = articles ? articles.slice(0, numOfTopHeadlines) : [];

  return (
    <div>
      <Header />
      <KeywordList keywords={categories} handleKeywordClick={handleKeywordClick} justify_content='center' />
      <div className="app">
        <div className="top-headlines">
          <h2>{topStories}</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="headline-tiles">
                {headlines.map((article) => (
                <Tile
                  key={"_tile_" + article.id}
                  headline={article}
                  width="calc(33.33% - 40px)"
                  handleTileClick={handleTileClick}
                  handleKeywordClick={handleKeywordClick}
                />
              ))}
            </div>
          )}
          {articles === undefined && <div>No articles available.</div>}
        </div>
        {showMoreButtonVisible && (
          <button onClick={toggleShowMore} className="toggle-button">
            {ShowMore}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;