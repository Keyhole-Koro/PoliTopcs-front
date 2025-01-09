import './NewsSection.css';

import React, { useState } from 'react';

import { Article } from '@interfaces/Article';
import Tile from './Tile';

interface NewsSectionProps {
  sectionName: string;
  articles: Article[];
  path: string;
  numOfShownArticles?: number;
  handleTileClick: (id: string, event: React.MouseEvent) => void;
  handleKeywordClick: (keyword: string, event: React.MouseEvent) => void;
  handleSectionClick: (sectionName: string, event: React.MouseEvent) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ sectionName, articles, path, numOfShownArticles, handleTileClick, handleKeywordClick, handleSectionClick }) => {
  const initialArticlesToShow = numOfShownArticles && numOfShownArticles <= 3 ? numOfShownArticles : 3;
  const [articlesToShow, setArticlesToShow] = useState(initialArticlesToShow);

  const handleExpandClick = () => {
    setArticlesToShow((prev) => prev + 3);
  };

  return (
    <div className="news-section">
      <h2 className='title'>
        <a href={path} onClick={(e) => handleSectionClick(sectionName, e)} className="clickable-section">
          {sectionName}
        </a>
      </h2>
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
      {articlesToShow < articles.length && (
        <button onClick={handleExpandClick} className="expand-button">
          Expand
        </button>
      )}
    </div>
  )
}

export default NewsSection;