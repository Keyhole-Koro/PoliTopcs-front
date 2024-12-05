import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SpeakerPage.css';
import { Article } from '@interfaces/Article';

const SpeakerPage: React.FC = () => {
  const { speaker } = useParams<{ speaker: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/news/speaker/${speaker}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data: { articles: Article[] } = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [speaker]);

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="speaker-page">
      <h1>Articles featuring {speaker}</h1>
      <div className="articles-list">
        {articles.map(article => (
          <div key={article.id} className="article-item" onClick={() => handleArticleClick(article.id)}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <blockquote className="article-quote">
              {article.participants.find(prtcpnt => prtcpnt.name === speaker)?.summary || 'No summary available'}
            </blockquote>
            <span className="article-date">{article.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerPage;