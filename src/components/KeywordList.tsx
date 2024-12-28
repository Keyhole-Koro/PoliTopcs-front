import './KeywordList.css';

import React from 'react';

interface KeywordListProps {
    keywords: string[];
    handleKeywordClick: (keyword: string, event: React.MouseEvent<HTMLSpanElement>) => void;
    justify_content?: string;
}

const KeywordList: React.FC<KeywordListProps> = ({ keywords, handleKeywordClick, justify_content }) => {
    return (
        <div className="keyword-list" style={{ justifyContent: justify_content }}>
            <div className="keyword-list-inner">
                {Array.isArray(keywords) ? keywords.map(keyword => (
                    <span
                        key={"keyword"+keyword}
                        className='keyword'
                        onClick={(event) => handleKeywordClick(keyword, event)}
                        >
                        {keyword}
                    </span>
                )) : []}
            </div>
      </div>
    );
};

export default KeywordList;