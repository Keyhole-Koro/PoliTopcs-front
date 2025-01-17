import './NewsSection.css';

import React, { useState } from 'react';

import { Article } from '@interfaces/Article';
import Tile from './Tile';

interface NewsSectionProps {
  sectionName: string;
  articles: Article[];
  path: string;
  numOfShownArticles: number;
  handleTileClick: (id: string, event: React.MouseEvent) => void;
  handleKeywordClick: (keyword: string, event: React.MouseEvent) => void;
  handleSectionClick: (sectionName: string, event: React.MouseEvent) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ sectionName, articles, path, numOfShownArticles, handleTileClick, handleKeywordClick, handleSectionClick }) => {
  const [articlesToShow, setArticlesToShow] = useState(numOfShownArticles);
  const [showTiles, setShowTiles] = useState(numOfShownArticles === 0 ? false : true);

  const handleExpandMoreClick = () => {
    setArticlesToShow((prev) => prev + 3);
  };

  const handleExpandClick = () => {
    setShowTiles((prev) => {
      if (!prev) {
        setArticlesToShow(6);
      } else {
        setArticlesToShow(0);
      }
      return !prev;
    });
  };

  return (
    <div className="news-section">
      <div className="title-container">
        <div className="title" onClick={handleExpandClick}>
          <span className="expand-title">{sectionName}</span>
          <span className={`expand-icon ${showTiles ? 'open' : ''}`}>&rsaquo;</span>
        </div>
        <a href={sectionName} className="individual-link" onClick={() => console.log('individual-link')}>
          {sectionName + "について詳しく見る"}
        </a>
      </div>
      <div className="headline-tiles">
        {articles.slice(0, articlesToShow).map((article) => (
          <Tile
            key={"news_section_" + article.id}
            headline={article}
            width="calc(33.33% - 40px)"
            handleTileClick={handleTileClick}
            handleKeywordClick={handleKeywordClick}
          />
        ))}
      </div>
      {showTiles && (
        <span onClick={handleExpandMoreClick} className="expand-symbol">
          &raquo;
        </span>
      )}
    </div>
  );
};

export default NewsSection;