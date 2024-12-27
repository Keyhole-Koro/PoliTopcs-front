import React from 'react';
import { Article } from '@interfaces/Article';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const useArticleAPI = () => {
    const TopHeadlines = async (numOfArticles: number): Promise<Article[]> => {
        const response = await fetch(`${API_ENDPOINT}/top-headlines?count=${numOfArticles}`);
        if (!response.ok) throw new Error('Failed to fetch articles by keyword');

        const data = await response.json();
        return data.articles;
    };

    const ArticlesByKeyword = async (keyword: string): Promise<Article[]> => {
        const response = await fetch(`${API_ENDPOINT}/news?keyword=${keyword}`);
        if (!response.ok) throw new Error('Failed to fetch articles by keyword');

        const data = await response.json();
        return data.articles;
    };

    const SpeakerByName = async (speaker: string): Promise<Article[]> => {
        const response = await fetch(`${API_ENDPOINT}/news/speaker/${speaker}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        return data.articles;
    }
    
    return {TopHeadlines, ArticlesByKeyword, SpeakerByName};
}

export default useArticleAPI;