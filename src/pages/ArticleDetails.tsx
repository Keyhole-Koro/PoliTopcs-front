import React, { useState, useEffect } from 'react';
import './ArticleDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '@contexts/ArticlesContext';
import { Article, Dialog, Reaction } from '@interfaces/Article';
import GuestUserIcon from '@materials/GuestUser.png'; // Import the icon
import HighlightedContent from '@components/HighlightedContent';
import Tooltip from '@components/Tooltip';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles } = useArticles();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [targetDialog, setTargetDialog] = useState<Dialog | null>(null);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const localArticle = articles.find(a => a.id === parseInt(id || '', 10));
    if (localArticle) {
      setArticle(localArticle);
    } else {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`${API_ENDPOINT}/news/id/${id}`);
          if (!response.ok) {
            throw new Error('Article not found');
          }
          const data: { article: Article } = await response.json();
          setArticle(data.article);
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      };

      fetchArticle();
    }
  }, [id, articles]);

  if (!article) {
    return <div>Article not found</div>;
  }

  const relatedHeadlines = articles.filter(
    headline => headline.category === article.category && headline.id !== article.id
  );

  const handleHeadlineClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  const handleKeywordClick = (event: React.MouseEvent, keyword: string) => {
    event.stopPropagation();
    // Implement keyword click handling if needed
  };

  const handleDialogMouseEnter = (dialogId: number) => {
    if (!article.dialogs) return;
    setTargetDialog(getDialogById(article.dialogs, dialogId));
  };

  const handleDialogMouseLeave = () => {
    setTargetDialog(null);
  };

  const handleSpeakerClick = (speaker: string) => {
    navigate(`/speaker/${speaker}`);
  };

  const getDialogById = (dialogs: Dialog[], id: number): Dialog | null => {
    return dialogs.find(dialog => dialog.id === id) || null;
  };

  const highlight = (dialog_id: number): string => {
    if (!targetDialog || !targetDialog.response_to) return '';

    if (targetDialog.id === dialog_id) return '';
  
    const highlightedDialog = 
      getDialogById(article.dialogs, dialog_id)?.response_to.find(response => response.dialog_id === targetDialog.id);

    if (!highlightedDialog) return 'highlight unrelated';
    
    const reactionClass = highlightedDialog.reaction === Reaction.AGREE
      ? 'agree'
      : highlightedDialog.reaction === Reaction.DISAGREE
      ? 'disagree'
      : 'neutral';
  
    return `'highlight' ${reactionClass}`;
  };

  return (
    <div className="article-details">
      <div className="article-content">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span className="headline-date">{article.date}</span>
        </div>
        <p className="article-description">{article.description}</p>
        <div className="article-keywords">
          {article.keywords.map((keyword, index) => (
            <span key={index} className="keyword" onClick={(event) => handleKeywordClick(event, keyword)}>
              {keyword}
            </span>
          ))}
        </div>
      </div>
      <h2>Dialogs</h2>
      <div className="dialogs">
      {article.dialogs.map((dialog) => (
          <div
            key={dialog.id}
            className={`dialog ${highlight(dialog.id)}`}
            onMouseEnter={() => handleDialogMouseEnter(dialog.id)}
            onMouseLeave={handleDialogMouseLeave}
          >
            <img
              src={GuestUserIcon}
              alt="User Icon"
              className="dialog-icon"
              onClick={() => handleSpeakerClick(dialog.speaker)}
              style={{ cursor: 'pointer' }}
            />
            <div className="dialog-content">
              <p>
                <strong>{dialog.speaker}:</strong>
                <HighlightedContent description={dialog.summary} terms={article.terms} />
              </p>
            </div>
          </div>
        ))}
      </div>
      <h2>Related Articles</h2>
      <div className="headline-tiles">
        {relatedHeadlines.map((headline) => (
          <div key={headline.id} onClick={() => handleHeadlineClick(headline.id)} className="headline-tile">
            <span className="headline-date">{headline.date}</span>
            <h3 className="headline-title">{headline.title}</h3>
            <p className="headline-description">{headline.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;