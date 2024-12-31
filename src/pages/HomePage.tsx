import './HomePage.css';

import React, { MouseEvent, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Article } from '@interfaces/Article';
import Header from '@components/Header';
import TopCategories from '@components/TopCategories';
import KeywordList from '@components/KeywordList';
import NewsSection from '@components/NewsSection';
import { useArticles } from '@contexts/ArticlesContext';
import { useSearchBar } from '@contexts/SearchBarContext';
import useArticleAPI from '@api/articleAPI';
import useDebounce from '@hooks/useDebounce';

interface ArticleSection {
  sectionName: string;
  articles: Article[] | undefined;
}

const HomePage: React.FC = () => {

  const navigate = useNavigate();
  const { articles, setArticles } = useArticles();
  const { searchTerm, setSearchTerm } = useSearchBar();
  //const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [ showMoreButtonVisible, setShowMoreButtonVisible ] = useState(true);
  const [ loading, setLoading ] = useState(false);

  const topStories = "最新のニュース";
  const ShowMore = "もっと見る";

  const articleSection: ArticleSection[] = [{
    sectionName: 'トップストーリ',
    articles: articles
  },
]

  const [ numOfTopHeadlines, setNumOfTopHeadlines ] = useState(3  );

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
        setArticles(await fetchArticlesByKeyword(searchTerm));
      } catch (error) {
        console.error('Error fetching articles by search term:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm === '') {
      // shows top headlines
      const fetchTopHeadlines_ = async () => {
        setArticles(await fetchTopHeadlines(numOfTopHeadlines));
      };
      fetchTopHeadlines_();
    } else {
      fetchArticlesBySearchTerm();
    }

  }, [searchTerm, searchTerm]);

  const handleTileClick = (id: string, event: MouseEvent) => {
    event.stopPropagation();
    navigate(`/article/${id}`);
  };

  const toggleShowMore = async () => {
    setNumOfTopHeadlines(numOfTopHeadlines + 5);
  };

  const handleKeywordClick = (keyword: string, event: MouseEvent) => {
    event.stopPropagation();
    setSearchTerm(keyword);
  };

  const categories = articles ? Array.from(new Set(articles.map(headline => headline.category))) : [];

  const topCategories = ['すべて', '予算案', '法案', '調査'];

  //<TopCategories categories={topCategories} />
  return (
    <div>
      <Header />
      <KeywordList keywords={categories} handleKeywordClick={handleKeywordClick} justify_content='center' />
      <div className="app">
        <div className="top-headlines">
            {articleSection.map(section => (
              <NewsSection
                key={section.sectionName}
                sectionName={section.sectionName}
                articles={section.articles || []}
                handleTileClick={handleTileClick}
                handleKeywordClick={handleKeywordClick}
              />
            ))}
          {articles === undefined && <div>No articles available.</div>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;