import './SpeakerPage.css';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useArticleAPI from '@api/articleAPI';
import { Article } from '@interfaces/Article';
import Header from '@components/Header'; // Import the Header component

const SpeakerPage: React.FC = () => {
  const { speaker } = useParams<{ speaker: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

  const { SpeakerByName } = useArticleAPI();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (speaker) setArticles(await SpeakerByName(speaker));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [speaker]);

  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="speaker-page">
      <Header /> {/* Include the Header component */}
      <h1>Articles featuring {speaker}</h1>
      <div className="articles-list">
        {articles.map(article => (
          <div key={article.id} className="article-item" onClick={() => handleArticleClick(article.id)}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <blockquote className="article-quote">
              {article.dialogs.find(dialog => dialog.speaker === speaker)?.summary || 'No summary available'}
            </blockquote>
            <span className="article-date">{article.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerPage;