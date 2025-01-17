import React, { MouseEvent, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Article } from '@interfaces/Article';
import { Button, Box, TextField, Typography } from '@mui/material';
import Header from '@components/Header';
import TopCategories from '@components/TopCategories';
import KeywordList from '@components/KeywordList';
import NewsSection from '@components/NewsSection';
import { useArticles } from '@contexts/ArticlesContext';
import { useSearchBar } from '@contexts/SearchBarContext';
import useArticleAPI from '@api/articleAPI';

interface ArticleSection {
  sectionName: string;
  articles: Article[] | undefined;
  path: string;
  numOfShownArticles: number;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { articles, setArticles } = useArticles();
  const { searchTerm, setSearchTerm, clearSearch } = useSearchBar();
  const [showMoreButtonVisible, setShowMoreButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const topStories = "最新のニュース";
  const ShowMore = "もっと見る";

  const topCategories = ['すべて', '予算', '決算', '法案', '調査'];

  const articleSection: ArticleSection[] = [
    { sectionName: 'トップストーリ', articles: articles, path: '/top-stories', numOfShownArticles: 3 },
    { sectionName: '予算', articles: articles, path: '/budget', numOfShownArticles: 0 },
    { sectionName: '決算', articles: articles, path: '/settlement', numOfShownArticles: 0 },
    { sectionName: '法案', articles: articles, path: '/bill', numOfShownArticles: 0 },
    { sectionName: '調査', articles: articles, path: '/survey', numOfShownArticles: 0 },
  ];

  const [numOfTopHeadlines, setNumOfTopHeadlines] = useState(3);

  const { fetchTopHeadlines, fetchArticlesByKeyword } = useArticleAPI();

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
      const fetchTopHeadlines_ = async () => {
        setArticles(await fetchTopHeadlines(numOfTopHeadlines));
      };
      fetchTopHeadlines_();
    } else {
      fetchArticlesBySearchTerm();
    }
  }, [searchTerm]);

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

  const categories = articles ? Array.from(new Set(articles.map((headline) => headline.category))) : [];

  return (
    <Box sx={{ padding: 2 }}>
      <Header />
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Search headlines..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        {searchTerm && (
          <Button onClick={clearSearch} variant="outlined" sx={{ minWidth: '40px', padding: 0 }}>
            &times;
          </Button>
        )}
      </Box>

      <KeywordList keywords={categories} handleKeywordClick={handleKeywordClick} justify_content="center" />

      <div className="app">
        <div className="top-headlines">
          {articleSection.map((section) => (
            <NewsSection
              key={section.sectionName}
              sectionName={section.sectionName}
              articles={section.articles || []}
              path={section.path}
              numOfShownArticles={section.numOfShownArticles}
              handleTileClick={handleTileClick}
              handleKeywordClick={handleKeywordClick}
              handleSectionClick={(sectionName, event) => {
                event.stopPropagation();
                console.log(`Section clicked: ${sectionName}`);
              }}
            />
          ))}
          {articles === undefined && <Typography>No articles available.</Typography>}
        </div>
      </div>

      {showMoreButtonVisible && (
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button variant="contained" onClick={toggleShowMore}>
            {ShowMore}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
