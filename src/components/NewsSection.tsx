import './NewsSection.css';

import React from 'react';

import { Article } from '@interfaces/Article';
import Tile from './Tile';

interface NewsSectionProps {
  sectionName: string;
  articles: Article[];
  handleTileClick: (id: string, event: React.MouseEvent) => void;
  handleKeywordClick: (keyword: string, event: React.MouseEvent) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ sectionName, articles, handleTileClick, handleKeywordClick }) => {
  return (
    <div className="news-section">
      <h2 className = 'title'>
          {sectionName}
      </h2>
      <div className="headline-tiles">
        {articles.map((article) => (
          <Tile
            key={"news_section_" + article.id}
            headline={article}
            width="calc(33.33% - 40px)"
            handleTileClick={handleTileClick}
            handleKeywordClick={handleKeywordClick}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsSection;