import React from 'react';
import './Tile.css'; // Import the CSS file for Tile
import { Article } from '@interfaces/Article';

interface TileProps {
  headline: Article;
  onClick: () => void;
  handleKeywordClick: (event: React.MouseEvent, keyword: string) => void;
}

const Tile: React.FC<TileProps> = ({ headline, onClick, handleKeywordClick }) => {
  return (
    <div key={"tile"+headline.id} onClick={() => onClick()} className="headline-tile">
        <span className="headline-date">{headline.date}</span>
        <h3 className="headline-title">{headline.title}</h3>
        <p className="headline-summary">{headline.summary}</p>
        <div className="headline-keywords">
        {headline.keywords.map((keyword, index) => (
            <span key={index} className="keyword" onClick={(event) => handleKeywordClick(event, keyword)}>{keyword}</span>
        ))}
    </div>
  </div>
  );
};

export default Tile;