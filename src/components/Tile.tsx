import React from 'react';
import './Tile.css'; // Import the CSS file for Tile
import { Article } from '@interfaces/Article';
import KeywordList from './KeywordList';

interface TileProps {
  headline: Article;
  width: string;
  onClick: () => void;
  handleKeywordClick: (keyword: string) => void;
}

const Tile: React.FC<TileProps> = ({ headline, width, onClick, handleKeywordClick }) => {
  return (
    <div
      key={"tile" + headline.id}
      onClick={() => onClick()}
      className="headline-tile"
      style={{ width: `${width}px` }}
    >
      <span className="headline-date">{headline.date}</span>
      <h3 className="headline-title">{headline.title}</h3>
      <p className="headline-summary">{headline.summary}</p>
      <KeywordList  keywords={headline.keywords} handleKeywordClick={handleKeywordClick} justify_content='left'/>
    </div>
  );
};

export default Tile;