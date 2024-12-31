import React from 'react';
import './KeywordList.css';

interface KeywordListProps {
  keywords: string[];
  handleKeywordClick: (keyword: string, event: React.MouseEvent) => void;
  justify_content: 'left' | 'center';
  isExpanded?: boolean;
}

const KeywordList: React.FC<KeywordListProps> = ({ keywords, handleKeywordClick, justify_content, isExpanded }) => {
  const displayedKeywords = isExpanded ? keywords : keywords.slice(0, 5);

  return (
    <div className={`keyword-list ${justify_content}`}>
      {displayedKeywords.map((keyword, index) => (
        <span
          key={index}
          className="keyword-list-item"
          onClick={(event) => handleKeywordClick(keyword, event)}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default KeywordList;
