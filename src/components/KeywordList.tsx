import './KeywordList.css';

import React from 'react';

interface KeywordListProps {
    keywords: string[];
    handleKeywordClick: (keyword: string) => void;
    justify_content?: string;
}

const KeywordList: React.FC<KeywordListProps> = ({ keywords, handleKeywordClick, justify_content }) => {
    return (
        <div className="keyword-list" style={{ justifyContent: justify_content }}>
            <div className="keyword-list-inner">
                {keywords.map(keyword => (
                    <span
                        key={"keyword"+keyword}
                        className='keyword'
                        onClick={() => handleKeywordClick(keyword)}
                        >
                        {keyword}
                    </span>
                ))}
            </div>
      </div>
    );
};

export default KeywordList;