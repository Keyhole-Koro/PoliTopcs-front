import React, { MouseEvent, useState } from 'react';
import './Tile.css';
import { Article } from '@interfaces/Article';
import KeywordList from './KeywordList';

interface TileProps {
  headline: Article;
  width: string;
  handleTileClick: (id: string, event: MouseEvent) => void;
  handleKeywordClick: (keyword: string, event: MouseEvent) => void;
}

const Tile: React.FC<TileProps> = ({ headline, width, handleTileClick, handleKeywordClick }) => {
  const [isKeywordExpanded, setIsKeywordExpanded] = useState(false); // キーワードの展開状態を管理

  const toggleKeywordList = () => {
    setIsKeywordExpanded(!isKeywordExpanded);
  };

  return (
    <div
      key={"tile" + headline.id}
      onClick={(event) => handleTileClick(headline.id, event)}
      className="headline-tile"
      style={{ width: `${width}px` }}
    >
      <span className="headline-date">{headline.date}</span>

      <h3 className="headline-title">{headline.title}</h3>
      <p className="headline-summary">{headline.summary}</p>

      <div className="headline-keywords">
        <KeywordList
          keywords={headline.keywords}
          handleKeywordClick={handleKeywordClick}
          justify_content='left'
          isExpanded={isKeywordExpanded}
        />
        {headline.keywords.length > 5 && (
          <button className="toggle-keywords" onClick={toggleKeywordList}>
            {isKeywordExpanded ? '閉じる' : 'もっと見る'}
          </button>
        )}
      </div>
    </div>
  );
};

/*
      <div className="headline-tags">
        {headline.tags?.map((tag, index) => (
          <span key={index} className="headline-tag">
            {tag}
          </span>
        ))}
      </div>
*/

export default Tile;
